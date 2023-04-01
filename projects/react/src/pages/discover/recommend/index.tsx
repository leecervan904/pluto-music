import { useSelector, useDispatch } from 'react-redux'
import { decrement, incrementByAmount, incrementAsync } from '/@/reducers/appReducer'
import type { RootState, AppDispatch } from '/@/store'
import HotPlaylist from './HotPlaylist'

function DiscoverRecommend() {
  const count = useSelector((state: RootState) => state.app.value)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <h1>Discover Recommend</h1>

      <div>
        <button aria-label="Increment value" onClick={() => dispatch(incrementByAmount(1))}>
          Increment
        </button>
        <button onClick={() => dispatch(incrementAsync())}>Increment Async</button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>

      <HotPlaylist />
    </div>
  )
}

export default DiscoverRecommend
