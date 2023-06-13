import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function AddReview({
    editingReview, // the review currently being edited, or null if a new review is being added.
    fetchReviews, //fetches the updated reviews from server
    onReviewEdit, //function set to review being edited
    handleShow, //opens the modal
    setShow, //controls the modal
    show, //is the modal visible
    onHide }) {  //closes modal



    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const { isAuthenticated } = useAuth0();

    // used to populate the form fields with the editing review data when a review is being edited or clear them if a new review is being added
    useEffect(() => {
        console.log(editingReview);
        if (editingReview) {
            setCategory(editingReview.category || '');
            setTitle(editingReview.title || '');
            setDescription(editingReview.description || '');
            setRating(editingReview.rating || '');
        } else {
            setCategory('');
            setTitle('');
            setDescription('');
            setRating('');
        }
    }, [editingReview]);

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        //creates a review obj and sends a Post req to add a new review or a put req to update a review
        //it gets teh latest reviews, hides the modal, and resets editingreview
        try {
            const token = await getAccessTokenSilently({
                audience: 'bitteruserapi', //add identifier from auth0,
                scope: 'open profile email',
            });

            const review = { category, title, description, rating };

            if (editingReview) {
                await axios.put(`http://localhost:3001/post/${editingReview._id}`, review, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                });
                console.log('Review updated successfully')
            } else {

                await axios.post("http://localhost:3001/post", review,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        }
                    });
                console.log("Review submit successfull");
            }
            fetchReviews();
            setShow(false);
            onReviewEdit(null); // resetting editing review

        } catch (error) {
            console.log(error);
        }
    }
    const handleClose = () => setShow(false);
    return (
        <>
            {isAuthenticated && (
                <div>

                    <Button variant="primary" onClick={handleShow}>
                        Add Review
                    </Button>

                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Leave a Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleReviewSubmit} >
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
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Your Review:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rating:</Form.Label>
                                    <Form.Select
                                        value={rating}
                                        onChange={(event) => setRating(event.target.value)}
                                    >
                                        <option value="1">⭐️</option>
                                        <option value="2">⭐️⭐️</option>
                                        <option value="3">⭐️⭐️⭐️</option>
                                        <option value="4">⭐️⭐️⭐️⭐️</option>
                                        <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button type="submit">Submit Review</Button>
                            </Form>
                        </Modal.Body>
                    </Modal> 
                    <p>You don't have any reviews yet. Post a review!</p>
                </div> 
            )}
        </>
    );
}