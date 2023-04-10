"use client";

import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// @ts-ignore
type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName?: string;
};

const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const asPath = usePathname();
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    // Check if the router fields are updated client-side
    // Dynamic route will be matched via props.as
    // Static route will be matched via props.href
    const linkPathname = new URL(
      (props.as || props.href) as string,
      location.href
    ).pathname;

    // Using URL().pathname to get rid of query and hash
    const activePathname = new URL(asPath ?? "", location.href).pathname;

    const newClassName =
      linkPathname === activePathname
        ? `${className} ${activeClassName}`.trim()
        : className;

    if (newClassName !== computedClassName) {
      setComputedClassName(newClassName);
    }
  }, [
    asPath,
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
  ]);

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
