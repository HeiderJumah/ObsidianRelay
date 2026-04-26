-- Obsidian Relay - schema.sql
-- MariaDB / MySQL 8+

CREATE DATABASE IF NOT EXISTS obsidian
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE obsidian;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS npc_items;
DROP TABLE IF EXISTS npcs;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- -------------------------
-- USERS
-- -------------------------
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  gold INT NOT NULL DEFAULT 1000,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_users_username (username),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

-- -------------------------
-- ITEMS
-- -------------------------
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price INT NOT NULL,
  icon VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB;

-- -------------------------
-- NPCS
-- -------------------------
CREATE TABLE npcs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  avatar VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB;

-- -------------------------
-- NPC <-> ITEMS (shop assortment)
-- -------------------------
CREATE TABLE npc_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  npc_id INT NOT NULL,
  item_id INT NOT NULL,
  UNIQUE KEY uq_npc_items (npc_id, item_id),
  CONSTRAINT fk_npc_items_npc
    FOREIGN KEY (npc_id) REFERENCES npcs(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_npc_items_item
    FOREIGN KEY (item_id) REFERENCES items(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -------------------------
-- INVENTORY
-- -------------------------
CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  UNIQUE KEY uq_inventory_user_item (user_id, item_id),
  CONSTRAINT fk_inventory_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_inventory_item
    FOREIGN KEY (item_id) REFERENCES items(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -------------------------
-- TRANSACTIONS
-- -------------------------
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  price INT NOT NULL,
  type ENUM('buy', 'sell') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_transactions_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_transactions_item
    FOREIGN KEY (item_id) REFERENCES items(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -------------------------
-- SEED DATA
-- -------------------------

-- Demo user for testing
-- Password: test1234
INSERT INTO users (username, email, password, gold) VALUES
('test', 'test@test.de', '$2b$10$PoR59mzV1CpQGpQ.x4v5h.D8k5XvC4H2b8KXMqLvpULjT.A1ISl.i', 1000);

-- NPCs
INSERT INTO npcs (name, description, avatar) VALUES
('Nyx Virel', 'Fragment-Händlerin', NULL),
('Kade Strix', 'Impuls-Schmied', NULL),
('Iris Halden', 'Lichtarchivarin', NULL),
('Dorian Vale', 'Null-Händler', NULL);

-- Items
INSERT INTO items (title, description, price, icon) VALUES
('Echo Shard', 'Ein flackerndes Datenfragment unbekannter Herkunft', 120, 'echo_shard.png'),
('Memory Patch', 'Stabilisiert beschädigte Erinnerungen', 90, 'memory_patch.png'),
('Fragment Clock', 'Manipuliert Zeitfragmente minimal', 150, 'fragment_clock.png'),
('Pulse Booster', 'Erhöht kurzfristig Bewegungsgeschwindigkeit', 130, 'pulse_booster.png'),
('Overclock Chip', 'Steigert Systemleistung auf Risiko', 160, 'overclocked_chip.png'),
('Stability Core', 'Reduziert Instabilität bei Overloads', 110, 'stability_core.png'),
('Lumen Beacon', 'Erzeugt Lichtsignale zur Orientierung', 100, 'lumen_beacon.png'),
('Phase Lens', 'Erlaubt das Sehen durch fragmentierte Ebenen', 140, 'phase_lens.png'),
('Radiant Charge', 'Speichert und entlädt Lichtenergie', 125, 'radiant_charge.png'),
('Catalyst', 'Verstärkt Effekte – unvorhersehbar', 200, 'catalyst.png'),
('Entropy Module', 'Erhöht Chaos im System für mächtige Effekte', 220, 'entropy_module.png'),
('Null Stick', 'Objekt aus dem Nullraum – unbekannte Funktion', 300, 'null_stick.png');

-- NPC item assortments
INSERT INTO npc_items (npc_id, item_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 4), (2, 5), (2, 6),
(3, 7), (3, 8), (3, 9),
(4, 10), (4, 11), (4, 12);

-- Starter inventory for the demo user (id = 1)
INSERT INTO inventory (user_id, item_id, quantity) VALUES
(1, 1, 2),
(1, 2, 1),
(1, 4, 3);