import React from 'react';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import AppRouter from './router/AppRouter';
import {connect} from './models';
import moment from 'moment';
import 'moment/locale/zh-cn'; // 解决 antd 日期组件国际化问题
// 设置语言
moment.locale('zh-cn');

// connect是一个高阶组件
// connect主要作用是将UI组件和State关联起来，形成容器组件
// 并能使用State中的数据
@connect()
export default class App extends React.Component {
    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <AppRouter/>
            </ConfigProvider>
        );
    }
}
