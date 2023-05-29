const formProduct = {
	supplier_id: 1,
	product_category_id: 1,
	product_unit_id: 1,
	rack_id: 1,
	product_status_id: 1,
	minimum_stock: 10,
	capital_price: 1000,
	price: 2000,
	name: 'Komix',
	sku_code: 'SKU1234',
	barcode: '12345678',
	active_substance: 'Dextro',
	other_information: 'Harus diminum setelah makan',
	other_product_units: [
		{
			product_id: 1,
			product_unit_id: 2,
			number_of_other_product_units: 1,
			number_of_product_units: 10,
		},
	],
	alternative_prices: [
		{
			product_id: 1,
			alternative_price_category_id: 1,
			number_of_items: 1,
			minimum_item: 100,
			price: 1500,
		},
		{
			product_id: 1,
			alternative_price_category_id: 1,
			number_of_items: 5,
			minimum_item: 500,
			price: 1200,
		},
	],
};

const formInvoice = {
	warehouse_id: 1,
	supplier_id: 1,
	invoice_number: 'INVCOBA-1',
	date: '19/05/2023',
	receipt_date: '21/05/2023',
	total_amount: 400000,
	payment_method: 'Tunai',
	payment_status: 'Lunas',
	due_date: '',
	tax: 7000,
	cashback: 5000,
	other_cost: '',
	products: [
		{
			product_id: 1,
			expired_date: '20/10/2023',
			batch_number: '1a-gr-4u',
			total_amount: 40000,
			qty: 5,
			cashback: 5000,
		},
	],
};
