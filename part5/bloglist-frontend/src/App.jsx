// import { useState, useEffect } from 'react'
// import Blog from './components/Blog'
// import blogService from './services/blogs'

// const App = () => {
//   const [blogs, setBlogs] = useState([])

//   useEffect(() => {
//     blogService.getAll().then(blogs =>
//       setBlogs( blogs )
//     )  
//   }, [])

//   return (
//     <div>
//       <h2>blogs</h2>
//       {blogs.map(blog =>
//         <Blog key={blog.id} blog={blog} />
//       )}
//     </div>
//   )
// }

// export default App

import React, { useState } from 'react';
import LoginForm from './components/LoginForm'; // Import the LoginForm component

const App = () => {
  const [user, setUser] = useState(null);

  // Define a function to handle user login
  const handleLogin = async (username, password) => {
    // Implement your login logic here, e.g., make an API request to authenticate the user
    // If login is successful, set the user state
    // If login fails, display an error message
  };

  return (
    <div>
      <h1>Blog List</h1>
      {user === null ? (
        <LoginForm handleLogin={handleLogin} /> // Render the login form if user is not logged in
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
          {/* Render the list of blogs here */}
        </div>
      )}
    </div>
  );
};

export default App;
