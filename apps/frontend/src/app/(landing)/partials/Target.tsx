import React from "react";

import Image from "next/image";
import config from "@/configuration";

function Target() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2" data-aos="fade-up">
              From the big picture to every tiny detail, we got you covered.
            </h2>
          </div>

          {/* Items */}
          <div className="grid gap-20" data-aos-id-target="">
            {/* Item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:rtl"
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-anchor="[data-aos-id-target]"
              >
                <Image
                  className="mx-auto md:max-w-none"
                  src={
                    config.publicAssetBucketBasePath +
                    "/images/features-02-image.png"
                  }
                  width="540"
                  height="520"
                  alt="Features 02"
                />
              </div>

              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div
                    className="font-architects-daughter text-xl text-purple-600 mb-2"
                    data-aos="fade-left"
                    data-aos-anchor="[data-aos-id-target]"
                  >
                    Be the change you want to see
                  </div>
                  <div
                    className="mt-6"
                    data-aos="fade-left"
                    data-aos-delay="200"
                    data-aos-anchor="[data-aos-id-target]"
                  >
                    <h4 className="h4 mb-2">
                      <span className="text-purple-600">.</span> For individuals
                    </h4>
                    <p className="text-lg text-gray-400">
                      Selysia is created from individuals for individuals. The
                      product is build based on your feedback. We value and
                      answer every message from you, because you shape the
                      product. We measure our success on your satisfaction.
                    </p>
                  </div>
                  <div
                    className="mt-6"
                    data-aos="fade-left"
                    data-aos-delay="400"
                    data-aos-anchor="[data-aos-id-target]"
                  >
                    <h4 className="h4 mb-2">
                      <span className="text-teal-500">.</span> For small teams
                    </h4>
                    <p className="text-lg text-gray-400">
                      Innovation is key driver for us to increase efficiency and
                      make data-driven decisions. We are convinced that small
                      teams increase throughput and satisfaction by using a user
                      experience focused and innovative product.
                    </p>
                  </div>
                  <div
                    className="mt-6"
                    data-aos="fade-left"
                    data-aos-delay="600"
                    data-aos-anchor="[data-aos-id-target]"
                  >
                    <h4 className="h4 mb-2">
                      <span className="text-pink-500">.</span> For enterprises
                    </h4>
                    <p className="text-lg text-gray-400">
                      We are honest here, Selysia is there yet. We focus on
                      keeping the product simple, which is a good foundation to
                      build big scale features on top of it. We are open for
                      ideas and feedback to enable you to partner with us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Target;
