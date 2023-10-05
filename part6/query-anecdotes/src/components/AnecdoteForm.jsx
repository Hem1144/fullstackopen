import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/requests";

import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch();

  const getId = () => (100000 * Math.random()).toFixed(0);
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    content.length >= 5
      ? newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
      : notificationDispatch({
          type: "DISPLAY_NOTIFICATION",
          payload: "too short anecdote,must have 5 or more",
        });
    setTimeout(
      () => notificationDispatch({ type: "REMOVE_NOTIFICATION" }),
      5000
    );
    event.target.anecdote.value = "";
  };

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
