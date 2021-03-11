import { IteratorCollector } from "./types";

/**
 * Collector which converts this iterator to an array, using `Array.from`.
 */
export const toArray = <TType>(): IteratorCollector<TType, TType[]> => (
    input
) => Array.from(input);

/**
 * Collector which converts this iterator into a single value, much like `reduce`
 * @param initialValue
 * @param reducer
 */
export const reduce = <TType, TResult>(
    reducer: (previousValue: TResult, value: TType) => TResult,
    initialValue: TResult
): IteratorCollector<TType, TResult> => (input) => {
    let result = initialValue;
    for (const val of input) result = reducer(result, val);
    return result;
};
