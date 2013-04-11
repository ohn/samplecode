//initiate jquery mobile
$(document).bind("mobileinit", function () {
    $.extend($.mobile, {
        ajaxEnabled: false,
        pushStateEnabled: false,
        defaultDialogTransition: "pop",
        defaultPageTransition: "slide",
        pageLoadErrorMessage: "Error Loading Page",
        touchOverflowEnabled: true
    });
});

if (typeof (PP) == "undefined") {
    ClientObject = {};
}

if (typeof (ClientObject.Mobile) == "undefined") {
    ClientObject.Mobile = {};
}

$.extend(ClientObject, {
    Loader: {
      Show: function () {
        ClientObject.Mobile.ShowLoading();
      },
      Hide: function (callback) {
        if (callback != null) {
          callback();
        }
        ClientObject.Mobile.HideLoading();
      }
    }
  });

$.extend(ClientObject.Mobile, {
    ShowLoading: function () {
        $.mobile.showPageLoadingMsg();
    },
    HideLoading: function () {
        $.mobile.hidePageLoadingMsg();
    }
});

ClientObject.ClientService = {
  ResponseTypes: {
    Json: {
      ContentType: "aClientObjectlication/json; charset=utf-8",
      DataType: "json"
    },
    Html: {
      ContentType: "text/html; charset=utf-8",
      DataType: "html"
    }
  },

  DoGet: function (url, expectedContentType, expectedDataType, callback) {

    var ajaxSuccessCallback = this.CreateSuccessHandler(callback);
    var ajaxErrorCallback = this.CreateErrorHandler(callback);
    ClientObject.Loader.Show();
    try {
      $.ajax({
        type: "GET",
        url: url,
        contentType: expectedContentType,
        dataType: expectedDataType,
        success: ajaxSuccessCallback,
        error: ajaxErrorCallback
      });

    } catch (e) {

    }

  }, //end DoGet
  
  CreateSuccessHandler: function (callback) {
      return function (data) {
        ClientObject.Loader.Hide(function () {
          callback(data);
        });
      };
  },

  CreateErrorHandler: function (callback) {
    alert('error loading');
  }

}

ClientObject.Mobile.Utilities = {
    ScrollTo: function (target) {
        var _target;
        if (typeof (target) == 'number') {
            _target = parseInt(target);
        } else if (target.length) {
            _target = target.offset().top;
        }

        $(document).trigger("scrollstart");

        $("html,body").animate({
            scrollTop: _target
        }, 1000, function () {
            $(document).trigger("scrollstart");
            setTimeout(function () {
                $(document).trigger("scrollstop")
            }, 1000);
        });
    },

    ButtonEnable: function (selector, enabled, onclick) {
        if (enabled) {
            $(selector).removeClass("btn-disabled").removeAttr("disabled");
            $(selector).unbind("click").bind("click", onclick);
        } else {
            $(selector).addClass("btn-disabled").attr("disabled", true);
            $(selector).unbind("click");
        }
    },

    GetOrientation: function () {
        var orientation = $.event.special.orientationchange.orientation()
        return orientation;
    },

    GetScreenWidth: function () {
        var orientation = $.event.special.orientationchange.orientation(),
            port = orientation === "portrait",
            winMin = port ? 320 : 480,
            screenWidth = port ? screen.availHeight : screen.availWidth,
            winWidth = Math.max(winMin, $(window).width()),
            pageMin = Math.min(screenWidth, winWidth);
        return pageMin;
    },

    Tabs: function ($this) {                
        $this.closest('.ui-navbar').find('a').removeClass('ui-navbar-btn-active');
        $this.addClass('ui-navbar-btn-active');
        $('#' + $this.attr('data-href')).show().siblings('.tab-content').hide();            
    }, 

    Ellipsis: function (selector) {
      $(selector).each(function (index) {
        var myTag = $(this).text();
        if (myTag.length > 15) {
          var truncated = myTag.trim().substring(0, 120) + "...";
          $(this).text(truncated);
        }
      });
    }
};

