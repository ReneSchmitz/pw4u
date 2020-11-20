import { useState } from "react";

function Form() {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setInputValue(event.target.value);
        console.log(inputValue);
        setInputValue("");
      }}
    >
      <input
        type="text"
        placeholder="search"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        required={true}
      />
    </form>
  );
}

export default Form;
