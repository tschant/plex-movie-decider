import { useState } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import {
	Badge,
	Box,
	Grid,
	Heading,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Stack,
	Text,
} from '@chakra-ui/react'

import type {Movies, Movie} from '../../../types/movies'
import GenresBadges from '../GenresBadges'
import MovieImage from '../MovieImage'

const PlexMovies = ({movies}: {movies: Movies}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [selectedMovie, setSelectedMovie] = useState({} as Movie)

	const handleModalOpen = (movie: Movie) => {
		setSelectedMovie(movie)
		onOpen()
	}

	return (
		<Box h="100%">
			<Grid templateColumns="repeat(4, 1fr)" gap={6}>
				{movies && movies.map((movie: Movie) => {
					return (
						<Box maxW="sm" p="3" borderWidth="1px" borderRadius="lg" overflow="hidden" key={movie.key} onClick={() => handleModalOpen(movie)}>
							<Heading as="h2" isTruncated>{movie.title}</Heading>
							<Stack direction="row" paddingY="1">
								<GenresBadges genres={movie.genres}></GenresBadges>
							</Stack>
							<Stack direction="row">
								<Text noOfLines={4}>{movie.summary}</Text>
							</Stack>
						</Box>
					)
				})}
			</Grid>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay></ModalOverlay>
				<ModalContent>
					<ModalHeader>{selectedMovie.title}</ModalHeader>
					<ModalCloseButton></ModalCloseButton>
					<ModalBody>
						<Box>
							<Stack direction="row" paddingBottom="3">
								<Badge colorScheme="green">{selectedMovie.year}</Badge>
								<Badge colorScheme="blue">{selectedMovie.studio}</Badge>
								<GenresBadges genres={selectedMovie.genres}></GenresBadges>
							</Stack>
							<MovieImage thumb={selectedMovie.thumb}></MovieImage>
							<Text>{selectedMovie.summary}</Text>
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default PlexMovies
