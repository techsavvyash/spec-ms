CREATE SCHEMA IF NOT EXISTS spec;

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

CREATE SCHEMA IF NOT EXISTS ingestion;

CREATE TABLE IF NOT EXISTS ingestion.student_attendance_by_class (
  pid        INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date       VARCHAR,
  school_id  VARCHAR,
  grade      INT,
  count      NUMERIC,
  sum        NUMERIC,
  percentage NUMERIC,
  UNIQUE (date, school_id, grade)
);


CREATE TABLE IF NOT EXISTS ingestion.student_attendance_by_school (
  pid        INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date       VARCHAR,
  school_id  VARCHAR,
  count      NUMERIC,
  sum        NUMERIC,
  percentage NUMERIC,
  UNIQUE (date, school_id)
);

CREATE TABLE IF NOT EXISTS ingestion.student_attendance_by_cluster (
  pid        INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date       VARCHAR,
  cluster_id VARCHAR,
  count      NUMERIC,
  sum        NUMERIC,
  percentage NUMERIC,
  UNIQUE (date, cluster_id)
);

CREATE TABLE IF NOT EXISTS ingestion.student_attendance_by_block (
  pid        INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date       VARCHAR,
  block_id   VARCHAR,
  count      NUMERIC,
  sum        NUMERIC,
  percentage NUMERIC,
  UNIQUE (date, block_id)
);

CREATE TABLE IF NOT EXISTS ingestion.student_attendance_by_district (
  pid         INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date        VARCHAR,
  district_id VARCHAR,
  count       NUMERIC,
  sum         NUMERIC,
  percentage  NUMERIC,
  UNIQUE (date, district_id)
);

CREATE TABLE IF NOT EXISTS ingestion.student_attendance_by_state (
  pid        INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date       VARCHAR,
  state_id   VARCHAR,
  count      NUMERIC,
  sum        NUMERIC,
  percentage NUMERIC,
  UNIQUE (date, state_id)
);


CREATE TABLE IF NOT EXISTS ingestion.student_attendance_marked_above_50_Percent_by_cluster (
  pid        INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date       VARCHAR,
  cluster_id VARCHAR,
  count      NUMERIC,
  sum        NUMERIC,
  UNIQUE (date, cluster_id)
);

CREATE TABLE IF NOT EXISTS ingestion.student_attendance_marked_above_50_Percent_by_block (
  pid        INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date       VARCHAR,
  block_id   VARCHAR,
  count      NUMERIC,
  sum        NUMERIC,
  UNIQUE (date, block_id)
);

CREATE TABLE IF NOT EXISTS ingestion.student_attendance_marked_above_50_Percent_by_district (
  pid         INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date        VARCHAR,
  district_id VARCHAR,
  count       NUMERIC,
  sum         NUMERIC,
  UNIQUE (date, district_id)
);

CREATE TABLE IF NOT EXISTS ingestion.student_attendance_marked_above_50_Percent_by_state (
  pid        INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date       VARCHAR,
  state_id   VARCHAR,
  count      NUMERIC,
  sum        NUMERIC,
  UNIQUE (date, state_id)
);

CREATE TABLE IF NOT EXISTS ingestion.student_attendance (
  pid           INT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  school_id     VARCHAR,
  school_name   VARCHAR,
  cluster_id    VARCHAR,
  cluster_name  VARCHAR,
  block_id      VARCHAR,
  block_name    VARCHAR,
  district_id   VARCHAR,
  district_name VARCHAR,
  state_id      VARCHAR,
  state_name    VARCHAR
);

INSERT INTO spec.event (
  event_name, event_data)
