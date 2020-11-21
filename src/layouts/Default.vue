<template>
  <div class="layout">
    <!-- homehead -->
    <section class="head">
      <headpage></headpage>
    </section>
    <!-- homehead -->

    <section class="main-content">
      <el-row>
        <el-col :span="6" style="padding-right:10px">
          <!-- sidebar -->
          <sidebar></sidebar>
          <!-- sidebar -->
        </el-col>
        <el-col :span="18" style="padding-left:10px">
          <slot />
        </el-col>
      </el-row>
    </section>

    <!-- foot -->
    <section class="foot">
      <foot></foot>
    </section>
    <!-- foot -->
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Head from "~/components/Head.vue";
import Sidebar from "~/components/Sidebar.vue";
import Foot from "~/components/Foot.vue";
export default {
  components: {
    Headpage: Head,
    sidebar: Sidebar,
    Foot,
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>
