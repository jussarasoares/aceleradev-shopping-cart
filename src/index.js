const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
	const productsCart = findProductsByIds(productsList, ids)
	const promotion = getPromotionByProducts(productsCart)
	const totals = calcTotalsCart(productsCart, promotion)
	
	return {
		products: getProductsCardSumary(productsCart),
		promotion,
		totalPrice: totals.totalPrice,
		discountValue: totals.discountValue,
		discount: totals.discount
	};
}

function getProductsCardSumary(products) {
	return products.map(product => ({
		name: product.name,
		category: product.category
	}))
}

function findProductsByIds(products, ids) {
	return ids.map(id => getProductById(products, id))
}

function getProductById(products, id) {
	return products.find(product => product.id == id)
}

function getPromotionByProducts(products) {
	const categories = []
	products.map(product => {
		if (!categories.includes(product.category)) {
			categories.push(product.category)
		}		
	})

	switch (categories.length) {
		case 1:
			return promotions[0]
		case 2:
			return promotions[1]
		case 3:
			return promotions[2]
		case 4:
			return promotions[3]
	}
}

function calcTotalsCart(productsCart, promotion) {
	let totalCart = 0
	let totalCartWithDiscount = 0
	productsCart.map(product => {
		const discount = getProductDiscount(product, promotion)
		const price = discount || product.regularPrice
	
		totalCartWithDiscount += price
		totalCart += product.regularPrice
	})
	
	const totalDiscount = totalCart - totalCartWithDiscount
	const percentDiscount = 100 - ((totalCartWithDiscount * 100) / totalCart)

	return {
		totalPrice: totalCartWithDiscount.toFixed(2).toString(),
		discountValue: totalDiscount.toFixed(2).toString(),
		discount: percentDiscount.toFixed(2).toString() + "%"
	}
}

function getProductDiscount(product, promotion) {
	let discount = 0
	product.promotions.map(p => {
		if (p.looks.includes(promotion)) {
			discount = p.price
		}
	})
	return discount
}

module.exports = { getShoppingCart };
