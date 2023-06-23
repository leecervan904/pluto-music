import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    showSearch: false,
  }),
  actions: {
    toggleSearch() {
      this.$state.showSearch = !this.$state.showSearch
    },
  },
})
