import { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { Badge, Container, Heading, Image, Stack, Text } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import plex from '../lib/plex-api'

import GenresBadges from './components/GenresBadges'
import MovieImage from './components/MovieImage'
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

	return (
		<div className={styles.container}>
			<Head>
				<title>Random Movie</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container maxW="container.md" overflow="hidden" centerContent h="100%">
				<Heading as="h1">
					{movie.title}
				</Heading>

				<Stack direction="row">
					<Badge colorScheme="green">{movie.year}</Badge>
					<Badge colorScheme="blue">{movie.studio}</Badge>
					<GenresBadges genres={movie.genres}></GenresBadges>
				</Stack>
				<MovieImage thumb={movie.thumb}></MovieImage>

				<Text>{movie.summary}</Text>
			</Container>

			<footer className={styles.footer}>
				<a href="/">Home</a>
				<a href="/random">Random Movie</a>
			</footer>
		</div>
	)
}

export default Random
