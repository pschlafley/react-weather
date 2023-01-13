import { useEffect, useState } from 'react';
import { LocalStorageListProps } from '../utils/interfaces';
import uniq from 'lodash.uniq';
import { capitalizeFirstLetter } from '../utils/helpers';

const LocalStorageList = ({
	setCurrentCityWeatherState,
	setStateNameState,
	numberOfSearchesState,
	showLocalStorageItemsState,
	setShowLocalStorageItemsState,
}: LocalStorageListProps) => {
	const api_key = import.meta.env.VITE_API_KEY;
	let checkIfIncrement = localStorage.getItem('increment');
	if (checkIfIncrement == null) {
		localStorage.setItem('increment', `${0}`);
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

	useEffect(() => {
		if (showLocalStorageItemsState == true) {
			let getIncrement;
			let parsedIncrement;
			if (checkIfIncrement) {
				getIncrement = localStorage.getItem('increment');
				getIncrement == null
					? (parsedIncrement = 0)
					: (parsedIncrement = parseInt(getIncrement));
			}

			if (parsedIncrement) {
				for (let i = 1; i < parsedIncrement + 1; i++) {
					let items = localStorage.getItem(`searchedCities${i}`);

					if (items == null) continue;

					localStorageItems.push(`${items}`);
				}

				setArray([...localStorageItems]);
			}

			if (
				parsedIncrement != undefined &&
				parsedIncrement >= 4 &&
				localStorageItems.length >= 4
			) {
				let item = parsedIncrement - localStorageItems.length + 1;

				localStorage.removeItem(`searchedCities${item}`);
			}
		}
	}, [numberOfSearchesState, showLocalStorageItemsState]);

	return showLocalStorageItemsState ? (
		<div className="flex flex-col justify-start items-center">
			{uniq(array).map((item: string, i: number) => {
				if (item == '') {
					return null;
				}
				const parsedString = JSON.parse(item);
				const splitItem = parsedString.split(' ');

				return (
					<button
						className="bg-slate-600 text-green-500 rounded-lg py-2 px-3 w-full  m-1 hover:bg-green-500 hover:transition-colors hover:ease-in hover:text-slate-600"
						key={i}
						type="submit"
						onClick={() => {
							fetchApiDataFromLocalStorageList(splitItem[0], splitItem[1]);
						}}
					>
						{capitalizeFirstLetter(splitItem[0])}
					</button>
				);
			})}
		</div>
	) : null;
};

export default LocalStorageList;
