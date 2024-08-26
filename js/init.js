$(function(){
    //800px보다 작은 화면일때 아이콘 클릭 시
    $(".m-menu-icon").on("click", function(){
        $(".m-menu-slide").slidingToggle();

    });
    $(".m-menu.title").on("click", function(){
        $(".m-menu-sub").slideUp();
        $(this).next(".m-menu-sub").slideDown();
    });

});