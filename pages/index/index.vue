<template>
  <v-card>
    <v-card-text>

      <div class="text-center">
        <v-list two-line>
          <v-list-item-group
            :page.sync="page"
          >
            <template v-for="(post, index) in posts">
              <v-list-item
                :key="index"
                @click="handlePostClick(post.id)"
              >
                <template>
                  <table>
                    <v-list-item-content>
                      <table style="text-align:left;
                                  font-size:30px;
                                  font-weight:bold;">
                        <th>
                          <v-list-item-title v-text="post.title"
                                             style="font-size:20px;
                                                   font-weight:bolder;"/>
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
                              style="width:75px;
                                            font-size:12px;
                                            height:20px;">
                              <v-icon left>mdi-label</v-icon>
                              {{post.topic}}
                            </v-chip>
                          </span>
                          </td>
                          <td style="text-align:right;
                                    width:1000px;">
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
        <!--        <v-data-table-->
        <!--          :headers="headers"-->
        <!--          :items="posts"-->
        <!--          :page.sync="page"-->
        <!--          :items-per-page="itemsPerPage"-->
        <!--          hide-default-footer-->
        <!--          class="elevation-1"-->
        <!--        >-->
        <!--        </v-data-table>-->
        <v-pagination
          v-model="page"
          :length="pageLength"
          :total-visible="pageVisible"
          circle
          @input="onPageChange"
        >
        </v-pagination>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  import axios from "~/plugins/axios";

  export default {
    props: ['foobar'],
    data() {
      return {
        page: 1,//当前页面号
        pageLength: 0,//总页面数
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
    methods: {
      async onPageChange(page) {
        this.page = page;
        await this.getData();
      },
      async getData() {
        this.posts = [];
        let response = await axios({
          url: `/posts?size=${this.itemsPerPage}&page=${this.page - 1}&sort=rank,desc`,
          method: 'get'
        });
        let tempPost = response['_embedded']['posts'];
        this.pageLength = response.page.totalPages;
        const total = tempPost.length;

        const posts = [];
        for (let i = 0; i < total; i++) {
          var d = new Date(tempPost[i]['dateTime']);
          var s = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
          var publisher = await axios({
            url: tempPost[i]['_links']['publisher']['href'],
            method: 'get'
          });
          var topic = await axios({
            url: tempPost[i]['_links']['topic']['href'],
            method: 'get'
          });


          posts.push({
            id: tempPost[i]['id'],
            title: tempPost[i]['title'],
            dateTime: s,
            publisher: publisher['username'],
            viewCount: tempPost[i]['viewCount'],
            commentCount: tempPost[i]['commentCount'],
            likeCount: tempPost[i]['votesCount'],
            topic: topic['title'],
          });

        }
        this.posts = posts;
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
        }
      },
      deep: true
    },
    mounted() {
      this.getData();
    }
  }
</script>
