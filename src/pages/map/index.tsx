import Taro, { Component, } from '@tarojs/taro'
import { View, Map, Button  } from '@tarojs/components'
import './index.scss'


export default class ShowMap extends Component {

    constructor (props) {
        super(props)
        console.log('props', props)

        //this.state = { date: new Date() }
    }

    state = {
        latitude: 0,
        longitude: 0,
        location: '',
        markers: [{
            id: 0,
            latitude: 34.236890,
            longitude: 108.901720,
            title: '山脉科技',
            width: 50,
            height: 50
        }, {
            id: 1,
            latitude: 34.231390,
            longitude: 108.917770,
            title: '西安电子科技大学',
            width: 40,
            height: 40
        }],
        polyline: [{
            points: [{
              longitude: 113.3245211,
              latitude: 23.10229
            }, {
              longitude: 113.324520,
              latitude: 23.21229
            }],
            color: '#FF0000DD',
            width: 2,
            dottedLine: true
        }],
    }


    componentDidMount() {
    }

    componentWillMount(){
        wx.getLocation({
            type: 'gcj02',
            success: res=>{
              const latitude = res.latitude
              const longitude = res.longitude
              const speed = res.speed
              const accuracy = res.accuracy
              console.log('坐标位置', res)
              this.setState({
                longitude: res.longitude,
                latitude: res.latitude
              });
              Taro.request({
                  url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=BUCBZ-FSTES-HU7OF-6YSDD-AHZRE-6WF6U`,
                })
                .then(res=>{
                  console.log('成功', res, res.data.result.address) 
                  this.setState({
                    location: res.data.result.address
                  })
                })
              }
          })
    }

    componentWillUnmount () {
    }

    onTap = ()=>{
        console.log('----')
    }

    markertap = (e)=>{
        console.log(111, e.markerId)
    }

    callouttap = (e)=>{
        console.log(222, e.markerId)
    }

    navigation = ()=>{
        wx.getLocation({
            type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
            success(res) {
              const latitude = res.latitude
              const longitude = res.longitude
              wx.openLocation({
                latitude,
                longitude,
                scale: 18
              })
            }
          })
    }

    render () {
      return (
        <View className="map">
          <View>地图</View>
          <Map 
            scale={14}
            markers={this.state.markers}
            polyline={this.state.polyline}
            show-compass={true} 
            show-location={true} 
            longitude={this.state.longitude} 
            latitude={this.state.latitude} 
            onClick={this.onTap}
            bindmarkertap={this.markertap}
            bindcallouttap={this.callouttap}
        />
        <View>我的位置 经度：{this.state.longitude}, 纬度：{this.state.latitude}, {this.state.location}</View>
        <Button onClick={this.navigation}>导航</Button>
        </View>
      )
    }
  }