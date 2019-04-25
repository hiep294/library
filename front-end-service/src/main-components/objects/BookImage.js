import React, { Component } from 'react'
import Auth from '../../modules/Auth';

/**
 * to define image of book component
 */
export default class BookImage extends Component {
  /**
   * include the default url, 
   * newUpdatedImage for changing image, 
   * imagePreview to preview the image, both current image and new image
   */
  state = {
    url: Auth.getUrl() + "/uploads/book/book_image/",
    imagePreview : '',
    newUpdatedImage : null
  }

  /**
   * update image preview if user updates new image
   */
  componentDidUpdate = (prevProps) => {
    if(this.props.book_image !== prevProps.book_image){
      this.componentDidMount()
    }
    if(this.props.reload !== prevProps.reload){
      this.componentDidMount()
    }
  }

  /**
   * set image in state
   */
  componentDidMount = () => {
    this.setState({
      imagePreview : this.state.url +this.props.id + "/"+ this.props.book_image      
    })
  }

  /**
   * if user chooses another image, update imagePreview, and value of new book image
   */
  onChooseImageBookDemo = async (e) => {
    try{
      await this.setState({
        newUpdatedImage : e.target.files[0]
      })
      const reader = new FileReader()
      reader.onload = () => {
        this.setState({
            imagePreview : reader.result
          })
        }
      reader.readAsDataURL(this.state.newUpdatedImage)
      //notify that change an image for book
      this.props.updateImage(this.state.newUpdatedImage)
    } catch {
      //the error happen when user choose a file, but push cancel button, nothing handle here
    }
  }

  /**
   * to style image, include background, and size
   */
  ImageStyle = () => {    
    if (this.props.smallImage) {
      if ( this.props.onEditMode || !this.props.shortInfo) {
        return {
          display : "none"
        }
      } else {
        //if in up-component use this component for small image, it will show this, otherwise it will hide, like above
        return {
          backgroundImage : "url("+this.state.imagePreview+")",
          width : "66px",
          height : "118px"
        }
      }
    } else {
      //in other uses, it will return background image, the size of background is defined in css, objects
      return {
        backgroundImage : "url("+this.state.imagePreview+")",        
        width: "200px",
        height: "357px"
      }
    }
  }

  /**
   * there are two size of image are doable to throw
   */
  render() {
    // if in edit mode, it will show more two functionalities, choose another image, and save
    return (
      <div>
        <div 
          className={`book-image ${this.props.smallImage? 'small-book-image' : ''}`} 
          style={this.ImageStyle()}
        >
        {this.props.onEditMode? <div>Edit image <input type="file" onChange={this.onChooseImageBookDemo} multiple={false} accept="image/*"/>
        </div> : <div></div>}
        </div>
         
      </div>
    )
  }
}
