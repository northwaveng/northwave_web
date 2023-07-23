import { People } from 'iconsax-react';
import { useState } from 'react';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { db } from "@/firebase/fire_config";
import { doc, setDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import AddMember from '@/components/dashboard/add_member';

export default function Dashboard({ user }) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [contribution, setContribution] = useState("");
    const [target, setTarget] = useState("");
    const [mandate, setMandate] = useState("Weekly");

    const onCreateGroup = async event => {
        event.preventDefault();
        setLoading(true);
        toast.info("Creating group...");

        const id = v4();

        const collRef = collection(db, "groups");
        const groupDoc = {
            id: id,
            name: name.toLowerCase(),
            contribution: contribution,
            target: target,
            mandate: mandate.toLowerCase(),
            paystack: "",
            active: false,
            admin: user.email,
            members: [],
            createdOn: serverTimestamp(),
        };

        setDoc(doc(collRef, id), groupDoc)
            .then(async () => {
                setLoading(false);
                toast.info("Updating status...");

                // user doc
                const userDoc = doc(db, "users", user.email);

                // Data to update
                const userData = { "group": id, "hasGroup": true };

                await updateDoc(userDoc, userData).then(() => {
                    toast.success("Group created.");
                }).catch((error) => {
                    toast.error(`Something is wrong: ${error.message}`);
                });
            })
            .catch((error) => {
                setLoading(false);
                toast.error(`Error while creating group.: ${error.message}`);
            });
    };

    if (user.hasGroup) return <AddMember user={user}/>;

    return (
        <div className="dashboard_content">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <img
                            src="/logo/logo_text_trans.png"
                            alt="logo"
                            className="rounded"
                            width={100}
                        />
                    </div>

                    <div className="col-sm-5 mt-3 mb-5 text-center">
                        <div className="m-2 py-4 px-3 secondary border_none card shadow">
                            <h5><People size={32} className="mx-2" /> Create Group</h5>

                            <form className="col-12" onSubmit={onCreateGroup}>
                                <div className="form-floating my-3">
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        id="name"
                                        placeholder="Group Name"
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label htmlFor="name">Group Name</label>
                                </div>

                                <div className="text-muted text-start">
                                    <small>
                                        This is the amount each group member need to contribution every mandate.
                                    </small>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        id="contribution"
                                        placeholder="Contribution"
                                        pattern="[0-9]+"
                                        title="Must be a number."
                                        onChange={(event) => setContribution(event.target.value)}
                                    />
                                    <label htmlFor="contribution">Contribution</label>
                                </div>

                                <div className="text-muted text-start">
                                    <small>
                                        This is the targeted amount you and your group will like to archive before collection.
                                    </small>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        id="target"
                                        placeholder="Target"
                                        pattern="[0-9]+"
                                        title="Must be a number."
                                        onChange={(event) => setTarget(event.target.value)}
                                    />
                                    <label htmlFor="target">Target</label>
                                </div>

                                <div className="text-muted text-start">
                                    <small>
                                        This is how you choose to make collection <b>weekly</b>, <b>monthly</b> or <b>quarterly</b>.
                                    </small>
                                </div>
                                <div className="form-floating">
                                    <select
                                        className="form-select"
                                        required
                                        id="mandate"
                                        onChange={(event) => setMandate(event.target.value)}
                                    >
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                    </select>
                                    <label htmlFor="mandate">Mandate</label>
                                </div>

                                <button type="submit" className="btn btn-lg btn-success cus_btn col-md-8 mt-4">
                                    {loading ? <Loader /> : "Create Group"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}