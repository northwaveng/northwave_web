import { db } from '@/firebase/fire_config';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, limit, getDocs } from 'firebase/firestore';
import { Folder } from 'iconsax-react';

export default function Newsletter() {
    const [newsletters, setNewsletters] = useState([]);

    // listening to newsletters
    useEffect(() => {
        const q = query(collection(db, "newsletterSubscribers"), limit(10));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setNewsletters(data);
        });

        return () => { unsubscribe(); };
    }, []);

    async function exportAsCSV() {
        const newsletterCol = collection(db, 'newsletterSubscribers');
        const snapshot = await getDocs(newsletterCol);

        const csv = snapshot.docs.map(doc => Object.values(doc.data()).join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'newsletter.csv');
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="dashboard_content">
            <div className="container mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div className="row justify-content-between">
                                <div className="col-sm-6 text-start">
                                    <h4>Newsletters</h4>
                                    <small className="text-muted">view and export newsletter</small>
                                </div>

                                <div className="col-sm-6 text-end">
                                    <button type="button" className="btn btn-info" onClick={() => { exportAsCSV() }}>
                                        Export CSV
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-5">
                    <div className="col-md-8">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div>
                                All Newsletters
                                <hr />
                            </div>

                            {newsletters &&
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newsletters.length > 0 && newsletters.map((letter) => (
                                                <tr key={letter.id}>
                                                    <th scope="row">
                                                        <Folder variant="Bold" className="secondary" size={50} />
                                                    </th>
                                                    <td className="d-table-cell align-middle">{letter.email}</td>
                                                    <td className="d-table-cell align-middle">{letter.subscribed ? "Subscribed" : "Unsubscribed"}</td>
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
        </div>
    )
}