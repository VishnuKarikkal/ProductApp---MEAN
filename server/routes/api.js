const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const productData=require('../models/products');
const userData=require('../models/users');
const mongoose=require('mongoose');
const db='mongodb://localhost:27017/ProductsList';

mongoose.connect(db,(err)=>
                        {
                          if(err)
                          {
                            console.log("errorrrr occurred:"+err);
                          } 
                          else
                          {
                            console.log("MongoDB SUCCESSFULLY Connected!");
                          }
                        });


router.get('/products',(req,res)=>
                        {
                            res.header("Access-Control-Allow-Origin","*");
                            res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
                        
                            productData.find()
                            .then((products)=>
                            {
                                res.send(products);
                            });
                        });

router.post('/product',(req,res)=>
                        {
                          res.header("Access-Control-Allow-Origin","*");
                          res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
                          
                          const id=req.body.id;
                          console.log(id);
                          productData.findOne({_id:id})
                          .then((product)=>
                          {
                              res.send(JSON.parse(JSON.stringify(product)));
                          });
                        })

router.post('/newProducts',(req,res)=>
                        {
                            res.header("Access-Control-Allow-Origin","*");
                            res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

                            let product=
                      {
                          productId:req.body.product['productId'],
                          productName:req.body.product['productName'],
                          productCode:req.body.product['productCode'],
                          releaseDate:req.body.product['releaseDate'],
                          description:req.body.product['description'],
                          price:req.body.product['price'],
                          starRating:req.body.product['starRating'],
                          imgUrl:req.body.product['imgUrl']
                      } 
                         let newProduct= productData(product);
                         newProduct.save();
                        });

router.post('/updateProduct',(req,res)=>
                        {
                            res.header("Access-Control-Allow-Origin","*");
                            res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

                            let product=
                      {
                          _id:req.body.product['_id'],
                          productId:req.body.product['productId'],
                          productName:req.body.product['productName'],
                          productCode:req.body.product['productCode'],
                          releaseDate:req.body.product['releaseDate'],
                          description:req.body.product['description'],
                          price:req.body.product['price'],
                          starRating:req.body.product['starRating'],
                          imgUrl:req.body.product['imgUrl']
                      } 
                        productData.updateOne({_id:product._id},
                                              {
                                                $set:
                                                {
                                                  productId:product.productId,
                                                  productName:product.productName,
                                                  productCode:product.productCode,
                                                  releaseDate:product.releaseDate,
                                                  description:product.description,
                                                  price:product.price,
                                                  starRating:product.starRating,
                                                  imgUrl:product.imgUrl
                                                }
                                              })
                .then((products)=>
                {
                    res.send("Updated One Document!");
                })
                        });

router.post('/deleteProduct',(req,res)=>
                        {
                            res.header("Access-Control-Allow-Origin","*");
                            res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
                        
                            const id=req.body.id;
                            console.log("api req:");console.log(id);
                            productData.deleteOne({_id:id})
                            .then((products)=>
                                            {
                                             res.send(`Deleted One Product!`);  
                                            });
                        });

router.post('/signup',(req,res)=>
                  {
                    let data = 
                      {
                       name:req.body.user.name,
                       email : req.body.user.email,
                       password : req.body.user.password,
                       type:req.body.user.type
                       };
                       console.log(data);
                       let user=userData(data);
                       user.save((err,userSignedUp)=>
                       {
                           if(err)
                           {
                               console.log("errrrorrrr:"+err);
                           }
                           else
                           {
                               let payload={subject:user._id};
                               let token=jwt.sign(payload,'secretkey');
                               res.send({token});
                           }
                       });
                  });

router.post('/signin',(req,res)=>
              {
                res.header("Access-Control-Allow-Origin","*");
                res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
                console.log("api");
                console.log(req.body.user);
                let data=
                {
                  email:req.body.user.email,
                  password:req.body.user.password
                }
                userData.findOne({email:data.email,password:data.password},
                (err,user)=>
                        {
                          if(err)
                          {
                            console.log("errrrorrrr:"+err);
                           }
                          else
                          {
                             if(!user)
                             {
                                res.send("Invalid Credentials!")
                             }
                             else
                             {
                              let payload={subject:user._id,type:user.type};
                              let token=jwt.sign(payload,'secretkey');
                              res.send({token});  
                             }
                          }
                        });
              })

// router.post('/welcome',(req,res)=>
// {
//   res.header("Access-Control-Allow-Origin","*");
//                           res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
                          
//                           const id=req.body.id;
//                           console.log(id);
//                           userData.findOne({_id:id})
//                           .then((user)=>
//                           {
//                             console.log(user);
//                               res.send(JSON.parse(JSON.stringify(user)));
//                           });
// })  
              
function verifyToken(req,res,next)
{
   if(!req.headers.authorization)
   {
       return res.status(401).send("Unauthorised Request!");
   }
   let token=req.headers.authorization.split(' ')[1];
   if(token===null)
   {
        return res.status(401).send("Unathorized Request!");
   }
   let payload=jwt.verify(token,'secretkey');
   if(!payload)
   {
    return res.status(401).send("Unathorized Request!");
   }
   req.userId=payload.subject;
   next();
}
 module.exports=router;
