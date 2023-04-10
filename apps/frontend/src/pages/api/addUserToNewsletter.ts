import { NextApiRequest, NextApiResponse } from "next/types";
import NewsletterApplicationService from "@/lib/application/NewsletterApplicationService";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (!request.body.email) {
    response.status(400).send("email required");
    return;
  }

  const newsletterApplicationService = new NewsletterApplicationService();

  try {
    await newsletterApplicationService.addToNewsletter(request.body.email);
    response.status(201).send("");
  } catch (e) {
    response.status(500).send("");
    console.error(e);
  }
}
