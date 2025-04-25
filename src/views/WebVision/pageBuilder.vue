<template>
  <div class="home">
    <!-- 装修操作 -->
    <section class="operation">
      <!-- 组件 -->
      <sliderassembly :pointer="pointer" />
      <!-- 手机 -->
      <div class="phone" @click="unActiveComponent">
        <section
          class="phoneAll"
          ref="imageTofile"
          id="imageTofile"
          @click="onStopPropagation"
        >
          <img src="@/assets/images/phoneTop.png" alt="" class="statusBar" />
          <!-- 头部导航 -->
          <headerTop :page="page" @click="headTop" />
          <!-- 主体内容 -->
          <section
            class="phone-container"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
            @dragleave="dragleaves()"
          >
            <!-- 动态组件 -->
            <vuedraggable
              :class="pointer.show ? 'pointer-events' : ''"
              :list="pageComponents"
              item-key="index"
              :forceFallback="true"
              :animation="200"
            >
              <template #item="{ element, index }">
                <component
                  :is="element.component"
                  :datas="element.setStyle"
                  @click="activeComponent(element, index)"
                  class="componentsClass"
                  :style="{
                    border:
                      element.active && deleShow ? '2px solid #155bd4' : '',
                  }"
                >
                  <template #deles>
                    <div
                      v-show="deleShow"
                      class="deles"
                      @click.stop="deleteObj(index)"
                    >
                      <!-- 删除组件 -->
                      <span class="iconfont icon-sanjiaoxingzuo"></span>
                      {{ element.text }}
                      <van-icon name="delete" />
                    </div>
                  </template>
                </component>
              </template>
            </vuedraggable>
          </section>

          <!-- 手机高度 -->
          <div class="phoneSize">iPhone 8手机高度</div>

          <!-- 底部 -->
          <phoneBottom />
        </section>
        <!-- 底部 -->
      </div>
      <!-- 右侧工具栏 -->
      <section class="component-settings">
        <el-tabs
          class="custom-tabs"
          type="border-card"
          v-model="tab"
          @tab-change="onTabChange"
          :stretch="true"
        >
          <el-tab-pane :name="ETab.page">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><SetUp /></el-icon>
                <span>站点设置</span>
              </span>
            </template>
            <decorate :datas="page" />
          </el-tab-pane>
          <el-tab-pane :name="ETab.list">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><ScaleToOriginal /></el-icon>
                <span>组件管理</span>
              </span>
            </template>
            <componenmanagement
              :datas="pageComponents"
              @componenmanagement="onSortList"
            />
          </el-tab-pane>
          <el-tab-pane label="组件设置详情" :name="ETab.detail">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><Edit /></el-icon>
                <span>组件设置详情</span>
              </span>
            </template>
            <component :is="rightcom" :datas="currentproperties" />
          </el-tab-pane>
        </el-tabs>
      </section>
    </section>
    <!-- 
      <div class="debugger-text">
        {{ datas }}
      </div>
      -->
  </div>
</template>

<script setup lang="ts">
import { SetUp, ScaleToOriginal, Edit } from "@element-plus/icons-vue";
import { reactive, toRefs, ref } from "vue";
import vuedraggable from "vuedraggable"; //拖拽组件
import componentProperties from "@/views/WebVision/const/componentProperties"; // 组件数据
import phoneBottom from "@/views/WebVision/components/phoneBottom/index.vue";
import headerTop from "@/views/WebVision/components/headerTop/index.vue";
import utils from "@/views/WebVision/const/index";
import { ETab } from "./type";

// 页面数据
const datas = reactive({
  page: {
    name: "页面标题", //页面名称
    details: "页面描述信息",
  },
  pageComponents: [], //页面组件
});

/**
 * 切换组件位置  用于组件管理中删除功能
 * @param {Object} res 组件切换后返回的位置
 */
const onSortList = (res: any) => {
  datas.pageComponents = res;
};

const initChooseData = () => {
  return {
    deleShow: true, // 删除标签显示
    pointer: { show: false }, // 穿透
    // 非组件数据，都放在这里
    page: datas.page,

    // 选中组件相关的
    index: -1, // 当前选中组件index
    rightcom: "blank", // 当前选中组件的对应的文件名字
    currentproperties: {}, // 当前选中组件的对应的属性

    offsetY: 0, //记录上一次距离父元素高度
  };
};

// 选择组件数据
const choose = reactive(initChooseData());

const unActiveComponent = (event: Event) => {
  // 站点的话
  // choose.index = -1;
  datas.pageComponents.forEach((res) => {
    res.active = false;
  });
  choose.rightcom = "blank"; // 加载空白组件
  // choose.rightcom = "none"; //
};

/**
 * 选择组件
 * @param {Object} res 当前组件对象
 */
const activeComponent = (res, index: number) => {
  choose.rightcom = res.style; // 加载配置组件

  choose.index = index;
  choose.currentproperties = res.setStyle;
  datas.pageComponents.forEach((res) => {
    if (res.active === true) {
      res.active = false;
    }
  });
  res.active = true;
  tab.value = ETab.detail;
};

