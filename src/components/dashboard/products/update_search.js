import styles from '@/components/account/Account.module.css'
import { useState } from 'react';
import { db } from '@/firebase/fire_config';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage();

export default function UpdateSearchProduct({ product }) {
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isHealth, setIsHealth] = useState(null);
    const [description, setDescription] = useState("");

    const onupdateSearchProduct = async event => {
        event.preventDefault();
        setLoading(true);

        if (selectedImage != null) {
            setLoadingMsg("uploading image")

            const imageRef = ref(storage, `product_images/${selectedImage.name}`);
            await uploadBytes(imageRef, selectedImage);

            await getDownloadURL(imageRef).then(async (image) => {
                setLoadingMsg("updating product")

                const docRef = doc(db, "products", product.id);
                await updateDoc(docRef, {
                    "image": image != null ? image : product.image,
                    "name": name.length <= 0 ? product.name : name,
                    "name_query": name.length <= 0 ? product.name_query : name.toLowerCase(),
                    "price": price.length <= 0 ? product.price : price,
                    "isHealth": isHealth != null ? isHealth : product.isHealth,
                    "description": description.length <= 0 ? product.description : description,
                }).then(() => {
                    toast.success(`Updated ${name.length <= 0 && product.name}`);
                    setLoading(false);
                    setLoadingMsg("");
                }).catch((error) => {
                    if (error.code == "not-found") {
                        toast.error("Product not found");
                        setLoading(false);
                        setLoadingMsg("");
                    } else {
                        toast.error(`Something is wrong: ${error.message}`);
                        setLoading(false);
                        setLoadingMsg("");
                    }
                });
            }).catch((error) => {
                toast.error(`Something is wrong: ${error.message}`);
                setLoading(false);
                setLoadingMsg("");
            });
        } else {
            setLoadingMsg("updating product")

            const docRef = doc(db, "products", product.id);
            await updateDoc(docRef, {
                "image": product.image,
                "name": name.length <= 0 ? product.name : name,
                "name_query": name.length <= 0 ? product.name_query : name.toLowerCase(),
                "price": price.length <= 0 ? product.price : price,
                "isHealth": isHealth != null ? isHealth : product.isHealth,
                "description": description.length <= 0 ? product.description : description,
            }).then(() => {
                toast.success(`Updated ${name.length <= 0 && product.name}`);
                setLoading(false);
                setLoadingMsg("");
            }).catch((error) => {
                if (error.code == "not-found") {
                    toast.error("Product not found");
                    setLoading(false);
                    setLoadingMsg("");
                } else {
                    toast.error(`Something is wrong: ${error.message}`);
                    setLoading(false);
                    setLoadingMsg("");
                }
            });
        }
    };

    return (
        <div className="modal fade" id="updateSearchProduct" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="updateSearchProductLabel" aria-hidden="true" >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateSearchProductLabel">Update Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={onupdateSearchProduct}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-floating">
                                        <input type="file"
                                            className="form-control"
                                            id="image"
                                            placeholder="Image (option)"
                                            onChange={(event) => setSelectedImage(event.target.files[0])}
                                        />
                                        <label htmlFor="image">Image (option)</label>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-floating">
                                        <input type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Name (option)"
                                            defaultValue={product?.name ?? name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                        <label htmlFor="name">Name (option)</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-6">
                                    <div className="form-floating">
                                        <input type="text"
                                            className="form-control"
                                            id="price"
                                            placeholder="Price (option)"
                                            defaultValue={product?.price ?? price}
                                            onChange={(event) => setPrice(event.target.value)}
                                        />
                                        <label htmlFor="price">Price (option)</label>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            id="type"
                                            defaultValue={product?.isHealth ?? isHealth}
                                            onChange={(event) => setIsHealth(event.target.value === "true")}
                                        >
                                            <option value={false}>Food</option>
                                            <option value={true}>Nutrition</option>
                                        </select>
                                        <label htmlFor="type">Type</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <div className="form-floating">
                                    <textarea className="form-control"
                                        placeholder="Description (option)"
                                        id="description"
                                        style={{ height: "200px" }}
                                        defaultValue={product?.description ?? description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    ></textarea>
                                    <label htmlFor="description">Description (option)</label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="submit" className={`btn btn-lg btn-success ${styles.btn_nav}`}>
                                {loading
                                    ? <div className="d-flex">
                                        <small className="white mx-2">{loadingMsg}</small> <Loader />
                                    </div>
                                    : "Update Product"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}