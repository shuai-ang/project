import React,{Component} from 'react'
import Layout from 'common/layout'
import UploadImage from 'common/uploadImage'
import RichEditor from 'common/rich-editor'
import { Breadcrumb,Form, Select, Input, Button,InputNumber } from 'antd'
import { connect } from 'react-redux'
import './index.css'
import {actionCreator} from './store/index.js'
import {UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE} from 'api/config.js'

const { Option } = Select;

class ProductSave extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		this.props.handleLevelCategories()
	}
	handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        // console.log('Received values of form: ', values);
	        this.props.handleAdd(values)
	      }
	    });
	}
	render(){
		const { getFieldDecorator } = this.props.form
		const { categories } = this.props
		// console.log(categories)
		return (
			<div className='ProductSave'>
				<Layout>
					<Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>编辑商品</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='Content'>
                    	<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
					        
					        <Form.Item label="商品分类">
					          {getFieldDecorator('category', {
					            rules: [{ required: true, message: '请选择商品分类!' }],
					          })(
					            <Select
					              placeholder="请选择商品分类"
					            >
					              {
					              	categories.map((category)=>{
					              		return <Option key={category.get('_id')}>{category.get('name')}</Option>
					              	})
					              	
					              }
					            </Select>,
					          )}
					        </Form.Item>
					        <Form.Item label="商品名称">
					          {getFieldDecorator('name', {
					            rules: [{ required: true, message: '请输入商品名称' }],
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品描述">
					          {getFieldDecorator('description', {
					            rules: [{ required: true, message: '请输入商品描述' }],
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品价格">
					          {getFieldDecorator('price', {
					            rules: [{ required: true, message: '请输入商品价格' }],
					          })(<InputNumber min={0} />)}
					        </Form.Item>
					        <Form.Item label="商品库存">
					          {getFieldDecorator('stock', {
					            rules: [{ required: true, message: '请输入商品库存' }],
					          })(<InputNumber min={0} />)}
					        </Form.Item>
					        <Form.Item label="封面图片">
					          <UploadImage 
						          max={1}
						          action={UPLOAD_PRODUCT_IMAGE}
						          getFileList={(fileList)=>{
						          	 console.log(fileList)
						          }}
					          />
					        </Form.Item>
					        <Form.Item label="商品图片">
					          <UploadImage 
						          max={5}
						          action={UPLOAD_PRODUCT_IMAGE}
						          getFileList={(fileList)=>{
						          	 console.log(fileList)
						          }}
					          />
					        </Form.Item>
					        <Form.Item label="商品详情">
					          <RichEditor 
					          	url={UPLOAD_PRODUCT_DETAIL_IMAGE}
					          />
					        </Form.Item>
					        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
					          <Button type="primary" onClick={this.handleSubmit}>
					            提交
					          </Button>
					        </Form.Item>
					    </Form>
                    </div>
				</Layout>
			</div>
		)
	}
}
//将属性映射到组件中
const mapStateToProps = (state)=>{
	// console.log('aa',state.get('category').get('categories').toJS())
	return {
		categories:state.get('product').get('categories')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleAdd:(values)=>{
			dispatch(actionCreator.getAddCategories(values))
		},
		handleLevelCategories:()=>{
			dispatch(actionCreator.getLevelCategories())
		}
	}
}
const WrappedProductSave = Form.create({ name: 'coordinated' })(ProductSave);
export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductSave)
