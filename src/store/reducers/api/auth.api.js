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
        register: builder.mutation({
            query: (request) => ({
                url: 'api/v1/auth/register',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: { ...request }
            })
        }),
        sendOTP: builder.mutation({
            query: (email) => ({
                url: 'api/v1/auth/otp-verification',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { ...email }
            })
        }),
        verifyOTP: builder.mutation({
            query: (otp) => ({
                url: 'api/v1/auth/otp-verification',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: { ...otp }
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

export const { useLoginMutation, useMeMutation, useRegisterMutation, useSendOTPMutation, useVerifyOTPMutation } = authApiSlice;
