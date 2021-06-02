<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
import BScroll from "better-scroll";
import Pullup from '@better-scroll/pull-up'
export default {
	name: "Scroller",
	props : {
	    handleToScroll : {
	        type : Function,
	        default : function(){}
	    },
	    handleToTouchEnd : {
	        type : Function,
	        default : function(){}
	    },
		handleToPullingUp : {
		    type : Function,
		    default : function(){}
		},
	},
	mounted() {
		var scroll = new BScroll( this.$refs.wrapper , {
		    tap: true,
			click: true,
			pullUpLoad: {
				threshold: -20
			},
		    probeType: 1
		});
		
		this.scroll = scroll;
		
		scroll.on('scroll',(pos)=>{
		    this.handleToScroll(pos);
		});
		
		scroll.on('touchEnd',(pos)=>{
		    this.handleToTouchEnd(pos);
		});
		scroll.on('pullingUp',() => {
			this.handleToPullingUp();
			setTimeout(() =>{
				this.scroll.finishPullUp();
				this.scroll.refresh();	
			},3000);
		})
	},
	methods:{
		toScrollTop(y){
			this.scroll.scrollTo(0,y);
		}
	}
}
</script>

<style scoped>
.wrapper{height: 100%;}
</style>
