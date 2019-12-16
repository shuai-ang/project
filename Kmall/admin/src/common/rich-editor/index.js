import React,{Component} from 'react'
import Simditor from 'simditor'
import $ from 'jquery'
import 'simditor/styles/simditor.css'

class RichEditor extends Component{
	constructor(props){
		super(props)
		this.state = {
			toolbar:[
			  'title',
			  'bold',
			  'italic',
			  'underline',
			  'strikethrough',
			  'fontScale',
			  'color',
			  'ol'             ,
			  'ul'             ,
			  'blockquote',
			  'code'           ,
			  'table',
			  'link',
			  'image',
			  'hr'             ,
			  'indent',
			  'outdent',
			  'alignment',
			]
		}
		$.ajaxSetup({
			xhrFields:{
				withCredentials: true
			}
		})
	}
	componentDidMount(){
		var editor = new Simditor({
		  textarea: this.textarea,
		  toolbar:this.state.toolbar,
		  upload:{
		  	url: this.props.url,
		    fileKey: 'upload'
		  }
		})
	}
	render(){
		return (
			<textarea id="editor" ref={(textarea)=>{this.textarea=textarea}}></textarea>
		)
	}
}

export default RichEditor