const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {

    let errors = {};

    data.username = !isEmpty(data.username)? data.username : '';
    data.email = !isEmpty(data.email)? data.email : '';
    data.password = !isEmpty(data.password)? data.password : '';
    data.password2 = !isEmpty(data.password2)? data.password2 :'';

    if(!validator.isLength(data.username, {min: 2, max :30 })){
        errors.username = "name must be between 2 and 30 characters";
    }

    if(validator.isEmpty(data.username)){
        errors.username = "name field is required";
    }

    if(!validator.isEmail(data.email)){
        errors.email = "email is invalid";
    }
    
    if(validator.isEmpty(data.email)){
        errors.email = "email field is required";
    }

    if(!validator.isLength(data.password, {min : 8, max : 12})){
        errors.password = "password must be between 8 and 12 characters";
    }

    if(!validator.equals(data.password, data.password2)){
        errors.password2 = "passwords must match";
    } 
    
    if(validator.isEmpty(data.password)){
        errors.password = "password field is required";  
    }

    if(validator.isEmpty(data.password2)){
        errors.password2 = "confirm password field is required";
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };

};