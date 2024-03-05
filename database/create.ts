/* Config */
import config from ":config"

/* Methods */
import promptToReplace from "./create/prompt-to-replace.ts"

/* Create Dabase (Script) */
promptToReplace(config.dbInstances.dev)
