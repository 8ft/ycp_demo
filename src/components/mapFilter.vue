<template>
  <div class="map-filter">
    <ul class="filter">
      <li><span>价格</span><i class="filterbg"></i></li>
      <li><span>仓型</span><i class="filterbg"></i></li>
      <li><span>面积</span><i class="filterbg"></i></li>
      <li><span>品牌</span><i class="filterbg"></i></li>
      <li><span>更多</span><i class="filterbg"></i></li>
    </ul>
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
.map-filter {
  position: absolute;
  left: 460px;
  top: 24px;

  .filter {
    background: #fff;
    box-shadow: 0 0 8px 0 rgb(0 0 0 / 8%);
    border-radius: 4px;
    height: 48px;
    line-height: 20px;
    padding: 14px 0;
    display: inline-block;
    li {
      float: left;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #222;
      letter-spacing: 0;
      width: 90px;
      text-align: center;
      cursor: pointer;

      span {
        max-width: 80px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      i {
        background-image: url(//s1.ljcdn.com/parma/client/media/src/client/pages/ditu/Home/comp/Filter/img/filter_bottom.15618197.png);
        background-repeat: no-repeat;
        background-size: 100%;
        display: inline-block;
        width: 6px;
        height: 4px;
        margin-left: 8px;
        vertical-align: super;
      }
    }
  }
}
</style>
