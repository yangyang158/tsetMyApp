import Taro, { Component, } from '@tarojs/taro'
import { View, Map, Button } from '@tarojs/components'
import './index.scss'

export default class ShowMap extends Component {

    constructor (props) {
        super(props)
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

    componentWillMount(){
        Taro.getLocation({
            type: 'gcj02',
            success: res => {
              console.log('坐标位置', res)
              this.setState({
                longitude: res.longitude,
                latitude: res.latitude
              });
              let params = `${res.latitude},${res.longitude}&key=BUCBZ-FSTES-HU7OF-6YSDD-AHZRE-6WF6U`;
              Taro.request({
                  url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + params,
                })
                .then(resp => {
                  this.setState({
                    location: resp.data.result.address
                  })
                })
              }
          })
    }

    onTap = () => {
        console.log('----')
    }

    markertap = (e) => {
        console.log(111, e.markerId)
    }

    callouttap = (e) => {
        console.log(222, e.markerId)
    }

    navigation = () => {
        Taro.getLocation({
            type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
            success(res) {
              const latitude = res.latitude
              const longitude = res.longitude
              Taro.openLocation({
                latitude,
                longitude,
                scale: 18
              })
            }
          })
    }

    render () {
      return (
        <View className='map'>
          <View>地图</View>
          <Map 
            scale={14}
            markers={this.state.markers}
            polyline={this.state.polyline}
            show-compass 
            show-location 
            longitude={this.state.longitude} 
            latitude={this.state.latitude} 
            onClick={this.onTap}
            bindmarkertap={this.markertap}
            bindcallouttap={this.callouttap}
          ></Map>
        <View>我的位置 经度：{this.state.longitude}, 纬度：{this.state.latitude}, {this.state.location}</View>
        <Button onClick={this.navigation}>导航</Button>
        </View>
      )
    }
  }