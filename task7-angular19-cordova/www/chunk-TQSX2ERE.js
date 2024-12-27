import{c as R,f as I}from"./chunk-SHQEBU6A.js";import{a as L,b as m,c as T,d as M,e as q,f as _,g as G,h as D,i as j,j as A}from"./chunk-5SU3YTSO.js";import{Ca as p,Ka as a,Ma as t,Na as r,Oa as v,Qa as F,Ra as C,Sa as l,Ta as w,Ua as b,c as S,lb as N,mb as x,pa as o,qa as y,xa as E}from"./chunk-GM3PGS4F.js";function U(i,n){if(i&1&&(t(0,"div",18),l(1),r()),i&2){let s=C();o(),w(s.error)}}function V(i,n){i&1&&(t(0,"div")(1,"span",19),l(2,"Email is Mandatory"),r()())}function k(i,n){i&1&&(t(0,"span",19),l(1,"Email is Mandatory"),r())}function z(i,n){i&1&&(t(0,"span",19),l(1,"Email is Mandatory"),r())}function B(i,n){i&1&&(t(0,"span",19),l(1,"Invalid Email"),r())}function H(i,n){i&1&&(t(0,"span",19),l(1,"Email is Mandatory"),r())}function J(i,n){i&1&&(t(0,"span",19),l(1,"Password must be at least 8 characters"),r())}var P=class i{constructor(n,s){this.router=n;this.authService=s}isLoading=!1;error=null;registerForm=new q({firstName:new _("",[m.required,m.minLength(2)]),lastName:new _("",[m.required,m.minLength(2)]),email:new _("",[m.required,m.email]),password:new _("",[m.required,m.minLength(8)])});register(){return S(this,null,function*(){this.isLoading=!0,console.log(this.registerForm.value);try{let n=yield this.authService.registerUser(this.registerForm.value);n.success?(console.log(n.message),this.router.navigate(["/login"])):(console.log(n.message),this.error=n.message)}catch(n){console.error("Error registering user: "+n.message),this.error="Unable to Register User"}this.isLoading=!1})}static \u0275fac=function(s){return new(s||i)(y(R),y(I))};static \u0275cmp=E({type:i,selectors:[["app-register"]],decls:34,vars:10,consts:[[1,"container","d-flex","justify-content-center","align-items-center","vh-100"],[1,"card","shadow-lg","p-4",2,"width","100%","max-width","500px"],[1,"text-center","mb-2"],[1,"row","g-3",3,"ngSubmit","formGroup"],["class","alert alert-danger",4,"ngIf"],[1,""],["for","fname",1,"form-label"],["type","text","id","fname","placeholder","first name","formControlName","firstName",1,"form-control"],[4,"ngIf"],["for","lname",1,"form-label"],["type","text","id","lname","placeholder","last name","formControlName","lastName",1,"form-control"],["class","text-danger",4,"ngIf"],["for","email",1,"form-label"],["type","email","id","email","placeholder","email","formControlName","email",1,"form-control"],["for","password",1,"form-label"],["type","password","id","password","placeholder","Enter password","formControlName","password",1,"form-control"],[1,"d-flex","justify-content-end"],["type","submit",1,"btn","btn-primary",3,"disabled"],[1,"alert","alert-danger"],[1,"text-danger"]],template:function(s,e){if(s&1&&(t(0,"div",0)(1,"div",1)(2,"h2",2),l(3,"Register"),r(),t(4,"form",3),F("ngSubmit",function(){return e.register()}),p(5,U,2,1,"div",4),t(6,"div",5)(7,"label",6),l(8,"First Name"),r(),v(9,"input",7),p(10,V,3,0,"div",8),r(),t(11,"div",5)(12,"label",9),l(13,"Last Name"),r(),v(14,"input",10),t(15,"div"),p(16,k,2,0,"span",11),r()(),t(17,"div",5)(18,"label",12),l(19,"Email"),r(),v(20,"input",13),t(21,"div"),p(22,z,2,0,"span",11)(23,B,2,0,"span",11),r()(),t(24,"div",5)(25,"label",14),l(26,"Password"),r(),v(27,"input",15),t(28,"div"),p(29,H,2,0,"span",11)(30,J,2,0,"span",11),r()(),t(31,"div",16)(32,"button",17),l(33),r()()()()()),s&2){let d,h,u,g,f,c;o(4),a("formGroup",e.registerForm),o(),a("ngIf",e.error),o(5),a("ngIf",((d=e.registerForm.get("firstName"))==null?null:d.invalid)&&((d=e.registerForm.get("firstName"))==null?null:d.touched)),o(6),a("ngIf",((h=e.registerForm.get("lastName"))==null?null:h.invalid)&&((h=e.registerForm.get("lastName"))==null?null:h.touched)),o(6),a("ngIf",((u=e.registerForm.get("email"))==null||u.errors==null?null:u.errors.required)&&((u=e.registerForm.get("email"))==null?null:u.touched)),o(),a("ngIf",((g=e.registerForm.get("email"))==null||g.errors==null?null:g.errors.email)&&((g=e.registerForm.get("email"))==null?null:g.touched)),o(6),a("ngIf",((f=e.registerForm.get("password"))==null||f.errors==null?null:f.errors.required)&&((f=e.registerForm.get("password"))==null?null:f.touched)),o(),a("ngIf",((c=e.registerForm.get("password"))==null||c.errors==null?null:c.errors.minlength)&&((c=e.registerForm.get("password"))==null?null:c.touched)),o(2),a("disabled",!e.registerForm.valid||e.isLoading),o(),b(" ",e.isLoading?"Loading...":"Register"," ")}},dependencies:[A,G,L,T,M,D,j,x,N],encapsulation:2})};export{P as RegisterComponent};
