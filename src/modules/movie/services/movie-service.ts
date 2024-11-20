import { MovieDTO } from "../dtos/movie-dto";
import { Movie } from "../entities/Movie";
import { IMovieRepository } from "../interfaces/IMovieRepository";

class MovieService {

    constructor(private movieRepository: IMovieRepository) {}

    async create({ user_id, name, description, director }: MovieDTO): Promise<Movie> {

        const checkMovie = await this.movieRepository.findByName(name);

        if (checkMovie) {

            throw new Error('Movie already existis');
        }

        return await this.movieRepository.create({ user_id, name, description, director});
    }
}

export default MovieService;
