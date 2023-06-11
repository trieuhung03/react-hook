import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./contact.scss";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import Button from "react-bootstrap/Button";
import AddNew from "./AddNew";
function Contact() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState([]);
  const [newData, setNewData] = useState();
  const getData = useCallback(() => {
    return axios.get("https://jsonplaceholder.typicode.com/posts");
  }, []);
  
  useEffect(() => {
    getData()
      .then((res) => {
        if (res && res.data.length > 0) {
          setData(res.data.slice(0, 10));
          setNewData(res.data.slice(0, 10));
          console.log("check", newData);
        }
      })
      .catch((err) => {
        console.log("loi roi", err);
      });
  }, []);
  const handleAddNew = (contact) => {
    console.log('run')
    setShow(false);
    newData.unshift(contact);
    console.log("check newdatata", newData);
  };
  const deleteContact = (id) => {
    let data1 = newData;
    data1 = data1.filter((item) => item.id !== id);
    setNewData(data1);
  };
  return (
    <>
      <div>
        <h1>Contact</h1>
      </div>

      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <Modal.Title>Add New</Modal.Title>
        </ModalHeader>
        <Modal.Body>
          <AddNew handleAddNew={handleAddNew}  />
        </Modal.Body>
        {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close Modal
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
      </Modal>

      <div>
        <div className="blog-container">
          {newData &&
            newData.length > 0 &&
            newData.map((item) => {
              return (
                <div className="single-blog" key={item.id}>
                  <div className="title">
                    <spans>{item.title}</spans>
                    <spans
                      className="right"
                      onClick={() => {
                        deleteContact(item.id);
                      }}
                    >
                      X
                    </spans>
                  </div>
                  <div className="content">{item.body}</div>
                  <button>
                    <NavLink to={`/contact/${item.id}`}>View Detial</NavLink>
                  </button>
                </div>
              );
            })}
        </div>
        <NavLink to="/" activeClassName="active" exact={true}>
          Back to home
        </NavLink>
      </div>
    </>
  );
}

export default Contact;
