import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { fetchAllUser } from "../services/UserService";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import _ from "lodash";
import ModalConfirm from "./ModalConfirm";
import "./TableUsers.scss";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

const TableUsers = (props) => {
  useEffect(() => {
    //call API
    getUser(1);
  }, []);

  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setListUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  const [isShowModaleAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModaleEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [isShowModaleDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handelPageClick = (e) => {
    getUser(+e.selected + 1);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleEdiUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUsers(cloneListUser);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = cloneListUser.filter((item) => item.id === user.id);
    setListUsers(cloneListUser);
  };

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [keywork, setKeyword] = useState("");
  const [dataExport, setDataExport] = useState([]);

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUsers(cloneListUser);
  };

  const handleSearch = (event) => {
    let term = event.target.value;
    setKeyword(term);
    if (term) {
      let cloneListUser = _.cloneDeep(listUsers);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUsers(cloneListUser);
    } else {
      getUser(1);
    }
  };

  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers & (listUsers.length > 0)) {
      result.push(["Id", "Email", "First Name", "Last Name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (event) => {
    if (event.target && event.target.file && event.target.file[0]) {
      let file = event.target.file[0];

      if (file.type !== "text/csv") {
        toast.error("Error");
        return;
      }
      //parse local CSV file
      Papa.pasrse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV.length === 3) {
            } else {
              toast.error("Fault");
            }
          } else {
            toast.error("Not found");
          }
        },
      });
    }
  };
  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List User:</b>
        </span>
        <div className="group-btn">
          <label htmlFor="test" className="btn btn-warning">
            {" "}
            Import <i className="fa-solid fa-file-import"> </i>
          </label>
          <input
            id="test"
            type="file"
            hidden
            onChange={(event) => {
              handleImportCSV(event);
            }}
          />

          <CSVLink
            filename="my-file.csv"
            className="btn btn-primary"
            data={dataExport}
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-file-arrow-down"></i>
            Export
          </CSVLink>
          <button
            className="btn btn-success"
            onClick={() => {
              setIsShowModalAddNew(true);
            }}
          >
            <i className="fa-solid fa-circle-plus"></i>
            Add New User
          </button>
        </div>
      </div>
      <div className="col-12 col-4 my-3">
        <input
          className="font-control"
          placeholder="Search user by email..."
          value={keywork}
          onChange={(event) => {
            handleSearch(event);
          }}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div classname="sort-header">
                <span>ID</span>
                <span>
                  <i
                    onClick={() => {
                      handleSort("desc", "id");
                    }}
                    class="fa-solid fa-arrow-down-long"
                  ></i>
                  <i
                    onClick={() => {
                      handleSort("asc", "id");
                    }}
                    class="fa-solid fa-arrow-up-long"
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div classname="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    onClick={() => {
                      handleSort("desc", "first_name");
                    }}
                    class="fa-solid fa-arrow-down-long"
                  ></i>
                  <i
                    onClick={() => {
                      handleSort("asc", "first_name");
                    }}
                    class="fa-solid fa-arrow-up-long"
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDeleteUser(item);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handelPageClick}
        pageRangeDisplay={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModaleAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModaleEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEdiUserFromModal={handleEdiUserFromModal}
      />
      <ModalConfirm
        show={isShowModaleDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};

export default TableUsers;
