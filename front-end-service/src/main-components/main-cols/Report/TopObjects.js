import React, { Component } from 'react'
import axios from 'axios';
import Auth from '../../../modules/Auth';
import LimitNumber from './LimitNumber'
import StudentInReport from './objects/StudentInReport'
import BookInReport from './objects/BookInReport'

export default class TopObjects extends Component {
  state = {
    objects: [],
    limitNumber: 3,
    render: true
  }

  loading = async() => {
    await this.setState({
      render: true
    })

    axios({
      url: Auth.getUrl() + this.props.url,
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
        objects: res.data.data
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

  listOfStudents = () => {
    return (      
      this.state.objects.map(student => {
        return(
          <StudentInReport
            key={student.student_id}
            student={student} 
          />
        )
      })          
    )
  }

  listOfBooks = () => {
    return (
      this.state.objects.map(book => {
        return(
          <BookInReport 
            key={book.id}
            book={book}
          />
        )
      })
    )
  }

  render() {
    return (
      <div>
        <p>Top&nbsp;
          <LimitNumber 
            value={this.state.limitNumber} 
            onChange={this.onChangeLimitNumber}
          />&nbsp;
          {this.props.title}</p>
        <div id="students">
          {this.props.identify==="topStudents"? this.listOfStudents(): <span></span>}
          {this.props.identify==="topBooks"? this.listOfBooks(): <span></span>}
        </div>
      </div>
    )
  }
}
