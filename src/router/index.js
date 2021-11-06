import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [

    {
        path: "/",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    },


    {
        path: '/s',
        redirect: '/dashboard'
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },
           {
            path: '/tabs',
                name: 'tabs',
                component:()=>import('../views/Tabs.vue')
            },

            {//模板 显示所有
                path:'/mainRecord',
                name:'mainRecord',
                component:()=> import("../views/mainRecord.vue")
            },
            {//模板新增/修改
                path:'/updateRecord',
                name:'updateRecord',
                component:()=>import("../views/updateRecord.vue")
            },
            //基本信息  归档原因
            {
                path:'/archiveReason',
                name:'archiveReason',
                meta: {
                    title: '归档原因'
                },
                component:()=>import("../views/tjq/ArchiveReason.vue")
            },
            //收车登记
            {
              path: '/Record',
              name: 'Record',
                meta: {
                  title: '收车登记',
                },
                component:()=>import('../views/lyh/Record.vue')
            },
            //新增收车登记
            {
                path: '/AddRecord',
                name: 'AddRecord',
                meta: {
                    title: '新增收车登记'
                },
                 component:()=>import('../views/lyh/AddRecord.vue')
            }

        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;
