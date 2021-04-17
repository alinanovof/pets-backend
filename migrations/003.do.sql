CREATE TABLE IF NOT EXISTS pets (
  id            VARCHAR(36) DEFAULT (UUID()),
  type      VARCHAR(10) NOT NULL,
  name      VARCHAR(100) NOT NULL,
  adopt_status  VARCHAR(20),
  image_link    VARCHAR(200),
  pet_height    INT,
  pet_weight    INT,
  color         VARCHAR(15) NOT NULL,
  bio           TEXT(800),
  hypoallerg     BOOLEAN NOT NULL,
  diet_restr    VARCHAR(100),
  breed         VARCHAR(100),
PRIMARY KEY (id)
);