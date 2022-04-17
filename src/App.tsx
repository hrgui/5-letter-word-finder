import React from "react";
import RegExInput from "./components/RegExInput";
import MustHaveInput from "./components/MustHaveInput";
import WordList from "./components/WordList";
import data from "./data.json";

function App() {
  const inputRef = React.useRef(null);
  const mustHaveInputRef = React.useRef(null);
  const [_data, setFilteredList] = React.useState(data);

  function handleRegexChange() {
    const defaultRegexValue = inputRef.current.value;
    const charactersToMustHaveValue = mustHaveInputRef.current?.value?.split("") || [];
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
      // RegExp throws an error, so in this case we do nothing
    }
  }

  return (
    <div className="dark:bg-gray-800 w-screen h-screen">
      <div className="pl-8 pr-8 pt-8">
        <RegExInput ref={inputRef} onChange={handleRegexChange} />
        <MustHaveInput ref={mustHaveInputRef} onChange={handleRegexChange} />
        <WordList data={_data} />
      </div>
    </div>
  );
}

export default App;
