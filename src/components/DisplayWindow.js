import React from 'react';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ProductDetails from './ProductDetails';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DisplayWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 'index',
			currentProduct: null,
		};
	}

	handleLinks = (pageName) => {
		this.setState({
			currentPage: pageName,
		});
	};

	handleAddingNewProduct = (newProduct) => {
		const { dispatch } = this.props;
		const { id, name, price, description } = newProduct;
		const action = {
			type: 'ADD_PRODUCT',
			name: name,
			price: price,
			description: description,
			id: id,
		};
		dispatch(action);
		this.handleLinks('index');
	};

	handleClickingEdit = (id) => {
		const productToEdit = this.props.masterList[id];
		// const productToEdit = this.state.masterList.filter(
		// 	(products) => products.id === id
		// )[0];
		this.setState({
			currentPage: 'edit',
			currentProduct: productToEdit,
		});
	};

	handleEditProduct = (editedProduct) => {
		const { dispatch } = this.props;
		const { id, name, description, price } = editedProduct;
		const action = {
			type: 'ADD_PRODUCT',
			id,
			name,
			description,
			price,
		};
		dispatch(action);
		this.setState({
			currentPage: 'details',
			currentProduct: editedProduct,
		});
	};

	handleDeleteProduct = (id) => {
		const { dispatch } = this.props;
		const action = {
			type: 'DELETE_PRODUCT',
			id,
		};
		dispatch(action);
		this.setState({
			currentPage: 'index',
			currentProduct: null,
		});
	};

	handleViewingDetails = (id) => {
		const productToView = this.props.masterList[id];
		this.setState({
			currentPage: 'details',
			currentProduct: productToView,
		});
	};

	render() {
		let pageToDisplay = null;
		if (this.state.currentPage === 'index') {
			pageToDisplay = (
				<ProductList
					productList={this.props.masterList}
					onLinkClick={this.handleLinks}
					onProductClick={this.handleViewingDetails}
				/>
			);
		} else if (this.state.currentPage === 'create') {
			pageToDisplay = (
				<AddProduct
					onLinkClick={this.handleLinks}
					onAddingProduct={this.handleAddingNewProduct}
				/>
			);
		} else if (this.state.currentPage === 'details') {
			pageToDisplay = (
				<ProductDetails
					product={this.state.currentProduct}
					onLinkClick={this.handleLinks}
					onDeleteClick={this.handleDeleteProduct}
					onEditClick={this.handleClickingEdit}
				/>
			);
		} else if (this.state.currentPage === 'edit') {
			pageToDisplay = (
				<EditProduct
					product={this.state.currentProduct}
					onLinkClick={this.handleLinks}
					onEditProduct={this.handleEditProduct}
				/>
			);
		} else if (this.state.currentPage === 'edit') {
			pageToDisplay = (
				<EditProduct
					product={this.state.currentProduct}
					onLinkClick={this.handleLinks}
					onEditProduct={this.handleEditProduct}
				/>
			);
		}
		return <React.Fragment>{pageToDisplay}</React.Fragment>;
	}
}

DisplayWindow.propTypes = {
	masterList: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		masterList: state['masterList'],
	};
};

DisplayWindow = connect(mapStateToProps)(DisplayWindow);

export default DisplayWindow;
