import { tasks } from "@trigger.dev/sdk/v3";
async function trigger(){

    await tasks.trigger("hello-world",{})
}
