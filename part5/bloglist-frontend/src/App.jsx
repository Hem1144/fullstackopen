import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Toggable";
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

  const blogFormRef = useRef();
  const loginFormRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const userBlogs = await userService.getUserBlogs(user);
      setBlogs(userBlogs.blogs);
    }
    user ? fetchData() : null;
  }, [user]);

  useEffect(() => {
    const tokenExpiry = window.localStorage.getItem("tokenExpiry");
    if (tokenExpiry && new Date() > tokenExpiry) {
      logOut("token-Expired");
    } else {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        blogService.setToken(user.token);
      }
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    loginFormRef.current.toggleVisibility();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      let tokenExpirationTime = 60 * 60;
      let tokenExpiry = Date.now() + tokenExpirationTime;
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      window.localStorage.setItem("tokenExpiry", tokenExpiry);
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
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setErrMessage(null);
      }, 3000);
    }
  };

  const logOut = (reason) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.localStorage.removeItem("tokenExpiry");
    setUser(null);
    setNewBlog({ title: "", author: "", url: "" });
    reason === "token-expired"
      ? setNotifyMessage("Token Expired, logged out!!")
      : setNotifyMessage("User logged out.");
    setTimeout(() => {
      setNotifyMessage(null);
    }, 500);
  };

  const addBlog = async (e) => {
    e.preventDefault();
    blogFormRef.current.toggleVisibility();
    try {
      const response = await blogService.create(newBlog);
      setBlogs(blogs.concat(response));
      setNewBlog({ title: "", author: "", url: "" });
      setNotifyMessage(
        `A new blog, ${response.title}! by ${response.author} added`
      );
      setTimeout(() => {
        setNotifyMessage(null);
      }, 2000);
    } catch (error) {
      setErrMessage(error.response.data.error);
      setTimeout(() => {
        if (error.response.data.error === "token expired") {
          logOut("token-expired");
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
    return type === "errMesage" ? (
      <div className="error">{message}</div>
    ) : (
      <div className="notify">{message}</div>
    );
  };

  const loginForm = () => (
    <Togglable buttonLabel="Show Login" ref={loginFormRef}>
      <Login
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable buttonLabel="Show Blog Form" ref={blogFormRef}>
      <BlogForm
        addBlog={addBlog}
        newBlog={newBlog}
        handleChange={handleChange}
      />
    </Togglable>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        type={errMessage ? "errMessage" : "notifyMessage"}
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
