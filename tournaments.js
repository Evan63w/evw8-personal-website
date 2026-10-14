(() => {
  const KEY = 'evw8-vgc-tournament-history-v1';
  const seed = [
    {id:'mox-bellevue-2026-10-11',name:'MOX Bellevue Oct VG Challenge',date:'2026-10-11',location:'Bellevue, WA',product:'VGC',standing:'3 of 22',teamUrl:'',notes:''},
    {id:'marymoor-2026-10-13',name:'Marymoor October VG Challenge',date:'2026-10-13',location:'',product:'VGC',standing:'3 of 12',teamUrl:'',notes:''}
  ];
  const $ = id => document.getElementById(id);
  let events = read();
  function read(){try{const x=localStorage.getItem(KEY);return x?JSON.parse(x):seed.slice()}catch(_){return seed.slice()}}
  function save(){localStorage.setItem(KEY,JSON.stringify(events))}
  function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function rank(s){const m=String(s||'').match(/(\d+)\s*(?:\/|of)\s*\d+/i);return m?+m[1]:null}
  function fmt(s){if(!s)return '—';const d=new Date(s+'T12:00:00');return isNaN(d)?s:d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})}
  function sorted(){return [...events].sort((a,b)=>(b.date||'').localeCompare(a.date||''))}
  function years(){const el=$('year');const old=el.value;const ys=[...new Set(events.map(e=>(e.date||'').slice(0,4)).filter(y=>/^\d{4}$/.test(y)))].sort().reverse();el.innerHTML='<option value="all">All years</option>'+ys.map(y=>'<option>'+y+'</option>').join('');el.value=ys.includes(old)?old:'all'}
  function render(){
    years();const placed=events.map(e=>rank(e.standing)).filter(n=>n>0);$('count').textContent=events.length;$('podium').textContent=placed.filter(n=>n<=3).length;$('best').textContent=placed.length?Math.min(...placed):'—';$('recent').textContent=sorted()[0]?fmt(sorted()[0].date).replace(/, \d{4}$/,''):'—';
    const q=$('search').value.toLowerCase().trim(),yr=$('year').value;
    const list=sorted().filter(e=>(yr==='all'||(e.date||'').startsWith(yr))&&[e.name,e.location,e.product,e.standing,e.notes].some(x=>String(x||'').toLowerCase().includes(q)));
    $('shown').textContent=list.length+' of '+events.length+' events';$('empty').hidden=!!list.length;
    $('rows').innerHTML=list.map(e=>'<tr><td><strong>'+esc(e.name)+'</strong><div class="sub">'+esc(e.product||'Pokémon VGC')+'</div></td><td>'+esc(fmt(e.date))+'</td><td>'+esc(e.location||'—')+'</td><td><span class="rank">'+esc(e.standing||'Not recorded')+'</span></td><td>'+(e.teamUrl?'<a href="'+esc(e.teamUrl)+'" target="_blank" rel="noopener noreferrer">Team paste ↗</a><br>':'')+'<span class="sub">'+esc(e.notes||'No notes yet')+'</span></td><td><button class="mini" data-edit="'+esc(e.id)+'">Edit</button> <button class="mini" data-del="'+esc(e.id)+'">×</button></td></tr>').join('');
    $('rows').querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>edit(b.dataset.edit));$('rows').querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>del(b.dataset.del));
  }
  function form(e){$('editor').hidden=false;$('form-title').textContent=e?'Edit tournament':'Add tournament';$('id').value=e?.id||'';['name','date','location','product','standing','teamUrl','notes'].forEach(k=>$(k).value=e?.[k]||'');$('editor').scrollIntoView({behavior:'smooth'});}
  function edit(id){const e=events.find(x=>x.id===id);if(e)form(e)}
  function del(id){const e=events.find(x=>x.id===id);if(e&&confirm('Delete '+e.name+'?')){events=events.filter(x=>x.id!==id);save();render()}}
  function normalize(x){return {id:String(x.id||'event-'+Date.now()+'-'+Math.random().toString(36).slice(2,7)),name:String(x.name||x.event||x.tournamentName||''),date:date(x.date||x.datetime||x['Date/Time']),location:String(x.location||''),product:String(x.product||x.format||''),standing:String(x.standing||x.placement||x.result||''),teamUrl:String(x.teamUrl||x.teamURL||x.pokepaste||x.team||''),notes:String(x.notes||x.lesson||'')}}
  function date(s){if(!s)return '';s=String(s).trim();if(/^\d{4}-\d\d-\d\d/.test(s))return s.slice(0,10);const d=new Date(s);return isNaN(d)?'':d.toISOString().slice(0,10)}
  function importData(text){text=text.trim();if(!text)return 0;if(text[0]==='['||text[0]==='{'){const v=JSON.parse(text),arr=Array.isArray(v)?v:v.events;if(!Array.isArray(arr))throw Error('JSON must be an array or contain an events array.');arr.forEach(x=>events.push(normalize(x)));return arr.length}
    const lines=text.split(/\r?\n/).filter(Boolean),sep=lines[0].includes('\t')?'\t':',';
    const split=line=>{const a=[];let s='',q=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'&&line[i+1]==='"'&&q){s+='"';i++}else if(c==='"')q=!q;else if(c===sep&&!q){a.push(s.trim());s=''}else s+=c}a.push(s.trim());return a};
    const head=split(lines[0]).map(s=>s.toLowerCase().replace(/[^a-z0-9]/g,'')),known=['name','event','tournamentname','location','date','datetime','standing','placement','product','tournamentid'],has=head.some(x=>known.includes(x)),data=has?lines.slice(1):lines;
    const get=(c,keys,f)=>{if(!has)return c[f]||'';for(const k of keys){const i=head.indexOf(k);if(i>=0&&c[i])return c[i]}return ''};
    let n=0;data.forEach(line=>{const c=split(line),e=normalize({name:get(c,['name','event','tournamentname','tournament'],1),location:get(c,['location','city'],2),product:get(c,['product','format','game'],4),date:get(c,['date','datetime','eventdate'],3),standing:get(c,['standing','placement','result','rank'],5),id:get(c,['tournamentid','id'],0)});if(e.name){events.push(e);n++}});return n}
  $('add').onclick=()=>form(null);$('cancel').onclick=()=>{$('editor').hidden=true};
  $('event-form').onsubmit=e=>{e.preventDefault();const id=$('id').value||'event-'+Date.now();const v=normalize({id,name:$('name').value,date:$('date').value,location:$('location').value,product:$('product').value,standing:$('standing').value,teamUrl:$('teamUrl').value,notes:$('notes').value});const i=events.findIndex(x=>x.id===id);if(i>=0)events[i]=v;else events.push(v);save();$('editor').hidden=true;render()};
  $('search').oninput=render;$('year').onchange=render;
  $('export').onclick=()=>{const a=document.createElement('a'),u=URL.createObjectURL(new Blob([JSON.stringify(events,null,2)],{type:'application/json'}));a.href=u;a.download='vgc-tournament-history.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)};
  $('import').onclick=()=>{try{const n=importData($('paste').value);save();render();$('status').textContent='Imported '+n+' event(s).'}catch(e){$('status').textContent='Import failed: '+e.message}};
  $('file').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{$('paste').value=await f.text();const n=importData($('paste').value);save();render();$('status').textContent='Imported '+n+' event(s) from '+f.name+'.'}catch(err){$('status').textContent='Import failed: '+err.message}e.target.value=''};
  $('clear').onclick=()=>{if(confirm('Delete all saved tournament history from this browser? Export a backup first if needed.')){events=[];save();render();$('status').textContent='History cleared.'}};
  render();
})();