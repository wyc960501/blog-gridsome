<template>
  <Layout>
    <div>
      <el-card
        shadow="hover"
        v-for="(item, index) in $page.blogs.edges"
        :key="'p' + index"
        style="margin-bottom: 20px"
      >
        <div slot="header">
          <el-row>
            <el-col :span="16">
              <span>
                <g-link
                  style="text-decoration:none;cursor:pointer"
                  :to="$url('/blog/') + item.node.id"
                >
                  <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                  {{ item.node.title }}
                </g-link>
              </span>
            </el-col>
            <el-col :span="8">
              <div style="text-align: right;">
                <el-button
                  @click="$share($url('/blog/') + item.node.url)"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-share"
                ></el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          最近更新 {{ item.node.updateTime }}
        </div>
        <div
          style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px"
        >
          {{ item.node.description }}
        </div>
      </el-card>
      <div class="pagination" style="text-align: center">
        <pager :info="$page.blogs.pageInfo" linkClass="page" />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query($page: Int) {
  blogs: allBlogs (perPage: 5, page: $page, order: ASC) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        createTime
        description
        createTime
        updateTime
      }
    }
  }
}
</page-query>

<script>
import { Pager } from "gridsome";
export default {
  name: "Blogs",
  metaInfo: {
    title: "博客",
  },
  components: {
    Pager,
  },
};
</script>

<style>
.pagination .page {
  display: inline-block;
  margin: 0 5px;
  padding: 0 4px;
  background: #fff;
  font-size: 13px;
  font-weight: bold;
  min-width: 30px;
  height: 28px;
  line-height: 28px;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #f4f4f5;
  color: rgb(24, 26, 27);
}

.pagination .page.active {
  background-color: #409eff;
  color: #fff;
}
</style>