//general calls
$(document).bind("pageshow", function (event) {
  //scroll to top
  $('#btn-top').unbind("click").click(function () {
    $.mobile.silentScroll($(window).scrollTop() - 100);
    setTimeout(globalUtils.ScrollTo, 100, 0);
  });

  //footer products link
  $('#view-products').unbind("click").click(function (event) {
    $("#categories #products").trigger("expand");
  });

  //ellipsis
  globalUtils.Ellipsis('.truncate');
  
});

//home set up
ClientObject.Mobile.Home = {};

$(document).bind("pageshow", function (event) {
    if (location.href.indexOf("/Home/") > 0 || location.pathname == "/") {
        ClientObject.Mobile.Home.InitializeView();
    }
});

$.extend(ClientObject.Mobile.Home, {
    InitializeView: function () {
        $(homeSelectors.Slider).flexslider({
            animation: "slide",
            directionNav: true,
            slideshow: false,
            animationLoop: false
        });
    }
});
$.extend(ClientObject.Mobile.Home, {
    Selectors: {
        Slider: '#hero-slide'
    }
});
//end home

//recipe page set up
ClientObject.Mobile.Recipe = {};

$(document).one("pagebeforechange", function () {
    if (location.href.indexOf("/recipes") > 0) {
        ClientObject.Mobile.Recipe.InitializeView();
    }
});

$.extend(ClientObject.Mobile.Recipe, {
    InitializeView: function () {
        //init accordion
        recipeActions.AnimateCollapsibleSet();
    }
});

$.extend(ClientObject.Mobile.Recipe, {
  Actions: {
    AnimateCollapsibleSet: function () {
      var animationSpeed = 200;
      function animateCollapsibleSet(elm) {
        elm.one("expand", function () {
          $(this).parent().find(".ui-collapsible-content").not(".ui-collapsible-content-collapsed").trigger("collapse");
          $(this).find(".ui-collapsible-content").slideDown(animationSpeed, function () {
            animateCollapsibleSet($(this).parent().trigger("expand"));
          });
          
          var collapsibleID = $(this).attr('id');
          if (collapsibleID == "occasion") {
              //init occasion slideshow
              recipeActions.InitSlideShow(recipeSelectors.RecipeOccasionSlider);
            }
          else if (collapsibleID == "collection") {
              //init occasion slideshow
            recipeActions.InitSlideShow(recipeSelectors.RecipeCollectionSlider);
          }
          else if (collapsibleID == "technique") {
            //init occasion slideshow
            recipeActions.InitSlideShow(recipeSelectors.RecipeTechniqueSlider);
          }
          return false;
        }).one("collapse", function () {
          $(this).find(".ui-collapsible-content").slideUp(animationSpeed, function () {
            $(this).parent().trigger("collapse");
          });          
          return false;
        });
      }
      animateCollapsibleSet($("[data-role='collapsible-set'] > [data-role='collapsible']"));

    },
    InitSlideShow: function (slideshow) {
      $(slideshow).flexslider({
        animation: "slide",
        directionNav: false,
        slideshow: false,
        animationLoop: false
      });
    }
  }
});

$.extend(ClientObject.Mobile.Recipe, {
    Selectors: {
        RecipeOccasionSlider: '#occasion-slider',
        RecipeCollectionSlider: '#collection-slider',
        RecipeTechniqueSlider: '#technique-slider'
    }
});
//end recipe