VALUES ('student_attendance', '{
  "ingestion_type": "event",
  "event_name": "student_attendance",
  "input": {
    "type": "object",
    "properties": {
      "event_name": {
        "type": "string"
      },
      "event": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "date": {
              "type": "string",
              "shouldNotNull": true,
              "format": "date"
            },
            "school_id": {
              "type": "number",
              "shouldNotNull": true,
              "pattern": "^[0-9]{10}$"
            },
            "grade": {
              "type": "number",
              "shouldNotNull": true,
              "minimum": 1,
              "maximum": 12
            },
            "total_students": {
              "type": "number",
              "shouldNotNull": true
            },
            "students_attendance_marked": {
              "type": "number",
              "shouldNotNull": true
            }
          },
          "required": [
            "date",
            "school_id",
            "grade",
            "total_students",
            "students_attendance_marked"
          ]
        }
      }
    },
    "required": [
      "event_name",
      "event"
    ]
  }
}');

INSERT INTO spec.dimension (dimension_name, dimension_data)
VALUES ('student_attendance', '{
  "ingestion_type": "dimension",
  "dimension_name": "dimension",
  "input": {
    "type": "object",
    "properties": {
      "dimension_name": {
        "type": "string"
      },
      "dimension": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "school_id": {
              "type": "number",
              "shouldNotNull": true,
              "pattern": "^[0-9]{10}$"
            },
            "school_name": {
              "type": "string",
              "shouldNotNull": true
            },
            "cluster_id": {
              "type": "number",
              "shouldNotNull": true,
              "pattern": "^[0-9]{9}$"
            },
            "cluster_name": {
              "type": "string",
              "shouldNotNull": true
            },
            "block_id": {
              "type": "number",
              "shouldNotNull": true,
              "pattern": "^[0-9]{5}$"
            },
            "block_name": {
              "type": "string",
              "shouldNotNull": true
            },
            "district_id": {
              "type": "number",
              "shouldNotNull": true,
              "pattern": "^[0-9]{3}$"
            },
            "district_name": {
              "type": "string",
              "shouldNotNull": true
            },
            "state_id": {
              "type": "number",
              "shouldNotNull": true,
              "pattern": "^[0-9]{2}$"
            },
            "state_name": {
              "type": "string",
              "shouldNotNull": true
            }
          },
          "required": [
            "school_id",
            "school_name",
            "cluster_id",
            "cluster_name",
            "block_id",
            "block_name",
            "district_id",
            "district_name",
            "state_id",
            "state_name"
          ]
        }
      }
    },
    "required": [
      "dimension_name",
      "dimension"
    ]
  }
}');

INSERT INTO spec.transformer (transformer_file)
VALUES ('student_attendance_by_class.py'),
  ('student_attendance_by_school.py'),
  ('student_attendance_by_cluster.py'),
  ('student_attendance_by_block.py'),
  ('student_attendance_by_district.py'),
  ('student_attendance_by_state.py'),
  ('student_attendance_marked_above_50_percent_by_block.py'),
  ('student_attendance_marked_above_50_percent_by_cluster.py'),
  ('student_attendance_marked_above_50_percent_by_district.py'),
  ('student_attendance_marked_above_50_percent_by_state.py');

