# Blood Buddies

This project is a React application that utilizes React Router for navigation. It has firebase authentication system and it's connected with MongoDB database. It has dashboard(donor dashboard, admin dashboard, volunteer dashboard) .

## [Live Link](https://blood-donation-6aa60.web.app/)

## Features

- **React Router**: The application uses React Router to handle navigation between pages.

- **Login and Registration**: User can Registration and Login in this project. We have login and Registration page.

- **LogOut**: User can logOut if they want.

- **Private Route**: In this project some routes are Private. Only logged user can visit them. If new user want to see private route they will be redirected to login page.

- **Admin Only Route**: In this project some routes are only for admins. Only admins can visit them. If logged user is not an admin they will be redirected to the home page.

- **Volunteer Only Route**: In this project some routes are only for volunteers. Only volunteers can visit them. If logged user is not volunteer they will be redirected to the home page.

- **MongoDB**: This is project is connected with MongoDB database.

- **Tanstack Query**: In this project tanstack query is used for loading necessary data. And refetch data with tanstack after change in data by user/admin/volunteer.
