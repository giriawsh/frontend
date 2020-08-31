<template>
  <div class="panel-wrapper">
    <div class="slogan-wrapper">
      <div class="slogan">
        <img src="../assets/login-bg2.svg" alt=""/>
      </div>
    </div>
    <div class="panel-content">
      <v-app class="login-con">
        <v-main>
          <v-container
            fluid
            fill-height
          >
            <v-layout
              align-center="center"
              justify-center="center"
            >
              <v-flex class="frame">
                <v-form v-model="isValid">
                  <v-text-field
                    v-model="form.username"
                    prepend-icon="mdi-account"
                    clearable
                    required
                    label="用户名"
                    :rules="[v=>!!v || '请输入用户名']"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="form.password"
                    prepend-icon="mdi-lock"
                    :type="showPwd ? 'text' : 'password'"
                    :append-icon ="showPwd ? 'mdi-eye-off' : 'mdi-eye'"
                    required
                    label="密码"
                    :rules="[v=>!!v || '请输入密码']"
                    @click:append="showPwd = !showPwd"
                  >
                  </v-text-field>
                  <v-layout
                    column
                    wrap
                    justify-end=""
                    align-end=""
                  >

                    <v-flex>
                      <v-btn
                        @click="register"
                        large
                        color="blue-grey"
                        width="100px"
                      >
                        注册
                      </v-btn>
                      <v-btn
                        :loading="loginLoading"
                        @click="login"
                        large
                        color="primary"
                        width="100px"
                        :disabled="!isValid"
                      >
                        登录
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-main>
      </v-app>
    </div>
  </div>
</template>
<script>
  import axios from "~/plugins/axios";

  export default {
    layout: 'login',
    data() {
      return {
        form: {
          username: 'admin',
          password: 'admin',
        },
        loginLoading: false,
        showPwd: false,
        isValid: false,
      }
    },
    methods: {
      async login() {
        if (!this.form.password || !this.form.username) {
          return;
        }
        this.loginLoading = true;
        const response = await axios({
          method: 'post',
          url: '/login',
          data: `username=${this.form.username}&password=${this.form.password}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        if (this.isLoginSuccess(response)) {
          this.$store.commit('setUsername', this.form.username);
          console.log(this.$store.state.username);
          this.$router.push('/');
        } else {
          alert("登录失败");
          this.loginLoading = false;
        }
      },
      register() {
        this.$router.push('/register')
      },
      isLoginSuccess(response) {
        return response === undefined;
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/_login.scss";
</style>
