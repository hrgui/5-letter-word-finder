import React from "react";
import MustHaveInput from "./components/MustHaveInput";
import WordList from "./components/WordList";
import data from "./data.json";
import BasicInput from "./components/BasicInput";

function App() {
  const quickAddWordRef = React.useRef(null);
  const [_data, setFilteredList] = React.useState(data);
  const [basicInputValues, setBasicInputValues] = React.useState(new Array(5).fill(""));
  const [locksValue, setLocksValue] = React.useState(new Array(5).fill(false));
  const [mustHaveInputValue, setMustHaveInputValue] = React.useState("");

  function getRegexValueFromBasicInputValue({ value, locks }) {
    return value
      .map((value, i) => {
        let actualValue;

        if (value.trim() === "") {
          actualValue = "\\w"; // nothing
        } else if (locks[i]) {
          actualValue = value.trim()[0];
        } else {
          actualValue = `[^${value}]`;
        }

        return actualValue;
      })
      .join("");
  }

  const handleBasicInputValuesChange: React.ChangeEventHandler<HTMLInputElement> = function (e) {
    setBasicInputValues(e.target.value as unknown as string[]);
    setLocksValue((e.target as any).locks);
    handleWordlistChange(
      getRegexValueFromBasicInputValue(e.target as HTMLInputElement & { locks: boolean[] }),
      mustHaveInputValue
    );
  };

  const handleMustHaveInputValueChange: React.ChangeEventHandler<HTMLInputElement> = function (e) {
    setMustHaveInputValue(e.target.value);
    handleWordlistChange(
      getRegexValueFromBasicInputValue({ value: basicInputValues, locks: locksValue }),
      e.target.value
    );
  };

  function handleWordlistChange(basicInputValues, charactersToMustHaveValue) {
    charactersToMustHaveValue = charactersToMustHaveValue.split("");

    try {
      if (basicInputValues.length || charactersToMustHaveValue.length) {
        setFilteredList(
          data
            .filter((d) => d.match(new RegExp(basicInputValues, "g")))
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

  function handleWordClick(word) {
    const newBasicInputValues = basicInputValues.map((currentLetters, i) =>
      !locksValue[i] ? `${currentLetters}${word[i]}` : currentLetters
    );
    setBasicInputValues(newBasicInputValues);
    handleWordlistChange(
      getRegexValueFromBasicInputValue({ value: newBasicInputValues, locks: locksValue }),
      mustHaveInputValue
    );
  }

  function handleQuickAddWord() {
    handleWordClick(quickAddWordRef.current.value);
    quickAddWordRef.current.value = "";
  }

  return (
    <div className="dark:bg-gray-800 w-screen h-screen">
      <div className="flex flex-col h-screen">
        <div className="p-4">
          <BasicInput value={basicInputValues} onChange={handleBasicInputValuesChange} />
        </div>
        <div className="pl-4 pr-4 pb-4 flex h-12 items-center justify-center">
          <input
            ref={quickAddWordRef}
            data-testid="quickAddWordInput"
            type="text"
            placeholder="Quick add word"
            max={5}
            className="block
            w-full
            rounded-md
            bg-gray-100 dark:bg-gray-600 dark:text-white
            border-transparent
            focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-0"
          />
          <button
            data-testid="quickAddWordButton"
            onClick={handleQuickAddWord}
            className="bg-red-700 text-white p-3 w-auto rounded-lg hover:bg-red-900 focus:outline-none focus:ring shadow-md hover:shadow-none transition-all duration-300"
          >
            +
          </button>
        </div>
        <div className="pl-4 pr-4">
          <MustHaveInput value={mustHaveInputValue} onChange={handleMustHaveInputValueChange} />
        </div>
        <div className="p-4 flex-grow flex-1">
          <WordList
            lockedLetters={basicInputValues.map((letter, i) => (locksValue[i] ? letter : null))}
            mustHaveLetters={mustHaveInputValue.split("")}
            onWordClick={handleWordClick}
            data={_data}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
