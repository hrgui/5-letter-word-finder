import React from "react";
import data from "./data.json";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function App() {
  const inputRef = React.useRef(null);
  const negativeInputRef = React.useRef(null);
  const mustHaveInputRef = React.useRef(null);
  const [_data, setFilteredList] = React.useState(data);

  function handleRegexChange() {
    const defaultRegexValue = inputRef.current.value;
    const charactersToExcludeValue = negativeInputRef.current.value;
    const charactersToMustHaveValue = mustHaveInputRef.current?.value?.split("") || [];

    if (defaultRegexValue || charactersToExcludeValue || charactersToMustHaveValue.length) {
      setFilteredList(
        data
          .filter((d) => d.match(new RegExp(defaultRegexValue, "g")))
          .filter((d) => d.match(new RegExp(`^[^${charactersToExcludeValue}]+$`, "g")))
          .filter((d) => charactersToMustHaveValue.every((c) => d.includes(c)))
      );
    } else {
      setFilteredList(data);
    }
  }

  return (
    <div className="dark:bg-gray-800 w-screen h-screen">
      <div className="pl-8 pr-8 pt-8">
        <label className="block mb-4">
          <input
            ref={inputRef}
            type="text"
            defaultValue=""
            onChange={handleRegexChange}
            className="
                    block
                    w-full
                    rounded-md
                    bg-gray-100 dark:bg-gray-600 dark:text-white
                    border-transparent
                    focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-0
                  "
            placeholder="Insert Regular Expression to search list.... (e.g. \w\w\w\wr is 5 letter words that end with r)"
          />
        </label>
        <label className="block mb-4">
          <input
            ref={negativeInputRef}
            type="text"
            defaultValue=""
            onChange={handleRegexChange}
            className="
                    block
                    w-full
                    rounded-md
                    bg-gray-100 dark:bg-gray-600 dark:text-white
                    border-transparent
                    focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-0
                  "
            placeholder="Insert characters to exclude"
          />
        </label>
        <label className="block">
          <input
            ref={mustHaveInputRef}
            type="text"
            defaultValue=""
            onChange={handleRegexChange}
            className="
                    block
                    w-full
                    rounded-md
                    bg-gray-100 dark:bg-gray-600 dark:text-white
                    border-transparent
                    focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-0
                  "
            placeholder="Insert characters must have"
          />
        </label>
        <div className="h-[calc(100vh-220px)] overflow-auto bg-gray-50 dark:bg-gray-600 dark:text-white p-2 mt-4 rounded">
          <AutoSizer>
            {({ height, width }) => (
              <List height={height} itemCount={_data.length} itemSize={35} width={width}>
                {({ index, style }) => {
                  return <div style={style}>{_data[index]}</div>;
                }}
              </List>
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
}

export default App;
