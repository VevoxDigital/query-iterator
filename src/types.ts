/**
 * A function which accepts the current iterator and returns a new one, pulling from the initial iterator as needed
 */
export type IteratorOperator<TInput, TOutput> = (
    iterator: IterableIterator<TInput>
) => IterableIterator<TOutput>;
export type IteratorSingleOperator<TType> = IteratorOperator<TType, TType>;

/**
 * A function which collects all values from an iterator into a result
 */
export type IteratorCollector<TType, TResult> = (
    iterator: IterableIterator<TType>
) => TResult;

export interface QueryIterator<TType> extends IterableIterator<TType> {
    /**
     * Pipes this iterator over a given operator, returning the resulting iterator
     * @param operator The operator to map the iterator values
     */
    pipe<TOut>(operator: IteratorOperator<TType, TOut>): QueryIterator<TOut>;
    // TODO multiple operators

    /**
     * Collects all values from the iterator into a single result
     * @param collector The collector function
     */
    collect<TResult>(collector: IteratorCollector<TType, TResult>): TResult;
}
