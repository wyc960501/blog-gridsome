<template>
  <div>
    <el-card shadow="never">
      <el-menu :default-active="active" @select="onSelect">
        <el-menu-item
          v-for="item in $static.sidebar.edges"
          :key="item.node.path"
          :index="item.node.path"
        >
          <i :class="item.node.icon"></i>
          <span slot="title">{{ item.node.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<static-query>
query {
  sidebar: allSidebar(order: ASC) {
    edges {
      node {
        path
        icon
        title
      }
    }
  }
}
</static-query>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      active: "",
    };
  },
  mounted() {
    let arr = this.$route.path.split("/");
    this.active = "/" + arr[1];
  },
  methods: {
    onSelect(index) {
      this.$router.push(index);
    },
  },
};
</script>

<style></style>
