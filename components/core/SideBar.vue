<template>
  <v-col
    cols="12"
    md="2"
  >
    <name-card v-bind="item"/>
    <div class="py-3"/>
    <v-card style="height:130px;">
      <br/>
      <v-btn
        color="success"
        class="ma-1 white-text"
        @click="jumpToEditor"
      >
        <v-icon dark
                style="width:24px">mdi-plus
        </v-icon>
        Create Article
      </v-btn>
      <v-btn
        color="info"
        class="ma-1 white-text"
        @click="jumpToManage"
        v-if="judgeAuth === 'admin'"
      >
        <v-icon dark
                style="width:30px">mdi-account-box-multiple
        </v-icon>
        Manage Panel
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
                 target="_blank"
                 style="color:black;">小小菜鸟爱学习</a>
            </tr>
            <br/>
            <tr>
              <a href="https://github.com/giriawsh/frontend/"
                 target="_blank"
                 style="color:black;">关于论坛的前端建设</a>
            </tr>
            <br/>
            <tr>
              <a href="https://github.com/EricDeng1001/backend/"
                 target="_blank"
                 style="color:black;">关于论坛的后台建设</a>
            </tr>
            <br/>
            <tr>
              <a href="https://www.jhipster.tech/"
                 target="_blank"
                 style="color:black;">关于论坛的搭建</a>
            </tr>
            <br/>
            <tr>
              <a href="https://cn.vuejs.org/"
                 target="_blank"
                 style="color:black;">Vue相关知识</a>
            </tr>
            <br/>
            <tr>
              <a href="https://nodejs.org/en/"
                 target="_blank"
                 style="color:black;">JavaScript相关知识</a>
            </tr>
            <br/>
            <tr>
              <a href="https://www.runoob.com/mysql/mysql-tutorial.html"
                 target="_blank"
                 style="color:black;">MySQL相关教程</a>
            </tr>
          </table>
        </div>
      </v-card-text>
    </v-card>

    <!-- 增加返回顶部组件 -->


    <div class="py-3"/>
    <v-card style="height: 140px;">
      <v-card-title class="grey darken-3" style="color: white;">
        关于我们
      </v-card-title>
      <v-card-text>
        <table style="font-size:18px">
          <br/>
          <tr>
            <a
              href="https://docs.qq.com/doc/DSUdxS0hSVllXaktl?groupUin=9Q9g6KM5ja18PJ44LZrqCA%253D%253D&ADUIN=1105000185&ADSESSION=1599264250&ADTAG=CLIENT.QQ.5761_.0&ADPUBNO=27041&jumpuin=1105000185"
              style="color:black;"
              target="_blank"
            >面向用户设计</a>
          </tr>
        </table>
      </v-card-text>

    </v-card>
    <div class="content-container-top">
      <ScrollTop></ScrollTop>
    </div>
  </v-col>
</template>
<script>
  import NameCard from "../widget/NameCard";
  import axios from "~/plugins/axios";
  import ScrollTop from '../AppToTop';

  export default {
    name: 'CoreSideBar',
    data() {
      return {
        item:
          {
            jobTitle: "Authority:" + this.$store.state.authority,
            name: this.$store.state.username,
            color: "teal",
            avatar: {
              src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            }
          },
        judgeAuth: "",
      }
    },
    created() {
      this.judgeAuth = this.$store.state.authority;
    },
    components: {
      NameCard,
      ScrollTop
    },
    methods: {
      jumpToEditor() {
        this.$router.push('/editor')
      },
      jumpToManage() {
        this.$router.push('/manager')
      }
    }
  }
</script>
