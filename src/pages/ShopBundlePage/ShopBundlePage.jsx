import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import styles from "./ShopBundlePage.css"

import {Form, Card, Row, Col, Button, Badge} from 'react-bootstrap'

class ShopBundlePage extends Component { 
  state = {
    invalidForm: true,
    store: this.props.location.state.store,
    bundle: this.props.location.state.bundle,
    products: this.props.location.state.productsInBundle,

    formData: {
      productsSelected: []
    }
  }
  
  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    // TODO: this.props.handleAddOrder(this.state.formData);
  }

  handleChange = e => {
    e.preventDefault();

    let targetKey = e.target.name;
    let targetValue = e.target.value;
    let value = this.updateProductsSelected(targetKey, targetValue)
    
    const formData = {...this.state.formData, [targetKey]: value};
    
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    })
  };

  updateProductsSelected(key, product) {
    if(this.maxProductsSelected()) {
      return [...this.state.formData[key]];
    } else {
      return [...this.state.formData[key], product];
    }
  };

  remainingChoices() {
    let remainingChoices = this.state.bundle.maxNumProducts - this.state.formData.productsSelected.length;
    return remainingChoices;
  }

  maxProductsSelected() {
    let numProductsSelected = this.state.formData.productsSelected.length;
    if( numProductsSelected >= this.state.bundle.maxNumProducts) return true
  }

  productQtySelected(productId) {
    let productsSelected = this.state.formData.productsSelected;
    let qtySelected = productsSelected.filter(selectedProductID => selectedProductID === productId);

    return qtySelected.length;

  }

  getSelectedProductName(p, idx) {
    let productsSelected = this.state.formData.productsSelected;
    let selectedProductID = productsSelected[idx]

    let productsCatalog = this.state.products;

    let selectedProductName = productsCatalog.filter((product) => product._id === selectedProductID)[0].productName; 

    return selectedProductName;
  }

  addToCartAlert() {
    alert('Added to Cart!')
  };

  render() {
    const {bundle, products, store, productsInBundle} = this.state;
    const {productsSelected} = this.state.formData;

    return (
      <div className="bundle-builder">
        <div className="header">
          <Button className="back-btn" onClick={this.props.history.goBack} variant="success" style={{ backgroundColor: 'pink' }} > Back to Bundles </Button>
          <h1>{bundle.bundleName}</h1>
          <h3>${bundle.price}</h3>
        </div>


        <Form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
        <Row>
          <Col md={2}></Col>
          <Col md={4}>
          {/* Products Menu */}
            {products.map((product,idx) => 

              <div className="productDisplay" key={idx}>

                <Card className="mx-auto card" style={{ width: '18rem' }}>
                  <Card.Body className="cardBody">
                    
                    <Card.Title className="cardTitle">{product.productName}</Card.Title>
                    
                    <Card.Text className="cardText">
                      {product.description}
                    </Card.Text>
                    
                    <Card.Link>
                      <Button 
                        name="productsSelected" 
                        key={product._id} 
                        value={product._id} 
                        onClick={this.handleChange}
                        size="sm"
                        variant="dark"
                        >
                        ADD &nbsp;
                          <Badge variant="light">
                            {this.productQtySelected(`${product._id}`)}
                          </Badge>
                      </Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Col>


          <Col md={4}>
            <h1>Your Bundle</h1>
            {productsSelected.map((selectedProduct, idx)=>
              <div className="shopping-bag">
                {this.getSelectedProductName(selectedProduct, idx)}
              </div>
            )}

          {/* Add to Cart Button */}
              {this.remainingChoices() === 0 ? 
              <h3 className="btn-add-to-cart">
                  <Button
                    variant="success" 
                    type="submit" 
                    className="btn" 
                    disabled={this.state.invalidForm}
                    onClick={this.addToCartAlert}>
                      All set! Add to Cart
                  </Button>
                </h3>
              :
                <h3 className="btn-add-to-cart">
                  <Button
                    variant="outline-danger" 
                    type="submit" 
                    className="btn" 
                    disabled={true}>
                      Choose {this.remainingChoices()} More
                  </Button>
                </h3>
              }

          </Col>
          <Col md={2}></Col>
        </Row>
        
        </Form>
      </div>
    )
  }

}

export default withRouter(ShopBundlePage);