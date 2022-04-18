import React from "react";

type Props = {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const RegExInput = React.forwardRef<HTMLInputElement, Props>(
  ({ onChange, value }: Props, inputRef) => {
    return (
      <label className="block mb-4">
        <input
          value={value}
          ref={inputRef}
          type="text"
          data-testid="RegExInput"
          onChange={onChange}
          className="
            block
            w-full
            rounded-md
            bg-gray-100 dark:bg-gray-600 dark:text-white
            border-transparent
            focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-0
          "
          placeholder="Insert Regular Expression to search list... (e.g. [^c]\w\w\wr is 5 letter words that end with r, does not start with c)"
        />
      </label>
    );
  }
);

export default RegExInput;
