<template>
  <v-col
    cols="12"
    md="8"
  >
    <v-card justify="start" align="start">
      <v-card-title class="grey darken-4" style="color: white;" v-text="title">
      </v-card-title>
      <v-card-text>
        111
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
  export default {
    name: 'CoreManager',
    data(){
      return {
        title: "管理用户"
      }
    }
  }
</script>
