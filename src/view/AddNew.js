import "./contact.scss";
import { useState } from "react";
import axios from "axios";
const AddNew = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmitBtn = async () => {
    console.log(123);
    // if (title === '' || title === null || title === undefined) alert ("empty title")
    if (!title) {
      alert("empty title");
      return;
    }
    if (!content) {
      alert("empty content");
      return;
    }
    let data = {
      title: title,
      body: content,
      userID: 1,
    };
  //  let res = await axios
  //     .post("https://jsonplaceholder.typicode.com/posts", data)
    await axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then((res) => {
        if (res && res.data) {
          let newContact = res.data;
          props.handleAddNew(newContact);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="addnew-container">
      {/* <form onSubmit={handleSubmitBtn}> */}
      <div className="addnew-text">Add New</div>
      <div className="input-data">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-data">
        <label>Body:</label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="btn-add" onClick={() => handleSubmitBtn()}>
        Submit
      </button>
      {/* <button className="btn-add" type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default AddNew;
