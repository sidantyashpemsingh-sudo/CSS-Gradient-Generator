const $=id=>document.getElementById(id);
const els={c1:$('c1'),c2:$('c2'),c3:$('c3'),angle:$('angle'),third:$('third')};
function value(){
  const cols=[els.c1.value,els.c2.value];
  if(els.third.checked)cols.push(els.c3.value);
  return `linear-gradient(${els.angle.value}deg, ${cols.join(', ')})`;
}
function render(){
  const v=value();
  $('preview').style.background=v;
  $('angleOut').textContent=els.angle.value+'°';
  $('c3wrap').hidden=!els.third.checked;
  $('css').textContent=`background: ${v};`;
}
const rnd=()=>'#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0');
$('random').onclick=()=>{els.c1.value=rnd();els.c2.value=rnd();els.c3.value=rnd();els.angle.value=Math.floor(Math.random()*361);render()};
Object.values(els).forEach(e=>e.addEventListener('input',render));
$('copy').onclick=async()=>{
  const text=$('css').textContent,b=$('copy');
  try{await navigator.clipboard.writeText(text)}catch(e){
    const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();
    try{document.execCommand('copy')}catch(_){}t.remove();
  }
  b.textContent='Copied';setTimeout(()=>b.textContent='Copy CSS',1500);
};
render();