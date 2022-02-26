import React, { ChangeEvent, useRef } from "react";

export type BlockState = "valid" | "validInDifferent" | "notFound" | "default";

export interface ITextFieldProps {
  blocks: Array<BlockState>;
  value: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({
  blocks,
  onChange,
  value,
  ...props
}: ITextFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleContainerClick() {
    inputRef.current?.focus();
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    var pattern = new RegExp(/\d/i);

    if (
      (!event.target.value || !pattern.test(event.target.value)) &&
      blocks.length >= event.target.value.length
    ) {
      onChange && onChange(event);
    }
  }

  const inputValue = value.toLocaleUpperCase();

  const colorMap: Record<BlockState, string> = {
    valid: "rgb(106, 170, 100)",
    default: "white",
    notFound: "rgb(120, 124, 126)",
    validInDifferent: "rgb(201, 180, 88)",
  };

  return (
    <div onClick={handleContainerClick} style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: 1 }}>
        {blocks.map((block, i) => {
          const color = colorMap[block];
          return (
            <div
              key={i}
              style={{
                backgroundColor: color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "2px",
                border: "1px solid grey",
                width: "4rem",
                height: "6rem",
              }}
            >
              <span
                style={{
                  fontSize: "3rem",
                  color: block === "default" ? "black" : "white",
                }}
              >
                {inputValue[i]}
              </span>
            </div>
          );
        })}
      </div>
      <input
        style={{ opacity: 0, position: "fixed" }}
        type="text"
        ref={inputRef}
        {...props}
        value={value}
        onChange={handleInputChange}
      ></input>
    </div>
  );
}