//recipe category set up
ClientObject.Mobile.RecipeCategory = {};

    $(document).one("pagebeforechange", function () {
      if (location.href.indexOf("/recipe-category/") > 0) {
        ClientObject.Mobile.RecipeCategory.InitializeView();
      }
    });

    $.extend(ClientObject.Mobile.RecipeCategory, {
      InitializeView: function () {
        var btnMore = recipeCategorySelectors.MoreResultsButton;

        $(btnMore).unbind("click").click(function () {
          recipeCategoryActions.MoreRecipes(this);
        });

      }
    });

    $.extend(ClientObject.Mobile.RecipeCategory, {
      Actions: {
        MoreRecipes: function (btn) {
          var moreRecipe = $(btn);
          pagenumber = moreRecipe.data("pagenum") + 1,
          type = moreRecipe.data("listtype"),
          pagesize = moreRecipe.data("pagesize");
          moreRecipe.data("pagenum", pagenumber);
          recipeCategoryServices.GetRecipeList(type, pagenumber, pagesize, recipeCategoryActions.MoreRecipesCallback);
        },
        MoreRecipesCallback: function (data) {
          var resultDiv = $(recipeCategorySelectors.ResultDiv),
          moreRecipe = $(recipeCategorySelectors.MoreResultsButton),
          divBottomPosition = $(resultDiv).offset().top + $(resultDiv).height(),
          remaining = moreRecipe.data("remainingrecords") - moreRecipe.data("pagesize");

          moreRecipe.data("remainingrecords", remaining);
          resultDiv.aClientObjectend(data);
          globalUtils.ScrollTo(divBottomPosition);
          recipeCategoryUtils.SetRemaining(remaining);

          var displayCount;
          if ((moreRecipe.data("pagesize") * moreRecipe.data("pagenum")) < moreRecipe.data("totalitemcount")) {
            displayCount = moreRecipe.data("pagesize") * moreRecipe.data("pagenum");
          } else {
            displayCount = moreRecipe.data("totalitemcount");
          }
          $(recipeCategorySelectors.DisplayCount).html(displayCount);
          $(recipeCategorySelectors.ToTopButton).show();

          //ellipsis
          globalUtils.Ellipsis('.truncate');
        }
      },
      Utils: {
        SetRemaining: function (remaining) {
          if (remaining <= 0) {
            remaining = 0;
            globalUtils.ButtonEnable(recipeCategorySelectors.MoreResultsButton, false);
          } else {
            globalUtils.ButtonEnable(recipeCategorySelectors.MoreResultsButton, true, function (event) {
              recipeCategoryActions.MoreRecipes(this);
            });
          }
        }
      },
      Services: {
        GetRecipeList: function (type, pageNumber, pageSize, callback) {
          //ClientObject.ClientService.DoGet("/recipe-category-content/" + type + "/real-user-recipes?page=" + pagenumber, "text/html; charset=utf-8", "html", callback);

          try {
            $.ajax({
              type: "GET",
              url: "/recipe-category-content/" + type + "/real-user-recipes?page=" + pagenumber,
              contentType: "text/html; charset=utf-8",
              dataType: "html",
              success: function (data) {
                ClientObject.Loader.Hide(function () {
                  callback(data);
                });
              },
              error: function () { }
            });

          } catch (e) {

          }

        }

      }
    });

    $.extend(ClientObject.Mobile.RecipeCategory, {
      Selectors: {
        MoreResultsButton: '#recipe-category #btn-more',
        ResultDiv: '#recipe-category #recipe-results',
        DisplayCount: '#recipe-category .display-count',
        ToTopButton: '#recipe-category #btn-top'
      }
    });
//end recipe category page set up

//recipe detail page set up
ClientObject.Mobile.DetailRecipe = {};

$(document).one("pagebeforechange", function () {
    if (location.href.indexOf("/recipe/") > 0) {
        ClientObject.Mobile.DetailRecipe.InitializeView();
    }
});



