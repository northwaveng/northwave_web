import styles from '@/components/auth/Auth.module.css'
import Link from 'next/link';
import { auth } from "@/firebase/fire_config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const onForgotPassword = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("An email with a password reset link has been sent to your email address.");
            setLoading(false);
        } catch (error) {
            toast.error(`Something is wrong: ${error.message}`);
            setLoading(false);
        }
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

                    <div className="px-3 row justify-content-center">
                        <h2>Reset Password</h2>
                        <p className="text-muted">Only group admins can sign in to dashboard</p>

                        <form className="col-md-4 mt-4" onSubmit={onForgotPassword}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    required
                                    className="form-control"
                                    id="emailAddr"
                                    placeholder="johndoe@example.com"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <label htmlFor="emailAddr">Email Address</label>
                            </div>

                            <button type="submit" className={`btn btn-lg btn-success ${styles.auth_btn} col-md-8 mt-4`}>
                                {loading ? <Loader /> : "Send Email"}
                            </button>

                            <p className="mt-4">
                                Have account already?
                                <Link href="/auth/signin" as="/auth/signin" className="text-decoration-none primary"> signin</Link>.
                            </p>
                        </form>
                    </div>

                    <footer className="mt-auto text-muted">
                        For further support, you may visit the <Link href="/contact" className="text-decoration-none primary">contact.</Link>
                    </footer>
                </div>
            </div>
        </>
    )
}
