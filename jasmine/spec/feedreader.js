/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('allFeeds has URL and not empty', function(){
            for(var i = 0; i< allFeeds.length; i++ ){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(undefined);
            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('allFeeds has name and not empty', function(){
            for(var i = 0; i< allFeeds.length; i++ ){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(undefined);
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function(){
        // Jquery variable
        var $body = $('body'),
            $menuIconLink = $('.menu-icon-link'),
            $menu = $('.menu');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('Menu should be hidden by default', function(){
            var className = document.body.className;
            expect($body.hasClass('menu-hidden')).toEqual(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('Menu should toggle', function(){
            $menuIconLink.trigger('click');
            expect($body.hasClass('menu-hidden')).toEqual(false);

            $menuIconLink.trigger('click');
            expect($body.hasClass('menu-hidden')).toEqual(true);
          })
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
         /*TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         var id = 0;
         beforeEach(function(done){
            funcStatus = loadFeed(id, function(){
                done();
            });
         });

         it('Load is complete', function(done){
            var numEntry = $(".entry-link").length;
            expect(numEntry).toBeGreaterThan(0);
            done();
         });
    });
    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var content, newContent;
         beforeEach(function(done){
            loadFeed(0, function(){
                content = $('.feed').find('h2').text();
                done();
            });
         });

         it('Content change to new feeds', function(done){
            loadFeed(1, function(){
                newContent = $('.feed').find('h2').text();
                done();
            });

            expect(content).not.toEqual(newContent);

         })

    })


}());
