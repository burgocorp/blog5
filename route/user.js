const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userModel = require('../models/user');



//@route POST http://localhost:3000/user/register
//@desc user Register
//@access Public
//user register 1.email check 2. create avatar 3. usermodel 4.password 암호화 5.response
router.post('/register', (req,res)=> {

    userModel
        .findOne({email : req.body.email})
        .exec()
        .then(user => {
            if(user){
                res.json({
                    msg : "email exists"
                });
            }else{
                const avatar = gravatar.url(req.body.email,{
                    s:'200',
                    r: 'pg',
                    d: 'mm'
                });

                const user = new userModel({
                    name : req.body.username,
                    email : req.body.email,
                    password : req.body.password,
                    avatar : avatar
                });
                
                bcrypt.genSalt(10, (err,salt) =>  {
                    bcrypt.hash(user.password, salt, (err, hash)=> {
                        if(err) throw err ;
                        user.password = hash;
                        user    
                            .save()
                            .then(result => {
                                res.json({
                                    msg : "registered user",
                                    userInfo : result
                                });
                            })
                            .catch(err => {
                                res.json({
                                    msg : err.message
                                });
                            });
                        })
                    })

                }
            
            })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

});



//user login 1.email check 2. password decoding 3. returning jwt 4. response
router.post('/login', (req,res)=> {

});


//user currents
router.get('/currents', (req,res)=> {

});


module.exports = router;
