<?php

function getWebsiteIndexingUpdates() {
	return array(
		'website_indexing_tables' => array(
			'title' => 'Website Indexing tables',
			'description' => 'Create tables for websites to be indexed.',
			'sql' => array(
				"CREATE TABLE website_indexing_settings (
			    	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				    name VARCHAR(75) NOT NULL,
				    searchCategory VARCHAR(75) NOT NULL,
				    siteUrl VARCHAR(255),
				    indexFrequency ENUM('hourly', 'daily', 'weekly', 'monthly', 'yearly', 'once'),
				    lastIndexed INT(11),
				    UNIQUE(name)
				) ENGINE = InnoDB",
				"ALTER TABLE website_indexing_settings ADD INDEX(lastIndexed)",
				"CREATE TABLE website_pages (
			        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			        websiteId INT NOT NULL,
			        url VARCHAR(255),
			        checksum BIGINT,
			        deleted TINYINT(1),
			        firstDetected INT(11),
			        UNIQUE (url)
			    ) ENGINE = InnoDB",
				"ALTER TABLE website_pages ADD INDEX(websiteId)",
				"CREATE TABLE IF NOT EXISTS website_index_log(
				    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'The id of log',
				    websiteName VARCHAR(255) NOT NULL, 
				    `startTime` INT(11) NOT NULL COMMENT 'The timestamp when the run started', 
				    `endTime` INT(11) NULL COMMENT 'The timestamp when the run ended', 
				    `lastUpdate` INT(11) NULL COMMENT 'The timestamp when the run last updated (to check for stuck processes)', 
				    `notes` TEXT COMMENT 'Additional information about the run',
				    numPages INT(11) DEFAULT 0,
				    numAdded INT(11) DEFAULT 0,
				    numDeleted INT(11) DEFAULT 0,
				    numUpdated INT(11) DEFAULT 0,
				    numErrors INT(11) DEFAULT 0, 
				    PRIMARY KEY ( `id` )
				) ENGINE = InnoDB;",
				"ALTER TABLE website_index_log ADD INDEX(websiteName)",
			),
		),

		'track_website_user_usage' => array(
			'title' => 'Website Usage by user',
			'description' => 'Add a table to track how often a particular user uses indexed websites.',
			'sql' => array(
				"CREATE TABLE user_website_usage (
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    userId INT(11) NOT NULL,
                    websiteId INT(11) NOT NULL,
                    month INT(2) NOT NULL,
                    year INT(4) NOT NULL,
                    usageCount INT(11)
                ) ENGINE = InnoDB",
				"ALTER TABLE user_website_usage ADD INDEX (websiteId, year, month, userId)",
			),
		),

		'website_record_usage' => array(
			'title' => 'Website Page Usage',
			'description' => 'Add a table to track how pages within indexed sites are viewed.',
			'continueOnError' => true,
			'sql' => array(
				"CREATE TABLE website_page_usage (
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    webPageId INT(11),
                    month INT(2) NOT NULL,
                    year INT(4) NOT NULL,
                    timesViewedInSearch INT(11) NOT NULL,
                    timesUsed INT(11) NOT NULL
                ) ENGINE = InnoDB",
				"ALTER TABLE website_page_usage ADD INDEX (webPageId, year, month)",
			),
		),
	);
}