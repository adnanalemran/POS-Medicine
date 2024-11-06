import {Routes, Route} from "react-router-dom";
import Login from "../Components/login";

function Guest() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>} />

                {/* <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/product-details" element={<ProductDetails/>} />
                <Route path="/cart-summary-checkout" element={<CartCheckout/>} /> */}
                
            </Routes>
        </div>
    );
}

export default Guest;
