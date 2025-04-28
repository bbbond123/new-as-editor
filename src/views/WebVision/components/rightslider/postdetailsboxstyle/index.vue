<template>
  <div class="navBarStyle">
    <!-- 标题 -->
    <h2>{{ datas.componentType }}</h2>

    <!-- 公告 -->
    <el-form
      label-width="auto"
      ref="ruleFormRef"
      :model="Com_state.formData"
      :rules="Com_state.rules"
      class="lef"
    >
      <!-- 组件名称 -->
      <el-form-item label="组件名称" prop="componentName">
        <el-input v-model="Com_state.formData.componentName" />
      </el-form-item>
      <!-- 组件编码 -->
      <el-form-item label="页面编码" prop="pageCode">
        <el-input v-model="Com_state.formData.pageCode" />
      </el-form-item>
      <el-form-item label="模版选择" prop="model">
        <el-select v-model="Com_state.formData.model" placeholder="请选择模版">
          <el-option
            v-for="item in Com_state.modelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="导航Id" prop="navId">
        <el-input
          v-model="Com_state.formData.id"
          placeholder="输入导菜单对应的ID（可选）"
        ></el-input>
      </el-form-item>

      <p>帖子详情配置</p>
      <div class="form-item-list">
        <div
          v-for="(item, index) in Com_state.formData.postIdData"
          :key="index"
          class="form-item-list-item"
        >
          <el-form-item
            label-width="auto"
            label="帖子ID:"
            :prop="'itemData.' + index + '.text'"
          >
            <el-input v-model="item.postId"></el-input>
          </el-form-item>

          <el-form-item
            label-width="auto"
            label="彩种:"
            :prop="'itemData.' + index + '.link'"
          >
            <el-select v-model="item.gameType" placeholder="请选择彩种">
              <el-option
                v-for="item in Com_state.gameTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <!-- Delete button for each item -->
          <el-button
            type="danger"
            :icon="Delete"
            @click="removeItem(index)"
          ></el-button>
        </div>

        <!-- Add button to add a new item -->
        <el-button
          type="primary"
          :icon="Plus"
          circle
          @click="addItem"
        ></el-button>
      </div>

      <p>模块标题</p>
      <div class="form-item-list">
        <el-form-item label-width="auto" label="模块标题" prop="navId">
          <el-input
            v-model="Com_state.formData.title"
            placeholder="盒子标题 默认为帖子标题（可选）"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="auto" label="对齐方式" prop="align">
          <el-select
            v-model="Com_state.formData.align"
            placeholder="对齐方式（默认做左对齐）"
          >
            <el-option
              v-for="item in Com_state.alignOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form>

    <!-- 提交按钮 -->
    <el-button class="sub-btn" type="primary" @click="onSubmit">更新</el-button>
  </div>
</template>

