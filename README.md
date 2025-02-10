Herramientas y Tecnologías Utilizadas:
Playwright: Para automatizar las interacciones con la API, enviando solicitudes HTTP y validando respuestas.
Serenity/JS: Framework para organizar las pruebas siguiendo el patrón Screenplay, facilitando la mantenibilidad y escalabilidad.
Cucumber (Gherkin): Para escribir escenarios de prueba en formato BDD, haciendo las pruebas más legibles y accesibles.

Objetivo del Proyecto:
El objetivo principal es garantizar que la API de creación de guías funcione correctamente y pueda manejar escenarios tanto exitosos como fallidos. 
Los escenarios incluyen:
Creación de una guía exitosa con todos los campos correctamente diligenciados.
Manejo de errores cuando los campos no son válidos o la solicitud está incompleta.
Validación de los códigos de respuesta HTTP para asegurar que la API responde con el código adecuado (200, 400, etc.).

Flujo de Trabajo de las Pruebas:
Envío de la Solicitud:
El actor realiza la solicitud a la API para crear una nueva guía, enviando los datos necesarios.

Validación de la Respuesta:
Después de la solicitud, se valida la respuesta de la API, comprobando los códigos de estado HTTP y los datos retornados (por ejemplo, código de remisión de la guía).

Enfoque:

Se definieron actores (usuarios) que realizan tareas sobre la API (como crear una guía), y las respuestas de la API se validaron mediante la comparación de los códigos de estado HTTP y 
los datos retornados. La estructura del proyecto fue organizada para facilitar la extensión y reutilización de pruebas, manteniendo una separación clara entre la lógica de negocio y la 
automatización de pruebas

Consideraciones Finales:
Este proyecto utiliza Playwright y Serenity/JS como herramientas clave para la automatización de pruebas de API. La implementación del patrón Screenplay organiza de manera efectiva las interacciones con la API
