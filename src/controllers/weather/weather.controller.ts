import {IController} from '../icontroller';
import {Utility} from '../../services/utility.service';
import {Logger} from '../../services/logger.service';
import {WeatherDAOFactory, Weather, IWeatherDAO} from '../../data-access/dao-factory/weather/weather.dao.factory';

export class WeatherController implements IController {

	public async index(p_request: any, p_response: any) {
		//default sort parameter is ascending
		let v_weather_dao: IWeatherDAO = new WeatherDAOFactory().getDAO();
		let v_asc = p_request.params.sort && p_request.params.sort === 'desc' ? false : true; 
		let v_datas = [
			{city: 'Omaha', state: 'NE'},
			{city: 'NY', state: 'New_York'},
			{city: 'Raffles_Place', state: 'Singapore'},
			{city: 'Saporro', state: 'Japan'}
		];
		let v_page_data = {
			title : 'Weather Information',
			weather_data : [],
			sort : v_asc
		};
		for(let i = 0 ; i < v_datas.length ; i++) {
			Logger.log('retrieve data for city : ' + v_datas[i].city + ' and state : ' + v_datas[i].state);
			v_page_data.weather_data.push(await v_weather_dao.getWeatherInformation(v_datas[i].city,v_datas[i].state));
		}
		v_page_data.weather_data = Utility.sort(v_page_data.weather_data, 'city', v_asc);
		p_response.render('index', v_page_data);
	}	
}