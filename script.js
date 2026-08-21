const qs = s => document.querySelector(s);
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{}));

qs('#themeBtn').addEventListener('click',()=>{
  document.body.classList.toggle('light-mode');
  qs('#themeBtn').textContent=document.body.classList.contains('light-mode')?'☼':'◐';
});

document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const ans=btn.nextElementSibling;
    const open=btn.classList.toggle('open');
    ans.classList.toggle('open',open);
    btn.querySelector('span').textContent=open?'−':'+';
  });
});

document.querySelectorAll('.choice').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const r=qs('#challengeResult');
    if(btn.dataset.answer==='dark'){
      r.textContent='✓ ¡Correcto! La superficie oscura alcanzará una temperatura mayor en estas condiciones.';
    }else{
      r.textContent='✗ Casi. En nuestro experimento, la superficie oscura alcanzó una temperatura mayor.';
    }
  });
});

const sourceKey='feriaCienciasFuentes';
let sources=JSON.parse(localStorage.getItem(sourceKey)||'[]');
function renderSources(){
  const box=qs('#sourceList');
  box.innerHTML='';
  sources.forEach((s,i)=>{
    const div=document.createElement('div'); div.className='source-item';
    div.innerHTML=`<div><strong>${escapeHtml(s.name)}</strong>${s.url?`<br><a href="${escapeAttr(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.url)}</a>`:''}</div><button class="delete" data-i="${i}">♧</button>`;
    box.appendChild(div);
  });
  box.querySelectorAll('.delete').forEach(b=>b.addEventListener('click',()=>{sources.splice(+b.dataset.i,1);saveSources()}));
}
function saveSources(){localStorage.setItem(sourceKey,JSON.stringify(sources));renderSources()}
qs('#sourceForm').addEventListener('submit',e=>{
  e.preventDefault();
  const name=qs('#sourceName').value.trim(), url=qs('#sourceUrl').value.trim();
  if(name){sources.push({name,url});saveSources();e.target.reset();}
});
function escapeHtml(v){return v.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function escapeAttr(v){return v.replace(/"/g,'&quot;')}

qs('#askForm').addEventListener('submit',e=>{
  e.preventDefault();
  const q=qs('#askInput').value.toLowerCase();
  let a='Nuestra investigación estudia cómo el color de una superficie influye en la absorción de la radiación solar y en la temperatura alcanzada.';
  if(q.includes('independiente')) a='La variable independiente es el color de la superficie.';
  else if(q.includes('dependiente')||q.includes('temperatura')) a='La variable dependiente es la temperatura alcanzada por la superficie.';
  else if(q.includes('oscura')||q.includes('negra')) a='Las superficies oscuras alcanzaron mayor temperatura en nuestras condiciones experimentales porque absorben una mayor proporción de la radiación visible.';
  else if(q.includes('clara')||q.includes('blanca')) a='Las superficies claras reflejan una mayor proporción de la radiación visible y, en nuestro experimento, mantuvieron una temperatura menor.';
  else if(q.includes('factor')) a='Además del color, controlamos tiempo de exposición, material, intensidad del Sol, viento y tamaño.';
  else if(q.includes('aplica')||q.includes('vida')) a='El aprendizaje puede aplicarse a viviendas, ropa, vehículos, recipientes y otros objetos expuestos al Sol.';
  qs('#askAnswer').textContent=a; qs('#askAnswer').style.display='block';
});
renderSources();
