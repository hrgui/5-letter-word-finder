import React from "react";
import classnames from "classnames";

type Props = {
  id?: string;
  value: string;
  lockValue: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onLockChange: React.ChangeEventHandler<HTMLInputElement>;
  isLast?: boolean;
};

const BasicLetterInput = ({ id, value, lockValue, onLockChange, onChange, isLast }: Props) => {
  return (
    <div className="flex items-center justify-center mb-2 sm:mb-0">
      <input
        data-testid={id}
        value={value}
        onChange={onChange}
        placeholder={
          !!lockValue ? "Include character in position" : "Exclude characters in position"
        }
        type="text"
        className={classnames(
          `
          w-[calc(100%_-_32px)]
          sm:w-[calc(100%_-_48px)]
        rounded-md
       dark:text-white
        border-transparent
         focus:ring-0`,
          {
            ["bg-green-100 dark:bg-green-800 focus:border-green-500 focus:bg-green-50 dark:focus:bg-green-700"]:
              !!lockValue,
            ["bg-gray-100 dark:bg-gray-600 focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700"]:
              !!!lockValue,
          }
        )}
      />
      <input
        data-testid={`${id}-lock`}
        type="checkbox"
        title="Toggle Lock"
        checked={!!lockValue}
        onChange={onLockChange}
        className={classnames(
          `rounded-md ml-2 w-7 h-8 sm:h-full sm:w-8 sm:ml-4 border-transparent bg-gray-100 dark:bg-gray-600`,
          {
            ["sm:mr-4"]: !isLast,
          }
        )}
      />
    </div>
  );
};

export default BasicLetterInput;
