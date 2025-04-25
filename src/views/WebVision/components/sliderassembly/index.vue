<template>
  <div class="sliderassembly">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        :title="items.title"
        :name="index + 1"
        v-for="(items, index) in datas"
        :key="index"
      >
        <div
          class="componList"
          draggable="true"
          @dragstart="drag($event)"
          @dragend="dragends($event)"
          :data-name="item.name"
          v-for="(item, ind) in items.comList"
          :key="ind"
        >
          <div class="comp-icon">
            <i class="iconfont" :class="item.icon" v-if="item.icon" />
            <el-icon v-else><ElementPlus /></el-icon>
          </div>
          <div class="comp-name">
            <span>{{ item.text }}</span>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ElementPlus } from "@element-plus/icons-vue";
// Define interfaces
interface ComponentItem {
  text: string;
  type?: string;
  icon?: string;
  vanIcon?: string;
  name: string;
}

interface DataItem {
  title: string;
  comList: ComponentItem[];
}

interface Pointer {
  show: boolean;
}

// Define props
const props = defineProps<{
  pointer: Pointer;
}>();

// 侧边栏组件显示
// [1] 基本组件 [2] 业务组件
const activeNames = reactive<number[]>([2]);

// 组件信息配置
const datas = reactive<DataItem[]>([
  {
    title: "基础组件",
    comList: [
      {
        text: "商品搜索",

        icon: "icon-shangpinsousuo",
        name: "commoditysearch",
      },
      {
        text: "标题文本",

        icon: "icon-Component-biaotiwenzi",
        name: "captiontext",
      },
      {
        text: "图片广告",

        icon: "icon-tupianguanggao",
        name: "pictureads",
      },
      {
        text: "图文导航",

        icon: "icon-icon_tupiandaohang",
        name: "graphicnavigation",
      },
      {
        text: "底部导航",

        icon: "icon-daohang",
        name: "tabbar",
      },
      {
        text: "魔方",

        icon: "icon-mofang",
        name: "magiccube",
      },
      {
        text: "公告",

        icon: "icon-gonggao",
        name: "notice",
      },
      {
        text: "视频",

        icon: "icon-shipin",
        name: "videoss",
      },
      {
        text: "富文本",

        icon: "icon-fuwenben",
        name: "richtext",
      },
      {
        text: "辅助分割",

        icon: "icon-Component-fuzhufenge",
        name: "auxiliarysegmentation",
      },
      {
        text: "店铺信息",

        icon: "icon-dianpuxinxi",
        name: "storeinformation",
      },
      {
        text: "单元格",

        icon: "icon-jinrudianpu",
        name: "entertheshop",
      },
      {
        text: "社群涨粉",

        icon: "icon-kuaisuzhangfen",
        name: "communitypowder",
      },
      {
        text: "关注公众号",

        icon: "icon-gongzhonghao",
        name: "follow",
      },
      {
        text: "悬浮",

        icon: "icon-wangye",
        name: "suspension",
      },
      {
        text: "自定义模块",
        type: "",
        icon: "icon-zidingyimokuai",
        name: "custommodule",
      },
    ],
  },
  {
    title: "业务组件",
    comList: [
      {
        text: "商品",
        type: "2-1",
        icon: "icon-goods",
        name: "listswitching",
      },
      {
        text: "文章模块",
        type: "2-2",
        icon: "icon-dianpubijikapian",
        name: "storenotecard",
      },
      {
        text: "表单模块",
        type: "2-3",
        vanIcon: "orders-o",
        name: "investigate",
      },
      {
        text: "帖子详情模块",
        name: "PostDetailsBox",
      },
      {
        text: "通用盒子",
        name: "custombox",
      },
      {
        text: "通用广告",
        name: "custombarad",
      },
      {
        text: "开奖结果",
        name: "gameresult",
      },
      {
        text: "BBS列表模块",
        name: "navbbslistbox",
      },
      {
        text: "广告大全",
        name: "webad",
      },
      {
        text: "导航菜单",
        name: "navbar",
      },
      {
        text: "广告大全-翻页",
        name: "webadmore",
      },
      {
        text: "推广广告",
        name: "adbar",
      },
      {
        text: "首页页脚",
        name: "footerbar",
      },
      {
        text: "首页头部",
        name: "headerbar",
      },
      {
        text: "首页公告",
        name: "homepopnotice",
      },
    ],
  },
]);

/**
 * 当用户开始拖动元素或选择文本时触发此事件
 *
 * @param event DragEvent对象
 */
const drag = (event: DragEvent): void => {
  if (event.dataTransfer) {
    /* 开启穿透 */
    props.pointer.show = true;
    /* 传递参数 */
    event.dataTransfer.setData(
      "componentName",
      (event.currentTarget as HTMLElement).dataset.name?.toLocaleLowerCase() ||
        ""
    );
  }
};

/**
 * 当拖动操作结束时（释放鼠标按钮或按下退出键），会触发此事件
 *
 * @param event DragEvent对象
 */
const dragends = (event: DragEvent): void => {
  /* 关闭穿透 */
  props.pointer.show = false;
};
</script>

<style scoped lang="less">
/* 组件 */
.sliderassembly {
  width: 275px;
  height: 100%;
  overflow-y: scroll;
  border-right: 1px solid #ebedf0;
  box-sizing: border-box;
  padding: 0 12px;
  background: #fff;
  /* 滚动条 */
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #155bd4;
  }
  :deep(.el-collapse-item__header),
  :deep(.el-collapse-item__wrap) {
    border-bottom: 0 !important;
  }

  /* 组件列表 */
  .componList {
    display: flex;
    column-gap: 10px;
    margin-bottom: 8px;
    align-items: center;
    cursor: all-scroll;
    transition: all 0.3s;
    .comp-icon {
      font-size: 1.5rem;
      width: 2rem;
      line-height: 32px;
      color: #b0a8a8;
      margin-top: 4px;
    }
    .comp-name {
      font-size: medium;
      color: #323233;
      p {
        color: #7d7e80;
        font-size: small;
      }
    }
    &:hover {
      background: #155bd4;
      border-radius: 2px;
      // font-weight: 700;
      i,
      p,
      span {
        color: #fff;
      }
    }
    /* 图标 */
    i {
      font-size: 32px;
      width: 32px;
      height: 32px;
      line-height: 32px;
      color: #b0a8a8;
      margin-top: 4px;
    }
  }
}
</style>
