import {createStore} from "redux";
import DatasetFormReducer from './reducers';
import {changeSchema, gotoStep, nextStep, prevStep, DATASET_FORM_ACTIONS, changeDisplaySchemaError} from "./actions";

describe('Dataset Form Store', () => {
  let store;
  //TODO: Break up initial state in its own file
  beforeEach(() => {
    store = createStore(DatasetFormReducer, {
      wizard: {
        steps: [
          {label: 'Dataset Info', completed: false},
          {label: 'Upload Schema', completed: false},
          {label: 'Published', completed: false, nextButtonValue: 'Publish'}
        ],
        currentStep: 0
      },
      schema: [],
      displayNoSchemaError: false
    });
  });

  it("Should set initial state", () => {
    let initialState = store.getState();
    expect(initialState.schema).toEqual([]);
    expect(initialState.displayNoSchemaError).toBe(false);
    expect(initialState.wizard.steps.length).toBe(3);
    expect(initialState.wizard.currentStep).toBe(0);
  });

  it("Should go to the next step", () => {
    store.dispatch(nextStep());
    expect(store.getState().wizard.currentStep).toBe(1);
  });

  it("Should go to the previous step", () => {
    store.dispatch(nextStep());
    store.dispatch(nextStep());
    store.dispatch(prevStep());
    expect(store.getState().wizard.currentStep).toBe(1);
  });

  it("should go to a specified step", () => {
    store.dispatch(gotoStep(2));
    expect(store.getState().wizard.currentStep).toBe(2);
  });

  it("previous step should never go below 0", () => {
    store.dispatch(prevStep());
    expect(store.getState().wizard.currentStep).toBe(0);
  });

  it("next step should never go beyound the max", () => {
    store.dispatch(gotoStep(store.getState().wizard.steps.length - 1));
    store.dispatch(nextStep());
    expect(store.getState().wizard.currentStep).toBe(store.getState().wizard.steps.length - 1);
  });

  it("should load the schema", () => {
    store.dispatch({type: DATASET_FORM_ACTIONS.LOAD_SCHEMA_LIST, value:[
        {name: 'test'},
        {},
        {}
    ]});
    expect(store.getState().schema.length).toBe(3);
    expect(store.getState().schema[0].name).toBe('test');
  });

  it("should change the schema", () => {
    store.dispatch({type: DATASET_FORM_ACTIONS.LOAD_SCHEMA_LIST, value:[
        {name: 'test', description: "1234"},
        {name: 'test2', description: "1234"},
        {name: 'test3', description: "1234"}
    ]});
    store.dispatch(changeSchema('test', 'description', '123456'));
    expect(store.getState().schema.length).toBe(3);
    expect(store.getState().schema[0].name).toBe('test');
    expect(store.getState().schema[0].description).toBe('123456');
  });

  it("should display no schema error", () => {
    store.dispatch(changeDisplaySchemaError(true));
    expect(store.getState().displayNoSchemaError).toBe(true);
  });

  it("the dataset should be published", () => {
    store.dispatch({type: DATASET_FORM_ACTIONS.SCHEMA_PUBLISHED, schemaId: 1234});
    expect(store.getState().schemaPublished).toBeTruthy();
    expect(store.getState().schemaPublishedId).toBe(1234);
  });
});

