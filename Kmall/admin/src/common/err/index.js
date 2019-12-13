import React,{Component} from 'react'
import { Alert,Button } from 'antd';
import './index.css'
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class Err extends Component{
	render(){
		return (
			<div className="Err">
				<Alert
			      message="Not Found"
			      description="您请求的地址走丢了。。"
			      type="error"
			      showIcon
			    />
			    <Link to="/"><Button type="link">返回首页</Button></Link>
			</div>
		)
	}
}

export default Err