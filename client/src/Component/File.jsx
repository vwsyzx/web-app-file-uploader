import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const File = ({deleteFunc}) => {
    const { current } = useParams()
    const { file, sendRoot, root } = useSelector(state => state.fileSlice)

    return (
        <>
            <img src={`http://localhost:3500/${file.join('/')}`} width="450px" height="450px"/>
            <Link to="/" onClick={() => deleteFunc([...sendRoot, current], 'FILE', root[root.length-1].childId, root[root.length-1].childId, current)}>Delete</Link>
        </>
    );
}

export default File; 