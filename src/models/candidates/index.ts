import { Model } from "objection";
import { Skill } from "../skills";
import { toDate, toTime } from "../utils";

export class Candidate extends Model {
  readonly id!: number;
  firstName!: string;
  lastName!: string;
  contactNumber!: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
  
  static get tableName() {
    return "candidate";
  }

  static get relationMappings() {
    return {
      skills: {
        relation: Model.ManyToManyRelation,
        modelClass: Skill,
        join: {
          from: `${Candidate.tableName}.id`,
          through: {
            from: "candidate_skills.candidateId",
            to: "candidate_skills.skillId"
          },
          to: `${Skill.tableName}.id`
        }
      }
    };
  }

  $beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

  $parseDatabaseJson(json: object) {
    json = super.$parseDatabaseJson(json);
    toDate(json, "createdAt");
    toDate(json, "updatedAt");
    return json;
  }

  $formatDatabaseJson(json: object) {
    json = super.$formatDatabaseJson(json);
    toTime(json, "createdAt");
    toTime(json, "updatedAt");
    return json;
  }
}
