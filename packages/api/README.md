## 使用方式

## 类型命名规范



## 问题

+ 区分 `global.d.ts` 和其他 `*.d.ts` 的区别
```ts
// ??? index.d.ts 和 global.d.ts 有什么区别 >>> 怎样配置能让 index.d.ts 的类型能够像 global.d.ts 一样能背全局引用
declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type TestIndex = any
```

+ 区分 `*.ts` 和 `*.d.ts` 的区别：
  + 二者最大的区别是：`*.ts` 文件会被编译，而 `*.d.ts` 文件不会；所以要注意不要直接使用 `*.d.ts` 的类型否则会造成类型丢失
    + `global.d.ts` 声明的类型会在项目目录下注入（无须 import），但是属于 “虚假的” 类型，不能被其他项目（引用该项目的项目）识别
  + `*.d.ts`：一般情况下不需要写，除非在以下场景
    + 为 js 代码库提供类型提示，但又不想用 ts 重写代码库
    + 在某些场景需要使用纯粹的 js，充分发挥 js 的灵活性：如 material-ui
    + 扩展依赖库的类型定义：如扩展 `vue-router` 的某些类型
    + 拥有非常巨大的代码库：如 Deno
  + `*.ts`：推荐 TypeScript 项目总是使用该方式来声明类型，然后通过 tsc 自动生成声明文件
    + 像变量那样通过 `export`/`import` 导出、导入类型
```ts
// TODO: global.d.ts 的意义是什么？类型声明只能在本项目有提示，但是不是存在于项目中的类型定义？
// interface PageQuery {
//   limit?: number
//   offset?: number
// }
```

