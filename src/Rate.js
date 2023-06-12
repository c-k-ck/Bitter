import React from 'react'
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Rating from 'react-rating-stars-component';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';


export default function Rate() {
    const [showModal, setShowModal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Reset form fields
        setTitle('');
        setDescription('');
        setRating(0);
        // Hide the form after submission
        setShowForm(false);
        setShowModal(false)
    };

    return (
        <div>
            {/* <Form className='RateAndReviewForm'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control />

                </Form.Group>
                <FormGroup>
                    <FormLabel>Review</FormLabel>
                    <FormControl></FormControl>
                </FormGroup>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Rating
                        count={5} // Number of stars
                        size={24} // Size of each star
                        activeColor="#ffd700" // Color of the active star
                        emptyColor="#e4e4e4" // Color of the inactive star
                        value={0} // Initial rating value (set as 0 for no initial rating)

                    />
                </div>
                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form> */}

            {/* this showModal checks if the show form is false and if it is false it renders the button componenet */}
            {!showModal && (
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add Bitter🤬
                </Button>
            )}
            {/* this showModal checks if showform is true and will render the form componenet */}
            {showModal && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className='RateAndReviewForm' onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>

                            <FormGroup>
                                <FormLabel>Review</FormLabel>
                                <FormControl></FormControl>
                            </FormGroup>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Rating
                                    count={5} // Number of stars
                                    size={24} // Size of each star
                                    activeColor="#ffd700" // Color of the active star
                                    emptyColor="#e4e4e4" // Color of the inactive star
                                    value={rating}
                                    onChange={(newRating) => setRating(newRating)}
                                />
                            </div>

                            <Button variant="primary" type="submit">
                                Post
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>


            )}

        </div>
    )
}
