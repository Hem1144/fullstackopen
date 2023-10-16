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

import React, { useState } from "react";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {};

  return (
    <div>
      <h1>Blog List</h1>
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
