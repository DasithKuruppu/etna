import { Candidate } from "../../models";
import { DefaultQuery } from "fastify";
import { QueryBuilder } from "objection";

export function containsOperators(query: DefaultQuery, fieldName: string) {
  const operatorGreaterThan: string = Object.keys(query).includes(
    `${fieldName}.$gte`
  )
    ? ">"
    : "";
  const operatorLessThan: string = Object.keys(query).includes(
    `${fieldName}.$lte`
  )
    ? "<"
    : "";
  const inBetween: string =
    operatorGreaterThan && operatorLessThan ? "range" : "";

  return [inBetween, operatorGreaterThan, operatorLessThan].find(
    operator => operator !== ""
  );
}

export function addExperienceFilters(
  queryBuilder: QueryBuilder<Candidate>,
  query: DefaultQuery,
  experienceFieldName: string
) {
  const experienceOperator = containsOperators(query, experienceFieldName);
  switch (experienceOperator) {
    case "range":
      queryBuilder.whereBetween(experienceFieldName, [
        query[`${experienceFieldName}.$gte`],
        query[`${experienceFieldName}.$lte`]
      ]);
      delete query[`${experienceFieldName}.$gte`];
      delete query[`${experienceFieldName}.$gte`];
      break;
    case ">":
      queryBuilder.andWhere(
        experienceFieldName,
        experienceOperator,
        query[`${experienceFieldName}.$gte`]
      );
      delete query[`${experienceFieldName}.$gte`];
      break;
    case "<":
      queryBuilder.andWhere(
        experienceFieldName,
        experienceOperator,
        query[`${experienceFieldName}.$lte`]
      );
      delete query[`${experienceFieldName}.$lte`];
      break;
  }
}

export async function queryCandidates(
  requestQuery: DefaultQuery,
  skillsFieldName = `skills`,
  experienceFieldName = `experience`
) {
  const { technology, ...queryWithOutTechnology } = requestQuery;

  const baseQuery = Candidate.query()
    .eager(skillsFieldName)
    .joinRelation(skillsFieldName)
    .where({ [`${skillsFieldName}.type`]: "technology" });

  addExperienceFilters(
    baseQuery as QueryBuilder<Candidate>,
    queryWithOutTechnology,
    experienceFieldName
  );

  if (technology) {
    return await baseQuery
      .whereIn(
        `${skillsFieldName}.name`,
        Array.isArray(technology) ? technology : [technology]
      )
      .andWhere(queryWithOutTechnology);
  } else {
    return await baseQuery.where(requestQuery);
  }
}
