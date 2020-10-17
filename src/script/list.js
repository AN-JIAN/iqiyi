! function($) {
    // 排序
    let array_default = []; //排序前的数组
    let array = []; //排序中的数组
    // 冒泡排序，比较相邻的两个商品价格
    let prev = null;
    let next = null;
    //渲染列表页的数据，默认先渲染第一页。
    const $list = $('.list');
    $.ajax({
        url: 'http://10.31.163.218/IQIYI%20mall/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml = '<ul>';
        $.each(data, function(index, value) {
            $strhtml += `
                  <li>
                  <a href="detail.html?sid=${value.sid}" target="_blank">
                                <img class="lazy" data-original="${value.url}" width="240" height="240"/>
                                <div class="list-box">
                                <h4>${value.sid}${value.title}</h4>
                                <span class="price">￥${value.price}</span>
                                <del>原价299</del>
                                <div class="sale-num">
                                <span class="sale">已售${value.sailnumber}件</span>
                                <button>立即购买</button>
                                </div>
                                </div>
                               
                            </a>
                  </li>
            
            `;
        });
        $strhtml += '</ul>';
        $list.html($strhtml);
        // 添加懒加载
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

        // 将页面的li元素加载到两个数组中
        $('.list li').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        })
    });
    // 2.分页思路：根据传输的页码，后端返回对应的接口数据。
    $('.page').pagination({
        pageCount: 4, //总页数
        jump: true, //是否开启跳转指定的页数
        prevContent: '上一页',
        nextContent: '下一页',
        callback: function(api) {
            console.log(api.getCurrent()); //获取当前点击的页码
            $.ajax({
                url: 'http://10.31.163.218/IQIYI%20mall/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '<ul>';
                $.each(data, function(index, value) {
                    $strhtml += `
                    <li>
                  <a href="detail.html?sid=${value.sid}" target="_blank">
                  <img class="lazy" data-original="${value.url}" width="240" height="240"/>
                                <div class="list-box">
                                <h4>${value.sid}${value.title}</h4>
                                <span class="price">￥${value.price}</span>
                                <del>原价299</del>
                                <div class="sale-num">
                                <span class="sale">已售${value.sailnumber}件</span>
                                <button>立即购买</button>
                                </div>
                                </div>
                               
                            </a>
                  </li>
                    
                    `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);
                //将页面中的li元素加载到两个数组中
                $('.list li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            });
        }
    });
    // 3.排序，排序前的数组已经具有li元素
    $('.sort button').eq(0).on('click', function() {
        $.each(array_default, function(index, value) {
            $('.list ul').append(value);
            return;
        });
        $('.sort button').eq(1).on('click', function() {
            for (let i = 0; i < array.length - 1; i++) {
                for (let j = 0; j < array.length - i - 1; j++) {
                    prev = parseFloat(array[j].find('.price').html().substring(1)); //截取上一个价格
                    next = parseFloat(array[j + 1].find('.price').html().substring(1)); //截取下一个价格
                    //通过价格判断，改变数组li的位置
                    if (prev > next) {
                        let temp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temp;
                    }
                }
            }
            $('.list ul').empty();
            $.each(array, function(index, value) {
                console.log(value);
                $('.list ul').append(value);
            })
        })
        $('.sort button').eq(2).on('click', function() {
            for (let i = 0; i < array.length - 1; i++) {
                for (let j = 0; j < array.length - i - 1; j++) {
                    prev = parseFloat(array[j].find('.price').html().substring(1)); //截取上一个价格
                    next = parseFloat(array[j + 1].find('.price').html().substring(1)); //截取下一个价格
                    //通过价格判断，改变数组li的位置
                    if (prev > next) {
                        let temp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temp;
                    }
                }
            }
            $.each(array, function(index, value) {
                console.log(value);
                $('.list ul').append(value);
            })
        })
        $.each(array, function(index, value) {
            $('.list ul').append(value);
        })
    })
}(jQuery)