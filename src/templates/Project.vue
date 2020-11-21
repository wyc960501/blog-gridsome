<template>
  <Layout>
    <div v-if="$page.projects">
      <el-card
        shadow="hover"
        v-for="(item, index) in $page.projects.edges"
        :key="'pro' + index"
        style="margin-bottom: 20px"
      >
        <div slot="header">
          <el-row>
            <el-col :span="16">
              <span>
                <g-link
                  style="text-decoration:none;cursor:pointer"
                  :to="$url('/project/' + item.node.id)"
                >
                  <i class="el-icon-service"></i>&nbsp;&nbsp;
                  {{ item.node.name }}
                </g-link>
              </span>
            </el-col>
            <el-col :span="8">
              <div style="text-align: right;">
                <g-link
                  :to="item.node.url"
                  style="padding: 3px 0;font-size:14px;margin-right:15px;"
                  type="text"
                  ><i class="el-icon-back"></i> 前往GitHub</g-link
                >
                <el-button
                  @click="$share('/user/project/details/' + item.node.name)"
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
        <div style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px">
          <el-row>
            <el-col :span="16" style="padding-top: 5px">
              <el-tooltip
                effect="dark"
                :content="'star ' + item.node.stargazersCount"
                placement="bottom"
              >
                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{ item.node.stargazersCount }}
              <el-tooltip
                effect="dark"
                :content="'watch ' + item.node.watchersCount"
                placement="bottom"
              >
                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ item.node.watchersCount }}
              <el-tooltip
                effect="dark"
                :content="'fork ' + item.node.forksCount"
                placement="bottom"
              >
                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ item.node.forksCount }}
            </el-col>
            <el-col :span="8" style="text-align: right;">
              <el-tag
                size="small"
                type="danger"
                style="margin-right:15px;"
                v-if="item.node.license"
                >{{ item.node.license }}</el-tag
              >
              <el-tag size="small" type="success">{{
                item.node.language
              }}</el-tag>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <div class="pagination" style="text-align: center">
        <pager :info="$page.projects.pageInfo" linkClass="page" />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query($page: Int) {
  projects: allProjects (perPage: 5, page: $page, order: ASC) @paginate{
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
        url
        description
        stargazersCount
        watchersCount
        forksCount
        language
        license
        createTime
        updateTime
        hide
      }
    }  
  }
}
</page-query>

<script>
import { Pager } from "gridsome";
export default {
  name: "ProjectPage",
  metaInfo: {
    title: "开源项目",
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
