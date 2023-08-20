import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fileApi } from '../api/FileSlice/fileApi'
import { addRoot, removeRoot, toFile } from '../api/FileSlice/fileSlice'
import '../App.css'
import AddFile from './AddFile'
import AddFolder from './AddFolder'
import Folder from './Folder'

const socket = new WebSocket('ws://localhost:3500')

const Main = ({deleteFunc}) => {    
  const dispatch = useDispatch()
  const {childs, file} = useSelector(state => state.fileSlice)

  const [fileUploadFunc, {data}] = fileApi.useFileUploadMutation()
  const [addFolderFunc, otherOptions1] = fileApi.useAddFolderMutation()
  const [deleteFolder, otherOptions2] = fileApi.useDeleteFolderMutation()

  const [mood, setMood] = useState(0)

  socket.onopen = () => {
    console.log('connected!')
    socket.send(JSON.stringify('hello from client!'))
  }

  function addRootFunc(item){
    const one = childs.find(elem => elem.childId === item.childId)
    if(one){
        dispatch(addRoot({root: {current: item.current, childId: item.childId}, file: [...one.child]}))
    }
  }
  function removeRootFunc(thisRoot){
    dispatch(removeRoot())
    let future = thisRoot.length-2
    let childId = thisRoot[future].childId
    const one = childs.find(elem => elem.childId === childId)
    if(one){
        dispatch(toFile(one.child))
    }
}

  function sendFile(file, sendRoot, root){
    let filepath = sendRoot.join('/')
    let last = root[root.length-1].childId
    console.log(last, filepath)
    Object.keys(file).forEach(elem => {
      let formData = new FormData()
      formData.append('file', file[elem])
      formData.append('childId', last)
      formData.append('filepath', filepath)
      fileUploadFunc(formData)
    })
  }
  function addFolder(current, path, childId){
    let folderPath = path.join('/')
    console.log(childId, folderPath)
    addFolderFunc({current, folderPath, childId})    
  }

  return (
    <>
        {mood?<div className='modal' onClick={() => setMood(0)}>
          {mood === 12345 && <AddFile func={sendFile} mood={mood} setMood={setMood} addRootFunc={addRootFunc} removeRootFunc={removeRootFunc}/>}
          {mood === 23456 && <AddFolder addRootFunc={addRootFunc} removeRootFunc={removeRootFunc} addFolder={addFolder}/>}
        </div>:null}
        <div className='main-btns'>
          <button onClick={() => setMood(12345)}>Add File</button>
          <button onClick={() => setMood(23456)}>Add Folder</button>
        </div>
        <Folder addRootFunc={addRootFunc} removeRootFunc={removeRootFunc} deleteFunc={deleteFunc}/>
    </>
  )
}

export default Main;
