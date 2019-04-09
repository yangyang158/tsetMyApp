import { observable, action } from 'mobx'

const taroUIStore = observable({
  template: '',
  initFormData(){
    this.template = [{
      key: 'name',
      type: 'input',
      placeholder: '请输入姓名',
      title: '姓名',
      value: ''
    }, {
      key: 'email',
      type: 'input',
      placeholder: '请输入邮箱',
      title: '邮箱',
      value: ''
    }, {
      key: 'position',
      type: 'radio',
      placeholder: '',
      title: '职位',
      value: '',
      options: [{
        label: '前端开发',
        value: 'webfront',
        desc: '项目开发' ,
      }, {
        label: '测试',
        value: 'test',
        desc: '项目测试',
      }]
    }, {
      key: 'workDate',
      type: 'datePick',
      placeholder: '',
      title: '工作日期',
      value: ''
    }, {
      key: 'log',
      type: 'textarea',
      placeholder: '请输入工作日志',
      title: '工作日志',
      value: ''
    }]
  },
  updateData: action(function(value, itemForm){
    this.template.map(function(item){
      if (item.key === itemForm.key){
        item.value = value;
      }
    })
    this.template = [...this.template];
    console.log(this.template)
  }),
})
  
export default taroUIStore