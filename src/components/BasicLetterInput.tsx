import React from "react";

type Props = {
  value: string;
  lockValue: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onLockChange: React.ChangeEventHandler<HTMLInputElement>;
};

const BasicLetterInput = ({ value, lockValue, onLockChange, onChange }: Props) => {
  console.log("BasicLetterInput", value);
  return (
    <div className="flex items-center justify-center">
      <input
        value={value}
        onChange={onChange}
        type="text"
        className="
                rounded-md
                bg-gray-100 dark:bg-gray-600 dark:text-white
                border-transparent
                focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-0"
      />
      <input
        type="checkbox"
        checked={lockValue}
        onChange={onLockChange}
        className="rounded-md h-full w-8 ml-4 border-transparent"
      />
    </div>
  );
};

export default BasicLetterInput;
