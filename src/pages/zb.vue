<template>
  <div class="content">
    <div class="banner">
      <h1>物流不动产信息查询</h1>
      <div class="searchBox">
        <input class="text" placeholder="请输入您要搜索的内容" />
        <div class="btn">搜索</div>
      </div>
    </div>

    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="全部"> </a-tab-pane>
      <a-tab-pane key="2" tab="待建"> </a-tab-pane>
      <a-tab-pane key="3" tab="已建成"> </a-tab-pane>
      <a-tab-pane key="4" tab="拟转让"> </a-tab-pane>
    </a-tabs>

    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" :key="tag" :color="color[tag]">
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action">
        <a>收藏</a>
        <a-divider type="vertical" />
        <a>了解详情</a>
      </span>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "日期",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "区域",
    dataIndex: "area",
    key: "area",
  },
  {
    title: "简介",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "状态",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

const data = [
  {
    key: "1",
    date: "2022-03-29",
    area: "广东",
    desc: "建筑面积为120423平方米园区项目",
    tags: ["在建"],
  },
  {
    key: "2",
    date: "2022-03-29",
    area: "重庆",
    desc: "重庆市巴南区京东亚洲一号重庆巴南物流园二期（C-1仓库、C-2仓库、叉车充电棚三、非机动车棚三)",
    tags: ["待建"],
  },
  {
    key: "3",
    date: "2022-03-29",
    area: "内蒙古",
    desc: "乌兰察布市兴和县乌兰察布综合物流园区内房地产转让交易公告",
    tags: ["拟转让"],
  },
  {
    key: "4",
    date: "2022-03-29",
    area: "福建",
    desc: "普洛斯(南平)物流园",
    tags: ["已建成"],
  },
  {
    key: "5",
    date: "2022-03-29",
    area: "福建",
    desc: "普洛斯(龙岩)物流园",
    tags: ["已建成"],
  },
];

export default {
  data() {
    return {
      data,
      columns,
      color: {
        已建成: "green",
        在建: "volcano",
        待建: "orange",
        拟转让: "geekblue",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 1280px;
  margin: 0 auto;
}

.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  flex-direction: column;

  h1 {
    font-size: 38px;
    margin-bottom: 40px;
  }
}

.searchBox {
  display: flex;
  background: #fff;
  border-radius: 2px;
  height: 55px;
  box-shadow: 1px 0 5px rgb(0 0 0 / 20%);
  margin: 0 auto;
  width: 800px;

  .text {
    border: 0;
    height: 55px;
    line-height: 55px;
    border-radius: 2px;
    font-size: 14px;
    flex: 1;
    text-indent: 20px;
  }

  .btn {
    background: #00ae66;
    width: 127px;
    height: 55px;
    line-height: 55px;
    border: 0;
    border-radius: 0 2px 2px 0;
    cursor: pointer;
    text-align: center;
    font-size: 18px;
    color: #fff;
  }
}
</style>
