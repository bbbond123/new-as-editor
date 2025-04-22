import type { Component } from 'vue'
import custommodulestyle from '@/views/WebVision/components/rightslider/custommodulestyle/index.vue'
import templateStyle from '@/views/WebVision/components/rightslider/templateStyle/index.vue'
import websiteStyle from '@/views/WebVision/components/rightslider/websiteStyle/index.vue'
import noticestyle from '@/views/WebVision/components/rightslider/noticestyle/index.vue'
import editorModelStyle from '@/views/WebVision/components/rightslider/editorModelStyle/index.vue'
import gameResultStyle from '@/views/WebVision/components/rightslider/gameResultStyle/index.vue'
import navBarStyle from '@/views/WebVision/components/rightslider/navBarStyle/index.vue'
import webAdMoreStyle from '@/views/WebVision/components/rightslider/webAdMoreStyle/index.vue'
import navBarBoxStyle from '@/views/WebVision/components/rightslider/navBarBoxStyle/index.vue'
import headerBarStyle from '@/views/WebVision/components/rightslider/headerBarStyle/index.vue'
import adBarStyle from '@/views/WebVision/components/rightslider/adBarStyle/index.vue'
import customBarAdStyle from '@/views/WebVision/components/rightslider/customBarAdStyle/index.vue'
import postDetailsBoxStyle from '@/views/WebVision/components/rightslider/postDetailsBoxStyle/index.vue'
import navBBSListBoxStyle from '@/views/WebVision/components/rightslider/navBBSListBoxStyle/index.vue'
import swipeStyle from '@/views/WebVision/components/rightslider/swipeStyle/index.vue'
import webAdStyle from '@/views/WebVision/components/rightslider/webAdStyle/index.vue'
import homePopNoticeStyle from '@/views/WebVision/components/rightslider/homePopNoticeStyle/index.vue'
import footerBarStyle from '@/views/WebVision/components/rightslider/footerBarStyle/index.vue'
interface ComponentMap {
  [key: string]: Component // 添加索引签名
}

export const componentRightMap: ComponentMap = {
  custommodulestyle,
  templateStyle,
  websiteStyle,
  editorModelStyle,
  noticestyle,
  gameResultStyle,
  navBarStyle,
  webAdMoreStyle,
  navBarBoxStyle,
  headerBarStyle,
  adBarStyle,
  customBarAdStyle,
  postDetailsBoxStyle,
  navBBSListBoxStyle,
  swipeStyle,
  webAdStyle,
  homePopNoticeStyle,
  footerBarStyle
  // footerBarStyle: () => import('../components/rightslider/footerBarStyle/index.vue')
  // ... 其他组件
}
