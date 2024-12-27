import{a as R,b as z,c as B,d as u}from"./chunk-4ETE5LBC.js";import{a as O,b as E,c as M,d as V,e as j,f as G,g as $,h as P,i as L,j as q}from"./chunk-5SU3YTSO.js";import{Ca as C,Ka as l,Ma as t,Na as o,Oa as p,Pa as h,Qa as c,Ra as x,Sa as s,Ta as S,Ua as f,Y as T,Z as v,ab as b,kb as _,lb as w,mb as D,pa as r,qa as k,xa as d}from"./chunk-GM3PGS4F.js";var y=class n{constructor(i){this.taskService=i}addTaskForm=new j({taskDescription:new G("",[E.required,E.minLength(2)])});addTask(){let i=Date.now().toString(),e=R(),a=z(),m=new B(i,this.addTaskForm.value.taskDescription,e,a);this.taskService.addTask(m),this.addTaskForm.reset()}static \u0275fac=function(e){return new(e||n)(k(u))};static \u0275cmp=d({type:n,selectors:[["app-add-task"]],decls:4,vars:1,consts:[["name","addTaskForm",1,"d-flex","flex-row","justify-content-center","gap-3","mb-3",3,"ngSubmit","formGroup"],["type","text","formControlName","taskDescription","placeholder","Enter Task Description",1,"form-control","w-md-50","fs-5","shadow"],["type","submit",1,"btn","btn-primary","w-10","w-25","shadow"]],template:function(e,a){e&1&&(t(0,"form",0),c("ngSubmit",function(){return a.addTask()}),p(1,"input",1),t(2,"button",2),s(3," Add Task "),o()()),e&2&&l("formGroup",a.addTaskForm)},dependencies:[q,$,O,M,V,P,L],encapsulation:2})};function Q(n,i){n&1&&(t(0,"div",4)(1,"p"),s(2,"empty task"),o()())}function U(n,i){if(n&1){let e=h();t(0,"li",5)(1,"figure"),p(2,"img",6),o(),t(3,"div",7)(4,"p",8),s(5),o(),t(6,"div",9)(7,"div")(8,"div",10)(9,"p",11),s(10),o(),t(11,"p",11),s(12),o()()(),t(13,"div",12)(14,"button",13),c("click",function(){let m=T(e).$implicit,g=x();return v(g.deleteTask(m.id))}),s(15," Delete "),o(),t(16,"button",14),c("click",function(){let m=T(e).$implicit,g=x();return v(g.completedTask(m.id))}),s(17," Completed "),o()()()()()}if(n&2){let e=i.$implicit;r(5),S(e.description),r(5),f("createdAt: ",e.createdAt,""),r(2),f("Due: ",e.dueDate,"")}}var I=class n{constructor(i){this.taskService=i;this.tasks=this.taskService.tasks,this.todoTasks=b(()=>this.tasks().filter(e=>!e.completed))}tasks;todoTasks;ngOnInit(){this.taskService.loadTasks()}deleteTask(i){this.taskService.deleteTask(i)}completedTask(i){this.taskService.markTaskAsCompleted(i)}static \u0275fac=function(e){return new(e||n)(k(u))};static \u0275cmp=d({type:n,selectors:[["app-todo-tasks"]],decls:6,vars:2,consts:[[1,"fs-4"],[1,"list-group",2,"min-height","200px"],["class","text-center",4,"ngIf"],["class","list-group-item bg-warning-subtle shadow mb-3 rounded d-flex gap-2",4,"ngFor","ngForOf"],[1,"text-center"],[1,"list-group-item","bg-warning-subtle","shadow","mb-3","rounded","d-flex","gap-2"],["src","/images/todo.png","alt","task image",1,"img-fluid",2,"width","80px","height","80px"],[1,"w-100"],[1,"fs-5"],[1,"taskDetails","d-flex","flex-column","flex-md-row","justify-content-between","lh-1"],[1,"info","d-flex","flex-column","flex-md-row","text-light-emphasis","gap-md-3"],[1,"pb-md-0"],[1,"d-flex","gap-2"],[1,"btn","btn-warning","shadow",3,"click"],[1,"btn","btn-primary","shadow",3,"click"]],template:function(e,a){e&1&&(t(0,"div")(1,"h3",0),s(2,"ToDo Task"),o(),t(3,"ol",1),C(4,Q,3,0,"div",2)(5,U,18,3,"li",3),o()()),e&2&&(r(4),l("ngIf",a.todoTasks().length===0),r(),l("ngForOf",a.todoTasks()))},dependencies:[D,_,w],encapsulation:2})};function W(n,i){n&1&&(t(0,"div",4)(1,"p"),s(2,"no task completed"),o()())}function X(n,i){if(n&1){let e=h();t(0,"li",5)(1,"figure"),p(2,"img",6),o(),t(3,"div",7)(4,"p",8),s(5),o(),t(6,"div",9)(7,"div",10)(8,"div",11)(9,"p"),s(10),o(),t(11,"p"),s(12),o(),t(13,"p"),s(14),o()()(),t(15,"div",12)(16,"button",13),c("click",function(){let m=T(e).$implicit,g=x();return v(g.deleteCompletedTask(m.id))}),s(17," Delete "),o()()()()()}if(n&2){let e=i.$implicit;r(5),S(e.description),r(5),f("CreatedAt:",e.createdAt,""),r(2),f("Due:",e.dueDate,""),r(2),f("CompletedAt:",e.completedAt,"")}}var F=class n{constructor(i){this.taskService=i;this.tasks=this.taskService.tasks,this.completedTasks=b(()=>this.tasks().filter(e=>e.completed))}tasks;completedTasks;ngOnInit(){this.taskService.loadTasks()}deleteCompletedTask(i){this.taskService.deleteTask(i)}static \u0275fac=function(e){return new(e||n)(k(u))};static \u0275cmp=d({type:n,selectors:[["app-completed-tasks"]],decls:6,vars:2,consts:[[1,"fs-4"],["id","completedList",1,"list-group",2,"min-height","200px"],["class","text-center",4,"ngIf"],["class","list-group-item bg-dark-subtle shadow mb-3 rounded d-flex gap-2",4,"ngFor","ngForOf"],[1,"text-center"],[1,"list-group-item","bg-dark-subtle","shadow","mb-3","rounded","d-flex","gap-2"],["src","/images/check.png","alt","task image",1,"img-fluid",2,"width","80px","height","80px"],[1,"w-100"],[1,"fs-5"],[1,"d-flex","flex-column","flex-md-row","justify-content-between"],[1,""],[1,"info","d-flex","flex-column","flex-md-row","text-light-emphasis","gap-md-3"],[1,"d-flex","flex-row","justify-content-end"],[1,"btn","btn-warning","shadow",3,"click"]],template:function(e,a){e&1&&(t(0,"div")(1,"h3",0),s(2,"Completed Task"),o(),t(3,"ol",1),C(4,W,3,0,"div",2)(5,X,18,4,"li",3),o()()),e&2&&(r(4),l("ngIf",a.completedTasks().length===0),r(),l("ngForOf",a.completedTasks()))},dependencies:[D,_,w],encapsulation:2})};var J=class n{static \u0275fac=function(e){return new(e||n)};static \u0275cmp=d({type:n,selectors:[["app-dashboard"]],decls:4,vars:0,consts:[[1,"container","py-5"]],template:function(e,a){e&1&&(t(0,"main",0),p(1,"app-add-task")(2,"app-todo-tasks")(3,"app-completed-tasks"),o())},dependencies:[y,I,F],encapsulation:2})};export{J as DashboardComponent};