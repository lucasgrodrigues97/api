import { MovieDTO } from "../dtos/movie-dto";
import { Movie } from "../entities/Movie";

export interface IMovieRepository {
    create(user: MovieDTO): Promise<Movie>;
    edit(id: string, user: MovieDTO): Promise<Movie>;
    findById(id: string): Promise<Movie|undefined>;
    findByName(email: string): Promise<Movie|undefined>;
    getAll(user_id: string): Promise<Movie[]>;
    getById(id: string, user_id: string): Promise<Movie|undefined>;
}
