export {}

/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never;

declare global {
  /**
   * UnionToTuple<1 | 2> = [1, 2].
   */
  type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
    ? []
    : [...UnionToTuple<Exclude<U, Last>>, Last];

  type First<T extends any[]> = T extends [infer Head, ...unknown[]] ? Head : never

  type Nullable<T> = T | null

  type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends
  (...args: any) => Promise<infer R>
    ? R
    : never
}
