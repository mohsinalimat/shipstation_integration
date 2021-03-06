// Copyright (c) 2020 Parsimony, LLC and contributors
// For license information, please see license.txt

function company_query(frm, cdt, cdn) {
	const row = frm.selected_doc || locals[cdt][cdn];
	return { filters: { 'company': row.company, 'is_group': 0 } };
}

frappe.ui.form.on('Shipstation Settings', {
	setup: frm => {
		frm.set_query('cost_center', 'shipstation_stores', company_query);
		frm.set_query('warehouse', 'shipstation_stores', company_query);
		frm.set_query('tax_account', 'shipstation_stores', company_query);
		frm.set_query('sales_account', 'shipstation_stores', company_query);
		frm.set_query('expense_account', 'shipstation_stores', company_query);
		frm.set_query('shipping_income_account', 'shipstation_stores', company_query);
		frm.set_query('shipping_expense_account', 'shipstation_stores', company_query);
	},
	refresh: frm => {
		if (frm.doc.carrier_data) {
			let wrapper = $(frm.fields_dict["carriers_html"].wrapper);
			wrapper.html(frappe.render_template("carriers", { "carriers": frm.doc.__onload.carriers }));
		}
	},
	update_carriers: frm => {
		frappe.show_alert('Updating Carriers and Stores')
		frm.call({
			doc: frm.doc,
			method: 'update_carriers',
			freeze: true
		}).done(() => { frm.reload_doc() })
	},
	get_items: frm => {
		frappe.show_alert('Getting Items');
		frm.call({
			doc: frm.doc,
			method: 'get_items',
			freeze: true
		}).done((r) => { frappe.show_alert(r.message) })
	},
	get_orders: frm => {
		frappe.show_alert('Getting Orders');
		frm.call({
			doc: frm.doc,
			method: 'get_orders',
			freeze: true
		})
	},
	get_shipments: frm => {
		frappe.show_alert('Getting Shipments');
		frm.call({
			doc: frm.doc,
			method: 'get_shipments',
			freeze: true
		})
	}
});
