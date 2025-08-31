<!-- Table of Contents -->
# Table of Contents

- [About the Project](#about-the-project)
  * [Tech Stack](#tech-stack)
  * [Features](#features)
  * [Demo](#demo)
- [Getting Started](#getting-started)
  * [Environment Variables](#environment-variables)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Deployment](#deployment)
- [Usage](#usage)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)
  
<!-- About the Project -->
## About the Project
A modern React application for discovering, searching, and managing movies and TV shows using the TMDB API. 
Users can browse popular and upcoming titles, filter and sort results, manage their favourites lists, write reviews, and create their own fantasy movies. The app features a responsive, user-friendly interface built with Material-UI, and supports user authentication for a personalized experience. Storybook is used for component development and documentation.

<!-- TechStack -->
### Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://react.dev/reference/react">React</a></li>
    <li><a href="https://react.dev/reference/react">React Router</a></li>
    <li><a href="https://react.dev/reference/react">React Query</a></li>
    <li><a href="https://react.dev/reference/react">React Hook Form</a></li>
    <li><a href="https://storybook.js.org/docs">Storybook</a></li>
    <li><a href="https://www.chromatic.com/docs/">Chromatic</a></li>
    <li><a href="https://vite.dev/guide/">Vite</a></li>
    <li><a href="https://www.typescriptlang.org/docs/">TypeScript</a></li>
    <li><a href="https://mui.com/">Material-UI (MUI)</a></li>
    <li><a href="https://emotion.sh/docs/introduction">Emotion</a></li>
    <li><a href="https://eslint.org/docs/latest/">ESLint</a></li>
    <li><a href="https://prettier.io/docs/">Prettier</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://nodejs.org/">Node.js</a></li>
    <li><a href="https://developer.themoviedb.org/reference">TMDB API</a></li>
  </ul>
</details>

<!-- Features -->
### Features

- Browse popular and upcoming movies and TV shows
- Advanced filtering by title, genre, year, and rating
- Sort movies and TV shows by title, release date, or rating
- Add and manage favourites
- Write and view reviews for movies and TV shows
- Create, display, and delete your own fantasy movies
- User authentication (demo login: user/password)

### Demo
This project is available to view via Vercel using the link and demo account details below:
- **Deployment Link:** [Vercel](https://lab-movies-app-black.vercel.app/)
- **Login Details:** Use username: `user` and password: `password` to log in.

<!-- Getting Started -->
## Getting Started

<!-- Env Variables -->
### Environment Variables

To run this project, you will need to create and add the following environment variables to your .env file:

- `VITE_TMDB_KEY=<your-tmdb-api-key>`

To do so, create a `.env` file in the root directory of the project. You can copy the content from the `.env_example` file and modify it with your own details:

    ```bash
    cp .env_example .env
    ```
    
Update the following fields in your `.env` file:

- `VITE_TMDB_KEY=<your-tmdb-api-key>`

More information regarding accessing your TMDB API key can be found here: [TMDB](https://developer.themoviedb.org/reference/intro/getting-started)

<!-- Prerequisites -->
### Prerequisites

Before you begin, ensure that you have the following:

- **Node.js** (version 16.0 or higher) – Your project requires Node.js to run the server. You can download and install Node.js from [here](https://nodejs.org/).
- **MongoDB** – You can either set up a local MongoDB server or use a cloud instance like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation

Follow these steps to get your environment set up:

**Clone the repository**:
Open your terminal or command prompt and run the following command to clone the repository:

    ```bash
        git clone https://github.com/rhiannahmaher/labMoviesApp.git
    ```

**Navigate to the project directory**:

    ```bash
        cd your-project-name
    ```

**Install the dependencies**:
Run the following command to install all the necessary packages:

    ```bash
        npm install
    ```

**Set up environment variables**:
 Create a `.env` file and update using `env_example` and the above information.

**Run the application**:
Once everything is set up, you can start the development server:

    ```bash
        npm run dev
    ```

This will start the **Node.js** server, and you can access the application at `http://localhost:3000`

To run **Storybook**, you can do the following:

    ```bash
        npm run storybook
    ```

This will start **Storybook**, and you can access the application at `http://localhost:6006`

### Deployment

Application is available to view via Vercel [here](https://hike-bite-svelte.netlify.app/)

<!-- Usage -->
## Usage

**LabMoviesApp** lets users discover, search, and manage movies and TV shows. You can browse popular and upcoming titles, filter and sort results, add favourites, write reviews, and even create your own fantasy movies.

### Purpose
The main goal of **LabMoviesApp** is to provide an interactive and engaging platform for movie and TV enthusiasts. It is designed to help users organize their watchlists, explore new content, and experiment with creating their own movie ideas. 
The project also serves as a learning tool for modern React development, UI design, and component-driven workflows.

### Target Audience
**LabMoviesApp** is ideal for:
- Movie and TV fans who want to keep track of what they watch and discover new content.
- Students and developers interested in learning about React, Material-UI, and best practices for building modern web apps.
- Anyone who enjoys experimenting with movie ideas and sharing opinions through reviews.

<!-- Contact -->
## Contact

Rhiannah Maher - 20085527@mail.wit.ie

Project Link: [https://github.com/rhiannahmaher/labMoviesApp](https://github.com/rhiannahmaher/labMoviesApp.git)

<!-- Acknowledgments -->
## Acknowledgements

 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [movies-app](https://github.com/eoinfennessy/movies-app/)

 ## References

- [A Case to Switch. Using Switch Statements in React.](https://medium.com/nerd-for-tech/a-case-to-switch-using-switch-statements-in-react-e83e01154f60)
- [Pagination](https://mui.com/material-ui/react-pagination/)
- [Pagination API](https://mui.com/material-ui/api/pagination/)
- [Menu](https://mui.com/material-ui/react-menu/)
- [Nesting navigators](https://reactnavigation.org/docs/nesting-navigators)
- [Multilevel dropdown menu creating in ReactJS | Infinite SubMenu React](https://www.youtube.com/watch?v=d6f9UqzfC7A)
- [parseFloat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
- [Styling React Using CSS](https://www.w3schools.com/react/react_css.asp)
- [Themes](https://reactnavigation.org/docs/themes/)
- [Built-in themes](https://reactnavigation.org/docs/4.x/themes/#using-the-operating-system-preferences)
- [Components and Props](https://legacy.reactjs.org/docs/components-and-props.html)
- [Two different ways of using props in React](https://stackoverflow.com/questions/71806087/two-different-ways-of-using-props-in-react)
- [Choosing Between “type” and “interface” in React](https://medium.com/nerd-for-tech/choosing-between-type-and-interface-in-react-da1deae677c9)
- [How to pass an interface as a prop in React w/ TypeScript?](https://stackoverflow.com/questions/73237782/how-to-pass-an-interface-as-a-prop-in-react-w-typescript)
- [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
-[Mastering Advanced Filtering in React: A Step-by-Step Guide with Code Examples](https://medium.com/@pankaj21dhal/mastering-advanced-filtering-in-react-a-step-by-step-guide-with-code-examples-675d027d27d5)
-[How to sort and filter data in React & TypeScript](https://gist.github.com/thecodingloft/4e621092495de405f342dad209f8b0bb)
- [TMDB API Reference](https://developer.themoviedb.org/reference)