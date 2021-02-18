import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ShopBundlePage extends Component {
  state = {
    invalidForm: true,
    formData: {
    }
  };

  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleBuyBundle(this.state.formData);
  } 

  handleChange = e => {
    const formData = {...this.state.formData,
    [e.target.name]: e.target.value, createdBy: this.props.user._id, productStore: this.props.user.storeOwned[0]};
    console.log('handleChange form Data: ', this.props.user)
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  render() {
    return (
      <div>
        <h1>Add Product</h1>
        <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
          
          <div className="form-group">
            <label>Name</label>
            <input className="form-control" name="productName" value={this.state.formData.productName} onChange={this.handleChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input className="form-control" name="description" value={this.state.formData.description} onChange={this.handleChange} required />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input className="form-control" name="price" value={this.state.formData.price} onChange={this.handleChange} required />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <input className="form-control" name="tags" value={this.state.formData.tags} onChange={this.handleChange} required />
          </div>

          <button type="submit" className="btn" disabled={this.state.invalidForm}>Add Product</button>
        </form>
      </div>
    )
  }

}

export default ShopBundlePage;