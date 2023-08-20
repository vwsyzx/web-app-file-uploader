import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: 'fileSlice',
    initialState: {
        files: [],
        mainFolder: {},
        childs: [],
        mood: false,
        root: [],
        sendRoot: [],
        file: []
    },
    reducers: {
        mainFolder: (state, action) => {
            state.mainFolder = action.payload.mainFolder
            state.childs = action.payload.childs
            state.root = [{current: action.payload.mainFolder.current, childId: action.payload.mainFolder.childId}]
            state.sendRoot = [action.payload.mainFolder.current]
            state.mood = true
        },
        toFile: (state, action) => {
            state.files = [...action.payload]
            state.file = []
            state.mood = true
        },
        addFile: (state, action) => {
            state.files = [...action.payload.forfiles]
            state.childs = [...action.payload.childs]
            state.mood = true
        },
        remove: (state, action) => {
            state.files = []
        },
        addRoot: (state, action) => {
            state.root.push(action.payload.root)
            state.files = action.payload.file
            state.sendRoot.push(action.payload.root.current)
            state.mood = true
        },
        removeRoot: (state, action) => {
            state.root.pop()
            state.sendRoot.pop()
            state.file = []
        },
        simpleRoot: (state, action) => {
            state.file = [...action.payload.sendRoot, action.payload.current]
            state.file.shift()
        },
    }
})

export const { addFile, remove, mainFolder, toFile, addRoot, removeRoot, simpleRoot, setPicture } = fileSlice.actions
export default fileSlice.reducer