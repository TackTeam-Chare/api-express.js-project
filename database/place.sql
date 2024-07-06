-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2024 at 09:04 AM
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
-- Database: `place`
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

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `name`) VALUES
(1, 'admin1', 'password1', 'Admin One'),
(2, 'admin2', 'password2', 'Admin Two'),
(41, 'Admin_Team', '$2a$10$QfnOHvjGG8K5oQ8FM24KeeAmREb2Y.v/FpvARK2BCHTcFRXs/5N02', 'TackTeam'),
(42, 'Admin_Team', '$2a$10$Tx1qKMtUDWAtx94iDfRGJOwpQDfhze7zlT7opZQFDZOXhhdOrAWOa', 'TackTeam'),
(43, 'Admin_Team', '$2a$10$L2SJqSxTtW3mPteGekmdpeqVvMzaGF1gv6tQd4GH0ReQZNa5RPTHi', 'TackTeam'),
(44, 'Team', '$2a$10$EOM6y65qxAopFiUieuOC8eYuO/ciIb/S2IuwMsrGzyFYdsxciKJ/C', 'New Admin'),
(45, 'Team', '$2a$10$e2YJNEfbrFJFkg3e9Q1jNeKDqSayrjDHrh81nZ4GL/Ccg2uTn.Nv.', 'New Admin'),
(46, 'Team', '$2a$10$/S6HvJmV0Bi1/S9R2Vxtb.35vtshMPWUqDqf/n2ck2Kl3wlLZ8nSm', 'New Admin'),
(47, 'Team', '$2a$10$/cEFSdqbzv2gVnGtOIBSP.VP0vOCDQh0LhK1rENagXwNU8rXRybuq', 'New Admin'),
(48, 'Team', '$2a$10$tUG5lrSYPfYpvuoe4VKu8O4Ex5PUXWQZuaN..5s9BjDZqMpjcP4QS', 'New Admin'),
(49, 'Team', '$2a$10$FptUssEeyrBehkvvcamNd.n0a7eC4xOQ7sVI5ynW3PtZZ5ROJC0j2', 'New Admin'),
(50, 'Team', '$2a$10$BuKLRFdjvGIrLrQwCLIQ6..zU7iRUfj2kBQxpF3y8z/g6OnTDgTKu', 'New Admin'),
(51, 'Team', '$2a$10$49z3icbdGe9t/ypUHjehXO4aVLnkmu/7yLrh3RFvMn61MlPZXLQg6', 'New Admin'),
(52, 'Team', '$2a$10$iIOaWNT06tSTzHTx1gmKTOlk4MwWBhoq4g28/7bUhqm05/5PhFEFq', 'New Admin'),
(53, 'Team', '$2a$10$BEETNYoNuXJ5b39U6dpkSuYwA4iwc5gONe9BSSMES9bKnzq5Ip8qi', 'New Admin'),
(54, 'Team', '$2a$10$tfQ6ipYD94Lq8KRgvW2OMOmhD1cITFG14/VNA/OWJ90A.dwQGMJha', 'New Admin'),
(55, 'Team', '$2a$10$Id2A8Jk/7cNgglxcEM2q9OkuS0ONP6V4zVh6EEfsdSsDT2jaNlGva', 'New Admin'),
(56, 'Team', '$2a$10$VFyyaHXSZZzp.kp73Bfy1OapRzGFwdHo0EllpzSjz4Z4SPTU0NDne', 'New Admin'),
(57, 'Team', '$2a$10$cpBLRHMfVWZPFLCeADwTP.UtznmWnRHZHDT58hCQcc2tGL7S3zeiK', 'New Admin'),
(58, 'Team', '$2a$10$wx/Hks3nDYsNy1dq6drPTuLeCGYboHjcJFVgyJdqiKKfVdXtxFrvC', 'New Admin'),
(59, 'Team', '$2a$10$KckRivF2LGEKoADc/WroW..IxI5yu2MVYJzR0wIo651zadOabS4xa', 'New Admin'),
(60, 'Team', '$2a$10$DKNdZfTdiJQK3QBGHe0wvuuyjJMV2Tr2Nt3d0zvkBLqQzQ4l0fRpW', 'New Admin'),
(61, 'Team', '$2a$10$fSI.FGwLz8.a/peoHK4MCOciiQR6dUM6OIupjvYDAIk3GuqcG/BpS', 'New Admin'),
(62, 'Team', '$2a$10$HZLw3dC0JqCyjd6MeD10KeeU0FMBd8vheGGO0f0x0Q3.1yZkZy/jm', 'New Admin'),
(63, 'Team', '$2a$10$wCqLd.xLPN3fpRun8gqMoOepNh9usFTixA0pEl5smvff9MCcO208.', 'New Admin'),
(64, 'TackTeam', '$2a$10$LTHkfhjWpWj5bBSd0B41UOoSNbhX0vnGMUVJrxWaSLVifO/Paa6Ze', 'New Admin'),
(65, 'TackTeam', '$2a$10$ZTo1W9/Vu67VYPiRoAfbzef/58/Y7uhdKTrQZcuz0EyJff7cqm4N2', 'New Admin'),
(66, 'TackTeam', '$2a$10$2osVY58ZWEL7uTKSZGtBvOktyryYNfw5qqQ.7DRNWjz5It2IeNYsy', 'New Admin'),
(67, 'TackTeam', '$2a$10$0QO6tU0K.cgiQ1UPQJ5zC..UEb9VbU4LT5wQQtOFOs/gorbL1Q3fm', 'New Admin');

