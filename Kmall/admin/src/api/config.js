export const SERVER = 'http://127.0.0.1:3000'
export const UPLOAD_PRODUCT_IMAGE = SERVER + '/products/images'
export const UPLOAD_PRODUCT_DETAIL_IMAGE = SERVER + '/products/detailImages'
export const UPLOAD_AD_IMAGE = SERVER + '/ads/image'

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
	addProducts:['/products','post'],
	getProductsList:['/products/list','get'],

	updateProductsIsShow:['/products/isShow','put'],
	updateProductsStatus:['/products/status','put'],
	updateProductsIsHot:['/products/isHot','put'],
	updateProductsOrder:['/products/order','put'],

	getDetailProduct:['/products/detail','get'],
	updateProducts:['/products','put'],


	//广告api
	getAdsList:                  	["/ads/list","get"],
    getAdsDetail:                	["/ads/detail","get"],
    addAds:                      	["/ads","post"],
    updateAds:                  	["/ads","put"],
    updateAdsOrder:              	["/ads/order","put"],
    updateAdsIsShow:             	["/ads/isShow","put"],
}