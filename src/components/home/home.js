// import styles from '@/components/home/Home.module.css'
import { Chart, Money, Wallet } from 'iconsax-react'

export default function Home() {

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-black my-2">How we help communities save</h1>
                        <p className="text-muted my-3">Save with your friends on weekly, monthly or Quarterly basis.</p>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-4">
                        <div className="rounded-4 bg_white shadow m-2 p-4">
                            <Wallet className="mb-5 rounded-3 p-3" style={{ backgroundColor: "#fff7e3" }} color="#CC9933" size={80} />

                            <h4>Savings</h4>
                            <p className="text-muted">Saving as a community for future security.</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="rounded-4 bg_white shadow m-2 p-4">
                            <Money className="mb-5 rounded-3 p-3" style={{ backgroundColor: "#fff7e3" }} color="#CC9933" size={80} />

                            <h4>Loans</h4>
                            <p className="text-muted">Get interest free loans.</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="rounded-4 bg_white shadow m-2 p-4">
                            <Chart className="mb-5 rounded-3 p-3" style={{ backgroundColor: "#fff7e3" }} color="#CC9933" size={80} />

                            <h4>Financial</h4>
                            <p className="text-muted">Track your finances and spending.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <div className="m-2">
                            <img src="/image/verification.png" alt="verification" width="70%" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="m-2">
                            <h1 className="text-black my-2">About Us</h1>

                            <p className="text-muted my-3">
                                Our app provides a comprehensive solution for identity verification,
                                bank verification, and card verification, prioritizing top-notch security measures.
                                We understand the critical importance of safeguarding sensitive user data, and that&apos;s
                                why we have implemented end-to-end encryption throughout the entire verification process.
                                With end-to-end encryption, all user information, including personal details, financial data,
                                and verification documents, is securely encrypted on the user&apos;s device before transmission
                                and can only be decrypted by authorized parties.
                            </p>
                            <p className="text-muted my-3">
                                This ensures that the data remains private and confidential, inaccessible to any
                                unauthorized entities, thereby bolstering trust and instilling confidence in our users.
                                We are committed to maintaining the highest standards of security to protect our users&apos;
                                information and ensure a seamless and secure verification experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row mt-5">
                    <div className="col-md-6">
                        <div className="m-2">
                            <img src="/image/market.png" alt="market" width="100%" className="rounded-4" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="m-2">
                            <h1 className="text-black my-2">About Us</h1>

                            <p className="text-muted my-3">
                                NorthWave is an indigenous financial institution registered with the Corporate Affairs
                                Commission in Nigeria, that focuses on empowering people to attain financial freedom
                                together with a community of friends. We aim to promote savings based on capacity that
                                is built on trust to achieve a common goal.
                            </p>

                            <div className="rounded-4 bg_white shadow m-2 p-4">
                                <div>
                                    <h4>Vision</h4>
                                    <p className="text-muted">A world of financial freedom.</p>
                                </div>

                                <div>
                                    <h4>Mission</h4>
                                    <p className="text-muted">To build a financial free community through collaborative savings in Nigeria.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="m-2">
                            <h1 className="text-black my-2">FAQs</h1>

                            <div>
                                <a class="btn btn-lg shadow-sm my-2 w-100 text-start" data-bs-toggle="collapse" href="#faq1" role="button" aria-expanded="false" aria-controls="faq1">
                                    Why is NorthWave better to any offline contributions?
                                </a>

                                <p className="collapse text-muted my-2" id="faq1">
                                    NorthWave is disruptive to any contribution circles;
                                    a. Easily accessible, just a click of a button
                                    b. It offers you best payout values
                                    c. Contributions as low as N5000
                                    d. no limit to your set goals, personal or group
                                    e. It is not bound by region within Nigeria
                                    f. Private and confidential
                                    g. Secured and legally bound.
                                </p>
                            </div>

                            <div>
                                <a class="btn btn-lg shadow-sm my-2 w-100 text-start" data-bs-toggle="collapse" href="#faq2" role="button" aria-expanded="false" aria-controls="faq2">
                                    Is NorthWave legal?
                                </a>

                                <p className="collapse text-muted my-2" id="faq2">
                                    NorthWave is a registered company with the corporate affairs commission of the federal
                                    republic of Nigeria with RC Number: 2005098
                                </p>
                            </div>

                            <div>
                                <a class="btn btn-lg shadow-sm my-2 w-100 text-start" data-bs-toggle="collapse" href="#faq3" role="button" aria-expanded="false" aria-controls="faq3">
                                    Why should I trust other users will pay their contributions?
                                </a>

                                <p className="collapse text-muted my-2" id="faq3">
                                    Each user on NorthWave platform is bound by a legal contract document upon signing up, to
                                    which they agree to our terms of service, and breach can result to penalty. User verification
                                    to each user as well
                                </p>
                            </div>

                            <div>
                                <a class="btn btn-lg shadow-sm my-2 w-100 text-start" data-bs-toggle="collapse" href="#faq4" role="button" aria-expanded="false" aria-controls="faq4">
                                    What are payment methods?
                                </a>

                                <p className="collapse text-muted my-2" id="faq4">
                                    Debit cards, bank transfer, salary deduction.
                                </p>
                            </div>

                            <div>
                                <a class="btn btn-lg shadow-sm my-2 w-100 text-start" data-bs-toggle="collapse" href="#faq5" role="button" aria-expanded="false" aria-controls="faq5">
                                    What are withdrawal options?

                                </a>

                                <p className="collapse text-muted my-2" id="faq5">
                                    Bank transfer, direct debit.
                                </p>
                            </div>

                            <div>
                                <a class="btn btn-lg shadow-sm my-2 w-100 text-start" data-bs-toggle="collapse" href="#faq6" role="button" aria-expanded="false" aria-controls="faq6">
                                    What are the groups circles?
                                </a>

                                <p className="collapse text-muted my-2" id="faq6">
                                    These are easy, smart, credible and rewarding ways to meet up with your financial goals,
                                    to achieve with friends and colleagues.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
