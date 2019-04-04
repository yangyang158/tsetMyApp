import Taro, { Component } from '@tarojs/taro'
import { View, Text,  } from '@tarojs/components'
import { AtInput, AtForm, AtButton, AtRadio, AtIcon   } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

interface IProps {
  taroUIStore?: any,
}

@inject('taroUIStore')
@observer
export default class TaroUIDemo extends Component<IProps> {

  state = {
    value: '',
  }

  componentDidMount(){
    const { taroUIStore } = this.props;
    console.log(1111, taroUIStore)

  }

  onSubmit = ()=>{

  }

  onReset = ()=>{

  }

  handleChange = ()=>{

  }

  handleRadioChange = (value)=>{
    const { taroUIStore } = this.props;
    taroUIStore.handleRadioChange(value)
  }

  render () {
    const { taroUIStore: { radioValue } } = this.props

    return (
        <View className='taro-ui-demo'>
            <Text>taro ui组件库展示</Text>
            <View className='form-control'>
                <Text>表单控件</Text>
                <AtForm
                  onSubmit={this.onSubmit}
                  onReset={this.onReset}
                >
                  <AtIcon value='clock' size='30' color='#F00'></AtIcon>
                  <AtInput
                    name='value'
                    title='姓名'
                    type='text'
                    placeholder='请输入姓名'
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  <AtRadio
                    options={[
                      { label: '单选项一', value: 'option1', desc: '单选项描述' },
                      { label: '单选项二', value: 'option2' },
                      { label: '单选项三禁用', value: 'option3', desc: '单选项描述', disabled: true }
                    ]}
                    value={radioValue}
                    onClick={this.handleRadioChange} 
                    />
                  <AtButton formType='submit'>提交</AtButton>
                  <AtButton formType='reset'>重置</AtButton>
              </AtForm>
            </View>
        </View>
    )
  }
}
