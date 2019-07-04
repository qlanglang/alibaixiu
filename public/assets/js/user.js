
// 添加用户
// 当表单发生提交行为的时候
$('#userForm').on('submit',function() {
  // 获取到用户在表单中中输入的内容并将内容格式化成参数字符串
  var formData = $(this).serialize();
  // console.log(formData);
  
  // 向服务器端发送添加用户的请求
  $.ajax({
    type:'post',//get或post
    url:'/users',//请求的地址
    data:formData,
    success:function(){//成功的回调函数
      // 刷新页面
      location.reload()
    },
    error: function() {
      alert('用户添加失败')
    }
  })
  // 阻止表单默认行为
  return false;  
})


// 添加头像
// 当用户选择文件的时候
$('#avatar').on('change',function () { 
  // 用户选择到的文件
  // this.files[0]
  // ajax在上传图片的时候必须要使用formData0
  var formData = new FormData();
  formData.append('avatar',this.files[0])
  
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    contentType: false,
    processData: false,
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数

      $('#preview').attr('src',result[0].avatar)
      $('#abc').val(result[0].avatar)
    }
  })
})


// 向服务器端发送请求   索要用户列表数据
$.ajax({
  type:'get',//get或post
  url:'/users',//请求的地址
  data:{},
  success:function(response){//成功的回调函数
    // 使用模板引擎将数据和html字符串进行拼接
  var html = template('userTpl', {
    data:response
  })
  // 将拼接好的字符串显示在页面中
  $('#userBox').html(html)
  }
})


//  通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click','.edit',function() {
  // 获取被点击用户的id值
  var id = $(this).attr('data-id')
  // 根据id获取用户的详细信息
  $.ajax({
    type:'get',//get或post
    url:'/users/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      console.log(result)
      var html = template('modifyTpl',result)
      $('#formBox').html(html)
    }
  })
})