import React, { Component } from 'react'
import {Spring} from 'react-spring/renderprops'
import Auth from '../../../../modules/Auth';
import ComponentBorrowedBook from './ComponentBorrowedBook'
import TotalObjects from './TotalObjects'

export default class Student extends Component {

  constructor(props){
    super(props)
    const {avatar, student_id:id} = this.props.student
    this.state = {
      shortInfo: true,
      avatarPreview : Auth.getUrl() + "/uploads/student/avatar/" + id + "/" + avatar
    }
  }


  onShowMore = () => {
    this.setState({
      shortInfo: !this.state.shortInfo
    })
  }



  AvatarComponent = () => {
    const styleForAvatar = this.state.shortInfo? {backgroundImage : "url("+this.state.avatarPreview+")"} : this.styleBiggerAvatar()
    return (
      <div className="avatar-manager" style={this.state.shortInfo? {} : {order: 2}}>   
        <div 
          id="avatar-in-student-management"
          className="avatar avatar-more" 
          style={styleForAvatar}
          onClick={this.onShowMore}>
        </div>
        <div style={{textAlign: "center"}}>
          <button type="button" className="button_2" onClick={this.onShowMore} style={this.state.shortInfo?{minWidth: "90px", marginRight: "4px"}:{width: "100%"}}>{`ID: ${this.props.student.student_id}`}</button>
        </div>
      </div>
    )
  }
  styleBiggerAvatar = () => {
    return {
      flexDirection: "column",
      width: "250px",
      height: "250px",
      backgroundImage : "url("+this.state.avatarPreview+")"
    }
  }
  
  onKeyUp = (e) => {
    if(e.keyCode === 13){
      this.updateStudentRequest()
    }
  }

  

  render() {
    const { student } = this.props
    const { total_of_borrowed_books:s, total_of_returned_books:a, total_of_overdue_books:c } = student
    const b = s - a - c
    
    const styleMore1 = {
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
    
    const styleForStudentInfo = this.state.shortInfo? {} : styleMore1

    
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
        {props => (
          <div style={props}>
            <div className="student"> 
              
              <div className="student-info">
                
                <div className="student-info-main" style={styleForStudentInfo}>
                  {this.AvatarComponent()}

                  <div className="student-info-detail" style={{width: "100%"}}>              
                    <h2 id="name" className="name" style={{cursor: "pointer"}} onClick={this.onShowMore}>
                      { student.name }
                    </h2>
                    <span> Email: { student.email }</span>    
                    <div style={this.state.shortInfo? {} : {textAlign: "center"}}>
                      <span>
                        Total of borrowed books: {s}
                      </span>
                      <ComponentBorrowedBook
                        title={"Total of returned books"}
                        style2={"black"}
                        value={a}
                      />
                      <ComponentBorrowedBook
                        title={"Total of borrowing books which are NOT overdue"}
                        style2={"green"}
                        value={b}
                      />
                      <ComponentBorrowedBook 
                        title={"Total of borrowing books which are OVERDUE"}
                        style2={"red"}
                        value={c}
                      />
                    </div>
                  </div>
                </div>
                <TotalObjects s={s}/>
              </div>          
            </div>
          </div>
        )}
        
      </Spring>
    )
  }

}
