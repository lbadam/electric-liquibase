--liquibase formatted sql

--changeset admah:create-items-table labels:items context:ALL
--comment Create a simple items table.
CREATE TABLE IF NOT EXISTS items (
  value TEXT PRIMARY KEY NOT NULL
);

--changeset admah:create-account-table labels:account context:ALL
--comment Create a simple account table.
CREATE TABLE accounts (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);
