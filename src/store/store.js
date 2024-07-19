import { configureStore } from "@reduxjs/toolkit";
import WeatherSlice from './actions/weather/weather';
import DirectionSlice from './actions/direction/direction';
import AttractionSlice from './actions/attraction/attraction';
import StreamSlice from "./actions/streamSlice";

export const store = configureStore({
  reducer: {
    weather: WeatherSlice,
    direction: DirectionSlice,
    attraction: AttractionSlice,
    streamStore: StreamSlice,
  },
})