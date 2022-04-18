import React from "react";
import BasicLetterInput from "./BasicLetterInput";

type Props = {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onLockChange?;
};

const BasicInput = ({ value, onChange, onLockChange }: Props) => {
  const [internalValue, setInternalValue] = React.useState((value || " ".repeat(5)).split(""));
  const [internalLocks, setInternalLocks] = React.useState(
    (value || " ".repeat(5)).split("").map((v) => false)
  );

  React.useEffect(() => {
    if (value !== internalValue.join("")) {
      setInternalValue((value || " ".repeat(5)).split(""));
    }
  }, [value]);

  function callOnChange(newInternalValue, newInternalLocks) {
    onChange?.({
      target: { value: newInternalValue, locks: newInternalLocks },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  }

  function handleChangeInPosition(pos, newValue) {
    console.log(pos, newValue);
    const parts = [...internalValue];
    parts[pos] = newValue;
    console.log(parts);
    setInternalValue(parts);
    callOnChange(parts, internalLocks);
  }

  function handleInternalLocksChange(pos, newValue) {
    const newInternalLocks = [...internalLocks];
    newInternalLocks[pos] = newValue;
    setInternalLocks(newInternalLocks);
    callOnChange(internalValue, newInternalLocks);
  }

  return (
    <label className="grid grid-cols-5 mb-4">
      <BasicLetterInput
        value={internalValue[0]}
        lockValue={internalLocks[0]}
        onLockChange={(e) => handleInternalLocksChange(0, e.target.checked)}
        onChange={(e) => handleChangeInPosition(0, e.target.value)}
      />
      <BasicLetterInput
        value={internalValue[1]}
        lockValue={internalLocks[1]}
        onLockChange={(e) => handleInternalLocksChange(1, e.target.checked)}
        onChange={(e) => handleChangeInPosition(1, e.target.value)}
      />
      <BasicLetterInput
        value={internalValue[2]}
        lockValue={internalLocks[2]}
        onLockChange={(e) => handleInternalLocksChange(2, e.target.checked)}
        onChange={(e) => handleChangeInPosition(2, e.target.value)}
      />
      <BasicLetterInput
        value={internalValue[3]}
        lockValue={internalLocks[3]}
        onLockChange={(e) => handleInternalLocksChange(3, e.target.checked)}
        onChange={(e) => handleChangeInPosition(3, e.target.value)}
      />
      <BasicLetterInput
        value={internalValue[4]}
        lockValue={internalLocks[4]}
        onLockChange={(e) => handleInternalLocksChange(4, e.target.checked)}
        onChange={(e) => handleChangeInPosition(4, e.target.value)}
      />
    </label>
  );
};

export default BasicInput;
