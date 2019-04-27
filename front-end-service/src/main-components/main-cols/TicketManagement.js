import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import './../../../node_modules/react-datepicker/dist/react-datepicker.css'
import Ticket from '../objects/Ticket'
import './../../css/ticketmanagement.css'
import axios from 'axios'
import Auth from '../../modules/Auth'
import Pagination from './../Pagination'

export default class TicketManagement extends Component {

  //current page > pass to pagination> to change value of input page
  

  constructor(props) {
    super(props)
    let previousWeek = new Date()
    previousWeek.setDate(previousWeek.getDate() - 8)  
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    //keyword for search student
    this.state = {
      startDate: previousWeek,
      endDate: tomorrow,
      current_page: 1,
      tickets: [],
      ticketsPerPage: 0,
      reloadTicketDetails: false,
      keyword: '',
      total: 0
    }
  }

  
  /**
   * will run first time after pagination run the first time
   */
  readTicketsRequest = async (newPageNumber) => {
    if(this.state.tickets.length){
      this.setState({
        tickets:[]
      })
    }
    await axios({
      url: Auth.getUrl() + '/tickets',
      method: 'get',
      params: {
        start_date: this.state.startDate,
        end_date: this.state.endDate,
        page: newPageNumber,
        ticketsPerPage: this.state.ticketsPerPage,
        keyword: this.state.keyword
      },
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then(res => {
      this.setState({
        tickets: res.data.data.tickets,
        current_page: newPageNumber,
        total: res.data.data.total
      })
    }).catch(errs => console.log(errs))
  }


  onChangeStartDate = async (date) => {
    await this.setState({
      startDate: date
    })
    this.readTicketsRequest(1)
  }
  onChangeEndDate = async (date) => {
    await this.setState({
      endDate: date
    })
    this.readTicketsRequest(1)
  }
  handleKeywordChange = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }
 
  onKeyUp = (e) => {
    if (e.keyCode === 13){
      this.readTicketsRequest(1)
    }
  }

  SearchDateComponent = () => {  
    return (
      <div style={{fontWeight: "normal", width:"98%"}} id="range-date">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.onChangeStartDate}
          dateFormat="dd-MM-YYYY h:mm aa"
          showTimeSelect
          timeIntervals={15}
          timeCation="time"
        />
        <DatePicker
          selected={this.state.endDate}
          onChange={this.onChangeEndDate}
          dateFormat="dd-MM-YYYY h:mm aa"
          showTimeSelect
          timeIntervals={15}
          timeCation="time"
        />
        <input 
        style={{padding: "1px 5px", marginTop: "1px"}}
        placeholder="search tickets by student email, student name, ..."
        type="text" 
        value={this.state.value}
        onChange={this.handleKeywordChange}
        onKeyUp={this.onKeyUp}/>
        <div className="total-results">
          <i style={{fontSize: "13px", position: "absolute", fontWeight: "normal", paddingLeft: "4px"}}>
            {this.state.total || 0} result(s)
          </i>
        </div>
      </div>
    )
  }

  onChangePage = async (newPageNumber) => {
    //load first
    await this.readTicketsRequest(newPageNumber)
    //set state second
    this.setState({
      current_page: newPageNumber,
      reloadTicketDetails: !this.state.reloadTicketDetails
    })
  }

  onUpdateObjectsPerPage = async (ticketsPerPage) => {
    await this.setState({
      ticketsPerPage
    })
    this.readTicketsRequest(1)
  }

  render() {
    return (
      <div>
        <h1 className="page-title">
          <div id="main-title">
          Tickets
          </div>
          {this.SearchDateComponent()}          
        </h1>
        <div>
          <Pagination 
            currentPage={this.state.current_page}
            numberOfObjects={this.state.tickets.length}
            onChangePage={this.onChangePage}
            onUpdateObjectsPerPage={this.onUpdateObjectsPerPage}
          />
          <div id="students as-tickets">
            {
              this.state.tickets.map(ticket => {
                return <Ticket 
                        key={ticket.id}
                        ticket={ticket}
                        reload={this.state.reloadTicketDetails}
                        />
              })
            }
          </div>
          {this.state.tickets.length? <center><a href="#top" style={{color: "#000"}}><i className="fa fa-angle-double-up fa-2x"></i></a></center> : <div/>}
        </div>
      </div>
    )
  }
}
