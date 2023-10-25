/*
  Warnings:

  - You are about to alter the column `cnpj` on the `Workspace` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `cep` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `cnpj` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `cpf` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `phone` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Workspace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" BIGINT NOT NULL,
    "companyname" TEXT NOT NULL,
    "socialcompanyname" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    CONSTRAINT "Workspace_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Workspace" ("accountId", "cnpj", "companyname", "id", "socialcompanyname") SELECT "accountId", "cnpj", "companyname", "id", "socialcompanyname" FROM "Workspace";
DROP TABLE "Workspace";
ALTER TABLE "new_Workspace" RENAME TO "Workspace";
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullname" TEXT NOT NULL,
    "cpf" BIGINT NOT NULL,
    "cnpj" BIGINT NOT NULL,
    "companyname" TEXT NOT NULL,
    "socialcompanyname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "cep" BIGINT NOT NULL,
    "address" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    CONSTRAINT "Client_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("address", "cep", "cnpj", "companyname", "cpf", "email", "fullname", "id", "phone", "socialcompanyname", "workspaceId") SELECT "address", "cep", "cnpj", "companyname", "cpf", "email", "fullname", "id", "phone", "socialcompanyname", "workspaceId" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
