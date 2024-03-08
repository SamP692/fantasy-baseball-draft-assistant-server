/* Core Libraries */
import { type Context, type Next } from "oak"

/* Domain */
import getSampleBatter from ":domain/batter/sample/get.ts"

/* Local Types */
type RouteParams = Record<string, string | undefined>

/* Get Sample Batter Controller */
function getSampleBatterController(context: Context<RouteParams>, next: Next) {
    const incomplete = context.request.url.searchParams.get("incomplete")?.toLowerCase() === "true"
    
    const sampleBatter = getSampleBatter(incomplete)

    context.response.body = sampleBatter

    next()
}

export default getSampleBatterController
