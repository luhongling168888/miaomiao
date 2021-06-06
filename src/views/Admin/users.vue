<template>
	<div>
		<el-table
		:data="nowTableData"
		border
		style="width: 100%">
			<el-table-column
			align="center"
			prop="userHead"
			label="用户头像">
				<template slot-scope="scope">
				    <img class="userHead" :src="scope.row.userHead" />
				</template>
			</el-table-column>
			<el-table-column
			align="center"
			prop="date"
			label="创建日期">
			</el-table-column>
			<el-table-column
			align="center"
			prop="username"
			label="用户名称">
			</el-table-column>
			<el-table-column
			align="center"
			prop="email"
			label="邮箱地址">
			</el-table-column>
			<el-table-column
			align="center"
			label="操作">
				<template slot-scope="scope">
			        <el-button size="small"  @click="handleToFreese(scope.$index, scope.row)">{{ scope.row.isFreeze ? "已冻结" : "未冻结" }}</el-button>
			        <el-button type="danger" @click="handleToDelete(scope.$index, scope.row)" size="small">删除</el-button>
			    </template>
			</el-table-column>
		</el-table>
		<el-pagination class="page" background layout="prev, pager, next" :total="tableData.length" :page-size="pageSize" :current-page.sync="currentPage">
		</el-pagination>
	</div>
</template>

<script>
export default{
	name: "users",
	data(){
		return {
			tableData: [],
			currentPage: 1,
			pageSize: 4
		}
	},
	computed:{
		nowTableData(){
			return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize) || [];
		}
	},
	mounted(){
		this.axios.get('/api/admin/usersList').then(res => {
			var status = res.data.status;
			if(status === 0){
				this.tableData = res.data.data.usersList;
			}
		})
	},
	methods: {
		handleToFreese(index, row){
			this.axios.post('/api/admin/updateFreeze', {
				email : row.email,
				isFreeze : !row.isFreeze
			}).then(res => {
				var status = res.data.status;
				if(status === 0){
					this.$alert('账号冻结成功', '提示信息', {
						confirmButtonText: '确定',
						callback: action => {
							this.tableData[index].isFreeze = !row.isFreeze;
						}
					});
				}else{
					this.$alert('账号操作失败', '提示信息', {
						confirmButtonText: '确定'
					});
				}
			})
		},
		handleToDelete(index, row){
			this.axios.post('/api/admin/deleteUser', {
				email: row.email
			}).then(res => {
				var status =res.data.status;
				console.log(status)
				if(status === 0){
					this.$alert('账号删除成功', '提示信息', {
						confirmButtonText: '确定',
						callback: action => {
							this.tableData[index].split(index, 1);
						}
					});
				}else{
					this.$alert('删除操作失败', '提示信息', {
						confirmButtonText: '确定'
					});
				}
			})
		}
	}
		
}
</script>

<style scoped>
.page{margin-top: 20px;}
.userHead{width: 50px;height: 50px;border-radius: 50%;overflow: hidden;}
</style>
