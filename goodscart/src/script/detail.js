;
! function($) {
    //1.获取sid
    // console.log(location.href);
    // console.log(location.search);
    // console.log(location.search.substring(1));
    // console.log(location.search.substring(1).split('=')[1]);
    let sid = location.search.substring(1).split('=')[1];
    //判断sid是否存在
    if (!sid) {
        sid = 1;
    }

    // 2.将获取sid传给后端，后端获取sid，将对应的数据返回给前端。
    // 获取后端传入的数据
    // http://localhost/JS2008/Day%2029-Day%2031_jquery/goodscart/php/getsid.php
    $.ajax({
        url: 'http://localhost/JS2008/Day%2029-Day%2031_jquery/goodscart/php/getsid.php',
        data: {
            datasid: sid
        },
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        $('#spic img').attr('src', data.url);
        $('.loadtitle').html(data.title);
        $('.loadpcp').html(data.price);
        console.log(data.piclisturl.split(','));
        let picarr = data.piclisturl.split(','); //数据转换成数组
        let strhtml = '';
        $.each(picarr, function(index, value) {
            strhtml += `
                <li>
                    <img src="${value}"/>
                </li>
            `;
        });
        $('#list ul').html(strhtml);
    });

    //3.网页效果 - 放大镜



    //4.购物车(cookie或者本地存储)。
    //购物车的思路。
    //4.1.详情页通过cookie存储商品的信息 - details.html ->(存储)
    //存储商品的数量和商品的sid(新建两个数组，以数组的形参存储)
    let arrsid = []; //商品的sid
    let arrnum = []; //商品的数量

    //第一次购买商品创建商品列表(cart.html)，多次不需要创建，数量累计。
    //通过判断确定是第一次还是多次。
    //直接获取cookie - 如果cookie里面存在当前的商品的sid，商品不是第一次。
    //通过jquery下面的cookie插件，进行cookie读取删 - $.cookie()

    //提前设定cookie的键值
    //目的就是判断商品是第一次添加进购物车，还是多次。
    function getcookie() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
            arrsid = $.cookie('cookiesid').split(','); //获取cookie的sid，存放到数组中。
            arrnum = $.cookie('cookienum').split(','); //获取cookie的数量，存放到数组中。
        } else { //cookie不存在
            arrsid = [];
            arrnum = [];
        }
    }


    $('.p-btn a').on('click', function() {
        getcookie(); //如果cookie存在，取到cookie的值，并且变成了数组。
        //如果arrsid里面存在当前商品的sid，说明商品已经存在，否则商品是第一次购买。
        //$.inArray(value,array)确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
        //value:查找的值
        //array:数组
        if ($.inArray(sid, arrsid) === -1) { //不存在，将商品的sid和数量存入cookie
            arrsid.push(sid); //添加当前商品的sid
            $.cookie('cookiesid', arrsid, { expires: 10, path: '/' }); //插件完成的cookie的添加。
            arrnum.push($('#count').val()); //添加商品的数量
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //插件完成的cookie的添加。
        } else { //存在,商品的数量累加
            //获取原来的sid对应的数量(sid和数量是对应的 ，sid的在数组的位置就是数量在数组的位置)
            let index = $.inArray(sid, arrsid); //sid在数组中的位置
            let num = parseInt(arrnum[index]); //sid对应的数量
            //原来的数量+新添加数量，一起存入cookie
            arrnum[index] = num + parseInt($('#count').val()); //原来的数量+新添加数量进行赋值
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
        }

        alert('按钮被点击了');



    });

    //4.2.购物车列表获取数据，进行渲染 - cart.html -> 取(渲染)

}(jQuery);