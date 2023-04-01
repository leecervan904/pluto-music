import React, { createContext } from 'react'
import { counterStore } from './counter'

export const store = createContext({ counterStore })

const MobxStoreProvider: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = (props) => {
  return <store.Provider value={{ counterStore }}>{props.children}</store.Provider>
}

export default MobxStoreProvider
