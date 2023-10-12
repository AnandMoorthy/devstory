import React from "react";
import "./About.css";

export class About extends React.Component {
  render() {
    return (
      <div className="Container">
        <h2>About us</h2>
        <p>
          The dev story was built to provide a curated collection of articles
          from some of the best sources. Get to know the top articles and news
          across the globe in a single dashboard. We are currently curating
          articles across 50 different sources under 4 categories Tech, Design,
          Fashion, Business. New categories will be added time to time. Staty
          tuned!
        </p>
        <p>
          The DevStory was conceptualized and build by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/anandhamoorthyj/"
          >
            Anand
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/udhay-hariharan-1416a5127/"
          >
            Udhay
          </a>
        </p>
        <p>
          If you like this product, support us and help us spread the word.
          Cheers!
        </p>
      </div>
    );
  }
}
