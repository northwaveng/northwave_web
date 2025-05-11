import styles from '@/components/dashboard/Dashboard.module.css'
import { Trash, User, UserOctagon } from 'iconsax-react';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { db } from "@/firebase/fire_config";
import { query, collection, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import capitalize from '@/components/utils/capitalize'

export default function AddMember({ user }) {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedList, setSelectedList] = useState([]);

    // listening to users
    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("joinedOn", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });

            setUsers(data);
        });

        return () => { unsubscribe(); };
    }, []);

    const onSelected = (email) => {
        if (selectedList.includes(email)) {
            setSelectedList(selectedList.filter((selectedEmail) => selectedEmail !== email));
        } else {
            setSelectedList([...selectedList, email]);
        }
    };

    const onAddMembers = async () => {
        setLoading(true);
        toast.info("Adding members.");

        // group
        const groupDoc = doc(db, "groups", user.group.id);
        const groupData = { "members": [...selectedList, user.email] };

        await updateDoc(groupDoc, groupData).then(async () => {
            // user
            const userDoc = doc(db, "users", user.email);
            const userData = { "group.admin.hasGroup": true, "group.admin.hasMembers": true };

            await updateDoc(userDoc, userData).then(() => {
                toast.info("Updating members group...");

                [...selectedList, user.email].forEach(async (member, index) => {
                    // member 
                    const memberDoc = doc(db, "users", member);
                    const memberData = { "group.id": user.group.id, "group.position": index + 1 };

                    await updateDoc(memberDoc, memberData).then(() => {
                        setLoading(false);
                        toast.success("Members added.");
                    }).catch((error) => {
                        setLoading(false);
                        toast.error(`Something is wrong: ${error.message}`);
                    });
                });
            }).catch((error) => {
                setLoading(false);
                toast.error(`Something is wrong: ${error.message}`);
            });
        }).catch((error) => {
            setLoading(false);
            toast.error(`Something is wrong: ${error.message}`);
        });


    };

    return (
        <div className="dashboard_content">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <img
                            src="/logos/logo_text_trans.png"
                            alt="logo"
                            className="rounded"
                            width={100}
                        />
                    </div>

                    <div className="col-sm-5 mt-3">
                        <div className={`m-2 py-4 px-3 secondary border_none card shadow text-center ${styles.add_member_card}`}>
                            <h6 className="mb-3 pb-0"><User size={32} className="mx-2" /> Add Members</h6>

                            <small className="mb-3 primary">
                                You will be automatically added to members list. Make sure members have completed verification to appear here.
                            </small>

                            {users && users.length > 0 ? users.map((user) => (
                                !user.group.id > 0 && user.kyc != null &&
                                <button
                                    onClick={() => onSelected(user.email)}
                                    className={`d-flex flex-row alert ${selectedList.includes(user.email) && "alert-primary"} p-1 my-1`}
                                    key={user.id}
                                >
                                    <UserOctagon variant="Bold" color="#346BC8" size={50} />
                                    <div className="text-start">
                                        {capitalize(user.firstName)}
                                        <br />
                                        <small className="text-muted">{user.email}</small>
                                    </div>
                                </button>
                            )) :
                                <div className="mt-5 text-muted">
                                    <Trash size={100} />
                                    <p>No user available to be added to your group.</p>
                                </div>
                            }

                        </div>
                    </div>

                    {selectedList.length > 0 &&
                        <div className="col-12 mb-5 text-center">
                            <button onClick={() => onAddMembers()}
                                className="btn btn-lg btn-success cus_btn col-sm-4 mt-4"
                            >
                                {loading ? <Loader /> : "Add Members"}
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}