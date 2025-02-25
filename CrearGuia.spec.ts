import { test, expect, APIRequestContext, request } from '@playwright/test';
import { RespuestaExitosa, RespuestaError, RespuestaCamposVacios } from './tipos/tipos.ts';
import { ApiUser } from './actores/ApiUser.ts';
import { CrearGuiaTarea } from './tareas/CrearGuiaTarea.ts';
import { Autenticarse } from './tareas/Autenticarse.ts';

let api: APIRequestContext;
let apiuser: ApiUser;
let resultadoAPIExitosa: RespuestaExitosa;
let resultadoAPIError: RespuestaError;
let resultadoAPIVacios: RespuestaCamposVacios;

test.describe('Pruebas para la creación de guías', () => {

  test('que soy un usuario autenticado en el sistema de guías', async () => {
    api = await request.newContext();
    apiuser = new ApiUser(api);
    // Simulación de login
    await apiuser.attemptsTo(Autenticarse());
  });

  test('envío una solicitud con todos los campos obligatorios correctamente diligenciados', async () => {
    const datosDePrueba = {
      referenciaRecaudo: 'REF87654897344',
      valorRecaudar: '90000',
    };

    console.log('Datos de prueba', datosDePrueba);
    const actor = {}; // Actor vacío, ya que no se necesita en este caso
    resultadoAPIExitosa = await CrearGuiaTarea(actor, datosDePrueba) as RespuestaExitosa;
  });
  test('el sistema debe aceptar la solicitud y responder con un código de estado 200', async () => {
   
    // Verifica si hay errores en la respuesta
    expect(resultadoAPIExitosa.isError).toBe(false); // Verifica que no haya errores
  
    // Verifica que el código de remisión sea generado correctamente
    expect(resultadoAPIExitosa.data.codigo_remision).toBeTruthy(); 
  
    // Verifica que la respuesta contiene el código de remisión
    if (resultadoAPIExitosa?.data?.codigo_remision) {
      console.log('Número de guía creado:', resultadoAPIExitosa.data.codigo_remision);
      console.log('Guía creada correctamente - Prueba exitosa');
    } else {
      console.log('No se generó número de guía');
    }
    console.log('Respuesta de la API:', resultadoAPIExitosa);
  });
  test('envío una solicitud con “Referencia recaudo” vacío', async () => {
    const datosDePrueba = {
      referenciaRecaudo: '', // Se envía vacío
      valorRecaudar: '8800',
    };
  
    const actor = {};
  
    try {
      // Enviar la solicitud
      resultadoAPIError = await CrearGuiaTarea(actor, datosDePrueba) as RespuestaError;
      console.log('Respuesta de la API:', resultadoAPIError); // Imprime la respuesta completa de la API
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error; // Si hay un error inesperado, lo lanzamos para que el test falle
    }
    
    // Verifica si el código de estado es 200 (lo cual no debería ser el caso)
    if (resultadoAPIError.statusCode === 200) {
      // Si la API responde con 200, falla el test
      throw new Error('Fallo en el test: Se creó una guía cuando no debería ser posible con referenciaRecaudo vacío.');
    }
    // Verifica el código de estado HTTP
    if (resultadoAPIError) {
      console.log('Código de estado recibido:', resultadoAPIError.statusCode);
      console.log('Mensaje recibido:', resultadoAPIError.message);
      console.log('Causa recibida:', resultadoAPIError.cause);
    }
  
    // Verifica el código de estado HTTP
    expect(resultadoAPIError.statusCode).toBe(400); // Verifica que el código de estado sea 400
  
    // Verifica que el mensaje de error sea el esperado
    expect(resultadoAPIError.message).toBe('Los valores de entrada no son correctos.');
  
    // Verifica que el código de error sea "BAD_REQUEST"
    expect(resultadoAPIError.code).toBe('BAD_REQUEST');
  
    // Verifica que la causa del error sea que el campo referenciaRecaudo es requerido
    expect(resultadoAPIError.cause).toBe('El campo referenciaRecaudo es requerido');
  });
  test('envío una solicitud sin ingresar datos en los campos obligatorios “Valor a recaudar y Referencia recaudo”', async () => {
    const datosDePrueba = {
      referenciaRecaudo: '', // Se envía vacío
      valorRecaudar: '', // Se envía vacío
    };
  
    const actor = {};
    try {
      // Enviar la solicitud
      resultadoAPIVacios = await CrearGuiaTarea(actor, datosDePrueba) as RespuestaCamposVacios;
      console.log('Respuesta de la API:', resultadoAPIVacios); // Imprime la respuesta completa de la API
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error; // Si hay un error inesperado, lo lanzamos para que el test falle
    }
  
    // Verifica si el código de estado es 200 (lo cual no debería ser el caso)
    if (resultadoAPIVacios.statusCode === 200) {
      // Si la API responde con 200, falla el test
      throw new Error('Fallo en el test: Se creó una guía cuando no debería ser posible con referenciaRecaudo y valorRecaudar vacíos.');
    }
  
    // Si la respuesta es 400, muestra los detalles
  if (resultadoAPIVacios.statusCode === 400) {
    console.log('La guía no pudo ser creada porque los campos "referenciaRecaudo" y "valorRecaudar" están vacíos.');
    console.log('Código de estado recibido:', resultadoAPIVacios.statusCode);
    console.log('Mensaje recibido:', resultadoAPIVacios.message);
  }
    // Verifica que el código de estado sea 400
    expect(resultadoAPIVacios.statusCode).toBe(400); // Verifica que el código de estado sea 400
  
    // Verifica que el mensaje de error sea relacionado con "valorRecaudar"
    expect(resultadoAPIVacios.message).toBe('body.valorRecaudar should be number');
  
    // Verifica que el código de error sea "BAD_REQUEST"
    expect(resultadoAPIVacios.error).toBe('Bad Request');
  });
});
