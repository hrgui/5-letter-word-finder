import React from "react";
import RegExInput from "./components/RegExInput";
import MustHaveInput from "./components/MustHaveInput";
import WordList from "./components/WordList";
import data from "./data.json";

function App() {
  const [_data, setFilteredList] = React.useState(data);
  const [regexInputValue, setRegexInputValue] = React.useState("");
  const [mustHaveInputValue, setMustHaveInputValue] = React.useState("");

  const handleRegexInputValueChange: React.ChangeEventHandler<HTMLInputElement> = function (e) {
    setRegexInputValue(e.target.value);
    handleWordlistChange(e.target.value, mustHaveInputValue);
  };

  const handleMustHaveInputValueChange: React.ChangeEventHandler<HTMLInputElement> = function (e) {
    setMustHaveInputValue(e.target.value);
    handleWordlistChange(regexInputValue, e.target.value);
  };

  function handleWordlistChange(defaultRegexValue, charactersToMustHaveValue) {
    charactersToMustHaveValue = charactersToMustHaveValue.split("");

    try {
      if (defaultRegexValue || charactersToMustHaveValue.length) {
        setFilteredList(
          data
            .filter((d) => d.match(new RegExp(defaultRegexValue, "g")))
            .filter((d) => charactersToMustHaveValue.every((c) => d.includes(c)))
        );
      } else {
        setFilteredList(data);
      }
    } catch (e) {
      // console.error(e);
      // RegExp throws an error, so in this case we do nothing
    }
  }

  return (
    <div className="dark:bg-gray-800 w-screen h-screen">
      <div className="pl-8 pr-8 pt-8">
        <RegExInput value={regexInputValue} onChange={handleRegexInputValueChange} />
        <MustHaveInput value={mustHaveInputValue} onChange={handleMustHaveInputValueChange} />
        <WordList data={_data} />
      </div>
    </div>
  );
}

export default App;
