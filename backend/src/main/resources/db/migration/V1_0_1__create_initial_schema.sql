CREATE TABLE city (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    state VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7)
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(255) NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    city_id INT REFERENCES city(id)
);

CREATE TABLE ocurrence (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    address VARCHAR(255),
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    status VARCHAR(50) NOT NULL,
    total_confirmation BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL REFERENCES users(id),
    category_id INT NOT NULL REFERENCES category(id),
    city_id INT NOT NULL REFERENCES city(id)
);

CREATE TABLE ocurrence_photo (
    id SERIAL PRIMARY KEY,
    url VARCHAR(512) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ocurrence_id INT NOT NULL REFERENCES ocurrence(id) ON DELETE CASCADE
);

CREATE TABLE confirmation (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    ocurrence_id INT NOT NULL REFERENCES ocurrence(id) ON DELETE CASCADE,
    confirmed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uc_user_ocurrence UNIQUE (user_id, ocurrence_id)
);

CREATE TABLE status_history (
    id SERIAL PRIMARY KEY,
    current_status VARCHAR(50) NOT NULL,
    prev_status VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ocurrence_id INT NOT NULL REFERENCES ocurrence(id) ON DELETE CASCADE
);

INSERT INTO city (name, state, country, latitude, longitude)
VALUES ('Natal', 'Rio Grande do Norte', 'Brasil', -5.7944800, -35.2110000);

INSERT INTO category (name, icon, description, active) VALUES
('Buraco na Via', 'pothole', 'Buracos, crateras ou afundamentos no asfalto.', true),
('Iluminacao Publica','lightning', 'Postes apagados, lampadas queimadas ou piscando.', true),
('Lixo Acumulado', 'garbage', 'Descarte irregular de lixo ou entulho em vias publicas.', true),
('Patrimônio público', 'property', 'Equipamento público danificado (banco, playground, academia ao ar livre), muro ou estrutura com risco de desabamento.', true),
('Saneamento', 'sanitation', 'Vazamento de água na via, bueiro entupido ou transbordando, esgoto a céu aberto.', true),
('Áreas verdes e praças:', 'vegetation', 'Vegetação obstruindo via ou calçada, árvore caída ou com risco de queda, praça ou parque em estado de abandono.', true),
('Foco de Dengue', 'animal', 'Locais com agua parada propicios para a proliferacao do mosquito.', true),
('Animais', 'animal', 'Animais soltos ou em situação de risco na via pública.', true);

INSERT INTO users (name, email, password, phone, role, active, city_id)
VALUES (
    'Cidadao Semente',
    'cidadao.seed@suricato.local',
    '$2a$10$X/r9xT/A9hA/.g3Z4n/uI.oA.yK.UuG.H1G.N.mH.T.yH.C.rA.yK',
    '84999999999',
    'CITIZEN',
    true,
    1
);
-- Usuários para testes de confirmação de ocorrências da equipe
INSERT INTO users (name, email, password, phone, role, active, city_id) VALUES
('Usuário Teste 1', 
'teste1@suricato.local', 
'$2a$10$X/r9xT/A9hA/.g3Z4n/uI.oA.yK.UuG.H1G.N.mH.T.yH.C.rA.yK', 
'84999999991', 
'CITIZEN', 
true, 
1),
('Usuário Teste 2', 
'teste2@suricato.local', 
'$2a$10$X/r9xT/A9hA/.g3Z4n/uI.oA.yK.UuG.H1G.N.mH.T.yH.C.rA.yK', '
84999999992', 
'CITIZEN', t
rue, 
1);