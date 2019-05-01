-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th5 01, 2019 lúc 05:01 AM
-- Phiên bản máy phục vụ: 10.1.38-MariaDB
-- Phiên bản PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `Library`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ar_internal_metadata`
--

CREATE TABLE `ar_internal_metadata` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `ar_internal_metadata`
--

INSERT INTO `ar_internal_metadata` (`key`, `value`, `created_at`, `updated_at`) VALUES
('environment', 'development', '2019-04-13 13:59:53', '2019-04-13 13:59:53');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `books`
--

CREATE TABLE `books` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `authors` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `available_quantity` int(11) DEFAULT '0',
  `is_text_book` tinyint(1) DEFAULT NULL,
  `book_image` varchar(255) DEFAULT NULL,
  `review` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `call_number` varchar(255) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `year_of_publication` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `books`
--

INSERT INTO `books` (`id`, `title`, `authors`, `tags`, `available_quantity`, `is_text_book`, `book_image`, `review`, `created_at`, `updated_at`, `location`, `call_number`, `publisher`, `year_of_publication`, `price`) VALUES
(2, 'Keeping Your Family Strong In a World Gone Wrong', 'Dr. Kevin Leman', 'Soft skills', 9, 1, '1590744-M.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur urna sapien, vitae condimentum massa ornare a. Fusce ac pulvinar nunc. Sed vehicula tempus risus et consectetur. Pellentesque id felis sit amet metus vehicula auctor non in elit. Proin feugiat tempor est, vel ullamcorper nisi. Etiam elit dui, faucibus et elit sed, bibendum vestibulum leo. Donec feugiat tincidunt elit, ac posuere ipsum dictum quis. Vivamus id pretium mauris. Aenean eu nisl id est finibus mollis. Nunc vehicula metus eget tempor facilisis. Nullam nisl justo, cursus in interdum ut, ultrices non nibh.', '2019-04-13 14:49:25', '2019-04-22 02:51:44', 'a12 DEMO', '0842371125', 'Living Books', 2019, 200000),
(3, 'The firebrand', 'May McGoldrick', 'Romance', 98, 1, '1590744-M.jpg', 'Quisque gravida enim ac luctus aliquam. Donec egestas sem ut suscipit ultricies. Aenean quis ipsum bibendum, porttitor justo quis, pretium orci. Integer magna leo, congue ut sagittis ac, vehicula at\n\nodio. In at auctor dui. Nunc at elit et dolor interdum aliquam nec ut orci. In luctus nulla justo, a efficitur lorem dapibus quis.', '2019-04-13 15:01:26', '2019-04-24 15:01:40', 'a12 DEMO', '9780739413692', 'New American Library', 2000, 300000),
(4, 'George\'s marvelous medicine', 'Roald Dahl', 'Kid', 98, 0, '1590744-M.jpg', 'Quisque gravida enim ac luctus aliquam. Donec egestas sem ut suscipit ultricies. Aenean quis ipsum bibendum, porttitor justo quis, pretium orci. Integer magna leo, congue ut sagittis ac, vehicula at odio. In at auctor dui. Nunc at elit et dolor interdum aliquam nec ut orci. In luctus nulla justo, a efficitur lorem dapibus quis.', '2019-04-13 15:03:12', '2019-04-13 15:30:01', 'a12', '9780590032742', 'Scholastic', 1997, 400000),
(5, 'Ricky Ricotta\'s mighty robot vs. the mutant mosquitoes from Mercury', 'Dav Pilkey DEMO', 'kid', 99, 0, '1590744-M.jpg', 'Donec ullamcorper nulla sapien, mollis commodo mauris efficitur id. Sed iaculis odio eget eros condimentum suscipit. Duis et aliquam mi. In hac habitasse platea dictumst. Aliquam laoreet fringilla placerat. Proin venenatis pharetra eros, vitae placerat tortor dictum et. Mauris eget auctor nulla. Quisque vel ipsum nec velit dictum blandit. Donec fermentum enim lacus, ac venenatis diam egestas a. Fusce quis tempor magna, quis tincidunt sem. Fusce in ultrices ante. Maecenas mollis ornare mi sit amet maximus. In luctus mollis lorem, non rhoncus magna lobortis quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;\n', '2019-04-13 15:06:19', '2019-04-22 02:48:08', 'a12', '9780545631082', 'Factory A', 2014, 500000),
(6, 'Development across the life span', 'Robert S. Feldman DEMO', 'Physical', 97, 0, '1590744-M.jpg', 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed gravida malesuada urna eget hendrerit. In convallis fermentum purus id cursus. Sed venenatis mollis mollis. Etiam ullamcorper, nulla non facilisis facilisis, sapien quam eleifend tellus, sit amet euismod eros elit in massa. Donec leo libero, gravida at mi nec, fermentum luctus est. Nunc ligula justo, maximus in tempor a, blandit vel mi. Sed consectetur facilisis nisl nec maximus. Fusce fermentum enim vitae mi consectetur sagittis. Mauris pharetra mattis condimentum. Curabitur nec nisi volutpat, facilisis enim vehicula, interdum sapien. ', '2019-04-13 15:08:12', '2019-04-22 02:42:14', 'a12', '0131925385', 'Pearson/Prentice Hall', 2006, 600000),
(7, 'Understanding movies', 'Louis D. Giannetti', 'Music DEMO', 99, 1, '2.jpg', 'Etiam ullamcorper, nulla non facilisis facilisis, sapien quam eleifend tellus, sit amet euismod eros elit in massa. Donec leo libero, gravida at mi nec, fermentum luctus est. Nunc ligula justo, maximus in tempor a, blandit vel mi. Sed consectetur facilisis nisl nec maximus. Fusce fermentum enim vitae mi consectetur sagittis. Mauris pharetra mattis condimentum. Curabitur nec nisi volutpat, facilisis enim vehicula, interdum sapien. Maecenas dictum sem a neque bibendum facilisis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean posuere sollicitudin tellus quis varius. Aliquam non posuere ipsum, et venenatis eros.', '2019-04-13 15:11:11', '2019-04-28 10:19:12', 'a12', '0139363106', 'Prentice-Hall', 1982, 700000),
(8, 'Statistical methods', 'Herbert Arkin, Raymond R. Colton', 'Soft skills DEMO', 95, 1, 's.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis accumsan neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque ac est id libero facilisis rhoncus sit amet ac risus. Mauris fringilla rhoncus dolor sed posuere. Aenean ante metus, congue in faucibus sed, sodales vel lorem. Duis a bibendum ex, et sollicitudin dolor.', '2019-04-13 15:12:54', '2019-04-22 02:42:14', 'a12', '0389001198', 'Barnes & Noble ', 1970, 800000),
(9, 'Physics', 'Joseph W. Kane', 'Soft skills', 97, 1, '7152529-M.jpg', 'Mauris elementum tincidunt lectus, ut mollis erat blandit et. Curabitur et urna luctus, euismod mi sed, dignissim nunc. Ut vehicula iaculis tortor ac porttitor. Maecenas libero sapien, posuere sit amet ex id, condimentum placerat est. Mauris ac odio vulputate magna vulputate vestibulum ac vitae massa. Proin at sem mi. Etiam aliquam nulla nec nisi dictum, et vestibulum sem gravida. Donec eget quam dui. Phasellus vitae augue vitae mi tempor facilisis consequat sit amet justo. Duis arcu turpis, tempus et tincidunt id, suscipit a est.\n\n', '2019-04-13 15:14:19', '2019-04-13 15:26:43', 'a12', '0471083232', 'Wiley', 1983, 900000),
(10, 'Calculus and analytic geometry', 'George Brinton Thomas', 'Soft skills', 98, 1, '3961810-M.jpg', 'Suspendisse sit amet condimentum purus, eget maximus quam. Nullam eget metus finibus, egestas quam id, pellentesque nisi. Ut auctor odio libero, sit amet porta sapien euismod at. Duis fringilla mi nulla. Aliquam lectus purus, sollicitudin vel urna vel, suscipit efficitur tellus. Aliquam blandit mauris quis volutpat rutrum. Phasellus quam purus, lobortis eu varius et, egestas ultricies odio. Fusce congue dui et nisl congue laoreet. Morbi in rhoncus leo, id sagittis mauris. Curabitur tempus mauris id ante dictum, sed blandit nibh imperdiet. Duis lacinia fringilla arcu, ut tempor turpis fermentum at. Proin non diam quis tellus malesuada ultrices in et ipsum. Nulla orci urna, blandit eget nibh in, tempus finibus eros. DEMO', '2019-04-13 15:15:47', '2019-04-16 15:23:14', 'a12', '0201529297', 'Addison-Wesley', 1992, 1000000),
(11, 'Linear algebra with applications', 'Williams, Gareth', 'Soft skills', 94, 0, '7956364-M.jpg', 'In neque velit, hendrerit non turpis sed, egestas faucibus nibh. Aliquam risus velit, varius et ullamcorper eget, dignissim ac lorem. Vivamus eu blandit elit. Nullam sagittis quam in magna imperdiet porta. Curabitur interdum ullamcorper feugiat. Sed sed eros non dolor tempor vestibulum et ut sem. Vivamus eros tellus, bibendum et ipsum lobortis, accumsan viverra lorem. In at nulla gravida, tincidunt erat id, feugiat eros. Phasellus auctor in augue at mattis. Fusce accumsan, lorem at malesuada tincidunt, leo neque luctus eros, et varius mauris nibh sed enim. Mauris purus neque, hendrerit at lacus vitae, posuere efficitur sem. In sit amet mi pulvinar, iaculis sem sit amet, sagittis purus. Curabitur hendrerit mattis imperdiet.  DEMO', '2019-04-13 15:17:08', '2019-04-30 03:18:11', 'a12', '0697097382', 'Wm. C. Brown Publishers ', 1991, 1100000),
(12, 'Never victorious, never defeated DEMO', 'Taylor Caldwell', 'Soft skills DEMO', 92, 0, '6981079-M.jpg', 'Suspendisse sit amet condimentum purus, eget maximus quam. Nullam eget metus finibus, egestas quam id, pellentesque nisi. Ut auctor odio libero, sit amet porta sapien euismod at. Duis fringilla mi nulla. Aliquam lectus purus, sollicitudin vel urna vel, suscipit efficitur tellus. Aliquam blandit mauris quis volutpat rutrum. Phasellus quam purus, lobortis eu varius et, egestas ultricies odio. Fusce congue dui et nisl congue laoreet. Morbi in rhoncus leo, id sagittis mauris. Curabitur tempus mauris id ante dictum, sed blandit nibh imperdiet. Duis lacinia fringilla arcu, ut tempor turpis fermentum at. Proin non diam quis tellus malesuada ultrices in et ipsum. Nulla orci urna, blandit eget nibh in, tempus finibus eros. Ut ultrices eget orci vel dictum. Nulla eu tincidunt dolor. Pellentesque eros quam, interdum eget urna porttitor, tristique placerat nisi.', '2019-04-13 15:21:41', '2019-04-30 03:20:35', 'a12', 'A 123.1213', 'AnandBot', 2012, 1200000),
(13, 'Never Say Never DEMO', 'Jo-Ann Power', 'Soft skills DEMO', 0, 1, '404203-M.jpg', 'Augusta VanderHorn knows too much about scandal. As the younger sister of the infamous American beauty, Colleen VanderHorn, who wed British Lord Bryce Falconer, and was divorced for adultery, it\'s been hard for Gus to avoid the taint. Now she is embroiled in scandal herself, for Colleen has kidnapped her own child from his father, to hold him for ransom to support her latest lover. Gus knows it\'s vital to help find her nephew, but she harbors a secret reason for wanting to assist in the search. Gus is in love with the man her sister married. For Bryce, she\'ll do anything, even risk her reputation--and her heart--by traveling at his side on a quest to rescue his child.', '2019-04-13 15:23:57', '2019-04-15 17:38:54', 'a12', 'A 123.1213', 'Factory A', 2019, 1300000),
(14, 'Ten spooky stories  adding price DEMO', 'R. L. Stine', 'Soft skills', 1, 1, 'demo-book-image.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate massa massa, eu euismod ante iaculis id. Fusce eu libero non massa eleifend molestie. Duis porta, massa id blandit egestas, qasdasdasd', '2019-04-27 15:14:41', '2019-04-29 16:49:06', 'a12', 'A 123.1213', 'Factory A', 2019, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `due_days`
--

CREATE TABLE `due_days` (
  `id` bigint(20) NOT NULL,
  `type_of_book` varchar(255) DEFAULT NULL,
  `due_days` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `due_days`
--

INSERT INTO `due_days` (`id`, `type_of_book`, `due_days`, `created_at`, `updated_at`) VALUES
(1, 'Reference Book', 14, '2019-04-13 14:07:43', '2019-04-15 18:12:00'),
(2, 'Text Book', 60, '2019-04-13 14:07:48', '2019-04-15 18:09:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `fees`
--

CREATE TABLE `fees` (
  `id` bigint(20) NOT NULL,
  `type_of_book` varchar(255) DEFAULT NULL,
  `fee_per_day` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `fees`
--

INSERT INTO `fees` (`id`, `type_of_book`, `fee_per_day`, `created_at`, `updated_at`) VALUES
(1, 'Reference Book', 2000, '2019-04-27 15:47:03', '2019-04-27 17:39:59'),
(2, 'Text Book', 1000, '2019-04-27 15:47:24', '2019-04-27 17:40:12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schema_migrations`
--

CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `schema_migrations`
--

INSERT INTO `schema_migrations` (`version`) VALUES
('20190324093537'),
('20190324153124'),
('20190324160049'),
('20190327012244'),
('20190328165318'),
('20190328170939'),
('20190328173049'),
('20190330043219'),
('20190330084522'),
('20190405063513'),
('20190407061233'),
('20190407131725'),
('20190427144900'),
('20190427153413'),
('20190427153729'),
('20190427154328'),
('20190428050112'),
('20190428050159');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `students`
--

CREATE TABLE `students` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `students`
--

INSERT INTO `students` (`id`, `email`, `name`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'std1@gmail.com', 'std1\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:12:14'),
(2, 'std2@gmail.com', 'std2\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:12:09'),
(3, 'std3@gmail.com', 'std3\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:12:05'),
(4, 'std4@gmail.com', 'std4\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:12:02'),
(5, 'std5@gmail.com', 'std5\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:59'),
(6, 'std6@gmail.com', 'std6\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:53'),
(7, 'std7@gmail.com', 'std7\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:49'),
(8, 'std8@gmail.com', 'std8\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:46'),
(9, 'std9@gmail.com', 'std9\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:42'),
(10, 'std10@gmail.com', 'std10\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:39'),
(11, 'std11@gmail.com', 'std11\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:33'),
(12, 'std12@gmail.com', 'std12\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:28'),
(13, 'std13@gmail.com', 'std13\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:24'),
(14, 'std14@gmail.com', 'std14\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:19'),
(15, 'std15@gmail.com', 'std15\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:15'),
(16, 'std16@gmail.com', 'std16\'s name', 'download.png', '2019-04-13 14:00:51', '2019-04-13 14:11:04'),
(17, 'std17@gmail.com', 'std17\'s name', 'download.png', '2019-04-13 14:00:52', '2019-04-13 14:10:59'),
(18, 'std18@gmail.com', 'std18\'s name', 'images.png', '2019-04-13 14:00:52', '2019-04-22 02:24:57'),
(19, 'std19@gmail.com', 'std19\'s name', 'child-1837375_960_720.png', '2019-04-13 14:00:52', '2019-04-22 02:24:50'),
(20, 'std20@gmail.com', 'std20\'s name', 'Avatar-Transparent-Image.png', '2019-04-13 14:00:52', '2019-04-22 02:24:45'),
(21, 'std21@gmail.com', 'std21\'s names', '28e7312d32356cabb08cb36d5d232492.jpg', '2019-04-16 14:49:48', '2019-04-22 02:24:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tickets`
--

CREATE TABLE `tickets` (
  `id` bigint(20) NOT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tickets`
--

INSERT INTO `tickets` (`id`, `student_id`, `created_at`, `updated_at`) VALUES
(1, 20, '2019-04-13 15:25:47', '2019-04-13 15:25:47'),
(2, 19, '2019-04-13 15:26:27', '2019-04-13 15:26:27'),
(3, 18, '2019-04-13 15:26:43', '2019-04-13 15:26:43'),
(4, 17, '2019-04-13 15:28:30', '2019-04-13 15:28:30'),
(5, 16, '2019-04-13 15:30:01', '2019-04-13 15:30:01'),
(6, 20, '2019-04-15 18:08:53', '2019-04-15 18:08:53'),
(7, 19, '2019-04-15 18:09:51', '2019-04-15 18:09:51'),
(8, 20, '2019-04-15 18:13:26', '2019-04-15 18:13:26'),
(9, 19, '2019-04-16 15:15:46', '2019-04-16 15:15:46'),
(10, 21, '2019-04-19 02:14:18', '2019-04-19 02:14:18'),
(11, 20, '2019-04-22 02:42:14', '2019-04-22 02:42:14'),
(12, 15, '2019-04-22 02:51:44', '2019-04-22 02:51:44'),
(13, 21, '2019-04-24 06:39:26', '2019-04-24 06:39:26'),
(14, 21, '2019-04-25 17:42:50', '2019-04-25 17:42:50'),
(15, 20, '2019-04-26 10:08:44', '2019-04-26 10:08:44'),
(16, 14, '2019-04-26 14:51:14', '2019-04-26 14:51:14'),
(17, 21, '2019-04-26 15:20:34', '2019-04-26 15:20:34'),
(18, 21, '2019-04-30 03:18:11', '2019-04-30 03:18:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ticket_details`
--

CREATE TABLE `ticket_details` (
  `id` bigint(20) NOT NULL,
  `ticket_id` bigint(20) DEFAULT NULL,
  `book_id` bigint(20) DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `return_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `is_good` tinyint(1) DEFAULT '1',
  `student_id` bigint(20) DEFAULT NULL,
  `fee` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `ticket_details`
--

INSERT INTO `ticket_details` (`id`, `ticket_id`, `book_id`, `due_date`, `return_date`, `created_at`, `updated_at`, `note`, `is_good`, `student_id`, `fee`) VALUES
(1, 1, 12, '2019-04-14 15:25:47', NULL, '2019-04-13 15:25:47', '2019-04-13 15:25:47', NULL, 1, 20, 0),
(2, 1, 11, '2019-06-14 15:25:47', NULL, '2019-04-13 15:25:47', '2019-04-13 15:25:47', NULL, 1, 20, 0),
(3, 1, 10, '2019-06-14 15:25:47', NULL, '2019-04-13 15:25:48', '2019-04-13 15:25:48', NULL, 1, 20, 0),
(4, 2, 10, '2019-06-14 15:26:27', '2019-04-16 15:23:14', '2019-04-13 15:26:27', '2019-04-16 15:23:14', NULL, 1, 19, 0),
(5, 2, 9, '2019-04-14 15:26:27', NULL, '2019-04-13 15:26:27', '2019-04-13 15:26:27', NULL, 1, 19, 0),
(6, 3, 9, '2019-06-14 15:26:43', NULL, '2019-04-13 15:26:43', '2019-04-13 15:26:43', NULL, 1, 18, 0),
(7, 4, 8, '2019-06-14 15:28:30', NULL, '2019-04-13 15:28:30', '2019-04-13 15:28:30', NULL, 1, 17, 0),
(8, 4, 7, '2019-04-13 15:28:31', '2019-04-28 10:19:12', '2019-04-13 15:28:30', '2019-04-28 10:19:12', 'late return', 1, 17, 14785),
(9, 4, 6, '2019-06-14 15:28:30', NULL, '2019-04-13 15:28:30', '2019-04-13 15:28:30', NULL, 1, 17, 0),
(10, 5, 5, '2019-04-27 15:30:01', '2019-04-22 02:48:08', '2019-04-13 15:30:01', '2019-04-22 02:48:08', '', 1, 16, 0),
(11, 5, 4, '2019-04-27 15:30:01', NULL, '2019-04-13 15:30:01', '2019-04-13 15:30:01', NULL, 1, 16, 0),
(12, 6, 12, '2019-04-25 18:08:53', '2019-04-15 18:14:29', '2019-04-15 18:08:53', '2019-04-15 18:14:30', NULL, 1, 20, 0),
(13, 7, 8, '2019-06-14 18:09:51', NULL, '2019-04-15 18:09:51', '2019-04-15 18:09:51', NULL, 1, 19, 0),
(14, 8, 12, '2019-04-29 18:13:26', '2019-04-15 18:15:05', '2019-04-15 18:13:26', '2019-04-15 18:15:06', 'the book has been drawn', 0, 20, 0),
(15, 9, 12, '2019-04-30 15:15:46', '2019-04-16 15:20:06', '2019-04-16 15:15:46', '2019-04-16 15:20:06', NULL, 1, 19, 0),
(16, 9, 8, '2019-06-15 15:15:46', NULL, '2019-04-16 15:15:46', '2019-04-16 15:15:46', NULL, 1, 19, 0),
(17, 9, 11, '2019-04-30 15:15:46', '2019-04-16 15:21:51', '2019-04-16 15:15:46', '2019-04-16 15:21:51', NULL, 0, 19, 0),
(18, 10, 12, '2019-05-03 02:14:18', '2019-04-24 06:50:04', '2019-04-19 02:14:18', '2019-04-24 06:50:04', NULL, 1, 21, 0),
(19, 10, 11, '2019-05-03 02:14:18', NULL, '2019-04-19 02:14:18', '2019-04-19 02:14:18', NULL, 1, 21, 0),
(20, 11, 8, '2019-06-21 02:42:14', NULL, '2019-04-22 02:42:14', '2019-04-22 02:42:14', NULL, 1, 20, 0),
(21, 11, 6, '2019-05-06 02:42:14', '2019-04-28 10:17:52', '2019-04-22 02:42:14', '2019-04-28 10:17:52', 'DEMO book is not good when return', 0, 20, 350000),
(22, 12, 3, '2019-06-21 02:51:44', NULL, '2019-04-22 02:51:44', '2019-04-22 02:51:44', NULL, 1, 15, 0),
(23, 12, 2, '2019-06-21 02:51:44', NULL, '2019-04-22 02:51:44', '2019-04-22 02:51:44', NULL, 1, 15, 0),
(24, 13, 12, '2019-05-08 06:39:26', '2019-04-24 06:50:17', '2019-04-24 06:39:26', '2019-04-28 17:13:46', 'can be skip', 0, 21, 0),
(25, 14, 12, '2019-05-09 17:42:50', '2019-04-30 03:20:35', '2019-04-25 17:42:50', '2019-04-30 03:20:35', NULL, 1, 21, 0),
(26, 15, 12, '2019-05-10 10:08:44', NULL, '2019-04-26 10:08:44', '2019-04-26 10:08:44', NULL, 1, 20, 0),
(27, 16, 12, '2019-05-10 14:51:14', NULL, '2019-04-26 14:51:14', '2019-04-26 14:51:14', NULL, 1, 14, 0),
(28, 17, 12, '2019-05-10 15:20:34', '2019-04-28 15:59:36', '2019-04-26 15:20:34', '2019-04-28 15:59:36', 'DEMO \"book is not good\"', 0, 21, 100000),
(29, 17, 11, '2019-05-10 15:20:34', NULL, '2019-04-26 15:20:34', '2019-04-26 15:20:34', NULL, 1, 21, 0),
(30, 18, 12, '2019-05-14 03:18:11', '2019-04-30 03:22:35', '2019-04-30 03:18:11', '2019-04-30 03:22:35', '(DEMO) book is not good', 0, 21, 1200000),
(31, 18, 11, '2019-05-14 03:18:11', NULL, '2019-04-30 03:18:11', '2019-04-30 03:18:11', NULL, 1, 21, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_digest` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `auth_token` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `password_digest`, `name`, `auth_token`, `is_admin`, `created_at`, `updated_at`) VALUES
(1, 'youremail@gmail.com', '$2a$10$fjiBvlsqQrOg2BzQIxYgfObfNUBFWuUfM2PjTTTZYhUtFq9HhEXf.', NULL, 'T4dhYrdinbstW1C1aDGrPUgs', 0, '2019-04-13 14:07:27', '2019-04-13 14:07:27'),
(2, 'admin@gmail.com', '$2a$10$omH/r/dFmQ9LgPTXkCL8P.Ty6KIKFSQ42vrr6jvk8I/3JJ5.DDDGe', NULL, '8CJEiPKjEAgVt6FkMbQdHLeq', 0, '2019-04-13 14:08:23', '2019-04-30 06:00:18');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ar_internal_metadata`
--
ALTER TABLE `ar_internal_metadata`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `due_days`
--
ALTER TABLE `due_days`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `fees`
--
ALTER TABLE `fees`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `schema_migrations`
--
ALTER TABLE `schema_migrations`
  ADD PRIMARY KEY (`version`);

--
-- Chỉ mục cho bảng `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_tickets_on_student_id` (`student_id`);

--
-- Chỉ mục cho bảng `ticket_details`
--
ALTER TABLE `ticket_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_ticket_details_on_ticket_id` (`ticket_id`),
  ADD KEY `index_ticket_details_on_book_id` (`book_id`),
  ADD KEY `index_ticket_details_on_student_id` (`student_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `due_days`
--
ALTER TABLE `due_days`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `fees`
--
ALTER TABLE `fees`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `ticket_details`
--
ALTER TABLE `ticket_details`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `fk_rails_c82f8fdb4b` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);

--
-- Các ràng buộc cho bảng `ticket_details`
--
ALTER TABLE `ticket_details`
  ADD CONSTRAINT `fk_rails_04d7de1851` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `fk_rails_e45b335f05` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  ADD CONSTRAINT `fk_rails_f87e1ba0cf` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
