/// <reference path="../typings/main.d.ts" />
'use strict';

import * as Controllers from './controllers/icontroller';
import Express = require('express');

let v_env = process.env.NODE_ENV || "development";
let BodyParser = require('body-parser');
let Path = require('path');
let Config = require(Path.join(__dirname, '.', 'config', 'config.json'))[v_env];

const PORT = process.env.PORT || Config.port || 3000;

// initialize express application
let v_app = Express();
let v_router = Express.Router();
v_app.use(BodyParser.urlencoded({extended: true}));
v_app.use(BodyParser.json());

let v_account_controller: Controllers.AccountController = new Controllers.AccountController();

v_app.use('/service',v_router);
v_app.listen(PORT);

console.info('http://127.0.0.1:' + PORT + '/service');
if(v_env === 'development') {
	console.log('http://127.0.0.1:' + PORT + '/testing');
}