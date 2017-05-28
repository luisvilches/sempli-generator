#!/usr/bin/env node

var cmd = require('node-cmd');
var comand = process.argv.slice(2);
var folder = process.argv.slice(3);
var fs=require('fs');

switch (comand.slice()[0]) {
    case "init":
            init();
        break;
    case "create":
            create();
        break;  
    default:
        console.log("Comando invalido");
}


// Funciones

function init(){
    return cmd.get(
        `
            git clone https://github.com/luisvilches/Sempli.git ${folder}
            cd ${folder}
            rm -r .git
            rm README.md
            npm install
        `,
        function(data, err, stderr){
            if (!err) {console.log(`\n\nproyecto creado con exito! \n\nComandos para iniar el proyecto: \n\n cd ${folder} \n si tiene instalado nodemon puede utilizar: \n npm run sempli \n si no puede usar: \n npm start \n`)} else {console.log('error', err)}
        }
    );
};


var modelsTemplate = `const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let ${folder} = new Schema({
	// schema del modelo
})

module.exports = mongoose.model('${folder}', ${folder})
`

var controllersTemplate = `const sempli = require('../sempli');
const Model = require('.././models/${folder}');


exports.find = (req,res,next) => {
    // escribe tu funcion para buscar los registros
}
exports.create = (req,res) => {
	// escribe tu funcion para crear registros
}
exports.update = (req,res) => {
	// escribe tu funcion para actualizar registros
}
exports.delete = (req,res) => {
	// escribe tu funcion para eliminar registros
}
exports.findOne = (req,res) => {
	// escribe tu funcion para buscar un registros
}
exports.findById = (req,res) => {
	// escribe tu funcion para buscar un registros por id
}`



function create(){
    fs.writeFile(`./.${folder}`,modelsTemplate,function(error){
        if (error){
            console.log(error);
        }else{
            console.log('Un momento por favor...');
            model();
            controller(); 
        }
    });
}

function model(){
    fs.writeFile(`./models/${folder}.js`,modelsTemplate,function(error){
        if (error){
            console.log(error);
        }else{
            console.log('Modelo creado con exito!');
        }
    });
}

function controller(){
    fs.writeFile(`./controllers/${folder}.js`,controllersTemplate,function(error){
        if (error){
            console.log(error);
        }else{
            console.log('Controlador creado con exito!');
        }
    });
}

