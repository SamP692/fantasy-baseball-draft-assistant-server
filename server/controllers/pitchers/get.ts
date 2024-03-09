/* Core Libraries */
import { type Context, type Next } from "oak"

/* Domain */
import getPitchers from ":domain/pitchers/get.ts"

/* Local Types */
type RouteParams = Record<string, string | undefined>

/* Get Sample Batter Controller */
function getPitchersController(context: Context<RouteParams>, next: Next) {
    const filterByPosition = context.request.url.searchParams.get("position") as string | undefined
    const filterByKnownFreeAgents = context.request.url.searchParams.get("knownFreeAgents")?.toLowerCase() === "true"
    const filterByExpectedFreeAgents = context.request.url.searchParams.get("expectedFreeAgents")?.toLowerCase() === "true"

    const filters = {
        position: filterByPosition,
        knownFreeAgents: filterByKnownFreeAgents,
        expectedFreeAgents: filterByExpectedFreeAgents
    }

    const batters = getPitchers(filters)

    context.response.body = batters

    next()
}

export default getPitchersController
