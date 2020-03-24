import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer
} from "mdbreact";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "./../supports/ApiUrl";
import Numeral from "numeral";
import { FaArrowAltCircleRight, FaCartPlus } from "react-icons/fa";
import { BukanHome, IniHome } from "./../redux/actions";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    photos: [
      "./image/close-up-photo-of-starbucks-cups-569996.jpg",
      "./image/close-up-of-coffee-cup-324028.jpg",
      "./image/blur-business-cafe-close-up-302889.jpg"
    ],
    products: []
  };

  componentDidMount() {
    this.props.IniHome();
    Axios.get(`${API_URL}/products?_expand=kategori&_limit=5`)
      .then(res => {
        this.setState({ products: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount = () => {
    console.log("test test");
    this.props.bukan();
  };

  renderphoto = () => {
    return this.state.photos.map((val, index) => {
      return (
        <MDBCarouselItem key={index} itemId={index + 1}>
          <MDBView>
            <div style={{ width: "100%", height: 650, display: "flex" }}>
              <img src={val} alt="First slide" width="100%" />
            </div>
            <MDBMask overlay="black-slight" />
          </MDBView>
        </MDBCarouselItem>
      );
    });
  };

  renderProducts = () => {
    return this.state.products.map((val, index) => {
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
    return (
      <div>
        <MDBCarousel
          activeItem={1}
          length={this.state.photos.length}
          showControls={false}
          showIndicators={false}
          interval={1600}
        >
          <MDBCarouselInner>{this.renderphoto()}</MDBCarouselInner>
        </MDBCarousel>
        <div className="px-5 pt-3">
          <div>
            <Link to='/allproduct'>Lihat Semua Product</Link>
            <div>
            Best Seller <FaArrowAltCircleRight />
            </div>
          </div>
          <div className="d-flex">{this.renderProducts()}</div>
        </div>
      </div>
    );
  }
}

const MapstatetoProps = ({ Auth }) => {
  return {
    isLogin: Auth.isLogin
  };
};

export default connect(MapstatetoProps, { bukan: BukanHome, IniHome })(Home);
