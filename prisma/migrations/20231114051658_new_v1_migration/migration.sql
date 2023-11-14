-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" INTEGER NOT NULL,
    "companyname" TEXT NOT NULL,
    "socialcompanyname" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    CONSTRAINT "Workspace_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullname" TEXT NOT NULL,
    "cpf" INTEGER NOT NULL,
    "cnpj" INTEGER NOT NULL,
    "companyname" TEXT NOT NULL,
    "socialcompanyname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "cep" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    CONSTRAINT "Client_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Space" (
    "ref" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspaceId" TEXT NOT NULL,

    PRIMARY KEY ("workspaceId", "ref"),
    CONSTRAINT "Space_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SpaceTable" (
    "ref" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "spaceRef" TEXT NOT NULL,

    PRIMARY KEY ("spaceRef", "ref"),
    CONSTRAINT "SpaceTable_spaceRef_fkey" FOREIGN KEY ("spaceRef") REFERENCES "Space" ("ref") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TableColumn" (
    "ref" TEXT NOT NULL,
    "columnName" TEXT NOT NULL,
    "columnType" TEXT NOT NULL,
    "spaceTableRef" TEXT NOT NULL,

    PRIMARY KEY ("spaceTableRef", "ref"),
    CONSTRAINT "TableColumn_spaceTableRef_fkey" FOREIGN KEY ("spaceTableRef") REFERENCES "SpaceTable" ("ref") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TableData" (
    "ref" TEXT NOT NULL,
    "columnName" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "spaceTableRef" TEXT NOT NULL,

    PRIMARY KEY ("spaceTableRef", "ref"),
    CONSTRAINT "TableData_spaceTableRef_fkey" FOREIGN KEY ("spaceTableRef") REFERENCES "SpaceTable" ("ref") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Space_ref_key" ON "Space"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "SpaceTable_ref_key" ON "SpaceTable"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "TableColumn_ref_key" ON "TableColumn"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "TableData_ref_key" ON "TableData"("ref");
