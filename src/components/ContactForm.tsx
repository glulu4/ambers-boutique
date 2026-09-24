// "use client"
// import React, {useState} from 'react';

// const ContactForm = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         message: '',  // Add this line
//     });

//     const handleChange = (e: any) => {
//         const {name, value, type, checked} = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         try {
//             const response = await fetch('/api/contact', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({formData}),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.error || 'Something went wrong');
//             }

//             alert('Message sent successfully!');
//             setFormData({name: '', email: '', message: ''}); // Reset form
//         } catch (error) {
//             alert(error instanceof Error ? error.message : 'Failed to send message');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//     return (
//         <div className='mx-20'>
//             <h2 className="text-5xl font-bold text-left mb-12 font-heading">Contact Us</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="flex gap-4">
//                     <div className="flex-1">
//                         <label className="block font-body font-medium text-lg text-gray-700 mb-1">
//                             Full name *
//                         </label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                             className="w-full border-b border-gray-400 bg-inherit focus:outline-none focus:border-black"
//                         />
//                     </div>
//                     <div className="flex-1">
//                         <label className="block font-body text-lg font-medium text-gray-700 mb-1">
//                             Email *
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full border-b border-gray-400 bg-inherit focus:outline-none focus:border-black"
//                         />
//                     </div>
//                 </div>
//                 <div>
//                     <label className="block font-body text-lg font-medium text-gray-700 mb-1">
//                         Message *
//                     </label>
//                     <input
//                         type="message"
//                         name="message"
//                         value={formData.message}
//                         onChange={handleChange}
//                         required
//                         className="w-full border-b border-gray-400 focus:outline-none bg-inherit focus:border-black"
//                     />
//                 </div>



//                 <div className="flex justify-center font-body pt-10">
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="px-6 py-2 bg-primaryRed text-white font-semibold rounded hover:bg-primaryRedHover disabled:opacity-50"
//                     >
//                         {isSubmitting ? 'Sending...' : 'Submit'}
//                     </button>
//                 </div>
//             </form>
//             <div className="flex justify-center mt-8 space-x-4 text-gray-500">
//                 <a href="#" className="hover:text-gray-700">
//                     <i className="fab fa-facebook-f"></i>
//                 </a>
//                 <a href="#" className="hover:text-gray-700">
//                     <i className="fab fa-twitter"></i>
//                 </a>
//                 <a href="#" className="hover:text-gray-700">
//                     <i className="fab fa-linkedin-in"></i>
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default ContactForm;


"use client";
import React, {useState} from "react";
import Image from "next/image";
import {INSTAGRAM_HANDLE, INSTAGRAM_URL} from "@/config";

type FormData = {name: string; email: string; message: string};
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY_FORM: FormData = {name: "", email: "", message: ""};

interface FieldProps {
    name: keyof FormData;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    multiline?: boolean;
}

// Underlined field whose label floats up on focus/input, with a red line that slides in
const Field = ({name, label, value, onChange, type = "text", multiline}: FieldProps) => {
    const inputClass = "peer block w-full resize-none border-0 border-b border-neutral-300 bg-transparent px-0 pb-2 pt-6 font-body text-base text-neutral-900 placeholder-transparent focus:border-neutral-300 focus:outline-none focus:ring-0";
    return (
        <div className="relative">
            {multiline ? (
                <textarea id={name} name={name} value={value} onChange={onChange} required rows={5} placeholder=" " className={inputClass} />
            ) : (
                <input id={name} name={name} type={type} value={value} onChange={onChange} required placeholder=" " className={inputClass} />
            )}
            <label
                htmlFor={name}
                className="pointer-events-none absolute left-0 top-0 font-body text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition-all duration-200 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-primaryRed"
            >
                {label}
            </label>
            <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primaryRed transition-transform duration-300 ease-out peer-focus:scale-x-100" />
        </div>
    );
};

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({formData}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setFormData(EMPTY_FORM);
            setStatus("sent");
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
            setStatus("error");
        }
    };

    return (
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-20">
            {/* Editorial image */}
            <div className="relative h-64 overflow-hidden rounded-sm animate-fade-in sm:h-80 lg:h-auto lg:min-h-[640px]">
                <Image
                    src="/images/img2.jpg"
                    alt="Woman wearing a vintage button heart earring"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-[center_35%]"
                />
            </div>

            {/* Copy + form */}
            <div className="flex flex-col justify-center lg:py-8">
                <p className="font-accent text-2xl text-primaryRed animate-fade-in-up">Get in touch</p>
                <h1 className="mt-1 font-heading text-5xl font-semibold leading-tight text-neutral-900 animate-fade-in-up sm:text-6xl" style={{animationDelay: "80ms"}}>
                    Contact Us
                </h1>
                <p className="mt-5 max-w-md font-body text-base leading-relaxed text-neutral-600 animate-fade-in-up" style={{animationDelay: "160ms"}}>
                    Have a question about a piece, your order, or our vintage jewelry? Send us a note and we&apos;ll get back to you.
                </p>

                {status === "sent" ? (
                    <div className="mt-12 border-l border-primaryRed pl-6 animate-fade-in-up" role="status">
                        <p className="font-heading text-3xl text-neutral-900">Thank you.</p>
                        <p className="mt-3 font-body text-neutral-600">Your message is on its way. We&apos;ll be in touch soon.</p>
                        <button
                            type="button"
                            onClick={() => setStatus("idle")}
                            className="mt-6 font-body text-xs uppercase tracking-[0.25em] text-primaryRed transition-colors hover:text-primaryRedHover"
                        >
                            Send another message →
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-10 space-y-8 animate-fade-in-up" style={{animationDelay: "240ms"}}>
                        <div className="grid gap-8 sm:grid-cols-2">
                            <Field name="name" label="Full name" value={formData.name} onChange={handleChange} />
                            <Field name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <Field name="message" label="Message" value={formData.message} onChange={handleChange} multiline />

                        {status === "error" && (
                            <p className="font-body text-sm text-primaryRed" role="alert">{errorMessage}</p>
                        )}

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="group inline-flex w-full items-center justify-center gap-3 bg-neutral-900 px-10 py-4 font-body text-xs font-medium uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-primaryRed disabled:opacity-60 sm:w-auto"
                        >
                            {status === "sending" ? "Sending…" : "Send message"}
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                    </form>
                )}

                <div className="mt-14">
                    <div className="h-px w-12 bg-primaryRed" />
                    <p className="mt-5 font-body text-sm text-neutral-500">
                        Or find us on Instagram{" "}
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-primaryRed hover:decoration-primaryRed"
                        >
                            {INSTAGRAM_HANDLE}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
