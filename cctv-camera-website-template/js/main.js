(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // Portfolio filter - Pure CSS Version
    $(document).ready(function() {
        // Filter functionality without Isotope
        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('active');
            $(this).addClass('active');
            
            var filterValue = $(this).data('filter');
            
            if (filterValue === '*') {
                $('.portfolio-item').show();
            } else {
                $('.portfolio-item').hide();
                $('.portfolio-item' + filterValue).show();
            }
        });
    });

    // Product Search Functionality
    $(document).ready(function() {
        // Search functionality
        $('#productSearch').on('input', function() {
            var searchTerm = $(this).val().toLowerCase();
            var visibleCount = 0;
            
            $('.service-item').each(function() {
                var productName = $(this).find('h4').text().toLowerCase();
                var productDesc = $(this).find('p').text().toLowerCase();
                
                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    $(this).parent().show();
                    visibleCount++;
                } else {
                    $(this).parent().hide();
                }
            });
            
            // Show/hide "no results" message
            if (visibleCount === 0 && searchTerm !== '') {
                if ($('#noResults').length === 0) {
                    $('.tab-content').append('<div id="noResults" class="text-center py-5"><h5 class="text-muted">No products found matching "' + searchTerm + '"</h5><p class="text-muted">Try searching with different keywords</p></div>');
                }
            } else {
                $('#noResults').remove();
            }
        });

        // Clear search button
        $('#clearSearch').on('click', function() {
            $('#productSearch').val('');
            $('.service-item').parent().show();
            $('#noResults').remove();
        });

        // Populate All Products tab when clicked
        $('#all-tab').on('click', function() {
            populateAllProducts();
        });

        function populateAllProducts() {
            var allProductsContainer = $('#allProductsContainer');
            allProductsContainer.empty();
            
            // Clone all products from other tabs
            $('.tab-pane .service-item').each(function() {
                var clonedProduct = $(this).parent().clone();
                allProductsContainer.append(clonedProduct);
            });
        }

        // Auto-populate on page load if All Products tab is active
        if ($('#all-tab').hasClass('active')) {
            populateAllProducts();
        }
    });

    // Load product cards from feature.html into homepage container
    if ($('#homeProductsContainer').length) {
        $.get('feature.html', function(data) {
            try {
                var html = $(data);
                // select product card columns from product-tabContent
                var items = html.find('#product-tabContent .tab-pane .col-lg-4');
                var container = $('#homeProductsContainer');
                container.empty();
                var used = {};
                var count = 0;
                // pick first 3 unique products for homepage
                items.each(function() {
                    if (count >= 3) return;
                    var title = $(this).find('h4, h5').first().text().trim();
                    if (!title) title = 'product-' + count;
                    if (used[title]) return;
                    used[title] = true;
                    var clone = $(this).clone();
                    // ensure the cloned column preserves responsive classes
                    container.append(clone);
                    count++;
                });
            } catch (err) {
                console.error('Error loading products into home page:', err);
            }
        });
    }
    
})(jQuery);

