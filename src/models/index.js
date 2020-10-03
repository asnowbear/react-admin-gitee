
// combineReducers用于合并Reducers，讲大应用中的Reducers合并成一个
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'; // 使得thunk在应用中实现异步性
import {
    middlewareUtils,
    createConnectHOC,
    middlewarePromise,
    connect as _connect,
    getActionsAndReducers,
    middlewareAsyncActionCallback,
    middlewareSyncReducerToLocalStorage,
} from '@/library/redux';
import * as models from './all-models';

const {actions, reducers} = getActionsAndReducers({models});
const middleware = [
    thunkMiddleware,
    middlewarePromise,
    middlewareAsyncActionCallback,
    middlewareUtils,
    middlewareSyncReducerToLocalStorage,
];

export function configureStore(initialState) {
    return applyMiddleware(...middleware)
        (createStore)(combineReducers(reducers), initialState);
}

// 与redux进行连接 函数
export const connectComponent = _connect({actions, options: {ref: true}});

// 与redux进行连接 装饰器
export const connect = createConnectHOC(connectComponent);


