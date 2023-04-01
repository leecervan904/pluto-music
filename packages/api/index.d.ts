// ??? index.d.ts 和 global.d.ts 有什么区别 >>> 怎样配置能让 index.d.ts 的类型能够像 global.d.ts 一样能背全局引用
declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type TestIndex = any
