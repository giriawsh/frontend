<template>
    <v-col
      cols="12"
      md="8"
    >
        <v-card justify="start" align="start">
          <v-card-title class="grey darken-4" style="color: white;" v-text="title">
          </v-card-title>
          <v-card-text v-html="content" class="markdown-body" >
          </v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-chip
                label
                color="blue"
                text-color="white"
              >
                <v-icon left>mdi-label</v-icon>
                {{topic}}
              </v-chip>
              <v-row
                align="center"
                justify="end"
              >

                <v-icon class="mr-1">mdi-heart</v-icon>
                <span class="subheading mr-2">{{likeCount}}</span>
                <span class="mr-1">  </span>
                <v-icon class="mr-1">mdi-comment</v-icon>
                <span class="subheading mr-2">{{commentCount}}</span>
                <span class="mr-1">  </span>
                <v-icon class="mr-1">mdi-eye</v-icon>
                <span class="subheading mr-2">{{viewCount}}</span>
                <a-button type="primary">
                  Primary
                </a-button>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
    </v-col>
</template>
<script>
  import TheBreadcrumb from "../TheBreadcrumb";
  import axios from "~/plugins/axios";

  export default {
    name: 'CorePost',
    component: {
      TheBreadcrumb
    },
    data(){
      return {
        title: "",
        topic: "",
        content: "",
        dateTime: "",
        author: "",
        viewCount: "",
        likeCount: "",
        commentCount: "",
      }
    },
    async mounted() {
      // console.log(this.$route.params.id);
      let url = "http://localhost:8091/api/posts/" + this.$route.params.id;
      let response = await axios({
        url: url,
        method: 'get',
      });
      this.title = response.title;
      this.content = response.content;
      var d = new Date(response.dateTime);
      this.dateTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
      this.author = response.publisher.username;
      this.viewCount = response.viewCount;
      this.commentCount = response.commentCount;
      this.likeCount = response.votesCount;
      this.topic = response.topic.title;
    }
  }
</script>
<style>

</style>
