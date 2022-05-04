import React, { useState, useEffect } from "react";
import { variables } from "../hoc/Variables";

import Modal from "../components/Modal/modal";

import "../App.css";

function Gallery() {
  const [products, setProducts] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [product, setProduct] = useState({
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
    fetch(variables.API_URL + "product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, [products]);

  const addClick = () => {
    setModalTitle("Product");
    setModalAction("Add Product");
    setProduct({
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
    console.log(product);
  };

  const editClick = (product) => {
    setModalTitle("Product");
    setModalAction("Edit Product");
    setProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      imgUrl: product.imgUrl,
      userId: product.userId,
      rating: product.rating,
      price: product.price,
      sale: product.sale,
      categoryId: product.categoryId,
    });
  };

  const createClick = () => {
    fetch(variables.API_URL + "product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        imgUrl: product.imgUrl,
        userId: product.userId,
        rating: product.rating,
        price: product.price,
        sale: product.sale,
        categoryId: product.categoryId,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed", error);
        }
      );
  };

  const updateClick = () => {
    fetch(variables.API_URL + "product", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: product.id,
        name: product.name,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed", error);
        }
      );
  };
  const deleteClick = (id) => {
    console.log(id);
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "product/" + id, {
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
          },
          (error) => {
            alert("Failed", error);
          }
        );
    }
  };

  const changeField = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => addClick()}
      >
        Add Product
      </button>
      <table className="table table-hover table-responsive">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>User ID</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Sale</th>
            <th>Category</th>
            <th>Date Created</th>
            <th>Date Edited</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const dCreated = new Date(product.dateCreated);
            const dEdited = new Date(product.dateEdited);
            const formatDCreated = formatDate(dCreated);
            const formatDEdited = formatDate(dEdited);

            return (
              <tr key={product.id}>
                <td>{product.imgUrl}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.userId}</td>
                <td>{product.rating}</td>
                <td>{product.price}</td>
                <td>{product.sale}</td>
                <td>{product.categoryId}</td>
                <td>{formatDCreated}</td>
                <td>{formatDEdited}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-edit btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => editClick(product)}
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
                    onClick={() => deleteClick(product.id)}
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
        object={product}
      />
    </div>
  );
}

export default Gallery;
