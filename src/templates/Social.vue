<template>
  <Layout>
    <el-card
      shadow="never"
      style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px"
    >
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane :label="'粉丝 '" name="followers" style="padding: 5px">
          <div>
            <div v-if="$page.followers">
              <el-row style="min-height: 200px; ">
                <el-col
                  :span="8"
                  v-for="(item, index) in $page.followers.edges"
                  :key="'followers' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px;color: #606266;line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link
                      :to="$url(`/social/${item.node.name}`)"
                      style=" text-decoration:none;cursor:pointer"
                      >{{ item.node.name }}</g-link
                    >
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <g-link
                      :to="item.node.avatarUrl"
                      target="_blank"
                      style=" text-decoration:none;cursor:pointer"
                      >TA的主页</g-link
                    >
                    <br />
                    <img
                      :src="item.node.avatar"
                      style="width: 100%;border-radius:5px;margin-top: 5px"
                    />
                  </el-card>
                </el-col>
              </el-row>
              <div class="pagination" style="text-align: center">
                <pager :info="$page.followers.pageInfo" linkClass="page" />
              </div>
            </div>
            <div
              style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
              v-else
            >
              <font style="font-size: 30px;color:#dddddd ">
                <b>(￢_￢) 没有一个粉丝</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'关注 '" name="following" style="padding: 5px">
          <div>
            <div v-if="$page.following">
              <el-row style="min-height: 200px; ">
                <el-col
                  :span="8"
                  v-for="(item, index) in $page.following.edges"
                  :key="'following' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px;color: #606266;line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link
                      :to="$url(`/social/${item.node.name}`)"
                      style=" text-decoration:none;cursor:pointer"
                      >{{ item.node.name }}</g-link
                    >
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <g-link
                      :to="item.node.avatarUrl"
                      target="_blank"
                      style=" text-decoration:none;cursor:pointer"
                      >TA的主页</g-link
                    >
                    <br />
                    <img
                      :src="item.node.avatar"
                      style="width: 100%;border-radius:5px;margin-top: 5px"
                    />
                  </el-card>
                </el-col>
              </el-row>
              <div class="pagination" style="text-align: center">
                <pager :info="$page.following.pageInfo" linkClass="page" />
              </div>
            </div>
            <div
              style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
              v-else
            >
              <font style="font-size: 30px;color:#dddddd ">
                <b>(￢_￢) 还没有关注一个人</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </Layout>
</template>

<page-query>
query($page: Int) {
  followers: allFollowers (perPage: 9, page: $page, order: ASC) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node{
        id
        name
        avatar
        avatarUrl
      }
    }
  }
  
  following: allFollowing (perPage: 9, page: $page, order: ASC) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node{
        id
        name
        avatar
        avatarUrl
      }
    }
  }
}
</page-query>

<script>
import { Pager } from "gridsome";
export default {
  name: "SocialPage",
  metaInfo: {
    title: "社交圈详情",
  },
  components: {
    Pager,
  },
  data() {
    return {
      activeTab: "followers",
    };
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
