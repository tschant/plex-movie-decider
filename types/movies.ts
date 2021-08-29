export type Movies = Array<Movie> | undefined

export type Movie = {
	key: string,
	title: string,
	thumb: string,
	summary: string,
	studio: string,
	year: string,
	genres: Array<string>
}


