class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",

            },
        }:{}
        this.query=this.query.find({...keyword});   //... syntax is the spread syntax, which allows to expand an object into a set of key-value pairs.
        return this;
    }
    filter(){
        const queryCopy={...this.queryStr}
        //removing some fields for catagory
       
        const removeFields=["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);
        
        let queryStr=JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
};

module.exports=ApiFeatures