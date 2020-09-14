export default (state = {}, action) => {
	const { name, price, description, id } = action;
	switch (action.type) {
		case 'ADD_PRODUCT':
			const newMasterList = Object.assign({}, state['masterList'], {
				[id]: {
					name: name,
					price: price,
					description: description,
					id: id,
				},
			});
			return Object.assign({}, state, { masterList: newMasterList });

		case 'DELETE_PRODUCT':
			const deleteMasterList = { ...state['masterList'] };
			delete deleteMasterList[id];
			return Object.assign({}, state, { masterList: deleteMasterList });

		default:
			return state;
	}
};
