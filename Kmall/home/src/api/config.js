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
}

module.exports = {API_CONFIG}