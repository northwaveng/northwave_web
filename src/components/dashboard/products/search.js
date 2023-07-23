import styles from '@/components/dashboard/Dashboard.module.css'
import { query, where, getDocs, collection, orderBy, limit } from "firebase/firestore";
import { useState } from "react";
import { Edit2, Trash } from 'iconsax-react'
import { db } from '@/firebase/fire_config';
import toCurrency from '@/components/utils/toCurrency'
import Link from 'next/link';
import UpdateSearchProduct from '@/components/dashboard/products/update_search';
import Loader from '@/components/loader/loader';

export default function ProductSearch() {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const onSearch = async (e) => {
        setSearchTerm(e.target.value)

        if (searchTerm.length > 0) {
            const q = query(
                collection(db, "products"),
                where("name_query", ">=", searchTerm.toLowerCase()),
                where("name_query", "<=", searchTerm.toLowerCase() + "\uf8ff"),
                orderBy("name_query"),
                limit(10)
            );

            const querySnapshot = await getDocs(q);
            const results = [];

            querySnapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                    addedOn: doc.data().addedOn.toDate().toLocaleDateString()
                });
            });

            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

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
        <>
            <div className={`${styles.search_form} me-auto mb-2 mb-md-0`}>
                <input
                    className={`form-control ${styles.input_search}`}
                    type="search"
                    placeholder="Search Product By Name"
                    aria-label="Search Product By Name"
                    value={searchTerm}
                    onChange={onSearch}
                />
            </div>

            {searchResults.length > 0 && searchTerm.length > 0 &&
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
                            {searchResults.length > 0 && searchResults.map((result) => (
                                <tr key={result.id}>
                                    <th scope="row">
                                        <img
                                            src={result.image}
                                            alt={result.name}
                                            width={50}
                                            height={50}
                                            style={{ objectFit: "cover" }}
                                            className="rounded border"
                                        />
                                    </th>
                                    <td className="d-table-cell align-middle">
                                        <Link href={`/product/${result.id}`} target="_blank" className="text-decoration-none secondary">{result.name}</Link>
                                    </td>
                                    <td className="d-table-cell align-middle">{toCurrency(result.price)}</td>
                                    <td className="d-table-cell align-middle">{result.isHealth ? "Nutrition" : "Food"}</td>
                                    <td className="d-table-cell align-middle">
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#updateSearchProduct" onClick={() => { setSelectedProduct(result) }} className="btn btn-sm border_none btn-warning">
                                            Edit <Edit2 />
                                        </button>
                                    </td>
                                    <td className="d-table-cell align-middle">
                                        <button onClick={() => { onDeleteProduct(result.id) }} className="btn btn-sm border_none btn-danger">
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

            <UpdateSearchProduct product={selectedProduct} />
        </>
    )
}
