# Obsidian Relay

Datenbankbasierte Webanwendung für ein MMORPG-Handelssystem.

## Kurzbeschreibung

Obsidian Relay ist ein browserbasiertes Handelsmodul in Sci-Fi-Optik. Spieler können sich registrieren, einloggen, im Relay navigieren, NPC-Händler auswählen, Items kaufen und verkaufen, ihr Inventar einsehen und alle Handelsaktionen als Transaktionen nachverfolgen.

![Roadmap](media/readme\_img/website.png)

---

**Projekt Roadmap**

![Roadmap](media/readme\_img/roadmap.png)

---

**Datenbank Design**

![Datenbank Struktur](media/readme\_img/database.png)

---

**System Architektur**

![Architektur](media/readme\_img/architektur.png)

---

**Frontend Mockup**

![Architektur](media/readme\_img/mockup.png)

## Enthaltene Kernfunktionen

- Registrierung und Login
- JWT-geschützte API-Routen
- Zentrales Relay als Navigationshub
- Marketplace mit mehreren NPC-Händlern
- Inventory/Habitat mit Stacks und Item-Icons
- Transaktionsübersicht für Käufe und Verkäufe
- Futuristische UI mit eigener Bildsprache, Icons und Hintergrundmedien

## Technischer Aufbau

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Datenbank: MariaDB
- Authentifizierung: bcrypt + JWT
- Datenzugriff: MySQL/MariaDB über Models und Controller

## API-Endpunkte

- POST /api/auth/register – Registrierung
- POST /api/auth/login – Login
- GET /api/inventory – Spielerinventar
- GET /api/market/npcs – NPC-Händler laden
- POST /api/market/buy – Item kaufen
- POST /api/market/sell – Item verkaufen
- GET /api/transactions – Transaktionen abrufen

## Funktionsweise

Das System basiert auf einer relationalen Datenbankstruktur:

- Items werden zentral in der Tabelle `items` verwaltet
- NPC-Händler sind über `npc_items` mit Items verknüpft
- Das Inventar speichert Items pro Benutzer mit Mengen (`quantity`)
- Käufe und Verkäufe werden in der Tabelle `transactions` protokolliert

## Sicherheit

- Passwörter werden mit bcrypt gehasht gespeichert
- Authentifizierung erfolgt über JSON Web Tokens (JWT)
- Geschützte Routen erfordern ein gültiges Token im Header

## Voraussetzungen

- Node.js
- MariaDB / MySQL
- Ein Browser
- Optional: HeidiSQL oder ein ähnliches Datenbanktool

## Installation

1. Datenbank anlegen und befüllen
   - MariaDB starten
   - `database/schema.sql` ausführen
   - Die Datei erstellt die Datenbank `obsidian` und legt Tabellen sowie Seed-Daten an

2. Backend vorbereiten
   - In den Ordner `backend` wechseln

   - Abhängigkeiten installieren:
     ```bash
     npm install
     ```
   - Server starten:
     ```bash
     node server.js
     ```

3. Anwendung öffnen
   - Im Browser öffnen:
     ```
     http://localhost:3000/login.html
     ```
![Roadmap](media/readme\_img/install.png)

## Testzugang

Nach dem Import des Schemas ist ein Demo-Account vorhanden:

- Benutzername: `test`
- E-Mail: `test@test.de`
- Passwort: `1234`

## Projektstruktur

- `backend/` – Server, Controller, Models, Routen
- `frontend/` – HTML, CSS, JavaScript
- `database/schema.sql` – Datenbankschema und Seed-Daten
- `media/` – Bilder, Icons, Videos und weitere Medien
- `Konzeption/` – GDD, Projektplan und Protokoll

