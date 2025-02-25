import { RespuestaExitosa } from '../tipos/tipos.ts'
import { RespuestaError } from '../tipos/tipos.ts'
import { RespuestaCamposVacios } from '../tipos/tipos.ts'

export async function CrearGuiaTarea(
  actor: any, 
  datosDePrueba: { referenciaRecaudo: string, valorRecaudar: string }
): Promise<RespuestaExitosa | RespuestaError | RespuestaCamposVacios> {
  const url = 'https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia';
  
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({
    ...datosDePrueba,
    identificacion: '890904713',
    divisionCliente: '00',
    idProceso: 100001,
    codigoPais: 170,
    valoracion: '200000',
    tipoCuenta: 3,
    contenido: 'reloj',
    codigoProducto: '',
    nivelServicio: 22,
    detalle: [
      {
        pesoReal: 1,
        largo: 5,
        ancho: 5,
        alto: 3,
        unidades: 1,
        ubl: 0,
        referencia: 'REF20240207XYZ18',
      }
    ],
    datosRemitente: {
      identificacion: '1074488313',
      detalleRemitente: 'Casa',
      tipoViaRemitente: '7',
      viaRemitente: '15',
      numeroRemitente: '53 48',
      codigoCiudadRemitente: '11001000',
      descripcionTipoViaRemitente: 'Calle',
      direccionRemitente: 'Calle 53 # 53 48',
      nombreRemitente: 'Remitente Prueba',
      indicativoRemitente: '57',
      celularRemitente: '3007876543',
      correoRemitente: 'pruebaremitente@coo.com',
    },
    datosDestinatario: {
      identificacion: '1254511109',
      detalleDestinatario: 'Casa',
      tipoViaDestinatario: '5',
      viaDestinatario: '15',
      numeroDestinatario: '45 93',
      descripcionTipoViaDestinatario: 'Calle',
      direccionDestinatario: 'calle 45 93',
      codigoCiudadDestinatario: '76001000',
      nombreDestinatario: 'Destinatario Prueba',
      indicativoDestinatario: '57',
      celularDestinatario: '3216549825',
      correoDestinatario: 'pruebadestinatario@coor.com',
    },
    tipoGuia: 1,
    referenciaGuia: '',
    usuario: 'pruebas',
    fuente: 'envios',
    observaciones: 'pruebas RCE',
  });
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    // Verifica que la respuesta sea 200, de lo contrario lanza un error
    if (!response.ok) {
      const errorResponse = await response.json();
      return errorResponse; // Devuelve el error como un objeto JSON
    }

    const result = await response.json();
    return result as RespuestaExitosa;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw new Error('Error en la solicitud');
  }

}
