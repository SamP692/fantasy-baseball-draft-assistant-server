/* Prompt to Replace */
function promptToReplace(dbDir: string) {
    try {
        const fileAlreadyExists = Deno.statSync(dbDir)?.isFile

        if (fileAlreadyExists) {
            const shouldReplace = prompt("This database has already been created, would you like to replace it? (y/N)")

            
            if (shouldReplace?.toLowerCase() !== "y") {
                console.log("Leaving existing database in place and terminating database creation.")
                
                Deno.exit()
            } else {
                Deno.removeSync(dbDir)
            }
        }
    } catch (e) {
        const fileNotFound = e.message.includes("No such file or directory")

        if (!fileNotFound) throw e
    }
}

export default promptToReplace
