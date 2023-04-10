import React, { useState } from "react";

function SidebarLinkGroup({
  children,
  activecondition = false,
}: {
  children:
    | JSX.Element
    | ((handleClick: () => void, open: boolean) => JSX.Element);
  activecondition?: boolean;
}) {
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        activecondition && "bg-slate-900"
      }`}
    >
      {typeof children === "function" && children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;
