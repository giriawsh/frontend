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
        标题1
      </v-card-title>
      <v-card-text>
        1
      </v-card-text>
    </v-card>
    <div class="py-3"/>
    <v-card style="height: 400px;">
      <v-card-title class="grey darken-3" style="color: white;">
        标题2
      </v-card-title>
      <v-card-text>
        2
      </v-card-text>
    </v-card>
    <div class="py-3"/>
    <v-card style="height: 400px;">
      <v-card-title class="grey darken-3" style="color: white;">
        标题3
      </v-card-title>
      <v-card-text>
        3
      </v-card-text>
    </v-card>
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
    created() {
      this.judgeAuth = this.$store.state.authority;
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
