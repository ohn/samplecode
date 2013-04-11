

<!DOCTYPE html>
<!--[if IEMobile 7 ]>    <html class="no-js iem7"> <![endif]-->
<!--[if (gt IEMobile 7)|!(IEMobile)]><!--> <html class="no-js"> <!--<![endif]-->
<head id="ctl00_Head1"><title>
	Sample
</title><meta name="HandheldFriendly" content="True" /><meta name="MobileOptimized" content="320" /><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" /><meta http-equiv="cleartype" content="on" />

    <!-- This script prevents links from opening in Mobile Safari. https://gist.github.com/1042026 -->
    <!--
    <script>(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")</script>
    -->
    
        <meta name="description" content="Sample" />
        <meta name="keywords" content="Sample" />
        <meta property="fb:app_id" content="135408946558914" />
        <meta property="og:title" content="Sample" />
        <meta property="og:site_name" content="Sample.com"/>
        <meta property="og:type" content="food"/>
        <meta property="og:url" content="http://www.Sample.com//" />
        <meta property="og:image" content="http://www.Sample.com/Images/logo.png" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:description" content="" />
    
   
    <script type="text/javascript">
        var s_account = "Sample";
    </script>

    <script type="text/javascript" src="/Scripts/s_code.js"></script>
    
    <link rel="stylesheet" href="/Content/css/normalize.css" />        
	<link rel="stylesheet" href="/Content/css/flexslider.css" />
    <link rel="stylesheet" href="/Content/css/font.css">
	<link rel="stylesheet" href="/Content/css/main.css">
    <link rel="stylesheet" href="/Content/css/jquery.mobile-1.2.0.css">
	
    <script src="/Scripts/lib/modernizr-2.6.1.min.js" type="text/javascript"></script> 
    <script src="/Scripts/lib/zepto.min.js"></script>
    <script src="/Scripts/helper.js"></script>
    <script src="/Scripts/lib/jquery-1.8.2.min.js"></script>
    <script src="/Scripts/lib/jquery.cookie.js"></script>       
</head>
<body>
    <!-- Production Site Monitoring Tag – DO NOT REMOVE THESE TWO LINES -->
    <!-- monitoringtag -->
    <div id="fb-root"></div>
    <script>
        window.fbAsyncInit = function () {
            FB.init({
                appId: 'xxx', // App ID
                channelUrl: 'http://xxx/channel.html', // Channel File
                status: true, // check login status
                cookie: true, // FACESHARP - don't need this since we are setting the authResponse
                oauth: true, // enable OAuth 2.0
                //authResponse : authResponseValue, //FACESHARP - we're controlling this value
                xfbml: true  // parse XFBML
            });
        };

        // Load the SDK Asynchronously
        /*(function (d) {
        var js, id = 'facebook-jssdk'; if (d.getElementById(id)) { return; }
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        d.getElementsByTagName('head')[0].appendChild(js);
        } (document));*/

    </script>
	<script src="https://connect.facebook.net/en_US/all.js"></script>
	<div id="wrapper" data-role="none">
		<section id="search-container" data-role="none">			
			<div class="search-form">
				 <form action="/search" method="get">
					<input type="text" name="searchterm" id="search-input" value="search recipes" data-role="none">
					<input type="button" value="GO" id="search-btn" data-role="none"> 
					<div class="clear"></div>
				</form>
			</div>
			<div class="search-callout">
				<a href="#">search</a>
			</div>				
		</section>
        <header id="header">
			<div class="logo"><a href="/"><img src="/Images/logo.png" alt="Sample" /></a></div>
			<div class="navigation">						               					 
                <a  class="recipes nav"  href="/recipes" data-name="nav recipes header">Recipes</a>                    
                <a  class="basics nav"  href="/Sample-101" data-name="nav basics header">Basics</a>
			</div>
		</header>
		<div id="container" data-role="page">					
			<!-- content -->
       

<div id="content" class="home">
	<div id="hero-slide" class="flexslider">
		<ul class="slides">
		<li>
			<a href="/recipe/61104/apple-pie-spirals-with-salted-caramel-sauce" data-name="apple spirals" data-role="none"><img src="/Images/slidebg1.jpg" /></a>
		</li>
		<li>
			<a href="/recipe/60165/creamy-turkey-pot-pies" data-name="creamy turkey pot pies" data-role="none"><img src="/Images/slidebg2.jpg" /></a>
		</li>
		<li>
			<a href="/recipe/60534/cheesecake-filled-apple-pie160shells" data-name="cheescake filled apple pie shells" data-role="none"><img src="/Images/slidebg3.jpg" /></a>
		</li>
		</ul>
	</div>
	<div class="divider"></div>
	<div class="section-nav">
		<a href="/recipes" class="browse-recipes" data-role="none">Browse Recipes <span class="arrow-right"></span></a>
	</div>
	<div class="divider"></div>
	<div class="section-nav">
		<a href="/sample-101" class="pastry-basics" data-role="none">Sample Basics <span class="arrow-right"></span></a>
	</div>
	<div class="divider"></div>
	<div class="section-nav">
		<a href="/registration" class="get-newsletter" data-role="none" >Get Newsletter <span class="arrow-right"></span></a>
	</div>
	<div class="divider"></div>
</div>

 
            <!-- //content -->				
		</div>
		<footer id="footer" data-role="none">
			<div class="social-icons">
				<a href="http://www.facebook.com/Sample" target="_blank" class="facebook">Facebook</a>
				<a href="http://www.pinterest.com/Sample" target="_blank" class="pinterest">Pinterest</a>
			</div>
			<div class="footer-nav">				
				<a href="/Recipes/ClippedRecipes" class="clipped-recipes" data-name="my clipped recipes tout">My Clipped Recipes</a>
                <a href="/registration" rel="#overlay_reg" class="register-newsletter" data-name="get newsletter tout">Get Newsletter</a>
			</div>
			<div class="footer-links">
				<ul>
					<li><a href="/sample-101#products" id="view-products">Products</a></li>
					<li><a href="http://www.sample.com/legal.asp" target="_blank">Legal</a></li>
                    <li><a href="http://www.sample.com/privacy_policy.asp" target="_blank">Privacy</a></li>
					<li><a href="/Home/SendToFullSite">Full Site</a></li>
				</ul>
				<p class="copy-right">&copy; 2012 sample. All Rights Reserved.</p>
			</div>
		</footer>			
	</div>	
			
       
    <script src="/Scripts/jquery.flexslider-min.js"></script>
    <script src="/Scripts/main.js"></script>
    <script src="/Scripts/lib/jquery.mobile-1.2.0.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            if (typeof (ClientObject.Config) == "undefined") {
                ClientObject.Config = {};
            }
        });
	</script>

    <script language="JavaScript"><!--
        // Page tags further above may add additional events data.
        if (s.events != null) {
            s.events = "event2,event11,event12," + s.events;
        }
        else {
            s.events = "event2,event11,event12";
        }

        if (s.pageName == null) {
            s.pageName = "Sample";
        }

        s.channel = "Sample";
        s.prop2 = "standard";
        s.prop6 = "Sample";
        s.prop7 = "Sample";
        s.prop8 = "Sample";
        s.prop9 = "Sample";
        s.prop12 = 'Sample';
        s.eVar1 = "D=pageName";
        s.eVar2 = "D=ch";
        s.eVar3 = "D=c6";
        s.eVar10 = "D=c7";
        s.eVar11 = "D=c8";
        s.eVar12 = "D=c9";
        s.server = "AMAWSPWS04"
        /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
        var s_code = s.t(); if (s_code) document.write(s_code)//-->

</script>

<script src="../../Scripts/omniture_mobile.js" type="text/javascript"></script>


</body>
</html>
