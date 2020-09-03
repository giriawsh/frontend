<template>
  <v-col
    cols="12"
    md="8"
  >
    <v-card justify="start" align="start">
      <v-card-title class="grey darken-4" style="color: white;" v-text="title">
      </v-card-title>
      <v-card-text v-html="content" class="markdown-body">
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

          </v-row>
        </v-list-item>
      </v-card-actions>
      <div>
        <a-list
          v-if="comments.length"
          :data-source="comments"
          item-layout="horizontal"
        >
          <a-list-item slot="renderItem" slot-scope="item" :key="item.id">
            <a-comment>
              <a slot="author">{{item.author}}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="User"
              />
              <p slot="content">
                {{item.content}}
              </p>
              <a-tooltip slot="datetime">
                <span> 发表于 {{ item.dateTime }}</span>
              </a-tooltip>
<!--              <a-tooltip slot="author"><span>{{item.author}}</span></a-tooltip>-->
            </a-comment>
          </a-list-item>
        </a-list>
        <a-comment>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="匿名用户"
          >
          </a-avatar>
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="4" :value="value" @change="handleCommentChange">
              </a-textarea>
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" :loading="submitting" type="primary" @click="handleCommentSubmit">
                发表评论
              </a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>
    </v-card>
  </v-col>
</template>
<script>
  import TheBreadcrumb from "../TheBreadcrumb";
  import axios from "~/plugins/axios";
  import moment from 'moment'

  export default {
    name: 'CorePost',
    component: {
      TheBreadcrumb
    },
    data() {
      return {
        title: "",
        topic: "",
        content: "",
        author: "",
        dateTime: "",
        viewCount: "",
        likeCount: "",
        commentCount: "",
        comments: [],
        submitting: false,
        value: '',
        likes: 0,
      }
    },
    async mounted() {
      this.getComment();
    },
    methods: {
      async getComment() {
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

        let commentResponse = await axios({
          url: '/posts/' + this.$route.params.id + '/comments',
          method: 'get',
        });
        let commentLen = commentResponse['_embedded']['comments'].length;
        var comments = [];
        for (let i = 0; i < commentLen; i++) {
          let commenterHref = await axios.get(commentResponse['_embedded']['comments'][i]['_links']['commenter']['href']) || "";
          console.log(commenterHref);
          let commenter = commenterHref['username'] || "匿名用户";
          console.log("commenter="+commenter);
          comments.push({
            id: commentResponse['_embedded']['comments'][i].id,
            author: commenter,
            content: commentResponse['_embedded']['comments'][i]['content'],
            dateTime: commentResponse['_embedded']['comments'][i]['dateTime'],
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          })
        }
        this.comments = comments;
      },
      async handleCommentSubmit() {
        if (!this.value) {
          return;
        }
        if(!this.$store.state.username)
        {
          return this.$router.push('/login');
        }
        this.submitting = true;
        // let date = new Date();
        // let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        console.log(this.$store.state.username);
        let response = await axios.post('/comments',
          {
            commenter: "http://localhost:8091/api/users/" + this.$store.state.username,
            content: this.value,
            post: "http://localhost:8091/api/posts/" + this.$route.params.id,
          });
        this.submitting = false;
        this.comments.push({
          id: response.id,
          author: this.$store.state.username,
          content: this.value,
          dateTime: response.dateTime,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        });
        this.value = '';
      },
      handleCommentChange(e) {
        this.value = e.target.value;
      }
    }
  }
</script>
<style>

</style>
