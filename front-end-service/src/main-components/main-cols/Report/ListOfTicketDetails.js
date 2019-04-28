import React, { Component } from 'react'
import axios from 'axios';
import Auth from '../../../modules/Auth';
import TicketDetailInReport from './objects/TicketDetailInReport'

export default class ListOfTicketDetails extends Component {
  state = {
    TicketDetails: []
  }

  componentDidMount(){
    this.loading()
  }

  componentDidUpdate(prevProps){
    if(prevProps.startDate !== this.props.startDate || prevProps.endDate !== this.props.endDate){
      this.loading()
    }
  }

  loading = () => {
    axios({
      method: 'get',
      url: Auth.getUrl() + '/report/ticket-details-have-fees',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      },
      params: {
        start_date: this.props.startDate,
        end_date: this.props.endDate
      }
    }).then( res => {
      this.setState({
        TicketDetails: res.data.data
      })
      this.props.onChangeData(this.props.identify, res.data.data)
    }).catch( errs => console.log(errs) )
  }

  render() {
    return (
      <div>
        {this.state.TicketDetails.map( item => {
          return (
            <TicketDetailInReport 
              key={item.id}
              params={item}
            />
          )
        })}
      </div>
    )
  }
}
