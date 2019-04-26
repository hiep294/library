import React, { Component } from 'react'
// import { Spring } from 'react-spring/renderprops'
import DatePicker from 'react-datepicker'
import TotalOfObjects from './TotalOfObjects'
import ExportToExcel from './ExportToExcel'

import TopStudents from './TopStudents'

export default class Report extends Component {
  constructor(props){
    super(props)
    let prevMonth = new Date()
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    //inital state
    this.state = {
      startDate: prevMonth,
      endDate: tomorrow,
      data: [],
      export: false
    }
  }

  onChangeStartDate = async (date) => {

    await this.setState({
      startDate: date
    })
  }

  onChangeEndDate = async (date) => {
    await this.setState({
      endDate: date
    })
  }

  clickOutside= () =>{
    this.refs.picker.cancelFocusInput();
    this.refs.picker.setOpen(false);
  }

  SearchDateComponent = () => {
    //onclickoutside: https://github.com/Hacker0x01/react-datepicker/issues/730
    return (
      <div style={{ fontWeight: 'normal', width: '98%'}} id="range-date">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.onChangeStartDate}
          dateFormat="dd-MM-YYYY h:mm aa"
          timeIntervals={15}
          showTimeSelect
          ref="picker" onClickOutside={this.clickOutside}
        />
        <DatePicker
          selected={this.state.endDate}
          onChange={this.onChangeEndDate}
          dateFormat="dd-MM-YYYY h:mm aa"
          timeIntervals={15}
          showTimeSelect
          closeOnSelect={true}
        />
      </div>
    )
  }

  onChangeTest = (e) => {
    this.setState({test: e.target.value})
  }

  doExport = () => {
    this.setState({
      export: !this.state.export
    })
  }

  render() {
    return (
      <div>
        <h1 className="page-title">
          <div className="main-title">
            Report&nbsp;
            <ExportToExcel 
              onChange={this.doExport}
            />
          </div>
          
          {this.SearchDateComponent()}
        </h1>
        <center><h2>Student Report</h2></center>

        <TotalOfObjects
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          url={'/report/total-of-students'}
          title={'Total of students who have borrowed books'}
        />

        <TopStudents 
          startDate={this.state.startDate}
          endDate={this.state.endDate}
        />
        
        
        <center><h2>Ticket Report</h2></center>
        <TotalOfObjects 
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          url={'/report/total-of-tickets'}
          title={'Total of tickets'}
        />


        <center><h2>Book Report</h2></center>
        <TotalOfObjects
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          url={'/report/total-of-books'}
          title={'Total of borrowed books'}
        />
        <h3>Top 3 books which have been borrowed</h3>
        <h3>Books whose quantities less than 10 </h3>
      </div>
    )
  }
//   <Spring
//         from={{ opacity: 0 }}
//         to={{ opacity: 1 }}
//       >
//       {
//           props => {
//               return (
//                 <div style={props}>
//                     Demo
//                 </div>
//               )
//           }
//       }
        

//       </Spring>
}


