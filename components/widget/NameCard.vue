<template>
  <div class="name-card">
    <v-card ref="card" :color="color" :dark="true" :img="cardBgImage">
      <v-card-text>
        <div class="layout ma-0 align-center">
          <v-avatar
            :size="96"
            color="primary"
          >
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
          <div class="flex">
            <div class="subheading">
              {{name}}
            </div>
            <span class="caption">
              {{jobTitle}}
            </span>
          </div>
        </div>
      </v-card-text>
    </v-card>

  </div>
</template>
<script>
  export default {
    props: {
      name: {
        type: String,
        default: ""
      },
      jobTitle: {
        type: String,
        default: ""
      },
      // eslint-disable-next-line vue/require-default-prop
      cardBgImage: {
        type: String
      },
      color: {
        type: String,
        default: ""
      },
      dark: {
        type: Boolean,
        default: false
      },
      bottomNav: {
        type: Boolean,
        default: false
      },
      topNav: {
        type: Boolean,
        default: false
      },
    }
  }
</script>
<style scoped>
  .caption{
    font-size: 40px;
  }
  .subheading {
    font-weight: 300;
    font-size: 20px;
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
</style>
