(function(t){function e(e){for(var r,n,i=e[0],l=e[1],c=e[2],d=0,p=[];d<i.length;d++)n=i[d],Object.prototype.hasOwnProperty.call(s,n)&&s[n]&&p.push(s[n][0]),s[n]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);u&&u(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],r=!0,i=1;i<a.length;i++){var l=a[i];0!==s[l]&&(r=!1)}r&&(o.splice(e--,1),t=n(n.s=a[0]))}return t}var r={},s={app:0},o=[];function n(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=r,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(a,r,function(e){return t[e]}.bind(null,r));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"06e4":function(t,e,a){},"0e60":function(t,e,a){"use strict";a("281c")},1:function(t,e){},"281c":function(t,e,a){},"4ac6":function(t,e,a){"use strict";a("bc1a")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),s=a("f309"),o=a("8807"),n=a.n(o);r["a"].use(s["a"]);var i=new s["a"]({lang:{locales:[n.a],current:"pl"},theme:{themes:{options:{customProperties:!0},light:{appbar:"#fff"},dark:{appbar:"#121212"}}}}),l=i,c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-navigation-drawer",{attrs:{app:"",permanent:!1},model:{value:t.navigationDrawerVisible,callback:function(e){t.navigationDrawerVisible=e},expression:"navigationDrawerVisible"}},[a("v-list",{attrs:{shaped:""}},[a("v-list-item",{attrs:{color:"primary",to:"/"}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-school ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" Wybierz szkołę ")])],1)],1),a("v-subheader",[t._v(" Oddział ")]),null===t.classItems?a("div",{staticClass:"body-1 px-4 py-2 text-center text--secondary"},[t._v(" Nie wybrałeś szkoły ")]):t._e(),t._l(t.classItems,(function(e){return a("v-list-item",{key:e.value,attrs:{color:"primary",to:e.to}},[a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.name)}})],1)],1)}))],2),a("div",{staticClass:"vertical-spacer--small"})],1),a("v-app-bar",{attrs:{color:"appbar",app:"","elevate-on-scroll":""}},[a("v-app-bar-nav-icon",{on:{click:function(e){t.navigationDrawerVisible=!t.navigationDrawerVisible}}}),null===t.selection?a("v-toolbar-title",[t._v(" Wybierz szkołę ")]):a("v-toolbar-title",{domProps:{textContent:t._s(t.timetableTitle)}}),a("v-spacer"),t.$vuetify.breakpoint.smAndDown?a("v-dialog",{attrs:{"max-width":"600"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-btn",t._g({attrs:{icon:""}},r),[a("v-icon",[t._v("mdi-cog")])],1)]}}],null,!1,3684225196)},[a("options-card")],1):a("v-menu",{attrs:{"min-width":"350","offset-y":"","nudge-bottom":"12","close-on-content-click":!1},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-btn",t._g({attrs:{icon:""}},r),[a("v-icon",[t._v("mdi-cog")])],1)]}}])},[a("options-card")],1)],1),null===t.selection||null==t.selection.class||t.schoolLoading?a("school-picker-view",{attrs:{loading:t.schoolLoading}}):a("timetable-view",{attrs:{selection:t.selection}})],1)},u=[],d=(a("99af"),a("7db0"),a("d81d"),a("45fc"),a("b0c0"),a("d3b7"),a("ac1f"),a("25f0"),a("3ca3"),a("5319"),a("ddb0"),a("2b3d"),a("96cf"),a("1da1")),p=a("d823"),v=a("1a24"),m=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-main",[r("v-container",{staticClass:"school-picker__container"},[r("v-card",{attrs:{outlined:""}},[r("v-card-title",[t._v(" Plan lekcji OPTIVUM ")]),r("v-form",{ref:"form",on:{submit:function(e){return e.preventDefault(),t.submit(e)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[r("v-card-text",[r("v-text-field",{staticClass:"small",attrs:{outlined:"",type:"url",rules:t.rules,label:"URL planu",required:"",readonly:t.loading},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}}),r("div",{staticClass:"d-flex justify-center"},[r("v-btn",{attrs:{color:"primary",disabled:t.buttonDisabled,loading:t.loading,type:"submit"}},[t._v(" Połącz ")])],1)],1),t.history.length>0?[r("v-divider"),r("v-subheader",[t._v(" Ostatnie połączenia ")]),r("v-list",{attrs:{subheader:""}},t._l(t.history,(function(e){return r("v-list-item",{key:e.url,attrs:{to:e.to,disabled:t.loading}},[r("v-list-item-content",[r("v-list-item-title",[t._v(" "+t._s(e.name)+" ")]),r("v-list-item-subtitle",[t._v(" "+t._s(e.url)+" ")])],1)],1)})),1)]:t._e()],2)],1),r("v-menu",{attrs:{"open-on-hover":"","open-on-click":!1,"close-on-content-click":!1,bottom:"","offset-y":"","nudge-bottom":10,"nudge-left":50,"open-delay":100,"close-delay":100},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[r("v-card",t._g({staticClass:"mt-8 mx-auto",attrs:{color:"#852439",outlined:"",to:"/v-lo","max-width":t.$vuetify.breakpoint.xsOnly?200:250,dark:""}},s),[r("v-card-title",{staticClass:"pb-0 mb-0"},[t._v(" V LO w Krakowie ")]),r("v-img",{attrs:{src:a("6bd2")}})],1)]}}])},[r("v-card",{attrs:{"max-width":t.$vuetify.breakpoint.xsOnly?300:350,outlined:t.$vuetify.theme.dark}},[r("v-card-text",[r("p",[t._v("Plan V Liceum Ogólnokształcącego im. Augusta Witkowskiego w Krakowie")]),r("a",{attrs:{href:"https://github.com/Cloud11665/sabat.dev"}},[t._v("API rozkładu zajęć")]),t._v(" by "),r("a",{attrs:{href:"https://github.com/Cloud11665"}},[t._v("Cloud11665")])])],1)],1),r("div",{staticClass:"d-flex align-center flex-column"},[r("v-btn",{staticClass:"mt-10",attrs:{outlined:"",rounded:"",href:"https://github.com/dominik-korsa/timetable-backpack-assistant",small:t.$vuetify.breakpoint.xsOnly}},[r("v-icon",{attrs:{left:""}},[t._v(" mdi-github ")]),r("span",[t._v("Source code")])],1)],1)],1)],1)},h=[],f=a("92c9"),g=a.n(f),b={props:{loading:{type:Boolean,required:!0}},data:function(){return{valid:!1,input:"",rules:[function(t){return g()(t)||!t||"Podaj poprawny adres URL"}]}},computed:{buttonDisabled:function(){return!this.valid||!this.input},history:function(){return this.$store.state.storage.history.map((function(t){return{url:t.url,name:t.name,to:"/optivum/".concat(encodeURIComponent(t.url))}}))}},watch:{value:function(t){this.input=t}},methods:{submit:function(){this.$refs.form.validate()&&this.input&&!this.loading&&this.$router.push("/optivum/".concat(encodeURIComponent(this.input)))}}},y=b,x=(a("fea2"),a("2877")),w=a("6544"),_=a.n(w),k=a("8336"),C=a("b0af"),j=a("99d9"),V=a("a523"),O=a("ce7e"),I=a("4bd4"),$=a("132d"),z=a("adda"),L=a("8860"),S=a("da13"),D=a("5d23"),T=a("f6c4"),N=a("e449"),R=a("e0c7"),P=a("8654"),E=Object(x["a"])(y,m,h,!1,null,null,null),G=E.exports;_()(E,{VBtn:k["a"],VCard:C["a"],VCardText:j["b"],VCardTitle:j["c"],VContainer:V["a"],VDivider:O["a"],VForm:I["a"],VIcon:$["a"],VImg:z["a"],VList:L["a"],VListItem:S["a"],VListItemContent:D["a"],VListItemSubtitle:D["b"],VListItemTitle:D["c"],VMain:T["a"],VMenu:N["a"],VSubheader:R["a"],VTextField:P["a"]});var U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-main",{class:{"overflow-hidden":null===t.days}},[null===t.days?a("div",{staticClass:"fill-height d-flex align-center justify-center"},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary",size:96}})],1):a("v-container",{staticClass:"timetable-container"},[a("div",{directives:[{name:"scroll",rawName:"v-scroll:#grid",value:t.onGridScroll,expression:"onGridScroll",arg:"#grid"}],attrs:{id:"grid"}},[t._l(t.hours,(function(e,r){return a("v-sheet",{key:r+"-time",staticClass:"time text-subheading stick-left",style:{"grid-row":r+1},attrs:{outlined:"",elevation:t.timeElevation}},[a("div",{staticClass:"time__part time__number"},[t._v(" "+t._s(e.number)+" ")]),a("v-divider",{staticClass:"time__divider-1",attrs:{vertical:""}}),a("div",{staticClass:"time__part time__from"},[t._v(" "+t._s(e.timeFrom)+" ")]),a("v-divider",{staticClass:"time__divider-2"}),a("div",{staticClass:"time__part time__to"},[t._v(" "+t._s(e.timeTo)+" ")])],1)})),t._l(t.lessonsArrayWithExpanded,(function(e,r){return a("v-sheet",{key:r+"-lesson",staticClass:"lesson d-flex flex-column",style:{"grid-row":e.hourIndex+1,"grid-column":e.dayIndex+2},attrs:{outlined:""}},[t._l(e.items,(function(s,o){return[s.groups.length>1?a("div",{key:r+"-"+o+"-lesson-group",staticClass:"d-flex flex-column grow no-basis"},[o>0?a("v-divider"):t._e(),a("v-card",{staticClass:"combined-group overflow-hidden grow d-flex flex-column",class:{"first-item":0===o,"last-item":o===e.items.length-1&&!s.expanded,new:s.newCount>0,"new--partial":s.newCount<s.groups.length,last:s.lastCount>0,"last--partial":s.lastCount<s.groups.length},attrs:{flat:""},on:{click:function(e){return t.toggleExpanded(s.tempId)}}},[t.storage.subjectColors&&s.colors.length>0?a("div",{staticClass:"d-flex pl-1 mt-1"},t._l(s.colors,(function(t,e){return a("v-sheet",{key:e,staticClass:"grow mr-1 overflow-hidden",attrs:{rounded:"",outlined:"",height:"6"}},[a("v-sheet",{staticClass:"fill-height",attrs:{color:t}})],1)})),1):t._e(),a("v-spacer"),a("div",{staticClass:"d-flex align-center"},[a("v-sheet",{staticClass:"mx-1 px-1",attrs:{rounded:"",outlined:""}},[t._v(" "+t._s(s.groups.length)+" ")]),a("div",{staticClass:"text-center mx-1 py-1 text-body-1 grow no-basis"},[t._v(" "+t._s(s.subject)+" ")]),a("v-icon",{staticClass:"mx-1 rotating-icon",class:{"rotating-icon--active":s.expanded}},[t._v(" mdi-menu-down ")])],1),a("v-spacer")],1),a("v-expand-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:s.expanded,expression:"item.expanded"}]},t._l(s.groups,(function(n,i){return a("div",{key:r+"-"+o+"-"+i+"-lesson-group-item"},[a("v-divider"),a("group-info",{attrs:{hour:t.hours[e.hourIndex],group:n,"day-index":e.dayIndex},scopedSlots:t._u([{key:"activator",fn:function(t){var r=t.on;return[a("nested-lesson-group",{attrs:{on:r,group:n,"last-item":o===e.items.length-1&&i===s.groups.length-1}})]}}],null,!0)})],1)})),0)])],1):a("div",{key:r+"-"+o+"-lesson-group",staticClass:"d-flex flex-column grow text-center"},[o>0?a("v-divider"):t._e(),a("group-info",{attrs:{hour:t.hours[e.hourIndex],group:s.groups[0],"day-index":e.dayIndex},scopedSlots:t._u([{key:"activator",fn:function(t){var r=t.on;return[a("lesson-group",{attrs:{on:r,group:s.groups[0],"first-item":0===o,"last-item":o===e.items.length-1}})]}}],null,!0)})],1)]}))],2)}))],2)])],1)},B=[],A=(a("c740"),a("0481"),a("4160"),a("4069"),a("4fad"),a("07ac"),a("159b"),a("3835")),q=a("5530"),M=a("f977"),W=a("2ef0"),H=a.n(W),F=a("2f62"),J=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.$vuetify.breakpoint.xsOnly?a("v-bottom-sheet",{scopedSlots:t._u([{key:"activator",fn:function(e){return[t._t("activator",null,null,e)]}}],null,!0)},[a("group-info-card",{attrs:{sheet:"",group:t.group,"day-index":t.dayIndex,hour:t.hour}})],1):a("v-dialog",{attrs:{"max-width":"600"},scopedSlots:t._u([{key:"activator",fn:function(e){return[t._t("activator",null,null,e)]}}],null,!0)},[a("group-info-card",{attrs:{group:t.group,"day-index":t.dayIndex,hour:t.hour}})],1)},K=[],Q=(a("a9e3"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"group-info-card",attrs:{tile:t.sheet,outlined:t.$vuetify.theme.dark&&!t.sheet}},[t.$vuetify.theme.dark&&t.sheet?a("v-divider"):t._e(),a("v-card-title",[t._v(" "+t._s(t.group.subject)+" ")]),a("v-card-subtitle",[t._v(" "+t._s(t.weekday)+", "+t._s(t.hour.timeFrom)+"-"+t._s(t.hour.timeTo)+" ")]),a("v-card",{staticClass:"d-flex mx-3",attrs:{outlined:""}},[a("div",{staticClass:"grow px-2 py-2 no-basis"},[a("div",{staticClass:"text-body-2 text--secondary"},[t._v(" Poprzednio w "),a("span",{staticClass:"text--primary font-weight-medium"},[t._v(t._s(t.prevWeekday))])]),t.group.new?a("div",{staticClass:"green--text text-body-1"},[t._v(" Spakuj w tym dniu ")]):a("div",{staticClass:"text--secondary text-body-1"},[t._v(" Nie musisz pakować w tym dniu ")])]),a("v-divider",{attrs:{vertical:""}}),a("div",{staticClass:"grow px-2 py-2 text-right no-basis"},[a("div",{staticClass:"text-body-2 text--secondary"},[t._v(" Następnie w "),a("span",{staticClass:"text--primary font-weight-medium"},[t._v(t._s(t.nextWeekday))])]),t.group.last?a("div",{staticClass:"red--text text-body-1"},[t._v(" Możesz wypakować po tym dniu ")]):a("div",{staticClass:"text--secondary text-body-1"},[t._v(" Nie wypakowywuj po tym dniu ")])])],1),a("v-card-text",[t.group.groupName?a("div",[a("div",{staticClass:"text-overline"},[t._v(" Grupa ")]),a("div",{staticClass:"text-body-2 text--primary"},[t._v(" "+t._s(t.group.groupName)+" ")])]):t._e(),t.group.teacher?a("div",[a("div",{staticClass:"text-overline"},[t._v(" Nauczyciel ")]),a("div",{staticClass:"text-body-2 text--primary"},[t._v(" "+t._s(t.group.teacher)+" ")])]):t._e(),t.group.room?a("div",[a("div",{staticClass:"text-overline"},[t._v(" Sala ")]),a("div",{staticClass:"text-body-2 text--primary"},[t._v(" "+t._s(t.group.room)+" ")])]):t._e()])],1)}),X=[],Y=["Poniedziałek","Wtorek","Środa","Czwartek","Piątek"],Z=["poniedziałek","wtorek","środę","czwartek","piątek"],tt=["zeszły poniedziałek","zeszły wtorek","zeszłą środę","zeszły czwartek","zeszły piątek"],et=["przyszły poniedziałek","przyszły wtorek","przyszłą środę","przyszły czwartek","przyszły piątek"],at={props:{sheet:{type:Boolean,default:!1},group:{type:Object,required:!0},dayIndex:{type:Number,required:!0},hour:{type:Object,required:!0}},computed:{weekday:function(){return Y[this.dayIndex]},nextWeekday:function(){var t=(this.dayIndex+this.group.nextDayDistance)%5;return t<=this.dayIndex?et[t]:Z[t].toLocaleLowerCase()},prevWeekday:function(){var t=(this.dayIndex-this.group.prevDayDistance+5)%5;return t>=this.dayIndex?tt[t]:Z[t].toLocaleLowerCase()}}},rt=at,st=(a("9fd0"),Object(x["a"])(rt,Q,X,!1,null,null,null)),ot=st.exports;_()(st,{VCard:C["a"],VCardSubtitle:j["a"],VCardText:j["b"],VCardTitle:j["c"],VDivider:O["a"]});var nt={components:{GroupInfoCard:ot},props:{group:{type:Object,required:!0},dayIndex:{type:Number,required:!0},hour:{type:Object,required:!0}}},it=nt,lt=a("288c"),ct=a("169a"),ut=Object(x["a"])(it,J,K,!1,null,null,null),dt=ut.exports;_()(ut,{VBottomSheet:lt["a"],VDialog:ct["a"]});var pt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",t._g({staticClass:"group grow",class:{"first-item":t.firstItem,"last-item":t.lastItem,new:t.group.new,last:t.group.last},attrs:{flat:""}},t.on),[t.group.color&&t.storage.subjectColors?a("v-sheet",{staticClass:"overflow-hidden",attrs:{outlined:"",rounded:""}},[a("div",{staticClass:"px-1 text-body-1 group__colored-subject",style:"--bg-color: "+t.group.color.bg+"; --text-color: "+t.group.color.text},[t._v(" "+t._s(t.group.subject)+" ")])]):a("div",{staticClass:"text-body-1"},[t._v(" "+t._s(t.group.subject)+" ")]),a("div",[t.storage.showRoom&&t.group.room?a("span",{staticClass:"text-body-2 mx-1"},[t._v(t._s(t.group.room))]):t._e(),t.storage.showGroupName&&t.group.groupName?a("span",{staticClass:"text-body-2 font-weight-light mx-1"},[t._v(t._s(t.group.groupName))]):t._e(),t.storage.showRoom&&t.storage.showGroupName&&t.storage.showTeacher&&t.group.teacher?a("br"):t._e(),t.storage.showTeacher&&t.group.teacher?a("span",{staticClass:"text-body-2 font-weight-light mx-1"},[t._v(t._s(t.group.teacher))]):t._e()])],1)},vt=[],mt={props:{on:{type:Object,required:!0},group:{type:Object,required:!0},firstItem:Boolean,lastItem:Boolean},computed:Object(q["a"])({},Object(F["b"])({storage:"storage"}))},ht=mt,ft=(a("9951"),a("8dd9")),gt=Object(x["a"])(ht,pt,vt,!1,null,null,null),bt=gt.exports;_()(gt,{VCard:C["a"],VSheet:ft["a"]});var yt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",t._g({staticClass:"nested-group grow pa-1 d-flex",class:{"last-item":t.lastItem,new:t.group.new,last:t.group.last},attrs:{flat:""}},t.on),[t.group.color&&t.storage.subjectColors?a("v-sheet",{staticClass:"overflow-hidden align-self-stretch",attrs:{rounded:"",outlined:"",width:"6"}},[a("v-sheet",{staticClass:"fill-height",attrs:{color:t.group.color.bg}})],1):t._e(),a("div",{staticClass:"text-center grow"},[t.storage.showRoom&&t.group.room?a("span",{staticClass:"text-body-2 mx-1"},[t._v(t._s(t.group.room))]):t._e(),t.group.groupName?a("span",{staticClass:"text-body-2 font-weight-light mx-1"},[t._v(t._s(t.group.groupName))]):t._e(),t.storage.showRoom&&t.storage.showTeacher&&t.group.teacher?a("br"):t._e(),t.storage.showTeacher&&t.group.teacher?a("span",{staticClass:"text-body-2 font-weight-light mx-1"},[t._v(t._s(t.group.teacher))]):t._e()])],1)},xt=[],wt={props:{on:{type:Object,required:!0},group:{type:Object,required:!0},lastItem:Boolean,nested:{type:Boolean,default:!1}},computed:Object(q["a"])({},Object(F["b"])({storage:"storage"}))},_t=wt,kt=(a("4ac6"),Object(x["a"])(_t,yt,xt,!1,null,null,null)),Ct=kt.exports;_()(kt,{VCard:C["a"],VSheet:ft["a"]});var jt={components:{GroupInfo:dt,LessonGroup:bt,NestedLessonGroup:Ct},directives:{Scroll:M["a"]},props:{selection:{type:Object}},data:function(){return{hours:null,days:null,gridOffsetLeft:0,expandedItems:{}}},computed:Object(q["a"])(Object(q["a"])({},Object(F["b"])({storage:"storage"})),{},{lessonsArrayWithExpanded:function(){var t=this;if(console.log("Update lessons array with expanded"),console.time("Update lessons array with expanded"),null===this.lessonsArray)return null;var e=this.lessonsArray.map((function(e){return Object(q["a"])(Object(q["a"])({},e),{},{items:e.items.map((function(e){return Object(q["a"])(Object(q["a"])({},e),{},{expanded:!0===t.expandedItems[e.tempId]})}))})}));return console.timeEnd("Update lessons array with expanded"),e},lessonsArray:function(){var t=this;if(console.log("Update lessons array"),console.time("Update lessons array"),null===this.days)return null;var e=[];return this.days.forEach((function(a,r){a.forEach((function(a,s){if(a.length>0){var o=a.map((function(e){var a=t.nextDayDistance(r,e.subject,e.groupName),s=t.prevDayDistance(r,e.subject,e.groupName);return Object(q["a"])({nextDayDistance:a,prevDayDistance:s,new:1!==s,last:1!==a},e)})),n=[],i={};o.forEach((function(t){var e=i[t.subject];e||(e={tempId:"".concat(r,":").concat(s,":").concat(t.subject),subject:t.subject,newCount:0,lastCount:0,colors:[],groups:[]},i[t.subject]=e,n.push(e)),e.groups.push(t),t.color&&e.colors.push(t.color.bg),t.new&&(e.newCount+=1),t.last&&(e.lastCount+=1)})),e.push({dayIndex:r,hourIndex:s,items:n})}}))})),console.timeEnd("Update lessons array"),e},timeElevation:function(){return this.gridOffsetLeft>0?this.$vuetify.theme.dark?24:1:0}}),watch:{selection:{immediate:!0,handler:function(t){"optivum"===t.type?this.updateOptivum(t):"v-lo"===t.type&&this.updateVLo(t)}}},methods:{updateOptivum:function(t){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function a(){var r,s,o,n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.hours=null,e.days=null,a.prev=2,r=new URL("plany/o".concat(t.class,".html"),t.url).toString(),s=new URL("/".concat(r),"https://tba-proxy.dominik-korsa.tk/"),a.next=7,p["a"].get(s);case 7:return o=a.sent,a.next=10,o.text();case 10:n=a.sent,i=new v["Table"](n),e.expandedItems={},e.days=i.getDays(),e.hours=Object.values(i.getHours()),a.next=20;break;case 17:a.prev=17,a.t0=a["catch"](2),console.warn(a.t0);case 20:case"end":return a.stop()}}),a,null,[[2,17]])})))()},updateVLo:function(t){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function a(){var r,s,o,n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.hours=null,e.days=null,a.prev=2,r="https://api.cld.sh/vlo/ttdata/".concat(t.class,"?offset=0"),a.next=6,p["a"].get(r);case 6:return s=a.sent,a.next=9,s.json();case 9:return o=a.sent,a.next=12,p["a"].get("https://api.cld.sh/vlo/timestamps");case 12:return n=a.sent,a.next=15,n.json();case 15:i=a.sent,e.expandedItems={},e.hours=Object.entries(i).map((function(t){var e=Object(A["a"])(t,2),a=e[0],r=e[1];return{number:parseInt(a,10),timeFrom:r.begin,timeTo:r.end}})),e.days=o.map((function(t){return e.mapVLoDay(t,e.hours.length)})),a.next=24;break;case 21:a.prev=21,a.t0=a["catch"](2),console.warn(a.t0);case 24:case"end":return a.stop()}}),a,null,[[2,21]])})))()},mapVLoDay:function(t,e){var a=this,r=H.a.times(e,(function(){return[]}));return t.flat().forEach((function(t){for(var e=0;e<t.duration;e+=1)r[t.time_index+e].push({room:t.classroom,subject:t.subject,teacher:t.teacher,groupName:t.group||void 0,color:{bg:t.color,text:a.textColor(t.color)}})})),r},nextDayDistance:function(t,e,a){for(var r=1;r<this.days.length;r+=1){var s=!1;if(this.days[(t+r)%this.days.length].forEach((function(t){-1!==t.findIndex((function(t){return t.subject===e&&(!t.groupName||!a||t.groupName===a)}))&&(s=!0)})),s)return r}return 0},prevDayDistance:function(t,e,a){for(var r=1;r<this.days.length;r+=1){var s=!1;if(this.days[(t-r+this.days.length)%this.days.length].forEach((function(t){-1!==t.findIndex((function(t){return t.subject===e&&(!t.groupName||!a||t.groupName===a)}))&&(s=!0)})),s)return r}return 0},onGridScroll:function(t){this.gridOffsetLeft=t.target.scrollLeft},textColor:function(t){var e="#"===t.charAt(0)?t.substring(1,7):t,a=parseInt(e.substring(0,2),16),r=parseInt(e.substring(2,4),16),s=parseInt(e.substring(4,6),16),o=[a/255,r/255,s/255],n=o.map((function(t){return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)})),i=.2126*n[0]+.7152*n[1]+.0722*n[2];return i>.179?"#000":"#fff"},toggleExpanded:function(t){this.$set(this.expandedItems,t,!this.expandedItems[t])}}},Vt=jt,Ot=(a("0e60"),a("0789")),It=a("490a"),$t=a("2fa4"),zt=a("269a"),Lt=a.n(zt),St=Object(x["a"])(Vt,U,B,!1,null,null,null),Dt=St.exports;_()(St,{VCard:C["a"],VContainer:V["a"],VDivider:O["a"],VExpandTransition:Ot["a"],VIcon:$["a"],VMain:T["a"],VProgressCircular:It["a"],VSheet:ft["a"],VSpacer:$t["a"]}),Lt()(St,{Scroll:M["b"]});var Tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{attrs:{outlined:t.$vuetify.theme.dark}},[a("v-card-title",[t._v(" Opcje ")]),a("v-divider"),a("v-subheader",[t._v("Motyw aplikacji")]),a("v-btn-toggle",{staticClass:"d-flex mx-4",attrs:{mandatory:""},model:{value:t.dark,callback:function(e){t.dark=e},expression:"dark"}},[a("v-btn",{staticClass:"grow",attrs:{value:!1}},[a("v-icon",{attrs:{left:""}},[t._v(" mdi-white-balance-sunny ")]),t._v(" Jasny ")],1),a("v-btn",{staticClass:"grow",attrs:{value:!0}},[a("v-icon",{attrs:{left:""}},[t._v(" mdi-weather-night ")]),t._v(" Ciemny ")],1)],1),a("v-divider",{staticClass:"mt-5"}),a("v-switch",{staticClass:"mx-4",attrs:{label:"Pokaż numer sali","hide-details":""},model:{value:t.showRoom,callback:function(e){t.showRoom=e},expression:"showRoom"}}),a("v-switch",{staticClass:"mx-4",attrs:{label:"Pokaż grupę","hide-details":""},model:{value:t.showGroupName,callback:function(e){t.showGroupName=e},expression:"showGroupName"}}),a("v-switch",{staticClass:"mx-4",attrs:{label:"Pokaż nauczyciela","hide-details":""},model:{value:t.showTeacher,callback:function(e){t.showTeacher=e},expression:"showTeacher"}}),a("v-switch",{staticClass:"mx-4",attrs:{label:"Kolory przedmiotów (tylko V LO)"},model:{value:t.subjectColors,callback:function(e){t.subjectColors=e},expression:"subjectColors"}})],1)},Nt=[],Rt={computed:{dark:{get:function(){return this.$vuetify.theme.dark},set:function(t){this.$vuetify.theme.dark=t,this.$store.commit("setDark",t)}},subjectColors:{get:function(){return this.$store.state.storage.subjectColors},set:function(t){this.$store.commit("setSubjectColors",t)}},showRoom:{get:function(){return this.$store.state.storage.showRoom},set:function(t){this.$store.commit("setShowRoom",t)}},showGroupName:{get:function(){return this.$store.state.storage.showGroupName},set:function(t){this.$store.commit("setShowGroupName",t)}},showTeacher:{get:function(){return this.$store.state.storage.showTeacher},set:function(t){this.$store.commit("setShowTeacher",t)}}}},Pt=Rt,Et=a("a609"),Gt=a("b73d"),Ut=Object(x["a"])(Pt,Tt,Nt,!1,null,null,null),Bt=Ut.exports;_()(Ut,{VBtn:k["a"],VBtnToggle:Et["a"],VCard:C["a"],VCardTitle:j["c"],VDivider:O["a"],VIcon:$["a"],VSubheader:R["a"],VSwitch:Gt["a"]});var At={name:"App",components:{SchoolPickerView:G,TimetableView:Dt,OptionsCard:Bt},data:function(){return{schoolLoading:!1,navigationDrawerVisible:this.$vuetify.breakpoint.mdAndUp}},computed:{timetableTitle:function(){var t=this;if(null===this.selection.class||null===this.$store.state.classes)return"Plan lekcji";var e=this.$store.state.classes.find((function(e){return e.value===t.selection.class}));return void 0===e?"Nie znaleziono klasy":e.name},classItems:function(){var t=this;return null===this.$store.state.classes?null:this.selection?"optivum"===this.selection.type?this.$store.state.classes.map((function(e){return{value:e.value,name:e.name,to:"/optivum/".concat(encodeURIComponent(t.selection.url),"/class/").concat(e.value)}})):"v-lo"===this.selection.type?this.$store.state.classes.map((function(t){return{value:t.value,name:t.name,to:"/v-lo/class/".concat(t.value)}})):null:null},redirect:function(){if(null!==this.selection&&null===this.selection.class&&null!==this.$store.state.classes){if("optivum"===this.selection.type)return"/optivum/".concat(encodeURIComponent(this.$route.params.url),"/class/").concat(this.$store.state.classes[0].value);if("v-lo"===this.selection.type)return"/v-lo/class/".concat(this.$store.state.classes[0].value)}return null},selection:function(){return this.$route.matched.some((function(t){return"optivum"===t.meta.type}))?{type:"optivum",url:this.$route.params.url,class:this.$route.params.class||null}:this.$route.matched.some((function(t){return"v-lo"===t.meta.type}))?{type:"v-lo",class:this.$route.params.class||null}:null}},watch:{"$store.state.storage.dark":{handler:function(t){this.$vuetify.theme.dark=t},immediate:!0},selection:{handler:function(t,e){var a=this;return Object(d["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(r.prev=0,!t){r.next=14;break}if(!e||t.type!==e.type||t.url!==e.url){r.next=4;break}return r.abrupt("return");case 4:if("optivum"!==t.type){r.next=9;break}return r.next=7,a.loadOptivum(t.url);case 7:r.next=12;break;case 9:if("v-lo"!==t.type){r.next=12;break}return r.next=12,a.loadVLo();case 12:r.next=15;break;case 14:a.$store.commit("setClasses",null);case 15:r.next=20;break;case 17:r.prev=17,r.t0=r["catch"](0),console.error(r.t0);case 20:case"end":return r.stop()}}),r,null,[[0,17]])})))()},immediate:!0},redirect:{handler:function(t){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(null!==t){a.next=2;break}return a.abrupt("return");case 2:return a.next=4,e.$router.replace(t);case 4:case"end":return a.stop()}}),a)})))()}}},methods:{loadOptivum:function(t){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function a(){var r,s,o,n,i,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.schoolLoading=!0,a.prev=1,e.$store.commit("setClasses",null),a.next=5,p["a"].get(new URL("/".concat(t),"https://tba-proxy.dominik-korsa.tk/"));case 5:return r=a.sent,a.t0=v["Timetable"],a.next=9,r.text();case 9:return a.t1=a.sent,s=new a.t0(a.t1),a.next=13,p["a"].get(new URL("/".concat(new URL(s.getListPath(),t).toString()),"https://tba-proxy.dominik-korsa.tk/"));case 13:return o=a.sent,a.t2=v["TimetableList"],a.next=17,o.text();case 17:return a.t3=a.sent,n=new a.t2(a.t3),i=n.getList(),l=i.classes,e.$store.commit("setClasses",l),e.schoolLoading=!1,a.next=24,e.$store.dispatch("addHistoryEntry",{url:t,name:s.getTitle()});case 24:a.next=32;break;case 26:return a.prev=26,a.t4=a["catch"](1),a.next=30,e.$router.push("/");case 30:throw e.schoolLoading=!1,a.t4;case 32:case"end":return a.stop()}}),a,null,[[1,26]])})))()},loadVLo:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.schoolLoading=!0,e.prev=1,t.$store.commit("setClasses",null),e.next=5,p["a"].get("https://api.cld.sh/vlo/listclass");case 5:return a=e.sent,e.next=8,a.json();case 8:r=e.sent,t.$store.commit("setClasses",r.map((function(t){return{name:t,value:t}}))),t.schoolLoading=!1,e.next=17;break;case 13:throw e.prev=13,e.t0=e["catch"](1),t.schoolLoading=!1,e.t0;case 17:case"end":return e.stop()}}),e,null,[[1,13]])})))()}}},qt=At,Mt=(a("fffb"),a("7496")),Wt=a("40dc"),Ht=a("5bc1"),Ft=a("34c3"),Jt=a("f774"),Kt=a("2a7f"),Qt=Object(x["a"])(qt,c,u,!1,null,null,null),Xt=Qt.exports;_()(Qt,{VApp:Mt["a"],VAppBar:Wt["a"],VAppBarNavIcon:Ht["a"],VBtn:k["a"],VDialog:ct["a"],VIcon:$["a"],VList:L["a"],VListItem:S["a"],VListItemContent:D["a"],VListItemIcon:Ft["a"],VListItemTitle:D["c"],VMenu:N["a"],VNavigationDrawer:Jt["a"],VSpacer:$t["a"],VSubheader:R["a"],VToolbarTitle:Kt["a"]});a("fb6a");var Yt=a("2909"),Zt=a("bfa9");r["a"].use(F["a"]);var te=new Zt["a"]({storage:window.localStorage,reducer:function(t){return{storage:t.storage}}}),ee=new F["a"].Store({state:{storage:{dark:!1,history:[],subjectColors:!1,showRoom:!0,showGroupName:!0,showTeacher:!1},classes:null},mutations:{setDark:function(t,e){t.storage.dark=e},setHistory:function(t,e){t.storage.history=e},setClasses:function(t,e){t.classes=e},setSubjectColors:function(t,e){t.storage.subjectColors=e},setShowRoom:function(t,e){t.storage.showRoom=e},setShowGroupName:function(t,e){t.storage.showGroupName=e},setShowTeacher:function(t,e){t.storage.showTeacher=e}},actions:{addHistoryEntry:function(t,e){var a=t.commit,r=t.state,s=e.url,o=e.name,n=H.a.uniqBy(H.a.orderBy([{url:s,timestamp:Date.now(),name:o}].concat(Object(Yt["a"])(r.storage.history)),["timestamp"],["desc"]),"url").slice(0,5);a("setHistory",n)}},modules:{},plugins:[te.plugin]}),ae=a("8c4f");r["a"].use(ae["a"]);var re=[{path:"/",name:"Home"},{path:"/optivum/:url",meta:{type:"optivum"}},{path:"/optivum/:url/class/:class",meta:{type:"optivum"}},{path:"/v-lo",meta:{type:"v-lo"}},{path:"/v-lo/class/:class",meta:{type:"v-lo"}},{path:"*",redirect:"/"}],se=new ae["a"]({routes:re}),oe=se;r["a"].config.productionTip=!1,new r["a"]({vuetify:l,store:ee,router:oe,render:function(t){return t(Xt)}}).$mount("#app")},"6bd2":function(t,e,a){t.exports=a.p+"img/v-lo.1c58d758.png"},9951:function(t,e,a){"use strict";a("06e4")},"9fd0":function(t,e,a){"use strict";a("c588")},a0e2:function(t,e,a){},a210:function(t,e,a){},bc1a:function(t,e,a){},c588:function(t,e,a){},fea2:function(t,e,a){"use strict";a("a0e2")},fffb:function(t,e,a){"use strict";a("a210")}});
//# sourceMappingURL=app.f53003bc.js.map