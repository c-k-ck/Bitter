import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profileData, setProfileData] = useState(null);
  const [editingProfile, setEditingprofile] = useState(false);
  const [age, setAge] = useState({age: ''});
  const [hometown, setHometown] = useState({hometown: ''});
  const [newUser, setNewUser] = useState(false);
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
          });
          if (response.data) {
            setProfileData(response.data);
            setNewUser(false);

          } else {
            setNewUser(true);
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
        
      }

    };
    fetchProfileData();

  }, [isAuthenticated, user]);

  const handleAgeChange = (event) => {
    setAge({ age: event.target.value });
  };//spreading to create a new object with all old properties, field is using computed property names and we can use a variable as a property name
  
  const handleHometownChange = (event) => {
    setHometown({ hometown: event.target.value });
  };
  const handleProfileUpdate = async () => {
    const updatedProfileData ={
      age: age.age,
      hometown: hometown.hometown,
    };
    try {
      const token = await getAccessTokenSilently({
        audience: 'bitteruserapi',
        scope: 'open profile email',
      });
      const response = await axios.post('http://localhost:3001/user', { email: user.email, ...updatedProfileData }, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      console.log('Profile udpated!', response);
      setProfileData(updatedProfileData);// updates local profile data with submitted changes
      setEditingprofile(false);//we are no longer editing
    } catch (error) {
      console.error('Error updating profile', error);
      console.error('Error updating profile:', error.message);
      console.error('Server response:', error.response.data);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>
  }
  if(newUser){
    return (
      <div>
        <Card className="cards">
          <Card.Img variant="top" src={user.picture} alt={user.name} />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
              Please enter profile your profile information.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{user.email}</ListGroup.Item>
            <ListGroup.Item>
              
                <p>Age:</p>
                <input type='text' value={age.age} onChange={handleAgeChange} />
            </ListGroup.Item>
            <ListGroup.Item>
            <p>Hometown:</p>
                <input type='text' value={hometown.hometown} onChange={handleHometownChange} />
               
            </ListGroup.Item>
          </ListGroup>
            <Button variant="primary" onClick={handleProfileUpdate}>Save Changes</Button>          
        </Card>
      </div>
    )
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
                <input type='text' value={age.age} onChange={handleAgeChange} />
                :( profileData && profileData.age)}
            </ListGroup.Item>
            <ListGroup.Item>
              {editingProfile ?
                <input type='text' value={hometown.hometown} onChange={handleHometownChange} />
                : ( profileData && profileData.hometown)}
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