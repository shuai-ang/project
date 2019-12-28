var API_CONFIG = {
	login:['/sessions/users','post'],
	getUsername:['/sessions/username','get'],
	logout:['/sessions/users','delete'],
	register:['/users','post'],
	checkUsername:['/users/checkUsername','get'],
	getUserInfo:['/sessions/users','get'],
	updateUsers:['/users','put'],
	getHomeCategories:['/categories/homeCategories','get'],
	getAdsImage:['/ads/positionAds','get'],
	getHomeFloors:['/floors','get'],
	getProductsList:['/products/list','get'],


	getProductDetail:['/products/detail','get'],
	addCarts:['/carts','post'],
	getCartsNum:['/carts/count','get'],
	getCarts:['/carts','get'],
	updateCartChoice:['/carts/choices','put'],
	deleteCart:['/carts','delete'],
	updateCartCounts:['/carts/counts','put'],


	getOrdersList:['/orders/products','get'],
	addShippings:['/shippings','post'],
	getShippings:['/shippings/list','get'],
	deleteShippings:['/shippings','delete'],
}

module.exports = {API_CONFIG}