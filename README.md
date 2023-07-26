[![License: MIT license](https://img.shields.io/badge/License-MIT_license-success)](https://opensource.org/licenses/MIT)  
![Project status](https://img.shields.io/badge/Status-Complete-success)

<p align="center"><img src="./client/src/assets/logo.png" alt="Snapshot"/></p>

# Snapshot

## General Information

Snapshot is the ultimate platform for creators, enabling you to effortlessly share and showcase your photographs. Explore captivating new creations, purchase your favorite prints, and turn your passion into profit. Join Snapshot today and unleash your creativity to the world!

## Table of Contents

- [General Information](#general-information)
- [Deployed Site](#deployed-site)
- [Preview](#preview)
- [Demo](#demo)
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Contact](#contact)
- [License](#license)
- [How to Contribute](#how-to-contribute)

## Deployed Site

The deployed site can be found [here](https://snapshot-marketplace-a63592d12ba6.herokuapp.com/)!

## Walkthrough Video

---

## Description

---

## Technologies Used

- [Heroku](https://www.heroku.com/) - Cloud platform for deploying and managing applications.
- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing application data.
- [Mongoose v6.0.12](https://www.npmjs.com/package/mongoose) - Object modeling tool for MongoDB.
- [GraphQL v15.5.1](https://www.npmjs.com/package/graphql) - Query language for APIs.
- [Apollo Server v3.5.0](https://www.npmjs.com/package/apollo-server-express) - GraphQL server for Express.
- [Apollo Client v3.5.1](https://www.npmjs.com/package/apollo-client) - GraphQL client for React.
- [React v17.0.2](https://reactjs.org/) - JavaScript library for building user interfaces.
- [React Router v5.2.1](https://www.npmjs.com/package/react-router) - Routing and navigation for React apps.
- [node.js v18.12.1](https://nodejs.org/en) - A scalable server-side JavaScript runtime;
- [express v4.18.2](https://www.npmjs.com/package/express) - Web application framework for building server-side applications.
- [express-session v.17.3](https://www.npmjs.com/package/express-session) - Middleware for managing session data in Express.
- [nodemon v2.0.22](https://www.npmjs.com/package/nodemon) - Development tool for automatically restarting the server during code changes.
- [dotenv v16.0.3](https://www.npmjs.com/package/dotenv) - Loading environment variables from a .env file.

---

## Installation

There is no installation required. However, if you would like to run the application locally, follow the steps below:

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Cloudinary Cloud Account](https://cloudinary.com/)

### Clone

Clone the [repository](https://github.com/JDempe/Snapshot) to your local machine.

### Setup

2. Navigate to the root directory of the cloned repository in your terminal.
3. Run `npm install` to install the dependencies.
4. Create a `.env` file in the root directory of the cloned repository. An example of the contents of the `.env` file is shown below:
   ```
   PORT = 3000
   REACT_APP_CLOUDINARY_NAME=your_cloudinary_name
   REACT_APP_UPLOAD_PRESET=your_upload_preset
   ```
5. Seed the database by running `npm run seed` from the root directory.
6. Start the full stack application by running `npm run develop` from the root directory.
7. Navigate to `http://localhost:3000` in your browser to view the site.

---

## Usage

---

## Credits

### Resources

The following resources and individuals made invaluable contributions to the project:

#### Fonts

- [Timmana](https://fonts.google.com/specimen/Timmana?query=timmana) by Appaji Ambarisha Darbha was used for the paceholder site logo for much of development.

- [Fira Sans](https://fonts.google.com/specimen/Fira+Sans?query=fira+sans) by Carrois Apostrophe was used for many of headings on the site.

- [Montserrat](https://fonts.google.com/specimen/Montserrat?query=montserrat) by Julieta Ulanovsky was used for text on certain parts of the site.

#### Images

- [Favicon.cc](https://www.favicon.cc/) allows a user to create a favicon for their site using an in browser pixel art grid. The favicon was created using this website.

- [Shields.io](https://shields.io/) provides the badges for the README.

#### Templates / Libraries

- [React Quantity Picker](https://easycodesolution.com/2021/06/22/react-quantity-picker/) constructed by Abdulhakim Zeinu was used to increase and decrease the quantity of items to add to the cart.

- [React MUI 5 Footer](https://frontendshape.com/post/create-a-footer-in-react-mui-5) by frontedshape was used as a template to create our footer using Material UI.

- [CSS Load Spinner](https://cssload.net/en/spinners/5) by Wifeo was used as a loading spinner for the site when content is still loading.

#### Data

- [ChatGPT](https://chat.openai.com/) is a chatbot that uses GPT-3 to generate responses. It was used to help tackle certain errors and to generate ideas for the name of the website.

### Educational

#### Blog Posts

Here are some insightful and informative blogs that were valuable resources:

[4 Ways to Override Material UI Styles](https://blog.bitsrc.io/4-ways-to-override-material-ui-styles-43aee2348ded) provided multiple methods of overriding Material UI style, enabling us to customize the prebuilt components to better fit our site design.

---

## Contact

### Collaborators

- Jennifer Rytikoff - [jenryt](https://github.com/jenryt)
- Bandhavi Bendi - [bbandhu](https://github.com/bbandhu)
- Kevin Small - [kevrev](https://github.com/Kevrev)
- Joshua Dempe - [JDempe](https://github.com/JDempe)
- Hicham Raffiai Idrissi - [hichamraffiaidrissi](https://github.com/hichamraffiaidrissi)

---

## License

This project is open source and available under the [MIT](./LICENSE)

---

## How to Contribute

Looking to contribute? Find out how at https://github.com/JDempe/Snapshot!
