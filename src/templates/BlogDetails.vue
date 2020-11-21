<template>
  <Layout>
    <div v-if="$context" style="min-height: 600px">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <el-row>
            <el-col :span="12">
              <span>{{ $context.title }}</span>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right;">
                <el-button
                  @click="$share()"
                  style="padding: 3px 0;margin-right:15px"
                  type="text"
                  icon="el-icon-share"
                  >分享</el-button
                ><g-link :to="$url('/blog')">
                  <el-button
                    style=" padding: 3px 0"
                    type="text"
                    icon="el-icon-more-outline"
                    >更多博客</el-button
                  ></g-link
                >
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          发布 {{ $context.createTime }} <br />
          更新 {{ $context.updateTime }}
        </div>
        <div
          style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px"
        >
          <pre style="font-family: '微软雅黑'">{{ $context.description }}</pre>
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<script>
export default {
  name: "BlogDetails",
  metaInfo: {
    title: "博客详情",
  },
};
</script>

<style></style>
