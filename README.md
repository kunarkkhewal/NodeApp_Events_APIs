# NodeApp_EventAPIs

### To Run Server: nodemon index.js 

### use this for API docs: http://localhost:5000/api-docs/

## ROUTES, Above link is Swagger doc of same
### GET 
/ (get events information)
### POST 
/add
### PUT 
/update

## Cases:
## GET API
3 object liveEvents, upcomingEvents, pastEvents will retured with approprite events

## CREATE API
need 3 field with following format
{
    "eventname": "Test",
    "eventstartingtime": "2022-02-27 07:50:00 PM",
    "eventduration": "01:00:00"
}

can create Event in the live range, that 10 minutes from now

## UPDATE API
need following fields with formats
{
    "id": 14,
    "eventname": "Test14",
    "eventstartingtime": "2022-02-25 07:59:00 PM",
    "eventduration": "00:00:00"
}


# Curl Requests
## GET API
curl --location --request GET 'localhost:5000/'

## CREATE API
curl --location --request POST 'localhost:5000/add' \
--header 'Content-Type: application/json' \
--data-raw '{
    "eventname": "Test15",
    "eventstartingtime": "2022-02-27 07:50:00 PM",
    "eventduration": "01:00:00"
}'

## UPDATE API
curl --location --request PUT 'localhost:5000/update' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 14,
    "eventname": "Test14",
    "eventstartingtime": "2022-02-25 07:59:00 PM",
    "eventduration": "01:00:00"
}'
