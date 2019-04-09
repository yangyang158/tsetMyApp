import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, } from '@tarojs/components'
import { AtInput, AtForm, AtButton, AtRadio, AtMessage, AtModal, AtTextarea, } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.sass'

interface IProps {
  taroUIStore?: any,
}

@inject('taroUIStore')
@observer
export default class TaroUIDemo extends Component<IProps> {

  constructor(props: IProps){
    super(props);
    const { taroUIStore } = this.props;
    taroUIStore.initFormData();
  }

  state = {
    modalVisible: false
  }

  onSubmit = () => {
    this.setModalVisible(true)
  }

  setModalVisible = (bool) => {
    this.setState({
      modalVisible: bool
    })
  }

  onReset = () => {
    const { taroUIStore } = this.props;
    taroUIStore.onReset();
  }

  handleInputChange = (value, itemForm) => {
    console.log('-----', value)
    const { taroUIStore } = this.props;
    taroUIStore.updateData(value, itemForm);
  }

  handleTextareaChange = (e, itemForm) => {
    const { taroUIStore } = this.props;
    taroUIStore.updateData(e.target.value, itemForm);
  }

  handleModalClose = () => {
    this.setModalVisible(false)
  }

  handleModalCancel = () => {
    this.setModalVisible(false)
  }

  handleModalConfirm = () => {
    Taro.atMessage({
      'message': '提交成功',
      'type': 'success',
    })
    this.setModalVisible(false)
  }

  render () {
    const { taroUIStore: { template, } } = this.props;
    return (
      <View className='form-control'>
        <AtForm
          onSubmit={this.onSubmit}
          onReset={this.onReset}
        >
          {template.map((item, index) => {
            if (item.type === 'input') {
              return (<View className='item-control'>
                <Text>{item.title}</Text>
                <AtInput
                  key={String(index)}
                  name='value'
                  type='text'
                  placeholder={item.placeholder}
                  value={item.value}
                  onChange={value => { this.handleInputChange(value, item) }}
                />
              </View>)
            } else if (item.type === 'textarea'){
              return (<View>
                <Text>{item.title}</Text>
                <AtTextarea
                  key={String(index)}
                  value={item.value}
                  onChange={event => { this.handleTextareaChange(event, item) }}
                  maxLength={200}
                  placeholder={item.placeholder}
                />
              </View>)
            } else if (item.type === 'radio'){
              return (<View>
                <Text>{item.title}</Text>
                <AtRadio
                  key={String(index)}
                  value={item.value}
                  options={item.options}
                  onClick={value => { this.handleInputChange(value, item) }}
                />
              </View>)
            } else if (item.type === 'datePick'){
              return (
                <View key={String(index)}>
                  <Text>{item.title}</Text>
                  <View>
                    <Picker 
                      mode='date' 
                      onChange={event => { this.handleInputChange(event.detail.value, item) }}
                    >
                      <View className='picker'>
                        当前选择：{item.value}
                      </View>
                    </Picker>
                  </View>
                </View>
              )
            }
          })}
          <View className='operate-btn'>
            <AtButton formType='submit'>提交</AtButton>
            <AtButton formType='reset'>重置</AtButton>
          </View>
        </AtForm>
        <AtModal
          isOpened={this.state.modalVisible}
          title='确认'
          cancelText='取消'
          confirmText='确认'
          onClose={this.handleModalClose}
          onCancel={this.handleModalCancel}
          onConfirm={this.handleModalConfirm}
          content='确定要提交吗'
        />
        <AtMessage />
      </View>
    )
  }
}
