import { MovieDTO } from "../dtos/movie-dto";
import { Movie } from "../entities/Movie";
import { IMovieRepository } from "../interfaces/IMovieRepository";

class MovieService {

    constructor(private movieRepository: IMovieRepository) {}

    async create({ user_id, name, description, director }: MovieDTO): Promise<Movie> {

        const checkMovie = await this.movieRepository.findByName(name);

        if (checkMovie) {

            throw new Error('Movie already exists');
        }

        return await this.movieRepository.create({ user_id, name, description, director});
    }

    async edit(id: string, { user_id, name, description, director }: MovieDTO): Promise<Movie> {

        const movie = await this.movieRepository.findById(id);

        if (!movie) {

            throw new Error('Movie not exists');
        }

        return await this.movieRepository.edit(id, { user_id, name, description, director});
    }
}

export default MovieService;
