// @ts-ignore
import {combineReducers, createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga'

export class AppStore {
  private static instance: AppStore;
  private _store: any;
  constructor() {}

  static getInstance() {
    if(!AppStore.instance) {
      AppStore.instance = new AppStore();
    }
    return AppStore.instance;
  }

  get store() {
    return this._store;
  }

  set store(store) {
    this._store = store;
  }

  public initialize() {
    console.info("App store is intializing!");
    const sagaMiddleware = createSagaMiddleware();

    //Allows the store to be broken into different states
    const rootReducer = combineReducers({});

    this.store = createStore(
      rootReducer,
      applyMiddleware(sagaMiddleware)
    );
  }
}
