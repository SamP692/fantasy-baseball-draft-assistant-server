/* Core Libraries */
import { type Context, type Next } from "oak"

/* CORS */
function cors(context: Context, next: Next) {
    context.response.headers.set("Access-Control-Allow-Origin", "http://localhost:1234")
    context.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
    context.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    return next()
}

export default cors
