-- CreateTable
CREATE TABLE "History" (
    "poolNumber" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serialNumber" INTEGER NOT NULL DEFAULT 0,
    "paused" BOOLEAN NOT NULL DEFAULT false,
    "called" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "released" DATETIME
);

-- CreateTriggers
CREATE TRIGGER History_Insert
AFTER INSERT ON History
BEGIN
  UPDATE History
     SET serialNumber = (SELECT MAX(serialNumber) + 1 FROM History)
   WHERE poolNumber = NEW.poolNumber;
END;

CREATE TRIGGER History_Update
AFTER UPDATE ON History
BEGIN
  UPDATE History
     SET serialNumber = (SELECT MAX(serialNumber) + 1 FROM History)
   WHERE poolNumber = OLD.poolNumber;
END;

-- CreateTable
CREATE TABLE "Flags" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "value" BOOLEAN NOT NULL
);
