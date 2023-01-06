import { currentCityProps } from '../utils/types';
import { svgObjects } from '../utils/interfaces';
import { CloudSvg, PartlyCloudy, StaryNight } from './svg/index';

const CurrentCityWeather = ({
	currentCityWeatherState,
	stateName,
	localStorageList,
}: currentCityProps) => {
	const SVG_Display_Conditions: svgObjects = {
		Clouds: ['clouds', 'broken clouds', 'overcast clouds'],
		PartlyCloudy: ['partly cloudy'],
		Misty: ['misty'],
		StaryNight: ['clear sky', 'few clouds'],
	};

	return (
		<div className="flex flex-col justify-center items-center">
			{currentCityWeatherState ? (
				<>
					{SVG_Display_Conditions.Clouds.includes(
						currentCityWeatherState.weather[0].description
					) ? (
						<CloudSvg />
					) : SVG_Display_Conditions.StaryNight.includes(
							currentCityWeatherState.weather[0].description
					  ) ? (
						<StaryNight />
					) : null}
					<h2>Current City:</h2>
					{currentCityWeatherState.name} {stateName}
					<div>
						<h2>Today's Weather</h2>
						<ul>
							<li>
								Description: {currentCityWeatherState.weather[0].description}
							</li>
							<img
								src={`http://openweathermap.org/img/wn/${currentCityWeatherState.weather[0].icon}.png`}
							></img>
						</ul>
					</div>
				</>
			) : null}
		</div>
	);
};

export default CurrentCityWeather;
