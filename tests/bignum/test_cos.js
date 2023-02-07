
import { test_data } from "./test_data.js"
import { sincos_data } from "./sincos_data.js"


test_data(sincos_data, "sin", 2,  1000, BigFloat("10.0"), function(i, data) {
    return BigFloat.cos(data[0])
})
