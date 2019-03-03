import {applyMiddleware, createStore} from "redux";
import DatasetFormReducer from './reducers';
import createSagaMiddleware from 'redux-saga';

jest.mock('../../services/DatasetService', () => {
  console.log('Made it into the mock');
  /*return jest.fn().mockImplementation(() => {
    return {
      postDataset: async () =>  {
        return 1234;
      }
    }
  })*/
  return {
    DatasetService: jest.fn().mockImplementation(() => {
      return {
        postDataset: async() => {
          return 1234;
        }
      }
    })
  }
  /*return function() {
    return {
      DatasetService: () => {
        return {}
      }
    }
  }*/
  /*return jest.fn().mockImplementation(() => {
    return {
      DatasetService: () => {
        return {
          postDataset: async () =>  {
            return 1234;
          }
        }
      }
    }
  });*/
});
import {datasetFormSagas} from "./datasetFormSaga";
import {all} from "@redux-saga/core/effects";


describe('Dataset Saga', () => {
  let store;

  beforeEach(() => {
    const sagaMiddleware = createSagaMiddleware();
    function* rootSaga() {
      yield all([ ...datasetFormSagas()])
    }

    store = createStore(DatasetFormReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

  });

  it('should post a new a new dataset', () => {
    store.dispatch({type: "DATASET_FORM_PUBLISHED", basicInfo: {}, schema: [], id: 1234});
    expect(store.getState().schemaPublished).toBe(true);
    expect(store.getState().schemaPublishedId).toBe(1234);
  });
});

