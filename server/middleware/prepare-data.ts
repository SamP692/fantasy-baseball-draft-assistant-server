/* Core Libraries */
import { type Context, type Next } from "oak"

/* Prepare Data */
function prepareData(context: Context, next: Next) {
    if (context.response.body) {
        context.response.body = { data: context.response.body }

        next()
    } else {
        next()
    }
}

export default prepareData
