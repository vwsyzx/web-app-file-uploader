import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: new fetchBaseQuery({
        baseUrl: 'http://localhost:3500/api',
        /*prepareHeaders: (headers, { getState }) => {
            'Content-Type'
    
          },*/
    
    }),
    endpoints: build => ({
    })
})