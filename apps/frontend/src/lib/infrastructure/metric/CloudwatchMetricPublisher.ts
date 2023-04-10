import {
  CloudWatchClient,
  PutMetricDataCommand,
} from "@aws-sdk/client-cloudwatch";

const host = process.env.VERCEL_ENV || "dev";

const cwClient = new CloudWatchClient({
  region: process.env.AWS_REGION_CUSTOM,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_CUSTOM as string,
    secretAccessKey: process.env.AWS_SECRET_KEY_CUSTOM as string,
  },
});

export default class CloudwatchMetricPublisher {
  async incrementCounter(
    key: string,
    increment: number,
    additionalDimensions: Record<string, string> = {}
  ) {
    let additionalDimensionsForParams: { Name: string; Value: string }[] =
      Object.keys(additionalDimensions).map((key) => ({
        Name: key,
        Value: additionalDimensions[key],
      }));
    const params = {
      MetricData: [
        {
          MetricName: key,
          Dimensions: [
            {
              Name: "host",
              Value: host,
            },
            ...additionalDimensionsForParams,
          ],
          Unit: "None",
          Value: increment,
        },
      ],
      Namespace: "SELYSIA",
    };

    try {
      await cwClient.send(new PutMetricDataCommand(params));
    } catch (err) {
      console.error(err);
    }
  }
}
