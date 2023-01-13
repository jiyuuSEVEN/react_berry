import { apiSlice } from './api';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'api/v1/auth/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: { ...credentials }
            })
        }),
        me: builder.mutation({
            query: () => ({
                url: 'api/v1/auth/me',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    })
});

export const { useLoginMutation, useMeMutation } = authApiSlice;
