;
! function($) {
    //1.渲染购物车列表
    //获取cookie，进行渲染。
    if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在,获取cookie转成数组
        let sid = $.cookie('cookiesid').split(','); //[1,2,3]
        let num = $.cookie('cookienum').split(','); //[100,200,300]
        for (let i = 0; i < sid.length; i++) {
            rendercart(sid[i], num[i])
        }
    }
    //封装函数实现渲染。
    function rendercart(sid, num) { //sid:渲染的商品编号    num:渲染的商品的数量。
        $.ajax({
            url: 'http://localhost/JS2008/Day%2029-Day%2031_jquery/goodscart/php/piclist.php',
            dataType: 'json'
        }).done(function(data) {
            $.each(data, function(index, value) {
                if (value.sid == sid) { //数据接口的sid和当前商品的sid进行比较，如果相等，直接赋值。
                    let strhtml = '';
                    strhtml += `
                    <div class="goods-item goods-item-sele">
                        <div class="goods-info">
                            <div class="cell b-checkbox">
                                <div class="cart-checkbox">
                                    <input type="checkbox" checked="" name="" id="" value="" />
                                    <span class="line-circle"></span>
                                </div>
                            </div>
                            <div class="cell b-goods">
                                <div class="goods-name">
                                    <div class="goods-pic">
                                        <a href=""><img src="${value.url}" alt="" /></a>
                                    </div>
                                    <div class="goods-msg">
                                        <div class="goods-d-info">
                                            <a href="">${value.title}</a>
                                        </div>
                                        <div class="goods-ex">
                                            <span class="promise"></span>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cell b-props">
                            <div class="prop-text"></div>
                        </div>
                        <div class="cell b-price">
                            <strong>${value.price}</strong>
                            <div class="sales-promotion-dropdown">
                            </div>
                        </div>
                        <div class="cell b-quantity">
                            <div class="quantity-form">
                                <a class="quantity-down" href="javascript:void(0)">-</a>
                                <input type="text" value="${num}" />
                                <a class="quantity-add" href="javascript:void(0)">+</a>
                            </div>
                        </div>
                        <div class="cell b-sum">
                            <strong>${(value.price*num).toFixed(2)}</strong>
                        </div>
                        <div class="cell b-action">
                            <a href="javascript:void(0)">删除</a>
                        </div>
                    </div>
            </div>
        `;
                    $('.item-list').append(strhtml);
                    calc(); //总算总价
                }
            });
        })
    }


    //2.购物车其他功能的控制.
    //计算总的商品件数和总价。
    // console.log($('.goods-item').length); //0  渲染出来的，异步的，无法获取
    function calc() {
        let allprice = 0; //总价
        let allcount = 0; //总的数量
        $('.goods-item').each(function(index, element) {
            if ($(this).find('.cart-checkbox input').prop('checked')) { //复选框选中。
                allcount += parseInt($(this).find('.quantity-form input').val()); //总的件数
                allprice += parseInt($(this).find('.b-sum strong').html()); //总价
            }
        });
        $('.amount-sum em').html(allcount);
        $('.totalprice').html(allprice.toFixed(2));
    }





}(jQuery);