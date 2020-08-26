<template>
  <v-footer
    class="justify-center"
    color="#292929"
    height="100"
  >
    <div class="title font-weight-light grey--text text--lighten-1 text-center">
      &copy; {{ (new Date()).getFullYear() }} — Powered 💜 by BUPT Homework Team
    </div>
  </v-footer>
</template>
<script>
  export default {
    name: 'CoreFooter',
  }
</script>
