<template>
  <div class="pay">
    <div class="header">
      <a-steps :current="curStep">
        <a-step title="合同签章">
          <div class="step-desc" slot="description" v-show="curStep === 0">
            <span>请在</span>
            <a-statistic-countdown :value="deadline" @finish="onFinish" />
            <span>内完成签章，逾期该笔租单自动解除</span>
          </div>
        </a-step>
        <a-step title="支付">
          <div class="step-desc" slot="description" v-show="curStep === 1">
            <span>请在</span>
            <a-statistic-countdown :value="deadline" @finish="onFinish" />
            <span>内完成支付，逾期该笔租单将自动解除</span>
          </div>
        </a-step>
        <a-step title="完成" />
      </a-steps>
    </div>

    <div class="content">
      <div class="step1" v-show="curStep === 0">
        <div class="txt">
          <h1>仓库租赁合同</h1>
          <div>合同内容</div>
          <img src="@/assets/img/sign.jpeg" v-show="signed" />
        </div>

        <a-checkbox style="margin: 20px auto">
          我已充分阅读【仓库租赁合同】
        </a-checkbox>

        <div>
          <a-button @click="signed = true" size="large">签章</a-button>
          <a-button
            type="primary"
            style="margin-left: 20px"
            size="large"
            :disabled="!signed"
            @click="curStep = 1"
          >
            下一步
          </a-button>
        </div>
      </div>

      <div class="step2" v-show="curStep === 1">
        <div class="desc">
          <a-icon type="check-circle" theme="filled" />
          <div style="text-align: left">
            <div>您的订单已经生成，请及时付款</div>
            <div>金额：<span>¥100000</span></div>
          </div>
        </div>
        <div class="pay-way">
          <h1>请选择支付方式</h1>
          <a-radio-group v-model="payWay" class="way">
            <div><a-radio value="0" />线上支付</div>
            <div><a-radio value="1" />租呗</div>
            <div><a-radio value="2" />线下支付</div>
          </a-radio-group>
        </div>

        <a-button
          type="primary"
          size="large"
          style="float: left; margin-top: 60px; width: 200px"
          @click="curStep = 2"
          >立即支付</a-button
        >
      </div>

      <div class="step3" v-show="curStep === 2">
        <img class="success-icon" src="@/assets/img/done.png" />
        <div class="success-txt">订单完成</div>

        <h1>接下来您可以</h1>
        <router-link class="todo" to="">
          <img src="@/assets/img/design.png" />
          <div class="todo-desc">
            <h2>预设计仓库</h2>
            <p>系统已为您生成多套方案，最多可提升100%的仓库使用率</p>
          </div>
          <a-icon type="right" />
        </router-link>

        <router-link class="todo" to="">
          <img src="@/assets/img/myPage.png" />
          <div class="todo-desc">
            <h2>去往个人主页</h2>
            <p>全方位管理您的账号</p>
          </div>
          <a-icon type="right" />
        </router-link>

        <router-link class="todo" to="/property">
          <img src="@/assets/img/houseMap.png" />
          <div class="todo-desc">
            <h2>继续看仓</h2>
            <p>从仓库地图上获取更多信息</p>
          </div>
          <a-icon type="right" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curStep: 0,
      deadline: Date.now() + 1000 * 60 * 60 * 24,
      signed: false,
      payWay: "0",
    };
  },
};
</script>

<style lang="less" scoped>
.pay {
  padding: 100px 0;
}
.header {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  box-shadow: 0 0 10px rgb(0 0 0 / 50%);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.sub-header {
  height: 70px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/deep/.ant-statistic-content {
  font-size: 14px;
  color: red;
  margin: 0 5px;
}

/deep/.ant-steps-item:last-child {
  flex: 1;
}

/deep/.ant-steps-item-description {
  max-width: 100% !important;
}

.step-desc {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: none;
}

.content {
  display: flex;
  justify-content: center;
}
.step1 {
  .txt {
    position: relative;
    font-size: 22px;
    font-weight: bold;
    width: 800px;
    height: 900px;
    box-sizing: border-box;
    padding-top: 20px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 10%), 0 2px 4px 1px rgb(0 0 0 / 18%);
    img {
      position: absolute;
      width: 180px;
      bottom: 100px;
      right: 40px;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90%;
      width: 90%;
      margin: 20px auto;
      font-weight: normal;
      font-size: 16px;
    }
  }
}

.step2 {
  width: 800px;
  height: 100%;
  .desc {
    width: 100%;
    margin-top: 40px;
    padding: 20px 24px;
    box-sizing: border-box;
    background: #f0f0f0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 38px;
    /deep/.anticon-check-circle {
      font-size: 40px;
      margin-right: 20px;
      color: #1890ff;
    }
    span {
      font-size: 20px;
      color: red;
      font-weight: bold;
    }
  }

  .pay-way {
    width: 100%;
    margin-top: 30px;
    text-align: left;
    h1 {
      font-size: 18px;
      font-weight: bold;
    }
    .way {
      margin-top: 20px;
      display: flex;
      align-items: center;
      div {
        height: 80px;
        line-height: 80px;
        border: 1px solid #f0f0f0;
        font-size: 20px;
        flex: 1;
        padding: 0 20px;

        /deep/.ant-radio {
          margin-right: 10px;
        }

        &:nth-of-type(2) {
          margin: 0 20px;
        }
      }
    }
  }
}

.step3 {
  width: 600px;
  .success-icon {
    width: 180px;
    margin-top: 40px;
  }
  .success-txt {
    font-size: 20px;
    margin-top: 30px;
    font-weight: bold;
  }

  h1 {
    margin: 80px 0 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
  }

  .todo {
    margin-bottom: 20px;
    border: 1px solid #d6d5d5;
    border-radius: 8px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 80px;
      margin-right: 20px;
    }

    &:hover {
      h2 {
        color: #1890ff;
      }
    }

    .todo-desc {
      flex: 1;
      text-align: left;
      h2 {
        font-weight: bold;
        font-size: 18px;
      }
      p {
        font-size: 15px;
        color: #666;
      }
    }

    .ant-icon {
      font-size: 30px;
    }
  }
}
</style>
