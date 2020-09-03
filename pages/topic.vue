<template>
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
</template>

<script>
  import CoreAppBar from '~/components/core/AppBar.vue'
  import CoreDrawer from '~/components/core/Drawer.vue'
  import CoreFooter from '~/components/core/Footer.vue'
  import CoreView from '~/components/core/View.vue'
  import CoreSideBar from '~/components/core/SideBar.vue'

  export default {
    name: "index",
    components: {
      CoreAppBar,
      CoreDrawer,
      CoreFooter,
      CoreView,
      CoreSideBar
    }
  }
</script>

<style>
  @import "../assets/public.css";
</style>
