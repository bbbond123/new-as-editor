<template>
  <section class="componenManagement">
    <!-- 标题 -->
    <section>
      <h2>组件排序设置</h2>
      <p class="prompt">注意： 底部导航组件为固定页面底部，无需拖拽调整位置</p>
      <p v-if="data.length === 0">请拖拽左侧的组件到中间栏</p>
    </section>
    <section>
      <!-- 拖拽 -->
      <vuedraggable
        :list="data"
        item-key="index"
        :forceFallback="true"
        :animation="200"
        filter=".delDragitem"
      >
        <template #item="{ element, index }">
          <div
            :class="element.text === '底部导航' ? 'item delDragitem' : 'item'"
          >
            <p>{{ element.text }}</p>
            <el-popconfirm
              title="您确定要删除该组件吗?"
              icon="el-icon-warning"
              iconColor="red"
              @confirm="onConfirm(index)"
            >
              <template #reference>
                <van-icon name="delete-o" style="cursor: pointer" />
              </template>
            </el-popconfirm>
          </div>
        </template>
      </vuedraggable>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, defineComponent } from 'vue'
import vuedraggable from 'vuedraggable'

defineComponent({
  name: 'componenmanagement'
})

interface ComponentItem {
  text: string
  [key: string]: any
}

const props = defineProps<{
  datas: ComponentItem[]
}>()

const emit = defineEmits<{
  (e: 'componenmanagement', value: ComponentItem[]): void
}>()

const data = ref<ComponentItem[]>([])

// Sync props with local state
watch(
  () => props.datas,
  (newVal) => {
    data.value = newVal
  },
  { immediate: true }
)

// Emit changes to parent
watch(data, (newVal) => {
  emit('componenmanagement', newVal)
}, { deep: true })

const onConfirm = (index: number) => {
  data.value.splice(index, 1)
}
</script>

<style scoped lang="less">
/* 组件管理 */
.componenManagement {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  /* 标题 */
  h2 {
    padding: 24px 16px 10px 0;
    font-size: 18px;
    font-weight: 600;
    color: #323233;
  }

  /* 选项 */
  .item {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    padding: 0 10px;
    font-size: 14px;
    cursor: all-scroll;
    color: #323233;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(10, 42, 97, 0.2);
    margin-bottom: 10px;
    i {
      color: #999;
    }
  }
  .delDragitem {
    background-color: rgba(10, 42, 97, 0.2);
    cursor: no-drop;
    user-select: none;
  }
}
.prompt {
  color: red;
  margin-bottom: 10px;
}
</style>