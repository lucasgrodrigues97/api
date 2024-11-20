import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import MovieService from "../services/movie-service";
import MovieRepository from "../repositories/movie-repository";

class MovieController {

    async create(request: FastifyRequest, reply: FastifyReply) {

        const createMovieSchema = z.object({
            name: z.string(),
            description: z.string(),
            director: z.string(),
        });

        const { name, description, director } = createMovieSchema.parse(request.body);

        const movieService = new MovieService(new MovieRepository);

        const { id: user_id } = request.user;

        const movie = await movieService.create({ user_id, name, description, director });

        return reply.status(201).send(movie);
    }

    async edit(request: FastifyRequest, reply: FastifyReply) {

        const createMovieSchema = z.object({
            name: z.string(),
            description: z.string(),
            director: z.string(),
        });

        const { name, description, director } = createMovieSchema.parse(request.body);

        const getMovieParamsSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = getMovieParamsSchema.parse(request.params);

        const movieService = new MovieService(new MovieRepository);

        const { id: user_id } = request.user;

        const movie = await movieService.edit(id, { user_id, name, description, director });

        return reply.status(201).send(movie);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {

        const getMovieParamsSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = getMovieParamsSchema.parse(request.params);

        const { id: user_id } = request.user;

        const movieService = new MovieService(new MovieRepository);

        await movieService.delete(id, user_id);

        return reply.status(201).send('Successfully deleted');
    }

    async getAll(request: FastifyRequest) {

        const movieRepository = new MovieRepository();

        const { id } = request.user;

        const movies = await movieRepository.getAll(id);
  
        return { movies };
    }

    async getById(request: FastifyRequest) {

        const movieRepository = new MovieRepository();

        const { id: user_id } = request.user;

        const getMovieParamsSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = getMovieParamsSchema.parse(request.params);

        const movie = await movieRepository.getById(id, user_id);

        return { movie };
    }
}

export default MovieController;
