import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { hash } from 'bcryptjs';

export const signup = createAsyncThunk(
    'users/signup',
    async (reqBody) => {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
    
            hash(reqBody.password, 10).then(
                hash => {
                    const user = {
                        "username": reqBody.username,
                        "email": reqBody.email,
                        "password": hash
                    }
    
                    request.open('POST', `${import.meta.env.VITE_API_URL}signup`);
                    request.setRequestHeader('Content-type', 'application/json');
                    request.send(JSON.stringify(user));
                }
            )
    
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status === 200 || request.status === 201) {
                        resolve(JSON.parse(request.response));
                    } else {
                        reject(JSON.parse(request.response));
                    }
                }
            }
        })
    }
)

export const usersSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            username: "",
            userId: ""
        },
        isLoading: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
            state.hasError = false;
            state.isLoading = false;
            state.user.username = action.payload.username;
            state.user.userId = action.payload.userId;
            if (localStorage) {
                localStorage.setItem('token', action.payload.token)
            }
            })
            .addCase(signup.pending, (state, action) => {
            state.hasError = false;
            state.isLoading = true;
            })
            .addCase(signup.rejected, (state, action) => {
            state.hasError = true;
            state.isLoading = false;
        })
    }
});

export const { selectUserId } = (state) => state.user.userId;

export default usersSlice.reducer;