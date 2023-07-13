import Link from "next/link";
import { Call, Camera, DirectSend, Location } from "iconsax-react";

export default function Footer() {
    return (
        <footer className="bg_primary py-5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 text-white">
                        <img src="/logo.png" alt="logo" width={100} />

                        <p className="my-3">
                            We are an indigenous financial institution registered with the Corporate Affairs
                            Commission in Nigeria, that focuses on empowering people to attain financial freedom
                            together with a community of friends. We aim to promote savings based on capacity that
                            is built on trust to achieve a common goal.
                        </p>
                    </div>

                    <div className="col-sm-4 text-white">
                        <div className="d-flex my-3">
                            <Call className="mx-1" size="32" variant="Bold" />
                            <div className="d-flex flex-column mx-1">
                                call us
                                <Link className="text-decoration-none text-white"
                                    href="tel:+2347033180897"
                                    as="tel:+2347033180897"
                                    target="_blank"
                                >
                                    +234-703-318-0897
                                </Link>
                            </div>
                        </div>
                        <div className="d-flex my-3">
                            <DirectSend className="mx-1" size="32" variant="Bold" />
                            <div className="d-flex flex-column mx-1">
                                email us
                                <Link className="text-decoration-none text-white"
                                    href="mailto:northwave.ng@gmail.com"
                                    as="mailto:northwave.ng@gmail.com"
                                    target="_blank"
                                >
                                    northwave.ng@gmail.com
                                </Link>
                            </div>
                        </div>
                        <div className="d-flex my-3">
                            <Location className="mx-1" size="32" variant="Bold" />
                            <div className="d-flex flex-column mx-1">
                                visit us
                                <span className="text-white">
                                    Barracks road Jimeta Yola
                                </span>
                            </div>
                        </div>
                        <div className="d-flex my-3">
                            <Camera className="mx-1" size="32" variant="Bold" />
                            <div className="d-flex flex-column mx-1">
                                follow us
                                <Link className="text-decoration-none text-white"
                                    href="https://www.linkedin.com/company/smartrrproject/"
                                    as="https://www.linkedin.com/company/smartrrproject/"
                                    target="_blank"
                                >
                                    linkedin
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col text-center">
                        <Link className="grey_dark text-decoration-none" href="/" as="/">
                            All rights reserved © www.northwave.ng.com
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
