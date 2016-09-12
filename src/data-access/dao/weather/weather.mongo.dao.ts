import {IWeatherDAO} from './iweather.dao';
import {Weather} from '../../model/weather/weather.model';
import {MongoDBService} from '../../../services/mongodb.service';
import {WeatherService} from '../../../services/weather.service';
import {Logger} from '../../../services/logger.service';

export {IWeatherDAO} from './iweather.dao';

export class WeatherDAOMongoImpl implements IWeatherDAO {
	private v_monggo_db_service: MongoDBService;
	private v_weather_svc: WeatherService;

	constructor() {
		this.v_monggo_db_service = new MongoDBService();
		this.v_monggo_db_service.initialize();
		this.v_weather_svc = new WeatherService();
	}

	async insert(p_weather_data: Weather): Promise<Weather> {
		await this.v_monggo_db_service.connect();
		let v_current = this;
		return new Promise<Weather>(function(p_resolve, p_reject) {
			let v_col = v_current.v_monggo_db_service.getCollection('weather');
			v_col.updateOne(
				{v_city:p_weather_data.city,v_state:p_weather_data.state},
				{
					v_city: p_weather_data.city,
					v_state: p_weather_data.state,
					v_humidity : p_weather_data.humidity,
					v_temp_c : p_weather_data.tempC,
					v_temp_f : p_weather_data.tempF,
					v_observation_time : p_weather_data.observationTime,
					v_icon_url : p_weather_data.iconUrl,
					v_date : p_weather_data.date
				},
				{ upsert: true, w: 1 }).then(function(p_result) {
					v_current.v_monggo_db_service.close();
					p_resolve(p_result);
				});
		});
	}

	update(p_weather_data: Weather) {

	}

	delete(p_weather_data: Weather) {

	}

	async getWeatherFromDB(p_city: string, p_timestamp: string): Promise<Weather> {
		await this.v_monggo_db_service.connect();
		let v_current = this;
		return new Promise<Weather>(function(p_resolve, p_reject) {
			let v_col = v_current.v_monggo_db_service.getCollection('weather');
			let v_rec = v_col.find({v_city:p_city,v_date:p_timestamp});
			v_rec.each(function(err, doc) {
				if(err || !doc || doc.length === 0) {
					p_reject('failed to retrieve weather data from DB');
				}else {
					let v_weather_data: Weather = new Weather();
					v_weather_data.city = doc.v_city;
					v_weather_data.state = doc.v_state;
					v_weather_data.humidity = doc.v_humidity;
					v_weather_data.tempC = doc.v_temp_c;
					v_weather_data.tempF = doc.v_temp_f;
					v_weather_data.observationTime = doc.v_observation_time;
					v_weather_data.iconUrl = doc.v_icon_url;
					v_weather_data.weather = doc.weather;
					v_weather_data.date = doc.date;
					p_resolve(v_weather_data);
				}
			});
		});
	}

	// function to retrieve weather information
	// if data exists in db return the data
	// if data not exists in db call request to 3rd party API
	// and insert into db for caching
	async getWeatherInformation(p_city: string,p_state: string): Promise<Weather> {
		let v_weather_data: Weather;
		let v_today = new Date(Date.now());
		// cache will be updated every hour
		let v_timestamp = v_today.getFullYear() + '' +  v_today.getMonth() + '' + 	v_today.getDate() + '' + v_today.getHours();
		try {
			// try to get from cache
			Logger.log('Try to retrieve data from DB cache');
			v_weather_data = await this.getWeatherFromDB(p_city, v_timestamp);
		}catch(p_err) {
			// failed to retrieve from cache, retrieve data from 3rd party API
			Logger.log(p_err);
			Logger.log('Try retrieve data from 3rd party API');
			v_weather_data = await this.v_weather_svc.getWeatherInformation(p_state,p_city);
			v_weather_data.date = v_timestamp;
			try {
				await this.insert(v_weather_data);
			}catch(p_err) {
				Logger.log(p_err);
			}
		}
		return v_weather_data;
	}
}