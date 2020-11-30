# SEQUELIZE

### Create database

```bash
sequelize model:generate --name User --attributes name:string,email:string
```

### Generating a model

```bash
sequelize model:generate --name User --attributes name:string,email:string
```

## Migrations

-- each time we sync the database (adding a new field to the table) we are dropping the exisiting data. To solve this problem we use migrations.

> generates a model...
