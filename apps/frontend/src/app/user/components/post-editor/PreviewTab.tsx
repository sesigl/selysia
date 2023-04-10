import { ReactElement } from "react";

export default function PreviewTab({
  isActive,
  name,
  svgIcon,
}: {
  isActive: boolean;
  name: string;
  svgIcon: ReactElement;
}) {
  return (
    <a
      className={
        "text-indigo-500 whitespace-nowrap flex items-center " +
        (isActive
          ? "stroke-indigo-500 border-b-2 border-indigo-500"
          : "stroke-slate-500")
      }
      href="#0"
    >
      {svgIcon}
      <span className={"ml-1 " + (isActive ? "text-indigo-500" : "")}>
        {name}
      </span>
    </a>
  );
}
