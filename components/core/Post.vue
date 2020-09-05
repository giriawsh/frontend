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
            color="pink"
            text-color="white"
          >
            <v-icon left>mdi-label</v-icon>
            {{topic}}
          </v-chip>
          <div>

              <v-dialog v-model="editDialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">板块变更</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-select
                            :items="selectItems"
                            label="Change Topic"
                            outlined
                            v-model="selectTopic"
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer>
                    </v-spacer>
                    <v-btn color="blue darken-1" text @click="handleCancel">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="changeTopic">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            <template>
              <v-btn
                text
                color="info"
                @click="editDialog = true"
              >
                变更板块
                <v-icon right>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </div>
          <v-row
            align="center"
            justify="end"
          >
            <v-icon class="mr-1" @click="like" v-if="likeId===0">mdi-heart-outline</v-icon>

            <v-icon class="mr-1" @click="deleteLike" v-if="likeId!==0">mdi-heart</v-icon>
            <span class="subheading mr-2">{{likeCount}}</span>
            <span class="mr-1">  </span>
            <v-icon class="mr-1">mdi-comment</v-icon>
            <span class="subheading mr-2">{{commentCount}}</span>
            <span class="mr-1">  </span>
            <v-icon class="mr-1">mdi-eye</v-icon>
            <span class="subheading mr-2">{{viewCount}}</span>
            <span class="subheading mr-2" v-if="judgeAuth === true">
              <v-icon class="mr-1" @click="deletePost">mdi-delete</v-icon>
            </span>
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
              <a-tooltip title="Delete" v-if="item.auth === true">
                <a>
                  <a-icon
                    type="delete"
                    color="#1976d2"
                  >
                  </a-icon>
                </a>
              </a-tooltip>
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
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        comments: [],
        submitting: false,
        value: '',
        likeId: 0,
        judgeAuth: this.judge(),
        selectItems: [],
        editDialog: false,
        selectTopic: "",
      }
    },
    async mounted() {
      this.init();
    },
    methods: {
      async init() {
        let url = "http://localhost:8091/api/posts/" + this.$route.params.id;
        let topicsPromise = await axios({
          url: 'http://localhost:8091/api/topics/',
          method: 'get'
        });
        let response = await axios({
          url: url,
          method: 'get',
        });
        let topics = await topicsPromise;
        this.selectItems = topics['_embedded'].topics.map(topic => topic.title);
        this.title = response.title;
        this.content = response.content;
        var d = new Date(response.dateTime);
        this.dateTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
        this.author = response.publisher.username;
        this.viewCount = response.viewCount;
        this.commentCount = response.commentCount;
        this.likeCount = response.votesCount;
        this.topic = response.topic.title;
        for (let v of response.votes) {
          if (v.user.username === this.$store.state.username) {
            this.likeId = v.id;
          }
        }

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
          console.log("commenter=" + commenter);
          comments.push({
            id: commentResponse['_embedded']['comments'][i].id,
            author: commenter,
            content: commentResponse['_embedded']['comments'][i]['content'],
            dateTime: commentResponse['_embedded']['comments'][i]['dateTime'],
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            auth: this.$store.state.authority === 'admin' ? true : this.$store.state.username === commenter
          })
        }
        this.comments = comments;
      },
      async handleCommentSubmit() {
        if (!this.value) {
          return;
        }
        if (!this.$store.state.username) {
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
      },
      judge() {
        if (this.$store.state.authority === 'admin') {
          return true;
        } else return this.$store.state.username === this.author;
      },
      async deletePost() {
        let response = await axios.delete("/posts/" + this.$route.params.id);
        alert("successfully delete");
        await this.$router.push("/");
      },
      async like() {
        let response = await axios.post('/votes/', {
          post: 'http://localhost:8091/api/posts/' + this.$route.params.id,
          user: 'http://localhost:8091/api/users/' + this.$store.state.username
        });
        this.likeId = response.id;
        this.likeCount++;
      },
      async deleteLike() {
        let response = await axios.delete('/votes/' + this.likeId);
        this.likeCount--;
        this.likeId = 0;
      },
      async changeTopic() {
        let response = await axios.patch("/posts/" + this.$route.params.id, {
          topic: 'http://localhost:8091/api/topics/' + this.selectTopic
        });
        this.editDialog = false;
        this.topic = this.selectTopic;
      },
      handleCancel(){
        this.editDialog = false;
        this.selectTopic = "";
      }
    }
  }
</script>
<style>

</style>
