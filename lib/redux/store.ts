"use client"

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import debtsReducer from "./slices/debtsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    debts: debtsReducer,
  },
})

// Load state from localStorage
export const loadState = () => {
  if (typeof window === "undefined") return undefined

  try {
    const serializedState = localStorage.getItem("debtManagerState")
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error("Error loading state from localStorage:", err)
    return undefined
  }
}

// Save state to localStorage
export const saveState = (state: RootState) => {
  if (typeof window === "undefined") return

  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("debtManagerState", serializedState)
  } catch (err) {
    console.error("Error saving state to localStorage:", err)
  }
}

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState())
})

// Initialize store with saved state
const persistedState = loadState()
if (persistedState) {
  store.dispatch({ type: "HYDRATE", payload: persistedState })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
