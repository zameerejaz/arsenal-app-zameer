<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Zameer Ejaz - Arsenal App Submission</h3>
  <p align="center">
    <br />
    <a href="https://arsenal-app-zameer.vercel.app/">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="https://arsenal-app-zameer.vercel.app/">Zameer Ejaz - Arsenal Test</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Main Screen](https://github.com/zameerejaz/arsenal-app-zameer/raw/main/readmeDemo1.png)](https://github.com/zameerejaz/arsenal-app-zameer/raw/main/readmeDemo1.png)

[![Product Fixtures Screen](https://github.com/zameerejaz/arsenal-app-zameer/raw/main/readmeDemo2.png)](https://github.com/zameerejaz/arsenal-app-zameer/raw/main/readmeDemo2.png)



This web application, developed using Next.js, Tailwind CSS, tRPC, and TypeScript, facilitates the management of football players. Users can add new players to the database while ensuring players added have a distinct jersey number. Additionally, the app offers functionalities for updating and deleting player information. The app also includes an additional 'Fixtures' tab, displaying upcoming games. The fixture data is being pulled in real-time from football-data.org

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [<img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg" alt="Tailwind" width="65" height="65">][Tailwind-url]
* [<img src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" alt="Prisma" width="65" height="65">][Prisma-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Before you begin, ensure you have met the following requirements:
Node.js: Make sure you have Node.js installed. You can download it from https://nodejs.org/.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/zameerejaz/arsenal-app-zameer.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter the API Keys in `.env` 
   Which should be laid out like this
   ```js
   DATABASE_URL = 'DATABASE_URL_XYZ';
   FOOTBALL_DATA_API = 'xyz'
   ```

4. Please ensure to have prisma cli installed
   ```sh
   # Install Prisma globally (if not already installed)
   npm install -g prisma
   ```

5. Push the schema to your database using Prisma:
   ```sh
   # Install Prisma globally (if not already installed)
   npx prisma db push
   ```

6. You should now have a schema in your database that should look like this
   ```js
    model Players {
      id         Int      @id @default(autoincrement())
      PlayerName String   @db.VarChar(255)
      Position   String   @db.VarChar(255)
      JerseyNumber Int    @unique
      GoalsScored  Int
    }
   ```

7. Launch the application:
   ```sh
   npm run dev
   ```
8. Open your web browser and navigate to http://localhost:3000 or any other port that has been specified by the console.


### How to Add a player

1. Click the "Add Player" button to add a new player.

2. A new page with a new form should appear (http://localhost:3000/add-player)

3. Once all fields have been filled out, please click save


### How to Edit / Delete a player

1. Click the edit button found at the end of the row.

2. A new page containing a pre-filled form with the current player's information should be displayed when you visit the following URL: http://localhost:3000/edit-player/$id.

3. To update the player's details, click on 'Save,' or if you wish to delete the player from the database, press 'Delete.'

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Zameer Ejaz - zameer123ejaz@hotmail.com

Project Link: [https://github.com/zameerejaz/arsenal-app-zameer](https://github.com/zameerejaz/arsenal-app-zameer)

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind-img]: https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg
[Tailwind-url]:https://tailwindcss.com/
[Prima-img]:https://cdn.worldvectorlogo.com/logos/prisma-2.svg
[Prisma-url]:https://www.prisma.io/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 