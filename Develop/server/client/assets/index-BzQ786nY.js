(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(n){if(n.ep)return;n.ep=!0;const c=r(n);fetch(n.href,c)}})();const w=document.getElementById("search-form"),u=document.getElementById("search-input"),d=document.getElementById("history"),L=document.getElementById("search-title"),h=document.getElementById("weather-img"),v=document.getElementById("temp"),b=document.getElementById("wind"),C=document.getElementById("humidity");console.log("📡 Backend URL:",void 0);const x=async e=>{try{const r=await fetch("undefined/api/weather/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({city:e})});if(!r.ok)throw new Error(`Error fetching weather: ${r.statusText}`);const o=await r.json();if(console.log("weatherData:",o),!o.current||!o.forecast)throw console.error("Error: Respuesta del servidor inválida",o),new Error("Invalid weather data from server");I(o.current),$(o.forecast),await E()}catch(t){console.error("Error al obtener el clima:",t)}},H=async()=>{try{console.log("📥 Fetching search history...");const e=void 0;console.log("📡 Backend URL:",e);const t=await fetch(`${e}/api/weather/history`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`Error fetching search history: ${t.statusText}`);const r=await t.json();return console.log("🔎 Search History Data received in frontend:",r),r}catch(e){return console.error("Error fetching search history:",e),[]}},I=e=>{console.log("Rendering current weather:",e);const{city:t,date:r,icon:o,description:n,temperature:c,windSpeed:s,humidity:i}=e;if(L&&h&&v&&b&&C){L.innerHTML=`<strong>${t} (${r})</strong>`;const a=`https://openweathermap.org/img/wn/${o}@2x.png`;console.log("Icon URL (current weather):",a),h.setAttribute("src",a),h.setAttribute("alt",n),h.setAttribute("class","weather-img"),v.textContent=`Temp: ${c}°C`,b.textContent=`Wind: ${s} MPH`,C.textContent=`Humidity: ${i} %`}},$=e=>{console.log("Forecast data received:",e);const t=document.getElementById("forecast");if(!t){console.error("❌ Error: #forecast container not found in DOM");return}t.innerHTML="";const r=document.createElement("h3");r.textContent="5-Day Forecast",r.classList.add("forecast-title"),t.appendChild(r);const o=document.createElement("div");o.classList.add("forecast-wrapper"),e.forEach(n=>{const c=T(n);c&&o.appendChild(c)}),t.appendChild(o)},T=e=>{if(console.log("Rendering forecast card:",e),!e||!e.date||!e.temperature||!e.icon)return console.error("Invalid forecast data:",e),document.createElement("div");const{date:t,icon:r,description:o,temperature:n,windSpeed:c,humidity:s}=e,i=document.createElement("div"),a=document.createElement("div"),m=document.createElement("div"),p=document.createElement("h5"),l=document.createElement("img"),y=document.createElement("p"),f=document.createElement("p"),g=document.createElement("p");return i.append(a),a.append(m),m.append(p,l,y,f,g),i.classList.add("col-auto"),a.classList.add("forecast-card","card","text-white","bg-primary","h-100"),m.classList.add("card-body","p-2","text-center"),p.classList.add("card-title"),l.classList.add("weather-icon"),y.classList.add("card-text"),f.classList.add("card-text"),g.classList.add("card-text"),p.innerHTML=`<strong>${t}</strong><br>${o}`,l.setAttribute("src",`https://openweathermap.org/img/wn/${r}@2x.png`),l.setAttribute("alt",o),y.textContent=`Temp: ${Math.round(n)}°F`,f.textContent=`Wind: ${c} MPH`,g.textContent=`Humidity: ${s} %`,i},E=async()=>{console.log("🔄 Ejecutando getAndRenderHistory..."),await M()},M=async()=>{if(!d){console.error("❌ Error: #history container not found in DOM");return}d.style.display="block",d.innerHTML="";const e=await H();if(console.log("🔎 Search History Data received in frontend:",e),e.length===0){d.innerHTML='<p class="text-center">No Previous Search History</p>';return}e.forEach(({name:t})=>{console.log(`✅ Adding to search history: ${t}`);const r=document.createElement("button");r.textContent=t,r.classList.add("history-btn"),r.addEventListener("click",()=>x(t)),d.appendChild(r)}),console.log("✅ Search history rendered successfully!")},S=async e=>{e.preventDefault(),!(!u||!u.value.trim())&&(await x(u.value.trim()),await E(),u.value="")};document.addEventListener("DOMContentLoaded",()=>{console.log("✅ DOM cargado. Ejecutando getAndRenderHistory()"),E()});w&&w.addEventListener("submit",S);
