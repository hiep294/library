import React, { Component } from 'react'
import BorrowingBooks from './Student.BorrowingBooks'
import {Spring} from 'react-spring/renderprops'
import Auth from '../../modules/Auth';

export default class Student extends Component {

  constructor(props){
    super(props)
    const {email, name, avatar, id} = this.props.student
    this.state = {
      shortInfo: true,
      onEditMode : false,
      id,
      email,
      name,
      avatar,
      avatarPreview : Auth.getUrl() + "/uploads/student/avatar/" + id + "/" + avatar,
      newUpdatedAvatar: null,
      
    }
  }

  reloadInfo = () =>{
    const {email, name, avatar, id} = this.props.student
    this.setState({
      onEditMode : false,
      id,
      email,
      name,
      avatar,
      avatarPreview : Auth.getUrl() + "/uploads/student/avatar/" + id + "/" + avatar,
      newUpdatedAvatar: null,
    })
  }

  

  updateStudentRequest = (e) => {
    let does = this.props.updateStudentRequest(this.state)
    does.then(res => {
      if(res === "updated") this.setState({onEditMode: false})
    })
  }


  onShowMore = () => {
    this.setState({
      shortInfo: !this.state.shortInfo
    })
  }

  onChooseStudentOfBasket = (e) => {
    if(e.target.checked){
      this.props.onChooseStudent(this.props.student)
    }else{
      this.props.onRemoveStudent()
    }
  }

  onEditMode = (e) => {
    this.setState({
      onEditMode : !this.state.onEditMode
    })
  }

  onEditChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  funcs = () => {
    const { student, chosenStudent } = this.props
    let existed = false
    if(chosenStudent){
      existed = student.id === chosenStudent.id ? true : false
    } 
    if(this.props.inStudentManagement){
      const onEditModeIcon =(
        <div id="onEditMode">
          <i className="fa fa-save fa-lg" onClick={this.updateStudentRequest} title="save"/>
          <i className="fa fa-close fa-lg" onClick={this.reloadInfo} title="close"/>
          <i className="fa fa-trash fa-lg" onClick={() => this.props.removeStudentRequest(this.state.id)} title="remove"/> 
        </div>
      )
      return (
        <div id="book-funcs" style={{minWidth: "25px", maxWidth: "25px", marginRight: "-22px"}}>
          <div id="normal">             
            <input 
                type="checkbox" 
                name="borrower" 
                className="radio-student"
                onChange={this.onChooseStudentOfBasket}
                checked={existed}
                style={{marginLeft: "8.5px", marginBottom: "9px"}}
              />
          </div>
          {this.state.onEditMode? onEditModeIcon : <i className="fa fa-edit fa-lg edit" onClick={this.onEditMode} title="edit"/>}
        </div>
      )
    }
  }

  onChooseAnotherAvatar = async (e) => {
    try {
      await this.setState({
        newUpdatedAvatar: e.target.files[0]
      })
      const reader = new FileReader()
      reader.onload = () => {
        this.setState({
          avatarPreview: reader.result
        })
      }
      reader.readAsDataURL(this.state.newUpdatedAvatar)
    } catch {
      //do nothing
    }
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
          <button type="button" className="button_2" onClick={this.onShowMore} style={this.state.shortInfo?{minWidth: "90px", marginRight: "4px"}:{width: "100%"}}>{`ID: ${this.props.student.id}`}</button>
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

    const styleMore1 = {
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }    
    // const btnText = this.state.shortInfo? "Show More" : " Show Less  "
    
    const styleForStudentInfo = this.state.shortInfo? {} : styleMore1

    //FOR EDIT BOOK: without image edittion
    const nameCom = (
      <span className="info"> Name:<br/><input id="book-title" className="text" type="text" value={this.state.name} onChange={this.onEditChange} name="name" style={{width: "250px"}} onKeyUp={this.onKeyUp}/></span>
    )
    const emailCom = (
      <span>
        <input id="book-authors" className="text" type="text" value={this.state.email} onChange={this.onEditChange} name="email" style={{width: "250px"}} onKeyUp={this.onKeyUp}/><br/>
        Edit avatar<br/>
        <input type="file" onChange={this.onChooseAnotherAvatar} multiple={false} accept="image/*"/>
      </span>
    )

    //on choose change style


    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
        {props => (
          <div style={props}>
            <div className="student" style={this.StyleOfChoosenStudent()}> 

              <div className="student-info">
                
                <div className="student-info-main" style={styleForStudentInfo}>
                  {this.AvatarComponent()}

                  <div className="student-info-detail" style={{width: "100%"}}>              
                    <h2 id="name" className="name" style={{cursor: "pointer"}} onClick={this.onShowMore}>
                      { this.state.onEditMode?'' :student.name }
                    </h2>
                    { this.state.onEditMode? nameCom : <span></span>}
                    <span> Email: { this.state.onEditMode? emailCom : student.email }</span>    
                    <div style={this.state.shortInfo? {} : {textAlign: "center"}}>
                    <BorrowingBooks 
                      studentId={this.props.student.id}
                      reload={this.props.reload}
                    />
                    </div>
                  </div>
                </div>
                
                <div>{this.funcs()}</div>
              </div>          
            </div>
          </div>
        )}
        
      </Spring>
    )
  }

  StyleOfChoosenStudent = () => {
    const { student, chosenStudent } = this.props
    let existed = false
    if(chosenStudent){
      existed = student.id === chosenStudent.id ? true : false
    } 
    if (existed === true){
      return {
        backgroundColor: "rgb(255, 207, 104)"
      }
    } 
  }
}
