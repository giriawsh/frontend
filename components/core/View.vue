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
            background-color="black darken-4"
            class="elevation-2"
            dark
            style="border-radius: 5px"
          >
            <v-tab
              v-for="n in 3"
              :key="n">
              Tab{{n}}
            </v-tab>
          </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                11111
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                22222
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                3333
              </v-card-text>
            </v-card>
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
        <div class="py-3" />
        <v-card style="height: 400px;">
          3
        </v-card>
        <div class="py-3" />
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
        text:'hahahahha',
      }
    }
  }
</script>
