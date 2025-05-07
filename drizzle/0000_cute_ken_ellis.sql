CREATE TABLE `grades` (
	`id` int NOT NULL,
	`grade` varchar(10) NOT NULL,
	CONSTRAINT `grades_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(20) NOT NULL,
	`grade` varchar(10) NOT NULL,
	`address` varchar(50),
	`contact` varchar(11),
	CONSTRAINT `students_id` PRIMARY KEY(`id`)
);
