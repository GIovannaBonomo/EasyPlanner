import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Easy Planner</h5>  
          </Col>
          <Col md={6} className="text-md-end">
            <p>© 2025 Tutti i diritti riservati</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;