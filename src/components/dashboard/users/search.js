import styles from '@/components/dashboard/Dashboard.module.css'
import { useState } from "react";
import { Eye, Lock, ShieldSecurity, Unlock, UserOctagon } from 'iconsax-react';
import { db } from '@/firebase/fire_config';
import { where, getDocs, collection, limit, query, orderBy } from 'firebase/firestore';
import { toast } from "react-toastify";
import ViewSearchUser from '@/components/dashboard/users/view_search';

export default function UserSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const onSearch = async (e) => {
        setSearchTerm(e.target.value)

        if (searchTerm.length > 0) {
            const q = query(
                collection(db, "users"),
                where("firstName_query", ">=", searchTerm.toLowerCase()),
                where("firstName_query", "<=", searchTerm.toLowerCase() + "\uf8ff"),
                orderBy("firstName_query"),
                limit(10)
            );

            const querySnapshot = await getDocs(q);
            const results = [];

            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });

            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const onUserAccessibility = async () => {
        toast.info("You can't change user accessibility via search");
    };

    const onUserVisibility = async () => {
        toast.info("You can't change user visibility via search");
    };

    return (
        <>
            <div className={`${styles.search_form} me-auto mb-2 mb-md-0`}>
                <input
                    className={`form-control ${styles.input_search}`}
                    type="search"
                    placeholder="Search User By First Name"
                    aria-label="Search User By First Name"
                    value={searchTerm}
                    onChange={onSearch}
                />
            </div>

            {searchResults.length > 0 && searchTerm.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Gender</th>
                                <th scope="col">View</th>
                                <th scope="col">Accessibility</th>
                                <th scope="col">Visibility</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.length > 0 && searchResults.map((result) => (
                                <tr key={result.id}>
                                    <th scope="row">
                                        <UserOctagon variant="Bold" className="secondary" size={50} />
                                    </th>
                                    <td className="d-table-cell align-middle">{result.firstName}</td>
                                    <td className="d-table-cell align-middle">{result.email}</td>
                                    <td className="d-table-cell align-middle">{result.gender.toUpperCase()}</td>
                                    <td className="d-table-cell align-middle">
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#viewSearchUser" onClick={() => { setSelectedUser(result) }} className="btn btn-sm border_none btn-warning">
                                            View <Eye />
                                        </button>
                                    </td>
                                    <td className="d-table-cell align-middle">
                                        <button
                                            onClick={() => { onUserAccessibility() }}
                                            className="text-decoration-none btn btn-sm border_none btn-dark"
                                        >
                                            Change <ShieldSecurity />
                                        </button>
                                    </td>
                                    <td className="d-table-cell align-middle">
                                        <button
                                            onClick={() => { onUserVisibility() }}
                                            className="text-decoration-none btn btn-sm border_none btn-dark"
                                        >
                                            Change <Lock />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            <ViewSearchUser user={selectedUser} />
        </>
    )
}
