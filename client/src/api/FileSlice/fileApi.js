import { useSelector } from "react-redux";
import { api } from "../api";
import { addFile, mainFolder, removeRoot, toFile } from "./fileSlice";




export const fileApi = api.injectEndpoints({
    endpoints: build => ({
        FileUpload: build.mutation({
            query: (body) => ({
                url: "/upload",
                method: 'POST',
                body: body
            }),
            async onQueryStarted(args, {queryFulfilled, dispatch}){
                try {
                    const {data} = await queryFulfilled
                    const one = data.childs.find(elem => elem.childId === data.childId)
                    if(one){
                        dispatch(addFile({childs: [...data.childs], forfiles: one.child}))
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getMain: build.query({
            query: () => ({
                url: '/getmain'
            }),
            async onQueryStarted(args, {queryFulfilled, dispatch}){
                try {
                    const { data } = await queryFulfilled
                    dispatch(mainFolder(data))

                    const one = data.childs.find(elem => elem.childId === data.mainFolder.childId)
                    if(one){
                        dispatch(toFile([...one.child]))
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        addFolder: build.mutation({
            query: (body) => ({
                url: '/folder',
                method: 'POST',
                body: body,
            }),
            async onQueryStarted(args, {queryFulfilled, dispatch}){
                try {
                    const { data } = await queryFulfilled
                    let childId = data.childId
                    let one = data.childs.find(elem => elem.childId === childId)
                    if(one){
                        dispatch(addFile({childs: data.childs, forfiles: one.child}))
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteFolder: build.mutation({
            query: (body) => ({
                url: '/rmfolder',
                method: 'POST',
                body: body
            }),
            async onQueryStarted(args, {queryFulfilled, dispatch}){
                try {
                    const { data } = await queryFulfilled
                    let childId = data.childId
                    
                    let one = data.childs.find(elem => elem.childId === childId)
                    if(one){
                        dispatch(addFile({childs: data.childs, forfiles: one.child}))
                        if(data.type === 'FOLDER'){
                            dispatch(removeRoot())
                        }                   
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        
    })
})