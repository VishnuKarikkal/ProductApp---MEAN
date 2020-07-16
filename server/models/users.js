const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProductsList');      //connecting mongodb database
                //database:mongodb , Port:27017(default) , database name::LIBRARY  
const Schema=mongoose.Schema;               //to define schema
const userSchema=new mongoose.Schema(       //schema definition
                                    {
                                    name:String,
                                    email:String,
                                    password:String,
                                    type:String
                                    }
                                    );
var userData=mongoose.model('userdata',userSchema); //converting schema into a collection--model creation
                            //creation of "userdatas" collection in the Database as an effect 
module.exports=userData;