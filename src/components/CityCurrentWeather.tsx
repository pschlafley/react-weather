import { currentCityProps } from '../utils/types';

const CurrentCityWeather = ({
	currentCityWeatherState,
	stateName,
	localStorageList,
}: currentCityProps) => {
	return (
		<div>
			{currentCityWeatherState ? (
				<>
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
