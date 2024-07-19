import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    attractions: [
        { id: 0, name: "Все направления", },
        { id: 1, name: "Гагра", },
        { id: 2, name: "Пицунда", },
        { id: 3, name: "Гудаута", },
        { id: 4, name: "Новый Афон", },
        { id: 5, name: "Сухум", },
        { id: 6, name: "Очамчира", },
        { id: 7, name: "Ткуарчал", },
        { id: 8, name: "Гал", },
        { id: 9, name: "Алахадзы", },
        { id: 10, name: "Агудзера", },
        { id: 11, name: "Бабушара", },
        { id: 12, name: "Кындыг", },
        { id: 13, name: "Лдзаа", },
        { id: 14, name: "Мюссера", },
        { id: 15, name: "Скурча", },
        { id: 16, name: "Тамыш", },
        { id: 17, name: "Цандрыпш", },
    ]
}

export const AttractionSlice = createSlice({
    name: 'attraction-action',
    initialState,
    reducers: {
        attractionOperation: (state, { payload }) => {
            state[payload['type']] = payload['data']
        },
    }
})

export const { attractionOperation } = AttractionSlice.actions;
export default AttractionSlice.reducer;