import styles from '@/components/account/Account.module.css'
import { useState } from 'react';
import { db } from '@/firebase/fire_config';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage();

export default function CreateProduct() {
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isHealth, setIsHealth] = useState(false);
    const [description, setDescription] = useState("");

    const onCreateProduct = async event => {
        event.preventDefault();
        setLoading(true);
        setLoadingMsg("uploading image")

        const imageRef = ref(storage, `product_images/${selectedImage.name}`);
        await uploadBytes(imageRef, selectedImage);

        await getDownloadURL(imageRef).then(async (image) => {
            setLoadingMsg("adding product")

            const docRef = doc(collection(db, "products"))
            const newProduct = {
                id: docRef.id,
                image: image,
                name: name,
                name_query: name.toLowerCase(),
                price: parseFloat(price),
                isHealth: isHealth,
                numOfDonation: 0,
                description: description,
                addedOn: serverTimestamp(),
            };

            await setDoc(docRef, newProduct).then(() => {
                toast.success(`Added New Product ${name}`);
                setLoading(false);
                setLoadingMsg("");
            }).catch((error) => {
                toast.error(`Something is wrong: ${error.message}`);
                setLoading(false);
                setLoadingMsg("");
            });
        }).catch((error) => {
            toast.error(`Something is wrong: ${error.message}`);
            setLoading(false);
            setLoadingMsg("");
        });
    };

    return (
        <div className="modal fade" id="createProduct" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createProductLabel" aria-hidden="true" >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createProductLabel">Create New Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={onCreateProduct}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-floating">
                                        <input type="file"
                                            className="form-control"
                                            required
                                            id="image"
                                            placeholder="Image"
                                            onChange={(event) => setSelectedImage(event.target.files[0])}
                                        />
                                        <label htmlFor="image">Image</label>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-floating">
                                        <input type="text"
                                            className="form-control"
                                            required
                                            id="name"
                                            placeholder="Name"
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-6">
                                    <div className="form-floating">
                                        <input type="text"
                                            className="form-control"
                                            required
                                            id="price"
                                            placeholder="Price"
                                            onChange={(event) => setPrice(event.target.value)}
                                        />
                                        <label htmlFor="price">Price</label>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            required
                                            id="type"
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
                                    <textarea
                                        className="form-control"
                                        required
                                        placeholder="Description"
                                        id="description"
                                        style={{ height: "200px" }}
                                        onChange={(event) => setDescription(event.target.value)}
                                    ></textarea>
                                    <label htmlFor="description">Description</label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="submit" className={`btn btn-lg btn-success ${styles.btn_nav}`}>
                                {loading
                                    ? <div className="d-flex">
                                        <small className="white mx-2">{loadingMsg}</small> <Loader />
                                    </div>
                                    : "Add Product"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}