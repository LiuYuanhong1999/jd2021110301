<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <el-submenu v-for="(menu) in menus" :index="menu.menuId+''">
                <template #title>
                    <i :class="menu.icon"></i>
                    <span>{{menu.menuName}}</span>
                </template>
                <el-menu-item v-for="c in menu.children" :index="c.compoentPath">
                    <i :class="c.icon"></i>
                    <template #title>{{c.menuName}}</template>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    data() {
        return {
            menus:[]
        };

    },

    methods:{
        homeMenu(){
            let a = JSON.parse(localStorage.getItem("loginuser"));
            let s = a.slice(1,-1)
            this.axios.get("http://localhost:8088/sys/home-menu",{params:{listNum:s}})
                .then(v=>{
                    this.menus=v.data
                    console.log(this.menus)
                })
        }
    },


    created() {
        this.homeMenu()
    }
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
