import React from "react";
import RegExInput from "./components/RegExInput";
import MustHaveInput from "./components/MustHaveInput";
import WordList from "./components/WordList";
import data from "./data.json";
import BasicInput from "./components/BasicInput";

function App() {
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

  return (
    <div className="dark:bg-gray-800 w-screen h-screen">
      <div className="flex flex-col h-screen">
        <div className="p-4">
          <BasicInput value={basicInputValues} onChange={handleBasicInputValuesChange} />
        </div>
        <div className="pl-4 pr-4">
          <MustHaveInput value={mustHaveInputValue} onChange={handleMustHaveInputValueChange} />
        </div>
        <div className="p-4 flex-grow flex-1">
          <WordList data={_data} />
        </div>
      </div>
    </div>
  );
}

export default App;
