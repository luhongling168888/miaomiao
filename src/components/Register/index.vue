<template>
	<div class="register_body">
		<div>
			用户名<input v-model="username" type="text" class="register_text" />
		</div>
		<div>
			密码<input v-model="password" type="password" class="register_text" />
		</div>
		<div>
			确认密码<input v-model="password1" type="password" class="register_text" />
		</div>
		<div class="register_email">
			邮箱<input v-model="email" type="text"  class="register_text" /><button :disablet="disablet" @click="handleToVerify">{{verifyInfo}}</button>
		</div>
		<div >
			验证码<input v-model="verify" type="text" class="register_text" />
		</div>
		<div class="register_btn">
			<button @click="handleToRegister">注册</button>
		</div>
		<div class="register_link">
			<router-link to="/mine/login">立即登录</router-link>
			<router-link to="/mine/findpassword">找回密码</router-link>
		</div>
	</div>
</template>

<script>
import { messageBox } from "@/components/JS"
export default {
	name: 'Register',
	data(){
		return {
			username: "",
			password: "",
			password1: "",
			email: "",
			verify: "",
			verifyInfo: "发送验证码",
			disablet: false
		}
	},
	methods:{
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
			})
		},
		handleToRegister(){
			if(this.password === this.password1){
				this.axios.post("/api/users/register", {
					username: this.username,
					password: this.password,
					email: this.email,
					verify: this.verify
				}).then(res => {
					var status = res.data.status;
					if(status === 0){
						var This = this;
						messageBox({
							title : "注册",
							content: "用户注册成功",
							ok: "确定",
							handleOk(){
								This.$router.push("/mine/login")
							}
						})
					}else{
						messageBox({
							title : "注册",
							content: res.data.msg + "请重新输入",
							ok: "确定",
						})
					}
				})
			}else{
				var This = this;
				messageBox({
					title : "密码",
					content: "确认密码不一致",
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
			console.log(timer)
		}
	}
}
</script>

<style scoped>
#content .register_body{  width:100%;}
.register_body .register_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.register_body .register_btn{ height:50px; margin:10px;}
.register_body .register_email{ position: relative;}
.register_body .register_email button{ position: absolute;right: 10px;top: 10px;height: 30px;border-radius: 3px;border: none;padding: 5px; }
.register_body .register_btn button{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.register_body .register_link{ display: flex; justify-content:space-between;}
.register_body .register_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}

</style>
