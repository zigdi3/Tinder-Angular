// import {
//   createStore,
//   applyMiddleware,
//   compose,
//   GenericStoreEnhancer,
// } from 'redux';

// import deepFreeze from './deepFreeze';
// import { reducer } from './reducer';
// import { IAppState } from './app.state';

// declare var window: any;
// const devToolsExtension: GenericStoreEnhancer = window.devToolsExtension
//   ? window.devToolsExtension()
//   : (f: any) => f;

// export const store = createStore<IAppState>(
//   reducer,
//   compose(
//     applyMiddleware(deepFreeze),
//     devToolsExtension
//   ) as GenericStoreEnhancer
// );
