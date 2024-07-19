import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    directions: [
        { id: 0, name: "Гудаута", src: '/img/popular1.png' },
        { id: 1, name: "Сухум", src: '/img/popular2.png' },
        { id: 2, name: "Гагра", src: '/img/popular3.png' },
        { id: 3, name: "Пицунда", src: '/img/popular4.png' },
        { id: 4, name: "Гудаута", src: '/img/popular5.png' },
        { id: 5, name: "Новый Афон", src: '/img/popular6.png' },
        { id: 6, name: "Очамчира", src: '/img/popular1.png' },
        { id: 7, name: "Ткуарчал", src: '/img/popular2.png' },
        { id: 8, name: "Гал", src: '/img/popular3.png' },
        { id: 9, name: "Алахадзы", src: '/img/popular4.png' },
        { id: 10, name: "Агудзера", src: '/img/popular5.png' },
        { id: 11, name: "Бабушара", src: '/img/popular6.png' },
        { id: 12, name: "Кындыг", src: '/img/popular1.png' },
        { id: 13, name: "Лдзаа", src: '/img/popular2.png' },
        { id: 14, name: "Мюссера", src: '/img/popular3.png' },
        { id: 15, name: "Скурча", src: '/img/popular4.png' },
        { id: 16, name: "Тамыш", src: '/img/popular5.png' },
        { id: 17, name: "Цандрыпш", src: '/img/popular6.png' },
    ]
}

export const DirectionSlice = createSlice({
    name: 'direction-action',
    initialState,
    reducers: {
        directionOperation: (state, { payload }) => {
            state[payload['type']] = payload['data']
        }
    }
})

export const { directionOperation } = DirectionSlice.actions;
export default DirectionSlice.reducer;