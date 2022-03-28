<template>
  <div class="map-header">
    <div class="header-item">
      <a class="logo"><a-icon type="windows" theme="filled" /></a>
      <div class="change city">
        <span>厦门<i></i></span>
      </div>
      <div class="change">
        <span>租仓<i></i></span>
      </div>
      <div class="search-box">
        <a-input class="search-input" placeholder="请输入您的目标地点" />
        <i class="enter-search"></i>
      </div>
    </div>
    <!-- <div class="change-box">
      <div class="channel">
        <ul>
          <li class="active">租仓</li>
          <li class="">买仓</li>
        </ul>
      </div>
    </div> -->
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
.map-header {
  position: absolute;
  left: 24px;
  top: 24px;

  .header-item {
    width: 375px;
    height: 48px;
    line-height: 24px;
    background: #fff;
    box-shadow: 0 0 8px 0 rgb(0 0 0 / 8%);
    border-radius: 4px;
    padding: 12px 16px;
    display: flex;
    align-items: center;

    .logo {
      border-radius: 6px;
      overflow: hidden;
      font-size: 24px;
    }

    .change {
      font-family: PingFangSC-Regular;
      margin-left: 12px;
      font-size: 14px;
      color: #222;
      letter-spacing: 0;
      cursor: pointer;
      width: 60px;

      span i {
        background-image: url(//s1.ljcdn.com/parma/client/media/src/client/pages/ditu/Home/comp/Header/img/filter_bottom.15618197.png);
        background-repeat: no-repeat;
        background-size: 100%;
        display: inline-block;
        width: 6px;
        height: 4px;
        margin-left: 5px;
      }
    }

    .search-box {
      height: 24px;
      margin-left: 10px;
      padding-left: 10px;
      border-left: 1px solid #ccc;
      align-items: center;
      width: 164px;
      position: relative;

      .search-input {
        border: 0;
        margin: 0;
        width: 123px;
        float: left;
        font-size: 12px;
        padding: 0;
        line-height: 24px;
        height: 24px;
      }

      .enter-search {
        background-image: url(//s1.ljcdn.com/parma/client/media/src/client/pages/ditu/Home/comp/Header/img/search.3f623605.png);
        background-repeat: no-repeat;
        background-size: 100%;
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }

  .change-box {
    margin-top: 16px;
    max-height: 500px;
    position: relative;
    z-index: 12;
    overflow-y: auto;

    .channel {
      width: 128px;
      background: #fff;
      box-shadow: 0 0 8px 0 rgb(0 0 0 / 8%);
      border-radius: 4px;
      padding: 20px 24px;
      margin-left: 65px;

      ul {
        margin-bottom: 0;
      }

      li {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #222;
        text-align: left;
        line-height: 22px;
        margin-top: 20px;
        cursor: pointer;
        color: #00ae66;
      }

      li:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
