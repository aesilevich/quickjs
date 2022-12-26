
export function check_result(actual, expected, max_error, message) {
    if (arguments.length == 1)
        expected = true;

    if (actual === expected)
        return;

    if (max_error != 0) {
        const err1 = BigFloat.abs(actual - expected) / BigFloat.abs(actual);
        const err2 = BigFloat.abs(actual - expected) / BigFloat.abs(expected);
        const err = err1 > err2 ? err1 : err2;
        if (err <= max_error) {
            return;
        }
    }

    if (actual !== null && expected !== null
    &&  typeof actual == 'object' && typeof expected == 'object'
    &&  actual.toString() === expected.toString())
        return;

    throw Error("assertion failed: got |" + actual + "|" +
                ", expected |" + expected + "| +/- " + max_error.toString() +
                (message ? " (" + message + ")" : ""));
}
