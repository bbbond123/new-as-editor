import type { UploadUserFile } from "element-plus";

export interface IDatas {
  page: PageData;
  pageComponents: ComponentItem[];
}

export interface PageData {
  name: string;
  details: string;
  bgImg?: string;
  [key: string]: any;
}

export interface ComponentItem {
  component: string;
  text?: string;
  active?: boolean;
  style?: string;
  setStyle?: Record<string, any>;
  [key: string]: any;
}

export interface ChooseData {
  pointer: { show: boolean };
  index: number;
  offsetY: number;
  rightcom: string;
  setStyle: Record<string, any>;
}

export enum ETab {
  /**
   * 页面其他信息 配置栏
   */
  page,
  /**
   * 组件排序栏
   */
  list,
  /**
   * 组件详情，配置栏
   */
  detail,
}
