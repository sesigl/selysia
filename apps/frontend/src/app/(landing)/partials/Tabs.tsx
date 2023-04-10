"use client";

import { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition";
import config from "@/configuration";
import Image from "next/image";

function Tabs() {
  const [tab, setTab] = useState(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current?.children[tab - 1]) {
      tabs.current.style.height =
        // @ts-ignore
        tabs.current.children[tab - 1].offsetHeight + "px";
    }
  };

  useEffect(() => {
    heightFix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Section header */}
          <div
            className="max-w-3xl mx-auto text-center pb-12"
            data-aos-id-tabs=""
          >
            <h2
              className="h2 mb-4"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-tabs]"
            >
              Optimized workflow designed for individuals and small teams
            </h2>
            <p
              className="text-xl text-gray-400"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-anchor="[data-aos-id-tabs]"
            >
              Optimize efficiency is out number one priority. Therefore, we work
              hard to provide an excellent usability and allow you to automate
              as much as possible leveraging state of the art artificial
              intelligence.
            </p>
          </div>

          {/* Section content */}
          <div>
            {/* Tabs buttons */}
            <div
              className="flex flex-wrap justify-center -m-2"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-anchor="[data-aos-id-tabs]"
            >
              <button
                className={`flex items-center font-medium py-2 px-4 m-2 bg-gray-800 rounded-full group transition duration-500 ${
                  tab !== 1 && "opacity-50"
                }`}
                onClick={() => setTab(1)}
              >
                <svg
                  className="w-4 h-4 fill-current text-purple-600 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.5 5.5c-.311.001-.62.061-.909.177l-2.268-2.268c.116-.29.176-.598.177-.909a2.5 2.5 0 00-5 0c.001.311.061.62.177.909L3.409 5.677A2.473 2.473 0 002.5 5.5a2.5 2.5 0 000 5c.311-.001.62-.061.909-.177l2.268 2.268c-.116.29-.176.598-.177.909a2.5 2.5 0 105 0 2.473 2.473 0 00-.177-.909l2.268-2.268c.29.116.598.176.909.177a2.5 2.5 0 100-5zM8 11c-.311.001-.62.061-.909.177L4.823 8.909a2.423 2.423 0 000-1.818l2.268-2.268a2.423 2.423 0 001.818 0l2.268 2.268a2.423 2.423 0 000 1.818l-2.268 2.268A2.473 2.473 0 008 11z" />
                </svg>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-150 ease-in-out">
                  Inspiration
                </span>
              </button>
              <button
                className={`flex items-center font-medium py-2 px-4 m-2 bg-gray-800 rounded-full group transition duration-500 ${
                  tab !== 2 && "opacity-50"
                }`}
                onClick={() => setTab(2)}
              >
                <svg
                  className="w-4 h-4 fill-current text-purple-600 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.043 6.293S9.79 1.905 6.745 0A5.37 5.37 0 014.72 3.887C3.42 5.03.974 7.6 1 10.34A6.285 6.285 0 004.451 16a3.984 3.984 0 011.394-2.755 3.253 3.253 0 001.246-2.185 5.856 5.856 0 013.1 4.881v.013a5.883 5.883 0 003.428-5.106c.216-2.574-1.194-6.074-2.445-7.218a6.793 6.793 0 01-2.13 2.663z" />
                </svg>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-150 ease-in-out">
                  Content Curation
                </span>
              </button>
              <button
                className={`flex items-center font-medium py-2 px-4 m-2 bg-gray-800 rounded-full group transition duration-500 ${
                  tab !== 3 && "opacity-50"
                }`}
                onClick={() => setTab(3)}
              >
                <svg
                  className="w-4 h-4 fill-current text-purple-600 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 10c-1.1 0-2-.9-2-2 0-.2 0-.3.1-.5L3.6 5 5 3.6l2.5 2.5c.2-.1.3-.1.5-.1 1.1 0 2 .9 2 2s-.9 2-2 2z" />
                </svg>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-150 ease-in-out">
                  Summarization
                </span>
              </button>
              <button
                className={`flex items-center font-medium py-2 px-4 m-2 bg-gray-800 rounded-full group transition duration-500 ${
                  tab !== 4 && "opacity-50"
                }`}
                onClick={() => setTab(4)}
              >
                <svg
                  className="w-4 h-4 fill-current text-purple-600 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 9v6a8 8 0 008-8V1a8 8 0 00-8 8zM0 6v3a6 6 0 006 6v-3a6 6 0 00-6-6z" />
                </svg>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-150 ease-in-out">
                  At the right time
                </span>
              </button>
              <button
                className={`flex items-center font-medium py-2 px-4 m-2 bg-gray-800 rounded-full group transition duration-500 ${
                  tab !== 5 && "opacity-50"
                }`}
                onClick={() => setTab(5)}
              >
                <svg
                  className="w-4 h-4 fill-current text-purple-600 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.936 6.007H8.358l1.594-4.685c.3-.997-.897-1.794-1.694-.997L.284 8.3c-.598.598-.199 1.694.698 1.694H7.56l-1.594 4.685c-.3.997.897 1.794 1.694.997L15.633 7.7c.598-.598.2-1.694-.697-1.694z" />
                </svg>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-150 ease-in-out">
                  Learn from historical data
                </span>
              </button>
            </div>

            {/* Tabs items */}
            <div
              className="relative flex flex-col mt-16"
              data-aos="fade-up"
              ref={tabs}
            >
              {/* Item 1 */}
              <Transition
                show={tab === 1}
                appear={true}
                className="w-full"
                enter="transition ease-in-out duration-500 transform order-first"
                enterStart="opacity-0 scale-98"
                enterEnd="opacity-100 scale-100"
                leave="transition ease-out duration-300 transform absolute"
                leaveStart="opacity-100 scale-100"
                leaveEnd="opacity-0 scale-98"
              >
                <article className="relative max-w-md mx-auto md:max-w-none">
                  <figure className="md:absolute md:inset-y-0 md:right-0 md:w-1/2">
                    <Image
                      className="w-full h-full object-cover"
                      src={
                        config.publicAssetBucketBasePath +
                        "/images/tabs-image-01.jpg"
                      }
                      width="516"
                      height="387"
                      alt="Tabs 01"
                    />
                  </figure>
                  <div className="relative bg-gray-800 py-8 md:py-16 px-6 md:pr-16 md:max-w-lg lg:max-w-xl">
                    <h4 className="h4 mb-2">
                      Inspiration from advanced language models
                    </h4>
                    <p className="text-lg text-gray-400">
                      By using state of the art machine learning language
                      models, you get human-like suggestions based on topics you
                      would like to create content for. Refine your ideas,
                      finalizing content drafts and put tweets in a tone that
                      fits you and your audience&apos;s mood. Once you are used
                      to it, you will create high quality content in only a few
                      minutes.
                    </p>
                  </div>
                </article>
              </Transition>

              {/* Item 2 */}
              <Transition
                show={tab === 2}
                appear={true}
                className="w-full"
                enter="transition ease-in-out duration-500 transform order-first"
                enterStart="opacity-0 scale-98"
                enterEnd="opacity-100 scale-100"
                leave="transition ease-out duration-300 transform absolute"
                leaveStart="opacity-100 scale-100"
                leaveEnd="opacity-0 scale-98"
              >
                <article className="relative max-w-md mx-auto md:max-w-none">
                  <figure className="md:absolute md:inset-y-0 md:left-0 md:w-1/2">
                    <Image
                      className="w-full h-full object-cover"
                      src={
                        config.publicAssetBucketBasePath +
                        "/images/hero-image-01.jpg"
                      }
                      width="516"
                      height="387"
                      alt="Tabs 02"
                    />
                  </figure>
                  <div className="relative bg-gray-800 py-8 md:py-16 px-6 md:pl-16 md:max-w-lg lg:max-w-xl md:ml-auto">
                    <h4 className="h4 mb-2">Create optimal sized content</h4>
                    <p className="text-lg text-gray-400">
                      Writing content in an understandable way for your audience
                      takes time. From a few sentences to multi-post content,
                      our AI based models help you to summarize or extend the
                      content based on your needs. With that, we adjust your
                      content to an ideal size for different target platforms to
                      maximize your reach.
                    </p>
                  </div>
                </article>
              </Transition>

              {/* Item 3 */}
              <Transition
                show={tab === 3}
                appear={true}
                className="w-full"
                enter="transition ease-in-out duration-500 transform order-first"
                enterStart="opacity-0 scale-98"
                enterEnd="opacity-100 scale-100"
                leave="transition ease-out duration-300 transform absolute"
                leaveStart="opacity-100 scale-100"
                leaveEnd="opacity-0 scale-98"
              >
                <article className="relative max-w-md mx-auto md:max-w-none">
                  <figure className="md:absolute md:inset-y-0 md:right-0 md:w-1/2">
                    <Image
                      className="w-full h-full object-cover"
                      src={
                        config.publicAssetBucketBasePath +
                        "/images/tabs-image-01.jpg"
                      }
                      width="516"
                      height="387"
                      alt="Tabs 01"
                    />
                  </figure>
                  <div className="relative bg-gray-800 py-8 md:py-16 px-6 md:pr-16 md:max-w-lg lg:max-w-xl">
                    <h4 className="h4 mb-2">Summarize any content</h4>
                    <p className="text-lg text-gray-400">
                      We analyse provided content and squeeze it to a length of
                      your desire in seconds. It allows you to share the gist of
                      content you like in no time, enrich it with you personal
                      take to engage with your audience about topics you care.
                    </p>
                  </div>
                </article>
              </Transition>

              {/* Item 4 */}
              <Transition
                show={tab === 4}
                appear={true}
                className="w-full"
                enter="transition ease-in-out duration-500 transform order-first"
                enterStart="opacity-0 scale-98"
                enterEnd="opacity-100 scale-100"
                leave="transition ease-out duration-300 transform absolute"
                leaveStart="opacity-100 scale-100"
                leaveEnd="opacity-0 scale-98"
              >
                <article className="relative max-w-md mx-auto md:max-w-none">
                  <figure className="md:absolute md:inset-y-0 md:left-0 md:w-1/2">
                    <Image
                      className="w-full h-full object-cover"
                      src={
                        config.publicAssetBucketBasePath +
                        "/images/hero-image-01.jpg"
                      }
                      width="516"
                      height="387"
                      alt="Tabs 02"
                    />
                  </figure>
                  <div className="relative bg-gray-800 py-8 md:py-16 px-6 md:pl-16 md:max-w-lg lg:max-w-xl md:ml-auto">
                    <h4 className="h4 mb-2">
                      We analyse your audience activity
                    </h4>
                    <p className="text-lg text-gray-400">
                      Every audience is different and changes over time. Our
                      AI-powered data-platform suggests the most efficient time
                      to publish content, which maximizes reach and engagement
                      for the content you create.
                    </p>
                  </div>
                </article>
              </Transition>

              {/* Item 5 */}
              <Transition
                show={tab === 5}
                appear={true}
                className="w-full"
                enter="transition ease-in-out duration-500 transform order-first"
                enterStart="opacity-0 scale-98"
                enterEnd="opacity-100 scale-100"
                leave="transition ease-out duration-300 transform absolute"
                leaveStart="opacity-100 scale-100"
                leaveEnd="opacity-0 scale-98"
              >
                <article className="relative max-w-md mx-auto md:max-w-none">
                  <figure className="md:absolute md:inset-y-0 md:right-0 md:w-1/2">
                    <Image
                      className="w-full h-full object-cover"
                      src={
                        config.publicAssetBucketBasePath +
                        "/images/tabs-image-01.jpg"
                      }
                      width="516"
                      height="387"
                      alt="Tabs 01"
                    />
                  </figure>
                  <div className="relative bg-gray-800 py-8 md:py-16 px-6 md:pr-16 md:max-w-lg lg:max-w-xl">
                    <h4 className="h4 mb-2">Experiment, Learn, Repeat</h4>
                    <p className="text-lg text-gray-400">
                      There is no formula that solves everything. We use
                      advanced algorithms to experiment. Based on significant
                      data, we continously adapt and evolve our system and
                      leverage techniques we proof day over day. All our users
                      collectively allow us to experiment with only a tiny
                      impact for, but a huge benefit for every user.
                    </p>
                  </div>
                </article>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tabs;
