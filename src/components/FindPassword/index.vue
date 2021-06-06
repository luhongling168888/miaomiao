<template>
	<div class="findpassword_body">
		<div>
			新密码<input v-model="password" type="password" class="findpassword_text" />
		</div>
		<div>
			确认密码<input v-model="password1" type="password" class="findpassword_text" />
		</div>
		<div class="findpassword_email">
			邮箱<input v-model="email" type="text"  class="findpassword_text" /><button :disablet="disablet" @click="handleToVerify">{{ verifyInfo }}</button>
		</div>
		<div >
			验证码<input v-model="verify" type="text" class="findpassword_text" />
		</div>
		<div class="findpassword_btn">
			<button @click="handleToFindPassword">修改密码</button>
		</div>
		<div class="findpassword_link">
			<router-link to="/mine/login">立即登录</router-link>
			<router-link to="/mine/register">立即注册</router-link>
		</div>
	</div>
</template>

<script>
import { messageBox } from "@/components/JS"
export default {
	name: 'FindPassword',
	data(){
		return {
			password: "",
			password1: "",
			email: "",
			verify: "",
			verifyInfo: "发送验证码",
			disablet: false
		}
	},
	methods: {
		handleToVerify(){
			if(this.disablet){ return; }
			this.axios.get("/api/users/verify?email=" + this.email).then(res => {
				var status = res.data.status;
				var This = this;
				if(status === 0){
					messageBox({
						title : "验证码",
						content: "验证码已发送",
						ok: "确定",
						handleOk(){
							This.CountDown();
						}
					});
				}else{
					messageBox({
						title : "验证码",
						content: "验证码发送失败",
						ok: "确定"
					})
				}
			});
		},
		handleToFindPassword(){
			if(this.password === this.password1){
				this.axios.post("/api/users/findpassword", {
					password: this.password,
					email: this.email,
					verify: this.verify
				}).then(res => {
					var status = res.data.status;
					if(status === 0){
						var This = this;
						messageBox({
							title : "修改",
							content: "修改密码成功",
							ok: "确定",
							handleOk(){
								This.$router.push("/mine/login")
							}
						})
					}else{
						messageBox({
							title : "修改",
							content: res.data.msg + "请重新输入",
							ok: "确定",
						})
					}
				})
			}else{
				var This = this;
				messageBox({
					title : "密码",
					content: "确认密码不一致,请重新输入",
					ok: "确定",
					handleOk(){
						This.password1 = "";
					}
				})
			}
		},
		CountDown(){
			this.disablet = true;
			var count = 60;
			var timer = setInterval(() => {
				count--;
				this.verifyInfo = '剩余' + count + '秒';
				if(count === 0){
					count = 60;
					this.verifyInfo = '发送验证码';
					this.disablet = false;
					clearInterval(timer);
				};
			}, 1000);
		}
	}
}
</script>

<style scoped>
#content .findpassword_body{  width:100%;}
.findpassword_body .findpassword_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.findpassword_body .findpassword_btn{ height:50px; margin:10px;}
.findpassword_body .findpassword_email{ position: relative;}
.findpassword_body .findpassword_email button{ position: absolute;right: 10px;top: 10px;height: 30px;border-radius: 3px;border: none;padding: 5px; }
.findpassword_body .findpassword_btn button{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.findpassword_body .findpassword_link{ display: flex; justify-content:space-between;}
.findpassword_body .findpassword_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>
