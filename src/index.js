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

function getProductsCardSumary(productsCart) {
	return productsCart.map(product => ({
		name: product.name,
		category: product.category
	}))
}

function findProductsByIds(productsList, ids) {
	return ids.map(id => getProductById(productsList, id))
}

function getProductById(productsList, id) {
	return productsList.find(product => product.id === id)
}

function getPromotionByProducts(productsCart) {
	const categories = []
	productsCart.forEach(product => {
		if (!categories.includes(product.category)) {
			categories.push(product.category)
		}		
	})

	return promotions[categories.length - 1]
}

function calcTotalsCart(productsCart, promotionCart) {
	let totalCart = 0
	let totalCartWithDiscount = 0
	productsCart.forEach(product => {
		const discount = getProductDiscount(product, promotionCart)
		const price = discount || product.regularPrice
	
		totalCartWithDiscount += price
		totalCart += product.regularPrice
	})
	
	const totalDiscount = totalCart - totalCartWithDiscount
	const percentDiscount = (totalDiscount * 100) / totalCart

	return {
		totalPrice: totalCartWithDiscount.toFixed(2),
		discountValue: totalDiscount.toFixed(2),
		discount: `${percentDiscount.toFixed(2)}%`
	}
}

function getProductDiscount(product, promotionCart) {
	let discount = 0
	product.promotions.forEach(promotion => {
		if (promotion.looks.includes(promotionCart)) {
			discount = promotion.price
		}
	})
	return discount
}

module.exports = { getShoppingCart };
