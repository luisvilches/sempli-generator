#!/usr/bin/env node

var cmd = require('node-cmd');
var comand = process.argv.slice(2);
var folder = process.argv.slice(3);

switch (comand.slice()[0]) {
  case "create":
        create();
    break;  
  default:
    console.log("Comando invalido");
}


// Funciones

function create(){
    return cmd.get(
        `
            git clone https://github.com/luisvilches/fastify.js.git ${folder}
            cd ${folder}
            rm -r .git
            rm README.md
            npm install express cors jwt-simple method-override moment mongoose body-parser --save
        `,
        function(data, err, stderr){
            if (!err) {console.log(`\n\nproyecto creado con exito! \n\nComandos para iniar el proyecto: \n\n cd ${folder} \n npm start \n`)} else {console.log('error', err)}
        }
    );
};