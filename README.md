# Heart Rate Data Processing API

This API processes and stores heart rate data received in a file format. It aggregates the heart rate readings into 15-minute intervals, calculating the minimum and maximum values for each interval. The API then stores the processed data in a PostgreSQL database and provides the ability to retrieve the processed data for specific patients.

## Table of Contents

1. [Installation](#installation)
2. [Database in pgAdmin](#DATABASE)
3.  [start procedure](#start_procedure)
4. [API Endpoints](#api-endpoints)
   - [POST `/api/heart-rate`](#POST)
   - [GET `api/heart-rate`](#GET)

## Installation

1. Clone the repository:
   
```bash
npm install

```

## DATABASE

2. Database in pgAdmin:

   - Open pgAdmin and create a new database named `care_monitor_db`.
   - After creating the database, navigate to the `ormconfig.js` file in your project and update the database credentials (username and password) with your own values.

   Example:

   ```
     username: '<your-username>',  // Replace with your PostgreSQL username
     password: '<your-password>',  // Replace with your PostgreSQL password
     database: 'care_monitor_db',

   ```

# start_procedure

3. start procedure :


```bash
npm run start
```



# api-endpoints

4. API Endpoints

### POST

`/api/heart-rate`
This endpoint allows you to upload a file containing heart rate data in JSON format.

- **Request Body**:
  - You need to send a POST request to `/api/heart-rate` with the file attached using the key `file`. The file should contain the heart rate data in the required format.

```json
{
  "patient_id": "gk6dhgh-9a60-4980-bb8b-787bf82689d7",
  "clinical_data": {
    "HEART_RATE": [
      {
        "from_date": "2020-10-06T06:45:00.000Z",
        "to_date": "2020-10-06T07:00:00.000Z",
        "measurement": {
          "low": "66",
          "high": "148"
        },
        "id": 1
      },
      {
        "from_date": "2020-10-06T07:00:00.000Z",
        "to_date": "2020-10-06T07:15:00.000Z",
        "measurement": {
          "low": "138",
          "high": "138"
        },
        "id": 2
      }
    ]
  }
}
```

### GET

`/api/heart-rate`
This endpoint retrieves the heart rate data stored in the database.

- **Response**:

The response will return an array of all stored heart rate data records in the following format:

```json
[
  {
    "id": 1,
    "from_date": "2020-10-06T12:15:00.000Z",
    "to_date": "2020-10-06T12:30:00.000Z",
    "measurement": {
      "low": "66",
      "high": "148"
    }
  },
  {
    "id": 2,
    "from_date": "2020-10-06T12:30:00.000Z",
    "to_date": "2020-10-06T12:45:00.000Z",
    "measurement": {
      "low": "138",
      "high": "138"
    }
  }
]
```
