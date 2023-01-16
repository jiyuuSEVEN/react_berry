import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        username: null,
        email: null,
        token: {
            is_refresh_token: false,
            access_token: null,
            refresh_token: null
        }
    },
    reducers: {
        logIn: (state, action) => {
            const { id, username, email, access_token, refresh_token } = action.payload;
            state.id = id;
            state.username = username;
            state.email = email;
            state.token.access_token = access_token;
            state.token.refresh_token = refresh_token;
        },

        // Is sending refresh token in header
        isRefreshToken: (state, action) => {
            const { is_refresh_token } = action.payload;
            state.token.is_refresh_token = is_refresh_token;
        },

        // Change token after calling refresh token
        changeTokens: (state, action) => {
            const { access_token, refresh_token } = action.payload;
            state.token.access_token = access_token;
            state.token.refresh_token = refresh_token;
        },

        logOut: (state, action) => {
            state.id = null;
            state.username = null;
            state.email = null;
            state.token.access_token = null;
            state.token.refresh_token = null;
        }
    }
});

export const { logIn, logOut, changeTokens, isRefreshToken } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserId = (state) => state.auth.id;
export const selectCurrentUserName = (state) => state.auth.username;
export const selectCurrentUserEmail = (state) => state.auth.email;
export const selectCurrentUserAccessToken = (state) => state.auth.token.access_token;
export const selectCurrentUserRefreshToken = (state) => state.auth.token.refresh_token;
export const selectCurrentTokenInHeaders = (state) => state.auth.token.token_in_headers;
