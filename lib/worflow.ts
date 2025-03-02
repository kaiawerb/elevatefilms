import { Client as WorkflowClient } from "@upstash/workflow"
import config from "./config"
import { Client as QStashClient, resend } from "@upstash/qstash"

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upStash.qstashUrl,
  token: config.env.upStash.qstashToken,
})

const qstashClient = new QStashClient({ token: config.env.upStash.qstashToken })

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string
  subject: string
  message: string
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resend.resend_token }),
    },
    body: {
      from: "Elevate Films <busqueseucorretor.com.br>",
      to: [email],
      subject,
      html: message,
    },
  })
}
