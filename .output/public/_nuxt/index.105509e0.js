import{bH as S,g as j,v as y,bA as z,h as F,r as n,c as A,n as o,F as B,x as Q,i as H,w as e,b as t,at as R,o as v,d as l,t as u,a as c,bG as G}from"./entry.057c6502.js";const L=c("p",null,"Tem certeza que deseja excluir este hinário?",-1),I={__name:"index",async setup(M){let d,k;const{$fetchApi:C,$formatDateTime:b,$exportHymnary:V}=G(),w=S(),D=j(),_=y(([d,k]=z(()=>C.get("/hymnary")),d=await d,k(),d));F(()=>{D.setAppBarTitle("Aqui estão seus hinários!")});const r=y(!1),p=y(null);function E(m){r.value=!0,p.value=m}function N(){r.value=!1}function T(){C.delete(`/hymnary/${p.value.id}`),_.value=_.value.filter(m=>m.id!==p.value.id),r.value=!1}return(m,s)=>{const f=n("v-card-title"),x=n("v-card-text"),i=n("v-btn"),$=n("v-card-actions"),g=n("v-card"),q=n("v-spacer"),O=n("v-dialog");return v(),A(B,null,[o(_).length?(v(!0),A(B,{key:0},Q(o(_),a=>(v(),H(g,{class:"mb-2",key:a.id},{default:e(()=>[t(f,{"primary-title":""},{default:e(()=>[l(u(a.title),1)]),_:2},1024),t(x,null,{default:e(()=>[c("p",null,"Criado em: "+u(o(b)(a.created_at)),1),c("p",null,"Atualizado em: "+u(o(b)(a.updated_at)),1),c("p",null,"Qtd de músicas: "+u(a.songs.length),1)]),_:2},1024),t($,null,{default:e(()=>[t(i,{color:"primary",onClick:h=>o(w).push(`/hymnary/${a.id}`)},{default:e(()=>[l("Editar")]),_:2},1032,["onClick"]),t(i,{color:"success",onClick:h=>o(V)(a)},{default:e(()=>[l("Baixar")]),_:2},1032,["onClick"]),t(i,{color:"error",onClick:h=>E(a)},{default:e(()=>[l("Excluir")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128)):(v(),H(g,{key:1,class:"pa-4"},{default:e(()=>[t(f,{"primary-title":""},{default:e(()=>[l(" Ops, parece que você ainda não tem nenhum hinário cadastrado. ")]),_:1}),t(x,null,{default:e(()=>[l(' Que tal criar um agora? Basta acessar o menu lateral e clicar em "Novo hinário". ')]),_:1})]),_:1})),t(O,{modelValue:o(r),"onUpdate:modelValue":s[2]||(s[2]=a=>R(r)?r.value=a:null),overlay:!0,"max-width":"500px",transition:"dialog-transition"},{default:e(()=>[t(g,{class:"pa-4 rounded-xl"},{default:e(()=>[t(f,null,{default:e(()=>[l("Excluir hinário")]),_:1}),t(x,null,{default:e(()=>[L,c("p",null,u(o(p).title),1)]),_:1}),t($,null,{default:e(()=>[t(q),t(i,{color:"primary",onClick:s[0]||(s[0]=a=>N())},{default:e(()=>[l("Cancelar")]),_:1}),t(i,{color:"error",onClick:s[1]||(s[1]=a=>T())},{default:e(()=>[l("Excluir")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}};export{I as default};
