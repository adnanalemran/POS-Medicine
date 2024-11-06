-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 02, 2024 at 04:14 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saas_pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_keys`
--

CREATE TABLE `api_keys` (
  `id` bigint UNSIGNED NOT NULL,
  `organization_id` int NOT NULL,
  `api_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purpose` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint UNSIGNED NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `discount_type` tinyint NOT NULL DEFAULT '0' COMMENT '0:flat, 1:percentage',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `user_type` tinyint NOT NULL DEFAULT '0' COMMENT '0:all, 1:specific',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1:active, 0:inactive',
  `subscription_plan_type` tinyint NOT NULL DEFAULT '0' COMMENT '0:all, 1:specific',
  `created_by` bigint NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `amount`, `discount_type`, `start_date`, `end_date`, `user_type`, `status`, `subscription_plan_type`, `created_by`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'saasfdsdfasddef', 10, 1, '2023-05-28', '2024-05-28', 0, 1, 1, 5, NULL, '2023-07-05 11:36:27', '2023-07-05 11:36:27'),
(2, 'saasfdsdfasddf', 10, 1, '2023-05-28', '2024-05-28', 0, 1, 1, 3, NULL, '2023-07-05 11:36:43', '2023-07-23 08:20:37'),
(3, 'new 3sadf324', 10, 0, '2023-05-23', '2024-05-28', 0, 1, 1, 5, NULL, '2023-07-05 11:37:13', '2023-08-14 03:11:29'),
(4, 'new upcoming', 10, 0, '2024-05-23', '2024-05-28', 0, 1, 1, 5, NULL, '2023-07-05 11:38:18', '2023-08-14 03:11:29'),
(5, 'new sfd', 1, 1, '2014-05-23', '2014-05-28', 1, 1, 1, 1, NULL, '2023-07-05 11:38:35', '2023-08-14 03:12:54'),
(6, 'New copuon 100', 100, 1, '2023-08-14', '2023-08-31', 1, 1, 1, 1, NULL, '2023-08-14 03:14:40', '2023-08-14 03:14:40');

-- --------------------------------------------------------

--
-- Table structure for table `coupon_subscription_plans`
--

CREATE TABLE `coupon_subscription_plans` (
  `id` bigint UNSIGNED NOT NULL,
  `coupon_id` int NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupon_subscription_plans`
--

INSERT INTO `coupon_subscription_plans` (`id`, `coupon_id`, `subscription_plan_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL, NULL),
(2, 1, 2, NULL, NULL, NULL),
(3, 2, 1, NULL, NULL, NULL),
(4, 2, 2, NULL, NULL, NULL),
(5, 3, 1, NULL, NULL, NULL),
(6, 3, 2, NULL, NULL, NULL),
(7, 4, 1, NULL, NULL, NULL),
(8, 4, 2, NULL, NULL, NULL),
(9, 5, 1, NULL, NULL, NULL),
(10, 5, 2, NULL, NULL, NULL),
(11, 6, 3, NULL, NULL, NULL),
(12, 6, 7, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coupon_users`
--

CREATE TABLE `coupon_users` (
  `id` bigint UNSIGNED NOT NULL,
  `coupon_id` int NOT NULL,
  `user_id` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupon_users`
--

INSERT INTO `coupon_users` (`id`, `coupon_id`, `user_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 5, 35, NULL, NULL, NULL),
(2, 5, 18, NULL, NULL, NULL),
(3, 6, 35, NULL, NULL, NULL),
(4, 6, 22, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dynamic_databases`
--

CREATE TABLE `dynamic_databases` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE `features` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0:inactive 1:active',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`id`, `name`, `details`, `parent_id`, `status`, `deleted_at`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Purchase Management', 'A', 0, 1, NULL, 0, '2023-06-22 11:39:14', '2024-01-25 12:15:08'),
(2, 'Smooth Returns', 'A', 0, 1, NULL, 0, '2023-06-22 11:48:45', '2024-01-25 12:06:34'),
(3, 'Stock Management', 'A', 0, 1, NULL, 0, '2023-06-22 11:48:56', '2024-01-25 12:05:00'),
(4, 'Fast Invoicing', 'AA', 0, 1, NULL, 0, '2023-06-22 13:49:10', '2024-01-25 11:09:29'),
(5, 'Vendor Management', 'A', 0, 1, NULL, 0, '2024-01-25 12:15:31', '2024-01-25 12:15:31'),
(6, '4 Ways real time Communication (SMS*, Email, WhatsApp & Notification)', 'A', 0, 1, NULL, 0, '2024-01-25 12:15:51', '2024-01-25 12:15:51'),
(7, 'Patient Feedback Collection', 'A', 0, 1, NULL, 0, '2024-01-25 12:16:05', '2024-01-25 12:16:05'),
(8, 'Bar Code Scan', 'A', 0, 1, NULL, 0, '2024-01-25 12:16:16', '2024-01-25 12:16:16'),
(9, 'Rack Management', 'A', 0, 1, NULL, 0, '2024-01-25 12:16:29', '2024-01-25 12:16:29'),
(10, 'Advanced integrated report- MIS', 'A', 0, 1, NULL, 0, '2024-01-25 12:16:41', '2024-01-25 12:16:41'),
(11, 'Web and Mobile App Access', 'A', 0, 1, NULL, 0, '2024-01-25 12:16:54', '2024-01-25 12:16:54'),
(12, 'SMS Notification*', 'A', 0, 1, NULL, 0, '2024-01-25 12:18:32', '2024-01-25 12:18:32'),
(13, 'Everything in Specialist, please contact us.', 'A', 0, 1, NULL, 0, '2024-01-25 12:19:31', '2024-01-25 12:19:31');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_05_17_181447_create_roles_table', 1),
(6, '2022_05_17_181456_create_user_roles_table', 1),
(7, '2023_05_05_032537_create_organizations_table', 1),
(8, '2023_05_05_034457_create_features_table', 1),
(9, '2023_05_05_034547_create_subscription_plans_table', 1),
(10, '2023_05_05_034814_create_subscription_plan_features_table', 1),
(11, '2023_05_05_034834_create_subscription_requests_table', 1),
(12, '2023_05_05_034849_create_subscription_details_table', 1),
(13, '2023_05_05_034913_create_coupons_table', 1),
(14, '2023_05_05_035126_create_coupon_subscription_plans_table', 1),
(15, '2023_05_05_035204_create_coupon_users_table', 1),
(16, '2023_05_05_035225_create_purchases_table', 1),
(17, '2023_05_05_035240_create_purchase_attempts_table', 1),
(18, '2023_05_05_035304_create_payment_attempts_table', 1),
(19, '2023_05_05_035406_create_subscription_cancel_requests_table', 1),
(20, '2023_05_05_035423_create_api_keys_table', 1),
(21, '2023_05_05_035433_create_notifications_table', 1),
(22, '2023_05_05_035451_create_settings_table', 1),
(23, '2023_05_17_144146_create_dynamic_database_table', 1),
(24, '2023_06_22_155532_create_storage_sizes_table', 1),
(25, '2023_06_22_155651_create_validities_table', 1),
(26, '2023_07_12_151432_create_otps_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` text COLLATE utf8mb4_unicode_ci,
  `message_status` tinyint NOT NULL DEFAULT '0' COMMENT '0: not send, 1:sent',
  `email_status` tinyint NOT NULL DEFAULT '0' COMMENT '0: not send, 1:sent',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person_mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person_designation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `db_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_tags` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0: inactive 1:active',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `address`, `mobile`, `email`, `contact_person_name`, `contact_person_mobile`, `contact_person_email`, `contact_person_designation`, `description`, `logo`, `db_name`, `meta_tags`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'New Organization', 'New address', '123456', 'chaki@gmail.com', 'sdfsdfdsf', '123456', 'chaki@gmail.com', 'Local Admin', 'safdsafsdafsdaf', '25337360-3e3e-4e38-b2ea-862d02f9c371.png', 'pos_test', NULL, 1, NULL, '2023-06-22 12:11:43', '2023-07-06 13:43:44'),
(2, 'Organization 2', 'required|string', '0173243244', 'organizatiofsn@email.com', 'name', '32424243242', 'contact@gmail.com', 'admin', 'none', NULL, 'contact_gmail_com', 'string', 1, NULL, '2023-06-22 12:36:33', '2023-07-06 13:43:44'),
(3, 'aaacaasasadadc', '', '017328439243', 'aaa@gmail.com', 'aaacaasasadadc', '017328439243', 'aaa@gmail.com', 'Local Admin', NULL, NULL, 'aaagmailcom', NULL, 1, NULL, '2023-07-07 03:07:09', '2023-07-07 03:07:09'),
(4, 'aaacaasasadadc', '', '017328439243', 'cccc@gmail.com', 'aaacaasasadadc', '017328439243', 'cccc@gmail.com', 'Local Admin', NULL, NULL, 'ccccgmailcom', NULL, 1, NULL, '2023-07-08 03:17:08', '2023-07-08 03:17:08'),
(6, 'aaacaasasadadc', '', '017328439243', 'aaaadadacsc@gmail.com', 'aaacaasasadadc', '017328439243', 'aaaadadacsc@gmail.com', 'Local Admin', NULL, NULL, 'aaaadadacscgmailcom', NULL, 1, NULL, '2023-07-08 09:20:49', '2023-07-08 09:20:49'),
(7, 'aaacaasasadadc', '', '017328439243', 'aaaacsc@gmail.com', 'aaacaasasadadc', '017328439243', 'aaaacsc@gmail.com', 'Local Admin', NULL, NULL, 'aaaacscgmailcom', NULL, 1, NULL, '2023-07-08 09:22:59', '2023-07-08 09:22:59'),
(8, 'aaacaasasadadc', '', '01732849243', 'aaaacc@gmail.com', 'aaacaasasadadc', '01732849243', 'aaaacc@gmail.com', 'Local Admin', NULL, NULL, 'aaaaccgmailcom', NULL, 1, NULL, '2023-07-08 09:27:15', '2023-07-08 09:27:15'),
(11, 'aaacc', '', '01732849243', 'aaacc@gmail.com', 'aaacc', '01732849243', 'aaacc@gmail.com', 'Local Admin', NULL, NULL, 'aaaccgmailcom', NULL, 1, NULL, '2023-07-08 09:38:25', '2023-07-08 09:38:25'),
(13, 'xxx', '', '01732849243', 'xxx@gmail.com', 'xxx', '01732849243', 'xxx@gmail.com', 'Local Admin', NULL, NULL, 'xxxgmailcom', NULL, 1, NULL, '2023-07-08 09:40:15', '2023-07-08 09:40:15'),
(14, 'xxx', '', '01732849243', 'zzz@gmail.com', 'xxx', '01732849243', 'zzz@gmail.com', 'Local Admin', NULL, NULL, 'zzzgmailcom', NULL, 1, NULL, '2023-07-08 03:41:12', '2023-07-08 03:41:12'),
(15, 'xxx', '', '01732849243', 'zxc@gmail.com', 'xxx', '01732849243', 'zxc@gmail.com', 'Local Admin', NULL, NULL, 'zxcgmailcom', NULL, 1, NULL, '2023-07-08 03:42:01', '2023-07-08 03:42:01'),
(16, 'xxx', '', '01732849243', 'ccc@gmail.com', 'xxx', '01732849243', 'ccc@gmail.com', 'Local Admin', NULL, NULL, 'cccgmailcom', NULL, 1, NULL, '2023-07-08 09:45:51', '2023-07-08 09:45:51'),
(17, 'xxx', '', '01732849243', 'vvssv@gmail.com', 'xxx', '01732849243', 'vvssv@gmail.com', 'Local Admin', NULL, NULL, 'vvssvgmailcom', NULL, 1, NULL, '2023-07-08 04:31:52', '2023-07-08 04:31:52'),
(20, 'sdfsdfdsf', '', '01732849243', 'mm@gmail.com', 'sdfsdfdsf', '01732849243', 'mm@gmail.com', 'Local Admin', NULL, NULL, 'mmgmailcom', NULL, 1, NULL, '2023-07-11 18:10:24', '2023-07-11 18:10:24'),
(21, 'kajol', '', '01732849243', 'kasdfjolchaki@gmail.com', 'kajol', '01732849243', 'kajolchaki@gmail.com', 'Local Admin', NULL, NULL, 'kajolchakigmailcom', NULL, 1, NULL, '2023-07-11 19:15:09', '2023-07-11 19:15:09'),
(22, 'kajol', '', '01732849243', 'sdf', 'kajol', '01732849243', 'kajolchaki@gmail.com', 'Local Admin', NULL, NULL, 'kajolchakigmailcom', NULL, 1, NULL, '2023-07-11 13:16:41', '2023-07-11 13:16:41'),
(23, 'kajol', '', '01732849243', 'kajdsfolchaki@gmail.com', 'kajol', '01732849243', 'kajolchaki@gmail.com', 'Local Admin', NULL, NULL, 'kajolchakigmailcom', NULL, 1, NULL, '2023-07-11 13:18:43', '2023-07-11 13:18:43'),
(25, 'kajol', '', '01732849243', 'kajolchaki@gmail.com', 'kajol', '01732849243', 'kajolchaki@gmail.com', 'Local Admin', NULL, NULL, 'kajolchakigmailcom', NULL, 1, NULL, '2023-07-11 13:20:19', '2023-07-11 13:20:19'),
(26, 'zzz', '', '01111111199', 'sandy@gmail.com', 'zzz', '01111111199', 'sandy@gmail.com', 'Local Admin', NULL, NULL, 'sandygmailcom', NULL, 2, NULL, '2023-07-13 15:45:43', '2023-07-13 15:45:43'),
(30, 'sdfsdfdsf', '', '01732849243', 'prosanta.k.c@gmail.com', 'sdfsdfdsf', '01732849243', 'prosanta.k.c@gmail.com', 'Local Admin', NULL, NULL, 'prosantakcgmailcom', NULL, 1, NULL, '2023-07-22 12:14:05', '2023-07-22 12:14:05'),
(73, 'Arafat', '', '01705541561', 'dev.arafat.zaimahtech@gmail.com', 'Arafat', '01705541561', 'dev.arafat.zaimahtech@gmail.com', 'Local Admin', NULL, NULL, 'devarafatzaimahtechgmailcom', NULL, 2, NULL, '2023-08-14 09:20:00', '2023-08-14 09:20:00'),
(74, 'POS', '', '01554885133', 'pos@gmail.com', 'POS', '01554885133', 'pos@gmail.com', 'Local Admin', NULL, NULL, 'posgmailcom', NULL, 1, NULL, '2023-10-15 05:43:04', '2023-10-15 05:43:04'),
(75, 'Sneho Urgent Healthcare Center', 'Location : House 15, Block F, Main Road, Eastern Housing, Pallabi, Mirpur, Dhaka', '01554885166', 'mijba@spreehabd.org', 'Mijba', '01554885166', 'mijba@spreehabd.org', 'Local Admin', 'test', 'https://saasbackend.macrohealthplus.org/logo2f1ae6e4-1f25-44b4-86e7-5e9d21f1f092.jpeg', 'mijbaspreehabdorg', NULL, 1, NULL, '2023-10-18 11:11:03', '2023-11-01 12:47:18'),
(76, 'Zahid', '', '01554885185', 'zahid_badda@amarlab.com', 'Zahid', '01554885185', 'zahid_badda@amarlab.com', 'Local Admin', NULL, NULL, 'zahidbaddaamarlabcom', NULL, 1, NULL, '2023-10-25 06:51:21', '2023-10-25 06:51:21'),
(77, 'SNEHO URGENT HEALTHCARE CENTER', '14/E/4 Babri Jame Moshjid Road, Jafrabad, Mohammadpur,Dhaka-1207', '01554885178', 'zahid_rayerbazar@amarlab.com', 'Zahid', '01554885178', 'zahid_rayerbazar@amarlab.com', 'Local Admin', 'test', 'https://saasbackend.macrohealthplus.org/logo0310571b-f0af-4baf-bee6-f5330247a751.jpeg', 'zahidrayerbazaramarlabcom', NULL, 1, NULL, '2023-10-25 06:57:20', '2023-11-01 13:30:45'),
(78, 'SNEHO URGENT HEALTH CARE', 'Ka-20/12 A, Nasrin Mintu Road, Nodda, Kalachadpur, Dhaka', '01554885199', 'zahid_kalachadpur@amarlab.com', 'Zahid', '01554885199', 'zahid_kalachadpur@amarlab.com', 'Local Admin', 'TEST', 'https://saasbackend.macrohealthplus.org/logod078b09d-4203-481e-93e2-84e4168cf8d6.jpeg', 'zahidkalachadpuramarlabcom', NULL, 1, NULL, '2023-10-25 07:03:36', '2023-11-01 08:45:56'),
(79, 'MHP MEDICINE CORNER', 'House 35 East Rampura, Dhaka 1210', '01681688541', 'imran@gmail.com', 'Imran', '015548321', 'imran@gmail.com', 'Local Admin', 'A', 'https://saasbackend.macrohealthplus.org/logo69375503-3152-4432-9668-eec10369b021.png', 'imrangmailcom', NULL, 1, NULL, '2023-11-06 09:30:02', '2023-11-27 12:47:40'),
(80, 'jabedakhterbkk', '', '+8801714131050', 'jabedakhterbkk@gmail.com', 'jabedakhterbkk', '+8801714131050', 'jabedakhterbkk@gmail.com', 'Local Admin', NULL, NULL, 'jabedakhterbkkgmailcom', NULL, 1, NULL, '2024-02-08 08:00:55', '2024-02-08 08:00:55');

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` bigint UNSIGNED NOT NULL,
  `token` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0:inactive, 1:active, 2:used',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `otps`
--

INSERT INTO `otps` (`id`, `token`, `email`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 9652, 'kajolchaki@gmail.com', 22, 1, '2023-07-16 11:08:27', '2023-07-16 11:08:27'),
(3, 4371, 'user@email.com', 3, 1, '2023-07-21 09:54:31', '2023-07-21 09:54:31'),
(4, 3485, 'user2@gmail.com', 5, 1, '2023-08-02 10:47:58', '2023-08-02 10:47:58'),
(5, 1787, 'user2@gmail.com', 5, 1, '2023-08-02 11:04:49', '2023-08-02 11:04:49'),
(6, 3439, 'user2@gmail.com', 5, 1, '2023-08-02 11:05:20', '2023-08-02 11:05:20'),
(8, 7346, 'user2@gmail.com', 5, 1, '2023-08-02 11:08:21', '2023-08-02 11:08:21'),
(9, 7839, 'user2@gmail.com', 5, 1, '2023-08-02 11:25:39', '2023-08-02 11:25:39');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_attempts`
--

CREATE TABLE `payment_attempts` (
  `id` bigint UNSIGNED NOT NULL,
  `purchase_attempt_id` int NOT NULL,
  `amount` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '2' COMMENT '0:failed, 1:success, 2:pending',
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'hydra-api-token', 'bd436fb7625a3787cb2fdfea1acee72acd01b93092004d12b6e911fdaf17c5c8', '[\"admin\"]', '2023-06-22 12:11:43', '2023-06-22 11:35:14', '2023-06-22 12:11:43'),
(2, 'App\\Models\\User', 4, 'hydra-api-token', '0f3ecf475019adcd6b9eab8005e03ea3be8b36db3eae04ea14aab33f32e870d3', '[\"admin\"]', '2023-06-22 13:26:36', '2023-06-22 12:12:13', '2023-06-22 13:26:36'),
(3, 'App\\Models\\User', 1, 'hydra-api-token', '0337dd15621684c6d0fa177701a5550fea0e275321d9f958cfbf0b4f6bd87144', '[\"admin\"]', '2023-06-22 13:51:32', '2023-06-22 13:45:21', '2023-06-22 13:51:32'),
(4, 'App\\Models\\User', 4, 'hydra-api-token', '66cf96e1c5722d4898cac9f9cc4241751cc850a3339b9181af1c4034a579163e', '[\"admin\"]', '2023-06-26 10:17:35', '2023-06-26 10:01:42', '2023-06-26 10:17:35'),
(5, 'App\\Models\\User', 5, 'hydra-api-token', 'c3cf84a50277c456c674e12b73622b7d0b8bdbb571412cfca2646157679c068a', '[\"user\"]', '2023-06-26 22:33:22', '2023-06-26 22:32:16', '2023-06-26 22:33:22'),
(6, 'App\\Models\\User', 4, 'hydra-api-token', '9b4f79d8ec3960eb89d4ca7c2c9312c86f1e7e42a67831f87aff9f0fadf0e536', '[\"admin\"]', '2023-06-27 04:27:10', '2023-06-26 22:34:09', '2023-06-27 04:27:10'),
(7, 'App\\Models\\User', 1, 'hydra-api-token', '5d8dac38e1670ac8608fe42212fc75fd27a30a305e568ea9f695b8894b10211b', '[\"admin\"]', NULL, '2023-06-27 04:34:54', '2023-06-27 04:34:54'),
(8, 'App\\Models\\User', 1, 'hydra-api-token', '1235ef0e7108a5c16077f27fcf6e9041c1cb8853765f9781f25be46b798994ce', '[\"admin\"]', '2023-07-02 09:35:59', '2023-07-02 09:31:24', '2023-07-02 09:35:59'),
(9, 'App\\Models\\User', 5, 'hydra-api-token', 'f2ce4481e70dbac3899bdfb87b851418701677133eb9356a0f9be1a3653d0ac5', '[\"admin\"]', '2023-07-08 04:31:52', '2023-07-02 09:39:03', '2023-07-08 04:31:52'),
(10, 'App\\Models\\User', 5, 'hydra-api-token', '91e2609b6f0aefd54276ea0f72f4148086be826ba4b4c06bab9f847bbeba799c', '[\"admin\"]', NULL, '2023-07-04 12:41:31', '2023-07-04 12:41:31'),
(11, 'App\\Models\\User', 1, 'hydra-api-token', '09ef88fd285b6045bf33a23d2e4c7aa2ca577e4b8b39bae35591ac99ac54ca2a', '[\"admin\"]', '2023-07-11 13:20:19', '2023-07-08 11:47:39', '2023-07-11 13:20:19'),
(12, 'App\\Models\\User', 22, 'hydra-api-token', '868760b49396c9c96cd50c032622864dc0ff39b233a8a4b6ffddddc200517290', '[\"admin\"]', NULL, '2023-07-11 13:21:41', '2023-07-11 13:21:41'),
(14, 'App\\Models\\User', 22, 'hydra-api-token', '5b31d2b5738200b39fdecc2af8a71cc32bf056dda8452bd24bf5a16df9e4b242', '[\"admin\"]', NULL, '2023-07-16 11:19:36', '2023-07-16 11:19:36'),
(15, 'App\\Models\\User', 3, 'hydra-api-token', 'fe21dd3c7086cf866a2066f7569c367b72e97ed4611e10e48627007124f75d2f', '[\"user\"]', '2023-07-23 08:20:37', '2023-07-21 09:54:53', '2023-07-23 08:20:37'),
(16, 'App\\Models\\User', 5, 'hydra-api-token', '6042e7d04897869be75eeec8e164f908d3bee8078726a979d69dc18cf3c7c792', '[\"admin\"]', '2023-08-01 11:45:09', '2023-08-01 11:12:26', '2023-08-01 11:45:09'),
(17, 'App\\Models\\User', 5, 'hydra-api-token', '67b271731c2b70f4efd259734ac0e628bf57376f99c3fc38f9e5d65fa6a638a5', '[\"admin\"]', '2023-08-02 09:24:02', '2023-08-02 09:21:21', '2023-08-02 09:24:02'),
(18, 'App\\Models\\User', 5, 'hydra-api-token', 'c1631c7837fa01075892e77254e29e25bde0e43bae5249543451a29c7c67f024', '[\"admin\"]', NULL, '2023-08-02 09:21:46', '2023-08-02 09:21:46'),
(19, 'App\\Models\\User', 5, 'hydra-api-token', 'a0707c14ae63f694ce9a88eecb62ddee3292ae2c96ffd38c63518fafa212cbbc', '[\"admin\"]', NULL, '2023-08-02 09:44:34', '2023-08-02 09:44:34'),
(20, 'App\\Models\\User', 5, 'hydra-api-token', 'b4ef188c0eda490ab8815d1eb4b79b5389fe17512cf4b5d27ac09a22649be081', '[\"admin\"]', NULL, '2023-08-02 09:45:13', '2023-08-02 09:45:13'),
(21, 'App\\Models\\User', 5, 'hydra-api-token', '7c4cf3ff13bf13ed4c741cbd1c2db2b238af54ec21a581155785c62cf7347533', '[\"admin\"]', NULL, '2023-08-02 10:12:08', '2023-08-02 10:12:08'),
(22, 'App\\Models\\User', 5, 'hydra-api-token', 'dc1cdbdac6fcef64575827b69cb3a3be9fd9631c91d946ba2f2713d2f6668f81', '[\"admin\"]', NULL, '2023-08-02 10:13:34', '2023-08-02 10:13:34'),
(23, 'App\\Models\\User', 5, 'hydra-api-token', '11687d0e0f8933e78536e08cb38d3abb7cd323e1360a579bcd84118bb39f6f1f', '[\"admin\"]', NULL, '2023-08-02 10:15:04', '2023-08-02 10:15:04'),
(24, 'App\\Models\\User', 5, 'hydra-api-token', '4028824cf34a194eebec42823e3e5c8051b7effb9fd5f908bc7698481e605763', '[\"admin\"]', NULL, '2023-08-02 10:17:04', '2023-08-02 10:17:04'),
(25, 'App\\Models\\User', 5, 'hydra-api-token', 'cb63e093b72227ae614fd417586ed863f3b18c9ad6966028d8ab01f7269bc455', '[\"admin\"]', NULL, '2023-08-02 10:18:01', '2023-08-02 10:18:01'),
(26, 'App\\Models\\User', 5, 'hydra-api-token', 'ccf8d12d0e8fc7b1d18c445511bc22826b26606510747f51655070cf8ed8ac7f', '[\"admin\"]', NULL, '2023-08-02 10:18:22', '2023-08-02 10:18:22'),
(27, 'App\\Models\\User', 5, 'hydra-api-token', '8820c80dc16173b43117d73e8d509df0f7d20469575d084dad21451a877e12bf', '[\"admin\"]', NULL, '2023-08-02 10:19:08', '2023-08-02 10:19:08'),
(28, 'App\\Models\\User', 5, 'hydra-api-token', '321e2c0435ca6b82e4170daa53ae38438546bae349963fc1bc14cb9601eb6c69', '[\"admin\"]', '2023-08-02 10:23:40', '2023-08-02 10:20:12', '2023-08-02 10:23:40'),
(29, 'App\\Models\\User', 5, 'hydra-api-token', '36908ada7520c2e9b439418886ce653e4ef634e6b56a4fb8f41cd896e08f1cf3', '[\"admin\"]', NULL, '2023-08-02 10:42:17', '2023-08-02 10:42:17'),
(30, 'App\\Models\\User', 5, 'hydra-api-token', '977cdecdfb0b9e2db2b20cdbf7cd3a33019409b30283578ff8a0d73ea90d821e', '[\"admin\"]', NULL, '2023-08-02 10:42:19', '2023-08-02 10:42:19'),
(32, 'App\\Models\\User', 5, 'hydra-api-token', 'a67460b3f4fad9b1ed9524f5e9156b06007e1879f3e219f5923b350427ba95e7', '[\"admin\"]', NULL, '2023-08-02 10:43:34', '2023-08-02 10:43:34'),
(33, 'App\\Models\\User', 5, 'hydra-api-token', '6d87447b11962aad1adeddebf9e170ab8337087ef24b81a5b5b6cfc498235173', '[\"admin\"]', NULL, '2023-08-02 10:44:46', '2023-08-02 10:44:46'),
(34, 'App\\Models\\User', 5, 'hydra-api-token', 'c166619de2e86f561b10f770f5c5ed81321699ab1b67a6a75f9d404bf4ace5f7', '[\"admin\"]', NULL, '2023-08-02 10:45:07', '2023-08-02 10:45:07'),
(35, 'App\\Models\\User', 5, 'hydra-api-token', '97aa72a1404975d6bbc02d39d24e62360fc0f1c18d79ba65a394177af51ceab2', '[\"admin\"]', NULL, '2023-08-02 10:46:11', '2023-08-02 10:46:11'),
(36, 'App\\Models\\User', 5, 'hydra-api-token', '3cd49a6a7eb039a8a992d060fb015bebfd05d4d246ecb8f91475e06cfa75853f', '[\"admin\"]', NULL, '2023-08-02 10:46:36', '2023-08-02 10:46:36'),
(37, 'App\\Models\\User', 5, 'hydra-api-token', '094a1d59e22fbb9ab61036feb275533b77a64ee4902f6a267f7e229766790d2f', '[\"admin\"]', NULL, '2023-08-02 10:46:59', '2023-08-02 10:46:59'),
(38, 'App\\Models\\User', 5, 'hydra-api-token', '327ede3369897740d91e96841c4fb7989a0f80d1d2ce28decff99368186525ae', '[\"admin\"]', NULL, '2023-08-02 10:47:15', '2023-08-02 10:47:15'),
(39, 'App\\Models\\User', 5, 'hydra-api-token', '4f2245d736e66bc3303e8b7e2fc0f9203f80b709f4f2e5da7e1207f42cae587f', '[\"admin\"]', NULL, '2023-08-02 11:06:39', '2023-08-02 11:06:39'),
(42, 'App\\Models\\User', 5, 'hydra-api-token', 'c9bdf9fc8078f731de7dde9b5930181a99cef3582247c10b2795a218f675019d', '[\"admin\"]', NULL, '2023-08-02 11:27:10', '2023-08-02 11:27:10'),
(43, 'App\\Models\\User', 1, 'hydra-api-token', 'f631c5ca47b457da8ee12caf595ee9ed05d13aea77df5ecb6de2224d28a0d78d', '[\"admin\"]', NULL, '2023-08-02 11:29:48', '2023-08-02 11:29:48'),
(44, 'App\\Models\\User', 5, 'hydra-api-token', '2b34b8b5ea617725cbb14f3c5a23ed04d9d123ee7607600c60f8f11e9f421515', '[\"admin\"]', NULL, '2023-08-02 11:32:01', '2023-08-02 11:32:01'),
(45, 'App\\Models\\User', 5, 'hydra-api-token', '647d105f321830ac8a2edc77ce1a43131994ea3c8bc94e43d5b94000c146a79b', '[\"admin\"]', NULL, '2023-08-02 11:33:38', '2023-08-02 11:33:38'),
(46, 'App\\Models\\User', 5, 'hydra-api-token', '1bcda106be8abd5c8b6000cc40f9870844ffe80d7a7b971a2042ee8702de14b2', '[\"admin\"]', NULL, '2023-08-02 11:40:22', '2023-08-02 11:40:22'),
(47, 'App\\Models\\User', 5, 'hydra-api-token', 'a2057c6cc7413fe46bad64d71e3e62a35f9906c1678687e6573e305dd9d98083', '[\"admin\"]', NULL, '2023-08-02 11:51:38', '2023-08-02 11:51:38'),
(48, 'App\\Models\\User', 5, 'hydra-api-token', '85be0da674de1340c75fdde034c3579afcaed996c08f84cb554fa7c231069351', '[\"admin\"]', NULL, '2023-08-02 11:52:12', '2023-08-02 11:52:12'),
(49, 'App\\Models\\User', 5, 'hydra-api-token', '72cd82ae656bf821472874fdb04ed451eb4e41e73e9b5363acdf6c1b01d67a93', '[\"admin\"]', NULL, '2023-08-03 23:10:55', '2023-08-03 23:10:55'),
(50, 'App\\Models\\User', 5, 'hydra-api-token', '99be8392a69f152b030419d2375318caee898c316866b8aabd0d3c4dd5c45821', '[\"admin\"]', NULL, '2023-08-03 23:14:31', '2023-08-03 23:14:31'),
(51, 'App\\Models\\User', 1, 'hydra-api-token', '71b6b0bc4bdfb5aa9ff1c00e107f31bf661cff1722c42785485f31918ff1f358', '[\"admin\"]', NULL, '2023-08-05 01:09:53', '2023-08-05 01:09:53'),
(52, 'App\\Models\\User', 1, 'hydra-api-token', '4daa950c1669ec472c9457cd4bef0ee50a089ac400af4860fe4f144fe9059242', '[\"admin\"]', NULL, '2023-08-05 01:11:25', '2023-08-05 01:11:25'),
(53, 'App\\Models\\User', 1, 'hydra-api-token', '38b3f9655272a0f4589e820cd4a8355fb4b049709cb786ff0bb6f859aea00756', '[\"admin\"]', NULL, '2023-08-05 01:11:54', '2023-08-05 01:11:54'),
(55, 'App\\Models\\User', 5, 'hydra-api-token', '782224b88c96810f436ec23f7ad0b874b559773716fc5b92e7658d6e9bd24094', '[\"admin\"]', NULL, '2023-08-05 02:01:37', '2023-08-05 02:01:37'),
(56, 'App\\Models\\User', 5, 'hydra-api-token', 'e5b2740a339068a1ef810537700672ea28ca67d4971daaa05a206c96d88d72b3', '[\"admin\"]', NULL, '2023-08-05 02:03:18', '2023-08-05 02:03:18'),
(57, 'App\\Models\\User', 5, 'hydra-api-token', 'f9916a1b4b37d52db402b4f888cfaa58061e48d71a390dcd97fbed775a3676a7', '[\"admin\"]', NULL, '2023-08-05 02:03:29', '2023-08-05 02:03:29'),
(58, 'App\\Models\\User', 5, 'hydra-api-token', '552e405231200ce02f4feac15dec10e6f0db023be3b2a3dcef2fb17a2f04c451', '[\"admin\"]', NULL, '2023-08-05 02:04:07', '2023-08-05 02:04:07'),
(59, 'App\\Models\\User', 5, 'hydra-api-token', 'ed907aa1acebf990a2c244c4f04dd8d73c74ba908776ec071b84159d94ff6d78', '[\"admin\"]', NULL, '2023-08-05 02:04:59', '2023-08-05 02:04:59'),
(60, 'App\\Models\\User', 5, 'hydra-api-token', 'd80822206a96fecb23df949d359b218414aafd3af86e404ae81602247de502ff', '[\"admin\"]', NULL, '2023-08-05 02:06:37', '2023-08-05 02:06:37'),
(61, 'App\\Models\\User', 5, 'hydra-api-token', '4679a6bf2d32b365fed1d4c791674b37d3aeb0a55c67fe992d6a45ea358b7308', '[\"admin\"]', NULL, '2023-08-05 02:06:50', '2023-08-05 02:06:50'),
(62, 'App\\Models\\User', 5, 'hydra-api-token', '2d06c65e64b7ccf134a19e54a8f2ce5c1b3e7c57af38887f568e9e4b84a88dbf', '[\"admin\"]', NULL, '2023-08-05 02:07:54', '2023-08-05 02:07:54'),
(63, 'App\\Models\\User', 5, 'hydra-api-token', '55b03cb14a3f6285acd3931ad9d0d83fad00d985696a9fc5f0dc7a52d38a5098', '[\"admin\"]', NULL, '2023-08-05 02:09:30', '2023-08-05 02:09:30'),
(64, 'App\\Models\\User', 5, 'hydra-api-token', '47158f70ed8c8075173b2649517df554de5f25787a3650f076280bdcd309553f', '[\"admin\"]', NULL, '2023-08-05 02:09:59', '2023-08-05 02:09:59'),
(65, 'App\\Models\\User', 5, 'hydra-api-token', 'da5caec81f88ac14fe2356b3fac985be2c411f6bb16f492d7295de45e64735b5', '[\"admin\"]', NULL, '2023-08-05 02:12:03', '2023-08-05 02:12:03'),
(66, 'App\\Models\\User', 5, 'hydra-api-token', '2e1f14089f104fc8a8c2aea0a3a18a5e1cb89ee1f362698369b02c90e419f1b6', '[\"admin\"]', NULL, '2023-08-05 02:12:21', '2023-08-05 02:12:21'),
(68, 'App\\Models\\User', 1, 'hydra-api-token', 'd70d3b4080482458477d889f750f704ce85fb62d8d716b8da72fcfc435383a9a', '[\"admin\"]', '2023-08-05 02:33:22', '2023-08-05 02:22:39', '2023-08-05 02:33:22'),
(70, 'App\\Models\\User', 5, 'hydra-api-token', '31b930b2ead387a61da63491aa97c3442c18c7a70c5613769f14b2cecd24b84d', '[\"admin\"]', NULL, '2023-08-05 03:56:35', '2023-08-05 03:56:35'),
(71, 'App\\Models\\User', 5, 'hydra-api-token', '9723242adc7b84a60c64f8e464e2be118c4bf9f99b4638e4dd1ad7c3f6d64d79', '[\"admin\"]', NULL, '2023-08-05 03:58:13', '2023-08-05 03:58:13'),
(72, 'App\\Models\\User', 5, 'hydra-api-token', 'bcc51e1b12b5efde976cff8c64e4be70cecd5e2ad03811347722b47db6a6dbbe', '[\"admin\"]', NULL, '2023-08-05 04:00:32', '2023-08-05 04:00:32'),
(73, 'App\\Models\\User', 1, 'hydra-api-token', '3165ed4eaf22ecb0baac2b8ba5cb8f3f3afbee01e424077c1793e5d14fb7846f', '[\"admin\"]', '2023-08-06 04:26:20', '2023-08-06 03:01:34', '2023-08-06 04:26:20'),
(74, 'App\\Models\\User', 5, 'hydra-api-token', 'ce8a0e77651a49dc9455b072a324e18c74c248866f7f8b0a116028f1be3ec1e2', '[\"admin\"]', NULL, '2023-08-06 22:12:43', '2023-08-06 22:12:43'),
(75, 'App\\Models\\User', 5, 'hydra-api-token', 'd118662b23ae5ad7e1d6de74cc131b605d5fa5d1815f47a9e4845c0a49cf3969', '[\"admin\"]', NULL, '2023-08-06 23:15:21', '2023-08-06 23:15:21'),
(76, 'App\\Models\\User', 5, 'hydra-api-token', '74585f23627af35a754a86963de7a491b497c38ab1e952c10f5b34a5cf496e9c', '[\"admin\"]', NULL, '2023-08-07 00:09:26', '2023-08-07 00:09:26'),
(77, 'App\\Models\\User', 5, 'hydra-api-token', '47e778795d8385ba54220cad56a48f97ad39379c97755334c9795003cdce3e14', '[\"admin\"]', NULL, '2023-08-07 00:12:03', '2023-08-07 00:12:03'),
(81, 'App\\Models\\User', 1, 'hydra-api-token', '36d9e9bfe9271cc5c1f79c67865c9e245fe732355cc6b706801a755244888e27', '[\"admin\"]', '2023-10-15 00:11:38', '2023-10-14 23:42:38', '2023-10-15 00:11:38'),
(82, 'App\\Models\\User', 80, 'hydra-api-token', '3634bd63adafccb3f210ba8eb525e008c43316f7361cb82d87ea0b3d5b3afa6e', '[\"admin\"]', '2023-10-15 00:13:52', '2023-10-14 23:43:55', '2023-10-15 00:13:52'),
(84, 'App\\Models\\User', 1, 'hydra-api-token', 'fd5e89327e32c0cfbc161cd19697e0211a1aaa711bbb6071276fb5313cecb632', '[\"admin\"]', '2023-10-18 05:10:50', '2023-10-18 05:10:34', '2023-10-18 05:10:50'),
(86, 'App\\Models\\User', 81, 'hydra-api-token', '0ee0de7e6e06b144ea7828858c724ffe3002a0bbbee9de79a3f2726f6bea221d', '[\"admin\"]', '2023-10-18 05:15:01', '2023-10-18 05:12:17', '2023-10-18 05:15:01'),
(87, 'App\\Models\\User', 81, 'hydra-api-token', '41ea86f8ab216e5598c14c43e96590a4c26e37b7add003ba99f3f08aa94cb56c', '[\"admin\"]', '2023-10-18 05:12:41', '2023-10-18 05:12:36', '2023-10-18 05:12:41'),
(88, 'App\\Models\\User', 82, 'hydra-api-token', 'ca27d1013b7c5665adf7f9e07c9ce5f72ba90379928866a397931d1f82cb84a3', '[\"user\"]', NULL, '2023-10-18 05:14:01', '2023-10-18 05:14:01'),
(89, 'App\\Models\\User', 1, 'hydra-api-token', '9c51de2a87ff5b522e8aed505182cd67bcdb526f4f4b93670efe43657fd4a346', '[\"admin\"]', NULL, '2023-10-18 05:25:18', '2023-10-18 05:25:18'),
(90, 'App\\Models\\User', 81, 'hydra-api-token', 'b9f50b7ce5fb50345e46ceb0052a71dd1f81ada97db5be1ee2d4720113ece1bc', '[\"admin\"]', '2023-10-18 05:25:40', '2023-10-18 05:25:30', '2023-10-18 05:25:40'),
(91, 'App\\Models\\User', 81, 'hydra-api-token', 'f1fd74c9fe7798b5a55bb488564b1fb177f6bb7b6b9da2b168169b630a4754b8', '[\"admin\"]', '2023-10-18 05:28:48', '2023-10-18 05:28:40', '2023-10-18 05:28:48'),
(92, 'App\\Models\\User', 81, 'hydra-api-token', 'ddce59ce97fd53333c92f8f94dd26b940363f0b92116b6988f31bc67781230bc', '[\"admin\"]', '2023-10-18 11:56:39', '2023-10-18 11:37:24', '2023-10-18 11:56:39'),
(93, 'App\\Models\\User', 81, 'hydra-api-token', '7451b5ee9f87d38c474e07fdf078ddb0a231bd7f8c634376282cc510e9396701', '[\"admin\"]', '2023-10-19 04:42:13', '2023-10-18 11:57:39', '2023-10-19 04:42:13'),
(94, 'App\\Models\\User', 83, 'hydra-api-token', '26398014850891174c90690960847d9d77a9068ad43dbcf674efcaca446a82d0', '[\"user\"]', NULL, '2023-10-18 12:01:12', '2023-10-18 12:01:12'),
(95, 'App\\Models\\User', 81, 'hydra-api-token', '3bd9f127f54944df44a6d5474530e32ca94e442e927b200e79a4d145e63b4487', '[\"admin\"]', '2023-10-18 12:03:29', '2023-10-18 12:03:02', '2023-10-18 12:03:29'),
(96, 'App\\Models\\User', 83, 'hydra-api-token', '76490bb7ba6e4182d3faec5637c9fb3d72188cb74d4ce8efabb4235acb4ae05f', '[\"user\"]', '2023-10-18 12:04:41', '2023-10-18 12:04:08', '2023-10-18 12:04:41'),
(97, 'App\\Models\\User', 82, 'hydra-api-token', '59c2517d0071531c1ce58abcf259226f35faac5e169c8279ff951e28b0e0bd20', '[\"user\"]', '2023-10-18 12:05:53', '2023-10-18 12:05:02', '2023-10-18 12:05:53'),
(98, 'App\\Models\\User', 83, 'hydra-api-token', '3e4457979c34f896ba9ce193423df1a1e3b3d2f13219970befd44e9c7e6a7b99', '[\"user\"]', '2023-10-18 12:07:56', '2023-10-18 12:06:23', '2023-10-18 12:07:56'),
(99, 'App\\Models\\User', 83, 'hydra-api-token', '8749f84a2f4fa640c6f9904735c24c79365c05ddc6b1f7f64b16ca0be24fa79c', '[\"user\"]', '2023-10-18 12:10:22', '2023-10-18 12:07:56', '2023-10-18 12:10:22'),
(100, 'App\\Models\\User', 82, 'hydra-api-token', 'bb15700bbf61c39a54330a920200429d17731e24d5bd14f4b0e1f13e7fe52b28', '[\"user\"]', NULL, '2023-10-18 12:10:42', '2023-10-18 12:10:42'),
(101, 'App\\Models\\User', 81, 'hydra-api-token', '6d6c045a103b5c1ce7876c8afa1a459f72a33ed6210c211788d6fd9f19c0a273', '[\"admin\"]', '2023-10-19 04:13:00', '2023-10-19 04:03:00', '2023-10-19 04:13:00'),
(102, 'App\\Models\\User', 82, 'hydra-api-token', '8b65086854b2232ab4df36d1e0d5123b80cc640b0bf0832f3df6e82d194ef5c6', '[\"user\"]', '2023-10-19 04:37:29', '2023-10-19 04:10:53', '2023-10-19 04:37:29'),
(103, 'App\\Models\\User', 81, 'hydra-api-token', 'd7a979a96389582ab5050f633323b79973bca3340fa77413248a45c04c3f08e2', '[\"admin\"]', '2023-10-19 04:16:05', '2023-10-19 04:15:04', '2023-10-19 04:16:05'),
(104, 'App\\Models\\User', 83, 'hydra-api-token', '6bc2ab2d2baea82e5d18a885974e017a5b533ec26744e18c4b524c261affa695', '[\"user\"]', NULL, '2023-10-19 04:16:05', '2023-10-19 04:16:05'),
(105, 'App\\Models\\User', 83, 'hydra-api-token', 'b8ec6c7176d879c565a2ded3c8f94cca85ab3bfacec54fc66b210d713e381806', '[\"user\"]', '2023-10-19 04:30:48', '2023-10-19 04:16:06', '2023-10-19 04:30:48'),
(106, 'App\\Models\\User', 81, 'hydra-api-token', '5427066314a514ab49aa9c7469bb13aa8cebbb8e5a739de278cf4abc6a0db48a', '[\"admin\"]', '2023-10-19 04:42:25', '2023-10-19 04:30:48', '2023-10-19 04:42:25'),
(107, 'App\\Models\\User', 82, 'hydra-api-token', 'd979614ea2510d83747fac6ca9e21689acbc5de70f61404337f75a73d53d9c8a', '[\"user\"]', '2023-10-19 04:38:44', '2023-10-19 04:37:55', '2023-10-19 04:38:44'),
(108, 'App\\Models\\User', 84, 'hydra-api-token', '1a6d2bf3c8c71c754557c8def7b2291d67a436ffdc1704d249b888a5aa44e36a', '[\"user\"]', '2023-10-19 04:43:10', '2023-10-19 04:42:39', '2023-10-19 04:43:10'),
(109, 'App\\Models\\User', 82, 'hydra-api-token', 'ae692b201ac869d41d628a0246b552bc4fa738690c5580c64c88cd0e48a08b07', '[\"user\"]', '2023-10-19 05:37:21', '2023-10-19 05:15:30', '2023-10-19 05:37:21'),
(110, 'App\\Models\\User', 83, 'hydra-api-token', '6fd308b3c6a67e939306caa848d2363d97d49fd99284f5f7164eb9366dc35368', '[\"user\"]', '2023-10-19 05:36:48', '2023-10-19 05:18:57', '2023-10-19 05:36:48'),
(111, 'App\\Models\\User', 83, 'hydra-api-token', '3046598dba109fdb90044d81cd272821f2b795032d4fc9294e905ef8a872aea8', '[\"user\"]', '2023-10-19 05:26:14', '2023-10-19 05:22:35', '2023-10-19 05:26:14'),
(112, 'App\\Models\\User', 83, 'hydra-api-token', '9ec383c67b024d2a1e7b876894d823a4fed52543bc15f7d2872aa821dff78a56', '[\"user\"]', '2023-10-19 05:29:10', '2023-10-19 05:28:07', '2023-10-19 05:29:10'),
(113, 'App\\Models\\User', 84, 'hydra-api-token', 'c1a7c01c12840215b60d5d1c1dabf5632ecd44e8bd43b63c0e1dcda104b935b9', '[\"user\"]', '2023-10-19 05:30:57', '2023-10-19 05:30:48', '2023-10-19 05:30:57'),
(114, 'App\\Models\\User', 83, 'hydra-api-token', 'bcde388615c5a9969197d6120edfd4e7a7b1467ad6219a5e1484e83d644d3bab', '[\"user\"]', '2023-10-19 05:32:48', '2023-10-19 05:31:15', '2023-10-19 05:32:48'),
(115, 'App\\Models\\User', 84, 'hydra-api-token', '13ea93a9ea3edefbb03f1cef6141b164341a92d14c61f46abbda6fc55400b6b9', '[\"user\"]', '2023-10-19 05:53:46', '2023-10-19 05:36:07', '2023-10-19 05:53:46'),
(116, 'App\\Models\\User', 83, 'hydra-api-token', '2e25452ed29c6da11816ab12d8688af1c1cc5efb2f43baa4edce1d9535572bf1', '[\"user\"]', '2023-10-19 05:54:50', '2023-10-19 05:37:21', '2023-10-19 05:54:50'),
(117, 'App\\Models\\User', 83, 'hydra-api-token', 'b6b6746bfba21c4836b71471ed2f70a40fe10f6a1a1eb6b41ac64b0c85db127a', '[\"user\"]', '2023-10-19 11:56:48', '2023-10-19 05:38:27', '2023-10-19 11:56:48'),
(118, 'App\\Models\\User', 83, 'hydra-api-token', 'd9d4a3eba1a3a359c5d60d40178204da3b20f33811272c23ba4e204e9b584659', '[\"user\"]', NULL, '2023-10-19 05:40:28', '2023-10-19 05:40:28'),
(119, 'App\\Models\\User', 83, 'hydra-api-token', '5cf51a1bdfd03f402bc411b05072da22905b66418968d4a0a3d5dc25f7d59214', '[\"user\"]', '2023-10-19 05:44:46', '2023-10-19 05:40:59', '2023-10-19 05:44:46'),
(120, 'App\\Models\\User', 83, 'hydra-api-token', 'ed31d0c3370fbb4f8c71113dab9985b2d24d59e8a8f780aab92ca7e919ad81a4', '[\"user\"]', '2023-10-19 09:59:54', '2023-10-19 05:45:00', '2023-10-19 09:59:54'),
(121, 'App\\Models\\User', 83, 'hydra-api-token', '1c264cce79e27de6b2d7e7704a0acbbf672c71390ba683ace4e147ce8fad39fe', '[\"user\"]', '2023-10-19 09:42:59', '2023-10-19 06:09:00', '2023-10-19 09:42:59'),
(122, 'App\\Models\\User', 82, 'hydra-api-token', 'dea3519becd94e09a89c2e8158af2a41506eb8bc0df1ed4ad81a4d006893f0d3', '[\"user\"]', '2023-10-19 06:17:21', '2023-10-19 06:12:33', '2023-10-19 06:17:21'),
(123, 'App\\Models\\User', 84, 'hydra-api-token', '3f20d9de6ee09c42dacea5468c5602d1bd5719bc1a4095768e40054b8eacc8d7', '[\"user\"]', '2023-10-19 08:13:02', '2023-10-19 06:16:19', '2023-10-19 08:13:02'),
(124, 'App\\Models\\User', 82, 'hydra-api-token', 'b76374c3036b67d93d01f3ce750faaecc70e0fc1b8e1d588bb35d6ed8681f856', '[\"user\"]', '2023-10-19 07:14:44', '2023-10-19 07:07:04', '2023-10-19 07:14:44'),
(125, 'App\\Models\\User', 82, 'hydra-api-token', 'c9e41b417dd6a9bf647ed3dafbaa6e36cb8e584a58d3a9182a3de8859fab5610', '[\"user\"]', '2023-10-19 10:43:07', '2023-10-19 10:01:49', '2023-10-19 10:43:07'),
(126, 'App\\Models\\User', 82, 'hydra-api-token', '0edf8c4180aabcbe502c278ef95c1dd3e9f8d03529569001d5a5fc514dfb54fc', '[\"user\"]', '2023-10-19 10:09:42', '2023-10-19 10:07:49', '2023-10-19 10:09:42'),
(127, 'App\\Models\\User', 82, 'hydra-api-token', 'e1f270e43bfd5b3c33bddd73b1dbaced1ebbd89d45c58d31b65cde5001ff667a', '[\"user\"]', '2023-10-21 06:23:12', '2023-10-21 05:57:04', '2023-10-21 06:23:12'),
(128, 'App\\Models\\User', 82, 'hydra-api-token', 'c739515b2ad0631d704a61b1744dac6817bc8cce91df709fb3818c44799f9ba0', '[\"user\"]', '2023-10-21 09:28:28', '2023-10-21 09:06:55', '2023-10-21 09:28:28'),
(129, 'App\\Models\\User', 83, 'hydra-api-token', '0a4b34af7fdab95e7c12e47513fa3e3415ed5bb692340723fccd615d2986e6fc', '[\"user\"]', '2023-10-21 10:31:16', '2023-10-21 09:30:05', '2023-10-21 10:31:16'),
(130, 'App\\Models\\User', 83, 'hydra-api-token', 'a543ae7d01e67502440c1c2492c56b77db545f10154f5441e26b8493b7b1fc70', '[\"user\"]', '2023-10-21 12:25:00', '2023-10-21 11:12:58', '2023-10-21 12:25:00'),
(131, 'App\\Models\\User', 82, 'hydra-api-token', '73d44d5ec79a1dd47570e84897127bf00425de2814b6831d7690de395f2724e8', '[\"user\"]', '2023-10-21 12:04:47', '2023-10-21 11:25:51', '2023-10-21 12:04:47'),
(132, 'App\\Models\\User', 83, 'hydra-api-token', 'dccbca4b49fc7a23631b84aa39a14cf95f81832c6cd8cd068a99bcb0002c2169', '[\"user\"]', '2023-10-21 18:29:09', '2023-10-21 18:29:03', '2023-10-21 18:29:09'),
(133, 'App\\Models\\User', 82, 'hydra-api-token', 'e9a85be3ce9a7fff28f85f2cc0b62417768cb1e0b488e7cb28df90f782d11d56', '[\"user\"]', '2023-10-21 19:27:19', '2023-10-21 18:29:13', '2023-10-21 19:27:19'),
(134, 'App\\Models\\User', 83, 'hydra-api-token', 'd973ce1c0a53e40aa413c84c90faf2f0d10b8b426c97ac599447ec447c54fcc9', '[\"user\"]', '2023-10-21 19:32:51', '2023-10-21 18:49:30', '2023-10-21 19:32:51'),
(135, 'App\\Models\\User', 83, 'hydra-api-token', 'ae3e57a6d26e42cea6ab45e043ca195ec2e7a779e781f8d995f0ccab2d7b2f0a', '[\"user\"]', '2023-10-21 19:27:23', '2023-10-21 19:27:20', '2023-10-21 19:27:23'),
(136, 'App\\Models\\User', 82, 'hydra-api-token', 'f9df3e2807311eaf23815f360a5c60f9e5d0dd58a5f1849ef224668a1e30b8d5', '[\"user\"]', '2023-10-21 19:31:52', '2023-10-21 19:27:26', '2023-10-21 19:31:52'),
(137, 'App\\Models\\User', 82, 'hydra-api-token', '972d04b956cb64d3c2db679f8ce01aa28d1a425d7ea8261087a6f859f884c2b0', '[\"user\"]', '2023-10-21 19:36:25', '2023-10-21 19:31:52', '2023-10-21 19:36:25'),
(138, 'App\\Models\\User', 82, 'hydra-api-token', '77babfdda018250b5e8b6f9f6e4b64e0268d63ffde683560d606bb9168523e74', '[\"user\"]', '2023-10-21 19:41:33', '2023-10-21 19:36:25', '2023-10-21 19:41:33'),
(139, 'App\\Models\\User', 82, 'hydra-api-token', 'dce1bfccfcd0c9ff3e7dd71379a546e7ac90170e3fda04256d93749d83e3be37', '[\"user\"]', '2023-10-22 01:42:56', '2023-10-22 01:37:09', '2023-10-22 01:42:56'),
(140, 'App\\Models\\User', 82, 'hydra-api-token', '2bfb6e55e1eeb2e3cee2f5b1a683bf1586a300eb168e5a5aeec17d19532ee6d5', '[\"user\"]', '2023-10-22 01:56:23', '2023-10-22 01:43:17', '2023-10-22 01:56:23'),
(141, 'App\\Models\\User', 82, 'hydra-api-token', '0fbb66d2a2ed9c3ab43ac41e88c0d094b887e4cf2c070e1ffdfcdd6c73068e8a', '[\"user\"]', '2023-10-22 01:50:37', '2023-10-22 01:49:17', '2023-10-22 01:50:37'),
(142, 'App\\Models\\User', 82, 'hydra-api-token', 'c39094e47cb102b2a7b8a5a418541f44e9635306515f31613fed69c4383fc853', '[\"user\"]', '2023-10-22 01:56:21', '2023-10-22 01:51:22', '2023-10-22 01:56:21'),
(143, 'App\\Models\\User', 83, 'hydra-api-token', 'f32da5889e48c0562378a841e79ab27329c6b05685e6712a2abd31712e05f007', '[\"user\"]', '2023-10-22 08:33:07', '2023-10-22 07:24:37', '2023-10-22 08:33:07'),
(144, 'App\\Models\\User', 82, 'hydra-api-token', '0ccc999593d4d5f53864ee06d39df916c0ad6c6456ec4f17fd184be8efb9dcfd', '[\"user\"]', '2023-10-22 11:57:33', '2023-10-22 07:25:09', '2023-10-22 11:57:33'),
(145, 'App\\Models\\User', 83, 'hydra-api-token', 'd96fd5bc68bc4a066b09263ac80ba3d33ca21fa020f890cf21de654cfdc820c6', '[\"user\"]', '2023-10-22 09:00:32', '2023-10-22 08:33:07', '2023-10-22 09:00:32'),
(146, 'App\\Models\\User', 83, 'hydra-api-token', 'f263f8c909e73ac9e9519f80c0f6eb59d07873383b4eb7ab98d8cbf231ce5666', '[\"user\"]', '2023-10-22 13:24:18', '2023-10-22 09:46:52', '2023-10-22 13:24:18'),
(147, 'App\\Models\\User', 82, 'hydra-api-token', '159096e9fdc227a7d09223c0ada2828935a71ed62311debfdf5c54e99417d951', '[\"user\"]', '2023-10-23 05:02:03', '2023-10-23 05:00:25', '2023-10-23 05:02:03'),
(148, 'App\\Models\\User', 82, 'hydra-api-token', '143463374824a1ec636cd5191dfc46f48b14714298487e07f0a76d57ccaf995b', '[\"user\"]', '2023-10-23 07:14:06', '2023-10-23 06:45:10', '2023-10-23 07:14:06'),
(149, 'App\\Models\\User', 83, 'hydra-api-token', 'ef0715d5437b46fe91bffbc61551bcd9b0ce108af6381868afd401f8cd3a9e6f', '[\"user\"]', '2023-10-23 12:47:00', '2023-10-23 09:17:41', '2023-10-23 12:47:00'),
(150, 'App\\Models\\User', 82, 'hydra-api-token', 'c1cd5d3bbc9c80504cc19ee4f9bcea709136d09f9ac8e62c4c9b170f8a68e0c0', '[\"user\"]', '2023-10-23 10:23:12', '2023-10-23 09:26:55', '2023-10-23 10:23:12'),
(151, 'App\\Models\\User', 82, 'hydra-api-token', 'db78414a78d118a30bc87b97931efbaa74896d062ab1144857c5ae75c4f46917', '[\"user\"]', '2023-10-23 17:01:11', '2023-10-23 15:20:50', '2023-10-23 17:01:11'),
(152, 'App\\Models\\User', 82, 'hydra-api-token', '1c8c7ad275ab9b15cff15828a07462d0aaff51d082df728e29301a99a997a9a8', '[\"user\"]', '2023-10-23 16:23:59', '2023-10-23 16:23:55', '2023-10-23 16:23:59'),
(153, 'App\\Models\\User', 82, 'hydra-api-token', '51e751421cdcef7e2a3d5952b0d5e3ad51b2bc3cdb10d771c03c1ab9b39b2b3e', '[\"user\"]', '2023-10-24 19:34:33', '2023-10-24 06:12:20', '2023-10-24 19:34:33'),
(154, 'App\\Models\\User', 84, 'hydra-api-token', '839ac72a179d97b21ab0e11f3fb6464b1117f120987b8c9aac6197490344a1de', '[\"user\"]', '2023-10-25 04:09:49', '2023-10-25 03:47:13', '2023-10-25 04:09:49'),
(159, 'App\\Models\\User', 85, 'hydra-api-token', '1f669f02da1031d96e903a27a6545fb0ea27eece74af6ceda28e93348c7687fe', '[\"admin\"]', '2023-10-25 00:55:48', '2023-10-25 00:55:43', '2023-10-25 00:55:48'),
(166, 'App\\Models\\User', 87, 'hydra-api-token', '7456359caadb8e82a5c656fb9de81e359f18807093e106c9e978ae5141e0521e', '[\"admin\"]', '2023-10-25 01:09:43', '2023-10-25 01:09:35', '2023-10-25 01:09:43'),
(167, 'App\\Models\\User', 1, 'hydra-api-token', '90bedf99456ac48f2a12e4babf703536dceb52eef973adb1b4b9b5ce7c2b72f6', '[\"admin\"]', '2023-10-26 09:36:19', '2023-10-26 09:36:13', '2023-10-26 09:36:19'),
(170, 'App\\Models\\User', 81, 'hydra-api-token', '8adc280acef6897d89cc1fbbd2775e59f86ce083d042d4cc578bb919944cd3d5', '[\"admin\"]', '2023-10-26 11:31:42', '2023-10-26 10:39:53', '2023-10-26 11:31:42'),
(171, 'App\\Models\\User', 81, 'hydra-api-token', 'eae4c2cd20b14e8914d288db8986e54b977a28c28b595353deeee2f59b73c79e', '[\"admin\"]', '2023-10-26 11:02:09', '2023-10-26 10:50:25', '2023-10-26 11:02:09'),
(172, 'App\\Models\\User', 83, 'hydra-api-token', '2339870a99ccd854a661aa2f0e3dfa2a4d5d2a41021ce31f59b233fe4a377728', '[\"user\"]', '2023-10-26 11:30:59', '2023-10-26 10:54:19', '2023-10-26 11:30:59'),
(173, 'App\\Models\\User', 82, 'hydra-api-token', 'e4b698e64c7a7e1cc9066c652cadc76825bb272db1bff6e6a87443c760c8e798', '[\"user\"]', '2023-10-26 11:11:36', '2023-10-26 10:54:20', '2023-10-26 11:11:36'),
(174, 'App\\Models\\User', 82, 'hydra-api-token', 'd741996c0eb3c8124b48915630e52b6c076a4679347fa43fc79b329a41b8b105', '[\"user\"]', '2023-10-26 11:22:05', '2023-10-26 10:56:57', '2023-10-26 11:22:05'),
(175, 'App\\Models\\User', 83, 'hydra-api-token', '737d840335d02a0e37b64a67d5394d1dbed626b6b2f5b2237ee5b09637ae7bd1', '[\"user\"]', '2023-10-26 11:10:14', '2023-10-26 11:02:36', '2023-10-26 11:10:14'),
(176, 'App\\Models\\User', 81, 'hydra-api-token', '80856264ff92c9c6361b29dab7e23534fc272c585537d279452f66684ab0ccbe', '[\"admin\"]', '2023-10-26 12:29:15', '2023-10-26 11:10:34', '2023-10-26 12:29:15'),
(177, 'App\\Models\\User', 83, 'hydra-api-token', 'e7d0dacf82236e259e74cd637af942ef1c210d3e6f64e16ebb72ca4d018f4924', '[\"user\"]', '2023-10-26 11:11:51', '2023-10-26 11:11:48', '2023-10-26 11:11:51'),
(178, 'App\\Models\\User', 83, 'hydra-api-token', '8e1846a669abac7d340340cc2c1eacd455ef36f91fa5c9913092e0d35d8675c2', '[\"user\"]', '2023-10-26 12:26:37', '2023-10-26 11:14:14', '2023-10-26 12:26:37'),
(179, 'App\\Models\\User', 81, 'hydra-api-token', '07e847affb0ed33cc1f6e23eef744100b05242ddaf0b6e0520c74ac67ec1408e', '[\"admin\"]', '2023-10-26 11:15:54', '2023-10-26 11:14:20', '2023-10-26 11:15:54'),
(180, 'App\\Models\\User', 82, 'hydra-api-token', 'b480261340b52b2a097fb7ae9c4354ee35e19871336b9757a9f092f400025b92', '[\"user\"]', '2023-10-26 11:26:55', '2023-10-26 11:14:53', '2023-10-26 11:26:55'),
(181, 'App\\Models\\User', 82, 'hydra-api-token', '9f413179a8a9d273421662034df6c19ad52ab4bc5ab38650bc4bf1bdb40fa82c', '[\"user\"]', '2023-10-26 11:30:51', '2023-10-26 11:22:05', '2023-10-26 11:30:51'),
(182, 'App\\Models\\User', 83, 'hydra-api-token', 'e0d9009e286a7d9abb7c9df72487b4c18addfba9b0a8134fc060ed249653002e', '[\"user\"]', '2023-10-26 11:31:07', '2023-10-26 11:30:55', '2023-10-26 11:31:07'),
(183, 'App\\Models\\User', 83, 'hydra-api-token', 'f12ff0e11af33fba8a8d9926472c1aec582af02bd130b4bbd1da93d147e85237', '[\"user\"]', '2023-10-26 13:53:35', '2023-10-26 11:31:05', '2023-10-26 13:53:35'),
(184, 'App\\Models\\User', 82, 'hydra-api-token', '70ea8b67d825216966a696f5ac8ec433663416c3569551e9df7a7d494cbb30ed', '[\"user\"]', '2023-10-26 13:46:39', '2023-10-26 11:31:11', '2023-10-26 13:46:39'),
(185, 'App\\Models\\User', 82, 'hydra-api-token', 'e7e8b54127c5d724e21db35a646bc7f059dc5a67c07f4f73035e0dfe4ec8a2cd', '[\"user\"]', '2023-10-26 12:18:38', '2023-10-26 11:32:10', '2023-10-26 12:18:38'),
(186, 'App\\Models\\User', 82, 'hydra-api-token', 'b64ee81892aa2a90227c0fe9fc021395677f16036471f93d587dc680e491b451', '[\"user\"]', '2023-10-26 11:59:39', '2023-10-26 11:59:07', '2023-10-26 11:59:39'),
(187, 'App\\Models\\User', 83, 'hydra-api-token', '120ac70475c524e7bdf022c47372a01c095fab374ff7688d30af129d76ae292b', '[\"user\"]', '2023-10-26 13:48:09', '2023-10-26 13:03:19', '2023-10-26 13:48:09'),
(188, 'App\\Models\\User', 82, 'hydra-api-token', '96b48a1547f94fa2373c667f2f7781965cd472602cf4b3b3cbca1bfc44509e4a', '[\"user\"]', '2023-10-26 13:48:04', '2023-10-26 13:03:52', '2023-10-26 13:48:04'),
(189, 'App\\Models\\User', 82, 'hydra-api-token', 'b36e4becc3859f00634206c4d1ae7f09d5bd0ab88964a22c88bae9262f7b83aa', '[\"user\"]', '2023-10-26 13:25:27', '2023-10-26 13:13:45', '2023-10-26 13:25:27'),
(190, 'App\\Models\\User', 82, 'hydra-api-token', 'fe2f242d710736ccd0f8ffc3959c1417cd65a75804b58cfaa468a0e5ae165827', '[\"user\"]', '2023-10-27 05:45:55', '2023-10-27 05:32:01', '2023-10-27 05:45:55'),
(191, 'App\\Models\\User', 81, 'hydra-api-token', 'b18806a3003d15a0c6fca7420bafacec6bf44f78edb86b3637947c110d5024ae', '[\"admin\"]', '2023-10-28 04:37:30', '2023-10-28 04:18:51', '2023-10-28 04:37:30'),
(192, 'App\\Models\\User', 83, 'hydra-api-token', 'b32ffe200b60b74d109a88f36754811f7a2d687663d61cda200b26541dcd743e', '[\"user\"]', '2023-10-28 05:14:55', '2023-10-28 04:21:08', '2023-10-28 05:14:55'),
(193, 'App\\Models\\User', 81, 'hydra-api-token', 'a9026b00686aab1a7c2c3c96247bddb3c48379268fccface7af712cfd6c6d504', '[\"admin\"]', '2023-10-28 04:52:25', '2023-10-28 04:26:53', '2023-10-28 04:52:25'),
(195, 'App\\Models\\User', 1, 'hydra-api-token', 'b4e918852abf469aa30a9590789e774382b7a4d631e3e5d9e66e26d4e2a30151', '[\"admin\"]', '2023-10-28 07:49:45', '2023-10-28 07:49:32', '2023-10-28 07:49:45'),
(196, 'App\\Models\\User', 81, 'hydra-api-token', '269a596c0ac89c9b69da3b8f244a805a2bed4a1d754d08d0bae1272210801b0a', '[\"admin\"]', '2023-10-28 12:14:44', '2023-10-28 09:17:11', '2023-10-28 12:14:44'),
(197, 'App\\Models\\User', 82, 'hydra-api-token', 'd64f66caa030360826d39ae4cbcc13c3ff24805db73b0cd4c800939d9d3fb20e', '[\"user\"]', '2023-10-30 04:41:31', '2023-10-30 03:48:07', '2023-10-30 04:41:31'),
(198, 'App\\Models\\User', 82, 'hydra-api-token', 'f3a2754e7ce6faa2742910e689e0174d32ba051f433bd72da86484878e2f0c62', '[\"user\"]', '2023-10-30 04:16:40', '2023-10-30 04:16:16', '2023-10-30 04:16:40'),
(199, 'App\\Models\\User', 82, 'hydra-api-token', '16778d8465112c64941a29f32f1a81ed87b2c07e8ef34e570cba1068373f221c', '[\"user\"]', '2023-10-30 04:51:27', '2023-10-30 04:47:52', '2023-10-30 04:51:27'),
(200, 'App\\Models\\User', 82, 'hydra-api-token', '6560a938f6611411349c922aeb2a8bf21e9e34a258c7151ecd1330a6e874673c', '[\"user\"]', '2023-10-30 05:24:23', '2023-10-30 05:08:39', '2023-10-30 05:24:23'),
(201, 'App\\Models\\User', 82, 'hydra-api-token', '6328e8a8ab86f17dee33dc7653fe375254589e035e4a7bf87fa4fc29b87af306', '[\"user\"]', '2023-10-30 10:44:22', '2023-10-30 05:26:15', '2023-10-30 10:44:22'),
(202, 'App\\Models\\User', 82, 'hydra-api-token', '50fce4efa6d23f8bb0170e6b57a77da937c86e46166ea048eae3c5f825f357d0', '[\"user\"]', '2023-10-30 10:30:19', '2023-10-30 10:30:10', '2023-10-30 10:30:19'),
(203, 'App\\Models\\User', 82, 'hydra-api-token', 'a97d5a571fc5fd48b26a2cb09916763a16d335ba855b1a6bdbcbe5c032ba1967', '[\"user\"]', '2023-10-30 11:16:56', '2023-10-30 10:34:01', '2023-10-30 11:16:56'),
(204, 'App\\Models\\User', 82, 'hydra-api-token', 'c8022ac0f4ef394bcf2239e754a96f5a465e05ff416e58e35881d61824cc38a2', '[\"user\"]', NULL, '2023-10-30 11:17:04', '2023-10-30 11:17:04'),
(205, 'App\\Models\\User', 82, 'hydra-api-token', 'c43d3773576b47e916a20488568db2b3abc508897ba0a93a8c2abb399d7b1efb', '[\"user\"]', '2023-10-30 17:34:49', '2023-10-30 16:49:37', '2023-10-30 17:34:49'),
(206, 'App\\Models\\User', 82, 'hydra-api-token', '51bc3421e0c046e83768b0193c254c7ea1e6f912ea123716c7b7072b906ff414', '[\"user\"]', '2023-10-30 17:35:30', '2023-10-30 17:35:14', '2023-10-30 17:35:30'),
(207, 'App\\Models\\User', 83, 'hydra-api-token', '80c8a7fa67d1f4d995cc3c2dc31d768c8b7556a01b134c2fbccb2ab309913243', '[\"user\"]', '2023-10-30 18:51:02', '2023-10-30 17:58:15', '2023-10-30 18:51:02'),
(208, 'App\\Models\\User', 82, 'hydra-api-token', 'e7652c88bbb25b191a1c2c29ba64f212d29946a87a984d665c2a0a437b40a40a', '[\"user\"]', '2023-10-30 18:50:10', '2023-10-30 17:58:18', '2023-10-30 18:50:10'),
(209, 'App\\Models\\User', 82, 'hydra-api-token', '36e77272084b0e76c6623bd4f2ddd142865637e42d7c4d20601aa87f7c9c98f5', '[\"user\"]', NULL, '2023-10-30 18:51:19', '2023-10-30 18:51:19'),
(210, 'App\\Models\\User', 1, 'hydra-api-token', '4e324146606835bedfaa04b97ae6cc6d25febeb34a46e5e9b3235c4e18bf9353', '[\"admin\"]', '2023-10-31 10:05:40', '2023-10-31 10:03:45', '2023-10-31 10:05:40'),
(211, 'App\\Models\\User', 82, 'hydra-api-token', '086c016e93715344e887a486ad3d493b9cf9c23a8eefc01efd650690e94e0c17', '[\"user\"]', '2023-10-31 10:50:43', '2023-10-31 10:43:41', '2023-10-31 10:50:43'),
(212, 'App\\Models\\User', 82, 'hydra-api-token', 'c370fd4b604bb2c91b8b4e8e072031a1e00568744fead727cff44906023608c1', '[\"user\"]', '2023-10-31 13:14:18', '2023-10-31 10:57:01', '2023-10-31 13:14:18'),
(213, 'App\\Models\\User', 82, 'hydra-api-token', '6d65c433ab77d0ee2d809c2dc4e5e81045be439a71d7edb53181f353fe8d3e47', '[\"user\"]', '2023-10-31 13:24:18', '2023-10-31 13:24:15', '2023-10-31 13:24:18'),
(214, 'App\\Models\\User', 83, 'hydra-api-token', '37350c6272ed99bd05f41977953cc8687b6ce117edff5c1ee870ec4f08a19f38', '[\"user\"]', NULL, '2023-10-31 17:37:16', '2023-10-31 17:37:16'),
(215, 'App\\Models\\User', 87, 'hydra-api-token', '74c448b0cea99b2407779320bf560ae7911eb0cb34a09db1cfb9a1b386cc0221', '[\"admin\"]', '2023-11-01 05:13:23', '2023-11-01 05:13:16', '2023-11-01 05:13:23'),
(216, 'App\\Models\\User', 1, 'hydra-api-token', '4ca2d7608f7f1978f5696a2ea7585d645e0c429c4c1c356cd6bad332f1152ed8', '[\"admin\"]', '2023-11-01 07:00:18', '2023-11-01 07:00:12', '2023-11-01 07:00:18'),
(217, 'App\\Models\\User', 87, 'hydra-api-token', '5b8e00a642c7d90fff324f2a5b15648106f3ea3625a8e32762968b204f9d6c53', '[\"admin\"]', '2023-11-01 07:08:19', '2023-11-01 07:01:11', '2023-11-01 07:08:19'),
(218, 'App\\Models\\User', 89, 'hydra-api-token', '989e35e59852a9ae6cb2716383b2dd15ce119a3289b81b0223ecccb564e2dea3', '[\"user\"]', '2023-11-01 10:10:10', '2023-11-01 08:37:07', '2023-11-01 10:10:10'),
(220, 'App\\Models\\User', 89, 'hydra-api-token', 'f769f9c795921facba6077570c842af217f7c5a51b98cc812732077fe07a21a2', '[\"user\"]', '2023-11-01 11:18:16', '2023-11-01 08:47:52', '2023-11-01 11:18:16'),
(221, 'App\\Models\\User', 87, 'hydra-api-token', 'f5ad80553e2f5a5295e0c8fb9664f2c151b22ce83e701329ca8b6f8f15e97887', '[\"admin\"]', '2023-11-01 09:12:06', '2023-11-01 08:47:52', '2023-11-01 09:12:06'),
(222, 'App\\Models\\User', 87, 'hydra-api-token', 'ce2a871c8a9f7074d67318c3405b8d31a4dc7f63235e003abeb8ea76e42a3438', '[\"admin\"]', '2023-11-01 09:20:51', '2023-11-01 09:13:04', '2023-11-01 09:20:51'),
(223, 'App\\Models\\User', 87, 'hydra-api-token', '00fb4ffc5438d327002d64a738a5445e1d35bcd9aa24d20c8606b351b1c5d14e', '[\"admin\"]', '2023-11-01 09:59:50', '2023-11-01 09:21:44', '2023-11-01 09:59:50'),
(224, 'App\\Models\\User', 89, 'hydra-api-token', '1d936067e3e0e04d62ae6055ee8ce53dc10c5ae8e272d4afeec6b04ce4655235', '[\"user\"]', '2023-11-01 09:24:34', '2023-11-01 09:24:28', '2023-11-01 09:24:34'),
(226, 'App\\Models\\User', 85, 'hydra-api-token', 'dc014fa6bb59c5f7cdfe30b0fb0ec18ee25fd1d95a0f02a839853263ac0f1dbf', '[\"admin\"]', '2023-11-01 09:32:08', '2023-11-01 09:32:04', '2023-11-01 09:32:08'),
(227, 'App\\Models\\User', 90, 'hydra-api-token', '2e6e1fad7fbb92b1888b70bb0b814b1d82679befa88bd7fb8f859b93db07d97b', '[\"user\"]', '2023-11-01 10:09:01', '2023-11-01 09:33:02', '2023-11-01 10:09:01'),
(228, 'App\\Models\\User', 90, 'hydra-api-token', 'a3e48feab514715cdf5ddb9ac5fcae0018f7f149a9f07f2ffd489321312984ac', '[\"user\"]', '2023-11-01 10:33:45', '2023-11-01 09:33:13', '2023-11-01 10:33:45'),
(229, 'App\\Models\\User', 90, 'hydra-api-token', '0ba03032e3a88097abc3acf2ea15bc8790c402d988cdf0a7c816c075c91fcb82', '[\"user\"]', '2023-11-01 11:49:37', '2023-11-01 09:43:29', '2023-11-01 11:49:37'),
(230, 'App\\Models\\User', 82, 'hydra-api-token', 'd8ead064f040874c1208ba496ba42a411a44d0d24e71835278c4b3602ceec68f', '[\"user\"]', '2023-11-01 10:01:27', '2023-11-01 10:01:17', '2023-11-01 10:01:27'),
(231, 'App\\Models\\User', 87, 'hydra-api-token', 'bef12d2bf4bf8c1baccf6d77c6e4cd1dfcc584891ccb955309aed48ce7b4f302', '[\"admin\"]', '2023-11-01 10:14:33', '2023-11-01 10:09:53', '2023-11-01 10:14:33'),
(232, 'App\\Models\\User', 90, 'hydra-api-token', 'ab104e03b4727d65f2491040879969b10a88719bc309f210fd1a870d79bdd761', '[\"user\"]', '2023-11-01 10:43:58', '2023-11-01 10:15:34', '2023-11-01 10:43:58'),
(233, 'App\\Models\\User', 82, 'hydra-api-token', 'ba128a38ff07c4f6d23037112d79cf9e20fecc95bd8f38a7586c84d44a2d1351', '[\"user\"]', '2023-11-01 13:14:08', '2023-11-01 10:52:48', '2023-11-01 13:14:08'),
(234, 'App\\Models\\User', 87, 'hydra-api-token', '862db423799faa216653c764b627f16c7eb7074643d8bf32467018e3386759ec', '[\"admin\"]', '2023-11-01 11:03:12', '2023-11-01 10:54:00', '2023-11-01 11:03:12'),
(236, 'App\\Models\\User', 87, 'hydra-api-token', '57745a6044f994d6199bcbeed325fc97c47658cd3bce4245d506502f756e1acf', '[\"admin\"]', '2023-11-01 11:23:06', '2023-11-01 11:12:48', '2023-11-01 11:23:06'),
(237, 'App\\Models\\User', 87, 'hydra-api-token', 'cbe2883fbf068e2b57c3262451c57eeaccfd6c98b7c319de4d048e1cf3409718', '[\"admin\"]', '2023-11-01 11:14:40', '2023-11-01 11:13:52', '2023-11-01 11:14:40'),
(238, 'App\\Models\\User', 82, 'hydra-api-token', 'ff118b632a321b4049d5f7aa92d2c0a9e7ccb857f4a2ddec6eaa50bf3d34b337', '[\"user\"]', '2023-11-01 13:06:11', '2023-11-01 11:54:32', '2023-11-01 13:06:11'),
(239, 'App\\Models\\User', 83, 'hydra-api-token', '202ff529dbc8c0f4131bef5e9a7f814259092eca88210bbffc5c9979959dbd93', '[\"user\"]', '2023-11-01 13:06:10', '2023-11-01 11:55:18', '2023-11-01 13:06:10'),
(240, 'App\\Models\\User', 90, 'hydra-api-token', '613bcafe82dfc4bf29dc43bd705d39d68a059812a9b588a80deb75b6b55d396e', '[\"user\"]', '2023-11-01 12:57:51', '2023-11-01 11:59:11', '2023-11-01 12:57:51'),
(241, 'App\\Models\\User', 87, 'hydra-api-token', '9b24d48e7de7d622ce0e581f0ee14735a2965a399203299900f7e064d3e2725d', '[\"admin\"]', '2023-11-01 12:05:41', '2023-11-01 12:05:39', '2023-11-01 12:05:41'),
(243, 'App\\Models\\User', 89, 'hydra-api-token', '717a524bdd68c39454cb88ee51433926f94600bcebb4ab26c3be766ca4e9f7d9', '[\"user\"]', '2023-11-01 13:49:10', '2023-11-01 12:10:21', '2023-11-01 13:49:10'),
(244, 'App\\Models\\User', 86, 'hydra-api-token', '3d465e4e4b25f61768588e9a1be446b31b473a52c30e24223757ff2eb987d6c7', '[\"admin\"]', '2023-11-01 13:28:37', '2023-11-01 12:12:08', '2023-11-01 13:28:37'),
(245, 'App\\Models\\User', 90, 'hydra-api-token', 'e53fad6052cb02ff0c96b48d0881ef7ded38b63cb761f7ac810c0ff476e990c2', '[\"user\"]', '2023-11-01 12:52:14', '2023-11-01 12:37:47', '2023-11-01 12:52:14'),
(246, 'App\\Models\\User', 86, 'hydra-api-token', '4190fcb92e0f6b211955766edfb13562ef6943b28f949b100afc092cd5c554b4', '[\"admin\"]', '2023-11-01 12:54:20', '2023-11-01 12:39:13', '2023-11-01 12:54:20'),
(247, 'App\\Models\\User', 84, 'hydra-api-token', '9a3dc33dfbf858f36d88c5b40d76369f603009b4e2755c090f44250e9c176225', '[\"user\"]', NULL, '2023-11-01 12:39:14', '2023-11-01 12:39:14'),
(248, 'App\\Models\\User', 84, 'hydra-api-token', '698e6b76e1230ec193c6e03737d2f96bfb25a4bc053c16b4720a5d1911f80671', '[\"user\"]', '2023-11-01 12:45:49', '2023-11-01 12:40:19', '2023-11-01 12:45:49'),
(249, 'App\\Models\\User', 90, 'hydra-api-token', 'b2eac2b0c8c9660b5ff92afb82a9122536d0e380115f4d021c277727b8da3121', '[\"user\"]', '2023-11-01 12:46:59', '2023-11-01 12:40:54', '2023-11-01 12:46:59'),
(250, 'App\\Models\\User', 90, 'hydra-api-token', '448e191f605a2516599cad502b8d8ebecde26f72cd9a0bdbab9fc99b5a99b8f3', '[\"user\"]', '2023-11-01 12:45:08', '2023-11-01 12:43:14', '2023-11-01 12:45:08'),
(252, 'App\\Models\\User', 90, 'hydra-api-token', '068df44796804976e93abe0424300fd9532fb88ca59d67434ec838128115ac58', '[\"user\"]', '2023-11-01 12:48:59', '2023-11-01 12:46:59', '2023-11-01 12:48:59'),
(254, 'App\\Models\\User', 90, 'hydra-api-token', '90eeeaf0afb62fee2e7c16a69b4046ce3b56e06f8cc452817a89b1fcf6f13908', '[\"user\"]', '2023-11-01 14:11:01', '2023-11-01 12:58:03', '2023-11-01 14:11:01'),
(256, 'App\\Models\\User', 83, 'hydra-api-token', '637e3473dbafe0f32888d474eda9947d408a5c29c5c552d45bd66090b447e144', '[\"user\"]', NULL, '2023-11-01 13:06:10', '2023-11-01 13:06:10'),
(257, 'App\\Models\\User', 82, 'hydra-api-token', 'f4e1b49f8437dfc147d5b99a4b8a4cb706fcab42a1ccc0c885948a7edb5134a5', '[\"user\"]', '2023-11-01 14:11:10', '2023-11-01 13:06:12', '2023-11-01 14:11:10'),
(258, 'App\\Models\\User', 83, 'hydra-api-token', '93aab3f802e887078acbc70ec9d31943aeb684292f86f20ea38cd3d10777005d', '[\"user\"]', '2023-11-01 14:11:11', '2023-11-01 13:06:43', '2023-11-01 14:11:11'),
(259, 'App\\Models\\User', 82, 'hydra-api-token', '9d1a793753c353bb4198bb501d61394478c3abb007a21d650315948212083761', '[\"user\"]', '2023-11-01 13:10:28', '2023-11-01 13:10:19', '2023-11-01 13:10:28'),
(261, 'App\\Models\\User', 86, 'hydra-api-token', 'e971bd59104f9db66cd20322beef9c2d28cd8a614ac292f421d99c8c37952f27', '[\"admin\"]', '2023-11-01 13:31:58', '2023-11-01 13:24:15', '2023-11-01 13:31:58'),
(262, 'App\\Models\\User', 86, 'hydra-api-token', 'd6ed858158f870fe1c862dac07d0d3a44e1a56c176439d9e2e607160883b7bf2', '[\"admin\"]', '2023-11-01 13:44:57', '2023-11-01 13:25:28', '2023-11-01 13:44:57'),
(263, 'App\\Models\\User', 86, 'hydra-api-token', 'a6744cad923248a810c88a34aec1349cc19d1ed6f2f0291c0a2243520b9236fe', '[\"admin\"]', '2023-11-01 13:32:33', '2023-11-01 13:32:02', '2023-11-01 13:32:33'),
(264, 'App\\Models\\User', 91, 'hydra-api-token', 'c7488789319a23c2159cab656ec9a8f45f8e19232123f8e0531bce35141acbd4', '[\"user\"]', NULL, '2023-11-01 13:39:25', '2023-11-01 13:39:25'),
(265, 'App\\Models\\User', 86, 'hydra-api-token', '642f95d53e5ec60ad3b1d5d982bfc421a93d0a56a6eefb59b759216d29dd4b8b', '[\"admin\"]', '2023-11-01 13:45:13', '2023-11-01 13:40:18', '2023-11-01 13:45:13'),
(266, 'App\\Models\\User', 91, 'hydra-api-token', 'ea029ce8134bf26d627df7ba4a9130b9497b51a3bcace391808ed5f5229511bc', '[\"user\"]', '2023-11-01 14:11:07', '2023-11-01 13:41:06', '2023-11-01 14:11:07'),
(267, 'App\\Models\\User', 90, 'hydra-api-token', 'c4c0b7b6231d06c8d0c9bef276b1c27058ee794a45ab6b7897b593074a541106', '[\"user\"]', '2023-11-02 06:07:57', '2023-11-02 06:05:42', '2023-11-02 06:07:57'),
(268, 'App\\Models\\User', 90, 'hydra-api-token', '5ec5b4dad8a8d9b64ce25a8aba8122103fc1841be0d97c941a211f60aab132cf', '[\"user\"]', '2023-11-02 12:24:32', '2023-11-02 07:54:49', '2023-11-02 12:24:32'),
(269, 'App\\Models\\User', 89, 'hydra-api-token', '162a0e68a97439d94001b8dd736e0bafef1e1459c67b7d69ea07a7985dbe00bc', '[\"user\"]', '2023-11-02 12:24:31', '2023-11-02 07:55:27', '2023-11-02 12:24:31'),
(270, 'App\\Models\\User', 83, 'hydra-api-token', '43b2c06cc2f8abf3fad52a0c054b500aea118e645adae29f63085912abd21cab', '[\"user\"]', '2023-11-02 12:24:32', '2023-11-02 08:00:55', '2023-11-02 12:24:32'),
(271, 'App\\Models\\User', 82, 'hydra-api-token', 'a2a2cdd3ffaa604f9a9b7da4acdb6be0ac031304c1cc4c6fa63628fb45afdd57', '[\"user\"]', '2023-11-02 12:24:31', '2023-11-02 08:01:27', '2023-11-02 12:24:31'),
(272, 'App\\Models\\User', 82, 'hydra-api-token', 'bbb268bcc0d328c93cc25674ab5a09e02a046e5d1e594fe73078725476b1aed7', '[\"user\"]', '2023-11-02 08:07:26', '2023-11-02 08:06:54', '2023-11-02 08:07:26'),
(273, 'App\\Models\\User', 83, 'hydra-api-token', '48cec7b03a68a29b76f7aed369dd1e32c9a39ad34b1de2106caaa4654e84f6ef', '[\"user\"]', '2023-11-02 08:27:22', '2023-11-02 08:13:03', '2023-11-02 08:27:22'),
(274, 'App\\Models\\User', 82, 'hydra-api-token', '5e4475adeb6defb216c1673c9d732bb6bd35a3849bffbac78d194e4566244c4d', '[\"user\"]', '2023-11-02 08:26:48', '2023-11-02 08:17:04', '2023-11-02 08:26:48'),
(275, 'App\\Models\\User', 84, 'hydra-api-token', 'b68af512f463ea8c6dbbb66774317fd144a632f69450997438b84f02680b6ddd', '[\"user\"]', '2023-11-02 09:03:03', '2023-11-02 08:19:59', '2023-11-02 09:03:03'),
(276, 'App\\Models\\User', 86, 'hydra-api-token', '80a0fc54f3c105c513083c0843aafb37d723522a8ba0fc4b0a39f13c21d805b6', '[\"admin\"]', '2023-11-02 12:24:32', '2023-11-02 08:25:08', '2023-11-02 12:24:32'),
(277, 'App\\Models\\User', 83, 'hydra-api-token', '42a5fbca3ac4fabde251d77da4ddaa288f43ac963e00ef572e3f7b0e026989e2', '[\"user\"]', '2023-11-02 13:19:25', '2023-11-02 11:27:44', '2023-11-02 13:19:25'),
(278, 'App\\Models\\User', 82, 'hydra-api-token', 'bb0ec2c23f33b56694f15744e2cdb3d5392622fce64ad641ab028bf46d83ba8b', '[\"user\"]', '2023-11-02 14:04:45', '2023-11-02 11:28:03', '2023-11-02 14:04:45'),
(279, 'App\\Models\\User', 81, 'hydra-api-token', '193b9fd91c2171e5666e565ec9238ded5ba69b143a7e509de9f08715d37876b2', '[\"admin\"]', '2023-11-02 12:37:14', '2023-11-02 12:18:21', '2023-11-02 12:37:14'),
(280, 'App\\Models\\User', 82, 'hydra-api-token', 'cf83d4a6f5111f7453d37751355753a826cad6706b58a6abe812c90c639689d4', '[\"user\"]', '2023-11-02 13:28:39', '2023-11-02 12:24:45', '2023-11-02 13:28:39'),
(281, 'App\\Models\\User', 83, 'hydra-api-token', '2336c8cc31e66627cff33774caab8eed36006b6756cdb1a54fa0c9044a49c512', '[\"user\"]', '2023-11-02 13:28:39', '2023-11-02 12:25:30', '2023-11-02 13:28:39'),
(282, 'App\\Models\\User', 86, 'hydra-api-token', '5e2923f7203207bb1813e0bb3f2dce5eedff70cf735a695c25d000af58a2644d', '[\"admin\"]', '2023-11-02 14:54:42', '2023-11-02 12:38:17', '2023-11-02 14:54:42'),
(283, 'App\\Models\\User', 84, 'hydra-api-token', 'fb5e2d3e5e60b6b6863a6f44183acd193cfa28615b3c1c8f0b3c02f33b6e0935', '[\"user\"]', '2023-11-02 13:17:41', '2023-11-02 12:54:21', '2023-11-02 13:17:41'),
(284, 'App\\Models\\User', 87, 'hydra-api-token', 'fa0dfbcc7d982eec8415b899081eddfffaa2e386a3d2fd102beaa2cf1261f414', '[\"admin\"]', '2023-11-02 14:23:55', '2023-11-02 12:54:52', '2023-11-02 14:23:55'),
(285, 'App\\Models\\User', 90, 'hydra-api-token', '5be0e5a19525c0a92a5f4202c40b4bbd56ae5329fce8f94c89b803fefb318f28', '[\"user\"]', '2023-11-02 13:17:35', '2023-11-02 13:17:01', '2023-11-02 13:17:35'),
(286, 'App\\Models\\User', 83, 'hydra-api-token', '00f27294f5142d52a803dbf37f765fb9f64e9bf400cb04df9d9b7aee3d1877e4', '[\"user\"]', '2023-11-02 13:21:29', '2023-11-02 13:19:25', '2023-11-02 13:21:29'),
(287, 'App\\Models\\User', 83, 'hydra-api-token', 'e9086b8557e1229d93260083905e17de08652a069cc49e3f9f2efbb3839ec1d0', '[\"user\"]', NULL, '2023-11-02 13:21:27', '2023-11-02 13:21:27'),
(288, 'App\\Models\\User', 83, 'hydra-api-token', '2698d16756a1972dc129f46fedbb0eaf86a128438365310a2f5871386b8a5bc3', '[\"user\"]', '2023-11-02 13:27:16', '2023-11-02 13:21:32', '2023-11-02 13:27:16');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(289, 'App\\Models\\User', 81, 'hydra-api-token', '5cc712881dcef38f50dbd97dcaaa4525694b7f6477ec833840619d1be1ece847', '[\"admin\"]', '2023-11-02 15:08:30', '2023-11-02 13:27:38', '2023-11-02 15:08:30'),
(290, 'App\\Models\\User', 89, 'hydra-api-token', 'dcbf518c2753db4cf08882803897b5e9ce07593c3009ab5f6146bf387ad02a51', '[\"user\"]', NULL, '2023-11-02 13:28:39', '2023-11-02 13:28:39'),
(291, 'App\\Models\\User', 89, 'hydra-api-token', 'b111f34d781e9193c26caf9043ab89567f0e99f9380092e71cc428ce91cca780', '[\"user\"]', '2023-11-02 13:42:15', '2023-11-02 13:29:10', '2023-11-02 13:42:15'),
(292, 'App\\Models\\User', 90, 'hydra-api-token', '3bc9945a27f4d93c9b65e0977e74aa98c560034488b494b3aa94ea219395d0c0', '[\"user\"]', '2023-11-02 14:06:24', '2023-11-02 13:29:41', '2023-11-02 14:06:24'),
(293, 'App\\Models\\User', 82, 'hydra-api-token', 'b40308c2d453d77ac4f3a9d50faebb1bf9cdeb9480815b5ac6dc13bb1b41f0b7', '[\"user\"]', '2023-11-02 14:04:26', '2023-11-02 13:51:00', '2023-11-02 14:04:26'),
(294, 'App\\Models\\User', 83, 'hydra-api-token', '1f56129776231d28bcb6d24edf7419cd5dc0e1a7aa40a199b00bab43187dc8c7', '[\"user\"]', '2023-11-02 14:54:44', '2023-11-02 14:26:11', '2023-11-02 14:54:44'),
(295, 'App\\Models\\User', 82, 'hydra-api-token', 'caa4380ff881906f7568815dc6953240dde0410d5f6669760de497cce40ebe0e', '[\"user\"]', '2023-11-02 14:29:26', '2023-11-02 14:26:55', '2023-11-02 14:29:26'),
(296, 'App\\Models\\User', 87, 'hydra-api-token', '6535a8157529a1adbd5581a0600d830432f3814522f79ecfd58289eedec4d2b3', '[\"admin\"]', '2023-11-02 15:01:59', '2023-11-02 14:55:20', '2023-11-02 15:01:59'),
(297, 'App\\Models\\User', 83, 'hydra-api-token', '37859bc1c59e84ce44879e294ad71f3e8b7375450b5d419977c209cc2b862c8e', '[\"user\"]', '2023-11-02 15:46:20', '2023-11-02 14:56:54', '2023-11-02 15:46:20'),
(298, 'App\\Models\\User', 82, 'hydra-api-token', 'e323b71578e29734a6f2bff6cfc8d191e9af0a2059f5e23dcb9c2f6ffd8cb750', '[\"user\"]', '2023-11-02 15:09:29', '2023-11-02 15:06:43', '2023-11-02 15:09:29'),
(299, 'App\\Models\\User', 82, 'hydra-api-token', '3ad2b05e1dfe7a8e15609083704409c79a84ea117b380ecdbac734ae3ae1d75f', '[\"user\"]', '2023-11-02 16:09:59', '2023-11-02 16:08:55', '2023-11-02 16:09:59'),
(300, 'App\\Models\\User', 84, 'hydra-api-token', 'c7e712b0c6e1e34967a1064ac12141f8edd07fb8116b5d372a96016f83be1b10', '[\"user\"]', '2023-11-02 18:45:29', '2023-11-02 17:45:32', '2023-11-02 18:45:29'),
(301, 'App\\Models\\User', 86, 'hydra-api-token', 'e383bdf807b68bba402413eda535db994ad01e51001655f53263289e9c9b43d7', '[\"admin\"]', '2023-11-02 18:10:12', '2023-11-02 17:46:45', '2023-11-02 18:10:12'),
(302, 'App\\Models\\User', 87, 'hydra-api-token', 'b13fea8290e26d8ddbfdd5a030dc2164f7d805ad3d0dd53d781e5166896b2326', '[\"admin\"]', '2023-11-02 18:13:11', '2023-11-02 17:47:46', '2023-11-02 18:13:11'),
(303, 'App\\Models\\User', 83, 'hydra-api-token', '9c42f0fec061d26b36421cd03e166c78ead58f1926673fedc30282b9c9b75e65', '[\"user\"]', '2023-11-02 18:03:28', '2023-11-02 17:47:47', '2023-11-02 18:03:28'),
(304, 'App\\Models\\User', 90, 'hydra-api-token', 'e1b4f5acffcc105b9d78ed2ece58f35997b470bf17dfb307c0f3b5fd07e150eb', '[\"user\"]', '2023-11-02 18:13:01', '2023-11-02 18:04:55', '2023-11-02 18:13:01'),
(305, 'App\\Models\\User', 83, 'hydra-api-token', '64df4700596dbfedac45a8a8e23dd67be3f716896f34ca04f5013c3b2afa121f', '[\"user\"]', '2023-11-02 18:12:47', '2023-11-02 18:11:20', '2023-11-02 18:12:47'),
(306, 'App\\Models\\User', 90, 'hydra-api-token', 'd95256a34d1cccb9c79c6e5ff8d0de8eca2e3dcb76ff5e6c902b3f0f2251dfd8', '[\"user\"]', '2023-11-02 18:17:16', '2023-11-02 18:15:34', '2023-11-02 18:17:16'),
(307, 'App\\Models\\User', 83, 'hydra-api-token', '67e414bde600e2910cec342be82a637293ac99ec83ada4388f7d39d51b2df0eb', '[\"user\"]', '2023-11-02 18:18:07', '2023-11-02 18:17:34', '2023-11-02 18:18:07'),
(308, 'App\\Models\\User', 90, 'hydra-api-token', '203cdb077d6f27fb344214617538218a3b5d7bc388a150943334afb8ae722dfb', '[\"user\"]', '2023-11-02 18:46:53', '2023-11-02 18:46:24', '2023-11-02 18:46:53'),
(309, 'App\\Models\\User', 90, 'hydra-api-token', '10cc6f6674bc6e495f84af0b9cd5f5067c40c61718f8b9658f3db1931a325377', '[\"user\"]', '2023-11-03 06:07:16', '2023-11-03 05:59:27', '2023-11-03 06:07:16'),
(310, 'App\\Models\\User', 90, 'hydra-api-token', 'd51707c9f899caede27bee41194fa91d342c0170e0c3b4fd5651e45294b8e839', '[\"user\"]', '2023-11-03 16:31:09', '2023-11-03 15:56:37', '2023-11-03 16:31:09'),
(311, 'App\\Models\\User', 89, 'hydra-api-token', '623f41f92c2f82cb3ec79284b818d80eb69d593404ad0a3c6f252adc57fe210d', '[\"user\"]', '2023-11-03 16:31:50', '2023-11-03 15:56:53', '2023-11-03 16:31:50'),
(312, 'App\\Models\\User', 83, 'hydra-api-token', 'f84fadb87e18a935061aba2f92a89737ff30bfbf41f9fc94ab752957eda13def', '[\"user\"]', '2023-11-03 16:31:11', '2023-11-03 15:57:33', '2023-11-03 16:31:11'),
(313, 'App\\Models\\User', 82, 'hydra-api-token', '0b39d3d842c10abc0d5cbdcf101df2d311037e7c43a462419348a7688bf3eb1f', '[\"user\"]', '2023-11-03 16:22:13', '2023-11-03 15:57:41', '2023-11-03 16:22:13'),
(314, 'App\\Models\\User', 91, 'hydra-api-token', 'fbc1c823a9e74342a346ddf9a218749fc2c335acdce243471acc7b5b40be34da', '[\"user\"]', '2023-11-03 16:30:58', '2023-11-03 16:14:54', '2023-11-03 16:30:58'),
(315, 'App\\Models\\User', 92, 'hydra-api-token', '60ea32fc26e5e8682e73443a17340720872a9e19d162f91a542b5cb2ba51a547', '[\"user\"]', '2023-11-03 16:26:41', '2023-11-03 16:15:49', '2023-11-03 16:26:41'),
(316, 'App\\Models\\User', 87, 'hydra-api-token', 'fe0d5a32f0644a3fbfd25782f24aa57c8b803256291a0556b26b852668d6a4e2', '[\"admin\"]', '2023-11-04 05:16:16', '2023-11-04 05:06:30', '2023-11-04 05:16:16'),
(317, 'App\\Models\\User', 82, 'hydra-api-token', 'edeeaf8e52fa9b86851d2b89ca8cb2e58003719e6fe76a0dff8a479bf9c8b67c', '[\"user\"]', '2023-11-04 05:23:01', '2023-11-04 05:16:39', '2023-11-04 05:23:01'),
(318, 'App\\Models\\User', 83, 'hydra-api-token', 'd4b02db81251ac36ac3d32124725a3868f9eaefcafd014a29adbc0dfc07d0d4d', '[\"user\"]', '2023-11-04 11:53:43', '2023-11-04 05:23:01', '2023-11-04 11:53:43'),
(319, 'App\\Models\\User', 90, 'hydra-api-token', 'a90823ac064cf08bfa9dee149bec6953e03c1b8c75caf4a04a02adf7cc80c299', '[\"user\"]', '2023-11-04 06:55:38', '2023-11-04 06:33:53', '2023-11-04 06:55:38'),
(320, 'App\\Models\\User', 89, 'hydra-api-token', '98b51a89fc1b55a942d4b1778bf1cd4a4436cd0523950f405e120b921edc5bfd', '[\"user\"]', '2023-11-04 06:42:39', '2023-11-04 06:38:04', '2023-11-04 06:42:39'),
(321, 'App\\Models\\User', 89, 'hydra-api-token', '0d4ed6fa92261d22e68b528f4344c9ba27c08d0d080526802afa201464dfea81', '[\"user\"]', '2023-11-04 07:00:46', '2023-11-04 06:50:18', '2023-11-04 07:00:46'),
(322, 'App\\Models\\User', 90, 'hydra-api-token', '6990d6bff1a60e48392ba839ac6117410166964a8192d89770f1c63b09bd5f86', '[\"user\"]', '2023-11-04 07:13:35', '2023-11-04 06:50:39', '2023-11-04 07:13:35'),
(323, 'App\\Models\\User', 87, 'hydra-api-token', '7feb7201e01af44ad803b0da26a9171e793d6e257e18875e5f17dc74827d9574', '[\"admin\"]', '2023-11-04 12:15:42', '2023-11-04 06:51:10', '2023-11-04 12:15:42'),
(324, 'App\\Models\\User', 89, 'hydra-api-token', '556f62f8c8dc5ba7ffd87c7519050554d1239ad7415bfedaac71db77e11d8670', '[\"user\"]', NULL, '2023-11-04 07:00:46', '2023-11-04 07:00:46'),
(325, 'App\\Models\\User', 89, 'hydra-api-token', 'e6f475418e2bdfee9e461507b0380dba12c854909d51ccbe89dda80f5bcb04b2', '[\"user\"]', '2023-11-04 07:04:34', '2023-11-04 07:00:46', '2023-11-04 07:04:34'),
(326, 'App\\Models\\User', 89, 'hydra-api-token', 'ccb751c712394730433f3ccd15e4bf2c9e4a9bb189b1a62623e328911ffafcaa', '[\"user\"]', '2023-11-04 07:29:20', '2023-11-04 07:00:46', '2023-11-04 07:29:20'),
(327, 'App\\Models\\User', 89, 'hydra-api-token', '09b3bbf5cf2bd56ad9d613fe8790867bbe6d7b977bae1991a278a9fc875b2bec', '[\"user\"]', '2023-11-04 07:15:43', '2023-11-04 07:13:45', '2023-11-04 07:15:43'),
(328, 'App\\Models\\User', 82, 'hydra-api-token', '61011f83f5e18716b2461bdeeeb8603e4b8660e4f45517333864b4feb88147a7', '[\"user\"]', '2023-11-04 07:26:57', '2023-11-04 07:26:18', '2023-11-04 07:26:57'),
(329, 'App\\Models\\User', 82, 'hydra-api-token', '5a4256d33c79ad23de217da148707899355efe0061815493c4d86dcca544eb9b', '[\"user\"]', '2023-11-04 07:29:20', '2023-11-04 07:27:12', '2023-11-04 07:29:20'),
(330, 'App\\Models\\User', 90, 'hydra-api-token', 'b0fc0cb9d609f9a336787439b0ebe86e400c20e1460449cdb6f58b783cd964bd', '[\"user\"]', '2023-11-04 12:08:21', '2023-11-04 07:27:18', '2023-11-04 12:08:21'),
(331, 'App\\Models\\User', 89, 'hydra-api-token', '183421a38ff2e14523f1498d91c9c7d2f9808bf97baf3ec97a97d44e604a103a', '[\"user\"]', '2023-11-04 07:35:19', '2023-11-04 07:29:20', '2023-11-04 07:35:19'),
(332, 'App\\Models\\User', 82, 'hydra-api-token', '3e08770b9b875d89028bf705767205813f8c09eb5af70ec989f247895bb06cd2', '[\"user\"]', '2023-11-04 07:34:18', '2023-11-04 07:29:52', '2023-11-04 07:34:18'),
(333, 'App\\Models\\User', 82, 'hydra-api-token', '40bdbdf6657aeeaa2420e8537fcea223619745a8a4bd35d21df77905c0d9c976', '[\"user\"]', '2023-11-04 07:37:30', '2023-11-04 07:30:43', '2023-11-04 07:37:30'),
(334, 'App\\Models\\User', 89, 'hydra-api-token', '52bdd47c3fef243a07ee5ebb3094babdb608f378b6beb953c1c7530848e868cd', '[\"user\"]', '2023-11-04 08:26:44', '2023-11-04 07:36:28', '2023-11-04 08:26:44'),
(335, 'App\\Models\\User', 82, 'hydra-api-token', 'c5a2d02bb4fe8df88c71aa8b1695d5a2df2f6a8ac9f8f32c3c986e9b21ddf939', '[\"user\"]', '2023-11-04 08:01:33', '2023-11-04 07:37:00', '2023-11-04 08:01:33'),
(336, 'App\\Models\\User', 82, 'hydra-api-token', 'e8e0fadaf949b04c7eb75f4036c87b9c5804fdefb4c62fa45e5a38f301826ff4', '[\"user\"]', '2023-11-04 08:00:58', '2023-11-04 07:37:30', '2023-11-04 08:00:58'),
(337, 'App\\Models\\User', 90, 'hydra-api-token', 'bd1c078d63167e01763d94e2a729c250bbb941d1529c094a685216201ac7a89b', '[\"user\"]', '2023-11-04 07:47:58', '2023-11-04 07:41:12', '2023-11-04 07:47:58'),
(338, 'App\\Models\\User', 89, 'hydra-api-token', '4c68a4647c9fb982b1d846d157aea58b0cacf69093687f42d0114aa4b0900338', '[\"user\"]', '2023-11-04 08:16:09', '2023-11-04 07:44:03', '2023-11-04 08:16:09'),
(339, 'App\\Models\\User', 90, 'hydra-api-token', 'fc3b5434ad54afb3d4620ace187d4bfbcbb4db2e507c0ba69f633652dc6ef66b', '[\"user\"]', '2023-11-04 08:19:11', '2023-11-04 07:48:05', '2023-11-04 08:19:11'),
(340, 'App\\Models\\User', 83, 'hydra-api-token', '7cc59e95fc26d08008696f7b04b622921f62bd1164b2afeea156174050ada159', '[\"user\"]', '2023-11-04 11:22:19', '2023-11-04 07:49:10', '2023-11-04 11:22:19'),
(341, 'App\\Models\\User', 82, 'hydra-api-token', 'ff3dd490d97852c3f65cd11e682ed1194c584082885f3e760a3a6e3d0c7166b5', '[\"user\"]', '2023-11-04 08:26:44', '2023-11-04 08:01:14', '2023-11-04 08:26:44'),
(342, 'App\\Models\\User', 90, 'hydra-api-token', 'f7631885f2f3d82f5fb3ac76efc6921140f4b8061d5e62f93face3b778b5426f', '[\"user\"]', '2023-11-04 08:38:21', '2023-11-04 08:20:30', '2023-11-04 08:38:21'),
(343, 'App\\Models\\User', 89, 'hydra-api-token', '85f490c7c676c82673f5e813bdfcd2f2484b407156b8dc5b579ae192b1b17665', '[\"user\"]', '2023-11-04 08:37:59', '2023-11-04 08:24:08', '2023-11-04 08:37:59'),
(344, 'App\\Models\\User', 89, 'hydra-api-token', '19529d27e5f0c3accb6f06512697cfd016e6f12a337bab4981e304e70d749d69', '[\"user\"]', '2023-11-04 08:38:00', '2023-11-04 08:34:31', '2023-11-04 08:38:00'),
(345, 'App\\Models\\User', 84, 'hydra-api-token', 'a45a2b1ada34bd622fb15b060c951ca7cc3cc1c88d17cde138830ca079e5a9dd', '[\"user\"]', '2023-11-04 12:15:21', '2023-11-04 10:27:52', '2023-11-04 12:15:21'),
(346, 'App\\Models\\User', 90, 'hydra-api-token', '035e9689eeb02d672720236d0e27f576551d4708722019075929d592c365309f', '[\"user\"]', '2023-11-04 12:39:13', '2023-11-04 11:22:45', '2023-11-04 12:39:13'),
(347, 'App\\Models\\User', 83, 'hydra-api-token', '7138487c78102d48d8b077db8619b5c1baf43f08ca29260a61da0b94f6138c10', '[\"user\"]', '2023-11-04 11:42:42', '2023-11-04 11:37:56', '2023-11-04 11:42:42'),
(348, 'App\\Models\\User', 92, 'hydra-api-token', '478981bffae0c6226fb37f78ab51be63ae37dfd5ca59e661e39acdad7a9ac182', '[\"user\"]', '2023-11-04 11:40:54', '2023-11-04 11:40:22', '2023-11-04 11:40:54'),
(349, 'App\\Models\\User', 82, 'hydra-api-token', '163b5e8bd646093d024c64e19415779f45fc42e7905fa672e23b90f1509295ce', '[\"user\"]', '2023-11-04 11:42:58', '2023-11-04 11:41:53', '2023-11-04 11:42:58'),
(350, 'App\\Models\\User', 89, 'hydra-api-token', '6092ea5ccac2fa336e2fd294d3a5aecd3185bf6620ab861136c11ef9dc7a59ba', '[\"user\"]', '2023-11-04 11:48:50', '2023-11-04 11:43:31', '2023-11-04 11:48:50'),
(351, 'App\\Models\\User', 82, 'hydra-api-token', '2146863794105719bd36f6df4a1228a148a8239de60fe62b7358eb9ba13d99dd', '[\"user\"]', '2023-11-04 11:56:19', '2023-11-04 11:54:03', '2023-11-04 11:56:19'),
(352, 'App\\Models\\User', 91, 'hydra-api-token', 'cab2b42319b166514086e1ba666d51edbf37f2885d437f0edc18ec576fa058ef', '[\"user\"]', '2023-11-04 13:41:12', '2023-11-04 13:40:40', '2023-11-04 13:41:12'),
(353, 'App\\Models\\User', 83, 'hydra-api-token', 'c356aab712ee19fcd15bcdc8972fdd2d1b5eed7ea8d570fb4b4f6f564384368e', '[\"user\"]', '2023-11-04 13:58:12', '2023-11-04 13:42:13', '2023-11-04 13:58:12'),
(354, 'App\\Models\\User', 82, 'hydra-api-token', 'f96940795f4806400c6c0929aee3853a3ce6d682c071999b8c0e4e14842e3519', '[\"user\"]', '2023-11-04 13:58:08', '2023-11-04 13:44:45', '2023-11-04 13:58:08'),
(355, 'App\\Models\\User', 83, 'hydra-api-token', '2c5666180a6497986103f3a1baabb1ee770da23c7c9f7438130611807d72f723', '[\"user\"]', '2023-11-05 05:23:33', '2023-11-05 05:13:51', '2023-11-05 05:23:33'),
(356, 'App\\Models\\User', 82, 'hydra-api-token', '8638cc542a12a38ff20ee811ce0b1621eb5650a1b8fc75ea578f9be503286394', '[\"user\"]', '2023-11-05 05:17:22', '2023-11-05 05:16:49', '2023-11-05 05:17:22'),
(357, 'App\\Models\\User', 83, 'hydra-api-token', 'e5351e855929068cfe85aca42b4b6d4802ea29de0d6ffa4fd0c0284cd292ce18', '[\"user\"]', '2023-11-05 07:17:04', '2023-11-05 05:18:41', '2023-11-05 07:17:04'),
(358, 'App\\Models\\User', 82, 'hydra-api-token', '6ae508083be8c7839e3b0837b1561f606ade781459fd23f844fd8f16a925110d', '[\"user\"]', '2023-11-05 07:16:33', '2023-11-05 05:18:58', '2023-11-05 07:16:33'),
(359, 'App\\Models\\User', 90, 'hydra-api-token', '9b478e6133f81ed951a187e4c8d742a5696c5f6f585cc0d2da9f773afd21bb5d', '[\"user\"]', '2023-11-05 06:44:59', '2023-11-05 06:34:55', '2023-11-05 06:44:59'),
(360, 'App\\Models\\User', 83, 'hydra-api-token', 'bf76d572f4ca510768378d48f487759ece676b64b83a5a22b3148bcd5080c931', '[\"user\"]', '2023-11-05 09:19:04', '2023-11-05 07:17:04', '2023-11-05 09:19:04'),
(361, 'App\\Models\\User', 82, 'hydra-api-token', '59dba6cd054e2666787a982b698ecb0226b7d1a60e951d6f95a33f43dae3aefd', '[\"user\"]', '2023-11-05 09:19:03', '2023-11-05 07:17:04', '2023-11-05 09:19:03'),
(362, 'App\\Models\\User', 89, 'hydra-api-token', 'd527e88deec6f64abce5764e081da5c1e6be8e0dda37284856f52d9af9769ff4', '[\"user\"]', '2023-11-05 09:58:58', '2023-11-05 07:19:18', '2023-11-05 09:58:58'),
(363, 'App\\Models\\User', 90, 'hydra-api-token', 'fe8ed1a5d69c82b2fe37b71093b8970881995ca26e11a357c5213fc33a6c263e', '[\"user\"]', '2023-11-05 10:12:29', '2023-11-05 07:19:50', '2023-11-05 10:12:29'),
(364, 'App\\Models\\User', 83, 'hydra-api-token', 'caee7d326e26790fd55a6f1c860d91544a154f860bc4e49e7970248bfa066b4a', '[\"user\"]', '2023-11-05 07:25:46', '2023-11-05 07:25:16', '2023-11-05 07:25:46'),
(365, 'App\\Models\\User', 83, 'hydra-api-token', 'f96a9609fd794584413b3edf068b50c655b757ac3b2a3e46e81bd5eb651b1c6b', '[\"user\"]', '2023-11-05 07:27:33', '2023-11-05 07:25:47', '2023-11-05 07:27:33'),
(366, 'App\\Models\\User', 82, 'hydra-api-token', 'cd870d6a8316d9e1874f7121e42680f3a916e5c0b961aa954d07b63a23f54a8f', '[\"user\"]', '2023-11-05 07:50:30', '2023-11-05 07:27:01', '2023-11-05 07:50:30'),
(367, 'App\\Models\\User', 81, 'hydra-api-token', '247c6631726b51d145e92ae7aff95b0c9c0fed411c313e1fa552f6ba1e32ba4d', '[\"admin\"]', '2023-11-05 11:05:16', '2023-11-05 07:27:33', '2023-11-05 11:05:16'),
(368, 'App\\Models\\User', 83, 'hydra-api-token', '28abb462b0585554db365a3ff5c9cc4d4ababd7a4642eb9dfd5104743a8e50e1', '[\"user\"]', '2023-11-05 07:51:04', '2023-11-05 07:50:33', '2023-11-05 07:51:04'),
(369, 'App\\Models\\User', 82, 'hydra-api-token', '4d0097263677316a8e7b177ba20361c6e44e911563385eec91d22f55b13d1957', '[\"user\"]', '2023-11-05 07:55:17', '2023-11-05 07:54:33', '2023-11-05 07:55:17'),
(370, 'App\\Models\\User', 83, 'hydra-api-token', '58c44761f18b9cf3f143659b92b8e4d6a1f18bd35b5ec8d45dd41ff7d9772659', '[\"user\"]', '2023-11-05 11:41:13', '2023-11-05 09:19:04', '2023-11-05 11:41:13'),
(371, 'App\\Models\\User', 82, 'hydra-api-token', 'f978a4b1adceaf7434d453a0a626fe8a66d8c8a40c10643f7a000d951e99d8f8', '[\"user\"]', '2023-11-05 09:48:09', '2023-11-05 09:19:04', '2023-11-05 09:48:09'),
(372, 'App\\Models\\User', 83, 'hydra-api-token', '8d826554f106d75268c06c24e1d069c4db4f5a173986972eb07e55e371f417fc', '[\"user\"]', '2023-11-05 09:27:58', '2023-11-05 09:20:28', '2023-11-05 09:27:58'),
(373, 'App\\Models\\User', 83, 'hydra-api-token', 'a5536826e51436c3b6ed2507d851a92f09772421f92aacabb942330100ebb903', '[\"user\"]', '2023-11-05 10:55:02', '2023-11-05 09:28:45', '2023-11-05 10:55:02'),
(374, 'App\\Models\\User', 82, 'hydra-api-token', '2a00c2011d40cd25c9328e0ce5e9efe485014ed2b87fa68856d9c85e205ea6d6', '[\"user\"]', '2023-11-05 11:12:36', '2023-11-05 09:32:57', '2023-11-05 11:12:36'),
(375, 'App\\Models\\User', 82, 'hydra-api-token', '2a4c335a1aec0aaa6b86a1beee4e69bcf1bb7913325d75a12dbead66a860e296', '[\"user\"]', '2023-11-05 09:52:35', '2023-11-05 09:34:13', '2023-11-05 09:52:35'),
(376, 'App\\Models\\User', 83, 'hydra-api-token', 'dab594c8512876b318be8273c02d902a10b936728cdf4d89956531be906bdb07', '[\"user\"]', '2023-11-05 11:18:29', '2023-11-05 09:38:25', '2023-11-05 11:18:29'),
(377, 'App\\Models\\User', 82, 'hydra-api-token', '0ed83b08ca6fe2a3c6bb1cc7ee047155ed6f9a9070e947885647168e551fb55e', '[\"user\"]', '2023-11-05 09:55:00', '2023-11-05 09:54:25', '2023-11-05 09:55:00'),
(378, 'App\\Models\\User', 82, 'hydra-api-token', '1b006e6b41143dfeb2e77a5964b8e3873419d7e6a3f348f0d5eade126249af50', '[\"user\"]', '2023-11-05 10:03:53', '2023-11-05 09:55:19', '2023-11-05 10:03:53'),
(379, 'App\\Models\\User', 82, 'hydra-api-token', '977c8ecbaa2155c95c5a76307ac94e0b62a019fbba2ce53856319959d07a6c07', '[\"user\"]', '2023-11-05 10:14:52', '2023-11-05 09:59:17', '2023-11-05 10:14:52'),
(380, 'App\\Models\\User', 83, 'hydra-api-token', '602dddcab65bc5e75491c6e8bc48da5e6d92a758d24bad56180be672f47cb83b', '[\"user\"]', '2023-11-05 12:47:49', '2023-11-05 10:06:42', '2023-11-05 12:47:49'),
(381, 'App\\Models\\User', 82, 'hydra-api-token', 'b93158c6ad8bfe3d9063aac329e2bbb27c2574412fde9f877ca808b88be1feb8', '[\"user\"]', NULL, '2023-11-05 10:14:52', '2023-11-05 10:14:52'),
(382, 'App\\Models\\User', 82, 'hydra-api-token', '72c0c7f77594bc601a30f917abab6339d38cfdfef9e20702ef8e5b4e311d55af', '[\"user\"]', '2023-11-05 11:45:34', '2023-11-05 10:18:15', '2023-11-05 11:45:34'),
(383, 'App\\Models\\User', 82, 'hydra-api-token', '0b7ceadb794b02c717846acd34549fb89beb49cd99bf1e0f4acf07328bc69a46', '[\"user\"]', '2023-11-05 10:43:56', '2023-11-05 10:27:24', '2023-11-05 10:43:56'),
(384, 'App\\Models\\User', 82, 'hydra-api-token', '63c29a4bf31d502dc09f00e48efcaaf1d79203cf0d83aa8a0b4b689cce405e9b', '[\"user\"]', '2023-11-05 12:33:53', '2023-11-05 10:44:01', '2023-11-05 12:33:53'),
(385, 'App\\Models\\User', 82, 'hydra-api-token', '2467995ca73561c574b561c37944cd45a4fc326cdf2ace1deb7764907b8a8d3c', '[\"user\"]', NULL, '2023-11-05 10:57:04', '2023-11-05 10:57:04'),
(386, 'App\\Models\\User', 83, 'hydra-api-token', '93f5574b3ac9376f7e81c79aded079fc9b0054f19a109938c2a3a02088df301a', '[\"user\"]', '2023-11-05 12:37:19', '2023-11-05 11:41:28', '2023-11-05 12:37:19'),
(387, 'App\\Models\\User', 82, 'hydra-api-token', '6b4efeb9e62d5d99fc936d63756791152d61294989c1128789fc2ec86a5ad4c3', '[\"user\"]', '2023-11-05 11:53:55', '2023-11-05 11:44:12', '2023-11-05 11:53:55'),
(388, 'App\\Models\\User', 82, 'hydra-api-token', '1784f10da2baf33b4512b5834a53d682f0fa35547cc0ee8f7b55216b69747032', '[\"user\"]', NULL, '2023-11-05 11:45:34', '2023-11-05 11:45:34'),
(389, 'App\\Models\\User', 82, 'hydra-api-token', '930c96b3dc60fa412318df703fbbd8c346310d4473cfee55f3299cd261dc2f47', '[\"user\"]', '2023-11-05 12:35:44', '2023-11-05 11:46:23', '2023-11-05 12:35:44'),
(390, 'App\\Models\\User', 82, 'hydra-api-token', '61ac1f1dcb2469a82ec4cf22758789282b0612f89b78bfa340311c8befbc6bc6', '[\"user\"]', '2023-11-05 11:50:27', '2023-11-05 11:46:54', '2023-11-05 11:50:27'),
(391, 'App\\Models\\User', 82, 'hydra-api-token', '32b16df544834108b07bd3407cf79f9feee394bbff8444a52a71ac65f86a8caa', '[\"user\"]', '2023-11-05 12:46:31', '2023-11-05 12:33:54', '2023-11-05 12:46:31'),
(392, 'App\\Models\\User', 83, 'hydra-api-token', '2d8a18dae462b27ac24283eb9673e4247ca406f69db931da2397958d9aefb53b', '[\"user\"]', '2023-11-05 12:50:46', '2023-11-05 12:49:21', '2023-11-05 12:50:46'),
(393, 'App\\Models\\User', 83, 'hydra-api-token', 'e11be092c77472cda899f23ba7318928a7b380f14cb0b4c79be1ee8dfd955a45', '[\"user\"]', '2023-11-05 12:54:06', '2023-11-05 12:51:35', '2023-11-05 12:54:06'),
(394, 'App\\Models\\User', 82, 'hydra-api-token', '839c46268ea8f235038ef05dc28baeb2b56d875d1b66dc5ce0e616ca7a370cdf', '[\"user\"]', '2023-11-06 06:13:35', '2023-11-06 03:37:38', '2023-11-06 06:13:35'),
(395, 'App\\Models\\User', 82, 'hydra-api-token', '0eb10fca2397cad5079b23c7648ad64d529e7a96afa85c505db92bb9be1f1760', '[\"user\"]', '2023-11-06 05:01:28', '2023-11-06 04:21:45', '2023-11-06 05:01:28'),
(396, 'App\\Models\\User', 82, 'hydra-api-token', '11200c1d6fa8ea48944550b941e0ed056bd8ac88d5ffd1e2292924308a4e8358', '[\"user\"]', '2023-11-06 07:04:49', '2023-11-06 04:32:52', '2023-11-06 07:04:49'),
(397, 'App\\Models\\User', 82, 'hydra-api-token', '15c59fcbd0314426ccfebd926f6bb9150285ef3b94f5057a56569f495178441a', '[\"user\"]', '2023-11-06 04:41:51', '2023-11-06 04:38:25', '2023-11-06 04:41:51'),
(398, 'App\\Models\\User', 82, 'hydra-api-token', '9517506b6b3c72a29ecf54320570c5f056799fd58cb381b26a19024f80d6e2d9', '[\"user\"]', '2023-11-06 04:42:57', '2023-11-06 04:39:02', '2023-11-06 04:42:57'),
(399, 'App\\Models\\User', 82, 'hydra-api-token', 'eefa78c5cd4923087c0352a3187178a3033fdb1f9b757f37ea5e3563f141b129', '[\"user\"]', '2023-11-06 06:45:39', '2023-11-06 04:40:28', '2023-11-06 06:45:39'),
(400, 'App\\Models\\User', 82, 'hydra-api-token', 'be5b44da27994a0ad670febd4f34471c30812d7bbad5847d94b224daf0c73e75', '[\"user\"]', '2023-11-06 04:45:17', '2023-11-06 04:40:58', '2023-11-06 04:45:17'),
(401, 'App\\Models\\User', 82, 'hydra-api-token', 'cae86845771db78df75dffab2bcba9cb90d2ef3642f32bfb60168f39891ce752', '[\"user\"]', '2023-11-06 04:42:56', '2023-11-06 04:42:51', '2023-11-06 04:42:56'),
(402, 'App\\Models\\User', 86, 'hydra-api-token', 'b8682fefc07f3a7654c2c6ad064a09fd5d123bf9f9e8524bada7c23f6422635c', '[\"admin\"]', '2023-11-06 06:14:03', '2023-11-06 06:09:31', '2023-11-06 06:14:03'),
(403, 'App\\Models\\User', 82, 'hydra-api-token', '86c140cd6cdad50f48101a9efe868a831adc75e9bb5fd53d8da6be77df9aed46', '[\"user\"]', '2023-11-06 06:19:12', '2023-11-06 06:18:57', '2023-11-06 06:19:12'),
(404, 'App\\Models\\User', 83, 'hydra-api-token', '0eb3fab805f22cc513289735d23ecf84fbb33b7d3b3b4d2c0ca925bfab870b83', '[\"user\"]', '2023-11-06 06:57:46', '2023-11-06 06:57:21', '2023-11-06 06:57:46'),
(405, 'App\\Models\\User', 92, 'hydra-api-token', '3d7559ed3d448db776b06949f31c6f1c9a484d46e93f6eec73c02cd8da818682', '[\"user\"]', '2023-11-06 11:50:45', '2023-11-06 06:57:44', '2023-11-06 11:50:45'),
(406, 'App\\Models\\User', 91, 'hydra-api-token', '343d4c97e86d0309015303b835b6b462313c141b0370de00b4a276c18ac9ee1c', '[\"user\"]', '2023-11-06 11:50:51', '2023-11-06 06:57:54', '2023-11-06 11:50:51'),
(407, 'App\\Models\\User', 1, 'hydra-api-token', 'd1baf9c97ec74ca4129114aa75097c16a7dd3e93ddbfba1c16ca1fdd410ae846', '[\"admin\"]', '2023-11-06 07:14:57', '2023-11-06 07:13:52', '2023-11-06 07:14:57'),
(408, 'App\\Models\\User', 1, 'hydra-api-token', '21db937964102778917558c51d1d4fe16572b042b81f9ba991adfcc27d2cb529', '[\"admin\"]', '2023-11-06 07:16:33', '2023-11-06 07:15:31', '2023-11-06 07:16:33'),
(409, 'App\\Models\\User', 82, 'hydra-api-token', '94eed212348c616a953b769ad67dd18a19189d076f277c5be835ddbb9a46f909', '[\"user\"]', '2023-11-06 09:26:37', '2023-11-06 07:17:26', '2023-11-06 09:26:37'),
(411, 'App\\Models\\User', 82, 'hydra-api-token', '3010da212e14194f916b857338411412c97bb437300388484e9848d17be4bec9', '[\"user\"]', '2023-11-06 11:45:55', '2023-11-06 07:20:53', '2023-11-06 11:45:55'),
(412, 'App\\Models\\User', 82, 'hydra-api-token', 'cc618c42f15976fe00d013cebbf648339db5b2fd2b0c6cd67665c9d6ee7bcf7a', '[\"user\"]', '2023-11-06 07:26:23', '2023-11-06 07:21:54', '2023-11-06 07:26:23'),
(413, 'App\\Models\\User', 1, 'hydra-api-token', '2089ac90727a33994750c31d0e5c2af2cea7a498a483ecd83f3b2001ae2a2846', '[\"admin\"]', '2023-11-06 09:20:47', '2023-11-06 07:26:44', '2023-11-06 09:20:47'),
(415, 'App\\Models\\User', 1, 'hydra-api-token', '6041a737c855312cb9f6818c5d7d02e33c254496f7be05bdd9214972b2be1b8f', '[\"admin\"]', '2023-11-06 09:18:47', '2023-11-06 09:18:33', '2023-11-06 09:18:47'),
(416, 'App\\Models\\User', 1, 'hydra-api-token', '305b350501fee6070bb821e7c07ddc3d50f2b639125665da92c74917fc0e1e42', '[\"admin\"]', '2023-11-06 09:30:09', '2023-11-06 09:29:11', '2023-11-06 09:30:09'),
(418, 'App\\Models\\User', 93, 'hydra-api-token', '15d3d381cad3569344e0c324d641cf463340dbb212b8d6fa191c9a6a4653d69d', '[\"admin\"]', '2023-11-06 09:34:44', '2023-11-06 09:34:30', '2023-11-06 09:34:44'),
(419, 'App\\Models\\User', 83, 'hydra-api-token', '38f777231731f448b9736aeb9b6a402775f9653e104fea79065e4fd257b2e1b9', '[\"user\"]', '2023-11-06 09:46:21', '2023-11-06 09:46:20', '2023-11-06 09:46:21'),
(420, 'App\\Models\\User', 82, 'hydra-api-token', '5f7f0c9a0f25b9a42d051aa5fafe63776cac8ae8f50643cc440bf0a53281e549', '[\"user\"]', '2023-11-06 09:49:50', '2023-11-06 09:47:12', '2023-11-06 09:49:50'),
(421, 'App\\Models\\User', 83, 'hydra-api-token', '0ac66e8dd42155288c81a399ab85c6d518afbab58d935fd8f12f8d772c002509', '[\"user\"]', '2023-11-06 11:44:45', '2023-11-06 09:49:29', '2023-11-06 11:44:45'),
(422, 'App\\Models\\User', 83, 'hydra-api-token', 'beeeacb23472f53d7c8c52bd40412979635db315510a0f5dc0b3da48e9689d2e', '[\"user\"]', '2023-12-04 08:32:35', '2023-11-06 09:50:43', '2023-12-04 08:32:35'),
(423, 'App\\Models\\User', 83, 'hydra-api-token', 'f1948be8fefdc08fc33a2c73ff2c90e5f03bcb3a23db4755aacc337ad7f93e47', '[\"user\"]', '2023-11-06 10:47:36', '2023-11-06 10:01:56', '2023-11-06 10:47:36'),
(424, 'App\\Models\\User', 92, 'hydra-api-token', '69a32925135afc77e16bdc8d6b06edf9fd1e86274580b170647b75ff13a0da25', '[\"user\"]', '2023-11-06 10:31:44', '2023-11-06 10:08:21', '2023-11-06 10:31:44'),
(425, 'App\\Models\\User', 92, 'hydra-api-token', '438c5d933684768f6985885ef7c494a461bdda0b3d75b608b4353d36ff68a1f4', '[\"user\"]', '2023-11-06 10:08:51', '2023-11-06 10:08:47', '2023-11-06 10:08:51'),
(426, 'App\\Models\\User', 91, 'hydra-api-token', 'd570b9f1c11e1e1ee786405768151cdab4b81244657436da6693f606f7d8c46c', '[\"user\"]', '2023-11-06 13:08:24', '2023-11-06 10:10:36', '2023-11-06 13:08:24'),
(427, 'App\\Models\\User', 82, 'hydra-api-token', 'd70645bc3743a2663278e56a7274d4b7d7692df8953887f3ca5946b1b88eed53', '[\"user\"]', '2023-11-06 11:07:22', '2023-11-06 10:34:04', '2023-11-06 11:07:22'),
(428, 'App\\Models\\User', 83, 'hydra-api-token', 'cbf8ea78a8b9cc3eb8143d4c69ef58fc47f2830036155267e4972ef7fdf24486', '[\"user\"]', '2023-11-06 11:33:50', '2023-11-06 10:50:43', '2023-11-06 11:33:50'),
(429, 'App\\Models\\User', 83, 'hydra-api-token', 'c5a1c5fb5eca1b8b74dd96e48c564e98146ce6078fabfb1a7f83ffd391a8939e', '[\"user\"]', NULL, '2023-11-06 10:51:24', '2023-11-06 10:51:24'),
(430, 'App\\Models\\User', 83, 'hydra-api-token', 'c32e9629884c74665657d5dffda6b74161ad39234295e88c19a55cbc49bd0f2f', '[\"user\"]', '2023-11-06 12:20:05', '2023-11-06 10:53:24', '2023-11-06 12:20:05'),
(431, 'App\\Models\\User', 90, 'hydra-api-token', '2ab04d7ce7574cde73ce6e40d588df42f1547123f633de4223278a062bcdd0a8', '[\"user\"]', '2023-11-06 11:24:08', '2023-11-06 11:22:44', '2023-11-06 11:24:08'),
(432, 'App\\Models\\User', 89, 'hydra-api-token', 'fbb01a656836ed1d1fcc3701be84a9ce24455eb0989e41f9a9cc5deb919cce65', '[\"user\"]', '2023-11-06 11:33:51', '2023-11-06 11:24:16', '2023-11-06 11:33:51'),
(433, 'App\\Models\\User', 83, 'hydra-api-token', '75a143d2c836b612313dc05cd5bc941794858f1af40584f5b493bf78d9de5984', '[\"user\"]', '2023-11-06 11:41:34', '2023-11-06 11:34:35', '2023-11-06 11:41:34'),
(434, 'App\\Models\\User', 82, 'hydra-api-token', '1a3c31c1824687a0544652a8fedc43c9e1982a60a55930cec98b04d86d8f4e9a', '[\"user\"]', '2023-11-06 12:28:20', '2023-11-06 11:58:56', '2023-11-06 12:28:20'),
(435, 'App\\Models\\User', 83, 'hydra-api-token', 'c59c0b562df0f40ed6b8f9299bc77a8b652a873e759b5629803a5b19cebc37e6', '[\"user\"]', '2023-11-06 13:07:32', '2023-11-06 12:14:14', '2023-11-06 13:07:32'),
(436, 'App\\Models\\User', 83, 'hydra-api-token', 'de1a63350cf64a189a9efbf2e8583ae64e993650cf7c5792c5e194eb41583fb0', '[\"user\"]', '2023-11-06 12:39:32', '2023-11-06 12:38:38', '2023-11-06 12:39:32'),
(437, 'App\\Models\\User', 91, 'hydra-api-token', '7b43a955df8f4797779dd24f52c846e6d03a3e49287276798df112eb2d5b4533', '[\"user\"]', '2023-11-07 04:46:29', '2023-11-07 04:46:26', '2023-11-07 04:46:29'),
(438, 'App\\Models\\User', 91, 'hydra-api-token', 'b0ffcb5c8017786662e7fa198a568f9aa2294d99ad0ec62c697aba0d25377a9f', '[\"user\"]', '2023-11-07 04:50:45', '2023-11-07 04:47:16', '2023-11-07 04:50:45'),
(439, 'App\\Models\\User', 92, 'hydra-api-token', '5d90af04cbfce1e4c6201d83ceaae899cb057a1be0fb226797ad765b3a2f1084', '[\"user\"]', '2023-11-07 04:49:00', '2023-11-07 04:48:57', '2023-11-07 04:49:00'),
(440, 'App\\Models\\User', 91, 'hydra-api-token', 'f4a1d94dc66350420f3e42b380f2a197c66866e72f63eff5571ae712102eea68', '[\"user\"]', '2023-11-07 04:50:31', '2023-11-07 04:50:29', '2023-11-07 04:50:31'),
(441, 'App\\Models\\User', 91, 'hydra-api-token', '4f01bde22c98b6a6c425b4c3cc802b3f802660ba4dd5c08d697bf80a909a752b', '[\"user\"]', '2023-11-07 07:12:42', '2023-11-07 04:52:21', '2023-11-07 07:12:42'),
(442, 'App\\Models\\User', 92, 'hydra-api-token', '0352da58e870f2d30fa0b0660d7c76223cb3043d783e31682c9e480a43c5de94', '[\"user\"]', '2023-11-07 04:59:30', '2023-11-07 04:52:59', '2023-11-07 04:59:30'),
(443, 'App\\Models\\User', 92, 'hydra-api-token', '899d2b09c791893a321debc1921a0200caae586f22db8eddcff431cdcba7846f', '[\"user\"]', '2023-11-07 05:21:20', '2023-11-07 05:00:21', '2023-11-07 05:21:20'),
(444, 'App\\Models\\User', 92, 'hydra-api-token', '7f0e473b6a1ea68015089cf369fda382a5a7ee10f586d608575930229cb8d1bd', '[\"user\"]', '2023-11-07 07:03:29', '2023-11-07 05:10:13', '2023-11-07 07:03:29'),
(445, 'App\\Models\\User', 83, 'hydra-api-token', '7cd68a2f17cbae512246d4a4f14d17bc4034c15fd5722667ce4320c76b855cd8', '[\"user\"]', '2023-11-07 05:14:24', '2023-11-07 05:11:10', '2023-11-07 05:14:24'),
(446, 'App\\Models\\User', 83, 'hydra-api-token', 'e915212cd1f0d31608d3a636cc52559a00dec60c13b200d57202323859d39cfc', '[\"user\"]', '2023-11-07 06:10:01', '2023-11-07 05:11:57', '2023-11-07 06:10:01'),
(447, 'App\\Models\\User', 91, 'hydra-api-token', '1c62101f59667dbb8cd982df73b8b9dd8983fd5c6c486e27ee107f6b71057aa9', '[\"user\"]', '2023-11-07 06:49:31', '2023-11-07 05:22:46', '2023-11-07 06:49:31'),
(448, 'App\\Models\\User', 83, 'hydra-api-token', 'e46f0187f698c987a891020d100583037f63384c08eb0aa2d82a7c288b3ccf36', '[\"user\"]', '2023-11-13 06:16:45', '2023-11-07 05:59:39', '2023-11-13 06:16:45'),
(449, 'App\\Models\\User', 92, 'hydra-api-token', '93de74d4729a7e78d39fef1f13437ff95ddc21a3693d64c3eb241bdc66ec787d', '[\"user\"]', '2023-11-07 06:29:46', '2023-11-07 06:01:02', '2023-11-07 06:29:46'),
(450, 'App\\Models\\User', 82, 'hydra-api-token', '4947c4dcf1f58b430e8ca67085be78dbdddc3e2415e3bd06e41309ec0f7d6b91', '[\"user\"]', '2023-11-07 07:24:42', '2023-11-07 06:41:32', '2023-11-07 07:24:42'),
(451, 'App\\Models\\User', 83, 'hydra-api-token', '8281a09b50cba9ac3f53f53650e173bfa65813d2766d8f3cf1ec72df9bd0235d', '[\"user\"]', '2023-11-07 09:29:45', '2023-11-07 06:41:56', '2023-11-07 09:29:45'),
(452, 'App\\Models\\User', 91, 'hydra-api-token', 'ff22b3ea3c606fb134726527ccd7f47adcbb76ad50232ba52ee2e07b46b57309', '[\"user\"]', '2023-11-07 07:03:46', '2023-11-07 06:51:08', '2023-11-07 07:03:46'),
(453, 'App\\Models\\User', 91, 'hydra-api-token', 'fc2d9fc2c789188d32d2a96ea2ec6cae0832daecf5450dab84eb5a7981a037ba', '[\"user\"]', '2023-11-07 07:39:52', '2023-11-07 07:20:27', '2023-11-07 07:39:52'),
(454, 'App\\Models\\User', 91, 'hydra-api-token', '401cc80f5a810cef46276687b75f16e33b75bd47d58070b094a664818f9936ef', '[\"user\"]', '2023-11-07 13:37:52', '2023-11-07 07:38:07', '2023-11-07 13:37:52'),
(455, 'App\\Models\\User', 92, 'hydra-api-token', 'd3e231d5c89092a76d26b4e80cc9ee2687fbe95d737a69c1d1f3ce03dab5b9c1', '[\"user\"]', '2023-11-07 13:27:41', '2023-11-07 07:38:44', '2023-11-07 13:27:41'),
(456, 'App\\Models\\User', 92, 'hydra-api-token', '7b3dad322abb2fbeae4499600eb915110a014580588f7f18b98994bc4243249e', '[\"user\"]', '2023-11-07 08:07:28', '2023-11-07 07:38:52', '2023-11-07 08:07:28'),
(458, 'App\\Models\\User', 94, 'hydra-api-token', '4ea185e4a6407acbad6e9cde7cdfdafb6365938a06ae6259a7e7b7f4c9e2dd77', '[\"user\"]', NULL, '2023-11-07 10:29:20', '2023-11-07 10:29:20'),
(459, 'App\\Models\\User', 93, 'hydra-api-token', '0afacfc798c7eedc07613a099a12907c06bfc2463e80dacd756b83a5eb8ad8df', '[\"admin\"]', '2023-11-07 10:31:13', '2023-11-07 10:30:47', '2023-11-07 10:31:13'),
(460, 'App\\Models\\User', 94, 'hydra-api-token', 'f51be60c4babb15c39db801d911b905af150aef125ba5b51b58a6e03ad584940', '[\"user\"]', '2023-11-07 11:59:38', '2023-11-07 10:32:15', '2023-11-07 11:59:38'),
(461, 'App\\Models\\User', 92, 'hydra-api-token', '568c776a63bc0659b592f3723c6eef0e6cef78e7b7bb903dcecedccd73715b6e', '[\"user\"]', '2023-11-07 12:20:37', '2023-11-07 10:45:02', '2023-11-07 12:20:37'),
(462, 'App\\Models\\User', 91, 'hydra-api-token', '4fcb077fd3aa91b2cc1c6b8e50a38ab8f7598f60a3345e34aa462af5e1936ea0', '[\"user\"]', '2023-11-07 12:18:52', '2023-11-07 10:45:20', '2023-11-07 12:18:52'),
(463, 'App\\Models\\User', 83, 'hydra-api-token', '45be32b310f54441923936b0061a9bebd11a2ebb2287601eddfec91d7cdcc10d', '[\"user\"]', '2023-11-07 11:11:53', '2023-11-07 11:10:01', '2023-11-07 11:11:53'),
(464, 'App\\Models\\User', 89, 'hydra-api-token', '4b4bd92cd063f0d731cb5010181731301e7b15611a145313352ae70a76b2dba9', '[\"user\"]', '2023-11-07 12:25:34', '2023-11-07 11:56:23', '2023-11-07 12:25:34'),
(465, 'App\\Models\\User', 93, 'hydra-api-token', '07da98e5f562d48206726d30b5a00f875267670ca7c11cb028d261a90b91a4d0', '[\"admin\"]', '2023-11-07 12:08:35', '2023-11-07 11:59:45', '2023-11-07 12:08:35'),
(466, 'App\\Models\\User', 93, 'hydra-api-token', '3d3be5701d29d4dd61f35644c5b545ddcff5c7453653b4a43bab16df786b98c3', '[\"admin\"]', '2023-11-07 12:16:59', '2023-11-07 12:02:32', '2023-11-07 12:16:59'),
(467, 'App\\Models\\User', 93, 'hydra-api-token', '789b5695213d29d13b037436fd749825b0b7f941c3063819563bce1506ceb3e8', '[\"admin\"]', '2023-11-07 12:13:08', '2023-11-07 12:08:49', '2023-11-07 12:13:08'),
(468, 'App\\Models\\User', 94, 'hydra-api-token', '39890e57cbd8b0daadc51488edaead178ed3bb3f507d6cc9d90b7c70e831c357', '[\"user\"]', '2023-11-07 12:14:56', '2023-11-07 12:13:17', '2023-11-07 12:14:56'),
(469, 'App\\Models\\User', 93, 'hydra-api-token', '5721d0a72f4e9816afe9efe04f31b20f3dfe1b452e54948111dfab106e2a00e2', '[\"admin\"]', '2023-11-07 13:37:18', '2023-11-07 12:15:03', '2023-11-07 13:37:18'),
(470, 'App\\Models\\User', 83, 'hydra-api-token', '9e68ba2299bace6fda956f11e273948a7bddcaec805b6fe2e23471c70bbde52b', '[\"user\"]', '2023-11-07 12:26:22', '2023-11-07 12:26:21', '2023-11-07 12:26:22'),
(471, 'App\\Models\\User', 94, 'hydra-api-token', '825077b9f60fbb773ca445009c8aae76b907f5d229fe659efb28abdfda86fc7b', '[\"user\"]', '2023-11-07 13:31:05', '2023-11-07 12:31:11', '2023-11-07 13:31:05'),
(472, 'App\\Models\\User', 83, 'hydra-api-token', '22452ffed4f133668df00bf6f1e5870b4472a2a3fb2c89ffe45fb89f40224db1', '[\"user\"]', '2023-11-08 07:29:09', '2023-11-07 13:04:59', '2023-11-08 07:29:09'),
(473, 'App\\Models\\User', 83, 'hydra-api-token', 'c3bfb81e0f1b739500a47df905b079a215ffd5e129a21504e0a65b500742d83c', '[\"user\"]', '2023-11-08 09:42:11', '2023-11-08 04:28:52', '2023-11-08 09:42:11'),
(474, 'App\\Models\\User', 93, 'hydra-api-token', 'ffdc4e3b58a7811c15460113901524c4d3a65581e2411ac684ba02db5f6ade4f', '[\"admin\"]', '2023-11-08 07:57:53', '2023-11-08 06:37:45', '2023-11-08 07:57:53'),
(475, 'App\\Models\\User', 89, 'hydra-api-token', '5ddcde387fbc96303a45adc106caa03d8e0912dd65bbb43b26d44065542bd17f', '[\"user\"]', '2023-11-08 06:50:18', '2023-11-08 06:46:44', '2023-11-08 06:50:18'),
(476, 'App\\Models\\User', 93, 'hydra-api-token', 'b82e028d81f69658446cfdf848233fd0d7f63834d8635878da15157d3a458510', '[\"admin\"]', '2023-11-08 06:51:40', '2023-11-08 06:51:32', '2023-11-08 06:51:40'),
(477, 'App\\Models\\User', 93, 'hydra-api-token', 'beb41ab59288839abca69afd187e6f0b32b95de1ffc61ea4a000b926a940fc3e', '[\"admin\"]', '2023-11-08 08:18:51', '2023-11-08 06:58:46', '2023-11-08 08:18:51'),
(478, 'App\\Models\\User', 93, 'hydra-api-token', '17f8ed7d150d78b8823db6631a585fa1d38194c941f00d36fd426c96981e33c0', '[\"admin\"]', '2023-11-08 09:35:54', '2023-11-08 07:00:42', '2023-11-08 09:35:54'),
(479, 'App\\Models\\User', 94, 'hydra-api-token', '1be250e90950bc110ddbeacdc75d7f987c9184f23631bc905b63b9fd2a431037', '[\"user\"]', '2023-11-08 08:21:42', '2023-11-08 07:09:27', '2023-11-08 08:21:42'),
(480, 'App\\Models\\User', 86, 'hydra-api-token', '54a9ac150cd8a327d883559e26475710301b13c934a252f80bf4ec3643f5153d', '[\"admin\"]', '2023-11-08 07:59:55', '2023-11-08 07:59:52', '2023-11-08 07:59:55'),
(481, 'App\\Models\\User', 84, 'hydra-api-token', '21735695d03d8031cfb6acbcdc843313b9968abbe58d498de045da8bd51a673d', '[\"user\"]', '2023-11-08 08:02:42', '2023-11-08 08:02:40', '2023-11-08 08:02:42'),
(482, 'App\\Models\\User', 94, 'hydra-api-token', 'a08148541c4000b5acd4b42c99f5f8f11b0f4f4b3340dfcda7ddb47f35609601', '[\"user\"]', '2023-11-08 10:35:36', '2023-11-08 08:22:44', '2023-11-08 10:35:36'),
(483, 'App\\Models\\User', 96, 'hydra-api-token', '53e8515ce4fc3914013984cf1ac16b08385798eda234dcde051781ef01a09e2e', '[\"user\"]', '2023-11-08 09:38:06', '2023-11-08 08:23:42', '2023-11-08 09:38:06'),
(484, 'App\\Models\\User', 94, 'hydra-api-token', '7ac9ef8e0c13a5e6d790b21354b54864cf8be450c99d419e06b019af07dd50a5', '[\"user\"]', '2023-11-08 10:46:38', '2023-11-08 09:52:26', '2023-11-08 10:46:38'),
(485, 'App\\Models\\User', 96, 'hydra-api-token', 'd7922b1ce7b38d7094bc87489bfcdf56b40f0808fda3e5527b67002a6294aaeb', '[\"user\"]', '2023-11-08 09:57:20', '2023-11-08 09:57:18', '2023-11-08 09:57:20'),
(487, 'App\\Models\\User', 96, 'hydra-api-token', '466b1ff4994f17a90c5c10548dc1174ffd922f9ef768778ca51075a9b4efdea1', '[\"user\"]', '2023-11-08 10:34:17', '2023-11-08 10:18:08', '2023-11-08 10:34:17'),
(488, 'App\\Models\\User', 96, 'hydra-api-token', '863431dbb20894bfb191f61a888c52a2eb43bf03cf12dd54fb2f1460bf02218b', '[\"user\"]', '2023-11-08 13:20:31', '2023-11-08 10:19:17', '2023-11-08 13:20:31'),
(491, 'App\\Models\\User', 96, 'hydra-api-token', '1ddc843f7052f190a749b9aefedbf3d5bb8938ca0d072b93f325ce5aafb533ea', '[\"user\"]', '2023-11-08 10:35:27', '2023-11-08 10:34:40', '2023-11-08 10:35:27'),
(492, 'App\\Models\\User', 95, 'hydra-api-token', 'fc5b8034285c5e73398830421c0587e2c0815c07fe87085bae9b6b38e46e10a4', '[\"user\"]', '2023-11-08 10:40:22', '2023-11-08 10:36:56', '2023-11-08 10:40:22'),
(493, 'App\\Models\\User', 95, 'hydra-api-token', '22d5f258a44bb49a180b712f66a0ad887c4cf00805f31581619e408726ae4eae', '[\"user\"]', '2023-11-08 13:20:19', '2023-11-08 10:40:33', '2023-11-08 13:20:19'),
(495, 'App\\Models\\User', 96, 'hydra-api-token', 'd393bb67e36df022929f392dcf51cd2d3b2e4cec9afbbf1c51c7e1d36f8d4c73', '[\"user\"]', '2023-11-08 10:42:04', '2023-11-08 10:42:03', '2023-11-08 10:42:04'),
(496, 'App\\Models\\User', 95, 'hydra-api-token', '61bc02fc9c274b068f10278af8958fc7089a5bd945d0357e7625da4f067f7cbd', '[\"user\"]', '2023-11-08 13:02:46', '2023-11-08 10:47:06', '2023-11-08 13:02:46'),
(497, 'App\\Models\\User', 96, 'hydra-api-token', 'dc7f4ca567b38afbbcadc187936cb1ba6ddae90f8e226b122925ca0b94c545a9', '[\"user\"]', '2023-11-08 11:37:57', '2023-11-08 10:47:38', '2023-11-08 11:37:57'),
(498, 'App\\Models\\User', 96, 'hydra-api-token', '21513648a3d3bf3d52def232baf7ab26151b57708d434ed61d577bc16611ae17', '[\"user\"]', '2023-11-08 13:09:19', '2023-11-08 11:28:17', '2023-11-08 13:09:19'),
(499, 'App\\Models\\User', 87, 'hydra-api-token', '537610a2261204e831b092ea4f0ba1ed21b3edf376624af8624d5ef96c2f79ab', '[\"admin\"]', '2023-11-08 12:20:58', '2023-11-08 12:19:55', '2023-11-08 12:20:58'),
(500, 'App\\Models\\User', 95, 'hydra-api-token', 'a550d93673fbccfff131657568c3dbef7f19da3ca394c1d1cc07ce58ff719791', '[\"user\"]', '2023-11-08 13:10:10', '2023-11-08 13:10:06', '2023-11-08 13:10:10'),
(501, 'App\\Models\\User', 95, 'hydra-api-token', 'dfcf4b7cc5fba6c20db3647b30e34d81453df8a1997ac1bba10ecfbe45ca49da', '[\"user\"]', '2023-11-08 13:17:16', '2023-11-08 13:15:45', '2023-11-08 13:17:16'),
(502, 'App\\Models\\User', 95, 'hydra-api-token', 'd0f47f709d2f1524885604d362be52006c0302a7b0bc4af2d4b105112ecdd479', '[\"user\"]', '2023-11-08 13:24:39', '2023-11-08 13:22:41', '2023-11-08 13:24:39'),
(503, 'App\\Models\\User', 83, 'hydra-api-token', '64ea14aafdadc44a35f929d7f5dafd081b093cf1e6e7518fc7d4b4aed62b5dc2', '[\"user\"]', '2023-11-09 03:43:23', '2023-11-09 03:43:22', '2023-11-09 03:43:23'),
(504, 'App\\Models\\User', 90, 'hydra-api-token', '7fcdb44f68ff585c3fb37eff32d7254ca3a3b0792bfe536f24e4606040cc1ceb', '[\"user\"]', '2023-11-09 04:07:00', '2023-11-09 04:05:10', '2023-11-09 04:07:00'),
(505, 'App\\Models\\User', 87, 'hydra-api-token', '973e81987af8c299821a7e189c87e7bf54c2a4487264d6e677ae483de34c439c', '[\"admin\"]', '2023-11-09 05:00:40', '2023-11-09 05:00:01', '2023-11-09 05:00:40'),
(506, 'App\\Models\\User', 83, 'hydra-api-token', 'd61d98e8b4e5f186ed055d9ff72420c5727d6d0076d331253d403a52a79e89cd', '[\"user\"]', '2023-11-09 06:07:50', '2023-11-09 06:04:52', '2023-11-09 06:07:50'),
(507, 'App\\Models\\User', 83, 'hydra-api-token', '7c9925e231a1f0e8736bf087be3abe776f8c9ccb97c6e98a006abcc33c937ab9', '[\"user\"]', '2023-11-09 15:47:10', '2023-11-09 06:06:56', '2023-11-09 15:47:10'),
(508, 'App\\Models\\User', 90, 'hydra-api-token', 'd1daa8bc9ebe22f4c2b4e19d2aaab39eb6bee4b43967c0c7acb1bb8157d7d3c3', '[\"user\"]', '2023-11-09 06:30:59', '2023-11-09 06:29:20', '2023-11-09 06:30:59'),
(509, 'App\\Models\\User', 90, 'hydra-api-token', 'b853d5124e5f9d7cb336ca39a2c790a3e69ed6ffd8f8fe46a9debc4591d41593', '[\"user\"]', '2023-11-09 07:39:11', '2023-11-09 07:34:17', '2023-11-09 07:39:11'),
(510, 'App\\Models\\User', 89, 'hydra-api-token', '547c4ba8b352416b2db936fff0fb10c5b10f0247f67406787732534f5bec4f70', '[\"user\"]', '2023-11-09 07:48:09', '2023-11-09 07:40:07', '2023-11-09 07:48:09'),
(511, 'App\\Models\\User', 89, 'hydra-api-token', 'c7ca444480a5b09578fc449cbb3468d6a155e254884b99196aff096ac933e1a6', '[\"user\"]', '2023-11-09 10:28:02', '2023-11-09 07:45:12', '2023-11-09 10:28:02'),
(512, 'App\\Models\\User', 90, 'hydra-api-token', 'c5fe7f5aba58dd9fc9cc4821cb4a3e0dc06e1ee5d03afebe8f856bbb815d2028', '[\"user\"]', '2023-11-09 08:14:59', '2023-11-09 08:10:16', '2023-11-09 08:14:59'),
(513, 'App\\Models\\User', 90, 'hydra-api-token', '59198de0bf0ba9bc21a64ba7b717432ca68a32b3ea2fbe3131b39b95f56cc920', '[\"user\"]', '2023-11-09 08:16:04', '2023-11-09 08:15:26', '2023-11-09 08:16:04'),
(514, 'App\\Models\\User', 90, 'hydra-api-token', '5f57c4fe01f29e7f50c982c159fbecddab50a66ac508fcaf676ba7bdfe0fb202', '[\"user\"]', '2023-11-09 08:35:37', '2023-11-09 08:19:57', '2023-11-09 08:35:37'),
(515, 'App\\Models\\User', 95, 'hydra-api-token', '4c2752c401beff4942d0e94aace667264e17906ae264986b6956d25ae53f48e9', '[\"user\"]', '2023-11-09 13:06:35', '2023-11-09 09:08:55', '2023-11-09 13:06:35'),
(516, 'App\\Models\\User', 96, 'hydra-api-token', '234e3a623032e468c520f29f75404fc80952b4261e474ae8a47376b224ebee60', '[\"user\"]', '2023-11-09 13:06:34', '2023-11-09 09:12:33', '2023-11-09 13:06:34'),
(517, 'App\\Models\\User', 90, 'hydra-api-token', '1f70c53f5eed891a7b9fa86ed363aa7d59c88ec1a4bd7a275e879b3ac207e001', '[\"user\"]', '2023-11-09 09:33:45', '2023-11-09 09:26:47', '2023-11-09 09:33:45'),
(518, 'App\\Models\\User', 89, 'hydra-api-token', 'cbe1a3ab0f4f967ddc6d2edbd0170691baba201fecd164e56f04a786e750f809', '[\"user\"]', '2023-11-09 09:36:42', '2023-11-09 09:34:08', '2023-11-09 09:36:42'),
(519, 'App\\Models\\User', 95, 'hydra-api-token', 'c146f05f63f7e83792ca374f5036c9fd6415b6d4d4d43af058baab2c8348eaed', '[\"user\"]', '2023-11-09 10:01:40', '2023-11-09 10:01:38', '2023-11-09 10:01:40'),
(520, 'App\\Models\\User', 82, 'hydra-api-token', '1cd08fb74c051d0605ab4660270215fffb876deb04f4978d2580cf43a8a77b32', '[\"user\"]', '2023-11-09 15:47:29', '2023-11-09 15:47:24', '2023-11-09 15:47:29'),
(521, 'App\\Models\\User', 90, 'hydra-api-token', 'd11085f24363c6c08de926839dc2f873393956f1486abe1ee79968e8284ddf9e', '[\"user\"]', '2023-11-10 09:04:58', '2023-11-10 08:44:52', '2023-11-10 09:04:58'),
(522, 'App\\Models\\User', 90, 'hydra-api-token', 'a2b7b50e5a313ae346041517b27850aeb9be8fed5b50f1c784694e5658679d4d', '[\"user\"]', '2023-11-11 04:03:31', '2023-11-11 04:03:27', '2023-11-11 04:03:31'),
(523, 'App\\Models\\User', 90, 'hydra-api-token', 'a231a5eea9340041e50cb06bbdc3cbd987d80eddd992e46bf8a76e0b5c68a736', '[\"user\"]', '2023-11-11 04:04:59', '2023-11-11 04:03:37', '2023-11-11 04:04:59'),
(524, 'App\\Models\\User', 83, 'hydra-api-token', '43cbb512d1219008d909044144e1b32c5f7877a76d903205657486b5c8b88ba3', '[\"user\"]', '2023-11-11 04:17:07', '2023-11-11 04:17:06', '2023-11-11 04:17:07'),
(525, 'App\\Models\\User', 82, 'hydra-api-token', 'd4313bf46c77da28a0b122c515b40dc78da3297b2c78756c319893547f72408e', '[\"user\"]', '2023-11-11 04:17:37', '2023-11-11 04:17:27', '2023-11-11 04:17:37'),
(526, 'App\\Models\\User', 82, 'hydra-api-token', '232ca0fcac34f1f646f9a4568034c4ff910e87c4c87166bd8981e9be6f1a3376', '[\"user\"]', '2023-11-11 05:46:13', '2023-11-11 05:44:58', '2023-11-11 05:46:13'),
(527, 'App\\Models\\User', 90, 'hydra-api-token', 'c4d4e765c71c2ae373bc0ea56b8876369ee72c2486a5b86bdfb754e8aea39372', '[\"user\"]', '2023-11-11 07:12:48', '2023-11-11 07:11:52', '2023-11-11 07:12:48'),
(528, 'App\\Models\\User', 89, 'hydra-api-token', 'd459e96498775f46adf3e5cbf93964f611b6fb1add2ccd27aa321f37da6a62d4', '[\"user\"]', '2023-11-11 07:47:51', '2023-11-11 07:27:22', '2023-11-11 07:47:51'),
(529, 'App\\Models\\User', 90, 'hydra-api-token', 'c52238d4931f96b4e22ae0c697650b0f7403233f398ca29861a5de561bb30bc6', '[\"user\"]', '2023-11-11 08:13:22', '2023-11-11 07:34:01', '2023-11-11 08:13:22'),
(530, 'App\\Models\\User', 89, 'hydra-api-token', 'c9a45f0f8ceb7e4fd731455c3f6b92a151049ab93acab24b7bf821f6f0ea5b92', '[\"user\"]', '2023-11-11 08:12:39', '2023-11-11 07:34:14', '2023-11-11 08:12:39'),
(531, 'App\\Models\\User', 90, 'hydra-api-token', 'd757033d44580ccd2b1ea0cf0f241e28b38c3294b643b588d098870aa0fc060f', '[\"user\"]', '2023-11-11 07:42:27', '2023-11-11 07:40:14', '2023-11-11 07:42:27'),
(532, 'App\\Models\\User', 90, 'hydra-api-token', 'ab5deac7f3121ebcf722850aa1428090c24a14264425418e4f5fd7d0dd503f15', '[\"user\"]', '2023-11-11 07:52:14', '2023-11-11 07:42:54', '2023-11-11 07:52:14'),
(533, 'App\\Models\\User', 89, 'hydra-api-token', '514d26c3e7eda3ea15a434483e6ac9eb986308ca9ad82e7023925caac70f0a7c', '[\"user\"]', '2023-11-11 08:11:45', '2023-11-11 07:52:51', '2023-11-11 08:11:45'),
(534, 'App\\Models\\User', 89, 'hydra-api-token', 'ba3e4d633dcde880697cd198fa84406c1507d4b5bad35ad3b57fe76faaaafacf', '[\"user\"]', '2023-11-11 07:53:46', '2023-11-11 07:53:44', '2023-11-11 07:53:46'),
(535, 'App\\Models\\User', 90, 'hydra-api-token', '5084171d9b4b3dc83acd04397487a86aada400644ee8063e48703cc7ae4d803e', '[\"user\"]', '2023-11-11 08:11:42', '2023-11-11 07:53:56', '2023-11-11 08:11:42'),
(536, 'App\\Models\\User', 90, 'hydra-api-token', '6930d0beb5993f636c9e21f8d5ab8f9c66a861e7674716b14429884a87c72bfc', '[\"user\"]', '2023-11-11 08:13:36', '2023-11-11 08:12:05', '2023-11-11 08:13:36'),
(537, 'App\\Models\\User', 89, 'hydra-api-token', 'ea0285d04f47315abdd5210f1cda69290fcf8c8d91c30ef5e194906b48cbbfd7', '[\"user\"]', '2023-11-11 08:27:35', '2023-11-11 08:12:45', '2023-11-11 08:27:35'),
(538, 'App\\Models\\User', 90, 'hydra-api-token', '8931f7ba3c72343d8172229876fc0f889319d1af71fddba3e97d31336f810d40', '[\"user\"]', '2023-11-11 08:13:35', '2023-11-11 08:13:34', '2023-11-11 08:13:35'),
(539, 'App\\Models\\User', 82, 'hydra-api-token', '561f09c8b892a181b13752057d9e74b2e3de6cd0cc1c0b36055394c2df15fee3', '[\"user\"]', '2023-11-11 08:52:44', '2023-11-11 08:43:19', '2023-11-11 08:52:44'),
(540, 'App\\Models\\User', 83, 'hydra-api-token', '6bac2c602d777aa5d0467605fb49a6b3f6c4a98fc5f0a87b5c634074b00ff561', '[\"user\"]', '2023-11-11 08:52:35', '2023-11-11 08:43:48', '2023-11-11 08:52:35'),
(541, 'App\\Models\\User', 87, 'hydra-api-token', '1ff81bcb58ce66862efebaeb8ceb3afcd74330e4d2722e695fad4949459de015', '[\"admin\"]', '2023-11-11 09:52:48', '2023-11-11 08:53:20', '2023-11-11 09:52:48'),
(542, 'App\\Models\\User', 90, 'hydra-api-token', 'b9c3075c941c99096141aa0176eb4e0f8cd6093c38d45f9663018634b087881a', '[\"user\"]', '2023-11-11 09:59:32', '2023-11-11 09:05:55', '2023-11-11 09:59:32'),
(543, 'App\\Models\\User', 82, 'hydra-api-token', 'e5045770a2f4961cec99bf631a5abf57fe849fe0658ce6251eb15cb22b72fc1b', '[\"user\"]', '2023-11-11 10:01:25', '2023-11-11 10:00:56', '2023-11-11 10:01:25'),
(544, 'App\\Models\\User', 89, 'hydra-api-token', '7d81ae11d33e873f3108f48bdd6c8de4913371174b61eb100c56b6ceae2fa0d1', '[\"user\"]', '2023-11-11 10:30:00', '2023-11-11 10:26:05', '2023-11-11 10:30:00'),
(545, 'App\\Models\\User', 86, 'hydra-api-token', 'f49f4f138d6f13f27b0554ca59e16620ab81ef837c476ccf7c2648acbf31d1f6', '[\"admin\"]', '2023-11-11 10:31:31', '2023-11-11 10:31:03', '2023-11-11 10:31:31');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(546, 'App\\Models\\User', 90, 'hydra-api-token', '1b1e161e2f396f30a412b94d4a0136dde1ae79fda27a7405309eb9f4492761eb', '[\"user\"]', '2023-11-11 13:40:50', '2023-11-11 12:15:11', '2023-11-11 13:40:50'),
(547, 'App\\Models\\User', 89, 'hydra-api-token', '0c9aa7eb8b08987ec07524b1c5c8461777e19178a6edfc11591c64593ea30433', '[\"user\"]', '2023-11-11 12:31:45', '2023-11-11 12:17:10', '2023-11-11 12:31:45'),
(548, 'App\\Models\\User', 90, 'hydra-api-token', '317010e606e0587d22ec72e698845a717c8e280840671ede4468ea66793db806', '[\"user\"]', '2023-11-11 14:34:05', '2023-11-11 14:33:05', '2023-11-11 14:34:05'),
(549, 'App\\Models\\User', 90, 'hydra-api-token', '6ecb7df27f9c16e990f63773bab28714df5ea70e54d74b9225f4abce3309e72d', '[\"user\"]', '2023-11-11 15:23:53', '2023-11-11 15:23:14', '2023-11-11 15:23:53'),
(550, 'App\\Models\\User', 89, 'hydra-api-token', '7c476c0dbf0e7900ddbb2849165adf89fdbd1b693df0676e2da2f23677c49365', '[\"user\"]', '2023-11-11 15:26:05', '2023-11-11 15:24:03', '2023-11-11 15:26:05'),
(551, 'App\\Models\\User', 95, 'hydra-api-token', '0d7e0b38f773592d2d8ef38b656175d1363ea2e107aef8283715c36bc0ed3a81', '[\"user\"]', '2023-11-12 04:12:16', '2023-11-12 04:03:59', '2023-11-12 04:12:16'),
(552, 'App\\Models\\User', 90, 'hydra-api-token', '580d6bb2a5cef30e4cd661372671400b357db186603e356bcd7bbd731b70a0d7', '[\"user\"]', '2023-11-12 12:18:22', '2023-11-12 11:30:39', '2023-11-12 12:18:22'),
(553, 'App\\Models\\User', 82, 'hydra-api-token', 'ce176403a922f17a03dd3fbd5ce3d602e8da3c573fc636f3ad19cc94d65d1a13', '[\"user\"]', '2023-11-12 12:48:05', '2023-11-12 11:50:49', '2023-11-12 12:48:05'),
(554, 'App\\Models\\User', 90, 'hydra-api-token', 'd6ca3036569023946f06f0a6720086e33bb8d6311f5e5bfc38d59c12e8b6c2ef', '[\"user\"]', '2023-11-12 16:11:46', '2023-11-12 16:10:03', '2023-11-12 16:11:46'),
(555, 'App\\Models\\User', 95, 'hydra-api-token', 'b7748040efb6af2bd2d6cbae4ee68f0dfe58fcc82224493c3c33dce7963963f1', '[\"user\"]', '2023-11-13 07:00:30', '2023-11-13 07:00:27', '2023-11-13 07:00:30'),
(556, 'App\\Models\\User', 83, 'hydra-api-token', '4fdbc9c9e309cd6206262bce154030ea6f69f2fde43aa009d0f534795f904661', '[\"user\"]', '2023-11-13 07:24:08', '2023-11-13 07:22:58', '2023-11-13 07:24:08'),
(557, 'App\\Models\\User', 82, 'hydra-api-token', '7f259afe2c17869e0da1249ea36bb3f2af7983679fd92394602f8caad81f0540', '[\"user\"]', '2023-11-13 09:05:39', '2023-11-13 07:24:20', '2023-11-13 09:05:39'),
(558, 'App\\Models\\User', 89, 'hydra-api-token', 'cb4eb9323d46e8dc6bf6e28e9b555dd64b3dd1f26a314ad75024c3f0abe61f3c', '[\"user\"]', '2023-11-13 09:28:52', '2023-11-13 08:16:52', '2023-11-13 09:28:52'),
(559, 'App\\Models\\User', 86, 'hydra-api-token', '7ea746ab0342990659c466a39b89817a323c3093182e4949063d12acf69d1247', '[\"admin\"]', '2023-11-13 08:25:12', '2023-11-13 08:23:37', '2023-11-13 08:25:12'),
(560, 'App\\Models\\User', 83, 'hydra-api-token', '3933820b970e71d725d9b33872a4e94d7fd58ed3d0569cede498c939a9d5a247', '[\"user\"]', '2023-11-13 12:05:10', '2023-11-13 10:00:15', '2023-11-13 12:05:10'),
(561, 'App\\Models\\User', 82, 'hydra-api-token', 'c43ec0a19a2588fc9e057f044137cbb2a5ee6590ebb1c22cb8157788332f443e', '[\"user\"]', '2023-11-13 11:58:47', '2023-11-13 10:00:32', '2023-11-13 11:58:47'),
(562, 'App\\Models\\User', 82, 'hydra-api-token', '4def62fbf220c1e9f3c35a38e9b68109f92cfed7716a23d48d633f9f00845162', '[\"user\"]', '2023-11-13 12:14:54', '2023-11-13 12:14:52', '2023-11-13 12:14:54'),
(563, 'App\\Models\\User', 82, 'hydra-api-token', 'b5bebca782384e7a4080675fc54c31668f34ffc901f2eacc9eaca11993c09f97', '[\"user\"]', '2023-11-13 12:17:26', '2023-11-13 12:17:19', '2023-11-13 12:17:26'),
(564, 'App\\Models\\User', 89, 'hydra-api-token', 'bee2813e993dfee540da716fca770da6d285c08525ae0d745623f13238cd6b30', '[\"user\"]', '2023-11-13 12:20:04', '2023-11-13 12:19:58', '2023-11-13 12:20:04'),
(565, 'App\\Models\\User', 82, 'hydra-api-token', 'd7e8cf7f6a83d499fd87e7de76462a514c01f2d844f243c23091b7044e93e1be', '[\"user\"]', '2023-11-13 12:20:44', '2023-11-13 12:20:41', '2023-11-13 12:20:44'),
(566, 'App\\Models\\User', 82, 'hydra-api-token', 'a36c4337b5ffc5fc86869dde55e27adcad9d436d3f663cbd27e88664592aaa4b', '[\"user\"]', '2023-11-13 12:24:27', '2023-11-13 12:24:26', '2023-11-13 12:24:27'),
(567, 'App\\Models\\User', 90, 'hydra-api-token', '409c0c0c317b117d3c05d26347519a83e080098a19a8fefdc69d0a72e3c21f78', '[\"user\"]', '2023-11-14 03:00:39', '2023-11-14 02:40:24', '2023-11-14 03:00:39'),
(568, 'App\\Models\\User', 89, 'hydra-api-token', 'b3b938d6d7cdce8f6d68abdda6f09939a664189987d4448804cd877c3b2615ea', '[\"user\"]', '2023-11-14 02:57:27', '2023-11-14 02:41:30', '2023-11-14 02:57:27'),
(569, 'App\\Models\\User', 90, 'hydra-api-token', '7cdb831097ea35d0329838e69d65e775c86dd4f02c3f5fdae15291fca0e1f9b2', '[\"user\"]', '2023-11-14 03:09:35', '2023-11-14 03:03:12', '2023-11-14 03:09:35'),
(570, 'App\\Models\\User', 89, 'hydra-api-token', '2a32ad92d6775c5ae28cba7cc1ca8ce1cacc77e775f2ad154251b0d5ce8010c5', '[\"user\"]', '2023-11-14 03:08:31', '2023-11-14 03:08:20', '2023-11-14 03:08:31'),
(571, 'App\\Models\\User', 90, 'hydra-api-token', '33b64b794a0bdf02a99a491f1ca606da32efcb6530d345fc4b0f7bbd3d4dd55e', '[\"user\"]', '2023-11-14 05:20:03', '2023-11-14 05:19:30', '2023-11-14 05:20:03'),
(572, 'App\\Models\\User', 96, 'hydra-api-token', '874a1c2db9210f90f5d6fd23e778002216b1376d63bee69b1cfd5d403bb3c4f2', '[\"user\"]', '2023-11-14 11:32:17', '2023-11-14 09:05:10', '2023-11-14 11:32:17'),
(573, 'App\\Models\\User', 96, 'hydra-api-token', 'da159cae3b70c86a489edd54affb93d03066bb7d1010516b8a36fcba014ae8f1', '[\"user\"]', '2023-11-14 09:46:55', '2023-11-14 09:05:13', '2023-11-14 09:46:55'),
(574, 'App\\Models\\User', 96, 'hydra-api-token', 'e8fc9a27c4f7e266f59f0e131ac93bd76cecfaa5822518d0e7ce994c1d334615', '[\"user\"]', '2023-11-14 12:57:33', '2023-11-14 09:39:29', '2023-11-14 12:57:33'),
(575, 'App\\Models\\User', 95, 'hydra-api-token', '3e22c369d8aba33aed708a6714987ee046ac63c4261a2fffdb5c2cff4dc65827', '[\"user\"]', '2023-11-14 09:50:55', '2023-11-14 09:50:54', '2023-11-14 09:50:55'),
(576, 'App\\Models\\User', 96, 'hydra-api-token', '4c329939d2e2a087e0132587a1f794a3d961fbd2626e307d5063dfd8affd9648', '[\"user\"]', '2023-11-14 09:55:27', '2023-11-14 09:51:10', '2023-11-14 09:55:27'),
(577, 'App\\Models\\User', 95, 'hydra-api-token', '5d32d7521296fc5f2df5a3813a59030d0da23dbf96b35d94f59af5ab3fb982fe', '[\"user\"]', '2023-11-14 12:20:13', '2023-11-14 10:52:31', '2023-11-14 12:20:13'),
(578, 'App\\Models\\User', 96, 'hydra-api-token', 'ac1030e421d4cf84a4b67fd7e480fbdd2fc394ff05b014e37967afc900fc25d4', '[\"user\"]', '2023-11-14 12:11:40', '2023-11-14 11:04:35', '2023-11-14 12:11:40'),
(579, 'App\\Models\\User', 96, 'hydra-api-token', 'a2e96d117aac8198eeb74ddfbb837379ad766105adbd66501d42126adb82b995', '[\"user\"]', '2023-11-14 12:15:12', '2023-11-14 11:15:27', '2023-11-14 12:15:12'),
(580, 'App\\Models\\User', 89, 'hydra-api-token', 'cea8eafee3453ac57721d4d074c9e76166e4beb20e01f55de59c07e52a666020', '[\"user\"]', '2023-11-14 12:15:33', '2023-11-14 11:42:25', '2023-11-14 12:15:33'),
(581, 'App\\Models\\User', 82, 'hydra-api-token', 'c40b840a6633aad8a8bfc73bd01ef5c05c6c40e28592e901e01ef88adea95279', '[\"user\"]', '2023-11-14 12:32:52', '2023-11-14 12:15:45', '2023-11-14 12:32:52'),
(582, 'App\\Models\\User', 82, 'hydra-api-token', 'dd94e6caf47fdf10dd5e318835259651cc0ce6e27caedcbae4f4eb9a6542d948', '[\"user\"]', '2023-11-14 12:16:20', '2023-11-14 12:15:53', '2023-11-14 12:16:20'),
(583, 'App\\Models\\User', 82, 'hydra-api-token', '0044f3e2494bb2597428768dc2b7be5803a7ac59b2ac436ca3bfb6c05e321853', '[\"user\"]', '2023-11-14 12:29:02', '2023-11-14 12:20:42', '2023-11-14 12:29:02'),
(584, 'App\\Models\\User', 89, 'hydra-api-token', '713b06991847f9aca481a99eba0082cd3c520b3ab09f5a0d4be60021dbab4a8d', '[\"user\"]', '2023-11-14 12:33:45', '2023-11-14 12:33:39', '2023-11-14 12:33:45'),
(585, 'App\\Models\\User', 82, 'hydra-api-token', '0a802b37921d30e2502bb8e9009e6d0e6f73c58c1b52c3200c57809d955027aa', '[\"user\"]', '2023-11-15 03:43:07', '2023-11-15 03:41:44', '2023-11-15 03:43:07'),
(586, 'App\\Models\\User', 89, 'hydra-api-token', 'e8eeee08e0c3b2e0c160bcbc1192f7b00867ad0f497d0612d73b6301eb19392c', '[\"user\"]', '2023-11-15 03:46:49', '2023-11-15 03:46:17', '2023-11-15 03:46:49'),
(587, 'App\\Models\\User', 82, 'hydra-api-token', '62348d534b58a224fecf0195995272746acfd4850393a154544a2b619ae6a7c0', '[\"user\"]', '2023-11-15 03:47:07', '2023-11-15 03:47:02', '2023-11-15 03:47:07'),
(588, 'App\\Models\\User', 89, 'hydra-api-token', '2f713b5acc85bfd17ea0d2a6d806a4041647c61c2a3e0ef2b7551077b8787ce1', '[\"user\"]', '2023-11-15 03:48:06', '2023-11-15 03:48:00', '2023-11-15 03:48:06'),
(589, 'App\\Models\\User', 82, 'hydra-api-token', '790ed9b685baef4426c65ac7397e7dada9a49f7b588f550dca8a68af994c6dfa', '[\"user\"]', '2023-11-15 04:53:07', '2023-11-15 04:32:24', '2023-11-15 04:53:07'),
(590, 'App\\Models\\User', 83, 'hydra-api-token', '229d841f8c44d2a0e7c6ed705ed5cfae49ea2fefabe861fc61ad7d9c5476c423', '[\"user\"]', '2023-11-15 06:29:17', '2023-11-15 06:28:09', '2023-11-15 06:29:17'),
(591, 'App\\Models\\User', 83, 'hydra-api-token', '2861e0fe483f21c2c8634f7e22034fd054ed14bb4d267117cf498c50e65331c6', '[\"user\"]', NULL, '2023-11-15 06:28:13', '2023-11-15 06:28:13'),
(592, 'App\\Models\\User', 83, 'hydra-api-token', '5dfd6501b354a4ce674de64f1182f95712dac18d9f08b725c5ef4ebad7f42f96', '[\"user\"]', '2023-11-15 06:30:45', '2023-11-15 06:30:40', '2023-11-15 06:30:45'),
(593, 'App\\Models\\User', 96, 'hydra-api-token', '59da3a9db643c8bf9886402559e08195986fbe543e3d52997a4abc8e565825b3', '[\"user\"]', '2023-11-15 06:39:28', '2023-11-15 06:38:11', '2023-11-15 06:39:28'),
(594, 'App\\Models\\User', 89, 'hydra-api-token', 'ac9d8b49c8e2d56ddd8c239bb89a0c767ec015a0e46d1ee115e0a3ae8ff3e02f', '[\"user\"]', '2023-11-15 07:48:44', '2023-11-15 07:48:43', '2023-11-15 07:48:44'),
(595, 'App\\Models\\User', 90, 'hydra-api-token', '119c1e6312d5bba6442afc2290912a342b5b770a665cda5f4c42f518680e3a82', '[\"user\"]', '2023-11-15 07:51:11', '2023-11-15 07:48:54', '2023-11-15 07:51:11'),
(596, 'App\\Models\\User', 90, 'hydra-api-token', 'f4cbad144b85ea42e11d1a8b866cfc71597c7bd82d27dc78a44fdf686a2b5d79', '[\"user\"]', '2023-11-15 08:03:59', '2023-11-15 07:51:46', '2023-11-15 08:03:59'),
(597, 'App\\Models\\User', 89, 'hydra-api-token', '404c6856497d4629f503567a4a18ca080ceb840d8cdc16e3bbaaf2fda723f761', '[\"user\"]', '2023-11-15 08:03:12', '2023-11-15 07:52:34', '2023-11-15 08:03:12'),
(598, 'App\\Models\\User', 89, 'hydra-api-token', '5dfdeadca10cbc9971721f41aa8f3791ec0c292b175c7e0b7dab835b6ce9a0c8', '[\"user\"]', '2023-11-15 08:04:03', '2023-11-15 08:04:02', '2023-11-15 08:04:03'),
(599, 'App\\Models\\User', 90, 'hydra-api-token', '25369d9424cd3640a6d917a4d87cda9b6f6d2ae0f8f9d87fb30ee12cfa9dc285', '[\"user\"]', '2023-11-15 08:28:51', '2023-11-15 08:04:09', '2023-11-15 08:28:51'),
(600, 'App\\Models\\User', 83, 'hydra-api-token', '4876a1765ecfd10cdcbfc4d8918a7a0579f8575ef8e7498936b347bc2c667b72', '[\"user\"]', '2023-11-15 11:30:07', '2023-11-15 10:37:42', '2023-11-15 11:30:07'),
(601, 'App\\Models\\User', 96, 'hydra-api-token', '19286ebb6bfe0a720b6e3580751b321dde7244e33013b75f3886cef902a3e16f', '[\"user\"]', '2023-11-15 11:18:12', '2023-11-15 11:17:58', '2023-11-15 11:18:12'),
(602, 'App\\Models\\User', 96, 'hydra-api-token', 'd1604f9b779b7eb5980e58fa8dcdaf41b592a9403145eb13ecac91e95e15c0bb', '[\"user\"]', '2023-11-16 05:42:59', '2023-11-16 05:42:58', '2023-11-16 05:42:59'),
(603, 'App\\Models\\User', 82, 'hydra-api-token', '9db168b5cbd6d0a3838a837d193cbde7ddbd9e44fee3a0700eab54ad88f3f06f', '[\"user\"]', '2023-11-16 06:02:05', '2023-11-16 06:01:27', '2023-11-16 06:02:05'),
(604, 'App\\Models\\User', 96, 'hydra-api-token', 'a248f8bbda45253c6720bbfb2d726060faf5bbb5657d13400ce8888c83f6036b', '[\"user\"]', '2023-11-16 10:47:28', '2023-11-16 10:44:37', '2023-11-16 10:47:28'),
(605, 'App\\Models\\User', 96, 'hydra-api-token', '4a84d7af7c0512482ac1f62c3a12dfe7fffce486cf077c93a170dc815d212c61', '[\"user\"]', '2023-11-16 12:50:42', '2023-11-16 11:07:36', '2023-11-16 12:50:42'),
(606, 'App\\Models\\User', 82, 'hydra-api-token', '80e94afd489a994e2566ff50f5e8212a927e497536222d5632e1ec228bf8fc8a', '[\"user\"]', '2023-11-16 11:15:21', '2023-11-16 11:08:58', '2023-11-16 11:15:21'),
(607, 'App\\Models\\User', 96, 'hydra-api-token', 'aeb1ad6907c3e5c89fd6fd4a815aeb12b0c381034044618de102d2902461e450', '[\"user\"]', '2023-11-16 12:37:38', '2023-11-16 11:17:08', '2023-11-16 12:37:38'),
(608, 'App\\Models\\User', 82, 'hydra-api-token', '85c1c363b2b713293ed5cc427d95f1c1b35af4549c035f4a34e4c6c214188a20', '[\"user\"]', '2023-11-16 12:18:46', '2023-11-16 11:43:44', '2023-11-16 12:18:46'),
(609, 'App\\Models\\User', 96, 'hydra-api-token', '659a095231fff5d761548c6794f256bd376f14378cb8692cf0f69493edb99eb6', '[\"user\"]', '2023-11-16 11:49:15', '2023-11-16 11:46:45', '2023-11-16 11:49:15'),
(610, 'App\\Models\\User', 96, 'hydra-api-token', 'c319bd33ea0df0df7357784ee43dc4a8f33cb8bf2fcb7d7bce1bea6d8c18986b', '[\"user\"]', '2023-11-16 12:28:51', '2023-11-16 12:16:50', '2023-11-16 12:28:51'),
(611, 'App\\Models\\User', 90, 'hydra-api-token', '3c061c0440eb51a85c2dffd4e53794b8ee923d47e611838e5a58b6e106b657ba', '[\"user\"]', '2023-11-16 12:29:44', '2023-11-16 12:28:24', '2023-11-16 12:29:44'),
(612, 'App\\Models\\User', 96, 'hydra-api-token', '74b032b15681a1a519a82955c5d45bf9b963551c8340e010317e68eaa5cb812c', '[\"user\"]', '2023-11-16 12:54:19', '2023-11-16 12:38:37', '2023-11-16 12:54:19'),
(613, 'App\\Models\\User', 95, 'hydra-api-token', '3c43c2ecd773b8978abe74318cad38e5f2c34bfcbdbae5c28d1ca5d3de828769', '[\"user\"]', '2023-11-16 12:51:23', '2023-11-16 12:51:22', '2023-11-16 12:51:23'),
(614, 'App\\Models\\User', 95, 'hydra-api-token', 'ab15445d893ddb958d8fa40fa56709f9e6202e086497fa2aa315df53961a11f0', '[\"user\"]', '2023-11-16 20:34:07', '2023-11-16 18:14:48', '2023-11-16 20:34:07'),
(615, 'App\\Models\\User', 96, 'hydra-api-token', '14b0bad1227bdf5c13fb90fd6f983692b10d3bb76e56967a7e440f7cbb8734b2', '[\"user\"]', '2023-11-16 20:33:42', '2023-11-16 18:15:27', '2023-11-16 20:33:42'),
(616, 'App\\Models\\User', 96, 'hydra-api-token', '631d0badc4ed996abe2c0f1039b50602145d92149b5e76941c80d135cbead9f6', '[\"user\"]', '2023-11-17 18:42:58', '2023-11-17 17:44:02', '2023-11-17 18:42:58'),
(617, 'App\\Models\\User', 95, 'hydra-api-token', '982d4ebf763fdf2775a2ea02b6651a829549353b43542d7950675c1c956535c4', '[\"user\"]', '2023-11-17 17:53:08', '2023-11-17 17:44:10', '2023-11-17 17:53:08'),
(618, 'App\\Models\\User', 95, 'hydra-api-token', '0a0180cd717e3f7d01c0ccd737952f9181f1e57d48dff7ba84021cce83f4f013', '[\"user\"]', '2023-11-17 18:57:14', '2023-11-17 17:53:14', '2023-11-17 18:57:14'),
(619, 'App\\Models\\User', 96, 'hydra-api-token', 'd4470a7db2fc3f43a60aa8b49ff3882e80ad3b57eaf891af30a395999e6728fd', '[\"user\"]', '2023-11-18 04:25:51', '2023-11-18 04:14:02', '2023-11-18 04:25:51'),
(620, 'App\\Models\\User', 96, 'hydra-api-token', 'f3fd1cda3e315d94f1136bc6922afece533935e377d785197408a5d66e0aa37e', '[\"user\"]', '2023-11-18 04:58:17', '2023-11-18 04:57:07', '2023-11-18 04:58:17'),
(621, 'App\\Models\\User', 96, 'hydra-api-token', '21013a14ee0ab399cf6dab9446dd11e3f5af75d0d04209632c0e69e118ec7c83', '[\"user\"]', '2023-11-18 13:14:26', '2023-11-18 05:05:38', '2023-11-18 13:14:26'),
(622, 'App\\Models\\User', 95, 'hydra-api-token', '2450b572c41a60bfac7fe2c20625fd094c38ca1669a09bf78f73dee0b282c93c', '[\"user\"]', '2023-11-18 06:00:23', '2023-11-18 05:37:11', '2023-11-18 06:00:23'),
(623, 'App\\Models\\User', 96, 'hydra-api-token', '193a9e2f3e415a273c2711c91433928ed490669efbb7d72ce011375dfd99fae7', '[\"user\"]', '2023-11-18 06:12:26', '2023-11-18 06:00:41', '2023-11-18 06:12:26'),
(624, 'App\\Models\\User', 95, 'hydra-api-token', '72faa460cd52f0b63932a941d0a547ac24513d324df3ec0be2a52b1d88b5014c', '[\"user\"]', '2023-11-18 10:34:48', '2023-11-18 07:57:30', '2023-11-18 10:34:48'),
(625, 'App\\Models\\User', 96, 'hydra-api-token', '4537e59fe98be7bd4e7dc3c4859a19b452d02b9db021e1d5be2a414198f09a25', '[\"user\"]', '2023-11-18 09:54:58', '2023-11-18 07:57:41', '2023-11-18 09:54:58'),
(626, 'App\\Models\\User', 92, 'hydra-api-token', '3703217a7f80caa3132bf277f27f41c5b097edfbec961e5c0a301d37fff729cf', '[\"user\"]', '2023-11-18 08:15:19', '2023-11-18 08:07:57', '2023-11-18 08:15:19'),
(627, 'App\\Models\\User', 91, 'hydra-api-token', '47ac1fac44743e9f211cd30bf6472e0abd808ee8bbeff343b01de833ca55956f', '[\"user\"]', '2023-11-18 08:15:31', '2023-11-18 08:08:10', '2023-11-18 08:15:31'),
(628, 'App\\Models\\User', 96, 'hydra-api-token', 'fb1a52228266c273b0ec100dec859e3339e9a10e653664f8e81f88e2c0e8094b', '[\"user\"]', '2023-11-18 09:11:50', '2023-11-18 09:11:48', '2023-11-18 09:11:50'),
(629, 'App\\Models\\User', 95, 'hydra-api-token', '1fab674ddeb01566a83a9df3b67a984679f1c432a9a9ab9ecaf5a1e4b5d70560', '[\"user\"]', '2023-11-18 09:46:25', '2023-11-18 09:12:07', '2023-11-18 09:46:25'),
(630, 'App\\Models\\User', 96, 'hydra-api-token', '42b5c55db6add0ee296ccd5ffccd230329daf66502fa920e69c4dd8ade84ac5c', '[\"user\"]', '2023-11-18 09:30:16', '2023-11-18 09:30:15', '2023-11-18 09:30:16'),
(631, 'App\\Models\\User', 95, 'hydra-api-token', 'de6ccee0144f816922143795eddede6c1c8302c713d7c551e5ee1015d468bde2', '[\"user\"]', '2023-11-18 09:30:39', '2023-11-18 09:30:38', '2023-11-18 09:30:39'),
(632, 'App\\Models\\User', 86, 'hydra-api-token', 'd2f0a3cd60d3c1ee68c32cb91c8264f474b89f753c2d6efe2ce41913650d3ca3', '[\"admin\"]', '2023-11-18 12:56:56', '2023-11-18 09:37:23', '2023-11-18 12:56:56'),
(633, 'App\\Models\\User', 92, 'hydra-api-token', '9921e1f9ce442697fb362b36c54e549658ba0630ca6bea8b07d264fd3bae6782', '[\"user\"]', '2023-11-18 10:07:08', '2023-11-18 09:55:15', '2023-11-18 10:07:08'),
(634, 'App\\Models\\User', 96, 'hydra-api-token', '16435c51fb480ae568e1aea576ff1cf2b58693cae234d8894e392f364316fd66', '[\"user\"]', '2023-11-18 10:34:39', '2023-11-18 10:07:31', '2023-11-18 10:34:39'),
(635, 'App\\Models\\User', 95, 'hydra-api-token', '496720321dc8009324a06a3a6694bf17ea2262819fb4cd019d7d39df3ed193ed', '[\"user\"]', '2023-11-18 12:49:16', '2023-11-18 10:18:49', '2023-11-18 12:49:16'),
(636, 'App\\Models\\User', 1, 'hydra-api-token', '560c3402d52df994ba6a9e6b177f0e938741433d5c1539de94df742485095ea7', '[\"admin\"]', '2023-11-18 10:30:13', '2023-11-18 10:30:08', '2023-11-18 10:30:13'),
(637, 'App\\Models\\User', 96, 'hydra-api-token', '7db6eeb378b9d8b219fa3b816a64ec8b88d9a3c15a9d01a6be004bfcee96c700', '[\"user\"]', '2023-11-18 12:04:37', '2023-11-18 10:34:46', '2023-11-18 12:04:37'),
(638, 'App\\Models\\User', 95, 'hydra-api-token', '64ecc617a5e6e23c0597c4f55554850ca2855fdc59d3d6d9aae94eeb1d4e5eae', '[\"user\"]', '2023-11-18 12:25:23', '2023-11-18 10:34:58', '2023-11-18 12:25:23'),
(639, 'App\\Models\\User', 96, 'hydra-api-token', '24d76e41215a41ed1da78a497ed9974a9c7d8fa31fd9645407ed15155a348808', '[\"user\"]', '2023-11-18 11:42:45', '2023-11-18 11:23:24', '2023-11-18 11:42:45'),
(640, 'App\\Models\\User', 92, 'hydra-api-token', '795033dfc6907404b4ad3fce63db90119ea021d78980b0b52523ca60f68be3cb', '[\"user\"]', '2023-11-18 12:31:31', '2023-11-18 12:07:53', '2023-11-18 12:31:31'),
(641, 'App\\Models\\User', 92, 'hydra-api-token', 'e7dab86c042394885b295ea9fe0626f8d1b3b25a453c4ab6e7457f83b8cba3f7', '[\"user\"]', '2023-11-18 12:26:28', '2023-11-18 12:25:39', '2023-11-18 12:26:28'),
(642, 'App\\Models\\User', 91, 'hydra-api-token', 'e7f6cd582101d0fe28b240997df0af5074ee7bef0dba4a1899a7d860074ad7d2', '[\"user\"]', '2023-11-18 12:31:39', '2023-11-18 12:26:41', '2023-11-18 12:31:39'),
(643, 'App\\Models\\User', 96, 'hydra-api-token', '3a72dd09ebe7be755615cff41a96616e4954c9d56e7868ed7cf078ba512bdbef', '[\"user\"]', '2023-11-18 12:31:28', '2023-11-18 12:28:30', '2023-11-18 12:31:28'),
(644, 'App\\Models\\User', 92, 'hydra-api-token', 'ced8bf7ec1d4ccfdee9adac742d3d1fa2a87b112b133a1f9eb41c291f7da7bcc', '[\"user\"]', '2023-11-18 12:49:54', '2023-11-18 12:46:40', '2023-11-18 12:49:54'),
(645, 'App\\Models\\User', 96, 'hydra-api-token', '09ae17b7087000a4a810ee33ea1e0ee2894a8e5d8b753c5ae5064e3e647dba20', '[\"user\"]', '2023-11-18 13:38:47', '2023-11-18 13:20:34', '2023-11-18 13:38:47'),
(646, 'App\\Models\\User', 96, 'hydra-api-token', '4fc5af5632c0eff120d47f3a6c8c770a0f852c126436a4058de1c643737f2af9', '[\"user\"]', '2023-11-18 13:38:48', '2023-11-18 13:22:06', '2023-11-18 13:38:48'),
(647, 'App\\Models\\User', 86, 'hydra-api-token', '2b50f4e0ac63d2a48d0f4d9414f59b61c61518537ced50c20d33c07a1084eb9a', '[\"admin\"]', '2023-11-18 18:34:58', '2023-11-18 16:51:21', '2023-11-18 18:34:58'),
(648, 'App\\Models\\User', 86, 'hydra-api-token', '4f69b469c1b6a33d752c473b7305a73c6f54895c689d38e111eaad544ad2efa9', '[\"admin\"]', '2023-11-18 20:51:22', '2023-11-18 20:49:05', '2023-11-18 20:51:22'),
(649, 'App\\Models\\User', 86, 'hydra-api-token', '3b9aa8eee37caa77b48c19e38d693b3737d4e01644f1ee02e88131d7b8545756', '[\"admin\"]', '2023-11-18 21:29:44', '2023-11-18 21:23:06', '2023-11-18 21:29:44'),
(650, 'App\\Models\\User', 83, 'hydra-api-token', '3f2f83115647b61ec06268c6cd8cdbe2ad7e43717ee01ec866756482de1e6c38', '[\"user\"]', '2023-11-18 21:24:37', '2023-11-18 21:23:35', '2023-11-18 21:24:37'),
(651, 'App\\Models\\User', 91, 'hydra-api-token', '44364ff3ef3cd211c0853aaf77e5151437fc45226b3ef3f0927240a9fe47cef9', '[\"user\"]', '2023-11-18 21:31:14', '2023-11-18 21:24:47', '2023-11-18 21:31:14'),
(652, 'App\\Models\\User', 92, 'hydra-api-token', '3985eac9cf0e04cecf0a8c68e9fa9fd2cf53022a90bcdeb40a2e6ff66a138250', '[\"user\"]', '2023-11-18 21:26:10', '2023-11-18 21:25:57', '2023-11-18 21:26:10'),
(653, 'App\\Models\\User', 91, 'hydra-api-token', '7b0c51621cb4b52b962d91908852fbe353596031ce54eccf704376ebfc9a4bba', '[\"user\"]', '2023-11-18 21:34:35', '2023-11-18 21:31:53', '2023-11-18 21:34:35'),
(654, 'App\\Models\\User', 86, 'hydra-api-token', '81819c3548a50a5cd89649bed8e6c2777b818cc7553669085ff956a54499ce7c', '[\"admin\"]', '2023-11-19 02:57:25', '2023-11-19 02:54:29', '2023-11-19 02:57:25'),
(655, 'App\\Models\\User', 91, 'hydra-api-token', '55b782f8f551bebff36148dcb567871f2819d6da0ca5e727542d7c4b2d721109', '[\"user\"]', '2023-11-19 03:05:41', '2023-11-19 02:55:42', '2023-11-19 03:05:41'),
(656, 'App\\Models\\User', 86, 'hydra-api-token', '0327d033c4855dcbb2987c790651a02efd3cefd7242acb4c565053a68cf83eae', '[\"admin\"]', '2023-11-19 04:06:03', '2023-11-19 03:58:08', '2023-11-19 04:06:03'),
(657, 'App\\Models\\User', 86, 'hydra-api-token', 'd18891d647db58608ba6b9adfb2255b995297b5aa0d56c78999a6db1efcf14d3', '[\"admin\"]', '2023-11-19 04:10:19', '2023-11-19 04:09:02', '2023-11-19 04:10:19'),
(658, 'App\\Models\\User', 92, 'hydra-api-token', 'bbf5ebb2eabce16eddce8785f9638586c21f5400d8c9009e7e53a582d6963e71', '[\"user\"]', '2023-11-19 04:55:18', '2023-11-19 04:11:12', '2023-11-19 04:55:18'),
(659, 'App\\Models\\User', 91, 'hydra-api-token', '9612d7d025ae7557d3808b5f675d9c35cb486c2d4ffafd7e2cda08179a1528de', '[\"user\"]', '2023-11-19 04:53:36', '2023-11-19 04:11:25', '2023-11-19 04:53:36'),
(660, 'App\\Models\\User', 86, 'hydra-api-token', 'c04a99ff4160c9831ff295e9caae0b43a8b202f016776acfbc9a73469c3e2567', '[\"admin\"]', '2023-11-19 04:42:34', '2023-11-19 04:12:32', '2023-11-19 04:42:34'),
(661, 'App\\Models\\User', 95, 'hydra-api-token', 'c7c1648414241e8be8b29c7842db569343044b53768c5e97899ce41fceec5768', '[\"user\"]', '2023-11-19 04:14:05', '2023-11-19 04:12:56', '2023-11-19 04:14:05'),
(662, 'App\\Models\\User', 91, 'hydra-api-token', '5f9d1bf082d5642a2806a449abec52fc4d18dfeb75523ce9ddcfd91f061bac99', '[\"user\"]', '2023-11-19 04:33:11', '2023-11-19 04:14:23', '2023-11-19 04:33:11'),
(663, 'App\\Models\\User', 92, 'hydra-api-token', '961a34b16bd3cafa766df8a952cd260646a3a26215ce4cfd1cd6ca5340cf7dfa', '[\"user\"]', '2023-11-19 04:53:35', '2023-11-19 04:27:26', '2023-11-19 04:53:35'),
(664, 'App\\Models\\User', 86, 'hydra-api-token', '1d7f7e7a209ea6608009c5a127354b39576ebd7d83855718c105af9e8d1d0f2c', '[\"admin\"]', '2023-11-19 06:41:25', '2023-11-19 04:38:38', '2023-11-19 06:41:25'),
(665, 'App\\Models\\User', 92, 'hydra-api-token', 'afce03fa6e5765539ff18a6ae5111c7631a38a3d1bdc8c5bfdbf46279c02e54f', '[\"user\"]', '2023-11-19 08:00:59', '2023-11-19 04:40:59', '2023-11-19 08:00:59'),
(666, 'App\\Models\\User', 91, 'hydra-api-token', '9d90a6daec0ffd52c5c1c18b7e300ce42991540efde87f84ca96f63a6101bc62', '[\"user\"]', '2023-11-19 09:15:22', '2023-11-19 04:41:57', '2023-11-19 09:15:22'),
(667, 'App\\Models\\User', 91, 'hydra-api-token', '6f6a91c3b65c76408418645a802c88aa0257e987cd805b12124ab5a44f2d692d', '[\"user\"]', '2023-11-19 05:48:54', '2023-11-19 04:51:18', '2023-11-19 05:48:54'),
(668, 'App\\Models\\User', 92, 'hydra-api-token', '7b4b9240d82a5e98e5d3d679cebc86546afdbf85e8128d4f39fad6f790a5359f', '[\"user\"]', '2023-11-19 05:19:35', '2023-11-19 04:55:59', '2023-11-19 05:19:35'),
(669, 'App\\Models\\User', 91, 'hydra-api-token', '5f6998601bae8be7b744d1b70a0c3d2819591dcbb528f9c1e1404969d3119ac5', '[\"user\"]', '2023-11-19 05:16:33', '2023-11-19 04:59:51', '2023-11-19 05:16:33'),
(670, 'App\\Models\\User', 92, 'hydra-api-token', '47d678aeedad2c67a0f7eb5694cec7d8a52b6521c5485352ad7929d3e58a7107', '[\"user\"]', '2023-11-19 08:00:26', '2023-11-19 05:46:07', '2023-11-19 08:00:26'),
(671, 'App\\Models\\User', 92, 'hydra-api-token', '12f7e04c487c487ba5549e06858fec8f115cc7b9038d536b5b771ee6c9906fb8', '[\"user\"]', '2023-11-19 06:43:21', '2023-11-19 06:33:03', '2023-11-19 06:43:21'),
(672, 'App\\Models\\User', 92, 'hydra-api-token', '20bc5145c47bc542d986750a85921be72417c0eb077907e8a81a6d14eee33ad4', '[\"user\"]', '2023-11-19 06:48:27', '2023-11-19 06:44:16', '2023-11-19 06:48:27'),
(673, 'App\\Models\\User', 86, 'hydra-api-token', 'be72d8e43435cbe6354eb170517059dded8b5cbb2ae9ceef4c82b32f80f9275f', '[\"admin\"]', '2023-11-19 09:07:12', '2023-11-19 07:24:44', '2023-11-19 09:07:12'),
(674, 'App\\Models\\User', 86, 'hydra-api-token', 'cdd565fa90b818ebf925c83788734240d79ae186831f548bf70d55e9bbd7256b', '[\"admin\"]', '2023-11-19 09:31:08', '2023-11-19 09:18:32', '2023-11-19 09:31:08'),
(675, 'App\\Models\\User', 86, 'hydra-api-token', '4c668e7a04f9463b5a0c53cf3fdb324d2fd38be8d38fff780c37d92ba5761f29', '[\"admin\"]', '2023-11-19 09:47:39', '2023-11-19 09:38:29', '2023-11-19 09:47:39'),
(676, 'App\\Models\\User', 86, 'hydra-api-token', '8b9bc672ba910f5f3a8cac8a09845a4df64752c849661e6c17dff0dd454a7607', '[\"admin\"]', '2023-11-19 09:48:46', '2023-11-19 09:48:17', '2023-11-19 09:48:46'),
(677, 'App\\Models\\User', 86, 'hydra-api-token', '0a1c0df7924f9a75a1a594757ba6ae79dabafadab9546e89d8a944baedacbbca', '[\"admin\"]', '2023-11-19 12:06:26', '2023-11-19 09:53:55', '2023-11-19 12:06:26'),
(678, 'App\\Models\\User', 86, 'hydra-api-token', '678e55761684244ff163ccb10fd4f89880182944a2c6d94f49d2bc4681cc662c', '[\"admin\"]', '2023-11-19 10:42:47', '2023-11-19 10:26:55', '2023-11-19 10:42:47'),
(679, 'App\\Models\\User', 91, 'hydra-api-token', 'ed8f91373520fb3584869fdc8fd8c7c09db1ec05e58ac71548e22c716794aa07', '[\"user\"]', '2023-11-19 12:06:14', '2023-11-19 10:41:16', '2023-11-19 12:06:14'),
(680, 'App\\Models\\User', 92, 'hydra-api-token', '3f92256d4e6d923860e74eb222ad839e476f7fde6ed4fa23991d7f1d21720aa3', '[\"user\"]', '2023-11-19 15:26:57', '2023-11-19 12:57:06', '2023-11-19 15:26:57'),
(681, 'App\\Models\\User', 91, 'hydra-api-token', 'f29761828bd15dad9c013ae6c631135a2ef935d248f90e589ba1670496b41665', '[\"user\"]', '2023-11-19 15:01:26', '2023-11-19 12:57:19', '2023-11-19 15:01:26'),
(682, 'App\\Models\\User', 86, 'hydra-api-token', '28fb84c8967c9d6b2a10ec68fbcde9cb7566960d7e2cdc1c43ed6c6b8354f736', '[\"admin\"]', '2023-11-19 15:15:31', '2023-11-19 15:10:32', '2023-11-19 15:15:31'),
(683, 'App\\Models\\User', 86, 'hydra-api-token', 'be354db8bd23c02bd234cbf41fbd2ea47dac579186a835ece461a3925718cf6b', '[\"admin\"]', '2023-11-19 15:22:59', '2023-11-19 15:16:08', '2023-11-19 15:22:59'),
(684, 'App\\Models\\User', 92, 'hydra-api-token', 'fe8bf0268ed510471dd65422c08d1f7928adb7bcfaf5d4c680a385e2ee6775a4', '[\"user\"]', '2023-11-19 15:32:28', '2023-11-19 15:25:32', '2023-11-19 15:32:28'),
(685, 'App\\Models\\User', 91, 'hydra-api-token', 'af20feba27136aa32074aecdd383d5c0c61c934f7cc537114f6076ee30904a25', '[\"user\"]', '2023-11-19 17:09:54', '2023-11-19 15:34:18', '2023-11-19 17:09:54'),
(686, 'App\\Models\\User', 82, 'hydra-api-token', '3ace138416f84f83f58637a45b6314f44f06c922bff788df09687e2e0dd74a40', '[\"user\"]', '2023-11-19 16:14:23', '2023-11-19 15:39:20', '2023-11-19 16:14:23'),
(687, 'App\\Models\\User', 95, 'hydra-api-token', '4a16e19134f1b4fec8f4d0ca4b479d8536cd0c6dead96bf3a825e758fe1e6e58', '[\"user\"]', '2023-11-20 01:57:01', '2023-11-20 01:53:18', '2023-11-20 01:57:01'),
(688, 'App\\Models\\User', 95, 'hydra-api-token', '2b549ba4bc2341f5ad0eb7ca5ef50881361d6f3e9eab8b1a3a279563dfbcea58', '[\"user\"]', '2023-11-20 01:58:42', '2023-11-20 01:58:40', '2023-11-20 01:58:42'),
(689, 'App\\Models\\User', 96, 'hydra-api-token', '4826d6d65a9beccf81dd6b51dab693cd659e5e5e764f972ea0da827d93d5842b', '[\"user\"]', '2023-11-20 02:42:02', '2023-11-20 02:00:53', '2023-11-20 02:42:02'),
(690, 'App\\Models\\User', 95, 'hydra-api-token', 'e63d5c5b623ca73e2fc2e2dc126609fa5c50b1fb41e72f95a8b0133b4698ba9f', '[\"user\"]', '2023-11-20 04:23:06', '2023-11-20 02:42:24', '2023-11-20 04:23:06'),
(691, 'App\\Models\\User', 86, 'hydra-api-token', 'ec5f8e8363a872271e7d9b6cc4c41f7987185d2e48b732ff836547699653a72a', '[\"admin\"]', '2023-11-20 04:48:32', '2023-11-20 04:46:58', '2023-11-20 04:48:32'),
(692, 'App\\Models\\User', 92, 'hydra-api-token', '0d8cb7f11382f788614a20098287fc11a15c25627031e01910b26531cb7167d6', '[\"user\"]', '2023-11-20 12:09:01', '2023-11-20 06:54:55', '2023-11-20 12:09:01'),
(693, 'App\\Models\\User', 83, 'hydra-api-token', '6089b7b7c9da98c2143e0a65b123fc5ce5e24525a18d5750afc5695261481457', '[\"user\"]', '2023-11-20 07:03:39', '2023-11-20 06:55:24', '2023-11-20 07:03:39'),
(694, 'App\\Models\\User', 86, 'hydra-api-token', 'fa2e9788e607cd8c4924e43cab91ddba715acdf218a67e3f12d8c1f20020c3a8', '[\"admin\"]', '2023-11-20 07:03:44', '2023-11-20 07:03:41', '2023-11-20 07:03:44'),
(695, 'App\\Models\\User', 92, 'hydra-api-token', '77198c14e78b6d009a12d350722d4396659438c1af5aa4a3b1a9637becc6fee8', '[\"user\"]', '2023-11-20 07:03:48', '2023-11-20 07:03:47', '2023-11-20 07:03:48'),
(696, 'App\\Models\\User', 91, 'hydra-api-token', '69fdf5df42e141f78eb52ec67fa0f822883a9157ffd96471543a8954c0213107', '[\"user\"]', '2023-11-20 08:41:59', '2023-11-20 07:04:00', '2023-11-20 08:41:59'),
(697, 'App\\Models\\User', 91, 'hydra-api-token', '7f9ab51824c64f73430bd5d8cd64083b0c63f5e9446e7890b19242d98dacc068', '[\"user\"]', '2023-11-20 07:06:43', '2023-11-20 07:05:55', '2023-11-20 07:06:43'),
(698, 'App\\Models\\User', 95, 'hydra-api-token', 'a67a624f8cdb5dbe6229e08d622c47b62656741826cc81c28826227f39297a03', '[\"user\"]', '2023-11-20 10:06:24', '2023-11-20 10:03:59', '2023-11-20 10:06:24'),
(699, 'App\\Models\\User', 96, 'hydra-api-token', 'ace82254b93f05861bbf5dc1507b8ac36b859a503e6409f3552aaa60ad699342', '[\"user\"]', '2023-11-20 11:22:13', '2023-11-20 10:07:14', '2023-11-20 11:22:13'),
(700, 'App\\Models\\User', 96, 'hydra-api-token', '64c7c077a2c8ea9558ecf6f481d29c7cff984a991e3142214fa337a562c93bec', '[\"user\"]', '2023-11-20 11:50:09', '2023-11-20 11:50:07', '2023-11-20 11:50:09'),
(701, 'App\\Models\\User', 89, 'hydra-api-token', '639b19fa7eb9f89292b17ba295eee0b0a61781dc8b2a1720e7829308399cc5e5', '[\"user\"]', '2023-11-20 12:09:08', '2023-11-20 12:09:07', '2023-11-20 12:09:08'),
(702, 'App\\Models\\User', 90, 'hydra-api-token', 'e0ed47a5188350007d6ab2c4dac8faff2bee3f255a479f31950b8caa0e44629b', '[\"user\"]', '2023-11-20 12:59:46', '2023-11-20 12:09:24', '2023-11-20 12:59:46'),
(703, 'App\\Models\\User', 90, 'hydra-api-token', '470b754837735b1444f04559494fe2dbf6bcf25d6d87e760fd3dfdf2dfc53810', '[\"user\"]', '2023-11-20 12:14:41', '2023-11-20 12:14:31', '2023-11-20 12:14:41'),
(704, 'App\\Models\\User', 90, 'hydra-api-token', '1ef4e42017b61cbe962bfe36db69b138da790d30259817038346ec0577432bec', '[\"user\"]', '2023-11-20 12:27:56', '2023-11-20 12:27:37', '2023-11-20 12:27:56'),
(705, 'App\\Models\\User', 96, 'hydra-api-token', '3513fdd6443554678126fc343d8ae9d0a50d170d74e6c9d1f1183ab5c8c91305', '[\"user\"]', '2023-11-20 13:00:59', '2023-11-20 12:41:19', '2023-11-20 13:00:59'),
(706, 'App\\Models\\User', 96, 'hydra-api-token', '4bc75423ab144fdd09cf6559ac887402957e33f01f6108a0c94c3afa3a5fe493', '[\"user\"]', '2023-11-20 17:20:44', '2023-11-20 14:13:21', '2023-11-20 17:20:44'),
(707, 'App\\Models\\User', 82, 'hydra-api-token', 'ae6f261cbe2838403a4b8d47863c681708a825fcd56f8c127bf20568cdcccffc', '[\"user\"]', '2023-11-21 04:41:30', '2023-11-21 04:37:30', '2023-11-21 04:41:30'),
(708, 'App\\Models\\User', 82, 'hydra-api-token', 'e8eea40e86c606e3c4a2facf22cb669ef7226af0444f47ecfc6340c52d49799f', '[\"user\"]', '2023-11-21 06:14:04', '2023-11-21 04:47:29', '2023-11-21 06:14:04'),
(709, 'App\\Models\\User', 89, 'hydra-api-token', '96141cdb72eba186edca2ce948cbf5ed922ab628f5ef7feb0dd60da2b4f21461', '[\"user\"]', '2023-11-21 12:07:50', '2023-11-21 06:42:06', '2023-11-21 12:07:50'),
(710, 'App\\Models\\User', 90, 'hydra-api-token', 'f5ce7e1371720d67b6f5b0ea4ca19918a83470d1c4fbba2538fd1ad90942c1cf', '[\"user\"]', '2023-11-21 12:40:04', '2023-11-21 06:44:44', '2023-11-21 12:40:04'),
(711, 'App\\Models\\User', 90, 'hydra-api-token', '8c843b216dcec5a33d7be5cd89a2305cdd38074a9fe7d2d21a6faca594257858', '[\"user\"]', '2023-11-21 06:55:49', '2023-11-21 06:49:39', '2023-11-21 06:55:49'),
(712, 'App\\Models\\User', 89, 'hydra-api-token', '40892571e316d2970d3325fb53a4c60e142eab30f5f02893a3bc8f23b3fec188', '[\"user\"]', '2023-11-21 07:28:31', '2023-11-21 06:55:50', '2023-11-21 07:28:31'),
(713, 'App\\Models\\User', 90, 'hydra-api-token', 'a9dd9667966da1f0029a7268ad403e0d02bbf6e7eb40cc72c431506838cac128', '[\"user\"]', '2023-11-21 07:44:29', '2023-11-21 07:42:45', '2023-11-21 07:44:29'),
(714, 'App\\Models\\User', 92, 'hydra-api-token', 'e6f14a789544faa1f9f92aa468a8c851614c4482527a91df01e1c22ae971ccd4', '[\"user\"]', '2023-11-21 09:07:48', '2023-11-21 09:07:35', '2023-11-21 09:07:48'),
(715, 'App\\Models\\User', 96, 'hydra-api-token', '241f24eeb97545295c4ab494428ec97150ad0f9ef4f9b70ef7cfd2fd410e75a2', '[\"user\"]', '2023-11-21 17:20:47', '2023-11-21 17:17:09', '2023-11-21 17:20:47'),
(716, 'App\\Models\\User', 95, 'hydra-api-token', 'a4150c4fda688f1c2475f88599a56ab9b1f2279b2b77a443883140683b9b1043', '[\"user\"]', '2023-11-21 17:23:14', '2023-11-21 17:21:21', '2023-11-21 17:23:14'),
(717, 'App\\Models\\User', 96, 'hydra-api-token', '86bd69e26d6068b11ae35c0bdd78e56d1f49c3742e07a3839cf28543b4749b62', '[\"user\"]', '2023-11-21 18:14:49', '2023-11-21 17:25:09', '2023-11-21 18:14:49'),
(718, 'App\\Models\\User', 82, 'hydra-api-token', 'eda1213feb49ab2abb4061625a3bf19b2c0d9257134b31ca1ee5d554b12bf3aa', '[\"user\"]', '2023-11-22 05:55:55', '2023-11-22 05:55:36', '2023-11-22 05:55:55'),
(719, 'App\\Models\\User', 96, 'hydra-api-token', 'a9132229e4b9183e9c84d275b7ba39d6bf94ffd8852bca397962b24d39996288', '[\"user\"]', '2023-11-22 14:45:12', '2023-11-22 14:42:47', '2023-11-22 14:45:12'),
(720, 'App\\Models\\User', 96, 'hydra-api-token', 'dc2f6408e73a43d6021af210e608277d89352dd58bf270f0574b66aba0fa14b0', '[\"user\"]', '2023-11-22 17:11:20', '2023-11-22 17:08:05', '2023-11-22 17:11:20'),
(721, 'App\\Models\\User', 82, 'hydra-api-token', '7b6f7a1129c22e7cf3ed27fc435a443b5044b4034c07c317d9a740206d025239', '[\"user\"]', '2023-11-22 17:40:54', '2023-11-22 17:16:01', '2023-11-22 17:40:54'),
(722, 'App\\Models\\User', 92, 'hydra-api-token', '7ede55f1d8024e47710ac06d5fbffa5d3bfd7644425dcca1114dc66eeadea67e', '[\"user\"]', '2023-11-23 04:34:06', '2023-11-23 04:33:49', '2023-11-23 04:34:06'),
(723, 'App\\Models\\User', 89, 'hydra-api-token', 'c692f73e62c72904fe4cf02ab7b89adfdff02b10cf414c129384018570dd6e57', '[\"user\"]', '2023-11-23 04:35:20', '2023-11-23 04:34:32', '2023-11-23 04:35:20'),
(724, 'App\\Models\\User', 82, 'hydra-api-token', '5ae8157513dfebc7844071de9a8feabf1e2367fdfe718f27f75ce1d47cb14bd3', '[\"user\"]', '2023-11-23 04:45:24', '2023-11-23 04:45:15', '2023-11-23 04:45:24'),
(725, 'App\\Models\\User', 86, 'hydra-api-token', '871f2ee5b5515d7610b9b24570189153c1a33cc071d31298538f5774fe4cc0f1', '[\"admin\"]', '2023-11-23 04:56:25', '2023-11-23 04:56:24', '2023-11-23 04:56:25'),
(726, 'App\\Models\\User', 82, 'hydra-api-token', '7429e522f6acb26997fbcacae81d3dce35a287e47e250ff88519aea13f2c64ea', '[\"user\"]', '2023-11-23 05:42:35', '2023-11-23 04:56:40', '2023-11-23 05:42:35'),
(727, 'App\\Models\\User', 86, 'hydra-api-token', '78fe6e799ad0af5be2ac4d584c7f6e7d0eb964bbc7886cda6048e1bf0cf4c8ca', '[\"admin\"]', '2023-11-23 07:21:21', '2023-11-23 07:21:20', '2023-11-23 07:21:21'),
(728, 'App\\Models\\User', 96, 'hydra-api-token', 'a6c6ed8b1f318284b7b4b5a305040062c9c126b1335f01aceeaf377f32a64dc9', '[\"user\"]', '2023-11-23 09:26:32', '2023-11-23 08:46:00', '2023-11-23 09:26:32'),
(729, 'App\\Models\\User', 96, 'hydra-api-token', 'd6a1f12d636f11fe5a8c9a66a9f89383a65b9768b39b4046e94d5d9a16fbe9ff', '[\"user\"]', '2023-11-23 11:52:00', '2023-11-23 08:57:55', '2023-11-23 11:52:00'),
(730, 'App\\Models\\User', 90, 'hydra-api-token', '182c5d7ac619b2795516154dd78a750bc7ee84c13f93225360d44b92451fed36', '[\"user\"]', '2023-11-23 10:04:34', '2023-11-23 10:01:53', '2023-11-23 10:04:34'),
(731, 'App\\Models\\User', 87, 'hydra-api-token', 'bbadbed0949330ece392332f982b16796510221efdbde35402ea97b125554640', '[\"admin\"]', '2023-11-23 10:13:24', '2023-11-23 10:09:19', '2023-11-23 10:13:24'),
(732, 'App\\Models\\User', 90, 'hydra-api-token', 'a125b4de8704211397a66ec26296a182c257fb0b028b8dcfc4b24e0e736c9d95', '[\"user\"]', '2023-11-23 10:55:03', '2023-11-23 10:10:41', '2023-11-23 10:55:03'),
(733, 'App\\Models\\User', 96, 'hydra-api-token', '4a8a2a8f5228a145eeefebe2b391b2fb38db7793438ba0a16724ef73925bee26', '[\"user\"]', '2023-11-23 11:44:37', '2023-11-23 11:42:16', '2023-11-23 11:44:37'),
(734, 'App\\Models\\User', 95, 'hydra-api-token', '23dabd7001444296953dab6d06fd8d1be613699a3ff6512902e817b260437ac9', '[\"user\"]', '2023-11-23 12:08:40', '2023-11-23 12:07:00', '2023-11-23 12:08:40'),
(735, 'App\\Models\\User', 96, 'hydra-api-token', 'eba1d3e5bae2bca0c3561af26efafbf9f205d75a967e1bb5281a27708666fc32', '[\"user\"]', '2023-11-23 12:08:32', '2023-11-23 12:08:23', '2023-11-23 12:08:32'),
(736, 'App\\Models\\User', 87, 'hydra-api-token', '655f4ec93d75721738cdbc6d33fec9540cd4487bccc36253ca9a316babdedf94', '[\"admin\"]', '2023-11-23 13:27:43', '2023-11-23 12:51:53', '2023-11-23 13:27:43'),
(737, 'App\\Models\\User', 90, 'hydra-api-token', '39c187d6496b0b69db9c4f288506aa5040710afec0c95d1b62a8963eb1df590b', '[\"user\"]', '2023-11-23 14:31:54', '2023-11-23 14:18:38', '2023-11-23 14:31:54'),
(738, 'App\\Models\\User', 96, 'hydra-api-token', '115bdfa119c64ad16cd815d32c5007bcbc01f1efdb7cee395c2455124a810e04', '[\"user\"]', '2023-11-23 19:49:23', '2023-11-23 19:16:25', '2023-11-23 19:49:23'),
(739, 'App\\Models\\User', 95, 'hydra-api-token', '02e1370bee7a9d5611b0c8ccc043a4b7d812cc8ba2efca5db43f2a1da3ae237f', '[\"user\"]', '2023-11-23 22:07:10', '2023-11-23 19:16:39', '2023-11-23 22:07:10'),
(740, 'App\\Models\\User', 96, 'hydra-api-token', '20474c6da7fa2f0cf6872cdf70a644cf792783e2f28af0ba3d5d407c150a2121', '[\"user\"]', '2023-11-23 21:00:47', '2023-11-23 19:49:36', '2023-11-23 21:00:47'),
(741, 'App\\Models\\User', 96, 'hydra-api-token', '5727bbc01e0ef5d18963660b9a9148740d03cdd3a624a16ee8f9101bd0629f35', '[\"user\"]', '2023-11-24 03:28:45', '2023-11-24 03:24:35', '2023-11-24 03:28:45'),
(742, 'App\\Models\\User', 95, 'hydra-api-token', 'c3cdf473bb6a7ada7579b15b70909622fedcf135fefdb80ce5391c42302115cf', '[\"user\"]', '2023-11-24 03:38:15', '2023-11-24 03:36:16', '2023-11-24 03:38:15'),
(743, 'App\\Models\\User', 90, 'hydra-api-token', '973083661c6bf3e7cb87f6b8e1aec22d426e95de98f67a6756adfd48edb7903b', '[\"user\"]', '2023-11-24 05:56:48', '2023-11-24 05:49:51', '2023-11-24 05:56:48'),
(744, 'App\\Models\\User', 89, 'hydra-api-token', '34e5fed8ae284d709a1269d1af23adc8bc68b02e9ac742986a34b9311d2ce7d3', '[\"user\"]', '2023-11-24 05:54:50', '2023-11-24 05:51:42', '2023-11-24 05:54:50'),
(745, 'App\\Models\\User', 90, 'hydra-api-token', 'a9010565c2a25f99f844350ed0d1b6bba57bdcc2336d4cf0daa680fb46709b45', '[\"user\"]', '2023-11-24 15:21:05', '2023-11-24 14:44:53', '2023-11-24 15:21:05'),
(746, 'App\\Models\\User', 96, 'hydra-api-token', '7d68e013aec04c049ef4f852472c0b892da9126f6e3b1de09af502002314f371', '[\"user\"]', '2023-11-24 17:44:38', '2023-11-24 17:30:00', '2023-11-24 17:44:38'),
(747, 'App\\Models\\User', 95, 'hydra-api-token', '9e34db3a559b90251dc4d7fa08dba5d85b887734b6f4fbc201cd75253f2d987e', '[\"user\"]', '2023-11-24 17:44:54', '2023-11-24 17:30:17', '2023-11-24 17:44:54'),
(748, 'App\\Models\\User', 96, 'hydra-api-token', '670e4401f627f87c959619b4ecc001a55ff9685a919c658d0ee3e7cc02c1a0e5', '[\"user\"]', '2023-11-25 04:35:06', '2023-11-25 04:24:03', '2023-11-25 04:35:06'),
(749, 'App\\Models\\User', 86, 'hydra-api-token', 'c07c4a9a2fb320e44f575ad207b7b34991cdcd4b25c5fde2e8a63df01c2157e3', '[\"admin\"]', '2023-11-25 04:50:24', '2023-11-25 04:49:20', '2023-11-25 04:50:24'),
(750, 'App\\Models\\User', 91, 'hydra-api-token', '68aab11ab6baff659478848924d4633528945af4852f57bca023b11f1695d126', '[\"user\"]', '2023-11-25 05:11:30', '2023-11-25 05:07:29', '2023-11-25 05:11:30'),
(751, 'App\\Models\\User', 96, 'hydra-api-token', '71dc5f7ff277cdb8fa60331e78f069e6a7bfbc89f50279158fcf0d0fb13f98ce', '[\"user\"]', '2023-11-25 05:17:29', '2023-11-25 05:16:29', '2023-11-25 05:17:29'),
(752, 'App\\Models\\User', 83, 'hydra-api-token', 'de3222d0152eeac0429d1e5e45b56ad79006492a885e11dace64714ca204576f', '[\"user\"]', '2023-11-27 09:34:38', '2023-11-25 05:47:26', '2023-11-27 09:34:38'),
(753, 'App\\Models\\User', 95, 'hydra-api-token', '11c0ea45af402c6c50302d3deea273cef72baef5ccea57fb4151b3f9ad581778', '[\"user\"]', '2023-11-25 07:44:58', '2023-11-25 05:51:21', '2023-11-25 07:44:58'),
(754, 'App\\Models\\User', 96, 'hydra-api-token', '5ab8eca9df921e6c31e17fba6b3109e7b34dd55f3200c12265a382ea8385030b', '[\"user\"]', '2023-11-25 06:09:41', '2023-11-25 05:51:41', '2023-11-25 06:09:41'),
(755, 'App\\Models\\User', 96, 'hydra-api-token', '8bfc8e59871da1d6f0bd84bed39558ed0a82cbae7e9dbb6f80b9976de56c0709', '[\"user\"]', '2023-11-25 06:05:13', '2023-11-25 06:04:40', '2023-11-25 06:05:13'),
(756, 'App\\Models\\User', 89, 'hydra-api-token', 'aacfd21e5a5daa6faa153a3607fad048e611298b44853bee6c763af7a90c2ed0', '[\"user\"]', '2023-11-25 10:32:51', '2023-11-25 06:06:39', '2023-11-25 10:32:51'),
(757, 'App\\Models\\User', 96, 'hydra-api-token', 'db0a88ef2564dc9eaa5df0ecbcbc533bda4e3888986df88e53d01a9f02ce8f19', '[\"user\"]', '2023-11-25 06:09:53', '2023-11-25 06:09:44', '2023-11-25 06:09:53'),
(758, 'App\\Models\\User', 89, 'hydra-api-token', '0f3329c887f5d8c5cde0ee9abea61a21a614b7ceddab108d35b78ab456fb4f54', '[\"user\"]', '2023-11-25 07:44:47', '2023-11-25 06:11:04', '2023-11-25 07:44:47'),
(759, 'App\\Models\\User', 89, 'hydra-api-token', '7a5d656a6fc030a635a3eb4e3b5f5ee6acea411b89f57560d0f944d00eb190f3', '[\"user\"]', '2023-11-25 07:49:38', '2023-11-25 07:45:20', '2023-11-25 07:49:38'),
(760, 'App\\Models\\User', 96, 'hydra-api-token', 'e60112b5b467147979211b0035c3ef111f64182416b03180fc4774bd632e942c', '[\"user\"]', '2023-11-25 11:40:59', '2023-11-25 07:56:51', '2023-11-25 11:40:59'),
(761, 'App\\Models\\User', 96, 'hydra-api-token', '00f384128536037cef3a59b6a079ff56fd99dafff3d7e2bef7c704025bb573fc', '[\"user\"]', '2023-11-25 09:41:44', '2023-11-25 09:36:57', '2023-11-25 09:41:44'),
(762, 'App\\Models\\User', 96, 'hydra-api-token', '850eb5fc685319b7cd33485d55aed90f85d6e556f9231ea8cd21bca2aaea81ae', '[\"user\"]', '2023-11-25 10:42:33', '2023-11-25 09:44:15', '2023-11-25 10:42:33'),
(763, 'App\\Models\\User', 96, 'hydra-api-token', '5d9cfd1a62fd4d13613a1d7f4ed47a96a00f44de67bad3b9e95c4861912c396f', '[\"user\"]', '2023-11-25 11:13:47', '2023-11-25 10:53:38', '2023-11-25 11:13:47'),
(764, 'App\\Models\\User', 96, 'hydra-api-token', 'bb931f2846ea9d54487ff18e60bd84a8992958ab2c807472f4c60bed40e5a238', '[\"user\"]', '2023-11-25 11:45:30', '2023-11-25 11:05:23', '2023-11-25 11:45:30'),
(765, 'App\\Models\\User', 89, 'hydra-api-token', '307564e1fb9207b7f65ac33482b2e6a4fea570137a727431a8246522768bbf0e', '[\"user\"]', '2023-11-25 12:47:58', '2023-11-25 11:45:55', '2023-11-25 12:47:58'),
(766, 'App\\Models\\User', 90, 'hydra-api-token', 'd766f4daabe7664a2955170898a1980b5acdc29181245eedf2cd216acf9f4c79', '[\"user\"]', '2023-11-25 12:03:00', '2023-11-25 11:47:48', '2023-11-25 12:03:00'),
(767, 'App\\Models\\User', 90, 'hydra-api-token', 'c4aad33acc1624136f241b059528e1c0e38e3ab4ac235519140a23c8844c2904', '[\"user\"]', '2023-11-25 12:06:24', '2023-11-25 11:49:47', '2023-11-25 12:06:24'),
(768, 'App\\Models\\User', 89, 'hydra-api-token', '6067dbaefee5a7db6ee0ade65fe7554a3dc82aff13df43fe24b693dc742005b2', '[\"user\"]', '2023-11-25 12:48:15', '2023-11-25 11:54:58', '2023-11-25 12:48:15'),
(769, 'App\\Models\\User', 96, 'hydra-api-token', '13407adba7e07b5fa2b0cee8d77039b117a32d67b8bc8b824c2219d9b82d1489', '[\"user\"]', '2023-11-25 12:08:28', '2023-11-25 12:05:27', '2023-11-25 12:08:28'),
(770, 'App\\Models\\User', 89, 'hydra-api-token', 'bc0d8a51b41131f84815791d50e04c0f504a4f3b55a78c99cb486987eeba1469', '[\"user\"]', '2023-11-25 12:53:22', '2023-11-25 12:08:52', '2023-11-25 12:53:22'),
(771, 'App\\Models\\User', 86, 'hydra-api-token', 'a2136ef9f658e1b26770add967833d2037e9c962520d9846d7a0d0b46a9c2432', '[\"admin\"]', '2023-11-25 12:25:37', '2023-11-25 12:25:06', '2023-11-25 12:25:37'),
(772, 'App\\Models\\User', 89, 'hydra-api-token', 'd31c4e8e7f78d8758db8182e5cc2735aa749c4dd9aea15f98c334b1ad7bd522a', '[\"user\"]', '2023-11-25 12:50:57', '2023-11-25 12:33:17', '2023-11-25 12:50:57'),
(773, 'App\\Models\\User', 90, 'hydra-api-token', 'c8fefc0625dd1f542d8243ce8f00b5b23edb0f33e26df89f4324768510055d0e', '[\"user\"]', '2023-11-26 06:32:21', '2023-11-26 06:32:20', '2023-11-26 06:32:21'),
(774, 'App\\Models\\User', 95, 'hydra-api-token', '16849e9e3500aad0c9d3b3ca6b56ed993945fb614305e332b12c1143c236a8ac', '[\"user\"]', '2023-11-26 11:00:55', '2023-11-26 06:32:42', '2023-11-26 11:00:55'),
(775, 'App\\Models\\User', 96, 'hydra-api-token', 'bf194e843ae8abd7a190a653343a8bcac45ea1a24385229d9881f96c77947f71', '[\"user\"]', '2023-11-26 07:47:03', '2023-11-26 06:32:58', '2023-11-26 07:47:03'),
(776, 'App\\Models\\User', 92, 'hydra-api-token', '0490482ed69d47010018c440be7c72fbdcf227cd9d679d3fd3499242dfdc5b9c', '[\"user\"]', '2023-11-26 07:14:54', '2023-11-26 07:09:54', '2023-11-26 07:14:54'),
(777, 'App\\Models\\User', 82, 'hydra-api-token', 'e49a145669aea662174e0e44311602874bc5119ddb2bcf0e928ea60e20beaee4', '[\"user\"]', '2023-11-26 07:16:20', '2023-11-26 07:16:07', '2023-11-26 07:16:20'),
(778, 'App\\Models\\User', 89, 'hydra-api-token', 'eca3a2896a5f2f28ecde1d635efbb8fa649c69a7e5b0d8103e386cab824dae29', '[\"user\"]', '2023-11-26 08:38:50', '2023-11-26 07:18:10', '2023-11-26 08:38:50'),
(779, 'App\\Models\\User', 89, 'hydra-api-token', 'dbe94302995cfb921349fb583becaf672c49381c713966f8ed8054640ec0e907', '[\"user\"]', '2023-11-26 07:43:20', '2023-11-26 07:31:07', '2023-11-26 07:43:20'),
(780, 'App\\Models\\User', 96, 'hydra-api-token', 'bfa6031c8f4c250b30fce66be6408504b4aaa0095155a3974852277c80778035', '[\"user\"]', '2023-11-26 11:01:45', '2023-11-26 08:57:23', '2023-11-26 11:01:45'),
(781, 'App\\Models\\User', 89, 'hydra-api-token', '927f5fb7cbc6db5d66cf0d5621e2d215d6b1e6cbc9fd602ef684261711a02cb2', '[\"user\"]', '2023-11-26 09:32:24', '2023-11-26 09:32:23', '2023-11-26 09:32:24'),
(782, 'App\\Models\\User', 83, 'hydra-api-token', 'ced26e161ec565fba530761338edaa18d67794db64b3ee189b48eac329bf01ac', '[\"user\"]', '2023-11-26 10:50:48', '2023-11-26 10:35:41', '2023-11-26 10:50:48'),
(783, 'App\\Models\\User', 83, 'hydra-api-token', 'cf00a05405f7938b8d592b5a32a0adefd3e6be711a8d21e5a1ececbc1852262c', '[\"user\"]', '2023-11-26 11:34:54', '2023-11-26 11:01:11', '2023-11-26 11:34:54'),
(784, 'App\\Models\\User', 82, 'hydra-api-token', '172503124018d8d6d1acba1b4c8895a4a0375d856671715bd041a1d648bd3aa8', '[\"user\"]', '2023-11-26 11:09:26', '2023-11-26 11:02:02', '2023-11-26 11:09:26'),
(785, 'App\\Models\\User', 82, 'hydra-api-token', 'bb3bbaa9666e309a5568a66e30b0aa65162d259d9b9089e43bb170998d110e15', '[\"user\"]', '2023-11-26 11:10:14', '2023-11-26 11:09:46', '2023-11-26 11:10:14'),
(786, 'App\\Models\\User', 83, 'hydra-api-token', 'b1179be813c582af6e405c317f3331230666f26af08f68e7fa7454fedb0a7b87', '[\"user\"]', '2023-11-26 11:41:03', '2023-11-26 11:12:53', '2023-11-26 11:41:03'),
(787, 'App\\Models\\User', 83, 'hydra-api-token', '88b6ba2c5629c44cb5be5dbf2b484ef181ad91a6cb814b26c2d15f16fd1ceb4e', '[\"user\"]', '2023-11-26 12:00:33', '2023-11-26 11:41:33', '2023-11-26 12:00:33'),
(788, 'App\\Models\\User', 83, 'hydra-api-token', '4c2b66c808153f2c3cced8ec98cf9f553154cba7699f85527f45b5efdf3891e7', '[\"user\"]', '2023-11-26 12:01:16', '2023-11-26 12:00:59', '2023-11-26 12:01:16'),
(789, 'App\\Models\\User', 82, 'hydra-api-token', '34f010a2a29c67d5e318219cd9e801807f2fa30f93075de3d0bfe3aaba5b4ac3', '[\"user\"]', '2023-11-28 04:55:29', '2023-11-26 12:01:35', '2023-11-28 04:55:29'),
(790, 'App\\Models\\User', 82, 'hydra-api-token', '6f1657f9e463c05a0841dd77139a32b5453888f358a11caecb88eb657c3bebde', '[\"user\"]', '2023-11-27 05:08:09', '2023-11-27 05:06:58', '2023-11-27 05:08:09'),
(791, 'App\\Models\\User', 95, 'hydra-api-token', '2dd060f54c56075ad51671f661cfdea784ba98ff634101948da82ac271892473', '[\"user\"]', '2023-11-27 07:52:27', '2023-11-27 07:52:26', '2023-11-27 07:52:27'),
(792, 'App\\Models\\User', 95, 'hydra-api-token', '26bbb258eb67b800f10df203034c11650890627921dba4ed2dd398769467acb0', '[\"user\"]', '2023-11-27 10:28:34', '2023-11-27 07:54:39', '2023-11-27 10:28:34'),
(793, 'App\\Models\\User', 95, 'hydra-api-token', '5f50cb2c8eb63fc975a12766158519475748ab50fe1f24b239173e9f17024d21', '[\"user\"]', '2023-11-27 07:56:55', '2023-11-27 07:56:53', '2023-11-27 07:56:55'),
(794, 'App\\Models\\User', 95, 'hydra-api-token', 'fcad7bd4d11bdb8b31397fff5a5342c4189d0a8f163a25e5af6d371817f592c2', '[\"user\"]', '2023-11-27 09:40:31', '2023-11-27 07:58:47', '2023-11-27 09:40:31');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(795, 'App\\Models\\User', 96, 'hydra-api-token', 'a7bda09270e1758a16cc4890e134d17414e4f6be9e6d13059bbaf96390a07c92', '[\"user\"]', '2023-11-27 08:02:29', '2023-11-27 08:02:17', '2023-11-27 08:02:29'),
(796, 'App\\Models\\User', 89, 'hydra-api-token', 'b16db5f22698050127aa740adf59004b1cce8f800f560d9e9d687671b88510ea', '[\"user\"]', '2023-11-27 10:46:27', '2023-11-27 09:26:29', '2023-11-27 10:46:27'),
(797, 'App\\Models\\User', 83, 'hydra-api-token', '1b416a9c1405d95d5dc4f13bfc5c2b920bee51555c545968507c6af5b3149428', '[\"user\"]', '2023-11-27 09:35:54', '2023-11-27 09:35:53', '2023-11-27 09:35:54'),
(798, 'App\\Models\\User', 96, 'hydra-api-token', '21285dce80adc7a2404357b35bac3e6b51635c15d70bd8dc1f4df4afb22f03cd', '[\"user\"]', '2023-11-27 09:36:24', '2023-11-27 09:36:24', '2023-11-27 09:36:24'),
(799, 'App\\Models\\User', 95, 'hydra-api-token', '0a7c3eabefa74ab5da837b1f8362f4170853630ff5fd55301b35eeea40b7e0ec', '[\"user\"]', '2023-11-27 09:45:23', '2023-11-27 09:38:28', '2023-11-27 09:45:23'),
(800, 'App\\Models\\User', 95, 'hydra-api-token', '717764ba912ece2448215fc2a2dfbaef99699b29114a772480b0514755cda2fc', '[\"user\"]', '2023-11-27 09:39:45', '2023-11-27 09:39:09', '2023-11-27 09:39:45'),
(801, 'App\\Models\\User', 95, 'hydra-api-token', '314cb346bd2ebe94a4d4ec89c23305d1e1da2c84d636bff913c672edfdef2d83', '[\"user\"]', '2023-11-27 09:39:26', '2023-11-27 09:39:26', '2023-11-27 09:39:26'),
(802, 'App\\Models\\User', 95, 'hydra-api-token', 'b17e15c0b8a15e9af98df079abf3c7edd2f880bd03c7f09999243c8b543a1329', '[\"user\"]', '2023-12-07 07:52:15', '2023-11-27 09:40:57', '2023-12-07 07:52:15'),
(803, 'App\\Models\\User', 95, 'hydra-api-token', '31a8b6cf9b4623124cf813ede65cb13df495f6a67943c78b93e0401213e2fc9b', '[\"user\"]', '2023-12-05 05:07:01', '2023-11-27 09:43:47', '2023-12-05 05:07:01'),
(804, 'App\\Models\\User', 96, 'hydra-api-token', 'e425db1ca40b72fced34bc8ac8c5f4b46d6c7c90a43419082b2b282cbed6f197', '[\"user\"]', '2023-11-29 05:09:36', '2023-11-27 09:46:12', '2023-11-29 05:09:36'),
(805, 'App\\Models\\User', 96, 'hydra-api-token', 'ee0592aeac8840311922c107bcb6ddef6e0dd8bbd30a6e264b6353af66bd7457', '[\"user\"]', '2024-02-19 10:35:35', '2023-11-27 09:55:56', '2024-02-19 10:35:35'),
(806, 'App\\Models\\User', 86, 'hydra-api-token', 'c54d02799d407503775074822f1b1a862c82144ce6fdabe5810898e2baf4b725', '[\"admin\"]', '2023-11-27 10:27:39', '2023-11-27 09:58:24', '2023-11-27 10:27:39'),
(807, 'App\\Models\\User', 95, 'hydra-api-token', '16f5f8d439354440f7f40680ca7336477d029e41c13919cdc2d8bb1bc4a8c833', '[\"user\"]', '2023-12-07 09:33:30', '2023-11-27 10:33:14', '2023-12-07 09:33:30'),
(808, 'App\\Models\\User', 95, 'hydra-api-token', '05a14f0ab0725ac8c5ae77d7112cc1afbe8eefb16ae5b98b3fd6a94c10646555', '[\"user\"]', '2023-11-27 11:52:30', '2023-11-27 11:42:18', '2023-11-27 11:52:30'),
(809, 'App\\Models\\User', 95, 'hydra-api-token', '544c06663165e470bf88d2742d0f0765dc98364e97c5aea373a2ea4ae7194414', '[\"user\"]', '2023-11-27 11:52:48', '2023-11-27 11:51:55', '2023-11-27 11:52:48'),
(810, 'App\\Models\\User', 95, 'hydra-api-token', '240b2b0e171dfaa83e7fc426c7970fd7bd349ae40ac10a09d72d4163aa625f77', '[\"user\"]', '2023-11-27 12:42:03', '2023-11-27 11:52:50', '2023-11-27 12:42:03'),
(811, 'App\\Models\\User', 95, 'hydra-api-token', '881be51d8889f48e44a16f912672be8382a3864fc8e721e74378554da7766552', '[\"user\"]', '2023-11-27 12:02:16', '2023-11-27 11:53:56', '2023-11-27 12:02:16'),
(812, 'App\\Models\\User', 95, 'hydra-api-token', '0419b32de18d1041d5bb17bcd2f073f7966459d893b904fec34947ceb7cfe0f3', '[\"user\"]', '2023-11-30 09:15:26', '2023-11-27 12:06:22', '2023-11-30 09:15:26'),
(814, 'App\\Models\\User', 95, 'hydra-api-token', '5837d30948a20358e33ac76934c7a418791e47ac20a348f1ccd84918334aa467', '[\"user\"]', '2023-11-27 12:42:14', '2023-11-27 12:42:08', '2023-11-27 12:42:14'),
(815, 'App\\Models\\User', 95, 'hydra-api-token', '96be04f11206e2218a4e8949619b641d67c5b1c7900a1889239b204ac8aa6d19', '[\"user\"]', '2023-11-27 12:43:15', '2023-11-27 12:42:20', '2023-11-27 12:43:15'),
(816, 'App\\Models\\User', 95, 'hydra-api-token', '890f81a8c2f17cbebb3b2a9bb5330b9875d5fc7d9f7f2a1c177ac86e9768deaa', '[\"user\"]', '2023-11-27 12:47:52', '2023-11-27 12:43:18', '2023-11-27 12:47:52'),
(817, 'App\\Models\\User', 95, 'hydra-api-token', 'd0add74abbffd5f9124126617c7aee961a43fea9d3a61137fc38e18ab7c48f72', '[\"user\"]', '2023-11-27 12:49:03', '2023-11-27 12:47:55', '2023-11-27 12:49:03'),
(818, 'App\\Models\\User', 96, 'hydra-api-token', 'd56ac5fffc9c5e739646cbdfa020629ecb6b670d48f03f77b6216eab9064cb19', '[\"user\"]', '2023-11-27 12:51:25', '2023-11-27 12:49:12', '2023-11-27 12:51:25'),
(819, 'App\\Models\\User', 92, 'hydra-api-token', '69def6e8aeca28070dca4b09f61fb6dd8626b1f122a051c27caa96e3f3932e30', '[\"user\"]', '2023-11-27 12:58:18', '2023-11-27 12:51:41', '2023-11-27 12:58:18'),
(820, 'App\\Models\\User', 96, 'hydra-api-token', '2f03b3723c73242fdde5d38001c26014ccafbc32f88ffc633932bc58b0b751c4', '[\"user\"]', '2023-11-28 12:43:30', '2023-11-28 06:02:01', '2023-11-28 12:43:30'),
(821, 'App\\Models\\User', 95, 'hydra-api-token', 'a2369b07b167ba34371d6c09c49127d949828320d636b81a1a6a83f87bf02f6c', '[\"user\"]', '2023-11-28 17:05:53', '2023-11-28 11:27:23', '2023-11-28 17:05:53'),
(822, 'App\\Models\\User', 90, 'hydra-api-token', 'cd673288ee593981faa67ce7fb8563ee33f2193cfd58c1c43178180ee39c2a3a', '[\"user\"]', '2023-11-29 04:37:24', '2023-11-29 04:30:52', '2023-11-29 04:37:24'),
(823, 'App\\Models\\User', 89, 'hydra-api-token', '42f7e44feafd927099572b6f308e9b217533fac9d1556a4c0ef4b36fa548f973', '[\"user\"]', '2023-11-29 04:45:54', '2023-11-29 04:37:45', '2023-11-29 04:45:54'),
(824, 'App\\Models\\User', 95, 'hydra-api-token', '321240f8147b4b6140563175d897ed72de4e37466444bda84ec597a5e8b3622e', '[\"user\"]', '2023-11-29 05:59:50', '2023-11-29 05:10:17', '2023-11-29 05:59:50'),
(825, 'App\\Models\\User', 96, 'hydra-api-token', 'fcc88015af053b750affd3e95b7c71f9b7bd57c51f43bbff29e234bed4a6a991', '[\"user\"]', '2023-12-07 10:14:43', '2023-11-29 05:13:14', '2023-12-07 10:14:43'),
(826, 'App\\Models\\User', 96, 'hydra-api-token', '4889b3c9a2c8ebc636f1b303f81f404051a425a02571ca559a997b0ffb28e749', '[\"user\"]', '2023-11-29 06:09:48', '2023-11-29 06:00:19', '2023-11-29 06:09:48'),
(827, 'App\\Models\\User', 96, 'hydra-api-token', '5a722ec9140eadb83e780475c2120408d3197cd9123c1b30b6ce90445ac7e667', '[\"user\"]', '2023-11-29 10:14:47', '2023-11-29 06:06:25', '2023-11-29 10:14:47'),
(828, 'App\\Models\\User', 95, 'hydra-api-token', '1541c210fd97d79e39d8c362c58aa86956d335ed4674aea385b7bdd1d4f06f8b', '[\"user\"]', '2023-11-29 10:14:44', '2023-11-29 06:06:41', '2023-11-29 10:14:44'),
(829, 'App\\Models\\User', 95, 'hydra-api-token', 'be9cd1cb4db6c8b2cb22885b14d16ab67958c10f582fe0ea5b1b275198564f49', '[\"user\"]', '2023-12-02 09:18:57', '2023-11-29 06:11:00', '2023-12-02 09:18:57'),
(830, 'App\\Models\\User', 96, 'hydra-api-token', '511cc11d70a478635600619a21b5511365b12e2bc0d1c6ac263187d85c50772f', '[\"user\"]', '2023-11-29 06:24:19', '2023-11-29 06:23:29', '2023-11-29 06:24:19'),
(831, 'App\\Models\\User', 95, 'hydra-api-token', '24049e820b05f3af138bb1610b837337dfbaf4c646495c681ec55a6c7af7ca39', '[\"user\"]', '2023-11-29 06:36:45', '2023-11-29 06:25:54', '2023-11-29 06:36:45'),
(832, 'App\\Models\\User', 96, 'hydra-api-token', '8b073f6a77e6e4460c7b12276be22dda2913eecb99d8c4e27d62017da6dad9bb', '[\"user\"]', '2023-11-29 06:38:22', '2023-11-29 06:37:49', '2023-11-29 06:38:22'),
(833, 'App\\Models\\User', 96, 'hydra-api-token', '60d6d7fe2f8e455eaf153edb5b7cadd90be34fc7ef894f1cd09524b06c4906ca', '[\"user\"]', '2023-11-29 12:19:29', '2023-11-29 06:40:15', '2023-11-29 12:19:29'),
(834, 'App\\Models\\User', 95, 'hydra-api-token', '251e13f0e828a0a8dd3ab6212d513f3eff2f5723900564097f50a5bb0fc4b9cf', '[\"user\"]', '2023-11-29 06:44:29', '2023-11-29 06:44:19', '2023-11-29 06:44:29'),
(835, 'App\\Models\\User', 96, 'hydra-api-token', '53c2ee8b544204ed44d8477aeddd2d976df37d6f53ef03dc04364159f26110bd', '[\"user\"]', '2023-11-29 06:59:02', '2023-11-29 06:49:45', '2023-11-29 06:59:02'),
(836, 'App\\Models\\User', 96, 'hydra-api-token', 'd3ffd16afdff14599d45028afae371ec1c564286a42639f2201e4d423bf42503', '[\"user\"]', '2023-11-29 07:13:46', '2023-11-29 06:52:13', '2023-11-29 07:13:46'),
(837, 'App\\Models\\User', 96, 'hydra-api-token', '024d43f35d4d0b079cd333c12598aeb50c0b7d49b55911c8d19f703766a6a416', '[\"user\"]', '2023-11-29 07:20:58', '2023-11-29 07:10:05', '2023-11-29 07:20:58'),
(838, 'App\\Models\\User', 95, 'hydra-api-token', 'b40f67d737cd0d64b5d1724b678dbf8027cec5f794cbcf2c30be25829a09b781', '[\"user\"]', '2023-11-29 07:22:28', '2023-11-29 07:21:16', '2023-11-29 07:22:28'),
(839, 'App\\Models\\User', 96, 'hydra-api-token', '6cee26c7c33775ed2806e53fd4149b6e2fd3c8dc714d494252b31083640defd5', '[\"user\"]', '2023-11-29 07:23:58', '2023-11-29 07:22:57', '2023-11-29 07:23:58'),
(840, 'App\\Models\\User', 95, 'hydra-api-token', '2f9c3c61fe95ed0c237e800d3c1f7824b64d8da1c06687c1bcf65c6969062050', '[\"user\"]', '2023-11-29 07:24:51', '2023-11-29 07:24:15', '2023-11-29 07:24:51'),
(841, 'App\\Models\\User', 96, 'hydra-api-token', '53dd66633bd5c63b8093b08d7575e39aaf0c332ade6033a4a07953d1ed8eb192', '[\"user\"]', '2023-12-06 08:41:59', '2023-11-29 07:25:22', '2023-12-06 08:41:59'),
(842, 'App\\Models\\User', 96, 'hydra-api-token', '2aba0c1e90e14b3ba65c255e78940ea74d30e0e8bfd37fd4d88620c00dcc0af3', '[\"user\"]', '2023-11-29 12:23:21', '2023-11-29 10:41:58', '2023-11-29 12:23:21'),
(843, 'App\\Models\\User', 96, 'hydra-api-token', '06623d1e61617276270af0b168f73de1d2159a95e18e4454aa8c410b48003ab7', '[\"user\"]', '2023-11-29 13:30:09', '2023-11-29 11:48:14', '2023-11-29 13:30:09'),
(844, 'App\\Models\\User', 95, 'hydra-api-token', '0b5101a3cc80e431abb88e13d29fe6a7967f5043f5c1b126695b750ee8d39fce', '[\"user\"]', '2023-11-29 12:15:58', '2023-11-29 11:53:51', '2023-11-29 12:15:58'),
(845, 'App\\Models\\User', 96, 'hydra-api-token', 'f326a843398dee961c3ca88cd9cfa428d0f8e04db5a6d46c11161a054f14ef1e', '[\"user\"]', '2023-11-29 12:30:15', '2023-11-29 11:54:07', '2023-11-29 12:30:15'),
(846, 'App\\Models\\User', 95, 'hydra-api-token', '60c6ce65870ec5bbe7b80c32d9e160477d41bc9bc1776110b06ce00a93dcda7f', '[\"user\"]', '2023-11-29 12:31:47', '2023-11-29 12:21:44', '2023-11-29 12:31:47'),
(847, 'App\\Models\\User', 96, 'hydra-api-token', '4bf1242f523223910dd8bd45bbea2ee8f6f027eedf24aee299f5374ba4735897', '[\"user\"]', '2023-11-29 18:46:14', '2023-11-29 18:10:31', '2023-11-29 18:46:14'),
(848, 'App\\Models\\User', 95, 'hydra-api-token', 'eec8ef9bc0a35c0a00757b3fd9e5f5b69b883cf855d1bc01e8835af80feee94f', '[\"user\"]', '2023-11-29 18:49:38', '2023-11-29 18:10:52', '2023-11-29 18:49:38'),
(849, 'App\\Models\\User', 90, 'hydra-api-token', '5958678ad1877eb330fc438eb9bdec41e8d8b588104dee1986924f2f79fc77d1', '[\"user\"]', '2023-11-30 15:37:51', '2023-11-30 15:14:04', '2023-11-30 15:37:51'),
(850, 'App\\Models\\User', 89, 'hydra-api-token', '52ebe9935ffa2f83a6ea2286251fc4ba2ec83a37365a4e942eecd47722114098', '[\"user\"]', '2023-11-30 15:42:17', '2023-11-30 15:17:17', '2023-11-30 15:42:17'),
(851, 'App\\Models\\User', 90, 'hydra-api-token', '863a53cf6f3e64d7ac8d149f83fab35634f6ce77d704f97346e616d326907e26', '[\"user\"]', '2023-12-01 03:52:55', '2023-12-01 03:51:58', '2023-12-01 03:52:55'),
(852, 'App\\Models\\User', 90, 'hydra-api-token', '4e8684e215d22009a8736e125f945a86fbb46fae184670359cb99a25e39fd6cc', '[\"user\"]', '2023-12-01 10:21:51', '2023-12-01 10:21:09', '2023-12-01 10:21:51'),
(853, 'App\\Models\\User', 95, 'hydra-api-token', 'f9f53b027119ee160c5351f3812a15cf9ca5f759f00bfa067395f2edf00644b9', '[\"user\"]', '2023-12-02 09:21:47', '2023-12-02 05:20:34', '2023-12-02 09:21:47'),
(854, 'App\\Models\\User', 90, 'hydra-api-token', 'fc92be3febba36dc3d4b50900f70d192ea11df13a4fa815de9ab104d569709fa', '[\"user\"]', '2023-12-02 05:47:32', '2023-12-02 05:47:29', '2023-12-02 05:47:32'),
(855, 'App\\Models\\User', 89, 'hydra-api-token', '3c734a9792d967644868cc354a0874d0a969752232c2e1c24b08dc50a10754ea', '[\"user\"]', '2023-12-02 12:28:21', '2023-12-02 06:16:33', '2023-12-02 12:28:21'),
(856, 'App\\Models\\User', 89, 'hydra-api-token', '698bda76ab2642a826a6ce45e29b171964fe587420f0f7388c280a56473c90b6', '[\"user\"]', '2023-12-02 06:23:40', '2023-12-02 06:23:25', '2023-12-02 06:23:40'),
(857, 'App\\Models\\User', 89, 'hydra-api-token', '1aa72c26539007e9a3a779030569cd131c3125b1ad07fea795b5a19962eb25fa', '[\"user\"]', '2023-12-02 12:27:50', '2023-12-02 07:52:36', '2023-12-02 12:27:50'),
(858, 'App\\Models\\User', 90, 'hydra-api-token', '66cf0bc0d0c4ef7de0b0af7c708857c413727dcaade4fc2bf533589b6a233cf7', '[\"user\"]', '2023-12-02 08:15:00', '2023-12-02 07:57:17', '2023-12-02 08:15:00'),
(859, 'App\\Models\\User', 86, 'hydra-api-token', '6d894b5be1c517e4830b2c59e2b939fe249963104e40c2533000151f860bc029', '[\"admin\"]', '2023-12-02 08:03:52', '2023-12-02 08:01:53', '2023-12-02 08:03:52'),
(860, 'App\\Models\\User', 90, 'hydra-api-token', 'e77086f3428ee14f589e8ee6316b9cfaf6da3d579a838fc5e8d0dbba9d7aeac6', '[\"user\"]', '2023-12-02 12:27:56', '2023-12-02 08:15:05', '2023-12-02 12:27:56'),
(861, 'App\\Models\\User', 96, 'hydra-api-token', '33925a5a0b84ea3e2c16bb050ad85ec2f619c797ae4bf231ec4ea4d21a4961b6', '[\"user\"]', '2023-12-02 08:55:10', '2023-12-02 08:55:09', '2023-12-02 08:55:10'),
(862, 'App\\Models\\User', 95, 'hydra-api-token', '002536584272eee50c24b913143a9fbee7da60db26221725c350d4d95af94109', '[\"user\"]', '2023-12-02 10:17:58', '2023-12-02 08:55:36', '2023-12-02 10:17:58'),
(863, 'App\\Models\\User', 96, 'hydra-api-token', 'f17e2d3ad9a3ec600f8719f8cefd4cba8efa3befccce3f67a5f5dc0f3420288f', '[\"user\"]', '2023-12-02 09:19:40', '2023-12-02 09:19:24', '2023-12-02 09:19:40'),
(864, 'App\\Models\\User', 95, 'hydra-api-token', '606866647699d21bbdae30aecf7097a9c666bee83a0922202b6eb3e1b823088f', '[\"user\"]', '2023-12-03 10:53:59', '2023-12-02 09:20:05', '2023-12-03 10:53:59'),
(865, 'App\\Models\\User', 92, 'hydra-api-token', 'efc831c50f3896fed9ae6e567f4ee8e3426dad8d353f73a46aa8a9cb62347737', '[\"user\"]', '2023-12-02 12:15:26', '2023-12-02 09:54:51', '2023-12-02 12:15:26'),
(866, 'App\\Models\\User', 92, 'hydra-api-token', 'fb5611949c07490afd27df82609cbc7f08ff9c918f13d5e2a7f25a89d83e6414', '[\"user\"]', '2023-12-02 12:26:12', '2023-12-02 10:15:20', '2023-12-02 12:26:12'),
(867, 'App\\Models\\User', 86, 'hydra-api-token', '90bf02a68746a43dd7bddbb8cf41604bd41acf7b75290bf17e6da2b0712a8c77', '[\"admin\"]', '2023-12-02 11:49:33', '2023-12-02 11:49:30', '2023-12-02 11:49:33'),
(868, 'App\\Models\\User', 92, 'hydra-api-token', '3f1d5d29d478dc1a6d2733362e3ab980a121e51db01e1a8888dd577917245b1f', '[\"user\"]', '2023-12-02 12:28:42', '2023-12-02 12:28:38', '2023-12-02 12:28:42'),
(869, 'App\\Models\\User', 89, 'hydra-api-token', '4d3801a36eaa5e6a2848c3abf2a31fdcf20cf44ca90264edbdfeb4e0d82e22b9', '[\"user\"]', '2023-12-02 12:38:17', '2023-12-02 12:29:25', '2023-12-02 12:38:17'),
(870, 'App\\Models\\User', 89, 'hydra-api-token', '84f371ae6d1411fa651ca7424eb4ba935df8e7fb0faa02d5bfd42c9d23550e72', '[\"user\"]', '2023-12-02 13:26:58', '2023-12-02 12:38:22', '2023-12-02 13:26:58'),
(871, 'App\\Models\\User', 86, 'hydra-api-token', '6fa02c22dcea0e5d2415f844a5f5136a17c7e5075c976741bb8c1b9adb368466', '[\"admin\"]', '2023-12-02 12:42:44', '2023-12-02 12:42:12', '2023-12-02 12:42:44'),
(872, 'App\\Models\\User', 96, 'hydra-api-token', '66713223ec0b3a486b021486214f37176dde1fe1bd7d2b282c1f113ec7aecdcb', '[\"user\"]', '2023-12-02 15:15:11', '2023-12-02 15:12:33', '2023-12-02 15:15:11'),
(873, 'App\\Models\\User', 96, 'hydra-api-token', 'a8eca2e675457e652537a3db003922170864529665c6943832a0fde9113a4360', '[\"user\"]', '2023-12-02 15:55:53', '2023-12-02 15:18:52', '2023-12-02 15:55:53'),
(874, 'App\\Models\\User', 95, 'hydra-api-token', '90d30787e0c8d8a92efdc05960cb4a9210d61bb2e292a99ab7dd5d47b8ea41a9', '[\"user\"]', '2023-12-08 06:24:09', '2023-12-02 15:56:22', '2023-12-08 06:24:09'),
(875, 'App\\Models\\User', 96, 'hydra-api-token', 'e9cb0bc61c79ed61170d546b442a4249e975b67bd6088c6e68252fb78ffe4eeb', '[\"user\"]', '2023-12-03 06:23:11', '2023-12-03 06:23:10', '2023-12-03 06:23:11'),
(876, 'App\\Models\\User', 82, 'hydra-api-token', '525c38124694689f1d3c7db84cd1c7acc64bd9b55845fbbe0a80bfb2a32867cd', '[\"user\"]', '2023-12-03 06:27:32', '2023-12-03 06:23:22', '2023-12-03 06:27:32'),
(877, 'App\\Models\\User', 95, 'hydra-api-token', '316832c563cadf90e7e56ecfd2dd03bebb3eca008b72e838f8a65dd52b4cde7b', '[\"user\"]', '2023-12-03 06:27:03', '2023-12-03 06:23:53', '2023-12-03 06:27:03'),
(878, 'App\\Models\\User', 96, 'hydra-api-token', '98622bd9df815d11c01f946a69180d2e94d994e8a51710ce2a5efa729121719b', '[\"user\"]', '2023-12-03 06:28:10', '2023-12-03 06:27:44', '2023-12-03 06:28:10'),
(879, 'App\\Models\\User', 82, 'hydra-api-token', '7e34a78a14994c01974ba12a9db7230c6df657a1eb58ee015fb17c95ec3ab26a', '[\"user\"]', '2023-12-03 06:31:03', '2023-12-03 06:28:23', '2023-12-03 06:31:03'),
(880, 'App\\Models\\User', 81, 'hydra-api-token', '8462b1613b87c26164dbf0a3e03de1b6cc1351acaaf42e3e2cef5f3adedd76b5', '[\"admin\"]', '2023-12-03 06:35:40', '2023-12-03 06:29:57', '2023-12-03 06:35:40'),
(881, 'App\\Models\\User', 82, 'hydra-api-token', 'caea644cb43db7cfe7b7999fc858b673fd8b0de34f3505f74120d4aaa4082d03', '[\"user\"]', '2023-12-03 06:57:29', '2023-12-03 06:30:47', '2023-12-03 06:57:29'),
(882, 'App\\Models\\User', 96, 'hydra-api-token', '235e5752036026e074e8497d606209acd14211f74a57a96816a5cc9d30ca6f8d', '[\"user\"]', '2023-12-03 07:29:26', '2023-12-03 06:31:51', '2023-12-03 07:29:26'),
(883, 'App\\Models\\User', 82, 'hydra-api-token', '9dea0e2042aec8681565c7db935588f8818c2da19af9ad4f9aab17de58768cf2', '[\"user\"]', '2023-12-03 06:52:00', '2023-12-03 06:51:57', '2023-12-03 06:52:00'),
(884, 'App\\Models\\User', 82, 'hydra-api-token', 'b78dc0387254d8ed2bb787e7fa8bd5d673e24c16a4abeba143b2596d76b1709e', '[\"user\"]', '2023-12-03 07:28:16', '2023-12-03 06:52:37', '2023-12-03 07:28:16'),
(885, 'App\\Models\\User', 81, 'hydra-api-token', 'd9ccb5849e68e9f14cab120d8c685b5a002082d98f1df069777c3504a6f7a352', '[\"admin\"]', '2023-12-03 07:34:16', '2023-12-03 07:12:24', '2023-12-03 07:34:16'),
(886, 'App\\Models\\User', 95, 'hydra-api-token', '4674ac7647901da697b96308e20b46a5c56e7154ede76466096e1d1b30314561', '[\"user\"]', '2023-12-03 12:23:08', '2023-12-03 09:34:59', '2023-12-03 12:23:08'),
(887, 'App\\Models\\User', 96, 'hydra-api-token', '6e6b26e605954000df40506bf95a284fb53339dca10175ee9351ff2b80205073', '[\"user\"]', '2023-12-03 10:55:42', '2023-12-03 10:54:22', '2023-12-03 10:55:42'),
(888, 'App\\Models\\User', 95, 'hydra-api-token', '9e901fa869ba0277f9fe788722fa570c37b1176df12b059c9abd752188535ad6', '[\"user\"]', '2023-12-06 06:08:16', '2023-12-03 10:56:26', '2023-12-06 06:08:16'),
(889, 'App\\Models\\User', 96, 'hydra-api-token', '17fdcdd3cafdcfd66ac2c9ec194d26641ad74d17d85797df492729fcc649ca26', '[\"user\"]', '2023-12-03 12:25:30', '2023-12-03 12:23:54', '2023-12-03 12:25:30'),
(890, 'App\\Models\\User', 96, 'hydra-api-token', '3159337cc495fdaddcfbbd6d81b3ca3c4d9c52a482c2e53ef1bc0cead2ea95c0', '[\"user\"]', '2023-12-04 05:29:11', '2023-12-04 05:26:05', '2023-12-04 05:29:11'),
(891, 'App\\Models\\User', 95, 'hydra-api-token', '3a310af309f260ac363c1e14112c63d746b60e529789d456e6977a93c7954489', '[\"user\"]', '2023-12-04 05:33:10', '2023-12-04 05:30:04', '2023-12-04 05:33:10'),
(892, 'App\\Models\\User', 96, 'hydra-api-token', '4cad0e4add07405abbba3b45b544eca86f42fe37c923680ffb719e640272b299', '[\"user\"]', '2023-12-04 09:02:17', '2023-12-04 05:34:49', '2023-12-04 09:02:17'),
(893, 'App\\Models\\User', 95, 'hydra-api-token', '9ba78d837a9010c1fd2bf035f01aedbc2b6f943507a16ba314f9b8f9e39dcac6', '[\"user\"]', '2023-12-04 10:55:08', '2023-12-04 10:13:50', '2023-12-04 10:55:08'),
(894, 'App\\Models\\User', 95, 'hydra-api-token', 'dfea9ec395aed0b594f65b634bd91efbf974496e09036f12142a6b54f916407a', '[\"user\"]', '2023-12-04 12:28:26', '2023-12-04 10:15:00', '2023-12-04 12:28:26'),
(895, 'App\\Models\\User', 90, 'hydra-api-token', 'f879e4e23d611c7548ad97efa5ad8fc2ede806abcf77e29bab3d5484c575c905', '[\"user\"]', '2023-12-04 12:56:01', '2023-12-04 12:25:37', '2023-12-04 12:56:01'),
(896, 'App\\Models\\User', 89, 'hydra-api-token', 'e46bded3d3025deeec5833a48a45de3b8f62fcfa2df65cc52dcef01bf917fd87', '[\"user\"]', '2023-12-04 12:53:06', '2023-12-04 12:28:09', '2023-12-04 12:53:06'),
(897, 'App\\Models\\User', 96, 'hydra-api-token', '4f2b7f461fbe305b5ecfb67340c1c23d497bc26e829f97b8d02e8c7924cdc097', '[\"user\"]', '2023-12-04 12:28:41', '2023-12-04 12:28:37', '2023-12-04 12:28:41'),
(898, 'App\\Models\\User', 89, 'hydra-api-token', '1e954b52ae6cdc5b3d16143f495d1810eb1c50fa703cbbe7ef230783ac896c69', '[\"user\"]', '2023-12-04 12:31:50', '2023-12-04 12:29:45', '2023-12-04 12:31:50'),
(899, 'App\\Models\\User', 96, 'hydra-api-token', '904ef91d189ba456fcc34106cc2bc2a95d8ebb514aa857addafda9d6f8ac2e9c', '[\"user\"]', '2023-12-05 06:25:33', '2023-12-05 06:25:31', '2023-12-05 06:25:33'),
(900, 'App\\Models\\User', 95, 'hydra-api-token', '113e753ae226db33d622e09b9e189f49d5e185fdfa7c5d753de22884ac67fe53', '[\"user\"]', '2023-12-05 06:40:52', '2023-12-05 06:25:45', '2023-12-05 06:40:52'),
(901, 'App\\Models\\User', 95, 'hydra-api-token', '0b654cf34d4494ddb8c694278e17fcd42fb91b6f560825dd230030ad08e1a506', '[\"user\"]', '2023-12-05 12:18:16', '2023-12-05 10:26:11', '2023-12-05 12:18:16'),
(902, 'App\\Models\\User', 96, 'hydra-api-token', '89fae85b8382c3ac2df4eb3258b9ab32538a71b1fe5e0a9d7e54bf91268b4f25', '[\"user\"]', '2023-12-06 05:52:01', '2023-12-06 05:36:44', '2023-12-06 05:52:01'),
(903, 'App\\Models\\User', 96, 'hydra-api-token', '9753ebcfe0af48030f623124dd81856821c5ec7ec75935c0cac70d77c6626508', '[\"user\"]', '2023-12-06 10:43:07', '2023-12-06 06:09:14', '2023-12-06 10:43:07'),
(904, 'App\\Models\\User', 95, 'hydra-api-token', '147015a9b75d4ea728c0f1729eb5cfb9211a7fe446668db3e9e0f0c3ad83efb8', '[\"user\"]', '2023-12-06 08:43:54', '2023-12-06 08:42:16', '2023-12-06 08:43:54'),
(905, 'App\\Models\\User', 96, 'hydra-api-token', '5e1fee51df77146800dec4db24d00cb32fad20be4e1ad97c9b5c32589f0d74e2', '[\"user\"]', '2023-12-06 09:02:40', '2023-12-06 08:44:26', '2023-12-06 09:02:40'),
(906, 'App\\Models\\User', 90, 'hydra-api-token', 'e85ef58212d0eb3081a0732fbe7e9bf60d57ee018bd6446baede94e98cb83cf5', '[\"user\"]', '2023-12-06 08:56:14', '2023-12-06 08:55:32', '2023-12-06 08:56:14'),
(907, 'App\\Models\\User', 89, 'hydra-api-token', '2be4b7abec763f3be7f49f040c911c061b39c1b6b246df3d625630da8f7c300d', '[\"user\"]', '2023-12-06 09:49:33', '2023-12-06 08:59:19', '2023-12-06 09:49:33'),
(908, 'App\\Models\\User', 90, 'hydra-api-token', 'afb618b9ae22bc6de20662afe15773e47c6501893c848b51a33b50bac909e629', '[\"user\"]', '2023-12-06 09:01:16', '2023-12-06 09:01:15', '2023-12-06 09:01:16'),
(909, 'App\\Models\\User', 95, 'hydra-api-token', '00395066c2153a5eeb56d60224902b8c38b9ed8ef7125f5d15685c13fba20fab', '[\"user\"]', '2023-12-06 09:06:45', '2023-12-06 09:03:09', '2023-12-06 09:06:45'),
(910, 'App\\Models\\User', 82, 'hydra-api-token', 'f92a77c338c8a1daf564dbd51d6111e3c998ad7126bd849cdb462fa888a8f529', '[\"user\"]', '2023-12-06 09:49:16', '2023-12-06 09:03:52', '2023-12-06 09:49:16'),
(911, 'App\\Models\\User', 89, 'hydra-api-token', '2471709d269873e11425479627e641f5e138e060564db9b6561ef6446d4dc310', '[\"user\"]', '2023-12-06 09:18:33', '2023-12-06 09:05:27', '2023-12-06 09:18:33'),
(912, 'App\\Models\\User', 96, 'hydra-api-token', '66614f4fb185e30ee0b4d379be7fef0d82bb24a7cbe2e04be959e715369fd84f', '[\"user\"]', '2023-12-06 09:31:43', '2023-12-06 09:07:02', '2023-12-06 09:31:43'),
(913, 'App\\Models\\User', 95, 'hydra-api-token', 'fe1387b9166a2ae2de62c7ec3b78550a68e71aec2cfe7243c88143436f9e1c22', '[\"user\"]', '2023-12-06 09:39:26', '2023-12-06 09:35:15', '2023-12-06 09:39:26'),
(914, 'App\\Models\\User', 96, 'hydra-api-token', '97ce11ffcf47903385b7c723227ab7a9ce8fcb8c60412edeb6dc007f3aeb04a5', '[\"user\"]', '2023-12-06 09:41:11', '2023-12-06 09:41:05', '2023-12-06 09:41:11'),
(915, 'App\\Models\\User', 95, 'hydra-api-token', 'c3df66e1e5c2350d9cc42c6dfc62470010701ebbb8536894209b7938c4f9509b', '[\"user\"]', '2023-12-06 09:41:50', '2023-12-06 09:41:46', '2023-12-06 09:41:50'),
(916, 'App\\Models\\User', 96, 'hydra-api-token', 'e4f410832661e8671f557dc13ecaebf10c93dcdb4a26ab80dcbd420186697c08', '[\"user\"]', '2023-12-06 09:45:10', '2023-12-06 09:43:53', '2023-12-06 09:45:10'),
(917, 'App\\Models\\User', 95, 'hydra-api-token', '48fad098e7c18a13bea9f7f9b67e91e8aa19520e1d6d10e254b2c5d61c11d1fc', '[\"user\"]', '2023-12-06 09:53:31', '2023-12-06 09:45:47', '2023-12-06 09:53:31'),
(918, 'App\\Models\\User', 89, 'hydra-api-token', '938b7a6c0bcdc2954799166af613f69aa1d6fafb90a5ea32d635ee8dc6952b68', '[\"user\"]', '2023-12-06 11:14:05', '2023-12-06 09:49:45', '2023-12-06 11:14:05'),
(919, 'App\\Models\\User', 96, 'hydra-api-token', '48870ed5f4928f7d5262c14a442191f62b295049c22f0b0ae2ad6f7c4c4bec0f', '[\"user\"]', '2023-12-06 09:55:43', '2023-12-06 09:55:14', '2023-12-06 09:55:43'),
(920, 'App\\Models\\User', 95, 'hydra-api-token', 'dda3265add2d4599c376b7074b8de5bc31771b552faf36de040e9bb9b6a1145e', '[\"user\"]', '2023-12-06 09:58:13', '2023-12-06 09:55:58', '2023-12-06 09:58:13'),
(921, 'App\\Models\\User', 96, 'hydra-api-token', '5110887b023072505a71ca73b7a2e040f4dad1ac1addf4f7b74d7005e325f5d7', '[\"user\"]', '2023-12-06 10:34:15', '2023-12-06 10:33:22', '2023-12-06 10:34:15'),
(922, 'App\\Models\\User', 95, 'hydra-api-token', 'd5e4c1186d4e90c8caff249d745a0c82aa234a6f8578eb616f51356d8637014c', '[\"user\"]', '2023-12-06 10:36:02', '2023-12-06 10:34:33', '2023-12-06 10:36:02'),
(923, 'App\\Models\\User', 96, 'hydra-api-token', '39dbab02e015935dc1e61a73c29c834ad7a95769179f2f26073ed340d078b683', '[\"user\"]', '2023-12-06 10:37:26', '2023-12-06 10:36:59', '2023-12-06 10:37:26'),
(924, 'App\\Models\\User', 95, 'hydra-api-token', '4d88806b674af2f443968fe20c27f9bb2c825bdf816ab341547b8ab96efd199d', '[\"user\"]', '2023-12-10 08:48:14', '2023-12-06 10:37:43', '2023-12-10 08:48:14'),
(925, 'App\\Models\\User', 96, 'hydra-api-token', 'bfd8c3ad472dc95848148b5da8be1e562c7a7e90e0fa0cfbaaa93418c11dc023', '[\"user\"]', '2023-12-06 10:43:56', '2023-12-06 10:43:30', '2023-12-06 10:43:56'),
(926, 'App\\Models\\User', 95, 'hydra-api-token', 'ac7ad4512533138cfbdce2971775adc0abda7cd0d166a8dcf79556b0ce880373', '[\"user\"]', '2023-12-06 10:57:56', '2023-12-06 10:44:58', '2023-12-06 10:57:56'),
(927, 'App\\Models\\User', 89, 'hydra-api-token', '7a86a2dce55af639ab3ec79155589e4873e7c079f6fb353d540e78394957336e', '[\"user\"]', '2023-12-06 11:02:40', '2023-12-06 11:01:02', '2023-12-06 11:02:40'),
(928, 'App\\Models\\User', 90, 'hydra-api-token', 'cee6960947b4b0aa393cb303c11095b8bc0811b1450b47a9ef8192b96582f73d', '[\"user\"]', '2023-12-06 11:15:23', '2023-12-06 11:14:14', '2023-12-06 11:15:23'),
(929, 'App\\Models\\User', 95, 'hydra-api-token', '22f5df71af74160bde93eeda18bc9f437986914f032a4326acd94177f2d60369', '[\"user\"]', '2023-12-06 11:29:24', '2023-12-06 11:26:21', '2023-12-06 11:29:24'),
(930, 'App\\Models\\User', 95, 'hydra-api-token', 'f350e23c6def9dfb3b3bb12dd7d6a4e6efefb1fda4f8d34870188c73dd957f45', '[\"user\"]', '2023-12-06 11:34:26', '2023-12-06 11:31:59', '2023-12-06 11:34:26'),
(931, 'App\\Models\\User', 95, 'hydra-api-token', '91c18f6bfc467634a768cb7d7d3b0f9dd2d731f99f95ab364e0189a355ed04ea', '[\"user\"]', '2023-12-06 11:51:46', '2023-12-06 11:49:20', '2023-12-06 11:51:46'),
(932, 'App\\Models\\User', 95, 'hydra-api-token', '3a1a21a2c6d43e90f37c67b684584b717137cb4f19be9ca7e0459e5121a8ee5b', '[\"user\"]', NULL, '2023-12-06 11:49:21', '2023-12-06 11:49:21'),
(933, 'App\\Models\\User', 95, 'hydra-api-token', '2e081a3ad0b68934c62b40852f2b2fb37c22da22a74ce038590eefea1cad6d59', '[\"user\"]', '2023-12-06 11:52:43', '2023-12-06 11:52:24', '2023-12-06 11:52:43'),
(934, 'App\\Models\\User', 95, 'hydra-api-token', '67bc2fa530e31852a028830f5cc8a4400a221108db49015df247c22970a4cd3a', '[\"user\"]', '2023-12-07 03:08:04', '2023-12-07 02:59:02', '2023-12-07 03:08:04'),
(935, 'App\\Models\\User', 96, 'hydra-api-token', '383a0cf9c6f234508fe45f3925825fa6914c2a28b7ea9ca01f61b05e0f2724a1', '[\"user\"]', '2023-12-07 03:45:53', '2023-12-07 02:59:22', '2023-12-07 03:45:53'),
(936, 'App\\Models\\User', 95, 'hydra-api-token', 'fa66f8aa6f5a52041daf3f2bb595a41935bd3a41b8817604cf3069398d9699b0', '[\"user\"]', '2023-12-07 03:41:59', '2023-12-07 03:08:29', '2023-12-07 03:41:59'),
(937, 'App\\Models\\User', 89, 'hydra-api-token', 'e5fa2b6d37c0b01c62853fdc5170baf9dcf28b4e656b6bc83d01436ed0bcfe56', '[\"user\"]', '2023-12-07 03:33:33', '2023-12-07 03:33:27', '2023-12-07 03:33:33'),
(938, 'App\\Models\\User', 82, 'hydra-api-token', 'ae5763c5be1d2ce1d451a08a8f82b66c9ba365948212648ccc4955bc21e1b160', '[\"user\"]', '2023-12-07 03:33:57', '2023-12-07 03:33:46', '2023-12-07 03:33:57'),
(939, 'App\\Models\\User', 89, 'hydra-api-token', 'bb45ed28974df1870126bf82b4801d3b60e0709f0f2f4491f7dea85120c72e4c', '[\"user\"]', '2023-12-07 06:16:32', '2023-12-07 06:08:33', '2023-12-07 06:16:32'),
(940, 'App\\Models\\User', 95, 'hydra-api-token', 'fb960033d7781bc2b6853ff5e718cab84d12faf40dd530c0375e6d13eb9f3045', '[\"user\"]', '2023-12-07 08:35:09', '2023-12-07 07:59:40', '2023-12-07 08:35:09'),
(941, 'App\\Models\\User', 95, 'hydra-api-token', 'de09386dd5cb71bf8650d8d323b86f9e5b688146a95b5edda6a17a742824d060', '[\"user\"]', '2024-02-13 10:35:30', '2023-12-07 08:03:35', '2024-02-13 10:35:30'),
(942, 'App\\Models\\User', 96, 'hydra-api-token', 'fb1f08954d3dccba9b304e3c0c1aeee441b43565e359eebba667b290775bc9f8', '[\"user\"]', '2023-12-07 08:12:49', '2023-12-07 08:10:08', '2023-12-07 08:12:49'),
(943, 'App\\Models\\User', 96, 'hydra-api-token', '7f48bec453743aa038eb4d6cc01651318058baa944e54fcc61b6fd62aa9549bf', '[\"user\"]', '2023-12-07 10:15:53', '2023-12-07 08:13:02', '2023-12-07 10:15:53'),
(944, 'App\\Models\\User', 95, 'hydra-api-token', '0727d159fc867abeb43c84f9133c6b8a202269dc332689e37c45eaa9d8eb64c5', '[\"user\"]', '2023-12-07 10:15:13', '2023-12-07 08:35:38', '2023-12-07 10:15:13'),
(945, 'App\\Models\\User', 95, 'hydra-api-token', 'f89f9c63e5a7a898f67af2f69e3aec27efdaf3da050199ac759469837af777fa', '[\"user\"]', '2023-12-09 07:07:27', '2023-12-07 08:37:13', '2023-12-09 07:07:27'),
(946, 'App\\Models\\User', 96, 'hydra-api-token', '284e3c30179b58e9efa06386c7dc70cefff46f8b15ab108d00a1702dca628cf0', '[\"user\"]', '2023-12-09 11:56:31', '2023-12-07 10:06:20', '2023-12-09 11:56:31'),
(947, 'App\\Models\\User', 95, 'hydra-api-token', 'cf06f17840ea7a994ac0a69d59f1d70bc5f92089f1b80f9335474e5956810c19', '[\"user\"]', '2023-12-17 12:13:56', '2023-12-07 11:29:04', '2023-12-17 12:13:56'),
(948, 'App\\Models\\User', 95, 'hydra-api-token', '35ac3e4fd816d3c73584df819c0050c00c5bf147389b396fcb91094ea887afd3', '[\"user\"]', '2023-12-07 16:54:09', '2023-12-07 16:51:36', '2023-12-07 16:54:09'),
(949, 'App\\Models\\User', 95, 'hydra-api-token', '7716125b0ca5b68e2f19b9e5142f494a2cbc3225041d76a11cdbb472b64daa32', '[\"user\"]', NULL, '2023-12-07 16:51:37', '2023-12-07 16:51:37'),
(950, 'App\\Models\\User', 95, 'hydra-api-token', '4d6f3adaf29aed4640679246e8d701a2bfb3e1c59a5702e1f92316e47c3f4f6d', '[\"user\"]', '2023-12-09 05:10:53', '2023-12-09 04:29:59', '2023-12-09 05:10:53'),
(951, 'App\\Models\\User', 95, 'hydra-api-token', '48f5df388b3a212f536ac5850dd0c46a804aaa594269043ad73c0dbc42418761', '[\"user\"]', '2023-12-10 04:15:34', '2023-12-09 04:51:43', '2023-12-10 04:15:34'),
(952, 'App\\Models\\User', 96, 'hydra-api-token', 'de15bf86577cada2656ce7e33820954344e089cae2dac0be23a2d904feb310a4', '[\"user\"]', '2023-12-09 11:53:50', '2023-12-09 05:11:26', '2023-12-09 11:53:50'),
(953, 'App\\Models\\User', 90, 'hydra-api-token', '817406afe009bc430e59b566a7a85e15eda0da276e3a71259532c263c7f3eb14', '[\"user\"]', '2023-12-09 06:03:11', '2023-12-09 05:57:13', '2023-12-09 06:03:11'),
(954, 'App\\Models\\User', 90, 'hydra-api-token', '15e98653cecd7625b436655d259e27af0284cf6947dfea34b055633427c99bd4', '[\"user\"]', '2023-12-09 06:02:52', '2023-12-09 05:59:49', '2023-12-09 06:02:52'),
(955, 'App\\Models\\User', 90, 'hydra-api-token', '7a20b6f6c6d3aefe84845f5997762128cc5a88307b895cc988122b269aa1b3b6', '[\"user\"]', '2023-12-09 06:03:54', '2023-12-09 06:03:27', '2023-12-09 06:03:54'),
(956, 'App\\Models\\User', 96, 'hydra-api-token', 'eeb82bbfb786a39d7532d42a8d15fd4faca2a95a4d49348b9e193296b21df2b7', '[\"user\"]', '2023-12-10 12:51:33', '2023-12-09 06:05:11', '2023-12-10 12:51:33'),
(957, 'App\\Models\\User', 89, 'hydra-api-token', '88278a9da96b4bcea455d2de091c9cb523f301c951481bad6f13c51cd17cf4ae', '[\"user\"]', '2023-12-09 07:10:02', '2023-12-09 06:28:43', '2023-12-09 07:10:02'),
(958, 'App\\Models\\User', 90, 'hydra-api-token', '118dea71dc6a98962cf81568cbd9bfc0b581b32dcb9ad33a0a2a21b11b6e739c', '[\"user\"]', '2023-12-09 09:48:45', '2023-12-09 06:29:01', '2023-12-09 09:48:45'),
(959, 'App\\Models\\User', 87, 'hydra-api-token', '04cec056cc7f2bc83d90aa489686eb2728bd37ae387d971178ae52317b5b1a77', '[\"admin\"]', '2023-12-09 10:48:31', '2023-12-09 06:57:23', '2023-12-09 10:48:31'),
(960, 'App\\Models\\User', 90, 'hydra-api-token', 'a0392a457d748c63308f9b64cfaa65470ad86fc17c61335a1f5c7877e66ea72a', '[\"user\"]', '2023-12-09 11:48:22', '2023-12-09 07:01:17', '2023-12-09 11:48:22'),
(961, 'App\\Models\\User', 95, 'hydra-api-token', 'e1b65a9a0695a571811b7d5434c319620c4189d930d4f7614ff69dbd21dd5fb1', '[\"user\"]', '2023-12-09 09:31:43', '2023-12-09 07:35:06', '2023-12-09 09:31:43'),
(962, 'App\\Models\\User', 96, 'hydra-api-token', 'b0bfef7dcd30c77a0456f0c4f0c877daba8ad5c2aed9950f9e5252126e55c5d9', '[\"user\"]', '2023-12-09 09:53:16', '2023-12-09 08:44:00', '2023-12-09 09:53:16'),
(963, 'App\\Models\\User', 95, 'hydra-api-token', '6c5573e98ffdf5cbc50f7a731d45202e0b0c3bf466b274ed113f0bed0c96aa4b', '[\"user\"]', '2023-12-09 09:53:21', '2023-12-09 08:44:18', '2023-12-09 09:53:21'),
(964, 'App\\Models\\User', 95, 'hydra-api-token', 'fe938e9c7877ac331d94f38a6541123d43ee9801d449a945ada211d8f53dea71', '[\"user\"]', '2023-12-09 09:20:39', '2023-12-09 09:08:27', '2023-12-09 09:20:39'),
(965, 'App\\Models\\User', 96, 'hydra-api-token', '8b096aeae9f92ee3a8843ee2f5bf082fe39e707004ae43101156db018d34cff3', '[\"user\"]', '2023-12-09 13:17:08', '2023-12-09 09:14:21', '2023-12-09 13:17:08'),
(966, 'App\\Models\\User', 96, 'hydra-api-token', '8878842f0e16eb01e09bcf854d955c87e45135db40965a9171b7664378046529', '[\"user\"]', '2023-12-09 09:41:46', '2023-12-09 09:38:36', '2023-12-09 09:41:46'),
(967, 'App\\Models\\User', 95, 'hydra-api-token', 'e2bb08a655b5c9a19644f07af48970e46f08ef9a6de8fea2fc12a9d4d0151463', '[\"user\"]', '2023-12-09 09:41:49', '2023-12-09 09:41:07', '2023-12-09 09:41:49'),
(968, 'App\\Models\\User', 95, 'hydra-api-token', 'b60608adc1f5d12e565d480ee44f48db5631a70f6faf44b4a1996ee1c379e539', '[\"user\"]', '2023-12-09 09:43:26', '2023-12-09 09:42:54', '2023-12-09 09:43:26'),
(969, 'App\\Models\\User', 89, 'hydra-api-token', 'ca5f7a3dcbcf9fdff1b7ab0910abab8170a404b861b7a674aba6369d1c7a7381', '[\"user\"]', '2023-12-09 09:52:53', '2023-12-09 09:49:08', '2023-12-09 09:52:53'),
(970, 'App\\Models\\User', 90, 'hydra-api-token', '1e03f27e0bfce7822f7348ce45bfb490b8c45ef6ac7431f5188215669458e20d', '[\"user\"]', '2023-12-09 13:17:24', '2023-12-09 09:50:51', '2023-12-09 13:17:24'),
(971, 'App\\Models\\User', 96, 'hydra-api-token', 'c8141128eb4897d9d91aab633e225ba40aeee52cf49c03a09d025ad415cc2c91', '[\"user\"]', '2023-12-09 09:52:39', '2023-12-09 09:51:53', '2023-12-09 09:52:39'),
(972, 'App\\Models\\User', 90, 'hydra-api-token', '41bc4a888f98103801a0a6c5f9ee1d8bfba71fc410afc1802cad8473b6445c9b', '[\"user\"]', '2023-12-09 10:58:09', '2023-12-09 10:54:51', '2023-12-09 10:58:09'),
(973, 'App\\Models\\User', 90, 'hydra-api-token', 'c05952621e9853fdd5efa92705788eadf2fd46680d84c334f270afb6328ab6fa', '[\"user\"]', '2023-12-09 11:24:26', '2023-12-09 10:58:36', '2023-12-09 11:24:26'),
(974, 'App\\Models\\User', 96, 'hydra-api-token', '0eabee4cc8a836c48cc0b881e1410e7c1af533f56528562a85043fcff4aacd10', '[\"user\"]', '2023-12-09 12:08:17', '2023-12-09 11:39:08', '2023-12-09 12:08:17'),
(975, 'App\\Models\\User', 96, 'hydra-api-token', 'e9345a9024a8f74f12157c33686021005cf2e265959cc79e8989b3cb5de77d30', '[\"user\"]', '2023-12-09 12:22:52', '2023-12-09 12:03:01', '2023-12-09 12:22:52'),
(976, 'App\\Models\\User', 82, 'hydra-api-token', '689cf75c8d587da00466ff211084ec4ffb996a6c7dfe00b3460d192d7c3a53cc', '[\"user\"]', '2023-12-09 12:12:44', '2023-12-09 12:12:14', '2023-12-09 12:12:44'),
(977, 'App\\Models\\User', 83, 'hydra-api-token', '45704ca35c0004491ee4fb5ba118cfca1e1cd5bc9527ee3a05e3409655afbbda', '[\"user\"]', '2023-12-09 12:16:48', '2023-12-09 12:13:18', '2023-12-09 12:16:48'),
(978, 'App\\Models\\User', 82, 'hydra-api-token', '1309d48ceea2aa09a7bcf5c794e9d83ddee4c3d03047bbeb977ccb5de7626e0e', '[\"user\"]', '2023-12-09 12:17:06', '2023-12-09 12:17:03', '2023-12-09 12:17:06'),
(979, 'App\\Models\\User', 95, 'hydra-api-token', '54f1d8c1fd54e89a39d682c17dbbb7ba03ccafd1df4c40e0219217e1ec466e2f', '[\"user\"]', '2023-12-09 17:00:45', '2023-12-09 12:29:38', '2023-12-09 17:00:45'),
(980, 'App\\Models\\User', 95, 'hydra-api-token', 'a704fb49d34bdda87848dbfdf042f88ea60094aaf9bf00227fd38c4db685198c', '[\"user\"]', '2023-12-09 17:09:52', '2023-12-09 17:02:24', '2023-12-09 17:09:52'),
(981, 'App\\Models\\User', 95, 'hydra-api-token', '9955ee61a9bf18370c0ff0e26b0bc08122fe51e887966dd80bfd99af83cbd9fc', '[\"user\"]', '2023-12-13 06:16:53', '2023-12-09 17:11:05', '2023-12-13 06:16:53'),
(982, 'App\\Models\\User', 96, 'hydra-api-token', 'de531a9dd6377adc8cc71aca7a9b242d8050abb97e7dd079b52bddf79e2aec83', '[\"user\"]', '2023-12-10 08:57:21', '2023-12-10 08:57:21', '2023-12-10 08:57:21'),
(983, 'App\\Models\\User', 95, 'hydra-api-token', '32948d37d76cc00c394aa2552f7cf2c3960207fad7fe8af294a9ab50073b2683', '[\"user\"]', '2024-01-08 10:05:29', '2023-12-10 08:57:47', '2024-01-08 10:05:29'),
(984, 'App\\Models\\User', 95, 'hydra-api-token', '7fc17540f1c37f9798581be79d06c5026dcd7e2be31af389d860c6791f3d54af', '[\"user\"]', '2023-12-10 09:44:55', '2023-12-10 09:42:48', '2023-12-10 09:44:55'),
(985, 'App\\Models\\User', 95, 'hydra-api-token', '50c081f5cfc6bbc0c9409ba3582945b6603af31d1b9a5c7972dc3757de002b2b', '[\"user\"]', '2023-12-10 09:48:26', '2023-12-10 09:45:35', '2023-12-10 09:48:26'),
(986, 'App\\Models\\User', 95, 'hydra-api-token', '86c17ec07c6db5c117d9d5fd6136c910788630d155e059b7ce7239054ee38b13', '[\"user\"]', '2023-12-10 09:56:23', '2023-12-10 09:53:02', '2023-12-10 09:56:23'),
(987, 'App\\Models\\User', 95, 'hydra-api-token', '5e5bcffe9122c0d4329f8b77fc88b9d541b289d15bc83f3f90df5b431c9f7231', '[\"user\"]', '2023-12-10 22:22:33', '2023-12-10 22:19:42', '2023-12-10 22:22:33'),
(988, 'App\\Models\\User', 90, 'hydra-api-token', '3b9dbac5130686b5744b517c62a9481528e3c568376dfbb60bc2251d1ea568f9', '[\"user\"]', '2023-12-11 06:50:10', '2023-12-11 06:50:07', '2023-12-11 06:50:10'),
(989, 'App\\Models\\User', 95, 'hydra-api-token', 'd26e7bf134652d4191ef9538e2d417c3d205f79fbc9251ec32db48211a08a407', '[\"user\"]', '2023-12-11 16:21:02', '2023-12-11 16:20:51', '2023-12-11 16:21:02'),
(990, 'App\\Models\\User', 90, 'hydra-api-token', '824e4b82cce1af6ebf976e8ce19800f5eaa3a274a4cdd689beac32a2ebb8a498', '[\"user\"]', '2023-12-12 10:26:47', '2023-12-12 09:56:36', '2023-12-12 10:26:47'),
(991, 'App\\Models\\User', 89, 'hydra-api-token', 'e550e8eb5e9b0b6ea97f3039be48d434b83c6b2685f6c5fed4b1ea5ac8b7f014', '[\"user\"]', '2023-12-12 10:06:20', '2023-12-12 09:59:43', '2023-12-12 10:06:20'),
(992, 'App\\Models\\User', 87, 'hydra-api-token', 'bd9f556f115873dc8f7e1d8bc54a9311a0a19a162ab92b13f701f9e03858188c', '[\"admin\"]', '2023-12-12 10:23:41', '2023-12-12 10:09:56', '2023-12-12 10:23:41'),
(993, 'App\\Models\\User', 90, 'hydra-api-token', 'de12651a078c158d1f1167e7a84949e78d7c20b6280d95eb6019ceeeb03a8483', '[\"user\"]', '2023-12-12 13:26:25', '2023-12-12 10:10:29', '2023-12-12 13:26:25'),
(994, 'App\\Models\\User', 87, 'hydra-api-token', 'b0029f6c9c05ed43eb4643683c57613b8b5f204c63c10604485dbaf402d4c220', '[\"admin\"]', '2023-12-12 13:26:22', '2023-12-12 10:25:32', '2023-12-12 13:26:22'),
(995, 'App\\Models\\User', 89, 'hydra-api-token', '8d1e3b353ce43fc1a727dc7596335a3e6ba22dbbd8f3d5ad174cccb79781773d', '[\"user\"]', '2023-12-12 10:30:11', '2023-12-12 10:27:00', '2023-12-12 10:30:11'),
(996, 'App\\Models\\User', 89, 'hydra-api-token', '523c6239ba8e9d3de31ecee28ca0f7e77e2c998735c433985533175c582c345f', '[\"user\"]', '2023-12-12 12:57:13', '2023-12-12 11:32:34', '2023-12-12 12:57:13'),
(997, 'App\\Models\\User', 95, 'hydra-api-token', 'fe48f81f0737a172f431530ec7d6cf7984be7cc08593c6ec5c45bbc66b66f730', '[\"user\"]', '2023-12-13 13:42:23', '2023-12-12 11:52:52', '2023-12-13 13:42:23'),
(998, 'App\\Models\\User', 95, 'hydra-api-token', '4806ca09051d872a868471e1927333ac5dabb8f19ec95a338592512daba668a6', '[\"user\"]', '2023-12-13 04:02:18', '2023-12-13 04:02:17', '2023-12-13 04:02:18'),
(999, 'App\\Models\\User', 95, 'hydra-api-token', '7bfc319bbe85b3429d77ee263e2bd38009ee341608a6efb9cb4ab0b7164a5b32', '[\"user\"]', '2023-12-13 05:04:54', '2023-12-13 05:04:03', '2023-12-13 05:04:54'),
(1000, 'App\\Models\\User', 95, 'hydra-api-token', 'd42d416ad2278ed29ab11581304b14fb1e632e38b91815f71107644bf98bdeb9', '[\"user\"]', '2023-12-14 07:29:32', '2023-12-13 06:17:28', '2023-12-14 07:29:32'),
(1001, 'App\\Models\\User', 96, 'hydra-api-token', '57ab69c30c6cb8821f7aeae712299c69d1624f1868911aee32df41fb13fef43f', '[\"user\"]', '2023-12-13 13:57:06', '2023-12-13 13:56:54', '2023-12-13 13:57:06'),
(1002, 'App\\Models\\User', 96, 'hydra-api-token', '79b80ffb3c0f8d64dd4f2ee7d17e508fc9b6e6d8f5fc287f096990b8f21b5126', '[\"user\"]', '2023-12-14 01:55:12', '2023-12-13 13:58:10', '2023-12-14 01:55:12'),
(1003, 'App\\Models\\User', 95, 'hydra-api-token', '7552175e2ecdf4cda471285f9f3a10edc1c66aecda4a23fb003c02625db7aeef', '[\"user\"]', '2023-12-14 03:10:09', '2023-12-14 03:09:35', '2023-12-14 03:10:09'),
(1004, 'App\\Models\\User', 95, 'hydra-api-token', '14587f3a3bb188b98583de08bf5252dd03528111d1bbbba982036d2d00bed0ad', '[\"user\"]', '2024-02-27 08:15:40', '2023-12-14 03:46:54', '2024-02-27 08:15:40'),
(1005, 'App\\Models\\User', 82, 'hydra-api-token', '90855ac8d1d5466ce2493824305e66ce584a2a1ca6b0df3c319082638379fb95', '[\"user\"]', '2023-12-14 07:22:43', '2023-12-14 07:22:42', '2023-12-14 07:22:43'),
(1006, 'App\\Models\\User', 95, 'hydra-api-token', '86850c25d49a5fadcc59b26929f04c060360f0650c74baa373640785fed4c588', '[\"user\"]', '2023-12-30 08:39:20', '2023-12-14 07:45:01', '2023-12-30 08:39:20'),
(1007, 'App\\Models\\User', 90, 'hydra-api-token', '73d110d629ccf056dc06a7f61fd47985f75d89fcad74ca497c4cc41495853e13', '[\"user\"]', '2023-12-14 08:28:18', '2023-12-14 08:28:17', '2023-12-14 08:28:18'),
(1008, 'App\\Models\\User', 89, 'hydra-api-token', 'f3e8bdd8e0f8ff6c417b039ed0a655a1a0a50433a59145628676c82de7713c49', '[\"user\"]', '2023-12-14 11:35:21', '2023-12-14 08:28:37', '2023-12-14 11:35:21'),
(1009, 'App\\Models\\User', 95, 'hydra-api-token', '1ca9cf1c3be838393e4569fb4a4e14efc8343b47429ade49c644e09923b1778f', '[\"user\"]', '2024-03-03 03:33:55', '2023-12-17 12:14:23', '2024-03-03 03:33:55'),
(1010, 'App\\Models\\User', 95, 'hydra-api-token', '49c1b544af6b3c81044f67c7b048611cd16e15e4d8649344fc4c51b2b97f32f2', '[\"user\"]', '2023-12-17 12:14:27', '2023-12-17 12:14:26', '2023-12-17 12:14:27'),
(1011, 'App\\Models\\User', 95, 'hydra-api-token', 'c90614d8e3c4ccb0766a2a652a41eb4f82599d30e506e4400fa8337ae5e9a818', '[\"user\"]', '2023-12-23 19:29:10', '2023-12-17 12:32:08', '2023-12-23 19:29:10'),
(1012, 'App\\Models\\User', 82, 'hydra-api-token', 'a23a51e75511bc11055cb9173ae2c8cd8ca10f74b938dbd4f606dd79cc1a13fb', '[\"user\"]', '2023-12-18 06:12:37', '2023-12-18 06:11:35', '2023-12-18 06:12:37'),
(1013, 'App\\Models\\User', 96, 'hydra-api-token', 'f74291557d8007ec3a37bdb088ec5059717589aa6580c5884047ed1605aa6bea', '[\"user\"]', '2023-12-18 06:13:00', '2023-12-18 06:12:55', '2023-12-18 06:13:00'),
(1014, 'App\\Models\\User', 95, 'hydra-api-token', 'b63f90e57c3318ad48b8e4dd3f2774b5574dc7dfb05e57e9b933c0bd9fe9a3ef', '[\"user\"]', '2023-12-18 06:30:29', '2023-12-18 06:13:43', '2023-12-18 06:30:29'),
(1015, 'App\\Models\\User', 95, 'hydra-api-token', 'e7f10c90d000c437e0b24a668cd41fa95b2b917ebc661f92b661936fd8ec68be', '[\"user\"]', '2023-12-19 09:07:41', '2023-12-19 08:57:06', '2023-12-19 09:07:41'),
(1016, 'App\\Models\\User', 95, 'hydra-api-token', 'bafa0e891261f100e83bfeef4f8b05d1b8fb99019f00eda42078e1bd14881181', '[\"user\"]', '2023-12-20 04:54:21', '2023-12-20 04:54:20', '2023-12-20 04:54:21'),
(1017, 'App\\Models\\User', 95, 'hydra-api-token', '26dc6c62ca5e6e15a59e7ec8a1e40bdcf9dabd1a0c395f33c9d194c0a62194dd', '[\"user\"]', NULL, '2023-12-20 04:54:21', '2023-12-20 04:54:21'),
(1018, 'App\\Models\\User', 95, 'hydra-api-token', 'c80de916ed379196614ce0a4f746e9e7e5f817bdd4f7ccb3bc921ccf46607728', '[\"user\"]', '2023-12-20 04:57:46', '2023-12-20 04:55:03', '2023-12-20 04:57:46'),
(1019, 'App\\Models\\User', 95, 'hydra-api-token', '68c64cbd24c5431642a55c42f9a859ec1cf83904f1418ed7a34beaf6d532182f', '[\"user\"]', '2023-12-20 05:02:08', '2023-12-20 04:59:28', '2023-12-20 05:02:08'),
(1020, 'App\\Models\\User', 95, 'hydra-api-token', '1dc0a7de1a14e7d32e5b25460eec4705c5aac9a38d0687e93fd7b6c1d131a4c4', '[\"user\"]', NULL, '2023-12-20 04:59:29', '2023-12-20 04:59:29'),
(1021, 'App\\Models\\User', 95, 'hydra-api-token', '19f111e4cd8c827185d3503d044ac3097fb26682218bf6603ac473d0799e2626', '[\"user\"]', '2023-12-20 07:27:24', '2023-12-20 07:27:24', '2023-12-20 07:27:24'),
(1022, 'App\\Models\\User', 95, 'hydra-api-token', 'edfb72ebe376b14d3dd0ce28fb5e54886c79d977803ed27156ef011a10fdc337', '[\"user\"]', '2023-12-20 07:37:02', '2023-12-20 07:35:31', '2023-12-20 07:37:02'),
(1023, 'App\\Models\\User', 95, 'hydra-api-token', 'b691ed5fad86540665bae7c666393420e55865de74453887ac4d5eb53815ffd2', '[\"user\"]', '2023-12-20 08:43:58', '2023-12-20 08:43:42', '2023-12-20 08:43:58'),
(1024, 'App\\Models\\User', 96, 'hydra-api-token', '46c7f24e24459cd79d257d323bc10def086bd468bdaf9b4a64f599831d04f7e6', '[\"user\"]', '2023-12-20 08:44:51', '2023-12-20 08:44:22', '2023-12-20 08:44:51'),
(1025, 'App\\Models\\User', 82, 'hydra-api-token', 'f6a1d56605847dceab9f1577a841766efa0402252dba156e170c5246ab690577', '[\"user\"]', '2023-12-20 08:47:56', '2023-12-20 08:46:26', '2023-12-20 08:47:56'),
(1026, 'App\\Models\\User', 96, 'hydra-api-token', '632b4f012d33eda471a5dd05f192c1fc9f99ca986457b69fc32f1d6c38149144', '[\"user\"]', '2023-12-20 08:50:39', '2023-12-20 08:49:12', '2023-12-20 08:50:39'),
(1027, 'App\\Models\\User', 96, 'hydra-api-token', 'cb7ceab670f6db195735c72a2e138e6df56e9f5254442c11c142e2cc4f7d5b2e', '[\"user\"]', '2023-12-20 08:55:31', '2023-12-20 08:55:29', '2023-12-20 08:55:31'),
(1028, 'App\\Models\\User', 96, 'hydra-api-token', 'd443d757d613b4c90d887ea59a8a284aa6963e9b3d9bfc11ad61a9766a7f6833', '[\"user\"]', '2023-12-20 11:57:23', '2023-12-20 09:04:04', '2023-12-20 11:57:23'),
(1029, 'App\\Models\\User', 95, 'hydra-api-token', 'd927a957929ef9042fd2a0457ef827815ae368093daaec37ad1d49ebd7c7dd7a', '[\"user\"]', '2023-12-20 13:35:12', '2023-12-20 09:05:00', '2023-12-20 13:35:12'),
(1030, 'App\\Models\\User', 96, 'hydra-api-token', '7f758dd3dd4f595cbc52f293caba2c537d3c3b6d96bd250ffa51883ca309df4f', '[\"user\"]', '2023-12-21 12:24:24', '2023-12-21 12:24:22', '2023-12-21 12:24:24'),
(1031, 'App\\Models\\User', 95, 'hydra-api-token', '5931a924704aefab80923e203ff246669cfab515eaaf428a5a074a75aa92ed22', '[\"user\"]', '2023-12-21 12:25:13', '2023-12-21 12:24:30', '2023-12-21 12:25:13'),
(1032, 'App\\Models\\User', 90, 'hydra-api-token', '8dd1905319e566ba0090e5ab523094228a3278d326ff2a755007e4e6f2fc192c', '[\"user\"]', '2023-12-22 07:20:38', '2023-12-22 06:17:21', '2023-12-22 07:20:38'),
(1033, 'App\\Models\\User', 96, 'hydra-api-token', '80025e62ebc31b86073b1b13260d46dc387ee8eaaddd71b0947c92adf71b3321', '[\"user\"]', '2024-03-01 23:10:33', '2023-12-23 19:29:52', '2024-03-01 23:10:33'),
(1034, 'App\\Models\\User', 95, 'hydra-api-token', '6891de19de00666d40d734c0671d4fc4e4e880138539e17ed0d07adf8414cb11', '[\"user\"]', '2023-12-24 17:23:08', '2023-12-24 17:18:36', '2023-12-24 17:23:08'),
(1035, 'App\\Models\\User', 96, 'hydra-api-token', '04c07445854e48fce67c60e98c7f98edadcee5f55a89d6924b48707a75f9e55d', '[\"user\"]', '2023-12-24 17:29:24', '2023-12-24 17:23:21', '2023-12-24 17:29:24'),
(1036, 'App\\Models\\User', 96, 'hydra-api-token', '896daea620326a15be8b4bbd202730b95c05801759508f25e4b6d1dd9cfc463c', '[\"user\"]', '2023-12-26 05:34:13', '2023-12-26 05:20:38', '2023-12-26 05:34:13'),
(1037, 'App\\Models\\User', 95, 'hydra-api-token', '8d67c3b6a1c15c5c2b8f0966f90abd50680d362f0be0acfaf949f2c62273cbfc', '[\"user\"]', '2023-12-26 05:36:29', '2023-12-26 05:25:26', '2023-12-26 05:36:29'),
(1038, 'App\\Models\\User', 82, 'hydra-api-token', 'e6855c41cc57821c78c72d5ccdd77ab51a6b7e8bcdd32ac3a49d3fe1c7f93a4d', '[\"user\"]', '2023-12-27 02:37:44', '2023-12-27 02:37:42', '2023-12-27 02:37:44'),
(1039, 'App\\Models\\User', 96, 'hydra-api-token', '43aad2089a68b90609d46e6450b0d5c55c2663fecfaa740dcd67e199570fcf84', '[\"user\"]', '2023-12-27 04:25:08', '2023-12-27 04:21:21', '2023-12-27 04:25:08'),
(1040, 'App\\Models\\User', 96, 'hydra-api-token', '665f48cb211129db136345b5f03a46bfd2d9161d79e93b5f126ddf73248ef627', '[\"user\"]', '2023-12-27 06:07:16', '2023-12-27 06:06:55', '2023-12-27 06:07:16'),
(1041, 'App\\Models\\User', 96, 'hydra-api-token', '45e14da2474153051a5943dc76050acf4b444b7f78845c56148d427be7e331a2', '[\"user\"]', '2023-12-27 07:28:08', '2023-12-27 07:28:06', '2023-12-27 07:28:08'),
(1042, 'App\\Models\\User', 95, 'hydra-api-token', '0cee5cd4599737452935695cce5ff3a4713025db1ac4f7cc678e10c14c8ddd08', '[\"user\"]', '2023-12-27 12:38:03', '2023-12-27 09:16:15', '2023-12-27 12:38:03'),
(1043, 'App\\Models\\User', 96, 'hydra-api-token', '3820214027fb927932d5bdbff559f859842ec43104a4b0976ed83381d0655165', '[\"user\"]', '2023-12-27 12:22:59', '2023-12-27 09:16:22', '2023-12-27 12:22:59'),
(1044, 'App\\Models\\User', 87, 'hydra-api-token', '58821320f28e3dc86faaf0006e001d3104117d39af7b5241fb331ce511e9ad25', '[\"admin\"]', '2023-12-27 12:44:10', '2023-12-27 12:43:24', '2023-12-27 12:44:10');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1045, 'App\\Models\\User', 82, 'hydra-api-token', 'baa85376fa0d016f4c2584e6e333561cc3c9396be991d21cb2256b9ae609c849', '[\"user\"]', '2023-12-28 02:23:26', '2023-12-28 02:23:21', '2023-12-28 02:23:26'),
(1046, 'App\\Models\\User', 95, 'hydra-api-token', '7d7b6c9937fd7085956a4eef4f88c919251beab639d574082e55252bec1125a5', '[\"user\"]', '2023-12-28 07:38:31', '2023-12-28 05:58:31', '2023-12-28 07:38:31'),
(1047, 'App\\Models\\User', 96, 'hydra-api-token', '9450aae0efe62278037aac33fcb90880a3d55ec6fdfb6403c4b09f09b502b326', '[\"user\"]', '2023-12-28 07:33:54', '2023-12-28 05:58:42', '2023-12-28 07:33:54'),
(1048, 'App\\Models\\User', 95, 'hydra-api-token', '9db8f66c2e72f7bc2c65fd44731fec500a53ded8f971d9d5023a925f164ecd99', '[\"user\"]', '2023-12-28 07:33:46', '2023-12-28 06:54:17', '2023-12-28 07:33:46'),
(1049, 'App\\Models\\User', 82, 'hydra-api-token', '35280b429b8609dfce38f1f880da5695bb9995bfe54248f7c936fc020b932cbd', '[\"user\"]', '2023-12-30 09:36:33', '2023-12-30 04:21:35', '2023-12-30 09:36:33'),
(1050, 'App\\Models\\User', 95, 'hydra-api-token', '9b923d899d75b1e7a04b3801bbfcc552c7ae4ed51229513289f13a986798c9f3', '[\"user\"]', '2023-12-30 06:32:46', '2023-12-30 06:08:17', '2023-12-30 06:32:46'),
(1051, 'App\\Models\\User', 96, 'hydra-api-token', 'b009273bf02e76991ee65ac2ba5128a6c727e4f2b669b8926076f48a38083251', '[\"user\"]', '2023-12-30 06:37:24', '2023-12-30 06:19:26', '2023-12-30 06:37:24'),
(1052, 'App\\Models\\User', 83, 'hydra-api-token', 'fe288403fd72fea21f2c6f33c163942e174e2b4cfacd90120594a37494c9a03d', '[\"user\"]', '2023-12-30 09:05:42', '2023-12-30 06:22:40', '2023-12-30 09:05:42'),
(1053, 'App\\Models\\User', 96, 'hydra-api-token', '540a7da85b6bf348c46be5329768ab8f73fc8bfe2e32af268b2d63a1393a7f53', '[\"user\"]', '2023-12-30 08:44:50', '2023-12-30 08:16:40', '2023-12-30 08:44:50'),
(1054, 'App\\Models\\User', 95, 'hydra-api-token', 'cd96b0b743d8dd0783e8e542a1a541168855df980f6486d040d108cfe1bb5b31', '[\"user\"]', '2023-12-30 09:36:30', '2023-12-30 08:23:08', '2023-12-30 09:36:30'),
(1055, 'App\\Models\\User', 96, 'hydra-api-token', '1208b494ff76b5e97efca30e99af77951d62af97f0d6358439d25e4d338bac75', '[\"user\"]', '2023-12-30 09:05:28', '2023-12-30 09:04:50', '2023-12-30 09:05:28'),
(1056, 'App\\Models\\User', 91, 'hydra-api-token', '7e85ae988c9eef8f033ddf44e0c0ff8b69dfbad6097c6db67c5ca63635f56190', '[\"user\"]', '2023-12-30 09:50:24', '2023-12-30 09:46:29', '2023-12-30 09:50:24'),
(1057, 'App\\Models\\User', 91, 'hydra-api-token', '9a97b807ed6dcdee3db19d626c4cfd4ce827093ea65bbe6992cf9ba89fdbe658', '[\"user\"]', '2024-02-15 10:54:20', '2023-12-30 09:49:19', '2024-02-15 10:54:20'),
(1058, 'App\\Models\\User', 91, 'hydra-api-token', 'ead9465a260d2a11392e43f32ed63276ff73891284e0e42670686212f008129e', '[\"user\"]', '2023-12-30 12:24:51', '2023-12-30 09:50:21', '2023-12-30 12:24:51'),
(1059, 'App\\Models\\User', 92, 'hydra-api-token', '3bb2bc9240b139ee3aee00c36ce58d03b7afc21312f2aee0c5d1a237ae8300a9', '[\"user\"]', '2023-12-30 11:21:59', '2023-12-30 09:50:31', '2023-12-30 11:21:59'),
(1060, 'App\\Models\\User', 96, 'hydra-api-token', '9fafa049a5e6a50746d8b5f162b62b6c041bcc62d0a0fe40a91cf53463b73601', '[\"user\"]', '2023-12-30 13:02:24', '2023-12-30 11:22:29', '2023-12-30 13:02:24'),
(1061, 'App\\Models\\User', 96, 'hydra-api-token', '20d462a620aad5031f2324ca106550d99df58c08002a90dd6cdd0113e64489ed', '[\"user\"]', '2023-12-31 07:11:02', '2023-12-31 05:49:53', '2023-12-31 07:11:02'),
(1062, 'App\\Models\\User', 82, 'hydra-api-token', '6a14dab672e05c191221f12d99526536e6c3bda1aa0b72ffbaa8382cef75020d', '[\"user\"]', '2023-12-31 09:10:09', '2023-12-31 07:02:10', '2023-12-31 09:10:09'),
(1063, 'App\\Models\\User', 96, 'hydra-api-token', 'c8f417d3f2bbc7d0de1b637a80752cce4870c64e581e24aa908496cdcf151e17', '[\"user\"]', '2023-12-31 07:35:07', '2023-12-31 07:04:53', '2023-12-31 07:35:07'),
(1064, 'App\\Models\\User', 96, 'hydra-api-token', '02b6ea2dc3660b366db13f709144e4fe0e06163f27e3abd25db4fb5e338f4a67', '[\"user\"]', '2023-12-31 07:54:44', '2023-12-31 07:35:37', '2023-12-31 07:54:44'),
(1065, 'App\\Models\\User', 96, 'hydra-api-token', 'e7110413cbc8ebc54aa98945a4d8e76db39c73b5f3d76c860909a1267b9fa155', '[\"user\"]', '2023-12-31 11:47:19', '2023-12-31 09:10:31', '2023-12-31 11:47:19'),
(1066, 'App\\Models\\User', 95, 'hydra-api-token', '38c7a0b05efacd2d2a2a20e6e6066759b5d7cb9fe421c3fba4b23da2b36d605f', '[\"user\"]', '2023-12-31 12:37:08', '2023-12-31 09:56:53', '2023-12-31 12:37:08'),
(1067, 'App\\Models\\User', 96, 'hydra-api-token', 'd76ab8eb6f813d668dd12338621534598568923cc182a8478fb4e89b34c35aa1', '[\"user\"]', '2023-12-31 11:33:22', '2023-12-31 10:52:50', '2023-12-31 11:33:22'),
(1068, 'App\\Models\\User', 95, 'hydra-api-token', '3cc85089543b57e827c530ab8bc614e7d84db6c1ae04ed1409dd0d397d2629b2', '[\"user\"]', '2023-12-31 11:27:09', '2023-12-31 10:53:04', '2023-12-31 11:27:09'),
(1069, 'App\\Models\\User', 90, 'hydra-api-token', 'cf00ad43e0aac95484cea7c8980f5934fc0b75912f47fe4c4ed5f0634d257dce', '[\"user\"]', '2024-01-01 05:50:09', '2024-01-01 05:49:41', '2024-01-01 05:50:09'),
(1070, 'App\\Models\\User', 95, 'hydra-api-token', 'ab910a32ea0e420a4521433ed7745622fe64fd84ef54b3432f3b8c088596cae8', '[\"user\"]', '2024-01-01 11:25:56', '2024-01-01 08:37:16', '2024-01-01 11:25:56'),
(1071, 'App\\Models\\User', 96, 'hydra-api-token', '40d7ba8786b1fc708aba7d95fc26af034682ab16d0bcfd2e72df6089788794bc', '[\"user\"]', '2024-01-01 11:27:11', '2024-01-01 08:37:34', '2024-01-01 11:27:11'),
(1072, 'App\\Models\\User', 96, 'hydra-api-token', 'c8e5180b2774a8a8a33466a994a555a1a9eb7288d8d57521e92cd44a8808d369', '[\"user\"]', '2024-01-02 07:51:40', '2024-01-02 06:59:06', '2024-01-02 07:51:40'),
(1073, 'App\\Models\\User', 95, 'hydra-api-token', 'b65659405d9b1c0d8face89c8f20c886f1e3a21595e490daa1ef83994cbaacbb', '[\"user\"]', '2024-01-02 12:59:56', '2024-01-02 06:59:14', '2024-01-02 12:59:56'),
(1074, 'App\\Models\\User', 95, 'hydra-api-token', '0c0c4c6535b1c8f672431460468aa2aea93df29188ff329b9656a66adac5fa8f', '[\"user\"]', '2024-01-03 12:50:49', '2024-01-03 06:34:35', '2024-01-03 12:50:49'),
(1075, 'App\\Models\\User', 96, 'hydra-api-token', '8569438109286b75a2de701efb644053e8da3d001987fe114390e7e2e83b4afb', '[\"user\"]', '2024-01-03 12:29:21', '2024-01-03 06:34:51', '2024-01-03 12:29:21'),
(1076, 'App\\Models\\User', 96, 'hydra-api-token', 'ab3480cfd358e93011ab8b3bfd20e3ad807b63e218a635c2beed1ca6a104803a', '[\"user\"]', '2024-01-03 09:35:57', '2024-01-03 09:35:41', '2024-01-03 09:35:57'),
(1077, 'App\\Models\\User', 95, 'hydra-api-token', 'b552b778aff53cf2b8a91b912a159ab2eaefdc18998df50269ff57da1f6387c3', '[\"user\"]', '2024-01-03 10:47:10', '2024-01-03 10:30:51', '2024-01-03 10:47:10'),
(1078, 'App\\Models\\User', 96, 'hydra-api-token', 'ec95de59177432eb241144c889f84de8b270b830f32dcd7385a85747347d1791', '[\"user\"]', '2024-01-03 10:41:54', '2024-01-03 10:31:22', '2024-01-03 10:41:54'),
(1079, 'App\\Models\\User', 96, 'hydra-api-token', 'f320701acaf70983e2a848ea5be7d7e3c7d8d0831003d36d083d0edfdb78db1c', '[\"user\"]', '2024-01-04 09:15:30', '2024-01-04 09:15:28', '2024-01-04 09:15:30'),
(1080, 'App\\Models\\User', 95, 'hydra-api-token', 'c11dc61ddf44e7e6fc07aec0636e9c9dcc9a582888841f692e364074d9de968b', '[\"user\"]', '2024-01-04 09:18:07', '2024-01-04 09:16:38', '2024-01-04 09:18:07'),
(1081, 'App\\Models\\User', 95, 'hydra-api-token', 'a1fcb5ad647360d10273c502f94e457eb5dcf9a5610731cf37ba04cbc90a365a', '[\"user\"]', '2024-01-04 09:48:21', '2024-01-04 09:48:09', '2024-01-04 09:48:21'),
(1082, 'App\\Models\\User', 96, 'hydra-api-token', '6ef6b7d9e3e01e672052536f48b6f46cdbe3235c08f30027b85a3604325cff86', '[\"user\"]', '2024-01-04 09:49:53', '2024-01-04 09:48:35', '2024-01-04 09:49:53'),
(1083, 'App\\Models\\User', 95, 'hydra-api-token', 'f3409dd914562f1040c0f24a16a4d88195eef151074d939913ad4b4adfed703c', '[\"user\"]', '2024-01-04 11:05:58', '2024-01-04 09:50:16', '2024-01-04 11:05:58'),
(1084, 'App\\Models\\User', 82, 'hydra-api-token', '0f6dab7645753525e03f4086d74954bfb95e62611d68a7cd40a0417bfa969000', '[\"user\"]', '2024-01-05 16:12:04', '2024-01-05 16:12:02', '2024-01-05 16:12:04'),
(1085, 'App\\Models\\User', 96, 'hydra-api-token', '90654d7770a9e84412d28cc1e8f88140521c0232f56b809e3fcabde73de0e870', '[\"user\"]', '2024-01-11 12:57:31', '2024-01-11 12:46:12', '2024-01-11 12:57:31'),
(1086, 'App\\Models\\User', 95, 'hydra-api-token', '3c59a882780042b12def4adb4091c616dca986c47a8b3327a7662516c519d5c7', '[\"user\"]', '2024-03-04 15:25:16', '2024-01-15 15:58:01', '2024-03-04 15:25:16'),
(1087, 'App\\Models\\User', 95, 'hydra-api-token', '687b286873f66e9b4fc2426a6b05d83dfca7296f2f78a47f2ff99d71772dc665', '[\"user\"]', '2024-01-20 11:29:26', '2024-01-20 05:12:34', '2024-01-20 11:29:26'),
(1088, 'App\\Models\\User', 95, 'hydra-api-token', 'b19954d93bc0aa13b27ce9db4bbeb844097367e449bb489700ae2aed129a0044', '[\"user\"]', '2024-01-22 09:18:47', '2024-01-22 09:02:49', '2024-01-22 09:18:47'),
(1089, 'App\\Models\\User', 96, 'hydra-api-token', '2fb914666cca8e1066e819b8ee9064312ee2d8bc1fd3bb6b7ec945903acd2e35', '[\"user\"]', '2024-01-22 12:20:38', '2024-01-22 09:18:54', '2024-01-22 12:20:38'),
(1090, 'App\\Models\\User', 96, 'hydra-api-token', '2d65f9621bf9667ae4136f18683ff3626caf5537f801d24f4bbcf5e0fc5d5d2b', '[\"user\"]', '2024-01-22 09:20:13', '2024-01-22 09:19:32', '2024-01-22 09:20:13'),
(1091, 'App\\Models\\User', 95, 'hydra-api-token', '8505fa90a47d60d7c686c118ed555b2a9742c5e3576130dcc50b96d5d0b626dc', '[\"user\"]', '2024-01-22 11:22:57', '2024-01-22 09:19:53', '2024-01-22 11:22:57'),
(1092, 'App\\Models\\User', 96, 'hydra-api-token', '199cf0b4ef456171204e3d851e2b255bbdb2032167373339cc0e0e6c149f7df2', '[\"user\"]', '2024-01-24 10:29:58', '2024-01-24 10:28:14', '2024-01-24 10:29:58'),
(1093, 'App\\Models\\User', 95, 'hydra-api-token', 'ec9e7db2086e33ef644932bbba2680976ed7bf569a36129aa3284e0e21ed6894', '[\"user\"]', '2024-01-24 15:44:41', '2024-01-24 15:44:40', '2024-01-24 15:44:41'),
(1095, 'App\\Models\\User', 1, 'hydra-api-token', 'e89876b096aba99b38e66768913b8d003816f4a52e7ebd7f8a34fcc3d46116be', '[\"admin\"]', NULL, '2024-01-25 08:31:30', '2024-01-25 08:31:30'),
(1096, 'App\\Models\\User', 1, 'hydra-api-token', '49db902c8dff5c9dece7b52dc749969009b1621a90cc8bd1de890f7fbdb5b64b', '[\"admin\"]', NULL, '2024-01-25 10:24:07', '2024-01-25 10:24:07'),
(1098, 'App\\Models\\User', 1, 'hydra-api-token', 'e92bb05209ea8c6266218ef3c7bd7f7d9beb340bd8ab72b3ed8139693e18fee2', '[\"admin\"]', '2024-01-28 11:34:02', '2024-01-25 12:03:14', '2024-01-28 11:34:02'),
(1099, 'App\\Models\\User', 96, 'hydra-api-token', 'a10367e92de0d3421200f0539c8f0b9f06daa396279754db2165f361f075c168', '[\"user\"]', '2024-01-29 10:12:09', '2024-01-29 10:12:02', '2024-01-29 10:12:09'),
(1100, 'App\\Models\\User', 95, 'hydra-api-token', '40b4fe69116f0a53d708be00d25d0d027d894992ee4f24e260fc2e30cc53c5c2', '[\"user\"]', '2024-02-05 22:01:14', '2024-02-05 22:01:13', '2024-02-05 22:01:14'),
(1101, 'App\\Models\\User', 1, 'hydra-api-token', '5919495bdf1ac58d316991d3af2e8b7fe2adf715b48568d32ba56128cba24b85', '[\"admin\"]', '2024-02-08 09:03:57', '2024-02-08 07:43:22', '2024-02-08 09:03:57'),
(1102, 'App\\Models\\User', 95, 'hydra-api-token', 'ad283a4f4b4a4c54172f7a6b899cdd9cb95be42d6178d7f9553cd0e434c4a4e8', '[\"user\"]', '2024-02-14 03:37:32', '2024-02-14 03:37:31', '2024-02-14 03:37:32'),
(1103, 'App\\Models\\User', 96, 'hydra-api-token', '1426dc8bdf2bbb3cb19a33639b2caa88a90ba1e9275422b66c0a7f4dbeb2ea22', '[\"user\"]', '2024-02-14 06:27:43', '2024-02-14 06:27:42', '2024-02-14 06:27:43'),
(1104, 'App\\Models\\User', 96, 'hydra-api-token', '6ef252de06f742c0479816f473d9d7cfece55b3bbab6103ae4b8b76fe006054e', '[\"user\"]', '2024-02-14 06:28:48', '2024-02-14 06:28:47', '2024-02-14 06:28:48'),
(1105, 'App\\Models\\User', 95, 'hydra-api-token', 'ced9426a150b5565a89c8c1832bdc5f9d872d7425c648afc00457d65497284c1', '[\"user\"]', '2024-02-14 08:51:10', '2024-02-14 06:29:46', '2024-02-14 08:51:10'),
(1106, 'App\\Models\\User', 95, 'hydra-api-token', '6af277f4b95e5ccea5e1d46113804f213122a0aadf088f50e552c22f3f9284a5', '[\"user\"]', '2024-02-15 10:59:10', '2024-02-15 10:31:38', '2024-02-15 10:59:10'),
(1107, 'App\\Models\\User', 95, 'hydra-api-token', 'ae23f96f9386de6c164b0ccd148c604ccdc2a3918925e701cd2e2e5d913b162e', '[\"user\"]', '2024-02-15 10:41:55', '2024-02-15 10:34:42', '2024-02-15 10:41:55'),
(1108, 'App\\Models\\User', 96, 'hydra-api-token', '17cee05b770d7c389fea264bd0674ad43d20d6327d6e099b41359160ce3e2857', '[\"user\"]', '2024-02-15 10:49:46', '2024-02-15 10:42:08', '2024-02-15 10:49:46'),
(1109, 'App\\Models\\User', 95, 'hydra-api-token', '87113169cd86b3b99c388aab199341f7f5b0ebf36b40f424b7655b916de47815', '[\"user\"]', '2024-03-03 06:23:02', '2024-02-15 10:54:37', '2024-03-03 06:23:02'),
(1110, 'App\\Models\\User', 95, 'hydra-api-token', 'b64a9a24d4d75010824572c7af7f26e35856bfd73afab36d41dfcd299a6d6e20', '[\"user\"]', '2024-02-15 10:58:55', '2024-02-15 10:57:51', '2024-02-15 10:58:55'),
(1111, 'App\\Models\\User', 95, 'hydra-api-token', '51dbf1ee6274ae0871a780ece773136499e6c7120cbd1766298367b8170d8e1d', '[\"user\"]', '2024-02-15 11:42:38', '2024-02-15 11:42:35', '2024-02-15 11:42:38'),
(1112, 'App\\Models\\User', 95, 'hydra-api-token', '7abcc1b293374ee78afe99d40d1160d4bc8e85d387dd23fbc2158fcc5e86bdc6', '[\"user\"]', '2024-02-15 11:42:53', '2024-02-15 11:42:51', '2024-02-15 11:42:53'),
(1113, 'App\\Models\\User', 96, 'hydra-api-token', '7234771934c5ecde74ce9e5ad4863ac5160cb5dd2ca8a4929f317ad7c5aea456', '[\"user\"]', '2024-02-15 11:43:33', '2024-02-15 11:43:30', '2024-02-15 11:43:33'),
(1114, 'App\\Models\\User', 96, 'hydra-api-token', 'fca9ca69d48ba231ee548f50e865f294624f95627d52709ea76412805d80e7fa', '[\"user\"]', '2024-02-15 12:13:25', '2024-02-15 12:05:36', '2024-02-15 12:13:25'),
(1115, 'App\\Models\\User', 96, 'hydra-api-token', '52a1729bdd58321ad9cdd591d839b8a5fbc880189731f60e1841c5356265665e', '[\"user\"]', '2024-02-20 05:14:09', '2024-02-20 05:14:02', '2024-02-20 05:14:09'),
(1116, 'App\\Models\\User', 95, 'hydra-api-token', '4c5d7635cb95f0f3168c7fdca936cf6ecc4189431c74a484f18ee988f2e676ed', '[\"user\"]', '2024-02-22 05:27:23', '2024-02-22 05:27:02', '2024-02-22 05:27:23'),
(1117, 'App\\Models\\User', 95, 'hydra-api-token', '778ba4a15f9d56f8dd6b2fe748a528e54160ce63640ed9413a73790aba0fe3da', '[\"user\"]', '2024-02-25 03:01:43', '2024-02-25 03:01:41', '2024-02-25 03:01:43'),
(1118, 'App\\Models\\User', 95, 'hydra-api-token', '6cbb42a37a7bd7f5eb078c4bdc11349bb276bd72a42bc695b181157179345adb', '[\"user\"]', NULL, '2024-02-25 03:01:43', '2024-02-25 03:01:43'),
(1119, 'App\\Models\\User', 95, 'hydra-api-token', '70047fdd12c8b7f5ab5e898a2d4e997852fb4b52892be29c05b8a9c6e347298f', '[\"user\"]', '2024-02-25 05:37:00', '2024-02-25 05:31:49', '2024-02-25 05:37:00'),
(1120, 'App\\Models\\User', 96, 'hydra-api-token', 'f20c8946d6fe5114439df1161214231f2da9197b534af0bdc89f2ea1a05b9993', '[\"user\"]', '2024-02-25 09:17:39', '2024-02-25 09:16:33', '2024-02-25 09:17:39'),
(1121, 'App\\Models\\User', 95, 'hydra-api-token', 'b452fac88bdc83164e83010fe5b0e8c25ce22de40d422064557a1d0ecce6609f', '[\"user\"]', '2024-02-25 15:32:56', '2024-02-25 15:31:19', '2024-02-25 15:32:56'),
(1122, 'App\\Models\\User', 95, 'hydra-api-token', '4091bb2f03bd84bd5d3aa40974a7c893917ae6116c8aef71f58f5bef75ed7635', '[\"user\"]', NULL, '2024-02-25 15:31:21', '2024-02-25 15:31:21'),
(1123, 'App\\Models\\User', 96, 'hydra-api-token', '00be7a109a926903405b28cb9b95e2fbb48bcb2cda1cee32bbdd5993887623e3', '[\"user\"]', '2024-02-27 04:55:06', '2024-02-27 04:32:37', '2024-02-27 04:55:06'),
(1124, 'App\\Models\\User', 96, 'hydra-api-token', '0910d7ce132126e789fd97295f9600dc28f9626a4764d9352cb602f92c83717b', '[\"user\"]', '2024-02-28 11:36:38', '2024-02-28 05:49:52', '2024-02-28 11:36:38'),
(1125, 'App\\Models\\User', 95, 'hydra-api-token', '1960c7bff1375b0ec1f1ebbc08304b85e3d2f43f05f494924007a93d79ffe2f2', '[\"user\"]', '2024-02-28 11:36:47', '2024-02-28 07:17:45', '2024-02-28 11:36:47'),
(1126, 'App\\Models\\User', 96, 'hydra-api-token', '940a12a4f7d058b2cc5452e25d2baf5bd1056a124af50467b920b5eb4ed33232', '[\"user\"]', '2024-03-02 11:34:37', '2024-03-02 11:33:46', '2024-03-02 11:34:37'),
(1127, 'App\\Models\\User', 96, 'hydra-api-token', '6efe2ce7428eb04efb38492af69e64d609edb73898bb5dadf829c08f5d931875', '[\"user\"]', '2024-03-03 11:10:05', '2024-03-03 05:07:11', '2024-03-03 11:10:05'),
(1128, 'App\\Models\\User', 95, 'hydra-api-token', '249ea048c89f7c4e63fd33c6e075fed46a47e624d34ae3af9ff335830534e7f7', '[\"user\"]', '2024-03-06 04:53:41', '2024-03-06 04:50:23', '2024-03-06 04:53:41'),
(1129, 'App\\Models\\User', 95, 'hydra-api-token', '5d1f630cb3e2ac28768d9f898fa4688ca1e410f1efed2e55a7701217049f52cd', '[\"user\"]', NULL, '2024-03-06 04:50:23', '2024-03-06 04:50:23'),
(1130, 'App\\Models\\User', 96, 'hydra-api-token', '5b692b514a2a4e2e739eac9f0fc14d193c254c29ab7dc27444df7cfbe92c96f7', '[\"user\"]', '2024-04-01 02:38:49', '2024-04-01 02:38:43', '2024-04-01 02:38:49'),
(1131, 'App\\Models\\User', 95, 'hydra-api-token', '7a4bd2c33e65a765d5046b367eded7c9dbd8d06b782789329812df41b6f9370d', '[\"user\"]', '2024-04-01 03:10:30', '2024-04-01 02:39:05', '2024-04-01 03:10:30'),
(1132, 'App\\Models\\User', 95, 'hydra-api-token', '499c6e8e92aef1db70b059d240f50c2d777eba2fc061726251bce1e2f6e04842', '[\"user\"]', '2024-04-01 03:55:52', '2024-04-01 03:13:10', '2024-04-01 03:55:52');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` bigint UNSIGNED NOT NULL,
  `organization_id` int NOT NULL,
  `user_id` int NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `user_limit` int NOT NULL DEFAULT '1',
  `actual_price` int NOT NULL,
  `sell_price` int NOT NULL,
  `coupon_id` int DEFAULT NULL,
  `payment_id` int DEFAULT NULL,
  `subscription_details_id` bigint DEFAULT NULL,
  `payment_attempt_id` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_attempts`
--

CREATE TABLE `purchase_attempts` (
  `id` bigint UNSIGNED NOT NULL,
  `organization_id` int NOT NULL,
  `user_id` int NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `user_limit` int NOT NULL DEFAULT '1',
  `actual_price` int NOT NULL,
  `sell_price` int NOT NULL,
  `coupon_id` int DEFAULT NULL,
  `payment_id` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '2' COMMENT '0:failed, 1:success, 2: pending',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin', '2023-06-22 11:34:59', '2023-06-22 11:34:59'),
(2, 'User', 'user', '2023-06-22 11:34:59', '2023-06-22 11:34:59'),
(3, 'Customer', 'customer', '2023-06-22 11:34:59', '2023-06-22 11:34:59'),
(4, 'Editor', 'editor', '2023-06-22 11:34:59', '2023-06-22 11:34:59'),
(5, 'All', '*', '2023-06-22 11:34:59', '2023-06-22 11:34:59'),
(6, 'Super Admin', 'super-admin', '2023-06-22 11:34:59', '2023-06-22 11:34:59');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint UNSIGNED NOT NULL,
  `organization_id` int DEFAULT NULL,
  `is_2fa` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_api_key` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_notification` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_push_notification` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_sms_notification` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_email_notification` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_sso` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_social_login` tinyint NOT NULL DEFAULT '0',
  `is_direct_purchase` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `contact_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75',
  `contact_mail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'BDT',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `organization_id`, `is_2fa`, `is_api_key`, `is_notification`, `is_push_notification`, `is_sms_notification`, `is_email_notification`, `is_sso`, `is_social_login`, `is_direct_purchase`, `contact_number`, `logo`, `contact_mail`, `currency`, `created_at`, `updated_at`) VALUES
(1, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, '1234567890', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'example1@example.com', 'BDT', '2023-06-27 09:06:38', '2023-06-27 09:06:38'),
(2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, '9876543210', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'example2@example.com', 'USD', '2023-06-27 09:06:38', '2023-06-27 09:06:38'),
(3, 3, 1, 0, 1, 1, 0, 1, 0, 0, 1, '9876543210', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'example3@example.com', 'EUR', '2023-06-27 09:06:38', '2023-06-27 09:06:38'),
(4, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, '1234567890', 'http://saas-backend.test/images/1c14a2ab-21a3-40c4-854f-f338c2b5325b.webp', 'example1@example.com', 'BDT', '2023-06-27 09:06:38', '2023-07-06 12:07:32'),
(7, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, '017328439243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'aaa@gmail.com', 'BDT', '2023-07-07 03:07:09', '2023-07-07 03:07:09'),
(8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, '017328439243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'cccc@gmail.com', 'BDT', '2023-07-08 03:17:08', '2023-07-08 03:17:08'),
(9, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, '017328439243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'aaaadadacsc@gmail.com', 'BDT', '2023-07-08 09:20:49', '2023-07-08 09:20:49'),
(10, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, '017328439243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'aaaacsc@gmail.com', 'BDT', '2023-07-08 09:22:59', '2023-07-08 09:22:59'),
(11, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'aaaacc@gmail.com', 'BDT', '2023-07-08 09:27:16', '2023-07-08 09:27:16'),
(12, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'aaacc@gmail.com', 'BDT', '2023-07-08 09:38:25', '2023-07-08 09:38:25'),
(13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'xxx@gmail.com', 'BDT', '2023-07-08 09:40:15', '2023-07-08 09:40:15'),
(14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'zzz@gmail.com', 'BDT', '2023-07-08 03:41:12', '2023-07-08 03:41:12'),
(15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'zxc@gmail.com', 'BDT', '2023-07-08 03:42:01', '2023-07-08 03:42:01'),
(16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'ccc@gmail.com', 'BDT', '2023-07-08 09:45:51', '2023-07-08 09:45:51'),
(17, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'vvssv@gmail.com', 'BDT', '2023-07-08 04:31:53', '2023-07-08 04:31:53'),
(18, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'mm@gmail.com', 'BDT', '2023-07-11 18:10:24', '2023-07-11 18:10:24'),
(19, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'kajolchaki@gmail.com', 'BDT', '2023-07-11 19:15:09', '2023-07-11 19:15:09'),
(20, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'kajolchaki@gmail.com', 'BDT', '2023-07-11 13:16:41', '2023-07-11 13:16:41'),
(21, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'kajolchaki@gmail.com', 'BDT', '2023-07-11 13:18:43', '2023-07-11 13:18:43'),
(22, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'kajolchaki@gmail.com', 'BDT', '2023-07-11 13:20:19', '2023-07-11 13:20:19'),
(23, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01111111199', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'sandy@gmail.com', 'BDT', '2023-07-13 15:45:43', '2023-07-13 15:45:43'),
(24, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'prosanta.k.c@gmail.com', 'BDT', '2023-07-22 12:14:06', '2023-07-22 12:14:06'),
(25, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705541561', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'dev.arafat.zaimahtech@gmail.com', 'BDT', '2023-08-05 03:02:15', '2023-08-05 03:02:15'),
(26, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705541561', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'dev.arafat.zaimahtech@gmail.com', 'BDT', '2023-08-05 09:41:28', '2023-08-05 09:41:28'),
(27, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705541561', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'dev.arafat.zaimahtech@gmail.com', 'BDT', '2023-08-05 03:44:11', '2023-08-05 03:44:11'),
(28, 73, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705541561', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'dev.arafat.zaimahtech@gmail.com', 'BDT', '2023-08-14 09:20:03', '2023-08-14 09:20:03'),
(29, 74, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01554885133', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'pos@gmail.com', 'BDT', '2023-10-15 05:43:07', '2023-10-15 05:43:07'),
(30, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01554885166', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'mijba@spreehabd.org', 'BDT', '2023-10-18 11:11:06', '2023-10-18 11:11:06'),
(31, 76, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01554885185', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'zahid_badda@amarlab.com', 'BDT', '2023-10-25 06:51:27', '2023-10-25 06:51:27'),
(32, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01554885178', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'zahid_rayerbazar@amarlab.com', 'BDT', '2023-10-25 06:57:20', '2023-10-25 06:57:20'),
(33, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01554885199', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'zahid_kalachadpur@amarlab.com', 'BDT', '2023-10-25 07:03:36', '2023-10-25 07:03:36'),
(34, 79, 0, 0, 0, 0, 0, 0, 0, 0, 0, '015548321', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'imran@gmail.com', 'BDT', '2023-11-06 09:30:03', '2023-11-06 09:30:03'),
(35, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, '+8801714131050', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'jabedakhterbkk@gmail.com', 'BDT', '2024-02-08 08:00:58', '2024-02-08 08:00:58');

-- --------------------------------------------------------

--
-- Table structure for table `storage_sizes`
--

CREATE TABLE `storage_sizes` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int NOT NULL COMMENT 'size in mb',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `storage_sizes`
--

INSERT INTO `storage_sizes` (`id`, `name`, `size`, `created_at`, `updated_at`) VALUES
(1, '1 GB', 1028, '2023-06-22 11:40:52', '2023-06-22 11:40:52'),
(2, '5 GB', 5140, '2023-06-22 11:41:12', '2023-06-22 11:43:17'),
(3, '5 GB', 5156, '2023-06-22 11:41:31', '2023-06-22 11:41:31'),
(4, '5 GB', 5140, '2023-06-22 13:49:02', '2023-06-22 13:49:02');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_cancel_requests`
--

CREATE TABLE `subscription_cancel_requests` (
  `id` bigint UNSIGNED NOT NULL,
  `purchase_id` int NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_amount` int NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '2' COMMENT '0:reject, 1:success, 2: pending',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_details`
--

CREATE TABLE `subscription_details` (
  `id` bigint UNSIGNED NOT NULL,
  `organization_id` int NOT NULL,
  `user_id` int NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0:inactive 1:active',
  `start_date` date DEFAULT NULL,
  `user_limit` int NOT NULL DEFAULT '1',
  `end_date` date DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription_details`
--

INSERT INTO `subscription_details` (`id`, `organization_id`, `user_id`, `subscription_plan_id`, `status`, `start_date`, `user_limit`, `end_date`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 1, 1, '2023-06-22', 10, '2023-08-19', NULL, '2023-06-22 12:11:43', '2023-06-22 12:11:43'),
(2, 3, 7, 1, 1, '2023-07-07', 10, '2023-08-07', NULL, '2023-07-07 03:07:09', '2023-07-07 03:07:09'),
(3, 4, 8, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 03:17:08', '2023-07-08 03:17:08'),
(4, 6, 9, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:20:49', '2023-07-08 09:20:49'),
(5, 7, 10, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:22:59', '2023-07-08 09:22:59'),
(6, 8, 11, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:27:16', '2023-07-08 09:27:16'),
(7, 11, 12, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:38:25', '2023-07-08 09:38:25'),
(8, 13, 13, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:40:15', '2023-07-08 09:40:15'),
(9, 14, 14, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 03:41:12', '2023-07-08 03:41:12'),
(10, 15, 15, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 03:42:01', '2023-07-08 03:42:01'),
(11, 16, 16, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:45:51', '2023-07-08 09:45:51'),
(12, 17, 17, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 04:31:53', '2023-07-08 04:31:53'),
(13, 20, 18, 1, 1, '2023-07-11', 10, '2023-08-10', NULL, '2023-07-11 18:10:24', '2023-07-11 18:10:24'),
(14, 21, 19, 1, 1, '2023-07-11', 10, '2023-08-10', NULL, '2023-07-11 19:15:09', '2023-07-11 19:15:09'),
(15, 22, 20, 1, 1, '2023-07-11', 10, '2023-08-10', NULL, '2023-07-11 13:16:41', '2023-07-11 13:16:41'),
(16, 23, 21, 1, 1, '2023-07-11', 10, '2023-08-10', NULL, '2023-07-11 13:18:43', '2023-07-11 13:18:43'),
(17, 25, 22, 1, 1, '2023-07-11', 10, '2023-08-02', NULL, '2023-07-11 13:20:19', '2023-07-11 13:20:19'),
(18, 26, 23, 1, 1, '2023-07-13', 10, '2023-08-12', NULL, '2023-07-13 15:45:43', '2023-07-13 15:45:43'),
(19, 30, 38, 1, 1, '2023-07-22', 10, '2023-08-21', NULL, '2023-07-22 12:14:06', '2023-07-22 12:14:06'),
(20, 44, 52, 1, 1, '2023-08-05', 10, '2023-09-04', NULL, '2023-08-05 03:02:15', '2023-08-05 03:02:15'),
(21, 66, 73, 1, 1, '2023-08-05', 10, '2023-09-04', NULL, '2023-08-05 09:41:28', '2023-08-05 09:41:28'),
(22, 68, 74, 1, 1, '2023-08-05', 10, '2023-09-04', NULL, '2023-08-05 03:44:11', '2023-08-05 03:44:11'),
(23, 73, 79, 1, 1, '2023-08-14', 10, '2023-09-13', NULL, '2023-08-14 09:20:03', '2023-08-14 09:20:03'),
(24, 74, 80, 1, 1, '2023-10-15', 10, '2023-11-14', NULL, '2023-10-15 05:43:07', '2023-10-15 05:43:07'),
(25, 75, 81, 1, 1, '2023-10-18', 10, '2023-11-17', NULL, '2023-10-18 11:11:06', '2023-10-18 11:11:06'),
(26, 76, 85, 1, 1, '2023-10-25', 10, '2023-11-24', NULL, '2023-10-25 06:51:27', '2023-10-25 06:51:27'),
(27, 77, 86, 1, 1, '2023-10-25', 10, '2023-11-24', NULL, '2023-10-25 06:57:20', '2023-10-25 06:57:20'),
(28, 78, 87, 1, 1, '2023-10-25', 10, '2023-11-24', NULL, '2023-10-25 07:03:36', '2023-10-25 07:03:36'),
(29, 79, 93, 1, 1, '2023-11-06', 10, '2023-12-06', NULL, '2023-11-06 09:30:03', '2023-11-06 09:30:03'),
(30, 80, 97, 1, 1, '2024-02-08', 10, '2024-03-09', NULL, '2024-02-08 08:00:58', '2024-02-08 08:00:58');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plans`
--

CREATE TABLE `subscription_plans` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `validity_id` int NOT NULL,
  `user_limit` int NOT NULL DEFAULT '1',
  `storage_limit_id` int NOT NULL,
  `price` int NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0:inactive 1:active 2:deleted',
  `type` tinyint NOT NULL DEFAULT '1' COMMENT ' 1:regular 2:special',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription_plans`
--

INSERT INTO `subscription_plans` (`id`, `name`, `validity_id`, `user_limit`, `storage_limit_id`, `price`, `details`, `status`, `type`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Free with feature', 1, 5, 1, 100, 'Access anytime and anywhere Manage personal health records Upload documents and images Search Doctors', 0, 1, NULL, '2023-06-22 13:51:25', '2024-01-25 11:12:27'),
(2, 'Free 3', 1, 1, 3, 0, 'Access anytime and anywhere Manage personal health records Upload documents and images Search Doctors', 0, 1, NULL, '2023-07-03 10:32:41', '2024-01-25 11:12:24'),
(3, 'Premium with feature', 2, 1, 2, 0, 'Access anytime and anywhere Manage personal health records Upload documents and images Search Doctors', 0, 1, NULL, '2023-07-03 10:32:55', '2024-01-25 11:12:20'),
(4, 'Premium with', 2, 10, 2, 1110, 'Access anytime and anywhere Manage personal health records Upload documents and images Search Doctors', 0, 1, NULL, '2023-07-03 10:33:00', '2024-01-25 11:12:16'),
(5, 'GreatPharma-Premium', 1, 100, 2, 0, 'Everything in Specialist, please contact us.', 1, 2, NULL, '2023-07-03 10:33:09', '2024-01-25 11:12:03'),
(6, 'GreatPharma-Standard', 1, 20, 3, 0, 'Fast Invoicing\nStock Management\nSmooth Returns\nPurchase Management\nVendor Management\n4 Ways real-time Communication (SMS*, Email, WhatsApp & Notification)\nPatient Feedback Collection\nBar Code Scan\nRack Management\nAdvanced integrated report- MIS\nWeb and Mobile App Access\nSMS Notification*', 1, 1, NULL, '2023-07-03 10:33:20', '2024-01-25 11:11:30'),
(7, 'GreatPharma-General', 1, 5, 3, 10000, 'Fast Invoicing\nStock Management\nSmooth Returns\nPurchase Management\nVendor Management\n4 Ways real-time Communication (SMS*, Email, WhatsApp & Notification)\nPatient Feedback Collection\nBar Code Scan\nBar Code Scan\nAdvanced integrated report- MIS\nWeb and Mobile App Access', 1, 1, NULL, '2023-07-04 08:45:51', '2024-01-27 05:05:38');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plan_features`
--

CREATE TABLE `subscription_plan_features` (
  `id` bigint UNSIGNED NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `feature_id` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription_plan_features`
--

INSERT INTO `subscription_plan_features` (`id`, `subscription_plan_id`, `feature_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL, NULL),
(2, 2, 1, NULL, NULL, NULL),
(3, 3, 1, NULL, NULL, NULL),
(4, 4, 1, NULL, NULL, NULL),
(7, 2, 2, NULL, NULL, NULL),
(9, 7, 4, NULL, NULL, NULL),
(10, 6, 4, NULL, NULL, NULL),
(12, 7, 3, NULL, NULL, NULL),
(13, 7, 2, NULL, NULL, NULL),
(14, 7, 1, NULL, NULL, NULL),
(15, 7, 5, NULL, NULL, NULL),
(16, 7, 6, NULL, NULL, NULL),
(17, 7, 7, NULL, NULL, NULL),
(18, 7, 8, NULL, NULL, NULL),
(19, 7, 10, NULL, NULL, NULL),
(20, 7, 11, NULL, NULL, NULL),
(21, 6, 3, NULL, NULL, NULL),
(22, 6, 2, NULL, NULL, NULL),
(23, 6, 1, NULL, NULL, NULL),
(24, 6, 5, NULL, NULL, NULL),
(25, 6, 6, NULL, NULL, NULL),
(26, 6, 7, NULL, NULL, NULL),
(27, 6, 8, NULL, NULL, NULL),
(28, 6, 9, NULL, NULL, NULL),
(29, 6, 10, NULL, NULL, NULL),
(30, 6, 11, NULL, NULL, NULL),
(31, 5, 13, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subscription_requests`
--

CREATE TABLE `subscription_requests` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '0:not seen, 1:seen 2:accept 3:rejected ',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription_requests`
--

INSERT INTO `subscription_requests` (`id`, `name`, `email`, `subscription_plan_id`, `mobile`, `country`, `message`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'sdfsdfdsf', 'chaki@gmail.com', 1, '123456', 'string', 'required|string', 2, NULL, '2023-06-22 12:11:23', '2023-06-22 12:11:43'),
(2, 'aaacc', 'aaacc@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-06 13:48:59', '2023-07-08 09:38:25'),
(3, 'aaacaasasadadc', 'aaaacc@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-06 13:49:09', '2023-07-08 09:27:16'),
(4, 'aaacaasasadadc', 'aaaacsc@gmail.com', 1, '017328439243', 'string', 'required|string', 2, NULL, '2023-07-06 13:49:19', '2023-07-08 09:22:59'),
(5, 'aaacaasasadadc', 'aaaadadacsc@gmail.com', 1, '017328439243', 'string', 'required|string', 2, NULL, '2023-07-06 13:49:27', '2023-07-08 09:20:49'),
(6, 'aaacaasasadadc', 'cccc@gmail.com', 1, '017328439243', 'string', 'required|string', 3, NULL, '2023-07-06 13:49:33', '2023-07-08 09:20:04'),
(7, 'aaacaasasadadc', 'aaa@gmail.com', 1, '017328439243', 'string', 'required|string', 2, NULL, '2023-07-06 13:49:47', '2023-07-07 03:07:09'),
(8, 'xxx', 'xxx@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-08 03:39:54', '2023-07-08 09:40:15'),
(9, 'xxx', 'zzz@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-08 03:39:58', '2023-07-08 03:41:12'),
(10, 'xxx', 'zxc@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-08 03:40:04', '2023-07-08 03:42:01'),
(11, 'xxx', 'ccc@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-08 03:45:42', '2023-07-08 09:45:51'),
(12, 'xxx', 'vvssv@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-08 04:31:17', '2023-07-08 04:31:53'),
(13, 'sdfsdfdsf', 'mm@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-11 12:09:55', '2023-07-11 18:10:24'),
(14, 'kajol', 'sdf@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-11 13:13:36', '2023-07-11 19:15:09'),
(15, 'kajol', 'kajolchaki@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-11 13:16:34', '2023-07-11 13:16:42'),
(16, 'zzz', 'sandy@gmail.com', 6, '01111111199', 'Bangladesh', 'asdfsdaf', 2, NULL, '2023-07-13 09:43:55', '2023-07-13 15:45:43'),
(17, 'sdfsdfdsf', 'prosanta.k.c@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-22 12:12:37', '2023-07-22 12:14:06'),
(18, 'Arafat', 'dev.arafat.zaimahtech@gmail.com', 7, '01705541561', 'Bangladesh', 'sdgf', 2, NULL, '2023-08-05 02:21:52', '2023-08-14 09:20:03'),
(19, 'POS', 'pos@gmail.com', 4, '01554885133', 'Bangladesh', 'test', 2, NULL, '2023-10-14 23:42:23', '2023-10-15 05:43:07'),
(20, 'Mijba', 'mijba@spreehabd.org', 4, '01554885166', 'Bangladesh', 'test', 2, NULL, '2023-10-18 05:10:27', '2023-10-18 11:11:06'),
(21, 'Zahid', 'zahid_badda@amarlab.com', 3, '01554885185', 'Bangladesh', 'test', 2, NULL, '2023-10-25 00:50:38', '2023-10-25 06:51:27'),
(22, 'Zahid', 'zahid_rayerbazar@amarlab.com', 4, '01554885178', 'Bangladesh', 'test', 2, NULL, '2023-10-25 00:56:48', '2023-10-25 06:57:20'),
(23, 'Zahid', 'zahid_kalachadpur@amarlab.com', 4, '01554885199', 'Bangladesh', 'test', 2, NULL, '2023-10-25 01:01:59', '2023-10-25 07:03:36'),
(24, 'Imran', 'imran@gmail.com', 4, '015548321', 'Bangladesh', 'test', 2, NULL, '2023-11-06 07:12:30', '2023-11-06 09:30:03'),
(25, 'Mizanur Rahman', 'rahman.mizan@gmail.com', 7, '01817184032', 'Bangladesh', 'would like to buy', 0, NULL, '2024-01-27 08:37:16', '2024-01-27 08:37:16'),
(26, 'jabedakhterbkk', 'jabedakhterbkk@gmail.com', 6, '+8801714131050', 'Bangladesh', 'test', 2, NULL, '2024-02-08 07:41:49', '2024-02-08 08:00:58'),
(27, 'Saidur', 'mr.srshajib@gmail.com', 7, '01674179644', 'Bangladesh', 'jbd', 0, NULL, '2024-03-01 11:44:22', '2024-03-01 11:44:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Two_factor_secret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_recovery_codes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `organization_id` int DEFAULT NULL,
  `user_type` tinyint NOT NULL COMMENT '0:super admin, 2: super user, 3: local admin, 4: local user, 5:others',
  `is_tem_password` tinyint NOT NULL DEFAULT '0' COMMENT '0:no, 2: yes',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0:inactive, 1 active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `email_verified_at`, `password`, `Two_factor_secret`, `two_factor_recovery_codes`, `photo`, `organization_id`, `user_type`, `is_tem_password`, `deleted_at`, `remember_token`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Macro Health  Plus', 'admin@gmail.com', '017111111d1', NULL, '$2y$10$LqAynshzZTEqpbJQ4jMKduWHtvOwAYvjPZHV7qEj3YDslmVWhqby.', NULL, NULL, '', NULL, 0, 0, NULL, NULL, 1, '2023-06-22 11:34:59', '2023-10-14 23:40:02'),
(2, 'user2', 'user32@email.com', '01733243244', NULL, '$2y$10$xjp4k2ojMHdFwMqnysU7beFgGBMOpA3ReOt1a7Sz3980Tql6v1Csm', NULL, NULL, 'http://saas-backend.test/images/0bd5198f-3fd1-47a9-9c58-da3385030b85.jpeg', 0, 3, 0, NULL, NULL, 0, '2023-06-22 12:01:03', '2023-07-06 12:22:08'),
(3, 'user2', 'user@email.com', '0173243243', NULL, '$2y$10$La3ckURfST0LaI.Yc5RvJ.nTWeqJ1KI/Wd3GHaFTxxU96OqSee4Ue', NULL, NULL, '1f8affce-2e7b-49cc-99ae-b1a1f8d16757.png', 1, 3, 0, NULL, NULL, 1, '2023-06-22 12:06:24', '2023-06-22 12:06:24'),
(4, 'prosanta chaki', 'chaki@gmail.com', '0171111111', NULL, '$2y$10$MXdAHQwGr.lBEuPNGdAqdesta.VrWQiwyEXurmsZ39un3aBlhrn2G', NULL, NULL, '8e3817f7-53ce-4ef5-b2f8-a29431598250.png', 1, 3, 1, NULL, NULL, 1, '2023-06-22 12:11:43', '2023-06-22 13:26:36'),
(5, 'user2', 'user2@gmail.com', '0173243244', NULL, '$2y$10$0oyQ3nFfih8wnmvxRM./P.eaxQ9w0.FuG2H84G69OjoZfxuEsmTpS', NULL, NULL, '16af9284-3d93-47d9-a955-6111ad4b11db.png', 1, 3, 0, NULL, NULL, 1, '2023-06-22 12:20:36', '2023-07-05 12:49:30'),
(6, 'name', 'contact@gmail.com', NULL, NULL, '$2y$10$A3L9TUoxEXkqLVfTaFGGi./Y42/0ZKfjBK09iIPGKSCiu7tOx8Yl2', NULL, NULL, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-06-22 12:36:33', '2023-07-05 12:49:30'),
(7, 'aaacaasasadadc', 'aaa@gmail.com', '017328439243', NULL, '$2y$10$.FpIu/u6fk2D4MLwh1ekseELo0mEgs0IK.Zx7xsXGxDhEt5rLQFkm', NULL, NULL, NULL, 3, 3, 1, NULL, NULL, 1, '2023-07-07 03:07:09', '2023-07-07 03:07:09'),
(8, 'aaacaasasadadc', 'cccc@gmail.com', '017328439243', NULL, '$2y$10$Kg6o2XQUdysg65bQAjXckOtHG6/7dixHBCBjRomXaOiZFkOfYM.r6', NULL, NULL, NULL, 4, 3, 1, NULL, NULL, 1, '2023-07-08 03:17:08', '2023-07-08 03:17:08'),
(9, 'aaacaasasadadc', 'aaaadadacsc@gmail.com', '017328439243', NULL, '$2y$10$.byA5CCzHdutXM1IJloQJ.2pb9pkW/Z6wwaId0z0lVN5HvZ4ChSwK', NULL, NULL, NULL, 6, 3, 1, NULL, NULL, 1, '2023-07-08 09:20:49', '2023-07-08 09:20:49'),
(10, 'aaacaasasadadc', 'aaaacsc@gmail.com', '017328439243', NULL, '$2y$10$6X/XMOgE4qhQxQdbPxtzW.S.BcSynpYvVeX7uA9ERhwnqnye2dode', NULL, NULL, NULL, 7, 3, 1, NULL, NULL, 1, '2023-07-08 09:22:59', '2023-07-08 09:22:59'),
(11, 'aaacaasasadadc', 'aaaacc@gmail.com', '01732849243', NULL, '$2y$10$gbn31.TtCqeSZdbnTaBwzOWujRcIs.MRD0kX5G5//GQvyTS.q22ke', NULL, NULL, NULL, 8, 3, 1, NULL, NULL, 1, '2023-07-08 09:27:16', '2023-07-08 09:27:16'),
(12, 'aaacc', 'aaacc@gmail.com', '01732849243', NULL, '$2y$10$atrrJyPZQviJXCI/cx5yBul6.0O7zzMzwigJUdWfXxB3rnNW9e.sy', NULL, NULL, NULL, 11, 3, 1, NULL, NULL, 1, '2023-07-08 09:38:25', '2023-07-08 09:38:25'),
(13, 'xxx', 'xxx@gmail.com', '01732849243', NULL, '$2y$10$L0NMKwRndJ5OlUwQ7RrJ4.aqTPvUgUlXxYOIUdT3dNaeWTaido2Fy', NULL, NULL, NULL, 13, 3, 1, NULL, NULL, 1, '2023-07-08 09:40:15', '2023-07-08 09:40:15'),
(14, 'xxx', 'zzz@gmail.com', '01732849243', NULL, '$2y$10$emayIntlCuNaDbz4WbeIq.Y.6x.XdGjKbts7u3c04QcIkUE8pHSJi', NULL, NULL, NULL, 14, 3, 1, NULL, NULL, 1, '2023-07-08 03:41:12', '2023-07-08 03:41:12'),
(15, 'xxx', 'zxc@gmail.com', '01732849243', NULL, '$2y$10$8DJ8lAxNC1HKTyN.dHk8w..LRtd20scFam0.LF4uvfd1LoJJL7fQG', NULL, NULL, NULL, 15, 3, 1, NULL, NULL, 1, '2023-07-08 03:42:01', '2023-07-08 03:42:01'),
(16, 'xxx', 'ccc@gmail.com', '01732849243', NULL, '$2y$10$gR7sJGBqtM.8XDhyF9rNAesXG.P3hb12vdrnATtx7/4V9FiPukiM.', NULL, NULL, NULL, 16, 3, 1, NULL, NULL, 1, '2023-07-08 09:45:51', '2023-07-08 09:45:51'),
(17, 'xxx', 'vvssv@gmail.com', '01732849243', NULL, '$2y$10$p/Mc3YTXLahGlp2M28IIjeM4PWwLmTYmSlDoJqEB/NgvpRa6UzcAO', NULL, NULL, NULL, 17, 3, 1, NULL, NULL, 1, '2023-07-08 04:31:53', '2023-07-08 04:31:53'),
(18, 'sdfsdfdsf', 'mm@gmail.com', '01732849243', NULL, '$2y$10$Wqx99vbSrH4eBGnusGzCvekXAlPzyTfK8r4i5Otw9X6ufIiHPsfFm', NULL, NULL, NULL, 20, 3, 1, NULL, NULL, 1, '2023-07-11 18:10:24', '2023-07-11 18:10:24'),
(19, 'kajol', 'kajsadfolchaki@gmail.com', '01732849243', NULL, '$2y$10$k0UTxmjkuWwG9gsUxgo5k.FA1s.Rs.hrAClAd8aeLHLrHuZqKY/Qa', NULL, NULL, NULL, 21, 3, 1, NULL, NULL, 1, '2023-07-11 19:15:09', '2023-07-11 19:15:09'),
(20, 'kajol', 'kajosdflchaki@gmail.com', '01732849243', NULL, '$2y$10$oryOb1Kc2TUS6TlZrPN1G.lNpCU31pKXmi/3KELPwS8UG1DKMOTvW', NULL, NULL, NULL, 22, 3, 1, NULL, NULL, 1, '2023-07-11 13:16:41', '2023-07-11 13:16:41'),
(21, 'kajol', 'kajodddlchaki@gmail.com', '01732849243', NULL, '$2y$10$J.PlYQ0QDez6o5M4GZXvW.Voexy1A5zgqen4NYpMqYfStIXZv07t2', NULL, NULL, NULL, 23, 3, 1, NULL, NULL, 1, '2023-07-11 13:18:43', '2023-07-11 13:18:43'),
(22, 'kajol', 'kajolchaki@gmail.com', '01732849243', NULL, '$2y$10$SXGCFSw3dVqIOebXUTN/KuBCiVb8pkbcxjDzpEQALZV7h6Y4aLbku', NULL, NULL, NULL, 25, 3, 1, NULL, NULL, 1, '2023-07-11 13:20:19', '2023-07-11 13:20:19'),
(23, 'zzz', 'sandy@gmail.com', '01111111199', NULL, '$2y$10$O96bBoxi9q7ESmaeVXzTwOshMrliM8Ef94oDCsyd4BA3m3a2X9GWq', NULL, NULL, NULL, 26, 3, 1, NULL, NULL, 1, '2023-07-13 15:45:43', '2023-07-13 15:45:43'),
(35, 'user2', 'asdwas@email.com', '0173243224', NULL, '$2y$10$HYpdxeVGavlqu2kBSwy//uhsSRJpq8YclmyfDJXYRoXQYJ.jOx7Bi', NULL, NULL, 'http://saas-backend.test/public/images/72887441-c7a7-4b78-bd17-1e890b2f0aaa.jpeg', 1, 3, 0, NULL, NULL, 1, '2023-07-21 10:14:14', '2023-07-21 10:14:14'),
(38, 'sdfsdfdsf', 'prosanta.k.c@gmail.com', '01732849243', NULL, '$2y$10$u37QeE3.n3pwrNyGvpRqL.LqBs.mCUM.N66mTpV8eQRO2LRaak1JK', NULL, NULL, NULL, 30, 3, 1, NULL, NULL, 1, '2023-07-22 12:14:05', '2023-07-22 12:14:05'),
(79, 'Arafat', 'dev.arafat.zaimahtech@gmail.com', '01705541561', NULL, '$2y$10$Yd4hnEvzLLI6hBDc8XtTXOeWpkFnqZy8ElQDmjNMExivVak5l8QVy', NULL, NULL, NULL, 73, 3, 1, NULL, NULL, 1, '2023-08-14 09:20:00', '2023-08-14 09:20:00'),
(80, 'POS', 'pos@gmail.com', '01554885133', NULL, '$2y$10$bzHlPJvaoE1Q95rM486r0O9/J76LNwz1qntMcMl01NDdefA/lURsq', NULL, NULL, NULL, 74, 3, 1, NULL, NULL, 1, '2023-10-15 05:43:04', '2023-10-15 05:43:04'),
(81, 'Mijba', 'mijba@spreehabd.org', '01554885166', NULL, '$2y$10$ZntHLIpeW2eUYRV2leuhU.GA0E360X/FaaXNoy6O8GUjCjNlmONKC', NULL, NULL, NULL, 75, 3, 0, NULL, NULL, 1, '2023-10-18 11:11:03', '2023-10-18 05:12:01'),
(82, 'Manager', 'snehoehlmanager@gmail.com', '01554885167', NULL, '$2y$10$Ax93qGQ8uCuDwGaJRSPwUO3VlMjiRAqHeLSm0ENXTyXHAo4j72p/u', NULL, NULL, NULL, 75, 3, 0, NULL, NULL, 1, '2023-10-18 05:13:36', '2023-10-18 05:13:36'),
(83, 'Mithun', 'snehoehlsales@gmail.com', '01554885123', NULL, '$2y$10$lj.Zvi9s8IxIBmiMPHbiY.WtlKaINRKR7M4SY8uODKUcpP.rVfAke', NULL, NULL, 'https://saasbackend.macrohealthplus.org/images/806b315d-e37f-4681-bb72-2d56ee0b2e27.jpeg', 75, 3, 0, NULL, NULL, 1, '2023-10-18 05:14:57', '2023-11-01 13:05:01'),
(84, 'Zahid', 'zahid@amarlab.com', '01554885100', NULL, '$2y$10$e0xojstiVLUHgwroKimYyel0pXhCJwVc2AHIn5EruenAXiOkXVlYu', NULL, NULL, NULL, 75, 3, 0, NULL, NULL, 1, '2023-10-19 04:42:09', '2023-10-19 04:42:09'),
(85, 'Zahid', 'zahid_badda@amarlab.com', '01554885185', NULL, '$2y$10$hxTBoKdtyc5VnCfB7XgY8.F3mHVnJ1e/JCMchAUoKXEA2PBl.Mcky', NULL, NULL, NULL, 76, 3, 0, NULL, NULL, 1, '2023-10-25 06:51:21', '2023-10-25 00:54:15'),
(86, 'Zahid', 'zahid_rayerbazar@amarlab.com', '01554885178', NULL, '$2y$10$Efp3qPLdj.1R1isQvEKmZ.ALV5tZygmN0XELJh5wYZ9j/CkjWapEG', NULL, NULL, NULL, 77, 3, 0, NULL, NULL, 1, '2023-10-25 06:57:20', '2023-10-25 01:00:25'),
(87, 'Zahid', 'zahid_kalachadpur@amarlab.com', '01554885199', NULL, '$2y$10$CcIDaBddc3glxDJVYR5LJ.0X1lVY3e8f6a5kyy/NFySNNiQKnwm06', NULL, NULL, NULL, 78, 3, 0, NULL, NULL, 1, '2023-10-25 07:03:36', '2023-10-25 01:06:43'),
(88, 'pmroing', 'pmroing@gmail.com', '01712345666', NULL, '$2y$10$QoU6tTEjH4W7SDjb2OrAx.xaJoeJfXFrWa.me9J32FtH.B2dx7acW', NULL, NULL, NULL, 78, 3, 0, NULL, NULL, 1, '2023-11-01 07:06:33', '2023-11-01 07:06:33'),
(89, 'pmroingmanager', 'pmroingmanager@gmail.com', '01712345622', NULL, '$2y$10$JGEmSu4z/Ncs9HuT3ltrx.xY6vThFTl4vxHxQ4Y3sdbZUmOIzP416', NULL, NULL, NULL, 78, 3, 0, NULL, NULL, 1, '2023-11-01 07:08:11', '2023-11-01 07:08:11'),
(90, 'Parvoti', 'pmroingsales@gmail.com', '01321139120', NULL, '$2y$10$62kGIHbIQqM1F4T16WaPj.i4FseV1fIaQkBhp23wC6tjk3bK3g422', NULL, NULL, NULL, 78, 3, 0, NULL, NULL, 1, '2023-11-01 09:31:19', '2023-11-01 12:57:41'),
(91, 'Rubina', 'snehorbsales@gmail.com', '01676182665', NULL, '$2y$10$sRYlszV1ImgeNZLjFp8BheB91EnZg0QS7gF0EUJ5ZxuazNIbjCBVm', NULL, NULL, 'https://saasbackend.macrohealthplus.org/images/19617719-db61-4793-a2f5-911aab62f086.jpeg', 77, 3, 0, NULL, NULL, 1, '2023-11-01 13:37:41', '2023-11-01 13:37:41'),
(92, 'Sneho RB Manager', 'snehorbmanager@gmail.com', '01676182666', NULL, '$2y$10$JV6trKHWI4BNrWgKr26HyOIQh8fWETi4cqbUsmhIF/GK4GTuwLOWe', NULL, NULL, 'https://saasbackend.macrohealthplus.org/images/a61d40e2-e836-47f0-ba36-56285a28c4ca.jpeg', 77, 3, 0, NULL, NULL, 1, '2023-11-01 13:44:45', '2023-11-01 13:44:45'),
(93, 'Macrohealthplus', 'mhp@gmail.com', '01954365583', NULL, '$2y$10$.0ety/qNjG4OowClecVhn.JuhXLirzVHUJGouv1UTlY.pRbL3ty6u', NULL, NULL, 'https://saasbackend.macrohealthplus.org/images/a253d52b-495e-4518-a599-43270a05c353.webp', 79, 3, 0, NULL, NULL, 1, '2023-11-06 09:30:02', '2023-11-08 10:29:26'),
(94, 'Hernandez Imran', 'emran.macrohealthplus@gamil.com', '01327146665', NULL, '$2y$10$cFcWS/smjdopuErvmRk1jOmc9QygsDO8peq.iacqtp54xwETjSeY.', NULL, NULL, 'https://saasbackend.macrohealthplus.org/images/ac718e8e-732e-48a4-b741-bb55eb8ca43f.webp', 79, 3, 0, NULL, NULL, 1, '2023-11-07 10:23:23', '2023-11-07 10:23:23'),
(95, 'Mizanur Rahman', 'cashier@gmail.com', '01730374286', NULL, '$2y$10$zlpgiphEOfoERfdujkutjuXm9rUlpTyj1B5oVYw5BoBxKhNyYUEtO', NULL, NULL, 'https://saasbackend.macrohealthplus.org/images/21a49958-7fc5-4eda-b550-897e319f3631.webp', 79, 3, 0, NULL, NULL, 1, '2023-11-07 10:27:22', '2023-11-08 10:40:04'),
(96, 'RAHMAN MIZAN', 'manager@gmail.com', '01817184032', NULL, '$2y$10$108ENCYlW3Odf6iADfhePeiKJq6l5GsfaR3sjO38Nkl2g/y4BUE2u', NULL, NULL, 'https://saasbackend.macrohealthplus.org/images/169f8896-107e-4ebc-993a-1ac7e493a17d.jpeg', 79, 3, 0, NULL, NULL, 1, '2023-11-07 13:37:00', '2023-11-27 12:41:50'),
(97, 'jabedakhterbkk', 'jabedakhterbkk@gmail.com', '+8801714131050', NULL, '$2y$10$XAqMfl8UIWN3o4TSxme6qe6GG4CDw/9Aic1pvoi7SwsfjGYA5qN26', NULL, NULL, NULL, 80, 3, 1, NULL, NULL, 1, '2024-02-08 08:00:56', '2024-02-08 08:00:56');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 2, 2, NULL, NULL),
(3, 3, 2, NULL, NULL),
(4, 4, 1, '2023-06-22 12:11:43', '2023-06-22 12:11:43'),
(5, 5, 1, NULL, NULL),
(6, 6, 2, NULL, NULL),
(7, 7, 1, '2023-07-07 03:07:09', '2023-07-07 03:07:09'),
(8, 8, 1, '2023-07-08 03:17:08', '2023-07-08 03:17:08'),
(9, 9, 1, '2023-07-08 09:20:49', '2023-07-08 09:20:49'),
(10, 10, 1, '2023-07-08 09:22:59', '2023-07-08 09:22:59'),
(11, 11, 1, '2023-07-08 09:27:16', '2023-07-08 09:27:16'),
(12, 12, 1, '2023-07-08 09:38:25', '2023-07-08 09:38:25'),
(13, 13, 1, '2023-07-08 09:40:15', '2023-07-08 09:40:15'),
(14, 14, 1, '2023-07-08 03:41:12', '2023-07-08 03:41:12'),
(15, 15, 1, '2023-07-08 03:42:01', '2023-07-08 03:42:01'),
(16, 16, 1, '2023-07-08 09:45:51', '2023-07-08 09:45:51'),
(17, 17, 1, '2023-07-08 04:31:53', '2023-07-08 04:31:53'),
(18, 18, 1, '2023-07-11 18:10:24', '2023-07-11 18:10:24'),
(19, 19, 1, '2023-07-11 19:15:09', '2023-07-11 19:15:09'),
(20, 20, 1, '2023-07-11 13:16:41', '2023-07-11 13:16:41'),
(21, 21, 1, '2023-07-11 13:18:43', '2023-07-11 13:18:43'),
(22, 22, 1, '2023-07-11 13:20:19', '2023-07-11 13:20:19'),
(23, 23, 1, '2023-07-13 15:45:43', '2023-07-13 15:45:43'),
(35, 35, 2, NULL, NULL),
(37, 38, 1, '2023-07-22 12:14:06', '2023-07-22 12:14:06'),
(41, 79, 1, '2023-08-14 09:20:03', '2023-08-14 09:20:03'),
(42, 80, 1, '2023-10-15 05:43:07', '2023-10-15 05:43:07'),
(43, 81, 1, '2023-10-18 11:11:06', '2023-10-18 11:11:06'),
(44, 82, 2, NULL, NULL),
(45, 83, 2, NULL, NULL),
(46, 84, 2, NULL, NULL),
(47, 85, 1, '2023-10-25 06:51:27', '2023-10-25 06:51:27'),
(48, 86, 1, '2023-10-25 06:57:20', '2023-10-25 06:57:20'),
(49, 87, 1, '2023-10-25 07:03:36', '2023-10-25 07:03:36'),
(50, 88, 2, NULL, NULL),
(51, 89, 2, NULL, NULL),
(52, 90, 2, NULL, NULL),
(53, 91, 2, NULL, NULL),
(54, 92, 2, NULL, NULL),
(55, 93, 1, '2023-11-06 09:30:03', '2023-11-06 09:30:03'),
(56, 94, 2, NULL, NULL),
(57, 95, 2, NULL, NULL),
(58, 96, 2, NULL, NULL),
(59, 97, 1, '2024-02-08 08:00:58', '2024-02-08 08:00:58');

-- --------------------------------------------------------

--
-- Table structure for table `validities`
--

CREATE TABLE `validities` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `days` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `validities`
--

INSERT INTO `validities` (`id`, `name`, `days`, `created_at`, `updated_at`) VALUES
(1, 'one month', 30, '2023-06-26 10:02:45', '2023-06-26 10:02:45'),
(2, 'two month', 60, '2023-06-26 10:11:36', '2023-06-26 10:16:34'),
(3, 'One Month', 30, '2023-06-26 10:17:30', '2024-01-25 12:03:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_keys`
--
ALTER TABLE `api_keys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon_subscription_plans`
--
ALTER TABLE `coupon_subscription_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon_users`
--
ALTER TABLE `coupon_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dynamic_databases`
--
ALTER TABLE `dynamic_databases`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dynamic_databases_name_unique` (`name`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `organizations_email_unique` (`email`);

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payment_attempts`
--
ALTER TABLE `payment_attempts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_attempts`
--
ALTER TABLE `purchase_attempts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roles_slug_index` (`slug`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `storage_sizes`
--
ALTER TABLE `storage_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_cancel_requests`
--
ALTER TABLE `subscription_cancel_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_details`
--
ALTER TABLE `subscription_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_plan_features`
--
ALTER TABLE `subscription_plan_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_requests`
--
ALTER TABLE `subscription_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_roles_user_id_role_id_unique` (`user_id`,`role_id`),
  ADD KEY `user_roles_role_id_foreign` (`role_id`);

--
-- Indexes for table `validities`
--
ALTER TABLE `validities`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_keys`
--
ALTER TABLE `api_keys`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `coupon_subscription_plans`
--
ALTER TABLE `coupon_subscription_plans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `coupon_users`
--
ALTER TABLE `coupon_users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dynamic_databases`
--
ALTER TABLE `dynamic_databases`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `payment_attempts`
--
ALTER TABLE `payment_attempts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1133;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_attempts`
--
ALTER TABLE `purchase_attempts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `storage_sizes`
--
ALTER TABLE `storage_sizes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subscription_cancel_requests`
--
ALTER TABLE `subscription_cancel_requests`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription_details`
--
ALTER TABLE `subscription_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `subscription_plan_features`
--
ALTER TABLE `subscription_plan_features`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `subscription_requests`
--
ALTER TABLE `subscription_requests`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `validities`
--
ALTER TABLE `validities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
