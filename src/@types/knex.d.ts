import { knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    movies: {
      id: string;
      user_id: string;
      name: string;
      description: string;
      director: string;
      created_at: Date;
    };
  }

  export interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      created_at: Date;
    };
  }
}