$.extend(ClientObject.Mobile.DetailRecipe, {
    InitializeView: function () {
        //init video
        //VideoJS.setupAllWhenReady({ playerFallbackOrder: ["flash", "html5", "links"] });

        //clip recipe
        $(detailRecipeSelectors.RecipeClipit).unbind("click").click(function (event) {
            event.preventDefault();
            var $this = $(this);
            detailRecipeActions.addcliClientObjectedrecipe($this);
            $this.addClass('cliClientObjected');
        });

        //init tabs
        $(document).delegate(detailRecipeSelectors.TabHeader, 'click', function () {
            var $this = $(this);
            globalUtils.Tabs($this);
            if ($this.attr('data-href') == 'videos') {
                $(detailRecipeSelectors.TopButton).hide();
                $(detailRecipeSelectors.SeeAllHowtos).show();
            }
            else {
                $(detailRecipeSelectors.TopButton).show();
                $(detailRecipeSelectors.SeeAllHowtos).hide();
            }

        });

        //add arrows to the video tab
        var activeTabHeader = detailRecipeSelectors.ActiveMediaTabHeader;
        $(activeTabHeader).prepend('<span class="arrow-down on-page-load"></span>');

        //initialize tabs
        detailRecipeActions.Tabs();

        //update clip it icon 
        var cookieName = 'cliClientObjectedrecipes';
        var recipeID = $(detailRecipeSelectors.RecipeClipit).attr("data-recipe-id");
        if ($.cookie(cookieName)) {
            var cookieValue = $.cookie(cookieName);
            var items = cookieValue ? cookieValue.split(/,/) : new Array();
            //to check if the recipe has already been cliClientObjected
            var found = $.inArray(recipeID, items) > -1;
            if (found) {
                $(detailRecipeSelectors.RecipeClipit).addClass('cliClientObjected');
            }
        }
    },
    Actions: {
        addcliClientObjectedrecipe: function ($this) {
            var cookieName = 'cliClientObjectedrecipes';
            var recipeID = $this.attr("data-recipe-id");

            // Check to see if the cookie already exists.
            if ($.cookie(cookieName) == null || $.cookie(cookieName) == '') {
                // If not create the cookie and add the recipe ID.
                $.cookie(cookieName, recipeID, { expires: 365, path: '/' });
            }
            else {
                var cookieValue = $.cookie(cookieName);

                //create cookie array
                var items = cookieValue ? cookieValue.split(/,/) : new Array();

                //to check if the recipe has already been cliClientObjected
                var found = $.inArray(recipeID, items) > -1;

                if (found) {
                    return false; //do nothing if already cliClientObjected
                }
                else {
                    //add it to cookie if not cliClientObjected
                    cookieValue = cookieValue + "," + recipeID;
                    $.cookie(cookieName, cookieValue, { expires: 30, path: '/' });
                }
            }

            // Stop the link.
            return false;
        },
        Tabs: function () {
            $(document).delegate(detailRecipeSelectors.VideoTabHeader, 'click', function () {
                var $this = $(this);
                var downArrow = detailRecipeSelectors.DownArrow;
                $(downArrow).remove();
                $this.prepend('<span class="arrow-down"></span>');
                $('.arrow-down').css({ 'bottom': '-5px' });
                detailRecipeActions.InitSlideShow();
            });
        },
        InitSlideShow: function () {
            $('.flexslider').flexslider({
                animation: "slide",
                directionNav: true,
                slideshow: false,
                controlNav: false,
                animationLoop: false
            });
        },
        // click handler on rating star
        RateRecipe: function () {
            var rating = parseInt($(this).attr('id').replace('star-', ''));
            $.post('/recipes/raterecipe', { recipeID: parseInt($(this).attr('data-recipe')), rating: rating }, function () { location.href = location.href; });
            
            // OMNITURE TAG
            var s_click = s_gi(s_account);
            s_click.prop7 = 'Sample mobile';
            s_click.prop8 = 'Sample';
            s_click.prop9 = 'Sample';
            s_click.prop12 = 'http://m.Sample.com';
            s_click.eVar51 = $(this).attr('data-recipe');
            s_click.events = 'event57';
            s_click.linkTrackVars = 'events,prop7,prop8,prop9,prop12,eVar51';
            s_click.linkTrackEvents = 'event57';
            s_click.tl(this, 'o', 'Recipe Rating Complete');
        },
        RecipeRatingStripHover: function () {
            var hoverRating = parseInt($(this).attr('id').replace('star-', ''));
            $('.rating-strip img').attr('src', '/Images/recipes/user-unrated-star.png');
            for (var i = 1; i <= hoverRating; i++) {
                $('.rating-strip img#star-' + i).attr('src', '/Images/recipes/user-rated-star.png');
            }
        }
    },
    Selectors: {
        RecipeClipit: '#recipe-clipit',
        TabHeader: '#recipe-detail .ui-navbar ul li > a',
        VideoTabHeader: '#media-tabs-container .ui-navbar ul li > a',
        DownArrow: '#media-tabs-container .arrow-down',
        ActiveMediaTabHeader: '#media-tabs-container .ui-navbar-btn-active',
        TopButton: '#btn-top',
        SeeAllHowtos: '#see-all-howtos'
    }
});


