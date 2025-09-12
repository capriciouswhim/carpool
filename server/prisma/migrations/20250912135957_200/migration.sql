-- CreateTable
CREATE TABLE "history" (
    "pool_number" INTEGER NOT NULL,
    "lane_date" TEXT NOT NULL,
    "lane_time" TEXT NOT NULL,
    "call_time" TEXT,
    "recall_time" TEXT,
    "send_time" TEXT,
    "exit_time" TEXT,
    "gone_time" TEXT,

    PRIMARY KEY ("pool_number", "lane_date")
);

-- CreateTable
CREATE TABLE "flag" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "value" BOOLEAN NOT NULL
);
