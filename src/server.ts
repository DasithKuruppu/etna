import * as Fastify from "fastify";
import { configureAuthPlugin, configureSwaggerPlugin , configureCorsPlugin} from "./plugins";
import { registerCandidatesRoutes } from "./routes/candidates";

export default function createServer(opts?: Fastify.ServerOptions) {
  let fastify = Fastify(opts);

  //external plugins
  configureSwaggerPlugin(fastify);
  configureCorsPlugin(fastify)
  configureAuthPlugin(fastify);

  //register application routes
  registerCandidatesRoutes(fastify);

  return fastify;
}
