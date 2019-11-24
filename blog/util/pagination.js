async function pagination(options){
	const limit = 2;
	let { page,model,query,projection,sort,populates } = options;

    if(isNaN(page)){
       page = 1
    }
    //上一页边界控制
    if(page == 0){
       page = 1
    }

    const count = await model.countDocuments(query)
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

       let result = model.find(query,projection)

       if(populates){
          populates.forEach(function(populate){
              return result.populate(populate)
          })
       }
       const docs = await result.skip(skip).limit(limit).sort(sort)

       return {
       	  docs:docs,
          page:page,
          list:list,
          pages:pages
       }
        
}


module.exports = pagination;