import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import classNames from "classnames";

type Props = {
  data: string[];
  onWordClick?: (word: string) => void;
  lockedLetters?: (string | null)[];
};

const WordList = ({ data, onWordClick, lockedLetters }: Props) => {
  return (
    <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-600 dark:text-white p-2 rounded">
      <AutoSizer>
        {({ height, width }) => (
          <List height={height} itemCount={data.length} itemSize={35} width={width}>
            {({ index, style }) => {
              const chars = data[index].split("");

              return (
                <button
                  onClick={() => onWordClick(data[index])}
                  className="text-left"
                  style={style}
                  name={data[index]}
                  title={data[index]}
                >
                  {chars.map((c, i) => (
                    <span
                      className={classNames({
                        ["font-bold bg-green-100 dark:bg-green-800"]: lockedLetters[i] === c,
                      })}
                    >
                      {c}
                    </span>
                  ))}
                </button>
              );
            }}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default WordList;
