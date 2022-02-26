import React, { ChangeEvent, useRef, useState } from "react";
import "./App.css";
import { TextField } from "./components/TextField/TextField";
import { useGameProgress } from "./hooks/useGameProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

function App() {
  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { gameProgress, guess, clearGameProgress } = useGameProgress();
  
  function handleTextFieldChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleSubmit(event: React.MouseEvent) {
    if (guess(text)) {
      setText("");
    } else {
      setOpen(true);
    }
    event.preventDefault();
  }

  function handleClear() {
    setText("");
    clearGameProgress();
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <header>
        <h1 style={{ textAlign: "center" }}>Wordle</h1>
        <h3 style={{textAlign: "center"}}>The danish version</h3>
      </header>
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            {gameProgress?.guesses.map((guess, i) => {
              const word = gameProgress.guessCount === i ? text : guess.word;
              return (
                <TextField
                  disabled={gameProgress.guessCount !== i}
                  autoFocus={gameProgress.guessCount === i}
                  key={i}
                  blocks={guess.states}
                  value={word}
                  onChange={handleTextFieldChange}
                />
              );
            })}
            <button
              type="submit"
              hidden
              disabled={!(text.length === 5)}
              onClick={handleSubmit}
            >
              Submit
            </button>
            <div style={{ height: "4rem" }}>
              {gameProgress?.guessCount === gameProgress?.guesses.length && (
                <span>{"The word was - " + gameProgress?.wordleWord}</span>
              )}
            </div>
            <Button
              style={{ marginRight: "auto" }}
              variant="contained"
              type="button"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <div
          style={{
            backgroundColor: "#424242",
            padding: "1rem",
            color: "white",
          }}
        >
          Findes ikke i ordliste
        </div>
      </Snackbar>
    </div>
  );
}

export default App;
