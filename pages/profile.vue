<template>
  <v-container
    fluid
  >
    <div style="
              width:1000px;
              position:absolute;
              top:-20px">
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
        >
          <the-breadcrumb layout-class="pl-3 pb-0"/>
          <div class="py-3"/>
          <v-content>
            <v-card>
              <v-card-title class="grey darken-3" style="color: white;">
                用户信息
              </v-card-title>
            <v-card-text>
              <br/>
              <v-layout row>
                <v-flex >
                  ————————————————————账户信息————————————————————
                </v-flex>
              </v-layout>
              <br/>

              <v-layout row>
                <v-flex xs2>
                  <v-subheader>头像:</v-subheader>
                </v-flex>
                <v-flex xs8>
                 <img :src="require('@/assets/photo.jpg')"
        
                      height="120"
                      width="120"
                      max-width="120"/>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs2>
                  <v-subheader>UserName:</v-subheader>
                </v-flex>
                <v-flex xs8>
                 <span>{{user.username}}</span>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs2>
                  <v-subheader>性别：</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <span>
                    user.sex
                  </span>
                </v-flex>
              </v-layout>

              <br/>
              <v-layout row>
                <v-flex >
                  ————————————————————已发布帖子————————————————————
                </v-flex>
              </v-layout>
              <br/>
              <v-flex>
                <v-btn
                  @click="jumpBack"
                  large
                  color="primary"
                  width="100px"
                >
                  返回
                </v-btn>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-content>
      </v-col>
    </v-row>
  </div>
  </v-container>
</template>
<script>
  import TheBreadcrumb from "../components/TheBreadcrumb";
  export default {
    components:{
      TheBreadcrumb
    },
    data() {
      return {
        user: {
          username: "",
          password: "",
          sex: "",
        },

      }
    },
    mounted() {
      console.log("!!!");
      console.log(this.$store.state.username);
      this.username = this.$store.state.username;
    },
    methods: {
      jumpBack() {
        this.$router.push('/')
      }
    }
  }
</script>
<style>
  @import "../assets/public.css";
</style>
