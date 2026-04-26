# Obsidian Relay

Datenbankbasierte Webanwendung für ein MMORPG-Handelssystem.

## Kurzbeschreibung

Obsidian Relay ist ein browserbasiertes Handelsmodul in Sci-Fi-Optik. Spieler können sich registrieren, einloggen, im Relay navigieren, NPC-Händler auswählen, Items kaufen und verkaufen, ihr Inventar einsehen und alle Handelsaktionen als Transaktionen nachverfolgen.

---

**Projektübersicht**

Das Projekt simuliert ein Handelssystem aus einem MMORPG, bei dem Spieler mit NPC-Händlern interagieren können.

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

## Testzugang

Nach dem Import des Schemas ist ein Demo-Account vorhanden:

- Benutzername: `test`
- E-Mail: `test@test.de`
- Passwort: `test1234`

## Projektstruktur

- `backend/` – Server, Controller, Models, Routen
- `frontend/` – HTML, CSS, JavaScript
- `database/schema.sql` – Datenbankschema und Seed-Daten
- `media/` – Bilder, Icons, Videos und weitere Medien
- `Konzeption/` – GDD, Projektplan und Protokoll

## Hinweis zu Medien und Quellen

Falls im Projekt externe Medien, Third-Party-Assets oder KI-generierte Inhalte verwendet wurden, sollten diese in einem Medienkatalog dokumentiert werden. Dazu gehören:

- Dateiname
- Verwendungszweck
- Quelle / Lizenz / Prompt
- ggf. eigene Anpassungen

Das ist besonders wichtig für die Abgabe, da externe Inhalte transparent nachvollziehbar sein müssen.

## Abgabehinweis

Die finale Abgabe sollte sauber in die geforderte Ordnerstruktur gebracht werden:

- `Endergebnis`
- `Konzeption`
- `Arbeitsdateien`
- `Material`

## Projektstand

Die Anwendung ist funktional aufgebaut und enthält bereits die wichtigsten Kernbereiche des Handelssystems. Einige Seiten dienen aktuell noch als strukturelle Platzhalter für spätere Erweiterungen.

