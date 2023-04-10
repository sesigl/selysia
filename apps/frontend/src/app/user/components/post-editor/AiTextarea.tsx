import React, { useRef, useState } from "react";

export default function AiTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const aiInputField = useRef<HTMLInputElement>(null);
  const [aiInputFieldStyle, setAiInputFieldStyle] = useState<
    Record<string, string>
  >({});
  const [aiFieldValue, setAiFieldValue] = useState<string>("");
  const [aiFieldsVisible, setAiFieldsVisible] = useState<boolean>(false);

  return (
    <div className="relative">
      <textarea
        ref={textarea}
        {...props}
        onKeyDown={(e) => {
          console.log(e.key, e.ctrlKey);
          if (e.ctrlKey && e.key === " ") {
            setAiFieldsVisible(true);
            aiInputField.current?.focus();

            if (aiInputField.current) {
              var numberLineBreaks = (
                textarea.current!!.value.match(/\n/g) || []
              ).length;

              setAiInputFieldStyle({
                left: `6px`,
                top: `${(numberLineBreaks + 1) * 1.7}rem`,
              });
            }
          }
        }}
      />
      <div
        className={`absolute transition-all ${
          aiFieldsVisible ? "opacity-100" : "opacity-0"
        }`}
        style={aiInputFieldStyle}
      >
        <input
          type="text"
          value={aiFieldValue}
          onChange={(element) => setAiFieldValue(element.target.value)}
          ref={aiInputField}
          className={`pl-10`}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              textarea.current?.focus();
              setAiFieldsVisible(false);
              setAiFieldValue("");
            }

            if (e.key === "Enter") {
              setAiFieldsVisible(false);
              setAiFieldValue("");

              if (textarea.current) {
                textarea.current.focus();

                const generatedText =
                  'I am your AI assistant. You asked me"' +
                  aiFieldValue +
                  '". I am not yet wired to the backend.';

                for (let i = 0; i < generatedText.length; i++) {
                  setTimeout(() => {
                    textarea.current!!.value =
                      textarea.current?.value + generatedText[i];

                    props.onChange({
                      target: { value: textarea.current!!.value },
                    });
                  }, i * 10);
                }
              }
            }
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-wand absolute top-3 left-3"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#9e9e9e"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="6 21 21 6 18 3 3 18 6 21" />
          <line x1="15" y1="6" x2="18" y2="9" />
          <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
          <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
        </svg>
      </div>
    </div>
  );
}
