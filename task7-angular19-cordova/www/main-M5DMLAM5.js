import{a as F,b as M,c,d as E,e as P,f as G}from"./chunk-SHQEBU6A.js";import{d as V}from"./chunk-4ETE5LBC.js";import{Ca as S,Ha as k,Ia as I,Ka as u,M as f,Ma as n,Na as a,Oa as D,Pa as N,Qa as T,R as o,Ra as g,Sa as p,Ua as j,Wa as x,Y as R,Ya as U,Z as y,c as A,lb as w,mb as L,pa as m,qa as v,rb as s,xa as d}from"./chunk-GM3PGS4F.js";var h=class e{constructor(r,t,i){this.authService=r;this.userService=t;this.router=i}canActivate(r,t){return A(this,null,function*(){return this.userService.user()||(yield this.authService.autoLogin())?!0:(this.router.navigate(["/login"]),!1)})}static \u0275fac=function(t){return new(t||e)(o(G),o(s),o(c))};static \u0275prov=f({token:e,factory:e.\u0275fac,providedIn:"root"})};var l=class e{constructor(r,t){this.userService=r;this.router=t}canActivate(){return this.userService.user()?(this.router.navigate(["/dashboard"]),!1):!0}static \u0275fac=function(t){return new(t||e)(o(s),o(c))};static \u0275prov=f({token:e,factory:e.\u0275fac,providedIn:"root"})};var q=[{path:"login",loadComponent:()=>import("./chunk-7QN4RZH7.js").then(e=>e.LoginComponent),title:"Login",canActivate:[l]},{path:"register",loadComponent:()=>import("./chunk-TQSX2ERE.js").then(e=>e.RegisterComponent),title:"Register",canActivate:[l]},{path:"dashboard",loadComponent:()=>import("./chunk-OVM2V4HX.js").then(e=>e.DashboardComponent),title:"Task Dashboard",canActivate:[h]},{path:"",redirectTo:"/login",pathMatch:"full"},{path:"**",redirectTo:"/login"}];var z={providers:[U({eventCoalescing:!0}),P(q)]};var J=()=>[E,w],K=()=>["/login"],Q=()=>["/register"];function W(e,r){e&1&&(n(0,"div",3)(1,"a",4),p(2,"Login"),a(),n(3,"a",4),p(4,"Register"),a()()),e&2&&(m(),u("routerLink",x(2,K)),m(2),u("routerLink",x(3,Q)))}function X(e,r){if(e&1){let t=N();n(0,"div",3)(1,"p"),p(2),n(3,"button",5),T("click",function(){R(t);let B=g(2);return y(B.logout())}),p(4,"Logout"),a()()()}if(e&2){let t,i=g(2);m(2),j(" ",(t=i.user())==null?null:t.email," ")}}function Y(e,r){if(e&1&&S(0,W,5,4,"div",2)(1,X,5,1,"div",2),e&2){let t=g();u("ngIf",!t.user()),m(),u("ngIf",t.user())}}var C=class e{constructor(r,t,i){this.userService=r;this.taskService=t;this.router=i;this.user=this.userService.user}user;logout(){this.userService.clearUser(),this.taskService.clearTasks(),this.router.navigate(["/login"])}static \u0275fac=function(t){return new(t||e)(v(s),v(V),v(c))};static \u0275cmp=d({type:e,selectors:[["app-navbar"]],decls:7,vars:0,consts:[[1,"navbar","navbar-expand-lg","navbar-light","bg-light"],[1,"container","d-flex","justify-content-between","align-items-center"],["class","d-flex align-items-center gap-2",4,"ngIf"],[1,"d-flex","align-items-center","gap-2"],[1,"btn","btn-primary",3,"routerLink"],[1,"btn","btn-primary",3,"click"]],template:function(t,i){t&1&&(n(0,"header",0)(1,"div",1)(2,"h2"),p(3,"Task Profiler"),a(),S(4,Y,2,2),k(5,4,J),I(),a()())},dependencies:[L],encapsulation:2})};var b=class e{title="task6-angular19";static \u0275fac=function(t){return new(t||e)};static \u0275cmp=d({type:e,selectors:[["app-root"]],decls:2,vars:0,template:function(t,i){t&1&&D(0,"app-navbar")(1,"router-outlet")},dependencies:[M,C],encapsulation:2})};F(b,z).catch(e=>console.error(e));