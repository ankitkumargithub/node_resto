const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');


passport.use(new localStrategy( async(username, password, done) => {
    // Here you would typically query your database to find the user and verify the password
    try{
        console.log('Reicieved credentials:', username, password);
        const user  = await Person.findOne({username:username});
        if(!user){
            return done(null,false, {message: 'Incorrect username.'});
        }
        //const isPasswordMatch = user.password === password ? true:false; 
        const isPasswordMatch = await user.comparePassword(password);
        console.log(isPasswordMatch);
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null,false,{message: 'Incorrect Password.'});
        }

    }catch(err){
        return done(err);
    }
}));


module.exports = passport;