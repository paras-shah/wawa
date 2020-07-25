export const data = `{
	"users": [
		{
            "id": 1,
            "gtype":"['Veg','NonVeg','Drinks']",
			"first_name": "Sebastian",
			"last_name": "Eschweiler",
			"username": "Sebastian",
			"password": "admin"
		},
		{
            "id": 2,
            "gtype":"['Veg','NonVeg']",
			"first_name": "Steve",
			"last_name": "Palmer",
			"username": "Steve",
			"password": "admin1"
		},
		{
            "id": 3,
            "gtype":"['Veg', 'Drinks']",
			"first_name": "Ann",
			"last_name": "Smith",
			"username": "Ann",
			"password": "admin2"
		}
    ]
}`;

export const data2 = `{
	"pendingorders": [{
			"gtype": "Veg",
			"orders": "['0111','0112','0113']"
		},
		{
			"gtype": "NonVeg",
			"orders": "['X111','X112','VX113']"
		}, {
			"gtype": "Drinks",
			"orders": "['UX1','UX12','UVX13']"
		}
	]
}`;
