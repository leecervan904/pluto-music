import { createSlice, PayloadAction, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, ms)
  })
}

interface IAppState {
  value: number
}

const initialState: IAppState = {
  value: 0,
}

// export const incrementAsync = createAsyncThunk('async/increment', async () => {
//   await sleep(1000)
//   return 100
// })

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(incrementAsync.fulfilled, (state, action) => {
  //     state.value = action.payload
  //   })
  // },
})

export const { increment, decrement, incrementByAmount } = rootSlice.actions

export function incrementAsync() {
  return async (dispatch: Dispatch) => {
    await sleep(1000)
    dispatch(incrementByAmount(Math.floor(Math.random() * 100)))
  }
}

export default rootSlice.reducer