-- --------------------------------------------------------

--
-- Table structure for table `admin_tokens`
--

CREATE TABLE `admin_tokens` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `token` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `admin_tokens`
--

INSERT INTO `admin_tokens` (`id`, `admin_id`, `token`, `created_at`) VALUES
(40, 44, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsInVzZXJuYW1lIjoiVGVhbSIsImlhdCI6MTcxODk0Njc4MiwiZXhwIjoxNzE4OTUwMzgyfQ.zwWSF8YdMFAUdJ-U_ArIZR_tfAlnhW0icWP33HAgID4', '2024-06-21 05:13:02'),
(41, 57, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTcsInVzZXJuYW1lIjoiVGVhbSIsImlhdCI6MTcxODk0NTg1NiwiZXhwIjoxNzE4OTQ5NDU2fQ.zr1CG8k1Y1Bq3S02FBydViESTdvUxXLIB3nrsP-OSm0', '2024-06-21 04:57:36'),
(42, 58, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgsInVzZXJuYW1lIjoiVGVhbSIsImlhdCI6MTcxODk0NTg1NywiZXhwIjoxNzE4OTQ5NDU3fQ._FITYL1xf8B0w4bhs8zptox88LsNwZ4cLbCDR0IDtiQ', '2024-06-21 04:57:37'),
(43, 59, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTksInVzZXJuYW1lIjoiVGVhbSIsImlhdCI6MTcxODk0NTg5MSwiZXhwIjoxNzE4OTQ5NDkxfQ.x7rrC0zy1UKt2cSm17UCwSm8yosusDyIUrASASouCik', '2024-06-21 04:58:11'),
(44, 60, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAsInVzZXJuYW1lIjoiVGVhbSIsImlhdCI6MTcxODk0NTk4OCwiZXhwIjoxNzE4OTQ5NTg4fQ.Bbx0QxS7YFLMthm-5uq4WaWhJz3J6SCciJZ1hmPosEE', '2024-06-21 04:59:48'),
(45, 44, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsInVzZXJuYW1lIjoiVGVhbSIsImlhdCI6MTcxODk0Njc4MiwiZXhwIjoxNzE4OTUwMzgyfQ.zwWSF8YdMFAUdJ-U_ArIZR_tfAlnhW0icWP33HAgID4', '2024-06-21 05:13:02'),
(47, 44, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsInVzZXJuYW1lIjoiVGVhbSIsImlhdCI6MTcxODk0NjgwNiwiZXhwIjoxNzE4OTUwNDA2fQ.AxXc7WT5ojdBplClNKBwCAIgb1AzHkqd7JHsgRHUSjo', '2024-06-21 05:13:26'),
(48, 62, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjIsInVzZXJuYW1lIjoiVGVhbSIsImlhdCI6MTcxODk0NjgxNiwiZXhwIjoxNzE4OTUwNDE2fQ.wNEnrf31W750NTxNKIZljVDCQDcvhLHPHEHhUH136Ew', '2024-06-21 05:13:36'),
(51, 63, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInVzZXJuYW1lIjoiVGVhbSIsImlhdCI6MTcxODk0Njk0NSwiZXhwIjoxNzE4OTUwNTQ1fQ.vAl4HqH-YqE-D4nMjRO-5CMmJmxAV3yfIYU1HuQPi0A', '2024-06-21 05:15:45'),
(52, 64, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInVzZXJuYW1lIjoiVGFja1RlYW0iLCJpYXQiOjE3MTg5NDczNTEsImV4cCI6MTcxODk1MDk1MX0.dlXNsQ4ZoyfC3S_I7mWkMmM_tKy5CTCKphgZElJJlF8', '2024-06-21 05:22:31'),
(55, 64, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInVzZXJuYW1lIjoiVGFja1RlYW0iLCJpYXQiOjE3MTg5NDc2ODAsImV4cCI6MTcxODk1MTI4MH0.V1iqVcCQ1IP4tLVFJ-Q7iBA26Yj6c6Qkzv397-zLNls', '2024-06-21 05:28:00'),
(57, 64, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInVzZXJuYW1lIjoiVGFja1RlYW0iLCJpYXQiOjE3MTg5NDc4MTAsImV4cCI6MTcxODk1MTQxMH0.HNrvLJpgTvmheoqNv-awV07w9PPH9yPrelJvHk7mEQI', '2024-06-21 05:30:10'),
(59, 64, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInVzZXJuYW1lIjoiVGFja1RlYW0iLCJpYXQiOjE3MTg5NDc4NzgsImV4cCI6MTcxODk1MTQ3OH0.2GvELStYbMlPhYUuBApDIt6lyJweQV7jAPjYCEzu4fc', '2024-06-21 05:31:18'),
(60, 64, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInVzZXJuYW1lIjoiVGFja1RlYW0iLCJpYXQiOjE3MTg5NDc5NjEsImV4cCI6MTcxODk1MTU2MX0.UnA2iv2Dh9vRJy0pVfYaHXGwru_UUy59R90s_ooz-nU', '2024-06-21 05:32:41'),
(61, 64, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInVzZXJuYW1lIjoiVGFja1RlYW0iLCJpYXQiOjE3MTg5NDg0NjQsImV4cCI6MTcxODk1MjA2NH0.142M6c8k98UQzAWFv0KjlvGAHRBfNcH60WJimM17Jjk', '2024-06-21 05:41:04'),
(62, 67, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsInVzZXJuYW1lIjoiVGFja1RlYW0iLCJpYXQiOjE3MTg5NDg0NjYsImV4cCI6MTcxODk1MjA2Nn0.sk3ps3veUM5F_-PaC8iX4L5apMvmoorTEdY1M5lXtVE', '2024-06-21 05:41:06');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Nature'),
(2, 'Historic'),
(3, 'Entertainment');

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `id` int(5) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`id`, `name`) VALUES
(1, 'District A'),
(2, 'District B'),
(3, 'District C');

-- --------------------------------------------------------

--
-- Table structure for table `operating_hours`
--

CREATE TABLE `operating_hours` (
  `id` int(7) NOT NULL,
  `place_id` int(7) NOT NULL,
  `day_of_week` enum('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') NOT NULL,
  `opening_time` time DEFAULT NULL,
  `closing_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `operating_hours`
--

INSERT INTO `operating_hours` (`id`, `place_id`, `day_of_week`, `opening_time`, `closing_time`) VALUES
(1, 1, 'Monday', '09:00:00', '17:00:00'),
(3, 3, 'Wednesday', '11:00:00', '19:00:00'),
(4, 1, 'Monday', '09:00:00', '18:00:00'),
(5, 1, 'Tuesday', '09:00:00', '18:00:00'),
(6, 1, 'Wednesday', '09:00:00', '18:00:00'),
(7, 1, 'Thursday', '09:00:00', '18:00:00'),
(8, 1, 'Friday', '09:00:00', '18:00:00'),
(9, 1, 'Saturday', '10:00:00', '16:00:00'),
(10, 1, 'Sunday', '10:00:00', '16:00:00'),
(16, 3, 'Monday', '08:00:00', '20:00:00'),
(17, 3, 'Tuesday', '08:00:00', '20:00:00'),
(18, 3, 'Wednesday', '08:00:00', '20:00:00'),
(19, 3, 'Thursday', '08:00:00', '20:00:00'),
(20, 3, 'Friday', '08:00:00', '20:00:00'),
(21, 3, 'Saturday', '08:00:00', '20:00:00'),
(22, 3, 'Sunday', '08:00:00', '20:00:00'),
(23, 1, 'Monday', '08:00:00', '18:00:00'),
(24, 1, 'Monday', '08:00:00', '18:00:00'),
(25, 1, 'Monday', '08:00:00', '18:00:00'),
(26, 1, 'Monday', '08:00:00', '18:00:00'),
(27, 1, 'Monday', '08:00:00', '18:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `seasons`
--

CREATE TABLE `seasons` (
  `id` int(7) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `seasons`
--

INSERT INTO `seasons` (`id`, `name`, `date_start`, `date_end`) VALUES
(1, 'Winter', '2023-12-01', '2024-02-28'),
(2, 'Summer', '2024-06-01', '2024-08-31');

-- --------------------------------------------------------

--
-- Table structure for table `seasons_relation`
--

CREATE TABLE `seasons_relation` (
  `id` int(7) NOT NULL,
  `season_id` int(7) NOT NULL,
  `tourism_entities_id` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `seasons_relation`
--

INSERT INTO `seasons_relation` (`id`, `season_id`, `tourism_entities_id`) VALUES
(1, 1, 1),
(3, 1, 3),
(4, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tourism_entities_images`
--

CREATE TABLE `tourism_entities_images` (
  `id` int(7) NOT NULL,
  `tourism_entities_id` int(7) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tourism_entities_images`
--

INSERT INTO `tourism_entities_images` (`id`, `tourism_entities_id`, `image_path`) VALUES
(1, 1, 'https://images.pexels.com/photos/26756097/pexels-photo-26756097/free-photo-of-a-woman-reading-a-book-on-a-couch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(3, 3, 'https://img.freepik.com/free-photo/vibrant-colors-nature-close-up-wet-purple-daisy-generated-by-artificial-intellingence_25030-63819.jpg'),
(4, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyM-yCOC2PAE9mlYLnNXkA0XkY7-cpYUQ3Ig&s'),
(5, 5, 'https://s359.kapook.com/pagebuilder/43d32ae1-f9ac-4109-9423-9992eb095946.jpg'),
(6, 6, 'https://en.npu.ac.th/wisdom/wp-content/uploads/P9070113.jpg'),
(7, 7, 'https://media-cdn.tripadvisor.com/media/photo-s/05/5f/32/aa/caption.jpg'),
(8, 8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MiwiK9_F1TqUUM1f2wgwAI9CghYaILKI6fbawNfngVmiWO96_IYb8M78pnnpUAW0OhI&usqp=CAU'),
(9, 9, 'https://img.wongnai.com/p/1920x0/2018/06/04/5f28c199fb214dafbafd96759d82116e.jpg'),
(10, 10, 'https://thainews.prd.go.th/_next/image/?url=https%3A%2F%2Fnnt-storage-thainews.prd.go.th%2Fmedia-news%2Fraw%2F2024%2F02%2F08%2F5be8542f24611d8dfa053f1571b7bcdd.jpg&w=3840&q=75'),
(11, 11, 'https://s359.kapook.com/pagebuilder/a012ef60-09d5-4792-b661-c6f01e1e29bf.jpg'),
(12, 12, 'https://thainews.prd.go.th/_next/image/?url=https%3A%2F%2Fnnt-storage-thainews.prd.go.th%2Fmedia-news%2Fraw%2F2024%2F02%2F08%2F5be8542f24611d8dfa053f1571b7bcdd.jpg&w=3840&q=75'),
(13, 13, 'https://www.dhammathai.org/day/pic/buchaphrathatphanom.jpg'),
(14, 14, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGBDB81YkDrdfTjZr4uJpOBYvx3EgXy3besS9wOIvbNDWMPn7g2_pbbshQZQGwT4vTtI&usqp=CAU'),
(15, 15, 'https://nkr.mcu.ac.th/tour/wp-content/uploads/2015/03/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%95%E0%B8%B8%E0%B8%9E%E0%B8%99%E0%B8%A1%E0%B8%A2%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B9%88%E0%B8%B3%E0%B8%84%E0%B8%B7%E0%B8%991.jpg'),
(16, 16, 'https://img.wongnai.com/p/1920x0/2018/06/04/5f28c199fb214dafbafd96759d82116e.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tourist_entities`
--

CREATE TABLE `tourist_entities` (
  `id` int(7) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `district_id` int(5) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tourist_entities`
--

INSERT INTO `tourist_entities` (`id`, `name`, `description`, `location`, `latitude`, `longitude`, `district_id`, `category_id`, `created_date`, `created_by`) VALUES
(1, 'Place 1', 'Description for Place 1', 'Location 1', 13.75630000, 100.50180000, 1, 1, '2024-06-20 22:28:58', 1),
(3, 'Place 3', 'Description for Place 3', 'Location 3', 13.72910000, 100.54070000, 3, 3, '2024-06-20 22:28:58', 1),
(4, 'Place 4', 'Description for Place 4', 'Location 4', 13.75630000, 100.50180000, 1, 1, '2024-06-20 23:24:36', 1),
(5, 'Place 5', 'Description for Place 5', 'Location 5', 13.75630000, 100.51180000, 1, 1, '2024-06-20 23:24:36', 1),
(6, 'Place 6', 'Description for Place 6', 'Location 6', 13.76630000, 100.50180000, 1, 1, '2024-06-20 23:24:36', 1),
(7, 'Place 7', 'Description for Place 7', 'Location 7', 13.77630000, 100.50180000, 1, 1, '2024-06-20 23:24:36', 1),
(8, 'Place 8', 'Description for Place 8', 'Location 8', 13.75630000, 100.52180000, 1, 1, '2024-06-20 23:24:36', 1),
(9, 'Place 9', 'Description for Place 9', 'Location 9', 13.78630000, 100.50180000, 1, 1, '2024-06-20 23:24:36', 1),
(10, 'Place 10', 'Description for Place 10', 'Location 10', 13.75630000, 100.53180000, 1, 1, '2024-06-20 23:24:36', 1),
(11, 'Place 11', 'Description for Place 11', 'Location 11', 13.79630000, 100.50180000, 1, 1, '2024-06-20 23:24:36', 1),
(12, 'Place 12', 'Description for Place 12', 'Location 12', 13.75630000, 100.54180000, 1, 1, '2024-06-20 23:24:36', 1),
(13, 'Place 13', 'Description for Place 13', 'Location 13', 13.80630000, 100.50180000, 1, 1, '2024-06-20 23:24:36', 1),
(14, 'Place 14', 'Description for Place 14', 'Location 14', 13.75630000, 100.55180000, 1, 1, '2024-06-20 23:24:36', 1),
(15, 'Place 15', 'Description for Place 15', 'Location 15', 13.85630000, 100.50180000, 1, 1, '2024-06-20 23:24:36', 1),
(16, 'Place 16', 'Description for Place 16', 'Location 16', 13.75630000, 100.60180000, 1, 1, '2024-06-20 23:24:36', 1);

--
-- Indexes for dumped tables
--

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
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operating_hours`
--
ALTER TABLE `operating_hours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `place_id` (`place_id`);

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
  ADD KEY `season_id` (`season_id`),
  ADD KEY `tourism_entities_id` (`tourism_entities_id`);

--
-- Indexes for table `tourism_entities_images`
--
ALTER TABLE `tourism_entities_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tourism_entities_id` (`tourism_entities_id`);

--
-- Indexes for table `tourist_entities`
--
ALTER TABLE `tourist_entities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `district_id` (`district_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `created_by` (`created_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `admin_tokens`
--
ALTER TABLE `admin_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `operating_hours`
--
ALTER TABLE `operating_hours`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `seasons`
--
ALTER TABLE `seasons`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `seasons_relation`
--
ALTER TABLE `seasons_relation`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tourism_entities_images`
--
ALTER TABLE `tourism_entities_images`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tourist_entities`
--
ALTER TABLE `tourist_entities`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_tokens`
--
ALTER TABLE `admin_tokens`
  ADD CONSTRAINT `admin_tokens_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `operating_hours`
--
ALTER TABLE `operating_hours`
  ADD CONSTRAINT `operating_hours_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `tourist_entities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `seasons_relation`
--
ALTER TABLE `seasons_relation`
  ADD CONSTRAINT `seasons_relation_ibfk_1` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`),
  ADD CONSTRAINT `seasons_relation_ibfk_2` FOREIGN KEY (`tourism_entities_id`) REFERENCES `tourist_entities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tourism_entities_images`
--
ALTER TABLE `tourism_entities_images`
  ADD CONSTRAINT `tourism_entities_images_ibfk_1` FOREIGN KEY (`tourism_entities_id`) REFERENCES `tourist_entities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tourist_entities`
--
ALTER TABLE `tourist_entities`
  ADD CONSTRAINT `tourist_entities_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`),
  ADD CONSTRAINT `tourist_entities_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `tourist_entities_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `admin` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
