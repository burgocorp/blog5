const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt; //jwt을 불러와서 
//이 user의 Info를 (유무)비교하기 위해서 mongoose를 불러온다 
const mongoose = require('mongoose');
const userModel = mongoose.model('user');
// {

 
//     jwtFromRequest: "사용자입력 토큰",
//     secretOrKey: "token에 사용된 시크릿키"

// }
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
//passport.use 라는 함수를 사용한다 그 다음 jwtStrategy는 토큰을 푸는 것, opts는 대상자,payload는 결과값 , cb는 내보내는 것 )
module.exports = passport => {
    passport.use(
        new jwtStrategy(opts, (jwt_payload, cb) => {
            userModel
                .findById(jwt_payload.id)
                .then(user => {
                    if (user){
                        return cb(null, user)
                    } else {
                        cb(null, false)
                    }

                })
                .catch(err => console.log(err));


        })
    );

};



