import { ICityWeatherData, IListObject } from './interfaces';

export type currentCityProps = {
	currentCityWeatherState: ICityWeatherData;
	stateName: string;
	localStorageList: Array<IListObject>;
};