<script lang="ts" setup>
import { editSysComponent } from "@/api/webgw/sysCompent";
import { editTemplateComponent } from "@/api/webgw/template";
import { editWebsiteComponent } from "@/api/webgw/websit";
import { sessionCache } from "@/hooks/useSession";
import type { customBarAdStyle } from "@/views/WebVision/type";
import { reactive, ref, watch } from "vue";
import { Delete, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
// 定义 props
const props = defineProps<{
  datas: customBarAdStyle;
  isEditJSON: boolean;
}>();

// 处理上传成功
//传成功
const configParamJson = JSON.parse(props.datas.configParamJson);
// console.log('configParamJson', props.datas.configParamJson)
// console.log('configParamJson', configParamJson)
const Com_state = reactive({
  rules: {
    // 校验表单输入
    componentName: [
      { required: true, message: "请输入组件名称", trigger: "blur" },
    ],
    // model: [{ required: true, message: '请选择模版', trigger: 'change' }],
  },
  formData: {
    componentName: props.datas.componentName,
    pageCode: props.datas?.pageCode,
    model: configParamJson.model ?? "s1",
    id: configParamJson.id ?? "",
    title: configParamJson.title ?? "",
    align: configParamJson.align ?? "center",
    postIdData: configParamJson.postIdData ?? [],
  },
  modelOptions: [
    { label: "模式 1", value: "s1" },
    { label: "模式 2", value: "s2" },
    { label: "模式 3", value: "s3" },
  ],
  gameTypeOptions: [
    { label: "澳彩", value: "2032" },
    { label: "港彩", value: "1" },
    { label: "台彩", value: "84" },
    { label: "新彩", value: "3995" },
    { label: "新澳彩", value: "5" },
  ],
  alignOptions: [
    { label: "居左", value: "left" },
    { label: "居中", value: "center" },
    { label: "居右", value: "right" },
  ],
  predefineColors: [
    // 颜色选择器预设
    "#ff4500",
    "#ff8c00",
    "#ffd700",
    "#90ee90",
    "#00ced1",
    "#1e90ff",
    "#c71585",
    "#409EFF",
    "#909399",
    "#C0C4CC",
    "rgba(255, 69, 0, 0.68)",
    "rgb(255, 120, 0)",
    "hsv(51, 100, 98)",
    "hsva(120, 40, 94, 0.5)",
    "hsl(181, 100%, 37%)",
    "hsla(209, 100%, 56%, 0.73)",
    "#c7158577",
  ],
});

// Method to add a new item
const addItem = () => {
  Com_state.formData.postIdData.push({ postId: "", gameType: "" });
};

// Method to remove an item
const removeItem = (index: number) => {
  Com_state.formData.postIdData.splice(index, 1);
};

// 引用表单
const ruleFormRef = ref();
const searchId = sessionCache.getCache("searchId");
const pageModel = sessionCache.getCache("pageModel");

const buildConfigParamJson = () => {
  return JSON.stringify({
    model: Com_state.formData.model ?? "s1",
    id: Com_state.formData.id ?? "",
    title: Com_state.formData.title ?? "",
    align: Com_state.formData.align ?? "center",
    postIdData: Com_state.formData.postIdData ?? [],
  });
};

// 监听 isEditJSON 的变化 执行代码同步
watch(
  () => props.isEditJSON,
  // 当 isEditJSON 变化时执行的函
  (newVal) => {
    if (newVal === true) {
      // console.log('newVal', newVal)
      // 当 isEditJSON 从 true 变为 false 时调用 handleSubmitData
      props.datas.configParamJson = buildConfigParamJson();
    }
  }
);

const getUpdate = async () => {
  // 处理提交数据
  const configParamJson = buildConfigParamJson();

  // console.log(Com_state.formData, 'configParamJson')
  // console.log(configParamJson, 'configParamJson')
  // return

  const baseParams = {
    componentId: props.datas.componentId,
    componentName: Com_state.formData.componentName,
    pageCode: Com_state.formData.pageCode,
    configParamJson,
  };
  // console.log('baseParams', baseParams)
  // return

  let params: any = { ...baseParams };
  let getAPI: Function;

  switch (pageModel) {
    case "templateMode":
      getAPI = editTemplateComponent;
      params.templateId = searchId;
      break;
    case "websiteMode":
      getAPI = editWebsiteComponent;
      params.websiteId = searchId;
      break;
    case "componentMode":
      getAPI = editSysComponent;
      break;
    default:
      console.error("Invalid pageModel:", pageModel);
      return;
  }

  try {
    const response = await getAPI(params);
    if (response && response.success) {
      ElMessage({
        showClose: true,
        // message: response.errMessage,
        message: "更新成功",
        type: "success",
      });
    } else {
      ElMessage({
        showClose: true,
        message: response.errMessage,
        type: "error",
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  // 例如，更新某些状态或调用 API
};

// console.log('searchId', searchId)
// console.log('pageModel', pageModel)
async function onSubmit() {
  try {
    const valid = await ruleFormRef.value.validate();
    if (valid) {
      getUpdate();
    }
  } catch (error) {
    console.log("表单验证失败", error);
  }
}
</script>

<style scoped lang="less">
.navBarStyle {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  /* 标题 */
  h2 {
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #f2f4f6;
    font-size: 18px;
    font-weight: 600;
    color: #323233;
  }

  .lef {
    :deep(.el-form-item__label) {
      text-align: left;
    }
  }

  .picke {
    float: right;
  }
  .sub-btn {
    position: relative;
    left: 0;
    bottom: 0;
  }

  .form-item-list {
    height: 8rem;
    overflow-y: auto;
    margin-bottom: 18px;
    text-align: center;
    border: 1px solid #9da0a3;
    margin-top: 0.2rem;
    padding: 0.2rem;
    .form-item-list-item {
      display: flex;
      justify-content: flex-start;
      gap: 0.4rem;

      .del-btn {
        cursor: pointer;
        margin-left: 1rem;
      }
    }
  }
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 控制元素之间的间距 */
}

.el-form-item {
  flex: 1 1 200px; /* 控制每个元素的宽度 */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
