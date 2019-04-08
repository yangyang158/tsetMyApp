import Taro, { Component, } from '@tarojs/taro'
import { View, Text, Button, Label, Checkbox } from '@tarojs/components'

interface IProps {
    text: string,
}
export default class Clock extends Component<IProps> {

    constructor (props) {
        super(props)
    }

    static defaultProps = {
        text: 'hello word'
    }

    state = {
        date: new Date(),
        lists: [{
            value: '美国',
            text: '美国',
            checked: false
        },
        {
            value: '中国',
            text: '中国',
            checked: true
        },
        {
            value: '巴西',
            text: '巴西',
            checked: false
        }]
    }

    timerID;

    componentDidMount() {
        this.timerID = setInterval(() => this.calcTime(), 1000)
    }

    componentWillUnmount () {
        clearInterval(this.timerID)
    }

    calcTime = () => {
        this.setState({
            date: new Date()
        })
    }

    calcStatus = () => {
        // if(this.state.da)
    }

    postRequest = () => {
        Taro.request({
            url: '/api/form/data',
            data: {
                foo: 'foo',
                bar: 10
            },
            header: {
              'content-type': 'application/json'
            }
        })
        .then(res => {
           console.log('成功', res) 
        })
    }

    render () {
        let {text, } = this.props;
      return (
        <View className='clock'>
          <View>{text}</View>
          <Text>现在的时间是 {this.state.date.toLocaleTimeString()}.</Text>
          <View>
            {this.state.lists.map((item, i) => {
                return (
                    <Label className='checkbox-list__label' for={i} key={i}>
                        <Checkbox className='checkbox-list__checkbox' value={item.value} checked={item.checked}>
                            {item.text}
                        </Checkbox>
                    </Label>
                )
            })}
            <Button type='primary' onClick={this.postRequest}>提交</Button>
          </View>
        </View>
      )
    }
  }