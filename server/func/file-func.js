const apiError = require("../api-error/api-error");
const errorHandler = require("../error-handler/error-handler");
const serv = require('../service/file-service')

class Func{
    async getMainFolder(req, res){
        try {
            const result = await serv.getMainFolder()
            return res.status(200).json(result)
        } catch (error) {
            errorHandler(req, res, error)
        }
    }
    async upload(req, res){
        try {
            if(req.files.file && req.body.childId && req.body.filepath){
                const result = await serv.upload(req.files.file, req.body.childId, req.body.filepath)
                return res.status(200).json(result)
            }
            else{
                throw apiError.BadRequest('Fill Necessary Fields!')
            }
        } catch (error) {
            errorHandler(req, res, error)
        }
    }
    async addFolder(req, res){
        try {
            if(req.body.current && req.body.folderPath && req.body.childId){
                const result = await serv.addFolder(req.body.current, req.body.folderPath, req.body.childId)
                return res.status(200).json(result)
            }
            else{
                throw apiError.BadRequest('Fill necessary Fields!')
            }
        } catch (error) {
            errorHandler(req, res, error)
        }
    }
    async removeFolder(req, res){
        try {
            if(req.body.folderPath && req.body.type && req.body.mainChildId && req.body.childId && req.body.current){
                const result = await serv.removeFolder(req.body.folderPath, req.body.type, req.body.mainChildId, req.body.childId, req.body.current)
                return res.status(200).json(result)
            }
            else{
                throw apiError.BadRequest('Fill necessary Fields!')
            }
        } catch (error) {
            errorHandler(req, res, error)
        }
    }
}
module.exports = new Func()