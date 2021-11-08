import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index"

const routes = [

    {
        path: "/login",
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

            //权限
            {
                path: '/User',
                name: 'User',
                meta: {
                    title: '用户列表',
                },
                component:()=>import('../views/sys/User.vue')
            },
            {
                path: '/LoginRizhi',
                name: 'LoginRizhi',
                meta: {
                    title: '登录日志',
                },
                component:()=>import('../views/sys/LoginRizhi.vue')
            },
            {
                path: '/JueSe',
                name: 'JueSe',
                meta: {
                    title: '角色设置',
                },
                component:()=>import('../views/sys/JueSe.vue')
            },
            {
                path: '/Dept',
                name: 'Dept',
                meta: {
                    title: '部门管理',
                },
                component:()=>import('../views/sys/Dept.vue')
            },
            {
                path: '/Menu',
                name: 'Menu',
                meta: {
                    title: '菜单管理',
                },
                component:()=>import('../views/sys/Menu.vue')
            },

        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


    router.beforeEach((to, from, next) => {
        if (JSON.parse(localStorage.getItem("loginuser"))) {//toekn存在
            if (JSON.parse(localStorage.getItem("loginuser")).length!=3) {//token存在，并且是login页面
                    next();
            } else {
                next();
            }
        } else {
            next();
        }
    })


export default router;
