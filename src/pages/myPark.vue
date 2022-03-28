<template>
  <div>
    <div class="banner"></div>

    <div class="entrance">
      <router-link class="func" to="/manage">
        <img class="icon" src="@/assets/img/func_map.png" />
        <h1>可交互平面图</h1>
        <p>直观高效的园区管理工具</p>
        <p>哪里要改点哪里，同步信息弹指间</p>
        <div><a-icon type="unlock" />已解锁</div>
      </router-link>

      <div class="func">
        <img class="icon" src="@/assets/img/func_vr.png" />
        <h1>全景｜VR</h1>
        <p>如临其境的视觉体验</p>
        <p>距离不再是问题，随时随地，助力交易</p>
        <div>
          <a
            class="ant-btn"
            href="https://721.gigacre.com/tour/66296425da863ae8"
            target="_blank"
          >
            预览
          </a>
          <a-button style="margin-left: 10px" type="primary">解锁</a-button>
        </div>
      </div>

      <div class="func">
        <img class="icon" src="@/assets/img/func_bim.png" />
        <h1>基于BIM的园区模型</h1>
        <p>穿透表里全方位剖析</p>
        <p>超越时空，让未来可视可控</p>
        <div>
          <a
            class="ant-btn"
            href="https://www.hightopo.com/demo2/ht-warehousing/preview.mp4"
            target="_blank"
          >
            预览
          </a>
          <a-button style="margin-left: 10px" type="primary">解锁</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.banner {
  width: 1200px;
  height: 300px;
  border-radius: 10px;
  margin: 80px auto 60px;
  background: #fff;
  background: url("@/assets/img/parkBanner.jpeg") no-repeat center/cover;
}

.entrance {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1280px;
  margin: 0 auto;

  .func {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    .icon {
      width: 140px;
    }
    h1 {
      font-weight: bold;
      font-size: 20px;
      margin: 30px 0 10px;
    }

    p {
      font-size: 15px;
      color: #666;
    }
  }
}
</style>
