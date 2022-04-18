import React from "react";

type Props = {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const MustHaveInput = React.forwardRef<HTMLInputElement, Props>(
  ({ onChange, value }: Props, mustHaveInputRef) => {
    return (
      <label className="block">
        <input
          ref={mustHaveInputRef}
          type="text"
          value={value}
          data-testid="MustHaveInput"
          onChange={onChange}
          className="
              block
              w-full
              rounded-md
              bg-yellow-100 dark:bg-yellow-600 dark:text-white dark:placeholder-gray-300
              focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-0
            "
          placeholder="Insert characters must have"
        />
      </label>
    );
  }
);

export default MustHaveInput;
