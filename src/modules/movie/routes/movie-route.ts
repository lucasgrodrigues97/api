import { FastifyInstance } from 'fastify';
import MovieController from '../controllers/movie-controller';

const movieController = new MovieController();

export async function moviesRouter(app: FastifyInstance) {

  app.get('/', { preHandler: [app.authenticate] }, movieController.getAll);

  app.get('/:id', { preHandler: [app.authenticate] }, movieController.getById);

  app.post('/', { preHandler: [app.authenticate] }, movieController.create);

  app.put('/:id', { preHandler: [app.authenticate] }, movieController.edit);

  app.delete('/:id', { preHandler: [app.authenticate] }, movieController.delete);
}
