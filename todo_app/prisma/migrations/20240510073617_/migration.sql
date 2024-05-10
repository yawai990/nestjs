-- CreateTable
CREATE TABLE `user_tbl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_tbl_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todo_tbl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `todo` VARCHAR(191) NOT NULL,
    `complete` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `todo_tbl` ADD CONSTRAINT `todo_tbl_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user_tbl`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
