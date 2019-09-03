import { ADD_TRIP } from './actionTypes'

export const addTodo = trip_id => ({
  type: ADD_TRIP,
  trip_id
})