// 切换标题
const headTop = () => {
  tab.value = ETab.page;
  /* 替换 */
  datas.pageComponents.forEach((res) => {
    /* 修改选中 */
    if (res.active === true) {
      res.active = false;
    }
  });
};

const onStopPropagation = (event: Event) => {
  event.stopPropagation();
};

/**
 * 删除组件
 *
 * @param {Number} index 当前组件index
 */
const deleteObj = (index: number) => {
  datas.pageComponents.splice(index, 1);

  if (datas.pageComponents.length === 0) {
    choose.rightcom = "blank";
    choose.currentproperties = {};
  }

  if (choose.index === index) {
    choose.rightcom = "blank";
    choose.currentproperties = {};
  }

  if (index < choose.index) {
    choose.index = choose.index - 1;
  }
};

//website list detail
const tab = ref<ETab>(ETab.page);

const onTabChange = (val: ETab) => {
  switch (val) {
    case ETab.page:
      break;
    case ETab.list:
      // choose.rightcom = "componenmanagement";
      // choose.currentproperties = datas.pageComponents;
      break;
    case ETab.detail:
      // const number = 0;
      // const res = datas.pageComponents[number];
      // const index = number;
      // choose.index = index;
      // /* 切换组件 */
      // choose.rightcom = res.style;
      // /* 丢样式 */
      // choose.currentproperties = res.setStyle;
      // /* 替换 */
      // datas.pageComponents.forEach((res) => {
      //   /* 修改选中 */
      //   if (res.active === true) res.active = false;
      // });
      // /* 选中样式 */
      // res.active = true;
      break;
  }
};

const allowDrop = (event: DragEvent) => {
  //阻止浏览器的默认事件
  event.preventDefault();

  /* 获取鼠标高度 */
  let eventoffset = event.offsetY;

  /* 如果没有移动不触发事件减少损耗 */
  if (choose.offsetY === eventoffset) {
    return;
  } else {
    choose.offsetY = eventoffset;
  }

  /* 获取组件 */
  //@ts-ignore
  const childrenObject = event?.target?.children && event?.target?.children[0];

  // 一个以上的组件计算
  if (datas.pageComponents.length) {
    /* 如果只有一个组件并且第一个是提示组件直接返回 */
    if (
      datas.pageComponents.length === 1 &&
      datas.pageComponents[0].component === "placementarea"
    ) {
      return;
    }

    /* 如果鼠标的高度小于第一个的一半直接放到第一个 */
    if (eventoffset < childrenObject.children[0].clientHeight / 2) {
      /* 如果第一个是提示组件直接返回 */
      if (datas.pageComponents[0].component === "placementarea") return;

      /* 删除提示组件 */
      datas.pageComponents = datas.pageComponents.filter(
        (res) => res.component !== "placementarea"
      );

      /* 最后面添加提示组件 */
      datas.pageComponents.unshift({
        component: "placementarea",
      });

      return;
    }

    /* 记录距离父元素高度 */
    const childOff = childrenObject.offsetTop;

    /* 鼠标在所有组件下面 */
    if (
      eventoffset > childrenObject.clientHeight ||
      childrenObject.lastChild.offsetTop -
        childOff +
        childrenObject.lastChild.clientHeight / 2 <
        eventoffset
    ) {
      /* 最后一个组件是提示组件返回 */
      if (
        datas.pageComponents[datas.pageComponents.length - 1].component ===
        "placementarea"
      )
        return;

      /* 清除提示组件 */
      datas.pageComponents = datas.pageComponents.filter(
        (res) => res.component !== "placementarea"
      );

      /* 最后一个不是提示组件添加 */
      datas.pageComponents.push({
        component: "placementarea",
      });

      return;
    }

    const childrens = childrenObject.children;

    /* 在两个组件中间，插入 */
    for (let i = 0, l = childrens.length; i < l; i++) {
      const childoffset = childrens[i].offsetTop - childOff;

      if (childoffset + childrens[i].clientHeight / 2 > event.offsetY) {
        /* 如果是提示组件直接返回 */
        if (datas.pageComponents[i].component === "placementarea") break;

        if (datas.pageComponents[i - 1].component === "placementarea") break;

        /* 清除提示组件 */
        datas.pageComponents = datas.pageComponents.filter(
          (res) => res.component !== "placementarea"
        );

        datas.pageComponents.splice(i, 0, {
          component: "placementarea",
        });
        break;
      } else if (childoffset + childrens[i].clientHeight > event.offsetY) {
        if (datas.pageComponents[i].component === "placementarea") break;

        if (
          !datas.pageComponents[i + 1] ||
          datas.pageComponents[i + 1].component === "placementarea"
        )
          break;

        datas.pageComponents = datas.pageComponents.filter(
          (res) => res.component !== "placementarea"
        );

        datas.pageComponents.splice(i, 0, {
          component: "placementarea",
        });

        break;
      }
    }
  } else {
    /* 一个组件都没有直接push */
    datas.pageComponents.push({
      component: "placementarea",
    });
  }
};

