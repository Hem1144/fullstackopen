import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/user";
import "./main.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [errMessage, setErrMessage] = useState(null);
  const [notifyMessage, setNotifyMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userBlogs = await userService.getUserBlogs(user);
      setBlogs(userBlogs.blogs);
    }
    user ? fetchData() : null;
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNotifyMessage(`${user.name} logged In`);
      setTimeout(() => {
        setNotifyMessage(null);
      }, 1000);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrMessage("wrong username or password");
      setTimeout(() => {
        setErrMessage(null);
      }, 3000);
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    setNewBlog({ title: "", author: "", url: "" });
    setNotifyMessage("User logged out.");
    setTimeout(() => {
      setNotifyMessage(null);
    }, 500);
  };

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await blogService.create(newBlog);
      setBlogs(blogs.concat(response));
      setNewBlog({ title: "", author: "", url: "" });
      setNotifyMessage(
        `A new blog ${response.title}! by ${response.author} added`
      );
      setTimeout(() => {
        setNotifyMessage(null);
      }, 2000);
    } catch (error) {
      setErrMessage(error.response.data.error);
      setTimeout(() => {
        if (error.response.data.error === "token expired") {
          logOut();
        }
        setErrMessage(null);
      }, 500);
    }
  };

  const handleChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const Notification = ({ type, message }) => {
    if (message === null) {
      return null;
    }
    return type === "errMessage" ? (
      <div className="error">{message}</div>
    ) : (
      <div className="notify">{message}</div>
    );
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label htmlFor="title">Title: </label>
      <input
        value={newBlog.title}
        name="title"
        onChange={handleChange}
        placeholder="title..."
      />
      <br />
      <label htmlFor="author">Author: </label>
      <input
        value={newBlog.author}
        name="author"
        onChange={handleChange}
        placeholder="Author..."
      />
      <br />
      <label htmlFor="url">URL: </label>
      <input
        value={newBlog.url}
        name="url"
        onChange={handleChange}
        placeholder="url..."
      />
      <br />
      <button type="submit">Create</button>
    </form>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        type={notifyMessage ? "notifyMessage" : "errMessage"}
        message={errMessage || notifyMessage}
      />
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in <button onClick={logOut}>Log out</button>
          </p>

          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
