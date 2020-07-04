import React, { Component } from "react";
import { Row, Container, Col, Form, Table, Button } from "react-bootstrap";
import firebase from "../firebase";
import { Redirect, Link } from "react-router-dom";
import Pagination from "./pagination";
import { paginate } from "./paginate";
import SearchBox from "./searchBox";
import Address from "./address";

class SampleClass extends Component {
  state = {
    firstName: "",
    lastName: "",
    gender: "",

    items: [],
    pageSize: 4,
    searchQuery: "",
    currentPage: 1,
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("Project")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const listItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.setState({ items: listItems });
      });

    return this.state.items;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, gender } = this.state;

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
          .then(() =>
            this.setState({
              firstName: "",
              lastName: "",
              gender: "",
            })
          );
        return <Redirect to="/address" />;
      }
    } catch (error) {
      console.log("Error");
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  deleteItem = (id) => {
    firebase
      .firestore()
      .collection("Project")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  render() {
    let { items, currentPage, pageSize, searchQuery } = this.state;
    let count = items.length;
    if (this.state.searchQuery) {
      items = items.filter((m) =>
        m.gender.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    const data = paginate(items, currentPage, pageSize);

    return (
      <div>
        <Container>
          <Form onSubmit={this.onSubmit}>
            <div class="row m-4">
              <div class="col-3">
                <Form.Group>
                  <h6>FirstName</h6>
                  <Form.Control
                    placeholder="Enter FirstName"
                    type="text"
                    value={this.state.firstName}
                    onChange={(e) =>
                      this.setState({ firstName: e.target.value })
                    }
                    name="firstName"
                  />
                </Form.Group>{" "}
              </div>
              <div class="col-3">
                <Form.Group>
                  <h6>LastName</h6>
                  <Form.Control
                    placeholder="Enter LastName"
                    type="text"
                    value={this.state.lastName}
                    onChange={(e) =>
                      this.setState({ lastName: e.target.value })
                    }
                    name="lastName"
                  />
                </Form.Group>{" "}
              </div>
              <div class="col-3">
                <Form.Group>
                  <h6>Gender</h6>
                  <select
                    className="form-control"
                    value={this.state.gender}
                    onChange={(e) => this.setState({ gender: e.target.value })}
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
                  <Button className="btn btn-info" type="submit">
                    SAVE
                  </Button>
                </center>
              </div>
            </div>

            {/* <div className="col-9">
              <Form.Group>
                <div className="form-group">
                  <h5 htmlFor="exampleFormControlTextarea1">Address</h5>
                  <div className="row">
                    <div className="col-1"></div>

                    <div class="col-2">
                      <h6>H.No</h6>
                    </div>
                    <div class="col-5">
                      <Form.Control
                        type="text"
                        value={this.state.address.houseNo}
                        onChange={(e) =>
                          this.setState({
                            address: { houseNo: e.target.value },
                          })
                        }
                        name="houseNo"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-1"></div>

                    <div class="col-2">
                      <h6>Street</h6>
                    </div>
                    <div class="col-5">
                      <Form.Control
                        type="text"
                        value={this.state.address.street}
                        onChange={(e) =>
                          this.setState({ address: { street: e.target.value } })
                        }
                        name="street"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-1"></div>
                    <div class="col-2">
                      <h6>City</h6>
                    </div>
                    <div class="col-5">
                      <Form.Control
                        type="text"
                        value={this.state.address.city}
                        onChange={(e) =>
                          this.setState({ address: { city: e.target.value } })
                        }
                        name="city"
                      />
                    </div>
                  </div>
                </div>
              </Form.Group>
            </div> */}
          </Form>
        </Container>
        <br />
        <br />
        <br />
        <Container>
          <Row>
            <Col>
              <Table striped bordered hover variant="secondary">
                <thead>
                  <tr>
                    <th className="text-center">Search By Gender </th>

                    <th colSpan="4" className="text-center">
                      <SearchBox
                        value={searchQuery}
                        onChange={this.handleSearch}
                      />
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr className="text-center">
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Gender</th>
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

                      <td className="text-center">
                        <Link
                          to={`/updateSample/${item.id}`}
                          className="btn btn-warning"
                        >
                          Update
                        </Link>
                      </td>
                      <td className="text-center">
                        <Button
                          className="btn btn-danger"
                          onClick={() => this.deleteItem(item.id)}
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
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </Container>
      </div>
    );
  }
}
export default SampleClass;
