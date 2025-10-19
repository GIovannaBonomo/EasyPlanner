import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
      <Container className='mt-2'>
        <Row>
          <Col md={6}>
            <h5>Easy Planner</h5>  
          </Col>
          <Col md={6} className="text-md-end">
            <p>© 2025 Tutti i diritti riservati</p>
          </Col>
        </Row>
      </Container>
  );
}

export default Footer;