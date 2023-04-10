import type { NextApiRequest, NextApiResponse } from "next/types";

import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_REGION_CUSTOM,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_CUSTOM!!,
    secretAccessKey: process.env.AWS_SECRET_KEY_CUSTOM!!,
  },
});

type Data = {
  ok: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const payload = JSON.parse(req.body);

  // Create sendEmail params
  var params = {
    Destination: {
      /* required */
      ToAddresses: ["selysia.app@gmail.com"],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Text: {
          Charset: "UTF-8",
          Data: `
          
                firstName: ${payload.firstName},
                lastName: ${payload.lastName},
                email: ${payload.email},
                subject: ${payload.subject},
                message: ${payload.message},
          
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Selysia - Contact Form",
      },
    },
    Source: "contact-form@selysia.com",
    ReplyToAddresses: [
      payload.email,
      /* more items */
    ],
  };

  // Create the promise and SES service object
  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(function () {
      res.status(200).json({ ok: 1 });
    })
    .catch(function (err) {
      console.error(err);
      res.status(400).send({ ok: 0 });
    });
}
