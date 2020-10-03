// createAction用于创建action的工厂，对应的还有handleAction方法
// Action大致类似event，用于传递消息并携带数据的
// Reducer类似action的实际处理对象，并实际更新state数据
import {createAction} from 'redux-actions';
import * as types from './action-types';
import {getStorage} from './index';


export default function ({syncKeys = []}) {
    return {
        // 同步本地数据到state中，一般在项目启动时，会调用此action进行同步。各个模块的reducer要对应的函数处理同步逻辑
        getStateFromStorage: createAction(types.GET_STATE_FROM_STORAGE, () => {
            const Storage = getStorage();
            return Storage.multiGet(syncKeys);
        }, (onResolve, onReject, onComplete) => {
            return {
                onResolve,
                onReject,
                onComplete,
            };
        }),
    };
}
