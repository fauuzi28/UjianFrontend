import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "./../supports/ApiUrl";
import { Table } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { changetoRupiah } from "../supports/ChangeToRp";
import {countCart} from './../redux/actions'
const MySwal = withReactContent(Swal);
class Cart extends Component {
  state = {
    isicart: [],
    statuscart:[],
  };

  componentDidMount() {
    this.getdata();
  }

  

  getdata = () => {
    Axios.get(
      `${API_URL}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=oncart`
    )
      .then(res => {
        this.setState({statuscart:res.data})
        var newarrforprod = [];
        res.data[0].transactiondetails.forEach(element => {
          newarrforprod.push(
            Axios.get(`${API_URL}/products/${element.productId}`)
          );
        });

        Axios.all(newarrforprod).then(res2 => {
          res2.forEach((val, index) => {
            res.data[0].transactiondetails[index].dataprod = val.data;
          });
          console.log(res.data[0].transactiondetails);
          this.setState({ isicart: res.data[0].transactiondetails });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  onCheckout = () => {
    MySwal.fire({
      title: `Are you sure wanna Checkout ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "Nope"
    }).then((result) => {
      if (result.value) {
        var statuscart = this.state.statuscart
        var objupdate = {
          status : 'onproses',
          id: statuscart[0].id,
          metode:'cc'
        }
        Axios.patch(`${API_URL}/transactions/${objupdate.id}`, objupdate)
          .then(res => {
            MySwal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then(result => {
              if (result.value) {
                this.getdata();
                this.props.countCart(this.props.User.id)
                this.setState({isicart:[]})
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  totalharga=()=>{
    let total=0
    this.state.isicart.forEach((val)=>{
        total+=val.qty*val.dataprod.harga
    })
    return(
        <tr style={{verticalAlign:"middle"}}>
            <td colSpan="2" style={{verticalAlign:"middle", fontSize:20, fontWeight:"bolder"}}>Total</td>
            <td colSpan="2" ></td>
            <td style={{fontWeight:"bolder", fontSize:20}}>{changetoRupiah(total)}</td>
        </tr>
    )
}


  renderisidata = () => {
    return this.state.isicart.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.dataprod.name}</td>
          <td>
            <img src={val.dataprod.image} height="200" alt="" />
          </td>
          <td>{val.dataprod.deskripsi}</td>
          <td>{val.qty}</td>
          <td>{val.dataprod.harga}</td>
          <td>
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
  deleteconfirm = (index, id) => {
    MySwal.fire({
      title: `Are you sure wanna delete ${this.state.isicart[index].dataprod.name} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        Axios.delete(`${API_URL}/transactiondetails/${id}`)
          .then(res => {
            MySwal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then(result => {
              if (result.value) {
                this.getdata();
                this.props.countCart(this.props.User.id)
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };
  render() {
    return (
      <div className="paddingatas">
        <Table striped>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>foto</th>
              <th>Deskripsi</th>
              <th>qty</th>
              <th>Harga</th>
              <th>Hapus</th>
            </tr>
          </thead>
          <tbody>{this.renderisidata()}</tbody>
          <tfoot>{this.totalharga()}</tfoot>
        </Table>
        <button className="btn btn-success" onClick={this.onCheckout}>Checkout</button>
      </div>
    );
  }
}
const MapstatetoProps = state => {
  return {
    User: state.Auth
  };
};
export default connect(MapstatetoProps,{countCart})(Cart);
