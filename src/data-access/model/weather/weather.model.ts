import {IModel} from '../imodel';

export class Weather implements IModel {
	private v_state: string;
	private v_city: string;
	private v_weather: string;
	private v_temp_f: number;//in celcius
	private v_temp_c: number;//in farenheit
	private v_observation_time: number;
	private v_humidity: number;
	private v_icon_url: string;
	private v_date: string;

	public get state() {return this.v_state}
	public get city() {return this.v_city}
	public get weather() {return this.weather}
	public get tempF() {return this.v_temp_f}
	public get tempC() {return this.v_temp_c}
	public get observationTime() {return this.v_observation_time}
	public get humidity() {return this.v_humidity}
	public get iconUrl() {return this.v_icon_url}
	public get date() {return this.v_date}

	public set state(p_state: string) {this.v_state = p_state}
	public set city(p_city: string) {this.v_city = p_city}
	public set weather(p_weather: string) {this.v_weather = p_weather}
	public set tempF(p_temp_f: number) {this.v_temp_f = p_temp_f}
	public set tempC(p_temp_c: number) {this.v_temp_c = p_temp_c}
	public set observationTime(p_observation_time: number) {this.v_observation_time = p_observation_time}
	public set humidity(p_humidity: number) {this.v_humidity = p_humidity}
	public set iconUrl(p_icon_url: string) {this.v_icon_url = p_icon_url}
	public set date(p_date: string) {this.v_date = p_date}
}