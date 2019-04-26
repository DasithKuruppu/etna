
import { containsOperators } from "../../../src/routes/candidates/handler";


describe("Should test containsOperators function", () => {
  test("Should contain an operator >", () => {
    const result = containsOperators(
      { "experience.$gte": 12, firstName: "Dasith", lastName: "kuruppu" },
      "experience"
    );
    expect(result).toBeTruthy;
  });

  test("Should contain an operator <", () => {
    const result = containsOperators(
      { "experience.$lte": 12, firstName: "Dasith", lastName: "kuruppu" },
      "experience"
    );
    expect(result).toBeTruthy;
  });

  test("Should not contain an operator", () => {
    const result = containsOperators(
      { experience: 12, firstName: "Dasith", lastName: "kuruppu" },
      "experience"
    );
    expect(result).toBeTruthy;
  });
});
