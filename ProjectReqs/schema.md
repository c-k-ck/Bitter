# Database Schema

The name of each property stored in the collection.
The required data type.
An indication if this collection is associated with another collection.

- The users table handles the data for each users post, which is referenced in the posts collection. The post is containing an unique title, body, and also connecting to the user that created it. It has its own id as well if the user wants to delete said post, or edit said post. Each post will have an integer value from 1-5, which is the expected rating value given by the user. All users will be able to view all post, but only the given user can delete said post.
