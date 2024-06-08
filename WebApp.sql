-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 08, 2024 at 02:23 PM
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
-- Database: `WebApp`
--

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `uuid` char(36) NOT NULL,
  `owner_uuid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `format` varchar(255) DEFAULT NULL,
  `content` blob DEFAULT NULL,
  `root_document_uuid` char(36) DEFAULT NULL,
  `is_folder` tinyint(1) NOT NULL DEFAULT 0,
  `creation_date` date NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` date NOT NULL DEFAULT current_timestamp(),
  `last_accessed_date` date NOT NULL DEFAULT current_timestamp(),
  `size` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `storage` float NOT NULL,
  `cost` float NOT NULL,
  `plan_name` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `storage`, `cost`, `plan_name`) VALUES
(0, 100, 0, 'Default Plan'),
(1, 500, 2, 'Plan Mini'),
(2, 2000, 6, 'Plan Medium'),
(3, 10000, 25, 'Plan Max');

-- --------------------------------------------------------

--
-- Table structure for table `shared_documents`
--

CREATE TABLE `shared_documents` (
  `shared_document_id` int(11) NOT NULL,
  `document_uuid` char(36) NOT NULL,
  `user_uuid` char(36) NOT NULL,
  `permission` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uuid` char(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `creation_date` date NOT NULL DEFAULT current_timestamp(),
  `plan_id` int(11) NOT NULL DEFAULT 0,
  `plan_start_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uuid`, `username`, `password`, `creation_date`, `plan_id`, `plan_start_date`) VALUES
('243845c1-0d35-11ef-ae77-d8bbc11f35ba', 'botko', 'c96a48fc2b8ab70a74f994a3d97827b37a9c8333', '2024-05-08', 1, '2024-05-08'),
('7c63b760-2591-11ef-8c9e-b48c9d01efa1', 'anton', '$2y$10$drJpwaHkr79zcX7Rcmh3GeFrjawdaZvYnT9X.17v2EhZ.KE63teyi', '2024-06-08', 0, '2024-06-08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `users_uuid` (`owner_uuid`),
  ADD UNIQUE KEY `documents_uuid` (`uuid`) USING BTREE,
  ADD UNIQUE KEY `root_document_uuid` (`root_document_uuid`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shared_documents`
--
ALTER TABLE `shared_documents`
  ADD PRIMARY KEY (`shared_document_id`) USING BTREE,
  ADD UNIQUE KEY `user_uuid` (`user_uuid`) USING BTREE,
  ADD UNIQUE KEY `documents_uuid` (`document_uuid`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `users_uuid` (`uuid`) USING BTREE,
  ADD KEY `plan_id` (`plan_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `shared_documents`
--
ALTER TABLE `shared_documents`
  MODIFY `shared_document_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`owner_uuid`) REFERENCES `users` (`uuid`),
  ADD CONSTRAINT `documents_ibfk_2` FOREIGN KEY (`root_document_uuid`) REFERENCES `documents` (`uuid`);

--
-- Constraints for table `shared_documents`
--
ALTER TABLE `shared_documents`
  ADD CONSTRAINT `shared_documents_ibfk_1` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`uuid`),
  ADD CONSTRAINT `shared_documents_ibfk_2` FOREIGN KEY (`document_uuid`) REFERENCES `documents` (`uuid`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
