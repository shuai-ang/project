async function pagination(options){
	const limit = 2;
	let { page,model,query,projection,sort } = options;

    if(isNaN(page)){
       page = 1
    }
    //上一页边界控制
    if(page == 0){
       page = 1
    }

    const count = await model.countDocuments()
       // console.log(count)
       let pages = Math.ceil(count/limit);
       if(page > pages){
          page = pages;
       }
       if(page == 0){
       	  page = 1
       }
       let list = [];
       for(let i=1;i<=pages;i++){
          list.push(i)
       }

       let skip = (page - 1)*limit;
       const docs = await model.find(query,projection).skip(skip).limit(limit).sort(sort)

       return {
       	  docs:docs,
          page:page,
          list:list,
          pages:pages
       }
        
}


module.exports = pagination;