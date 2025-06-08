-- CreateTable
CREATE TABLE "SportPlace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "userEmail" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    CONSTRAINT "Reservation_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "SportPlace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
