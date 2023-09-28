// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "VOTE":
//       const id = action.data.id;
//       const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
//       const updatedAnecdote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1,
//       };
//       return state
//         .map((anecdote) => (anecdote.id !== id ? anecdote : updatedAnecdote))
//         .sort((a, b) => b.votes - a.votes);
//     case "NEW_ANECDOTE":
//       return [...state, action.data];
//     case "INIT_ANECDOTES":
//       return action.data;
//     default:
//       return state;
//   }
// };

// export const voteForAnecdote = (id) => {
//   return {
//     type: "VOTE",
//     data: { id },
//   };
// };

// export const createAnecdote = (content) => {
//   return {
//     type: "NEW_ANECDOTE",
//     data: {
//       content,
//       id: new Date().getTime(),
//       votes: 0,
//     },
//   };
// };

// export const initializeAnecdotes = (anecdotes) => {
//   return {
//     type: "INIT_ANECDOTES",
//     data: anecdotes,
//   };
// };

// export default reducer;

import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteForAnecdote: (state, action) => {
      const id = action.payload.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
        state.sort((a, b) => b.votes - a.votes);
      }
    },
    createAnecdote: (state, action) => {
      state.push(action.payload);
    },
    initializeAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { voteForAnecdote, createAnecdote, initializeAnecdotes } =
  reducer.actions;
export default reducer.reducer;
