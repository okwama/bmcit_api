-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 04, 2025 at 09:02 AM
-- Server version: 10.6.23-MariaDB-cll-lve
-- PHP Version: 8.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `impulsep_mybm`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_type`
--

CREATE TABLE `admin_type` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `atms`
--

CREATE TABLE `atms` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `atm_code` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `atm_cash_counts`
--

CREATE TABLE `atm_cash_counts` (
  `id` int(11) NOT NULL,
  `fifties` int(11) NOT NULL,
  `hundreds` int(11) NOT NULL,
  `twoHundreds` int(11) NOT NULL,
  `fiveHundreds` int(11) NOT NULL,
  `thousands` int(11) NOT NULL,
  `totalAmount` int(11) NOT NULL DEFAULT 0,
  `sealNumber` varchar(191) DEFAULT NULL,
  `imagePath` varchar(191) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `request_id` int(11) DEFAULT NULL,
  `fives` int(11) NOT NULL,
  `ones` int(11) NOT NULL,
  `tens` int(11) NOT NULL,
  `twenties` int(11) NOT NULL,
  `forties` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `atm_counters`
--

CREATE TABLE `atm_counters` (
  `id` int(11) NOT NULL,
  `atm_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `counter_number` varchar(50) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `team_id` int(11) NOT NULL,
  `crew_commander_id` int(11) DEFAULT NULL,
  `request_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `atm_loading`
--

CREATE TABLE `atm_loading` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `atm_id` int(11) NOT NULL,
  `ones` int(11) DEFAULT 0,
  `fives` int(11) DEFAULT 0,
  `tens` int(11) DEFAULT 0,
  `twenties` int(11) DEFAULT 0,
  `forties` int(11) DEFAULT 0,
  `fifties` int(11) DEFAULT 0,
  `hundreds` int(11) DEFAULT 0,
  `twoHundreds` int(11) DEFAULT 0,
  `fiveHundreds` int(11) DEFAULT 0,
  `thousands` int(11) DEFAULT 0,
  `total_amount` decimal(15,2) NOT NULL,
  `loading_date` date NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `contact_number` varchar(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cash_counts`
--

CREATE TABLE `cash_counts` (
  `id` int(11) NOT NULL,
  `fifties` int(11) NOT NULL,
  `hundreds` int(11) NOT NULL,
  `twoHundreds` int(11) NOT NULL,
  `fiveHundreds` int(11) NOT NULL,
  `thousands` int(11) NOT NULL,
  `totalAmount` int(11) NOT NULL DEFAULT 0,
  `sealNumber` varchar(191) DEFAULT NULL,
  `imagePath` varchar(191) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `request_id` int(11) DEFAULT NULL,
  `fives` int(11) NOT NULL,
  `ones` int(11) NOT NULL,
  `tens` int(11) NOT NULL,
  `twenties` int(11) NOT NULL,
  `forties` int(11) NOT NULL,
  `status` enum('pending','received') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cash_counts_bm`
--

CREATE TABLE `cash_counts_bm` (
  `id` int(11) NOT NULL,
  `fifties` int(11) NOT NULL,
  `hundreds` int(11) NOT NULL,
  `twoHundreds` int(11) NOT NULL,
  `fiveHundreds` int(11) NOT NULL,
  `thousands` int(11) NOT NULL,
  `totalAmount` int(11) NOT NULL DEFAULT 0,
  `sealNumber` varchar(191) DEFAULT NULL,
  `imagePath` varchar(191) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `request_id` int(11) DEFAULT NULL,
  `fives` int(11) NOT NULL,
  `ones` int(11) NOT NULL,
  `tens` int(11) NOT NULL,
  `twenties` int(11) NOT NULL,
  `forties` int(11) NOT NULL,
  `status` enum('pending','received') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cash_orders`
--

CREATE TABLE `cash_orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `denominations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`denominations`)),
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','approved','rejected','completed') DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cash_processing`
--

