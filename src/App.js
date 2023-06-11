import "./App.css";
import Nav from "./view/Nav";
import Covid from "./view/Covid";
import React from "react";
import DetailContat from "./view/DetailContact";
import AddNew from "./view/AddNew";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import News from "./view/News";
import Contact from "./view/Contact";
import NotFound from "./view/NotFound";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Covid />}></Route>
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} exact></Route>

          {/* <Route path="/users"><Users /></Route> */}
          {/* <Route path="/"><Home /></Route> */}
          <Route path="/contact/:id" element={<DetailContat />}></Route>
          <Route path="/addnew" element={<AddNew />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
