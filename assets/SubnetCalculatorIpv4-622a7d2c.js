import{d as N,a as c,b as y,e as I,w as M,o as i,f as d,g as p,v,h as t,n as m,j as k,k as _,l as C,F as B,m as z}from"./index-80aa8f3b.js";import{_ as f,D as g,B as x,A as S,M as F,N as U}from"./NetworkIpv4Info.vue_vue_type_script_setup_true_lang-ec61589f.js";const A={class:"p-2 border-green-700 border-4"},D=t("h1",{class:"text-xl"},"Subnet calculator",-1),$=t("label",{for:"inputName"},"IP: ",-1),j=t("label",{for:"inputName"},"Mask: ",-1),E={key:0},L=t("hr",{class:"border"},null,-1),P={key:1},R=t("p",null,"Subnetting:",-1),T={class:"flex gap-4"},X=["onSubmit"],q=t("label",{for:""}," name ",-1),G=t("label",{for:""}," size ",-1),H=t("button",{type:"submit",class:"p-1 rounder-sm bg-green-600 text-white"}," add ",-1),J={class:"flex flex-col gap-1 p-1"},K=["onClick"],Z=N({__name:"SubnetCalculatorIpv4",setup(O){const a=c(""),l=c(""),r=c(""),u=c(0),n=y({network:null}),w=(s,e)=>{if(!g.isValid(s)&&!x.isValid(s)||!g.isValid(e)&&!x.isValid(e)){n.network=null;return}if(!new S(e).binaryValue.isMask()){n.network=null;return}const o=new S(s),b=new F(e);n.network=new U(o,b)},h=()=>{n.network&&(!r.value||u.value<0||n.network.getSubnet(r.value)||(n.network.addSubnetBySize(r.value,u.value),r.value="",u.value=0))},V=s=>{n.network.removeSubnet(s)};return I(()=>{w(a.value,l.value)}),M([a,l],([s,e])=>{w(s,e)}),(s,e)=>(i(),d("div",A,[D,$,p(t("input",{id:"inputName","onUpdate:modelValue":e[0]||(e[0]=o=>a.value=o),class:m([n.network==null&&a.value?"text-red-500":"text-green-500","border"])},null,2),[[v,a.value]]),j,p(t("input",{id:"inputName","onUpdate:modelValue":e[1]||(e[1]=o=>l.value=o),class:m([n.network==null&&l.value?"text-red-500":"text-green-500","border"])},null,2),[[v,l.value]]),n.network?(i(),d("div",E,[k(f,{network:n.network},null,8,["network"])])):_("",!0),L,n.network?(i(),d("div",P,[R,t("div",T,[t("form",{onSubmit:C(h,["prevent"]),class:"flex gap-1 items-center"},[q,p(t("input",{"onUpdate:modelValue":e[2]||(e[2]=o=>r.value=o),type:"text",class:"rounded-sm border-2"},null,512),[[v,r.value]]),G,p(t("input",{"onUpdate:modelValue":e[3]||(e[3]=o=>u.value=o),type:"number",class:"w-16 rounded-sm border-2"},null,512),[[v,u.value]]),H],40,X),t("button",{onClick:e[4]||(e[4]=o=>n.network.sortSubnets()),class:"p-1 rounder-sm bg-blue-600 text-white",type:"submit"}," Sort ")]),t("div",J,[(i(!0),d(B,null,z(n.network.getSubnets(),(o,b)=>(i(),d("div",{key:b,class:m(["relative border",[o[1].inRange?"":"bg-red-50"]])},[t("button",{onClick:Q=>V(o[0]),class:"absolute right-0 top-0 w-6 p-1 bg-red-600 text-white"}," X ",8,K),k(f,{network:o[1].subnet},null,8,["network"])],2))),128))])])):_("",!0)]))}});export{Z as default};