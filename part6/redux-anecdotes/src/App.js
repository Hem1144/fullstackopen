import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { useSelector } from "react-redux";

const App = () => {
  const notification = useSelector((state) => state.notification);

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
