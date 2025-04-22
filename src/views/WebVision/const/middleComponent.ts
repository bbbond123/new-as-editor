import type { Component } from "vue";
import custommodule from "@/views/WebVision/components/componentscom/custommodule/index.vue";
import notice from "@/views/WebVision/components/componentscom/notice/index.vue";

interface ComponentMap {
  [key: string]: Component; // 添加索引签名
}
export const componentMap: ComponentMap = {
  custommodule: custommodule,
  notice: notice,
  // ... 其他组件
};
