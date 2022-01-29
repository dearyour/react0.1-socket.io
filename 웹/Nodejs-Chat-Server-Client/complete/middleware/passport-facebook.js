const { Router } = require('express');
const router = Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
 
const models = require('../models');
 
const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG
 
passport.use(new FacebookStrategy({
        // https://developers.facebook.com에서 appId 및 scretID 발급
        clientID: process.env.FACEBOOK_APPID , //입력하세요
        clientSecret: process.env.FACEBOOK_SECRETCODE , //입력하세요.
        callbackURL: `${process.env.SITE_DOMAIN}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'email'] //받고 싶은 필드 나열
    },
    async (  accessToken , refreshToken , profile, done) => {
        
        //아래 하나씩 찍어보면서 데이터를 참고해주세요.
        //console.log(accessToken);
        //console.log(profile);
        //console.log(profile.displayName);
        //console.log(profile.emails[0].value);
        //console.log(profile._raw);
        //console.log(profile._json);
        
        try{
            const username =`fb_${profile.id}`;
 
            // 존재하는지 체크
            const exist = await models.User.count({
                where : {
                    // 아이디로 조회를 해봅니다.
                    username
                }
            });
 
            if(!exist){
                // 존재하면 바로 세션에 등록
                user = await models.User.create({
                    username ,
                    displayname : profile.displayName ,
                    password : "facebook"
                });
            }else{
                user = await models.User.findOne({
                    where : { 
                        username
                    } 
                });
            }
 
            return done(null, user );
 
        }catch(e){
            console.log(e);
        }
 
    }
));

passport.serializeUser( (user, done) => {
  done(null, user);
});

passport.deserializeUser( (user, done) => {
  done(null, user);
});



module.exports = passport;


