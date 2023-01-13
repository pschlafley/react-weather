import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CurrentCityWeather from './components/CityCurrentWeather';
import { ICityWeatherData, IFormValues } from './utils/interfaces';
import LocalStorageList from './components/LocalStorageList';
const api_key = import.meta.env.VITE_API_KEY;
const four_day_key = import.meta.env.VITE_FOUR_DAY_FORECAST_KEY;

function App() {
	useEffect(() => {
		window.addEventListener('beforeunload', (e) => {
			e.preventDefault();
			setShowLocalStorageItemsState(false);
		});
	}, []);

	const initialValues: IFormValues = { cityName: '', stateName: '' };

	const validationSchema = Yup.object({
		cityName: Yup.string().required('City Name is Required!'),
		stateName: Yup.string().required('State Name is Required!'),
	});

	const [currentCityWeatherState, setCurrentCityWeatherState] =
		useState<ICityWeatherData>();

	let city_weather_data = currentCityWeatherState;

	const [stateNameState, setStateNameState] = useState<string>();

	const [numberOfSearchesState, setNumberOfSearchesState] = useState<number>(0);

	const [showLocalStorageItemsState, setShowLocalStorageItemsState] =
		useState<boolean>(true);

	const getTodaysWeather = async (cityName: string) => {
		return await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=imperial`
		)
			.then((response) => response.json())
			.then((data) => {
				setCurrentCityWeatherState(data);
			});
	};

	const getFourDayForecast = async (cityName: string) => {
		return await fetch(
			`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${cityName}&appid=${four_day_key}`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	};

	const submitForm = async (values: IFormValues) => {
		try {
			let getIncrement = localStorage.getItem('increment');
			if (getIncrement != null) {
				let parsedIncrement = parseInt(getIncrement);
				parsedIncrement += 1;
				localStorage.setItem('increment', `${parsedIncrement}`);
				localStorage.setItem(
					`searchedCities${parsedIncrement}`,
					JSON.stringify(`${values.cityName} ${values.stateName}`)
				);
			}

			await getTodaysWeather(values.cityName);
			await getFourDayForecast(values.cityName);

			setStateNameState(values.stateName);
			setNumberOfSearchesState(numberOfSearchesState + 1);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="mobile-s:flex mobile-s:flex-col mobile-s:justify-center mobile-s:items-center mobile-s:w-full mobile-s:my-4 tablet:flex-row tablet:w-2/3 tablet:justify-evenly tablet:items-center flex flex-row justify-between items-center w-1/2 h-auto">
			<div className="mobile-s:w-5/6 mobile-s:px-2 mobile-m:w-5/6 laptop:px-8 laptop:w-1/2 flex flex-col justify-center items-center my-4 mx-4 border border-black rounded-lg w-1/4 min-h-full py-12 px-4">
				<div className="w-full max-w-md space-y-8 h-[350px]">
					<div>
						<h1 className="mt-6 text-center text-3xl font-bold tracking-tight">
							Weather Dashboard
						</h1>
					</div>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values, { resetForm }) => {
							submitForm(values);
							resetForm();
						}}
					>
						{({ touched, errors, dirty, isValid }) => (
							<Form>
								<Field
									className={
										errors.cityName && touched.cityName
											? `relative block w-full appearance-none rounded-lg border-2 border-red-600 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
											: touched.stateName && !errors.stateName
											? `relative block w-full appearance-none rounded-lg border-2 border-green-600 dark:border-green-400 mt-2 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
											: `relative block w-full appearance-none rounded-lg border border-gray-300 mt-2 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
									}
									name="cityName"
									id="cityName"
									placeholder="Enter City Here"
								/>

								<Field
									className={
										errors.stateName && touched.stateName
											? `relative block w-full appearance-none rounded-lg border-2 border-red-600 mt-2 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
											: touched.stateName && !errors.stateName
											? `relative block w-full appearance-none rounded-lg border-2 border-green-600 dark:border-green-400 mt-2 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
											: `relative block w-full appearance-none rounded-lg border border-gray-300 mt-2 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
									}
									name="stateName"
									id="stateName"
									placeholder="Enter State Here"
								/>

								<button
									type="submit"
									disabled={!dirty && !isValid}
									className={
										!isValid || !dirty
											? `group relative flex w-full justify-center rounded-md border-transparent text-green-300 bg-slate-400 mt-2 py-2 px-4 text-xl font-medium`
											: `group relative flex w-full justify-center rounded-md border border-transparent hover:border-black text-white bg-green-500 mt-2 py-2 px-4 text-xl font-medium hover:bg-slate-600 hover:text-green-400 focus:outline-none focus:ring-1 focus:ring-black`
									}
								>
									Submit
								</button>
							</Form>
						)}
					</Formik>
				</div>
				<LocalStorageList
					setCurrentCityWeatherState={setCurrentCityWeatherState}
					setStateNameState={setStateNameState}
					numberOfSearchesState={numberOfSearchesState}
					showLocalStorageItemsState={showLocalStorageItemsState}
					setShowLocalStorageItemsState={setShowLocalStorageItemsState}
				/>
			</div>
			<div>
				<CurrentCityWeather
					currentCityWeatherState={city_weather_data as ICityWeatherData}
					stateName={stateNameState as string}
				/>
			</div>
		</section>
	);
}

export default App;
