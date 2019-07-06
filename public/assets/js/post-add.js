// 实现分类
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},
  success:function(result){//成功的回调函数
   var html = template('categoryTpl',{data:result})
   $('#category').html(html)
  }
})


// 图片的上传和预览
$('#formBox').on('change','#feature',function(){
  var formData = new FormData()
  formData.append('avatar',this.files[0])
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    contentType:false,
    processData:false,
    data:formData,
    success:function(result){//成功的回调函数
      console.log(result);
      $('.thumbnail').attr('src',result[0].avatar).show()
      $('#hiddenImg').val(result[0].avatar)
    }
  })
})

// 文章上传
$('#addForm').on('submit',function(){
  $.ajax({
    type:'post',//get或post
    url:'/posts',//请求的地址
    data:$(this).serialize(),
    success:function(result){//成功的回调函数
      location.href = 'posts.html'
    }
  })
  return false;
})

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&')
  // 循环数据
  for (var i = 0; i < paramsAry.length; i++) {
    var tmp = paramsAry[i].split('=')
    if(tmp[0] == name) {
      return tmp[1]
    }
  }
  return -1
}


// 获取id值  如果id值不存在  说明是在添加  如果存在  说明是在编辑
var id = getUrlParams('id')
if(id != -1) {
// 编辑
$.ajax({
  type:'get',//get或post
  url:'/posts/'+id,//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    $.ajax({
      type:'get',//get或post
      url:'/categories',//请求的地址
      success:function(response){//成功的回调函数
        result.categories = response
        var html = template('modifyTpl',result)
        $('#formBox').html(html)
      }
    })
  }
})
}

// 当修改文章信息表单发生提交行为的时候
$('#formBox').on('submit','#modifyForm',function(){
  var formData = $(this).serialize()
  var id = $(this).attr('data-id')
  $.ajax({
    type:'put',//get或post
    url:'/posts/'+id,//请求的地址
    data:formData,
    success:function(result){//成功的回调函数
      location.href = 'posts.html'
    }
  })
  return false
})

