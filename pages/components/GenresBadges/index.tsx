import {Badge, Stack} from '@chakra-ui/react'

const GenresBadges = ({genres}: {genres: string[]}) => {
	if (!genres) return <Badge>N/A</Badge>

	return <Stack direction="row">
		{genres.map((genre, index) => (<Badge colorScheme="red" key={index}>{genre}</Badge>))}
	</Stack>
}

export default GenresBadges
