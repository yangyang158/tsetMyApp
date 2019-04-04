import { observable } from 'mobx'

const taroUIStore = observable({
    counter: 0,
    counterStore() {
      this.counter++
    },
    value: '',
    radioValue: 'option1',
    handleRadioChange(value){
      console.log(1111, value)
      this.radioValue = value;
      console.log(222, this.radioValue)

    }
})
  
export default taroUIStore