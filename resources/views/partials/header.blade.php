<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>
        @if (Request::is('admin/*'))
            @if ($__env->yieldContent('page_title'))
                Admin |
                @yield('page_title')
                | Phoenix Shanti Group
            @else
                Admin | Phoenix Shanti Group
            @endif
        @else
            @if ($__env->yieldContent('page_title'))
                @yield('page_title')
                | Phoenix Shanti Group
            @else
                Phoenix Shanti Group
            @endif
        @endif
    </title>
    <!-- Description, Keywords and Author -->
    <meta name="description" content="Your description">
    <meta name="keywords" content="Your,Keywords">
    <meta name="author" content="ResponsiveWebInc">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Styles -->
    <!-- Bootstrap CSS -->
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font awesome CSS -->
    <link href="/css/font-awesome.min.css" rel="stylesheet">
    <!-- Magnific Popup -->
    <link href="/css/magnific-popup.css" rel="stylesheet">
    <!-- Owl carousel -->
    <link href="/css/owl.carousel.css" rel="stylesheet">

    <!-- CSS for this page -->
    <!-- Parallax slider -->
    <link href="/css/parallax-slider.css" rel="stylesheet">

    <!-- Base style -->
    <link href="/css/styles/style.css" rel="stylesheet">
    <!-- Skin CSS -->
    <link href="/css/styles/skin-lblue.css" rel="stylesheet" id="color_theme">

    <!-- Custom CSS. Type your CSS code in custom.css file -->
    <link href="/css/custom.css" rel="stylesheet">

    <!-- Favicon -->
    <link rel="shortcut icon" href="#">
</head>

<!-- Add class "boxed" along with body for boxed layout. -->
<!-- Add "pattern-x" (1 to 5) for background patterns. -->
<!-- Add "img-x" (1 to 5) for background images. -->
<body>

<!-- Outer Starts -->
<div class="outer">

    <!-- Top bar starts -->
    <div class="top-bar">
        <div class="container">

            <!-- Contact starts -->
            <div class="tb-contact pull-left">
                <!-- Email -->
                <i class="fa fa-envelope color"></i> &nbsp; <a href="mailto:contact@domain.com">contact@domain.com</a>
                &nbsp;&nbsp;
                <!-- Phone -->
                <i class="fa fa-phone color"></i> &nbsp; +1 (342)-(323)-4923
            </div>
            <!-- Contact ends -->

            <!-- Shopping kart starts -->
            <div class="tb-shopping-cart pull-right">
                <!-- Link with badge -->
                <a href="#" class="btn btn-white btn-xs b-dropdown"><i class="fa fa-shopping-cart"></i> <i class="fa fa-angle-down color"></i> <span class="badge badge-color">5</span></a>
                <!-- Dropdown content with item details -->
                <div class="b-dropdown-block">
                    <!-- Heading -->
                    <h4><i class="fa fa-shopping-cart color"></i> Your Items</h4>
                    <ul class="list-unstyled">
                        <!-- Item 1 -->
                        <li>
                            <!-- Item image -->
                            <div class="cart-img">
                                <a href="#"><img src="img/ecommerce/view-cart/1.png" alt="" class="img-responsive" /></a>
                            </div>
                            <!-- Item heading and price -->
                            <div class="cart-title">
                                <h5><a href="#">Samsamgun galaxy some thing about.</a></h5>
                                <!-- Item price -->
                                <span class="label label-color label-sm">$1,900</span>
                            </div>
                            <div class="clearfix"></div>
                        </li>
                        <!-- Item 2 -->
                        <li>
                            <div class="cart-img">
                                <a href="#"><img src="img/ecommerce/view-cart/2.png" alt="" class="img-responsive" /></a>
                            </div>
                            <div class="cart-title">
                                <h5><a href="#">Samsamgun galaxy some thing about.</a></h5>
                                <span class="label label-color label-sm">$1,900</span>
                            </div>
                            <div class="clearfix"></div>
                        </li>
                    </ul>
                    <a href="#" class="btn btn-white btn-sm">View Cart</a> &nbsp; <a href="#" class="btn btn-color btn-sm">Checkout</a>
                </div>
            </div>
            <!-- Shopping kart ends -->

            <!-- Langauge starts -->
            <div class="tb-language dropdown pull-right">
                <a href="#" data-target="#" data-toggle="dropdown"><i class="fa fa-globe"></i> English <i class="fa fa-angle-down color"></i></a>
                <!-- Dropdown menu with languages -->
                <ul class="dropdown-menu dropdown-mini" role="menu">
                    <li><a href="#">Hindi</a></li>
                    <li><a href="#">Tamil</a></li>
                    <li><a href="#">Kanada</a></li>
                </ul>
            </div>
            <!-- Language ends -->

            <!-- Search section for responsive design -->
            <div class="tb-search pull-left">
                <a href="#" class="b-dropdown"><i class="fa fa-search square-2 rounded-1 bg-color white"></i></a>
                <div class="b-dropdown-block">
                    <form role="form">
                        <!-- Input Group -->
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Type Something">
                            <span class="input-group-btn">
										<button class="btn btn-color" type="button">Search</button>
									</span>
                        </div>
                    </form>
                </div>
            </div>
            <!-- Search section ends -->

            <!-- Social media starts -->
            <div class="tb-social pull-right">
                <div class="brand-bg text-right">
                    <!-- Brand Icons -->
                    <a href="#" class="facebook"><i class="fa fa-facebook square-2 rounded-1"></i></a>
                    <a href="#" class="twitter"><i class="fa fa-twitter square-2 rounded-1"></i></a>
                    <a href="#" class="google-plus"><i class="fa fa-google-plus square-2 rounded-1"></i></a>
                    <a href="#" class="linkedin"><i class="fa fa-linkedin square-2 rounded-1"></i></a>
                    <a href="#" class="pinterest"><i class="fa fa-pinterest square-2 rounded-1"></i></a>
                </div>
            </div>
            <!-- Social media ends -->

            <div class="clearfix"></div>
        </div>
    </div>

    <!-- Top bar ends -->

    <!-- Header two Starts -->
    <div class="header-2">

        <!-- Container -->
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <!-- Logo section -->
                    <div class="logo">
                        <h1><a href="#"><i class="fa fa-laptop"></i> Brave</a></h1>
                    </div>
                </div>
                <div class="col-md-9">
                    @include('partials.nav')
                </div>

                <div class="col-md-1">

                    <!-- Search section -->
                    <div class="head-search pull-right">
                        <a href="#" class="b-dropdown"><i class="fa fa-search square-2 rounded-1 bg-color white"></i></a>
                        <div class="b-dropdown-block">
                            <form role="form">
                                <!-- Input Group -->
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Type Something">
                                    <span class="input-group-btn">
												<button class="btn btn-color" type="button">Search</button>
											</span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- Search section ends -->
                    <div class="clearfix"></div>

                </div>

            </div>
        </div>
    </div>

    <!-- Header two ends -->
