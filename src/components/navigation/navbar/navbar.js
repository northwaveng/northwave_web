import Link from 'next/link'
import styles from '@/components/navigation/navbar/Navbar.module.css'
// import { useAuth } from '@/firebase/fire_auth_context';
// import { Login, Logout } from 'iconsax-react';
import { useRouter } from 'next/router';

export default function Navbar() {
    // const { loading, authUser, logOut } = useAuth();
    // const router = useRouter();

    return (
        <nav
            className={`${styles.navbar} navbar navbar-expand-md navbar-dark fixed-top`}>
            <div className="container-fluid">
                <Link className="navbar-brand text-white" href="/" as="/">
                    <img
                        src="/logos/logo_text_dark_trans.png"
                        alt="logo"
                        className="rounded"
                        width={50}
                    />
                </Link>

                {/* <div className="d-flex">
                    {!loading && authUser
                        ?
                        <>
                            {
                                router.pathname != "/dashboard" &&
                                <Link className="btn btn-light shadow-sm mx-2 px-3 py-2" href="/dashboard" as="/dashboard">
                                    Dashboard
                                </Link>
                            }

                            <button className="btn text-white mx-2 px-3 py-2" onClick={logOut}>
                                <Logout />
                            </button>
                        </>
                        :
                        <>
                            <Link className="btn text-white px-3 py-2" href="/auth/signin" as="/auth/signin">
                                <span style={{ fontSize: "14px" }}>Sign In</span>
                            </Link>
                            <Link style={{ fontSize: "14px" }} className="btn btn-light shadow-sm px-2 py-2" href="/auth/signup" as="/auth/signup">
                                Sign Up For Free
                            </Link>
                        </>
                    }
                </div> */}
            </div>
        </nav>
    );
}
