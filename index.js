#!/usr/bin/env node

const cmd = require('node-cmd');
const comand = process.argv.slice(2);
const folder = process.argv.slice(3);
const foldeCapitalize = capitalize(String(folder));
const fs=require('fs');
const chalk = require("chalk");
const appT = require("./templates/app");
const confT = require("./templates/conf");
const routesT = require("./templates/routes");
const requiresT = require("./templates/requires");
const mainT = require("./templates/main");
const path = require("path");

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

switch (comand.slice()[0]) {
    case "new":
        project()
        break;
    case "generate":
        //create();
        switch (comand.slice()[1]){
            case "all":
                all();
                break;
            case "model":
                model();
                break;
            case "controller":
                controller();
                break;
            default:
                console.log("comando no valido");
        }
        break;
    case "g":
        switch (comand.slice()[1]){
            case "all":
                all()
                break;
            case "model":
                model();
                break;
            case "controller":
                controller();
                break;
            default:
                console.log("comando no valido");
        }
        break;
    default:
        console.log("Comando invalido");
}


// Funciones
function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

function project(){
    fs.mkdir(path.join(path.resolve(),String(folder)), err => {
        if(err){
            console.log(err);
        } else {
            console.log(chalk.cyan("-> creating project",chalk.magenta(folder)));
            fs.mkdir(path.join(path.resolve(),String(folder),"controllers"), err => {
                if(err){
                    console.log(err);
                } else {
                    console.log(chalk.cyan("-> creating folder",chalk.magenta("controllers")));
                    fs.mkdir(path.join(path.resolve(),String(folder),"models"), err => {
                        if(err){
                            console.log(err);
                        } else {
                            console.log(chalk.cyan("-> creating folder",chalk.magenta("models")));
                            fs.mkdir(path.join(path.resolve(),String(folder),"public"), err => {
                                if(err){
                                    console.log(err);
                                } else {
                                    console.log(chalk.cyan("-> creating folder",chalk.magenta("public")));
                                    fs.mkdir(path.join(path.resolve(),String(folder),"routes"), err => {
                                        if(err){
                                            console.log(err);
                                        } else {
                                            console.log(chalk.cyan("-> creating folder",chalk.magenta("routes")));
                                            fs.writeFile(path.join(path.resolve(),`${folder}/index.js`),appT,function(error){
                                                if (error)
                                                    console.log(error);
                                                else
                                                    console.log(chalk.cyan('-> create main file =>'),chalk.magenta('/index.js'));
                                                    fs.writeFile(path.join(path.resolve(),`${folder}/semplice.json`),confT,function(error){
                                                        if (error)
                                                            console.log(error);
                                                        else
                                                            console.log(chalk.cyan('-> create configurations file =>'),chalk.magenta('/semplice.json'));
                                                            fs.writeFile(path.join(path.resolve(),`${folder}/routes/routes.js`),routesT,function(error){
                                                                if (error)
                                                                    console.log(error);
                                                                else
                                                                    console.log(chalk.cyan('-> create routes file =>'),chalk.magenta('/routes/routes.js'));
                                                                    fs.writeFile(path.join(path.resolve(),`${folder}/controllers/index.js`),requiresT,function(error){
                                                                        if (error)
                                                                            console.log(error);
                                                                        else
                                                                            console.log(chalk.cyan('-> create controllers require =>'),chalk.magenta('/controllers/index.js'));
                                                                            fs.writeFile(path.join(path.resolve(),`${folder}/controllers/main.js`),mainT,function(error){
                                                                                if (error)
                                                                                console.log(error);
                                                                            else
                                                                                console.log(chalk.cyan('-> create controller main =>'),chalk.magenta('/controllers/main.js'));
                                                                                fs.writeFile(path.join(path.resolve(),`${folder}/models/index.js`),requiresT,function(error){
                                                                                    if (error)
                                                                                        console.log(error);
                                                                                    else
                                                                                        console.log(chalk.cyan('-> create models require =>'),chalk.magenta('/models/index.js'));
                                                                                        fs.writeFile(path.join(path.resolve(),`${folder}/package.json`),`{
"name": "${folder}",
"version": "0.0.1",
"description": "description ${folder}",
"main": "index.js",
"scripts": {
    "start": "sempliceWatch --exec node index.js"
},
"keywords": ["${folder}"],
"author": "",
"license": "ISC",
"dependencies": {
    "semplice": "0.0.2",
    "semplice-watch": "0.0.2"
}
}`,function(error){
                                                                                            if (error)
                                                                                                console.log(error);
                                                                                            else
                                                                                                console.log(chalk.cyan('-> create dependencies file =>'),chalk.magenta('/package.json'));
                                                                                                console.log("\n");
                                                                                                console.log(chalk.magenta('-> install dependecies'));
                                                                                                console.log("\n");
                                                                                                cmd.get(
                                                                                                    `cd ${folder}
                                                                                                    npm install`,function(data, err, stderr){
                                                                                                        if (!err) {
                                                                                                            console.log(chalk.blue("-> project",folder,',created success'));
                                                                                                            console.log(chalk.cyan("\n"));
                                                                                                            console.log(chalk.blue("-> cd",folder,"&& npm start"));
                                                                                                            console.log(chalk.cyan());    
                                                                                                        } else {
                                                                                                            console.log('error', err);
                                                                                                        }
                                                                                                    }
                                                                                                )
                                                                                        });
                                                                                });
                                                                        });
                                                                    });
                                                            });
                                                    });
                                            });
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

function all(){
    let args = folder;
    let name = args[1];
    let model = args.splice(2);
    var modelSchema = new Object();
    var ctrlSchema = new Object();
    var ctrlSchemaUpdate = new Object();
    let aaa = new Array(model[0]);
    let bbb = String(aaa).split(",");

    bbb.map((i,index) => {
        let obj = i.split(":");
        modelSchema[obj[0]] = obj[1];
        ctrlSchema[obj[0]] = `req.body.${obj[0]}`;
        ctrlSchemaUpdate[obj[0]] = `req.body.${obj[0]}`;

    });

    ctrlSchemaUpdate._id = "req.params.id";
    var tmp = `${JSON.stringify(modelSchema)}`;
    var tmp2 = `${JSON.stringify(ctrlSchema)}`;
    var tmp3 = `${JSON.stringify(ctrlSchemaUpdate)}`;
    var ok = tmp.replaceAll("{","{\n").replaceAll('"',"").replaceAll(",",",\n").replaceAll("\n","\n   ").replaceAll("}","\n}");
    var ok2 = tmp2.replaceAll("{","{\n").replaceAll('"',"").replaceAll(",",",\n").replaceAll("\n","\n        ").replaceAll("}","\n    }");
    var ok3 = tmp3.replaceAll("{","{\n").replaceAll('"',"").replaceAll(",",",\n").replaceAll("\n","\n        ").replaceAll("}","\n    }");

    fs.writeFile(path.join(path.resolve(),`controllers/${name}.js`),`const { io } = require("semplice");
const models = require("../models");

exports.find = (req,res) => {
    models.${name}.find({},(err,response) => {
        if(err){
            res.status(500).json({message:err});
        } else {
            res.status(200).json({message:"Find success -> " + response,data:response});
        }
    })
}

exports.create = (req,res) => {
    let ${name} = new models.${name}(${ok2});
    ${name}.save((err,response) => {
        if(err){
            res.status(500).json({message:err});
        } else {
            res.status(200).json({message:"Create success -> " + response,data:response});
            io.sockets.emit("update");
        }
    });
}

exports.update = (req,res) => {
    let ${name} = new models.${name}(${ok3});

    models.${name}.update({_id:req.params.id},${name},(err,response => {
        if(err){
            res.status(500).json({message:err});
        } else {
            res.status(200).json({message:"Update success " + response,data:response});
            io.sockets.emit("update");
        }
    }));
}

exports.delete = (req,res) => {
    models.${name}.remove({_id:req.params.id},(err,response) => {
        if(err){
            res.status(500).json({message:err});
        } else {
            res.status(200).json({message:"Remove succes -> " + response,data:response});
            io.sockets.emit("update");
        }
    })
}`,function(error){
        if (error){
            console.log(error);
        }else{
            console.log(chalk.cyan('-> create controller =>'),chalk.magenta(name));
            fs.writeFile(path.join(path.resolve(),`models/${name}.js`),`const { createModel } = require("semplice");

module.exports = createModel("${name}",${ok});
            `,function(error){
                if (error){
                    console.log(error);
                }else{
                    console.log(chalk.cyan('-> create model =>'),chalk.magenta(name));
                    fs.appendFile(path.join(path.resolve(),`routes/routes.js`), `\n /* Routes for ${name} */ \n
router.get("/${name}", ctrl.${name}.find);
router.get("/${name}", ctrl.${name}.find);
router.post("/${name}", ctrl.${name}.create);
router.put("/${name}/:id", ctrl.${name}.update);
router.delete("/${name}/:id", ctrl.${name}.delete);
                    `, (err) => {
                        if (err) throw err;
                        console.log(chalk.cyan('-> append routes =>'),chalk.magenta(name));
                        setTimeout(() => {
                            console.log(chalk.cyan('-> succes created controller - models - routes for =>'),chalk.magenta(name));
                        },1000)
                      });
                }
            });
        }
    });
}

function model(){

    let args = folder;
    let name = args[1];
    let model = args.splice(2);
    var modelSchema = new Object();
    let aaa = new Array(model[0]);
    let bbb = String(aaa).split(",");

    bbb.map((i,index) => {
        let obj = i.split(":");
        modelSchema[obj[0]] = obj[1];
    });

    var tmp = `${JSON.stringify(modelSchema)}`;
    var ok = tmp.replaceAll("{","{\n").replaceAll('"',"").replaceAll(",",",\n").replaceAll("\n","\n   ").replaceAll("}","\n}");
    
    fs.writeFile(path.join(path.resolve(),`models/${name}.js`),`const { createModel } = require("semplice");\nmodule.exports = createModel("${name}",${ok});
    `,function(error){
        if (error){
            console.log(error);
        }else{
            console.log(chalk.cyan('-> create model =>'),chalk.magenta(name));
        }
    });
};

function controller(){
    let args = folder;
    let name = args[1];
    fs.writeFile(path.join(path.resolve(),`controllers/${name}.js`),`const { io } = require("semplice");
const models = require("../models")
    
exports.find = (req,res) => {
    
}

exports.create = (req,res) => {
    
}

exports.update = (req,res) => {
    
}

exports.delete = (req,res) => {
    
}
    `,function(error){
        if (error){
            console.log(error);
        }else{
            console.log(chalk.cyan('-> create controller =>'),chalk.magenta(name));
        };
    })
}

