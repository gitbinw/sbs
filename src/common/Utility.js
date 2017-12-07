import 'whatwg-fetch';

class Utility {
    constructor() {}
    
    /* 
        This function wrap the 'fetch' into another ES6 promise.
        This way, you can use any other 3rd party async library e.g. axios
        without change other components
    */
    getData(url) {
        const objPromise = new Promise((resolve, reject) => {
            fetch(url)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    resolve(json);
                }).catch(function(ex) {
                    reject(ex);
                });
        });
        
        return objPromise;
    }
    postData(url, jData) {
        const objPromise = new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: new Headers(),
                body: JSON.stringify(jData)
                
            }).then((response) => {
                return response.json();
            }).then((json) => {
                resolve(json);
            }).catch((ex) => {
                reject(ex);
            });
        });
        
        return objPromise;
    }

    setupSlyScroll() {
        var $frame  = $('#slides_1');
        var $slidee = $frame.children('ul').eq(0);
        var $wrap   = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            //startAt: 3,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            //pagesBar: $wrap.find('.pages'),
            activatePageOn: 'click',
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            //forward: $wrap.find('.forward'),
            //backward: $wrap.find('.backward'),
            //prev: $wrap.find('.prev'),
            //next: $wrap.find('.next'),
            prevPage: $wrap.find('.prevPage'),
            nextPage: $wrap.find('.nextPage')
        });
    }
}

export default new Utility();