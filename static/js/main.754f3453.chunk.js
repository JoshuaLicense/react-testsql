(this["webpackJsonp@react-testsql/client"]=this["webpackJsonp@react-testsql/client"]||[]).push([[3],{166:function(e,t,a){e.exports=a(211)},211:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(15),i=a.n(o),s=(a(171),a(23)),l=a.n(s),c=a(34),u=a(36),p=a(10),d=a(13),m=a(12),h=a(11),f=r.a.createContext({user:null,login:function(e){},refresh:function(){},logout:function(){}}),v=a(26),b=function(e,t){var a={username:e,password:t};return fetch("/api/user/login",{method:"POST",body:JSON.stringify(a),credentials:"same-origin",headers:new Headers({"Content-Type":"application/json"})}).then(v.a).then((function(e){return e.json()}))},g=function(){return fetch("/api/user/info",{method:"GET",credentials:"same-origin",headers:new Headers({"Content-Type":"application/json"})}).then(v.a).then((function(e){return e.json()}))},E=function(){return fetch("/api/user/logout",{method:"GET",credentials:"same-origin",headers:new Headers({"Content-Type":"application/json"})}).then(v.a)},y=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).login=function(t){return e.setState({user:t})},e.joinGroup=function(t){return e.setState((function(e){return{user:Object(u.a)({},e.user,{group:t})}}))},e.leaveGroup=function(){return e.setState((function(e){return{user:Object(u.a)({},e.user,{group:null})}}))},e.refresh=Object(c.a)(l.a.mark((function t(){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.prev=0,t.t0=null,t.next=8;break;case 5:return t.next=7,g();case 7:t.t0=t.sent;case 8:a=t.t0,e.setState({user:a,isLoaded:!0}),t.next=15;break;case 12:t.prev=12,t.t1=t.catch(0),e.setState({user:null,isLoaded:!0});case 15:case"end":return t.stop()}}),t,null,[[0,12]])}))),e.logout=function(){return e.setState({user:null})},e.state={user:null,isLoaded:!1,login:e.login,joinGroup:e.joinGroup,leaveGroup:e.leaveGroup,refresh:e.refresh,logout:e.logout},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.refresh()}},{key:"render",value:function(){return r.a.createElement(f.Provider,{value:this.state},this.props.children)}}]),a}(r.a.Component),w=a(38),S=a(263),j=a(130),O=a.n(j),k=a(129),C=a.n(k),x=a(293),D=r.a.lazy((function(){return Promise.all([a.e(0),a.e(6),a.e(2)]).then(a.bind(null,806))})),Q=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={open:!1},e.handleOpen=function(){return e.setState({open:!0})},e.handleClose=function(){return e.setState({open:!1})},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this.state.open,t=this.props,a=t.currentGroup,o=t.joinGroupHandler,i=t.leaveGroupHandler,s=t.loadDatabaseHandler;return r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a,{title:"Groups"},r.a.createElement(S.a,{color:a?"secondary":"inherit","aria-label":"Group List",onClick:this.handleOpen,onMouseOver:this.handleMouseOver},r.a.createElement(C.a,{fontSize:"small"}))),e&&r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null,"Loading...")},r.a.createElement(D,{closeHandler:this.handleClose,currentGroup:a,loadDatabaseHandler:s,joinGroupHandler:o,leaveGroupHandler:i})))}}]),a}(r.a.Component),H=a(104),T=a.n(H),N=r.a.lazy((function(){return Promise.all([a.e(0),a.e(5)]).then(a.bind(null,808))})),A=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={open:!1},e.handleOpen=function(){return e.setState({open:!0})},e.handleClose=function(){return e.setState({open:!1})},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this.state.open,t=this.props,a=t.currentDatabase,o=t.loadDatabaseHandler;return t.disabled?r.a.createElement(x.a,{title:"Disabled while in a group"},r.a.createElement("span",{style:{display:"inline-block"}},r.a.createElement(S.a,{color:"inherit","aria-label":"Saved Database Actions",disabled:!0},r.a.createElement(T.a,{fontSize:"small"})))):r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a,{title:"Saved Databases"},r.a.createElement("span",{style:{display:"inline-block"}},r.a.createElement(S.a,{onClick:this.handleOpen,onMouseOver:this.handleMouseOver,color:"inherit","aria-label":"Saved Database Actions"},r.a.createElement(T.a,{fontSize:"small"})))),e&&r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null,"Loading...")},r.a.createElement(N,{closeHandler:this.handleClose,currentDatabase:a,loadDatabaseHandler:o})))}}]),a}(r.a.Component),L=a(79),I=(r.a.Component,a(264)),q=a(292),P=a(265),G=a(274),U=a(266),B=a(267),R=a(268),M=(r.a.Component,a(275)),z=a(276),F=a(131),_=a.n(F),W=a(63),J=a(291),V=a(132),$=a.n(V)()((function(e){return{sidebarToggleIcon:Object(w.a)({marginRight:"8px",marginLeft:"-8px"},e.breakpoints.up("sm"),{marginLeft:"-16px"}),userActionsContainer:{marginLeft:"auto"}}}))((function(e){return r.a.createElement(M.a,{position:"fixed"},r.a.createElement(z.a,null,r.a.createElement(J.a,{implementation:"css",mdUp:!0},r.a.createElement(S.a,{color:"inherit",className:e.classes.sidebarToggleIcon,onClick:e.sidebarToggleHandler,"aria-label":"Open drawer"},r.a.createElement(_.a,{fontSize:"small"}))),r.a.createElement(W.a,{variant:"h6",color:"inherit",noWrap:!0},"testSQL"),!1))})),K=a(147),X=a(106),Y=a(5),Z=Object(Y.a)((function(e){return{seperator:{margin:e.spacing(2)}}}))((function(e){var t=e.classes,a=e.title,n=e.children,o=e.padding,i=void 0===o?0:o,s=Object(K.a)(e,["classes","title","children","padding"]),l={padding:i};return r.a.createElement("div",Object.assign({className:t.seperator},s),r.a.createElement(W.a,{variant:"body1",color:"textSecondary",component:"h3",gutterBottom:!0},a),r.a.createElement(X.a,{style:l,elevation:2,square:!0},n))})),ee=a(53),te=a(133),ae=a.n(te),ne=a(297),re=a(277),oe=a(278),ie=a(219),se=a(134),le=a.n(se),ce=a(135),ue=a.n(ce),pe=a(279),de=a(280),me=a(290),he=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={allSetNames:[],activeSet:null,activeQuestionSet:null},e.componentDidUpdate=function(t){var a=e.props,n=a.allQuestions,r=a.activeQuestionIndex,o=n[r];if(r===t.activeQuestionIndex&&o.completed!==t.allQuestions[r].completed){var i=Object(ee.a)(n.filter((function(t){return t.set===e.state.activeSet})));e.setState({activeQuestionSet:i})}if(e.props.allQuestions&&e.state.activeSet!==o.set){if(!1===e.state.allSetNames.includes(o.set)){var s=Object(ee.a)(new Set(n.map((function(e){return e.set}))));e.setState({allSetNames:s})}var l=o.set,c=Object(ee.a)(n.filter((function(t){return t.set===e.state.activeSet})));e.setState({activeSet:l,activeQuestionSet:c})}},e.handleNext=function(){var t=(e.props.allQuestions[e.props.activeQuestionIndex].index+1)%e.state.activeQuestionSet.length,a=e.state.activeQuestionSet[t].index;e.props.changeQuestionHandler(a)},e.handlePrev=function(){var t=e.props.allQuestions[e.props.activeQuestionIndex].index-1,a=t<0?e.state.activeQuestionSet.length-1:t,n=e.state.activeQuestionSet[a].index;e.props.changeQuestionHandler(n)},e.handleQuestionChange=function(t){return function(){e.props.changeQuestionHandler(t)}},e.handleSetChange=function(t){var a=t.target.value;if(a!==e.state.activeSet){var n=e.props.allQuestions,r=Object(ee.a)(n.filter((function(e){return e.set===a})));if(0!==r.length){e.props.changeQuestionHandler(r[0].index);var o=a;e.setState({activeSet:o,activeQuestionSet:r})}}},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.allQuestions,t=Object(ee.a)(new Set(e.map((function(e){return e.set})))),a=t[0],n=Object(ee.a)(e.filter((function(e){return e.set===a})));this.setState({allSetNames:t,activeSet:a,activeQuestionSet:n})}},{key:"render",value:function(){var e=this,t=this.state,a=t.activeQuestionSet,n=t.allSetNames,o=t.activeSet;if(!o)return r.a.createElement("div",null,"Dividing the questions by their sets.");var i=this.props,s=i.classes,l=i.allQuestions[i.activeQuestionIndex],c=a.indexOf(l);return r.a.createElement(r.a.Fragment,null,a&&r.a.createElement(ne.a,{activeStep:c,className:s.innerPadding,nonLinear:!0},a.map((function(t){return r.a.createElement(re.a,{key:t.index},r.a.createElement(oe.a,{className:s.stepperButton,"aria-label":"Question #".concat(t.index),onClick:e.handleQuestionChange(t.index),completed:Boolean(t.completed)},r.a.createElement(ie.a,{classes:{iconContainer:s.stepperLabel},StepIconProps:{classes:{active:s.activeStep,completed:s.completedStep}},error:Boolean(t.error)})))}))),r.a.createElement(pe.a,null),r.a.createElement("div",{className:s.innerPadding},l&&r.a.createElement(W.a,{variant:"subtitle1",component:"div",color:l.error?"error":"inherit",dangerouslySetInnerHTML:{__html:ae()(l.question)},gutterBottom:!0}),r.a.createElement("div",{className:s.bottomActions},o&&r.a.createElement("div",null,r.a.createElement(me.a,{value:o,onChange:this.handleSetChange},n.map((function(e){return r.a.createElement(de.a,{key:e,value:e},e)})))),r.a.createElement("div",null,r.a.createElement(I.a,{className:s.previousButton,variant:"contained",size:"small","aria-label":"Previous question",onClick:this.handlePrev},r.a.createElement(le.a,null),r.a.createElement(J.a,{xsDown:!0,implementation:"css"},"Previous")),r.a.createElement(I.a,{className:s.nextButton,variant:"contained",size:"small",color:"primary","aria-label":"Next question",onClick:this.handleNext},r.a.createElement(J.a,{xsDown:!0,implementation:"css"},"Next"),r.a.createElement(ue.a,null))))))}}]),a}(r.a.Component),fe=Object(Y.a)((function(e){return{innerPadding:{padding:e.spacing(2),overflow:"auto"},stepperButton:{padding:e.spacing(1),margin:-e.spacing(1)},stepperLabel:{padding:0},completedStep:{color:"green !important"},divider:{marginBottom:e.spacing(2)},previousButton:{marginRight:e.spacing(1)},bottomActions:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:e.spacing(2)}}}))(he),ve=a(281),be=a(285),ge=a(284),Ee=a(282),ye=a(283),we=function(e){var t=e.columns,a=e.values;return r.a.createElement(ve.a,{size:"small"},r.a.createElement(Ee.a,null,r.a.createElement(ye.a,null,t.map((function(e,t){return r.a.createElement(ge.a,{key:t},e)})))),r.a.createElement(be.a,null,a.map((function(e,t){return r.a.createElement(ye.a,{key:t},e.map((function(e,t){return r.a.createElement(ge.a,{key:t},e)})))}))))},Se=a(295),je=a(286),Oe=a(136),ke=a.n(Oe),Ce=a(138),xe=a.n(Ce),De=a(139),Qe=a.n(De),He=a(137),Te=a.n(He),Ne=a(102),Ae=a.n(Ne),Le=a(140),Ie=a.n(Le),qe=a(107),Pe=a.n(qe),Ge={success:ke.a,warning:Te.a,error:xe.a,info:Qe.a},Ue=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).queue=[],e.state={message:null,variant:null,timestamp:null,open:!1},e.handleClose=function(t,a){"clickaway"!==a&&e.setState({open:!1})},e.processQueue=function(){if(e.queue.length>0){var t=e.queue.shift(),a=t.message,n=t.variant,r=t.timestamp;e.setState({message:a,variant:n,timestamp:r,open:!0})}},e.handleExited=function(){return e.processQueue()},e}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(e){if(this.props.timestamp&&("undefined"===typeof e.timestamp||this.props.timestamp!==e.timestamp))return this.queue.push({message:this.props.message,variant:this.props.variant,timestamp:this.props.timestamp}),this.state.open?this.setState({open:!1}):this.processQueue()}},{key:"render",value:function(){var e=this.props.classes,t=this.state,a=t.message,n=t.variant,o=t.timestamp,i=t.open;if(!a)return null;var s=Ge[n];return r.a.createElement(Se.a,{key:o,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:i,autoHideDuration:5e3,onClose:this.handleClose,onExited:this.handleExited},r.a.createElement(je.a,{className:e[n],"aria-describedby":"feedback-message",message:r.a.createElement("span",{id:"feedback-message",className:e.message},r.a.createElement(s,{className:Pe()(e.icon,e.iconVariant)}),a),action:r.a.createElement(I.a,{key:"close","aria-label":"Dismiss",size:"small",onClick:this.handleClose},"Dismiss")}))}}]),a}(r.a.Component),Be=Object(Y.a)((function(e){return{success:{backgroundColor:Ae.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.dark},warning:{backgroundColor:Ie.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}}))(Ue),Re=a(30),Me=a(146),ze=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return a}(Object(Me.a)(Error)),Fe=function(e){return e.toLowerCase().replace(/[^\w]/g,"")},_e=function(e,t,a){if(a.keywords)for(var n=a.keywords,r=t.toUpperCase(),o=-1,i=0;i<n.length;i++)if(-1===(o=r.indexOf(n[i].toUpperCase(),o+1)))throw new ze("Looking for the incursion of the keyword: ".concat(n[i],", but not found or found in the wrong position!"));var s=e.exec(t),l=e.exec(a.answer);if(!s.length&&l.length)throw new ze("No rows returned!");var c=Object(Re.a)(s,1)[0],u=c.columns,p=c.values,d=Object(Re.a)(l,1)[0],m=d.columns,h=d.values;if(m.length!==u.length)throw new ze("Expected only the following column(s) to be selected: ".concat(m.join(", "),"!"));if(h.length!==p.length)throw new ze("Expected a total of ".concat(h.length," row(s) to be returned, instead got ").concat(p.length,"!"));var f=u.map((function(e){return Fe(e)})),v=m.map((function(e){return Fe(e)}));return f.forEach((function(e,t){var a=v.indexOf(e);if(-1===a)throw new ze("Expected only the following column(s) to be selected: ".concat(m.join(", "),"!"));var n=p.map((function(e){return e[t]}));h.map((function(e){return e[a]})).forEach((function(e){var t=n.indexOf(e);if(-1===t)throw new ze("The column value ".concat(e," was not found in the column ").concat(m[a],"!"));n.splice(t,1)}))})),!0},We=a(95),Je=function(){var e=Object(c.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){return window.questionCache={},Promise.all([a.e(9),a.e(10)]).then(a.bind(null,805)).then((function(a){var r=a.default.reduce((function(e,a,r){if(n&&-1===n.indexOf(r))return e;var o=a.build;try{var i=o(t),s=i.question,l=i.answer;return e.push(Object(u.a)({index:r},a,{question:s,answer:l})),e}catch(Error){return e.push(Object(u.a)({},a,{question:"Error: ".concat(Error.message),answer:null,error:!0})),e}}),[]);return e(r)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),Ve=function(e){return localStorage.setItem("__testSQL_Questions__",JSON.stringify(e))},$e=a(142),Ke=a.n($e),Xe=a(143),Ye=a.n(Xe),Ze=a(141),et=a.n(Ze),tt=(a(209),a(210),function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={statement:""},e.handleChange=function(t){return e.setState({statement:t})},e.handleClear=function(){return e.setState({statement:""})},e.handleSubmit=function(){return e.props.submitHandler(e.state.statement)},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props.classes,t=this.state.statement;return r.a.createElement(r.a.Fragment,null,r.a.createElement(et.a,{mode:"sql",theme:"tomorrow",showPrintMargin:!1,focus:!0,height:"9rem",width:"100%",onChange:this.handleChange,value:t,wrapEnabled:!0}),r.a.createElement(I.a,{className:e.button,size:"small",variant:"contained",color:"primary","aria-label":"Test",onClick:this.handleSubmit},"Test",r.a.createElement(Ke.a,{className:e.rightIcon})),r.a.createElement(I.a,{className:e.button,size:"small",variant:"contained",color:"secondary","aria-label":"Clear",onClick:this.handleClear},"Clear",r.a.createElement(Ye.a,{className:e.rightIcon})))}}]),a}(r.a.Component)),at=Object(Y.a)((function(e){return{button:{marginRight:8,marginTop:8},leftIcon:{marginRight:8},rightIcon:{marginLeft:8},iconSmall:{fontSize:20},codemirror:{border:"1px solid ".concat(e.palette.grey[100])}}}))(tt),nt=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={feedback:null,allQuestions:null,activeQuestionIndex:0},e.changeFeedback=function(t){return e.setState({feedback:Object(u.a)({},t,{timestamp:(new Date).getTime()})})},e.getQuestions=Object(c.a)(l.a.mark((function t(){var a,n,r,o;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.props.user,!((r=n&&n.group||null)&&r.questions&&r.questions.length>0)){t.next=6;break}a=r.questions,t.next=16;break;case 6:if(!(o=localStorage.getItem("__testSQL_Questions__"))||r){t.next=11;break}a=JSON.parse(o),t.next=15;break;case 11:return t.next=13,Je(e.props.currentDatabase);case 13:a=t.sent,Ve(a);case 15:r&&Object(We.g)(a);case 16:return t.abrupt("return",e.setState({allQuestions:a}));case 17:case"end":return t.stop()}}),t)}))),e.changeQuestion=function(t){return e.setState({activeQuestionIndex:t})},e.runQuery=function(){var t=Object(c.a)(l.a.mark((function t(a){var n,r,o,i,s,c,u,p,d;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.props,r=n.currentDatabase,o=n.loadDatabase,i=e.state,s=i.activeQuestionIndex,c=i.allQuestions,u=[],t.prev=3,p=r.exec(a),r.getRowsModified()?o(r):u=p,!_e(r,a,c[s])){t.next=11;break}return t.next=9,e.completeCurrentQuestion(a);case 9:d=t.sent,e.props.user&&e.props.user.group?Object(We.g)(d):Ve(d,e.props.user);case 11:t.next=16;break;case 13:t.prev=13,t.t0=t.catch(3),e.changeFeedback({message:t.t0.message,variant:"error"});case 16:e.props.updateResultsHandler(u);case 17:case"end":return t.stop()}}),t,null,[[3,13]])})));return function(e){return t.apply(this,arguments)}}(),e.completeCurrentQuestion=function(t){var a=e.state,n=a.activeQuestionIndex,r=a.allQuestions;e.changeFeedback({message:"Correct Answer",variant:"success"});var o=r[n],i=r.map((function(e){return Object.is(e,o)?Object(u.a)({},e,{completed:!0}):e}));return e.setState({allQuestions:i}),i},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.getQuestions()}},{key:"componentDidUpdate",value:function(e){var t=this.props.user&&e.user&&Boolean(!this.props.user.group)&&e.user.group,a=e.currentDatabase&&e.currentDatabase.filename!==this.props.currentDatabase.filename;(t||a)&&this.getQuestions()}},{key:"render",value:function(){var e=this.state,t=e.allQuestions,a=e.activeQuestionIndex,n=e.feedback,o=this.props,i=o.results,s=o.classes;return r.a.createElement("main",{className:s.containerStyle},r.a.createElement("div",{className:s.toolbar}),r.a.createElement("div",{className:s.innerContainerStyle},r.a.createElement(Z,{title:"Questions"},t&&r.a.createElement(fe,{activeQuestionIndex:a,allQuestions:t,changeQuestionHandler:this.changeQuestion})),r.a.createElement(Z,{title:"Statement",padding:"16px"},r.a.createElement(at,{submitHandler:this.runQuery})),i.map((function(e,t){return r.a.createElement(Z,{title:"Results",key:t,padding:"16px"},r.a.createElement(we,{columns:e.columns,values:e.values}))})),r.a.createElement(Be,Object.assign({},n,{changeHandler:this.changeFeedback}))))}}]),a}(r.a.Component),rt=Object(Y.a)((function(e){return{containerStyle:{flexGrow:1,height:"100%",flexDirection:"column",display:"flex"},innerContainerStyle:{overflow:"auto"},toolbar:e.mixins.toolbar}}))(nt),ot=a(294),it=a(272),st=a(216),lt=a(288),ct=a(287),ut=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).handleClick=function(){return e.props.showSchemaHandler(e.props.name)},e.render=function(){return r.a.createElement(st.a,{onClick:e.handleClick,button:!0},r.a.createElement(ct.a,{primary:e.props.name}),r.a.createElement(lt.a,null,r.a.createElement(ct.a,{secondary:e.props.count})))},e}return a}(r.a.Component),pt=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={schema:null},e.load=function(){var t=e.props.currentDatabase.exec('SELECT `tbl_name` FROM `sqlite_master` WHERE `type` = "table"'),a=Object(Re.a)(t,1)[0].values.map((function(t){var a=Object(Re.a)(t,1)[0],n=e.props.currentDatabase.exec("SELECT COUNT(*) FROM ".concat(a)),r=Object(Re.a)(n,1),o=Object(Re.a)(r[0].values,1);return{name:a,count:Object(Re.a)(o[0],1)[0]}}));e.setState({schema:a})},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.load()}},{key:"shouldComponentUpdate",value:function(e,t){return null===this.state.schema||null!==t.schema&&this.state.schema!==t.schema}},{key:"componentDidUpdate",value:function(e){this.props.currentDatabase.lastModified!==e.currentDatabase.lastModified&&this.load()}},{key:"render",value:function(){var e=this.state.schema;if(!e)return r.a.createElement("div",null,"Loading...");var t=this.props.showSchemaHandler;return r.a.createElement(r.a.Fragment,null,r.a.createElement(W.a,{component:"h3",variant:"body1",color:"textSecondary",align:"center",gutterBottom:!0},"Database Schema"),r.a.createElement(it.a,{dense:!0},e.map((function(e){var a=e.name,n=e.count;return r.a.createElement(ut,{key:a,name:a,count:n,showSchemaHandler:t})}))))}}]),a}(r.a.Component),dt=a(105),mt=a.n(dt),ht={display:"none"},ft=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).handleUpload=function(t){var a=t.target.files;if(0===a.length)return!1;var n=Object(Re.a)(a,1)[0],r=new FileReader;r.onload=function(){var t=new Uint8Array(r.result);e.props.uploadDatabaseHandler(t)},r.readAsArrayBuffer(n),t.target.value=""},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(f.Consumer,null,(function(t){var a=t.user;return t.isLoaded&&(a&&a.group?r.a.createElement(x.a,{title:"Disabled while in a group"},r.a.createElement("span",null,r.a.createElement(S.a,{component:"span","aria-label":"Upload Database",disabled:!0},r.a.createElement(mt.a,null)))):r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a,{title:"Upload Database"},r.a.createElement("label",null,r.a.createElement(S.a,{component:"span","aria-label":"Upload Database"},r.a.createElement(mt.a,null)),r.a.createElement("input",{accept:".db,.sqlite",onChange:e.handleUpload,style:ht,type:"file"})))))}))}}]),a}(r.a.Component),vt=a(145),bt=a.n(vt),gt=a(144),Et=a.n(gt),yt=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).handleDownload=function(){var t=e.props.currentDatabase,a=new Blob([t.export()],{type:"application/x-sqlite-3"});Et.a.saveAs(a,"testSQL.sqlite")},e}return Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement(x.a,{title:"Download Database"},r.a.createElement(S.a,{onClick:this.handleDownload,"aria-label":"Download Database"},r.a.createElement(bt.a,null)))}}]),a}(r.a.Component),wt=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).handleToggleSidebar=function(){return e.props.toggleSidebarHandler(!1)},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.open,n=e.showSchemaHandler,o=e.uploadDatabaseHandler,i=e.currentDatabase,s=e.toggleSidebarHandler,l=r.a.createElement(pt,{currentDatabase:i,showSchemaHandler:n,toggleSidebarHandler:s}),c=r.a.createElement("div",{className:t.drawerBottomActions},r.a.createElement(ft,{uploadDatabaseHandler:o}),r.a.createElement(yt,{currentDatabase:i}));return r.a.createElement("div",{className:t.container},r.a.createElement(J.a,{mdUp:!0},r.a.createElement(ot.a,{anchor:"left",open:a,onClose:this.handleToggleSidebar,classes:{docked:t.drawerDocked,paper:t.drawerPaper},ModalProps:{keepMounted:!0}},r.a.createElement("div",{className:t.gutterTop},l),c)),r.a.createElement(J.a,{implementation:"css",smDown:!0},r.a.createElement(ot.a,{classes:{docked:t.drawerDocked,paper:t.drawerPaper},variant:"permanent",open:!0},r.a.createElement("div",{className:t.toolbar}),r.a.createElement("div",{className:t.gutterTop},l),c)))}}]),a}(r.a.Component),St=Object(Y.a)((function(e){return{drawerDocked:{height:"100%"},drawerPaper:Object(w.a)({width:"16rem"},e.breakpoints.up("md"),{position:"relative"}),gutterTop:{marginTop:e.spacing(2)},container:{display:"flex"},drawerBottomActions:{display:"flex",justifyContent:"space-evenly",marginTop:"auto",marginBottom:"8px"},toolbar:e.mixins.toolbar}}))(wt),jt={display:"flex",flexDirection:"row",zIndex:0,height:"100%"},Ot=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={results:[]},e.handleUpdateResults=function(t){e.setState({results:t})},e.displaySchema=function(t){var a=e.props.currentDatabase.exec("SELECT * FROM ".concat(t," LIMIT 10"));return e.handleUpdateResults(a),e.props.sidebarToggleHandler()},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.currentDatabase,n=t.loadDatabase,o=t.openSidebar,i=t.sidebarToggleHandler,s=this.state.results;return r.a.createElement("div",{style:jt},r.a.createElement(St,{open:o,currentDatabase:a,uploadDatabaseHandler:n,showSchemaHandler:this.displaySchema,toggleSidebarHandler:i}),r.a.createElement(f.Consumer,null,(function(t){var o=t.isLoaded,i=t.user;return o&&r.a.createElement(rt,{user:i,results:s,updateResultsHandler:e.handleUpdateResults,currentDatabase:a,loadDatabase:n})})))}}]),a}(r.a.Component),kt={height:"100vh",overflow:"hidden",display:"flex",flexDirection:"column"},Ct=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={openSidebar:!1},e.handleToggleSidebar=function(t){return e.setState((function(e){return{openSidebar:"undefined"===typeof t?!e.openSidebar:Boolean(t)}}))},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this,t=this.state.openSidebar;return r.a.createElement("div",{style:kt},r.a.createElement($,{sidebarToggleHandler:this.handleToggleSidebar}),r.a.createElement(L.a.Consumer,null,(function(a){var n=a.database,o=a.loadDatabase;return n?r.a.createElement(Ot,{currentDatabase:n,loadDatabase:o,sidebarToggleHandler:e.handleToggleSidebar,openSidebar:t}):r.a.createElement("div",null,"Loading...")})))}}]),a}(r.a.Component),xt=a(289),Dt=r.a.lazy((function(){return Promise.all([a.e(8),a.e(1)]).then(a.bind(null,807))})),Qt=function(){return r.a.createElement(y,null,r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null,"Loading...")},r.a.createElement(Dt,null,r.a.createElement(xt.a,null),r.a.createElement(Ct,null))))},Ht=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Tt(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(r.a.createElement(Qt,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("https://joshualicense.github.io/react-testsql",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("https://joshualicense.github.io/react-testsql","/service-worker.js");Ht?(!function(e,t){fetch(e).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Tt(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")}))):Tt(t,e)}))}}()},26:function(e,t,a){"use strict";t.a=function(e){if(!e.ok)throw e;return e}},79:function(e,t,a){"use strict";var n=a(0),r=a.n(n).a.createContext({database:null,loadDatabase:function(){}});t.a=r},95:function(e,t,a){"use strict";a.d(t,"g",(function(){return r})),a.d(t,"a",(function(){return o})),a.d(t,"h",(function(){return i})),a.d(t,"b",(function(){return s})),a.d(t,"f",(function(){return l})),a.d(t,"e",(function(){return c})),a.d(t,"c",(function(){return u})),a.d(t,"d",(function(){return p}));var n=a(26),r=function(e){return fetch("/api/group/save-progress",{method:"POST",body:JSON.stringify({questions:e}),credentials:"same-origin",headers:new Headers({"Content-Type":"application/json"})}).then(n.a)},o=function(e,t){var a={title:e,databaseID:t};return fetch("/api/group/create",{method:"POST",body:JSON.stringify(a),credentials:"same-origin",headers:new Headers({"Content-Type":"application/json"})}).then(n.a)},i=function(e,t){return fetch("/api/group/update/".concat(e),{method:"POST",body:JSON.stringify({title:t}),credentials:"same-origin",headers:new Headers({"Content-Type":"application/json"})}).then(n.a)},s=function(e){return fetch("/api/group/".concat(e),{method:"GET",credentials:"same-origin",headers:new Headers({"Content-Type":"application/json"})}).then(n.a).then((function(e){return e.json()}))},l=function(e,t){return fetch("/api/group/".concat(e,"/remove/").concat(t),{method:"GET",credentials:"same-origin",headers:new Headers({"Content-Type":"application/json"})}).then(n.a)},c=function(){return fetch("/api/group/list/all",{method:"GET",credentials:"same-origin",headers:new Headers({"Content-Type":"application/json"})}).then(n.a).then((function(e){return e.json()}))},u=function(e){return fetch("/api/group/join/".concat(e),{method:"GET",credentials:"same-origin",headers:new Headers({"Content-Type":"application/json"})}).then(n.a).then((function(e){return e.json()}))},p=function(){return fetch("/api/group/leave/current",{method:"GET",credentials:"same-origin",headers:new Headers({"Content-Type":"application/json"})}).then(n.a)}}},[[166,4,7]]]);
//# sourceMappingURL=main.754f3453.chunk.js.map