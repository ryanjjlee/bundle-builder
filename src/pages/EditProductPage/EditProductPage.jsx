import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class EditProductPage extends Component {
  state = {
    invalidForm: false,
    formData: this.props.location.state.storeProduct
  };

  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleUpdateProduct(this.state.formData);
  };

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name] : e.target.value};

    this.setState({formData, invalidForm: !this.formRef.current.checkValidity()});
  };

  render() {
    return(
      <div>
        <h1>Edit Product</h1>
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

          <button type="submit"
          className="btn" disabled={this.state.invalidForm}>
            Save
          </button>
          <Link to='/admin/products'>Cancel</Link>
        </form>
      </div>
    )
  }
}

export default EditProductPage;