import React from "react";
import MustHaveInput from "./components/MustHaveInput";
import WordList from "./components/WordList";
import data from "./data.json";
import BasicInput from "./components/BasicInput";
import { flatten } from "lodash";
import QuickAddWordForm from "./components/QuickAddWordForm";

function App() {
  const [_data, setFilteredList] = React.useState(data);
  const [basicInputValues, setBasicInputValues] = React.useState(new Array(5).fill(""));
  const [locksValue, setLocksValue] = React.useState(new Array(5).fill(false));
  const [mustHaveInputValue, setMustHaveInputValue] = React.useState("");
  const [extraCharactersToExcludeRaw, setExtraCharactersToExcludeRaw] = React.useState("");

  function getCharactersToExcludeAtPosition(
    valueAtPosition,
    allValues,
    locks,
    mustHaveInputValues,
    extraCharactersToExclude
  ) {
    //FIXME refactor probably can reduce to only do it once rather than per each call
    const lockedValuesToExclude = allValues.filter((value, i) => locks[i]);
    const currentValuesAtPosition = valueAtPosition.split("");

    // if the current position contains a must have value and its not locked, do not filter out
    mustHaveInputValues = mustHaveInputValues.filter(
      (mustHaveInputCharacter) => !currentValuesAtPosition.includes(mustHaveInputCharacter)
    );

    // FIXME refactor flatten most likely can be memoed
    const allOtherExcludeCharacters = flatten([
      ...allValues.map((v) => v.split("")),
      ...extraCharactersToExclude,
    ])
      .filter((value) => !lockedValuesToExclude.includes(value))
      .filter((value) => !mustHaveInputValues.includes(value))
      .join("");
    return `${allOtherExcludeCharacters}`;
  }

  function getRegexValueFromBasicInputValue({
    value,
    locks,
    mustHaveInputValues,
    extraCharactersToExclude,
  }) {
    mustHaveInputValues = mustHaveInputValues.split("");
    const newRegexValue = value
      .map((valueAtPosition, i) => {
        let actualValue;

        if (valueAtPosition.trim() === "") {
          actualValue = "\\w"; // nothing
        } else if (locks[i]) {
          actualValue = valueAtPosition.trim()[0];
        } else {
          actualValue = `[^${getCharactersToExcludeAtPosition(
            valueAtPosition,
            value,
            locks,
            mustHaveInputValues,
            extraCharactersToExclude
          )}]`;
        }

        return actualValue;
      })
      .join("");

    return newRegexValue;
  }

  const handleBasicInputValuesChange: React.ChangeEventHandler<HTMLInputElement> = function (e) {
    setBasicInputValues(e.target.value as unknown as string[]);
    setLocksValue((e.target as any).locks);
    const { value, locks, extraCharactersToExclude } = e.target as HTMLInputElement & {
      locks: boolean[];
      extraCharactersToExclude: string[];
    };
    const allExtraCharactersToExcludeRaw = `${extraCharactersToExcludeRaw}${extraCharactersToExclude.join(
      ""
    )}`;
    setExtraCharactersToExcludeRaw(allExtraCharactersToExcludeRaw);
    handleWordlistChange(
      getRegexValueFromBasicInputValue({
        value,
        locks,
        mustHaveInputValues: mustHaveInputValue,
        extraCharactersToExclude: allExtraCharactersToExcludeRaw.split(""),
      }),
      mustHaveInputValue
    );
  };

  const handleMustHaveInputValueChange: React.ChangeEventHandler<HTMLInputElement> = function (e) {
    const newMustHaveInputValue = e.target.value?.toLowerCase();
    setMustHaveInputValue(newMustHaveInputValue);
    handleWordlistChange(
      getRegexValueFromBasicInputValue({
        value: basicInputValues,
        locks: locksValue,
        mustHaveInputValues: newMustHaveInputValue,
        extraCharactersToExclude: extraCharactersToExcludeRaw.split(""),
      }),
      newMustHaveInputValue
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
      getRegexValueFromBasicInputValue({
        value: newBasicInputValues,
        locks: locksValue,
        mustHaveInputValues: mustHaveInputValue,
        extraCharactersToExclude: extraCharactersToExcludeRaw.split(""),
      }),
      mustHaveInputValue
    );
  }

  function handleChangeExtraCharactersToExclude(newValue) {
    setExtraCharactersToExcludeRaw(newValue);
    handleWordlistChange(
      getRegexValueFromBasicInputValue({
        value: basicInputValues,
        locks: locksValue,
        mustHaveInputValues: mustHaveInputValue,
        extraCharactersToExclude: newValue.split(""),
      }),
      mustHaveInputValue
    );
  }

  return (
    <div className="dark:bg-gray-800 w-screen h-screen">
      <div className="flex flex-col h-screen">
        <div className="p-4">
          <BasicInput value={basicInputValues} onChange={handleBasicInputValuesChange} />
        </div>
        <div className="pl-4 pr-4 pb-4 flex items-center justify-center text-black dark:text-white">
          Current Regex:{" "}
          <code>
            {getRegexValueFromBasicInputValue({
              value: basicInputValues,
              locks: locksValue,
              mustHaveInputValues: mustHaveInputValue,
              extraCharactersToExclude: extraCharactersToExcludeRaw.split(""),
            })}
          </code>
        </div>
        <QuickAddWordForm onSubmit={handleWordClick} />
        <div className="pl-4 pr-4">
          <input
            data-testid="extraCharactersToExclude"
            type="text"
            onChange={(e) => handleChangeExtraCharactersToExclude(e.target.value?.toLowerCase())}
            value={extraCharactersToExcludeRaw}
            placeholder="Dropped characters after locking will show up here - remove or add"
            className="block
            w-full
            rounded-md
            bg-gray-100 dark:bg-gray-600 dark:text-white
            border-transparent
            focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-0"
          />
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
