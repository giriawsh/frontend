<template>
  <v-col
    cols="12"
    md="2"
  >
    <name-card v-bind="item"/>
    <div class="py-3"/>
    <v-card style="height: 90px;">
      <v-btn
        color="success"
        class="ma-1 white-text"
        @click="jumpToEditor"
      >
        <v-icon dark>mdi-plus</v-icon>
        Create Article
      </v-btn>
      <v-btn
        color="info"
        class="ma-1 white-text"
        @click="jumpToManage"
        v-if="judgeAuth === 'admin'"
      >
        <v-icon dark>mdi-account-box-multiple</v-icon>
        Manage Users
      </v-btn>
    </v-card>
    <div class="py-3"/>
    <v-card style="height: 400px;">
      <v-card-title class="grey darken-3" style="color: white;">
        了解更多
      </v-card-title>
      <v-card-text>
        <div href="https://www.runoob.com/"
             style="font-size:18px; ">
          <br/>
          <table style="text-align:left;">
            <tr>
              <a href="https://www.runoob.com/"
                 style="color:black;">小小菜鸟爱学习</a>
            </tr>
            <br/>
            <tr>
              <a href="https://github.com/giriawsh/frontend/"
                 style="color:black;">关于论坛的前端建设</a>
            </tr>
            <br/>
            <tr>
              <a href="https://github.com/EricDeng1001/backend/"
                 style="color:black;">关于论坛的后台建设</a>
            </tr>
            <br/>
            <tr>
              <a href="https://www.jhipster.tech/"
                 style="color:black;">关于论坛的搭建</a>
            </tr>
            <br/>
            <tr>
              <a href="https://cn.vuejs.org/"
                 style="color:black;">Vue相关知识</a>
            </tr>
            <br/>
            <tr>
              <a href="https://nodejs.org/en/"
                 style="color:black;">JavaScript相关知识</a>
            </tr>
            <br/>
            <tr>
              <a href="https://www.runoob.com/mysql/mysql-tutorial.html"
                 style="color:black;">MySQL相关教程</a>
            </tr>
          </table>
        </div>
      </v-card-text>
    </v-card>
    <div class="py-3"/>
    <v-card style="height: 400px;">
      <v-card-title class="grey darken-3" style="color: white;">
        妹想好写啥
      </v-card-title>
      <v-card-text>
        2
      </v-card-text>
    </v-card>
    <!--<div class="py-3"/>
    <v-card style="height: 400px;">
      <v-card-title class="grey darken-3" style="color: white;">
        标题3
      </v-card-title>
      <v-card-text>
        3
      </v-card-text>
    </v-card> -->
  </v-col>
</template>
<script>
  import NameCard from "../widget/NameCard";
  import axios from "~/plugins/axios";

  export default {
    name: 'CoreSideBar',
    data() {
      return {
        item:
          {
            jobTitle: "Web Developer",
            name: "Jim J",
            color: "teal",
            avatar: {
              src: "https://randomuser.me/api/portraits/men/10.jpg",
              size: "36"
            }
          },
        judgeAuth: "",
      }
    },
    mounted() {
      this.judgeAuth = this.$store.state.authority;
      console.log("judge="+this.judgeAuth);
    },
    components: {
      NameCard,
    },
    methods: {
      jumpToEditor() {
        this.$router.push('/editor')
      },
      jumpToManage(){
        this.$router.push('/manager')
      }
    }
  }
</script>
