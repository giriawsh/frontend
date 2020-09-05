<template>
  <v-container class="for_profile"
               fluid
  >
    <div>
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
        >
          <the-breadcrumb layout-class="pl-3 pb-0"/>
          <div class="py-3"/>
          <v-content>
            <v-card>
              <v-card-title class="grey darken-3" style="color: white;">
                用户信息
              </v-card-title>
              <v-card-text>
                <br/>
                <v-layout row>
                  <v-flex >
                    ————————————————————账户信息————————————————————
                  </v-flex>
                </v-layout>
                <br/>

                <v-layout row>
                  <v-flex xs2>
                    <v-subheader>头像:</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <img :src="require('@/assets/photo.jpg')"

                         height="120"
                         width="120"
                         max-width="120"/>
                  </v-flex>
                </v-layout>
                <div class="py-3"/>
                <v-layout row>
                  <v-flex xs2>
                    <v-subheader>UserName:</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <span>{{user.username}}</span>
                  </v-flex>
                </v-layout>

                <br/>
                <v-layout row>
                  <v-flex >
                    ————————————————————已发布帖子————————————————————
                  </v-flex>
                </v-layout>
                <br/>
                <table>
                  <div class="text-center"
                       >
                    <v-list two-line>
                      <v-list-item-group
                        :page.sync="page"
                      >
                        <template v-for="(post, index) in posts">
                          <v-list-item
                            :key="index"
                            @click="handlePostClick(post.id)"
                          >
                            <template >
                              <table style="
                                margin:auto;
                                margin-left:4px;">
                                <v-list-item-content>
                                  <table style="
                                  text-align:left;
                                  font-size:30px;
                                  font-weight:bold;">
                                    <th>
                                      <v-list-item-title v-text="post.title"
                                                         style="font-size:20px;
                                                   font-wight:bolder;"/>
                                    </th>
                                  </table>
                                  <br/>
                                  <br/>
                                  <table>
                                    <tr style="text-align:left;
                                  font-size:15px;
                                  font-weight:bold;">
                                      <v-list-item-subtitle v-text="'作者：'+post.publisher">
                                      </v-list-item-subtitle>
                                    </tr>
                                    <tr>
                                      <td style="text-align:left;">
                          <span>
                            <v-chip
                              label
                              color="pink"
                              text-color="white"
                              style="width:90px;
                                            font-size:12px;
                                            height:20px;">
                              <v-icon left>mdi-label</v-icon>
                              {{post.topic}}
                            </v-chip>
                          </span>
                                      </td>
                                      <td style="text-align:right;
                                    width:800px">
                          <span class="grey--text text--darken-1">
                            <v-icon small>mdi-comment</v-icon>
                            <small v-text="post.commentCount"/>
                          </span>
                                        <span class="grey--text text--darken-1 mx-3">
                            <v-icon small>mdi-cards-heart</v-icon>
                            <small v-text="post.likeCount"/>
                          </span>
                                        <span class="grey--text text--darken-1">
                            <v-icon small>mdi-eye</v-icon>
                            <small v-text="post.viewCount"/>
                          </span>
                                      </td>
                                      <td style="width:200px;
                                    text-align:right;">
                                        <v-list-item-action>
                                          <v-list-item-action-text v-text="'发表于 '+post.dateTime">
                                          </v-list-item-action-text>
                                        </v-list-item-action>
                                      </td>
                                    </tr>
                                  </table>
                                </v-list-item-content>
                              </table>
                            </template>
                          </v-list-item>
                          <v-divider>
                          </v-divider>
                        </template>
                      </v-list-item-group>
                    </v-list>
                  </div>
                </table>

                <v-flex>
                  <v-btn
                    @click="jumpBack"
                    large
                    color="primary"
                    width="100px"
                  >
                    返回
                  </v-btn>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-content>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
  import axios from "~/plugins/axios";
  import TheBreadcrumb from "../components/TheBreadcrumb";
  export default {
    props: ['foobar'],
    middleware: 'auth',
    components:{
      TheBreadcrumb
    },
    data() {
      return {
        user: {
          username: "",
          password: "",
          sex: "",
        },
        page: 1,//当前页面号
        pageLength: 20,//总页面数
        pageVisible: 7,//分页条中可见页面号数
        headers: [//id title content dataTime viewCount commentCount
          {
            text: 'id',
            align: 'start',
            sortable: false,
            value: 'id'
          },
          {
            text: '标题',
            value: 'title',
            sortable: false,
          },
          {
            text: '发表时间',
            value: 'dateTime',
            sortable: false,
          },
          {
            text: '浏览数',
            value: 'viewCount',
            sortable: false,
          },
          {
            text: '评论数',
            value: 'commentCount',
            sortable: false,
          },
          {
            text: '点赞数',
            value: 'likeCount',
            sortable: false,
          },
          {
            text: '发表人',
            value: 'publisher',
            sortable: false,
          },
          {
            text: '版块',
            value: 'topic',
            sortable: false,
          }
        ],
        itemsPerPage: 10,//每页条目数
        posts: [],
        totalPosts: 0,
      }
    },
    mounted() {
      this.user.username = this.$store.state.username;
      this.getData();
    },
    methods: {
      jumpBack() {
        this.$router.push('/')
      },
      async getData() {
        this.posts = [];
        let response = await axios({
          url: `/users/${this.user.username}/posts`,
          method: 'get'
        });
        let tempPost = response['_embedded']['posts'];
        const total = tempPost.length;

        // console.log(tempPost);
        for (let i = 0; i < total; i++) {
          var d = new Date(tempPost[i]['dateTime']);
          var s = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
          var Author = await axios({
            url: tempPost[i]['_links']['self']['href'],
            method: 'get'
          });
          console.log("topic = " + Author['topic']['title']);
          this.posts.push({
            id: tempPost[i]['id'],
            title: tempPost[i]['title'],
            dateTime: s,
            publisher: Author['publisher']['username'],
            viewCount: tempPost[i]['viewCount'],
            commentCount: tempPost[i]['commentCount'],
            likeCount: tempPost[i]['votesCount'],
            topic: Author['topic']['title'],
          })
        }
        // console.log(this.posts);
      },
      handlePostClick(id) {
        console.log("click on" + id);
        this.$router.push('/post/' + id);
      }
    },
    watch: {
      options: {
        handler() {
          this.getData();
          console.log("page=" + this.page);
        }
      },
      deep: true
    },
  }
</script>
<style>
  @import "../assets/public.css";
  .for_profile{
    min-height: 150vh;
  }
</style>
