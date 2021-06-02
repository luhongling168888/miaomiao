<template>
	<div id="main">
		<Header title="喵喵电影" />
		<div id="content">
			<div class="movie_menu">
				<router-link to="/movie/city" tag="div" class="city_name">
					<span>{{$store.state.City.name}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link to="/movie/nowplaying" tag="div" class="hot_item">正在热映</router-link>
					<router-link to="/movie/commingsoon" tag="div" class="hot_item">即将上映</router-link>
				</div>
				<router-link to="/movie/search" tag="div" class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
		<TabBar />
		<router-view name="detail" />
	</div>
</template>

<script>
import Header from "@/components/Header"
import TabBar from "@/components/TabBar"
// import { messageBox } from "@/components/JS"
export default {
	name: "Movie",
	components:{
		Header,
		TabBar
	},
	mounted() {
		// setTimeout(() =>{
		// 	this.axios({
		// 		url: "https://m.maizuo.com/gateway?cityId=440100&k=7016187",
		// 		header: {
		// 			'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16225170481850671343075329","bc":"440100"}',
		// 			'X-Host': 'mall.cfg.film-float.banner'
		// 		}
		// 	}).then(res =>{
		// 		var msg = res.data.msg;
		// 		console.log(res)
		// 		if(msg === "ok"){
		// 			var name = res.data.data.name;
		// 			var cityId = res.data.data.cityId;
		// 			for(this.$store.state.City.cityId == cityId){return;}
		// 			messageBox({
		// 				title : "位置定位",
		// 				content: name,
		// 				cancel: "取消",
		// 				ok: "切换定位",
		// 				handleOk(){
		// 					window.localStorage.setItem("nowName", name);
		// 					window.localStorage.setItem("nowCityId", cityId);
		// 					window.localStorage.reload();
		// 				}
		// 			})
		// 		}
		// 	});
		// }, 3000)
	}
}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>
