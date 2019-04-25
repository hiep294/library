import React, { Component } from 'react'
/**
 * this class is to define search box UI
 */
export default class SearchBox extends Component {

  // state = {
  //   keyword: ''
  // }

  // /**
  //  * this method is to update keyword of state
  //  */
  // onKeywordChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  //   //
  // }
  /**
   * to throw keyword to its parent
   */
  // onSearch = (e) => {
  //   e.preventDefault()
  //   this.props.onSearch(this.state.keyword)
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.props.onSearch} id="searchbox">
          <input 
            name="keyword"
            type="text" 
            placeholder={this.props.searchFor || "search ..."}
            value={this.props.keyword}
            onChange={this.props.handleChangeKeyword}
          />
        </form>
        <div className="total-results"><i style={{fontSize: "13px", position: "absolute", fontWeight: "normal", paddingLeft: "4px"}}>{this.props.total || 0} result(s)</i></div>
      </div> 
    )
  }
}
