-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2023 at 04:24 PM
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
  `view_id` text NOT NULL,
  `farmer_id` int(11) NOT NULL,
  `laboratory_id` int(11) NOT NULL,
  `species` text NOT NULL,
  `campaign` text NOT NULL,
  `germination` decimal(4,4) NOT NULL COMMENT 'In percent',
  `variety` text NOT NULL,
  `batch_number` int(11) NOT NULL,
  `purity` decimal(4,4) NOT NULL,
  `info` text NOT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT 0,
  `creation_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_certificate`
--

INSERT INTO `t_certificate` (`id`, `view_id`, `farmer_id`, `laboratory_id`, `species`, `campaign`, `germination`, `variety`, `batch_number`, `purity`, `info`, `accepted`, `creation_date`) VALUES
(3, '2222', 1, 1, 'Millet', '2019-2020', '0.9800', 'Tooniou C1 TEST', 0, '0.9960', '', 0, '2023-04-23 18:18:47'),
(5, '88544', 1, 1, 'Millet', '2019-2020', '0.9800', 'Tooniou C1', 31, '0.9960', '', 0, '2023-04-23 18:24:11'),
(6, '97980', 1, 1, 'Millet', '2019-2020', '0.9800', 'Tooniou C1', 31, '0.9960', '', 0, '2023-05-01 12:24:54'),
(7, '18580', 1, 1, 'Millet', '2019-2020', '0.9800', 'Tooniou C1', 31, '0.9960', '', 0, '2023-05-01 12:42:29'),
(8, '29573', 6, 1, 'Millet', '2019-2020', '0.9800', 'Tooniou C1', 31, '0.9960', '', 0, '2023-05-01 12:42:32'),
(9, '65458', 6, 1, 'Millet', '2019-2020', '0.9800', 'Tooniou C1', 31, '0.9960', '', 0, '2023-05-01 12:42:33'),
(10, '67322', 6, 1, 'Millet', '2019-2020', '0.9800', 'Tooniou C1', 31, '0.9960', '', 0, '2023-05-01 12:44:46'),
(11, '81549', 6, 1, 'Millet', '2019-2020', '0.9800', 'Tooniou C1', 31, '0.9960', '', 0, '2023-05-01 12:44:56'),
(12, '57890', 6, 1, 'Millet', '2019-2020', '0.9800', 'Tooniou C1', 31, '0.9960', '', 0, '2023-05-01 12:45:03'),
(13, '21371', 6, 1, 'Millet', '2019-2020', '0.0000', 'Tooniou C1', 31, '0.9960', '', 0, '2023-05-01 12:45:12'),
(14, '77488', 6, 1, 'Millet', '2019-2020', '0.0000', 'Tooniou C1', 31, '0.9960', '', 0, '2023-05-01 12:45:17'),
(15, '32210', 6, 1, 'Millet', '2019-2020', '0.2200', 'Tooniou C1', 31, '0.9960', '', 0, '2023-05-01 12:45:29'),
(16, '38153', 5, 1, 'asd', 'sad', '0.5500', 'adas', 55, '0.5500', '', 0, '2023-05-01 12:52:36');

-- --------------------------------------------------------

--
-- Table structure for table `t_user_farmer`
--

CREATE TABLE `t_user_farmer` (
  `id` int(11) NOT NULL,
  `phone` text NOT NULL,
  `pin` text NOT NULL,
  `language` text NOT NULL,
  `signup_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_user_farmer`
--

INSERT INTO `t_user_farmer` (`id`, `phone`, `pin`, `language`, `signup_date`) VALUES
(1, '081273912321', '1231', 'fr', '2023-04-23 18:13:06'),
(2, '123123', '1232', '', '2023-05-01 12:26:50'),
(3, '12312332', '1234', '', '2023-05-01 12:28:25'),
(4, '213123', '1233', '', '2023-05-01 12:36:34'),
(5, '123213', '1233', '', '2023-05-01 12:37:25'),
(6, '08127333912321', '1231', '', '2023-05-01 12:42:32');

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
-- Dumping data for table `t_user_laboratory`
--

INSERT INTO `t_user_laboratory` (`id`, `username`, `password`, `signup_date`) VALUES
(1, 'lb1', 'test', '2023-04-23 18:04:29');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `t_user_farmer`
--
ALTER TABLE `t_user_farmer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `t_user_laboratory`
--
ALTER TABLE `t_user_laboratory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
