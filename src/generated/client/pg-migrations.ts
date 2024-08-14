export default [
  {
    "statements": [
      "CREATE TABLE items (\n    value text NOT NULL,\n    CONSTRAINT items_pkey PRIMARY KEY (value)\n)",
      "INSERT INTO \"public\".\"_electric_trigger_settings\" (\"namespace\", \"tablename\", \"flag\")\n  VALUES ('public', 'items', 1)\n  ON CONFLICT DO NOTHING;",
      "DROP TRIGGER IF EXISTS update_ensure_public_items_primarykey ON \"public\".\"items\";",
      "CREATE OR REPLACE FUNCTION update_ensure_public_items_primarykey_function()\nRETURNS TRIGGER AS $$\nBEGIN\n  IF OLD.\"value\" IS DISTINCT FROM NEW.\"value\" THEN\n    RAISE EXCEPTION 'Cannot change the value of column value as it belongs to the primary key';\n  END IF;\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;",
      "CREATE TRIGGER update_ensure_public_items_primarykey\n  BEFORE UPDATE ON \"public\".\"items\"\n    FOR EACH ROW\n      EXECUTE FUNCTION update_ensure_public_items_primarykey_function();",
      "DROP TRIGGER IF EXISTS insert_public_items_into_oplog ON \"public\".\"items\";",
      "    CREATE OR REPLACE FUNCTION insert_public_items_into_oplog_function()\n    RETURNS TRIGGER AS $$\n    BEGIN\n      DECLARE\n        flag_value INTEGER;\n      BEGIN\n        -- Get the flag value from _electric_trigger_settings\n        SELECT flag INTO flag_value FROM \"public\"._electric_trigger_settings WHERE namespace = 'public' AND tablename = 'items';\n\n        IF flag_value = 1 THEN\n          -- Insert into _electric_oplog\n          INSERT INTO \"public\"._electric_oplog (namespace, tablename, optype, \"primaryKey\", \"newRow\", \"oldRow\", timestamp)\n          VALUES (\n            'public',\n            'items',\n            'INSERT',\n            json_strip_nulls(json_build_object('value', new.\"value\")),\n            jsonb_build_object('value', new.\"value\"),\n            NULL,\n            NULL\n          );\n        END IF;\n\n        RETURN NEW;\n      END;\n    END;\n    $$ LANGUAGE plpgsql;",
      "CREATE TRIGGER insert_public_items_into_oplog\n  AFTER INSERT ON \"public\".\"items\"\n    FOR EACH ROW\n      EXECUTE FUNCTION insert_public_items_into_oplog_function();",
      "DROP TRIGGER IF EXISTS update_public_items_into_oplog ON \"public\".\"items\";",
      "    CREATE OR REPLACE FUNCTION update_public_items_into_oplog_function()\n    RETURNS TRIGGER AS $$\n    BEGIN\n      DECLARE\n        flag_value INTEGER;\n      BEGIN\n        -- Get the flag value from _electric_trigger_settings\n        SELECT flag INTO flag_value FROM \"public\"._electric_trigger_settings WHERE namespace = 'public' AND tablename = 'items';\n\n        IF flag_value = 1 THEN\n          -- Insert into _electric_oplog\n          INSERT INTO \"public\"._electric_oplog (namespace, tablename, optype, \"primaryKey\", \"newRow\", \"oldRow\", timestamp)\n          VALUES (\n            'public',\n            'items',\n            'UPDATE',\n            json_strip_nulls(json_build_object('value', new.\"value\")),\n            jsonb_build_object('value', new.\"value\"),\n            jsonb_build_object('value', old.\"value\"),\n            NULL\n          );\n        END IF;\n\n        RETURN NEW;\n      END;\n    END;\n    $$ LANGUAGE plpgsql;",
      "CREATE TRIGGER update_public_items_into_oplog\n  AFTER UPDATE ON \"public\".\"items\"\n    FOR EACH ROW\n      EXECUTE FUNCTION update_public_items_into_oplog_function();",
      "DROP TRIGGER IF EXISTS delete_public_items_into_oplog ON \"public\".\"items\";",
      "    CREATE OR REPLACE FUNCTION delete_public_items_into_oplog_function()\n    RETURNS TRIGGER AS $$\n    BEGIN\n      DECLARE\n        flag_value INTEGER;\n      BEGIN\n        -- Get the flag value from _electric_trigger_settings\n        SELECT flag INTO flag_value FROM \"public\"._electric_trigger_settings WHERE namespace = 'public' AND tablename = 'items';\n\n        IF flag_value = 1 THEN\n          -- Insert into _electric_oplog\n          INSERT INTO \"public\"._electric_oplog (namespace, tablename, optype, \"primaryKey\", \"newRow\", \"oldRow\", timestamp)\n          VALUES (\n            'public',\n            'items',\n            'DELETE',\n            json_strip_nulls(json_build_object('value', old.\"value\")),\n            NULL,\n            jsonb_build_object('value', old.\"value\"),\n            NULL\n          );\n        END IF;\n\n        RETURN NEW;\n      END;\n    END;\n    $$ LANGUAGE plpgsql;",
      "CREATE TRIGGER delete_public_items_into_oplog\n  AFTER DELETE ON \"public\".\"items\"\n    FOR EACH ROW\n      EXECUTE FUNCTION delete_public_items_into_oplog_function();"
    ],
    "version": "1"
  }
]