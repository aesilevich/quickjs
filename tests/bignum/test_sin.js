
import { test_data } from "./test_data.js"
import { sincos_data } from "./sincos_data.js"


test_data(sincos_data, "sin", 1, 1000, BigFloat("1.0"), function(i, data) {
    return BigFloat.sin(data[0])
})
