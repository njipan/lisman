# Listening Manager

Documentation for Listening Manager Backend with Node JS.

## API Documentation

| HTTP   | URI              | Description                       |
| ------ | ---------------- | --------------------------------- |
| GET    | /audios          | Retrieve all audio list           |
| GET    | /audios/{id}     | Retrieve audio specified by id    |
| GET    | /categories      | Retrieve all category list        |
| GET    | /categories/{id} | Retrieve category specified by id |
| POST   | /categories      | Store new category                |
| PUT    | /categories/{id} | Update category specified by id   |
| DELETE | /categories/{id} | Delete category specified by id   |

### Audios

#### Retrieve All Audio

```shell
GET /audios
```

#### With Specified ID

```shell
GET /audios/{id}
```

### Categories

#### Retrieve All Category

```shell
GET /categories
```

#### With Specified ID

```shell
GET /categories/{id}
```

#### Store New Category

```shell
POST /categories/{id}

Request Body :
- category_name
```

#### Update Category

```shell
PUT /categories/{id}

Request Body :
- category_name
```

#### Delete Category

```shell
DELETE /categories/{id}
```
