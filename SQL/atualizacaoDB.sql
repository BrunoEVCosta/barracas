
ALTER TABLE Reservas add del bool DEFAUlt 0;

DROP TABLE IF EXISTS `Pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pago` ( 
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` float(10) NOT NULL,
  `pago` bool DEFAULT 0,
  `reservaId` int(11) NOT NULL,
  `comentarioId` int(11) DEFAULT NULL,
  `operadorId` int(11) NOT NULL,
  `em` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `Pago_fk0` (`reservaId`),
  KEY `Pago_fk1` (`comentarioId`),
  KEY `Pago_fk2` (`operadorId`),
  CONSTRAINT `Pago_fk0` FOREIGN KEY (`reservaId`) REFERENCES `Reservas` (`id`),
  CONSTRAINT `Pago_fk1` FOREIGN KEY (`comentarioId`) REFERENCES `Comentarios` (`id`),
  CONSTRAINT `Pago_fk2` FOREIGN KEY (`operadorId`) REFERENCES `Pessoas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `ReservasEdicoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ReservasEdicoes` ( 
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `inicio` date NOT NULL,
  `fim` date NOT NULL,
  `valor` float(10) NOT NULL,
  `reservaId` int(11) NOT NULL,
  `comentarioId` int(11) DEFAULT NULL,
  `operadorId` int(11) NOT NULL,
  `em` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `ReservasEdicoes_fk0` (`reservaId`),
  KEY `ReservasEdicoes_fk1` (`comentarioId`),
  KEY `ReservasEdicoes_fk2` (`operadorId`),
  CONSTRAINT `ReservasEdicoes_fk0` FOREIGN KEY (`reservaId`) REFERENCES `Reservas` (`id`),
  CONSTRAINT `ReservasEdicoes_fk1` FOREIGN KEY (`comentarioId`) REFERENCES `Comentarios` (`id`),
  CONSTRAINT `ReservasEdicoes_fk2` FOREIGN KEY (`operadorId`) REFERENCES `Pessoas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

ALTER TABLE Reservas CHANGE dataInicio inicio DATE NOT NULL;
ALTER TABLE Reservas CHANGE dataFim fim DATE NOT NULL;