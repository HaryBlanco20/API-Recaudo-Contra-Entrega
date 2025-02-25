import exp from "constants";

// Definimos un tipo para la respuesta de la API
export interface RespuestaExitosa {
    isError: boolean;
    data: {
      codigo_remision: string;
    };
  }

export interface RespuestaError {
  isError: boolean;
  message: string;
  code: string;
  statusCode: number;
  cause: string;
}

export interface RespuestaCamposVacios {
  statusCode: number;
  error: string;
  message: string;
}