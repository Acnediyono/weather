/// <reference path="../../typings/main.d.ts" />

import {Weather} from '../data-access/model/weather/weather.model';
import {Logger} from './logger.service';
/*
	Class used to retrieve weather information from 3rd party API
	www.wunderground.com 
*/

export class WeatherService {
	private v_key: string;
	constructor() {
		// load API Key from configuration
		let v_env = process.env.NODE_ENV || "development";
		let Path = require('path');
		let Config = require(Path.join(__dirname, '..', 'config', 'config.json'))[v_env];
		this.v_key = Config.key;
	}

	public getWeatherInformation(p_state: string, p_city: string): Promise<Weather> {
		let Request = require('request');
		let v_weather_info = new Weather();
		v_weather_info.city = p_city;
		v_weather_info.state = p_state;
		let v_url = 'http://api.wunderground.com/api/'+this.v_key+'/conditions/q/'+p_city+'/'+p_state+'.json';
		Logger.log('Start request to ' + v_url);
		// request to http://api.wunderground.com/
		return new Promise <Weather>(function(p_resolve, p_reject){
			Request(v_url, function(p_error, p_response, p_body) {
				if(!p_error && p_response.statusCode === 200) {
					try {
						let v_response = JSON.parse(p_body)['current_observation'];
						v_weather_info.humidity = v_response.relative_humidity;
						v_weather_info.tempC = v_response.temp_c;
						v_weather_info.tempF = v_response.temp_f;
						v_weather_info.observationTime = v_response.observation_epoch;
						v_weather_info.iconUrl = v_response.icon_url;
						v_weather_info.weather = v_response.weather;
					}catch(p_err) {
						Logger.log('Error occured while request : ' + v_url + ' Error : ' + p_err);
					}
					p_resolve(v_weather_info);
				}else {
					p_resolve(v_weather_info)
				}
			});
		});
	}	
}