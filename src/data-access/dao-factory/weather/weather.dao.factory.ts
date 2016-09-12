import {IDAOFactory} from '../idao.factory';
import {IWeatherDAO} from '../../dao/weather/iweather.dao';
import {WeatherDAOMongoImpl} from '../../dao/weather/weather.mongo.dao';

export class WeatherDAOFactory implements IDAOFactory<IWeatherDAO> {
	getDAO(): IWeatherDAO{
		return new WeatherDAOMongoImpl();
	}
}

export {IWeatherDAO, Weather} from '../../dao/weather/iweather.dao';