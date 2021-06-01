<template>
	<div class="cinema_body">
		<Loading v-if="isLoading" />
		<Scroller v-else>
			<ul>
				<li v-for="itme in ciList" :key="itme.cinemaId">
					<div>
						<span>{{itme.name}}</span>
						<span class="q"><span class="price">{{itme.lowPrice/100}}</span> 元起</span>
					</div>
					<div class="address">
						<span>{{itme.address}}</span>
						<span>1763.5km</span>
					</div>
					<div class="card">
						<div>小吃</div>
						<div>折扣卡</div>
					</div>
				</li>
			</ul>
		</Scroller>
	</div>
</template>

<script>
import axios from "axios"
export default {
	name: "CiList",
	data(){
		return {
			ciList: [],
			isLoading: true
		}
	},
	mounted() {
		axios({
			url: "https://m.maizuo.com/gateway?cityId=440100&ticketFlag=1&k=615337",
			headers: {
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218222751230443705794561","bc":"440100"}',
				'X-Host': 'mall.film-ticket.cinema.list'
			}
		}).then(res => {
			this.ciList = res.data.data.cinemas;
			this.isLoading = false;
		})
	}
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
