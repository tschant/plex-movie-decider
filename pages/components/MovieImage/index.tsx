import { Image } from "@chakra-ui/image";

const MovieImage = ({thumb}: {thumb: string}) => {
	return (
		<Image
			src={`${process.env.NEXT_PUBLIC_URL_PREFIX}${thumb}?X-Plex-Token=${process.env.NEXT_PUBLIC_PLEX_TOKEN}`}
			maxH="350"
			maxW="200"></Image>
	)
}

export default MovieImage
