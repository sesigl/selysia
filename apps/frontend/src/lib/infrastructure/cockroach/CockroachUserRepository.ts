import { getPrismaClient } from "@/lib/infrastructure/prisma/prismadb";
import { AccountDetail } from "@prisma/client";

export type ProviderWithDisplayName = { provider: string; displayName: string };

export default class CockroachUserRepository {
  constructor(private prismaClient = getPrismaClient()) {}

  async findProviderDisplayNamesByEmail(
    email: string
  ): Promise<ProviderWithDisplayName[]> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email: email,
      },
      include: {
        accounts: true,
      },
    });

    let accountDetails: AccountDetail[] = [];
    if (user) {
      const providerWithAccountIds = user.accounts.map((account) => ({
        account_providerAccountId: account.providerAccountId,
        account_provider: account.provider,
      }));

      accountDetails = await this.prismaClient.accountDetail.findMany({
        where: {
          OR: providerWithAccountIds,
        },
      });
    }

    return accountDetails.map((ad) => ({
      displayName: ad.display_name,
      provider: ad.account_provider,
    }));
  }
}
