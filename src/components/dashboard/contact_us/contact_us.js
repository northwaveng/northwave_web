import { db } from '@/firebase/fire_config';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, limit } from 'firebase/firestore';
import { DirectInbox, DirectSend, Eye } from 'iconsax-react';
import Link from 'next/link';
import ViewContactMessage from '@/components/dashboard/contact_us/view';

export default function ContactUs() {
    const [contactUs, setContactUs] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    // listening to contact us
    useEffect(() => {
        const q = query(collection(db, "contactUs"), limit(10));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setContactUs(data);
        });

        return () => { unsubscribe(); };
    }, []);

    return (
        <div className="dashboard_content">
            <div className="container mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div className="row justify-content-between">
                                <div className="col-sm-6 text-start">
                                    <h4>Contact Us</h4>
                                    <small className="text-muted">view and reply messages</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-5">
                    <div className="col-md-10">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div>
                                All Messages
                                <hr />
                            </div>

                            {contactUs &&
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">View</th>
                                                <th scope="col">Reply</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contactUs.length > 0 && contactUs.map((contact) => (
                                                <tr key={contact.id}>
                                                    <th scope="row">
                                                        <DirectInbox variant="Bold" className="secondary" size={50} />
                                                    </th>
                                                    <td className="d-table-cell align-middle">{contact.fullName}</td>
                                                    <td className="d-table-cell align-middle">{contact.email}</td>
                                                    <td className="d-table-cell align-middle">
                                                        <button type="button" data-bs-toggle="modal" data-bs-target="#viewContactMessage" onClick={() => { setSelectedMessage(contact.message) }} className="btn btn-sm border_none btn-warning">
                                                            View <Eye />
                                                        </button>
                                                    </td>
                                                    <td className="d-table-cell align-middle">
                                                        <Link href={`mailto:${contact.email}`} target="_blank" className="text-decoration-none btn btn-sm border_none btn-info">
                                                            Reply <DirectSend />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <ViewContactMessage message={selectedMessage} />
        </div>
    )
}