import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import Numeral from "numeral";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API_URL } from "./../supports/ApiUrl";

class Home extends Component {
  state = {
    products: [],
    searchProducts: [],
    sortNama: 0,
    sortPrice: 0
  };

  componentDidMount() {
    axios
      .get(`${API_URL}/products?_expand=kategori`)
      .then(res => {
        this.setState({
          products: res.data,
          searchProducts: res.data
        });
      })
      .catch(() => {});
  }

  onSearchClick = () => {
    let inputName = this.name.value;

    let hasilFilter = this.state.products.filter(product => {
      return product.name.toLowerCase().includes(inputName.toLowerCase());
    });

    this.setState({ searchProducts: hasilFilter });
  };

  onResetClick = () => {
    this.name.value = "";
    this.setState(prevState => {
      return {
        searchProducts: prevState.products
      };
    });
  };

  urut = (a, b) => {
    return a.price - b.price;
  };
  urutDes = (a, b) => {
    return b.price - a.price;
  };

  urutHuruf = (a, b) => {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  };
  urutHurufDes = (a, b) => {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
  };

  onSortName = () => {
    if (!this.state.sortNama) {
      var hasilFilter = this.state.searchProducts.sort(this.urutHuruf);
      this.setState({ searchProducts: hasilFilter });
      this.setState({ sortNama: 1 });
    }
    if (this.state.sortNama) {
      var hasilFilter = this.state.searchProducts.sort(this.urutHurufDes);
      this.setState({ searchProducts: hasilFilter });
      this.setState({ sortNama: 0 });
    }
  };

  renderList = () => {
    return this.state.searchProducts.map((val, index) => {
      return (
        <div key={index} className="p-3" style={{ width: "20%" }}>
          <Card>
            <div style={{ height: 300, width: "100%" }}>
              <img src={val.image} height="100%" width="100%" alt="" />
              <div className="kotakhitam">
                <Link to={`/productdetail/${val.id}`} className="tombolbuynow">
                  <button className="tomboldalam">
                    <FaCartPlus />
                  </button>
                </Link>
              </div>
            </div>
            <CardBody style={{ height: 150 }}>
              <CardTitle style={{ fontWeight: "bold" }} className="mb-2">
                {val.name}
              </CardTitle>
              <CardSubtitle className="mb2">
                {"Rp" + Numeral(val.harga).format(0.0)}
              </CardSubtitle>
              <button disabled className="rounded-pill px-2 btn-primary">
                {val.kategori.nama}
              </button>
            </CardBody>
          </Card>
        </div>
      );
    });
  };

  render() {
    if (!this.props.username) {
      return (
        <div className="mt-5">
          <div className="container mt-5">
            <div className="row">
              <div className="col-3">
                <div className="card mt-5 p-3 shadow-sm mr-2">
                  <div className="card-title border-bottom border-dark">
                    <h3 className="d-inline">Search</h3>
                  </div>
                  <form className="form-group mb-0 mx-2">
                    <h5>Name :</h5>
                    <input
                      onChange={this.onSearchClick}
                      ref={input => {
                        this.name = input;
                      }}
                      className="form-control my-3 btn-light"
                      placeholder="product"
                      type="text"
                      name=""
                      id=""></input>

                      
                      
                    />
                  </form>
                  <div className="d-inline-block align-bottom text-right">
                    <button
                      onClick={this.onResetClick}
                      className="btn btn-block btn-sm btn-secondary"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
                <div className="card mt-2 p-3 shadow-sm mr-2">
                  <div className="card-title border-bottom border-dark">
                    <h3 className="d-inline">Sort by</h3>
                  </div>
                  <div className="mx-2">
                    <button
                      onClick={this.onSortName}
                      className="btn btn-sm btn-block btn-warning"
                    >
                      Product Name
                    </button>
                    <button
                      onClick={this.onSortPrice}
                      className="btn btn-sm btn-block btn-warning"
                    >
                      Product Price
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-9 row mt-5 p-0" style={{ height: "30px" }}>
                <div className="col-12 display-4 text-center mb-2 shadow-sm p-2 card ">
                  Our Product List
                </div>
                {this.renderList()}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="card mt-5 p-3 shadow-sm mr-2">
                <div className="card-title border-bottom border-dark">
                  <h3 className="d-inline">Search</h3>
                </div>
                <form className="form-group mb-0 mx-2">
                  <h5>Name :</h5>
                  <input
                    onChange={this.onSearchClick}
                    ref={input => {
                      this.name = input;
                    }}
                    className="form-control my-3 btn-light"
                    placeholder="product"
                    type="text"
                    name=""
                    id=""
                  />
                </form>
                <div className="d-inline-block align-bottom text-right">
                  <button
                    onClick={this.onResetClick}
                    className="btn btn-block btn-sm btn-secondary"
                  >
                    Refresh
                  </button>
                </div>
              </div>
              <div className="card mt-2 p-3 shadow-sm mr-2">
                <div className="card-title border-bottom border-dark">
                  <h3 className="d-inline">Sort by</h3>
                </div>
                <div className="mx-2">
                  <button
                    onClick={this.onSortName}
                    className="btn btn-sm btn-block btn-warning"
                  >
                    Product Name
                  </button>
                </div>
              </div>
            </div>

            <div className="col-9 row mt-5 p-0" style={{ height: "30px" }}>
              <div className="col-12 display-4 text-center mb-2 shadow-sm p-2 card ">
                Our Product List
              </div>
              {this.renderList()}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    username: state.Auth.username
  };
};

export default connect(mapStateToProps)(Home);
