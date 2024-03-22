# AllTimeHoops.com - A History-Focused Year-By-Year NBA Archive

## Overview

AllTimeHoops.com is a web application that provides a year-by-year archive of NBA history. The application is built using React and uses Firestore for data storage.

The application is composed of several main components:

- **Nav**: This component displays the navigation bar of the application. It includes links to the home page, "Graphs", "Support", and "About" pages.

- **HomepageContent**: This is the main component of the application. It displays the homepage, which includes a form for the user to enter a season and navigate to the page for that season. It also includes a Dropdowns component that allows the user to select a season from a dropdown menu.

- **Year**: This component fetches and displays NBA data for a given year. It includes several tiles (AwardsTile, StatLeadersTile, etc.) for different types of data.

- **NotableOccurence**: This component fetches and displays a notable occurrence from the NBA for a given year.

- **StandingsTile**: This component fetches and displays NBA standings for a given year.

- **StatLeadersTile**: This component fetches and displays NBA stat leaders for a given year.

- **Support**: This component displays the support page of the application.

- **About**: This component displays the about page of the application.

- **NotFoundPage**: This component displays a 404 error page when the user navigates to an invalid URL.

The application uses the react-router-dom library to define routes. The "/" route renders the HomepageContent component. The "/year/:year" route renders the Year component. The "/support" route renders the Support component. The "/about" route renders the About component. Any other route renders the NotFoundPage component.