INSERT INTO spec.dataset (dataset_name, dataset_data)
VALUES ('student_attendance_by_class', '{
  "ingestion_type": "dataset",
  "dataset_name": "student_attendance_by_class",
  "input": {
    "type": "object",
    "properties": {
      "dataset_name": {
        "type": "string"
      },
      "dimensions": {
        "type": "object",
        "properties": {
          "table": {
            "type": "object",
            "properties": {
              "ingestion.student_attendance": {
                "type": "string"
              }
            }
          },
          "column": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "school_id": {
                  "type": "string"
                }
              }
            }
          },
          "merge_on_col": {
            "type": "object",
            "properties": {
              "school_id": {
                "type": "string"
              }
            }
          }
        }
      },
      "dataset": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string",
                  "shouldNotNull": true,
                  "format": "date"
                },
                "school_id": {
                  "type": "number",
                  "shouldNotNull": true,
                  "pattern": "^[0-9]{10}$"
                },
                "grade": {
                  "type": "number",
                  "shouldNotNull": true,
                  "minimum": 1,
                  "maximum": 12
                },
                "count": {
                  "type": "number",
                  "shouldNotNull": true
                },
                "sum": {
                  "type": "number",
                  "shouldNotNull": true
                },
                "percentage": {
                  "type": "number",
                  "shouldNotNull": true
                }
              },
              "required": [
                "date",
                "school_id",
                "grade",
                "count",
                "sum",
                "percentage"
              ]
            }
          },
          "group_by": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string"
                },
                "school_id": {
                  "type": "string"
                },
                "grade": {
                  "type": "number"
                }
              },
              "required": [
                "date",
                "school_id",
                "grade"
              ]
            }
          },
          "aggregate": {
            "type": "object",
            "properties": {
              "function": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "sum": {
                      "type": "string"
                    }
                  }
                }
              },
              "target_table": {
                "type": "object",
                "properties": {
                  "ingestion.student_attendance_by_class": {
                    "type": "string"
                  }
                }
              },
              "update_cols": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "sum": {
                      "type": "number"
                    },
                    "count": {
                      "type": "number"
                    },
                    "percentage": {
                      "type": "number"
                    }
                  }
                }
              },
              "columns": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "column": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "students_attendance_marked": {
                            "type": "string"
                          },
                          "total_students": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "required": [
              "function",
              "target_table",
              "columns",
              "update_cols"
            ]
          }
        },
        "required": [
          "items",
          "group_by",
          "aggregate"
        ]
      }
    },
    "required": [
      "dataset_name",
      "dimensions",
      "dataset"
    ]
  }
}'),
  ('student_attendance_by_school', '{
    "ingestion_type": "dataset",
    "input": {
      "type": "object",
      "properties": {
        "dataset_name": {
          "type": "string"
        },
        "dataset": {
          "type": "object",
          "properties": {
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string"
                },
                "school_id": {
                  "type": "string"
                },
                "count": {
                  "type": "number"
                },
                "sum": {
                  "type": "number"
                },
                "percentage": {
                  "type": "number"
                }
              },
              "required": [
                "date",
                "school_id",
                "count",
                "sum",
                "percentage"
              ]
            },
            "groupBy": {
              "type": "array",
              "properties": [
                "date",
                "school_id"
              ],
              "required": [
                "date",
                "school_id"
              ]
            },
            "aggregate": {
              "type": "object",
              "properties": {
                "function": [
                  "sum"
                ],
                "targetTable": "ingestion.student_attendance_by_school",
                "columns": [
                  {
                    "table": "ingestion.student_attendance_by_class",
                    "column": [
                      "sum",
                      "count"
                    ]
                  }
                ]
              },
              "required": [
                "function",
                "targetTable",
                "columns"
              ]
            }
          },
          "required": [
            "items",
            "groupBy",
            "aggregate"
          ]
        }
      },
      "required": [
        "dataset_name",
        "dimensions",
        "dataset"
      ]
    }
  }'),
  ('student_attendance_by_cluster', '{
    "ingestion_type": "dataset",
    "input": {
      "type": "object",
      "properties": {
        "dataset_name": {
          "type": "string"
        },
        "dataset": {
          "type": "object",
          "properties": {
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string"
                },
                "cluster_id": {
                  "type": "string"
                },
                "count": {
                  "type": "number"
                },
                "sum": {
                  "type": "number"
                },
                "percentage": {
                  "type": "number"
                }
              },
              "required": [
                "date",
                "cluster_id",
                "count",
                "sum",
                "percentage"
              ]
            },
            "groupBy": {
              "type": "array",
              "properties": [
                "date",
                "cluster_id"
              ],
              "required": [
                "date",
                "cluster_id"
              ]
            },
            "aggregate": {
              "type": "object",
              "properties": {
                "function": [
                  "sum"
                ],
                "targetTable": "ingestion.student_attendance_by_cluster",
                "columns": [
                  {
                    "table": "ingestion.student_attendance_by_school",
                    "column": [
                      "sum",
                      "count"
                    ]
                  }
                ]
              },
              "required": [
                "function",
                "targetTable",
                "columns"
              ]
            }
          },
          "required": [
            "items",
            "groupBy",
            "aggregate"
          ]
        }
      },
      "required": [
        "dataset_name",
        "dataset"
      ]
    }
  }'),
  ('student_attendance_by_block', '{
    "ingestion_type": "dataset",
    "input": {
      "type": "object",
      "properties": {
        "dataset_name": {
          "type": "string"
        },
        "dataset": {
          "type": "object",
          "properties": {
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string"
                },
                "block_id": {
                  "type": "string"
                },
                "count": {
                  "type": "number"
                },
                "sum": {
                  "type": "number"
                },
                "percentage": {
                  "type": "number"
                }
              },
              "required": [
                "date",
                "block_id",
                "count",
                "sum",
                "percentage"
              ]
            },
            "groupBy": {
              "type": "array",
              "properties": [
                "date",
                "block_id"
              ],
              "required": [
                "date",
                "block_id"
              ]
            },
            "aggregate": {
              "type": "object",
              "properties": {
                "function": [
                  "sum"
                ],
                "targetTable": "ingestion.student_attendance_by_block",
                "columns": [
                  {
                    "table": "ingestion.student_attendance_by_cluster",
                    "column": [
                      "sum",
                      "count"
                    ]
                  }
                ]
              },
              "required": [
                "function",
                "targetTable",
                "columns"
              ]
            }
          },
          "required": [
            "items",
            "groupBy",
            "aggregate"
          ]
        }
      },
      "required": [
        "dataset_name",
        "dataset"
      ]
    }
  }'),
  ('student_attendance_by_district', '{
    "ingestion_type": "dataset",
    "input": {
      "type": "object",
      "properties": {
        "dataset_name": {
          "type": "string"
        },
        "dataset": {
          "type": "object",
          "properties": {
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string"
                },
                "district_id": {
                  "type": "string"
                },
                "count": {
                  "type": "number"
                },
                "sum": {
                  "type": "number"
                },
                "percentage": {
                  "type": "number"
                }
              },
              "required": [
                "date",
                "district_id",
                "count",
                "sum",
                "percentage"
              ]
            },
            "groupBy": {
              "type": "array",
              "properties": [
                "date",
                "district_id"
              ],
              "required": [
                "date",
                "district_id"
              ]
            },
            "aggregate": {
              "type": "object",
              "properties": {
                "function": [
                  "sum"
                ],
                "targetTable": "ingestion.student_attendance_by_district",
                "columns": [
                  {
                    "table": "ingestion.student_attendance_by_block",
                    "column": [
                      "sum",
                      "count"
                    ]
                  }
                ]
              },
              "required": [
                "function",
                "targetTable",
                "columns"
              ]
            }
          },
          "required": [
            "items",
            "groupBy",
            "aggregate"
          ]
        }
      },
      "required": [
        "dataset_name",
        "dataset"
      ]
    }
  }'),
  ('student_attendance_by_state', '{
    "ingestion_type": "dataset",
    "input": {
      "type": "object",
      "properties": {
        "dataset_name": {
          "type": "string"
        },
        "dataset": {
          "type": "object",
          "properties": {
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string"
                },
                "state_id": {
                  "type": "string"
                },
                "count": {
                  "type": "number"
                },
                "sum": {
                  "type": "number"
                },
                "percentage": {
                  "type": "number"
                }
              },
              "required": [
                "date",
                "state_id",
                "count",
                "sum",
                "percentage"
              ]
            },
            "groupBy": {
              "type": "array",
              "properties": [
                "date",
                "state_id"
              ],
              "required": [
                "date",
                "state_id"
              ]
            },
            "aggregate": {
              "type": "object",
              "properties": {
                "function": [
                  "sum"
                ],
                "targetTable": "ingestion.student_attendance_by_state",
                "columns": [
                  {
                    "table": "ingestion.student_attendance_by_district",
                    "column": [
                      "sum",
                      "count"
                    ]
                  }
                ]
              },
              "required": [
                "function",
                "targetTable",
                "columns"
              ]
            }
          },
          "required": [
            "items",
            "groupBy",
            "aggregate"
          ]
        }
      },
      "required": [
        "dataset_name",
        "dataset"
      ]
    }
  }'),
  ('student_attendance_marked_above_50_percent_by_cluster', '{
    "ingestion_type": "dataset",
    "input": {
      "type": "object",
      "properties": {
        "dataset_name": {
          "type": "string"
        },
        "dimensions": {
          "type": "object",
          "properties": {
            "table": "ingestion.student_attendance",
            "column": [
              "school_id",
              "cluster_id"
            ],
            "merge_On_Cols": "school_id"
          }
        },
        "dataset": {
          "type": "object",
          "properties": {
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string"
                },
                "cluster_id": {
                  "type": "string"
                },
                "count": {
                  "type": "number"
                },
                "sum": {
                  "type": "number"
                }
              },
              "required": [
                "date",
                "cluster_id",
                "count",
                "sum"
              ]
            },
            "groupBy": {
              "type": "array",
              "properties": [
                "date",
                "cluster_id"
              ],
              "required": [
                "date",
                "cluster_id"
              ]
            },
            "aggregate": {
              "type": "object",
              "properties": {
                "function": [
                  "count"
                ],
                "targetTable": "ingestion.student_attendance_marked_above_50_percent_by_cluster",
                "columns": [
                  {
                    "table": "ingestion.student_attendance_by_school",
                    "column": [
                      "count",
                      "sum"
                    ]
                  }
                ],
                "filters": {
                  "filter": "50",
                  "filterType": ">=",
                  "column": [
                    "percentage"
                  ]
                }
              },
              "required": [
                "function",
                "targetTable",
                "columns",
                "filters"
              ]
            }
          },
          "required": [
            "items",
            "groupBy",
            "aggregate"
          ]
        }
      },
      "required": [
        "dataset_name",
        "dimensions",
        "dataset"
      ]
    }
  }'),
  ('student_attendance_marked_above_50_percent_by_block', '{
    "ingestion_type": "dataset",
    "input": {
      "type": "object",
      "properties": {
        "dataset_name": {
          "type": "string"
        },
        "dimensions": {
          "type": "object",
          "properties": {
            "table": "ingestion.student_attendance",
            "column": [
              "school_id",
              "block_id"
            ],
            "merge_On_Cols": "school_id"
          }
        },
        "dataset": {
          "type": "object",
          "properties": {
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string"
                },
                "block_id": {
                  "type": "string"
                },
                "count": {
                  "type": "number"
                },
                "sum": {
                  "type": "number"
                }
              },
              "required": [
                "date",
                "block_id",
                "count",
                "sum"
              ]
            },
            "groupBy": {
              "type": "array",
              "properties": [
                "date",
                "block_id"
              ],
              "required": [
                "date",
                "block_id"
              ]
            },
            "aggregate": {
              "type": "object",
              "properties": {
                "function": [
                  "count"
                ],
                "targetTable": "ingestion.student_attendance_marked_above_50_percent_by_block",
                "columns": [
                  {
                    "table": "ingestion.student_attendance_by_school",
                    "column": [
                      "count",
                      "sum"
                    ]
                  }
                ],
                "filters": {
                  "filter": "50",
                  "filterType": ">=",
                  "column": [
                    "percentage"
                  ]
                }
              },
              "required": [
                "function",
                "targetTable",
                "columns",
                "filters"
              ]
            }
          },
          "required": [
            "items",
            "groupBy",
            "aggregate"
          ]
        }
      },
      "required": [
        "dataset_name",
        "dimensions",
        "dataset"
      ]
    }
  }'),
  ('student_attendance_marked_above_50_percent_by_district', '{
    "ingestion_type": "dataset",
    "input": {
      "type": "object",
      "properties": {
        "dataset_name": {
          "type": "string"
        },
        "dimensions": {
          "type": "object",
          "properties": {
            "table": "ingestion.student_attendance",
            "column": [
              "school_id",
              "district_id"
            ],
            "merge_On_Cols": "school_id"
          }
        },
        "dataset": {
          "type": "object",
          "properties": {
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string"
                },
                "district_id": {
                  "type": "string"
                },
                "count": {
                  "type": "number"
                },
                "sum": {
                  "type": "number"
                }
              },
              "required": [
                "date",
                "district_id",
                "count",
                "sum"
              ]
            },
            "groupBy": {
              "type": "array",
              "properties": [
                "date",
                "district_id"
              ],
              "required": [
                "date",
                "district_id"
              ]
            },
            "aggregate": {
              "type": "object",
              "properties": {
                "function": [
                  "count"
                ],
                "targetTable": "ingestion.student_attendance_marked_above_50_percent_by_district",
                "columns": [
                  {
                    "table": "ingestion.student_attendance_by_school",
                    "column": [
                      "count",
                      "sum"
                    ]
                  }
                ],
                "filters": {
                  "filter": "50",
                  "filterType": ">=",
                  "column": [
                    "percentage"
                  ]
                }
              },
              "required": [
                "function",
                "targetTable",
                "columns",
                "filters"
              ]
            }
          },
          "required": [
            "items",
            "groupBy",
            "aggregate"
          ]
        }
      },
      "required": [
        "dataset_name",
        "dimensions",
        "dataset"
      ]
    }
  }'),
  ('student_attendance_marked_above_50_percent_by_state', '{
    "ingestion_type": "dataset",
    "input": {
      "type": "object",
      "properties": {
        "dataset_name": {
          "type": "string"
        },
        "dimensions": {
          "type": "object",
          "properties": {
            "table": "ingestion.student_attendance",
            "column": [
              "school_id",
              "state_id"
            ],
            "merge_On_Cols": "school_id"
          }
        },
        "dataset": {
          "type": "object",
          "properties": {
            "items": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string"
                },
                "state_id": {
                  "type": "string"
                },
                "count": {
                  "type": "number"
                },
                "sum": {
                  "type": "number"
                }
              },
              "required": [
                "date",
                "state_id",
                "count",
                "sum"
              ]
            },
            "groupBy": {
              "type": "array",
              "properties": [
                "date",
                "state_id"
              ],
              "required": [
                "date",
                "state_id"
              ]
            },
            "aggregate": {
              "type": "object",
              "properties": {
                "function": [
                  "count"
                ],
                "targetTable": "ingestion.student_attendance_marked_above_50_percent_by_state",
                "columns": [
                  {
                    "table": "ingestion.student_attendance_by_school",
                    "column": [
                      "count",
                      "sum"
                    ]
                  }
                ],
                "filters": {
                  "filter": "50",
                  "filterType": ">=",
                  "column": [
                    "percentage"
                  ]
                }
              },
              "required": [
                "function",
                "targetTable",
                "columns",
                "filters"
              ]
            }
          },
          "required": [
            "items",
            "groupBy",
            "aggregate"
          ]
        }
      },
      "required": [
        "dataset_name",
        "dimensions",
        "dataset"
      ]
    }
  }');

