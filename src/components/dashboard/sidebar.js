import { Box1, DirectInbox, Folder, Gift, Logout, Message, People, PresentionChart, Setting, User } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useAuth } from '@/firebase/fire_auth_context';

export default function Sidebar() {
    const router = useRouter();
    const { logOut } = useAuth();

    return (
        <div className="dashboard_sidebar shadow-sm">
            <nav className="d-flex flex-column">
                <div className="dashboard_sidebar_header">
                    <Image
                        src="/images/fav_logo_trans.png"
                        alt="logo"
                        className="rounded m-1"
                        width={43}
                        height={43}
                        priority
                    />
                    <div className="m-1 d-none d-lg-block d-flex flex-column">
                        NorthWave Admin
                        <p className="text-muted">
                            <small>The food bank</small>
                        </p>
                    </div>
                </div>
                <Link href="/dashboard" as="/dashboard" className={`dashboard_sidebar_item secondary ${router.asPath == "/dashboard" && "bg_primary"}`}>
                    <PresentionChart className="mx-2" />
                    <span className="d-none d-lg-inline">Dashboard</span>
                </Link>
                <Link href="/dashboard/products" as="/dashboard/products" className={`dashboard_sidebar_item secondary ${router.asPath == "/dashboard/products" && "bg_primary"}`}>
                    <Box1 className="mx-2" />
                    <span className="d-none d-lg-inline">Products</span>
                </Link>
                <Link href="/dashboard/users" as="/dashboard/users" className={`dashboard_sidebar_item secondary ${router.asPath == "/dashboard/users" && "bg_primary"}`}>
                    <People className="mx-2" />
                    <span className="d-none d-lg-inline">Users</span>
                </Link>
                <Link href="/dashboard/newsletters" as="/dashboard/newsletters" className={`dashboard_sidebar_item secondary ${router.asPath == "/dashboard/newsletters" && "bg_primary"}`}>
                    <Folder className="mx-2" />
                    <span className="d-none d-lg-inline">Newsletters</span>
                </Link>
                <Link href="/dashboard/contact_us" as="/dashboard/contact_us" className={`dashboard_sidebar_item secondary ${router.asPath == "/dashboard/contact_us" && "bg_primary"}`}>
                    <DirectInbox className="mx-2" />
                    <span className="d-none d-lg-inline">Contact Us</span>
                </Link>
                <Link href="/dashboard/donations" as="/dashboard/donations" className={`dashboard_sidebar_item secondary ${router.asPath == "/dashboard/donations" && "bg_primary"}`}>
                    <Gift className="mx-2" />
                    <span className="d-none d-lg-inline">Donations</span>
                </Link>
                <Link href="/dashboard/live_chat" as="/dashboard/live_chat" className={`dashboard_sidebar_item secondary ${router.asPath == "/dashboard/live_chat" && "bg_primary"}`}>
                    <Message className="mx-2" />
                    <span className="d-none d-lg-inline">Live Chat</span>
                </Link>
                {/* <Link href="/dashboard/settings" as="/dashboard/settings" className={`dashboard_sidebar_item secondary ${router.asPath == "/dashboard/settings" && "bg_primary"}`}>
                    <Setting className="mx-2" />
                    <span className="d-none d-lg-inline">Settings</span>
                </Link>
                <Link href="/dashboard/profile" as="/dashboard/profile" className={`dashboard_sidebar_item secondary ${router.asPath == "/dashboard/profile" && "bg_primary"}`}>
                    <User className="mx-2" />
                    <span className="d-none d-lg-inline">Profile</span>
                </Link> */}
                <button type="button" className="border_none trans text-start dashboard_sidebar_item secondary" onClick={logOut}>
                    <Logout className="mx-2" />
                    <span className="d-none d-lg-inline">Logout</span>
                </button>
            </nav>
        </div>
    )
}