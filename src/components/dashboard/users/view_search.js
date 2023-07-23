import { Call, DirectInbox, Location, Lock, Man, Note, ShieldSecurity, UserOctagon, Woman } from "iconsax-react"

export default function ViewSearchUser({ user }) {
    if (!user) {
        return (
            <div className="modal fade" id="viewSearchUser" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="modal fade" id="viewSearchUser" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="row mb-4">
                            <div className="col-12">
                                <h6>User Info</h6>
                                <hr />
                            </div>

                            <div className="col-sm-6 secondary">
                                <div className="mb-4">
                                    <UserOctagon variant="Bold" /> {user.firstName} {user.lastName}
                                </div>

                                <div className="mb-4">
                                    {user.gender.toLowerCase() == "male" ? <Man variant="Bold" /> : <Woman variant="Bold" />} {user.gender.toUpperCase()}
                                </div>

                                <div className="mb-4">
                                    <DirectInbox variant="Bold" /> {user.email}
                                </div>
                            </div>

                            <div className="col-sm-6 secondary">
                                <div className="mb-4">
                                    <ShieldSecurity variant="Bold" /> {user.isAdmin ? "Admin Role" : "User Role"}
                                </div>
                                <div className="mb-4">
                                    <Lock variant="Bold" /> {user.isActive ? "Active Account" : "Disabled Account"}
                                </div>

                                <div className="mb-4">
                                    <Call variant="Bold" /> {user.phoneNumber}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <h6>Address Book Info</h6>
                                <hr />
                            </div>

                            <div className="col-sm-6 secondary">
                                <div className="mb-4">
                                    <UserOctagon variant="Bold" /> {user.addressBook.firstName} {user.addressBook.lastName}
                                </div>

                                <div className="mb-4">
                                    <Call variant="Bold" /> {user.addressBook.phoneNumber}
                                </div>
                            </div>

                            <div className="col-sm-6 secondary">
                                <div className="mb-4">
                                    <Location variant="Bold" /> {user.addressBook.address}
                                </div>

                                <div className="mb-4">
                                    <Call variant="Bold" /> {user.addressBook.additionalPhoneNumber}
                                </div>
                            </div>

                            <div className="col-12 secondary">
                                <div className="mb-4">
                                    <Note variant="Bold" /> {user.addressBook.additionalInformation}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}