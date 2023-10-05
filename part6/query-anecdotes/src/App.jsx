import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./services/requests";
import { useNotificationDispatch, useNotificationValue } from "./NotificationContext";

const App = () => {
  const notificationDispatch = useNotificationDispatch();
  const notification=useNotificationValue()

  const queryClient = useQueryClient();
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({
      type: "DISPLAY_NOTIFICATION",
      payload: `anecdote "${anecdote.content}" voted`,
    });
    setTimeout(
      () => notificationDispatch({ type: "REMOVE_NOTIFICATION" }),
      5000
    );
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return (
      <span>anecdote service not available due to problems in server</span>
    );
  }
  const anecdotes = result.data;

  return (
    <>
      <h3>Anecdote app</h3>
      {notification ? <Notification /> : null}
      {/* <Notification /> */}
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default App;
