import { Given, When, Then } from '@cucumber/cucumber'
import { RespuestaExitosa, RespuestaError} from '../tipos/tipos'
import { RespuestaCamposVacios } from '../tipos/tipos'
import { APIRequestContext, expect, request} from 'playwright/test'
import { ApiUser } from '../actores/ApiUser'
import { CrearGuiaTarea } from '../tareas/CrearGuiaTarea'
import { Autenticarse } from '../tareas/Autenticarse' 

let api: APIRequestContext
let apiuser: ApiUser
let resultadoAPIExitosa: RespuestaExitosa 
let resultadoAPIError: RespuestaError
let resultadoAPIVacios: RespuestaCamposVacios

Given('que soy un usuario autenticado en el sistema de guías', async function() {
  api = await request.newContext()
  apiuser = new ApiUser(api)
  //Simulación de login
  await apiuser.attemptsTo(Autenticarse())
})

When('envío una solicitud con todos los campos obligatorios correctamente diligenciados', async function() {
  const datosDePrueba = {
    referenciaRecaudo: 'REF87654897',
    valorRecaudar: '8800'
  }

  console.log('Datos de prueba',datosDePrueba)
  const actor = {};  // Acá se proporciona un actor vacío, ya que no se necesita en este caso
  resultadoAPIExitosa = await CrearGuiaTarea(actor, datosDePrueba) as RespuestaExitosa
})

Then('el sistema debe aceptar la solicitud y responder con un código de estado 200', async function() {
  console.log('Respuesta de la API:',  resultadoAPIExitosa)
  expect(resultadoAPIExitosa.isError).toBe(false) // Verifica que no haya errores
  expect(resultadoAPIExitosa.data.codigo_remision).toBeTruthy() // Verifica que el código de remisión sea generado correctamente

  if(resultadoAPIExitosa && resultadoAPIExitosa.data && resultadoAPIExitosa.data.codigo_remision) {
    console.log('Número de guía creado:', resultadoAPIExitosa.data.codigo_remision)
    console.log('Prueba exitosa')
  }else{
    console.log('No se generó número de guía')
  }
})

When('envío una solicitud con “Referencia recaudo” vacío', async function() {
  const datosDePrueba = {
    referenciaRecaudo: '',//Se envía vacío
    valorRecaudar: '8800'
  }

  const actor = {}; 
  resultadoAPIError = await CrearGuiaTarea(actor, datosDePrueba) as RespuestaError;
  console.log('Solicitud enviada con referenciaRecaudo vacío:', datosDePrueba)
})

Then('el sistema debe de rechazar la solicitud con un código de estado 400', async function() {
  expect(resultadoAPIError.isError).toBe(true) // Verifica que sea un error
  expect(resultadoAPIError.statusCode).toBe(400) // Verifica el código de estado

  if(resultadoAPIError.statusCode === 400){
    console.log('Prueba exitosa, se recibió el código de estado', resultadoAPIError.statusCode)
    console.log('Respuesta de la API:',  resultadoAPIError)
  }else{
    console.error('ERROR: Se esperaba 400, pero se recibió', resultadoAPIError.statusCode)
    throw new Error('Error en la prueba')
  }
})

When('envío una solicitud sin ingresar datos en los campos obligatorios “Valor a recaudar y Referencia recaudo”', async function() {
  const datosDePrueba = {
    referenciaRecaudo: '',//Se envía vacío
    valorRecaudar: ''//Se envía vacío
  }

  const actor = {}; 
  resultadoAPIVacios = await CrearGuiaTarea(actor, datosDePrueba) as RespuestaCamposVacios;
  console.log('Solicitud enviada con referenciaRecaudo vacío:', datosDePrueba)
})

Then('el sistema rechaza la solicitud con un código de estado 400', async function() {
  expect(resultadoAPIVacios.statusCode).toBe(400) // Verifica el código de estado

  if(resultadoAPIVacios.statusCode === 400){
    console.log('Prueba exitosa, se recibió el código de estado', resultadoAPIVacios.statusCode)
    console.log('Respuesta de la API:',  resultadoAPIVacios)
  }else{
    console.error('ERROR: Se esperaba 400, pero se recibió', resultadoAPIVacios.statusCode)
    throw new Error('Error en la prueba')
  }
});
