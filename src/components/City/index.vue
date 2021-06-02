<template>
	<div class="city_body">
		<div class="city_list">
			<Loading v-if="isLoading" />
			<Scroller v-else ref="city_list">
				<div>
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="data in hotList" :key="data.cityId" @click="handleToCity(data.name,data.cityId)">{{data.name}}</li>
						</ul>
					</div>
					<div class="city_sort" ref="city_sort">
						<div v-for="itme in cityList" :key="itme.index">
							<h2>{{itme.index}}</h2>
							<ul>
								<li v-for="data in itme.list" :key="data.id" @click="handleToCity(data.name,data.id)">{{data.name}}</li>
							</ul>
						</div>
					</div>
				</div>
			</Scroller>
		</div>
		<div class="city_index">
			<ul>
				<li v-for="(itme,index) in cityList" :key="itme.index" @click="handleIndex(index)">{{itme.index}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: "City",
	data(){
		return{
			cityList: [],
			hotList: [],
			isLoading: true
		}
	},
	mounted() {
		var cityList = window.localStorage.getItem("cityList");
		var hotList = window.localStorage.getItem("hotList");
		if(cityList && hotList){
			this.cityList = JSON.parse(cityList)
			this.hotList = JSON.parse(hotList)
			this.isLoading = false;
		}else{
			this.axios({
				url: "https://m.maizuo.com/gateway?k=7002583",
				headers: {
					'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16220848331422012132098049"}',
					'X-Host': 'mall.film-ticket.city.list'
				}
			}).then(res => {
				var msg = res.data.msg;
				
				if(msg === "ok"){
					var cities = res.data.data.cities;
					var { cityList,hotList } = this.handleCityArr(cities);
					this.cityList = cityList;
					this.hotList = hotList;
					window.localStorage.setItem("cityList", JSON.stringify(cityList))
					window.localStorage.setItem("hotList", JSON.stringify(hotList))
					this.isLoading = false;
					
				}
				
			})
		}
	},
	methods:{
		handleCityArr(cities){
			var cityList = [];
			var hotList = [];
			
			for(var i =0; i<cities.length;i++ ){
				if(cities[i].isHot === 1){
					hotList.push(cities[i])
				}
			}
			
			for(var i = 0; i< cities.length; i++){
				var firstLetter = cities[i].pinyin.substring(0,1).toUpperCase();
				if(toCom(firstLetter)){
					cityList.push({index: firstLetter, list: [{name: cities[i].name, id: cities[i].cityId}]})
				}else{
					for(var j =0; j < cityList.length; j++ ){
						if(cityList[j].index === firstLetter){
							cityList[j].list.push({name: cities[i].name, id: cities[i].cityId});
						}
					}
				}
			}
			
			cityList.sort((n1,n2) => {
				if(n1.index > n2.index){
					return 1;
				}else if(n1.index < n2.index) {
					return -1
				}else{
					return 0;
				}
			})
			
			function toCom(firstLetter) {
				for(var i = 0;i < cityList.length; i++){
					if(cityList[i].index === firstLetter){
						return false;
					}
				}
				return true;
			}
			
			return {
				cityList,
				hotList
			}
		},
		
		handleIndex(index){
			var h2 = this.$refs.city_sort.getElementsByTagName("h2");
			// this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
			this.$refs.city_list.toScrollTop(-h2[index].offsetTop)
		},
		handleToCity(name,cityId){
			this.$store.commit("City/CITY_INFO", {name,cityId});
			window.localStorage.setItem("nowName", name)
			window.localStorage.setItem("nowCityId", cityId)
			this.$router.push("/movie/nowplaying");
		}
	}
	
}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul{}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort{}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