//end detail recipe

//cliClientObjected recipe page set up
ClientObject.Mobile.CliClientObjectedRecipe = {};

$(document).one("pagebeforechange", function () {
    if (location.href.indexOf("/Recipes/CliClientObjectedRecipes") > 0) {
        ClientObject.Mobile.CliClientObjectedRecipe.InitializeView();
    }
});

$.extend(ClientObject.Mobile.CliClientObjectedRecipe, {
  InitializeView: function () {
    //display recipe count 
    var cookieName = 'cliClientObjectedrecipes';
    if ($.cookie(cookieName)) {
      var cookie = $.cookie(cookieName);
      var split = cookie.split(',');
      var count = split.length;
      $(cliClientObjectedRecipeSelectors.RecipeCount).html(count);
    }
    else {
      $(cliClientObjectedRecipeSelectors.CliClientObjectedRecipe).aClientObjectend('<p class="no-cliClientObjected-recipe">You currently have no cliClientObjected recipe.</p>');
    }

    $(cliClientObjectedRecipeSelectors.RemoveRecipe).unbind("click").click(function (event) {
      event.preventDefault();
      var $this = $(this);
      cliClientObjectedRecipeActions.RemoveRecipe();
    });

  }
});

$.extend(ClientObject.Mobile.CliClientObjectedRecipe, {
  Actions: {
    RemoveRecipe: function () {
      alert('hit');
    }
  }
});

$.extend(ClientObject.Mobile.CliClientObjectedRecipe, {
    Selectors: {
        CliClientObjectedRecipe: '#cliClientObjected-recipe',
        RecipeCount: '#cliClientObjected-recipe .recipe-count',
        RemoveRecipe: '.remove-recipe'
    }
});
//end cliClientObjected recipe

//basics page set up
ClientObject.Mobile.Basics = {};

$(document).one("pagebeforechange", function () {
    if (location.href.indexOf("/sample-101") > 0) {
        ClientObject.Mobile.Basics.InitializeView();
    }
});

$.extend(ClientObject.Mobile.Basics, {
  InitializeView: function () {
    var toTop = basicsSelectors.ToTopButton;

    //init accordion
    basicsActions.AnimateCollapsibleSet();

    //expand the first or specified section
    if (window.location.hash) {
      var hash = window.location.hash.substring(1);
      $('#categories #' + hash).attr('data-collapsed', 'false');
    }
    else {
      $('#categories #about-Sample').attr('data-collapsed', 'false');
    }

    //show more
    basicsActions.ShowMore();

    //nutrition info dialog
    $(basicsSelectors.NutritionInfo).on('click', function (event) {
      event.preventDefault();
      $('#wraClientObjecter').attr('data-role', 'none').removeClass('ui-page ui-body-c');
      $('#container').attr('data-role', 'page').addClass('ui-page ui-body-c');
      var href = $(this).attr('href');
      $.mobile.changePage(href, { role: 'dialog', transition: 'pop' });
      $('#wraClientObjecter').css({ 'position': 'none' });
      $('#search-container, #header, #footer').hide();
    });

    //display back the  elements on close
    $(basicsSelectors.CloseDialog).live("click", function () {
      event.preventDefault();
      $('#wraClientObjecter').css({ 'position': 'relative' });
      $('#search-container, #header, #footer').show();
    });
  }
});

$.extend(ClientObject.Mobile.Basics, {
    Actions: {
        AnimateCollapsibleSet: function () {
            var animationSpeed = 200;
            function animateCollapsibleSet(elm) {
                elm.one("expand", function () {
                    $(this).parent().find(".ui-collapsible-content").not(".ui-collapsible-content-collapsed").trigger("collapse");
                    $(this).find(".ui-collapsible-content").slideDown(animationSpeed, function () {
                        animateCollapsibleSet($(this).parent().trigger("expand"));
                    });
                    return false;
                }).one("collapse", function () {
                    $(this).find(".ui-collapsible-content").slideUp(animationSpeed, function () {
                        $(this).parent().trigger("collapse");
                    });
                    return false;
                });
            }
            animateCollapsibleSet($("[data-role='collapsible-set'] > [data-role='collapsible']"));
        },
        ShowMore: function () {
            var resultDiv = basicsSelectors.TipsContainer;

            $('.expandable li:gt(4)').hide();
            $(basicsSelectors.ShowMoreButton).unbind("click").click(function () {
                $('.expandable li:gt(4)').slideToggle('slow', function () {
                    $(basicsSelectors.ToTopButton).show();
                    $(basicsSelectors.ShowMoreButton).hide();
                });
            });
        }
    }
});

