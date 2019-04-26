import { Model } from "objection";
import { toDate, toTime } from "../utils";

export class Skill extends Model {
  readonly id!: number;
  name!: string;
  type!: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;

  static get tableName() {
    return "skill";
  }

  $beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.type = "technology";
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
