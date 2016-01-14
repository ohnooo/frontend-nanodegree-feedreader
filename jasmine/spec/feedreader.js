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
    /* Test Suite */

    /* Test RSS Feeds */
    describe('RSS Feeds', function() {
        /* it <define spec> - Test allFeeds
         * condition:
         * - All to be defined
         * - Not empty
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* it <define spec> - Test has URL and NOT empty
         * condition:
         * Each item is defined
         * Each item is not empty
         */
         it('allFeeds has URL and not empty', function(){
            for(var i = 0; i< allFeeds.length; i++ ){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
         });

        /* it <define spec> - loop each item
         * Item.name is defined
         * Item.name not empty
         */
         it('allFeeds has name and not empty', function(){
            for(var i = 0; i< allFeeds.length; i++ ){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
         });
    });


    /* Test for Menu */
    describe('The Menu', function(){
        // Jquery variable
        var $body = $('body'),
            $menuIconLink = $('.menu-icon-link'),
            $menuList = $('.feed-list'),
            $links = $('.feed-list li a').text();

        /* it <define spec> - Menu hidden by default
         * if <body> has class 'menu-hidden'
         */
         it('Menu should be hidden by default', function(){
            expect($body.hasClass('menu-hidden')).toEqual(true);
         });

        /* it <define spec> - Menu change when click on icon
         * $menuIconLink.trigger<fake trigger>
         * http://api.jquery.com/trigger/
         */
         it('Menu should toggle', function(){
            $menuIconLink.trigger('click');
            expect($body.hasClass('menu-hidden')).toEqual(false);

            $menuIconLink.trigger('click');
            expect($body.hasClass('menu-hidden')).toEqual(true);
         });

        /* &&& Additional Test &&& */

        /* it <define spec> - Menu is properly loaded
         * class feed-list > 0
         */
         it('Menu is loaded', function(){
            console.log($links);
            expect($links).not.toBe('');
         });

        /* it <define spec> - feedList when clicked menu is hidden
         * Hide when clicked
         */
         it('Item is clicked to hide menu', function(){

            $menuList.trigger('click');
            expect($body.hasClass('menu-hidden')).toEqual(true);
         });
    });

    /* "Initial Entries" */
    describe('Initial Entries', function(){

         /* Asynchronous test - beforeEach + done
          * https://jasmine.github.io/2.3/introduction.html#section-Asynchronous_Support
          */
         var id = 0;
         beforeEach(function(done){
            loadFeed(id, done);
         });

         /* it <define spec> - Makes sure load is complete
          * If complete number entry > 0
          */
         it('Load is complete', function(){
            var numEntry = $(".entry-link").length;
            expect(numEntry).toBeGreaterThan(0);
         });
    });

    /* "New Feed Selection"*/
    describe('New Feed Selection', function(){

         /* Compare if new feeds is loaded content should change
          * @{param} - content - initial data
          * @{param} - newContent - new data
          * beforeEach - Async load intial data
          */
         var content, newContent;
         beforeEach(function(done){
            loadFeed(0, function(){
                // save  feed[0] string to content
                content = $('.feed').find('h2').text();
                done();
            });
         });

         /* it <define spec> - Ensure content change based on new feeds
          * compare content : newContent -> not equal
          */
         it('Content change to new feeds', function(done){
            loadFeed(1, function(){
                // save feed[1] string to newContent
                newContent = $('.feed').find('h2').text();

                // expect inside of done to achieve asynchronous
                // Test if content : newContent -> not equal -> if true === pass
                expect(content).not.toEqual(newContent);
                done();
            });


         });

    });


}());
