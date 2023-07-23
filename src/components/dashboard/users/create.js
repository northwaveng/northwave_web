import Link from "next/link";

export default function CreateUser() {
    return (
        <div className="modal fade" id="createUser" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createUserLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createUserLabel">Create User</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <p className="text-muted text-center">
                                    Share the link below to the new user that want to signup.
                                </p>

                                <div className="alert alert-warning" role="alert">
                                    https://northwaveng.com/auth/signup
                                </div>

                                <Link className="w-100 btn btn-lg btn-dark" target="_blank" href="/auth/signup">
                                    Click here to help signup new user
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}