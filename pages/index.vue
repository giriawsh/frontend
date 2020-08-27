<template>
  <v-app>
    <core-app-bar/>

    <core-drawer/>

    <v-container
      fluid
      tag="section"
    >
      <v-row justify="center">
        <v-col
          cols="12"
          md="1"
        >

        </v-col>
        <core-view/>
        <core-side-bar/>

        <v-col
          cols="12"
          md="1"
        >
        </v-col>
      </v-row>
    </v-container>

    <core-footer/>
  </v-app>

  <!--      <v-btn>{{ title }}</v-btn>-->

</template>

<script>
  import Logo from '~/components/Logo.vue'
  import axios from '~/plugins/axios'
  import CoreAppBar from '~/components/core/AppBar.vue'
  import CoreDrawer from '~/components/core/Drawer.vue'
  import CoreFooter from '~/components/core/Footer.vue'
  import CoreView from '~/components/core/View.vue'
  import CoreSideBar from '~/components/core/SideBar.vue'

  export default {
    components: {
      CoreAppBar,
      CoreDrawer,
      CoreFooter,
      CoreView,
      CoreSideBar
    }
    // data() {
    //   return {
    //     title: '',
    //   }
    // },
    // mounted() {
    //   this.loadTitle();
    // },
    // components: {
    //   Logo
    // },
    // methods: {
    //   async loadTitle() {
    //     const data = await axios.get('/');
    //     console.log(data);
    //     this.title = data["_links"]["comments"]["templated"];
    //   }
    // }
  }
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
