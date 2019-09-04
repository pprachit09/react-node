import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Card from "../homepage/Card";
import { readProduct, listRelatedProduct } from "../../api/apiCore";

const Product = props => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    readProduct(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError(false);
        setProduct(data);
        listRelatedProduct(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <div>
      <Layout
        title={product && product.name}
        description={product && product.description}
      />
      <div className="row">
        <div className="col l5 offset-l3">
          <div className="container">
            {product && product.description && (
              <Card product={product} showViewButton={false} />
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <h4>Related Products</h4>
        {relatedProducts &&
          relatedProducts.map(product => (
            <div key={product._id} className="col l3 offset=l1">
              <Card product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Product;
