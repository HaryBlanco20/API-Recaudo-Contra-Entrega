import { APIRequestContext } from "@playwright/test";

export class ApiUser {
  private api: APIRequestContext;
  private isAuthenticated: boolean = false;

  constructor(api: APIRequestContext) {
    this.api = api;
  }

  async login() {
    if (this.isAuthenticated) {
      return; // Evita autenticarse más de una vez
    }
    this.isAuthenticated = true;
    
    console.log('='.repeat(50));
    console.log("✅ Usuario autenticado correctamente.");
    console.log('='.repeat(50));
  }

  async attemptsTo(...tasks: ((apiUser: ApiUser) => Promise<any>)[]) {
    for (const task of tasks) {
      await task(this);
    }
  }
}
