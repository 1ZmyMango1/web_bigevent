$(function () {
  const form = layui.form;
  // 自定义效验规则
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
    },
  });

  //   获取用户数据
  const layer = layui.layer;
  const initUserInfo = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取用户信息失败");
        // console.log(res);
        form.val("formUserInfo", res.data);
      },
    });
  };

  //重置功能
  $("#btnReset").click((e) => {
    e.preventDefault();
    initUserInfo();
  });

  //   更细用户信息
  $('.layui-form').submit(function(e){
    e.preventDefault()
    $.ajax({
        type:'POST',
        url:"/my/userinfo",
        data:$(this).serialize(),
        success:(res)=>{
            if(res.status !== 0) return layer.msg('获取用户信息失败！')
            layer.msg('获取用户信息成功！')
            // console.log(res);
            // 调用父页面的函数 渲染欢迎语
            window.parent.getUserInfo();
        }
    })
  })

  initUserInfo();
});
