import { Card, Col, Container, Row } from "react-bootstrap"

export default function ContactPart1() {
  return (
    <section className="contact-page py-5">
      <Container className="py-4">
        <Row className="align-items-center mb-5">
          <Col lg={3} className="text-center text-lg-start">
          </Col>
          <Col lg={6} className="mt-4 mt-lg-0">
            <Card className="border-0 shadow-sm bg-white">
              <Card.Body>
                <Card.Title className="mb-3" style={{ textAlign: 'center' }}>Support & Information</Card.Title>
                <p style={{ textAlign: 'center' }}className="mb-1 fw-semibold">Phone</p>
                <p style={{ textAlign: 'center' }}className="text-muted mb-3">XXX-XXX XXXX</p>
                <p style={{ textAlign: 'center' }}className="mb-1 fw-semibold">Email</p>
                <p style={{ textAlign: 'center' }}className="text-muted mb-3">ItemParadi@webshop-support.com</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
