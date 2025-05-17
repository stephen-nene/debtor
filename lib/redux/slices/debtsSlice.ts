"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Debt } from "@/lib/types"

interface DebtsState {
  debts: Debt[]
}

const initialState: DebtsState = {
  debts: [],
}

const debtsSlice = createSlice({
  name: "debts",
  initialState,
  reducers: {
    addDebt: (state, action: PayloadAction<Debt>) => {
      state.debts.push(action.payload)
    },
    updateDebt: (state, action: PayloadAction<Debt>) => {
      const index = state.debts.findIndex((debt) => debt.id === action.payload.id)
      if (index !== -1) {
        state.debts[index] = action.payload
      }
    },
    deleteDebt: (state, action: PayloadAction<string>) => {
      state.debts = state.debts.filter((debt) => debt.id !== action.payload)
    },
    toggleDebtStatus: (state, action: PayloadAction<string>) => {
      const debt = state.debts.find((debt) => debt.id === action.payload)
      if (debt) {
        debt.isPaid = !debt.isPaid
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase("HYDRATE", (state, action: any) => {
      if (action.payload?.debts) {
        return {
          ...state,
          ...action.payload.debts,
        }
      }
      return state
    })
  },
})

export const { addDebt, updateDebt, deleteDebt, toggleDebtStatus } = debtsSlice.actions
export default debtsSlice.reducer
