-- MySQL dump 10.16  Distrib 10.1.35-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: barracas
-- ------------------------------------------------------
-- Server version	10.1.35-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Acesso`
--

DROP TABLE IF EXISTS `Acesso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Acesso` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `pessoasId` int(5) NOT NULL,
  `acesso` datetime DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(50) NOT NULL,
  `platform` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessToken` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valid` tinyint(1) DEFAULT '0',
  `revokedOn` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Acesso_fk0` (`pessoasId`),
  CONSTRAINT `Acesso_fk0` FOREIGN KEY (`pessoasId`) REFERENCES `Pessoas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Acesso`
--

LOCK TABLES `Acesso` WRITE;
/*!40000 ALTER TABLE `Acesso` DISABLE KEYS */;
INSERT INTO `Acesso` VALUES (1,1,'2018-08-26 00:44:54',0,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/5','7vrdrk6l1irphv7qou9hroj3gj48l84lbsrjsewarc44if68shzp4mmgkengzv',1,NULL),(2,1,'2018-08-26 00:52:00',0,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/5','p29tkulkmwho0hxrvim2966evn98vkus5x4puqjjq2ycigdpxjqm5dkpagopah',1,NULL),(3,1,'2018-08-26 01:07:06',0,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/5','9uwvs7g7rifrv2rp1ulwjskl1t5gh2uz7ack36y66ysl5cu7ic47duv3t6myzz',1,NULL),(4,1,'2018-08-26 01:08:08',0,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/5','sd7d292yfvck43j7e0wn5z5zrxvlcq659rxupue6lmru95rrr9r2svifkxziik',1,NULL),(5,1,'2018-08-26 01:10:23',0,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/5','wmz4qarqpypbj77c90grxr476wejv5rxfdzxkx0m9n76uhvbv18ib911gm3j43',1,NULL),(6,1,'2018-08-26 01:25:58',0,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/5','7gu19xxsce8zvd6o42hd85ec4ptbdaixygetzjd5tz1djaa5mr3pgxw72qkns9',1,NULL),(7,1,'2018-08-26 01:28:03',0,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/5','p6k4gti7rkjozljitpy0ni1bfw6t5suuin5a50p0lgqr0fn8t1nunox0umujpr',1,NULL);
/*!40000 ALTER TABLE `Acesso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Aluguer`
--

DROP TABLE IF EXISTS `Aluguer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Aluguer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barracaChapeusId` int(5) NOT NULL,
  `nome` varchar(254) DEFAULT NULL,
  `data` datetime DEFAULT CURRENT_TIMESTAMP,
  `valor` float NOT NULL,
  `comentarioId` int(10) DEFAULT NULL,
  `senha` int(10) DEFAULT NULL,
  `lote` int(11) DEFAULT NULL,
  `operadorId` int(11) NOT NULL,
  `registo` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `Aluguer_fk0` (`barracaChapeusId`),
  KEY `Aluguer_fk1` (`comentarioId`),
  KEY `Aluguer_fk2` (`operadorId`),
  CONSTRAINT `Aluguer_fk0` FOREIGN KEY (`barracaChapeusId`) REFERENCES `BarracasChapeus` (`id`),
  CONSTRAINT `Aluguer_fk1` FOREIGN KEY (`comentarioId`) REFERENCES `Comentarios` (`id`),
  CONSTRAINT `Aluguer_fk2` FOREIGN KEY (`operadorId`) REFERENCES `Pessoas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Aluguer`
--

LOCK TABLES `Aluguer` WRITE;
/*!40000 ALTER TABLE `Aluguer` DISABLE KEYS */;
INSERT INTO `Aluguer` VALUES (1,1,'','2018-08-14 00:00:00',7,NULL,1,1,1,'2018-08-21 00:00:00'),(2,2,'','0000-00-00 00:00:00',8,NULL,999999,999999,1,'0000-00-00 00:00:00'),(3,2,'','0000-00-00 00:00:00',8,NULL,999999,999999,1,'2018-08-23 14:09:04'),(4,2,'','0000-00-00 00:00:00',8,NULL,999999,999999,1,'2018-08-23 14:09:49'),(5,2,'','0000-00-00 00:00:00',8,NULL,999999,999999,1,'2018-08-23 14:10:25'),(6,1,'','2018-08-23 21:48:21',0,NULL,999999,999999,1,'2018-08-23 21:48:21'),(7,12,'','2018-08-23 21:48:27',0,NULL,999999,999999,1,'2018-08-23 21:48:27'),(8,9,'','2018-08-23 21:48:33',0,NULL,999999,999999,1,'2018-08-23 21:48:33'),(9,5,'','2018-08-23 21:48:53',0,NULL,999999,999999,1,'2018-08-23 21:48:53'),(10,1,'','2018-08-23 23:15:48',0,NULL,999999,999999,1,'2018-08-23 23:15:48'),(11,7,'','2018-08-23 23:24:30',0,NULL,999999,999999,1,'2018-08-23 23:24:30'),(12,17,'','2018-08-23 23:54:17',0,NULL,999999,999999,1,'2018-08-23 23:54:17'),(13,17,'','2018-08-23 23:54:38',0,NULL,999999,999999,1,'2018-08-23 23:54:38'),(14,16,'','2018-08-23 23:54:43',0,NULL,999999,999999,1,'2018-08-23 23:54:43'),(15,14,'','2018-08-23 23:54:48',0,NULL,999999,999999,1,'2018-08-23 23:54:48'),(16,19,'','2018-08-23 23:56:34',7,NULL,999999,999999,1,'2018-08-23 23:56:34'),(17,21,'','2018-08-23 23:57:03',5,NULL,999999,999999,1,'2018-08-23 23:57:03'),(18,14,'','2018-08-23 23:58:17',7,NULL,999999,999999,1,'2018-08-23 23:58:17'),(19,14,'','2018-08-23 23:59:38',7,NULL,999999,999999,1,'2018-08-23 23:59:38'),(20,14,'','2018-08-23 23:59:44',0,NULL,999999,999999,1,'2018-08-23 23:59:44'),(44,15,'','2018-08-24 09:54:27',8,NULL,999999,999999,1,'2018-08-24 09:54:27'),(45,15,'','2018-08-24 21:09:24',75,NULL,999999,999999,1,'2018-08-24 21:09:24'),(46,15,'','2018-08-24 21:14:01',75,NULL,999999,999999,1,'2018-08-24 21:14:01'),(47,15,'','2018-08-24 21:14:01',75,NULL,999999,999999,1,'2018-08-24 21:14:01');
/*!40000 ALTER TABLE `Aluguer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BarracasChapeus`
--

DROP TABLE IF EXISTS `BarracasChapeus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BarracasChapeus` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `numero` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subTipo` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `localizacao` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BarracasChapeus`
--

LOCK TABLES `BarracasChapeus` WRITE;
/*!40000 ALTER TABLE `BarracasChapeus` DISABLE KEYS */;
INSERT INTO `BarracasChapeus` VALUES (1,'1','Barraca','Frontal','Fila 1'),(2,'1A','Barraca','Frontal','Fila 1'),(3,'2','Barraca','Lateral','Fila 1'),(4,'3','Barraca','Lateral','Fila 1'),(5,'4','Barraca','Lateral','Fila 1'),(6,'5','Barraca','Lateral','Fila 1'),(7,'6','Barraca','Lateral','Fila 1'),(8,'7','Barraca','Lateral','Fila 1'),(9,'8','Barraca','Lateral','Fila 1'),(10,'9','Barraca','Lateral','Fila 1'),(11,'10','Barraca','Lateral','Fila 1'),(12,'11','Barraca','Lateral','Fila 1'),(13,'12','Barraca','Lateral','Fila 1'),(14,'14','Barraca','Frontal','Fila 2'),(15,'14A','Barraca','Frontal','Fila 2'),(16,'15','Barraca','Lateral','Fila 2'),(17,'16','Barraca','Lateral','Fila 2'),(18,'17','Barraca','Lateral','Fila 2'),(19,'18','Barraca','Lateral','Fila 2'),(20,'19','Barraca','Lateral','Fila 2'),(21,'20','Barraca','Lateral','Fila 2'),(22,'21','Barraca','Lateral','Fila 2'),(23,'22','Barraca','Lateral','Fila 2'),(24,'23','Barraca','Lateral','Fila 2'),(25,'24','Barraca','Traseira','Fila 3'),(26,'25','Barraca','Traseira','Fila 3'),(27,'26','Barraca','Traseira','Fila 3'),(28,'27','Barraca','Traseira','Fila 3'),(29,'28','Barraca','Traseira','Fila 3'),(30,'29','Barraca','Traseira','Fila 3'),(31,'30','Barraca','Traseira','Fila 3'),(32,'31','Barraca','Traseira','Fila 3'),(33,'32','Barraca','Traseira','Fila 3'),(34,'33','Barraca','Traseira','Fila 3'),(35,'34','Barraca','Frontal','Fila 4'),(36,'34A','Barraca','Frontal','Fila 4'),(37,'35','Barraca','Lateral','Fila 4'),(38,'36','Barraca','Lateral','Fila 4'),(39,'37','Barraca','Lateral','Fila 4'),(40,'38','Barraca','Lateral','Fila 4'),(41,'39','Barraca','Lateral','Fila 4'),(42,'40','Barraca','Lateral','Fila 4'),(43,'41','Barraca','Lateral','Fila 4'),(44,'42','Barraca','Lateral','Fila 4'),(45,'43','Barraca','Lateral','Fila 4'),(46,'44','Barraca','Frontal','Fila 5'),(47,'45','Barraca','Lateral','Fila 5'),(48,'46','Barraca','Lateral','Fila 5'),(49,'47','Barraca','Lateral','Fila 5'),(50,'48','Barraca','Lateral','Fila 5'),(51,'49','Barraca','Lateral','Fila 5'),(52,'50','Barraca','Lateral','Fila 5'),(53,'51','Barraca','Lateral','Fila 5'),(54,'52','Barraca','Lateral','Fila 5'),(55,'53','Barraca','Lateral','Fila 5');
/*!40000 ALTER TABLE `BarracasChapeus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comentarios`
--

DROP TABLE IF EXISTS `Comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comentario` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comentarios`
--

LOCK TABLES `Comentarios` WRITE;
/*!40000 ALTER TABLE `Comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pessoas`
--

DROP TABLE IF EXISTS `Pessoas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pessoas` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissao` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hash` varchar(65) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdOn` datetime DEFAULT CURRENT_TIMESTAMP,
  `confirmationToken` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `attempt` int(5) DEFAULT '0',
  `ban` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pessoas`
--

LOCK TABLES `Pessoas` WRITE;
/*!40000 ALTER TABLE `Pessoas` DISABLE KEYS */;
INSERT INTO `Pessoas` VALUES (1,'Bruno Costa','brunovasquescosta@gmail.com','admin','be57a929a1377a009245e9c31f287e38609822752c6dfe5f89b9f6baf4c9696f','2018-08-25 00:00:00','209ie9320ie2eopqidadi320',1,0,0);
/*!40000 ALTER TABLE `Pessoas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Preco`
--

DROP TABLE IF EXISTS `Preco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Preco` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  `valor` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preco`
--

LOCK TABLES `Preco` WRITE;
/*!40000 ALTER TABLE `Preco` DISABLE KEYS */;
/*!40000 ALTER TABLE `Preco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservas`
--

DROP TABLE IF EXISTS `Reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reservas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barracaChapeusId` int(5) NOT NULL,
  `nome` varchar(254) NOT NULL,
  `dataInicio` date NOT NULL,
  `dataFim` date NOT NULL,
  `valor` float NOT NULL,
  `comentarioId` int(10) DEFAULT NULL,
  `operadorId` int(11) NOT NULL,
  `registo` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `Reservas_fk0` (`barracaChapeusId`),
  KEY `Reservas_fk1` (`comentarioId`),
  KEY `Reservas_fk2` (`operadorId`),
  CONSTRAINT `Reservas_fk0` FOREIGN KEY (`barracaChapeusId`) REFERENCES `BarracasChapeus` (`id`),
  CONSTRAINT `Reservas_fk1` FOREIGN KEY (`comentarioId`) REFERENCES `Comentarios` (`id`),
  CONSTRAINT `Reservas_fk2` FOREIGN KEY (`operadorId`) REFERENCES `Pessoas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservas`
--

LOCK TABLES `Reservas` WRITE;
/*!40000 ALTER TABLE `Reservas` DISABLE KEYS */;
INSERT INTO `Reservas` VALUES (1,15,'','2018-08-01','2018-08-31',75,NULL,1,'2018-08-24 21:15:19'),(2,15,'','2018-08-01','2018-08-31',75,NULL,1,'2018-08-24 21:15:20'),(3,15,'','2018-08-01','2018-08-31',75,NULL,1,'2018-08-24 21:15:20'),(4,15,'António Pires','2018-08-01','2018-08-31',75,NULL,1,'2018-08-24 21:16:15'),(5,17,'António Pires','2018-08-01','2018-08-31',75,NULL,1,'2018-08-24 21:16:15'),(6,15,'António Pires','2018-08-01','2018-08-31',75,NULL,1,'2018-08-24 21:16:15'),(7,15,'António Pires','2018-08-01','2018-08-31',75,NULL,1,'2018-08-24 21:16:15'),(8,12,'','2018-08-13','2018-08-25',40,NULL,1,'2018-08-24 21:20:46'),(9,25,'Peta Roberto','2018-08-01','2018-08-31',75,NULL,1,'2018-08-24 21:45:15'),(10,37,'Sara Prata','2018-08-24','2018-09-02',75,NULL,1,'2018-08-24 21:45:54'),(11,35,'Monica','2018-08-25','2018-08-31',75,NULL,1,'2018-08-25 00:53:38');
/*!40000 ALTER TABLE `Reservas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-26  1:32:19
