import { Client as WorkflowClient } from "@upstash/workflow"
import config from "./config"

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upStash.qstashUrl,
  token: config.env.upStash.qstashToken,
})
