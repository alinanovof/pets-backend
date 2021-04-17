CREATE TABLE IF NOT EXISTS users (
  id                 VARCHAR(36) DEFAULT (UUID()),
  email              VARCHAR(255) NOT NULL UNIQUE,
  password_hash      VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  tel INT(20) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);