$.extend(ClientObject.Mobile.Basics, {
    Selectors: {
        ShowMoreButton: '#basics #btn-more',
        ToTopButton: '#btn-top',
        TipsContainer: '#tips-container',
        NutritionInfo: '.nutrition-info',
        CloseDialog: '.close-dialog'
    }
});
//end basics

//basics detail set up
ClientObject.Mobile.BasicsDetail = {};

$(document).bind("pageshow", function (event) {
    if (location.href.indexOf("/videos-and-tips") > 0 ) {
        ClientObject.Mobile.BasicsDetail.InitializeView();
    }
});

$.extend(ClientObject.Mobile.BasicsDetail, {
  InitializeView: function () {
    var activeTabHeader = basicsDetailSelectors.ActiveTabHeader;
    $(activeTabHeader).prepend('<span class="arrow-down"></span>');

    //initialize tabs
    basicsDetailActions.Tabs();

    //init video
    //VideoJS.setupAllWhenReady({ playerFallbackOrder: ["flash", "html5", "links"] });

    //show video and share
    basicsDetailActions.ShowTechniqeVideo();
    
    //update technique image and text
    basicsDetailActions.UpdateHeader();

    //bottom slider
    basicsDetailActions.BottomSliderNav();

    //bottom slider slide click
    $(basicsDetailSelectors.TechniqueSlide).unbind("click").click(function (event) {
      var techniqueName = $(this).attr('href').split('#')[1];
      event.preventDefault();

      basicsDetailActions.SetVideoInUrl(techniqueName);
      basicsDetailActions.UpdateHeader();
      basicsDetailActions.ShowTechniqeVideo();
      basicsDetailActions.InitSlideShow();
      $('#slideshow .flexslider').hide();

      var sliderName = techniqueName.split('-')[0];
      $('#' + sliderName + '-slider').show();
    });
  }
});

$.extend(ClientObject.Mobile.BasicsDetail, {
    Actions: {
        Tabs: function () {
            var tabHeader = basicsDetailSelectors.TabHeader;
            $(tabHeader).unbind("click").click(function () {
                var $this = $(this);
                var downArrow = basicsDetailSelectors.DownArrow;
                $(downArrow).remove();
                $this.prepend('<span class="arrow-down"></span>');
                globalUtils.Tabs($this);
                basicsDetailActions.InitSlideShow();
            });
        },
        InitSlideShow: function () {
            if (window.location.href.indexOf("&") > -1) {
                var slideshow = '#' + $(location).attr('href').split('&')[1].split('-')[0] + '-slider';
            }
            else {
                var slideshow = '#stuffed-slider';
            }
            $(slideshow).addClass('active');
            $(slideshow).flexslider({
                animation: "slide",
                directionNav: true,
                slideshow: false,
                controlNav: false,
                animationLoop: false
            });
        },
        BottomSliderNav: function () {
            $(basicsDetailSelectors.TechniqueSlider).flexslider({
                animation: "slide",
                directionNav: true,
                slideshow: false,
                animationLoop: false
            });
        },
        ShowTechniqeVideo: function () {
            $('#video .video-container, #tips-and-techniques .share').hide();

            //if there's a technique name, show that technique
            if (window.location.href.indexOf("&") > -1) {
                // show clicked technique video 
                var videoName = $(location).attr('href').split('&')[1];
                $('#' + videoName).show();

                //show clicked technique share
                var shareContainer = videoName.split('-')[0] + '-share';
                $('#' + shareContainer).show();
            }
            else { //display stuff by default
                $('#stuffed-video').show();
                $('#stuffed-share').show();
            }
        },
        UpdateHeader: function () {
            if (window.location.href.indexOf("&") > -1) {
                var technique = $(location).attr('href').split('&')[1].split('-')[0];
                if (technique == "topcrust") {
                    $(basicsDetailSelectors.TechniqueImage).attr('id', technique);
                    $(basicsDetailSelectors.TechniqueImage).html('top crust');
                    $(basicsDetailSelectors.TechniqueName).html('top crust');
                }
                else if (technique == "bottomcrust") {
                    $(basicsDetailSelectors.TechniqueImage).attr('id', technique);
                    $(basicsDetailSelectors.TechniqueImage).html('bottom crust');
                    $(basicsDetailSelectors.TechniqueName).html('bottom crust');
                }
                else {
                    $(basicsDetailSelectors.TechniqueImage).attr('id', technique).html(technique);
                    $(basicsDetailSelectors.TechniqueName).html(technique);
                }
            }
        },
        SetVideoInUrl: function (techniqueName) {
            var url = $(location).attr('href').split('&')[0];
            $(location).attr('href', url + '&' + techniqueName);
        }
    }
});

