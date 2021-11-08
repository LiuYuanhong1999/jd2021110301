<template>
    <router-view />
</template>

<script>
export default {
    created:function () {
        if(sessionStorage.getItem("state1")){
            this.$store.replaceState(
                Object.assign(
                    {},
                    this.$store.state1,
                    JSON.parse(sessionStorage.getItem("state1"))
                )
            )
        }
    },

    mounted:function () {
        window.addEventListener('beforeunload',()=>{
            sessionStorage.getItem("state1",JSON.stringify(this.$store.state1))
        })
    }
};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>


