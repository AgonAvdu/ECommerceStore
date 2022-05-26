import React, { useState, useEffect } from "react";
import { variables } from "../hoc/Variables";

import Modal from "../components/Modal/modal";

import "../App.css";

function Profile() {
  const [users, setUsers] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [render, setRender] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    name: "",
    description: "",
    imgUrl: "default.png",
    userId: 1,
    rating: "",

    price: "",
    sale: "",
    categoryId: 1,
  });
  useEffect(() => {
    fetch(variables.API_URL + "user")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setRender(false);
      });
  }, [render]);

  const addClick = () => {
    setModalTitle("User");
    setModalAction("Add User");
    setUser({
      id: 0,
      name: "",
      surname: "",
      email: "",
      password: "",
    });
  };

  const editClick = (user) => {
    setModalTitle("User");
    setModalAction("Edit User");
    setUser({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
    });
  };

  const createClick = () => {
    fetch(variables.API_URL + "user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          setRender(true);
        },
        (error) => {
          alert("Failed", error);
        }
      );
  };

  const updateClick = () => {
    fetch(variables.API_URL + "user", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          setRender(true);
        },
        (error) => {
          alert("Failed", error);
        }
      );
  };
  const deleteClick = (id) => {
    console.log(id);
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "user/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            setRender(true);
          },
          (error) => {
            alert("Failed", error);
          }
        );
    }
  };

  const changeField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => addClick()}
      >
        Add User
      </button>
      <table className="table table-hover table-responsive align-middle ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.roleId}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-edit btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => editClick(user)}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteClick(user.id)}
                    type="button"
                    className="btn btn-delete btn-light mr-1"
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        modalTitle={modalTitle}
        modalAction={modalAction}
        createClick={createClick}
        updateClick={updateClick}
        changeField={changeField}
        object={user}
      />
    </div>
  );
}

export default Profile;
