import { reduce, toArray } from "./collectors";
import { filter, map } from "./operators";
import { queryOf } from "./query";

const strings = ["foo", "bar", "baz", "foobar"];

describe("query", () => {
    it("pipe operators onto iterator", () => {
        const arr = queryOf(strings)
            .pipe(filter((v) => v.length === 3))
            .pipe(map((v) => v.length))
            .collect(toArray());

        expect(arr).toEqual(expect.arrayContaining([3, 3, 3]));
    });

    it("should collect the iterator", () => {
        const sl = queryOf(strings)
            .pipe(filter((v) => v.length === 3))
            .collect(reduce((p, v) => p + v.length, 0));

        expect(sl).toBeCloseTo(9);
    });
});
