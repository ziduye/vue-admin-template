<template>
  <div class="login-container">
    <div class="login-weaper animated bounceInDown">
      <div class="login-left">
        <img class="img" src="/img/logo.png" alt="">
        <p class="title">{{ website.infoTitle }}</p>
        <p>©2019 v2.0.1</p>
      </div>
      <div class="login-border">
        <div class="login-main">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input v-model="loginForm.username" name="username" auto-complete="off" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input :type="pwdType" v-model="loginForm.password" name="password" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="handleLogin" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" type="primary" class="login-submit" @click.native.prevent="handleLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  computed: {
    ...mapGetters(['website'])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >

  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        padding-bottom: 10px;
        text-indent: 5px;
        background: transparent;
        border: none;
        border-radius: 0;
        color: #333;
        border-bottom: 1px solid rgb(235, 237, 242);
      }

      .el-input__prefix {
        i {
          padding: 0 5px;
          font-size: 16px !important;
        }
      }
    }
    .el-form-item {
      margin-bottom: 12px;
    }
    .el-form-item__content {
      width: 100%;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #f8f8f9;
    animation: animate-cloud 20s linear infinite;
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .login-weaper {
      margin: 0 auto;
      width: 1000px;
      box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
      .login-left, .login-border {
        position: relative;
        min-height: 500px;
        align-items: center;
        display: flex;
      }
      .login-left {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        justify-content: center;
        flex-direction: column;
        background-color: #409EFF;
        color: #fff;
        float: left;
        width: 50%;
        position: relative;
        .img {
          width: 140px;
        }
        .title {
          margin-top: 60px;
          text-align: center;
          color: #fff;
          font-weight: 300;
          letter-spacing: 2px;
          font-size: 25px;
        }
      }
      .login-border {
        border-left: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        color: #fff;
        background-color: #fff;
        width: 50%;
        float: left;
        box-sizing: border-box;

        .login-main {
          margin: 0 auto;
          width: 65%;
          box-sizing: border-box;
          .login-form {
            margin: 10px 0;

            i {
              color: #333;
            }
            .login-submit {
              width: 100%;
              height: 45px;
              border: 1px solid #409eff;
              background: none;
              font-size: 18px;
              letter-spacing: 2px;
              font-weight: 300;
              color: #409eff;
              cursor: pointer;
              margin-top: 30px;
              font-family: "neo";
              transition: 0.25s;
            }
          }
        }
      }
    }
  }
</style>
