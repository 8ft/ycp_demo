<template>
  <div class="game" @click="$refs.player.play()">
    <video autoplay loop ref="player">
      <source src="@/assets/video/gameBg.mp4" type="video/mp4" />
    </video>

    <div class="search-wrap" p-id="277">
      <div class="search-box" p-id="278">
        <div
          class="search-input-cover"
          @click="
            searching = true;
            $refs.input.focus();
          "
          v-show="!searching"
        >
          全部资产 <b p-id="294"><span p-id="295">19,315,582</span></b>
        </div>
        <input
          ref="input"
          type="text"
          class="search-input"
          @focus="searching = true"
          @blur="searching = false"
        />
      </div>
    </div>

    <div class="area">
      <div class="mine">
        <div class="title">我的星球</div>
        <div class="card">
          <a-icon type="barcode" />
          <div>
            <h1>AREA-02754</h1>
            <p>日收益:<span style="color: green"> 1688</span> DCB</p>
          </div>
        </div>
        <div class="card">
          <a-icon type="barcode" />
          <div>
            <h1>AREA-05892</h1>
            <p>日收益:<span style="color: red"> 2866</span> DCB</p>
          </div>
        </div>

        <div class="card">
          <a-icon type="barcode" />
          <div>
            <h1>AREA-04444</h1>
            <p>日收益:<span style="color: green"> 4466</span> DCB</p>
          </div>
        </div>

        <div class="card">
          <a-icon type="barcode" />
          <div>
            <h1>AREA-08444</h1>
            <p>日收益:<span style="color: green">1111</span> DCB</p>
          </div>
        </div>
      </div>

      <div class="resource" v-show="searching"></div>
    </div>

    <div class="live">
      <a-statistic
        title="合计规模"
        :value="`${totalCost.square} p`"
        style="margin-right: 50px"
      />
      <a-statistic title="实时收益" :value="`${liveProfit} DCB`" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searching: false,
      liveProfit: 5234,
      mine: [
        {
          square: 1000,
          price: 200000,
          profit: 1688,
        },
        {
          square: 1000,
          price: 200000,
          profit: 3456,
        },
      ],
    };
  },
  mounted() {
    this.$refs.player.playbackRate = 0.5;
    this.$refs.player.webkitEnterFullscreen();
    setInterval(() => {
      this.liveProfit += 1;
    }, 100);
  },
  computed: {
    totalCost() {
      let square = 0;
      let price = 0;
      this.mine.forEach((item) => {
        square += item.square;
        price += item.square * item.price;
      });
      return { square, price };
    },
  },
};
</script>

<style lang="less" scoped>
.game {
  video {
    background: black;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .search-wrap {
    position: fixed;
    width: 100%;
    top: 20px;
    left: 0;
    text-align: center;
    .search-box {
      position: relative;
      width: 768px;
      margin: 30px auto 0;
      animation: home-fade 0.6s ease-in-out 1;
      height: 50px;
      border: 1px solid rgba(34, 43, 95, 0.79);
      background: rgba(14, 16, 52, 0.5);
      display: flex;
      align-items: center;
      color: #fff;
      border-radius: 40px;
      text-align: left;
      padding: 0 4px;
      font-size: 18px !important;
    }

    .search-input-cover {
      font-size: 14px;
      color: #a6a5ad;
      user-select: none;
      cursor: default;
      text-align: center;
      position: absolute;
      right: 0;
      width: 100%;
    }

    .search-input {
      flex: 1;
      padding: 0 1em;
      height: 50px;
      background: 0 0;
      color: #fff;
      text-align: left;
      font-size: 18px !important;
      border: none;

      &:focus {
        outline: 0;
      }
    }
  }

  .area {
    position: fixed;
    top: 200px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 600px;
  }

  .mine,
  .resource {
    width: 300px;
    height: 100%;
    //   border: 1px solid rgba(34, 43, 95, 0.79);
    //   background: rgba(14, 16, 52, 0.5);
    color: #fff;
    //   border-radius: 10px;
  }

  .resource {
    width: 768px;
  }

  .area {
    .title {
      text-align: left;
      font-size: 16px;
      color: #a6a5ad;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }

  .card {
    width: 260px;
    padding: 6px 8px;
    color: #a6a5ad;
    margin-bottom: 15px;
    border: 1px solid rgba(34, 43, 95, 0.79);
    background: rgba(14, 16, 52, 0.5);
    display: flex;
    align-items: center;
    text-align: left;

    /deep/.anticon {
      font-size: 38px;
      margin-right: 14px;
    }

    /deep/.anticon-setting {
      color: purple;
      font-size: 22px;
    }

    /deep/.anticon-rise {
      color: green;
      font-size: 18px;
    }

    /deep/.anticon-fall {
      color: red;
      font-size: 18px;
    }

    div {
      flex: 1;

      h1 {
        color: #a6a5ad;
        font-size: 14px;
        margin-bottom: 0;
      }
      p {
        font-size: 12px;
        margin-bottom: 0;
        span {
          font-size: 14px;
          color: rgb(197, 33, 60);
          font-weight: bold;
        }
      }
    }
  }

  .live {
    position: fixed;
    right: 0;
    bottom: 0;
    text-align: left;
    padding: 20px;
    /deep/ * {
      color: #fff !important;
    }
  }
}
</style>
