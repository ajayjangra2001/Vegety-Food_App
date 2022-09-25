import React, { useEffect, useRef, useState } from "react";
import "../style files/admin.css";
import Thumb from "../../Images/thumb.png";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "../../UtilsComponents/Alert";
import CardImage from "../../Images/cardImage.jpg";
import "../style files/card.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DiscountIcon from "@mui/icons-material/Discount";
import adminBG from "../../Images/admin.jpg";

function UpdatePlanWindow({ props, stateChanger }) {
  const [inputs, setInputs] = useState(null);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setInputs({ ...props });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.patch(
      `/admin/updatePlan/${inputs._id}`,
      inputs
    );
    alert(response.data.message);
    setDisplay(false);
    const state = () => stateChanger(true);
    state();
  };

  return (
    <div
      className="update-window-main-cont"
      style={{
        display: display ? "flex" : "none",
        backgroundImage: "url(" + adminBG + ")",
      }}
    >
      {inputs === null ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="update-window">
          <div style={{cursor : 'pointer'}}>
            {" "}
            <CloseIcon
              sx={{color: "rgb(92,181,72)" }}
              onClick={() => setDisplay(false)}
            />
          </div>

          <div className="heading-add-plan text-center ">
            <h2 style={{ color: "rgb(92,181,72)" }}>Update Plan Details</h2>
          </div>

          <div className="form-cont-add-paln mt-3">
            <div className="mb-3">
              <label hmtlFor="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Super Food"
                name="name"
                value={inputs.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label hmtlFor="exampleFormControlInput2" className="form-label">
                Duration
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="30"
                name="duration"
                value={inputs.duration || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label
                hmtlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Description
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                name="description"
                value={inputs.description || ""}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label hmtlFor="exampleFormControlInput3" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="1000"
                name="price"
                value={inputs.price || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label hmtlFor="exampleFormControlInput4" className="form-label">
                Discount
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput4"
                placeholder="10"
                name="discount"
                value={inputs.discount || ""}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-success"
                type="button"
                onClick={handleSubmit}
              >
                Update Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WelcomePage({ props }) {
  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ display: props ? "flex" : "none" }}
    >
      <img
        src={Thumb}
        alt=""
        style={{ filter: "drop-shadow(0 0 0.75rem crimson)" }}
      />
      <h2 className="mt-3" style={{ color: "white" }}>
        Welcome Admin !
      </h2>
      <span style={{ color: "gray" }}>Enjoy your Action </span>
    </div>
  );
}

function AllPlans({ props }) {
  const [allPlans, setAllPlans] = useState([]);
  const [planDetails, setPlanDetails] = useState({});
  const [updateWindowDisplay, setUpdateWindowDisplay] = useState(false);
  const [duplicate, setDuplicate] = useState([]);
  const [pages, setPages] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    async function getAllPlans() {
      const response = await axios.get("/plan/allPlans");
      if (response.data.data) setAllPlans([...response.data.data]);
      else alert(response.data.message);
    }
    getAllPlans();
  }, [updated, deleted]);

  const deletePlan = async (event) => {
    const id =
      event.currentTarget.parentNode.parentNode.parentNode.getAttribute("id");
    const response = await axios.delete(`/admin/deletePlan/${id}`);
    if (response.status === 200) {
      setDeleted(!deleted);
      setMessage(response.data.message);
    } else {
      setMessage(response.data.message);
      alert(response.data.message);
    }
  };

  const updatePlan = async (event) => {
    const id =
      event.currentTarget.parentNode.parentNode.parentNode.getAttribute("id");
    const response = await axios.get(`/plan/${id}`);
    if (response.data.data) {
      setPlanDetails({ ...response.data.data });
      setUpdateWindowDisplay(true);
    } else {
      setMessage(response.data.message);
      alert(response.data.message);
    }
  };

  useEffect(() => {
    if (allPlans.length !== 0) {
      let plan2 = allPlans.slice(0, 3);
      setDuplicate([...plan2]);
      console.log(duplicate);
      const noOfPages = Math.round(allPlans.length / 3);
      setPages(noOfPages);
    }
  }, [allPlans]);

  const handlePages = (event) => {
    event.preventDefault();
    const startIndex =
      event.currentTarget.attributes.getNamedItem("data-start-index").value;
    const endIndex =
      event.currentTarget.attributes.getNamedItem("data-end-index").value;
    const newPlans = allPlans.slice(startIndex, endIndex);
    setDuplicate([...newPlans]);
  };

  return (
    <div
      style={{
        display: props ? "flex" : "none",
        flexDirection: "column",
        alignSelf: "flex-start",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <div className="top-plan-part">
        <h2 style={{ color: "rgb(92,181,72)" }}>All Plans</h2>
      </div>
      <div className="bottom-plan-part example p-3">
        {duplicate.length === 0 ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {duplicate.map((plan) => (
              <div className="card-cont" key={plan._id} id={plan._id}>
                <div className="card-top-cont">
                  <img src={CardImage} alt="" />
                </div>
                <div className="card-bottom-cont">
                  <div className="name-cont">
                    <h4>{plan.name}</h4>
                  </div>
                  <div className="details-cont">
                    <div className="prop-cont">
                      <div className="top-prop-cont">
                        <AccessTimeIcon />
                        <span>{plan.duration}</span>
                      </div>
                      <div className="bottom-prop-cont">Duration</div>
                    </div>
                    <div className="prop-cont">
                      <div className="top-prop-cont">
                        <AttachMoneyIcon />
                        <span>{plan.price}</span>
                      </div>
                      <div className="bottom-prop-cont">Price</div>
                    </div>
                    <div className="prop-cont">
                      <div className="top-prop-cont">
                        <StarIcon />
                        <span>{plan.ratingsAverage}</span>
                      </div>
                      <div className="bottom-prop-cont">Ratings</div>
                    </div>
                    <div className="prop-cont">
                      <div className="top-prop-cont">
                        <DiscountIcon />
                        <span>{plan.discount}</span>
                      </div>
                      <div className="bottom-prop-cont">Discount</div>
                    </div>
                  </div>
                  <div className="description-cont">{plan.description}</div>
                  <div className="button-cont d-flex justify-content-evenly">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={deletePlan}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={updatePlan}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="topPlan-bottom-cont d-flex justify-content-center mt-5">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {[...Array(pages !== 0 ? pages : 1)].map((x, i) => (
              <>
                <li className="page-item" style={{ cursor: "pointer" }}>
                  <a
                    className="page-link"
                    data-start-index={i == 0 ? 0 : i * 3}
                    data-end-index={i * 3 + 3}
                    onClick={handlePages}
                  >
                    {++i}
                  </a>
                </li>
              </>
            ))}
          </ul>
        </nav>
      </div>
      {updateWindowDisplay ? (
        <UpdatePlanWindow props={planDetails} stateChanger={setUpdated} />
      ) : null}
      <Alert props={message} />
    </div>
  );
}

function AddPlan({ props }) {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/admin/addPlan", inputs);
    alert(response.data.message);
    setInputs({});
    console.log(response.data);
  };

  return (
    <div
      className="w-75 add-plan-main-cont"
      style={{ display: props ? "block" : "none" }}
    >
      <div className="heading-add-plan text-center">
        <h2 style={{ color: "rgb(92,181,72)" }}>Create New Plan</h2>
      </div>

      <div className="form-cont-add-paln">
        <div className="mb-3">
          <label hmtlFor="exampleFormControlInput1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Super Food"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label hmtlFor="exampleFormControlInput2" className="form-label">
            Duration
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="30"
            name="duration"
            value={inputs.duration || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label hmtlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            name="description"
            value={inputs.description || ""}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label hmtlFor="exampleFormControlInput3" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput3"
            placeholder="1000"
            name="price"
            value={inputs.price || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label hmtlFor="exampleFormControlInput4" className="form-label">
            Discount
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput4"
            placeholder="10"
            name="discount"
            value={inputs.discount || ""}
            onChange={handleChange}
          />
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-success"
            type="button"
            onClick={handleSubmit}
          >
            Add Plan
          </button>
        </div>
      </div>
    </div>
  );
}

function AllUsers() {
  let [allUsers, setAllUsers] = useState([]);
  let [duplicate, setDuplicate] = useState([]);
  let [pages, setPages] = useState(1);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    async function getAllUsers() {
      const response = await axios.get("/admin/allUsers");
      setAllUsers([...response.data.data]);
    }
    getAllUsers();
  }, [deleted]);

  useEffect(() => {
    if (allUsers.length !== 0) {
      let users = allUsers.slice(0, 5);
      setDuplicate([...users]);
      const noOfPages = Math.floor(allUsers.length / 5 + 1);
      setPages(noOfPages);
    }
  }, [allUsers]);

  const deleteUser = async (event) => {
    const id = event.currentTarget.parentNode.parentNode.getAttribute("id");
    const response = await axios.delete(`/admin/deleteUser/${id}`);
    console.log(response.data.message);
    if (response.status == 200) {
      setDeleted(!deleted);
    } else {
      alert(response.data.message);
    }
  };

  const handlePages = (event) => {
    event.preventDefault();
    const startIndex = event.currentTarget.attributes.getNamedItem("data-start-index").value;
    const endIndex = event.currentTarget.attributes.getNamedItem("data-end-index").value;
    const users = allUsers.slice(startIndex, endIndex);
    setDuplicate([...users]);
  };

  return (
    <div className="w-100 d-flex align-self-start flex-column">
      <div className="allusers-top text-center">
        <h2 style={{color : 'rgb(92,181,72)'}}>All Users</h2>
      </div>
      <div className="allusers-bottom mt-5 example">
        <table className="table table-success table-striped ">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Verified</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {duplicate.length === 0 ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {duplicate.map((user, index) => (
                  <tr id={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.verified ? "Yes" : "No"}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={deleteUser}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="topPlan-bottom-cont d-flex justify-content-center mt-5">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {[...Array(pages !== 0 ? pages : 1)].map((x, i) => (
              <>
                <li className="page-item" style={{ cursor: "pointer" }}>
                  <a
                    className="page-link"
                    data-start-index={i == 0 ? 0 : i * 5}
                    data-end-index={i * 5 + 5}
                    onClick={handlePages}
                  >
                    {++i}
                  </a>
                </li>
              </>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function AdminPage() {
  const [component, setComponent] = useState("welcome");
  const [welcome, setWelcome] = useState(true);
  const [allUsers, setAllUsers] = useState(false);
  const [allPlans, setAllPlans] = useState(false);
  const [addPlan, setAddPlan] = useState(false);

  return (
    <div
      className="admin-page-main-cont"
      style={{ backgroundImage: "url(" + adminBG + ")" }}
    >
      <div className="admin-left-cont ">
        <div className="card action-list-item" style={{ width: "18rem" }}>
          <ul
            className="list-group list-group-flush"
            style={{ cursor: "pointer" }}
          >
            <li
              className="list-group-item"
              onClick={() => {
                if (welcome !== true) {
                  setComponent("welcome");
                  setWelcome(!welcome);
                  setAllUsers(false);
                  setAddPlan(false);
                  setAllPlans(false);
                }
              }}
              style={{
                background: welcome
                  ? "rgb(92,181,72)"
                  : "rgba(149, 157, 165, 0.2)",
              }}
            >
              Welcome
            </li>
            <li
              className="list-group-item"
              onClick={() => {
                if (allUsers !== true) {
                  setComponent("All-Users");
                  setAllUsers(!allUsers);
                  setWelcome(false);
                  setAddPlan(false);
                  setAllPlans(false);
                }
              }}
              style={{
                background: allUsers
                  ? "rgb(92,181,72)"
                  : "rgba(149, 157, 165, 0.2)",
              }}
            >
              All users
            </li>
            <li
              className="list-group-item"
              onClick={() => {
                if (allPlans !== true) {
                  setComponent("All-Plans");
                  setAllPlans(!allPlans);
                  setWelcome(false);
                  setAllUsers(false);
                  setAddPlan(false);
                }
              }}
              style={{
                background: allPlans
                  ? "rgb(92,181,72)"
                  : "rgba(149, 157, 165, 0.2)",
              }}
            >
              All Plans
            </li>
            <li
              className="list-group-item"
              onClick={() => {
                if (addPlan !== true) {
                  setComponent("Add-Plan");
                  setAddPlan(!addPlan);
                  setWelcome(false);
                  setAllUsers(false);
                  setAllPlans(false);
                }
              }}
              style={{
                background: addPlan
                  ? "rgb(92,181,72)"
                  : "rgba(149, 157, 165, 0.2)",
              }}
            >
              Add Plan
            </li>
          </ul>
        </div>
      </div>
      <div className="admin-right-cont">
        {allUsers ? (
          <AllUsers props={allUsers} />
        ) : allPlans ? (
          <AllPlans props={allPlans} />
        ) : addPlan ? (
          <AddPlan props={addPlan} />
        ) : (
          <WelcomePage props={welcome} />
        )}
      </div>
    </div>
  );
}

export default AdminPage;
