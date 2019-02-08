import schemaValidator from 'ajv';
import {Ajv} from 'ajv';

export const uploadSchema = {
  type: "array",
  minItems: 1,
  items: [
    {
      "type": "object",
      required: ["type", "name", "description"],
      additionalProperties: false,
      "properties": {
        description: {type: "string"},
        type: {type: "string"},
        name: {type: "string"},
      }
    }
  ]
};

export class SchemaValidator {
  ajv: Ajv;
  constructor() {
    this.ajv = schemaValidator({allErrors: true});

    console.log('HERE IS AJV');
    console.log(this.ajv);
  }

  async validate(schema: any, data: any) {
    return new Promise((resolve) => {
      let validate = this.ajv.compile(schema);
      let valid = validate(data);

      if(valid) {
        resolve([]);
      } else {
        resolve(validate.errors);
      }
    })
  }

  test(data) {
    var validate = this.ajv.compile(uploadSchema);

    console.log('HERE IS VALIDATE');
    console.log(validate);
    console.log(data);
    var valid = validate(data);
    if (valid) console.log('Valid!');
    else {
      console.log('ERRORS')
      console.log(validate.errors);
      console.log('Invalid: ' + this.ajv.errorsText(validate.errors))
    };
  }
}
