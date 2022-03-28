<template>
  <div class="content">
    <!-- <div class="in">入库</div> -->

    <a-card
      title="待入库"
      style="flex: 1; height: 780px; margin-right: 20px"
    ></a-card>

    <a-card title="仓库实况图" style="width: 648px; height: 780px">
      <div class="tip">
        <div class="type">
          <div class="green"></div>
          <span>空旷</span>
        </div>

        <div class="type">
          <div class="yellow"></div>
          <span>使用过半</span>
        </div>

        <div class="type">
          <div class="red"></div>
          <span>爆满</span>
        </div>

        <div class="type">
          <div class="gray"></div>
          <span>不可用</span>
        </div>

        <div class="type">
          <div class="blue"></div>
          <span>已选中</span>
        </div>
      </div>

      <div class="house">
        <img src="@/assets/img/preview.png" />

        <div class="area-mask">
          <div
            :class="`area-${item.id} status-${item.status} ${selected(item)}`"
            v-for="item in area"
            :key="item.id"
            @click="select(item)"
          >
            <div>{{ item.name }}</div>
            <div>{{ item.total }}㎡</div>
          </div>
        </div>
      </div>
    </a-card>

    <a-card
      title="选中库区"
      style="width: 520px; height: 780px; margin: 0 20px"
    >
      <div class="right-part">
        <a-card
          class="area-card"
          :title="area.name"
          v-for="area in selectedArea"
          :key="area.id"
        >
          <a-icon type="close" slot="extra" @click="remove(area.id)" />
          <draggable
            v-model="areaItem[area.id]"
            group="site"
            animation="300"
            dragClass="dragClass"
            ghostClass="ghostClass"
            chosenClass="chosenClass"
            @start="onStart"
            @end="onEnd"
            v-show="areaItem[area.id].length === 0"
          >
            <div style="height: 100px"></div>
          </draggable>
          <draggable
            v-model="areaItem[area.id]"
            group="site"
            animation="300"
            dragClass="dragClass"
            ghostClass="ghostClass"
            chosenClass="chosenClass"
            @start="onStart"
            @end="onEnd"
            v-show="areaItem[area.id].length > 0"
          >
            <transition-group>
              <div
                class="item"
                v-for="item in areaItem[area.id]"
                :key="`item_${item.id}`"
              >
                <div>{{ item.name }}</div>
                <div class="left">{{ item.left }}箱</div>
              </div>
            </transition-group>
          </draggable>
        </a-card>
      </div>
    </a-card>

    <a-card title="待出库" style="flex: 1; height: 780px"></a-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      typeName: {
        0: "恒温",
        1: "冷藏",
        2: "冷冻",
        3: "超低温",
      },
      curArea: "",
      showAreaDetail: false,
      area: require("@/data/area.json"),
      selectedArea: [],
      areaItem: {
        1: [
          { id: 1, name: "可口可乐", left: 100 },
          { id: 2, name: "雪碧", left: 200 },
          { id: 3, name: "芬达", left: 50 },
        ],
        4: [
          { id: 1, name: "王老吉", left: 100 },
          { id: 2, name: "加多宝", left: 200 },
        ],
        10: [{ id: 1, name: "旺仔牛奶", left: 100 }],
      },
    };
  },
  computed: {
    rentable() {
      return this.curArea.status === 0;
    },
  },
  methods: {
    select(area) {
      const index = this.selectedArea.findIndex((item) => {
        return item.id === area.id;
      });
      if (index >= 0) {
        this.selectedArea.splice(index, 1);
      } else {
        this.selectedArea.push(area);
      }
    },
    selected(target) {
      return this.selectedArea.some((item) => {
        return item.id === target.id;
      })
        ? "selected"
        : "";
    },
    remove(id) {
      this.selectedArea = this.selectedArea.filter((item) => {
        return item.id !== id;
      });
    },
    // change: function (evt) {
    //   console.log(evt);
    // },
    //start ,end ,add,update, sort, remove 得到的都差不多
    onStart(evt) {
      console.log(evt);
    },
    onEnd(evt) {
      console.log(evt);
      evt.item; //可以知道拖动的本身
      evt.to; // 可以知道拖动的目标列表
      evt.from; // 可以知道之前的列表
      evt.oldIndex; // 可以知道拖动前的位置
      evt.newIndex; // 可以知道拖动后的位置
    },
    // move: function (evt, originalEvent) {
    //   console.log(evt);
    //   console.log(originalEvent); //鼠标位置
    // },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;

  /deep/.ant-card {
    border-radius: 8px;
  }

  .in {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // background: rgb(28, 144, 253);
    border: 2px solid rgb(28, 144, 253);
    color: #fff;
    font-weight: bold;
    font-size: 18px;
  }

  .tip {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 14px;
    .type {
      display: flex;
      align-items: center;
      margin-right: 20px;

      div {
        width: 40px;
        height: 20px;
        margin-right: 10px;
        border-radius: 4px;
      }

      .green {
        background: rgba(64, 173, 112, 0.8);
      }
      .red {
        background: rgba(206, 23, 23, 0.8);
      }
      .gray {
        background: gray;
      }
      .yellow {
        background: rgba(206, 174, 69, 0.8);
      }
      .blue {
        background: rgba(28, 144, 253, 0.8);
      }
    }
  }

  .house {
    width: 600px;
    height: 600px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      background: lightslategray;
      border-radius: 8px;
    }

    .area-mask {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      background: transparent;
      width: 100%;
      height: 100%;

      div[class^="area-"] {
        position: absolute;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        font-weight: bold;
        font-size: 12px;
        box-sizing: border-box;

        &:not(.status-3):hover {
          background: rgba(28, 144, 253, 0.8);
        }

        &.status-3 {
          cursor: not-allowed;
        }
      }

      .status-0 {
        background: rgba(64, 173, 112, 0.8);
      }
      .status-1 {
        background: rgba(206, 23, 23, 0.8);
      }

      .status-2 {
        background: rgba(206, 174, 69, 0.8);
      }

      .status-3 {
        background: rgba(128, 128, 128, 0.8);
      }

      .selected {
        // border: 4px solid rgba(28, 144, 253, 0.8);
        background: rgba(28, 144, 253, 0.8);
      }

      .area-1 {
        left: 63px;
        top: 263px;
        border-radius: 10px 10px 0 0;
        width: 105px;
        height: 65px;
        transform: rotate(-32deg);
      }

      .area-2 {
        left: 78px;
        top: 325px;
        width: 120px;
        height: 52px;
        transform: rotate(-32deg);
      }

      .area-3 {
        left: 106px;
        top: 369px;
        width: 120px;
        height: 50px;
        transform: rotate(-34deg);
      }

      .area-4 {
        left: 188px;
        top: 176px;
        width: 91px;
        height: 58px;
        transform: rotate(-33.5deg);
      }

      .area-5 {
        left: 219px;
        top: 226px;
        width: 93px;
        height: 61px;
        transform: rotate(-33deg);
      }

      .area-6 {
        left: 253px;
        top: 278px;
        width: 93px;
        height: 61px;
        transform: rotate(-33deg);
      }

      .area-7 {
        left: 265px;
        top: 124px;
        width: 91px;
        height: 58px;
        transform: rotate(-33.5deg);
      }

      .area-8 {
        left: 298px;
        top: 174px;
        width: 91px;
        height: 63px;
        transform: rotate(-33deg);
      }

      .area-9 {
        left: 333px;
        top: 226px;
        width: 93px;
        height: 61px;
        transform: rotate(-33deg);
      }

      .area-10 {
        left: 401px;
        top: 64px;
        width: 87px;
        height: 61px;
        transform: rotate(-33.5deg);
      }

      .area-11 {
        left: 431px;
        top: 115px;
        width: 88px;
        height: 50px;
        transform: rotate(-33deg);
      }

      .area-12 {
        left: 462px;
        top: 156px;
        width: 87px;
        height: 62px;
        transform: rotate(-33deg);
      }

      .area-13 {
        left: 299px;
        top: 344px;
        width: 91px;
        height: 63px;
        transform: rotate(-33.5deg);
      }

      .area-14 {
        left: 329px;
        top: 398px;
        width: 92px;
        height: 47px;
        transform: rotate(-33.5deg);
      }

      .area-15 {
        left: 359px;
        top: 437px;
        width: 93px;
        height: 61px;
        transform: rotate(-33deg);
      }

      .area-16 {
        left: 377px;
        top: 293px;
        width: 91px;
        height: 63px;
        transform: rotate(-33.5deg);
      }

      .area-17 {
        left: 410px;
        top: 347px;
        width: 92px;
        height: 59px;
        transform: rotate(-33.5deg);
      }

      .area-18 {
        left: 444px;
        top: 396px;
        width: 93px;
        height: 61px;
        transform: rotate(-33.5deg);
      }

      .area-19 {
        left: 140px;
        top: 427px;
        width: 120px;
        height: 47px;
        transform: rotate(-33.5deg);
      }

      .area-20 {
        left: 168px;
        top: 465px;
        width: 118px;
        height: 51px;
        transform: rotate(-33.5deg);
      }

      .area-21 {
        left: 244px;
        top: 494px;
        width: 74px;
        height: 74px;
        transform: rotate(-33.5deg);
      }
    }
  }

  .right-part {
    display: flex;
    flex-wrap: wrap;

    .area-card {
      text-align: left;
      margin-bottom: 15px;
      margin-left: 10px;
      min-width: 220px;
      min-height: 200px;

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        padding: 0 10px;
        border-radius: 6px;
        box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px 0px;
        margin-bottom: 8px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        .left {
          margin-left: 30px;
        }
      }
    }
  }
}
</style>
