import styles from '@/components/auth/Auth.module.css'
import Link from 'next/link';
import { db } from "@/firebase/fire_config";
import { useState } from 'react';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Cryptograph from '@/components/utils/cryptograph';
import { useAuth } from '@/firebase/fire_auth_context';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import randomNum from '@/components/utils/randomNum'

const storage = getStorage();

export default function Signin() {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(null);
    const [accountNumber, setAccountNumber] = useState("");
    const [workAddress, setWorkAddress] = useState("");
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [bvn, setBvn] = useState("");
    const [nin, setNin] = useState("");
    const { authUser } = useAuth();
    const router = useRouter();

    const onVerification = async event => {
        event.preventDefault();
        setLoading(true);
        toast.info("Uploading ID.");

        const idRef = ref(storage, `idCards/idCard${randomNum(6)}`);
        await uploadBytes(idRef, id);

        await getDownloadURL(idRef).then(async (idImage) => {
            toast.info("Verifying...")

            // cryptograph class
            const crypto = new Cryptograph();

            // encrypted bank data
            const encryptedAccountNumber =
                crypto.encrypt({ value: accountNumber.toLowerCase() });
            const encryptedWorkAddress =
                crypto.encrypt({ value: workAddress.toLowerCase() });
            const encryptedMonthlyIncome =
                crypto.encrypt({ value: monthlyIncome.toLowerCase() });
            const encryptedBvn = crypto.encrypt({ value: bvn });
            const encryptedNin = crypto.encrypt({ value: nin });

            // user doc
            const userDoc = doc(db, "users", authUser.email);

            // Data to update
            const data = {
                "kyc.id": idImage,
                "kyc.accountNumber": encryptedAccountNumber,
                "kyc.workAddress": encryptedWorkAddress,
                "kyc.monthlyIncome": encryptedMonthlyIncome,
                "kyc.bvn": encryptedBvn,
                "kyc.nin": encryptedNin,
            };

            // Update the data
            await updateDoc(userDoc, data).then(() => {
                toast.success("You are Verified.");
                router.push("/dashboard");
            }).catch((error) => {
                toast.error(`Something is wrong: ${error.message}`);
            });
        }).catch((error) => {
            toast.error(`Something is wrong: ${error.message}`);
        });
    };

    return (
        <>
            <div className={styles.container}>
                <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                    <header className="mb-auto">
                        <h4 className="float-md-start mb-0">
                            <Link className="text-decoration-none primary" href="/" as="/">
                                <img
                                    src="/logo/logo_trans.png"
                                    alt="logo"
                                    className="rounded"
                                    width={50}
                                />
                            </Link>
                        </h4>
                    </header>

                    <div className="row justify-content-center">
                        <div className="col-md-4 p-0">
                            <h2>Verification</h2>
                            <small className="text-muted">Complete your <b>KYC</b> verification to access dashboard</small>

                            <form className="col-12 mt-4" onSubmit={onVerification}>
                                <div className="mx-2 form-floating mb-3">
                                    <input
                                        type="file"
                                        required
                                        className="form-control"
                                        id="id"
                                        placeholder="id"
                                        onChange={(event) => setId(event.target.files[0])}
                                    />
                                    <label htmlFor="id">ID Card</label>
                                </div>

                                <div className="d-flex mb-3">
                                    <div className="col-6">
                                        <div className="mx-2 form-floating">
                                            <input
                                                type="text"
                                                required
                                                className="form-control"
                                                id="accountNumber"
                                                placeholder="accountNumber"
                                                pattern="[0-9]{10}"
                                                title="10 digits needed."
                                                onChange={(event) => setAccountNumber(event.target.value)}
                                            />
                                            <label htmlFor="accountNumber">Account Number</label>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="mx-2 form-floating">
                                            <input
                                                type="text"
                                                required
                                                className="form-control"
                                                id="workAddress"
                                                placeholder="Work Address"
                                                onChange={(event) => setWorkAddress(event.target.value)}
                                            />
                                            <label htmlFor="workAddress">Work Address</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex mb-3">
                                    <div className="col-6">
                                        <div className="mx-2 form-floating">
                                            <input
                                                type="text"
                                                required
                                                className="form-control"
                                                id="monthlyIncome"
                                                placeholder="monthlyIncome"
                                                onChange={(event) => setMonthlyIncome(event.target.value)}
                                            />
                                            <label htmlFor="monthlyIncome">Monthly Income</label>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="mx-2 form-floating">
                                            <input
                                                type="text"
                                                required
                                                className="form-control"
                                                id="bvn"
                                                placeholder="BVN"
                                                pattern="[0-9]{11}"
                                                title="11 digits needed."
                                                onChange={(event) => setBvn(event.target.value)}
                                            />
                                            <label htmlFor="bvn">BVN</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mx-2 form-floating">
                                    <input
                                        type="nin"
                                        required
                                        className="form-control"
                                        id="nin"
                                        placeholder="NIN"
                                        pattern="[0-9]{11}"
                                        title="11 digits needed."
                                        onChange={(event) => setNin(event.target.value)}
                                    />
                                    <label htmlFor="nin">NIN</label>
                                </div>

                                <button type="submit" className={`btn btn-lg btn-success ${styles.auth_btn} col-8 mt-4`}>
                                    {loading ? <Loader /> : "Verify"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <footer className="mt-auto text-muted">
                        For further support, you may visit the <Link href="/contact" className="text-decoration-none primary">contact.</Link>
                    </footer>
                </div>
            </div>
        </>
    )
}
