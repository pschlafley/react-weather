import React, { useState } from 'react';
import './App.css';
const api_key = import.meta.env.VITE_API_KEY;

interface IWeatherInfo {
	description: string;
	icon: string;
}

interface IWeatherMainInfo {
	temp: number;
	feels_like: string;
	humidity: number;
	temp_max: number;
	temp_min: number;
}

interface ICityWeatherData {
	weather: Array<IWeatherInfo>;
	name: string;
	sys: object;
	timezone: number;
	visibility: number;
	wind: object;
	clouds: object;
	main: IWeatherMainInfo;
}

interface IFormInput {
	cityName: string;
	stateName: string;
}

interface ICityInfo {
	city: string;
	state: string;
}

function App() {
	const [formInput, setFormInput] = useState<IFormInput>({
		cityName: '',
		stateName: '',
	});
	const [getCityName, setCityName] = useState<ICityInfo>({
		city: '',
		state: '',
	});
	const [getCityWeatherData, setCityWeatherData] = useState<ICityWeatherData>();

	const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
		event.preventDefault();
		let { name, value } = event.target as HTMLInputElement;
		setFormInput({
			...formInput,
			[name]: value,
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		setCityName({
			...getCityName,
			city: formInput.cityName,
			state: formInput.stateName,
		});

		try {
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${formInput.cityName}&appid=${api_key}&units=imperial`
			)
				.then((response) => response.json())
				.then((data) => {
					setCityWeatherData(data);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<label htmlFor="cityName">Enter City:</label>
				<input name="cityName" type="text" onChange={handleChange} />
				<input name="stateName" type="text" onChange={handleChange} />
				<button type="submit">Submit</button>
			</form>

			<h2>Current City:</h2>
			{getCityWeatherData !== undefined ? (
				<>
					<h3>
						{getCityName.city} {getCityName.state}
					</h3>

					<div>
						<h2>Today's Weather</h2>
						<ul>
							<li>Description: {getCityWeatherData.weather[0].description}</li>
							<img
								src={`http://openweathermap.org/img/wn/${getCityWeatherData.weather[0].icon}.png`}
							></img>
						</ul>
					</div>
				</>
			) : (
				<h3>Invalid Input</h3>
			)}
		</div>
	);
}

export default App;
