-- CreateTable
CREATE TABLE "AccountDetail" (
    "id" STRING NOT NULL,
    "account_provider" STRING NOT NULL,
    "account_providerAccountId" STRING NOT NULL,
    "display_name" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountDetail_account_provider_account_providerAccountId_key" ON "AccountDetail"("account_provider", "account_providerAccountId");