INSERT INTO spec.pipeline (event_pid, dataset_pid, dimension_pid, transformer_pid, pipeline_name)
VALUES ((SELECT pid
         FROM spec.event
         WHERE event_name = 'student_attendance'),
        (SELECT pid
         FROM spec.dataset
         WHERE dataset_name = 'student_attendance_by_class'),
        (SELECT pid
         FROM spec.dimension
         WHERE dimension_name = 'student_attendance'),
        (SELECT pid
         FROM spec.transformer
         WHERE transformer_file = 'student_attendance_by_class.py'),
        'student_attendance_by_class'
),
  ((SELECT pid
    FROM spec.event
    WHERE event_name = 'student_attendance'),
   (SELECT pid
    FROM spec.dataset
    WHERE dataset_name = 'student_attendance_by_school'),
   (SELECT pid
    FROM spec.dimension
    WHERE dimension_name = 'student_attendance'),
   (SELECT pid
    FROM spec.transformer
    WHERE transformer_file = 'student_attendance_by_school.py'),
   'student_attendance_by_school'
  ),
  ((SELECT pid
    FROM spec.event
    WHERE event_name = 'student_attendance'),
   (SELECT pid
    FROM spec.dataset
    WHERE dataset_name = 'student_attendance_by_cluster'),
   (SELECT pid
    FROM spec.dimension
    WHERE dimension_name = 'student_attendance'),
   (SELECT pid
    FROM spec.transformer
    WHERE transformer_file = 'student_attendance_by_cluster.py'),
   'student_attendance_by_cluster'
  ),
  ((SELECT pid
    FROM spec.event
    WHERE event_name = 'student_attendance'),
   (SELECT pid
    FROM spec.dataset
    WHERE dataset_name = 'student_attendance_by_block'),
   (SELECT pid
    FROM spec.dimension
    WHERE dimension_name = 'student_attendance'),
   (SELECT pid
    FROM spec.transformer
    WHERE transformer_file = 'student_attendance_by_block.py'),
   'student_attendance_by_block'
  ),
  ((SELECT pid
    FROM spec.event
    WHERE event_name = 'student_attendance'),
   (SELECT pid
    FROM spec.dataset
    WHERE dataset_name = 'student_attendance_by_district'),
   (SELECT pid
    FROM spec.dimension
    WHERE dimension_name = 'student_attendance'),
   (SELECT pid
    FROM spec.transformer
    WHERE transformer_file = 'student_attendance_by_district.py'),
   'student_attendance_by_district'
  ),
  ((SELECT pid
    FROM spec.event
    WHERE event_name = 'student_attendance'),
   (SELECT pid
    FROM spec.dataset
    WHERE dataset_name = 'student_attendance_by_state'),
   (SELECT pid
    FROM spec.dimension
    WHERE dimension_name = 'student_attendance'),
   (SELECT pid
    FROM spec.transformer
    WHERE transformer_file = 'student_attendance_by_state.py'),
   'student_attendance_by_state'
  ),
  ((SELECT pid
    FROM spec.event
    WHERE event_name = 'student_attendance'),
   (SELECT pid
    FROM spec.dataset
    WHERE dataset_name = 'student_attendance_marked_above_50_percent_by_cluster'),
   (SELECT pid
    FROM spec.dimension
    WHERE dimension_name = 'student_attendance'),
   (SELECT pid
    FROM spec.transformer
    WHERE transformer_file = 'student_attendance_marked_above_50_percent_by_cluster.py'),
   'student_attendance_marked_above_50_percent_by_cluster'
  ),
  ((SELECT pid
    FROM spec.event
    WHERE event_name = 'student_attendance'),
   (SELECT pid
    FROM spec.dataset
    WHERE dataset_name = 'student_attendance_marked_above_50_percent_by_block'),
   (SELECT pid
    FROM spec.dimension
    WHERE dimension_name = 'student_attendance'),
   (SELECT pid
    FROM spec.transformer
    WHERE transformer_file = 'student_attendance_marked_above_50_percent_by_block.py'),
   'student_attendance_marked_above_50_percent_by_block'
  ),
  ((SELECT pid
    FROM spec.event
    WHERE event_name = 'student_attendance'),
   (SELECT pid
    FROM spec.dataset
    WHERE dataset_name = 'student_attendance_marked_above_50_percent_by_district'),
   (SELECT pid
    FROM spec.dimension
    WHERE dimension_name = 'student_attendance'),
   (SELECT pid
    FROM spec.transformer
    WHERE transformer_file = 'student_attendance_marked_above_50_percent_by_district.py'),
   'student_attendance_marked_above_50_percent_by_district'
  ),
  ((SELECT pid
    FROM spec.event
    WHERE event_name = 'student_attendance'),
   (SELECT pid
    FROM spec.dataset
    WHERE dataset_name = 'student_attendance_marked_above_50_percent_by_state'),
   (SELECT pid
    FROM spec.dimension
    WHERE dimension_name = 'student_attendance'),
   (SELECT pid
    FROM spec.transformer
    WHERE transformer_file = 'student_attendance_marked_above_50_percent_by_state.py'),
   'student_attendance_marked_above_50_percent_by_state'
  );