import { Dispatch } from 'react';

export interface IWeatherInfo {
	description: string;
	icon: string;
}

export interface IWeatherMainInfo {
	temp: number;
	feels_like: string;
	humidity: number;
	temp_max: number;
	temp_min: number;
}

export interface ICityWeatherData {
	weather: Array<IWeatherInfo>;
	name: string;
	sys: object;
	timezone: number;
	visibility: number;
	wind: object;
	clouds: object;
	main: IWeatherMainInfo;
}

export interface IFormInput {
	cityName: string;
	stateName: string;
}

export interface ICityInfo {
	city: string;
	state: string;
}

export interface IState {
	formInput: IFormInput;
	locationInfo: ICityInfo;
	currentWeatherData: ICityWeatherData;
}

export interface IFormValues {
	cityName: string;
	stateName: string;
}

export interface svgObjects {
	Clouds: Array<string>;
	PartlyCloudy: Array<string>;
	Misty: Array<string>;
}

export interface LocalStorageListProps {
	citiesSearchState: string;
	setCurrentCityWeatherState: Dispatch<ICityWeatherData>;
	setStateNameState: Dispatch<string>;
	numberOfSearchesState: number;
}
