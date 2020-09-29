import React, {Component} from 'react';
// BrowserRouter控制路由跳转
// Switch是路由切换
import { BrowserRouter, Route, Switch } from 'react-router-dom' // 切换路由的Switch
import {isLogin} from '@/commons';
import PageFrame from '@/layouts/frame'; // 主页面入口
import Error404 from '@/pages/error/Error404';
import config from '@/commons/config-hoc';
import KeepAuthRoute from './KeepAuthRoute';
// 组件的tab标签导航
import KeepPage from './KeepPage';
// routes，混合导出方式
// export default：一个文件只能有一个export default命令，不指定名称，则使用方可指定任意名称
// export 一个文件可以有多个，使用方使用时必须加{}
import routes, {noFrameRoutes, noAuthRoutes, /*commonPaths*/} from './routes';

// 如果项目挂载到网站的子目录下，可以配置ROUTE_BASE_NAME， 开发时拿不到 PUBLIC_URL
// export const ROUTE_BASE_NAME = '/react-admin-live';

// 直接挂载到域名根目录
export const ROUTE_BASE_NAME = '';

@config({
    query: true,
    connect: state => ({userPaths: state.system.userPaths, systemNoFrame: state.system.noFrame})
})
export default class AppRouter extends Component {

    /**
     * allRoutes为全部路由配置，根据用户可用 菜单 和 功能 的path，对allRoutes进行过滤，可以解决越权访问页面的问题
     * commonPaths 为所有人都可以访问的路径 在.routes中定义
     * @returns {{path: *, component: *}[]}
     */
    getUserRoutes = () => {
        // const {userPaths} = this.props;
        // const allPaths = [...userPaths, ...commonPaths];
        // return routes.filter(item => allPaths.includes(item.path));
        return routes;
    };

    render() {
        const {noFrame: queryNoFrame, noAuth} = this.props.query;
        const {systemNoFrame} = this.props;
        const userRoutes = this.getUserRoutes();

        return (
            <BrowserRouter basename={ROUTE_BASE_NAME}>
                <div style={{display: 'flex', flexDirection: 'column', position: 'relative', minHeight: '100vh'}}>
                    <Route path="/" render={props => {
                        // 框架组件单独渲染，与其他页面成为兄弟节点，框架组件和具体页面组件渲染互不影响

                        if (systemNoFrame) return null;
                        // 通过配置，筛选那些页面不需要框架
                        if (noFrameRoutes.includes(props.location.pathname)) return null;

                        // 框架内容属于登录之后内容，如果未登录，也不显示框架
                        if (!isLogin()) return null;

                        // 如果浏览器url中携带了noFrame=true参数，不显示框架
                        if (queryNoFrame === 'true') return null;

                        return <PageFrame {...props}/>;
                    }}/>
                    <Route exact path={userRoutes.map(item => item.path)}>
                        <KeepPage/>
                    </Route>
                    <Switch>
                        {userRoutes.map(item => {
                            const {path, component} = item;
                            let isNoAuthRoute = false;

                            // 不需要登录的页面
                            if (noAuthRoutes.includes(path)) isNoAuthRoute = true;

                            // 如果浏览器url中携带了noAuthor=true参数，不需要登录即可访问
                            if (noAuth === 'true') isNoAuthRoute = true;

                            return (
                                <KeepAuthRoute
                                    key={path}
                                    exact
                                    path={path}
                                    noAuth={isNoAuthRoute}
                                    component={component}
                                />
                            );
                        })}
                        <Route component={Error404}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
