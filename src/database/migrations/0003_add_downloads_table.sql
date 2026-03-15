CREATE TABLE IF NOT EXISTS `downloads` (
	`id` text PRIMARY KEY NOT NULL,
	`file_name` text NOT NULL,
	`label` text NOT NULL,
	`lesson_id` text NOT NULL REFERENCES `lessons`(`id`) ON DELETE cascade ON UPDATE cascade
);