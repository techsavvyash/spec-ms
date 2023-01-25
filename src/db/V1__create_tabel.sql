CREATE SCHEMA IF NOT EXISTS spec;
CREATE SCHEMA IF NOT EXISTS ingestion;

CREATE TABLE IF NOT EXISTS spec.event (
  pid        INT          GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  is_deleted BOOLEAN      DEFAULT FALSE,
  event_by   INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  event_name VARCHAR UNIQUE,
  event_data jsonb
);

CREATE TABLE IF NOT EXISTS spec.dataset (
  pid          INT          GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  is_deleted   BOOLEAN      DEFAULT FALSE,
  event_by     INT NOT NULL DEFAULT 1,
  created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  dataset_name VARCHAR UNIQUE,
  dataset_data jsonb
);

CREATE TABLE IF NOT EXISTS spec.dimension (
  pid            INT          GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  is_deleted     BOOLEAN      DEFAULT FALSE,
  event_by       INT NOT NULL DEFAULT 1,
  created_at     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  dimension_name VARCHAR UNIQUE,
  dimension_data jsonb
);

CREATE TABLE IF NOT EXISTS spec.transformer (
  pid                  INT          GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  is_deleted           BOOLEAN      DEFAULT FALSE,
  event_by             INT NOT NULL DEFAULT 1,
  created_at           TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  transformer_file     VARCHAR,
  UNIQUE (transformer_file)
);

CREATE TABLE IF NOT EXISTS spec.pipeline (
  pid             INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  is_deleted      BOOLEAN   DEFAULT FALSE,
  event_by        INT NOT NULL DEFAULT 1,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  pipeline_name   VARCHAR UNIQUE,
  event_pid       INT REFERENCES spec.event (pid),
  dataset_pid     INT REFERENCES spec.dataset (pid),
  dimension_pid   INT REFERENCES spec.dimension (pid),
  transformer_pid INT REFERENCES spec.transformer (pid)
);

CREATE TABLE IF NOT EXISTS ingestion.file_tracker( 
pid INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
is_deleted      BOOLEAN   DEFAULT FALSE,
event_by        INT NOT NULL DEFAULT 1,
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
filename   VARCHAR NOT NULL,
ingestion_type VARCHAR NOT NULL,
ingestion_name VARCHAR NOT NULL,
file_status VARCHAR NOT NULL,
filesize NUMERIC NOT NULL,
processed_count INT,
    UNIQUE(filename)
);

