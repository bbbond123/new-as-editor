<template>
  <section class="componenManagement">
    <p class="Prompt">*底部导航组件为固定页面底部，无需拖拽调整位置*</p>
    <div v-show="data.length > 0" class="selectAll">
      <el-checkbox
        class="selectAll-checkbox"
        v-model="selectAll"
        @change="handleSelectAll"
        >全选</el-checkbox
      >
      <el-popconfirm
        title="您确定要删除该组件吗?"
        icon="Warning"
        icon-color="red"
        @confirm="deleteSelected()"
      >
        <template #reference>
          <el-button size="small" type="danger" :disabled="!hasSelectedItems"
            >删除</el-button
          >
        </template>
      </el-popconfirm>
    </div>
    <!-- 拖拽 -->
    <vuedraggable
      :list="data"
      :disabled="false"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
    >
      <template #item="{ element, index }">
        <div :class="element.text === '底部导航' ? 'item delDragitem' : 'item'">
          <el-checkbox
            v-model="element.active"
            @change="handleItemSelect"
          ></el-checkbox>
          <p>{{ element.text }}</p>
          <el-popconfirm
            title="您确定要删除该组件吗?"
            icon="Warning"
            icon-color="red"
            @confirm="onConfirms(index)"
          >
            <template #reference>
              <div class="cursor-pointer">
                <el-icon size="large">
                  <Delete />
                </el-icon>
              </div>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </vuedraggable>
  </section>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, watch, defineComponent, computed } from "vue";
import vuedraggable from "vuedraggable";

defineComponent({
  name: "componenmanagement",
});

const selectAll = ref(false);

const hasSelectedItems = computed(() => {
  return data.value.some((item) => item.active);
});

const handleSelectAll = (val: boolean) => {
  data.value.forEach((item) => {
    item.active = val;
  });
};

//批量 删除
const deleteSelected = async () => {
  // const selectedIds = data.value
  //   .filter((item) => item.active)
  //   .map((item) => item.setStyle?.componentId)
  //   .filter(Boolean) as string[];

  // console.log('data.value', data.value)
  // console.log('selectedIds', selectedIds)
  // return
  // if (await deleteComponents(selectedIds)) {
  data.value = data.value.filter((item) => !item.active);
  // emit("componenmanagement", data.value);
  // }
};

const checkMove = (e) => {
  window.console.log("Future index: " + e.draggedContext.futureIndex);
};
const handleItemSelect = (event: Event) => {
  // event.stopPropagation()
  // console.log('data.value', data.value)
  selectAll.value = data.value.every((item) => item.active);
};

interface ComponentItem {
  text: string;
  [key: string]: any;
}

const props = defineProps<{
  datas: ComponentItem[];
}>();

const emit = defineEmits<{
  (e: "componenmanagement", value: ComponentItem[]): void;
}>();

const data = ref<ComponentItem[]>([]);

// Sync props with local state
watch(
  () => props.datas,
  (newVal) => {
    data.value = newVal;
  },
  { immediate: true }
);

// Emit changes to parent
watch(
  data,
  (newVal) => {
    emit("componenmanagement", newVal);
  },
  { deep: true }
);

const onConfirm = (index: number) => {
  data.value.splice(index, 1);
};

const onConfirms = (index: number) => deleteItem(index);

//单个删除
const deleteItem = async (index: number) => {
  // console.log('index', index)

  const componentId = data.value[index].setStyle?.componentId;

  if (!componentId) {
    ElMessage.error("无效的组件ID");
    return;
  }

  // if (await deleteComponents([componentId])) {
  data.value.splice(index, 1);
  // emit("componenmanagement", data.value);
  // }
};
</script>

<style scoped lang="less">
/* 局部样式 */
:deep(.el-tabs--border-card > .el-tabs__content) {
  padding: 0;
}

/* 组件管理 */
.componenManagement {
  width: 100%;
  left: 0;
  top: 0;
  box-sizing: border-box;

  .Prompt {
    text-align: center;
    color: #aca8a8;
    line-height: 2rem;
  }

  .selectAll {
    // margin: 0 0 10px 10px;
    padding: 0 0 10px 10px;
    display: flex;
    justify-content: space-between;
  }

  /* 选项 */
  .item {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  }

  .cursor-pointer {
    height: 100%;
    line-height: 2.5rem;
    width: 1.5rem;
    cursor: pointer;
    text-align: center;
  }
}
</style>
