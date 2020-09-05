<template>
  <v-col
    cols="12"
    md="8"
  >
    <v-tabs
      v-model="active"
      background-color="grey darken-4"
      dark
      style="border-radius: 5px"
    >
      <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.to" ripple>
        {{tab.name}}
      </v-tab>
    </v-tabs>
    <router-view :key="key"/>
  </v-col>
</template>
<script>
  import axios from '~/plugins/axios';

  export default {
    name: 'CoreView',
    data() {
      return {
        active: null,
        tabs: []
      }
    },
    computed: {
      key() {
        return this.$route.path + Math.random();
      },
    },
    async mounted() {
      const topics = await axios({
        method: 'get',
        url: '/topics'
      });
      const tabs = [{
        id: 'all',
        name: '浏览',
        to: `/`
      }, {
        id: 'new',
        name: '最新',
        to: `/new`
      }
      ];
      for (let t of topics["_embedded"].topics) {
        tabs.push({
          id: t.title,
          name: t.title,
          to: `/topic/${t.title}`
        })
      }
      this.tabs = tabs;
    },
  }
</script>
<style scoped>
  a {
    text-decoration: none;
    color: #F5F5F5;
  }
</style>
