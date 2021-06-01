const state = {
	name : window.localStorage.getItem("nowName") || "北京",
	cityId : window.localStorage.getItem("nowCityId") || 110100
};

const mutations = {
	CITY_INFO(state, payload){
		state.name = payload.name;
		state.cityId = payload.cityId;
	}
};

const actions = {
	
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
}