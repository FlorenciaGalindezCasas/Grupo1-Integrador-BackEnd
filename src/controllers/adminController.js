const {
	getAll,
	getOne,
	createProduct,
	editProduct,
	deleteProduct,
} = require('../models/product.model');

const adminController = {
	getAdminView: async (req, res) => {
		const result = await getAll();

		if (result.error) {
			return res.status(400).json({ error: result.message });
		}

		return res.status(200).render('admin', {
			items: result,
			title: 'Admin',
		});
	},
	getCreateView: (req, res) =>
		res.render('create', {
			title: 'Create',
		}),
	create: async (req, res) => {
		const productObject = {
			product_name: req.body.product_name,
			product_description: req.body.product_description,
			price: req.body.price,
			stock: req.body.stock,
			discount: req.body.discount,
			sku: req.body.sku,
			dues: req.body.dues,
			image_front: `/products/${req.files[0].filename}`,
			image_back: `/products/${req.files[1].filename}`,
			category_id: req.body.category_id,
			licence_id: req.body.licence_id,
		};

		const item = await createProduct(productObject);

		if (item !== undefined && item.error) {
			return res.status(400).json({ error: item.message });
		}

		return res.status(200).render('item', {
			item: item[0],
			title: 'Item',
		});
	},
	getUpdateView: async (req, res) => {
		const { id } = req.params;
		const [item] = await getOne(+id);

		if (item === undefined) {
			return res.status(404).json({ error: `No se encontró el producto con ID: ${id}`});
		}

		if (item.error) {
			return res.status(400).json({ error: item.message });
		}

		return res.status(200).render('edit', {
			item,
			title: 'Item',
		});
	},
	update: async (req, res) => {
		const { id } = req.params;
		const [productToEdit] = await getOne(+id);

		const productObject = {
			product_name: req.body.product_name,
			product_description: req.body.product_description,
			price: req.body.price,
			stock: +req.body.stock,
			discount: +req.body.discount,
			sku: req.body.sku,
			dues: +req.body.dues,
			image_front: req.files[0] !== undefined
				? `/products/${req.files[0].filename}`
				: productToEdit.image_front,
			image_back: req.files[1] !== undefined
				? `/products/${req.files[1].filename}`
				: productToEdit.image_back,
			category_id: +req.body.category_id,
			licence_id: +req.body.licence_id,
		};
		
		const item = await editProduct(+id, productObject);

		if (item !== undefined && item.error) {
			return res.status(400).json({ error: item.message });
		}

		return res.status(200).render('item', {
			item: item[0],
			title: 'Item',
		});
	},
	remove: async (req, res) => {
		const { id } = req.params;

		await deleteProduct(+id);

		return res.status(200).redirect('/admin');
	},
};

module.exports = adminController;
