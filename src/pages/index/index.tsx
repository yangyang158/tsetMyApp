import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Form, Switch, Input, Slider, Textarea, Label, Radio, Progress } from '@tarojs/components'
import './index.scss'
import {Clock} from '../../index'
//在 index.js 引入插件，获取全局唯一的语音识别管理器 recordRecoManager
var plugin = requirePlugin('WechatSI')
let manager = plugin.getRecordRecognitionManager();

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
  navigationBarTitleText: '主页',
  }

  state= {
    currentText: ''
  }

  componentWillMount () { 
    console.log('获取router参数', this.$router);
  }

  componentDidMount () {
    this.initVoiceRecognitionFunc();
  }

  componentWillUnmount () {
    //识别结束事件
    manager.onStop = res => {
      console.log("onStop result", res.result)
      this.setState({
        currentText: res.result
      })
    }
  }

  componentDidShow () { }

  componentDidHide () { }

  goMap =()=>{
      Taro.navigateTo({
        url: '/pages/map/index'
      })
  }

  //开始语音识别
  startVoiceRecognition = ()=>{
    console.log('开始录音')
    manager.start();
  }

  //开始语音识别
  initVoiceRecognitionFunc = ()=>{
    console.log('调用识别方法')
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = (res) => {
      console.log('this', this)
      console.log("onRecognize current result", res.result);
      this.setState({
        currentText: res.result
      })
    }
    //识别结束事件
    manager.onStop = res => {
      console.log("onStop result", res.result)
      this.setState({
        currentText: res.result
      })
    }
    //正常开始录音识别时会调用此事件
    manager.onStart = res => {
        console.log("成功开始录音识别", res)
    }
    //识别错误事件
    manager.onError = res => {
        console.error("error msg", res.msg)
    }
  }

  render () {
    return (
      <View className='index'>
        <Clock />
        <Text>表单控件</Text>
        <Form>
          <View className='input-control'>
            <Input name='name' type='text' placeholder='请输入姓名' />
            <Input type='password' password placeholder='这是一个密码输入框' />
          </View>
          <View className='switch-control'>
            <Switch name='switch' className='form-switch'></Switch>
          </View>
          <View>
            <Slider step='1' value='100' showValue min='50' max='200' />
          </View>
          <View>
            <Textarea style='background:pink;width:100%;height:80px;padding:0 30rpx;' autoHeight />
          </View>
          <View>
            <Label className='example-body__label' for='1' key='1'>
              <Radio name='country' value='USA'>USA</Radio>
            </Label>
            <Label className='example-body__label' for='2' key='2'>
              <Radio name='country'  value='China'>China</Radio>
            </Label>
          </View>
          <View>
            <Progress percent={20} showInfo strokeWidth={2} />
          </View>
        </Form>
        <View>
            <Button type='primary' size='mini' onClick={this.startVoiceRecognition}>语音识别</Button>
        </View>
        <view>获取语音识别内容：{this.state.currentText}</view>
      </View>
    )
  }
}
