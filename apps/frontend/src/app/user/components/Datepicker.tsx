"use client";

import React, { useContext } from "react";
import Flatpickr from "react-flatpickr";
import flatpickr from "flatpickr";
import { SchedulePostModalContext } from "@/app/user/SchedulePostModalProvider";

function Datepicker({ className = "" }: { className?: string }) {
  const { publishDate, setPublishDate } = useContext(SchedulePostModalContext);

  const options: flatpickr.Options.Options = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: new Date(),
    time_24hr: true,
    onChange: (dates) => {
      if (dates[0] && dates[0].getTime() != publishDate.getTime()) {
        setPublishDate(dates[0]);
      }
    },
    prevArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
  };

  return (
    <div className={"relative " + className}>
      <Flatpickr
        value={publishDate.toISOString()}
        className="form-input text-slate-500 hover:text-slate-600 font-medium border-0 cursor-pointer w-44 p-0 mb-3 text-right ml-2"
        options={options}
      />
      <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 fill-current text-slate-500 ml-4 mb-3"
          viewBox="0 0 16 16"
        >
          <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
        </svg>
      </div>
    </div>
  );
}

export default Datepicker;
