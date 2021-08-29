import xml2js from 'xml2js'
import type {Movie} from '../types/movies'

const URL_PREFIX = process.env.NEXT_PUBLIC_URL_PREFIX

function xmlToJSON<T>(str: string) {
	return new Promise((resolve, reject) => {
		xml2js.parseString(str, {}, (err: any, jsonObj: T) => {
			if (err) {
				return reject(err);
			}

			resolve(jsonObj);
		});
	});
}

async function fetchHelper(url: string) {
	try {
		const res = await fetch(URL_PREFIX + url + `?X-Plex-Token=${process.env.NEXT_PUBLIC_PLEX_TOKEN}`, {})
		return res.ok ? res : null
	} catch (err) {
		console.error(err)
	}

	return null
}

async function fetchHelperXml(url: string) {
	const res = await fetchHelper(url)
	return res ? xmlToJSON(await res.text()) : null
}

function transformMovies<T>(jsonObj: any) {
	if (!jsonObj) {
		return undefined
	}

	return jsonObj.MediaContainer.Video.map((video: {'$': Movie, Genre: Array<any>}) => {
		const retVideo = video.$ as Movie
		let genres = []
		if (video.Genre) {
			genres = video.Genre.map(genre => genre.$.tag)
		}
		retVideo.genres = genres
		return retVideo
	}) as T
}

const fetchAllMovies = () => fetchHelperXml('/library/sections/1/all').then(obj => transformMovies<Array<Movie>>(obj))
const fetchRandomMovie = async () => {
	const allMovies = await fetchAllMovies()
	if (!allMovies) {
		return undefined
	}

	const randomNumber = Math.floor(Math.random() * allMovies.length)
	return allMovies[randomNumber]
}
export default {
	fetchAllMovies,
	fetchRandomMovie 
}
