-- Vytvor tabulku "items"
CREATE TABLE IF NOT EXISTS reservations ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  date_begin TEXT,
  time_begin TEXT,
  date_end TEXT,
  time_end TEXT
);