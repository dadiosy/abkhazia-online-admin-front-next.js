import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    streamData: [
        {
            "id": 1,
            "lid": 1,
            "name": "Сухум ",
            "channel": "sukhum_ploshad_bagapsh_1",
            "token": "13c0ec0cfc6b1a49b15eb5c2db77e3eaf235bd18-a6715f2c6f67122d17f262ed7a0d2919-1715269365-1715258565",
            "preview": "https://apsny.camera/img/camera/sukhum_ploshad_bagapsh_1/preview.jpg",
            "url": "https://apsny.camera./player/?stream=sukhum_ploshad_bagapsh_1&token=13c0ec0cfc6b1a49b15eb5c2db77e3eaf235bd18-a6715f2c6f67122d17f262ed7a0d2919-1715269365-1715258565"
        },
        {
            "id": 2,
            "lid": 2,
            "name": "Псоу",
            "channel": "psou_1",
            "token": "87bee792e102c9b0d767573ce840807c0b470ac8-f834cab278676c62002d29915d991b4f-1715269366-1715258566",
            "preview": "https://apsny.camera/img/camera/psou_1/preview.jpg",
            "url": "https://apsny.camera./player/?stream=psou_1&token=87bee792e102c9b0d767573ce840807c0b470ac8-f834cab278676c62002d29915d991b4f-1715269366-1715258566"
        },
        {
            "id": 3,
            "lid": 3,
            "name": "Гагра",
            "channel": "gagra_alex_beach",
            "token": "20446fa0363e8b9bb2e5e7efdb9968946555a511-fdf0114af788649052a613f0c7e10763-1715269368-1715258568",
            "preview": "https://apsny.camera/img/camera/gagra_alex_beach/preview.jpg",
            "url": "https://apsny.camera./player/?stream=gagra_alex_beach&token=20446fa0363e8b9bb2e5e7efdb9968946555a511-fdf0114af788649052a613f0c7e10763-1715269368-1715258568"
        }]
}

export const StreamSlice = createSlice({
    name: 'stream-action',
    initialState,
    reducers: {
        StreamAction: (state, { payload }) => {
            state[payload['type']] = payload['data']
        }
    }
})

export const { StreamAction } = StreamSlice.actions;
export default StreamSlice.reducer;