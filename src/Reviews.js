import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import AddReview from './AddReview';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Reviews() {
    const [reviews, setReviews] = useState([]); //array of reviews
    const [likes, setLikes] = useState(0); //counter for faves
    const [disLikes, setDislikes] = useState(0)
    const [editingReview, setEditingReview] = useState(null); //review currently editing
    const [show, setShow] = useState(false);// control the modal
    const { getAccessTokenSilently } = useAuth0();
    const { isAuthenticated } = useAuth0();
    
    useEffect(() => {
        fetchReviews(); //runs the func when first rendered
    }, []);

    function reviewLikes() {
        setLikes(likes + 1)
    }
    function reviewdisLikes() {
        setDislikes(disLikes + 1)
    }

    const fetchReviews = async () => { //sends the get req to fethc rev from server
        try {
            const token = await getAccessTokenSilently({
                audience: 'bitteruserapi',
                scope: 'openid profile email'
            });
            const response = await axios.get('http://localhost:3001/post',
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
            );
            setReviews(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    const handleReviewSubmit = async (review) => { // accepts the obj, sends post req to http to add review to server and
        //refetches the reviews
        try {
            const token = await getAccessTokenSilently({
                audience: 'bitteruserapi',
                scope: 'openid profile email'
            });

            const response = await axios.post('http://localhost:3001/post', review,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
            );
            if (response.status === 200) {

                fetchReviews();

            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleReviewDelete = async (postId) => { //accepts postId, sends the delete req to delete the review with the id, refetches
        try {
            const token = await getAccessTokenSilently({
                audience: 'bitteruserapi',
                scope: 'openid profile email'
            });

            const response = await axios.delete(`http://localhost:3001/post/${postId}`
                , {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
            );
            if (response.status === 200) {

                fetchReviews();

            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleReviewEdit = (review) => { //accepts the review obj, stores the review in editting rev state variable, sets show to true, which triggers the modal for adding a review

        setEditingReview(review);
        setShow(true)
    };
    const handleShow = () => setShow(true); // sets show to true which triggers modal for adding review

    return (
        <div>
            <div><AddReview //this components edits and adds reviews, passing down props
                handleReviewSubmit={handleReviewSubmit}
                editingReview={editingReview}
                fetchReviews={fetchReviews}
                onReviewEdit={setEditingReview}
                handleShow={handleShow}
                setShow={setShow}
                show={show}
                onHide={() => setShow(false)}
            /></div>

            <div className="cards">
                {reviews.length > 0 ? ( //map iterates over each review and creates a card with buttons
                    reviews.map((review) => (
                        <div key={review._id} >
                            <Card key={review._id}>
                                <Card.Body>
                                    <Card.Title> {review.title} </Card.Title>
                                    <Card.Subtitle>{review.category}</Card.Subtitle>
                                    <Card.Text>{review.description}</Card.Text>
                                    <p>{review.rating}/5</p>
                                </Card.Body>
                                {isAuthenticated && (

                                    <div className='cardButtons'>
                                        <Button variant="primary" onClick={() => { handleReviewEdit(review); }}>
                                            Edit Review
                                        </Button>
                                        <Button variant='danger' onClick={() => handleReviewDelete(review._id)}>Delete Review</Button>
                                        <Button variant='primary' onClick={reviewLikes}>👍{likes}</Button>
                                        <Button variant='primary' onClick={reviewdisLikes}>👎{disLikes}</Button>

                                    </div>
                                )}
                            </Card>
                        </div>
                    ))
                ) : (
                    <h3>No reviews found. Log-in and Post a review!</h3>
                )}
            </div>
        </div>
    );
}