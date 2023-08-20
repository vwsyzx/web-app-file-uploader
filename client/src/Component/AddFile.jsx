import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {FcOpenedFolder} from 'react-icons/fc'
import '../App.css'

const AddFile = ({func, mood, setMood, addRootFunc, removeRootFunc}) => {
  const {root, sendRoot, files} = useSelector(state => state.fileSlice)

  const [arrFiles, setArrFiles] = useState({})

    return (
        <div className='cover' onClick={(ev) => ev.stopPropagation()}>
          <div className='modal-header'>
            {sendRoot.length && <span className='modal-header-text'>{sendRoot.join('/')}/</span>}
          </div>
          <div className='choose-folder'>
            <div className='choose-folder-header'>
              {sendRoot.length && <div>
                <button onClick={() => {
                  if(root[root.length-1].current !== 'static'){
                    removeRootFunc(root)
                  }
                }}
                  className="choose-folder-header-btn"
                >{'<'}</button>
                <span className='choose-folder-header-text'>{sendRoot[sendRoot.length-1]}</span>
              </div>}
            </div>
            <div className='choose-folder-folders'>
              {
                files?.map(elem => {
                  if(elem.type === 'FOLDER'){
                    return <div key={elem.childId} className='choose-folder-folder'
                      onClick={() => {addRootFunc(elem)}}>
                      <span className='choose-folder-folder-icon'><FcOpenedFolder/></span>
                      <h3 className='choose-folder-folder-text'>{elem.current}</h3>
                    </div>
                  }
                })
              }
            </div>
          </div>
          <div className='choose-file'>
            <input multiple type='file' onChange={ev => {
              setArrFiles(ev.target.files)
            }}/>
          </div>
          <div className='btn-apply'>
            <button className='btn' onClick={() => func(arrFiles, sendRoot, root)}>Apply</button>
          </div>
        </div>
    );
}

export default AddFile;
