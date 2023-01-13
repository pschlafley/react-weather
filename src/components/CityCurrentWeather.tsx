import { currentCityProps } from '../utils/types';
import { capitalizeFirstLetter } from '../utils/helpers';

const CurrentCityWeather = ({
	currentCityWeatherState,
	stateName,
}: currentCityProps) => {
	const data = currentCityWeatherState;

	return (
		<>
			{data ? (
				<div>
					<h2 className='text-3xl underline"'>Today's Weather</h2>
					<div className="flex flex-col justify-center items-center mt-6 border border-black rounded-lg p-4">
						<div className="flex flex-col justify-center items-center">
							<h2 className="text-2xl underline">
								{capitalizeFirstLetter(`${data.name} ${stateName}`)}
							</h2>
							<img
								className="bg-slate-500 rounded-md mt-2"
								src={`http://openweathermap.org/img/wn/${currentCityWeatherState.weather[0].icon}.png`}
							></img>
							<h3 className="text-2xl mb-4">
								{capitalizeFirstLetter(data.weather[0].description)}
							</h3>
						</div>
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
