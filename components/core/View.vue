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
      <v-col
        cols="12"
        md="8"
      >
        <!--          <v-tabs-->
        <!--            v-model="tab"-->
        <!--            background-color="deep-blue accent-4"-->
        <!--            class="elevation-2"-->
        <!--            dark-->
        <!--          >-->
        <!--          <v-tabs-slider>-->
        <!--          </v-tabs-slider>-->
        <!--            <v-tab-->
        <!--              v-for="i in tabs"-->
        <!--              :key="i"-->
        <!--              :href="`#tab-${i}`"-->
        <!--            >-->
        <!--              Tab{{i}}-->
        <!--            </v-tab>-->
        <!--            <v-tab-item-->
        <!--              v-for="i in tabs"-->
        <!--              :key="i"-->
        <!--              :value="'tab-'+i">-->
        <!--              <v-card-->
        <!--                flat-->
        <!--                tile>-->
        <!--                <v-card-text>{{text}}</v-card-text>-->
        <!--              </v-card>-->
        <!--            </v-tab-item>-->
        <!--          </v-tabs>-->
        <v-tabs
          v-model="tabs"
          background-color="grey darken-4"
          dark
          style="border-radius: 5px"
        >
          <!--          原生的tab组件有一些问题，只有在页面中间才能进行切换，这块后面再看。现存还有点击区域的问题，后面打算替代现在的v-tab，采用button进行tabs设置-->
          <v-tab
            v-for="n in 3"
            :key="n">
            <nuxt-link to="/allarticles1" v-if="n===1" >
              板块{{n}}
            </nuxt-link>
            <nuxt-link to="/allarticles2" v-if="n===2" >
              板块{{n}}
            </nuxt-link>
            <nuxt-link to="/allarticles3" v-if="n===3">
              板块{{n}}
            </nuxt-link>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs" keep-alive>
          <v-tab-item>
            <!--            <v-card>-->
            <!--              <v-card-text>-->
            <!--                11111-->
            <!--              </v-card-text>-->
            <!--            </v-card>-->
            <nuxt-child keep-alive :foobar="123"/>
          </v-tab-item>
          <v-tab-item>
            <!--            <v-card>-->
            <!--              <v-card-text>-->
            <!--                22222-->
            <!--              </v-card-text>-->
            <!--            </v-card>-->
            <nuxt-child keep-alive :foobar="123"/>
          </v-tab-item>
          <v-tab-item>
            <!--            <v-card>-->
            <!--              <v-card-text>-->
            <!--                3333-->
            <!--              </v-card-text>-->
            <!--            </v-card>-->
            <nuxt-child keep-alive :foobar="123"/>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col
        cols="12"
        md="2"
      >
        <v-card style="height: 400px;">
          2
        </v-card>
        <div class="py-3"/>
        <v-card style="height: 400px;">
          3
        </v-card>
        <div class="py-3"/>
        <v-card style="height: 400px;">
          4
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="1"
      >

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    name: 'CoreView',
    data() {
      return {
        tab: null,
        tabs: 3,
        text: 'hahahahha',
      }
    }
  }
</script>
<style scoped>
  a {
    text-decoration: none;
    color: #F5F5F5;
  }
</style>
