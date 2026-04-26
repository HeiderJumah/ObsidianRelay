-- =========================
-- CREATE DATABASE
-- =========================
CREATE DATABASE IF NOT EXISTS obsidian;
USE obsidian;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255),
  gold INT DEFAULT 1000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- ITEMS
-- =========================
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  price INT NOT NULL,
  icon VARCHAR(255)
);

-- =========================
-- NPCS
-- =========================
CREATE TABLE npcs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  gold INT DEFAULT 5000
);

-- =========================
-- NPC ITEMS (RELATION)
-- =========================
CREATE TABLE npc_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  npc_id INT,
  item_id INT,
  FOREIGN KEY (npc_id) REFERENCES npcs(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);

-- =========================
-- INVENTORY
-- =========================
CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  item_id INT,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);

-- =========================
-- TRANSACTIONS
-- =========================
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  item_id INT,
  quantity INT,
  price INT,
  type ENUM('buy', 'sell'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);

-- =========================
-- SEED DATA
-- =========================

-- USERS (optional test user)
INSERT INTO users (username, email, password, gold) VALUES
('test', 'test@test.de', '1234', 1000);

-- NPCS
INSERT INTO npcs (name, description, gold) VALUES
('Nyx Virel', 'Fragment-Händlerin', 1000),
('Kade Strix', 'Impuls-Schmied', 1000),
('Iris Halden', 'Lichtarchivarin', 1000),
('Dorian Vale', 'Null-Händler', 1000);

-- ITEMS
INSERT INTO items (title, description, price) VALUES
('Echo Shard', 'Ein flackerndes Datenfragment unbekannter Herkunft', 120),
('Memory Patch', 'Stabilisiert beschädigte Erinnerungen', 90),
('Fragment Clock', 'Manipuliert Zeitfragmente minimal', 150),
('Pulse Booster', 'Erhöht kurzfristig Bewegungsgeschwindigkeit', 130),
('Overclock Chip', 'Steigert Systemleistung auf Risiko', 160),
('Stability Core', 'Reduziert Instabilität bei Overloads', 110),
('Lumen Beacon', 'Erzeugt Lichtsignale zur Orientierung', 100),
('Phase Lens', 'Erlaubt das Sehen durch fragmentierte Ebenen', 140),
('Radiant Charge', 'Speichert und entlädt Lichtenergie', 125),
('Catalyst', 'Verstärkt Effekte – unvorhersehbar', 200),
('Entropy Module', 'Erhöht Chaos im System für mächtige Effekte', 220),
('Null Stick', 'Objekt aus dem Nullraum – unbekannte Funktion', 300);

-- NPC ITEMS
INSERT INTO npc_items (npc_id, item_id) VALUES
(1,1),(1,2),(1,3),
(2,4),(2,5),(2,6),
(3,7),(3,8),(3,9),
(4,10),(4,11),(4,12);