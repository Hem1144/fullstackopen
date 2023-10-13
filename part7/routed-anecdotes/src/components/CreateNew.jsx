import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
      id: Math.floor(Math.random() * 1000),
    });
    navigate("/");
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <>
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input
              type={content.type}
              value={content.value}
              onChange={content.onChange}
              onReset={content.reset}
            />
          </div>
          <div>
            author
            <input
              type={author.type}
              value={author.value}
              onChange={author.onChange}
              onReset={author.reset}
            />
          </div>
          <div>
            url for more info
            <input
              type={info.type}
              value={info.value}
              onChange={info.onChange}
              onReset={info.reset}
            />
          </div>
          <button type="submit">create</button>
          <button type="reset" onClick={handleReset}>
            reset
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNew;
