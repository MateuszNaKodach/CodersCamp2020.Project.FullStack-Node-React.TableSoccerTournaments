Zrobic w Application
ApplicationModule//co powinien miec.
Te moduly brac i laczyc ze soba.
Rejestrowac query handlers,
command handlers,
event handlers.

Zrobic testy, ze moduly moga sie komunikowac tylko
poprzez eventy i komendy. To jest uproszczenie!!! Ze moga zalezec od siebie tutaj.


TODO:
- Logging
- Docker with MongoDB
- Docker with whole app
- Embedded MongoDB
- Email Server docker?

Co zostało zrobione
- logowanie
- express-openapi-validator

Example usage when using Jest and SuperTest: https://www.npmjs.com/package/express-openapi-validate
https://medium.com/wolox/documenting-a-nodejs-rest-api-with-openapi-3-swagger-5deee9f50420
https://kirtikau.medium.com/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce
https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/


https://medium.com/wolox/documenting-a-nodejs-rest-api-with-openapi-3-swagger-5deee9f50420



https://www.npmjs.com/package/ts-event-bus


restapi - moze byc per moduł albo zupełnie osobno - wtedy laczy rozne moduły.
A moze shared dac na taki poziom jak modules? 
I restapi bedzie dla kazdego w presentation

Co z infrastructure? Czy to tez nie powinno byc jak restapi - oddzielone!?!?