CREATE TABLE `cash_processing` (
  `id` int(11) NOT NULL,
  `cash_count_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `expected_total` decimal(15,2) NOT NULL,
  `processed_total` decimal(15,2) NOT NULL,
  `difference` decimal(15,2) NOT NULL,
  `matched` tinyint(1) DEFAULT 0,
  `expected_ones` int(11) DEFAULT 0,
  `expected_fives` int(11) DEFAULT 0,
  `expected_tens` int(11) DEFAULT 0,
  `expected_twenties` int(11) DEFAULT 0,
  `expected_forties` int(11) DEFAULT 0,
  `expected_fifties` int(11) DEFAULT 0,
  `expected_hundreds` int(11) DEFAULT 0,
  `expected_twoHundreds` int(11) DEFAULT 0,
  `expected_fiveHundreds` int(11) DEFAULT 0,
  `expected_thousands` int(11) DEFAULT 0,
  `processed_ones` int(11) DEFAULT 0,
  `processed_fives` int(11) DEFAULT 0,
  `processed_tens` int(11) DEFAULT 0,
  `processed_twenties` int(11) DEFAULT 0,
  `processed_forties` int(11) DEFAULT 0,
  `processed_fifties` int(11) DEFAULT 0,
  `processed_hundreds` int(11) DEFAULT 0,
  `processed_twoHundreds` int(11) DEFAULT 0,
  `processed_fiveHundreds` int(11) DEFAULT 0,
  `processed_thousands` int(11) DEFAULT 0,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `original_seal_number` varchar(255) DEFAULT NULL,
  `new_seal_number` varchar(255) DEFAULT NULL,
  `processed_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `account_number` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `type` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('client','admin') DEFAULT 'client'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client_update`
--

CREATE TABLE `client_update` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `type` enum('credit','debit') NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `new_balance` decimal(15,2) NOT NULL,
  `comment` text DEFAULT NULL,
  `ones` int(11) DEFAULT 0,
  `fives` int(11) DEFAULT 0,
  `tens` int(11) DEFAULT 0,
  `twenties` int(11) DEFAULT 0,
  `forties` int(11) DEFAULT 0,
  `fifties` int(11) DEFAULT 0,
  `hundreds` int(11) DEFAULT 0,
  `twoHundreds` int(11) DEFAULT 0,
  `fiveHundreds` int(11) DEFAULT 0,
  `thousands` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `transaction_date` date DEFAULT NULL,
  `atm_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `crew_locations`
--

CREATE TABLE `crew_locations` (
  `id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `captured_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `daily_runs`
--

CREATE TABLE `daily_runs` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `driver_name` varchar(255) NOT NULL,
  `vehicle_number` varchar(50) NOT NULL,
  `route` varchar(255) NOT NULL,
  `status` enum('pending','in_progress','completed','cancelled') DEFAULT 'pending',
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `delivery_completion`
--

CREATE TABLE `delivery_completion` (
  `id` int(11) NOT NULL,
  `requestId` int(11) NOT NULL,
  `completedById` int(11) NOT NULL,
  `completedByName` varchar(191) NOT NULL,
  `completedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `photoUrl` varchar(191) DEFAULT NULL,
  `bankDetails` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`bankDetails`)),
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `status` enum('pending','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
  `isVaultOfficer` tinyint(1) NOT NULL DEFAULT 0,
  `receivingOfficerId` int(11) DEFAULT NULL,
  `receivingOfficerName` varchar(191) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `sealNumberId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `inquiry_type` enum('general','service','billing','support','other') DEFAULT 'general',
  `status` enum('pending','in_progress','resolved','closed') DEFAULT 'pending',
  `priority` enum('low','medium','high') DEFAULT 'medium',
  `assigned_to` int(11) DEFAULT NULL,
  `response` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_transactions`
--

CREATE TABLE `inventory_transactions` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `amount_in` decimal(12,2) DEFAULT 0.00,
  `amount_out` decimal(12,2) DEFAULT 0.00,
  `balance` decimal(12,2) DEFAULT 0.00,
  `date_received` datetime NOT NULL,
  `store_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `processing_charges`
--

CREATE TABLE `processing_charges` (
  `id` int(11) NOT NULL,
  `cash_processing_id` int(11) NOT NULL,
  `total_amount` decimal(15,2) NOT NULL,
  `processing_fee_percentage` decimal(5,2) NOT NULL,
  `processing_fee_amount` decimal(15,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `processing_fees`
--

CREATE TABLE `processing_fees` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `fee_type` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `is_percentage` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(128) NOT NULL,
  `user_id` int(11) NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `device_info` varchar(255) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `pickup_location` varchar(255) NOT NULL,
  `delivery_location` varchar(255) NOT NULL,
  `pickup_date` datetime NOT NULL,
  `description` text DEFAULT NULL,
  `priority` enum('low','medium','high') DEFAULT 'medium',
  `my_status` tinyint(4) DEFAULT 0,
  `client_name` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `staff_id` int(11) DEFAULT NULL,
  `atm_id` int(11) DEFAULT NULL,
  `staff_name` varchar(191) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `sealNumberId` int(11) DEFAULT NULL,
  `destination_type` enum('vault','bank') DEFAULT 'vault'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seals`
--

CREATE TABLE `seals` (
  `id` int(11) NOT NULL,
  `seal_number` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `confirmed` tinyint(1) NOT NULL DEFAULT 0,
  `confirmed_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `confirmed_by_id` int(11) NOT NULL,
  `status` enum('broken','assigned','re_assigned') NOT NULL DEFAULT 'assigned'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_charges`
--

CREATE TABLE `service_charges` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_requests`
--

CREATE TABLE `service_requests` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `pickup_location` text NOT NULL,
  `dropoff_location` text NOT NULL,
  `pickup_date` date NOT NULL,
  `pickup_time` time NOT NULL,
  `status` enum('unassigned','pending','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_types`
--

CREATE TABLE `service_types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sos`
--

CREATE TABLE `sos` (
  `id` int(11) NOT NULL,
  `sos_type` varchar(191) NOT NULL DEFAULT 'sos',
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `guard_name` varchar(255) NOT NULL,
  `comment` text DEFAULT NULL,
  `guard_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int(11) NOT NULL DEFAULT 0,
  `role` varchar(200) NOT NULL,
  `empl_no` varchar(100) NOT NULL,
  `id_no` int(11) DEFAULT NULL,
  `photo_url` varchar(200) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `crew_commander_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Team_assignment`
--

CREATE TABLE `Team_assignment` (
  `id` int(11) NOT NULL,
  `staffId` int(11) NOT NULL,
  `teamMemberId` int(11) NOT NULL,
  `assignedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `team_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team_vehicles`
--

CREATE TABLE `team_vehicles` (
  `id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `access_token` text NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `expires_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `is_valid` tinyint(1) NOT NULL DEFAULT 1,
  `last_used_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `device_info` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vault`
--

CREATE TABLE `vault` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `current_balance` decimal(15,2) DEFAULT 0.00,
  `thousands` int(11) DEFAULT 0,
  `fiveHundreds` int(11) DEFAULT 0,
  `twoHundreds` int(11) DEFAULT 0,
  `hundreds` int(11) DEFAULT 0,
  `fifties` int(11) DEFAULT 0,
  `forties` int(11) DEFAULT 0,
  `twenties` int(11) DEFAULT 0,
  `tens` int(11) DEFAULT 0,
  `fives` int(11) DEFAULT 0,
  `ones` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vault_update`
--

CREATE TABLE `vault_update` (
  `id` int(11) NOT NULL,
  `vault_id` int(11) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `amount_in` decimal(15,2) DEFAULT 0.00,
  `amount_out` decimal(15,2) DEFAULT 0.00,
  `new_balance` decimal(15,2) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `transaction_date` date DEFAULT NULL,
  `ones` int(11) DEFAULT 0,
  `fives` int(11) DEFAULT 0,
  `tens` int(11) DEFAULT 0,
  `twenties` int(11) DEFAULT 0,
  `forties` int(11) DEFAULT 0,
  `fifties` int(11) DEFAULT 0,
  `hundreds` int(11) DEFAULT 0,
  `twoHundreds` int(11) DEFAULT 0,
  `fiveHundreds` int(11) DEFAULT 0,
  `thousands` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vault_users`
--

CREATE TABLE `vault_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `registration_number` varchar(20) NOT NULL,
  `model_id` int(11) NOT NULL,
  `consumption` decimal(5,2) NOT NULL COMMENT 'Fuel consumption in Km/L (can override model default)',
  `status` tinyint(4) DEFAULT 1 COMMENT '1 = Active, 0 = Inactive',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_models`
--

CREATE TABLE `vehicle_models` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `consumption` decimal(5,2) NOT NULL COMMENT 'Default fuel consumption in Km/L',
  `status` tinyint(4) DEFAULT 1 COMMENT '1 = Active, 0 = Inactive',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_RequestToStaff`
--

CREATE TABLE `_RequestToStaff` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_type`
--
ALTER TABLE `admin_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `atms`
--
ALTER TABLE `atms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_atm_code_per_client` (`client_id`,`atm_code`);

--
-- Indexes for table `atm_cash_counts`
--
ALTER TABLE `atm_cash_counts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cash_counts_request_id_fkey` (`request_id`),
  ADD KEY `cash_counts_staff_id_fkey` (`staff_id`);

--
-- Indexes for table `atm_counters`
--
ALTER TABLE `atm_counters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `atm_counters_atm_id_key` (`atm_id`),
  ADD KEY `atm_counters_ibfk_1` (`client_id`),
  ADD KEY `atm_counters_crew_commander_id_fkey` (`crew_commander_id`),
  ADD KEY `atm_counters_request_id_fkey` (`request_id`),
  ADD KEY `atm_counters_date_client_id_fkey` (`date`,`client_id`);

--
-- Indexes for table `atm_loading`
--
ALTER TABLE `atm_loading`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_client_id` (`client_id`),
  ADD KEY `idx_atm_id` (`atm_id`),
  ADD KEY `idx_loading_date` (`loading_date`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `cash_counts`
--
ALTER TABLE `cash_counts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cash_counts_staff_id_fkey` (`staff_id`),
  ADD KEY `cash_counts_request_id_fkey` (`request_id`),
  ADD KEY `cash_counts_created_at_status_fkey` (`created_at`,`status`);

--
-- Indexes for table `cash_orders`
--
ALTER TABLE `cash_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `cash_orders_ibfk_1` (`user_id`);

--
-- Indexes for table `cash_processing`
--
ALTER TABLE `cash_processing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cash_count_id` (`cash_count_id`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `account_number` (`account_number`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `client_update`
--
ALTER TABLE `client_update`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `atm_id` (`atm_id`);

--
-- Indexes for table `crew_locations`
--
ALTER TABLE `crew_locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `crew_location_request_id_idx` (`request_id`),
  ADD KEY `crew_location_staff_id_idx` (`staff_id`);

--
-- Indexes for table `daily_runs`
--
ALTER TABLE `daily_runs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery_completion`
--
ALTER TABLE `delivery_completion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `delivery_completion_requestId_key` (`requestId`),
  ADD KEY `delivery_completion_sealNumberId_fkey` (`sealNumberId`);

--
-- Indexes for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `assigned_to` (`assigned_to`);

--
-- Indexes for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `processing_charges`
--
ALTER TABLE `processing_charges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cash_processing_id` (`cash_processing_id`);

--
-- Indexes for table `processing_fees`
--
ALTER TABLE `processing_fees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `expires_at` (`expires_at`),
  ADD KEY `is_active` (`is_active`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_type_id` (`service_type_id`),
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `requests_branch_id_fkey` (`branch_id`),
  ADD KEY `requests_sealNumberId_fkey` (`sealNumberId`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_requests_atm_id` (`atm_id`),
  ADD KEY `requests_myStatus_staff_id_fkey` (`my_status`,`staff_id`),
  ADD KEY `requests_myStatus_createdAt_fkey` (`my_status`,`created_at`),
  ADD KEY `idx_requests_pending` (`my_status`,`staff_id`),
  ADD KEY `idx_requests_in_progress` (`my_status`,`staff_id`),
  ADD KEY `idx_requests_completed` (`my_status`,`staff_id`,`updated_at`),
  ADD KEY `idx_requests_id_staff` (`id`,`staff_id`),
  ADD KEY `idx_requests_status_update` (`id`,`staff_id`,`my_status`,`updated_at`),
  ADD KEY `idx_requests_staff_status` (`staff_id`,`my_status`),
  ADD KEY `idx_requests_created_at` (`created_at`),
  ADD KEY `idx_requests_updated_at` (`updated_at`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `seals`
--
ALTER TABLE `seals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `seals_seal_number_key` (`seal_number`);

--
-- Indexes for table `service_charges`
--
ALTER TABLE `service_charges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `service_type_id` (`service_type_id`);

--
-- Indexes for table `service_requests`
--
ALTER TABLE `service_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `service_type_id` (`service_type_id`);

--
-- Indexes for table `service_types`
--
ALTER TABLE `service_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sos`
--
ALTER TABLE `sos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sos_guard_id_fkey` (`guard_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `staff_empl_no_key` (`empl_no`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_teams_crew_commander` (`crew_commander_id`);

--
-- Indexes for table `Team_assignment`
--
ALTER TABLE `Team_assignment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TeamAssignment_staffId_fkey` (`staffId`),
  ADD KEY `TeamAssignment_teamMemberId_fkey` (`teamMemberId`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`team_id`,`staff_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `team_vehicles`
--
ALTER TABLE `team_vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_team_vehicle` (`team_id`,`vehicle_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `token_staff_id_fkey` (`staff_id`),
  ADD KEY `token_refresh_token_idx` (`refresh_token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vault`
--
ALTER TABLE `vault`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vault_update`
--
ALTER TABLE `vault_update`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vault_id` (`vault_id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `vault_users`
--
ALTER TABLE `vault_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `registration_number` (`registration_number`),
  ADD KEY `model_id` (`model_id`);

--
-- Indexes for table `vehicle_models`
--
ALTER TABLE `vehicle_models`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `_RequestToStaff`
--
ALTER TABLE `_RequestToStaff`
  ADD UNIQUE KEY `_RequestToStaff_AB_unique` (`A`,`B`),
  ADD KEY `_RequestToStaff_B_index` (`B`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_type`
--
ALTER TABLE `admin_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `atms`
--
ALTER TABLE `atms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `atm_cash_counts`
--
ALTER TABLE `atm_cash_counts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `atm_counters`
--
ALTER TABLE `atm_counters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `atm_loading`
--
ALTER TABLE `atm_loading`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cash_counts`
--
ALTER TABLE `cash_counts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cash_orders`
--
ALTER TABLE `cash_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cash_processing`
--
ALTER TABLE `cash_processing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_update`
--
ALTER TABLE `client_update`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `crew_locations`
--
ALTER TABLE `crew_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `daily_runs`
--
ALTER TABLE `daily_runs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `delivery_completion`
--
ALTER TABLE `delivery_completion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inquiries`
--
ALTER TABLE `inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `processing_charges`
--
ALTER TABLE `processing_charges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `processing_fees`
--
ALTER TABLE `processing_fees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seals`
--
ALTER TABLE `seals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_charges`
--
ALTER TABLE `service_charges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_requests`
--
ALTER TABLE `service_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_types`
--
ALTER TABLE `service_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sos`
--
ALTER TABLE `sos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Team_assignment`
--
ALTER TABLE `Team_assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team_vehicles`
--
ALTER TABLE `team_vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vault`
--
ALTER TABLE `vault`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vault_update`
--
ALTER TABLE `vault_update`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vault_users`
--
ALTER TABLE `vault_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicle_models`
--
ALTER TABLE `vehicle_models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `atms`
--
ALTER TABLE `atms`
  ADD CONSTRAINT `atms_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cash_orders`
--
ALTER TABLE `cash_orders`
  ADD CONSTRAINT `cash_orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `branches` (`id`),
  ADD CONSTRAINT `cash_orders_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`);

--
-- Constraints for table `processing_charges`
--
ALTER TABLE `processing_charges`
  ADD CONSTRAINT `processing_charges_ibfk_1` FOREIGN KEY (`cash_processing_id`) REFERENCES `cash_processing` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `processing_fees`
--
ALTER TABLE `processing_fees`
  ADD CONSTRAINT `processing_fees_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `team_vehicles`
--
ALTER TABLE `team_vehicles`
  ADD CONSTRAINT `team_vehicles_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `team_vehicles_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`model_id`) REFERENCES `vehicle_models` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
