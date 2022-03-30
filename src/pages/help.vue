<template>
  <div>
    <div class="bhIntro">
      <div class="bhBgDiv"></div>
      <div class="blackMask"></div>
      <div class="bhIntroDiv">
        <div class="bhInfo">
          <h1>Space</h1>
          <h2>思倍 | 物流不动产专业咨询</h2>
        </div>

        <div class="entrance">
          <div class="func">
            <h1>建设咨询</h1>
          </div>

          <div class="func">
            <h1>招商运营</h1>
          </div>

          <div class="func">
            <h1>物流不动产交易尽职调查</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bhIntro {
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bhBgDiv {
  width: 100%;
  height: 100vh;
  background: url(https://blackhills-pc.oss-cn-shenzhen.aliyuncs.com/static/BH_bgB.png)
    center center no-repeat;
  background-size: cover;
}

.blackMask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(https://blackhills-pc.oss-cn-shenzhen.aliyuncs.com/static/BH_black_mask.png)
    repeat center;
}

.bhIntroDiv {
  position: absolute;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bhInfo {
  h1 {
    color: #fff;
    font-size: 160px;
    margin-bottom: 0;
  }
  h2 {
    color: #fff;
    font-size: 50px;
    letter-spacing: 10px;
    margin-bottom: 60px;
    font-weight: normal;
  }
  p {
    color: #fff;
    font-size: 22px;
  }
}

.entrance {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1280px;
  margin-top: 100px;
  .func {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    width: 380px;
    height: 120px;
    border: 4px double #fff;

    h1 {
      color: #fff;
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 0;
    }
  }
}
</style>
