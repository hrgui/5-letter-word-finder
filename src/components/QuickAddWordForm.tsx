import React from "react";

type Props = {
  onSubmit: (word: string) => void;
};

const QuickAddWordForm = ({ onSubmit }: Props) => {
  const quickAddWordRef = React.useRef(null);

  function handleQuickAddWord() {
    onSubmit(quickAddWordRef.current.value?.toLowerCase());
    quickAddWordRef.current.value = "";
  }

  return (
    <form
      className="pl-4 pr-4 pb-4 flex h-12 items-center justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleQuickAddWord();
      }}
    >
      <input
        ref={quickAddWordRef}
        data-testid="quickAddWordInput"
        type="text"
        placeholder="Quick add word"
        max={5}
        className="block
            w-full
            rounded-md
            bg-gray-100 dark:bg-gray-600 dark:text-white
            border-transparent
            focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-0"
      />
      <button
        data-testid="quickAddWordButton"
        className="bg-red-700 text-white p-3 w-auto rounded-lg hover:bg-red-900 focus:outline-none focus:ring shadow-md hover:shadow-none transition-all duration-300"
      >
        +
      </button>
    </form>
  );
};

export default QuickAddWordForm;
