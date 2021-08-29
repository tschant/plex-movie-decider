import styles from '../../../styles/Home.module.css'

import type {Movies, Movie} from '../../../types/movies'
// TODO: Add hover/click to show details
const PlexMovies = ({movies}: {movies: Movies}) => {
	return (
		<div className={styles.grid}>
			{movies && movies.map((movie: Movie) => {
				return (
					<div className={styles.card} key={movie.key}>
						<h2>{movie.title}</h2>
						<p>{movie.summary}</p>
					</div>
				)
			})}
		</div>
	)
}

export default PlexMovies
