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
		// console.log(this.props.match)
		this.state = {
			productId:this.props.match.params.productId
		}
	}
	componentDidMount(){
		this.props.handleLevelCategories()
		if(this.state.productId){
			let id = this.state.productId;
			this.props.handleDetailProduct(id)
		}
	}
	handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	/*
	      if (!err) {
	        // console.log('Received values of form: ', values);
	        this.props.handleSave(values)
	      }
	      */
	      	values.id = this.state.productId;
	        this.props.handleSave(err,values)
	    });
	}
	render(){
		const { getFieldDecorator } = this.props.form
		const { categories,
				handleMainImage,
				handleImages,
				handleDetail,
				mainImageValidateStatus,
				mainImageHelp,
				imagesValidateStatus,
				imagesHelp,

				category,
				name,
				description,
				price,
				stock,
				mainImage,
				images,
				detail
		} = this.props
		// console.log(categories)
		let mainImageList = []
		if(mainImage){
			mainImageList.push({
				uid: '-1',
		        name: 'image.png',
		        status: 'done',
		        url:mainImage,
		        response:{
		        	url:mainImage
		        }
			})
		}

		let imagesList = []
		if(images){
			imagesList = images.split(',').map((url,index)=>{
				return {
					uid: index,
			        name: 'image.png',
			        status: 'done',
			        url:url,
			        response:{
			        	url:url
			        }
				}
			})
		}
		return (
			<div className='ProductSave'>
				<Layout>
					<Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        {
                        	this.state.productId ? <Breadcrumb.Item>编辑商品</Breadcrumb.Item> : <Breadcrumb.Item>新增商品</Breadcrumb.Item>
                        }
                        <Breadcrumb.Item>编辑商品</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='Content'>
                    	<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
					        
					        <Form.Item label="商品分类">
					          {getFieldDecorator('category', {
					            rules: [{ required: true, message: '请选择商品分类!' }],
					            initialValue:category
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
					            initialValue:name
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品描述">
					          {getFieldDecorator('description', {
					            rules: [{ required: true, message: '请输入商品描述' }],
					            initialValue:description
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品价格">
					          {getFieldDecorator('price', {
					            rules: [{ required: true, message: '请输入商品价格' }],
					            initialValue:price
					          })(<InputNumber min={0} />)}
					        </Form.Item>
					        <Form.Item label="商品库存">
					          {getFieldDecorator('stock', {
					            rules: [{ required: true, message: '请输入商品库存' }],
					            initialValue:stock
					          })(<InputNumber min={0} />)}
					        </Form.Item>
					        <Form.Item 
						        label="封面图片"
						        required={true}
						        validateStatus={mainImageValidateStatus}
						        help={mainImageHelp}
					        >
					          <UploadImage 
						          max={1}
						          action={UPLOAD_PRODUCT_IMAGE}
						          getFileList={(fileList)=>{
						          	 handleMainImage(fileList)
						          }}
						          fileList={mainImageList}
					          />
					        </Form.Item>
					        <Form.Item 
						        label="商品图片"
						        required={true}
						        validateStatus={imagesValidateStatus}
						        help={imagesHelp}
					        >
					          <UploadImage 
						          max={5}
						          action={UPLOAD_PRODUCT_IMAGE}
						          getFileList={(fileList)=>{
						          	 handleImages(fileList)
						          }}
						          fileList={imagesList}
					          />
					        </Form.Item>
					        <Form.Item label="商品详情">
					          <RichEditor 
					          	url={UPLOAD_PRODUCT_DETAIL_IMAGE}
					          	getValues={(values)=>{
					          		handleDetail(values)
					          	}}
					          	values={detail}
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
		categories:state.get('product').get('categories'),
		mainImageValidateStatus:state.get('product').get('mainImageValidateStatus'),
		mainImageHelp:state.get('product').get('mainImageHelp'),
		imagesValidateStatus:state.get('product').get('imagesValidateStatus'),
		imagesHelp:state.get('product').get('imagesHelp'),

		category:state.get('product').get('category'),
		name:state.get('product').get('name'),
		description:state.get('product').get('description'),
		price:state.get('product').get('price'),
		stock:state.get('product').get('stock'),
		mainImage:state.get('product').get('mainImage'),
		images:state.get('product').get('images'),
		detail:state.get('product').get('detail')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleSave:(err,values)=>{
			dispatch(actionCreator.getSaveProductAction(err,values))
		},
		handleLevelCategories:()=>{
			dispatch(actionCreator.getLevelCategories())
		},
		handleMainImage:(fileList)=>{
			dispatch(actionCreator.MainImageAction(fileList))
		},
		handleImages:(fileList)=>{
			dispatch(actionCreator.ImagesAction(fileList))
		},
		handleDetail:(values)=>{
			dispatch(actionCreator.DetailAction(values))
		},
		handleDetailProduct:(id)=>{
			dispatch(actionCreator.DetailProductAction(id))
		}
	}
}
const WrappedProductSave = Form.create({ name: 'coordinated' })(ProductSave);
export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductSave)
