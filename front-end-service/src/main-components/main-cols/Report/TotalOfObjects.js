import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../../../modules/Auth'

export default class TotalOfObjects extends Component {
  // constructor(props){
  //   super(props)
  //   const { startDate, endDate } = this.props
  //   this.state={
  //     startDate,
  //     endDate
  //   }
  // }  
  state = {
    totalOfObjects: 0,
    render: true
  }

  componentDidMount(){
    this.loading()
  }

  componentDidUpdate(prevProps){
    if(prevProps.startDate !== this.props.startDate || prevProps.endDate !== this.props.endDate){
      this.loading()
    }
  }

  loading = async () => {
    await this.setState({
      render: true
    })
    axios({
      url: Auth.getUrl() + this.props.url,
      method: 'get',
      params: {
        start_date: this.props.startDate,
        end_date: this.props.endDate
      },
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then( res => {
      this.setState({
        render: false,
        totalOfObjects: res.data.data
      })
      this.props.onChangeData(this.props.identify, res.data.data)
    }).catch( errs => console.log(errs))
  }

  render() {
    
    return (
      <div>
        <p>{this.props.title}: <span style={{fontWeight: "normal"}}>{this.state.render? '...' : this.state.totalOfObjects}</span></p>
      </div>
    )
  }
}

