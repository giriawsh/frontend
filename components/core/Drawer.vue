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
            <div class="brand">
              <h1>北邮作业版论坛</h1>
              <h3>Let's take a look</h3>
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
  .brand {
    color: #FAFAFA;
    text-align: center;
  }

  .brand h1 {
    font-size: 4.8rem;
    font-weight: 600;
    display: inline-block;
    position: relative;
    line-height: 1.3em;
    text-shadow: 0px 15px 102.86px rgba(0, 0, 0, 0.7), 0px 15px 40.02px rgba(0, 0, 0, 0.21);
  }

  .brand h3 {
    font-size: 2.23rem;
    margin: 10px auto 0;
    line-height: 0;
    font-weight: 300;
    text-shadow: 0px 15px 102.86px rgba(0, 0, 0, 0.9), 0px 15px 40.02px rgba(0, 0, 0, 0.51);
  }


</style>
