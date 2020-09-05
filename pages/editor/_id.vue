<template>
  <v-container
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="10"
      >
        <the-breadcrumb layout-class="pl-3 pb-0"/>
        <template>
          <v-main>
            <v-form v-model="isValid">
              <v-layout row>
                <v-flex>
                  <v-subheader>标题:</v-subheader>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="请输入标题"
                    v-model="title"
                    :counter="25"
                    :rules="titleRules"
                    single-line
                    required
                  >
                  </v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex>
                  <v-subheader>板块选择：</v-subheader>
                </v-flex>
                <v-flex>
                  <v-select
                    v-model="type"
                    :items="topics"
                    :rules="[v=>!!v || '请选择板块']"
                    required
                    style="z-index: 1500"
                  >
                  </v-select>
                </v-flex>
              </v-layout>
            </v-form>
            <v-container fluid>
              <mavon-editor :toolbars="markdownOption" v-model="post.content" style="width: 100%; height: 800px;"
                            :ishljs="true" @change="updateDoc" @save="saveDoc"/>
            </v-container>
            <v-flex>
              <v-btn
                :loading="postLoading"
                @click="postDoc"
                large
                color="primary"
                width="100px"
                :disabled="!isValid"
              >
                更新
              </v-btn>
            </v-flex>
          </v-main>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import TheBreadcrumb from "../../components/TheBreadcrumb";
  import axios from "~/plugins/axios";

  export default {
    middleware: 'auth',
    components: {TheBreadcrumb},
    data() {
      return {
        title: "",
        type: '',
        alertDialog: false,
        isValid: false,
        topics: [
        ],
        postLoading: false,
        items: [
          {
            text: "主页",
            disabled: false,
            href: '/articles'
          },
          {
            text: "发布帖子",
            disabled: true
          }
        ],
        titleRules: [
          v => !!v || '标题不能为空',
          v => v.length <= 25 || '请勿超过25个字'
        ],
        markdownOption: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          // superscript: true, // 上角标
          // subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          // imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          navigation: true, // 导航目录
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
        post: {
          content: "",
          html: "",
        }
      }
    },
    async mounted(){
      let url = "http://localhost:8091/api/posts/" + this.$route.params.id;
      let response = await axios({
        url: url,
        method: 'get',
      });
      let flag = false;
      if (this.$store.state.authority === 'admin') {
        flag = true;
      } else flag = (this.$store.state.username === response.publisher.username);
      if(!flag){
        alert("您不是本贴的作者，不可进行编辑!");
        this.$router.push('/');
      }

      const topics = await axios({
        method: 'get',
        url: '/topics'
      });
      let tempTopics = [];
      for (let t of topics["_embedded"].topics) {
        tempTopics.push(t.title)
      }
      this.topics = tempTopics;
      this.title = response.title;
      this.type = response.topic.title;
      this.post.content = response.markdown;
    },
    methods: {
      updateDoc(markdown, render) {
        // console.log("markdownupdate=" + markdown);
        // console.log("htmlupdate=" + render);
        this.html = render;
      },
      saveDoc(markdown, render) {
        // console.log("markdownsave=" + markdown);
        // console.log("htmlsave=" + render);
        this.html = render;
      },
      async postDoc() {
        var author = "http://localhost:8091/api/users/" + this.$store.state.username;
        console.log("author=" + author);
        var topic = "http://localhost:8091/api/topics/" + this.type;
        let response = await axios.post(
          '/posts',
          {
            title: this.title,
            content: this.html,
            publisher: author,
            topic: topic,
          }
        );
        console.log(response);
        this.$router.push('/post/' + response.id);
      },
    },
    // updated() {
    //   console.log("type="+this.type);
    // }
  }
</script>
<style>
  @import "assets/public.css";
</style>
