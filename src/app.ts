/// <reference path="../typings/main.d.ts" />
'use strict';

import Express = require('express');
import * as Controllers from './controllers/icontroller';

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
v_app.use(Express.static(__dirname + '/../public'));
v_app.set('view engine', 'jade');
v_app.set('views', __dirname + '/views');

let v_weather_controller = new Controllers.WeatherController();

v_app.get('/weather/:sort*?', v_weather_controller.index);
v_app.listen(PORT);

console.info('http://127.0.0.1:' + PORT + '/weather');