const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


const userModel = require('../models/user');


const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');



//@route POST http://localhost:3000/user/register
//@desc user Register
//@access Public
//user register 1.email check 2. create avatar 3. usermodel 4.password 암호화 5.response
router.post('/register', (req,res)=> {

    const {errors, isValid} = validateRegisterInput(req.body);
    if (!isValid){
        return res.status(400).json(errors);
    }

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


//@route POST http://localhost:3000/user/login
//@desc user login
//@access Public
//user login 1.email check 2. password decoding 3. returning jwt 4. response
router.post('/login', (req,res)=> {

    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    userModel
        .findOne({email : req.body.email})
        .exec()
        .then(user => {
            if(!user){
                res.json({
                    msg : "register required"
                });
            }else{

                bcrypt
                    .compare(req.body.password, user.password)
                    .then(isMatch => {
                        if(isMatch){

                            const payload = {id: user.id, name:user.name , avatar: user.avatar};

                            const token = jwt.sign(
                                payload,
                                process.env.SECRET_KEY,
                                {expiresIn : 36000}
                            );

                            return res.json({
                                msg : "successfull login",
                                tokenInfo : 'bearer ' + token
                            });

                        }else{
                            res.json({
                                msg : "password incorrect"
                            });
                        }
                    })
                    .catch(err =>res.json(err));
            }
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

});

//@route GET http://localhost:3000/user/currents
//@desc user Currents
//@access Private
//user currents
router.get('/currents', passport.authenticate('jwt',{session : false}),(req,res)=> {

    res.json({
        id : req.user.id,
        name : req.user.name,
        avatar : req.user.avatar
    });
    
});


module.exports = router;
