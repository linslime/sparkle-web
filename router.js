function MyRouter(){
    this.routes = {};
    this.bind();
}

MyRouter.prototype.init = function (firsturl){
    history.replaceState({path: firsturl}, null, firsturl);
    if (this.routes[firsturl])
        this.routes[firsturl]();
}

MyRouter.prototype.route = function(url, callback){
    this.routes[url] = callback ? callback : function(){};
}

MyRouter.prototype.go = function (url){
    history.pushState({path: url}, null, url);
    if (this.routes[url]) this.routes[url]();
}

MyRouter.prototype.bind = function(){
    window.addEventListener('popstate',e =>{
        const url = e.state && e.state.path;
        if(this.routes[url]) this.routes[url]();
    });
}

window.Router = new MyRouter();
Router.init(location.pathname);
const content = document.querySelector('body');
const ul = document.querySelector('ul');

function changeBgColor(color){
    content.style.backgroundColor = color;
}
Rouer.route('#', function(){
    changeBgColor('white');
});
Rouer.route('#blue', function(){
    changeBgColor('blue');
});
Rouer.route('#red', function(){
    changeBgColor('red');
});

ul.addEventListener('click', e => {
    if(e.target.tagName === 'A'){
        e.preventDefault();
        Router.go(e.target.getAttribute('href'));
    }
});