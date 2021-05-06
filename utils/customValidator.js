const validator = require('validator');

exports.validationWrapper = function (body, validationErrors, field, lengthMin=0, lengthMax) {

    if (!(field in body))
        validationErrors.push({
            message: `${field} not provided.`,
        });
    else if ( (lengthMin!= undefined && body[field].length < lengthMin) || (lengthMax!= undefined && body[field].length > lengthMax)  )
        validationErrors.push({
            message: `${field} size out of bounds. Min: ${lengthMin} Characters, Max: ${lengthMax} Characters`,
        });
}