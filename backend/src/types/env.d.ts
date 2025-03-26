declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		MONGODB_USERNAME: string;
		MONGODB_USER_PASSWORD: string;
		MONGODB_URI: string;
		JWT_SECRET: string;
	}
}
