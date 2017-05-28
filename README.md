
Frankify: Es un framework para Node.

Esta basado en express y orientado al desarrollo agil de Api Rest.
en esta version esta desarrollado para trabajar con mongodb, pero se esta trabajado para que la siguiente version tenga soporte para multiples motores de bases de datos

Instalacion:

Frankify se instala como un modulo de forma global con el comando:

$ npm install -g frankify


para crear un proyecto con frankify basta con solo correr el comando:

$ frankify create nombreDelProyecto

este comando creara la estructura del proyecto listo para trabajar.
frankify trae incorporado los modulos mas importantes para comenzar a trabarja en un proyecto node.

modulos pre-instalados:

express
body-parser
method-override
jwt-simple
moment
mongoose

entre otros.


Running

dentro del directorio del proyecto correr el comando:

$ npm start

Ahora puede acceder a su servidor apuntando a un navegador la direccion http://localhost:3000.

License

Copyright (c) 2017 Luis Vilches. Frankify is licensed under the MIT License