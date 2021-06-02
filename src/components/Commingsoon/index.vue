<template>
	<div class="movie_body">
		<Loading v-if="isloading" />
		<Scroller v-else :handleToPullingUp="handleToPullingUp">
			<ul>
				<li v-for="item in commingList" :key="item.filmId">
					<div class="pic_show" @click="handleDetail(item.filmId)"><img :src="item.poster"></div>
					<div class="info_list">
						<h2 @click="handleDetail(item.filmId)">{{item.name}}<img v-if="item.item.name === '3D'" src="@/assets/maxs.png" /></h2>
						<p>观众评分： <span class="grade">{{item.grade}}</span></p>
						<p>主演: {{item.actors | actorsfilter}}</p>
						<p>{{item.nation}}|{{item.runtime}}分钟</p>
					</div>
					<div class="btn_mall">
						购票
					</div>
				</li>
			</ul>
		</Scroller>
	</div>
</template>

<script>
import Filters from "@/components/Filters/ActorsFilter"
export default {
	name: "Commingsoon",
	data(){
		return {
			commingList: [],
			isloading: true,
			prevCityId: -1,
			current: 1,
			total: 0
		}
	},
	activated() {
		
		var cityId = this.$store.state.City.cityId;
		if(this.prevCityId === cityId){return;}
		this.isLoading = true;
		
		this.axios({
			url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=2&k=2711016`,
			headers: {
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16219099991298557592141825","bc":"440100"}',
				'X-Host': 'mall.film-ticket.film.list'
			}
		}).then(res => {
			var msg = res.data.msg;
			if(msg === "ok"){
				this.commingList = res.data.data.films;
				this.isloading = false;
				this.prevCityId = cityId;
			}
		})
	},
	methods:{
		handleDetail(filmId){
			this.$router.push("/movie/detail/2/" + filmId);
		},
		
		handleToPullingUp(){
			this.current ++;
			var cityId = this.$store.state.City.cityId;
			if(this.commingList.length === this.total){
				return ;
			};
			this.axios({
				url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=${this.current}&pageSize=10&type=2&k=2711016`,
				headers: {
					'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16219099991298557592141825","bc":"440100"}',
					'X-Host': 'mall.film-ticket.film.list'
				}
			}).then(res => {
				var msg = res.data.msg;
				if(msg === "ok"){
					this.commingList = [...this.commingList, ...res.data.data.films];
				}
			})
		}
	}
	
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
