$(function () {

    // 메뉴 아이콘을 클릭하면 이벤트 발생
    $(".menu_icon").on("click", function () {
        // 메뉴아이콘의 조상요소중 클래스 .head 요소의 다음형제요소인 .sidebar에 display를 block으로 변경
        $(".menu_icon").parents(".head").next(".sidebar").fadeIn(400);
    });

    // 클릭시 fixed 됬던 사이드바 화면이 display none으로 변경
    $(".close").on("click", function () {
        $(".close").parents(".sidebar").fadeOut(400);
    });


    var visual = $(".visual"),
        slide = visual.find(".slide"),
        slides = slide.find("li"),
        slidesCount = slides.length,
        timer = "",

        bu = visual.find(".bu > ul"),
        buHtml = '',
        currentIndex = 0;

    // 각 li 요소르 찾아 이벤트 핸들러
    slides.each(function (i) {
        //  매개변수 i 를 사용 하여
        // margin-left 할 값 구하기
        var newLeft = i * 100 + "%";

        // 선택된 li 요소에 css 스타일 left 를 newLeft값
        $(this).css({ left: newLeft });

        // bu는 li 요소의 length에 따라 수가 똑같이 만들어져야 함으로
        // 매개변수 + 1값 만큼 li 요소 생성하여 저장
        buHtml += '<li><span>' + (i + 1) + '</span></li>'
    }); //slide.each

    // bu의 html 문서상의 buhtml 값을 불러와 화면에 보여준다.
    bu.html(buHtml).children();

    // 슬라이드 이동 함수
    function goSlide(index) {
        // index 에따라 left를 움직여 이미지를 불러온다.
        // i = 0 일때 left: 0%
        // i = 1 일때 left: -100%
        // i = 2 일때 left: -200%
        slide.animate({ left: -100 * index + "%" }, 1000);

        // 선택되어 있는 currentIndex에 index 저장
        currentIndex = index;

        buMove();
    }; //goSlide


    // 클릭한 bu 요소의 이미지로 이동
    bu.find("li").click(function (e) {
        // e.preventDefault();
        // 클릭한 요소의 순번을 알아올것
        var idx = $(this).index();

        // 클릭한요소로 이동
        goSlide(idx);


        buMove();
    }) /*bu li 클릭*/

    function buMove() {
        // 모든 li 요소에서 move 제거
        bu.find("li").removeClass("move");
        // 원하는 eq에 해당하는 li에 move 추가
        bu.find("li").eq(currentIndex).addClass("move");
    } /*bumove*/

    // bumove 실행
    buMove();

    // 슬라이드 시작 함수
    function startTimer() {

        timer = setInterval(function () {
            var nextIndex = (currentIndex + 1) % slidesCount;
            goSlide(nextIndex);
        }, 2000);
    }

    // 슬라이드 실행
    startTimer();

    // 슬라이드 스탑 함수
    function stopTimer() {
        clearInterval(timer);
    }

    // 마우스가 올라가면 실해
    slide.hover(
        // 올라가면 멈춘다
        function () { stopTimer() },
        // 내려오면 저장되어있는 시간이 시작된다.
        function () { startTimer() }
    )





    // 스크롤이벤트 발생
    $(window).on("scroll", function () {
        // 스크롤된 높이
        var window_scrollTop = $(window).scrollTop();
        // 요소의 높이
        var head_main_height = $(".main").height();

        // 만약 스크롤된높이가 .main요소의 높이보다 클경우
        if (head_main_height < window_scrollTop) {
            // .main 에 fixed 클래스부여 하고 자식요소에도 클래스 fixed 부여
            $(".main").addClass("fixed").children(".gnb").addClass("fixed")
                // .gnb의 자식요소인 ul에 css 조정
                .children("ul").css("marginTop", "-60px")
                // ul의 자식요소 li > a 요소 에 css 조정
                // 이떄 find 는 후손요소중에 a 요소가 더있기 떄문에 사용 x
                .children("li").children("a").css("line-height", "60px").css("color", "rgb(255,255,255)");

            // fixe 된 상태라면 로고의 이미지가 바뀐다.
            $(".gnb").children("h1").children("a").addClass("logo");
        } else {
            // 그렇지않을경우 클래스와 스타일속성을 제거한다.
            $(".main").removeClass("fixed").children(".gnb").removeClass("fixed")
                .children("ul").removeAttr("style")
                .children("li").children("a").removeAttr("style");

            $(".gnb").children("h1").children("a").removeClass("logo");
        }
    });

    // 참조자 찾기
    var $gnb = $(".gnb > ul");
    var $menu_store = $(".menu_store > div");
    var $franchise = $(".franchise > .right > div");
    var $story = $(".story");
    var $brand = $(".brand > .container > div");

    // .gnb 영역에 이벤스 발생
    $gnb.hover(
        // 마우스가 들어가면 .gnb 영역에 down 클래스부여
        function () { $gnb.addClass("down").parents(".gnb").next().addClass("down"); },
        // 마우스가 들어가면 .gnb 영역에 down 클래스해제
        function () { $gnb.removeClass("down").parents(".gnb").next().removeClass("down"); }
    );

    // 해당 영역에 hover
    $gnb.children("li").hover(
        // 마우스가 들어가면 그 li의 a 요소에 on 클래스부여
        function () { $(this).children("a").addClass("on"); },
        // 마우스가 나오면 그 li의 a 요소에 on 클래스해제
        function () { $(this).children("a").removeClass("on"); }
    );

    $menu_store.hover(
        function () { $(this).addClass("gauge"); },
        function () { $(this).removeClass("gauge"); }
    );

    $franchise.hover(
        function () { $(this).addClass("gauge"); },
        function () { $(this).removeClass("gauge"); }
    );

    $story.hover(
        function () { $(this).find(".right").children("div").addClass("gauge"); },
        function () { $(this).find(".right").children("div").removeClass("gauge"); }
    );

    $brand.hover(
        function () { $(this).find("p").addClass("gold"); },
        function () { $(this).find("p").removeClass("gold"); }
    );

    // footer 후손요소 h3에 클릭 이벤트
    $(".footer").find("h3").on("click", function () {
        // 후손요소 h3의 다음에나오는 형제요소에 slideToggle 적용
        $(".footer").find("h3").next().slideToggle(300);
    });

});
