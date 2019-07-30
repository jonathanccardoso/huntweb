import React, { Component } from 'react';
import api from "../../services/api";

import "./styles.css";

export default class Main extends Component {
	// sempre um objeto
	state = {
		products: [],
		productInfo: {},
		page: 1,
	};

	// função do react
	componentDidMount() {
		this.loadProducts();
	}

	// função propria
	loadProducts = async (page = 1) => {
		const response = await api.get(`/products?=${page}`);

		const { docs, ...productInfo } = response.data;

		// preencher products
		this.setState({ products: docs, productInfo, page });
	};

	prevPage = () => {
		const { page, productInfo } = this.state;

		if (page === 1) return;

		const pageNumber = page - 1;

		this.loadProducts(pageNumber);
	};

	nextPage = () => {
		const { page, productInfo } = this.state;

		if (page === productInfo.pages) return;

		const pageNumber = page + 1;

		this.loadProducts(pageNumber);
	};

	render() {
		const { products, page } = this.state;
		
		return (
			<div className="product-list">
				{products.map(product => (
					<article key={product._id}>
						<strong>{product.title}</strong>
						<p>{product.description}</p>

						<a href="">Acessar</a>
					</article>
				))}
				<div className="actions">
					<button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
					<button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
				</div>
			</div>
		);
	}
}