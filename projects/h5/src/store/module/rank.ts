import { defineStore } from 'pinia'

export interface IRankCate {
  recommend: number[]
  official: number[]
  special: number[]
  global: number[]
  region: number[]
  style: number[]
  other: number[]
}

export interface IRankStoreState {
  cate:IRankCate
}

export const useRankStore = defineStore({
  id: 'rank',
  state: (): IRankStoreState => ({
    cate: {
      recommend: [5059642708, 5059661515, 112463],
      official: [19723756, 3779629, 3778678, 2884035],
      special: [2250011882, 71384707],
      global: [180106, 60198, 27135204, 2023401535, 11641012, 60131],
      region: [2809513713, 5059644681],
      style: [1978921795, 5059633707, 5059642708],
      other: [2617766278, 10520166, 2006508653, 3812895, 21845217, 120001,
        2809577409, 3001835560, 3001795926, 3001890046, 3112516681, 112463]
    },
  }),
})
