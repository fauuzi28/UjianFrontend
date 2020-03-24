import React, { Component } from "react";
import {
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button
} from "reactstrap";
import Axios from "axios";
import { API_URL } from "../supports/ApiUrl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const MySwal = withReactContent(Swal);

class ManageAdmin extends Component {
  state = {
    products: [],
    isModalAddOpen: false,
    isModalEditOpen: false,
    indexedit: 0,
    indexdelete: -1,
    categories: []
  };

  componentDidMount() {
    Axios.get(`${API_URL}/products?_expand=kategori`)
      .then(res => {
        Axios.get(`${API_URL}/kategoris`).then(kategoris => {
          this.setState({ products: res.data, categories: kategoris.data });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleadd = () => {
    this.setState({ isModalAddOpen: !this.state.isModalAddOpen });
  };

  toggleedit = () => {
    this.setState({ isModalEditOpen: !this.state.isModalEditOpen });
  };

  deleteconfirm = (index, id) => {
    this.setState({ indexdelete: index });
    MySwal.fire({
      title: `Are you sure wanna delete ${this.state.products[index].name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        Axios.delete(`${API_URL}/products/${id}`)
          .then(res => {
            MySwal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then(result => {
              if (result.value) {
                Axios.get(`${API_URL}/products`).then(res1 => {
                  this.setState({ products: res1.data });
                });
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  onEditClick = index => {
    this.setState({ indexedit: index, isModalEditOpen: true });
  };

  onSaveaddDataClick = () => {
    var namaadd = this.refs.namaadd.value;
    var imageadd = this.refs.imageadd.value;
    var stockadd = parseInt(this.refs.stockadd.value);
    var categoryadd = parseInt(this.refs.categoryadd.value);
    var hargaadd = parseInt(this.refs.hargaadd.value);
    var deskripsiadd = this.refs.deskripsiadd.value;
    var obj = {
      name: namaadd,
      image: imageadd,
      stock: stockadd,
      kategoriId: categoryadd,
      harga: hargaadd,
      deskripsi: deskripsiadd
    };
    Axios.post(`${API_URL}/products`, obj)
      .then(res => {
        Axios.get(`${API_URL}/products?_expand=kategori`)
          .then(resakhir => {
            this.setState({ products: resakhir.data, isModalAddOpen: false });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onsaveEditClick = () => {
    var namaedit = this.refs.namaedit.value;
    var imageedit = this.refs.imageedit.value;
    var stockedit = parseInt(this.refs.stockedit.value);
    var categoryedit = parseInt(this.refs.categoryedit.value);
    var hargaedit = parseInt(this.refs.hargaedit.value);
    var deskripsiedit = this.refs.deskripsiedit.value;
    var obj = {
      name: namaedit,
      image: imageedit,
      stock: stockedit,
      kategoriId: categoryedit,
      harga: hargaedit,
      deskripsi: deskripsiedit
    };
    var id = this.state.products[this.state.indexedit].id;
    console.log(obj, id);
    Axios.put(`${API_URL}/products/${id}`, obj)
      .then(res => {
        Axios.get(`${API_URL}/products?_expand=kategori`).then(resakhir => {
          this.setState({ products: resakhir.data, isModalEditOpen: false });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderProducts = () => {
    const { products } = this.state;
    return products.map((val, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{val.name}</td>
          <td>
            <img src={val.image} alt={val.name} width="150" height="200px" />
          </td>
          <td>{val.stock}</td>
          <td>{val.kategori.nama}</td>
          <td>{val.harga}</td>
          <td>{val.deskripsi}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => this.onEditClick(index, val.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteconfirm(index, val.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  rendercategorytoadd = () => {
    return this.state.categories.map((val, index) => {
      return (
        <option key={index} value={val.id}>
          {val.nama}
        </option>
      );
    });
  };

  render() {
    const { indexedit, products } = this.state;
    if (this.props.User.role === "admin") {
      return (
        <div className="pt-5">
          <Modal isOpen={this.state.isModalAddOpen} toggle={this.toggleadd}>
            <ModalHeader toggle={this.toggleadd}>Add data</ModalHeader>
            <ModalBody>
              <input
                type="text"
                ref="namaadd"
                placeholder="Product Name"
                className="form-control mt-2"
              />
              <input
                type="text"
                ref="imageadd"
                placeholder="Url Image"
                className="form-control mt-2"
              />
              <input
                type="number"
                ref="stockadd"
                placeholder="Jumlah Stock"
                className="form-control mt-2"
              />
              <select ref="categoryadd" className="form-control mt-2">
                <option value="" hidden>
                  Pilih Category
                </option>
                {this.rendercategorytoadd()}
              </select>
              <input
                type="number"
                ref="hargaadd"
                placeholder="Harga"
                className="form-control mt-2"
              />
              <textarea
                cols="20"
                rows="10"
                ref="deskripsiadd"
                className="form-control mt-2"
                placeholder="deskripsi box "
              ></textarea>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onSaveaddDataClick}>
                Save
              </Button>{" "}
              <Button color="secondary" onClick={this.toggleadd}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {this.state.products.length ? (
            <Modal isOpen={this.state.isModalEditOpen} toggle={this.toggleedit}>
              <ModalHeader toggle={this.toggleedit}>
                Edit data {products[indexedit].name}{" "}
              </ModalHeader>
              <ModalBody>
                <input
                  type="text"
                  ref="namaedit"
                  defaultValue={products[indexedit].name}
                  placeholder="Product Name"
                  className="form-control mt-2"
                />
                <input
                  type="text"
                  ref="imageedit"
                  defaultValue={products[indexedit].image}
                  placeholder="Url Image"
                  className="form-control mt-2"
                />
                <input
                  type="number"
                  ref="stockedit"
                  defaultValue={products[indexedit].stock}
                  placeholder="Jumlah Stock"
                  className="form-control mt-2"
                />
                <select
                  ref="categoryedit"
                  defaultValue={products[indexedit].kategoriId}
                  className="form-control mt-2"
                >
                  <option value="" hidden>
                    Pilih Category
                  </option>
                  {this.rendercategorytoadd()}
                </select>
                <input
                  type="number"
                  ref="hargaedit"
                  defaultValue={products[indexedit].harga}
                  placeholder="Harga"
                  className="form-control mt-2"
                />
                <textarea
                  cols="20"
                  rows="10"
                  ref="deskripsiedit"
                  defaultValue={products[indexedit].deskripsi}
                  className="form-control mt-2"
                  placeholder="deskripsi box "
                ></textarea>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.onsaveEditClick}>
                  Save
                </Button>
                <Button color="secondary" onClick={this.toggleedit}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          ) : null}
          <button className="btn btn-primary mt-4" onClick={this.toggleadd}>
            Add Data
          </button>
          <Table striped>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Image</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{this.renderProducts()}</tbody>
          </Table>
        </div>
      );
    } else {
      return <Redirect to="/NotFound" />;
    }
  }
}

const MapstatetoProps = state => {
  return {
    User: state.Auth
  };
};

export default connect(MapstatetoProps)(ManageAdmin);