const drop = (event: any) => {
  /* 获取数据 */
  const componentName = event.dataTransfer.getData("componentName");
  console.log("🚀 ~ drop ~ componentName:", componentName);
  let data = utils.deepClone(componentProperties.get(componentName));
  /* 替换 */
  datas.pageComponents.forEach((res, index) => {
    /* 修改选中 */
    if (res.active === true) res.active = false;
    /* 替换提示 */
    choose.index = index;
    if (res.component === "placementarea") datas.pageComponents[index] = data;
  });

  /* 切换组件 */
  choose.rightcom = data.style;
  /* 丢样式 */
  choose.currentproperties = data.setStyle;
};

const dragleaves = () => {
  /* 删除提示组件 */
  datas.pageComponents = datas.pageComponents.filter(
    (res) => res.component !== "placementarea"
  );
};

const { pageComponents } = toRefs(datas);
const { deleShow, page, rightcom, currentproperties, pointer } = toRefs(choose);
</script>

<style lang="less" scoped>
.pointer-events {
  pointer-events: none;
}

.home {
  width: 100%;
  height: 100%;
  user-select: none;
  /* 删除组件 */
  .deles {
    position: absolute;
    min-width: 80px;
    text-align: center;
    line-height: 25px;
    background: #fff;
    height: 25px;
    font-size: 12px;
    left: 103%;
    top: 50%;
    transform: translateY(-50%);
    .icon-sanjiaoxingzuo {
      position: absolute;
      left: -11px;
      color: #fff;
      font-size: 12px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:hover {
      i {
        display: block;
        position: absolute;
        left: 0;
        font-size: 16px;
        top: 0;
        text-align: center;
        line-height: 25px;
        width: 100%;
        color: #fff;
        height: 100%;
        z-index: 10;
        background: rgba(0, 0, 0, 0.5);
      }
      .icon-sanjiaoxingzuo {
        color: rgba(0, 0, 0, 0.5);
      }
    }

    i {
      display: none;
    }
  }

  /* 操作主体 */
  .operation {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #f7f8fa;
  }

  /* 手机 */
  .phone {
    width: 55%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    background: #f7f8fa;
    &::-webkit-scrollbar {
      width: 1px;
    }
    // &::-webkit-scrollbar-thumb {
    //   background-color: #155bd4;
    // }

    /* 手机样式 */
    .phoneAll {
      width: 375px;
      min-height: 760px;
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
      margin: 45px 0;
      position: relative;

      /* 手机高度 */
      .phoneSize {
        position: absolute;
        left: -137px;
        top: 640px;
        font-size: 12px;
        color: #a2a2a2;
        border-bottom: 1px solid #dedede;
        width: 130px;
        height: 21px;
        line-height: 21px;
      }

      /* 状态栏 */
      .statusBar {
        width: 100%;
        display: block;
      }

      /* 主体内容 */
      .phone-container {
        min-height: 603px;
        box-sizing: border-box;
        cursor: pointer;
        width: 100%;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .componentsClass {
          border: 2px solid #fff;
          &:hover {
            border: 2px dashed #155bd4;
          }
        }
      }
    }
  }

  /* 右侧工具栏 */
  .decorateAll {
    // width: 376px;
    // height: 100%;
    // overflow-y: scroll;
    // overflow-x: hidden;
    // position: relative;
    // padding: 0 12px;
    // background: #fff;
    &::-webkit-scrollbar {
      width: 1px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #155bd4;
    }
  }

  /* 页面设置tab */
  .decorateTab {
    position: fixed;
    display: flex;
    right: 50%;
    top: 0;
    flex-direction: column;
    span {
      background-color: #fff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      width: 94px;
      height: 32px;
      display: inline-block;
      text-align: center;
      line-height: 32px;
      margin-bottom: 12px;
      transition: all 0.8s;
      cursor: pointer;
      &.active {
        background-color: #155bd4;
        color: #fff;
      }
      /* 图标 */
      i {
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }
}

/* 动画 */
.decorateAnima-enter-active {
  transition: all 1.5s ease;
}
.decorateAnima-leave-active {
  transition: all 1.5s ease;
}
.decorateAnima-enter {
  transform: translate(8px, 8px);
  opacity: 0;
}
.decorateAnima-leave-to {
  transform: translate(8px, 8px);
  opacity: 0;
}

.debugger-text {
  position: absolute;
  z-index: 999;
  padding: 30px;
  bottom: 40px;
  background-color: #155bd4;
  color: white;
  font-size: 20px;
}

.component-settings {
  width: 450px;
}

.custom-tabs {
  height: 100%;
  :deep(.el-tabs__content) {
    overflow: auto;
    padding: 10px;

    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #0000007b;
      border-radius: 10px;
      opacity: 0.5;
    }
  }
}

.custom-tabs-label .el-icon {
  vertical-align: middle;
}
.custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.component-wrapper {
  height: 100%;
  overflow: auto;
}
</style>
