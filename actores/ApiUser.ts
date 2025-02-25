import { APIRequestContext } from "@playwright/test";

export class ApiUser {
  private api: APIRequestContext;
  private isAuthenticated: boolean = false;

  constructor(api: APIRequestContext) {
    this.api = api;
  }

  // Método para simular la autenticación del usuario
  async login() {
    if (this.isAuthenticated) {
      return; // Evita autenticarse más de una vez
    }

    this.isAuthenticated = true;

    // Simulación de autenticación (sin realizar una solicitud real)
    console.log('='.repeat(50));
    console.log("✅ Usuario autenticado correctamente (simulación).");
    console.log('='.repeat(50));
  }

  // Método para ejecutar tareas en secuencia
  async attemptsTo(...tasks: ((apiUser: ApiUser) => Promise<any>)[]) {
    for (const task of tasks) {
      await task(this); // Ejecuta la tarea, pasando el actor como argumento
    }
  }
}
