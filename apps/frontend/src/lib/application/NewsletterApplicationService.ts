import SendInBlueNewsletterClient from "@/lib/infrastructure/newsletter/SendInBlueNewsletterClient";
import CloudwatchMetricPublisher from "@/lib/infrastructure/metric/CloudwatchMetricPublisher";
import NewsletterClient from "@/lib/domain/newsletter/NewsletterClient";
import MetricPublisher from "@/lib/domain/metric/MetricPublisher";

export default class NewsletterApplicationService {
  constructor(
    private readonly metricPublisher: MetricPublisher = new CloudwatchMetricPublisher(),
    private readonly newsletterClient: NewsletterClient = new SendInBlueNewsletterClient()
  ) {}

  async addToNewsletter(email: string) {
    try {
      await this.newsletterClient.createContact(email);
      await this.metricPublisher.incrementCounter("subscriber.increment", 1);
    } catch (e) {
      await this.metricPublisher.incrementCounter("subscriber.error", 1);
      console.error("Newsletter publish failed for email " + email);
      throw e;
    }
  }
}
