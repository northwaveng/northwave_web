import styles from '@/components/auth/Auth.module.css'
import Link from 'next/link';
import { db } from "@/firebase/fire_config";
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuth } from '@/firebase/fire_auth_context';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import randomNum from '@/components/utils/randomNum'
import axios from 'axios';

const storage = getStorage();

export default function Signin() {
    const [loading, setLoading] = useState(false);
    const [banks, setBanks] = useState([]);
    const [id, setId] = useState(null);
    const [accountNumber, setAccountNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankCode, setBankCode] = useState("");
    const [workAddress, setWorkAddress] = useState("");
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [bvn, setBvn] = useState("");
    const [nin, setNin] = useState("");
    const { authUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchBankList = async () => {
            try {
                let banks_ = [];

                const url = `${process.env.NEXT_PUBLIC_PAYSTACK_HOSTNAME}bank?currency=NGN&country=nigeria`;
                const headers = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_LIVE_SECRET_KEY}` };

                const response = await axios.get(url, { headers });

                if (response.status === 200 || response.status === 201) {
                    const data = response.data;
                    const bankListData = data["data"];

                    for (const bank of bankListData) {
                        const bankModel = { name: bank["name"], code: bank["code"] };
                        banks_.push(bankModel);
                    }

                    setBanks(banks_);
                }
            } catch (error) {
                toast.error(`Something went wrong: ${error}`);
            }
        };

        fetchBankList();
    }, []);

    const onVerification = async event => {
        event.preventDefault();
        setLoading(true);

        if (bankCode.length <= 0) {
            toast.error("Please select bank.");
            setLoading(false);
        } else {
            toast.info("Validating account number.");
            const path = `bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;
            const url = `${process.env.NEXT_PUBLIC_PAYSTACK_HOSTNAME}${path}`;
            const headers = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_LIVE_SECRET_KEY}` };

            try {
                const response = await axios.get(url, { headers });

                if (response.status === 200 || response.status === 201) {
                    const userDoc = doc(db, "users", authUser.email);
                    await getDoc(userDoc).then(async (snap) => {
                        toast.info("Uploading ID.");

                        const idRef = ref(storage, `idCards/idCard${randomNum(6)}`);
                        await uploadBytes(idRef, id);

                        await getDownloadURL(idRef).then(async (id) => {
                            toast.info("Verifying user.")

                            const name = `${snap.data().firstName} ${snap.data().lastName}`;
                            const url_ = `${process.env.NEXT_PUBLIC_PAYSTACK_HOSTNAME}transferrecipient`;
                            const headers_ = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_LIVE_SECRET_KEY}`, 'Content-Type': 'application/json' };
                            const params_ = JSON.stringify({
                                "type": "nuban",
                                "name": name,
                                "account_number": accountNumber,
                                "bank_code": bankCode,
                                "currency": "NGN"
                            });

                            try {
                                const response_ = await axios.post(url_, params_, { headers: headers_ });

                                if (response_.status === 200 || response_.status === 201) {
                                    let resData = response_.data;
                                    const recipientCode = resData["data"]["recipient_code"];

                                    // user doc
                                    const userDoc = doc(db, "users", authUser.email);

                                    // Data to update
                                    const data = {
                                        "kyc.id": id,
                                        "kyc.accountNumber": accountNumber,
                                        "kyc.bankCode": bankCode,
                                        "kyc.recipientCode": recipientCode,
                                        "kyc.workAddress": workAddress.toLowerCase(),
                                        "kyc.monthlyIncome": monthlyIncome,
                                        "kyc.bvn": bvn,
                                        "kyc.nin": nin,
                                    };

                                    // Update the data
                                    await updateDoc(userDoc, data).then(() => {
                                        toast.success("You are Verified.");
                                        router.push("/dashboard");
                                    }).catch((error) => {
                                        toast.error(`Something is wrong: ${error.message}`);
                                        setLoading(false);
                                    });
                                }
                            } catch (error) {
                                toast.error(error);
                                setLoading(false);
                            }
                        }).catch((error) => {
                            toast.error(`Something is wrong: ${error.message}`);
                            setLoading(false);
                        });
                    }).catch((error) => {
                        toast.error(`Something is wrong: ${error.message}`);
                        setLoading(false);
                    });
                }
            } catch (error) {
                toast.error("Couldn't validate account number.");
                setLoading(false);
            }
        }
    };

    const onSelectBank = (selectedBank) => {
        setBankName(selectedBank.name);
        setBankCode(selectedBank.code);
        toast.success(`${selectedBank.name} selected.`)
    };

    return (
        <>
            <div className={styles.container}>
                <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                    <header className="mb-auto">
                        <h4 className="float-md-start mb-0">
                            <Link className="text-decoration-none primary" href="/" as="/">
                                <img
                                    src="/logos/logo_trans.png"
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

                                {banks.length <= 0 ?
                                    <div className="mx-2 mb-3">
                                        <p>Loading bank list</p>
                                        <Loader />
                                    </div>
                                    :
                                    <div className="mx-2 mb-3">
                                        <button type="button" className="form-control p-3" data-bs-toggle="modal" data-bs-target="#backList">
                                            {bankCode.length > 0 ? bankName : "Click and select bank"}
                                        </button>
                                    </div>
                                }


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

                    <div className="modal fade" id="backList" tabIndex="-1" aria-labelledby="backListLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Banks In Nigeria</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <ul className="list-group">
                                        {banks.map((bank) => (
                                            <li key={bank.code} className="list-group-item text-start" style={{ cursor: "pointer" }} onClick={() => onSelectBank(bank)}>
                                                {bank.name}
                                                <br />
                                                <small className="text-muted">{bank.code}</small>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
