import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  weathers: []
}

export const WeatherSlice = createSlice({
  name: 'weather-action',
  initialState,
  reducers: {
    weatherOperation: (state, { payload }) => {
      state[payload['type']] = payload['data']
    }
  }
})

export const { weatherOperation } = WeatherSlice.actions;
export default WeatherSlice.reducer;