$.extend(ClientObject.Mobile.BasicsDetail, {
    Selectors: {
        TabHeader: '#tips-and-techniques .ui-navbar ul li > a',
        ActiveTabHeader: '#tips-and-techniques .ui-navbar-btn-active',
        DownArrow: '#tips-and-techniques .ui-navbar .arrow-down',        
        TechniqueImage: '.technique-header .thumbnail',
        TechniqueName: '.technique-header .technique-name',
        TechniqueSlider: '#techniques-slider',
        TechniqueSlide: '#techniques-slider .thumbnail'
    }
});
//end basics detail

//search box set up
ClientObject.Mobile.Search = {};

$(document).bind("pageshow", function (event) {
    ClientObject.Mobile.Search.InitializeView();
});

$.extend(ClientObject.Mobile.Search, {
    InitializeView: function () {
        var searchCallout = searchSelectors.SearchCallout;
        var searchForm = searchSelectors.SearchForm;
        var searchInput = searchSelectors.SearchInput;
        var searchBtn = searchSelectors.SearchBtn;
        var text = searchText.SearchValue;
        var btnMore = searchSelectors.MoreResultsButton;
        var totalRecords = searchSelectors.TotalRecords;

        //search form toggle
        $(searchCallout).unbind("click").click(function () {
            searchActions.ToggleSearchBox($(searchForm));
        });

        //submit search    
        $(searchBtn).unbind("click").click(function () {
            if ($(searchInput).val() == text) $(searchInput).val('');
            $(this).parent().submit();
        });

        //clear text
        searchActions.ClearText($(searchInput), text);

        //search more
        $(btnMore).unbind("click").click(function () {
          searchActions.ClickSearchMore(this);
        });

        //if there are only 4 records, then disable more
        var recordCount = $(totalRecords).text();
        if (recordCount <= 4) {
            globalUtils.ButtonEnable(btnMore, false);
            $(btnMore).unbind();
        }
    }
});

$.extend(ClientObject.Mobile.Search, {
    Selectors: {
        SearchCallout: '.search-callout a',
        SearchForm: '.search-form',
        SortLink: '.sort a',
        RecipeResult: '.recipe-results',
        SearchInput: '#search-input',
        SearchBtn: '#search-btn',
        MoreResultsButton: "#search-result #btn-more",
        RecipeList: "#recipe-results",
        TotalRecords: "#total-records",
        ToTopButton: '#search-result #btn-top',
        ResultContainer: '#search-result #results-container',
        DisplayCount: '#search-result .display-count'
    },
    Text: {
        SearchValue: "search recipes"
    }
});

