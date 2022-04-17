import React from "react";

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const MustHaveInput = React.forwardRef<HTMLInputElement, Props>(
  ({ onChange }: Props, mustHaveInputRef) => {
    return (
      <label className="block">
        <input
          ref={mustHaveInputRef}
          type="text"
          defaultValue=""
          data-testid="MustHaveInput"
          onChange={onChange}
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
    );
  }
);

export default MustHaveInput;
