import React, { useState, useEffect } from "react";
import { Row, Container, Col, Form, Table, Button } from "react-bootstrap";
import firebase from "../firebase";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import { paginate } from "./paginate";
import SearchBox from "./searchBox";

const useItems = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([]);
    firebase
      .firestore()
      .collection("Project")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const listItems = snapshot.docs.map(function (doc) {
          let somedata = {
            id: doc.id,
            ...doc.data(),
          };

          firebase
            .firestore()
            .collection("Project")
            .doc(doc.id)
            .collection("Address")
            .onSnapshot((snapshot) => {
              somedata.address = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setItems(listItems);
              document.getElementById("#information");
            });

          return somedata;
        });
        setItems((prev) => ({
          ...prev,
          listItems,
        }));

        console.log(listItems);
      });
  }, []);

  return items;
};

function SampleForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  let listItem = useItems(props);
  const [pageSize] = useState(4);
  let [searchQuery, setSearchQuery] = useState("");
  let [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  let count = listItem.length;

  if (searchQuery) {
    listItem = listItem.filter((m) =>
      m.gender.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  const data = paginate(listItem, currentPage, pageSize);

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (firstName && lastName && gender) {
        firebase
          .firestore()
          .collection("Project")
          .doc(firstName)
          .set({
            firstName,
            lastName,
            createdAt: new Date(),
            gender,
          })
          .then(() => setFirstName(""), setLastName(""), setGender(""));
        props.history.push({
          pathname: `/address/${firstName}`,
        });
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const deleteItem = (item) => {
    firebase
      .firestore()
      .collection("Project")
      .doc(item.id)
      .delete()
      .then(function () {
        console.log("Item successfully deleted!");
        alert(`${item.name} Item successfully deleted!`);
      });
    firebase
      .firestore()
      .collection("Modifier")
      .doc(item.id)
      .collection("Modifier Item")
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div>
      <Container>
        <Form onSubmit={onSubmit}>
          <div class="row">
            <div class="col-3">
              <Form.Group>
                <label>FirstName</label>
                <Form.Control
                  placeholder="Enter FirstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                  name="firstName"
                />
              </Form.Group>{" "}
            </div>
            <div class="col-3">
              <Form.Group>
                <label>LastName</label>
                <Form.Control
                  placeholder="Enter LastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.currentTarget.value)}
                  name="lastName"
                />
              </Form.Group>{" "}
            </div>
            <div class="col-3">
              <Form.Group>
                <label>Gender</label>
                <select
                  className="form-control"
                  value={gender}
                  onChange={(e) => setGender(e.currentTarget.value)}
                  name="gender"
                >
                  <option defaultValue>Select Gender</option>
                  <option value="male">Male</option>

                  <option value="female">Female</option>
                </select>
              </Form.Group>
            </div>
            <div class="col-3">
              <br />

              <center>
                <button className="btn btn-info" type="submit">
                  SAVE
                </button>
              </center>
            </div>
          </div>
        </Form>
      </Container>
      <br />
      <br />
      <br />
      <Container>
        <Row>
          <Col>
            <Table id="information" striped bordered hover variant="secondary">
              <thead>
                <tr>
                  <th colSpan="4" className="text-center">
                    <SearchBox value={searchQuery} onChange={handleSearch} />
                  </th>
                  <th className="text-center">Search By Gender </th>
                </tr>
              </thead>
              <thead>
                <tr className="text-center">
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Update</th>

                  <th>Delete</th>
                </tr>
              </thead>
              {data.map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.gender}</td>
                    <td>
                      {item.address ? (
                        <React.Fragment>
                          <ul>
                            <li>HouseNo:{item.address[0].houseNo}</li>
                            <li>Street: {item.address[0].street}</li>
                            <li>City: {item.address[0].city}</li>
                            <li>State: {item.address[0].state}</li>
                          </ul>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </td>

                    <td className="text-center">
                      <Link
                        to={`/updateSample/${item.id}`}
                        className="btn btn-primary"
                      >
                        Update
                      </Link>
                    </td>
                    <td className="text-center">
                      <Button
                        className="btn btn-danger"
                        onClick={() => deleteItem(item)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Col>
        </Row>
        <Pagination
          itemCount={count}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </Container>
    </div>
  );
}

export default SampleForm;
