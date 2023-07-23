import { Information } from "iconsax-react";

export default function NeedAccess({ fullHeight = false }) {
    return (
        <div className={`d-flex justify-content-center align-items-center ${fullHeight && "vh-100"}`}>
            <div className="container">
                <div className="row my-5 justify-content-center">
                    <div className="col-12 text-muted text-center">
                        <Information variant="Bold" size={200} />
                        <p>You have no access to this page.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}