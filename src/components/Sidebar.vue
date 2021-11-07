<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "系统首页",
            },
          {
            icon: 'el-icon-lx-home',
            index: '/mainRecord',
            title: '模板'
          },
          {
            icon: 'el-icon-lx-home',
            index: '/updateRecord',
            title: '修改模板'
          },
          {
            icon: "el-icon-lx-home",
            index: "/dashboard",
            title: "个人办公",
            //二级菜单
            subs:[
              {
                index:'/dashboard',
                title:'流程审批'
              },{
                index:'/dashboard',
                title:'流程设置'
              },
              {
                index:'/dashboard',
                title:'我的邮件'
              },{
                index:'/dashboard',
                title:'我的日常'
              },{
                index:'/dashboard',
                title:'我的计划'
              }
            ]
          },
          {
            icon: "el-icon-lx-home",
            index: "5",
            title: "基本信息",
              subs: [
                {
                  icon: "el-icon-lx-home",
                  index: "/archiveReason",
                  title: "归档原因",
                },{
                  icon: "el-icon-lx-home",
                  index: "/dashboard",
                  title: "汽车品牌",
                }
              ]
          },

          {
            icon: "el-icon-lx-home",
            index: "6",
            title: "收车管理",
            subs:[
              {
                icon: "el-icon-lx-home",
                index: "/Record",
                title: "收车登记",
              },{
                icon: "el-icon-lx-home",
                index: "/Orders",
                title: "客户预约",
              },{
                icon: "el-icon-lx-home",
                index: "/Assess",
                title: "车辆评估",
              },{
                icon: "el-icon-lx-home",
                index: "/ReturnVist",
                title: "客户回访",
              },{
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "车辆入库",
              }
            ]},
          {
            icon: "el-icon-lx-home",
            index: "/dashboard",
            title: "销售管理",
            subs: [
              {
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "客户登记",
              },{
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "客户跟踪",
              },{
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "销售订单",
              },{
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "车辆交割",
              }
            ]
          },
          {
            icon: "el-icon-lx-home",
            index: "/dashboard",
            title: "车辆客村",
          },{
            icon: "el-icon-lx-home",
            index: "/dashboard",
            title: "财务管理",
          },{
            icon: "el-icon-lx-home",
            index: "/dashboard",
            title: "查询统计",
          },{
            icon: "el-icon-lx-home",
            index: "/dashboard",
            title: "用户管理",
          },{
            icon: "el-icon-lx-home",
            index: "/dashboard",
            title: "系统设置",
          }


        ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
