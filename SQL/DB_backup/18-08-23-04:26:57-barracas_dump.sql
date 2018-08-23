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
-- Table structure for table `Aluger`
--

DROP TABLE IF EXISTS `Aluger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Aluger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barracaChapeuId` int(5) NOT NULL,
  `nome` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` date NOT NULL,
  `valor` float NOT NULL,
  `comentarioId` int(10) DEFAULT NULL,
  `senha` int(10) NOT NULL,
  `lote` int(11) NOT NULL,
  `operador` int(11) NOT NULL,
  `registo` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Aluger_fk0` (`barracaChapeuId`),
  KEY `Aluger_fk1` (`comentarioId`),
  KEY `Aluger_fk2` (`operador`),
  CONSTRAINT `Aluger_fk0` FOREIGN KEY (`barracaChapeuId`) REFERENCES `BarracasChapeus` (`id`),
  CONSTRAINT `Aluger_fk1` FOREIGN KEY (`comentarioId`) REFERENCES `Comentarios` (`id`),
  CONSTRAINT `Aluger_fk2` FOREIGN KEY (`operador`) REFERENCES `Pessoas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Aluger`
--

LOCK TABLES `Aluger` WRITE;
/*!40000 ALTER TABLE `Aluger` DISABLE KEYS */;
/*!40000 ALTER TABLE `Aluger` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BarracasChapeus`
--

LOCK TABLES `BarracasChapeus` WRITE;
/*!40000 ALTER TABLE `BarracasChapeus` DISABLE KEYS */;
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
  `permissao` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pessoas`
--

LOCK TABLES `Pessoas` WRITE;
/*!40000 ALTER TABLE `Pessoas` DISABLE KEYS */;
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
  `tipo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `barracaChapeuId` int(5) NOT NULL,
  `nome` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dataInicio` date NOT NULL,
  `dataFim` date NOT NULL,
  `valor` float NOT NULL,
  `comentarioId` int(10) DEFAULT NULL,
  `operadorId` int(11) NOT NULL,
  `registo` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Reservas_fk0` (`barracaChapeuId`),
  KEY `Reservas_fk1` (`comentarioId`),
  KEY `Reservas_fk2` (`operadorId`),
  CONSTRAINT `Reservas_fk0` FOREIGN KEY (`barracaChapeuId`) REFERENCES `BarracasChapeus` (`id`),
  CONSTRAINT `Reservas_fk1` FOREIGN KEY (`comentarioId`) REFERENCES `Comentarios` (`id`),
  CONSTRAINT `Reservas_fk2` FOREIGN KEY (`operadorId`) REFERENCES `Pessoas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservas`
--

LOCK TABLES `Reservas` WRITE;
/*!40000 ALTER TABLE `Reservas` DISABLE KEYS */;
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

-- Dump completed on 2018-08-23  4:26:59
