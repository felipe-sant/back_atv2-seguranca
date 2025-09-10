DROP TABLE IF EXISTS users,
contacts;

CREATE TABLE
    users (
        id SERIAL NOT NULL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
    );

CREATE TABLE
    contacts (
        id SERIAL NOT NULL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(100) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    tokens (
        id SERIAL NOT NULL PRIMARY KEY,
        token VARCHAR(500) NOT NULL
    );