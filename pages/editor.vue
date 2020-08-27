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
        <v-content>
          <the-breadcrumb layout-class="pl-3 pb-0"/>
          <v-container fluid>
            <v-slide-y-transition mode="out-in">
              <mavon-editor :toolbars="markdownOption" v-model="handbook" style="width: 100%; height: 800px;"/>
            </v-slide-y-transition>
          </v-container>
        </v-content>
      </v-col>
    </v-row>
  </v-container>

</template>
<script>
  import TheBreadcrumb from "../components/TheBreadcrumb";

  export default {
    components: {TheBreadcrumb},
    data() {
      return {
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
        handbook: "#### 这是手册",
      }
    }
  }
</script>
<style>
  @import "../assets/public.css";
</style>
