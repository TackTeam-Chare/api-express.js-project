-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2024 at 01:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `place_test_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(7) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_tokens`
--

CREATE TABLE `admin_tokens` (
  `id` int(11) NOT NULL,
  `admin_id` int(7) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `amphures`
--

CREATE TABLE `amphures` (
  `id` int(5) NOT NULL,
  `code` varchar(4) NOT NULL,
  `name_th` varchar(150) NOT NULL,
  `name_en` varchar(150) NOT NULL,
  `province_id` int(5) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--

CREATE TABLE `geographies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='InnoDB free: 8192 kB';

CREATE TABLE `operating_hours` (
  `id` int(11) NOT NULL,
  `tourism_entities_id` int(7) NOT NULL,
  `day_of_week` varchar(20) NOT NULL,
  `opening_time` time NOT NULL,
  `closing_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `provinces` (
  `id` int(5) NOT NULL,
  `code` varchar(2) NOT NULL,
  `name_th` varchar(150) NOT NULL,
  `name_en` varchar(150) NOT NULL,
  `geography_id` int(5) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `seasons` (
  `id` int(7) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

CREATE TABLE `districts` (
  `id` varchar(6) NOT NULL,
  `zip_code` int(11) NOT NULL,
  `name_th` varchar(150) NOT NULL,
  `name_en` varchar(150) NOT NULL,
  `amphure_id` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='InnoDB free: 8192 kB';

CREATE TABLE `seasons_relation` (
  `id` int(7) NOT NULL,
  `season_id` int(7) NOT NULL,
  `tourism_entities_id` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



CREATE TABLE `tourism_entities` (
  `id` int(7) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `open_time` time DEFAULT NULL,
  `close_time` time DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `district_id` int(5) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` int(7) NOT NULL,
  `season_id` int(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


CREATE TABLE `tourism_entities_images` (
  `id` int(7) NOT NULL,
  `tourism_entities_id` int(7) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--
CREATE TABLE `tourism_entities` (
  `id` int(7) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `open_time` time DEFAULT NULL,
  `close_time` time DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `district_id` int(5) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` int(7) NOT NULL,
  `season_id` int(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_tokens`
--
ALTER TABLE `admin_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_admin_tokens_admin` (`admin_id`);

--
-- Indexes for table `amphures`
--
ALTER TABLE `amphures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `geographies`
--
ALTER TABLE `geographies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operating_hours`
--
ALTER TABLE `operating_hours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_operating_hours_tourism_entities` (`tourism_entities_id`);

--
-- Indexes for table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seasons`
--
ALTER TABLE `seasons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seasons_relation`
--
ALTER TABLE `seasons_relation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_seasons_relation_season` (`season_id`),
  ADD KEY `fk_seasons_relation_tourism_entities` (`tourism_entities_id`);

--
-- Indexes for table `tourism_entities`
--
ALTER TABLE `tourism_entities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tourism_entities_images`
--
ALTER TABLE `tourism_entities_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tourism_entities_images` (`tourism_entities_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin_tokens`
--
ALTER TABLE `admin_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `amphures`
--
ALTER TABLE `amphures`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1007;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `geographies`
--
ALTER TABLE `geographies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `operating_hours`
--
ALTER TABLE `operating_hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `seasons`
--
ALTER TABLE `seasons`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seasons_relation`
--
ALTER TABLE `seasons_relation`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tourism_entities`
--
ALTER TABLE `tourism_entities`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tourism_entities_images`
--
ALTER TABLE `tourism_entities_images`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_tokens`
--
ALTER TABLE `admin_tokens`
  ADD CONSTRAINT `fk_admin_tokens_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`);

--
-- Constraints for table `operating_hours`
--
ALTER TABLE `operating_hours`
  ADD CONSTRAINT `fk_operating_hours_tourism_entities` FOREIGN KEY (`tourism_entities_id`) REFERENCES `tourism_entities` (`id`);

--
-- Constraints for table `seasons_relation`
--
ALTER TABLE `seasons_relation`
  ADD CONSTRAINT `fk_seasons_relation_season` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`),
  ADD CONSTRAINT `fk_seasons_relation_tourism_entities` FOREIGN KEY (`tourism_entities_id`) REFERENCES `tourism_entities` (`id`);

--
-- Constraints for table `tourism_entities_images`
--
ALTER TABLE `tourism_entities_images`
  ADD CONSTRAINT `fk_tourism_entities_images` FOREIGN KEY (`tourism_entities_id`) REFERENCES `tourism_entities` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
