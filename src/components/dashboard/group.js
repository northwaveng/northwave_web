import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { db } from "@/firebase/fire_config";
import { query, collection, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import capitalize from '@/components/utils/capitalize'
import toCurrency from '@/components/utils/toCurrency';
import Navbar from '@/components/navigation/navbar/navbar';
import { Call, DirectInbox, UserOctagon } from 'iconsax-react';
import Link from 'next/link';

export default function Group({ user }) {
    const [loadingStartContri, setLoadingStartContri] = useState(false);
    const [loadingEndContri, setLoadingEndContri] = useState(false);
    const [group, setGroup] = useState(null);
    const [members, setMembers] = useState([]);

    // listening to group
    useEffect(() => {
        const groupRef = doc(db, "groups", user.group);
        const unsubscribe = onSnapshot(groupRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                setGroup(data);
            } else {
                toast.error("Group not found.");
            }
        });

        return () => { unsubscribe(); };
    }, []);

    // listening to members
    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("groupCollectionPosition"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                if (doc.data().group === user.group) return { id: doc.id, ...doc.data() };
                return {};
            });

            setMembers(data);
        });

        return () => { unsubscribe(); };
    }, []);

    const onUpdateGroup = event => {
        event.preventDefault();

        toast.info("Currently, change of group information is not available.");
    };

    const onStartContribution = () => {
        setLoadingStartContri(true);
        toast.info("Starting contribution...");
        setLoadingStartContri(false);
    };

    const onEndContribution = () => {
        setLoadingEndContri(true);
        toast.info("Contribution can end only if all members have made collection of same amount.");
        setLoadingEndContri(false);
    };

    const onPaymentMade = async (memberEmail) => {
        const memberDoc = doc(db, "users", memberEmail);
        const memberData = { "hasPaymentMade": true };

        await updateDoc(memberDoc, memberData).then(() => {
            toast.success("Updated.");
        }).catch((error) => {
            setLoading(false);
            toast.error(`Something is wrong: ${error.message}`);
        });
    }

    if (group === null) {
        return <Loader fullHeight={true} />
    }

    return (
        <div className="dashboard_content">
            <div className="container-fluid">
                <Navbar />
                <div style={{ marginTop: "6rem" }} />

                {!group.active
                    ?
                    <div className="alert alert-primary">
                        <div className="row">
                            <div className="col-sm-8">
                                Click on the <b>"Start Contribution"</b> button to start contribution. Note that after starting contribution you need
                                to info all the members of your group to make their first payment each by <b>online payment</b> or <b>cash</b>.
                                In event of cash payment, you need to collect the cash physically and click <b>Payment Made</b> on the members card below.
                            </div>

                            <div className="col-sm-4 text-end">
                                <button onClick={onStartContribution} className="btn btn-success cus_btn m-2 mb-0">
                                    {loadingStartContri ? <Loader /> : "Start Contribution"}
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="alert alert-danger">
                        <div className="row">
                            <div className="col-sm-8">
                                Click on the <b>"End Contribution"</b> button to end contribution. Note that by ending contribution all members will be
                                free to join other groups and this group will be deleted.
                            </div>

                            <div className="col-sm-4 text-end">
                                <button onClick={onEndContribution} className="btn btn-lg btn-danger m-2 mb-0">
                                    {loadingEndContri ? <Loader /> : "End Contribution"}
                                </button>
                            </div>
                        </div>
                    </div>
                }


                <div className="row my-5">
                    <div className="col-sm-6">
                        <div className="m-2">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="alert alert-primary shadow">
                                        <h4>Total Contribution</h4>
                                        <h6>{toCurrency("0")}</h6>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="alert alert-secondary shadow">
                                        <h4>Target</h4>
                                        <h6>{toCurrency(group.target)}</h6>
                                    </div>
                                </div>

                                <div className="col-12 mt-3">
                                    <h5>{capitalize(group.name ? group.name : "")}'s update</h5>

                                    <form className="col-12" onSubmit={onUpdateGroup}>
                                        <div className="d-flex my-3">
                                            <div className="col-6">
                                                <div className="mx-2 form-floating">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        className="form-control"
                                                        id="name"
                                                        placeholder="Group Name"
                                                    />
                                                    <label htmlFor="name">Group Name</label>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="mx-2 form-floating">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        className="form-control"
                                                        id="contribution"
                                                        placeholder="Contribution"
                                                        pattern="[0-9]+"
                                                        title="Must be a number."
                                                    />
                                                    <label htmlFor="contribution">Contribution</label>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="d-flex mb-3">
                                            <div className="col-6">
                                                <div className="mx-2 form-floating">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        className="form-control"
                                                        id="target"
                                                        placeholder="Target"
                                                        pattern="[0-9]+"
                                                        title="Must be a number."
                                                    />
                                                    <label htmlFor="target">Target</label>
                                                </div>
                                            </div>


                                            <div className="col-6">
                                                <div className="mx-2 form-floating">
                                                    <select
                                                        className="form-select"
                                                        disabled
                                                        id="mandate"
                                                    >
                                                        <option value="Weekly">Weekly</option>
                                                        <option value="Monthly">Monthly</option>
                                                        <option value="Quarterly">Quarterly</option>
                                                    </select>
                                                    <label htmlFor="mandate">Mandate</label>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-lg btn-success cus_btn col-12 mt-3">
                                            Update Group
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="m-2">
                            <div className="row">
                                <div className="col-12">
                                    <h4>Members</h4>
                                </div>
                            </div>

                            <div className="row">
                                {members && members.map((member) => (
                                    <div className="col-sm-6">
                                        <div className="alert alert-primary p-2">
                                            <div className="w-100 d-flex flex-row " key={member.id}>
                                                <UserOctagon variant="Bold" color="#346BC8" size={50} />
                                                <div className="text-start">
                                                    {capitalize(member.firstName)} {capitalize(member.lastName)}
                                                    <br />
                                                    <small className="text-muted">{member.email}</small>
                                                    <div>
                                                        collection position: <span className="px-2 py-0 mx-2 white rounded bg-primary">
                                                            {member.groupCollectionPosition + 1}
                                                        </span>
                                                    </div>
                                                </div>


                                            </div>

                                            <hr />

                                            <div className="row ">
                                                <div className="col-3">
                                                    <div>
                                                        <Link className="btn btn-sm bg_primary text-white" href={`tell:${member.phoneNumber}`}>
                                                            <Call size={18} />
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="col-3">
                                                    <div>
                                                        <Link className="btn btn-sm bg_primary text-white" href={`mailto:${member.email}`}>
                                                            <DirectInbox size={18} />
                                                        </Link>
                                                    </div>
                                                </div>

                                                {!member.hasPaymentMade &&
                                                    <div className="col-6">
                                                        <div>
                                                            <button className="btn btn-sm btn-danger" onClick={() => onPaymentMade(member.email)}>
                                                                Payment Made
                                                            </button>
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}