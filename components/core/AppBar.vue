<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />
    <v-container class="mx-auto py-0">
      <v-img
        :src="require('@/assets/temp.png')"
        class="mr-5"
        contain
        height="48"
        width="48"
        max-width="48"
      />
      <v-btn
        v-for="(link, i) in links"
        :key="i"
        v-bind="link"
        class="hidden-sm-and-down"
        text
        @click="myOnClick($event, link)"
      >
        {{link.text}}
      </v-btn>
      <v-spacer/>
      <v-text-field
        append-icon="mdi-magnify"
        flat
        hide-details
        solo-inverted
        style="max-width: 200px;"
      />
      <v-btn icon
            style="right:2px">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-menu
        offset-y
      >
        <template v-slot:activator="{on, attrs}">
          <v-btn
            icon
            v-on="on"
            style="right:0px"
          >
            <v-icon>
              mdi-account-circle
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in profile_items"
            v-if="judge !== undefined && judge !== ''"
            :key="i"
            @click="handleLogoutClick"
          >
            <v-list-item-title>
              {{item.title}}
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="(item, i) in login_items"
            v-if="judge === undefined || judge === ''"
            :key="i"
            @click="handleLoginClick"
          >
            <v-list-item-title>
              {{item.title}}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>
<script>
  import {
    mapGetters,
    mapMutations,
  } from 'vuex'
  import axios from "~/plugins/axios";

  export default {
    name: 'CoreAppBar',
    data() {
      return {
        profile_items: [
          { title: '退出登录' },
        ],
        login_items: [
          { title: '登录' },
        ],
        judge: "",
      }
    },
    computed: {
      ...mapGetters(['links'])
    },
    mounted() {
      this.firstMount();
    },
    methods: {
      ...mapMutations(['toggleDrawer']),
      myOnClick(e, item)
      {
        e.stopPropagation();
        if(item.to || !item.href) return;
        this.$router.go(item.href);
      },
      async handleLogoutClick(){
        let response = await axios.post({
          url: '/logout'
        });
        this.$store.commit('setUsername', "");
        this.$store.commit('setAuthority', "");
        this.firstMount();
        await this.$router.push('/');
      },
      handleLoginClick(){
        this.$router.push('/login');
      },
      firstMount(){
        this.judge = this.$store.state.username;
        console.log(this.judge);
      }
    },
  }
</script>
