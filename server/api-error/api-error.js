module.exports = class apiError extends Error{
    status;
    errors;

    constructor(status, message, errors = []){
        super(message)
        this.status = status
        this.errors = errors
    }

    static BadRequest(message, errors = []){
        return new apiError(400, message, errors)
    }
}