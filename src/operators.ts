import { IteratorOperator, IteratorSingleOperator } from "./types";

// === OPERATORS
/**
 * Yields values from the the previous iterator after they have been passed over the given mapping function
 * @param mapper The mapping function
 */
export const map = <TInput, TOutput>(
    mapper: (value: TInput) => TOutput
): IteratorOperator<TInput, TOutput> =>
    function* (input) {
        for (const val of input) yield mapper(val);
    };

// === SINGLE OPERATORS
/**
 * Yields values from the previous iterator only if they satisfy the filter function
 * @param filter The filter function
 */
export const filter = <TType>(
    filter: (value: TType) => boolean
): IteratorSingleOperator<TType> =>
    function* (input) {
        for (const val of input) if (filter(val)) yield val;
    };
