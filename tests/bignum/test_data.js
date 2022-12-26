
import {check_result} from "./check_result.js"


export function test_data(data, test_name, arg_count, max_error, test_function) {
    for (var i = 0; i < data.length; ++i) {
        var args = []
        for (var j = 0; j < arg_count; ++j) {
            args.push(BigFloat(data[i][j]))
        }

        const expected_res = BigFloat(data[i][arg_count])
        const res = test_function(i, args)

        var message = "invalid result for " + test_name + "(" + i

        for (var j = 0; j < arg_count; ++j) {
            message += ", " + data[i][j]
        }

        message += ")"
        check_result(res, expected_res, max_error, message)
    }
}
