import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import anecdoteService from "./services/anecdotes";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll().then((response) => {
      dispatch(initializeAnecdotes(response));
    });
  }, [dispatch]);

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification message={notification} />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
};

export default App;
