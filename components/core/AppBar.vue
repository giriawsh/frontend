<template>
  <v-app-bar
    app
    flat
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />
    <v-container class="mx-auto py-0">
      <v-img

      />
    </v-container>

  </v-app-bar>
</template>
<script>
  import {
    mapGetters,
    mapMutations,
  } from 'vuex'
  export default{
    name:'CoreAppBar',
    methods: {
      ...mapMutations(['toggleDrawer']),

    }
  }
</script>
