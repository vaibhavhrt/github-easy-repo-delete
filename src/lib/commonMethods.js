// Some common metjods used everywhere
export const makeErrorObject = err => {
    /**
     * Make an object conatining error details from the error response of an axios request.
     * @param   {Object} err    The error object catched from axios request.
     * @return  {Object}        A js object conating field errors or error status code depending on type of error.
     */
    let errors = {};
    if(err.response){
        if(err.response.data){
            errors = err.response.data;
            if(!errors.non_field_errors)
                errors.non_field_errors = 'Please fix the errors above';
        }else
            errors = {non_field_errors :`${err.response.status} Unexpected Error`};
    }else if (err.request) {
        errors = {non_field_errors :'No Response from Server'};
    }else {
        errors = {non_field_errors : `Error: ${err.message}`};
    }
    return errors;
};

export const onChange = (type, e) => {
    /**
     * A general purpose onChange handler for inputs.
     * @param   {String} type   A string which will define the type of action, is returned as is so that proper reducer can catch it.
     * @param   {Object} e      The onChange event of input.
     * @return  {Object}        An Object containing type of action and name and value of the event target.
     */
    return {
        type: type,
        name: e.target.name,
        value: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };
};

export const diffObjects = (new_obj={}, old_obj={}) => {
    /**
     * Diff two Objects. Reduce new_obj and only return the values that are different from old_obj.
     * @param   {Object} new_obj    The object you want to reduce.
     * @param   {Object} old_obj    The reducer with whome new_obj will be compared.
     * @return  {Object}            A new object which is a subset of new_obj containing only those values which were different from old_obj.
     */
    return Object.keys(new_obj).reduce((diff, key) => {
        if (old_obj[key] === new_obj[key]) return diff;
        return {
            ...diff,
            [key]: new_obj[key],
        };
    }, {});
};
