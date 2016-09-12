import {Weather} from '../../model/weather/weather.model';
import {IDAO} from '../idao';

export interface IWeatherDAO extends IDAO {
	getWeatherInformation(p_city: string,p_country: string): Promise<Weather>;
}

export {Weather} from '../../model/weather/weather.model';