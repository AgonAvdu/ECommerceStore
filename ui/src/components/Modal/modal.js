import React from "react";

function Modal({
  modalTitle,
  modalAction,
  createClick,
  updateClick,
  changeField,
  object,
}) {
  let form = <div></div>;
  switch (modalTitle) {
    case "Category":
      form = (
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text">Name</span>
            <input
              type="text"
              name="name"
              className="form-control"
              value={object.name}
              onChange={changeField}
            />
          </div>
        </div>
      );
      break;
    case "Product":
      form = (
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text">Name</span>
            <input
              type="text"
              name="name"
              className="form-control"
              value={object.name}
              onChange={changeField}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Description</span>
            <input
              type="text"
              name="description"
              className="form-control"
              value={object.description}
              onChange={changeField}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Image</span>

            <input
              name="imgUrl"
              type="text"
              className="form-control"
              value={object.imgUrl}
              onChange={changeField}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">User ID</span>
            <input
              name="userId"
              type="text"
              className="form-control"
              value={object.userId}
              onChange={changeField}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Rating</span>
            <input
              name="rating"
              type="text"
              className="form-control"
              value={object.rating}
              onChange={changeField}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Price</span>
            <input
              name="price"
              type="text"
              className="form-control"
              value={object.price}
              onChange={changeField}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Sale</span>
            <input
              name="sale"
              type="text"
              className="form-control"
              value={object.sale}
              onChange={changeField}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Category Id</span>
            <input
              name="categoryId"
              type="text"
              className="form-control"
              value={object.categoryId}
              onChange={changeField}
            />
          </div>
        </div>
      );
      break;
    case "User":
      form = (
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text">Name</span>
            <input
              type="text"
              name="name"
              className="form-control"
              value={object.name}
              onChange={changeField}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Surname</span>
            <input
              type="text"
              name="surname"
              className="form-control"
              value={object.surname}
              onChange={changeField}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Email</span>
            <input
              type="email"
              name="email"
              className="form-control"
              value={object.email}
              onChange={changeField}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Password</span>
            <input
              type="password"
              name="password"
              className="form-control"
              value={object.password}
              onChange={changeField}
            />
          </div>
        </div>
      );
      break;
    default:
  }

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modalAction}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {form}
            {object.id === 0 ? (
              <button
                type="button"
                className="btn btn-primary float-start"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => createClick()}
              >
                Create
              </button>
            ) : null}

            {object.id !== 0 ? (
              <button
                type="button"
                className="btn btn-primary float-start"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => updateClick()}
              >
                Update
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
