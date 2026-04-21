-- Films table
CREATE TABLE IF NOT EXISTS films (
    id TEXT PRIMARY KEY NOT NULL,
    rating REAL NOT NULL,
    director TEXT NOT NULL,
    tags TEXT NOT NULL,
    image TEXT NOT NULL,
    cover TEXT NOT NULL,
    title TEXT NOT NULL,
    about TEXT NOT NULL,
    description TEXT NOT NULL
);

-- Schedules table
CREATE TABLE IF NOT EXISTS schedules (
    id TEXT PRIMARY KEY NOT NULL,
    daytime TEXT NOT NULL,
    hall INTEGER NOT NULL,
    rows INTEGER NOT NULL,
    seats INTEGER NOT NULL,
    price REAL NOT NULL,
    taken TEXT NOT NULL,
    filmId TEXT,
    FOREIGN KEY (filmId) REFERENCES films(id) ON DELETE CASCADE
);