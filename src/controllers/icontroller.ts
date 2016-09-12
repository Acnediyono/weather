export interface IController {
	index(p_request: any, p_response: any);
}

export {WeatherController} from './weather/weather.controller';