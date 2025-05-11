import Link from "next/link";
import { Call, Camera, DirectSend, Facebook, Instagram, LinkCircle, Location } from "iconsax-react";

export default function Footer() {
    return (
        <footer className="bg_primary pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 text-white">
                        <img src="/logos/logo_text_dark_trans.png" alt="logo" width={100} />

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
                                    href="mailto:info@northwaveng.com"
                                    as="mailto:info@northwaveng.com"
                                    target="_blank"
                                >
                                    info@northwaveng.com
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

                        <div className="row">
                            <div className="col-4 my-3">
                                <Link className="text-decoration-none text-white"
                                    href="https://www.linkedin.com/in/northwaveng/"
                                    target="_blank"
                                >
                                    <LinkCircle className="mx-1" size="32" variant="Bold" />

                                    LinkedIn
                                </Link>
                            </div>
                            <div className="col-4 my-3">
                                <Link className="text-decoration-none text-white"
                                    href="https://www.facebook.com/northwaveng"
                                    target="_blank"
                                >
                                    <Facebook className="mx-1" size="32" variant="Bold" />

                                    Facebook
                                </Link>
                            </div>
                            <div className="col-4 my-3">
                                <Link className="text-decoration-none text-white"
                                    href="https://www.instagram.com/northwaveng/"
                                    target="_blank"
                                >
                                    <Instagram className="mx-1" size="32" variant="Bold" />
                                    Instagram
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row py-3">
                    <div className="col text-center">
                        <Link className="text-light text-decoration-none" href="/" as="/">
                            All rights reserved © www.northwaveng.com
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
