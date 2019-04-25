import React, { Component } from 'react'
import StudentManagement from './StudentManagement'
/**
 * this class may include, the students who get due day today
 */
export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1 className="page-title">Dash Board</h1>
        <StudentManagement 
          inDashboard={true}
          chosenStudent={this.props.chosenStudent}
          onChooseStudent={this.props.onChooseStudent}
          onRemoveStudent={this.props.onRemoveStudent}
        />
        
      </div> 
    )
  }
}
