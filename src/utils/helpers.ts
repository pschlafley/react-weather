export const capitalizeFirstLetter = (word: string): string => {
	let splitWord: Array<string> = word.split(' ');

	let result: string = '';

	splitWord.map((str: string) => {
		result += str.charAt(0).toUpperCase() + str.slice(1) + ' ';
	});

	return result;
};
