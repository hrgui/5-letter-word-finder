import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

type Props = {
  data: string[];
};

const WordList = ({ data }: Props) => {
  return (
    <div className="h-[calc(100vh-380px)]  sm:h-[calc(100vh-160px)] overflow-auto bg-gray-50 dark:bg-gray-600 dark:text-white p-2 mt-4 rounded">
      <AutoSizer>
        {({ height, width }) => (
          <List height={height} itemCount={data.length} itemSize={35} width={width}>
            {({ index, style }) => {
              return <div style={style}>{data[index]}</div>;
            }}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default WordList;
