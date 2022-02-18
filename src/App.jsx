import React from "react";
import data from "./data.json";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function App() {
  const inputRef = React.useRef(null);
  const [_data, setFilteredList] = React.useState(data);

  function handleRegexChange() {
    const value = inputRef.current.value;
    if (value) {
      setFilteredList(data.filter((d) => d.match(new RegExp(value, "g"))));
    } else {
      setFilteredList(data);
    }
  }

  return (
    <div className="dark:bg-gray-800 w-screen h-screen">
      <div className="pl-8 pr-8 pt-8">
        <label className="block">
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
        <div className="h-[calc(100vh-10vh)] overflow-auto bg-gray-50 dark:bg-gray-600 dark:text-white p-2 mt-4 rounded">
          <AutoSizer>
            {({ height, width }) => (
              <List
                className="List"
                height={height}
                itemCount={_data.length}
                itemSize={35}
                width={width}
              >
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
