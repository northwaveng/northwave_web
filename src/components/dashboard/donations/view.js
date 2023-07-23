import { Gift } from "iconsax-react"
import Link from "next/link"

export default function ViewCartDonation({ donation }) {
    if (!donation) {
        return (
            <div className="modal fade" id="viewCartDonation" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="modal fade" id="viewCartDonation" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <h6>Cart Donations</h6>
                                <hr />
                            </div>

                            <div className="col-12">
                                {donation.items.length > 0 ? (
                                    <ul className="list-unstyled ">
                                        {donation.items.map((donate) => (
                                            <li key={donate.id} className="d-flex my-2 p-2 card flex-row position-relative" >
                                                <Link href={`/product/${donate.id}`} className="d-flex text-decoration-none">
                                                    <img
                                                        src={donate.image}
                                                        alt={donate.name}
                                                        className="rounded border"
                                                        width={100}
                                                        height={100}
                                                        style={{ objectFit: "cover" }}
                                                    />
                                                    <div className="w-75 mx-2 d-flex flex-column justify-content-between">
                                                        <span className="secondary">{donate.name}</span>
                                                        <span className="text-muted">ID: {donate.id}</span>
                                                        <span className="text-muted">On: {donate.addedOn}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-center text-muted">
                                        <Gift size={100} variant="Bold" />
                                        <h5>No donation made yet.</h5>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}