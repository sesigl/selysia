"use client";

import { useState } from "react";

export default function ScheduleTestTweetComponent() {
  const [text, setText] = useState<string>("");

  function sendText() {
    fetch("/api/sendText", {
      method: "POST",
      body: JSON.stringify({ text: text }),
      credentials: "include",
    });
  }

  return (
    <div className="flex flex-col m-5">
      <h2 className="h2">Send a test tweet</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className={`font-medium py-2 px-4 m-2 bg-gray-800 `}
        onClick={sendText}
      >
        send
      </button>
    </div>
  );
}
