import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            username: "",
            userId: ""
        }
    }
})