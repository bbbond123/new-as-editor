import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 样式初始化
import '@/assets/css/reset.css'
import '@/assets/css/minx.less'

// 引入路由配置
import '@/router/routingConfiguration'

// 引入字体图标
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

// 引入请求拦截
import "@/api/request"
import httpApi from '@/api/api'
app.config.globalProperties.$httpApi = httpApi

// 挂载 uitls
import Utils from '@/views/WebVision/const'
app.config.globalProperties.$utils = Utils

// 注册全局过滤器/时间戳转换日期
// import globalFilter from '@/views/WebVision/const/filter'


