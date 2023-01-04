import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CurrentCityWeather from './components/CityCurrentWeather';
import { ICityWeatherData, IFormValues, IListObject } from './utils/interfaces';
const api_key = import.meta.env.VITE_API_KEY;

function App() {
	const initialValues: IFormValues = { cityName: '', stateName: '' };

	let local_storage_array: Array<IListObject> = [];
	console.log(local_storage_array);

	const validationSchema = Yup.object({
		cityName: Yup.string().required('City Name is Required!'),
		stateName: Yup.string().required('State Name is Required!'),
	});

	const [currentCityWeatherState, setCurrentCityWeatherState] =
		useState<ICityWeatherData>();
	let city_weather_data = currentCityWeatherState;

	const [stateNameState, setStateNameState] = useState<string>();

	const submitForm = (values: IFormValues) => {
		try {
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${values.cityName}&appid=${api_key}&units=imperial`
			)
				.then((response) => response.json())
				.then((data) => {
					setCurrentCityWeatherState(data);
				});
			setStateNameState(values.stateName);

			local_storage_array.push({
				city: values.cityName,
				state: values.stateName,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="mobile-s:w-5/6 mobile-s:px-2 mobile-m:w-5/6 laptop:px-8 laptop:w-1/2 flex flex-col justify-center items-center my-4 mx-4 border border-black rounded-lg w-1/4 min-h-full py-12 px-4">
			<div className="w-full max-w-md space-y-8">
				<div>
					<h1 className="mt-6 text-center text-3xl font-bold tracking-tight">
						Weather Dashboard
					</h1>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values, { resetForm, setSubmitting }) => {
						submitForm(values);
						resetForm();
						setSubmitting(false);
					}}
				>
					{({ touched, errors, dirty, isValid }) => (
						<Form>
							<Field
								className={
									errors.cityName && touched.cityName
										? `relative block w-full appearance-none rounded-none rounded-t-md border-2 border-red-600 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
										: touched.cityName && !errors.cityName
										? `relative block w-full appearance-none rounded-none rounded-t-md border-2 border-green-600 dark:border-green-400 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
										: `relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-green-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
								}
								name="cityName"
								id="cityName"
								placeholder="Enter City Here"
							/>
							{touched.cityName && errors.cityName ? (
								<ErrorMessage name="cityName" />
							) : null}
							<Field
								className={
									errors.stateName && touched.stateName
										? `relative block w-full appearance-none rounded-none rounded-t-md border-2 border-red-600 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
										: touched.stateName && !errors.stateName
										? `relative block w-full appearance-none rounded-none rounded-t-md border-2 border-green-600 dark:border-green-400 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
										: `relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm`
								}
								name="stateName"
								id="stateName"
								placeholder="Enter State Here"
							/>

							{touched.stateName && errors.stateName ? (
								<ErrorMessage name="stateName" />
							) : null}

							<button
								type="submit"
								disabled={!dirty && !isValid}
								className={
									!isValid || !dirty
										? `group relative flex w-full justify-center rounded-md border-transparent text-white bg-slate-400 py-2 px-4 text-xl font-medium`
										: `group relative flex w-full justify-center rounded-md border border-transparent hover:border-black text-white bg-[#aa913b] py-2 px-4 text-xl font-medium hover:bg-[#c8ac48] focus:outline-none focus:ring-1 focus:ring-black`
								}
							>
								Submit
							</button>
						</Form>
					)}
				</Formik>

				<CurrentCityWeather
					currentCityWeatherState={city_weather_data as ICityWeatherData}
					stateName={stateNameState as string}
					localStorageList={local_storage_array as Array<IListObject>}
				/>
			</div>
		</div>
	);
}

export default App;
