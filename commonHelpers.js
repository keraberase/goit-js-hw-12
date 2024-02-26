import{a as P,S,i as f}from"./assets/vendor-5401a4b0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function u(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=u(t);fetch(t.href,s)}})();function q(e){return`<li class="gallery-item">
  <a class="gallery-link" href="${e.largeImageURL}">
    <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
  </a>
   <div class="image-details">
                    <p>Likes: ${e.likes}</p>
                    <p>Views: ${e.views}</p>
                    <p>Comments: ${e.comments}</p>
                    <p>Downloads: ${e.downloads}</p>
                </div>
</li>`}function T(e){return e.map(q).join("")}async function h(e,r){const u="https://pixabay.com",c="/api/",s={key:"42305658-75508782eac06a666c1fb928b",image_type:"photo",orientation:"horizontal",safesearch:"true",q:e,per_page:15,page:r},o=`${u}${c}?${new URLSearchParams(s)}`;return(await P.get(o)).data}const $=document.querySelector(".js-search-form"),l=document.querySelector(".gallery"),p=document.querySelector(".js-loader"),g=document.querySelector(".js-btn-load"),a=document.querySelector(".load-message"),E=new S(".gallery a");let n,i,m;function y(e){e?p.classList.remove("hidden"):p.classList.add("hidden")}function d(e){f.error({title:"Error",message:e,position:"topCenter"})}function L(){y(!0)}function w(){y(!1)}$.addEventListener("submit",I);g.addEventListener("click",M);async function I(e){if(e.preventDefault(),n=e.target.elements.search.value.trim(),i=1,!n){d("Please enter a search query.");return}a.classList.remove("hidden"),L();try{const r=await h(n,i);if(r.totalHits===0){l.innerHTML="",d("No images found for your search query. Please try again!"),e.target.elements.search.value="",a.classList.add("hidden");return}m=Math.ceil(r.totalHits/15),l.innerHTML="",v(r.hits),a.classList.add("hidden")}catch{d("There was a problem fetching data. Please try again later."),m=0,l.innerHTML=""}w(),b(),e.target.reset()}async function M(){if(i+=1,!n){f.warning({title:"Warning",message:"Please enter a search query",position:"topCenter"});return}a.classList.remove("hidden"),L();try{const e=await h(n,i);v(e.hits);const r=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"}),a.classList.add("hidden"),b()}catch{d("There was a problem fetching data. Please try again later.")}w()}function B(){g.classList.remove("hidden")}function H(){g.classList.add("hidden")}function b(){i>=m?(H(),f.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topCenter"})):B()}function v(e){const r=T(e);l.insertAdjacentHTML("beforeend",r),E.refresh()}
//# sourceMappingURL=commonHelpers.js.map
