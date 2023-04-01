// 获取数组第一个元素的类型
type First<T extends any[]> = T extends [infer F, ...infer R] ? F : never

// 获取函数的第一个参数类型
type FirstParameter<T extends (...args: any[]) => any> = T extends (...args: infer R) => any
  ? First<R>
  : never
