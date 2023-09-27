-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tnc_store
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `guest_id` varchar(75) NOT NULL,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `guest_id` (`guest_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`guest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (11,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f'),(9,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa'),(10,'guest-id-45757bad-ffeb-4a83-a097-a9b6b4048255'),(8,'guest-id-8c3df7ef-ca2f-4e78-bf88-65ef472a102d'),(7,'guest-id-ef16590b-6875-4920-8c49-f922be972d14');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts_detail`
--

DROP TABLE IF EXISTS `carts_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts_detail` (
  `cart_detail_id` varchar(75) NOT NULL,
  `cart_id` int NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `quantity` int NOT NULL,
  `engraving_content` varchar(15) DEFAULT NULL,
  `engraving_checked` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`cart_detail_id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `carts_detail_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`),
  CONSTRAINT `carts_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `check_positive_quantity` CHECK ((`quantity` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts_detail`
--

LOCK TABLES `carts_detail` WRITE;
/*!40000 ALTER TABLE `carts_detail` DISABLE KEYS */;
INSERT INTO `carts_detail` VALUES ('3ceef476-cc42-41b6-ab7f-25cfa822c3c7',9,'product-id-5302f13c-a3f0-43c8-a630-fb1db2f7e01b',3,'',0),('f8075a54-106d-4cc2-9573-f59e0a8c3ee9',9,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,'',0);
/*!40000 ALTER TABLE `carts_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` varchar(50) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `category_description` text,
  PRIMARY KEY (`category_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('categoty-id-02aa4918-7ddf-4ac0-af49-49d52bd43838','earphones','product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',NULL),('categoty-id-4b2e8c48-bc60-4a5d-94b4-bc11bddd157b','headphones','product-id-f520c238-b75b-4b9c-bdbf-ab5928f07527',NULL),('categoty-id-51874c0f-33f6-4dbe-b498-510c42b3dcd3','headphones','product-id-c3046c60-4c13-469c-b3f7-fce1991a97a4',NULL),('categoty-id-5a54d8cd-8040-4e2e-ad2e-cf732a98c310','accessories','product-id-a53680b7-d425-4e19-ac3d-c503d6c495ee',NULL),('categoty-id-5cea04ea-240f-420e-8366-567a25d8dc0d','headphones','product-id-f6ee65e1-21fe-47ef-a85c-f48c8433a750',NULL),('categoty-id-702a2399-0c95-40a3-9da4-6750094cc583','headphones','product-id-59f98b79-4da7-41c3-9e77-5392b324ecb6',NULL),('categoty-id-71a3894e-46fd-4ca5-8069-3c92a16c4938','accessories','product-id-71f2616e-4999-45f1-b0b5-933254a2e2b5',NULL),('categoty-id-8daa82fe-177b-4cac-ab4f-f19c70f3e740','earphones','product-id-5302f13c-a3f0-43c8-a630-fb1db2f7e01b',NULL),('categoty-id-bc2ad940-de08-4797-b0b2-05c9522c0c3c','accessories','product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',NULL),('categoty-id-c6bd65f1-3d77-4b8e-9ff1-d9f8fccb97b9','headphones','product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',NULL),('categoty-id-d67d56ae-dcd3-4a96-affa-45890940d68c','earphones','product-id-ad4ea626-3542-4871-b9dc-bdc90fe16ea8',NULL),('categoty-id-e0031f72-571d-4507-ac25-d756fc4c512e','headphones','product-id-547888e2-546f-414a-b796-edd265058697',NULL),('categoty-id-e1696795-eb5e-418e-a220-4fea29209b17','earphones','product-id-7a72006b-24b1-4f0b-a144-48f362d81c12',NULL),('categoty-id-e21a4996-ee1a-4e92-b7fe-645c79082575','earphones','product-id-ed2c1c7c-53e7-4029-8bc6-cab9fb1a2b49',NULL),('categoty-id-e52c5c35-69a7-4e74-a9d9-0a8847182fc3','accessories','product-id-96b67ee3-57b6-417f-8846-9adf56032696',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_code`
--

DROP TABLE IF EXISTS `discount_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_code` (
  `discount_code_id` int NOT NULL AUTO_INCREMENT,
  `code_discount` varchar(50) NOT NULL,
  `discount_description` text,
  `discount_amount` int NOT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `use_limit` int DEFAULT NULL,
  `discount_scope` enum('product','order') NOT NULL,
  PRIMARY KEY (`discount_code_id`),
  UNIQUE KEY `code_discount` (`code_discount`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_code`
--

LOCK TABLES `discount_code` WRITE;
/*!40000 ALTER TABLE `discount_code` DISABLE KEYS */;
INSERT INTO `discount_code` VALUES (20,'nBNfcmFuVX',NULL,5,NULL,NULL,5,'product');
/*!40000 ALTER TABLE `discount_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_code_mapping`
--

DROP TABLE IF EXISTS `discount_code_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_code_mapping` (
  `mapping_id` int NOT NULL AUTO_INCREMENT,
  `discount_code_id` int DEFAULT NULL,
  `product_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`mapping_id`),
  KEY `product_id` (`product_id`),
  KEY `discount_code_id` (`discount_code_id`),
  CONSTRAINT `discount_code_mapping_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `discount_code_mapping_ibfk_2` FOREIGN KEY (`discount_code_id`) REFERENCES `discount_code` (`discount_code_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_code_mapping`
--

LOCK TABLES `discount_code_mapping` WRITE;
/*!40000 ALTER TABLE `discount_code_mapping` DISABLE KEYS */;
INSERT INTO `discount_code_mapping` VALUES (13,20,'product-id-f520c238-b75b-4b9c-bdbf-ab5928f07527'),(14,20,'product-id-c3046c60-4c13-469c-b3f7-fce1991a97a4'),(15,20,'product-id-f6ee65e1-21fe-47ef-a85c-f48c8433a750'),(16,20,'product-id-59f98b79-4da7-41c3-9e77-5392b324ecb6'),(17,20,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff'),(18,20,'product-id-547888e2-546f-414a-b796-edd265058697');
/*!40000 ALTER TABLE `discount_code_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guests` (
  `guest_id` varchar(75) NOT NULL,
  `guest_fingerprint` varchar(255) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`guest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
INSERT INTO `guests` VALUES ('guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','60bab3072e4001f2058ced52406493025b73eb7c1b5ba83a8ec968edec2c57ee','2023-09-05 07:00:38'),('guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','62b6319f4446b8af1574722bdf35324e9bcc47c4dd23e7ddf303dffdd57aa166','2023-09-06 14:24:43'),('guest-id-45757bad-ffeb-4a83-a097-a9b6b4048255','f7d2be3aaec9fa6dd0584218c1eb4e12f270dca7c6f9147320d912798f99f8da','2023-09-05 01:10:59'),('guest-id-57c07bb9-d57a-4128-a792-2b4390e60ae5','c435cd23a21e9f578979ae0fca9c982bed53ad4ff5b2d60f6276e3daf80ceac3','2023-09-06 11:07:44'),('guest-id-8c3df7ef-ca2f-4e78-bf88-65ef472a102d','5d05dff6a6a17af56215e5740e0a5b895ac2c68d09dcbc65534c6ee8bf46a050','2023-09-08 03:56:36'),('guest-id-ef16590b-6875-4920-8c49-f922be972d14','8bf5f149c4ef379cdeb169221793c33a11d4bbc34bdd8927e5b839cde9445b0f','2023-09-05 08:06:23');
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` varchar(50) DEFAULT NULL,
  `quantity` int NOT NULL,
  `total_price` int NOT NULL,
  `discounted_price` int NOT NULL,
  `engraving_content` varchar(15) DEFAULT NULL,
  `engraving_checked` tinyint DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (6,5,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(7,5,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',1,499,494,'',0),(8,6,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(9,6,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',1,499,494,'',0),(10,7,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(11,7,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',1,499,494,'',0),(12,8,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(13,8,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',1,499,494,'',0),(14,9,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(15,9,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',1,499,494,'',0),(16,10,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(17,10,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',1,499,494,'',0),(18,11,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(19,11,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(20,12,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(21,12,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(22,13,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(23,13,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(24,14,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(25,14,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(26,15,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(27,15,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(28,16,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(29,16,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(30,17,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(31,17,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(32,18,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(33,18,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(34,19,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(35,19,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(36,20,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(37,20,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(38,21,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(39,21,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(40,22,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(41,22,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(42,23,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(43,23,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(44,24,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(45,24,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(46,25,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(47,25,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(48,26,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(49,26,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(50,27,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(51,27,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2499,494,'',0),(52,28,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(53,28,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,494,'',0),(54,29,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(55,29,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,494,'',0),(56,30,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(57,30,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(58,31,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(59,31,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(60,32,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(61,32,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(62,33,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(63,33,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(64,34,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(65,34,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(66,35,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(67,35,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(68,36,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(69,36,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(70,37,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(71,37,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(72,38,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(73,38,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(74,39,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(75,39,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(76,40,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(77,40,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(78,41,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(79,41,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(80,42,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(81,42,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(82,43,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(83,43,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(84,44,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(85,44,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(86,45,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(87,45,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(88,46,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(89,46,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(90,47,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(91,47,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(92,48,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(93,48,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(94,49,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(95,49,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(96,50,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(97,50,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(98,51,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(99,51,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(100,52,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(101,52,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(102,53,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(103,53,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(104,54,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(105,54,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(106,55,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(107,55,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(108,56,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(109,56,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(110,57,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(111,57,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(112,58,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(113,58,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(114,59,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(115,59,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(116,60,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(117,60,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(118,61,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(119,61,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(120,62,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(121,62,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(122,63,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(123,63,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(124,64,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(125,64,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(126,65,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(127,65,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(128,66,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(129,66,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(130,67,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(131,67,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(132,68,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(133,68,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(134,69,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(135,69,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(136,70,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(137,70,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(138,71,'product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',1,99,99,'333',1),(139,71,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',5,2474,474,'',0),(140,72,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,499,499,'86',1),(141,72,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,499,499,'44',1),(142,72,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,499,499,'55',1),(143,73,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,499,499,'86',1),(144,73,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,499,499,'44',1),(145,73,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,499,499,'55',1),(146,74,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,529,499,'86',1),(147,74,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,529,499,'44',1),(148,74,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,529,499,'55',1),(149,75,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,529,499,'86',1),(150,75,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,529,499,'44',1),(151,75,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,529,499,'55',1),(152,76,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',1,499,475,'',0),(153,76,'product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',1,529,475,'123',1),(154,76,'product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',1,499,499,'',0);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `guest_id` varchar(75) NOT NULL,
  `receiver_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` text,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `order_status` varchar(50) NOT NULL DEFAULT 'pending',
  `payment_method` enum('prepaid','cod') NOT NULL,
  `payment_status` enum('unpaid','paid') NOT NULL,
  `delivery_status` enum('Confirming','In Transit','Delivered','Delivery Cancelled') DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_guests` (`guest_id`),
  CONSTRAINT `fk_orders_guests` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`guest_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (5,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-11 15:17:29','confirmed','cod','unpaid',NULL),(6,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:04:28','cancelled','cod','unpaid',NULL),(7,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:04:35','cancelled','cod','unpaid',NULL),(8,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:04:36','cancelled','cod','unpaid',NULL),(9,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:08:47','cancelled','cod','unpaid',NULL),(10,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:14:23','cancelled','cod','unpaid',NULL),(11,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:15:49','cancelled','cod','unpaid',NULL),(12,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:15:50','cancelled','cod','unpaid',NULL),(13,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:15:51','cancelled','cod','unpaid',NULL),(14,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:25:42','cancelled','cod','unpaid',NULL),(15,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:37:43','confirmed','cod','unpaid',NULL),(16,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:38:01','cancelled','cod','unpaid','Confirming'),(17,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:38:29','pending','cod','unpaid','Confirming'),(18,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 01:59:35','pending','cod','unpaid',NULL),(19,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 02:00:09','pending','cod','unpaid',NULL),(20,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 02:00:32','pending','cod','unpaid',NULL),(21,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 02:28:58','pending','cod','unpaid',NULL),(22,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 02:29:00','pending','cod','unpaid',NULL),(23,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 02:29:19','pending','cod','unpaid',NULL),(24,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 03:23:16','pending','cod','unpaid',NULL),(25,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 07:03:09','pending','cod','unpaid',NULL),(26,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 07:03:16','pending','cod','unpaid',NULL),(27,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 07:08:58','pending','cod','unpaid',NULL),(28,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 07:14:47','pending','cod','unpaid',NULL),(29,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 07:28:58','pending','cod','unpaid',NULL),(30,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 07:39:50','pending','cod','unpaid',NULL),(31,'guest-id-45757bad-ffeb-4a83-a097-a9b6b4048255','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 07:40:32','pending','cod','unpaid',NULL),(32,'guest-id-45757bad-ffeb-4a83-a097-a9b6b4048255','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 07:40:37','pending','cod','unpaid',NULL),(33,'guest-id-45757bad-ffeb-4a83-a097-a9b6b4048255','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 09:47:52','pending','cod','unpaid',NULL),(34,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 09:48:09','pending','cod','unpaid',NULL),(35,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 09:50:32','pending','cod','unpaid',NULL),(36,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 09:50:43','pending','cod','unpaid',NULL),(37,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 09:54:20','pending','cod','unpaid',NULL),(38,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 09:55:46','pending','cod','unpaid',NULL),(39,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 09:56:06','pending','cod','unpaid',NULL),(40,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 09:57:45','pending','cod','unpaid',NULL),(41,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 09:57:49','pending','cod','unpaid',NULL),(42,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 09:57:59','pending','cod','unpaid',NULL),(43,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 09:59:50','pending','cod','unpaid',NULL),(44,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:01:12','pending','cod','unpaid',NULL),(45,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:01:28','pending','cod','unpaid',NULL),(46,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:02:20','pending','cod','unpaid',NULL),(47,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:05:13','pending','cod','unpaid',NULL),(48,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:13:13','pending','cod','unpaid',NULL),(49,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:14:03','pending','cod','unpaid',NULL),(50,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:16:44','pending','cod','unpaid',NULL),(51,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:16:52','pending','cod','unpaid',NULL),(52,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:19:11','pending','cod','unpaid',NULL),(53,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:22:15','pending','cod','unpaid',NULL),(54,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:27:52','Wait for confirmation','cod','unpaid',NULL),(55,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:29:27','confirmed','cod','unpaid','Confirming'),(56,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:29:33','Wait for confirmation','cod','unpaid',NULL),(57,'guest-id-406a4915-34e3-48ab-9c56-02e222668e6f','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:41:32','Wait for confirmation','cod','unpaid',NULL),(58,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:41:41','confirmed','cod','unpaid',NULL),(59,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:43:01','confirmed','cod','unpaid',NULL),(60,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:43:08','confirmed','cod','unpaid',NULL),(61,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:43:14','confirmed','cod','unpaid','Confirming'),(62,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:47:43','confirmed','cod','unpaid',NULL),(63,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:55:35','Wait for confirmation','cod','unpaid',NULL),(64,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 10:55:53','Wait for confirmation','cod','unpaid',NULL),(65,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 11:23:07','Wait for confirmation','cod','unpaid',NULL),(66,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 11:23:19','Wait for confirmation','cod','unpaid',NULL),(67,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 11:27:21','cancelled','cod','unpaid',NULL),(68,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 11:27:34','confirmed','cod','unpaid','Confirming'),(69,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 11:27:55','Wait for confirmation','cod','unpaid','Confirming'),(70,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 11:28:00','confirmed','cod','unpaid','Confirming'),(71,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','abc','mail@gmail.com','123987','me tri, ha noi','2023-09-12 11:28:03','confirmed','cod','unpaid','Confirming'),(72,'guest-id-ef16590b-6875-4920-8c49-f922be972d14','a','alex@gmail.com','a','a','2023-09-13 15:39:24','pending','cod','unpaid',NULL),(73,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','aa','phutran.jp1@gmail.com','a','a','2023-09-13 15:43:26','pending','cod','unpaid',NULL),(74,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','a','phutran.jp1@gmail.com','0963700092','43 Ngõ 53 Phố Ngọa Long','2023-09-13 16:38:03','pending','cod','unpaid',NULL),(75,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','a','phutran.jp1@gmail.com','0963700092','43 Ngõ 53 Phố Ngọa Long','2023-09-13 16:44:17','pending','cod','unpaid',NULL),(76,'guest-id-435505cb-c04a-4048-ad81-a90ea6baccaa','aa','phutran.jp1@gmail.com','0963700092','43 Ngõ 53 Phố Ngọa Long','2023-09-13 16:47:06','pending','cod','unpaid',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(50) NOT NULL,
  `permission_description` text,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`permission_id`),
  UNIQUE KEY `permission_name` (`permission_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'CREATE_ADMIN','Tạo mới admin',NULL),(2,'EDIT_ADMIN','Chỉnh sửa admin',NULL),(3,'DEACTIVATIVE_ADMIN','Vô hiệu admin',NULL),(4,'MANAGE_WEB','Quản lý web',NULL),(5,'MANAGE_ORDER','Quản lí đơn hàng',NULL);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_cover_images`
--

DROP TABLE IF EXISTS `product_cover_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_cover_images` (
  `cover_image_id` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`cover_image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_cover_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_cover_images`
--

LOCK TABLES `product_cover_images` WRITE;
/*!40000 ALTER TABLE `product_cover_images` DISABLE KEYS */;
INSERT INTO `product_cover_images` VALUES ('cover-image-09d37e57-e23e-4c0e-87dc-cfb71f477e21','product-id-a53680b7-d425-4e19-ac3d-c503d6c495ee',''),('cover-image-0f94ba4a-2891-4a71-9d7a-07da6d6bbf6d','product-id-c3046c60-4c13-469c-b3f7-fce1991a97a4','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/coverphotos%2Fcover3.jpg?alt=media&token=3d476334-83cd-4749-b6b0-a481ae70a7f9'),('cover-image-12446c11-1f89-4b74-a27a-aa805eb17568','product-id-71f2616e-4999-45f1-b0b5-933254a2e2b5',''),('cover-image-4ece8b61-0ad7-4af7-84c7-869c11e1f5d7','product-id-f520c238-b75b-4b9c-bdbf-ab5928f07527','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/coverphotos%2Fcover8.jpg?alt=media&token=2575af4e-ff45-4b51-9d95-e61bcb166d15'),('cover-image-5992f238-d3ba-4d8f-a008-3f04fefa3c23','product-id-7a72006b-24b1-4f0b-a144-48f362d81c12','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/coverphotos%2Fcover88.jpg?alt=media&token=b9cfa561-d521-4b56-ae53-4ebbe9453a0a'),('cover-image-6244c2ca-1509-4054-9957-452814b686b4','product-id-59f98b79-4da7-41c3-9e77-5392b324ecb6','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/coverphotos%2Fcover7.jpg?alt=media&token=654ea275-0f40-4850-a70f-121620755ea8'),('cover-image-6c80af7a-671e-446e-bbb6-897009b39263','product-id-ad4ea626-3542-4871-b9dc-bdc90fe16ea8','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/coverphotos%2F3cover.jpg?alt=media&token=784e4fdf-2e87-4428-a9b2-d347017b2889'),('cover-image-6d79bbfd-e33d-4e11-b1ad-06777033d5f4','product-id-96b67ee3-57b6-417f-8846-9adf56032696',''),('cover-image-7c282603-696a-467c-9fcb-23b756587493','product-id-5302f13c-a3f0-43c8-a630-fb1db2f7e01b','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/coverphotos%2Fcover009.png?alt=media&token=dbf416ca-71e7-41ca-bd55-a42a1ab48845'),('cover-image-89e9cc5c-3451-405d-8912-567d286a059a','product-id-ed2c1c7c-53e7-4029-8bc6-cab9fb1a2b49','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/coverphotos%2Fcover090.png?alt=media&token=bb3cb5eb-0c78-4c04-b87a-b431b942a95e'),('cover-image-a2732326-7e19-4dec-b3ae-fbb21202714d','product-id-547888e2-546f-414a-b796-edd265058697','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/coverphotos%2Fcover1.jpg?alt=media&token=89ab16ff-6fe6-4437-a35a-15b2df8a2faa'),('cover-image-c18975b3-9494-487e-b2f9-3b039b599476','product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',''),('cover-image-c1bb6d3c-67e7-43f6-be9f-2894d3b783c3','product-id-f6ee65e1-21fe-47ef-a85c-f48c8433a750','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/coverphotos%2Fcover6.jpg?alt=media&token=6c14baa5-4c47-4345-ad5c-ee9c58274b3a'),('cover-image-ca1fcf42-2d93-4ef5-bf9d-8b1adf7e3202','product-id-87e8f9f9-36cd-484f-9450-971c92da7f96','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/coverphotos%2F4cover2.jpg?alt=media&token=9e624ab4-6862-4f20-9ce3-44bdbba7467f'),('cover-image-cc28fbc7-e157-45b3-9390-c1f96f9f3f36','product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/coverphotos%2Fcover2.jpg?alt=media&token=890e2170-9152-4ef4-bb79-1fcb4463a6c7');
/*!40000 ALTER TABLE `product_cover_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_details`
--

DROP TABLE IF EXISTS `product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_details` (
  `detail_id` varchar(75) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `parent_categories` varchar(100) DEFAULT NULL,
  `product_type` varchar(100) DEFAULT NULL,
  `product_description` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `quantity` varchar(100) DEFAULT NULL,
  `sale` varchar(100) DEFAULT NULL,
  `product_status` varchar(100) DEFAULT NULL,
  `image_description` varchar(100) DEFAULT NULL,
  `model` varchar(200) DEFAULT NULL,
  `dimensions` varchar(200) DEFAULT NULL,
  `drivers` varchar(200) DEFAULT NULL,
  `weight` varchar(100) DEFAULT NULL,
  `engraving` varchar(100) DEFAULT NULL,
  `impedance` varchar(200) DEFAULT NULL,
  `battery_life` varchar(200) DEFAULT NULL,
  `analog_headphone` varchar(200) DEFAULT NULL,
  `product_connection` varchar(200) DEFAULT NULL,
  `wired_digital_headphone` varchar(200) DEFAULT NULL,
  `cables` varchar(200) DEFAULT NULL,
  `ear_coupling` varchar(200) DEFAULT NULL,
  `talk_microphones` varchar(200) DEFAULT NULL,
  `anc_microphones` varchar(200) DEFAULT NULL,
  `atena` varchar(200) DEFAULT NULL,
  `ear_pads` varchar(200) DEFAULT NULL,
  `bluetooth_profile` varchar(200) DEFAULT NULL,
  `voice_assistant` varchar(200) DEFAULT NULL,
  `sale_time` varchar(100) DEFAULT NULL,
  `active_noise_cancelling` varchar(100) DEFAULT NULL,
  `ambient_listening_modes` varchar(200) DEFAULT NULL,
  `audio_format` varchar(200) DEFAULT NULL,
  `charging_case_battery_life` varchar(200) DEFAULT NULL,
  `charging_case_time_cable` varchar(200) DEFAULT NULL,
  `charging_case_time_wireless` varchar(200) DEFAULT NULL,
  `connectivity_between` varchar(200) DEFAULT NULL,
  `connectivity_distance` varchar(200) DEFAULT NULL,
  `earphone_battery_life` varchar(200) DEFAULT NULL,
  `earphone_charge_time` varchar(200) DEFAULT NULL,
  `material` varchar(250) DEFAULT NULL,
  `microphone_type` varchar(200) DEFAULT NULL,
  `sport_earphones` varchar(200) DEFAULT NULL,
  `waterproof_level` varchar(200) DEFAULT NULL,
  `max_output` varchar(200) DEFAULT NULL,
  `input` varchar(200) DEFAULT NULL,
  `in_the_box` varchar(200) DEFAULT NULL,
  `compatibility` varchar(200) DEFAULT NULL,
  `power_supply` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_details`
--

LOCK TABLES `product_details` WRITE;
/*!40000 ALTER TABLE `product_details` DISABLE KEYS */;
INSERT INTO `product_details` VALUES ('product-detail-id-19b169af-73e4-4a53-8203-6648f1e57d44','product-id-59f98b79-4da7-41c3-9e77-5392b324ecb6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MH40 Wireless Over-Ear Headphones',' 205mm x 202mm x 71mm',' 40mm Titanium',' 280g',NULL,' 32 Ohms',' Up to 30 hours',NULL,NULL,NULL,NULL,'Over-Ear',' 2 microphone talk solution with wind reduction',NULL,NULL,' Replaceable magnetic lambskin-wrapped memory foam',NULL,' Compatible with native voice assistants',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,' Coated canvas headband and lambskin leather ear pads / aluminum ear cups / anodized aluminum controls',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('product-detail-id-1c9e7bf1-9b6c-4001-a9f5-9bd79efcf695','product-id-5302f13c-a3f0-43c8-a630-fb1db2f7e01b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'EP04 Sport True Wireless Earphones',' Case: 64.8mm x 48.1mm x 26.8mm Earphone: 21.19mm x 20.22mm x 25.08mm','11mm Beryllium','Sport Earphones: 8.6g each Charging Case: 56g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Bluetooth 5.2 with AAC, SBC, Qualcomm® aptX™ Adaptive, and Qualcomm’s state of the art True Wireless Mirroring technology',NULL,NULL,' Hybrid ANC sport earbuds with All Day ANC and ANC Max modes','Awareness Mode, Voice Mode',' Supports hi-res audio aptX Adaptive up to 24-bit/96kHz',' 50% charge in 15 minutes, 100% charge in 60 minutes',NULL,'50% charge in 30 minutes, 100% charge in 100 minutes','Bluetooth 5.2','100ft/30m','Up to 12 hours playtime / 10 hours with ANC or Ambient Listening','50% charge in 15 minutes, 100% charge in 45 minutes',' Kevlar® fiber earphones and case','6-microphone talk solution - 3 microphones in each sport earphone',NULL,'Wireless sport earbuds feature an IPX5 water resistance rating, case features IPX4 water resistance rating',NULL,NULL,NULL,NULL,NULL),('product-detail-id-1ed973ae-4fae-4466-8038-afdea3555c8a','product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,' MW75 Active Noise-Cancelling Wireless Headphones',' 160.75mm x 197.83mm x 83.57mm','40mm Beryllium','338g',NULL,' 32 Ohms','Up to 32 hours of battery life or up to 28 hours with ANC enabled','USB-C to 3.5mm cable for optional analog audio connection','C to USB-C cable','Supports hi-res audio up to 24-bit / 96kHz with computer connection using provided USB',' USB-C to 3.5mm input cable, USB-C to USB-C charging cable',' Over-Ear',' 4 Microphone talk solution with wind protection',' 4 Microphone ANC solution',' Internal Antenna','Replaceable Magnetic Lambskin-Wrapped Memory Foam',' Bluetooth® 5.1 range of 100ft/30m with AAC, aptX™ Adaptive up to 24 bit/ 48kHz, and SBC. Hi-res requires a compatible source device and streaming service.',' Compatible with native voice assistants',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Lambskin leather headband and ear pads / aluminum and tempered glass ear cups / anodized aluminum controls',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('product-detail-id-2b82fb05-a8f6-45df-892a-28e89cf42602','product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AS04 ','100mm x 100mm x 9.9mm','...','50.4g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'10 Watts',' 5V/1.2~1.5A, 9V/1.2~1.5A',NULL,'\nWorks with MW08 Sport and compatible products including Apple iPhone 8 and newer mobile digital devices.',' Not Included'),('product-detail-id-2beed97e-a10e-458d-a597-ea2d3678458f','product-id-a53680b7-d425-4e19-ac3d-c503d6c495ee',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AS03 Wireless Charge Pad','100mm x 100mm x 9.9mm','...',' 90.7g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'10 Watts','5V/1.2~1.5A, 9V/1.2~1.5A','Wireless Charge Pad, 1M USB-C to USB-C Cable','Works with MW08 Sport and compatible products including Apple iPhone 8 and newer mobile digital devices.','Not Included'),('product-detail-id-3cb774bb-cd86-4e9d-bd76-3bc829e6f07e','product-id-c3046c60-4c13-469c-b3f7-fce1991a97a4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MW75 Active Noise-Cancelling Wireless Headphones',' 160.75mm x 197.83mm x 83.57mm','40mm Beryllium',' 324g',NULL,' 32 Ohms',' Up to 32 hours of battery life or up to 28 hours with ANC enabled','USB-C to 3.5mm cable for optional analog audio connection',NULL,'Supports hi-res audio up to 24-bit / 96kHz using provided USB-C to USB-C cable with supported devices',' USB-C to 3.5mm audio cable, USB-C to USB-C charging cable','Over-Ear','4 microphone talk solution with wind protection','4 microphone ANC solution',' Internal antenna',' Replaceable magnetic lambskin-wrapped memory foam',' Bluetooth® 5.1 range of 100ft/30m with AAC, aptX™ Adaptive up to 24 bit/ 48kHz, and SBC. Hi-res requires a compatible source device and streaming service.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Lambskin leather headband and ear pads / aluminum, and tempered glass ear cups / anodized aluminum controls',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('product-detail-id-3df8ec3f-f3ab-4569-8ef3-bf5ddf983cf4','product-id-96b67ee3-57b6-417f-8846-9adf56032696',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AS02 Hard Shell Travel Case','...','...','90.7g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('product-detail-id-5c7f7f03-94b5-410b-9234-c20a3ac1e254','product-id-87e8f9f9-36cd-484f-9450-971c92da7f96',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'EP05 ',' Wireless Earphone: 21.19mm x 20.22mm x 25.08mm; Case: 64mm x 47.1mm x 25mm','11mm Beryllium',' Earphones: 9g each; Charging Case: 81 g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,' 5.2 with AAC, aptX adaptive, and SBC',NULL,NULL,'Hybrid ANC with All Day ANC and ANC Max modes','Awareness Mode, Voice Mode',NULL,'3 additional charges, 40 hours total playtime',' 50% charge in 15 minutes / 100% charge in 40 minutes','','Bluetooth® 5.2','100ft/30m','50% charge in 15 minutes, 100% charge in 45 minutes',' Up to 12 hours playtime /10 hours with ANC','Ceramic / Stainless Steel',' 6-microphone talk solution / 3 microphones in each earphone',NULL,'Wireless earphones feature an IPX5 water resistance rating',NULL,NULL,NULL,NULL,NULL),('product-detail-id-5e76efe1-845c-4b86-873f-fc4fc1d01c22','product-id-547888e2-546f-414a-b796-edd265058697',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MW75 Active Noise-Cancelling Wireless Headphones',' 160.75mm x 197.83mm x 83.57mm','40mm Beryllium','324g',NULL,' 32 Ohms','Up to 32 hours of battery life or up to 28 hours with ANC enabled','USB-C to 3.5mm cable for optional analog audio connection',NULL,'Supports hi-res audio up to 24-bit / 96kHz using provided USB-C to USB-C cable with supported devices',' USB-C to 3.5mm audio cable, USB-C to USB-C charging cable','Over-Ear',' 4 Microphone talk solution with wind protection','4 Microphone ANC solution',' Internal Antenna','Replaceable Magnetic Lambskin-Wrapped Memory Foam','Bluetooth® 5.1 range of 100ft/30m with AAC, aptX™ Adaptive up to 24 bit/ 48kHz, and SBC. Hi-res requires a compatible source device and streaming service.','Compatible with native voice assistants',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Lambskin leather headband and ear pads / aluminum, tempered glass ear cups / anodized aluminum controls',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('product-detail-id-7199c816-a84b-4c52-8efd-c0308c2eeaf6','product-id-f520c238-b75b-4b9c-bdbf-ab5928f07527',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,' MG20 Wireless Gaming Headphones',' 173.83mm x 197.32mm x 84.53mm',' 50mm Beryllium',' 312g // 322g with Boom Microphone',NULL,' 32 Ohms',' 22 hours',NULL,' Optional 3.5 analog and audio splitter',NULL,'2m USB-C to 3.5mm Audio Cable, 2m USB-C to USB-A Charging Cable','Over-Ear',NULL,NULL,'Internal Antenna',' Replaceable Lambskin-Wrapped Memory Foam','Bluetooth® 5.0 with AAC & Qualcomm® aptX™ HD for music, aptX™ Low-Latency for mobile gaming',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,' Alcantara® inner headband / coated canvas outer headband / lambskin leather ear pads / magnesium ear cups / anodized aluminum controls',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('product-detail-id-b437dc07-8a04-4e8a-ba6a-355bce55261d','product-id-ad4ea626-3542-4871-b9dc-bdc90fe16ea8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'EP03 Sport True Wireless Earphones','Case: 64.8mm x 48.1mm x 26.8mm Earphone: 21.19mm x 20.22mm x 25.08','11mm Beryllium','Sport Earphones: 8.6g each Charging Case: 56g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Bluetooth 5.2 with AAC, SBC, Qualcomm® aptX™ Adaptive, and Qualcomm’s state of the art True Wireless Mirroring technology',NULL,NULL,'Hybrid ANC sport earbuds with All Day ANC and ANC Max modes',' Awareness Mode, Voice Mode',' Supports hi-res audio aptX Adaptive up to 24-bit/96kHz','30 additional hours of charge, Up to 42 hours total playtime',' 50% charge in 15 minutes, 100% charge in 60 minutes','50% charge in 30 minutes, 100% charge in 100 minutes','Bluetooth 5.2','100ft/30m','Up to 12 hours playtime / 10 hours with ANC or Ambient Listening',' 50% charge in 15 minutes, 100% charge in 45 minutes','Kevlar® fiber case, sapphire glass earphones',' 6-microphone talk solution - 3 microphones in each sport earphone',NULL,' Wireless sport earbuds feature an IPX5 water resistance rating, case features IPX4 water resistance rating',NULL,NULL,NULL,NULL,NULL),('product-detail-id-b6ad1962-ad7d-451b-a2de-f09eed928d19','product-id-ed2c1c7c-53e7-4029-8bc6-cab9fb1a2b49',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'EP02 Sport True Wireless Earphones',' Case: 64.8mm x 48.1mm x 26.8mm. Earphone: 21.19mm x 20.22mm x 25.08mm','11mm Beryllium',' Sport Earphones: 8.6g each, Charging Case: 56g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Bluetooth 5.2 with AAC, SBC, Qualcomm® aptX™ Adaptive, and Qualcomm’s state of the art True Wireless Mirroring technology',NULL,NULL,'Hybrid ANC sport earbuds with All Day ANC and ANC Max modes','Awareness Mode, Voice Mode','Supports hi-res audio aptX Adaptive up to 24-bit/96kHz','30 additional hours of charge, Up to 42 hours total playtime','50% charge in 15 minutes, 100% charge in 60 minutes','50% charge in 30 minutes, 100% charge in 100 minutes','Bluetooth 5.2',' 100ft/30m','Up to 12 hours playtime / 10 hours with ANC or Ambient Listening',' 50% charge in 15 minutes, 100% charge in 45 minutes','Sapphire glass sport earbuds /Kevlar® fiber case',' 6-microphone talk solution - 3 microphones in each sport earphone',NULL,'Wireless sport earbuds feature an IPX5 water resistance rating, case features IPX4 water resistance rating',NULL,NULL,NULL,NULL,NULL),('product-detail-id-c6c4dc4a-6a69-4682-ba7f-2efe7334d2df','product-id-f6ee65e1-21fe-47ef-a85c-f48c8433a750',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'HP10 Wireless Over-Ear Headphones',' 205mm x 202mm x 71mm','40mm Titanium','280g',NULL,'32 Ohms',' Up to 30 hours',NULL,NULL,NULL,NULL,' Over-Ear','2 microphone talk solution with wind reduction',NULL,NULL,' Replaceable magnetic lambskin-wrapped memory foam.',NULL,' Compatible with native voice assistants',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('product-detail-id-d6e73401-c4af-43ea-9728-a8324b2a1786','product-id-7a72006b-24b1-4f0b-a144-48f362d81c12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MW08 Sport True Wireless Earphones','Case: 64.8mm x 48.1mm x 26.8mm Earphone: 21.19mm x 20.22mm x 25.08mm',' 11mm Beryllium',' Sport Earphones: 8.6g each, Charging Case: 56g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,' Bluetooth 5.2 with AAC, SBC, Qualcomm® aptX™ Adaptive, and Qualcomm’s state of the art True Wireless Mirroring technology',NULL,NULL,'Hybrid ANC sport earbuds with All Day ANC and ANC Max modes','Awareness Mode, Voice Mode','Supports hi-res audio aptX Adaptive up to 24-bit/96kHz','30 additional hours of charge, Up to 42 hours total playtime',' 50% charge in 15 minutes, 100% charge in 60 minutes','50% charge in 30 minutes, 100% charge in 100 minutes','Bluetooth 5.2','100ft/30m','Up to 12 hours playtime / 10 hours with ANC or Ambient Listening','50% charge in 15 minutes, 100% charge in 45 minutes',' Sapphire glass sport earbuds /Kevlar® fiber case','6-microphone talk solution - 3 microphones in each sport earphone',NULL,'Wireless sport earbuds feature an IPX5 water resistance rating, case features IPX4 water resistance rating',NULL,NULL,NULL,NULL,NULL),('product-detail-id-f7873abb-47dc-4603-b6c9-befc15059f69','product-id-71f2616e-4999-45f1-b0b5-933254a2e2b5',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AS01 WIRELESS BLUETOOTH ADAPTER','Anodized Aluminum','300mm/~1ft USB-C to USB-C Charging Cable, Charges via USB-C port','30.9g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Bluetooth 5.0 with aptX-LL and aptX-HD','Connects to analog devices via one (aux) or two 3.5mm inputs',NULL,'Can connect a second pair of wireless headphones or earphones for shared listening',NULL);
/*!40000 ALTER TABLE `product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `image_id` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES ('image-id-025e8a2d-66e4-4f57-b056-7e3ba8fe8096','product-id-f6ee65e1-21fe-47ef-a85c-f48c8433a750','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693390205522-1.png?alt=media'),('image-id-089190a6-afd7-4edd-aa8e-cda0c4d70734','product-id-c3046c60-4c13-469c-b3f7-fce1991a97a4','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448395080-3.png?alt=media'),('image-id-126720e3-d335-4312-8683-89a1d7a43753','product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693452501751-3.png?alt=media'),('image-id-12fe1f4d-7667-418b-8c48-7c5c4d350236','product-id-c3046c60-4c13-469c-b3f7-fce1991a97a4','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448395080-5.jpg?alt=media'),('image-id-1a2fb4e6-2c9a-487e-a469-4ca8e51b5797','product-id-87e8f9f9-36cd-484f-9450-971c92da7f96','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450596349-3.png?alt=media'),('image-id-247b5693-6bf4-4734-b9d5-dc9306f52064','product-id-7a72006b-24b1-4f0b-a144-48f362d81c12','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449204322-5.png?alt=media'),('image-id-2a7fd8ce-d6c6-42ca-89b6-9cdc72272da1','product-id-a53680b7-d425-4e19-ac3d-c503d6c495ee','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693452204504-2.png?alt=media'),('image-id-31248c33-e5af-4b80-99db-e4ed29d5c55f','product-id-f6ee65e1-21fe-47ef-a85c-f48c8433a750','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693390205539-2.png?alt=media'),('image-id-38666212-56eb-4622-b1ab-b6a851d5914e','product-id-5302f13c-a3f0-43c8-a630-fb1db2f7e01b','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450306647-4.png?alt=media'),('image-id-3b0650db-dea7-48bf-9ccb-09d8a538fb9c','product-id-59f98b79-4da7-41c3-9e77-5392b324ecb6','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448027632-5.png?alt=media'),('image-id-3f9a86c8-f913-46c5-b9df-4ad3240bba2f','product-id-547888e2-546f-414a-b796-edd265058697','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448892125-1.png?alt=media'),('image-id-430fa7c3-d242-47bc-918a-859c96c84ff9','product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447546436-5.png?alt=media'),('image-id-43405d23-4992-4d64-884b-eebf24ba6a37','product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693452501750-1.png?alt=media'),('image-id-46739d4d-865a-4d02-b833-d2ece081cc26','product-id-c3046c60-4c13-469c-b3f7-fce1991a97a4','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448395080-4.png?alt=media'),('image-id-480c38f5-6ef8-4e2a-b9e1-730187e85cfe','product-id-f520c238-b75b-4b9c-bdbf-ab5928f07527','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447853743-3.png?alt=media'),('image-id-485c5fb8-77a9-4a91-a6e3-b56e752d8780','product-id-c3046c60-4c13-469c-b3f7-fce1991a97a4','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448395079-1.png?alt=media'),('image-id-4eac72a4-e62b-4f38-80c6-46b151db8cb1','product-id-a53680b7-d425-4e19-ac3d-c503d6c495ee','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693452204504-3.png?alt=media'),('image-id-538f705c-90bb-48c3-9402-efe8be9b308f','product-id-ed2c1c7c-53e7-4029-8bc6-cab9fb1a2b49','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449674328-3.png?alt=media'),('image-id-57757699-01c9-4a0b-8947-cd6863c3b503','product-id-ed2c1c7c-53e7-4029-8bc6-cab9fb1a2b49','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449674327-1.png?alt=media'),('image-id-5a76de1e-cbef-45af-8462-a12efbb8b1ae','product-id-5302f13c-a3f0-43c8-a630-fb1db2f7e01b','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450306646-2.png?alt=media'),('image-id-5ef1050f-a0ae-454c-b99b-9813054f5f8b','product-id-59f98b79-4da7-41c3-9e77-5392b324ecb6','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448027631-1.png?alt=media'),('image-id-5f2828da-26db-4031-9847-774423ff115d','product-id-59f98b79-4da7-41c3-9e77-5392b324ecb6','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448027632-4.png?alt=media'),('image-id-633afcf8-3bb0-4241-9690-fbb03c05dea2','product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447546435-4.png?alt=media'),('image-id-640a8829-c41f-42c2-8c1e-58e77eabdc84','product-id-7a72006b-24b1-4f0b-a144-48f362d81c12','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449204320-1.png?alt=media'),('image-id-6b86e836-12c9-480b-8ceb-cebbdba6e80b','product-id-71f2616e-4999-45f1-b0b5-933254a2e2b5','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693451155995-1.png?alt=media'),('image-id-73d8835f-1612-4298-8727-a267eac093a0','product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693452501752-4.png?alt=media'),('image-id-77985833-cccd-452e-91f5-ce4e6339941a','product-id-87e8f9f9-36cd-484f-9450-971c92da7f96','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450596349-2.png?alt=media'),('image-id-83152b85-feca-4604-9343-07b6b3e6c21b','product-id-f6ee65e1-21fe-47ef-a85c-f48c8433a750','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693390205541-5.jpg?alt=media'),('image-id-84cb81e4-1731-44a0-8b2f-1d36232770d9','product-id-7a72006b-24b1-4f0b-a144-48f362d81c12','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449204322-4.png?alt=media'),('image-id-879ea0c3-c521-4661-ab8d-a0bdc467e14e','product-id-547888e2-546f-414a-b796-edd265058697','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448892126-2.png?alt=media'),('image-id-8b856669-2011-4113-9109-a34f265b53f5','product-id-a53680b7-d425-4e19-ac3d-c503d6c495ee','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693452204503-1.png?alt=media'),('image-id-8d1ca2d5-1c28-4478-bc7d-656e76c685f3','product-id-ed2c1c7c-53e7-4029-8bc6-cab9fb1a2b49','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449674328-4.png?alt=media'),('image-id-973fe58b-059f-4d0a-94f5-b69831978337','product-id-f6ee65e1-21fe-47ef-a85c-f48c8433a750','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693390205540-4.png?alt=media'),('image-id-98bf2e07-fac7-4dcf-938d-8911db7154d2','product-id-ad4ea626-3542-4871-b9dc-bdc90fe16ea8','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450016551-3.png?alt=media'),('image-id-9ef3fca5-006a-4eb7-8545-cb8053fc1909','product-id-87e8f9f9-36cd-484f-9450-971c92da7f96','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450596348-1.png?alt=media'),('image-id-a395d8e7-8304-44e6-b350-040ee98bd08b','product-id-c3046c60-4c13-469c-b3f7-fce1991a97a4','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448395079-2.png?alt=media'),('image-id-ab053782-cda9-4ea6-8c5e-229aa165f67f','product-id-71f2616e-4999-45f1-b0b5-933254a2e2b5','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693451155996-2.png?alt=media'),('image-id-b46beabf-68e6-4272-adfd-09f4a6575272','product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447546435-3.png?alt=media'),('image-id-b9b3269c-64ff-4cec-a66b-d0dfc476cf54','product-id-7a72006b-24b1-4f0b-a144-48f362d81c12','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449204321-3.png?alt=media'),('image-id-bd56fa73-1674-4641-ba6e-b3888737ddd9','product-id-547888e2-546f-414a-b796-edd265058697','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448892128-5.png?alt=media'),('image-id-c48fb6d0-1b2e-4157-8625-820ada3988ac','product-id-f520c238-b75b-4b9c-bdbf-ab5928f07527','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447853743-5.png?alt=media'),('image-id-c6814895-01ab-462d-8e9f-ce4f95f55282','product-id-7a72006b-24b1-4f0b-a144-48f362d81c12','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449204321-2.png?alt=media'),('image-id-c90118f1-71bb-4d41-88d9-008c0314df28','product-id-59f98b79-4da7-41c3-9e77-5392b324ecb6','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448027632-3.png?alt=media'),('image-id-ccac7963-4f70-4a5f-94e2-f4d07b101b8a','product-id-71f2616e-4999-45f1-b0b5-933254a2e2b5','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693451155999-4.png?alt=media'),('image-id-cff92741-4a89-4bfc-9599-8bde94d63d0c','product-id-ed2c1c7c-53e7-4029-8bc6-cab9fb1a2b49','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449674328-5.png?alt=media'),('image-id-d0f6d38f-56b7-4872-b0ab-2abbc1376666','product-id-547888e2-546f-414a-b796-edd265058697','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448892127-4.png?alt=media'),('image-id-d10ec53e-e4f3-4d59-9497-27233dbeab76','product-id-96b67ee3-57b6-417f-8846-9adf56032696','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693451288969-1.png?alt=media'),('image-id-d5a6341c-8504-49f3-b1b7-71e52d386050','product-id-f6ee65e1-21fe-47ef-a85c-f48c8433a750','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693390205540-3.png?alt=media'),('image-id-d98644ee-a014-41c2-b1bc-593aa04305ab','product-id-5302f13c-a3f0-43c8-a630-fb1db2f7e01b','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450306646-3.png?alt=media'),('image-id-db5db141-e5e0-4964-a3d5-f78224c86f78','product-id-59f98b79-4da7-41c3-9e77-5392b324ecb6','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448027631-2.png?alt=media'),('image-id-de19f037-9ae4-4026-b2d9-2ad20d977f74','product-id-547888e2-546f-414a-b796-edd265058697','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448892126-3.png?alt=media'),('image-id-de8e7034-1cdb-4093-a04e-a57c880ac8f0','product-id-f520c238-b75b-4b9c-bdbf-ab5928f07527','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447853742-2.png?alt=media'),('image-id-e2b50368-4be1-473b-af42-dbdd06e7a963','product-id-ad4ea626-3542-4871-b9dc-bdc90fe16ea8','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450016552-4.png?alt=media'),('image-id-e4220b7b-3693-4e2b-81a1-91d7d870c6eb','product-id-87e8f9f9-36cd-484f-9450-971c92da7f96','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450596350-4.png?alt=media'),('image-id-e47409a3-592a-42c9-85ba-5fc5a58c9d46','product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693452501751-2.png?alt=media'),('image-id-e76f7019-7959-4241-8170-5f5be4ee5e3d','product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447546434-1.png?alt=media'),('image-id-e874377b-d328-4361-9014-172c3b6a0b38','product-id-f520c238-b75b-4b9c-bdbf-ab5928f07527','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447853743-4.png?alt=media'),('image-id-ebcb15e7-8c96-464f-8452-d79456efae81','product-id-5302f13c-a3f0-43c8-a630-fb1db2f7e01b','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450306646-1.png?alt=media'),('image-id-ebff93f6-8b2c-458f-84be-bd3586bbeb57','product-id-ad4ea626-3542-4871-b9dc-bdc90fe16ea8','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450016551-1.png?alt=media'),('image-id-ec5ef6f9-5911-4981-a6f3-8dfb4c25ec1b','product-id-87e8f9f9-36cd-484f-9450-971c92da7f96','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450596350-5.png?alt=media'),('image-id-ed01905f-2b65-47af-9bf8-62082c2f4f15','product-id-71f2616e-4999-45f1-b0b5-933254a2e2b5','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693451155996-3.png?alt=media'),('image-id-f5660dd2-5cf8-4cb4-bd44-73dda5e0ef7e','product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447546435-2.png?alt=media'),('image-id-f575ae14-26a2-4683-a2d4-36cf52b81ff0','product-id-a53680b7-d425-4e19-ac3d-c503d6c495ee','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693452204504-4.png?alt=media'),('image-id-f6e7061c-dd00-4435-a34e-3cdac2032b5c','product-id-96b67ee3-57b6-417f-8846-9adf56032696','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693451288970-2.png?alt=media'),('image-id-f8cb5576-7cdf-4cdc-9a52-2741ebd4324c','product-id-f520c238-b75b-4b9c-bdbf-ab5928f07527','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447853741-1.png?alt=media'),('image-id-f954a130-b034-43a1-8a4b-15935e54e88e','product-id-ed2c1c7c-53e7-4029-8bc6-cab9fb1a2b49','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449674328-2.png?alt=media'),('image-id-fbe89347-0fcf-46b5-8db8-1285bdd8711d','product-id-ad4ea626-3542-4871-b9dc-bdc90fe16ea8','https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450016551-2.png?alt=media');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` varchar(50) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_description` text,
  `price` decimal(12,2) DEFAULT NULL,
  `onSale` int DEFAULT NULL,
  `sale_start` timestamp NULL DEFAULT NULL,
  `sale_end` timestamp NULL DEFAULT NULL,
  `quantity` int NOT NULL,
  `primary_img` varchar(255) DEFAULT NULL,
  `disable_status` tinyint(1) DEFAULT '0',
  `engraving` tinyint(1) DEFAULT NULL,
  `product_type` varchar(50) NOT NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `check_onSale_range` CHECK (((`onSale` >= 0) and (`onSale` <= 100)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('product-id-42e9be27-87d2-4b58-b9e2-9a6b5dd425ff','HP02','Active Noise-Cancelling Wireless Headphones',499.99,5,NULL,NULL,98,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447547429-1.png?alt=media',0,1,'feature'),('product-id-5302f13c-a3f0-43c8-a630-fb1db2f7e01b','EP04 Sport Mercedes-AMG','Active Noise-Cancelling True Wireless Earphones',599.00,0,NULL,NULL,3,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450307651-1.png?alt=media',0,0,'trending'),('product-id-547888e2-546f-414a-b796-edd265058697','HPW03 BUGATTI','Active Noise-Cancelling Wireless Headphones',699.00,0,NULL,NULL,100,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448893231-1.png?alt=media',0,1,'trending'),('product-id-59f98b79-4da7-41c3-9e77-5392b324ecb6','HPW01','Wireless Over-Ear Headphones',399.99,0,NULL,NULL,100,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448028545-1.png?alt=media',0,1,'trending'),('product-id-71f2616e-4999-45f1-b0b5-933254a2e2b5','AS01 WIRELESS','Bluetooth Adapter/Transmitter',99.00,3,NULL,NULL,100,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693451156772-1.png?alt=media',0,0,'feature'),('product-id-7a72006b-24b1-4f0b-a144-48f362d81c12','EP01 Sport','Active Noise-Cancelling\nTrue Wireless Earphones',349.99,3,NULL,NULL,100,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449205706-1.png?alt=media',0,0,'feature'),('product-id-87e8f9f9-36cd-484f-9450-971c92da7f96','EP05 BUGATTI','Active Noise-Cancelling True Wireless Earphones',499.00,0,NULL,NULL,93,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450597277-1.png?alt=media',0,1,'new'),('product-id-96b67ee3-57b6-417f-8846-9adf56032696','AS02 Hard Shell Travel Case','For MW75 Wireless Headphones',129.00,5,NULL,NULL,100,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693451289704-1.png?alt=media',0,0,'trending'),('product-id-a53680b7-d425-4e19-ac3d-c503d6c495ee','AS03 Wireless Charge Pad','For MW08 Sport Earphones',99.00,3,NULL,NULL,100,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693452207240-1.png?alt=media',0,0,'feature'),('product-id-ad4ea626-3542-4871-b9dc-bdc90fe16ea8','EP03 Sport Automobili Lamborghini','Active Noise-Cancelling True Wireless Earphones',399.00,0,NULL,NULL,50,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693450017772-1.png?alt=media',0,0,'new'),('product-id-b7ce8efe-e9db-4e8f-a841-faaa5d548229','AS04 GO Charging Case','For EP05 GO Earphones',99.00,0,NULL,NULL,50,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693452502426-1.png?alt=media',0,0,'feature'),('product-id-c3046c60-4c13-469c-b3f7-fce1991a97a4','HPW02 Automobili Lamborghini','Active Noise-Cancelling Wireless Headphones',649.00,0,NULL,NULL,50,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693448398449-1.png?alt=media',0,1,'trending'),('product-id-ed2c1c7c-53e7-4029-8bc6-cab9fb1a2b49','EP02 Sport','Active Noise-Cancelling\nTrue Wireless Earphones',399.00,0,NULL,NULL,100,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693449675575-1.png?alt=media',0,0,'trending'),('product-id-f520c238-b75b-4b9c-bdbf-ab5928f07527','HP03','Wireless Gaming Headphones',449.99,3,NULL,NULL,100,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693447855220-1.png?alt=media',0,1,'feature'),('product-id-f6ee65e1-21fe-47ef-a85c-f48c8433a750','HP01 Automobili Lamborghini','Wireless Gaming Headphones',499.00,0,NULL,NULL,100,'https://firebasestorage.googleapis.com/v0/b/last-project-6fb33.appspot.com/o/1693390206877-1.png?alt=media',0,0,'new');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (1,1),(1,2),(1,3),(2,4),(2,5),(3,5);
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  `role_description` text,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `priority` int DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'SuperAdmin','Full permission','2023-08-23 07:01:39',3),(2,'Admin','CRUD permison','2023-08-23 07:01:39',2),(3,'Manager','Customers permison','2023-08-23 07:01:39',1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(50) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('aa736efd-6368-4c3b-95b2-7da2008729b6',1),('d2f8155b-261e-49c7-8dfc-da6b8ee7aa23',3),('d4423cfb-170a-4716-8e64-181893628a1c',3),('e99ace00-5cca-4101-92b7-979f7c78295a',2);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `private_key` varchar(255) DEFAULT NULL,
  `user_status` varchar(50) DEFAULT 'active',
  `verification_code` varchar(50) DEFAULT NULL,
  `verification_expires` timestamp NULL DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('aa736efd-6368-4c3b-95b2-7da2008729b6','thang7muangau','unknown@gmail.com','$2b$10$CQCMSAYCy3maoTvFiLBcDOU.xbOE/wdNevkkgJO00f2LZBht1xBre','2023-08-24 03:36:14','2023-09-14 01:49:44',NULL,'active',NULL,NULL,NULL),('d2f8155b-261e-49c7-8dfc-da6b8ee7aa23','phuth.admin','phutr0110@gmail.com','$2b$10$Cd3UR4i.yr0iLCI.tMlPS.yVjN9onhuY2O/qjnp.SdjS.H.mWCOHq','2023-08-24 02:31:19',NULL,NULL,'active',NULL,NULL,NULL),('d4423cfb-170a-4716-8e64-181893628a1c','thattichmuangau','test.email@gmail.com','$2b$10$TDElqsL69abuEZFBA4QAxe6pHydzGFHD8ZlMRoXt8zyd6.sjfxEH2','2023-08-24 03:28:08',NULL,NULL,'active',NULL,NULL,NULL),('e99ace00-5cca-4101-92b7-979f7c78295a','hanhAdmin','phutran.jp1@gmail.com','$2b$10$TSquI0ejIkhbOxJ.HjmhhuFtd0sxAx8a5YdSYwdc3iYFlv6b93g7G','2023-08-22 10:31:40','2023-08-23 08:01:04',NULL,'active',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlOTlhY2UwMC01Y2NhLTQxMDEtOTJiNy05NzlmN2M3ODI5NWEiLCJ1c2VybmFtZSI6ImhhbmhBZG1pbiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5Mjc3NzY2NCwiZXhwIjoxNjkzMzgyNDY0fQ.oRo2bztrlkljEzAjE2pzP6eKRyCtrwYQJ57QWYZIaVU');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-14 13:56:16
