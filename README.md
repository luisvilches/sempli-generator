Semplice is a framework based on expressjs oriented to api restful, semplice allows you to create developments quickly. Semplice incorporates several functionalities and integrated modules to facilitate the developer. Some of the functionalities and modules that are currently integrated:


sending of mails
sockets < socket.io >
uploads of files
authentication by tokens
GeoSchema

among many more.

Get Started

Add Semplice as a global dependency.

$ sudo npm install -g semplice-cli


Usage

The sempli generator will take care of, among other things,
create a new project, generate models and controllers.

create new project

semplice allows you to create projects quickly and easily

$ semplice new < name-project >
example: 
$ semplice new blog


generate new controller

semplice allows you to create controllers quickly and easily

$ semplice generate controller < name-controller >
example: 
$ semplice generate controller main 
or 
$ semplice g controller main


generate new model

semplice allows you to create models quickly and easily

$ semplice generate model < name-model > < modelSchema >
example: 
$ semplice generate model user name:String,age:Number 
or 
$ semplice g model user name:String,age:Number


generate all

semplice allows you to create a model, its controller and add the basic routes quickly and easily

$ semplice generate model < name-all > < modelSchema >
example: 
$ semplice generate all post title:String,content:String 
or 
$ semplice g all post title:String,content:String