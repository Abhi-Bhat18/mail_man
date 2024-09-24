import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = 'http://192.168.1.8:1335';

const api = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include'
    }),
    endpoints: () => ({}),
})

export default api;