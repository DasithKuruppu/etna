import { FastifyInstance } from "fastify";
import { Candidate, Skill } from "../../models";
import { transaction } from "objection";
import { queryCandidates } from "./handler";

import projectConfig from "../../../projectConfig";
const { apiPrefix } = projectConfig;

export const CANDIDATES_ROUTE = "candidates";

export function registerCandidatesRoutes(fastify: FastifyInstance): void {
  fastify.get(`${apiPrefix}/${CANDIDATES_ROUTE}`, async (request, reply) => {
    try {
      const candidatesList = await queryCandidates(request.query);
      reply.send(candidatesList);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get(
    `${apiPrefix}/${CANDIDATES_ROUTE}/technologies`,
    async (request, reply) => {
      try {
        const technologies = await Skill.query().distinct("name");
        reply.send(technologies);
      } catch (err) {
        reply.send([]);
      }
    }
  );

  fastify.post(`${apiPrefix}/${CANDIDATES_ROUTE}`, async (request, reply) => {
    const graph = request.body;
    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // has will use multiple create queries.
    try {
      const insertedGraph = await transaction(Candidate.knex(), trx => {
        return Candidate.query(trx)
          .allowInsert("[skills]")
          .insertGraph(graph);
      });
      reply.send(insertedGraph);
    } catch (err) {
      reply.send([]);
    }
  });
  
}
