import React from "react";
import clsx from "clsx";
import "./styles.css";

const endpoint = "https://icanhazdadjoke.com";
const buttonText = [
  "Ugh.",
  "🤦🏻‍♂️",
  "omg dad.",
  "you are the worst",
  "seriously",
  "stop it.",
  "please stop",
  "that was the worst one"
];

function randomItemFromArray(arr, not) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  if (item === not) {
    return randomItemFromArray(arr, not);
  }
  return item;
}

async function fetchJoke() {
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json"
    }
  });
  const data = await response.json();
  return data;
}

export default function App() {
  const [jokeText, setJokeText] = React.useState("Dad Jokes.");
  const [getJoke, setGetJoke] = React.useState("Get A Joke");
  const [disabledButton, setDisabledButton] = React.useState(false);

  async function handleClick() {
    setDisabledButton(true);
    const { joke } = await fetchJoke();
    setDisabledButton(false);
    setGetJoke(randomItemFromArray(buttonText, getJoke));
    setJokeText(joke);
  }

  const className = clsx("lds-ripple", "loader", !disabledButton && "hidden");

  return (
    <div className="App">
      <div className="App_joke">
        <p>{jokeText}</p>
      </div>
      <button
        className="App_button"
        onClick={handleClick}
        disabled={disabledButton}
      >
        <span>{getJoke}</span>

        <div className={className}>
          <div />
          <div />
        </div>
      </button>
    </div>
  );
}
