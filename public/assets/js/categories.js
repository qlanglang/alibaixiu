// 添加分类
$('#addCategory').on('submit',function(){
  var formData = $(this).serialize()
  $.ajax({
    type:'post',//get或post
    url:'/categories',//请求的地址
    data:formData,
    success:function(result){//成功的回调函数
      location.reload()
    }
  })
  return false;
})

// 展示分类列表数据
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  success:function(result){//成功的回调函数
    var html = template('categoryListTpl',{data:result})
    $('#categoryBox').html(html)
  }
})


// 当点击编辑按钮的时候  让当前这一行的内容展示在左侧的表单上面
$('#categoryList').on('click','.edit',function(){
  var id = $(this).attr('data-id')
  console.log(id);
  $.ajax({
    type:'get',//get或post
    url:'/categories/'+id,//请求的地址
    success:function(result){//成功的回调函数
      console.log(result)
      var html = template('modifyFormTpl' ,result)
      $('#formBox').html(html)
    }
  })
})


// 当提交修改表单的时候
$('#formBox').on('submit','#modifyCategory',function(){
  // 收集表单数据
  var id = $(this).attr('data-id')
  $.ajax({
    type:'put',//get或post
    url:'/categories/'+id,//请求的地址
    data:$(this).serialize(),
    success:function(result){//成功的回调函数
      location.reload()
    }
  })
})


// 删除功能
$('#categoryList').on('click','.delete',function(){
  if(confirm('确定要删除嘛?')) {
    var id = $(this).attr('data-id')
    $.ajax({
      type:'delete',//get或post
      url:'/categories/'+id,//请求的地址
      success:function(result){//成功的回调函数
        location.reload()
      }
    })
  }
})