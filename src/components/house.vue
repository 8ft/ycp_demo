<template>
  <bm-overlay
    ref="customOverlay"
    :class="{ house: true }"
    :style="pointColor"
    pane="labelPane"
    @draw="draw"
  >
    <div class="content">
      <div class="info">{{ formatedTotal }} | {{ info.deg }}</div>
      <div class="progress">
        <div
          :style="`width:${usedRate === 0 ? 100 : usedRate}%;`"
          :class="{
            green: usedRate === 0,
            orange: usedRate > 0 && usedRate < 100,
            red: usedRate === 100,
          }"
        ></div>
      </div>
    </div>
  </bm-overlay>
</template>

<script>
import { BmOverlay } from "vue-baidu-map";
export default {
  props: ["position", "info"],
  components: {
    BmOverlay,
  },
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload();
      },
      deep: true,
    },
  },
  data() {
    return {
      pointColor: "",
    };
  },
  computed: {
    formatedTotal() {
      return this.info.total >= 10000
        ? `${this.info.total / 10000}万㎡`
        : this.info.total;
    },
    usedRate() {
      return (this.info.used / this.info.total) * 100;
    },
  },
  methods: {
    draw({ el, BMap, map }) {
      const { lng, lat } = this.position;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x - 16 + "px";
      el.style.top = pixel.y - 16 + "px";
    },
  },
};
</script>

<style lang="less" scoped>
.house {
  position: absolute;
  background: rgba(110, 109, 109, 0.8);
  // border: 1px solid lightgray;
  padding: 4px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 5px 0px;
  color: #fff;
  font-weight: bold;
  width: max-content;

  &:hover,
  &.active {
    transition: all 0.3s ease-out;
    transform-origin: center;
    transform: scale(1.1);
  }

  .anticon-codepen-circle {
    font-size: 20px;
    color: skyblue;
    position: absolute;
    top: -10px;
    left: -10px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .info {
      display: block;
      width: auto;
    }

    .progress {
      margin-top: 4px;
      width: 100%;
      height: 6px;
      background: lightgray;
      border-radius: 4px;
      overflow: hidden;
      div {
        height: 100%;
        &.green {
          background: rgb(90, 243, 156);
        }
        &.orange {
          background: rgb(255, 216, 86);
        }
        &.red {
          background: rgb(247, 31, 31);
        }
      }
    }
  }
}

.house.active {
  background: #1890ff;
}
</style>
