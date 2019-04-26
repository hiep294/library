
import React, { Component } from 'react'

export default class ExportToExcel extends Component {
  export = (e) => {
    this.props.onChange()
    console.log(this.props)
  }
  render() {
    return (
      <span style={{color: "green"}} onClick={this.export}><i className="fa fa-file-excel-o"/></span>
    )
  }
  
}
