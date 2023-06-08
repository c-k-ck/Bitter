# Software Requirements  

## Vision 

Minimum Length: 3-5 sentences

What is the vision of this product?
The Bitter app is a platform designed to bring forth transparency and unbiased opinions about anything and everything - from restaurants and movies, to jobs and personal experiences. The platform leverages a simple, user-friendly interface, where users can easily sign in to post, edit, or delete their personal reviews. These reviews are based on a selection of 5 categories, ensuring diverse coverage of their experiences. The application does not restrict access to only signed-in users; anyone visiting the platform can view all the reviews, thus promoting the sharing of genuine experiences and providing a comprehensive understanding of various topics. The aim is to provide a universal platform for users to express their opinions and for others to gain insights, whether they are making a choice or simply looking for honest reviews.


What pain point does this project solve?
Bitter aims to address the lack of a single, consolidated platform where users can share and access reviews across a diverse array of categories. Often, individuals have to navigate through multiple websites and forums to gain insights or share experiences about different topics, which can be time-consuming and inefficient. By providing a universal platform for sharing and accessing reviews, the application streamlines this process, saving time and offering more diverse perspectives in one place. This solution eliminates the hassle of scattered information and brings a wide range of experiences under one digital roof.


Why should we care about your product?



## Scope (In/Out)  


IN - What will your product do

Describe the individual features that your product will do.
High overview of each. Only need to list 4-5

-User Authentication: Users should be able to register, log in, and log out using secure methods provided by Auth0. 

-Review Posting: Users should be able to create reviews across predefined categories. They should be able to write a review, and optionally attach media (e.g., photos) if desired.

-Review Editing and Deleting: Users should have the ability to edit or delete their own reviews at any time.

-Review Viewing: All users, logged in or not, should be able to view all reviews shared on the platform. This should include the ability to sort or filter reviews based on categories.


OUT - What will your product not do.

-My website will never turn into an IOS or Android app.


## Minimum Viable Product vs

What will your MVP functionality be?

1. User Authentication: Users should be able to register, log in, and log out using secure methods provided by Auth0. 

2. Review Posting: Users should be able to create reviews across predefined categories. They should be able to write a review, and optionally attach media (e.g., photos) if desired.

3. Review Editing and Deleting: Users should have the ability to edit or delete their own reviews at any time.

4. Review Viewing: All users, logged in or not, should be able to view all reviews shared on the platform. This should include the ability to sort or filter reviews based on categories.

5. Data: All the user data and reviews should be stored and retrieved from a MongoDB database to ensure data persistence across sessions.

What are your stretch goals?

-Allow users to add images 
-Filter out exploitives and replace them with stars.
-Allow anon users to leave reviews
-A user can update their profile information


Stretch
 
What stretch goals are you going to aim for?
-We will aim for filtering out exploitatives and allowing users to update their profile information. 

## Functional Requirements
List the functionality of your product. This will consist of tasks such as the following:

An admin can create and delete user accounts
A user can update their profile information
A user can search all of the reviews filter by category
A user can create a review for predefined categories 
A user can review, update, and delete their review

## Data Flow
Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site.

1. User downloads and opens the application: When the user first opens the app, they are presented with the homepage which contains trending reviews and categories. No data is sent or received until the user performs an action.

2. User creates an account or logs in: For the first-time users, they'll need to create an account using an email or social media account. If the user is a returning user, they can simply log in with their credentials. Upon either sign up or log in, the app sends a request to the server to authenticate the user's credentials, receive a token for session management, and pull up the user's profile data. The profile data includes the user's personal information and their reviews. 

3. User browses through categories or searches for a topic: If the user clicks on a category or inputs a keyword in the search bar, the app sends a GET request to the server and receives back a list of reviews related to that category or keyword.

4. User decides to write a review: The user navigates to the write review page where they select a category, write their review, and provide a rating. When they submit the review, a POST request is sent to the server with the review content, user's id, and selected category. The server then responds with the updated data of the new review.

5. User selects a review to read: When a user selects a particular review, another GET request is sent to the server to fetch the full review, including the review text, rating, and any comments on the review.

6. User logs out or closes the application: When the user decides to close the application or log out, a request is sent to the server to close the session, and the user token is invalidated.



Non-Functional Requirements (301 & 401 only)

Non-functional requirements are requirements that are not directly related to the functionality of the application but still important to the app.

Security- All sensitive user data, such as passwords, must be encrypted before being stored in the database. Communication between the application and server should be conducted over a secure HTTPS protocol, encrypting all data in transit.

Usability- The application interface should be intuitive and easy to navigate, even for first-time users.  If users make errors, the app should provide clear, helpful error messages that help users understand what went wrong and how to correct it.
