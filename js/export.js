
function open_grafana(){
	var job = $("#job_btn").val();
	if (job!=""){
		window.open("http://127.0.0.1:3000/d/demo/prometheusjian-kong-zhan-shi-mian-bai>orgId=1&refresh=30s&var-job="+job+"&from="+new Date($("#start_time_btn").val()).getTime()+"&to="+new Date($("#end_time_btn").val()).getTime());		
	}else{
		$("#alertinfo").empty();
		$("#alertinfo").append("<div class='alert alert-danger' role='alert'><strong>图 表 展 示 至 少 需 要 填 写 项 目 名！</strong></div>");
		setTimeout(function(){$("#alertinfo").empty();},2000);
	}
}

//导出按钮方法
function export_onclick(){
	var start_time = new Date($("#start_time_btn").val()).getTime()/1000;
	var end_time = new Date($("#end_time_btn").val()).getTime()/1000;
	var job = $("#job_btn").val();
	var export_file_name = $("#filename_btn").val();
	var query_step = $("#step_btn").val();
	var serverip = $("#serverip_btn").val();
	var server_url = "http://"+serverip+":9090/api/v1/query_range";
	var ip_arr=[];
	if (start_time!=""&&end_time!=""&&job!=""&&export_file_name!=""&&query_step!=""){
		query_node_ip(ip_arr,serverip,job,start_time);
		export_table(ip_arr,export_file_name,job,start_time,end_time,query_step,server_url);
	}else{
		$("#alertinfo").empty();
		$("#alertinfo").append("<div class='alert alert-danger' role='alert'><strong>请 检 查 导 出 参 数 是 否 填 写 完 整！</strong></div>");
		setTimeout(function(){$("#alertinfo").empty();},2000);
	}
}

//返回数组平均值
function arravg(arr){
	var len = arr.length;
	var sum = 0;
	for(var i =0;i<len;i++){
	sum +=parseFloat(arr[i]);
	}
	return sum/len;
}

//清空页面
function clean_table() {
$("#data-sum").empty();
$("#data-div").empty();
}
//导出主方法
function export_table(ip_arr,export_file_name, job, start_time, end_time, query_step, server_url){
	clean_table();
	$("#data-sum"). append("<table id="+"table"+"sum"+" class ='table table-striped'><caption  id="+"data-"+"sum"+' style="font-size: large;">:总监控结果</caption><thead><tr><th >ip</th><th>CPU(%)</th><th>MEM(%)</th><th>IO%</th><th>NET(bytes/sec)</th></th></thead><tbody id='+"data-body"+ "sum"+' ></thody></table>');
	for(j =0,len=ip_arr.length;j<len; j++){
		var ip_host =ip_arr[j];
		$("#data-body"+"sum").append("<tr  id ="+"ipsum"+j+"><td>"+ip_host+"</tr>");
		for(j=0, len=ip_arr.length;j<len;j++){
			$("#data-div").append("<table  id="+"table"+j+" class ='table  table-striped'><caption id ="+"data-title"+j+' style="font-size: large;"></caption><thead><tr><th>Time</th><th>CPU(%)</th><th)MEM(%)</th><th>IO(%)</th><th>NET(bytes/sec)</th></tr></thead><tbody  id='+"data-body"+j+' > </tbody></table>');
			var ip_host=ip_arr[j];
			$("#data-titIe"+j).append(ip_host+"系统资源情况");
			queryCpu(j, server_url, ip_host, start_time, end_time, query_step, job);
			queryMem(j, server_url, ip_host, start_time, end_time, query_step, job);
			queryIo(j, server_url, ip_host, start_time, end_time, query_step,job);
			queryNet(j, servar_url, ip_host, start_time,end_time, query_step, job);
		}
	tables = rtntables(ip_arr.length);
	sheets = rtnsheets(ip_arr);
	tablesToExcel(tables,sheets, export_file_name,"Excel");
	}
}	


//所有表格数组
function rtntables(ip_arr_length){
	var tables =['tablesum'];
	for(i=O;i<ip_arr_length;i++){
	tables.push("table"+i);
	}
	return tables;
}	
//所有sheet页数组
function rtnsheets(ip_arr){
	var sheets =['sum'];
	for(i=0;i<ip_arr.length;i++){
		sheets.push(ip_arr[i].split(":")[0])
	}	
	return sheets;
}

//获取任务所有IP	
function query_node_ip(ip_arr,serverip,job,start_time){
	$.ajax({
			type:'post',
			url:'http://'+serverip+':9090/api/v1/query',
			data:{"query":'node_boot_time_seconds{job="'+job+'"}',time:start_time},
			dataType:"json",
			async:false,
			success:function(data){
					for (i=O;i<data.data.result.length;i++){
								ip_arr.push(data.data.result[i].metric.instance);
					}			
			console.log("查询此次IP"+ip_arr);
			},
			error:function(){
				alert("query ip fail");
			}
	});
}				
