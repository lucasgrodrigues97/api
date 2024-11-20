import { it, expect, describe, beforeAll, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import { execSync } from 'node:child_process';
import { app } from '../src/app';

describe('Movies routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync('knex migrate:rollback --all');
    execSync('knex migrate:latest');
  });

  it('should be able to create a new movie', async () => {
    const response = await request(app.server).post('/movies').send({
      name: 'Test Movie',
      description: 'Test Description',
      director: 'Test Director',
    });

    expect(response.status).toBe(201);
  });

  describe('GET/movies', () => {
    it('should be able to list all movies', async () => {
      const movie = {
        name: 'Test Movie 2',
        description: 'Test Description 2',
        director: 'Test Director 2',
      };

      const createMovieResponse = await request(app.server)
        .post('/movies')
        .send(movie);

      const cookies = createMovieResponse.get('Set-Cookie') ?? [];

      const listMoviesResponse = await request(app.server)
        .get('/movies')
        .set('Cookie', cookies)
        .expect(200);

      expect(listMoviesResponse.body.movies).toEqual([
        expect.objectContaining(movie),
      ]);
    });

    it('should retur status 401 when there is not cookies', async () => {
      const listMoviesResponse = await request(app.server).get('/movies');

      expect(listMoviesResponse.status).toBe(401);
    });
  });

  it('should be able to get a specific movie', async () => {
    const movie = {
      name: 'Test Movie 2',
      description: 'Test Description 2',
      director: 'Test Director 2',
    };

    const createMovieResponse = await request(app.server)
      .post('/movies')
      .send(movie);

    const cookies = createMovieResponse.get('Set-Cookie') ?? [];

    const listMoviesResponse = await request(app.server)
      .get('/movies')
      .set('Cookie', cookies)
      .expect(200);

    const movieId = listMoviesResponse.body.movies[0].id;

    const getMovieResponse = await request(app.server)
      .get(`/movies/${movieId}`)
      .set('Cookie', cookies)
      .expect(200);

    expect(getMovieResponse.body.movie).toEqual(expect.objectContaining(movie));
  });

  it.todo('should be able to edit a specific movie', () => {});

  it.todo('should be able to delete a specific movie', () => {});
});
