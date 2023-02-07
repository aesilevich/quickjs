

function calc_epsion(prec) {
    var epsilon = 0.0
    BigFloatEnv.setPrec(function() {
        epsilon = BigFloat.EPSILON
    }, prec)
    return epsilon
}


const test_large_precision = 10000


// Claculates relative error for two bigfloat values.
// This is rewritten copy of the relative_error function from the boost.multiprecision library test suite.
function calc_relative_error(a, b, test_epsilon) {
    let min_val = BigFloat.MIN_VALUE

    if (min_val == 0) {
        return
    }

    // Handle special case where one or both are zero
    
    if (BigFloat.abs(a) < min_val) {
        a = min_val
    }

    if (BigFloat.abs(b) < min_val) {
        b = min_val
    }


    if (a == b) {
        return 0
    }

    if (!BigFloat.isFinite(b) && !BigFloat.isFinite(a)) {
        return 0 // one infinity is as good as another!
    }

    // If the result is denormalised, treat all denorms as equivalent:
    if ((a < min_val) && (a > 0))
        a = min_val
    else if ((a > -min_val) && (a < 0))
        a = -min_val
    if ((b < min_val) && (b > 0))
        b = min_val
    else if ((b > -min_val) && (b < 0))
        b = -min_val

    let x = BigFloat.abs((a - b) / a)
    let y = BigFloat.abs((a - b) / b)

    let res = (x > y ? x : y) / test_epsilon

    return res 
}


export function test_data(data,
                          test_name,
                          arg_count,
                          test_precision,
                          expected_max_relative_error,
                          test_function) {

    var max_relative_error = BigFloat("0.0")
    const test_epsilon = calc_epsion(test_precision)

    for (var i = 0; i < data.length; ++i) {
        var args = []
        var expected_res

        // reading test case arguments and expected result with large precision
        BigFloatEnv.setPrec(function() {
            for (var j = 0; j < arg_count; ++j) {
                args.push(BigFloat(data[i][j]))
            }

            expected_res = BigFloat(data[i][arg_count])
        }, test_large_precision)

        // executing test with test precision
        BigFloatEnv.setPrec(function() {
            // executing test function
            const res = test_function(i, args)

            // calculating relative error
            const rel_err = calc_relative_error(res, expected_res, test_epsilon)

            if (max_relative_error < rel_err) {
                max_relative_error = rel_err
            }

            // checking relative error
            if (rel_err > expected_max_relative_error) {
                var message = "invalid result for " + test_name + "(" + i
                for (var j = 0; j < arg_count; ++j) {
                    message += ", " + data[i][j]
                }

                message += ")\n"
                message += "expected result: " + expected_res.toString() + "\n"
                message += "got result:      " + res.toString() + "\n"
                message += "relative error:  " + rel_err.toString() + "\n"

                throw Error(message);
            }
        }, test_precision)
    }

    console.log("Max relative error was: " + max_relative_error.toString())
}
