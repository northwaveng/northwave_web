import { Edit2, Trash } from 'iconsax-react';
import { db } from '@/firebase/fire_config';
import { useState, useEffect } from 'react';
import toCurrency from '@/components/utils/toCurrency'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import ProductSearch from '@/components/dashboard/products/search';
import CreateProduct from '@/components/dashboard/products/create';
import UpdateProduct from '@/components/dashboard/products/update';
import Loader from '@/components/loader/loader';
import { toast } from "react-toastify";
import Link from 'next/link';

export default function DashboardProducts() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // listening to product
    useEffect(() => {
        const q = query(collection(db, "products"), orderBy("addedOn", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });

            setProducts(data);
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
                    <div className="col-12">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div className="row justify-content-between">
                                <div className="col-sm-6 text-start">
                                    <h4>Products</h4>
                                    <small className="text-muted">Create, update and view products</small>
                                </div>

                                <div className="col-sm-6 text-end">
                                    <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#createProduct">
                                        Create Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <ProductSearch />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div>
                                All Products
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
                                                    <td className="d-table-cell align-middle">
                                                        <Link href={`/product/${product.id}`} target="_blank" className="text-decoration-none secondary">{product.name}</Link>
                                                    </td>
                                                    <td className="d-table-cell align-middle">{toCurrency(product.price)}</td>
                                                    <td className="d-table-cell align-middle">{product.isHealth ? "Nutrition" : "Food"}</td>
                                                    <td className="d-table-cell align-middle">
                                                        <button type="button" data-bs-toggle="modal" data-bs-target="#updateProduct" onClick={() => { setSelectedProduct(product) }} className="btn btn-sm border_none btn-warning">
                                                            Edit <Edit2 />
                                                        </button>
                                                    </td>
                                                    <td className="d-table-cell align-middle">
                                                        <button onClick={()=> {onDeleteProduct(product.id)}} className="btn btn-sm border_none btn-danger">
                                                            {loading ? <Loader /> : <>{"Delete"} <Trash /></>}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <CreateProduct />
            <UpdateProduct product={selectedProduct} />
        </div>
    )
}