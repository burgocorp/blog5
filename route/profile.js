const express = require('express');
const router = express.Router();
const profileModel = require('../models/profile');
const passport = require('passport');
const authCheck = passport.authenticate('jwt',{session : false})

//@route POST http://localhost:3000/profile/
//@desc register userProfile
//@access Private
//passport.authenticate('jwt')를 authCheck로 상수화시킴 
// authcheck가 있으면 login해서 token을 받은 후 header에 넣어서 test.
router.post('/', authCheck, (req,res)=> {

// { 여기가 profileFields 이다
//     user: "토큰에 담겨져 있는 유저id",
//     handle : 사용자의 핸들 입력값,
//     company : 사용자의 컴퍼티 입력값,
//     website : 사용자의 웹사이트 입력값,
//     location : 사용자의 로케이션 입력값,
//     status : 사용자의 status 입력값,
//     skills : 사용자의 skills입력값,
//     bio : 사용자의 bio 입력값

// }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    
    if (req.body.bio) profileFields.bio = req.body.bio;

    if (typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',');
    }

    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            if(profile){
                // user profile이 있다면 기존 프로필 정보 수정
            }else{
                // user profile이 없으면 새로운 프로필 생성 
                new profileModel(profileFields)
                    .save()
                    .then(profile => res.json(profile))
                    .catch(err => res.json(err))

            }
            
        })
        .catch(err => res.json(err));


});

module.exports = router;