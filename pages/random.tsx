import { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import plex from '../lib/plex-api'

import type {Movie} from '../types/movies'

export const getServerSideProps = async () => {
	let movie: Movie | undefined = await plex.fetchRandomMovie()
	return {
		props: {
			movie
		}
	}
}

// TODO: Add filters for next random movie
function Random({movie}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	if (!movie) return <div>Failed to get Movie</div>

	const imageSrc = `${process.env.NEXT_PUBLIC_URL_PREFIX}${movie.thumb}?X-Plex-Token=${process.env.NEXT_PUBLIC_PLEX_TOKEN}`
	return (
		<div className={styles.container}>
			<Head>
				<title>Random Movie</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					{movie.title}
				</h1>
				<div>
					<span className={styles.badge}>{movie.year}</span>
					<span className={styles.badge}>{movie.studio}</span>
				</div>
				<Image src={imageSrc} alt="movie thumbnail" width="200" height="350"></Image>

				<div className={styles.description}>{movie.summary}</div>

				<div className={styles.grid}>
					{movie.genres.map(genre => (<div className={styles.badge} key={genre}>{genre}</div>))}
				</div>
			</main>

			<footer className={styles.footer}>
				<a href="/">Home</a>
				<a href="/random">Random Movie</a>
			</footer>
		</div>
	)
}

export default Random
