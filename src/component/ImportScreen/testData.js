export const catalog = "Electronics";
export const family = {
	id: "1",
	Family: "Digital Camera",
	"No. of Products": "2",
	State: "Active",
	"No. of Attributes": "5",
	Last_update: "Rohit Sharma",
};
export const product = [
	{
		key: "1",
		bsn: "AHFGA123",
		size: "4 GB",
		cod_available: "Yes",
		emi_available: "No",
		updated_on: "",
		update_time: "11:05",
	},
	{
		key: "2",
		bsn: "ZHFGA124",
		size: "8",
		cod_available: "nahi",
		emi_available: "Yes",
		updated_on: new Date().toUTCString(),
		update_time: "12:05",
	},
	{
		key: "3",
		bsn: "WHFGA125",
		size: "4 GB",
		cod_available: "Yes",
		emi_available: "No",
		updated_on: "",
		update_time: "",
	},
	{
		key: "4",
		bsn: "WHFGA126",
		size: "64 GB",
		cod_available: "",
		emi_available: "No",
		updated_on: "",
		update_time: "",
	},
	{
		key: "5",
		bsn: "WHFGA127",
		size: "16 GB",
		cod_available: "aaaa",
		emi_available: "",
		updated_on: "",
		update_time: "25:24",
	},
	{
		key: "6",
		bsn: "WHFGA128",
		size: "4 GB",
		cod_available: "Yes",
		emi_available: "Yes",
		updated_on: new Date().toUTCString(),
		update_time: "12:13",
	},
];
export const attributes = [
		{
			name: "size",
			mandatory: true,
			list: ["4 GB", "8 GB", "16 GB", "32 GB", "64 GB"],
		},
		{
			name: "sort",
			mandatory: true,
			list: ["ascending", "descending"],
		},
		{
			name: "updated_on",
			mandatory: true,
		},
	];
