/*/ index.html
window.addEventListener('load', function () {
    navigator
        .serviceWorker
        .register('/service-worker.js');
});

// service-worker.js
self.addEventListener('fetch', function (event) {
    event.respondWith(async function () {
        let headers = new Headers()
        headers.append("X-Custom-Header", "Random value")
        return fetch(event.request, {headers: headers})
    }());
});*/


/*(function() { 
    (function (open) {
        XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
            console.log("Adding header");
            open.call(this, method, url, async, user, password);
            this.setRequestHeader("X-Hello", "There " + new Date());
        };
    })(XMLHttpRequest.prototype.open);
})();*/

if(window.localStorage.getItem("ANDSBZID")){
    (function() { 
        (function (send) {
            XMLHttpRequest.prototype.send = function (data) {
                this.setRequestHeader("hotel_brand_id", window.localStorage.getItem("ANDSBZID"));
                send.call(this, data);
            };
        })(XMLHttpRequest.prototype.send);
    })();
}



