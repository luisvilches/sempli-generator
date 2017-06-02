#!/usr/bin/env node

var cmd = require('node-cmd');
var comand = process.argv.slice(2);
var folder = process.argv.slice(3);
var foldeCapitalize = capitalize(String(folder));
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
function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

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
            if (!err) {console.log(`\n\nproyecto creado con exito! \n\nComandos para iniar el proyecto: \n\n cd ${folder} \n\n si tiene instalado nodemon puede utilizar: \n\n npm run sempli \n\n si no puede usar: \n\n npm start \n\n`)} else {console.log('error', err)}
        }
    );
};


var modelsTemplate = `const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let ${folder} = new Schema({
	// schema del modelo
    name: String,
    description: String
})

module.exports = mongoose.model('${folder}',${folder});
`

var controllersTemplate = `const ${foldeCapitalize} = require('.././models/${folder}');


exports.${folder}Find = (req,res,next) => {
    // funcion para buscar los registros
    ${foldeCapitalize}.find((err,response) => {
        if(err) {
            res.status(500).json({
                state: 'error',
                message: err
            })
        }else{
            res.status(200).json({
                state: 'success',
                message: 'Operacion exitosa',
                data: response
            })
        }
    })

}
exports.${folder}FindById = (req,res) => {
	// funcion para buscar un registros por id
    ${foldeCapitalize}.findById({_id: req.params.id},(err,response) => {
        if(err) {
            res.status(500).json({
                state: 'error',
                message: err
            })
        }else{
            res.status(200).json({
                state: 'success',
                message: 'Operacion exitosa',
                data: response
            })
        }
    })
}
exports.${folder}Create = (req,res) => {
	// funcion para crear registros
    let data = new ${foldeCapitalize}({
        name: req.body.name,
        description: req.body.description
    })

    data.save((err,response) => {
        if(err) {
            res.status(500).json({
                state: 'error',
                message: err
            })
        }else{
            res.status(200).json({
                state: 'success',
                message: 'Operacion exitosa',
                data: response
            })
        }
    })
}
exports.${folder}Update = (req,res) => {
	// funcion para actualizar registros

    let data = new ${foldeCapitalize}({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description
    })

    ${foldeCapitalize}.update({_id:req.params.id},data,(err,response) => {
        if(err) {
            res.status(500).json({
                state: 'error',
                message: err
            })
        }else{
            res.status(200).json({
                state: 'success',
                message: 'Operacion exitosa',
                data: response
            })
        }
    })

}
exports.${folder}Delete = (req,res) => {
	// escribe tu funcion para eliminar registros
     ${foldeCapitalize}.remove({_id:req.params.id},(err,response) => {
        if(err) {
            res.status(500).json({
                state: 'error',
                message: err
            })
        }else{
            res.status(200).json({
                state: 'success',
                message: 'Operacion exitosa',
                data: response
            })
        }
    })
}
`

var routeTemplate = `

//rutas para ${folder}
router.get('/${folder}', controller.${folder}.${folder}Find)
router.get('/${folder}/id/:id', controller.${folder}.${folder}FindById)
router.post('/${folder}', controller.${folder}.${folder}Create)
router.put('/${folder}/:id', controller.${folder}.${folder}Update)
router.delete('/${folder}/:id', controller.${folder}.${folder}Delete)

`

function create(){
    fs.writeFile(`./log`,modelsTemplate,function(error){
        if (error){
            console.log(error);
        }else{
            console.log('Un momento por favor...');
            model();
            controller(); 
            route();
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

function route(){
    fs.appendFile('./routes/public.js',routeTemplate, function (err) {
        if (err) throw err;
        console.log('Rutas creadas');
    });

}
