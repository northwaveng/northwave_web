import { ArrowDown2, Chart, Money, Wallet } from 'iconsax-react'
import Link from 'next/link'

export default function Home() {

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-black my-2">How we help communities save</h1>
                        <p className="text-muted my-3">Save with your friends on weekly, monthly or quarterly basis.</p>
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

                            <h4>Analytics</h4>
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
                            <h1 className="text-black my-2">Why NorthWave?</h1>

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
                            <img src="/image/group.png" alt="group" width="100%" className="rounded-4" />
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

                            <div className="mt-3 fw-bold">General</div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq1" role="button" aria-expanded="false" aria-controls="faq1">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            What does NorthWave do?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq1">
                                    NorthWave is an indigenous financial institution that empowers people to achieve financial
                                    freedom by saving together with a community of friends, family, and colleagues. We focus
                                    on promoting collaborative savings for shared goals, providing interest-free loans, and
                                    offering financial analytics to track your finances and spending.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq2" role="button" aria-expanded="false" aria-controls="faq2">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            How does NorthWave help me save?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq2">
                                    With NorthWave, you can contribute with your friends, family, or colleagues on a weekly,
                                    monthly, or quarterly basis. This collective savings approach fosters a sense of trust and
                                    accountability, allowing you to save more effectively and reach your financial goals together.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq3" role="button" aria-expanded="false" aria-controls="faq3">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            Is NorthWave a registered financial institution?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq3">
                                    Yes, NorthWave is a registered company with the Corporate Affairs Commission of the Federal
                                    Republic of Nigeria with RC Number: 2005098. We operate in compliance with all applicable
                                    regulations and strive to provide a secure and transparent financial experience for our users.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq4" role="button" aria-expanded="false" aria-controls="faq4">

                                    <div className="d-flex justify-content-between">
                                        <div>
                                            Why is NorthWave better than any offline contributions?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <div className="collapse text-muted my-2" id="faq4">
                                    NorthWave is disruptive to any contribution circles;
                                    <ul>
                                        <li>Easily accessible, just at the click of a button</li>
                                        <li>We offer you the best payout values</li>
                                        <li>You can contribute as low as ₦1,000 (One thousand Naira) as a user</li>
                                        <li>There is no limit to your set contribution goals, personal or group</li>
                                        <li>You have the flexibility to save on a weekly, monthly, or quarterly basis</li>
                                        <li>We are not bound by location, i.e., the regions within Nigeria</li>
                                        <li>We are private and confidential</li>
                                        <li>All contributions are secured and legally bound</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-3 fw-bold">Contributions</div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq5" role="button" aria-expanded="false" aria-controls="faq5">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            How much can I contribute with NorthWave?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq5">
                                    You can start your contribution circle with as low as ₦5,000 (Five thousand Naira).
                                    We do not have an upper limit.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq6" role="button" aria-expanded="false" aria-controls="faq6">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            How does a contribution circle on NorthWave work?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <div className="collapse text-muted my-2" id="faq6">
                                    Your contribution circle is your friends, family, colleagues, or other users on NorthWave
                                    that you pool money together on a weekly, monthly, or quarterly basis. Here is how it works:

                                    <ul>
                                        <li>Download our app from Google Play Store and follow the simple registration and verification process</li>
                                        <li>As the circle leader, you set the contribution goal and frequency (weekly, monthly, or quarterly) for the circle</li>
                                        <li>Invite people you want to contribute to your contribution circle (after they have signed up on the app)</li>
                                        <li>Each circle member contributes a set amount at regular intervals (weekly, monthly, or quarterly) until everyone in your circle has received their payouts. All the contribution processes are automated, so they get reminders when it is time!</li>
                                        <li>You, as the circle leader, get the final payout with some extra money!</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            As the circle leader, what are my responsibilities?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    As the circle leader, you have the ability to invite and approve requests
                                    to join your contribution circle. You can send reminders to your circle members once
                                    it&apos;s contribution week. You can create as many contribution circles as you want - with
                                    unique names.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            Can other users I don&apos;t know join my contributions circle?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    Yes. Other users in the NorthWave community can send a request through our app to
                                    join your contribution circle.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            Why should I trust that other users will pay their contributions if I do not know them?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    Each user on the NorthWave platform is bound by a legal contract document upon signing up,
                                    to which they agree to our terms of service, and a breach can result in a penalty. We also
                                    employ a comprehensive solution for identity verification, bank verification, and card
                                    verification, all backed by top-notch security measures.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            What are the payment methods?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    All the payments are automated. You can select either &quot;Online Payment&quot;
                                    (which will be deducted automatically through your debit card or bank transfer)
                                    or &quot;Cash Payment&quot;(which will be paid in cash to the circle leader). Once you
                                    select either &quot;Online Payment&quot; or &quot;Cash Payment,&quot; this method will be locked in
                                    as the only available payment option for all your contributions in the circle.
                                    If you opt for &quot;Cash Payment,&quot; you are responsible for ensuring timely payment
                                    to the circle leader within the contribution week.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            Can I earn with NorthWave?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    Yes! As the circle leader, you can earn a 2% cash bonus per contribution circle
                                    you create upon payout. The more people you have in your contribution circle,
                                    the more you earn.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            How can I start a contribution circle today?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    To become a part of the NorthWave community and embark on your journey toward
                                    financial freedom, you can download our app from PlayStore and follow the simple
                                    registration process. Once registered, you can invite friends, family, or
                                    colleagues to join your savings group and begin saving together for shared goals.
                                </p>
                            </div>

                            <div className="mt-3 fw-bold">Fees & Charges</div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            How much do you charge?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    Simple! We charge a low percentage service fee on contributions and payouts. The circle
                                    leader, who will be the last to receive the payout in a circle, can earn a 2% cash bonus!
                                    All the fees will be deducted per contribution and payout. You can view all the payment
                                    details, including the fees, on the group details screen.
                                </p>
                            </div>

                            <div className="mt-3 fw-bold">Safety & Security</div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            Is my money and personal information safe with NorthWave?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    Absolutely. With our end-to-end encryption, all your personal details, financial data,
                                    and verification documents are securely encrypted on your device before transmission.
                                    Only authorized parties can decrypt this information, ensuring that your data remains
                                    private and confidential.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            How secure is NorthWave&apos;s verification process?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    At NorthWave, we prioritize the security and privacy of our users&apos; data. Our app employs a
                                    comprehensive solution for identity verification, bank verification, and card verification,
                                    all backed by top-notch security measures. We use end-to-end encryption throughout the
                                    entire verification process to safeguard sensitive user data, making it inaccessible to
                                    any unauthorized parties.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            Why do you need my BVN?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    Collecting your BVN helps us verify your identity and links your bank account to our app securely.
                                </p>
                            </div>

                            <div className="mt-3 fw-bold">Other Services</div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            Does NorthWave offer loans?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    Through our community savings model, you can apply for interest-free loans when you need
                                    financial assistance. All loans are backed by the collective contributions of the community,
                                    enabling members to support each other without incurring additional interest charges.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            How can I track my finances and spending with NorthWave?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    Our app includes powerful financial analytics tools that enable you to monitor and analyze
                                    your financial activities. You can gain insights into your savings progress, spending habits,
                                    and more, helping you make informed financial decisions.
                                </p>
                            </div>

                            <div>
                                <a className="btn btn-lg shadow-sm my-2 w-100" data-bs-toggle="collapse" href="#faq7" role="button" aria-expanded="false" aria-controls="faq7">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            What should I do if I need help?
                                        </div>
                                        <div>
                                            <ArrowDown2 className="primary" />
                                        </div>
                                    </div>
                                </a>

                                <p className="collapse text-muted my-2" id="faq7">
                                    The easiest way to reach us is to tap Support on the NorthWave app and then tap Chat With Us.
                                    You can also send an email to northwave.ng@gmail.com or call +234 7033180897
                                    between 8:00 am and 5:00 pm on weekdays.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div className="container-fluid">
                <div className="row pb-5">
                    <div className="col-12">
                        <small>
                            <Link href="https://techcabal.com/2023/07/24/22-founders-emerge-winners-of-techmybiz-pitch-a-thon-2023/" target="_blank" className="primary">
                                Techmybiz by GIZ
                            </Link>
                            <br />
                            <i>
                                An initiative of GIZ/Digital Transformation Center Nigeria (DTC Nigeria), which is
                                jointly funded by the European Union (EU) and the German Federal Ministry for Economic
                                Cooperation and Development (BMZ) and is implemented by Deutsche Gesellschaft fuer
                                Internationale Zusammenarbeit (GIZ) GmbH.
                            </i>
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
}
