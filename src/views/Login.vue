<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="login.userName" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="login.passWord">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="loginFrom()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import moment from "moment";

export default {
    data() {
        return {
            tableData: [],
            login:{
                userName:'',
                passWord:''
            }
        }
    },
    methods:{
        loginFrom() {
            this.axios.post("http://localhost:8088/sys/login",this.login)
                .then(v => {
                    if (v.data==''){
                        alert("用户名或密码错误")
                        this.login={
                            userName:'',
                            passWord:''
                        }
                    }else{
                        this.$store.commit("login",JSON.stringify(v.data.listNum))
                        JSON.parse(localStorage.getItem("loginuser"))
                        this.$router.push({path: '/dashboard'});
                    }
                })
        },
    },

    created() {
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
