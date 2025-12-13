import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import "../Styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?id=${id}`)
      .then(res => res.json())
      .then(data => setProduct(data[0]))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAdd = () => {
    if (!size || !color) {
      alert("Please choose size and color");
      return;
    }

    addToCart({
      ...product,
      chosenSize: size,
      chosenColor: color
    });

    alert("Added to cart!");
  };

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["Black", "White", "Red", "Blue"];

  return (
    <main className="product-details-container">
      <div className="product-images">
        <img src={product.image_url} alt={product.name} />
      </div>

      <div className="product-info-section">
        <h1>{product.name}</h1>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price}</p>

        {/* SIZE */}
        <h3>Size</h3>
        <div className="size-options">
          {sizes.map(s => (
            <button
              key={s}
              className={size === s ? "active-option" : ""}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* COLOR */}
        <h3>Color</h3>
        <div className="color-options">
          {colors.map(c => (
            <button
              key={c}
              className={color === c ? "active-option" : ""}
              onClick={() => setColor(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <button className="add-to-cart-btn" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </main>
  );
};

export default ProductDetails;
