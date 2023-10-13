import { useState } from "react";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useField } from "./hooks/index";
import CreateNew from "./components/CreateNew";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");

  const contentField = useField("text");
  const authorField = useField("text");
  const infoField = useField("text");

  const addNew = (obj) => {
    setAnecdotes(anecdotes.concat(obj));
    navigate("/");
    setNotification(`A new anecdote ${obj.content} created!`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);

    contentField.reset();
    authorField.reset();
    infoField.reset();
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route
          path="/anecdote/:id"
          element={<Anecdote anecdote={anecdotes} />}
        />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default App;
