import{a as w,i as p,S as g}from"./assets/vendor-DEenWwFD.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();const m=async(r,a)=>{try{return(await w.get("https://pixabay.com/api/",{params:{q:r,key:"48331487-0b79b5362db2718bcf5a2a310",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:20,page:a}})).data}catch(s){throw console.error("Error fetching data from Pixabay:",s),s}},h=r=>`<li class="gallery-card">
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
        </li>`;document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector(".js-search-form"),a=document.querySelector(".js-gallery"),d=document.querySelector(".loader"),s=document.querySelector(".js-load-more"),e=document.querySelector(".js-end-message");let t=1,o="",u=0,c=0;function i(l){l?d.classList.remove("is-hidden"):d.classList.add("is-hidden")}const f=async l=>{l.preventDefault();const y=l.currentTarget.elements.user_query.value.trim();if(y===""){p.error({message:"Please enter your request",position:"topRight"});return}o=y,t=1,c=0,a.innerHTML="",i(!0);try{const n=await m(o,t);if(u=n.total,c+=n.hits.length,n.total===0){p.error({message:'"Sorry, there are no images matching your search query. Please try again!"',position:"topRight"}),i(!1);return}const v=n.hits.map(h).join("");a.innerHTML=v,i(!1),c>=u?(s.classList.add("is-hidden"),e.classList.remove("is-hidden")):(s.classList.remove("is-hidden"),e.classList.add("is-hidden")),new g(".js-gallery a",{captionDelay:300,captionsData:"alt"}).refresh(),window.scrollBy({top:window.innerHeight/2,behavior:"smooth"})}catch(n){console.log(n),i(!1)}},L=async()=>{if(!(c>=u)){t+=1,i(!0);try{const l=await m(o,t);c+=l.hits.length;const y=l.hits.map(h).join("");a.insertAdjacentHTML("beforeend",y),i(!1),c>=u&&(s.classList.add("is-hidden"),e.classList.remove("is-hidden")),new g(".js-gallery a",{captionDelay:300,captionsData:"alt"}).refresh(),window.scrollBy({top:window.innerHeight/2,behavior:"smooth"})}catch(l){console.log(l),i(!1)}}};r.addEventListener("submit",f),s.addEventListener("click",L)});
//# sourceMappingURL=index.js.map
