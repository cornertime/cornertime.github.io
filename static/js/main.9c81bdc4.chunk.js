(this.webpackJsonpcornertime=this.webpackJsonpcornertime||[]).push([[0],{11:function(e,t,n){e.exports=n(19)},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(9),s=n(6),i=n(7),o=n(2),l=n(1),c=n(4),m=n(3),u={title:"Default Punishment",durationRange:{minimum:600,maximum:900},penaltyRange:{minimum:60,maximum:180},penaltyProbabilities:[0,1],encouragementProbability:.1,phrases:{getReady:["You have been naughty. Get in the corner, facing the wall."],start:["You better not move. I'm starting your punishment now."],encourage:["You're doing fine. Keep it up and this will be over in no time."],scold:["Do I see you moving?"],penalize:["I warned you not to move. I'm adding some more minutes in the clock."],end:["You can come out of the corner now."]}};function h(e,t){return Math.floor(Math.random()*(t-e)+e)}function p(e){return e[h(0,e.length)]}var d=function(){function e(){Object(o.a)(this,e)}return Object(l.a)(e,[{key:"speak",value:function(e,t){var n=new SpeechSynthesisUtterance(e);speechSynthesis.speak(n)}},{key:"speakRandomPhrase",value:function(e,t){var n=p(e);this.speak(n,t)}}]),e}(),f=function(){function e(){Object(o.a)(this,e),this.transcript=[]}return Object(l.a)(e,[{key:"reset",value:function(){this.transcript=[]}},{key:"speak",value:function(e,t){this.transcript.push(e)}},{key:"speakRandomPhrase",value:function(e,t){if(0!==e.length){var n=p(e);this.speak(n,t)}}}]),e}();function b(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"production";return"test"===e?new f:new d}var v={name:"Anonymous",threshold:.3,preparationSeconds:10,cooldownSeconds:5,diffy:{resolution:{x:10,y:10},sensitivity:.2,threshold:21,sourceDimensions:{w:130,h:100},debug:!1}};function g(){if("undefined"!==typeof localStorage){var e=localStorage.getItem("settings");if(e)return JSON.parse(e)}return v}var y=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"waiting";Object(o.a)(this,e),this.preset=u,this.initialDuration=0,this.totalDuration=0,this.startedAt="",this.events=[],this.state="waiting",this.speech=b(),this.context={},this.settings=g(),this.violations=0,this.listeners=[],this.currentTime=0,this.cooldownEndTime=0,this.timer=0,this.currentTickMotionSum=0,this.currentTickMotionCount=0,this.reset(t)}return Object(l.a)(e,[{key:"currentTickMotionAverage",get:function(){return 0===this.currentTickMotionCount?0:this.currentTickMotionSum/this.currentTickMotionCount}},{key:"timeLeft",get:function(){return this.totalDuration-this.currentTime}}]),Object(l.a)(e,[{key:"reset",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"waiting";this.initialDuration=h(this.preset.durationRange.minimum,this.preset.durationRange.maximum),this.totalDuration=this.initialDuration,this.startedAt="",this.events=[],this.state=e,this.context={},this.settings=g(),this.violations=0,this.cooldownEndTime=0,this.currentTime=-10,this.currentTickMotionSum=0,this.currentTickMotionCount=0}},{key:"loadPreset",value:function(e){this.preset=e,this.reset()}},{key:"getReady",value:function(){this.transition(["waiting"],"preparation","getReady"),this.startClock()}},{key:"start",value:function(){this.transition(["preparation"],"punishment","start"),this.startedAt=(new Date).toISOString()}},{key:"scold",value:function(){this.transition(["punishment"],"cooldown","scold")}},{key:"penalize",value:function(){var e=this.preset.penaltyRange,t=h(e.minimum,e.maximum);this.transition(["punishment"],"cooldown","penalize",t)}},{key:"cooldownFinished",value:function(){this.transition(["cooldown"],"punishment")}},{key:"end",value:function(){this.transition(["punishment","cooldown"],"finished","end"),this.stopClock()}},{key:"transition",value:function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if(e.indexOf(this.state)<0)throw new TypeError("cannot go to ".concat(t," from ").concat(this.state));if(this.state=t,this.totalDuration+=a,n){this.events.push({adjustment:a,eventType:n,time:this.currentTime});var r=this.preset.phrases[n];r.length>0&&this.speech.speakRandomPhrase(r,this.context),this.updateListeners()}}},{key:"updateListeners",value:function(){this.listeners.forEach((function(e){return e()}))}},{key:"addListener",value:function(e){this.listeners.push(e)}},{key:"removeListener",value:function(e){var t=this.listeners.indexOf(e);t>=0&&delete this.listeners[t]}},{key:"encourage",value:function(){if("punishment"!==this.state)throw new TypeError("cannot encourage in state ".concat(this.state));0!==this.preset.phrases.encourage.length&&(this.events.push({eventType:"encourage",adjustment:0,time:this.currentTime}),this.speech.speakRandomPhrase(this.preset.phrases.encourage,this.context),this.updateListeners())}},{key:"movementDetected",value:function(){if("punishment"===this.state){var e=this.preset.penaltyProbabilities[this.violations];if(this.violations+=1,this.cooldownEndTime=this.currentTime+5,"undefined"===typeof e){var t=this.preset.penaltyProbabilities.length-1;e=this.preset.penaltyProbabilities[t]}Math.random()<e?this.penalize():this.scold()}}},{key:"startClock",value:function(){var e=this;this.timer=window.setInterval((function(){return e.tick()}),1e3)}},{key:"stopClock",value:function(){window.clearInterval(this.timer)}},{key:"handleMotionUpdate",value:function(e){"punishment"===this.state&&(this.currentTickMotionSum+=e,this.currentTickMotionCount+=1)}},{key:"tick",value:function(){switch(this.currentTime+=1,this.state){case"preparation":this.currentTime>=0&&this.start();break;case"cooldown":this.currentTime>=this.totalDuration?this.end():this.currentTime>=this.cooldownEndTime&&this.cooldownFinished();break;case"punishment":this.currentTime>=this.totalDuration?this.end():this.currentTickMotionSum>this.settings.threshold?this.movementDetected():this.currentTime%60===0&&Math.random()<this.preset.encouragementProbability&&this.encourage();break;case"waiting":case"finished":default:throw TypeError("Clock should not be running in ".concat(this.state))}this.currentTickMotionSum=0,this.updateListeners()}},{key:"report",value:function(){if("finished"!==this.state)throw new TypeError("report is not available in ".concat(this.state));return{name:this.settings.name,presetTitle:this.preset.title,initialDuration:this.initialDuration,totalDuration:this.totalDuration,startedAt:this.startedAt,events:this.events,violations:this.violations}}}]),e}(),E=n(10),w=function(e){Object(c.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).start=function(){return e.props.fsm.getReady()},e}return Object(l.a)(n,[{key:"render",value:function(){return a.createElement("div",{className:"container my-4"},a.createElement("div",{className:"jumbotron"},a.createElement("h1",{className:"display-3"},"Corner Time!"),a.createElement("p",{className:"lead"},"So you have been naughty? I will put you in the corner and use your webcam to make sure you do not move!"),a.createElement("button",{className:"btn btn-primary btn-block btn-lg my-4",onClick:this.start},"Start a 10\u201315 Minute Punishment Now"),a.createElement("p",{className:"text-muted text-center"},a.createElement("small",null,"There will be voice instructions. Set your webcam 2\u20133 meters away from where you will be standing. Make sure your computer will not lock or sleep (OS X: ",a.createElement("code",null,"caffeinate -d"),").")),a.createElement("p",{className:"text-muted text-center"},a.createElement("small",null,"Don't worry! Video from your webcam ",a.createElement("strong",null,"will not be sent")," over the Internet."," ")),a.createElement("p",{className:"text-center"},a.createElement("button",{className:"btn btn-link",onClick:this.props.onCustom},"Design a Custom Punishment"),a.createElement("button",{className:"btn btn-link",onClick:this.props.onPreset},"Carry Out a Custom Punishment"),a.createElement("button",{className:"btn btn-link",onClick:this.props.onReport},"View a Punishment Report"))),a.createElement("p",{className:"text-muted text-center"},a.createElement("small",null,a.createElement("strong",null,"2019-05-07:")," The application works in modern browsers again!")),a.createElement("p",{className:"text-muted text-center"},a.createElement("small",null,a.createElement("a",{href:"https://github.com/cornertime/cornertime",target:"_blank",rel:"noopener noreferrer"},"Source Code"))))}}]),n}(a.Component),P=n(5),k=function(e){return a.createElement("div",{className:"form-group row"},a.createElement("label",{className:"col-sm-3 col-form-label"},e.label),a.createElement("div",{className:"col-sm-9"},a.createElement("input",{className:"form-control",name:e.name,type:"text",maxLength:255,value:e.value,onChange:e.onChange}),e.helpText?a.createElement("small",{className:"form-text text-muted"},e.helpText):null))},N=function(e){return a.createElement("div",{className:"form-group row"},a.createElement("label",{className:"col-sm-3 col-form-label"},e.label),a.createElement("div",{className:"col-sm-9"},a.createElement("input",{className:"form-control",name:e.name,type:"number",min:0,max:86400,value:e.value,onChange:e.onChange}),e.helpText?a.createElement("small",{className:"form-text text-muted"},e.helpText):null))},T=function(e){return a.createElement("div",{className:"form-group row"},a.createElement("label",{className:"col-sm-3 col-form-label"},e.label),a.createElement("div",{className:"col-sm-9"},a.createElement("input",{className:"form-control",name:e.name,type:"number",min:0,max:1,step:.01,value:e.value,onChange:e.onChange}),e.helpText?a.createElement("small",{className:"form-text text-muted"},e.helpText):null))},C=function(e){return a.createElement("div",{className:"form-group row"},a.createElement("label",{className:"col-sm-3 col-form-label"},e.label),a.createElement("div",{className:"col-sm-9"},a.createElement("textarea",{rows:6,className:"form-control",name:e.name,value:e.value,onChange:e.onChange}),e.helpText?a.createElement("small",{className:"form-text text-muted"},e.helpText):null))};function x(e){return D(e,"PUNISHMENT REPORT")}function S(e){return D(e,"CUSTOM PUNISHMENT")}function O(e){return I(e,"PUNISHMENT REPORT")}function j(e){return I(e,"CUSTOM PUNISHMENT")}function R(e){return"-----BEGIN CORNERTIME ".concat(e,"-----")}function M(e){return"-----END CORNERTIME ".concat(e,"-----")}function D(e,t){var n,a=R(t),r=M(t),s=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:76,n=[],a=0,r="";r=e.slice(a,a+t);)n.push(r),a+=t;return n.join("\n")}((n=JSON.stringify(e),btoa(encodeURIComponent(n).replace(/%([0-9A-F]{2})/g,(function(e,t){return String.fromCharCode(parseInt("0x"+t,16))})))));return"".concat(a,"\n").concat(s,"\n").concat(r)}function I(e,t){e=e.trim();var n=R(t),a=M(t);if(e.slice(0,n.length)!==n)throw new TypeError("data to deserialize does not start with our header");if(e.slice(e.length-a.length)!==a)throw new TypeError("data to deserialize does not end with our footer");return e=e.slice(n.length,e.length-a.length),e=decodeURIComponent(atob(e).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join("")),JSON.parse(e)}if("undefined"!==typeof window){var U=window;U.cornertime=U.cornertime||{},Object.assign(U.cornertime,{serializePreset:S,serializeReport:x,deserializePreset:j,deserializeReport:O})}var z=function(e){Object(c.a)(n,e);var t=Object(m.a)(n);function n(e){var a;Object(o.a)(this,n),(a=t.call(this,e)).start=function(e){e.preventDefault();var t=a.props.fsm;t.loadPreset(a.preset),t.getReady()},a.onChangeNumeric=function(e){var t=e.currentTarget.name,n=parseFloat(e.currentTarget.value),r=Object(P.a)({},t,n);a.setState(r)},a.onChangeText=function(e){var t=e.currentTarget.name,n=e.currentTarget.value,r=Object(P.a)({},t,n);a.setState(r)},a.onChangePenaltyProbabilities=function(e){var t=e.currentTarget.value,n={rawPenaltyProbabilities:t};try{n.penaltyProbabilities=t.split(/\s+/).map(parseFloat)}catch(r){}a.setState(n)},a.onChangePhrases=function(e){var t,n=e.currentTarget.name,r="raw".concat(n.charAt(0).toUpperCase()).concat(n.slice(1)),s=e.currentTarget.value,i=s.split("\n").map((function(e){return e.trim()})),o=(t={},Object(P.a)(t,n,i),Object(P.a)(t,r,s),t);a.setState(o)};var r=e.fsm.preset;return a.state={title:"Default Punishment"===r.title?"Custom Punishment":r.title,minimumDuration:r.durationRange.minimum,maximumDuration:r.durationRange.maximum,minimumPenalty:r.penaltyRange.minimum,maximumPenalty:r.penaltyRange.maximum,encouragementProbability:r.encouragementProbability,penaltyProbabilities:r.penaltyProbabilities,rawPenaltyProbabilities:r.penaltyProbabilities.map((function(e){return""+e})).join(" "),getReadyPhrases:r.phrases.getReady,rawGetReadyPhrases:r.phrases.getReady.join("\n"),startPhrases:r.phrases.start,rawStartPhrases:r.phrases.start.join("\n"),encouragePhrases:r.phrases.encourage,rawEncouragePhrases:r.phrases.encourage.join("\n"),scoldPhrases:r.phrases.scold,rawScoldPhrases:r.phrases.scold.join("\n"),penalizePhrases:r.phrases.penalize,rawPenalizePhrases:r.phrases.penalize.join("\n"),endPhrases:r.phrases.end,rawEndPhrases:r.phrases.end.join("\n")},a}return Object(l.a)(n,[{key:"render",value:function(){return a.createElement("div",{className:"container my-4"},a.createElement("h2",null,"Design a Custom Punishment"),a.createElement("form",{onSubmit:this.start,className:"form"},a.createElement("div",{className:"row mt-3 mb-5"},a.createElement("div",{className:"col-md-10"},a.createElement("button",{className:"btn btn-primary btn-block btn-lg",type:"submit"},"Start the Custom Punishment Now")),a.createElement("div",{className:"col-md-2"},a.createElement("button",{className:"btn btn-secondary btn-block btn-lg",onClick:this.props.onBack},"Back"))),a.createElement(k,{name:"title",label:"Title of the custom punishment",helpText:"This is the only field that will be disclosed to the receiver before punishment.",value:this.state.title,onChange:this.onChangeText}),a.createElement(N,{name:"minimumDuration",label:"Minimum duration (seconds)",value:this.state.minimumDuration,onChange:this.onChangeNumeric}),a.createElement(N,{name:"maximumDuration",label:"Maximum duration (seconds)",helpText:"The duration of the punishment will be picked randomly within these bounds.",value:this.state.maximumDuration,onChange:this.onChangeNumeric}),a.createElement(k,{name:"penaltyProbabilities",label:"Penalty probabilities",helpText:"Probability of penalty for each consecutive movement violation, separated by\n                                   whitespace. The first violation will use the first value, the second violation\n                                   will use the second value and so on until values run out, after which the last\n                                   value is used for any subsequent violations.",value:this.state.rawPenaltyProbabilities,onChange:this.onChangePenaltyProbabilities}),a.createElement(N,{name:"minimumPenalty",label:"Minimum penalty (seconds)",value:this.state.minimumPenalty,onChange:this.onChangeNumeric}),a.createElement(N,{name:"maximumPenalty",label:"Maximum penalty (seconds)",value:this.state.maximumPenalty,onChange:this.onChangeNumeric,helpText:"When a penalty is given for moving, the time adjustment will be picked randomly\n                                   within these bounds."}),a.createElement(T,{name:"encouragementProbability",label:"Encouragement probability",value:this.state.encouragementProbability,onChange:this.onChangeNumeric,helpText:"At each full minute, there is a chance of receiving encouragement in the form of\n                                   one of the encouragement phrases. This field controls that probability."}),a.createElement(C,{name:"getReadyPhrases",label:"Get Ready phrases",helpText:"One of these phrases will be spoken at random at the start of the preparation delay,\n                                   during which the person being punished is supposed to walk to the corner and assume\n                                   a position they can hold for the remainder of the punishment. One phrase per line.",value:this.state.rawGetReadyPhrases,onChange:this.onChangePhrases}),a.createElement(C,{name:"startPhrases",label:"Starting phrases",helpText:"One of these phrases will be spoken at random at the start of the punishment.\n                                   One phrase per line.",value:this.state.rawStartPhrases,onChange:this.onChangePhrases}),a.createElement(C,{name:"scoldPhrases",label:"Scolding phrases",helpText:"One of these phrases will be spoken at random when movement has been detected but\n                                   a penalty has not been triggered.",value:this.state.rawScoldPhrases,onChange:this.onChangePhrases}),a.createElement(C,{name:"penalizePhrases",label:"Penalty phrases",helpText:"One of these phrases will be spoken at random when movement has been detected and\n                                   a penalty has been triggered.",value:this.state.rawPenalizePhrases,onChange:this.onChangePhrases}),a.createElement(C,{name:"encouragePhrases",label:"Encouragement phrases",helpText:"One of these phrases may be spoken at random at any full minute as specified by the\n                                   encouragement probability.",value:this.state.rawEncouragePhrases,onChange:this.onChangePhrases}),a.createElement(C,{name:"endPhrases",label:"Ending phrases",helpText:"One of these phrases will be spoken at random when the punishment is finished.",value:this.state.rawEndPhrases,onChange:this.onChangePhrases})),a.createElement("p",{className:"mt-5"},'To have someone else use this preset without seeing its content, give this to them and instruct them to use the "I Have a Custom Punishment" link from the welcome screen.'),a.createElement("pre",null,this.serializedPreset))}},{key:"preset",get:function(){return{title:this.state.title,durationRange:{minimum:this.state.minimumDuration,maximum:this.state.maximumDuration},penaltyProbabilities:this.state.penaltyProbabilities,penaltyRange:{minimum:this.state.minimumPenalty,maximum:this.state.maximumPenalty},encouragementProbability:this.state.encouragementProbability,phrases:{getReady:this.state.getReadyPhrases,start:this.state.startPhrases,scold:this.state.scoldPhrases,penalize:this.state.penalizePhrases,encourage:this.state.encouragePhrases,end:this.state.endPhrases}}}},{key:"serializedPreset",get:function(){return S(this.preset)}}]),n}(a.Component),A=function(e){Object(c.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={preset:"",isValid:!1},e.start=function(t){var n=e.props.fsm;n.loadPreset(e.loadPreset()),n.getReady()},e.onChange=function(t){var n=t.currentTarget.value,a=!1;try{j(n),a=!0}catch(r){}e.setState({preset:n,isValid:a})},e}return Object(l.a)(n,[{key:"render",value:function(){return a.createElement("div",{className:"container my-4"},a.createElement("h2",null,"Carry Out a Custom Punishment"),a.createElement("div",{className:"row my-3"},a.createElement("div",{className:"col-md-10"},a.createElement("button",{className:"btn btn-primary btn-block btn-lg",onClick:this.start,disabled:!this.state.isValid},"Start the Custom Punishment Now")),a.createElement("div",{className:"col-md-2"},a.createElement("button",{className:"btn btn-secondary btn-block btn-lg",onClick:this.props.onBack},"Back"))),a.createElement("form",{className:"form"},a.createElement("div",{className:"form-group"},a.createElement("label",null,"Custom punishment:"),a.createElement("textarea",{className:"form-control",rows:24,cols:90,value:this.state.preset,onChange:this.onChange}),a.createElement("small",{className:"form-text text-muted"},'In either JSON or "BEGIN CORNERTIME CUSTOM PUNISHMENT" format.'))))}},{key:"loadPreset",value:function(){try{return j(this.state.preset)}catch(e){return JSON.parse(this.state.preset)}}}]),n}(a.Component);function L(e){var t="";e<0&&(t="-",e=-e);var n=Math.floor(e/60),a=(e%=60)<10?"0".concat(e):e,r=Math.floor(n/60);if(n%=60,r){var s=n<10?"0".concat(n):n;return"".concat(t).concat(r,":").concat(s,":").concat(a)}return"".concat(t).concat(n,":").concat(a)}var B=function(e){Object(c.a)(n,e);var t=Object(m.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props.report;return a.createElement("div",{className:"container my-4"},this.props.showMessage?a.createElement("div",{className:"jumbotron"},a.createElement("h1",{className:"display-3"},"Your punishment is over."),a.createElement("p",{className:"lead"},"I hope you have learned your lesson. If not, I'll be seeing you again!"),a.createElement("a",{href:"/",className:"btn btn-primary btn-block btn-lg"},"I did not Learn My Lesson! I need another punishment.")):null,a.createElement("h2",{className:"my-3"},"Punishment report"),a.createElement("table",{className:"table"},a.createElement("tbody",null,a.createElement("tr",null,a.createElement("td",null,"Started at:"),a.createElement("td",null,e.startedAt)),a.createElement("tr",null,a.createElement("td",null,"Initial duration:"),a.createElement("td",null,L(e.initialDuration))),a.createElement("tr",null,a.createElement("td",null,"Total duration:"),a.createElement("td",null,L(e.totalDuration))),a.createElement("tr",null,a.createElement("td",null,"Number of movement violations:"),a.createElement("td",null,e.violations)))),a.createElement("table",{className:"table my-4"},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",{className:"text-right"},"Time"),a.createElement("th",null,"Event"))),a.createElement("tbody",null,e.events.filter((function(e){return"getReady"!==e.eventType&&"start"!==e.eventType})).map((function(e){return a.createElement("tr",{key:e.time},a.createElement("td",{className:"text-right"},L(e.time)),a.createElement("td",null,function(e){switch(e.eventType){case"getReady":return"Preparation started.";case"start":return"Punishment started.";case"scold":return"Scolded for moving.";case"encourage":return"Encouragement given.";case"penalize":return"Penalized for moving. Time added: ".concat(L(e.adjustment));case"end":return"Punishment finished.";default:return"Unknown event type!"}}(e)))})))),this.props.showMessage?a.createElement("div",null,a.createElement("p",{className:"my-4"},a.createElement("small",null,"If you were instructed by someone to take this punishment, you can give them this encoded report that contains the same information as you see above:")),a.createElement("pre",null,x(e))):null)}}]),n}(a.Component),F=function(e){Object(c.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={reportSource:""},e.onChange=function(t){var n=t.currentTarget.value,a=void 0;try{a=O(n)}catch(r){}e.setState({report:a,reportSource:n})},e}return Object(l.a)(n,[{key:"render",value:function(){return a.createElement("div",{className:"container my-4"},a.createElement("h2",null,"View the Report of a Previous Punishment"),a.createElement("button",{className:"btn btn-secondary btn-block btn-lg my-4",onClick:this.props.onBack},"Back"),a.createElement("form",{className:"form"},a.createElement("div",{className:"form-group"},a.createElement("label",null,"Punishment report:"),a.createElement("textarea",{className:"form-control",rows:12,cols:90,value:this.state.reportSource,onChange:this.onChange}),a.createElement("small",{className:"form-text text-muted"},"If you instructed someone to take a punishment and received a punishment report from them, enter the report here to view its contents."))),this.state.report?a.createElement(B,{report:this.state.report}):null)}}]),n}(a.Component),J=(n(17),function(e){Object(c.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).fsm=new y,e.settings=g(),e.diffy=void 0,e.state={setupScreen:"default"},e.setUpCustom=function(){return e.setState({setupScreen:"custom"})},e.viewReport=function(){return e.setState({setupScreen:"report"})},e.loadPreset=function(){return e.setState({setupScreen:"preset"})},e.returnToWelcomeScreen=function(){return e.setState({setupScreen:"default"})},e.handleFsmUpdate=function(){e.forceUpdate()},e.handleMotionUpdate=function(t){var n=(255-Math.min.apply(Math,Object(i.a)(t.map((function(e){return Math.min.apply(Math,Object(i.a)(e))})))))/255;e.fsm.handleMotionUpdate(n)},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;if(this.fsm.addListener(this.handleFsmUpdate),"undefined"!==typeof window){var t=window;t.cornertime=t.cornertime||{},t.cornertime.fsm=this.fsm}this.diffy=Object(E.create)(Object(s.a)(Object(s.a)({},this.settings.diffy),{},{onFrame:function(t){return e.handleMotionUpdate(t)}}))}},{key:"componentWillUnmount",value:function(){this.fsm.removeListener(this.handleFsmUpdate)}},{key:"render",value:function(){var e=this.fsm;switch(e.state){case"waiting":switch(this.state.setupScreen){case"custom":return a.createElement(z,{fsm:e,onBack:this.returnToWelcomeScreen});case"preset":return a.createElement(A,{fsm:e,onBack:this.returnToWelcomeScreen});case"report":return a.createElement(F,{onBack:this.returnToWelcomeScreen});default:return a.createElement(w,{fsm:e,onCustom:this.setUpCustom,onPreset:this.loadPreset,onReport:this.viewReport})}case"preparation":return a.createElement("h1",{className:"display-2 my-5 text-center"},"The punishment will start in ",L(-e.currentTime),".");case"punishment":case"cooldown":return a.createElement("h1",{className:"display-1 my-5 text-center"},L(e.timeLeft));case"finished":return a.createElement(B,{report:e.report(),showMessage:!0});default:return null}}}]),n}(a.Component));n(18);r.render(a.createElement(J,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.9c81bdc4.chunk.js.map