import React, { Component } from 'react'

export default class ss extends Component {

  state = {
    totalOfTickets: 0,
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

  loading = () => {
    console.log('demo total of tickets')
  }

  render() {
    return (
      <div>
        <h3>Total of tickets: {this.state.render? 'loading...' : this.state.totalOfTickets}</h3>
      </div>
    )
  }
}
