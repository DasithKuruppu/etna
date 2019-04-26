/* eslint-disable-next-line no-unused-vars */
import { FastifyInstance } from "fastify";
import * as fastifyCors from "fastify-cors";

export function configureCorsPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyCors);
}
