import { QueryIterator, IteratorOperator, IteratorCollector } from "./types";

const queryProps: PropertyDescriptorMap = {
    pipe: {
        value(
            this: IterableIterator<unknown>,
            operator: IteratorOperator<unknown, unknown>
        ) {
            return query(operator(this));
        },
    },
    collect: {
        value(
            this: IterableIterator<unknown>,
            collector: IteratorCollector<unknown, unknown>
        ) {
            return collector(this);
        },
    },
};

/**
 * Creates a query iterator from a given iterable
 * @param iterable The iterable
 */
export function queryOf<TType>(
    iterable: Iterable<TType>
): QueryIterator<TType> {
    return query(iterable[Symbol.iterator]());
}

/**
 * Creates a query iterator from a given iterator
 * @param iterator The iterator
 */
export function query<TType>(iterator: Iterator<TType>): QueryIterator<TType> {
    // set prototype of the iterator
    const qi = Object.setPrototypeOf(
        iterator,
        Object.defineProperties(
            Object.getPrototypeOf(iterator) ?? {},
            queryProps
        )
    );

    // make the Iterator an IterableIterator if it isn't already
    if (!(Symbol.iterator in qi))
        Object.defineProperty(qi, Symbol.iterator, () => iterator);

    return qi;
}
