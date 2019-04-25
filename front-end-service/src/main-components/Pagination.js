import React, { Component } from 'react'
import './../css/Pagination.css'
/**
 * define pagination
 */
export default class Pagination extends Component {

  state = {
    pageNumber : 0,
    objectsPerPage: 5
  }

  //used for when user search, page number will return to 1, so there needs to update pageNumber in this component 
  componentDidUpdate = (prevProps) => {
    if(this.props.currentPage !== prevProps.currentPage){
      this.setState({
        pageNumber: this.props.currentPage
      })
    }
  }

  /**
   * objects per page are get to this class will update at parent class
   */
  componentDidMount = () => {
    this.setState({
      pageNumber: this.props.currentPage
    })
    //set objects per page: objectsPerPage will send to up side
    this.props.onUpdateObjectsPerPage(this.state.objectsPerPage)
  }

  /**
   * to update number of object in state
   */
  onUpdateObjectsPerPage = async (e) => {
    await this.setState({
      objectsPerPage: e.target.value
    })
    this.props.onUpdateObjectsPerPage(this.state.objectsPerPage)
  }

  /**
   * when user choose page number and press enter
   */
  onKeyUp = async (e) => {
    // if "enter", change page
    if(e.keyCode === 13) this.props.onChangePage(this.state.pageNumber)
  }

  /**
   * update pagenumber in state
   */
  onEditPagenumberChange = (e) => {
    this.setState({
      pageNumber: e.target.value
    })
  }

  /**
   * go next page or previous page
   */
  onChangePageNextPrevious = async (e) => {
    const chosenAction = e.target.title
    let newPageNumber = this.props.currentPage
    if (chosenAction === "next") {
      newPageNumber ++
    } else {
      newPageNumber --
    }
    await this.props.onChangePage(newPageNumber)
    this.setState({
      pageNumber: newPageNumber
    })
  }

  /**
   * to refresh page
   */
  onRefreshPage = () => {
    this.props.onChangePage(this.state.pageNumber)
  }

  /**
   * PreviousPageComponent UI
   */
  PreviousPageComponent = () => {
    return (
      <i className="fa fa-angle-double-left fa-lg" title="previous" onClick={this.onChangePageNextPrevious} style={this.arrowStyle()}/>
    )
  }

  /**
   * NextPageComponent UI
   */
  NextPageComponent = () => {
    return (
      <i className="fa fa-angle-double-right fa-lg" title="next" onClick={this.onChangePageNextPrevious} style={this.arrowStyle()}/>
    )
  }

  /** Reload UI */
  RefreshComponent = () => {
    return (
      <i className="fa fa-refresh" title="refresh" onClick={this.onRefreshPage} style={this.arrowStyle()}/>
    )
  }

  /**
   * hide NextPageComponent UI when the books in book management == 0
   * show PreviousPageComponent UI when the when current page >= 2
   */
  render() {
    const {currentPage , numberOfObjects} = this.props

    return (
      <div style={this.pStyle()}>
        {(currentPage > 1) ? this.PreviousPageComponent() : <div style={this.arrowStyle()}></div>}
        <input 
          className="no-spinners"
          style={this.inputPageNumberStyle()}
          type="number"
          value={this.state.pageNumber}
          onChange={this.onEditPagenumberChange}
          min={1}
          onKeyUp={this.onKeyUp}/>
        <select style={this.optionTagStyle()} value={this.state.objectsPerPage} onChange={this.onUpdateObjectsPerPage}>
          <option value={5}>5 items</option>
          <option value={10}>10 items</option>
          <option value={15}>15 items</option>
        </select>
        &nbsp;
        {this.RefreshComponent()}
        {numberOfObjects > 0 ? this.NextPageComponent() : <div style={this.arrowStyle()}></div> }

      </div>
    )
  }

  /**
   * style for pagination
   */
  pStyle(){
    return {
      textAlign: "left",
      marginBottom: "10px",
      display: "flex",
      justifyContent: "center",
    }
  }

  /**
   * style for arrow
   */
  arrowStyle = () => {
    return {
      width: "20px",
      marginTop: "6px"
    }
  }

  /**
   * style for input tag
   */
  inputPageNumberStyle = () => {
    return {
      marginTop: "2px",
      width: "40px", 
      textAlign: "center",
      outline: "none",
      fontSize: "13px",
      backgroundColor: "#f4f4f4"
    }
  }

  optionTagStyle = () => {
    return {
      height: "21px",
      marginTop: "2px",
      outline: "none",
      border: "none",
      borderRadius: "2px"
    }
  }
}
