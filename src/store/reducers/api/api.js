import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, changeTokens, isRefreshToken } from '../auth.js';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/',
    prepareHeaders: (headers, { getState }) => {
        const access_token = getState().auth.token.access_token;
        const refresh_token = getState().auth.token.refresh_token;
        const is_refresh_token = getState().auth.token.is_refresh_token;
        if (is_refresh_token && refresh_token) {
            headers.set('Authorization', `Bearer ${refresh_token}`);
        } else if (access_token) {
            headers.set('Authorization', `Bearer ${access_token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403) {
        console.log('Sending refresh token...');
        let is_refresh_token = true;
        api.dispatch(isRefreshToken({ is_refresh_token }));
        const refreshResult = await baseQuery('api/v1/auth/access-token', api, extraOptions);

        if (refreshResult?.data) {
            is_refresh_token = false;
            api.dispatch(isRefreshToken({ is_refresh_token }));

            const access_token = refreshResult.data.access_token;
            const refresh_token = refreshResult.data.refresh_token;
            api.dispatch(changeTokens({ access_token, refresh_token }));

            let result = await baseQuery(args, api, extraOptions);

            return result;
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
});
