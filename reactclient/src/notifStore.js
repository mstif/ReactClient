import { configureStore } from '@reduxjs/toolkit'

export const SetActions = {
  setAct: 'ADD_MESSAGE',
}
// Исходный стейт
const initialState = {
  countMessages: 0,
}

// редюсер - функция, на основе входного объекта
// меняющая стейт и возвращающая новый
const notifReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case SetActions.setAct:
      console.log('text before', state.countMessages)
      const tbvalue = state.countMessages
      const item = action.payload
      const newState = { ...state, countMessages: item }
      console.log('text after', newState.countMessages)
      return newState
    default:
      return state
  }
}
const notifStore = configureStore({
  reducer: {
    countMessages: notifReducer,
  },
})
export default notifStore
