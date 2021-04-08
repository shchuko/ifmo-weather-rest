# ifmo-weather-rest

Node.JS Wrapper for OpenWeatherMap API

The frontend is [here](https://github.com/shchuko/ifmo-weather/tree/fork/my-backend)

## Weather requests endpoints

### `/weather/city` endpoint

#### GET

Params:

- `q` - cityName

Example:

```
/weather/city?q=Moscow
```

Response (200):

```json5
// Weather information in metric units
{
  "name": "Moscow",
  "temperature": 6,
  "iconSrc": "http://openweathermap.org/img/wn/10d@2x.png",
  "windSpeed": 3,
  "windDirection": "N",
  "cloudiness": "Light rain",
  "pressure": 1004,
  "humidity": 56,
  "locationLat": 55.7522,
  "locationLon": 37.6156
}
```

Response (404): if city can't be found.

Response (500): on internal error.

### `/weather/coordinates` endpoint

#### GET

Params:

- `lat` - latitude

- `long` - longitude

Example:

```http request
/weather/coordinates?lat=55.7522&long=37.6156
```

Response (200):

```json5
// Weather information in metric units
{
  "name": "Moscow",
  "temperature": 6,
  "iconSrc": "http://openweathermap.org/img/wn/10d@2x.png",
  "windSpeed": 3,
  "windDirection": "N",
  "cloudiness": "Light rain",
  "pressure": 1005,
  "humidity": 65,
  "locationLat": 55.7482,
  "locationLon": 37.6177
}
```

Response (404): if city can't be found.

Response (500): on internal error.


## Favourites - `/favourites` endpoint

### GET

Params/body: none

Example:

```http request
/weather/favourites
```

Response (200):

```json5
// Saved favourite cities:
{
  "favouriteCitiesNames": [
    "Sevastopol",
    "Moscow"
  ]
}
```

Response (500): on internal error.

### POST

Params:

- `q` - cityName

Example:

```http request
/favourites?q=Saint Petersburg
```

Response (201):

```json5
{
  "name": "Saint Petersburg",
  "temperature": 4,
  "iconSrc": "http://openweathermap.org/img/wn/04d@2x.png",
  "windSpeed": 4,
  "windDirection": "NW",
  "cloudiness": "Broken clouds",
  "pressure": 1006,
  "humidity": 70,
  "locationLat": 59.8944,
  "locationLon": 30.2642
}
```

Response (409): if city already added.

Response (500): on internal error.

(!) Note that response may return different (corrected) city name. Only corrected city name can be used in DELETE
request.

### DELETE

Params:

- `q` - cityName

Example:

```http request
/favourites?q=Saint Petersburg
```

Response (200): deleted successfully.

Response (404): if city is not in favourites.

Response (500): on internal error.

