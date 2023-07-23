import Link from "next/link";
import { useState } from 'react';
import { Call, DirectSend, Location } from "iconsax-react";
import Loader from '@/components/loader/loader';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from "@/firebase/fire_config";
import { toast } from "react-toastify";

export default function Contact() {
    const [sending, setSending] = useState(false);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [message, setMessage] = useState("");

    const onSendMessage = async event => {
        event.preventDefault();
        setSending(true);

        const collRef = collection(db, "contactUs");
        const contactDoc = {
            fullName: fullName,
            email: email,
            message: message,
        };

        setDoc(doc(collRef, email), contactDoc)
            .then(() => {
                setSending(false);
                toast.success("Message sent.");
            })
            .catch((error) => {
                setSending(false);
                toast.error(`Error while sending message: ${error.message}`);
            });
    }

    return (
        <>
            <div className="container my-5">
                <div className="row mb-5">
                    <h3 className="text-center primary">Contact Us</h3>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <form className="card py-4 px-3 m-2 shadow" onSubmit={onSendMessage}>
                            <h5 className="pb-3 border-bottom">Send a message</h5>

                            <div className="d-flex mt-4">
                                <div className="col-sm-6">
                                    <div className="form-floating mx-2">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            id="fullName"
                                            placeholder="Jon Doe"
                                            onChange={(event) => setFullName(event.target.value)}
                                        />
                                        <label htmlFor="fullName">Full Name</label>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-floating mx-3">
                                        <input
                                            type="email"
                                            required
                                            className="form-control"
                                            id="emailAddr"
                                            placeholder="name@example.com"
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                        <label htmlFor="emailAddr">Email address</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        required
                                        placeholder="Message"
                                        id="message"
                                        style={{ height: "150px" }}
                                        onChange={(event) => setMessage(event.target.value)}
                                    ></textarea>
                                    <label htmlFor="message">Message</label>
                                </div>
                            </div>

                            {sending
                                ? <Loader />
                                : <button type="submit" className="btn btn-lg btn-success border_none bg_primary mt-3">Submit</button>
                            }
                        </form>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-6">
                                <Link className="text-decoration-none secondary card m-3 p-2 bg_primary_50"
                                    href="tel:+2347033180897"
                                    as="tel:+2347033180897"
                                    target="_blank"
                                >
                                    <Call className="mx-1" size="32" variant="Bold" />
                                    <div className="d-flex flex-column mx-1">
                                        call us
                                        <br />
                                        +234-703-318-0897
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-6">
                                <Link className="text-decoration-none secondary card card m-3 p-2 bg_primary_50"
                                    href="mailto:northwave.ng@gmail.com"
                                    as="mailto:northwave.ng@gmail.com"
                                    target="_blank"
                                >
                                    <DirectSend className="mx-1" size="32" variant="Bold" />
                                    <div className="d-flex flex-column mx-1">
                                        email use
                                        <br />
                                        northwave.ng@gmail.com
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-6">
                                <div className="secondary card card m-3 p-2 bg_primary_50">
                                    <Location className="mx-1" size="32" variant="Bold" />
                                    <div className="d-flex flex-column mx-1">
                                        visit us
                                        <br />
                                        Barracks road Jimeta Yola
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <Link className="text-decoration-none secondary card card m-3 p-2 bg_primary_50"
                                    href="https://www.linkedin.com/company/smartrrproject/"
                                    as="https://www.linkedin.com/company/smartrrproject/"
                                    target="_blank"
                                >
                                    <DirectSend className="mx-1" size="32" variant="Bold" />
                                    <div className="d-flex flex-column mx-1">
                                        follow us
                                        <br />
                                        linkedin
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-100 mt-5">
                <div className="col-12">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3938.455465530535!2d12.386678014872695!3d9.203492393399955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMTInMTIuNiJOIDEywrAyMycxOS45IkU!5e0!3m2!1sen!2sus!4v1677565896302!5m2!1sen!2sus" width="100%" height="400" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </>
    )
}
