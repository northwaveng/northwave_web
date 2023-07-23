import { Note } from "iconsax-react"

export default function ViewContactMessage({ message }) {
    if (!message) {
        return (
            <div className="modal fade" id="viewContactMessage" tabIndex="-1" aria-labelledby="viewContactMessageLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="modal fade" id="viewContactMessage" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <h6>Message</h6>
                                <hr />
                            </div>

                            <div className="col-12 secondary">
                                <Note variant="Bold" />
                            </div>

                            <div className="col-12 secondary">
                                {message}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}