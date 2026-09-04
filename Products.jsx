import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Products() {
    const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Something went wrong while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['all', ...new Set(products.map((product) => product.category))];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const formatCategory = (category) =>
    category === 'all' ? 'ALL CATEGORIES' : category.toUpperCase();

  if (loading) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto my-5">
        <span className="visually-hidden">Loading Products...</span>
      </Spinner>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">OUR PRODUCTS</h2>

      <div className="mb-4 d-flex justify-content-center">
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ maxWidth: '300px' }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {formatCategory(category)}
            </option>
          ))}
        </Form.Select>
      </div>

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <div className="card h-100 shadow-sm">
              <div className="p-3 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <img
                  src={product.image}
                  className="card-img-top img-fluid"
                  alt={product.title}
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <span className="text-muted small mb-2">{product.category.toUpperCase()}</span>
                <h5 className="card-title text-truncate" title={product.title}>
                  {product.title}
                </h5>
                <p
                  className="card-text text-muted small"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.description}
                </p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fs-5 fw-bold text-success">${product.price.toFixed(2)}</span>
                  <button className="btn btn-primary btn-sm" onClick={() => navigate(`/productdetail/${product.id}`)}>
                    Details
                  </button>
                  <button className="btn btn-primary btn-sm">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
