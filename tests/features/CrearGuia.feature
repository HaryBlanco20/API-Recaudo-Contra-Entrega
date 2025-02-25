Feature: Validación de la API de creación de guías

  Scenario: Validar la creación de una guía con datos válidos
    Given que soy un usuario autenticado en el sistema de guías
    When envío una solicitud con todos los campos obligatorios correctamente diligenciados
    Then el sistema debe aceptar la solicitud y responder con un código de estado 200

  Scenario: Validar error cuando referenciaRecaudo está vacío
    Given que soy un usuario autenticado en el sistema de guías
    When envío una solicitud con “Referencia recaudo” vacío
    Then el sistema debe de rechazar la solicitud con un código de estado 400

  Scenario: Validar error cuando los campos obligatorios están vacíos
    Given que soy un usuario autenticado en el sistema de guías
    When envío una solicitud sin ingresar datos en los campos obligatorios “Valor a recaudar y Referencia recaudo”
    Then el sistema rechaza la solicitud con un código de estado 400
