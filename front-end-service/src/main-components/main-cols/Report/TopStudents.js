import React, { Component } from 'react'
import axios from 'axios';
import Auth from '../../../modules/Auth';
import LimitNumber from './LimitNumber'
import StudentInReport from './objects/StudentInReport'

export default class TopStudents extends Component {
  state = {
    students: [],
    limitNumber: 1,
    render: true
  }

  loading = async() => {
    await this.setState({
      render: true
    })

    axios({
      url: Auth.getUrl() + '/report/top-students',
      method: 'get',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      },
      params: {
        start_date: this.props.startDate,
        end_date: this.props.endDate,
        present: new Date(),
        limit_number: this.state.limitNumber
      }
    }).then( res => {
      this.setState({
        students: res.data.data
      })
    }).catch( errs => console.log(errs))
  }

  componentDidMount(){
    this.loading()
  }

  componentDidUpdate(prevProps){
    if( prevProps.startDate !== this.props.startDate || prevProps.endDate !== this.props.endDate){
      this.loading()
    }
  }

  onChangeLimitNumber = async (e) => {
    await this.setState({
      limitNumber: e.target.value
    })

    this.loading()
  }

  render() {
    return (
      <div>
        <h3>Top
          <LimitNumber 
            value={this.state.limitNumber} 
            onChange={this.onChangeLimitNumber}
          />
          students who have borrowed books</h3>
        <div id="students">
          {
            this.state.students.map(student => {
              return(
                <StudentInReport
                  key={student.student_id}
                  student={student} 
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}
