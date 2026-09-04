import { useState } from "react";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "electronics",
  });

  const [loading, setLoading] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);
  const [error, setError] = useState(null);

  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCreatedProduct(null);

    // Payload excludes image URL
   // ...existing code...

const payload = {
  title: formData.title,
  price: parseFloat(formData.price),
  description: formData.description,
  category: formData.category,
  image: "https://placehold.co/300x300?text=Product",
};

// ...existing code...

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add the product. Please try again.");
      }

      const data = await response.json();
      setCreatedProduct(data);

      // Reset form on success
      setFormData({
        title: "",
        price: "",
        description: "",
        category: "electronics",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Add New Product</h2>

              {/* Error Alert */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError(null)}
                  ></button>
                </div>
              )}

              {/* Success Confirmation Alert */}
              {createdProduct && (
                <div className="alert alert-success" role="alert">
                  <h5 className="alert-heading mb-2">Product Created Successfully!</h5>
                  <p className="mb-1"><strong>Assigned ID:</strong> {createdProduct.id}</p>
                  <p className="mb-1"><strong>Title:</strong> {createdProduct.title}</p>
                  <p className="mb-1"><strong>Price:</strong> ${Number(createdProduct.price).toFixed(2)}</p>
                  <p className="mb-1"><strong>Category:</strong> {createdProduct.category}</p>
                  <p className="mb-0"><strong>Description:</strong> {createdProduct.description}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Product Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-semibold">
                    Product Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="e.g., Casual Cotton T-Shirt"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category Selection */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label fw-semibold">
                    Category
                  </label>
                  <select
                    className="form-select text-capitalize"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label htmlFor="price" className="form-label fw-semibold">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label htmlFor="description" className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Enter detailed product description..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Submitting...
                    </>
                  ) : (
                    "Create Product"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

