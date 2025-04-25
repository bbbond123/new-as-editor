<template>
  <div class="custommodule">
    <!-- {{ datas.demo }} -->

    <img :src="datas.img" alt="" />
    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts">
interface Datas {
  img: string;
}

defineProps<{
  datas: Datas;
}>();
</script>

<style scoped lang="less">
.custommodule {
  position: relative;
  img {
    width: 100%;
  }
  min-height: 46px;
}
</style>
