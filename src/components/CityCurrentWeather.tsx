import { currentCityProps } from '../utils/types';

const CurrentCityWeather = ({
	currentCityWeatherState,
	stateName,
}: currentCityProps) => {
	const data = currentCityWeatherState;

	return (
		<>
			{data ? (
				<div className="container mx-auto">
					<h2 className="text-4xl underline">
						{data.name} {stateName}
					</h2>

					<div className="flex flex-row justify-center items-start">
						<img
							src={`http://openweathermap.org/img/wn/${currentCityWeatherState.weather[0].icon}.png`}
						></img>
						<h3 className="text-2xl mt-4">{data.weather[0].description}</h3>
					</div>
					<div className="flex flex-col justify-center items-start mt-6 border border-black rounded-lg p-4">
						<p>
							<span className="font-bold">Temperature:</span>{' '}
							{Math.floor(data.main.temp)}°F
						</p>
						<p>
							<span className="font-bold">Low:</span>{' '}
							{Math.floor(data.main.temp_min)}°F
						</p>
						<p>
							<span className="font-bold">High:</span>{' '}
							{Math.floor(data.main.temp_max)}°F
						</p>
						<p>
							<span className="font-bold">Feels Like:</span>{' '}
							{Math.floor(parseInt(data.main.feels_like))}°F
						</p>
					</div>
				</div>
			) : null}
		</>
	);
};

export default CurrentCityWeather;
