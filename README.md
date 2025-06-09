# Rezervation SportArena Full-Stack

This is a full-stack application for booking a sport place. It is created using React, Node.js, Express and Prisma.

## Features

-   List of all sport places
-   List of all reservations
-   Create a new reservation
-   Delete a reservation

## How to run

1. Clone this repository
2. Install dependencies with `npm install` or `yarn install`
3. Start the server with `npm run start` or `yarn start`
4. Open http://localhost:3000 in your browser

## How to use

1. List of all sport places: http://localhost:3000/api/sportplaces
2. List of all reservations: http://localhost:3000/api/reservations
3. Create a new reservation: Send a POST request to http://localhost:3000/api/reservations with a JSON body containing the date, userEmail and placeId.
4. Delete a reservation: Send a DELETE request to http://localhost:3000/api/reservations/:id with the id of the reservation you want to delete.

## API endpoints

### GET /api/sportplaces

Returns a list of all sport places.

### GET /api/reservations

Returns a list of all reservations.

### POST /api/reservations

Creates a new reservation.

**Request body**

-   `date`: The date of the reservation.
-   `userEmail`: The email of the user making the reservation.
-   `placeId`: The id of the sport place to reserve.

### DELETE /api/reservations/:id

Deletes a reservation.

**Path parameters**

-   `id`: The id of the reservation to delete.
