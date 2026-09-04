import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Button, Form, 
  Badge, Spinner, Alert, Modal, InputGroup 
} from 'react-bootstrap';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  
  
  const [quantity, setQuantity] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ show: false, text: '', variant: 'success' });

  // Fetch product data on mount
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setEditedProduct(data); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Editing Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    });
  };

  // Save changes locally
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setProduct(editedProduct);
    setIsEditing(false);
    showAlert('Product updated successfully!', 'success');
  };

  // Handle Local Deletion Simulation
  const handleDeleteProduct = () => {
    setShowDeleteModal(false);
    showAlert('Product deleted successfully! Redirecting...', 'danger');
    setTimeout(() => {
      navigate('/'); // Redirect back to the store homepage
    }, 2000);
  };

  // Handle Add to Shopping Cart Action
  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    showAlert(`Added ${quantity} item(s) to your shopping cart!`, 'success');
  };

  // Utility to handle temporary banner alerts
  const showAlert = (text, variant) => {
    setAlertMessage({ show: true, text, variant });
    setTimeout(() => setAlertMessage({ ...alertMessage, show: false }), 3000);
  };

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="primary" role="status" />
        <p className="mt-3 text-muted">Fetching product information...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">Error: {error}</Alert>
        <Button variant="secondary" onClick={() => navigate('/')}>Back to Shop</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {alertMessage.show && (
        <Alert variant={alertMessage.variant} dismissible onClose={() => setAlertMessage({ show: false })}>
          {alertMessage.text}
        </Alert>
      )}

      <Row className="g-4">
        {/* Product Image Display */}
        <Col md={6} className="d-flex align-items-center justify-content-center bg-white p-4 border rounded shadow-sm">
          <img 
            src={product.image} 
            alt={product.title} 
            className="img-fluid" 
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </Col>

        {/* Product Details */}
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4 d-flex flex-column justify-content-between">
              
              {isEditing ? (
                /* Editing Form */
                <Form onSubmit={handleSaveChanges}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Product Title</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="title" 
                      value={editedProduct.title} 
                      onChange={handleInputChange} 
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Price ($)</Form.Label>
                    <Form.Control 
                      type="number" 
                      step="0.01" 
                      name="price" 
                      value={editedProduct.price} 
                      onChange={handleInputChange} 
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Category</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="category" 
                      value={editedProduct.category} 
                      onChange={handleInputChange} 
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Description</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4} 
                      name="description" 
                      value={editedProduct.description} 
                      onChange={handleInputChange} 
                      required
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="success" type="submit" className="w-50">Save Changes</Button>
                    <Button variant="secondary" className="w-50" onClick={() => { setIsEditing(false); setEditedProduct(product); }}>Cancel</Button>
                  </div>
                </Form>
              ) : (
                /* Details View */
                <>
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Badge bg="secondary" className="text-uppercase px-2 py-1 mb-2">
                        {product.category}
                      </Badge>
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="outline-primary" onClick={() => setIsEditing(true)}>Edit Details</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
                      </div>
                    </div>
                    
                    <Card.Title as="h2" className="mb-3 fw-bold">{product.title}</Card.Title>
                    <Card.Text as="h3" className="text-success fw-bold mb-3">
                      ${product.price?.toFixed(2)}
                    </Card.Text>
                    <hr />
                    <Card.Text className="text-muted" style={{ lineHeight: '1.2' }}>
                      {product.description}
                    </Card.Text>
                  </div>

                  {/* Shopping Cart Addition */}
                  <div className="mt-4 pt-3 border-top">
                    <Row className="align-items-center g-3">
                      <Col xs={4} sm={3}>
                        <Form.Label className="small fw-bold mb-1">Quantity</Form.Label>
                        <InputGroup>
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                          >-</Button>
                          <Form.Control 
                            className="text-center p-1"
                            value={quantity} 
                            readOnly 
                          />
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => setQuantity(prev => prev + 1)}
                          >+</Button>
                        </InputGroup>
                      </Col>
                      <Col xs={8} sm={9} className="d-grid mt-4">
                        <Button variant="warning" className="fw-bold" onClick={handleAddToCartClick}>
                          🛒 Add to Shopping Cart
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </>
              )}

            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Confirm Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirm Product Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to completely remove <strong>{product?.title}</strong> from the store application listing? This action cannot be reversed.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Keep Product
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Permanently Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductDetail;
