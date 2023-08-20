const fs = require('fs') 
const uuid = require('uuid')
const path = require('path')
const apiError = require('../api-error/api-error')
const Folder = require('../model/Folder')
const Child = require('../model/Child')


class Serv{
    constructor(){
        this.folders = []
    }

    async getMainFolder(){
        const mainFolder = await Folder.findOne({current: 'static'})
        const childs = await Child.find()
        
        return {
            mainFolder,
            childs 
        }
    }
    async upload(file, childId, filepath){
        let newName = uuid.v4()
        newName = newName.split('-').shift()
        newName = newName + '.' + file.name.split('.').pop()

        file.name = newName
        const moveTo = path.resolve(filepath, newName)
        file.mv(moveTo)
        
        const newChild = await Child.findOne({childId})
        newChild.child.push({
            type: 'FILE',
            current: newName,
            path: moveTo
        })
        await newChild.save()

        const childs = await Child.find() 
        return {
            childs,
            childId
        }
    }

    async addFolder(current, folderPath, childId){
        let lastPath = folderPath.split('/')
        lastPath = lastPath.pop()

        const one = await Child.findOne({childId})
        if(lastPath === one.current){
            const two = one.child.find(elem => elem.current === current)
            if(two){
                throw apiError.BadRequest('Folder has already been Created!')
            }
            const dir = path.resolve(folderPath, current)
            console.log(dir)
            fs.mkdirSync(dir)
            

            const newChildId = uuid.v4()
            const newChild = {
                type: 'FOLDER',
                current,
                childId: newChildId,
                path: dir
            }
            const newChildColl = await Child.create({...newChild}) 

            const addOld = await Child.findOne({childId})
            addOld.child.push({...newChild})
            await addOld.save()

            const childs = await Child.find() 
            return {
                childs,
                childId
            }
        }
        else{
            throw apiError.BadRequest('Something went Wrong!')
        }
    } 

    async removeFolder(folderPath, type, mainChildId, childId, current){
        if(type === 'FOLDER'){
            let newPath = path.resolve(folderPath)
            console.log(newPath, 'folder')
            fs.rmdirSync(newPath, {force: true}) // for deleting FOLDERS
            const main = await Child.findOne({childId: mainChildId})
            const newMain = main.child.filter(elem => elem.childId !== childId)
            main.child = newMain
            await main.save()

            const delFolder = await Child.deleteOne({childId})
            const childs = await Child.find()
            
            return {
                childs,
                childId: mainChildId,
                type
            } 
        }
        else if(type === 'FILE'){
            let filePath = path.resolve(folderPath)
            console.log(filePath, 'file')
            fs.unlinkSync(filePath) // for deleting FILES
            const main = await Child.findOne({childId: mainChildId})
            const newMain = main.child.filter(elem => elem.current !== current)
            main.child = newMain
            await main.save()

            const childs = await Child.find()

            return {
                childs,
                childId: mainChildId,
                type
            }
        }   
    }
     
}

module.exports = new Serv()