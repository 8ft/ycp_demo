<template>
  <div id="rent">
    <div
      :class="{ 'mode-switch': true, active: !modeRent }"
      @click="modeRent = !modeRent"
    >
      <a-icon type="appstore" />
      <div>{{ modeRent ? "看仓" : "租仓" }}</div>
    </div>
    <iframe src="https://721.gigacre.com/tour/66296425da863ae8"></iframe>
    <div class="rent" v-show="modeRent">
      <div class="rent-content">
        <a-steps :current="currentStep">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>

        <div class="content">
          <div class="left">
            <a-card title="" style="width: 648px; height: 700px">
              <div class="tip">
                <div class="type">
                  <div class="green"></div>
                  <span>未出租</span>
                </div>

                <div class="type">
                  <div class="red"></div>
                  <span>已出租</span>
                </div>

                <div class="type">
                  <div class="gray"></div>
                  <span>未开放</span>
                </div>

                <div class="type">
                  <div class="yellow"></div>
                  <span>已选中</span>
                </div>
              </div>

              <div class="house">
                <img src="@/assets/img/preview.png" />

                <div class="area-mask">
                  <div
                    :class="`area-${item.id} status-${item.status} ${selected(
                      item
                    )}`"
                    v-for="item in area"
                    :key="item.id"
                    @click="
                      curArea = item;
                      showAreaDetail = true;
                    "
                  >
                    <div>{{ item.name }}</div>
                    <div>{{ item.total }}㎡</div>
                  </div>
                </div>
              </div>
            </a-card>
          </div>

          <!-- <a-icon type="appstore" style="font-size: 30px; color: lightgray" /> -->
          <!-- <a-icon type="appstore" theme="twoTone" style="font-size: 30px" /> -->

          <div class="right">
            <a-card title="已选仓库" style="width: 600px; height: 700px">
              <router-link to="/pay" slot="extra">
                <a-button type="primary" :disabled="orderList.length === 0">
                  下一步
                </a-button>
              </router-link>

              <a-list item-layout="horizontal" :data-source="orderList">
                <a-list-item slot="renderItem" slot-scope="item">
                  <div
                    slot="actions"
                    class="list-action"
                    @click="
                      curArea = item;
                      showAreaDetail = true;
                    "
                  >
                    仓库详情
                  </div>
                  <div
                    slot="actions"
                    class="list-action del"
                    @click="del(item)"
                  >
                    删除
                  </div>
                  <a-list-item-meta
                    :description="`${item.total}㎡ | ${item.price}元/㎡/天 ｜ ${
                      typeName[item.type]
                    }`"
                  >
                    <a slot="title">
                      {{ item.name }}
                    </a>

                    <a-avatar
                      slot="avatar"
                      :src="areaIcon[item.floor > 1 ? 1 : 0]"
                    />
                  </a-list-item-meta>
                  <div class="rent-day">
                    <span>租</span>
                    <a-input
                      v-model="item.rentDay"
                      style="width: 60px; margin: 0 5px"
                    ></a-input>
                    <span>天</span>
                  </div>
                </a-list-item>
              </a-list>

              <div class="total">
                <a-statistic
                  title="合计面积"
                  :value="`${totalCost.square}㎡`"
                  style="margin-right: 50px"
                />
                <a-statistic title="合计金额" :value="`¥${totalCost.price}`" />
              </div>
            </a-card>
          </div>
        </div>

        <a-modal v-model="showAreaDetail" title="仓库详情" :width="800">
          <div class="area-detail">
            <img src="../assets/img/area_detail.jpg" />
          </div>
          <div class="actions" slot="footer">
            <a-button
              size="large"
              @click="curArea.collected = !curArea.collected"
            >
              <a-icon
                type="heart"
                :theme="curArea.collected ? 'filled' : 'outlined'"
                :class="{ collected: curArea.collected }"
              />
              {{ curArea.collected ? "取消收藏" : "收藏" }}
            </a-button>
            <a-button icon="phone" size="large" class="contact">
              联系
            </a-button>
            <a-button
              v-show="rentable"
              icon="audit"
              size="large"
              class="deal"
              type="primary"
              @click="rent"
            >
              租仓
            </a-button>
          </div>
        </a-modal>

        <a-modal v-model="showPay" title="支付定金" :width="600" :footer="null">
          <div class="prepay">
            <div class="title">
              定金支付完成后系统将为您锁定选中仓库，之后专员会联系您完成后续交易流程
            </div>
            <img src="@/assets/img/paycode.png" />
            <div>请扫描上方二维码支付定金</div>
          </div>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modeRent: true,
      showPay: false,
      areaIcon: {
        0: require("@/assets/img/house_0.png"),
        1: require("@/assets/img/house_1.png"),
      },
      typeName: {
        0: "恒温",
        1: "冷藏",
        2: "冷冻",
        3: "超低温",
      },
      curArea: "",
      showAreaDetail: false,
      steps: [
        {
          title: "选择意向仓库",
        },
        {
          title: "确认订单",
        },
      ],
      area: require("@/data/area.json"),
      orderList: [],
    };
  },
  computed: {
    currentStep() {
      return this.orderList.length ? 1 : 0;
    },
    totalCost() {
      let square = 0;
      let price = 0;
      this.orderList.forEach((item) => {
        square += item.total;
        price += item.price * item.rentDay;
      });
      return { square, price };
    },

    rentable() {
      return (
        this.curArea.status === 0 &&
        !this.orderList.some((item) => {
          return item.id === this.curArea.id;
        })
      );
    },
  },
  methods: {
    rent() {
      this.orderList.push(Object.assign({ rentDay: 365 }, this.curArea));
      this.showAreaDetail = false;
    },
    del(target) {
      const index = this.orderList.findIndex((item) => {
        return item.id === target.id;
      });
      this.orderList.splice(index, 1);
    },
    selected(target) {
      return this.orderList.some((item) => {
        return item.id === target.id;
      })
        ? "selected"
        : "";
    },
  },
};
</script>

<style lang="less" scoped>
iframe,
.rent {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.mode-switch {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px;
  z-index: 2;
  display: flex;
  align-items: center;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 8px;
  cursor: pointer;
  &:hover,
  &.active {
    background: rgba(28, 144, 253, 0.8);
  }

  /deep/.anticon {
    margin-right: 5px;
  }
}

.rent {
  z-index: 1;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  .rent-content {
    width: 1400px;
    height: 820px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
  }
}

.ant-steps {
  padding: 30px 0;
}
/deep/.ant-steps-item:last-child {
  flex: 1;
}

.actions {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-top: 1px solid #e8e8e8;
  background: #fff;

  .collected {
    color: palevioletred;
  }
  .deal {
    width: 200px;
  }
  .contact {
    width: 120px;
    margin: 0 20px;
    color: #fff;
    background: rgb(65, 189, 118);
  }
}

.prepay {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  img {
    width: 300px;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
  }
}

.area-detail {
  width: 100%;
  height: 560px;
  overflow-y: auto;
  img {
    width: 100%;
  }
}

#rent {
  width: 100%;
  height: 100%;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;

    /deep/.ant-card {
      border-radius: 8px;
    }
  }

  .right {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;

    .total {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }

    .rent-day {
      display: flex;
      align-items: center;
    }

    .list-action {
      color: #666;
      &:hover {
        color: #1890ff;
      }
      &.del {
        color: #999;
        &:hover {
          color: red;
        }
      }
    }
  }

  .left {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

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

          &:not(.status-3):hover {
            background: rgba(28, 144, 253, 0.8);
          }

          &.status-3 {
            cursor: not-allowed;
          }
        }

        .status-0,
        .status-2 {
          background: rgba(64, 173, 112, 0.8);
        }
        .status-1 {
          background: rgba(206, 23, 23, 0.8);
        }
        .status-3 {
          background: rgba(128, 128, 128, 0.8);
        }

        .selected {
          background: rgba(206, 174, 69, 0.8);
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
  }
}
</style>
