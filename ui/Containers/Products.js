import React, { useState, useEffect } from "react";
import { variables } from "../hoc/Variables";

import Modal from "../components/Modal/modal";

import { useSelector, useDispatch } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  getAllProducts,
  getProductsStatus,
  fetchProducts,
  deleteProduct,
  createProduct,
  editProduct,
} from "../store/productsSlice";
import "../App.css";

function Gallery() {
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const productsStatus = useSelector(getProductsStatus);

  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    description: "",
    imgUrl: "placeholder.png",
    userId: 5,
    rating: "",
    price: "",
    sale: "",
    categoryId: 1,
    quantityInStock: 0,
  });

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
      const productsTemp = dispatch(fetchProducts());
      console.log(productsTemp + "Hiiii");
    }
  }, [productsStatus, dispatch]);

  const addClick = () => {
    setModalTitle("Product");
    setModalAction("Add Product");
    setProduct({
      ...product,
      id: 0,
      name: "",
      description: "",
      imgUrl: "placeholder.png",
      userId: 5,
      rating: "",
      price: "",
      sale: "",
      categoryId: 1,
      quantityInStock: 0,
    });
  };

  const editClick = (product) => {
    setModalTitle("Product");
    setModalAction("Edit Product");
    setProduct({
      ...product,
      id: product.id,
      name: product.name,
      description: product.description,
      imgUrl: product.imgUrl,
      userId: product.userId,
      rating: product.rating,
      price: product.price,
      sale: product.sale,
      categoryId: product.categoryId,
      quantityInStock: product.quantityInStock,
    });
    console.log(product);
  };

  const createClick = () => {
    const actionProduct = {
      name: product.name,
      description: product.description,
      imgUrl: product.imgUrl,
      userId: product.userId,
      rating: product.rating,
      price: product.price,
      sale: product.sale,
      categoryId: product.categoryId,
      quantityInStock: product.quantityInStock,
    };
    dispatch(createProduct(actionProduct));

    console.log(product);
  };

  const updateClick = () => {
    console.log("update clicked");
    const actionProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      imgUrl: product.imgUrl,
      userId: product.userId,
      rating: product.rating,
      price: product.price,
      sale: product.sale,
      categoryId: product.categoryId,
      quantityInStock: product.quantityInStock,
    };
    dispatch(editProduct(actionProduct));

    console.log(product);
  };

  const deleteClick = (id) => {
    console.log(id);
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const changeField = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + "product/SaveFile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct({ ...product, imgUrl: data });
      });
  };

  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => addClick()}
      >
        Add Product
      </button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">User Id</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Sale</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Date Created</TableCell>
              <TableCell align="right">Date Edited</TableCell>
              <TableCell align="right">Quantity in Stock</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">
                  <img
                    alt="product"
                    width="50px"
                    height="50px"
                    src={variables.PHOTO_URL + product.imgUrl}
                  />
                </TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">{product.userId}</TableCell>
                <TableCell align="right">{product.rating}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.sale}</TableCell>
                <TableCell align="right">{product.categoryId}</TableCell>
                <TableCell align="right">{product.dateCreated}</TableCell>
                <TableCell align="right">{product.dateEdited}</TableCell>
                <TableCell align="right">{product.quantityInStock}</TableCell>
                <TableCell align="right">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <table className="table table-hover table-responsive align-middle">
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
            <th>Quantity in Stock</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id} className="">
                <td>
                  <img
                    alt="product"
                    width="50px"
                    height="50px"
                    src={variables.PHOTO_URL + product.imgUrl}
                  />
                </td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.userId}</td>
                <td>{product.rating}</td>
                <td>{product.price}</td>
                <td>{product.sale}</td>
                <td>{product.categoryId}</td>
                <td>{product.dateCreated}</td>
                <td>{product.dateEdited}</td>
                <td>{product.quantityInStock}</td>
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
      </table> */}
      <Modal
        modalTitle={modalTitle}
        modalAction={modalAction}
        createClick={createClick}
        updateClick={updateClick}
        changeField={changeField}
        object={product}
        imageUpload={imageUpload}
      />
    </div>
  );
}

export default Gallery;
