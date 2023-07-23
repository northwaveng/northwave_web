import Link from 'next/link';
import { useState } from "react";

export default function LiveChat() {
    const [fullscreen, setFullscreen] = useState(false);

    return (
        <div className="dashboard_content">
            <div className="container mb-5">
                <div className="row">
                    <div className={fullscreen ? "d-none" : "col-md-4"}>
                        <div className="m-1">
                            <h4 className="text-center">Login Credentials</h4>
                            <hr />
                            <div>
                                <b>Email</b>
                                <br />
                                northeastfoodbankorg@gmail.com
                            </div>
                            <br />
                            <div>
                                <b>Password</b>
                                <br />
                                nefbAdmin23
                            </div>
                            <br />
                            <div>
                                <b>External</b>
                                <br />
                                <Link href="https://dashboard.tawk.to/#/dashboard/" target="_blank" className="primary">
                                    Open External
                                </Link>
                            </div>
                            <br />
                            <div>
                                <b>Enable Fullscreen</b>
                                <br />
                                <button type="button" onClick={() => { setFullscreen(!fullscreen) }} className="btn btn-dark">
                                    {fullscreen ? "Disable" : "Enable"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={fullscreen ? "col-12" : "col-md-8"}>
                        <div className="m-1 bg_white shadow-sm rounded border" style={{ height: "100vh" }}>
                            <iframe src="https://dashboard.tawk.to/#/dashboard/" width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}