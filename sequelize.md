# SEQUELIZE

### Create database

```bash
sequelize db:create
```

### Generating a model

```bash
sequelize model:generate --name User --attributes name:string,email:string
```

### Drop db

```bash
sequelize db:drop
```

## Migrations

-- each time we sync the database (adding a new field to the table) we are dropping the exisiting data. To solve this problem we use migrations.

```bash
sequelize db:migrate
```

```bash
sequelize db:migrate:status
```

> generates a model...
