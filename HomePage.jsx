import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function HomePage() {
  const navigate = useNavigate();

  return (
    <section
      className="bg-light"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 0'
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-center gy-4">
          <Col lg={5} className="d-flex">
            <div
              style={{
                width: '100%',
                maxWidth: '520px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <div
                className="text-primary fw-semibold mb-3"
                style={{ letterSpacing: '0.08rem', textTransform: 'uppercase', fontSize: '0.8rem' }}
              >
                Isaiah's Store / Established 2026
              </div>

              <h1
                className="fw-bold mb-3"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: '1.1' }}
              >
                The New Era of Shopping Has Arrived
              </h1>

              <p
                className="text-muted mb-4"
                style={{ fontSize: '1.08rem', lineHeight: '1.7' }}
              >
                Discover the best products at unbeatable prices. Order now and save!
                We give returning customers a special discount.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <button
                  className="btn btn-primary btn-lg rounded-pill px-4"
                  onClick={() => navigate('/products')}
                >
                  Shop Now
                </button>

                <button
                  className="btn btn-outline-secondary btn-lg rounded-pill px-4"
                  onClick={() => navigate('/addproducts')}
                >
                  + Add Product
                </button>
              </div>
            </div>
          </Col>

          <Col lg={5} className="d-flex">
            <div
              style={{
                width: '100%',
                maxWidth: '520px',
                margin: '0 auto'
              }}
            >
              <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                <Card.Header
                  className="bg-primary text-white fw-bold"
                  style={{ fontSize: '1.1rem', padding: '1rem 1.25rem' }}
                >
                  What We Offer
                </Card.Header>

                <ListGroup variant="flush">
                  <ListGroup.Item className="py-3 px-4">
                    ⚡ Lightning fast service and delivery
                  </ListGroup.Item>
                  <ListGroup.Item className="py-3 px-4">
                    💰 Competitive pricing on all products
                  </ListGroup.Item>
                  <ListGroup.Item className="py-3 px-4">
                    🌟 High-quality products guaranteed
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HomePage;