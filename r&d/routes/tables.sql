CREATE SCHEMA IF NOT EXISTS spec;

CREATE TABLE IF NOT EXISTS spec.events (
  pid        INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  event_name VARCHAR UNIQUE,
  event_data JSON
);

CREATE TABLE IF NOT EXISTS spec.datasets (
  pid          INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  dataset_name VARCHAR UNIQUE,
  dataset_data JSON
);

CREATE TABLE IF NOT EXISTS spec.dimensions (
  pid            INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  dimension_name VARCHAR UNIQUE,
  dimension_data JSON
);

CREATE SCHEMA IF NOT EXISTS ingestion;

CREATE TABLE IF NOT EXISTS ingestion.student_attendance_by_school (
  pid                        INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at                 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at                 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  school_id                  VARCHAR,
  date                       DATE,
  total_students             NUMERIC,
  students_attendance_marked NUMERIC
);

CREATE TABLE IF NOT EXISTS ingestion.student_attendance_percentage_by_school (
  pid                      INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  school_id                VARCHAR,
  date                     DATE,
  students_attendance_perc NUMERIC
);

CREATE TABLE IF NOT EXISTS ingestion.dimensions (
  pid           INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  grade         INT,
  school_id     VARCHAR,
  school_name   VARCHAR,
  school_lat    VARCHAR,
  school_long   VARCHAR,
  cluster_id    VARCHAR,
  cluster_name  VARCHAR,
  block_id      VARCHAR,
  blockName     VARCHAR,
  district_id   VARCHAR,
  district_name VARCHAR,
  state_id      VARCHAR,
  state_name    VARCHAR
);

CREATE TABLE IF NOT EXISTS spec.transformers (
  pid                  INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  transformer_file     VARCHAR,
  transformer_function VARCHAR,
  UNIQUE (transformer_file, transformer_function)
);

CREATE TABLE IF NOT EXISTS spec.pipeline (
  pid             INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  event_pid       INT NOT NULL REFERENCES spec.events (pid),
  dataset_pid     INT NOT NULL REFERENCES spec.datasets (pid),
  transformer_pid INT NOT NULL REFERENCES spec.transformers (pid)
);

INSERT INTO spec.events (
  event_name, event_data)
VALUES ('student_count', '{
  "dimensions": [
    {
      "id": "dimension",
      "key": "schoolId"
    }
  ],
  "items": {
    "metadata": {
      "date": "string",
      "schoolId": "number",
      "class": "number",
      "total_students": "number",
      "students_attendance_marked": "number"
    },
    "groupBy": [
      "schoolId",
      "date"
    ],
    "aggregate": [
      {
        "function": "sum",
        "columns": [
          "total_students",
          "students_attendance_marked"
        ]
      },
      {
        "function": "PERCENTAGE",
        "columns": [
          "students_attendance_marked",
          "total_students"
        ]
      }
    ]
  }
}');

INSERT INTO spec.datasets (dataset_name, dataset_data)
VALUES ('student_attendance_by_school', '{
  "dimensions": [
    {
      "id": "dimension",
      "key": "schoolId"
    }
  ],
  "items": {
    "date": "string",
    "schoolId": "number",
    "total_students": "number",
    "students_attendance_marked": "number"
  },
  "group_by": [
    "school_id",
    "Date"
  ],
  "aggregates": {
    "function": "sum",
    "table": "ingestion.student_attendance_by_school",
    "columns": [
      "total_students",
      "students_attendance_marked"
    ]
  }
}');

INSERT INTO spec.datasets (dataset_name, dataset_data)
VALUES ('student_attendance_percentage_by_school', '{
  "dimensions": [
    {
      "id": "dimension",
      "key": "schoolId"
    }
  ],
  "items": {
    "date": "string",
    "schoolId": "number",
    "total_students": "number",
    "students_attendance_marked": "number"
  },
  "group_by": [
    "school_id",
    "Date"
  ],
  "aggregates": {
    "function": "percentage",
    "table": "ingestion.student_attendance_percentage_by_school",
    "columns": [
      {
        "dataset": "student_count_sum",
        "column": [
          "students_attendance_marked"
        ]
      },
      {
        "dataset": "student_count_sum",
        "column": [
          "total_students"
        ]
      }
    ]
  }
}');

INSERT INTO spec.dimensions (dimension_name, dimension_data)
VALUES ('dimension', '{
  "dimension": {
    "grade": "number",
    "schoolId": "string",
    "schoolName": "string",
    "school_lat": "string",
    "school_long": "string",
    "clusterId": "string",
    "clusterName": "string",
    "blockId": "string",
    "blockName": "string",
    "districtId": "string",
    "district": "string",
    "stateId": "string",
    "stateName": "string"
  }
}');