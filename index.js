import{a as L,i as p,S as b}from"./assets/vendor-DEenWwFD.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const g=async(r,a,n=15)=>{try{return(await L.get("https://pixabay.com/api/",{params:{q:r,key:"48331487-0b79b5362db2718bcf5a2a310",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:n,page:a}})).data}catch(s){throw console.error("Error fetching data from Pixabay:",s),s}},m=r=>`<li class="gallery-card">
            <article class="card">
            <a class="gallery-link" href="${r.largeImageURL}" target="_blank" rel="noopener noreferrer">
              <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}" />
            </a>
            <div class="gallery-container">
              <div class="gallery-item">
                <p class="gallery-title">Likes</p>
                <p class="gallery-count">${r.likes}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Views</p>
                <p class="gallery-count">${r.views}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Comments</p>
                <p class="gallery-count">${r.comments}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Downloads</p>
                <p class="gallery-count">${r.downloads}</p>
              </div>
            </div>
          </article>
        </li>`;document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector(".js-search-form"),a=document.querySelector(".js-gallery"),n=document.querySelector(".loader"),s=document.querySelector(".js-load-more");document.querySelector(".js-end-message");let e=1,t="",l=0,c=0,u=null;function i(o){o?n.classList.remove("is-hidden"):n.classList.add("is-hidden")}const h=async o=>{o.preventDefault();const y=o.currentTarget.elements.user_query.value.trim();if(y===""){p.error({message:"Please enter your request",position:"topRight"});return}t=y,e=1,c=0,a.innerHTML="",i(!0);try{const d=await g(t,e,15);if(l=d.total,c+=d.hits.length,d.total===0){p.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),i(!1);return}const v=d.hits.map(m).join("");a.innerHTML=v,i(!1),c>=l?(s.classList.add("is-hidden"),p.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3})):s.classList.remove("is-hidden"),u?u.refresh():u=new b(".js-gallery a",{captionDelay:300,captionsData:"alt"}),window.scrollBy({top:window.innerHeight/2,behavior:"smooth"})}catch(d){console.log(d),i(!1)}},f=async()=>{if(!(c>=l)){e+=1,i(!0);try{const o=await g(t,e,15);c+=o.hits.length;const y=o.hits.map(m).join("");a.insertAdjacentHTML("beforeend",y),i(!1),c>=l&&(s.classList.add("is-hidden"),p.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3})),u.refresh(),window.scrollBy({top:window.innerHeight/2,behavior:"smooth"})}catch(o){console.log(o),i(!1)}}};r.addEventListener("submit",h),s.addEventListener("click",f)});
//# sourceMappingURL=index.js.map
