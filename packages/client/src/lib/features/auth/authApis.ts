import api from "@/lib/api";

export const authAPIs = api.injectEndpoints({
    endpoints: (builder) => (
        {
            checkLogin: builder.query({
                query: () => ({
                    url: '/auth/check',
                    method: "GET"
                })
            }),

            login: builder.mutation({
                query: (credentials) => ({
                    url: '/auth/sign-in',
                    method: 'POST',
                    body: credentials
                })
            })
        }
    )
})

export const { useCheckLoginQuery, useLoginMutation } = authAPIs;