import { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { Box, Container, Heading } from '@chakra-ui/layout'
import { Button, Stack } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import PlexMovies from './components/PlexMovies'
import plex from '../lib/plex-api'

import type {Movies} from '../types/movies'
import {useState} from 'react'

const PAGE_SIZE = 24
export const getServerSideProps = async () => {
	const movies: Movies = await plex.fetchAllMovies() || []
	return {
		props: {
			movies,
		}
	}
}

function Home({movies}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const totalPages = movies ? Math.ceil(movies.length / PAGE_SIZE) : 0
	const [page, setPage] = useState(0)

	const handlePageChange = (page: number) => {
		setPage(page)
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Plex Movies</title>
				<meta name="description" content="My Plex Movies" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Heading as="h1"> All Movies! </Heading>
			<Container maxW="container.xl" overflow="hidden">
				<Box maxH="calc(100% - 10px)" overflowY="scroll">
					<PlexMovies movies={movies.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)}></PlexMovies>
				</Box>
			</Container>

			<Stack direction="row" overflowX="scroll" overflowY="hidden" h="20" maxW="100%" alignItems="center">
				{[...Array(totalPages)].map((_, i) => (<Button size="xs" onClick={() => handlePageChange(i)}>{i}</Button>))}
			</Stack>

			<footer className={styles.footer}>
				<a href="/">Home</a>
				<a href="/random">Random Movie</a>
			</footer>
		</div>
	)
}

export default Home

