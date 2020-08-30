<template>
  <v-card>
    <v-card-text>

      <div class="text-center">
        <v-data-table
          :headers="headers"
          :items="posts"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        >
        </v-data-table>
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
    <v-btn
      color="info"
      class="ma-2 white-text"
      @click="jumpToEditor"
    >
      <v-icon left dark>mdi-plus</v-icon>
      Comment
    </v-btn>
  </v-card>
</template>
<script>
  import axios from "~/plugins/axios";

  export default {
    props: ['foobar'],
    data() {
      return {
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
            value: 'dataTime',
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
          }
        ],
        itemsPerPage: 10,//每页条目数
        posts: [],
        totalPosts: 0,
      }
    },
    methods: {
      jumpToEditor() {
        this.$router.push('/login')
      },
      async onPageChange(page){
        //重写一遍将不会出现硬刷新问题（原理未知）
        let response = await axios({
          url: `/posts?size=${this.itemsPerPage}&page=${this.page - 1}`,
          method: 'get'
        });
        let tempPost = response['_embedded']['posts'];
        const total = tempPost.length;
        // console.log(tempPost);
        this.posts = [];
        for (let i = 0; i < total; i++) {
          this.posts.push({
            id: tempPost[i]['id'],
            title: tempPost[i]['title'],
            dataTime: tempPost[i]['dataTime'],
            viewCount: tempPost[i]['viewCount'],
            commentCount: tempPost[i]['commentCount'],
          })
        }
        // console.log(this.posts);
      },
      async getData() {
        this.posts = [];
        let response = await axios({
          url: `/posts?size=${this.itemsPerPage}&page=${this.page - 1}`,
          method: 'get'
        });
        let tempPost = response['_embedded']['posts'];
        const total = tempPost.length;

        // console.log(tempPost);
        for (let i = 0; i < total; i++) {
          this.posts.push({
            id: tempPost[i]['id'],
            title: tempPost[i]['title'],
            dataTime: tempPost[i]['dataTime'],
            viewCount: tempPost[i]['viewCount'],
            commentCount: tempPost[i]['commentCount'],
          })
        }
        // console.log(this.posts);
      }
    },
    watch: {
      options: {
        handler() {
          this.getData();
          console.log("page="+this.page);
        }
      },
      deep: true
    },
    mounted() {
      this.getData();
    },
  }
</script>
