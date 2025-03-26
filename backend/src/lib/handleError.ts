export const handleError = <T>(error: T, component: string) => {
	if (error instanceof Error) {
		console.error(`Ошибка в ${component}: ${error.message}`);
	} else {
		console.error(`Ошибка в ${component}: ${error}`);
	}
};
