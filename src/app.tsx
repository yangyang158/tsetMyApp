import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
// 引入taro-ui组件样式
import 'taro-ui/dist/style/index.scss'
import Index from './pages/index'
import taroUIStore from './store/taro-ui-store' 
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


const store = {
  taroUIStore
}

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/map/index',
      'pages/taro-ui-demo/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
    },
    "permission": {
      "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    },
    plugins: {
      WechatSI: {
        version: '0.2.2',
        provider: 'wx069ba97219f66d99'
      }
    },
    tabBar: {
      selectedColor: '#53a600',
      "list": [
        {
          "pagePath": "pages/index/index",
          "text": "首页"
        },
        {
          "pagePath": "pages/map/index",
          "text": "地图"
        },
        {
          "pagePath": "pages/taro-ui-demo/index",
          "text": "Taro UI"
        }
      ]
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
