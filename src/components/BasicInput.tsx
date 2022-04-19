import React from "react";
import BasicLetterInput from "./BasicLetterInput";

type Props = {
  value?: string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const BasicInput = ({ value, onChange }: Props) => {
  const [internalValue, setInternalValue] = React.useState(value || new Array(5).fill(""));
  const [internalLocks, setInternalLocks] = React.useState(
    value?.map(() => false) || new Array(5).fill(() => false)
  );

  React.useEffect(() => {
    if (value && value.join("") !== internalValue.join("")) {
      setInternalValue(value);
    }
  }, [value]);

  function callOnChange(newInternalValue, newInternalLocks) {
    onChange?.({
      target: { value: newInternalValue, locks: newInternalLocks },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  }

  function handleChangeInPosition(pos, newValue) {
    const parts = [...internalValue];
    parts[pos] = newValue;
    setInternalValue(parts);
    callOnChange(parts, internalLocks);
  }

  function handleInternalLocksChange(pos, newValue) {
    const newInternalLocks = [...internalLocks];
    newInternalLocks[pos] = newValue;
    setInternalLocks(newInternalLocks);

    const parts = [...internalValue];
    const currentWord = parts[pos];
    parts[pos] = currentWord[currentWord.length - 1]; // choose the last because we're basing it on last word click
    setInternalValue(parts);

    callOnChange(parts, newInternalLocks);
  }

  return (
    <label className="sm:grid sm:grid-cols-5">
      <BasicLetterInput
        id="basic-letter-input-0"
        value={internalValue[0]}
        lockValue={internalLocks[0]}
        onLockChange={(e) => handleInternalLocksChange(0, e.target.checked)}
        onChange={(e) => handleChangeInPosition(0, e.target.value)}
      />
      <BasicLetterInput
        id="basic-letter-input-1"
        value={internalValue[1]}
        lockValue={internalLocks[1]}
        onLockChange={(e) => handleInternalLocksChange(1, e.target.checked)}
        onChange={(e) => handleChangeInPosition(1, e.target.value)}
      />
      <BasicLetterInput
        id="basic-letter-input-2"
        value={internalValue[2]}
        lockValue={internalLocks[2]}
        onLockChange={(e) => handleInternalLocksChange(2, e.target.checked)}
        onChange={(e) => handleChangeInPosition(2, e.target.value)}
      />
      <BasicLetterInput
        id="basic-letter-input-3"
        value={internalValue[3]}
        lockValue={internalLocks[3]}
        onLockChange={(e) => handleInternalLocksChange(3, e.target.checked)}
        onChange={(e) => handleChangeInPosition(3, e.target.value)}
      />
      <BasicLetterInput
        isLast
        id="basic-letter-input-4"
        value={internalValue[4]}
        lockValue={internalLocks[4]}
        onLockChange={(e) => handleInternalLocksChange(4, e.target.checked)}
        onChange={(e) => handleChangeInPosition(4, e.target.value)}
      />
    </label>
  );
};

export default BasicInput;
