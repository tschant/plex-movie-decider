import { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import PlexMovies from './components/PlexMovies'
import plex from '../lib/plex-api'

import type {Movies} from '../types/movies'

export const getServerSideProps = async () => {
	let movies: Movies = await plex.fetchAllMovies()
	return {
		props: {
			movies
		}
	}
}

function Home({movies}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Plex Movies</title>
				<meta name="description" content="My Plex Movies" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					All Movies!
				</h1>

				<PlexMovies movies={movies}></PlexMovies>
			</main>

			<footer className={styles.footer}>
				<a href="/">Home</a>
				<a href="/random">Random Movie</a>
			</footer>
		</div>
	)
}

export default Home

