"use client";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

export interface ContactFormData {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const onSubmit = async (data: ContactFormData) => {
    setError(false);
    setSent(false);

    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (result.ok) {
        setSent(true);
        setValue("message", "");
        setValue("firstName", "");
        setValue("lastName", "");
        setValue("subject", "");
        setValue("email", "");
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4" data-aos="fade-up">
              How can we help you?
            </h1>
            <p
              className="text-xl text-gray-400"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              We have custom plans to power your business. Tell us your needs,
              and we’ll contact you shortly.
            </p>
          </div>

          {/* Contact form */}
          <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="first-name"
                >
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="first-name"
                  type="text"
                  className={
                    "form-input w-full text-gray-300 bg-transparent" +
                    (errors.firstName
                      ? " border-red-500 focus:border-red-500"
                      : "")
                  }
                  placeholder="Enter your first name"
                  required
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "This value is required",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm mt-2">{message}</p>
                  )}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="last-name"
                >
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="last-name"
                  type="text"
                  className={
                    "form-input w-full text-gray-300 bg-transparent" +
                    (errors.lastName
                      ? " border-red-500 focus:border-red-500"
                      : "")
                  }
                  placeholder="Enter your last name"
                  required
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "This value is required",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="lastName"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm mt-2">{message}</p>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={
                    "form-input w-full text-gray-300 bg-transparent" +
                    (errors.email ? " border-red-500 focus:border-red-500" : "")
                  }
                  placeholder="Enter your email address"
                  required
                  {...register("email", {
                    required: {
                      value: true,
                      message: "This value is required",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm mt-2">{message}</p>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="subject"
                >
                  Subject <span className="text-red-600">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  className={
                    "form-input w-full text-gray-300 bg-transparent" +
                    (errors.subject
                      ? " border-red-500 focus:border-red-500"
                      : "")
                  }
                  placeholder="How can we help you?"
                  required
                  {...register("subject", {
                    required: {
                      value: true,
                      message: "This value is required",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="subject"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm mt-2">{message}</p>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={
                    "form-textarea w-full text-gray-300 bg-transparent" +
                    (errors.message
                      ? " border-red-500 focus:border-red-500"
                      : "")
                  }
                  placeholder="Write your message"
                  {...register("message", {
                    required: {
                      value: true,
                      message: "This value is required",
                    },
                  })}
                ></textarea>
                <ErrorMessage
                  errors={errors}
                  name="message"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm mt-2">{message}</p>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full px-3">
                <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                  Send
                </button>
              </div>
            </div>
            {sent && (
              <>
                <p className="flex flex-wrap -mx-3 mt-6 px-3">
                  Thank you for your message! We will respond within 48 hours to
                  your request.
                </p>
              </>
            )}

            {error && (
              <>
                <p className="flex flex-wrap -mx-3 mt-6 px-3">
                  Something went wrong. Check your data provided and try again.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
