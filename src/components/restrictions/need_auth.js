import Link from "next/link";
import { Information } from "iconsax-react";

export default function NeedAuth({ fullHeight = false }) {
    return (
        <div className={`d-flex justify-content-center align-items-center ${fullHeight && "vh-100"}`}>
            <div className="container">
                <div className="row my-5 justify-content-center">
                    <div className="col-12 text-muted text-center">
                        <Information variant="Bold" size={200} />
                        <p>You need to be logged in to see this page.</p>
                    </div>
                    <Link href="/auth/signin" className={`btn btn-lg btn-success bg_primary border_none py-3 w-50 my-5`}>
                        Signin here
                    </Link>
                </div>
            </div>
        </div>
    );
}