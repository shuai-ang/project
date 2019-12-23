require('./index.css')
require('pages/common/logo')
require('pages/common/footer')
var _util = require('util')


$(function(){
	var type = _util.getParamsFormUrl('type') || 'default'
	$('.'+type).show()
})