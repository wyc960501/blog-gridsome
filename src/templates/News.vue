<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card
        shadow="never"
        style="min-height: 400px"
        v-if="$static.news.edges[0].node.id"
      >
        <div slot="header">
          <span>{{ $static.news.edges[0].node.title }}</span>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          发布 {{ $static.news.edges[0].node.createTime }} <br />
          更新 {{ $static.news.edges[0].node.updateTime }}
        </div>
        <div
          style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px"
        >
          <pre style="font-family: '微软雅黑'">{{
            $static.news.edges[0].node.description
          }}</pre>
        </div>
        <div
          v-html="mdToHtml($static.news.edges[0].node.content)"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
      </el-card>
      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
        v-else
      >
        <font style="font-size: 30px;color:#dddddd ">
          <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<static-query>
query {
  news:allNewsBlog {
    edges {
      node {
        id
    		title
        content
        description
        createTime
        updateTime
      }
    }
  }
}
</static-query>

<script>
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
export default {
  name: "NewsPage",
  metaInfo: {
    title: "最新动态",
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    mdToHtml(markdown) {
      return md.render(markdown);
    },
  },
};
</script>

<style>
.markdown-body img {
  width: 100%;
}
</style>
