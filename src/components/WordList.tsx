import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

type Props = {
  data: string[];
  onWordClick?: (word: string) => void;
};

const WordList = ({ data, onWordClick }: Props) => {
  return (
    <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-600 dark:text-white p-2 rounded">
      <AutoSizer>
        {({ height, width }) => (
          <List height={height} itemCount={data.length} itemSize={35} width={width}>
            {({ index, style }) => {
              return (
                <button
                  onClick={() => onWordClick(data[index])}
                  className="text-left"
                  style={style}
                >
                  {data[index]}
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
