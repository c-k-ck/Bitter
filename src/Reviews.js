import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import AddReview from './AddReview';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Reviews() {
   const [reviews, setReviews] = useState([]);
   const { getAccessTokenSilently } = useAuth0();

   useEffect(() => {
    fetchReviews();
}, []);

   const fetchReviews = async () =>{
    try {
        const token = await getAccessTokenSilently({
            audience: '',
            scope: 'openid profile email'
          });
          const response = await axios.get('http://localhost:3000/reviews',{
            headers: {
                authorization: `Bearer ${token}`,
              }
          });
          setReviews(response.data)
    } catch (error) {
        console.log(error);
    }
   };
  
   const handleReviewSubmit = async (review) =>{
    try {
        const token = await getAccessTokenSilently({
            audience: '',
            scope: 'openid profile email'
          });

          const response = await axios.post('http://localhost:3000/reviews', review, {
            headers: {
                authorization: `Bearer ${token}`,
              }
          });
          if (response.status === 200) {
            // If the delete is successful, call `fetchBooks` again to get the updated list
            fetchReviews();
           
          }
    } catch (error) {
        console.log(error);
    }
   }
  
  
    return (
      <>
      {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Card style={{ width: '18rem' }} key={review.id}>
                        <Card.Body>
                            <h2> {review.title} </h2>
                            <p>{review.description}</p>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <h3>No reviews found. Post a review!</h3>
            )}
            <div><AddReview onSubmit={handleReviewSubmit} fetchReviews={fetchReviews} /></div>
        </>
    );
}