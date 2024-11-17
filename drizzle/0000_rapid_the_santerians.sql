CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uri` text NOT NULL,
	`interestScore` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_uri_unique` ON `posts` (`uri`);