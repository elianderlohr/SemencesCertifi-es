-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2023 at 06:26 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ict4d`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_certificate`
--

CREATE TABLE `t_certificate` (
  `id` int(11) NOT NULL,
  `view_id` int(11) NOT NULL,
  `farmer_id` int(11) NOT NULL,
  `laboratory_id` int(11) NOT NULL,
  `species` text NOT NULL,
  `campaign` text NOT NULL,
  `germination` decimal(4,4) NOT NULL COMMENT 'In percent',
  `variety` text NOT NULL,
  `batch_number` int(11) NOT NULL,
  `purity` decimal(4,4) NOT NULL,
  `info` text NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_faq`
--

CREATE TABLE `t_faq` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_user_farmer`
--

CREATE TABLE `t_user_farmer` (
  `id` int(11) NOT NULL,
  `phone` text NOT NULL,
  `pin` int(11) NOT NULL,
  `signup_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_user_laboratory`
--

CREATE TABLE `t_user_laboratory` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `signup_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_certificate`
--
ALTER TABLE `t_certificate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `farmer_id` (`farmer_id`),
  ADD KEY `labratory_id` (`laboratory_id`);

--
-- Indexes for table `t_user_farmer`
--
ALTER TABLE `t_user_farmer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_user_laboratory`
--
ALTER TABLE `t_user_laboratory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_certificate`
--
ALTER TABLE `t_certificate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_user_farmer`
--
ALTER TABLE `t_user_farmer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_user_laboratory`
--
ALTER TABLE `t_user_laboratory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `t_certificate`
--
ALTER TABLE `t_certificate`
  ADD CONSTRAINT `t_certificate_ibfk_1` FOREIGN KEY (`farmer_id`) REFERENCES `t_user_farmer` (`id`),
  ADD CONSTRAINT `t_certificate_ibfk_2` FOREIGN KEY (`laboratory_id`) REFERENCES `t_user_laboratory` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
