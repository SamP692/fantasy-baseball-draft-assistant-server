/* Libraries */
import { Application, Router } from "oak"

/* Middleware */
import prepareData from "./server/middleware/prepare-data.ts"

/* Controllers */
import getSampleBatterController from "./server/controllers/batter/sample.ts"

/* Web Server */
const webServer = new Application()

const router = new Router()

router
    .get("/sample-batter", getSampleBatterController)

webServer.use(router.routes())
webServer.use(router.allowedMethods())

webServer.use(prepareData)

webServer.addEventListener("listen", (port) => { console.log(`Server running on port ${port.port}`) })

await webServer.listen({ port: 8080 })
