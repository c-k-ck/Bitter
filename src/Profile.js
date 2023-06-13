import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profileData, setProfileData] = useState(null);
  const [editingProfile, setEditingprofile] = useState(false);
  const [givenProfileData, setGivenProfileData] = useState({ age: '', hometown: '' });
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {

    const fetchProfileData = async () => {

      try {
        const token = await getAccessTokenSilently({
          audience: 'bitteruserapi', 
          scope: 'open profile email',
        });
        console.log(token);
        if (isAuthenticated) {
          const response = await axios.get('http://localhost:3001/user', {
            params: { email: user.email },
            headers: {
              authorization: `Bearer ${token}`,
            }
          })
          setProfileData(response.data);
          setGivenProfileData(response.data);
        }

      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    };
    fetchProfileData();

  }, [isAuthenticated, user]);

  const handleProfileUpdate = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'bitteruserapi', 
        scope: 'open profile email',
      });
      const response = await axios.post('http://localhost:3001/user', { email: user.email, ...givenProfileData }, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      console.log('Profile udpated!', response);
      setProfileData(givenProfileData);// updates local profile data with submitted changes
      setEditingprofile(false);//we are no longer editing
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  const handleAgeandHometownChange = (event, field) => {
    setProfileData({ ...profileData, [field]: event.target.value })
  }; //spreading to create a new object with all old properties, field is using computed property names and we can use a variable as a property name

  if (isLoading) {
    return <div>Loading...</div>
  }
  console.log(isAuthenticated)
  return (
    isAuthenticated && profileData && (
      <div>
        <Card>
          <Card.Img variant="top" src={user.picture} alt={user.name} />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
              Profile Information goes here.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{user.email}</ListGroup.Item>
            <ListGroup.Item>
              {editingProfile ?
                <input value={givenProfileData.age} onChange={(event) => handleAgeandHometownChange(event, 'age')} />
                : profileData.age}
            </ListGroup.Item>
            <ListGroup.Item>
              {editingProfile ?
                <input value={givenProfileData.hometown} onChange={(event) => handleAgeandHometownChange(event, 'hometown')} />
                : profileData.hometown}
            </ListGroup.Item>
          </ListGroup>
          {editingProfile ?
            <Button variant="primary" onClick={handleProfileUpdate}>Save Changes</Button>
            : <Button variant="primary" onClick={() => setEditingprofile(true)}>Edit Profile</Button>
          }
        </Card>
      </div>
    )
  );
};

export default Profile;