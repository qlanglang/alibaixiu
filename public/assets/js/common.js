$('#logout').on('click',function() {
  // 确认一下用户是否想退出
  var islogout = confirm('你确定要退出吗?')
  if(islogout == true) {
    $.ajax({
      type:'post',//get或post
      url:'/logout',//请求的地址
      success:function(){//成功的回调函数
        location.href = 'login.html'
      },
      error: function() {
        alert('退出失败')
      }
    })
  }
})