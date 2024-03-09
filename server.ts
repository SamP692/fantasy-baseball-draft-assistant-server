/* Libraries */
import { Application, Router } from "oak"

/* Middleware */
import prepareData from "./server/middleware/prepare-data.ts"
import cors from "./server/middleware/cors.ts"

/* Controllers */
import getBattersController from "./server/controllers/batters/get.ts"
import getPitchersController from "./server/controllers/pitchers/get.ts"

import getSampleBatterController from "./server/controllers/batter/sample.ts"

/* Web Server */
const webServer = new Application()

const router = new Router()

router
    .get("/batters", getBattersController)
    .get("/pitchers", getPitchersController)
    .get("/batters/sample", getSampleBatterController)

webServer.use(cors)

webServer.use(router.routes())
webServer.use(router.allowedMethods())

webServer.use(prepareData)

webServer.addEventListener("listen", (port) => { console.log(`Server running on port ${port.port}`) })

await webServer.listen({ port: 8080 })
