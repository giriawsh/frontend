<template>
  <v-parallax
    :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
    :src="require('@/assets/froggy.jpg')"
  >
    <v-container fill-height>
      <v-row class="mx-auto">
        <v-col
          cols="12"
          md="12"
        >
          <div class="text-center">
            <div class="brand" >
              <h1 style="color: #d5d5d5 !important;">北邮迷你版论坛</h1>
              <h3 style="color: #d5d5d5 !important;">BYR BBS Mini</h3>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>
<script>
  export default {
    name: 'CoreDrawer',
    data() {
      return {

      }
    }
  }
</script>
<style scoped>
@import "../../assets/public.css";
</style>
