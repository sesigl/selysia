"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import Logo from "@/app/(landing)/partials/Logo";
import Dropdown from "../utils/Dropdown";

function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(event.target as Node) ||
        trigger.current.contains(event.target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    // @ts-ignore
    document.addEventListener("click", clickHandler);
    // @ts-ignore
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!mobileNavOpen || event.keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cruip">
              <Logo />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/*  /!* Desktop menu links *!/*/}
            <ul className="flex grow justify-end flex-wrap items-center">
              {/*    <li>*/}
              {/*      <Link*/}
              {/*        href="/features"*/}
              {/*        className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out"*/}
              {/*      >*/}
              {/*        Features*/}
              {/*      </Link>*/}
              {/*    </li>*/}
              {/*    <li>*/}
              {/*      <Link*/}
              {/*        href="/pricing"*/}
              {/*        className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out"*/}
              {/*      >*/}
              {/*        Pricing*/}
              {/*      </Link>*/}
              {/*    </li>*/}
              {/*    <li>*/}
              {/*      <Link*/}
              {/*        href="/blog"*/}
              {/*        className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out"*/}
              {/*      >*/}
              {/*        Blog*/}
              {/*      </Link>*/}
              {/*    </li>*/}
              {/*    <li>*/}
              {/*      <Link*/}
              {/*        href="/about"*/}
              {/*        className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out"*/}
              {/*      >*/}
              {/*        About us*/}
              {/*      </Link>*/}
              {/*    </li>*/}
              {/*    /!* 1st level: hover *!/*/}
            </ul>

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <Dropdown title="Support">
                {/* 2nd level: hover */}
                <li>
                  <Link
                    href="/contact"
                    className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight"
                  >
                    Contact us
                  </Link>
                </li>
              </Dropdown>
              <li>
                <Link
                  href="/sign-in"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                >
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            {/* Hamburger button */}
            <button
              ref={trigger}
              className={`hamburger ${mobileNavOpen && "active"}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <nav
              id="mobile-nav"
              ref={mobileNav}
              className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
              style={
                mobileNavOpen
                  ? { maxHeight: mobileNav?.current?.scrollHeight, opacity: 1 }
                  : { maxHeight: 0, opacity: 0.8 }
              }
            >
              <ul className="bg-gray-800 px-4 py-2">
                {/*  <li>*/}
                {/*    <Link*/}
                {/*      href="/features"*/}
                {/*      className="flex text-gray-300 hover:text-gray-200 py-2"*/}
                {/*    >*/}
                {/*      Features*/}
                {/*    </Link>*/}
                {/*  </li>*/}
                {/*  <li>*/}
                {/*    <Link*/}
                {/*      href="/pricing"*/}
                {/*      className="flex text-gray-300 hover:text-gray-200 py-2"*/}
                {/*    >*/}
                {/*      Pricing*/}
                {/*    </Link>*/}
                {/*  </li>*/}
                {/*  <li>*/}
                {/*    <Link*/}
                {/*      href="/blog"*/}
                {/*      className="flex text-gray-300 hover:text-gray-200 py-2"*/}
                {/*    >*/}
                {/*      Blog*/}
                {/*    </Link>*/}
                {/*  </li>*/}
                {/*  <li>*/}
                {/*    <Link*/}
                {/*      href="/about"*/}
                {/*      className="flex text-gray-300 hover:text-gray-200 py-2"*/}
                {/*    >*/}
                {/*      About us*/}
                {/*    </Link>*/}
                {/*  </li>*/}
                <li className="py-2 my-2 border-t border-b border-gray-700">
                  <span className="flex text-gray-300 py-2">Support</span>
                  <ul className="pl-4">
                    <li>
                      <Link
                        href="/contact"
                        className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2"
                      >
                        Contact us
                      </Link>
                    </li>
                    {/*<li>*/}
                    {/*  <Link*/}
                    {/*    href="/help"*/}
                    {/*    className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2"*/}
                    {/*  >*/}
                    {/*    Help center*/}
                    {/*  </Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*  <Link*/}
                    {/*    href="/404"*/}
                    {/*    className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2"*/}
                    {/*  >*/}
                    {/*    404*/}
                    {/*  </Link>*/}
                    {/*</li>*/}
                  </ul>
                </li>
                <li>
                  <Link
                    href="/sign-in"
                    className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center"
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
