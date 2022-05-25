import React from "react";

const MyPortfolio = () => {
  return (
    <section className="my-20 px-16">
      <div>Name: Golam Muralin</div>
      <div>Email Address: golammursalin309@gmail.com</div>
      <div>
        Educational Background: BSC in computer science and engineering (3rd
        year ) - Bangladesh Army University of Science and Technology
      </div>
      <div>
        Skills : HTML, CSS, JavaScript, React, Bootstrap, Tailwind CSS, MongoDB,
        NodeJS, Firebase, ExpressJS
      </div>
      <div>
        Live Websites Links:
        <ul className="ml-10">
          <li>
            <a
              href="https://simple-food-ordering-app.netlify.app/"
              className="underline"
            >
              Food Ordering App
            </a>
          </li>
          <li>
            <a
              href="https://theroad-mursalin.netlify.app/"
              className="underline"
            >
              Around The World
            </a>
          </li>
          <li>
            <a
              href="https://g-mursalin.github.io/Simple-ToDo-App-V2/"
              className="underline"
            >
              To Do App
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MyPortfolio;
