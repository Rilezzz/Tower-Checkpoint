import{f as b,l as u,A as c,_ as x,g as S,u as D,w as A,b as _,P as m,t as I,h as w,o as a,c as i,a as e,d as l,i as g,j as P,F as p,r as E,k as B,m as j,v as N,p as M,e as L}from"./index-a6f5e2d4.js";class T{constructor(n){this.id=n.id,this.eventId=n.eventId,this.creatorId=n.creatorId,this.isAttending=n.isAttending,this.createdAt=n.createdAt?new Date(n.createdAt).toLocaleString():new Date,this.body=n.body,this.creator=n.creator}}class V{async getCommentsByEventId(n){const r=await b.get(`api/events/${n}/comments`);u.log("[GETTING COMMENTS]",r.data),c.comments=r.data.map(t=>new T(t)),u.log("[APP COMMENTS]",c.comments)}async createComment(n){const r=await b.post("api/comments",n);u.log("[CREATING COMMENT]",r.data);const t=new T(r.data);c.comments.unshift(t)}async deleteComment(n){const r=await b.delete(`api/comments/${n}`);u.log("[Deleted Comment]",r.data);const t=c.comments.findIndex(y=>y.id==n);c.comments.splice(t,1)}}const C=new V;const G={setup(){const d=S({}),n=D();async function r(){try{const s=n.params.eventId;await w.getEventById(s)}catch(s){m.error(s.message)}}async function t(){try{const s=n.params.eventId;await C.getCommentsByEventId(s)}catch(s){m.error(s.message)}}async function y(){try{const s=n.params.eventId;await I.getEventTicketsByEventId(s)}catch(s){u.error(s),m.error(s.message,"error")}}return A(()=>{r(n.params.eventId),t(n.params.eventId),y()}),{editable:d,tickets:_(()=>c.tickets),event:_(()=>c.activeEvent),comments:_(()=>c.comments),account:_(()=>c.account),isAttending:_(()=>c.tickets.find(s=>s.accountId==c.account.id)),async createComment(){try{const s=d.value;u.log(s),s.eventId=n.params.eventId,await C.createComment(s),d.value={}}catch(s){m.error(s.message)}},async deleteComment(s){try{if(!await m.confirm("Are you sure you want to delete this comment?"))return;await C.deleteComment(s)}catch(v){m.error(v.message)}},async createTicket(){try{const v={eventId:n.params.eventId};await I.createTicket(v),c.activeEvent.ticketCount++}catch(s){u.error(s),m.toast(s.message,"error")}},async cancelEvent(){try{let s=c.activeEvent;await w.cancelEvent(s.id),c.activeEvent.isCanceled=!0,m.success("Event Cancelled")}catch(s){m.error(s)}}}}},h=d=>(M("data-v-78711b32"),d=d(),L(),d),O={key:0,class:"container-fluid"},F={class:"row m-3 justify-content-center text-shadow"},R={class:"col-md-10 col-12 d-flex event-Card"},q={class:"row justify-content-between"},H={class:"col-md-4 col-12"},U={key:0,class:"img-fluid cover m-1 justify-content-bottom rounded",src:"https://pluspng.com/img-png/-2112.png",alt:"Picture"},z={key:1,class:"img-fluid cover m-1 justify-content-bottom rounded",src:"https://counselling-matters.org.uk/wp-content/uploads/2020/05/cancelled-stamp.svg",alt:"Picture"},J=["src"],K={class:"col-md-7 col-12 p-2"},Q={key:1,class:"btn btn-danger"},W={class:"text-end mb-3"},X=["disabled"],Y=h(()=>e("i",{class:"mdi mdi-cancel"},null,-1)),Z=[Y],$={class:"container-fluid"},ee={class:"row m-auto m-2 justify-content-center"},te={class:"col-md-8 col-12 d-flex event-Card text-shadow pt-2"},ne={class:"rounded m-2 p-2"},se={class:"m-2"},oe=["src"],ce={class:"container-fluid"},ae={class:"row m-auto justify-content-around"},ie={class:"col-md-3 col-12 event-Card text-shadow mt-3 p-2"},de={class:"mb-3"},re=h(()=>e("div",null,[e("h3",null,"Leave a Comment...")],-1)),le=h(()=>e("div",{class:"text-end"},[e("button",{class:"btn btn-outline-info",type:"submit"},"Submit")],-1)),me={class:"container-fluid"},ve=h(()=>e("div",null,null,-1)),ue={class:"row justify-content-center p-2"},_e=["src"],he={class:"text-end"},ye=["onClick","disabled"],ge=h(()=>e("i",{class:"mdi mdi-trash-can-outline"},null,-1)),fe=[ge];function be(d,n,r,t,y,s){var v,k;return a(),i(p,null,[t.event?(a(),i("div",O,[e("div",F,[e("div",R,[e("div",q,[e("div",H,[t.event.capacity==t.event.ticketCount?(a(),i("img",U)):t.event.isCanceled==!0?(a(),i("img",z)):(a(),i("img",{key:2,class:"img-fluid cover m-1 justify-content-bottom rounded",src:(v=t.event)==null?void 0:v.coverImg,alt:"Picture"},null,8,J))]),e("div",K,[e("h2",null,l(t.event.name),1),e("p",null,"Date: "+l(t.event.startDate),1),e("p",null,"Location: "+l(t.event.location),1),e("p",null,"Tickets Available: "+l(t.event.capacity-t.event.ticketCount),1),e("p",null,"Details: "+l(t.event.description),1),e("p",null,"Tickets Sold: "+l(t.event.ticketCount),1),e("div",null,[t.event.isCanceled==!1&&!t.isAttending?(a(),i("button",{key:0,class:"m-2 btn btn-outline-info",onClick:n[0]||(n[0]=o=>t.createTicket())},"Get Ticket ")):t.event.ticketCount==t.event.capacity?(a(),i("div",Q,"EVENT CLOSED")):g("",!0)])]),e("div",W,[t.event.creatorId==t.account.id?(a(),i("button",{key:0,title:"Cancel Event",onClick:n[1]||(n[1]=o=>t.cancelEvent(t.event.id)),disabled:t.event.isCanceled==!0,class:"btn btn-danger fs-5"},Z,8,X)):g("",!0)])])])])])):g("",!0),e("div",$,[P("' "),e("div",ee,[e("div",te,[e("div",ne,[e("h2",null,"Ticket Holders: "+l((k=t.event)==null?void 0:k.ticketCount),1)]),e("div",se,[(a(!0),i(p,null,E(t.tickets,o=>{var f;return a(),i("img",{class:"rounded profile-Img",key:o.id,src:(f=o.profile)==null?void 0:f.picture,alt:""},null,8,oe)}),128))])])])]),e("div",ce,[e("div",ae,[e("div",ie,[e("form",{onSubmit:n[3]||(n[3]=B(o=>t.createComment(),["prevent"]))},[e("div",de,[re,j(e("textarea",{required:"","onUpdate:modelValue":n[2]||(n[2]=o=>t.editable.body=o),maxlength:"350",class:"form-control",id:"body",rows:"4"},null,512),[[N,t.editable.body]])]),le],32)])])]),e("div",me,[ve,e("div",ue,[(a(!0),i(p,null,E(t.comments,o=>(a(),i("div",{key:o,class:"col-md-7 col-12 mb-3 event-Card text-shadow p-2"},[e("div",null,[e("img",{class:"rounded img-fluid profileImg",src:o.creator.picture,alt:""},null,8,_e),e("p",null,l(o.creator.name),1)]),e("p",null,l(o.body),1),e("p",null,l(o.createdAt),1),e("div",he,[o.creatorId==t.account.id?(a(),i("button",{key:0,onClick:f=>t.deleteComment(o.id),disabled:t.event.isCanceled==!0,class:"btn btn-info fs-5"},fe,8,ye)):g("",!0)])]))),128))])])],64)}const Ce=x(G,[["render",be],["__scopeId","data-v-78711b32"]]);export{Ce as default};
