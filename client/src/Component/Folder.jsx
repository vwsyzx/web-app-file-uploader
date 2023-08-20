import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FcOpenedFolder} from 'react-icons/fc'
import {addRoot, removeRoot, setPicture, simpleRoot, toFile} from '../api/FileSlice/fileSlice'
import '../App.css'
import {Link} from 'react-router-dom'

const Folder = ({addRootFunc, removeRootFunc, deleteFunc}) => {
    const dispatch = useDispatch()
    const {files, mood, childs, root, sendRoot} = useSelector(state => state.fileSlice)

    function toFileFunc(childId){
        const one = childs.find(elem => elem.childId === childId)
        if(one){
            dispatch(toFile(one.child))
        }
    }

    useEffect(() => {
        console.log(root)  
    }, [root])

    return (
        <div className='folder-main'>
            <button onClick={() => { 
                if(root[root.length-1].current !== 'static'){
                    removeRootFunc(root)
                }
                }}>{'<'}
            </button>
            {root[root.length-1]?.current !== 'static'?
            <button className='folder-main-delete-btn'
                onClick={() => deleteFunc(sendRoot, 'FOLDER', root[root.length-2]?.childId, root[root.length-1]?.childId, 'null')}
                >Delete
            </button>:null}
            <div className="folders">
                <div className="folders-into" onClick={() => toFileFunc(root[root.length-1].childId)}>
                    <span className='icon'><FcOpenedFolder/></span>
                    {root.length && <h3 className='text'>{root[root.length-1].current}</h3>}
                </div>
            </div>
            <div className='files'>
                {root.length && <span>{root[root.length-1].current}</span>}
                {mood && files?files.map(item => {
                    console.log(item.childId)
                    if(item.type === 'FOLDER'){
                        return <div key={item.current} className="files-into"
                            onClick={() => addRootFunc(item)}>
                            <div className='elem1'>
                                <span className='icon'><FcOpenedFolder/></span>
                                <h4>{item.current}</h4>
                            </div>
                            <div className='elem2'>
                                <span>{item.type}</span>
                            </div>
                        </div>
                    }
                    else{
                        return <Link key={item.current} to={`/${item.current}`} className="files-into"
                            onClick={() => dispatch(simpleRoot({sendRoot, current: item.current}))}
                        >
                            <div className='elem1'>
                                <span className='icon'><FcOpenedFolder/></span>
                                <h4>{item.current}</h4>
                            </div>
                            <div className='elem2'>
                                <span>{item.type}</span>
                            </div>
                        </Link>
                    }
                }):null}
            </div>
        </div>
    );
}

export default Folder;
