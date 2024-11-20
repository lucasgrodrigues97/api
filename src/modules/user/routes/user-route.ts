import { FastifyInstance } from "fastify";
import UserController from "../controllers/user-controller";

const userController = new UserController();

export async function usersRoute(app: FastifyInstance) {

    app.post('/register', userController.create);
}