$.extend(ClientObject.Mobile.Search, {
  Actions: {
    ToggleSearchBox: function (content) {
      if (content.is(":visible")) {
        content.slideUp(300);
      } else {
        content.slideDown(300);
      }
    },

    ClearText: function (input, text) {
      input.val(text);
      input.bind({
        focusin: function (e) { if ($(this).val() == text) $(this).val(''); },
        focusout: function (e) { if ($(this).val() == 0) $(this).val(text); }
      });
    },

    ClickSearchMore: function (btn) {
      var searchMore = $(btn);
      pagenumber = searchMore.data("pagenum") + 1,
      type = searchMore.data("listtype"),
      pagesize = searchMore.data("pagesize");
      searchMore.data("pagenum", pagenumber);
      searchServices.GetRecipeList(type, pagenumber, pagesize, searchActions.CallbackClickSearchMore);
    },

    CallbackClickSearchMore: function (data) {
      var resultDiv = $(searchSelectors.ResultContainer),
      searchMore = $(searchSelectors.MoreResultsButton),
      divBottomPosition = $(resultDiv).offset().top + $(resultDiv).height(),
      remaining = searchMore.data("remainingrecords") - searchMore.data("pagesize");

      searchMore.data("remainingrecords", remaining);
      resultDiv.aClientObjectend(data);
      globalUtils.ScrollTo(divBottomPosition);
      searchUtils.SetRemaining(remaining);

      var displayCount;
      if ((searchMore.data("pagesize") * searchMore.data("pagenum")) < searchMore.data("totalitemcount")) {
      displayCount = searchMore.data("pagesize") * searchMore.data("pagenum");
      } else {
      displayCount = searchMore.data("totalitemcount");
      }
      $(searchSelectors.DisplayCount).html(displayCount);
      $(searchSelectors.ToTopButton).show();

      //ellipsis
      globalUtils.Ellipsis('.truncate');
    }
  },

  Utils: {
    SetRemaining: function (remaining) {
      if (remaining <= 0) {
        remaining = 0;
        globalUtils.ButtonEnable(searchSelectors.MoreResultsButton, false);
      } else {
        globalUtils.ButtonEnable(searchSelectors.MoreResultsButton, true, function (event) {
          searchActions.ClickSearchMore(this);
        });
      }
    }
  },

  Services: {
    GetRecipeList: function (type, pageNumber, pageSize, callback) {      
      
      try {
        $.ajax({
          type: "GET",          
          url: "/Resources/SearchContent?searchterm=" + type + "&currentPage=" + pagenumber,
          contentType: "text/html; charset=utf-8",
          dataType: "html",
          success: function (data) {
            ClientObject.Loader.Hide(function () {
              callback(data);
            });
          },
          error: function () { 
          }
        });
      } catch (e) {

      }
    }
  }

});


var globalUtils = ClientObject.Mobile.Utilities;
var searchText = ClientObject.Mobile.Search.Text;

var homeSelectors = ClientObject.Mobile.Home.Selectors;

var basicsSelectors = ClientObject.Mobile.Basics.Selectors;
var basicsDetailSelectors = ClientObject.Mobile.BasicsDetail.Selectors;

var recipeSelectors = ClientObject.Mobile.Recipe.Selectors;
var recipeCategorySelectors = ClientObject.Mobile.RecipeCategory.Selectors;
var detailRecipeSelectors = ClientObject.Mobile.DetailRecipe.Selectors;
var cliClientObjectedRecipeSelectors = ClientObject.Mobile.CliClientObjectedRecipe.Selectors;

var searchSelectors = ClientObject.Mobile.Search.Selectors;

var searchActions = ClientObject.Mobile.Search.Actions;
var searchServices = ClientObject.Mobile.Search.Services;
var searchUtils = ClientObject.Mobile.Search.Utils;

var basicsActions = ClientObject.Mobile.Basics.Actions;
var basicsDetailActions = ClientObject.Mobile.BasicsDetail.Actions;

var recipeActions = ClientObject.Mobile.Recipe.Actions;
var recipeCategoryActions = ClientObject.Mobile.RecipeCategory.Actions;
var recipeCategoryServices = ClientObject.Mobile.RecipeCategory.Services;
var recipeCategoryUtils = ClientObject.Mobile.RecipeCategory.Utils;
var detailRecipeActions = ClientObject.Mobile.DetailRecipe.Actions;
var cliClientObjectedRecipeActions = ClientObject.Mobile.CliClientObjectedRecipe.Actions;

