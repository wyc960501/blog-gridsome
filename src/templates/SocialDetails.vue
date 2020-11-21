<template>
  <Layout>
    <div>
      <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;">
        <div slot="header" class="clearfix">
          <span>{{ $context.name }}</span>
          <el-button
            @click="$router.go(-1)"
            style="float: right; padding: 3px 0"
            type="text"
            icon="el-icon-d-arrow-left"
            >返回</el-button
          >
        </div>
        <el-row>
          <el-col :span="9" style="padding: 0px 10px 20px 0px">
            <img
              :src="$context.avatar"
              style="width: 100%;border-radius:5px;"
            />
            <div style="padding: 10px">
              <font style="font-size: 26px;line-height: 40px;font-weight: 600"
                >{{ $context.name }}
                <br />
              </font>
            </div>
          </el-col>
          <el-col :span="15" style="padding: 0px 20px 20px 10px">
            <div
              style="width: 100%;min-height: 300px; border-radius:5px; border: 1px solid #EBEEF5;padding: 30px;text-align: center;
                    font-size: 30px;color:#dddddd"
            >
              <b>◔ ‸◔？没有简介</b>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </Layout>
</template>

<script>
export default {
  name: "SocialPage",
  metaInfo: {
    title: "社交圈详情",
  },
};
</script>

<style></style>
