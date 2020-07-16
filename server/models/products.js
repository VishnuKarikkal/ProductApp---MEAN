const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProductsList');      //connecting mongodb database
                //database:mongodb , Port:27017(default) , database name::ProductsList  
const Schema=mongoose.Schema; 
const productsSchema=new mongoose.Schema( 
                                    {
                                        productId:String,
                                        productName:String,
                                        productCode:String,
                                        releaseDate:Date,
                                        description:String,
                                        price:Number,
                                        starRating:Number,
                                        imgUrl:String
                                    });

var productData=mongoose.model('productsdata',productsSchema); //converting schema into a collection--model creation
module.exports=productData;