const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){

    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if(!validator.isLength(data.handle, {min:2, max:30})){
        errors.handle = 'hand must be between 2 and 30 characters';
    }

    if(validator.isEmpty(data.handle)){
        errors.handle = 'handle field is required';
    }
    if(validator.isEmpty(data.status)){
        errors.status = 'status field is required';
    }
    if(validator.isEmpty(data.skills)){
        errors.skills = 'skills field is required';
    }

    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)) {
            errors.website = 'not URL form'
        }
    }


    return{
        errors,
        isValid : isEmpty(errors)
        
    };

};