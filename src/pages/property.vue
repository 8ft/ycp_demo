<template>
  <div>
    <baidu-map
      class="map-wrap"
      :center="mapData.center"
      :zoom="mapData.zoom"
      @ready="mapHandler"
      @click="getLocation"
    >
      <a-tooltip
        placement="top"
        v-for="(item, index) in storageHouse"
        :key="index"
        @click="curHouse = item"
      >
        <template slot="title">
          <span>{{ item.floor }}</span>
        </template>
        <House
          :position="{ lng: item.lng, lat: item.lat }"
          :info="item"
          :class="{ active: curHouse.id === item.id }"
        ></House>
      </a-tooltip>
    </baidu-map>

    <map-header></map-header>
    <map-filter></map-filter>
    <visible-house
      :list="storageHouse"
      :curHouseId="curHouse.id"
      @select="
        (e) => {
          curHouse = e;
        }
      "
    ></visible-house>

    <a-drawer
      :title="curHouse.name"
      placement="right"
      :closable="true"
      :mask="false"
      :width="600"
      :visible="curHouse !== ''"
      @close="curHouse = ''"
    >
      <div class="house-detail">
        <!-- <div class="base">
          <p>总面积：{{ curHouse.total }}㎡</p>
          <p>可租面积：{{ curHouse.total - curHouse.used }}㎡</p>
          <p>温度信息：{{ curHouse.deg }}</p>
          <p>楼层信息：{{ curHouse.floor }}</p>
          <div>地址：福建省惠安县南部</div>
        </div> -->

        <div class="preview">
          <img :src="curHouse.banner" />
          <a
            class="preview-mask"
            href="https://721.gigacre.com/tour/66296425da863ae8"
            target="_blank"
          >
            <img src="@/assets/img/tap.png" />
            <p>数字·看仓</p>
            <p style="font-size: 15px; margin-top: 8px">
              次世代立体信息，轻触即达
            </p>
          </a>
        </div>

        <div class="detail">
          普洛斯(泉州)物流园地处福建省惠安县南部，泉州中心城区东面。
          园区所在的泉州台商投资区为国家级台商投资区，也是泉州国家高新技术产业开发区的主园区。物流仓储企业众多，有规模优势。项目可租赁面积面积85,000㎡方米。项目位置被公认为是区域配送中心和存储中心的绝佳选择。
          <img src="@/assets/img/house_detail.jpg" />
        </div>

        <div class="actions">
          <a-button
            size="large"
            @click="curHouse.collected = !curHouse.collected"
          >
            <a-icon
              type="heart"
              :theme="curHouse.collected ? 'filled' : 'outlined'"
              :class="{ collected: curHouse.collected }"
            />
            {{ curHouse.collected ? "取消收藏" : "收藏" }}
          </a-button>
          <a-button icon="phone" size="large" class="contact"> 联系 </a-button>
          <router-link to="/rent">
            <a-button icon="audit" size="large" class="deal" type="primary">
              租仓
            </a-button>
          </router-link>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import House from "@/components/house.vue";
