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
            //新增收车登记
            {
                path: '/AddRecord',
                name: 'AddRecord',
                meta: {
                    title: '新增收车登记'
                },
                 component:()=>import('../views/lyh/AddRecord.vue')
            },
            //编辑收车登记
            {
              path: '/UpdateRecords',
                name: 'UpdateRecords',
                meta: {
                  title: '编辑收车登记'
                },
                component:()=>import('../views/lyh/UpdateRecords.vue')
            },
            //客户预约
            {
              path: '/Orders',
              name: 'Orders',
              meta: {
                  title: '客户预约'
              } ,
              component:()=>import('../views/lyh/Orders.vue')
            },
            //新增客户预约
            {
              path: '/AddOrders',
              name: 'AddOrders',
              meta: {
                  title: '增加客户预约'
              },
              component:()=>import('../views/lyh/AddOrders.vue')
            },


            //车辆评估
            {
                path: '/Assess',
                name: 'Assess',
                meta: {
                    title: '车辆评估'
                },
                component:()=>import('../views/lyh/Assess.vue')
            },
            {
                path: '/AddAssess',
                name: 'AddAssess',
                meta: {
                    title: '添加评估',
                },
                component:()=>import('../views/lyh/AddAssess.vue')
            },


            //客户回访
            {
                path: '/ReturnVist',
                name: 'ReturnVist',
                meta: {
                    title: '客户回访'
                },
                component:()=>import('../views/lyh/ReturnVist.vue')
            },
            {
                path: '/AddReturnVist',
                name: 'AddReturnVist',
                meta: {
                    title: '增加回访记录'
                },
                component:()=>import('../views/lyh/AddReturnVist.vue')
            },
            //收车入库
            {
                path: '/Storage',
                name: "Storage",
                meta: {
                    title: '收车入库'
                },
                component:()=>import('../views/lyh/Storage.vue')
            },
            {
                path: '/AddStorage',
                name: 'AddStorage',
                meta: {
                  title: '入库'
                },
                component:()=>import('../views/lyh/AddStorage.vue')
            },

            //车辆库存
            {
              path: '/Initial',
              name: 'Initial',
              meta: {
                  title: '初始入库'
              }  ,
                component:()=>import('../views/lyh/Initial.vue')
            },
            {
              path: '/Inventory',
              name: 'Inventory',
              meta: {
                  title: '库存查看'
              }  ,
                component:()=>import('../views/lyh/Inventory.vue')
            },

            {
                path:'/factory',
                name:'factory',
                meta: {
                    title: '厂商名称'
                },
                component:()=>import('../views/tjq/Factory.vue')
            },
            {
                path:'/brand',
                name:'brand',
                meta:{
                    title: '汽车品牌'
                },
                component:()=>import('../views/tjq/Brand.vue')

            },
            {
                path:'/design',
                name:'design',
                meta:{
                    title: '汽车款式'
                },
                component:()=>import('../views/tjq/Design.vue')
            },
            {
                path:'/color',
                name:'color',
                meta:{
                    title:'车身颜色'
                },
                component:()=>import('../views/tjq/Color.vue')
            },
            {
                path:'/archiveReason',
                name:'archiveReason',
                meta:{
                    title: '归档原因'
                },
                component:()=>import("../views/tjq/ArchiveReason.vue")
            },
            {
                path: '/sellArchiveReason',
                name:'sellArchiveReason',
                meta:{
                    title:'销售归档原因'
                },
                component:()=>import("../views/tjq/SellArchiveReason.vue")
            },
            {
                path:'/coustomertype',
                name:'coustomertype',
                meta:{
                    title: '客户类别',
                },
                component:()=>import("../views/tjq/Coustomertype.vue")
            },
            {
                path:'/source',
                name:'source',
                meta:{
                    title:'信息来源'
                },
                component:()=>import("../views/tjq/Source.vue")
            },
            {
                path:'/coustomer',
                name:'coustomer',
                meta:{
                    title:'客户登记'
                },
                component:()=>import("../views/tjq/Coustomer.vue")
            },
            {
                path:'/addCoustomer',
                name:'addCoustomer',
                meta:{
                    title:'客户登记新增'
                },
                component:()=>import("../views/tjq/AddCourstomer.vue")
            },
            {
                path:'/visitorylogs',
                name:'visitorylogs',
                meta:{
                    title: '客户跟踪'
                },
                component:()=>import("../views/tjq/Visitorylogs.vue")
            },
            {
                path:'/visitorylogsCourstomer',
                name:'visitorylogsCourstomer',
                meta:{
                    title: '客户跟踪新增'
                },
                component:()=>import("../views/tjq/VisitorlogsCourstomer.vue")
            }

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
