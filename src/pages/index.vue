<template>
  <div class="links">
    <router-link class="link" to="/property">找仓.租仓</router-link>
    <router-link class="link" to="/myPark">发布仓库</router-link>
    <router-link class="link" to="/help">专业咨询</router-link>
    <router-link class="link" to="/zb">信息查询</router-link>
    <router-link class="link" to="/game">地产宇宙</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.links {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.link {
  width: 200px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid lightgray;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}
</style>
