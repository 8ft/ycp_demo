<template>
  <div class="ditu-house_list" style="display: block">
    <div class="title">
      <label>
        可视区域内为您找到
        <span style="color: #1890ff"> 7 </span>
        个仓库
      </label>
      <div class="lj-track close-item" @click="showList = !showList">
        <i :class="{ 'close-list': true, down: !showList }"></i>
      </div>
    </div>
    <div v-show="showList">
      <div class="sort">
        <ul>
          <li class="select _color">综合排序</li>
          <li class="">总价<i class=""></i></li>
          <li class="">单价<i class=""></i></li>
          <li class="">面积<i class=""></i></li>
          <li class="">最新</li>
        </ul>
      </div>
      <div class="lj-track">
        <div class="house-card">
          <div>
            <ul>
              <li
                class="card-item"
                v-for="item in list"
                :key="item.id"
                @click="$emit('select', item)"
              >
                <div
                  :class="{
                    'lj-track': true,
                    'house-item': true,
                    active: curHouseId === item.id,
                  }"
                >
                  <img :src="item.banner" />
                  <div class="house-info">
                    <span class="name">{{ item.name }}</span>
                    <p>{{ item.desc }}</p>
                    <div class="tag">
                      <span>满两年</span><span>近地铁</span>
                    </div>
                    <div class="price">
                      <span class="total-price">388万</span
                      ><span class="unit-price">25元/㎡/天</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list", "curHouseId"],
  data() {
    return {
      showList: true,
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.ditu-house_list {
  width: 375px;
  overflow-y: hidden;
  background: #fff;
  max-height: calc(100vh - 120px);
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 8%);
  border-radius: 4px;
  position: absolute;
  top: 88px;
  left: 24px;
  z-index: 9;
  transition: top 0.5s;
  -webkit-transition: top 0.5s;
  -moz-transition: top 0.5s;
  -o-transition: top 0.5s;

  .title {
    text-align: left;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #222;
    padding: 0 16px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f0f0f0;
    overflow: hidden;

    span {
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      line-height: 20px;
      color: #00ae66;
    }

    .close-list {
      float: right;
      width: 16px;
      height: 16px;
      background-image: url(//s1.ljcdn.com/parma/client/media/src/client/pages/ditu/Home/comp/houseList/img/icon_top@3x.c1382a1a.png);
      background-repeat: no-repeat;
      background-size: 100%;
      margin-top: 18px;
      cursor: pointer;
    }

    .close-item {
      float: right;
    }

    .close-list.down {
      float: right;
      background-image: url(//s1.ljcdn.com/parma/client/media/src/client/pages/ditu/Home/comp/houseList/img/icon_bottom.7023ac4b.png);
    }
  }

  .sort {
    padding: 0 16px 16px;
    margin-top: 16px;
    overflow: hidden;
    ul {
      float: left;
    }

    li {
      float: left;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #222;
      letter-spacing: 0;
      margin-right: 16px;
      cursor: pointer;

      i {
        width: 8px;
        height: 8px;
        display: inline-block;
        background-image: url(//s1.ljcdn.com/parma/client/media/src/client/pages/ditu/Home/comp/houseList/img/sort_default.577458a1.png);
        background-repeat: no-repeat;
        background-size: 100%;
        margin-left: 4px;
      }
    }
  }

  .house-card {
    padding: 0 16px;
    overflow-y: auto;
    height: calc(100vh - 290px);
    cursor: pointer;

    li:first-child {
      padding-top: 0;
    }

    .card-item {
      overflow: hidden;
      border-bottom: 1px solid #f0f0f0;
      padding: 12px 0;
      display: flex;

      .house-item {
        display: flex;
        text-align: left;

        &.active {
          .house-info .name {
            color: #1890ff;
          }
        }
      }

      img {
        width: 105px;
        height: 80px;
        border-radius: 2px;
      }

      .house-info {
        flex: 1 1;
        margin-left: 16px;
        max-width: 210px;

        .name {
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #222;
          line-height: 16px;
          line-height: 20px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        p {
          font-family: PingFangSC-Regular;
          font-size: 11px;
          color: #222;
          line-height: 11px;
          margin-top: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 0;
        }
        .tag {
          padding-top: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            padding: 3px;
            margin-right: 9px;
            border-radius: 2px;
            background-color: #edf0f3;
            font-family: PingFangSC-Regular;
            font-size: 11px;
            color: #849aae;
            letter-spacing: 0;
            line-height: 11px;
            display: inline-block;
          }
        }

        .price {
          padding-top: 4px;
          .total-price {
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            color: #fe615a;
            letter-spacing: 0;
            line-height: 16px;
            margin-right: 7px;
          }
          .unit-price {
            font-family: PingFangSC-Regular;
            font-size: 11px;
            color: #999;
            letter-spacing: 0;
            line-height: 11px;
          }
        }
      }
    }
  }
}
</style>
