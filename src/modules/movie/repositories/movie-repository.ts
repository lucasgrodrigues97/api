import { randomUUID } from "crypto";
import { knex } from '../../../db';
import { MovieDTO } from "../dtos/movie-dto";
import { IMovieRepository } from "../interfaces/IMovieRepository";
import { Movie } from "../entities/Movie";

class MovieRepository implements IMovieRepository {

    async create({ user_id, name, description, director }: MovieDTO): Promise<Movie> {

        const movie = await knex('movies').insert({
            id: randomUUID(),
            user_id,
            name,
            description,
            director
        }).returning(['id', 'name', 'description', 'director']);

        return movie[0] as Movie;
    }

    async edit(id: string, { user_id, name, description, director }: MovieDTO): Promise<Movie> {

        const movie = await knex('movies')
            .update({user_id, name, description, director})
            .where({id})
            .returning(['id', 'name', 'description', 'director']);

        return movie[0] as Movie;
    }

    async deleteById(id: string, user_id: string): Promise<void> {

        await knex('movies').delete().where({id, user_id});
    }

    async findById(id: string): Promise<Movie|undefined> {

        return await knex('movies').where('id', id).first();
    }

    async findByName(name: string): Promise<Movie|undefined> {

        return await knex('movies').where('name', name).first();
    }

    async getAll(user_id: string): Promise<Movie[]> {

        return await knex('movies').where('user_id', user_id).select();
    }

    async getById(id: string, user_id: string): Promise<Movie|undefined> {

        return await knex('movies').where({id, user_id}).first();
    }
}

export default MovieRepository;
