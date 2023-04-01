import { useContext, useState, memo, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { store } from '/@/mobx'

const Content = observer(() => {
  const { counterStore } = useContext(store)
  return (
    <div>
      <button onClick={() => counterStore.decrement()}>Decrement</button>
      <span>{counterStore.count}</span>
      <button onClick={() => counterStore.increment()}>Increment</button>
      <button onClick={() => counterStore.changeLazy()}>Async Random</button>
      <div>
        Double value: <span>{counterStore.double}</span>
      </div>
    </div>
  )
})

function CounterA({ onClick, count }) {
  console.log('A')
  return (
    <div>
      <p>CounterA: You clicked {count} times</p>
      <button onClick={onClick}>Click me</button>
    </div>
  )
}

function CounterB({ onClick, count }) {
  console.log('B')
  return (
    <div>
      <p>CounterB: You clicked {count} times</p>
      <button onClick={onClick}>Click me</button>
    </div>
  )
}
// 包装组件
const MemoCounterB = memo(CounterB)

function Ranking() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  // 点击 A 时，B 不会重新渲染
  // const onClickA = () => {
  //   setCount((pre) => pre + 1)
  // }
  // 点击 B 时，A、B 都会重新渲染
  const onClickB = () => {
    setCount2((pre) => pre + 1)
  }

  return (
    <div>
      <CounterA onClick={() => setCount(count + 1)} count={count} />
      <MemoCounterB onClick={onClickB} count={count2} />
      <Content />
      <Outlet />
    </div>
  )
}

export default Ranking