import MapFilter from "@/components/mapFilter.vue";
import MapHeader from "@/components/mapHeader.vue";
import VisibleHouse from "@/components/visibleHouse.vue";
export default {
  components: {
    House,
    MapHeader,
    MapFilter,
    VisibleHouse,
  },
  data() {
    return {
      curHouse: "",
      businessDetail: {},
      newStorageHouse: [
        {
          lng: 118.629957,
          lat: 27.924359,
          deg: 0,
        },
        {
          lng: 119.255465,
          lat: 26.691777,
          deg: 0,
        },
        {
          lng: 116.045137,
          lat: 24.489616,
          deg: 0,
        },
        {
          lng: 116.495871,
          lat: 25.795856,
          deg: 0,
        },
        {
          lng: 117.351345,
          lat: 24.143986,
          deg: 0,
        },
        {
          lng: 115.318444,
          lat: 23.339513,
          deg: 0,
        },
        {
          lng: 115.566807,
          lat: 23.314027,
          deg: 0,
        },
        {
          lng: 114.895306,
          lat: 23.101452,
          deg: 0,
        },
        {
          lng: 115.456423,
          lat: 27.572437,
          deg: 0,
        },
        {
          lng: 116.192315,
          lat: 27.161786,
          deg: 0,
        },
        {
          lng: 115.980746,
          lat: 25.995552,
          deg: 0,
        },
        {
          lng: 117.516921,
          lat: 26.70004,
          deg: 0,
        },
        {
          lng: 117.148975,
          lat: 25.687545,
          deg: 0,
        },
        {
          lng: 119.108287,
          lat: 26.518118,
          deg: 0,
        },
        {
          lng: 120.129337,
          lat: 27.98154,
          deg: 0,
        },
        {
          lng: 116.983399,
          lat: 24.346422,
          deg: 0,
        },
        {
          lng: 115.723184,
          lat: 24.926596,
          deg: 0,
        },
      ],
      storageHouse: [
        {
          id: "house_1",
          banner: require("@/assets/img/banner5.jpeg"),
          name: "普洛斯(南平)物流园",
          collected: false,
          lng: 118.629957,
          lat: 27.924359,
          deg: "恒温",
          used: 10000,
          total: 15000,
          floor: "单层库",
        },
        {
          id: "house_2",
          banner: require("@/assets/img/banner6.jpeg"),
          name: "普洛斯(福州)物流园",
          collected: true,
          lng: 119.255465,
          lat: 26.691777,
          deg: "恒温",
          used: 5800,
          total: 10000,
          floor: "双层坡道库",
        },
        {
          id: "house_3",
          banner: require("@/assets/img/banner1.jpeg"),
          name: "普洛斯(梅州)物流园",
          collected: false,
          lng: 116.045137,
          lat: 24.489616,
          deg: "冷藏",
          used: 4000,
          total: 10000,
          floor: "三层盘道直入库",
        },
        {
          id: "house_4",
          banner: require("@/assets/img/banner3.jpeg"),
          name: "普洛斯(龙岩)物流园",
          collected: false,
          lng: 116.495871,
          lat: 25.795856,
          deg: "冷冻",
          used: 0,
          total: 10000,
          floor: "单层库",
        },
        {
          id: "house_5",
          banner: require("@/assets/img/banner4.jpeg"),
          name: "普洛斯(漳州)物流园",
          collected: false,
          lng: 117.351345,
          lat: 24.143986,
          deg: "超低温",
          used: 8000,
          total: 18000,
          floor: "多层楼库",
        },
        {
          id: "house_6",
          banner: require("@/assets/img/banner2.jpeg"),
          name: "普洛斯(揭阳)物流园",
          collected: false,
          lng: 115.566807,
          lat: 23.314027,
          deg: "恒温",
          used: 100000,
          total: 100000,
          floor: "多层楼库",
        },
        {
          id: "house_7",
          banner: require("@/assets/img/banner0.jpeg"),
          name: "普洛斯(汕头)物流园",
          collected: false,
          lng: 114.895306,
          lat: 23.101452,
          deg: "恒温",
          used: 18000,
          total: 60000,
          floor: "单层楼库",
        },
      ],
      truck: [
        {
          lng: 118.629957,
          lat: 27.924359,
          deg: 0,
        },
        {
          lng: 119.255465,
          lat: 26.691777,
          deg: 0,
        },
        {
          lng: 116.045137,
          lat: 24.489616,
          deg: 0,
        },
        {
          lng: 116.495871,
          lat: 25.795856,
          deg: 0,
        },
        {
          lng: 117.351345,
          lat: 24.143986,
          deg: 0,
        },
        {
          lng: 115.318444,
          lat: 23.339513,
          deg: 0,
        },
        {
          lng: 115.566807,
          lat: 23.314027,
          deg: 0,
        },
        {
          lng: 114.895306,
          lat: 23.101452,
          deg: 0,
        },
        {
          lng: 119.0163,
          lat: 25.854136,
          deg: 0,
        },
        {
          lng: 118.032045,
          lat: 25.504023,
          deg: 0,
        },
        {
          lng: 117.526119,
          lat: 24.985302,
          deg: 0,
        },
        {
          lng: 116.845419,
          lat: 26.211502,
          deg: 0,
        },
        {
          lng: 117.406537,
          lat: 26.898165,
          deg: 0,
        },
        {
          lng: 118.924314,
          lat: 27.752634,
          deg: 0,
        },
        {
          lng: 116.725837,
          lat: 24.135544,
          deg: 0,
        },
        {
          lng: 115.640396,
          lat: 26.170004,
          deg: 0,
        },
      ],
      //地图数据
      mapData: {
        //中心坐标
        center: { lng: 0, lat: 0 },
        //缩放级别
        zoom: 8,
      },
      //BMap类
      BMap: null,
      //地图对象
      map: null,
    };
  },
  methods: {
    //地图预处理
    async mapHandler({ BMap, map }) {
      if (this.businessId) {
        //可以在此处请求接口获取坐标数据
        await this.getMallBusinessDetail();
      }

      map.enableScrollWheelZoom(true);
      // console.log(map);

      //保存百度地图类
      this.BMap = BMap;
      //保存地图对象
      this.map = map;
      //如果一开始坐标存在(编辑的时候)
      if (this.businessDetail.longitude && this.businessDetail.latitude) {
        //设置坐标
        this.mapData.center.lng = this.businessDetail.longitude;
        this.mapData.center.lat = this.businessDetail.latitude;
      } else {
        //如果坐标不存在则动态获取当前浏览器坐标（创建的时候）
        let geolocation = new BMap.Geolocation();
        //获取当前的坐标（使用promise 将异步转换为同步）
        await new Promise((resolve) => {
          geolocation.getCurrentPosition((r) => {
            this.mapData.center.lng = this.businessDetail.longitude =
              r.point.lng;
            this.mapData.center.lat = this.businessDetail.latitude =
              r.point.lat;
            resolve();
          });
        });
      }
    },
    //在地图上选择区域
    getLocation(e) {
      //设置经度
      this.businessDetail.longitude = e.point.lng;
      //设置纬度
      this.businessDetail.latitude = e.point.lat;
      // this.storageHouse.push({
      //   lng: e.point.lng,
      //   lat: e.point.lat,
      //  deg:0, //0:楼库  1:㎡库
      // });
      // console.log(this.storageHouse);
      //百度地图类
      let BMapGL = this.BMap;
      //地图对象
      let map = this.map;
      //创建坐标解析对象
      let geoc = new BMapGL.Geocoder();
      //解析当前的坐标成地址
      geoc.getLocation(e.point, (rs) => {
        //获取地址对象
        let addressComp = rs.addressComponents;
        //拼接出详细地址
        this.businessDetail.address =
          addressComp.province +
          addressComp.city +
          addressComp.district +
          addressComp.street +
          addressComp.streetNumber;
      });
    },
  },
};
</script>

<style lang="less">
.map-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.house-detail {
  overflow-y: auto;
  padding-bottom: 81px;

  .base {
    display: flex;
    flex-wrap: wrap;
    line-height: 28px;
    img {
      width: 100%;
    }
    p {
      display: block;
      width: 50%;
    }
  }

  .preview {
    margin-top: 20px;
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    border: 1px solid #999;
    overflow: hidden;

    img {
      width: 100%;
    }

    &:hover {
      .preview-mask {
        visibility: visible;
      }
    }

    .preview-mask {
      visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      font-weight: bold;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      p {
        margin: 0;
      }
      img {
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
        border-radius: 100px;
        border: 2px solid #fff;
        opacity: 0.8;
      }
    }
  }

  .detail {
    margin-top: 30px;
    line-height: 28px;
    img {
      width: 100%;
      margin-top: 20px;
    }
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
}
</style>
