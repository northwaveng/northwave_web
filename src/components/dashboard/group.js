import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { db } from "@/firebase/fire_config";
import { query, collection, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import toCurrency from '@/components/utils/toCurrency';
import Navbar from '@/components/navigation/navbar/navbar';
import { Bank, Call, DirectInbox, UserOctagon, Warning2 } from 'iconsax-react';
import Link from 'next/link';
import axios from 'axios';

export default function Group({ user }) {
    const [loadingStartContri, setLoadingStartContri] = useState(false);
    const [group, setGroup] = useState(null);
    const [members, setMembers] = useState([]);

    // listening to group
    useEffect(() => {
        const groupRef = doc(db, "groups", user.group.id);
        const unsubscribe = onSnapshot(groupRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                setGroup(data);
            } else {
                toast.error("Group not found.");
            }
        });

        return () => { unsubscribe(); };
    }, [user.group]);

    // listening to members
    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("group.position"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                if (doc.data().group.id === user.group.id) return { id: doc.id, ...doc.data() };
                return null;
            }).filter((item) => item !== null);

            setMembers(data);
        });

        return () => { unsubscribe(); };
    }, [user.group]);

    const onUpdateGroup = event => {
        event.preventDefault();
        toast.info("Currently, change of group information is not available.");
    };

    const onStartContribution = async () => {
        try {
            setLoadingStartContri(true);
            toast.info("Starting contribution...");

            const contribution = parseInt(group.contribution);
            const amount = (contribution + (contribution * 0.05)) * 100

            const params = JSON.stringify({ "name": group.name, "interval": group.mandate, "amount": amount });
            const url = `${process.env.NEXT_PUBLIC_PAYSTACK_HOSTNAME}plan`;
            const headers = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_TEST_SECRET_KEY}`, 'Content-Type': 'application/json' };

            const response = await axios.post(url, params, { headers });

            if (response.status === 200 || response.status === 201) {
                let data = response.data;

                // group
                const groupDoc = doc(db, "groups", user.group);
                const groupData = { "active": true, "paystack": data["data"]["plan_code"] };

                await updateDoc(groupDoc, groupData).then(async () => {
                    toast.info(data["message"]);
                }).catch((error) => {
                    toast.error(`Something is wrong: ${error.message}`);
                });
            }
        } catch (error) {
            toast.error(`Something went wrong: ${error}`);
        } finally {
            setLoadingStartContri(false);
        }
    }

    const onMakePayment = async (memberEmail) => {
        try {
            setLoadingStartContri(true);
            toast.info("redirecting...");

            const contribution = parseInt(group.contribution);
            const amount = (contribution + (contribution * 0.05)) * 100;

            const params = JSON.stringify({
                "email": memberEmail,
                "amount": amount,
                "plan": group.paystack,
                "callback_url": `${process.env.NEXT_PUBLIC_DOMAIN}api/payment_callback?email=${memberEmail}&groupId=${group.id}`
            });
            const url = `${process.env.NEXT_PUBLIC_PAYSTACK_HOSTNAME}transaction/initialize`;
            const headers = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_TEST_SECRET_KEY}`, 'Content-Type': 'application/json' };

            const response = await axios.post(url, params, { headers });

            if (response.status === 200 || response.status === 201) {
                let data = response.data;
                const authorizationUrl = data["data"]["authorization_url"];

                window.open(authorizationUrl, "_self");
            }
        } catch (error) {
            toast.error(`Something went wrong: ${error}`);
        } finally {
            setLoadingStartContri(false);
        }
    }

    if (group === null) {
        return <Loader fullHeight={true} />
    }

    return (
        <div className="dashboard_content">
            <div className="container-fluid">
                <Navbar />
                <div style={{ marginTop: "6rem" }} />

                {!group.active &&
                    <div className="alert alert-primary">
                        <div className="row">
                            <div className="col-sm-8">
                                Click on the <b>&quot;Start Contribution&quot;</b> button to start contribution. Note that after starting contribution you need
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
                                    <h5>{group.name}&apos;s update</h5>

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
                                {members && members.length > 0 && members.map((member, index) => (
                                    <div key={index} className="col-sm-6">
                                        <div className="alert alert-primary p-2">
                                            <div className="w-100 d-flex flex-row ">
                                                <UserOctagon variant="Bold" color="#346BC8" size={50} />
                                                <div className="text-start">
                                                    {member.firstName} {member.lastName}
                                                    <br />
                                                    <small className="text-muted">{member.email}</small>
                                                    <div>
                                                        collection position: <span className="px-2 py-0 mx-2 white rounded bg-primary">
                                                            {member.group.position}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="row ">
                                                <div className="col-2">
                                                    <Link className="btn btn-sm bg_primary text-white" href={`tell:${member.phoneNumber}`}>
                                                        <Call size={18} />
                                                    </Link>
                                                </div>

                                                <div className="col-2">
                                                    <Link className="btn btn-sm bg_primary text-white" href={`mailto:${member.email}`}>
                                                        <DirectInbox size={18} />
                                                    </Link>
                                                </div>

                                                {!member.group.payment.hasPaid && group.paystack.length > 0 &&
                                                    <>
                                                        <div className="col-2">
                                                            <button className="btn btn-sm btn-danger">
                                                                <Warning2 size={18} />
                                                            </button>
                                                        </div>

                                                        {member.group.payment.askAdminToPay &&
                                                            <div className="col-6">
                                                                <button className="btn btn-sm btn-warning fw-bold" onClick={() => onMakePayment(member.email)}>
                                                                    <Bank size={18} /> Pay Now
                                                                </button>
                                                            </div>
                                                        }
                                                    </>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {group.active &&
                    <div className="row justify-content-center">
                        <div className="col-6 text-center">
                            <div className="alert alert-primary">
                                Group will automatically end after a completed collection circle.
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}