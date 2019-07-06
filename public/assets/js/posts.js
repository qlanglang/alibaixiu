// 文章列表展示
// $.ajax({
//   type:'get',//get或post
//   url:'/posts',//请求的地址
//   data:{},
//   success:function(result){//成功的回调函数
//     console.log(result);
//     var html = template('postsTpl',result)
//     $('#postsBox').html(html)

//     // 分页效果
//     var pageHtml = template('pageTpl',result)
//     $('#pageBox').html(pageHtml)
//   }
// })


// 转换时间
function dateformat(str) {
  var date = new Date(str)
  var year = date.getFullYear()
  var month = date.getMonth()+1
  var day = date.getDate()
  return year + '-' + month + '-' + day
}


// 如果我们没有传入page  默认会显示第一页
var page = 1;//如果没有切换  默认就显示第一页
render()

// 分页
function changePage(currentPage) {
  page = currentPage;
  render()
}
// 文章列表展示
function render() {
  $.ajax({
    type:'get',//get或post
    url:'/posts',//请求的地址
    data:{page:page},
    success:function(result){//成功的回调函数
      var html = template('postsTpl',result)
      $('#postsBox').html(html)
      // 分页效果
      var pageHtml = template('pageTpl',result)
      $('#pageBox').html(pageHtml)
    }
  })
}


// 渲染筛选的分类数据
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},
  success:function(result){//成功的回调函数
    // console.log(result)
    var html = template('categoryTpl',{data:result})
    $('#categoryBox').html(html)
  }
})

$('#filterForm').on('submit',function(){
  console.log($(this).serialize());
  
  $.ajax({
    type:'get',//get或post
    url:'/posts',//请求的地址
    data:$(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      var html = template('postsTpl',result)
      $('#postsBox').html(html)
      // 分页效果
      var pageHtml = template('pageTpl',result)
      $('#pageBox').html(pageHtml)
    }
  })
  return false
})


// 删除功能
$('#postsBox').on('click','.delete',function(){
 if(confirm('确定要删除嘛?')) {
   var id = $(this).attr('data-id')
   $.ajax({
     type:'delete',//get或post
     url:'/posts/'+id,//请求的地址
     success:function(result){//成功的回调函数
       location.reload()
     }
   })
 }
})


