import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalFooter from 'react-bootstrap/ModalFooter';

const WalletLogin = ({ wallet }) => {
    
    return (
        <Container fluid>
            <Row>
                <Col md="3" />
                <Col md="6">
                    <Card>
                        <Card.Body className="mx-4">
                            <div className="text-center">
                                <h3 className="dark-grey-text mb-5">
                                    <strong>Sign in with your NEAR Wallet</strong>
                                </h3>
                            </div>
                            <div className="text-center mb-3">
                                <Button
                                    type="button"
                                    gradient="blue"
                                    rounded
                                    className="Button-block z-depth-1a"
                                    onClick={() => wallet.signIn()}
                                >
                                    Sign in
                                </Button>
                            </div>
                        </Card.Body>
                        <ModalFooter className="mx-5 pt-3 mb-1">
                            <p className="font-small grey-text d-flex justify-content-end">
                                Not a member?
                                <a href="https://wallet.near.org/create" className="blue-text ml-1">
                                    Create wallet
                                </a>
                            </p>
                        </ModalFooter>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WalletLogin;