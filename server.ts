/* Libraries */
import { Application, Router } from "oak"

/* Web Server */
const webServer = new Application()

const router = new Router()

router
    .get("/", (context) => context.response.body = "Root")
    .get("/all-players", (context) => context.response.body = "All Players")

webServer.use(router.routes())
webServer.use(router.allowedMethods())

console.log('Server running')

await webServer.listen({ port: 8080 })
