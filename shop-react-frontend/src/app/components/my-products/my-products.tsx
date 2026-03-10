import { useEffect, useState } from "react";
import "./my-products.scss";
import { ProductForm } from "./product-form/product-form";
import { fetchCategoriesList, fetchMyProductsList, fetchProductsList } from "../../api/products.api";
import { ProductCategory, ProductData } from "../../models/products.model";
import { environment } from "../../../environments/environment";

export const MyProducts = () => {

    const [ productFormPopup, setProductFormPopup ] = useState<{ active: boolean, productId: number }>({ active: false, productId: null });
    const [ categoriesList, setCategoriesList ] = useState<ProductCategory[]>([]);
    const [ productsList, setProductsList ] = useState<ProductData[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const categories = await fetchCategoriesList();
            setCategoriesList(categories.data);
            const products = await fetchMyProductsList();
            setProductsList(products.data);
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }


    return <>
        <div className="my-products-container">
            <div className="my-products-header">
                <h1>Products List</h1>
                <button className="new-product-btn" onClick={() => setProductFormPopup({ active: true, productId: null })}>Add New Product</button>
            </div>

            <div className="my-products-list">
                {productsList.map(product => <div key={product.id} className="product-card">
                    <h2 className="product-name">{product.name}</h2>
                    <img className="product-image" src={environment.baseUrl + product.imageUrl} alt={product.name}></img>
                    <div className="product-category">{product.category?.name}</div>
                    <div className="product-description">{product.description}</div>
                    <div className="product-price">{product.price}$</div>
                </div>)}
            </div>
        </div>

        {productFormPopup.active && <ProductForm
            productId={productFormPopup.productId}
            categoriesList={categoriesList}
            fetchData={() => fetchData()}
            closePopup={() => setProductFormPopup({ active: false, productId: null })}
        ></ProductForm>}
    </>
}