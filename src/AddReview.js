import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function AddReview({fetchReviews}) {  //geting the function via props


    const [show, setShow] = useState(false); // For toggling the Modal
    const [category, setCategory] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    const [userReview, setUserReview] = useState('');
    const [rating, setRating] = useState('');
    const { getAccessTokenSilently } = useAuth0();

    // Functions to handle the closing/opening of the Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const token = await getAccessTokenSilently({
                audience: 'api identifier', //add identifier from auth0,
                scope: 'open profile email',
            });

            const review = { category, reviewTitle, userReview, rating };
            const response = await axios.post("http://localhost:3000/reviews", review, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                console.log("Review submit successfull");
                fetchReviews();
                console.log(fetchReviews())
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Review
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Leave a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleReviewSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Category:</Form.Label>
                            <Form.Select
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                            >
                                <option value="Restaurants & Food">#BiteSizedReviews 🍔</option>
                                <option value="Movies & Entertainment">#CinemaCritic 🍿</option>
                                <option value="Retail & Shopping">#RetailShowdown 🛍️</option>
                                <option value="Travel & Hospitality">#TravelTrials ✈️</option>
                                <option value="Education & Learning">#EducationEvaluations 🎓</option>
                                <option value="Jobs & Workplaces">#TheOfficeChronicles 💼</option>
                                <option value="Public Services & Government">#GovernmentGripes 🏛️</option>
                                <option value="Healthcare Services">#HealthcareHeroes&Hurdles 🩺</option>
                                <option value="Other">#TheUncharted 🎭</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Review Title:</Form.Label>
                            <Form.Control
                                type="text"
                                value={reviewTitle}
                                onChange={(event) => setReviewTitle(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Your Review:</Form.Label>
                            <Form.Control
                                type="text"
                                value={userReview}
                                onChange={(event) => setUserReview(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rating:</Form.Label>
                            <Form.Select
                                value={rating}
                                onChange={(event) => setRating(event.target.value)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit">Submit Review</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}