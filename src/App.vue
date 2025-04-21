<script setup lang="ts">
import { ref, nextTick, provide } from 'vue'

let isRouterAlive = ref(true)

// reload无感刷新事件
const reload = () => {
  isRouterAlive.value = false
  // nextTick：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
  nextTick(() => {
    isRouterAlive.value = true
  })
}

// 向子组件以及子孙组件传递名为reload的函数，第一个参数自定义，第二个参数代表上面定义的reload()方法
provide('reload', reload)

</script>

<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<style scoped>
#app {
  position: absolute;
  left: 0;
  top: 0;
}

.fade-enter-active {
  transition: all 1.5s ease;
}
.fade-leave-active {
  transition: all 1.5s ease;
}
.fade-enter {
  transform: translateX(5px);
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(5px);
  opacity: 0;
}
.el-message-box.JSONView {
  width: 1100px;
}
.el-form-item__content {
  display: block !important;
}

.Prompt {
  font-size: 12px;
  color: #969799;
  margin-bottom: 10px;
}

.pointer-events {
  pointer-events: none;
}
</style>
