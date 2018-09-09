import React from 'react'
import moment from 'moment'

export default class MomentSpan extends React.PureComponent {

  render() {
    const { date, parseFormat=undefined, format='YYYY-MM-DD' } = this.props
    if(!date){
      return null
    }
    const m = moment(date, parseFormat).format(format)
    return <span>{m}</span>
  }
}
