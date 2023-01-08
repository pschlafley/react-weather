import { useEffect, useState } from 'react';
import { LocalStorageListProps } from '../utils/interfaces';

const LocalStorageList = ({
	citiesSearchState,
	setCurrentCityWeatherState,
	setStateNameState,
	numberOfSearchesState,
}: LocalStorageListProps) => {
	const api_key = import.meta.env.VITE_API_KEY;
	let checkIfIncrement = window.localStorage.getItem('increment');
	if (checkIfIncrement == null) {
		window.localStorage.setItem('increment', `${0}`);
	}

	const [array, setArray] = useState(['']);

	let localStorageItems: Array<string> = [];

	const fetchApiDataFromLocalStorageList = (
		value: string,
		stateName: string
	) => {
		try {
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${api_key}&units=imperial`
			)
				.then((response) => response.json())
				.then((data) => {
					setCurrentCityWeatherState(data);
				});

			setStateNameState(stateName);
		} catch (error) {
			console.log(error);
		}
	};

	const getLocalStorageItems = () => {
		if (numberOfSearchesState > 0) {
			let getIncrement;
			let parsedIncrement;
			if (checkIfIncrement) {
				getIncrement = window.localStorage.getItem('increment');
				getIncrement == null
					? (parsedIncrement = 0)
					: (parsedIncrement = parseInt(getIncrement));
			}
			window.localStorage.setItem(
				`searchedCities${parsedIncrement}`,
				JSON.stringify(citiesSearchState)
			);
			if (parsedIncrement)
				for (let i = 1; i < parsedIncrement + 1; i++) {
					let items = localStorage.getItem(`searchedCities${i}`);

					setArray([...localStorageItems, items!]);
				}
		}
		return (
			<>
				<div className="flex flex-col justify-start items-center">
					{localStorageItems.map((item, i) => {
						const parsedString = JSON.parse(item);
						const splitItem = parsedString.split(' ');

						return (
							<button
								key={i}
								type="submit"
								onClick={() => {
									fetchApiDataFromLocalStorageList(splitItem[0], splitItem[1]);
								}}
							>
								{splitItem[0]}
							</button>
						);
					})}
				</div>
			</>
		);
	};
};

export default LocalStorageList;
