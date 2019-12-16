export const SERVER = 'http://127.0.0.1:3000'
export const UPLOAD_PRODUCT_IMAGE = SERVER + '/products/images'
export const UPLOAD_PRODUCT_DETAIL_IMAGE = SERVER + '/products/detailImages'

export const API_CONFIG = {
	login:['/sessions/users','post'],
	logout:['/sessions/users','delete'],
	count:['/counts','get'],
	getPage:['/users/list','get'],
	addCategories:['/categories','post'],
	levelCategories:['/categories/levelCategories','get'],
	getCategoriesList:['/categories/list','get'],
	updateCategoriesName:['/categories/name','put'],
	updateCategoriesMobileName:['/categories/mobileName','put'],
	updateCategoriesOrder:['/categories/order','put'],
	updateCategoriesIsShow:['/categories/isShow','put'],
}