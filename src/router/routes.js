import pageRoutes, {noAuths, noFrames, keepAlives} from '../pages/page-routes';
import ReactLoadable from "react-loadable"; // 按照路由或组件来切割代码
import PageLoading from "@/layouts/page-loading";

// 不需要页面框架的页面配置
export const noFrameRoutes = noFrames;

// 不需要登录的页面
export const noAuthRoutes = noAuths;

// 需要keep alive 页面
export const keepAliveRoutes = keepAlives;

// 所有人都可以访问的页面
export const commonPaths = [
    '/',
    '/login',
];
// export default导出时未指定具体的名称，则使用方可以指定任意名称来使用
/*
* 非脚本抓取的路由，可以在这里编辑，脚本抓取的路由在./src/pages/page-routes.js中
* */
export default [
    // {path: '/', component: () => import('../pages/home/index')},
].concat(pageRoutes)
    .map(item => {
        return {
            path: item.path,
            component: ReactLoadable({loader: item.component, loading: PageLoading}),
        };
    })
