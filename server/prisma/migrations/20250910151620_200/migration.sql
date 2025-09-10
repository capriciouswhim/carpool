-- CreateTable
CREATE TABLE "history" (
    "pool_number" INTEGER NOT NULL,
    "lane_date" TEXT NOT NULL,
    "lane_time" TEXT NOT NULL,
    "call_time" TEXT,
    "send_time" TEXT,
    "exit_time" TEXT,

    PRIMARY KEY ("pool_number", "lane_date")
);

-- CreateTable
CREATE TABLE "Flags" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "value" BOOLEAN NOT NULL
);
