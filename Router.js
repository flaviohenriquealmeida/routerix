class Route {
    
    constructor(routeId, htmlFile) {
        
        this._id = routeId;
        this._htmlFile = htmlFile;
    }
    
    get id() {
        return this._id;
    }
    
    get htmlFile() {
        
        return this._htmlFile;
    }
}

class Router {
    
    constructor(history, http, target, location) {
        
        this._historyAPI = history;
        this._http = http;
        this._target = target;
        this._routes = new Map();
        this._location = location;
        
        this._init();
    }
    
    _init() {
        
        window.onpopstate = event => this._render(event.state.html);
        
    }
    
    go(){
        this.doNavigation(window.location.pathname);
    }
    
    addRoute(route) {
        this._routes.set(route.id, route);
    }
    
    doNavigation(routeId) {
        
        if(this._isValidRoute(routeId)) {
            
            let route = this._getRoute(routeId);
            
            this._http.get(route.htmlFile).then(html => {
                    
                this._pushState({ html: html }, '', route.id);
                this._render(html);
                
            });
                
        } else {
            alert('ID does not exist')    
        }
    }
    
    _getRoute(routeId) {
        return this._routes.get(routeId);
    }
    
    _render(html) {
        
        this._target.innerHTML = html;
    }
    
    _pushState(state, title, url) {
        
        this._historyAPI.pushState(state, title, url);
    }
    
    _isValidRoute(id) {
        
        return this._routes.get(id) != undefined;
    }
}

