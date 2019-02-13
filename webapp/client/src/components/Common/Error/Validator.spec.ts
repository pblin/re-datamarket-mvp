import {validate} from "./Validator";
import {ERROR_TYPE} from "./ErrorType";

describe("Validator Test", () => {
  it("isRequired validation should pass", () => {
    let result = validate(1234, {type: ERROR_TYPE.REQUIRED});
    expect(result).toBe(true);
  });
});
