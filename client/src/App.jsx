import './App.css'
import { Route, Routes } from 'react-router-dom'
import File from './Component/File'
import Main from './Component/Main'
import { fileApi } from './api/FileSlice/fileApi'
import { useEffect } from 'react'


function App() {
  const [deleteFolder, otherOptions2] = fileApi.useDeleteFolderMutation()
  const [mainFolderFunc, {data: result}] = fileApi.useLazyGetMainQuery()

  function deleteFunc(sendRoot, type, mainChildId, childId, current){
    console.log(sendRoot)
    let folderPath = sendRoot.join('/')
    console.log({folderPath, type, mainChildId, childId, current})
    deleteFolder({folderPath, type, mainChildId, childId, current})
  }

  useEffect(() => {
    mainFolderFunc()
  }, [])
  

  return (
    <div className='mainCss'>
      <Routes>
        <Route path="/:current" element={<File deleteFunc={deleteFunc}/>}/>
        <Route path='/' element={<Main deleteFunc={deleteFunc}/>}/>
      </Routes>
    </div>
  )
}

export default App
