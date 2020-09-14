import merchStoreReducer from '../../reducers/merch-store-reducer';

describe('merchStoreReducer', () => {
	const currentState = {
		masterList: {
			1: {
				name: 'testProduct',
				price: 5.0,
				description: 'testDescription',
				id: 1,
			},
			2: {
				name: 'testProduct2',
				price: 2.0,
				description: 'testDescription2',
				id: 2,
			},
		},
	};

	test('Should return default state if there is no action type passed into the reducer', () => {
		expect(merchStoreReducer({}, { type: null })).toEqual({});
	});

	test('Should be able to add a product to the master list', () => {
		const [name, price, description, id] = [
			'testProduct',
			5.0,
			'testDescription',
			1,
		];

		const action = {
			type: 'ADD_PRODUCT',
			name: name,
			price: price,
			description: description,
			id: id,
		};
		expect(merchStoreReducer({}, action)).toEqual({
			masterList: {
				[id]: {
					name: name,
					price: price,
					description: description,
					id: id,
				},
			},
		});
	});

	test('Should be able to update and existing product', () => {
		const [name, price, description, id] = [
			'testProduct',
			5.0,
			'testDescription',
			1,
		];
		const action = {
			type: 'ADD_PRODUCT',
			name: name,
			price: price,
			description: description,
			id: id,
		};
		const testState = merchStoreReducer({}, action);
		const editAction = {
			type: 'ADD_PRODUCT',
			name: 'hat',
			price: 10,
			description: 'testDescription',
			id: 1,
		};
		expect(merchStoreReducer(testState, editAction)).toEqual({
			masterList: {
				[id]: {
					name: 'hat',
					price: 10,
					description: 'testDescription',
					id: id,
				},
			},
		});
	});

	test('Should succesfully delete a product', () => {
		const action = {
			type: 'DELETE_PRODUCT',
			id: 1,
		};
		expect(merchStoreReducer(currentState, action)).toEqual({
			masterList: {
				2: {
					name: 'testProduct2',
					price: 2.0,
					description: 'testDescription2',
					id: 2,
				},
			},
		});
	});

	test('should add an additional product without complaint', () => {
		const action = {
			type: 'ADD_PRODUCT',
			name: 'name3',
			price: 3.0,
			description: 'desc3',
			id: 3,
		};
		expect(merchStoreReducer(currentState, action)).toEqual({
			masterList: {
				1: {
					name: 'testProduct',
					price: 5.0,
					description: 'testDescription',
					id: 1,
				},
				2: {
					name: 'testProduct2',
					price: 2.0,
					description: 'testDescription2',
					id: 2,
				},
				3: {
					name: 'name3',
					price: 3.0,
					description: 'desc3',
					id: 3,
				},
			},
		});
	});
});
