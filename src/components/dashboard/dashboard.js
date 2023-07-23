import { Box1, Gift, Edit2, Trash, People, Eye, UserOctagon, Folder, DirectInbox } from 'iconsax-react';
import Link from 'next/link';
import { db } from '@/firebase/fire_config';
import { useState, useEffect } from 'react';
import toCurrency from '@/components/utils/toCurrency'
import { collection, query, orderBy, onSnapshot, limit, getDocs } from 'firebase/firestore';
import ViewUser from '@/components/dashboard/users/view';
import UpdateProduct from '@/components/dashboard/products/update';
import ViewContactMessage from '@/components/dashboard/contact_us/view';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [contactUs, setContactUs] = useState([]);
    const [newsletters, setNewsletters] = useState([]);

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalDonations, setTotalDonations] = useState(0);

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);

    // listening to users
    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("joinedOn", "desc"), limit(5));

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });

            setUsers(data);

            const totalUsersRef = collection(db, "users");
            const totalUsersQuery = query(totalUsersRef);
            const totalUsersSnapshot = await getDocs(totalUsersQuery);
            const totalUsersSize = totalUsersSnapshot.size;
            setTotalUsers(totalUsersSize);
        });

        return () => { unsubscribe(); };
    }, []);

    // listening to product
    useEffect(() => {
        const q = query(collection(db, "products"), orderBy("addedOn", "desc"), limit(5));

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    addedOn: doc.data().addedOn.toDate().toLocaleDateString()
                };
            });

            setProducts(data);

            const totalProductsRef = collection(db, "products");
            const totalProductsQuery = query(totalProductsRef);
            const totalProductsSnapshot = await getDocs(totalProductsQuery);
            const totalProductsSize = totalProductsSnapshot.size;
            setTotalProducts(totalProductsSize);
        });



        return () => { unsubscribe(); };
    }, []);

    // listening to contact us
    useEffect(() => {
        const q = query(collection(db, "contactUs"), limit(5));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setContactUs(data);
        });

        return () => { unsubscribe(); };
    }, []);

    // listening to newsletters
    useEffect(() => {
        const q = query(collection(db, "newsletterSubscribers"), limit(5));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setNewsletters(data);
        });

        return () => { unsubscribe(); };
    }, []);

    // listening to donations
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "donations"), (snapshot) => {
            const dataSize = snapshot.size;
            setTotalDonations(dataSize);
        });

        return () => { unsubscribe(); };
    }, []);


    const onDeleteProduct = async id => {
        setLoading(true);

        const docRef = doc(collection(db, "products"), id);

        await deleteDoc(docRef).then(() => {
            toast.success(`Deleted Product With ID ${id}`);
            setLoading(false);
        }).catch((error) => {
            if (error.code == "not-found") {
                toast.error("Product not found");
                setLoading(false);
            } else {
                toast.error(`Something is wrong: ${error.message}`);
                setLoading(false);
            }
        });
    };

    return (
        <div className="dashboard_content">
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <div className="m-2 py-4 px-2 secondary border_none card shadow">
                            <div className="h5 d-flex justify-content-center">
                                <People size={32} className="mx-2" />
                                Total Users
                            </div>
                            <h1>{totalUsers}</h1>
                        </div>
                    </div>

                    <div className="col-md-4 text-center">
                        <div className="m-2 py-4 px-2 bg_primary secondary border_none card shadow">
                            <div className="h5 d-flex justify-content-center">
                                <Box1 size={32} className="mx-2" />
                                Total Products
                            </div>
                            <h1>{totalProducts}</h1>
                        </div>
                    </div>

                    <div className="col-md-4 text-center">
                        <div className="m-2 py-4 px-2 bg_secondary primary border_none card shadow">
                            <div className="h5 d-flex justify-content-center">
                                <Gift size={32} className="mx-2" />
                                Total Donations
                            </div>
                            <h1>{totalDonations}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mb-5">
                {/* products and users */}
                <div className="row">
                    <div className="col-md-6">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div className="h5 fw-normal">
                                Products
                                <hr />
                            </div>

                            {products &&
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Edit</th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.length > 0 && products.map((product) => (
                                                <tr key={product.id}>
                                                    <th scope="row">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            width={50}
                                                            height={50}
                                                            style={{ objectFit: "cover" }}
                                                            className="rounded border"
                                                        />
                                                    </th>
                                                    <td className="d-table-cell align-middle">{product.name}</td>
                                                    <td className="d-table-cell align-middle">{toCurrency(product.price)}</td>
                                                    <td className="d-table-cell align-middle">{product.isHealth ? "Nutrition" : "Food"}</td>
                                                    <td className="d-table-cell align-middle">
                                                        <button type="button" data-bs-toggle="modal" data-bs-target="#updateProduct" onClick={() => { setSelectedProduct(product) }} className="btn btn-sm border_none btn-warning">
                                                            Edit <Edit2 />
                                                        </button>
                                                    </td>
                                                    <td className="d-table-cell align-middle">
                                                        <button onClick={() => { onDeleteProduct(product.id) }} className="btn btn-sm border_none btn-danger">
                                                            Delete <Trash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }

                            <Link href="/dashboard/products" className="text-decoration-none text-center secondary p-2">
                                View More
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div className="h5 fw-normal">
                                Users
                                <hr />
                            </div>

                            {users &&
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Gender</th>
                                                <th scope="col">View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length > 0 && users.map((user) => (
                                                <tr key={user.id}>
                                                    <th scope="row">
                                                        <UserOctagon variant="Bold" className="secondary" size={50} />
                                                    </th>
                                                    <td className="d-table-cell align-middle">{user.firstName}</td>
                                                    <td className="d-table-cell align-middle">{user.email}</td>
                                                    <td className="d-table-cell align-middle">{user.gender.toUpperCase()}</td>
                                                    <td className="d-table-cell align-middle">
                                                        <button type="button" data-bs-toggle="modal" data-bs-target="#viewUser" onClick={() => { setSelectedUser(user) }} className="btn btn-sm border_none btn-warning">
                                                            View <Eye />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }

                            <Link href="/dashboard/users" className="text-decoration-none text-center secondary p-2">
                                View More
                            </Link>
                        </div>
                    </div>
                </div>

                {/* newsletter and contact us */}
                <div className="row">
                    <div className="col-md-6">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div className="h5 fw-normal">
                                Contact Us
                                <hr />
                            </div>

                            {contactUs &&
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contactUs.length > 0 && contactUs.map((contact) => (
                                                <tr key={contact.id}>
                                                    <th scope="row">
                                                        <DirectInbox variant="Bold" className="secondary" size={50} />
                                                    </th>
                                                    <td className="d-table-cell align-middle">{contact.fullName}</td>
                                                    <td className="d-table-cell align-middle">{contact.email}</td>
                                                    <td className="d-table-cell align-middle">
                                                        <button type="button" data-bs-toggle="modal" data-bs-target="#viewContactMessage" onClick={() => { setSelectedMessage(contact.message) }} className="btn btn-sm border_none btn-warning">
                                                            View <Eye />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }

                            <Link href="/dashboard/contact_us" className="text-decoration-none text-center secondary p-2">
                                View More
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div className="h5 fw-normal">
                                Newsletters
                                <hr />
                            </div>

                            {newsletters &&
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newsletters.length > 0 && newsletters.map((letter) => (
                                                <tr key={letter.id}>
                                                    <th scope="row">
                                                        <Folder variant="Bold" className="secondary" size={50} />
                                                    </th>
                                                    <td className="d-table-cell align-middle">{letter.email}</td>
                                                    <td className="d-table-cell align-middle">{letter.subscribed ? "Subscribed" : "Unsubscribed"}</td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }

                            <Link href="/dashboard/newsletters" className="text-decoration-none text-center secondary p-2">
                                View More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <UpdateProduct product={selectedProduct} />
            <ViewUser user={selectedUser} />
            <ViewContactMessage message={selectedMessage} />
        </div>
    )
}