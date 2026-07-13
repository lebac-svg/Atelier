(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function Gh(i){const t=new Set;for(const e of[i.levels,i.walls,i.openings,i.slabs,i.stairs,i.rooms,i.furniture])for(const n of e)t.add(n.id);for(const e of i.axes.x)t.add(e.id);for(const e of i.axes.y)t.add(e.id);for(const e of Object.keys(i.styles.openings))t.add(e);for(const e of Object.keys(i.finishes))t.add(e);return i.underlay&&t.add(i.underlay.id),t}function Hh(i,t){const e=Gh(i);let n=1;for(;e.has(`${t}${n}`);)n++;return`${t}${n}`}const rt=(i,t,e,n,s,r,a,o={})=>({id:i,label:t,labelEn:e,category:n,footprint:{w:s,d:r,h:a},...o}),Ss=[rt("giuong-1m","Giường đơn 1m","Single bed 1.0m","giuong",1e3,2e3,400,{clearance:{sides:600}}),rt("giuong-1m2","Giường đơn 1m2","Single bed 1.2m","giuong",1200,2e3,400,{clearance:{sides:600}}),rt("giuong-1m4","Giường đôi 1m4","Double bed 1.4m","giuong",1400,2e3,400,{clearance:{sides:600}}),rt("giuong-1m6","Giường đôi 1m6","Double bed 1.6m","giuong",1600,2e3,400,{clearance:{sides:600}}),rt("giuong-1m8","Giường đôi 1m8","Double bed 1.8m","giuong",1800,2e3,400,{clearance:{sides:600}}),rt("giuong-2m","Giường king 2m","King bed 2.0m","giuong",2e3,2200,400,{clearance:{sides:600}}),rt("giuong-tang-1m","Giường tầng trẻ em 1m","Kids bunk bed 1.0m","giuong-tang",1e3,2e3,1600,{clearance:{sides:600}}),rt("giuong-tang-1m2","Giường tầng 1m2","Bunk bed 1.2m","giuong-tang",1200,2e3,1700,{clearance:{sides:600}}),rt("noi-em-be","Nôi/cũi em bé","Baby crib","giuong",650,1200,900,{clearance:{sides:500}}),rt("tu-dau-giuong-40","Tủ đầu giường 40","Nightstand 40cm","tu-dau-giuong",400,400,450),rt("tu-dau-giuong-50","Tủ đầu giường 50","Nightstand 50cm","tu-dau-giuong",500,400,500),rt("tu-ao-1m","Tủ áo 1m","Wardrobe 1.0m","tu-ao",1e3,550,2200,{clearance:{front:600}}),rt("tu-ao-1m2","Tủ áo 1m2","Wardrobe 1.2m","tu-ao",1200,550,2200,{clearance:{front:600}}),rt("tu-ao-1m6","Tủ áo 1m6","Wardrobe 1.6m","tu-ao",1600,600,2400,{clearance:{front:600}}),rt("tu-ao-2m","Tủ áo 2m","Wardrobe 2.0m","tu-ao",2e3,600,2400,{clearance:{front:600}}),rt("tu-ao-2m4","Tủ áo 2m4 cửa lùa","Sliding-door wardrobe 2.4m","tu-ao",2400,650,2400,{clearance:{front:550}}),rt("ban-trang-diem","Bàn trang điểm","Dressing table","ban-trang-diem",1e3,450,750,{clearance:{front:600}}),rt("sofa-don","Ghế sofa đơn","Armchair","sofa",900,850,800),rt("sofa-2s","Sofa văng 2 chỗ","2-seat sofa","sofa",1500,850,800),rt("sofa-3s-01","Sofa văng 3 chỗ","3-seat sofa","sofa",1800,850,800),rt("sofa-3s-22","Sofa 3 chỗ lớn","Large 3-seat sofa","sofa",2200,900,800),rt("sofa-goc-l","Sofa góc chữ L","L-shaped corner sofa","sofa",2600,1600,800),rt("ban-tra-vuong","Bàn trà vuông 60","Square coffee table 60","ban-tra",600,600,420),rt("ban-tra-chu-nhat","Bàn trà 1m1","Coffee table 1.1m","ban-tra",1100,550,420),rt("ban-tra-tron","Bàn trà tròn 70","Round coffee table 70","ban-tra",700,700,450),rt("ke-tv-1200","Kệ TV 1m2","TV stand 1.2m","ke-tv",1200,400,500),rt("ke-tv-1600","Kệ TV 1m6","TV stand 1.6m","ke-tv",1600,450,500),rt("ke-tv-2000","Kệ TV 2m","TV stand 2.0m","ke-tv",2e3,450,500),rt("tu-giay-800","Tủ giày 80","Shoe cabinet 80cm","tu-giay",800,350,1e3),rt("tu-giay-1200","Tủ giày 1m2","Shoe cabinet 1.2m","tu-giay",1200,350,1100),rt("ban-an-2","Bàn ăn 2 chỗ","Dining table for 2","ban-an",800,800,750,{clearance:{front:800}}),rt("ban-an-4","Bàn ăn 4 chỗ","Dining table for 4","ban-an",1400,800,750,{clearance:{front:800}}),rt("ban-an-6","Bàn ăn 6 chỗ","Dining table for 6","ban-an",1800,900,750,{clearance:{front:800}}),rt("ban-an-8","Bàn ăn 8 chỗ","Dining table for 8","ban-an",2200,1e3,750,{clearance:{front:800}}),rt("ban-an-tron-1m","Bàn ăn tròn 1m","Round dining table 1.0m","ban-an",1e3,1e3,750,{clearance:{front:800}}),rt("ghe-an","Ghế ăn","Dining chair","ghe-an",450,500,900),rt("ghe-bang-an","Ghế băng ăn 1m4","Dining bench 1.4m","ghe-an",1400,350,450),rt("tu-bep-duoi-06","Tủ bếp dưới 60 (module)","Base kitchen cabinet 60 (module)","tu-bep-duoi",600,600,850,{clearance:{front:900}}),rt("tu-bep-duoi-12","Tủ bếp dưới 1m2","Base kitchen run 1.2m","tu-bep-duoi",1200,600,850,{clearance:{front:900}}),rt("tu-bep-duoi-18","Tủ bếp dưới 1m8 (kèm chậu)","Base kitchen run 1.8m (with sink)","tu-bep-duoi",1800,600,850,{clearance:{front:900}}),rt("tu-bep-duoi-24","Tủ bếp dưới 2m4 (kèm chậu + bếp nấu)","Base kitchen run 2.4m (sink + cooktop)","tu-bep-duoi",2400,600,850,{clearance:{front:900}}),rt("tu-bep-duoi-30","Tủ bếp dưới 3m (kèm chậu + bếp nấu)","Base kitchen run 3.0m (sink + cooktop)","tu-bep-duoi",3e3,600,850,{clearance:{front:900}}),rt("tu-bep-goc","Tủ bếp dưới góc L 1m8×1m8","L-shaped base kitchen 1.8×1.8m","tu-bep-duoi",1800,1800,850,{clearance:{front:900}}),rt("tu-bep-tren-06","Tủ bếp trên 60","Wall kitchen cabinet 0.6m","tu-bep-tren",600,350,700,{mountHeight:1450}),rt("tu-bep-tren-12","Tủ bếp trên 1m2","Wall kitchen cabinet 1.2m","tu-bep-tren",1200,350,700,{mountHeight:1450}),rt("tu-bep-tren-18","Tủ bếp trên 1m8","Wall kitchen cabinet 1.8m","tu-bep-tren",1800,350,700,{mountHeight:1450}),rt("tu-bep-tren-24","Tủ bếp trên 2m4","Wall kitchen cabinet 2.4m","tu-bep-tren",2400,350,700,{mountHeight:1450}),rt("tu-lanh-mini","Tủ lạnh mini","Mini fridge","tu-lanh",500,550,850),rt("tu-lanh","Tủ lạnh 2 cánh","Two-door fridge","tu-lanh",700,700,1700,{clearance:{front:700}}),rt("tu-lanh-sbs","Tủ lạnh side-by-side","Side-by-side fridge","tu-lanh",900,750,1800,{clearance:{front:700}}),rt("ban-hoc","Bàn học/làm việc 1m","Desk 1.0m","ban-lam-viec",1e3,500,750,{clearance:{front:750}}),rt("ban-lam-viec-1m2","Bàn làm việc 1m2","Desk 1.2m","ban-lam-viec",1200,600,750,{clearance:{front:750}}),rt("ban-lam-viec-1m4","Bàn làm việc 1m4","Desk 1.4m","ban-lam-viec",1400,700,750,{clearance:{front:750}}),rt("ghe-xoay","Ghế xoay văn phòng","Office swivel chair","ghe-xoay",600,600,1e3),rt("ke-sach-600","Kệ sách 60","Bookshelf 60cm","ke-sach",600,300,1800),rt("ke-sach-800","Kệ sách 80","Bookshelf 80cm","ke-sach",800,300,2e3),rt("ke-sach-1200","Kệ sách 1m2","Bookshelf 1.2m","ke-sach",1200,350,2e3),rt("bon-cau","Bồn cầu 2 khối","Two-piece toilet","bon-cau",400,700,780,{clearance:{front:500,sides:200}}),rt("bon-cau-1-khoi","Bồn cầu 1 khối","One-piece toilet","bon-cau",420,740,700,{clearance:{front:500,sides:200}}),rt("lavabo","Chậu rửa mặt","Washbasin","lavabo",550,420,850,{clearance:{front:550}}),rt("lavabo-tu","Lavabo kèm tủ 80","Vanity basin 80cm","lavabo",800,480,850,{clearance:{front:550}}),rt("lavabo-doi","Lavabo đôi 1m2","Double vanity 1.2m","lavabo",1200,500,850,{clearance:{front:550}}),rt("voi-sen","Khu tắm đứng vòi sen","Walk-in shower 90","voi-sen",900,900,2e3),rt("voi-sen-80","Khu tắm đứng 80","Walk-in shower 80","voi-sen",800,800,2e3),rt("bon-tam-15","Bồn tắm 1m5","Bathtub 1.5m","bon-tam",1500,750,600,{clearance:{front:600}}),rt("bon-tam-17","Bồn tắm 1m7","Bathtub 1.7m","bon-tam",1700,800,600,{clearance:{front:600}}),rt("guong-wc","Gương WC 60","Bathroom mirror 60","guong",600,50,800,{mountHeight:1e3}),rt("binh-nong-lanh","Bình nóng lạnh 20L","Water heater 20L","binh-nong-lanh",500,300,350,{mountHeight:1900}),rt("may-giat","Máy giặt cửa trước","Front-load washer","may-giat",600,600,850,{clearance:{front:600}}),rt("may-giat-cua-tren","Máy giặt cửa trên","Top-load washer","may-giat",550,600,950,{clearance:{front:400}}),rt("may-say","Máy sấy (chồng máy giặt)","Dryer (stacks on washer)","may-giat",600,600,850),rt("may-lanh-treo","Máy lạnh treo tường","Wall-mounted AC unit","may-lanh",800,250,300,{mountHeight:2500}),rt("may-lanh-dung","Máy lạnh tủ đứng","Floor-standing AC","may-lanh",500,350,1800),rt("quat-cay","Quạt cây","Pedestal fan","quat-cay",400,400,1300),rt("den-cay","Đèn cây góc","Floor lamp","den-cay",350,350,1600),rt("cay-canh-nho","Cây cảnh chậu nhỏ","Potted plant (small)","cay-canh",350,350,900),rt("cay-canh-lon","Cây cảnh chậu lớn","Potted plant (large)","cay-canh",550,550,1700),rt("guong-toan-than","Gương toàn thân","Full-length mirror","guong",500,50,1600,{mountHeight:200}),rt("xe-may","Xe máy tay ga","Scooter","xe-may",700,1900,1100,{clearance:{sides:300}}),rt("xe-may-so","Xe máy số","Motorbike","xe-may",650,1850,1050,{clearance:{sides:300}}),rt("xe-dap","Xe đạp","Bicycle","xe-dap",450,1700,1e3),rt("o-to-hatchback","Ô tô hatchback (chỗ đậu)","Hatchback car (parking spot)","o-to",1800,4e3,1500,{clearance:{front:600,sides:500}}),rt("o-to-sedan","Ô tô sedan (chỗ đậu)","Sedan (parking spot)","o-to",1850,4600,1500,{clearance:{front:600,sides:500}}),rt("ban-tho","Bàn thờ đứng 1m07","Ancestral altar 1.07m","ban-tho",1070,610,1270,{clearance:{front:900}}),rt("ban-tho-1m53","Bàn thờ đứng 1m53","Ancestral altar 1.53m","ban-tho",1530,810,1270,{clearance:{front:900}}),rt("ban-tho-treo","Bàn thờ treo 81","Wall-mounted altar 81cm","ban-tho",810,480,610,{mountHeight:1550})],Wh=[["giuong-1m6","-go-soi"," — gỗ sồi"," — oak"],["giuong-1m6","-go-oc-cho"," — gỗ óc chó"," — walnut"],["giuong-1m8","-go-soi"," — gỗ sồi"," — oak"],["tu-ao-2m","-trang"," — trắng sữa"," — milk white"],["tu-ao-2m","-go-oc-cho"," — gỗ óc chó"," — walnut"],["tu-ao-1m6","-trang"," — trắng sữa"," — milk white"],["sofa-3s-01","-xam"," — nỉ xám"," — grey fabric"],["sofa-3s-01","-da-nau"," — da nâu"," — brown leather"],["sofa-goc-l","-xam"," — nỉ xám"," — grey fabric"],["ban-an-4","-go-soi"," — gỗ sồi"," — oak"],["ban-an-6","-go-soi"," — gỗ sồi"," — oak"],["ghe-an","-den"," — chân sắt đen"," — black steel legs"],["ke-tv-1600","-trang"," — trắng sữa"," — milk white"],["ke-tv-2000","-go-oc-cho"," — gỗ óc chó"," — walnut"],["ban-lam-viec-1m2","-trang"," — trắng sữa"," — milk white"],["ke-sach-800","-trang"," — trắng sữa"," — milk white"],["tu-bep-duoi-24","-trang"," — trắng bóng"," — gloss white"],["tu-bep-duoi-30","-xanh-reu"," — xanh rêu"," — moss green"],["tu-bep-tren-18","-trang"," — trắng bóng"," — gloss white"],["ban-tra-chu-nhat","-da"," — mặt đá"," — stone top"]];for(const[i,t,e,n]of Wh){const s=Ss.find(r=>r.id===i);s&&Ss.push({...s,id:`${i}${t}`,label:`${s.label}${e}`,labelEn:`${s.labelEn}${n}`})}const Xh=new Map(Ss.map(i=>[i.id,i]));function Ur(i){return Xh.get(i)}[...new Set(Ss.map(i=>i.category))];const qh=i=>i.some(t=>t.severity==="block"),mi=(i,t)=>[i[0]+t[0],i[1]+t[1]],_i=(i,t)=>[i[0]-t[0],i[1]-t[1]],_s=(i,t)=>[i[0]*t,i[1]*t],gn=(i,t)=>i[0]*t[0]+i[1]*t[1],Rc=i=>Math.hypot(i[0],i[1]),Yh=(i,t)=>Rc(_i(i,t));function $h(i){const t=Rc(i);return t===0?[0,0]:[i[0]/t,i[1]/t]}const Kh=i=>[-i[1],i[0]];function pn(i,t){const e=t*Math.PI/180,n=Math.cos(e),s=Math.sin(e);return[i[0]*n-i[1]*s,i[0]*s+i[1]*n]}function Zh(i){let t=0;for(let e=0;e<i.length;e++){const n=i[e],s=i[(e+1)%i.length];t+=n[0]*s[1]-s[0]*n[1]}return t/2}const jh=i=>Math.abs(Zh(i)),Jh=i=>Math.round(jh(i)/1e5)/10,Pc=i=>Yh(i.from,i.to),Ms=i=>$h(_i(i.to,i.from)),Lc=i=>Kh(Ms(i));function Qh(i,t,e=.5){const n=Ms(i),s=Ms(t);return Math.abs(n[0]*s[1]-n[1]*s[0])<Math.sin(e*Math.PI/180)}function tu(i,t,e){const n=[],s=e.map(a=>({u0:Math.max(0,a.offset),u1:Math.min(i,a.offset+a.width),sill:Math.max(0,a.sill),top:Math.min(t,Math.max(0,a.sill)+a.height)})).filter(a=>a.u1>a.u0&&a.top>a.sill).sort((a,o)=>a.u0-o.u0);let r=0;for(const a of s){const o=Math.max(r,a.u0);o>=a.u1||(o>r&&n.push({u0:r,u1:o,z0:0,z1:t,part:"than"}),a.sill>0&&n.push({u0:o,u1:a.u1,z0:0,z1:a.sill,part:"bau"}),a.top<t&&n.push({u0:o,u1:a.u1,z0:a.top,z1:t,part:"lanh-to"}),r=a.u1)}return r<i&&n.push({u0:r,u1:i,z0:0,z1:t,part:"than"}),n}function eu(i){return[[-i.halfW,-i.halfD],[i.halfW,-i.halfD],[i.halfW,i.halfD],[-i.halfW,i.halfD]].map(e=>mi(i.center,pn(e,i.rotation)))}function nu(i,t){const e=i.width,n=i.tread,s=i.steps-1,r=t.height/i.steps,a=f=>mi(i.origin,pn(f,i.rotation)),o=(f,g,v,m)=>[[f,g],[v,g],[v,m],[f,m]].map(p=>a(p));if(i.type==="1-ve"){const f=s*n;return{riser:r,treadsTotal:s,flights:[{treads:s,firstStep:1,rect:o(0,0,e,f),start:a([e/2,0]),dir:pn([0,1],i.rotation)}],footprint:o(0,0,e,f),topExit:{at:a([e/2,f]),dir:pn([0,1],i.rotation)}}}const l=i.landing??e,c=Math.ceil(s/2),h=s-c,u=c*n,d=h*n;return i.type==="2-ve-U"?{riser:r,treadsTotal:s,flights:[{treads:c,firstStep:1,rect:o(0,0,e,u),start:a([e/2,0]),dir:pn([0,1],i.rotation)},{treads:h,firstStep:c+1,rect:o(-e,u-d,0,u),start:a([-e/2,u]),dir:pn([0,-1],i.rotation)}],landing:o(-e,u,e,u+l),footprint:o(-e,Math.min(0,u-d),e,u+l),topExit:{at:a([-e/2,u-d]),dir:pn([0,-1],i.rotation)}}:{riser:r,treadsTotal:s,flights:[{treads:c,firstStep:1,rect:o(0,0,e,u),start:a([e/2,0]),dir:pn([0,1],i.rotation)},{treads:h,firstStep:c+1,rect:o(-d,u,0,u+l),start:a([0,u+l/2]),dir:pn([-1,0],i.rotation)}],landing:o(0,u,e,u+l),footprint:o(-d,0,e,u+l),topExit:{at:a([-d,u+l/2]),dir:pn([-1,0],i.rotation)}}}const iu="2026-H2",su="Đơn giá THAM KHẢO thị trường xây nhà phố Việt Nam nửa cuối 2026 — chưa đối chiếu báo giá thầu thật (tham_khao=true). Dự toán sơ bộ sai số ±15–20%. SỬA FILE NÀY theo địa phương và thời điểm của bạn: đơn giá vnd là đồng/m² sàn quy đổi.",ru=!0,au={xay_tho:{label:"Phần thô + nhân công hoàn thiện",vnd:38e5},hoan_thien:{"co-ban":{label:"Hoàn thiện cơ bản",vnd:28e5},"trung-binh-kha":{label:"Hoàn thiện trung bình khá",vnd:35e5},"cao-cap":{label:"Hoàn thiện cao cấp",vnd:55e5}}},ou={mong:{label:"Móng (băng/đơn, gia cố thường)",he_so:.4},san:{label:"Sàn các tầng có mái che",he_so:1},mai_btct:{label:"Mái BTCT / sân thượng",he_so:.5},o_trong_lon:{label:"Ô trống thông tầng/giếng trời ≥ ngưỡng — phần vượt tính nửa",he_so:.5,nguong_m2:8}},lu={version:iu,ghi_chu:su,tham_khao:ru,don_gia_m2:au,he_so_quy_doi:ou},cu=lu;structuredClone(cu);const hu={level:"tầng",wall:"tường",opening:"cửa",slab:"sàn",stair:"thang",room:"phòng",furniture:"nội thất",axis:"trục",style:"kiểu cửa",finish:"vật liệu",underlay:"underlay đồ lại"},uu={level:"levels",wall:"walls",opening:"openings",slab:"slabs",stair:"stairs",room:"rooms",furniture:"furniture"};function dl(i){return typeof i=="string"?i:Array.isArray(i)||typeof i=="object"&&i!==null?JSON.stringify(i):String(i)}function du(i,t,e){const n=uu[t];return n?i[n].find(r=>r.id===e)??null:t==="axis"?[...i.axes.x,...i.axes.y].find(s=>s.id===e)??null:t==="style"?i.styles.openings[e]??null:t==="finish"?i.finishes[e]??null:t==="underlay"&&i.underlay?.id===e?i.underlay:null}function fu(i,t){const e=hu[i.entity]??i.entity;if(i.op==="add"){const n=String(i.data.id??"?");return`thêm ${i.entity==="opening"&&i.data.kind==="window"?"cửa sổ":e} ${n}`}if(i.op==="update"){const n=Object.keys(i.data).filter(a=>a!=="id"),s=t?du(t,i.entity,i.id):null,r=n.map(a=>{const o=dl(i.data[a]);if(!s||!(a in s))return`${a}: ${o}`;const l=dl(s[a]);return l===o?`${a}: ${o} (không đổi)`:`${a}: ${l} → ${o}`}).join(", ");return`sửa ${e} ${i.id} (${r})`}return`xóa ${e} ${i.id}`}function fl(i,t){return i.map(e=>fu(e,t)).join("; ")}const Dc={level:"levels",wall:"walls",opening:"openings",slab:"slabs",stair:"stairs",room:"rooms",furniture:"furniture"},ne=(i,t,e,n)=>({rule:i,severity:t,entities:e,message:n});function pu(i,t,e,n={}){if(t!==i.meta.revision)return{ok:!1,currentRevision:i.meta.revision,errors:[ne("REV-01","block",[],`baseRevision ${t} đã cũ — revision hiện tại là ${i.meta.revision}. Gọi get_changes_since(${t}) để xem thay đổi rồi gửi lại.`)]};if(e.length===0)return{ok:!1,currentRevision:i.meta.revision,errors:[ne("OPS-00","block",[],"Batch rỗng — không có op nào để áp.")]};const s=structuredClone(i),r=[];for(const a of e){const o=mu(s,a);if(o){r.push(o);break}}if(r.length===0&&n.validate){const a=n.validate(s);return qh(a)?{ok:!1,currentRevision:i.meta.revision,errors:a.filter(o=>o.severity==="block")}:(s.meta.revision=t+1,{ok:!0,project:s,revision:s.meta.revision,warnings:a,summary:fl(e,i)})}return r.length>0?{ok:!1,currentRevision:i.meta.revision,errors:r}:(s.meta.revision=t+1,{ok:!0,project:s,revision:s.meta.revision,warnings:[],summary:fl(e,i)})}function mu(i,t){switch(t.entity){case"style":return ml(i,t,"style");case"finish":return ml(i,t,"finish");case"axis":return vu(i,t);case"underlay":return _u(i,t);default:return gu(i,t)}}function No(i){const t=new Set;for(const e of Object.values(Dc))for(const n of i[e])t.add(n.id);for(const e of i.axes.x)t.add(e.id);for(const e of i.axes.y)t.add(e.id);for(const e of Object.keys(i.styles.openings))t.add(e);for(const e of Object.keys(i.finishes))t.add(e);return i.underlay&&t.add(i.underlay.id),t}function gu(i,t){const e=t.entity,n=Dc[e];if(!n)return ne("OPS-01","block",[],`Loại thực thể không hợp lệ: ${String(t.entity)}.`);const s=i[n];if(t.op==="add"){const a=t.data.id;if(typeof a!="string"||a.length===0)return ne("OPS-02","block",[],`Op add ${e} thiếu data.id (client phải tự tạo ID).`);if(No(i).has(a))return ne("OPS-02","block",[a],`ID ${a} đã tồn tại — chọn ID khác (vd. dùng nextId).`);const o=pl(i,e,t.data,a);return o||(s.push(structuredClone(t.data)),null)}const r=s.findIndex(a=>a.id===t.id);if(r<0)return ne("OPS-03","block",[t.id],`Không tìm thấy ${e} ${t.id}.`);if(t.op==="update"){if("id"in t.data&&t.data.id!==t.id)return ne("OPS-03","block",[t.id],`Không được đổi id qua update (${t.id} → ${String(t.data.id)}).`);const a={...s[r],...structuredClone(t.data),id:t.id},o=pl(i,e,a,t.id);return o||(s[r]=a,null)}return e==="level"&&[...i.walls,...i.rooms,...i.slabs,...i.stairs,...i.furniture].some(o=>o.level===t.id)?ne("OPS-04","block",[t.id],`Level ${t.id} còn thực thể — xóa/di dời chúng trước.`):(e==="wall"&&(i.openings=i.openings.filter(a=>a.wall!==t.id)),s.splice(r,1),null)}function pl(i,t,e,n){const s=new Set(i.levels.map(r=>r.id));if(t!=="level"&&t!=="opening"){const r=e.level;if(typeof r!="string"||!s.has(r))return ne("OPS-05","block",[n],`${t} ${n} trỏ level không tồn tại: ${String(r)}.`)}if(t==="opening"){const r=e.wall;if(typeof r!="string"||!i.walls.some(o=>o.id===r))return ne("OPS-06","block",[n],`Opening ${n} neo vào tường không tồn tại: ${String(r)}.`);const a=e.style;if(typeof a!="string"||!(a in i.styles.openings))return ne("OPS-06","block",[n],`Opening ${n} dùng style không tồn tại: ${String(a)}.`)}if(t==="furniture"){const r=e.asset;if(typeof r!="string"||!Ur(r))return ne("OPS-07","block",[n],`Furniture ${n} dùng asset không có trong catalog: ${String(r)}.`)}return null}function ml(i,t,e){const n=e==="style"?i.styles.openings:i.finishes;if(t.op==="add"){const{id:s,...r}=t.data;return typeof s!="string"||s.length===0?ne("OPS-02","block",[],`Op add ${e} thiếu data.id.`):No(i).has(s)?ne("OPS-02","block",[s],`ID ${s} đã tồn tại.`):(n[s]=structuredClone(r),null)}if(!(t.id in n))return ne("OPS-03","block",[t.id],`Không tìm thấy ${e} ${t.id}.`);if(t.op==="update"){const{id:s,...r}=t.data;return n[t.id]={...n[t.id],...structuredClone(r)},null}return e==="style"&&i.openings.some(s=>s.style===t.id)?ne("OPS-05","block",[t.id],`Style ${t.id} đang được opening sử dụng.`):e==="finish"&&i.rooms.some(s=>Object.values(s.finish??{}).includes(t.id))?ne("OPS-05","block",[t.id],`Finish ${t.id} đang được phòng sử dụng.`):(delete n[t.id],null)}function _u(i,t){if(t.op==="add"){if(i.underlay)return ne("OPS-02","block",[i.underlay.id],"Đã có underlay — dùng update để đổi phép đặt/file, hoặc delete rồi add.");const e=t.data;return e.id!=="U1"?ne("OPS-02","block",[],'Underlay là singleton — data.id phải là "U1".'):e.kind!=="dxf"&&e.kind!=="image"?ne("OPS-08","block",["U1"],'Underlay cần data.kind = "dxf" | "image".'):typeof e.source!="string"||e.source.length===0?ne("OPS-08","block",["U1"],"Underlay thiếu data.source (file trong .atelier/underlay/)."):typeof e.scale!="number"||!(e.scale>0)?ne("OPS-08","block",["U1"],"Underlay cần data.scale > 0 (mm model trên một đơn vị nguồn)."):e.level!==void 0&&!i.levels.some(n=>n.id===e.level)?ne("OPS-05","block",["U1"],`Underlay trỏ level không tồn tại: ${String(e.level)}.`):(i.underlay=structuredClone(t.data),null)}if(!i.underlay||i.underlay.id!==t.id)return ne("OPS-03","block",[t.id],`Không tìm thấy underlay ${t.id}.`);if(t.op==="update"){if("id"in t.data&&t.data.id!==t.id)return ne("OPS-03","block",[t.id],`Không được đổi id qua update (${t.id} → ${String(t.data.id)}).`);const e={...i.underlay,...structuredClone(t.data),id:t.id};return e.level!==void 0&&!i.levels.some(n=>n.id===e.level)?ne("OPS-05","block",[t.id],`Underlay trỏ level không tồn tại: ${String(e.level)}.`):(i.underlay=e,null)}return delete i.underlay,null}function vu(i,t){if(t.op==="add"){const{id:e,dir:n}=t.data;return typeof e!="string"||e.length===0?ne("OPS-02","block",[],"Op add axis thiếu data.id."):n!=="x"&&n!=="y"?ne("OPS-08","block",[e],`Axis ${e} cần data.dir = "x" | "y".`):No(i).has(e)?ne("OPS-02","block",[e],`ID ${e} đã tồn tại.`):(i.axes[n].push(structuredClone(t.data)),null)}for(const e of["x","y"]){const n=i.axes[e].findIndex(s=>s.id===t.id);if(n>=0)return t.op==="update"?i.axes[e][n]={...i.axes[e][n],...structuredClone(t.data),id:t.id}:i.axes[e].splice(n,1),null}return ne("OPS-03","block",[t.id],`Không tìm thấy axis ${t.id}.`)}const xu=[{id:"GEO-01",title:"Opening nằm trọn trong chiều dài tường",severity:"block",source:{vanBan:"hình học nội tại",verified:!0},message:"Cửa {opening} (rộng {width}, offset {offset}) vượt ra ngoài tường {wall} (dài {len})."},{id:"GEO-02",title:"Hai opening cùng tường không chồng nhau",severity:"block",source:{vanBan:"hình học nội tại",verified:!0},message:"{a} và {b} chồng nhau {overlap}mm trên tường {wall}."},{id:"GEO-03",title:"Hai tường song song không đè lên nhau",severity:"error",source:{vanBan:"hình học nội tại",verified:!0},message:"Tường {a} và {b} song song đè nhau: tim cách {dist}mm < {minDist}mm (tổng nửa dày)."},{id:"GEO-04",title:"Nội thất không đè nhau / đè tường",severity:"error",params:{tolerance:10},source:{vanBan:"hình học nội tại",verified:!0},message:"{a} đè lên {b} ({depth}mm)."},{id:"GEO-05",title:"Polygon khép kín, không tự cắt",severity:"block",source:{vanBan:"hình học nội tại",verified:!0},message:"Polygon của {entity} tự cắt hoặc suy biến — sửa lại thứ tự đỉnh."},{id:"GEO-06",title:"Cung mở cửa không vướng tường/nội thất",severity:"warn",params:{tolerance:10},source:{vanBan:"thực hành thiết kế",verified:!0},message:"Cung mở cửa {opening} vướng {obstacle}."},{id:"GEO-07",title:"Vế trên + chiếu nghỉ thang nằm trong lỗ sàn tầng trên",severity:"warn",source:{vanBan:"TCVN 13967:2024 (thông thủy cầu thang ≥ 2000)",dieu:"5.11",verified:!0},message:"Thang {stair}: phần lộ thiên (vế trên/chiếu nghỉ) không nằm trong lỗ sàn {slab} — người đi sẽ đụng đầu (thông thủy phải ≥ 2000mm). v2 sẽ kiểm headroom chính xác."},{id:"GEO-08",title:"Tường nằm trong ranh đất (khoảng lùi → PLN-01/02)",severity:"error",source:{vanBan:"hình học nội tại",verified:!0},message:"Tường {wall} {detail}."}],yu={rules:xu},Su=[{id:"STD-01",title:"Diện tích sử dụng tối thiểu của phòng",severity:"warn",params:{ngu_don:9,ngu_doi:12,khach:13,bep_an:12,wc:3,kho:3},source:{vanBan:"TCVN 13967:2024",dieu:"Bảng 1",verified:!0},message:"Phòng {ten} ({room}) {area}m² — dưới mức tối thiểu {min}m² ({loai}).",note:"Phòng ngủ phân loại theo giường đang kê trong phòng: giường ≥1m4 tính là giường đôi (12m²), còn lại tính giường đơn (9m²)."},{id:"STD-02",title:"Bề rộng thông thủy phòng ở",severity:"warn",params:{min:2100},source:{vanBan:"khuyến nghị tiện nghi Atelier — đã rà TCVN 13967:2024 (13/07/2026): chuẩn KHÔNG quy định bề rộng phòng",verified:!0},message:"Phòng {ten} ({room}) bề rộng {width}mm < {min}mm.",note:"Không phải số bắt buộc theo chuẩn — ngưỡng tiện nghi (giường 2m + lối đi tối thiểu). v1 đo theo OBB nhỏ nhất — phòng chữ L lấy bề rộng bao, v2 dùng trục trung tuyến."},{id:"STD-03",title:"Chiều cao thông thủy",severity:"error",params:{phong_o:2600,bep_an:2600,wc:2300,kho:2200},source:{vanBan:"TCVN 13967:2024",dieu:"5.9",verified:!0},message:"{ten} ({room}): cao thông thủy tầng {level} = {clear}mm < {min}mm.",note:"13967: ở/ăn ≥2600, bếp/VS ≥2300 — bếp liền ăn lấy 2600 thiên an toàn. Kho 2200 theo TCVN 9411:2012 (13967 chỉ nêu hầm ≥2000)."},{id:"STD-04",title:"Bề rộng hành lang/lối đi",severity:"error",params:{min:1e3},source:{vanBan:"TCVN 13967:2024",dieu:"đường thoát nạn — đoạn nằm ngang",verified:!0},message:"Hành lang {ten} ({room}) rộng {width}mm < {min}mm."},{id:"STD-05",title:"Bề rộng cửa đi",severity:"error",params:{chinh:800,chinh_khuyen:900,phong:700,wc:600},source:{vanBan:"TCVN 13967:2024 (lối ra thoát nạn ≥800); cửa phòng 700/WC 600 = khuyến nghị thực hành — đã rà 13967: không quy định riêng (13/07/2026)",verified:!0},message:"Cửa {opening} ({loai}) rộng {width}mm < {min}mm."},{id:"STD-06",title:"Kích thước thang",severity:"error",params:{riser_min:50,riser_max:220,riser_khuyen:190,tread_min:250,ve_min:700,ve_khuyen:900,buoc_min:550,buoc_max:700},source:{vanBan:"TCVN 13967:2024",dieu:"5.11",verified:!0},message:"Thang {stair}: {detail}.",note:"Vế ≥700 theo 13967; mức khuyên 900 theo TCVN 9411:2012 (thang thoát nạn nhà liên kế). Bậc >190 chỉ cảnh báo (13967 'khuyến khích ≤190')."},{id:"STD-07",title:"Chiều cao lan can",severity:"error",status:"planned",params:{cau_thang:900,ban_cong_hanh_lang_mai:1100,lo_gia_san_thuong_tu_tang_9:1400,khe_ho_max:100},source:{vanBan:"QCXDVN 05:2008/BXD (bảng lan can: thang/dốc ≥900, vị trí khác ≥1100, lô gia+sân thượng từ tầng 9 ≥1400, khe không lọt cầu ⌀100, không tạo chỗ trèo) + TCVN 13967:2024 5.11 (thang ≥900)",verified:!0},message:"Lan can {entity} cao {height}mm < {min}mm.",note:"Số đã chốt đủ nhưng schema v1 chưa có thực thể lan can — bật ở P4 cùng mặt đứng/mặt cắt. Cửa sổ tầng cao đã có STD-08 đỡ."},{id:"STD-08",title:"Cửa sổ bậu thấp ở tầng cao — an toàn trẻ em",severity:"warn",params:{sill_min:900},source:{vanBan:"QCXDVN 05:2008/BXD — bộ phận mở được phải có rào chắn/lan can ≥900 (đối chiếu 13/07/2026)",verified:!0},message:"Cửa sổ {opening} bậu {sill}mm < {min}mm ở {level} (tầng cao) mà chưa có lan can bảo vệ.",note:"Schema v1 chưa mô tả được lan can cửa sổ nên bậu <900 ở tầng cao luôn nhắc — người dùng tự kiểm nếu đã có rào chắn rời."},{id:"STD-09",title:"Phòng ở có lấy sáng tự nhiên",severity:"warn",source:{vanBan:"TCVN 13967:2024",dieu:"5.8",verified:!0},message:"Phòng {ten} ({room}) không có cửa sổ hay giếng trời lấy sáng — nhà ống nên cân nhắc giếng trời/thông tầng."},{id:"STD-10",title:"Cửa WC không mở thẳng vào khu bếp",severity:"warn",source:{vanBan:"thực hành + phong tục VN",verified:!0},message:"Cửa {opening} của WC mở thẳng vào khu bếp/ăn ({room}) — nên đổi hướng hoặc thêm khoảng đệm."},{id:"STD-11",title:"Lối đi tối thiểu quanh nội thất",severity:"info",params:{giuong:600,bep_truoc:900,bon_cau_truoc:500},source:{vanBan:"quy ước công thái học nội thất (Neufert) — TCVN không quy định, mức advisory",verified:!0},message:"{item}: {detail}."}],Mu={rules:Su},bu=[{id:"LBB-01",title:"Thông thủy cửa theo thước Lỗ Ban 52.2cm",severity:"info",source:{vanBan:"thước cuộn Lỗ Ban lưu hành — đối chiếu chéo 3 nguồn 13/07/2026: chu kỳ 520mm, 8 cung × 65mm",verified:!0},message:"Thông thủy {dim} cửa {opening} = {value}mm rơi cung {cung} (xấu) theo thước 52.2cm.",note:"Cung thứ 5 'Nhân Lộc' — một số nguồn ghi 'Phúc Lộc' (cùng cung, cùng nghĩa tốt)."},{id:"LBB-02",title:"Khối xây (bệ/tủ bếp, bậc) theo thước Lỗ Ban 42.9cm",severity:"info",source:{vanBan:"thước cuộn Lỗ Ban lưu hành — chu kỳ 429mm, 8 cung; đối chiếu 13/07/2026",verified:!0},message:"{item} cạnh {value}mm rơi cung {cung} (xấu) theo thước 42.9cm.",note:"Biến thể tên cung 6/8 ở vài nguồn: Kiếp/Nạn, Bản/Mạng — cùng vị trí, cùng tốt-xấu."},{id:"LBB-03",title:"Gợi ý kích thước vào cung đẹp gần nhất",severity:"info",source:{vanBan:"dẫn xuất từ LBB-01/02/04",verified:!0},message:"{item}: {value}mm → {suggest}mm vào cung {cungTot} (chênh {delta}mm)."},{id:"LBB-04",title:"Bàn thờ, đồ thờ theo thước Lỗ Ban 38.8cm",severity:"info",source:{vanBan:"thước cuộn Đinh Lan 38.8/39cm lưu hành — 10 cung × 39mm; tốt: Đinh, Vượng, Nghĩa, Quan, Hưng, Tài; đối chiếu 13/07/2026",verified:!0},message:"{item} cạnh {value}mm rơi cung {cung} (xấu) theo thước 38.8cm — đồ thờ nên vào cung đỏ."}],Eu={rules:bu},Tu=[{id:"PLN-01",title:"Khoảng lùi ranh TRƯỚC",severity:"error",source:{vanBan:"Quy hoạch địa phương — người dùng khai trong brief (pha A)",verified:!0},message:"Tường {wall} cách ranh trước {dist}mm — phạm khoảng lùi trước {lui}mm khai trong brief."},{id:"PLN-02",title:"Khoảng lùi ranh SAU",severity:"error",source:{vanBan:"Quy hoạch địa phương — người dùng khai trong brief (pha A)",verified:!0},message:"Tường {wall} cách ranh sau {dist}mm — phạm khoảng lùi sau {lui}mm khai trong brief."},{id:"PLN-03",title:"Mật độ xây dựng tối đa",severity:"error",source:{vanBan:"Quy hoạch địa phương — người dùng khai trong brief (pha A)",verified:!0},message:"Mật độ xây dựng {pct}% vượt tối đa {max}% khai trong brief."},{id:"PLN-04",title:"Số tầng tối đa",severity:"error",source:{vanBan:"Quy hoạch địa phương — người dùng khai trong brief (pha A)",verified:!0},message:"Số tầng {n} vượt tối đa {max} khai trong brief."},{id:"PLN-05",title:"Chiều cao công trình tối đa",severity:"error",source:{vanBan:"Quy hoạch địa phương — người dùng khai trong brief (pha A)",verified:!0},message:"Đỉnh công trình +{top}mm vượt chiều cao tối đa {max}mm khai trong brief."},{id:"PLN-06",title:"Ô văng/mái vươn ra ngoài ranh trước tối đa",severity:"error",source:{vanBan:"Quy hoạch địa phương — người dùng khai trong brief (pha A)",verified:!0},message:"{slab} vươn ra ngoài ranh trước {vuon}mm — quá mức ô văng tối đa {max}mm khai trong brief."}],Au={rules:Tu},wu=yu,Cu=Mu,Ru=Eu,Pu=Au,Lu=[...wu.rules,...Cu.rules,...Ru.rules,...Pu.rules];new Map(Lu.map(i=>[i.id,i]));class Du{model=null;issues=[];activeLevel=null;view="split";selection=null;handlers=new Map;on(t,e){this.handlers.has(t)||this.handlers.set(t,new Set),this.handlers.get(t).add(e)}emit(t,e){for(const n of this.handlers.get(t)??[])n(e)}get revision(){return this.model?.meta.revision??-1}setSnapshot(t){this.model=t.model;const e=[...t.model.levels].sort((n,s)=>n.elevation-s.elevation);(!this.activeLevel||!e.some(n=>n.id===this.activeLevel))&&(this.activeLevel=e[0]?.id??null),this.emit("snapshot",{model:t.model})}applyPatch(t){if(!this.model){this.emit("resync",{});return}const e=pu(this.model,t.revision-1,t.ops);if(!e.ok){this.emit("resync",{});return}this.model=e.project,this.emit("patch",{revision:t.revision,ops:t.ops,origin:t.origin,...t.note?{note:t.note}:{},...t.summary?{summary:t.summary}:{},changedIds:Iu(t.ops)})}setValidation(t){this.issues=t.issues,this.emit("validation",{revision:t.revision,issues:t.issues})}setLevel(t){t!==this.activeLevel&&(this.activeLevel=t,this.emit("level",{level:t}))}setView(t){t!==this.view&&(this.view=t,this.emit("view",{view:t}))}select(t){this.selection=t,this.emit("select",{id:t})}findEntity(t){const e=this.model;if(!e)return null;const n=[["Tường","wall",e.walls],["Cửa","opening",e.openings],["Sàn","slab",e.slabs],["Thang","stair",e.stairs],["Phòng","room",e.rooms],["Nội thất","furniture",e.furniture],["Tầng","level",e.levels]];for(const[s,r,a]of n){const o=a.find(l=>l.id===t);if(o)return{kind:s,entity:r,data:o}}return null}}function Iu(i){const t=new Set;for(const e of i)e.op==="add"?typeof e.data.id=="string"&&t.add(e.data.id):t.add(e.id);return[...t]}const Ic={"app.connecting":"đang kết nối…","conn.on":"trực tiếp","conn.connecting":"đang nối…","conn.off":"mất kết nối — tự nối lại…","view.plan":"Mặt bằng","view.3d":"3D","view.split":"Chia đôi","share.btn":"chia sẻ","share.title":"Copy link CHỈ-XEM gửi người thân — họ thấy live nhưng không sửa được; thu hồi link: POST /share/rotate","share.copied":`Đã copy link chỉ-xem — gửi cho người thân cùng ngắm:
{url}`,"share.error":"Không lấy được link chia sẻ — thử tải lại trang.","lang.title":"Switch interface language to English","tool.select":"Chọn / di chuyển — kéo tường, cửa, nội thất; đang kéo gõ số để chốt chính xác; Alt bỏ snap; R xoay nội thất đang chọn","tool.wall":"Vẽ tường — giai đoạn sau","tool.door":"Đặt cửa đi — giai đoạn sau","tool.window":"Đặt cửa sổ — giai đoạn sau","tool.room":"Vẽ phòng — giai đoạn sau","tool.furniture":"Nội thất — mở catalog, chọn món rồi click vào mặt bằng để đặt; Esc/V để thôi","tool.measure":"Đo — giai đoạn sau","tool.locked":"Link chia sẻ chỉ-xem — không sửa được","pane2d.empty":"Đang chờ dự án — Claude sẽ dựng đến đâu, bản vẽ mọc đến đó.","pane2d.hint":"kéo đối tượng — di chuyển · gõ số khi kéo — chốt chính xác · Alt — bỏ snap",fit2d:"khớp khung","fit2d.title":"Khớp bản vẽ vào khung","walk.btn":"đi bộ","walk.title":"Đi bộ trong nhà — WASD di chuyển, chuột nhìn, Shift chạy, Esc thoát","walk.hint":"WASD — di chuyển · chuột — nhìn · Shift — chạy · Esc — thoát","sun.btn":"nắng","sun.title":"Xem nắng theo giờ + tháng (vĩ độ lấy từ brief)","sun.hour":"giờ","sun.month":"tháng",reset3d:"về góc chuẩn","reset3d.title":"Về góc nhìn mặc định","hint3d.orbit":"kéo — xoay · lăn — zoom · chuột phải — trượt","panel.props":"Thuộc tính","panel.issues":"Kiểm tra","props.empty":"Chạm một đối tượng trên bản vẽ để xem thông số.","props.empty.sub":"Kéo để di chuyển — đang kéo thì gõ số là chốt chính xác.","issues.clean":"Bản vẽ sạch — không có vấn đề nào.","issues.pending":"Chưa có kết quả kiểm tra.","footer.levels":"Tầng","footer.revision":"Revision","footer.conn":"Kết nối","footer.claude":"Claude","footer.undo":"Hoàn tác","footer.snap":"Snap","undo.title":"Hoàn tác (Ctrl+Z) — chỉ thao tác của bạn","redo.title":"Làm lại (Ctrl+Y)","snap.title":"Bước lưới snap (mm) — 0 là tắt","toast.claude":"Claude","toast.user":"Bạn","toast.reject":"Bị từ chối","toast.rejectFallback":"Server từ chối thay đổi.","toast.readonly":"Bạn đang xem qua link chia sẻ — chỉ xem, không sửa được.","toast.deleteUnsupported":"Chưa hỗ trợ xóa {kind} từ editor.","viewer.badge":"CHỈ XEM","hud.typing":"⏎ chốt · Esc xóa","hud.typable":"gõ số để chốt chính xác","hud.gap":"khe","catalog.title":"Nội thất","catalog.search":"tìm: giường, sofa, xe máy…","catalog.empty":"Không có asset nào khớp.","catalog.mounted":"treo","kind.wall":"Tường","kind.opening":"Cửa","kind.slab":"Sàn","kind.stair":"Thang","kind.room":"Phòng","kind.furniture":"Nội thất","kind.level":"Tầng","note.place":"đặt {label}","note.rotate":"xoay {id}","note.delete":"xóa {id}","note.drag":"kéo {id}","note.typed":"{id}: gõ {value}","note.prop":"sửa {id}.{field}","note.undo":"hoàn tác: {label}","note.redo":"làm lại: {label}"},Nu={"app.connecting":"connecting…","conn.on":"live","conn.connecting":"connecting…","conn.off":"connection lost — retrying…","view.plan":"Plan","view.3d":"3D","view.split":"Split","share.btn":"share","share.title":"Copy a VIEW-ONLY link for family — they see everything live but cannot edit; revoke with POST /share/rotate","share.copied":`View-only link copied — send it to your family:
{url}`,"share.error":"Could not fetch the share link — try reloading the page.","lang.title":"Chuyển giao diện sang tiếng Việt","tool.select":"Select / move — drag walls, doors, furniture; type a number while dragging for exact mm; Alt disables snapping; R rotates the selected furniture","tool.wall":"Draw wall — coming later","tool.door":"Place door — coming later","tool.window":"Place window — coming later","tool.room":"Draw room — coming later","tool.furniture":"Furniture — open the catalog, pick an item, then click the plan to place it; Esc/V to stop","tool.measure":"Measure — coming later","tool.locked":"View-only share link — editing disabled","pane2d.empty":"Waiting for a project — the drawing grows as Claude builds.","pane2d.hint":"drag an object — move · type while dragging — exact mm · Alt — no snap",fit2d:"fit view","fit2d.title":"Fit the drawing to the pane","walk.btn":"walk","walk.title":"Walk through the house — WASD to move, mouse to look, Shift to run, Esc to exit","walk.hint":"WASD — move · mouse — look · Shift — run · Esc — exit","sun.btn":"sun","sun.title":"Sun study by hour + month (latitude from the brief)","sun.hour":"hour","sun.month":"month",reset3d:"reset view","reset3d.title":"Back to the default camera","hint3d.orbit":"drag — orbit · wheel — zoom · right-drag — pan","panel.props":"Properties","panel.issues":"Checks","props.empty":"Tap an object on the drawing to see its numbers.","props.empty.sub":"Drag to move — type a number while dragging for exact mm.","issues.clean":"Drawing is clean — no issues.","issues.pending":"No check results yet.","footer.levels":"Floor","footer.revision":"Revision","footer.conn":"Link","footer.claude":"Claude","footer.undo":"Undo","footer.snap":"Snap","undo.title":"Undo (Ctrl+Z) — your own actions only","redo.title":"Redo (Ctrl+Y)","snap.title":"Snap grid step (mm) — 0 disables","toast.claude":"Claude","toast.user":"You","toast.reject":"Rejected","toast.rejectFallback":"The server rejected the change.","toast.readonly":"You are on a view-only share link — look, don't touch.","toast.deleteUnsupported":"Deleting {kind} from the editor is not supported yet.","viewer.badge":"VIEW ONLY","hud.typing":"⏎ commit · Esc clear","hud.typable":"type a number for exact mm","hud.gap":"gap","catalog.title":"Furniture","catalog.search":"search: bed, sofa, motorbike…","catalog.empty":"No matching assets.","catalog.mounted":"wall-mounted","kind.wall":"Wall","kind.opening":"Opening","kind.slab":"Slab","kind.stair":"Stair","kind.room":"Room","kind.furniture":"Furniture","kind.level":"Floor","note.place":"place {label}","note.rotate":"rotate {id}","note.delete":"delete {id}","note.drag":"drag {id}","note.typed":"{id}: typed {value}","note.prop":"edit {id}.{field}","note.undo":"undo: {label}","note.redo":"redo: {label}"},Uu={vi:Ic,en:Nu};function Fu(i){return i.query==="en"||i.query==="vi"?i.query:i.saved==="en"||i.saved==="vi"?i.saved:i.timeZone==="Asia/Ho_Chi_Minh"||i.timeZone==="Asia/Saigon"||i.languages?.some(t=>t?.toLowerCase().startsWith("vi"))?"vi":"en"}function Ou(){let i=null;if(typeof location<"u"&&(i=new URLSearchParams(location.search).get("lang"),i==="en"||i==="vi"))try{localStorage.setItem("atelier-lang",i)}catch{}let t=null;try{t=typeof localStorage<"u"?localStorage.getItem("atelier-lang"):null}catch{}let e=null;try{e=Intl.DateTimeFormat().resolvedOptions().timeZone??null}catch{}const n=typeof navigator<"u"?[navigator.language,...navigator.languages??[]].filter(Boolean):[];return Fu({query:i,saved:t,timeZone:e,languages:n})}const ts=Ou();function Bu(i,t,e){let n=Uu[i][t]??Ic[t]??t;if(e)for(const[s,r]of Object.entries(e))n=n.split(`{${s}}`).join(String(r));return n}function Qt(i,t){return Bu(ts,i,t)}function ku(i=document){for(const t of i.querySelectorAll("[data-i18n]"))t.textContent=Qt(t.dataset.i18n);for(const t of i.querySelectorAll("[data-i18n-title]"))t.title=Qt(t.dataset.i18nTitle)}function zu(){try{localStorage.setItem("atelier-lang",ts==="vi"?"en":"vi")}catch{}const i=new URL(location.href);i.searchParams.delete("lang"),location.href=i.toString()}class Vu{constructor(t,e){this.onPick=e,this.el=document.createElement("div"),this.el.id="catalog-panel",this.el.hidden=!0;const n=document.createElement("div");n.className="cat-head";const s=document.createElement("span");s.textContent=Qt("catalog.title"),s.className="cat-title",this.searchEl=document.createElement("input"),this.searchEl.type="search",this.searchEl.placeholder=Qt("catalog.search"),this.searchEl.className="cat-search",this.searchEl.addEventListener("input",()=>this.renderList()),this.searchEl.addEventListener("keydown",r=>r.stopPropagation()),n.append(s,this.searchEl),this.listEl=document.createElement("div"),this.listEl.className="cat-list",this.el.append(n,this.listEl),t.appendChild(this.el),this.renderList()}onPick;el;listEl;searchEl;picked=null;get visible(){return!this.el.hidden}show(){this.el.hidden=!1,this.searchEl.focus()}hide(){this.el.hidden=!0,this.setPicked(null)}setPicked(t){this.picked=t;for(const e of this.listEl.querySelectorAll(".cat-item"))e.classList.toggle("is-picked",e.dataset.asset===t)}renderList(){const t=this.searchEl.value.trim().toLowerCase(),e=s=>!t||`${s.id} ${s.label} ${s.labelEn??""} ${s.category}`.toLowerCase().includes(t);this.listEl.textContent="";let n=0;for(const s of Ss){if(!e(s)||n>=60)continue;n+=1;const r=document.createElement("button");r.className=`cat-item${s.id===this.picked?" is-picked":""}`,r.dataset.asset=s.id;const a=document.createElement("span");a.className="cat-name",a.textContent=ts==="en"&&s.labelEn?s.labelEn:s.label;const o=document.createElement("span");o.className="cat-dims",o.textContent=`${s.footprint.w}×${s.footprint.d}${s.mountHeight!=null?` · ${Qt("catalog.mounted")}`:""}`,r.append(a,o),r.addEventListener("click",()=>{this.setPicked(s.id),this.onPick(s.id)}),this.listEl.appendChild(r)}if(n===0){const s=document.createElement("p");s.className="panel-empty",s.textContent=Qt("catalog.empty"),this.listEl.appendChild(s)}}}const gi=i=>Math.round(i).toLocaleString(ts==="en"?"en-US":"vi-VN"),Bs=(i,t,e)=>Math.min(e,Math.max(t,i)),Da=([i,t])=>[Math.round(i),Math.round(t)];function Gu(i,t,e){const n=Lc(t),s=gn(t.from,n),r=i.walls.filter(c=>c.id!==t.id&&c.level===t.level&&Qh(c,t)).map(c=>({id:c.id,pos:gn(c.from,n)})),a=r.filter(c=>Math.abs(c.pos-s)>t.thickness).reduce((c,h)=>!c||Math.abs(h.pos-s)<Math.abs(c.pos-s)?h:c,null);let o=0;const l=(c,h)=>{o=c;const u=_s(n,c),f=Math.abs(c)>=.5?{op:"update",entity:"wall",id:t.id,data:{from:Da(mi(t.from,u)),to:Da(mi(t.to,u))}}:null,g=a?{text:`→ ${a.id} · ${gi(Math.abs(s+c-a.pos))}`,typable:!0}:{text:`Δ ${gi(c)}`,typable:!0};return{delta:u,hud:g,op:f,...h?{alignWith:h}:{}}};return{ids:[t.id],previewIds:[t.id,...i.openings.filter(c=>c.wall===t.id).map(c=>c.id)],update(c,h){let u=gn(_i(c,e),n),d;if(!h.noSnap){const f=s+u;let g=null;for(const v of r)Math.abs(f-v.pos)<=h.tol&&(!g||Math.abs(f-v.pos)<Math.abs(f-g.pos))&&(g=v);g?(u=g.pos-s,d=g.id):h.grid>0&&(u=Math.round(f/h.grid)*h.grid-s)}return l(u,d)},typed(c){if(!Number.isFinite(c)||c<0)return null;if(a){const h=Math.sign(s+o-a.pos)||Math.sign(s-a.pos)||1;return l(a.pos+h*c-s)}return l((Math.sign(o)||1)*c)}}}function Hu(i,t,e,n){const s=Ms(t),r=Pc(t),a=Math.max(0,r-e.width),o=Bs(gn(_i(n,t.from),s)-e.offset,0,e.width);let l=e.offset;const c=h=>{l=h;const u=h,d=a-h,f=Math.abs(h-e.offset)>=.5;return{delta:_s(s,h-e.offset),hud:{text:`◁ ${gi(u)} · ${gi(d)} ▷`,typable:!0},op:f?{op:"update",entity:"opening",id:e.id,data:{offset:Math.round(h)}}:null}};return{ids:[e.id],previewIds:[e.id],update(h,u){const d=gn(_i(h,t.from),s);let f=Bs(d-o,0,a);if(!u.noSnap&&u.grid>0&&a>0){const g=Bs(Math.round(f/u.grid)*u.grid,0,a),v=Bs(a-Math.round((a-f)/u.grid)*u.grid,0,a);f=Math.abs(g-f)<=Math.abs(v-f)?g:v}return c(f)},typed(h){if(!Number.isFinite(h)||h<0||h>a)return null;const u=l<=a-l;return c(u?h:a-h)}}}const Wu=600;function Xu(i,t,e){const n=Ur(t.asset),s=i.walls.filter(h=>h.level===t.level);let r=t.at,a=null;const o=h=>{if(!n)return null;const u=eu({center:h,halfW:n.footprint.w/2,halfD:n.footprint.d/2,rotation:t.rotation});let d=null;for(const f of s){const g=Lc(f),v=Ms(f),m=gn(f.from,v),p=gn(f.to,v),[T,E]=[Math.min(m,p),Math.max(m,p)],M=u.map(y=>gn(y,v));if(Math.max(...M)<T||Math.min(...M)>E)continue;const w=gn(f.from,g),R=u.map(y=>gn(y,g)),[P,U]=[Math.min(...R),Math.max(...R)];for(const y of[1,-1]){const x=w+y*f.thickness/2,C=y===1?P-x:x-U,F={wallId:f.id,face:x,out:_s(g,y),n:g};C>-f.thickness&&(!d||Math.abs(C)<Math.abs(d.gap))&&(d={a:F,gap:C})}}return d},l=(h,u,d)=>{r=h,a=u;const f=u&&n?c(h):null,g=Math.abs(h[0]-t.at[0])>=.5||Math.abs(h[1]-t.at[1])>=.5,v=f?{text:`${Qt("hud.gap")} → ${f.a.wallId} · ${gi(Math.max(0,f.gap))}`,typable:!0}:{text:`${gi(h[0])}, ${gi(h[1])}`,typable:!1};return{delta:_i(h,t.at),hud:v,op:g?{op:"update",entity:"furniture",id:t.id,data:{at:Da(h)}}:null,...d&&u?{alignWith:u.wallId}:{}}},c=h=>{const u=o(h);return u&&u.gap<=Wu?u:null};return{ids:[t.id],previewIds:[t.id],update(h,u){let d=mi(t.at,_i(h,e));!u.noSnap&&u.grid>0&&(d=[Math.round(d[0]/u.grid)*u.grid,Math.round(d[1]/u.grid)*u.grid]);let f=!1,g=null;if(!u.noSnap){const v=o(d);v&&(g=v.a,Math.abs(v.gap)<=u.tol&&(d=mi(d,_s(v.a.out,-v.gap)),f=!0))}return l(d,g??c(d)?.a??null,f)},typed(h){if(!Number.isFinite(h)||h<0)return null;const u=o(r),d=u?u.a:a;if(!u||!d)return null;const f=mi(r,_s(d.out,h-u.gap));return l(f,d,!0)}}}class qu{el;valueEl;hintEl;constructor(t){this.el=document.createElement("div"),this.el.id="hud",this.el.hidden=!0,this.valueEl=document.createElement("span"),this.valueEl.className="hud-value",this.hintEl=document.createElement("span"),this.hintEl.className="hud-hint",this.el.append(this.valueEl,this.hintEl),t.appendChild(this.el)}show(t,e,n,s,r){this.el.hidden=!1,this.el.classList.toggle("typing",s!=null),this.valueEl.textContent=s!=null?`${s||"…"} mm`:n,this.hintEl.textContent=s!=null?Qt("hud.typing"):r?Qt("hud.typable"):"",this.el.style.left=`${t+18}px`,this.el.style.top=`${e+14}px`}shake(){this.el.classList.remove("shake"),this.el.getBoundingClientRect(),this.el.classList.add("shake")}hide(){this.el.hidden=!0,this.el.classList.remove("typing","shake")}}function Yu(i){const t=c=>{const h=i.getAttribute(c);if(h==null)return null;const u=Number(h);return Number.isFinite(u)?u:null},e=t("data-tf-scale"),n=t("data-tf-ox"),s=t("data-tf-oy"),r=t("data-tf-min-x"),a=t("data-tf-min-y"),o=t("data-tf-max-x"),l=t("data-tf-max-y");return e==null||n==null||s==null||r==null||a==null||o==null||l==null?null:{scale:e,rotated:i.getAttribute("data-tf-rotated")==="1",ox:n,oy:s,minX:r,minY:a,maxX:o,maxY:l}}function Wr(i,[t,e]){return i.rotated?[i.minX+(e-i.oy)*i.scale,i.minY+(t-i.ox)*i.scale]:[i.minX+(t-i.ox)*i.scale,i.maxY-(e-i.oy)*i.scale]}function $u(i,[t,e]){return i.rotated?[e/i.scale,t/i.scale]:[t/i.scale,-e/i.scale]}function Xr(i,t,e){const n=i.getScreenCTM();if(!n)return null;const s=new DOMPoint(t,e).matrixTransform(n.inverse());return[s.x,s.y]}function Ku(i,t){const e=i.getScreenCTM(),n=e?Math.hypot(e.a,e.b):1;return t.scale/(n||1)}const Zu=8,ju=4;class Ju{constructor(t,e,n){this.viewport=t,this.paper=e,this.deps=n,this.hud=new qu(t),t.addEventListener("wheel",s=>this.onWheel(s),{passive:!1}),t.addEventListener("pointerdown",s=>this.onPointerDown(s))}viewport;paper;deps;scale=1;tx=0;ty=0;currentLevel=null;seq=0;fitted=!1;selection=null;hud;dragging=!1;placing=null;get svg(){return this.paper.querySelector("svg")}async show(t,e){const n=++this.seq,s=await fetch(`/plan/${encodeURIComponent(t)}.svg?rev=${e}`);if(!s.ok||n!==this.seq)return;const r=await s.text();if(n!==this.seq)return;const a=this.currentLevel!==t;this.currentLevel=t,this.paper.innerHTML=r,this.applySelection(),(!this.fitted||a)&&this.fit()}fit(){this.paper.style.transform="none";const t=this.paper.getBoundingClientRect(),e=this.viewport.getBoundingClientRect();if(t.width===0||e.width===0){this.apply();return}this.scale=Math.min(e.width/t.width,e.height/t.height)*.92,this.tx=(e.width-t.width*this.scale)/2,this.ty=(e.height-t.height*this.scale)/2,this.fitted=!0,this.apply()}ensureFitted(){this.fitted||this.fit()}flash(t){for(const e of t)for(const n of this.paper.querySelectorAll(`[data-id="${CSS.escape(e)}"]`))n.classList.remove("flash-2d"),n.getBoundingClientRect?.(),n.classList.add("flash-2d"),setTimeout(()=>n.classList.remove("flash-2d"),1600)}setSelection(t){this.selection=t,this.applySelection()}applySelection(){for(const t of this.paper.querySelectorAll(".sel-2d"))t.classList.remove("sel-2d");if(this.selection)for(const t of this.paper.querySelectorAll(`[data-id="${CSS.escape(this.selection)}"]`))t.classList.add("sel-2d")}setPlacing(t){this.placing=t,this.viewport.classList.toggle("is-placing",t!=null)}get placingAsset(){return this.placing}clearPreview(){for(const t of this.paper.querySelectorAll("[data-preview]"))t.removeAttribute("transform"),t.removeAttribute("data-preview");this.clearAlign()}clearAlign(){for(const t of this.paper.querySelectorAll(".align-2d"))t.classList.remove("align-2d")}async capture(t=1600){const e=this.svg;if(!e)throw new Error("Chưa có bản vẽ để chụp.");const n=new XMLSerializer().serializeToString(e),s=URL.createObjectURL(new Blob([n],{type:"image/svg+xml"}));try{const r=new Image;await new Promise((u,d)=>{r.onload=()=>u(),r.onerror=()=>d(new Error("Không nạp được SVG để chụp.")),r.src=s});const a=r.naturalWidth||1600,o=r.naturalHeight||1130,l=t/a,c=document.createElement("canvas");c.width=Math.round(a*l),c.height=Math.round(o*l);const h=c.getContext("2d");return h.fillStyle="#ffffff",h.fillRect(0,0,c.width,c.height),h.drawImage(r,0,0,c.width,c.height),c.toDataURL("image/png").split(",")[1]}finally{URL.revokeObjectURL(s)}}apply(){this.paper.style.transform=`translate(${this.tx}px, ${this.ty}px) scale(${this.scale})`}onWheel(t){t.preventDefault();const e=this.viewport.getBoundingClientRect(),n=Math.exp(-t.deltaY*.0012),s=Math.min(10,Math.max(.05,this.scale*n)),r=(t.clientX-e.left-this.tx)/this.scale,a=(t.clientY-e.top-this.ty)/this.scale;this.tx=t.clientX-e.left-r*s,this.ty=t.clientY-e.top-a*s,this.scale=s,this.apply()}sessionFor(t,e){if(this.deps.readonly)return null;const n=this.deps.getModel();if(!n)return null;const s=n.walls.find(o=>o.id===t);if(s)return Gu(n,s,e);const r=n.openings.find(o=>o.id===t);if(r){const o=n.walls.find(l=>l.id===r.wall);return o?Hu(n,o,r,e):null}const a=n.furniture.find(o=>o.id===t);return a?Xu(n,a,e):null}onPointerDown(t){if(t.button!==0)return;const e=t.clientX,n=t.clientY,s=this.tx,r=this.ty;let a=!1;const l=t.target.closest?.("[data-id]")?.getAttribute("data-id")??null;this.viewport.setPointerCapture(t.pointerId);const c=()=>{const x=this.svg,C=x?Yu(x):null;return x&&C?{svg:x,tf:C}:null};let h=null,u=!1,d=null,f=null,g=!1,v=[e,n];const m=()=>{const x=c();if(!x)return null;const C=Xr(x.svg,e,n);return C?Wr(x.tf,C):null},p=x=>{const C=c();if(!C||!h)return;const[F,B]=$u(C.tf,x.delta);for(const X of h.previewIds)for(const V of this.paper.querySelectorAll(`[data-id="${CSS.escape(X)}"]`))V.setAttribute("transform",`translate(${F} ${B})`),V.setAttribute("data-preview","1");if(this.clearAlign(),x.alignWith)for(const X of this.paper.querySelectorAll(`[data-id="${CSS.escape(x.alignWith)}"]`))X.classList.add("align-2d")},T=x=>{const C=c();return{grid:this.deps.getGrid(),tol:C?Zu*Ku(C.svg,C.tf):40,noSnap:x}},E=x=>{const C=c();if(!C||!h)return;const F=Xr(C.svg,x.clientX,x.clientY);F&&(d=h.update(Wr(C.tf,F),T(x.altKey)),p(d),this.hud.show(x.clientX,x.clientY,d.hud?.text??"",f,d.hud?.typable??!1))},M=(x,C)=>{g=!0,P(),x?this.deps.onCommit(x,C):this.clearPreview(),this.deps.onDragIds([])},w=x=>{if(!(!h||!d)){if(/^[0-9]$/.test(x.key))f=(f??"")+x.key;else if(x.key==="Backspace")f=f?f.slice(0,-1):null;else if(x.key==="Enter"&&f){const C=h.typed(Number(f),T(x.altKey));if(!C){this.hud.shake(),x.preventDefault(),x.stopPropagation();return}p(C),M(C.op,`${l}: gõ ${f}`),x.preventDefault(),x.stopPropagation();return}else if(x.key==="Escape")if(f!=null)f=null;else{M(null,""),x.preventDefault(),x.stopPropagation();return}else return;x.preventDefault(),x.stopPropagation(),this.hud.show(v[0],v[1],d.hud?.text??"",f,d.hud?.typable??!1)}},R=x=>{const C=x.clientX-e,F=x.clientY-n;if(v=[x.clientX,x.clientY],!a&&Math.abs(C)+Math.abs(F)>ju){if(a=!0,l&&!u&&!this.placing){u=!0;const B=m();B&&(h=this.sessionFor(l,B)),h&&(this.dragging=!0,this.deps.onSelect(l),this.deps.onDragIds(h.ids),window.addEventListener("keydown",w,!0))}h?this.viewport.classList.add("is-dragging"):this.viewport.classList.add("is-panning")}a&&(h?E(x):(this.tx=s+C,this.ty=r+F,this.apply()))},P=()=>{this.dragging=!1,this.viewport.removeEventListener("pointermove",R),this.viewport.removeEventListener("pointerup",U),this.viewport.removeEventListener("pointercancel",y),window.removeEventListener("keydown",w,!0),this.viewport.classList.remove("is-panning","is-dragging"),this.hud.hide()},U=()=>{if(!g){if(h&&a){M(d?.op??null,d?.op?`kéo ${l}`:"");return}if(P(),!a){if(this.placing){const x=c();if(x){const C=Xr(x.svg,e,n);if(C){const F=Wr(x.tf,C),B=this.deps.getGrid(),X=V=>B>0?Math.round(V/B)*B:Math.round(V);this.deps.onPlace(this.placing,[X(F[0]),X(F[1])])}}return}l&&this.deps.onSelect(l)}}},y=()=>{g||(h&&(this.clearPreview(),this.deps.onDragIds([])),P())};this.viewport.addEventListener("pointermove",R),this.viewport.addEventListener("pointerup",U),this.viewport.addEventListener("pointercancel",y)}}const Uo="182",Xi={ROTATE:0,DOLLY:1,PAN:2},Wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Qu=0,gl=1,td=2,vr=1,Nc=2,ps=3,ni=0,Xe=1,an=2,kn=0,qi=1,_l=2,vl=3,xl=4,ed=5,ui=100,nd=101,id=102,sd=103,rd=104,ad=200,od=201,ld=202,cd=203,Ia=204,Na=205,hd=206,ud=207,dd=208,fd=209,pd=210,md=211,gd=212,_d=213,vd=214,Ua=0,Fa=1,Oa=2,$i=3,Ba=4,ka=5,za=6,Va=7,Fo=0,xd=1,yd=2,Sn=0,Uc=1,Fc=2,Oc=3,Bc=4,kc=5,zc=6,Vc=7,Gc=300,vi=301,Ki=302,Ga=303,Ha=304,Fr=306,Wa=1e3,On=1001,Xa=1002,De=1003,Sd=1004,ks=1005,Fe=1006,qr=1007,fi=1008,Ze=1009,Hc=1010,Wc=1011,bs=1012,Oo=1013,En=1014,vn=1015,Gn=1016,Bo=1017,ko=1018,Es=1020,Xc=35902,qc=35899,Yc=1021,$c=1022,hn=1023,Hn=1026,pi=1027,Kc=1028,zo=1029,Zi=1030,Vo=1031,Go=1033,xr=33776,yr=33777,Sr=33778,Mr=33779,qa=35840,Ya=35841,$a=35842,Ka=35843,Za=36196,ja=37492,Ja=37496,Qa=37488,to=37489,eo=37490,no=37491,io=37808,so=37809,ro=37810,ao=37811,oo=37812,lo=37813,co=37814,ho=37815,uo=37816,fo=37817,po=37818,mo=37819,go=37820,_o=37821,vo=36492,xo=36494,yo=36495,So=36283,Mo=36284,bo=36285,Eo=36286,Md=3200,Zc=0,bd=1,jn="",nn="srgb",ji="srgb-linear",Er="linear",re="srgb",Ti=7680,yl=519,Ed=512,Td=513,Ad=514,Ho=515,wd=516,Cd=517,Wo=518,Rd=519,To=35044,Sl="300 es",xn=2e3,Tr=2001;function jc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pd(){const i=Ar("canvas");return i.style.display="block",i}const Ml={};function wr(...i){const t="THREE."+i.shift();console.log(t,...i)}function kt(...i){const t="THREE."+i.shift();console.warn(t,...i)}function Jt(...i){const t="THREE."+i.shift();console.error(t,...i)}function Ts(...i){const t=i.join(" ");t in Ml||(Ml[t]=!0,kt(...i))}function Ld(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}class Mi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vs=Math.PI/180,Ao=180/Math.PI;function zn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[i&255]+Ie[i>>8&255]+Ie[i>>16&255]+Ie[i>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function $t(i,t,e){return Math.max(t,Math.min(e,i))}function Dd(i,t){return(i%t+t)%t}function Yr(i,t,e){return(1-e)*i+e*t}function _n(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function he(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Id={DEG2RAD:vs};class tt{constructor(t=0,e=0){tt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class xi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o<=0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o>=1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=l*d+c*f+h*g+u*v;m<0&&(d=-d,f=-f,g=-g,v=-v,m=-m);let p=1-o;if(m<.9995){const T=Math.acos(m),E=Math.sin(T);p=Math.sin(p*T)/E,o=Math.sin(o*T)/E,l=l*p+d*o,c=c*p+f*o,h=h*p+g*o,u=u*p+v*o}else{l=l*p+d*o,c=c*p+f*o,h=h*p+g*o,u=u*p+v*o;const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-o*f,t[e+2]=c*g+h*f+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:kt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(bl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(bl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return $r.copy(this).projectOnVector(t),this.sub($r)}reflect(t){return this.sub($r.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $r=new L,bl=new xi;class Wt{constructor(t,e,n,s,r,a,o,l,c){Wt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],T=s[1],E=s[4],M=s[7],w=s[2],R=s[5],P=s[8];return r[0]=a*v+o*T+l*w,r[3]=a*m+o*E+l*R,r[6]=a*p+o*M+l*P,r[1]=c*v+h*T+u*w,r[4]=c*m+h*E+u*R,r[7]=c*p+h*M+u*P,r[2]=d*v+f*T+g*w,r[5]=d*m+f*E+g*R,r[8]=d*p+f*M+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=d*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Kr.makeScale(t,e)),this}rotate(t){return this.premultiply(Kr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Kr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Kr=new Wt,El=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Tl=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nd(){const i={enabled:!0,workingColorSpace:ji,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===re&&(s.r=Vn(s.r),s.g=Vn(s.g),s.b=Vn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===re&&(s.r=Yi(s.r),s.g=Yi(s.g),s.b=Yi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===jn?Er:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ts("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ts("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ji]:{primaries:t,whitePoint:n,transfer:Er,toXYZ:El,fromXYZ:Tl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:t,whitePoint:n,transfer:re,toXYZ:El,fromXYZ:Tl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),i}const te=Nd();function Vn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Yi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ai;class Ud{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ai===void 0&&(Ai=Ar("canvas")),Ai.width=t.width,Ai.height=t.height;const s=Ai.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ai}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ar("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Vn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Vn(e[n]/255)*255):e[n]=Vn(e[n]);return{data:e,width:t.width,height:t.height}}else return kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Fd=0;class Xo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=zn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Zr(s[a].image)):r.push(Zr(s[a]))}else r=Zr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Zr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ud.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(kt("Texture: Unable to serialize Texture."),{})}let Od=0;const jr=new L;class Oe extends Mi{constructor(t=Oe.DEFAULT_IMAGE,e=Oe.DEFAULT_MAPPING,n=On,s=On,r=Fe,a=fi,o=hn,l=Ze,c=Oe.DEFAULT_ANISOTROPY,h=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=zn(),this.name="",this.source=new Xo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new tt(0,0),this.repeat=new tt(1,1),this.center=new tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(jr).x}get height(){return this.source.getSize(jr).y}get depth(){return this.source.getSize(jr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){kt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Gc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wa:t.x=t.x-Math.floor(t.x);break;case On:t.x=t.x<0?0:1;break;case Xa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wa:t.y=t.y-Math.floor(t.y);break;case On:t.y=t.y<0?0:1;break;case Xa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Oe.DEFAULT_IMAGE=null;Oe.DEFAULT_MAPPING=Gc;Oe.DEFAULT_ANISOTROPY=1;class be{constructor(t=0,e=0,n=0,s=1){be.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,M=(f+1)/2,w=(p+1)/2,R=(h+d)/4,P=(u+v)/4,U=(g+m)/4;return E>M&&E>w?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=R/n,r=P/n):M>w?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=R/s,r=U/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=P/r,s=U/r),this.set(n,s,r,e),this}let T=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-v)/T,this.z=(d-h)/T,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bd extends Mi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Oe(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Fe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Xo(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mn extends Bd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Jc extends Oe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=De,this.minFilter=De,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class kd extends Oe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=De,this.minFilter=De,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qn{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,on):on.fromBufferAttribute(r,a),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zs.copy(n.boundingBox)),zs.applyMatrix4(t.matrixWorld),this.union(zs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(is),Vs.subVectors(this.max,is),wi.subVectors(t.a,is),Ci.subVectors(t.b,is),Ri.subVectors(t.c,is),Wn.subVectors(Ci,wi),Xn.subVectors(Ri,Ci),ri.subVectors(wi,Ri);let e=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-ri.z,ri.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,ri.z,0,-ri.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-ri.y,ri.x,0];return!Jr(e,wi,Ci,Ri,Vs)||(e=[1,0,0,0,1,0,0,0,1],!Jr(e,wi,Ci,Ri,Vs))?!1:(Gs.crossVectors(Wn,Xn),e=[Gs.x,Gs.y,Gs.z],Jr(e,wi,Ci,Ri,Vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Rn=[new L,new L,new L,new L,new L,new L,new L,new L],on=new L,zs=new Qn,wi=new L,Ci=new L,Ri=new L,Wn=new L,Xn=new L,ri=new L,is=new L,Vs=new L,Gs=new L,ai=new L;function Jr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ai.fromArray(i,r);const o=s.x*Math.abs(ai.x)+s.y*Math.abs(ai.y)+s.z*Math.abs(ai.z),l=t.dot(ai),c=e.dot(ai),h=n.dot(ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const zd=new Qn,ss=new L,Qr=new L;class Or{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):zd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ss.subVectors(t,this.center);const e=ss.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ss,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ss.copy(t.center).add(Qr)),this.expandByPoint(ss.copy(t.center).sub(Qr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Pn=new L,ta=new L,Hs=new L,qn=new L,ea=new L,Ws=new L,na=new L;class qo{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pn.copy(this.origin).addScaledVector(this.direction,e),Pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ta.copy(t).add(e).multiplyScalar(.5),Hs.copy(e).sub(t).normalize(),qn.copy(this.origin).sub(ta);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Hs),o=qn.dot(this.direction),l=-qn.dot(Hs),c=qn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ta).addScaledVector(Hs,d),f}intersectSphere(t,e){Pn.subVectors(t.center,this.origin);const n=Pn.dot(this.direction),s=Pn.dot(Pn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Pn)!==null}intersectTriangle(t,e,n,s,r){ea.subVectors(e,t),Ws.subVectors(n,t),na.crossVectors(ea,Ws);let a=this.direction.dot(na),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;qn.subVectors(this.origin,t);const l=o*this.direction.dot(Ws.crossVectors(qn,Ws));if(l<0)return null;const c=o*this.direction.dot(ea.cross(qn));if(c<0||l+c>a)return null;const h=-o*qn.dot(na);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ge{constructor(t,e,n,s,r,a,o,l,c,h,u,d,f,g,v,m){ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,d,f,g,v,m)}set(t,e,n,s,r,a,o,l,c,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ge().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Pi.setFromMatrixColumn(t,0).length(),r=1/Pi.setFromMatrixColumn(t,1).length(),a=1/Pi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,f=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d+v*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d-v*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=v-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,f=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,f=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vd,t,Gd)}lookAt(t,e,n){const s=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),Yn.crossVectors(n,$e),Yn.lengthSq()===0&&(Math.abs(n.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),Yn.crossVectors(n,$e)),Yn.normalize(),Xs.crossVectors($e,Yn),s[0]=Yn.x,s[4]=Xs.x,s[8]=$e.x,s[1]=Yn.y,s[5]=Xs.y,s[9]=$e.y,s[2]=Yn.z,s[6]=Xs.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],T=n[3],E=n[7],M=n[11],w=n[15],R=s[0],P=s[4],U=s[8],y=s[12],x=s[1],C=s[5],F=s[9],B=s[13],X=s[2],V=s[6],H=s[10],k=s[14],J=s[3],pt=s[7],lt=s[11],ut=s[15];return r[0]=a*R+o*x+l*X+c*J,r[4]=a*P+o*C+l*V+c*pt,r[8]=a*U+o*F+l*H+c*lt,r[12]=a*y+o*B+l*k+c*ut,r[1]=h*R+u*x+d*X+f*J,r[5]=h*P+u*C+d*V+f*pt,r[9]=h*U+u*F+d*H+f*lt,r[13]=h*y+u*B+d*k+f*ut,r[2]=g*R+v*x+m*X+p*J,r[6]=g*P+v*C+m*V+p*pt,r[10]=g*U+v*F+m*H+p*lt,r[14]=g*y+v*B+m*k+p*ut,r[3]=T*R+E*x+M*X+w*J,r[7]=T*P+E*C+M*V+w*pt,r[11]=T*U+E*F+M*H+w*lt,r[15]=T*y+E*B+M*k+w*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15],T=l*f-c*d,E=o*f-c*u,M=o*d-l*u,w=a*f-c*h,R=a*d-l*h,P=a*u-o*h;return e*(v*T-m*E+p*M)-n*(g*T-m*w+p*R)+s*(g*E-v*w+p*P)-r*(g*M-v*R+m*P)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],T=u*m*c-v*d*c+v*l*f-o*m*f-u*l*p+o*d*p,E=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,M=h*v*c-g*u*c+g*o*f-a*v*f-h*o*p+a*u*p,w=g*u*l-h*v*l-g*o*d+a*v*d+h*o*m-a*u*m,R=e*T+n*E+s*M+r*w;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return t[0]=T*P,t[1]=(v*d*r-u*m*r-v*s*f+n*m*f+u*s*p-n*d*p)*P,t[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*p+n*l*p)*P,t[3]=(u*l*r-o*d*r-u*s*c+n*d*c+o*s*f-n*l*f)*P,t[4]=E*P,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*P,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*p-e*l*p)*P,t[7]=(a*d*r-h*l*r+h*s*c-e*d*c-a*s*f+e*l*f)*P,t[8]=M*P,t[9]=(g*u*r-h*v*r-g*n*f+e*v*f+h*n*p-e*u*p)*P,t[10]=(a*v*r-g*o*r+g*n*c-e*v*c-a*n*p+e*o*p)*P,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*f-e*o*f)*P,t[12]=w*P,t[13]=(h*v*s-g*u*s+g*n*d-e*v*d-h*n*m+e*u*m)*P,t[14]=(g*o*s-a*v*s-g*n*l+e*v*l+a*n*m-e*o*m)*P,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*d+e*o*d)*P,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,v=a*h,m=a*u,p=o*u,T=l*c,E=l*h,M=l*u,w=n.x,R=n.y,P=n.z;return s[0]=(1-(v+p))*w,s[1]=(f+M)*w,s[2]=(g-E)*w,s[3]=0,s[4]=(f-M)*R,s[5]=(1-(d+p))*R,s[6]=(m+T)*R,s[7]=0,s[8]=(g+E)*P,s[9]=(m-T)*P,s[10]=(1-(d+v))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;if(t.x=s[12],t.y=s[13],t.z=s[14],this.determinant()===0)return n.set(1,1,1),e.identity(),this;let r=Pi.set(s[0],s[1],s[2]).length();const a=Pi.set(s[4],s[5],s[6]).length(),o=Pi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),ln.copy(this);const c=1/r,h=1/a,u=1/o;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=h,ln.elements[5]*=h,ln.elements[6]*=h,ln.elements[8]*=u,ln.elements[9]*=u,ln.elements[10]*=u,e.setFromRotationMatrix(ln),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=xn,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===xn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Tr)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=xn,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===xn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Tr)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Pi=new L,ln=new ge,Vd=new L(0,0,0),Gd=new L(1,1,1),Yn=new L,Xs=new L,$e=new L,Al=new ge,wl=new xi;class Tn{constructor(t=0,e=0,n=0,s=Tn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin($t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin($t(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$t(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin($t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-$t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Al.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Al,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return wl.setFromEuler(this),this.setFromQuaternion(wl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tn.DEFAULT_ORDER="XYZ";class Qc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Hd=0;const Cl=new L,Li=new xi,Ln=new ge,qs=new L,rs=new L,Wd=new L,Xd=new xi,Rl=new L(1,0,0),Pl=new L(0,1,0),Ll=new L(0,0,1),Dl={type:"added"},qd={type:"removed"},Di={type:"childadded",child:null},ia={type:"childremoved",child:null};class we extends Mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new L,e=new Tn,n=new xi,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ge},normalMatrix:{value:new Wt}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.multiply(Li),this}rotateOnWorldAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.premultiply(Li),this}rotateX(t){return this.rotateOnAxis(Rl,t)}rotateY(t){return this.rotateOnAxis(Pl,t)}rotateZ(t){return this.rotateOnAxis(Ll,t)}translateOnAxis(t,e){return Cl.copy(t).applyQuaternion(this.quaternion),this.position.add(Cl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Rl,t)}translateY(t){return this.translateOnAxis(Pl,t)}translateZ(t){return this.translateOnAxis(Ll,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?qs.copy(t):qs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(rs,qs,this.up):Ln.lookAt(qs,rs,this.up),this.quaternion.setFromRotationMatrix(Ln),s&&(Ln.extractRotation(s.matrixWorld),Li.setFromRotationMatrix(Ln),this.quaternion.premultiply(Li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Dl),Di.child=t,this.dispatchEvent(Di),Di.child=null):Jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qd),ia.child=t,this.dispatchEvent(ia),ia.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Dl),Di.child=t,this.dispatchEvent(Di),Di.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,t,Wd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,Xd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}we.DEFAULT_UP=new L(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new L,Dn=new L,sa=new L,In=new L,Ii=new L,Ni=new L,Il=new L,ra=new L,aa=new L,oa=new L,la=new be,ca=new be,ha=new be;class je{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),cn.subVectors(t,e),s.cross(cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){cn.subVectors(s,e),Dn.subVectors(n,e),sa.subVectors(t,e);const a=cn.dot(cn),o=cn.dot(Dn),l=cn.dot(sa),c=Dn.dot(Dn),h=Dn.dot(sa),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,In.x),l.addScaledVector(a,In.y),l.addScaledVector(o,In.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return la.setScalar(0),ca.setScalar(0),ha.setScalar(0),la.fromBufferAttribute(t,e),ca.fromBufferAttribute(t,n),ha.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(la,r.x),a.addScaledVector(ca,r.y),a.addScaledVector(ha,r.z),a}static isFrontFacing(t,e,n,s){return cn.subVectors(n,e),Dn.subVectors(t,e),cn.cross(Dn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),cn.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return je.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Ii.subVectors(s,n),Ni.subVectors(r,n),ra.subVectors(t,n);const l=Ii.dot(ra),c=Ni.dot(ra);if(l<=0&&c<=0)return e.copy(n);aa.subVectors(t,s);const h=Ii.dot(aa),u=Ni.dot(aa);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ii,a);oa.subVectors(t,r);const f=Ii.dot(oa),g=Ni.dot(oa);if(g>=0&&f<=g)return e.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ni,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Il.subVectors(r,s),o=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(Il,o);const p=1/(m+v+d);return a=v*p,o=d*p,e.copy(n).addScaledVector(Ii,a).addScaledVector(Ni,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const th={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$n={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function ua(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Xt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=nn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=te.workingColorSpace){if(t=Dd(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ua(a,r,t+1/3),this.g=ua(a,r,t),this.b=ua(a,r,t-1/3)}return te.colorSpaceToWorking(this,s),this}setStyle(t,e=nn){function n(r){r!==void 0&&parseFloat(r)<1&&kt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:kt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=nn){const n=th[t.toLowerCase()];return n!==void 0?this.setHex(n,e):kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vn(t.r),this.g=Vn(t.g),this.b=Vn(t.b),this}copyLinearToSRGB(t){return this.r=Yi(t.r),this.g=Yi(t.g),this.b=Yi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=nn){return te.workingToColorSpace(Ne.copy(this),t),Math.round($t(Ne.r*255,0,255))*65536+Math.round($t(Ne.g*255,0,255))*256+Math.round($t(Ne.b*255,0,255))}getHexString(t=nn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.workingToColorSpace(Ne.copy(this),e);const n=Ne.r,s=Ne.g,r=Ne.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=te.workingColorSpace){return te.workingToColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=nn){te.workingToColorSpace(Ne.copy(this),t);const e=Ne.r,n=Ne.g,s=Ne.b;return t!==nn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL($n),this.setHSL($n.h+t,$n.s+e,$n.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL($n),t.getHSL(Ys);const n=Yr($n.h,Ys.h,e),s=Yr($n.s,Ys.s,e),r=Yr($n.l,Ys.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new Xt;Xt.NAMES=th;let Yd=0;class bi extends Mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=zn(),this.name="",this.type="Material",this.blending=qi,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ia,this.blendDst=Na,this.blendEquation=ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=$i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){kt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==qi&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ia&&(n.blendSrc=this.blendSrc),this.blendDst!==Na&&(n.blendDst=this.blendDst),this.blendEquation!==ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==yl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class eh extends bi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Fo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new L,$s=new tt;let $d=0;class un{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$d++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=To,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)$s.fromBufferAttribute(this,e),$s.applyMatrix3(t),this.setXY(e,$s.x,$s.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=_n(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=he(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=_n(e,this.array)),e}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=_n(e,this.array)),e}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=_n(e,this.array)),e}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=_n(e,this.array)),e}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array),r=he(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==To&&(t.usage=this.usage),t}}class nh extends un{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ih extends un{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class _e extends un{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Kd=0;const tn=new ge,da=new we,Ui=new L,Ke=new Qn,as=new Qn,Pe=new L;class Le extends Mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(jc(t)?ih:nh)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Wt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return da.lookAt(t),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ui).negate(),this.translate(Ui.x,Ui.y,Ui.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _e(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Or);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];as.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(Ke.min,as.min),Ke.expandByPoint(Pe),Pe.addVectors(Ke.max,as.max),Ke.expandByPoint(Pe)):(Ke.expandByPoint(as.min),Ke.expandByPoint(as.max))}Ke.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Pe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Pe.fromBufferAttribute(o,c),l&&(Ui.fromBufferAttribute(t,c),Pe.add(Ui)),s=Math.max(s,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new un(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new L,l[U]=new L;const c=new L,h=new L,u=new L,d=new tt,f=new tt,g=new tt,v=new L,m=new L;function p(U,y,x){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,U),f.fromBufferAttribute(r,y),g.fromBufferAttribute(r,x),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(C),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(C),o[U].add(v),o[y].add(v),o[x].add(v),l[U].add(m),l[y].add(m),l[x].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let U=0,y=T.length;U<y;++U){const x=T[U],C=x.start,F=x.count;for(let B=C,X=C+F;B<X;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const E=new L,M=new L,w=new L,R=new L;function P(U){w.fromBufferAttribute(s,U),R.copy(w);const y=o[U];E.copy(y),E.sub(w.multiplyScalar(w.dot(y))).normalize(),M.crossVectors(R,y);const C=M.dot(l[U])<0?-1:1;a.setXYZW(U,E.x,E.y,E.z,C)}for(let U=0,y=T.length;U<y;++U){const x=T[U],C=x.start,F=x.count;for(let B=C,X=C+F;B<X;B+=3)P(t.getX(B+0)),P(t.getX(B+1)),P(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new un(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new un(d,h,u)}if(this.index===null)return kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Le,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nl=new ge,oi=new qo,Ks=new Or,Ul=new L,Zs=new L,js=new L,Js=new L,fa=new L,Qs=new L,Fl=new L,tr=new L;class Me extends we{constructor(t=new Le,e=new eh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Qs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(fa.fromBufferAttribute(u,t),a?Qs.addScaledVector(fa,h):Qs.addScaledVector(fa.sub(e),h))}e.add(Qs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ks.copy(n.boundingSphere),Ks.applyMatrix4(r),oi.copy(t.ray).recast(t.near),!(Ks.containsPoint(oi.origin)===!1&&(oi.intersectSphere(Ks,Ul)===null||oi.origin.distanceToSquared(Ul)>(t.far-t.near)**2))&&(Nl.copy(r).invert(),oi.copy(t.ray).applyMatrix4(Nl),!(n.boundingBox!==null&&oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,oi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=T,w=E;M<w;M+=3){const R=o.getX(M),P=o.getX(M+1),U=o.getX(M+2);s=er(this,p,t,n,c,h,u,R,P,U),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=o.getX(m),E=o.getX(m+1),M=o.getX(m+2);s=er(this,a,t,n,c,h,u,T,E,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=T,w=E;M<w;M+=3){const R=M,P=M+1,U=M+2;s=er(this,p,t,n,c,h,u,R,P,U),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=m,E=m+1,M=m+2;s=er(this,a,t,n,c,h,u,T,E,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Zd(i,t,e,n,s,r,a,o){let l;if(t.side===Xe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ni,o),l===null)return null;tr.copy(o),tr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(tr);return c<e.near||c>e.far?null:{distance:c,point:tr.clone(),object:i}}function er(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Zs),i.getVertexPosition(l,js),i.getVertexPosition(c,Js);const h=Zd(i,t,e,n,Zs,js,Js,Fl);if(h){const u=new L;je.getBarycoord(Fl,Zs,js,Js,u),s&&(h.uv=je.getInterpolatedAttribute(s,o,l,c,u,new tt)),r&&(h.uv1=je.getInterpolatedAttribute(r,o,l,c,u,new tt)),a&&(h.normal=je.getInterpolatedAttribute(a,o,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new L,materialIndex:0};je.getNormal(Zs,js,Js,d.normal),h.face=d,h.barycoord=u}return h}class yn extends Le{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new _e(c,3)),this.setAttribute("normal",new _e(h,3)),this.setAttribute("uv",new _e(u,2));function g(v,m,p,T,E,M,w,R,P,U,y){const x=M/P,C=w/U,F=M/2,B=w/2,X=R/2,V=P+1,H=U+1;let k=0,J=0;const pt=new L;for(let lt=0;lt<H;lt++){const ut=lt*C-B;for(let Gt=0;Gt<V;Gt++){const zt=Gt*x-F;pt[v]=zt*T,pt[m]=ut*E,pt[p]=X,c.push(pt.x,pt.y,pt.z),pt[v]=0,pt[m]=0,pt[p]=R>0?1:-1,h.push(pt.x,pt.y,pt.z),u.push(Gt/P),u.push(1-lt/U),k+=1}}for(let lt=0;lt<U;lt++)for(let ut=0;ut<P;ut++){const Gt=d+ut+V*lt,zt=d+ut+V*(lt+1),ae=d+(ut+1)+V*(lt+1),oe=d+(ut+1)+V*lt;l.push(Gt,zt,oe),l.push(zt,ae,oe),J+=6}o.addGroup(f,J,y),f+=J,d+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ji(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function ze(i){const t={};for(let e=0;e<i.length;e++){const n=Ji(i[e]);for(const s in n)t[s]=n[s]}return t}function jd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function sh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const Jd={clone:Ji,merge:ze};var Qd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends bi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qd,this.fragmentShader=tf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ji(t.uniforms),this.uniformsGroups=jd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class rh extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Kn=new L,Ol=new tt,Bl=new tt;class rn extends rh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ao*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(vs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ao*2*Math.atan(Math.tan(vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z)}getViewSize(t,e){return this.getViewBounds(t,Ol,Bl),e.subVectors(Bl,Ol)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(vs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Fi=-90,Oi=1;class ef extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(Fi,Oi,t,e);s.layers=this.layers,this.add(s);const r=new rn(Fi,Oi,t,e);r.layers=this.layers,this.add(r);const a=new rn(Fi,Oi,t,e);a.layers=this.layers,this.add(a);const o=new rn(Fi,Oi,t,e);o.layers=this.layers,this.add(o);const l=new rn(Fi,Oi,t,e);l.layers=this.layers,this.add(l);const c=new rn(Fi,Oi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Tr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ah extends Oe{constructor(t=[],e=vi,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class oh extends Mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ah(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new yn(5,5,5),r=new An({name:"CubemapFromEquirect",uniforms:Ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xe,blending:kn});r.uniforms.tEquirect.value=e;const a=new Me(s,r),o=e.minFilter;return e.minFilter===fi&&(e.minFilter=Fe),new ef(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class sn extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nf={type:"move"};class pa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new sn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new sn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new sn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new sn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class sf extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class rf{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=To,this.updateRanges=[],this.version=0,this.uuid=zn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ke=new L;class Cr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=_n(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=he(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=_n(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=_n(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=_n(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=_n(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array),r=he(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){wr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new un(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Cr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){wr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class lh extends bi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Xt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Bi;const os=new L,ki=new L,zi=new L,Vi=new tt,ls=new tt,ch=new ge,nr=new L,cs=new L,ir=new L,kl=new tt,ma=new tt,zl=new tt;class af extends we{constructor(t=new lh){if(super(),this.isSprite=!0,this.type="Sprite",Bi===void 0){Bi=new Le;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new rf(e,5);Bi.setIndex([0,1,2,0,2,3]),Bi.setAttribute("position",new Cr(n,3,0,!1)),Bi.setAttribute("uv",new Cr(n,2,3,!1))}this.geometry=Bi,this.material=t,this.center=new tt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&Jt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ki.setFromMatrixScale(this.matrixWorld),ch.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),zi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ki.multiplyScalar(-zi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;sr(nr.set(-.5,-.5,0),zi,a,ki,s,r),sr(cs.set(.5,-.5,0),zi,a,ki,s,r),sr(ir.set(.5,.5,0),zi,a,ki,s,r),kl.set(0,0),ma.set(1,0),zl.set(1,1);let o=t.ray.intersectTriangle(nr,cs,ir,!1,os);if(o===null&&(sr(cs.set(-.5,.5,0),zi,a,ki,s,r),ma.set(0,1),o=t.ray.intersectTriangle(nr,ir,cs,!1,os),o===null))return;const l=t.ray.origin.distanceTo(os);l<t.near||l>t.far||e.push({distance:l,point:os.clone(),uv:je.getInterpolation(os,nr,cs,ir,kl,ma,zl,new tt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function sr(i,t,e,n,s,r){Vi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(ls.x=r*Vi.x-s*Vi.y,ls.y=s*Vi.x+r*Vi.y):ls.copy(Vi),i.copy(t),i.x+=ls.x,i.y+=ls.y,i.applyMatrix4(ch)}class of extends Oe{constructor(t=null,e=1,n=1,s,r,a,o,l,c=De,h=De,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ga=new L,lf=new L,cf=new Wt;class Zn{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ga.subVectors(n,e).cross(lf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ga),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||cf.getNormalMatrix(t),s=this.coplanarPoint(ga).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const li=new Or,hf=new tt(.5,.5),rr=new L;class Yo{constructor(t=new Zn,e=new Zn,n=new Zn,s=new Zn,r=new Zn,a=new Zn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],T=r[12],E=r[13],M=r[14],w=r[15];if(s[0].setComponents(c-a,f-h,p-g,w-T).normalize(),s[1].setComponents(c+a,f+h,p+g,w+T).normalize(),s[2].setComponents(c+o,f+u,p+v,w+E).normalize(),s[3].setComponents(c-o,f-u,p-v,w-E).normalize(),n)s[4].setComponents(l,d,m,M).normalize(),s[5].setComponents(c-l,f-d,p-m,w-M).normalize();else if(s[4].setComponents(c-l,f-d,p-m,w-M).normalize(),e===xn)s[5].setComponents(c+l,f+d,p+m,w+M).normalize();else if(e===Tr)s[5].setComponents(l,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(t){li.center.set(0,0,0);const e=hf.distanceTo(t.center);return li.radius=.7071067811865476+e,li.applyMatrix4(t.matrixWorld),this.intersectsSphere(li)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(rr.x=s.normal.x>0?t.max.x:t.min.x,rr.y=s.normal.y>0?t.max.y:t.min.y,rr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(rr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Rr extends bi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Pr=new L,Lr=new L,Vl=new ge,hs=new qo,ar=new Or,_a=new L,Gl=new L;class hh extends we{constructor(t=new Le,e=new Rr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Pr.fromBufferAttribute(e,s-1),Lr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Pr.distanceTo(Lr);t.setAttribute("lineDistance",new _e(n,1))}else kt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ar.copy(n.boundingSphere),ar.applyMatrix4(s),ar.radius+=r,t.ray.intersectsSphere(ar)===!1)return;Vl.copy(s).invert(),hs.copy(t.ray).applyMatrix4(Vl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=h.getX(v),T=h.getX(v+1),E=or(this,t,hs,l,p,T,v);E&&e.push(E)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(f),p=or(this,t,hs,l,v,m,g-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=or(this,t,hs,l,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=or(this,t,hs,l,g-1,f,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function or(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(Pr.fromBufferAttribute(o,s),Lr.fromBufferAttribute(o,r),e.distanceSqToSegment(Pr,Lr,_a,Gl)>n)return;_a.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(_a);if(!(c<t.near||c>t.far))return{distance:c,point:Gl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Hl=new L,Wl=new L;class uh extends hh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Hl.fromBufferAttribute(e,s),Wl.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Hl.distanceTo(Wl);t.setAttribute("lineDistance",new _e(n,1))}else kt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class uf extends hh{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class df extends Oe{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class As extends Oe{constructor(t,e,n=En,s,r,a,o=De,l=De,c,h=Hn,u=1){if(h!==Hn&&h!==pi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Xo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class ff extends As{constructor(t,e=En,n=vi,s,r,a=De,o=De,l,c=Hn){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class dh extends Oe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Is extends Le{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;T(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new _e(u,3)),this.setAttribute("normal",new _e(d,3)),this.setAttribute("uv",new _e(f,2));function T(){const M=new L,w=new L;let R=0;const P=(e-t)/n;for(let U=0;U<=r;U++){const y=[],x=U/r,C=x*(e-t)+t;for(let F=0;F<=s;F++){const B=F/s,X=B*l+o,V=Math.sin(X),H=Math.cos(X);w.x=C*V,w.y=-x*n+m,w.z=C*H,u.push(w.x,w.y,w.z),M.set(V,P,H).normalize(),d.push(M.x,M.y,M.z),f.push(B,1-x),y.push(g++)}v.push(y)}for(let U=0;U<s;U++)for(let y=0;y<r;y++){const x=v[y][U],C=v[y+1][U],F=v[y+1][U+1],B=v[y][U+1];(t>0||y!==0)&&(h.push(x,C,B),R+=3),(e>0||y!==r-1)&&(h.push(C,F,B),R+=3)}c.addGroup(p,R,0),p+=R}function E(M){const w=g,R=new tt,P=new L;let U=0;const y=M===!0?t:e,x=M===!0?1:-1;for(let F=1;F<=s;F++)u.push(0,m*x,0),d.push(0,x,0),f.push(.5,.5),g++;const C=g;for(let F=0;F<=s;F++){const X=F/s*l+o,V=Math.cos(X),H=Math.sin(X);P.x=y*H,P.y=m*x,P.z=y*V,u.push(P.x,P.y,P.z),d.push(0,x,0),R.x=V*.5+.5,R.y=H*.5*x+.5,f.push(R.x,R.y),g++}for(let F=0;F<s;F++){const B=w+F,X=C+F;M===!0?h.push(X,X+1,B):h.push(X+1,X,B),U+=3}c.addGroup(p,U,M===!0?1:2),p+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Is(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $o extends Is{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new $o(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const lr=new L,cr=new L,va=new L,hr=new je;class pf extends Le{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(vs*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:v,b:m,c:p}=hr;if(v.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),hr.getNormal(va),u[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let T=0;T<3;T++){const E=(T+1)%3,M=u[T],w=u[E],R=hr[h[T]],P=hr[h[E]],U=`${M}_${w}`,y=`${w}_${M}`;y in d&&d[y]?(va.dot(d[y].normal)<=r&&(f.push(R.x,R.y,R.z),f.push(P.x,P.y,P.z)),d[y]=null):U in d||(d[U]={index0:c[T],index1:c[E],normal:va.clone()})}}for(const g in d)if(d[g]){const{index0:v,index1:m}=d[g];lr.fromBufferAttribute(o,v),cr.fromBufferAttribute(o,m),f.push(lr.x,lr.y,lr.z),f.push(cr.x,cr.y,cr.z)}this.setAttribute("position",new _e(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class wn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){kt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(a-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new tt:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,s=[],r=[],a=[],o=new L,l=new ge;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new L)}r[0]=new L,a[0]=new L;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos($t(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos($t(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ko extends wn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new tt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class mf extends Ko{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Zo(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const ur=new L,xa=new Zo,ya=new Zo,Sa=new Zo;class gf extends wn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(ur.subVectors(s[0],s[1]).add(s[0]),c=ur);const u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(ur.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ur),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),xa.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),ya.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),Sa.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(xa.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),ya.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Sa.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(xa.calc(l),ya.calc(l),Sa.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Xl(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function _f(i,t){const e=1-i;return e*e*t}function vf(i,t){return 2*(1-i)*i*t}function xf(i,t){return i*i*t}function xs(i,t,e,n){return _f(i,t)+vf(i,e)+xf(i,n)}function yf(i,t){const e=1-i;return e*e*e*t}function Sf(i,t){const e=1-i;return 3*e*e*i*t}function Mf(i,t){return 3*(1-i)*i*i*t}function bf(i,t){return i*i*i*t}function ys(i,t,e,n,s){return yf(i,t)+Sf(i,e)+Mf(i,n)+bf(i,s)}class fh extends wn{constructor(t=new tt,e=new tt,n=new tt,s=new tt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new tt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ys(t,s.x,r.x,a.x,o.x),ys(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ef extends wn{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ys(t,s.x,r.x,a.x,o.x),ys(t,s.y,r.y,a.y,o.y),ys(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ph extends wn{constructor(t=new tt,e=new tt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new tt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new tt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Tf extends wn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class mh extends wn{constructor(t=new tt,e=new tt,n=new tt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new tt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(xs(t,s.x,r.x,a.x),xs(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Af extends wn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(xs(t,s.x,r.x,a.x),xs(t,s.y,r.y,a.y),xs(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class gh extends wn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new tt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Xl(o,l.x,c.x,h.x,u.x),Xl(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new tt().fromArray(s))}return this}}var wo=Object.freeze({__proto__:null,ArcCurve:mf,CatmullRomCurve3:gf,CubicBezierCurve:fh,CubicBezierCurve3:Ef,EllipseCurve:Ko,LineCurve:ph,LineCurve3:Tf,QuadraticBezierCurve:mh,QuadraticBezierCurve3:Af,SplineCurve:gh});class wf extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wo[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new wo[s.type]().fromJSON(s))}return this}}class Co extends wf{constructor(t){super(),this.type="Path",this.currentPoint=new tt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new ph(this.currentPoint.clone(),new tt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new mh(this.currentPoint.clone(),new tt(t,e),new tt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new fh(this.currentPoint.clone(),new tt(t,e),new tt(n,s),new tt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new gh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new Ko(t,e,n,s,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class jo extends Co{constructor(t){super(t),this.uuid=zn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Co().fromJSON(s))}return this}}function Cf(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=_h(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=If(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let h=o,u=l;for(let d=e;d<s;d+=e){const f=i[d],g=i[d+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return ws(r,a,e,o,l,c,0),a}function _h(i,t,e,n,s){let r;if(s===Wf(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=ql(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=ql(a/n|0,i[a],i[a+1],r);return r&&Qi(r,r.next)&&(Rs(r),r=r.next),r}function yi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Qi(e,e.next)||xe(e.prev,e,e.next)===0)){if(Rs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ws(i,t,e,n,s,r,a){if(!i)return;!a&&r&&Bf(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?Pf(i,n,s,r):Rf(i)){t.push(l.i,i.i,c.i),Rs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Lf(yi(i),t),ws(i,t,e,n,s,r,2)):a===2&&Df(i,t,e,n,s,r):ws(yi(i),t,e,n,s,r,1);break}}}function Rf(i){const t=i.prev,e=i,n=i.next;if(xe(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),u=Math.min(o,l,c),d=Math.max(s,r,a),f=Math.max(o,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&ms(s,o,r,l,a,c,g.x,g.y)&&xe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Pf(i,t,e,n){const s=i.prev,r=i,a=i.next;if(xe(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,d=a.y,f=Math.min(o,l,c),g=Math.min(h,u,d),v=Math.max(o,l,c),m=Math.max(h,u,d),p=Ro(f,g,t,e,n),T=Ro(v,m,t,e,n);let E=i.prevZ,M=i.nextZ;for(;E&&E.z>=p&&M&&M.z<=T;){if(E.x>=f&&E.x<=v&&E.y>=g&&E.y<=m&&E!==s&&E!==a&&ms(o,h,l,u,c,d,E.x,E.y)&&xe(E.prev,E,E.next)>=0||(E=E.prevZ,M.x>=f&&M.x<=v&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&ms(o,h,l,u,c,d,M.x,M.y)&&xe(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;E&&E.z>=p;){if(E.x>=f&&E.x<=v&&E.y>=g&&E.y<=m&&E!==s&&E!==a&&ms(o,h,l,u,c,d,E.x,E.y)&&xe(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;M&&M.z<=T;){if(M.x>=f&&M.x<=v&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&ms(o,h,l,u,c,d,M.x,M.y)&&xe(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Lf(i,t){let e=i;do{const n=e.prev,s=e.next.next;!Qi(n,s)&&xh(n,e,e.next,s)&&Cs(n,s)&&Cs(s,n)&&(t.push(n.i,e.i,s.i),Rs(e),Rs(e.next),e=i=s),e=e.next}while(e!==i);return yi(e)}function Df(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Vf(a,o)){let l=yh(a,o);a=yi(a,a.next),l=yi(l,l.next),ws(a,t,e,n,s,r,0),ws(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function If(i,t,e,n){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=_h(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(zf(c))}s.sort(Nf);for(let r=0;r<s.length;r++)e=Uf(s[r],e);return e}function Nf(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Uf(i,t){const e=Ff(i,t);if(!e)return t;const n=yh(e,i);return yi(n,n.next),yi(e,e.next)}function Ff(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,a;if(Qi(i,e))return e;do{if(Qi(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&vh(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);Cs(e,i)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&Of(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function Of(i,t){return xe(i.prev,i,t.prev)<0&&xe(t.next,i,i.next)<0}function Bf(i,t,e,n){let s=i;do s.z===0&&(s.z=Ro(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,kf(s)}function kf(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Ro(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function zf(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function vh(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function ms(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&vh(i,t,e,n,s,r,a,o)}function Vf(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Gf(i,t)&&(Cs(i,t)&&Cs(t,i)&&Hf(i,t)&&(xe(i.prev,i,t.prev)||xe(i,t.prev,t))||Qi(i,t)&&xe(i.prev,i,i.next)>0&&xe(t.prev,t,t.next)>0)}function xe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Qi(i,t){return i.x===t.x&&i.y===t.y}function xh(i,t,e,n){const s=fr(xe(i,t,e)),r=fr(xe(i,t,n)),a=fr(xe(e,n,i)),o=fr(xe(e,n,t));return!!(s!==r&&a!==o||s===0&&dr(i,e,t)||r===0&&dr(i,n,t)||a===0&&dr(e,i,n)||o===0&&dr(e,t,n))}function dr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function fr(i){return i>0?1:i<0?-1:0}function Gf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&xh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Cs(i,t){return xe(i.prev,i,i.next)<0?xe(i,t,i.next)>=0&&xe(i,i.prev,t)>=0:xe(i,t,i.prev)<0||xe(i,i.next,t)<0}function Hf(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function yh(i,t){const e=Po(i.i,i.x,i.y),n=Po(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ql(i,t,e,n){const s=Po(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Rs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Po(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Wf(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Xf{static triangulate(t,e,n=2){return Cf(t,e,n)}}class Bn{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Bn.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Yl(t),$l(n,t);let a=t.length;e.forEach(Yl);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,$l(n,e[l]);const o=Xf.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Yl(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function $l(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Dr extends Le{constructor(t=new jo([new tt(.5,.5),new tt(-.5,.5),new tt(-.5,-.5),new tt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new _e(s,3)),this.setAttribute("uv",new _e(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,T=e.UVGenerator!==void 0?e.UVGenerator:qf;let E,M=!1,w,R,P,U;if(p){E=p.getSpacedPoints(h),M=!0,d=!1;const Z=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(h,Z),R=new L,P=new L,U=new L}d||(m=0,f=0,g=0,v=0);const y=o.extractPoints(c);let x=y.shape;const C=y.holes;if(!Bn.isClockWise(x)){x=x.reverse();for(let Z=0,nt=C.length;Z<nt;Z++){const j=C[Z];Bn.isClockWise(j)&&(C[Z]=j.reverse())}}function B(Z){const j=10000000000000001e-36;let gt=Z[0];for(let A=1;A<=Z.length;A++){const Dt=A%Z.length,xt=Z[Dt],Ft=xt.x-gt.x,at=xt.y-gt.y,b=Ft*Ft+at*at,_=Math.max(Math.abs(xt.x),Math.abs(xt.y),Math.abs(gt.x),Math.abs(gt.y)),I=j*_*_;if(b<=I){Z.splice(Dt,1),A--;continue}gt=xt}}B(x),C.forEach(B);const X=C.length,V=x;for(let Z=0;Z<X;Z++){const nt=C[Z];x=x.concat(nt)}function H(Z,nt,j){return nt||Jt("ExtrudeGeometry: vec does not exist"),Z.clone().addScaledVector(nt,j)}const k=x.length;function J(Z,nt,j){let gt,A,Dt;const xt=Z.x-nt.x,Ft=Z.y-nt.y,at=j.x-Z.x,b=j.y-Z.y,_=xt*xt+Ft*Ft,I=xt*b-Ft*at;if(Math.abs(I)>Number.EPSILON){const W=Math.sqrt(_),$=Math.sqrt(at*at+b*b),q=nt.x-Ft/W,wt=nt.y+xt/W,ot=j.x-b/$,Tt=j.y+at/$,Ot=((ot-q)*b-(Tt-wt)*at)/(xt*b-Ft*at);gt=q+xt*Ot-Z.x,A=wt+Ft*Ot-Z.y;const et=gt*gt+A*A;if(et<=2)return new tt(gt,A);Dt=Math.sqrt(et/2)}else{let W=!1;xt>Number.EPSILON?at>Number.EPSILON&&(W=!0):xt<-Number.EPSILON?at<-Number.EPSILON&&(W=!0):Math.sign(Ft)===Math.sign(b)&&(W=!0),W?(gt=-Ft,A=xt,Dt=Math.sqrt(_)):(gt=xt,A=Ft,Dt=Math.sqrt(_/2))}return new tt(gt/Dt,A/Dt)}const pt=[];for(let Z=0,nt=V.length,j=nt-1,gt=Z+1;Z<nt;Z++,j++,gt++)j===nt&&(j=0),gt===nt&&(gt=0),pt[Z]=J(V[Z],V[j],V[gt]);const lt=[];let ut,Gt=pt.concat();for(let Z=0,nt=X;Z<nt;Z++){const j=C[Z];ut=[];for(let gt=0,A=j.length,Dt=A-1,xt=gt+1;gt<A;gt++,Dt++,xt++)Dt===A&&(Dt=0),xt===A&&(xt=0),ut[gt]=J(j[gt],j[Dt],j[xt]);lt.push(ut),Gt=Gt.concat(ut)}let zt;if(m===0)zt=Bn.triangulateShape(V,C);else{const Z=[],nt=[];for(let j=0;j<m;j++){const gt=j/m,A=f*Math.cos(gt*Math.PI/2),Dt=g*Math.sin(gt*Math.PI/2)+v;for(let xt=0,Ft=V.length;xt<Ft;xt++){const at=H(V[xt],pt[xt],Dt);Ut(at.x,at.y,-A),gt===0&&Z.push(at)}for(let xt=0,Ft=X;xt<Ft;xt++){const at=C[xt];ut=lt[xt];const b=[];for(let _=0,I=at.length;_<I;_++){const W=H(at[_],ut[_],Dt);Ut(W.x,W.y,-A),gt===0&&b.push(W)}gt===0&&nt.push(b)}}zt=Bn.triangulateShape(Z,nt)}const ae=zt.length,oe=g+v;for(let Z=0;Z<k;Z++){const nt=d?H(x[Z],Gt[Z],oe):x[Z];M?(P.copy(w.normals[0]).multiplyScalar(nt.x),R.copy(w.binormals[0]).multiplyScalar(nt.y),U.copy(E[0]).add(P).add(R),Ut(U.x,U.y,U.z)):Ut(nt.x,nt.y,0)}for(let Z=1;Z<=h;Z++)for(let nt=0;nt<k;nt++){const j=d?H(x[nt],Gt[nt],oe):x[nt];M?(P.copy(w.normals[Z]).multiplyScalar(j.x),R.copy(w.binormals[Z]).multiplyScalar(j.y),U.copy(E[Z]).add(P).add(R),Ut(U.x,U.y,U.z)):Ut(j.x,j.y,u/h*Z)}for(let Z=m-1;Z>=0;Z--){const nt=Z/m,j=f*Math.cos(nt*Math.PI/2),gt=g*Math.sin(nt*Math.PI/2)+v;for(let A=0,Dt=V.length;A<Dt;A++){const xt=H(V[A],pt[A],gt);Ut(xt.x,xt.y,u+j)}for(let A=0,Dt=C.length;A<Dt;A++){const xt=C[A];ut=lt[A];for(let Ft=0,at=xt.length;Ft<at;Ft++){const b=H(xt[Ft],ut[Ft],gt);M?Ut(b.x,b.y+E[h-1].y,E[h-1].x+j):Ut(b.x,b.y,u+j)}}}Y(),Q();function Y(){const Z=s.length/3;if(d){let nt=0,j=k*nt;for(let gt=0;gt<ae;gt++){const A=zt[gt];bt(A[2]+j,A[1]+j,A[0]+j)}nt=h+m*2,j=k*nt;for(let gt=0;gt<ae;gt++){const A=zt[gt];bt(A[0]+j,A[1]+j,A[2]+j)}}else{for(let nt=0;nt<ae;nt++){const j=zt[nt];bt(j[2],j[1],j[0])}for(let nt=0;nt<ae;nt++){const j=zt[nt];bt(j[0]+k*h,j[1]+k*h,j[2]+k*h)}}n.addGroup(Z,s.length/3-Z,0)}function Q(){const Z=s.length/3;let nt=0;St(V,nt),nt+=V.length;for(let j=0,gt=C.length;j<gt;j++){const A=C[j];St(A,nt),nt+=A.length}n.addGroup(Z,s.length/3-Z,1)}function St(Z,nt){let j=Z.length;for(;--j>=0;){const gt=j;let A=j-1;A<0&&(A=Z.length-1);for(let Dt=0,xt=h+m*2;Dt<xt;Dt++){const Ft=k*Dt,at=k*(Dt+1),b=nt+gt+Ft,_=nt+A+Ft,I=nt+A+at,W=nt+gt+at;jt(b,_,I,W)}}}function Ut(Z,nt,j){l.push(Z),l.push(nt),l.push(j)}function bt(Z,nt,j){le(Z),le(nt),le(j);const gt=s.length/3,A=T.generateTopUV(n,s,gt-3,gt-2,gt-1);Ht(A[0]),Ht(A[1]),Ht(A[2])}function jt(Z,nt,j,gt){le(Z),le(nt),le(gt),le(nt),le(j),le(gt);const A=s.length/3,Dt=T.generateSideWallUV(n,s,A-6,A-3,A-2,A-1);Ht(Dt[0]),Ht(Dt[1]),Ht(Dt[3]),Ht(Dt[1]),Ht(Dt[2]),Ht(Dt[3])}function le(Z){s.push(l[Z*3+0]),s.push(l[Z*3+1]),s.push(l[Z*3+2])}function Ht(Z){r.push(Z.x),r.push(Z.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Yf(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new wo[s.type]().fromJSON(s)),new Dr(n,t.options)}}const qf={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new tt(r,a),new tt(o,l),new tt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new tt(a,1-l),new tt(c,1-u),new tt(d,1-g),new tt(v,1-p)]:[new tt(o,1-l),new tt(h,1-u),new tt(f,1-g),new tt(m,1-p)]}};function Yf(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Br extends Le{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,d=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const T=p*d-a;for(let E=0;E<c;E++){const M=E*u-r;g.push(M,-T,0),v.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const E=T+c*p,M=T+c*(p+1),w=T+1+c*(p+1),R=T+1+c*p;f.push(E,M,R),f.push(M,w,R)}this.setIndex(f),this.setAttribute("position",new _e(g,3)),this.setAttribute("normal",new _e(v,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Br(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ir extends Le{constructor(t=new jo([new tt(0,.5),new tt(-.5,-.5),new tt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new _e(s,3)),this.setAttribute("normal",new _e(r,3)),this.setAttribute("uv",new _e(a,2));function c(h){const u=s.length/3,d=h.extractPoints(e);let f=d.shape;const g=d.holes;Bn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const T=g[m];Bn.isClockWise(T)===!0&&(g[m]=T.reverse())}const v=Bn.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const T=g[m];f=f.concat(T)}for(let m=0,p=f.length;m<p;m++){const T=f[m];s.push(T.x,T.y,0),r.push(0,0,1),a.push(T.x,T.y)}for(let m=0,p=v.length;m<p;m++){const T=v[m],E=T[0]+u,M=T[1]+u,w=T[2]+u;n.push(E,M,w),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return $f(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const a=e[t.shapes[s]];n.push(a)}return new Ir(n,t.curveSegments)}}function $f(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class Jo extends Le{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new L,d=new L,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const T=[],E=p/n;let M=0;p===0&&a===0?M=.5/e:p===n&&l===Math.PI&&(M=-.5/e);for(let w=0;w<=e;w++){const R=w/e;u.x=-t*Math.cos(s+R*r)*Math.sin(a+E*o),u.y=t*Math.cos(a+E*o),u.z=t*Math.sin(s+R*r)*Math.sin(a+E*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(R+M,1-E),T.push(c++)}h.push(T)}for(let p=0;p<n;p++)for(let T=0;T<e;T++){const E=h[p][T+1],M=h[p][T],w=h[p+1][T],R=h[p+1][T+1];(p!==0||a>0)&&f.push(E,M,R),(p!==n-1||l<Math.PI)&&f.push(M,w,R)}this.setIndex(f),this.setAttribute("position",new _e(g,3)),this.setAttribute("normal",new _e(v,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jo(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Kf extends An{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Qo extends bi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zc,this.normalScale=new tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Fo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Zf extends bi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Md,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class jf extends bi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Sh extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Jf extends Sh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Ma=new ge,Kl=new L,Zl=new L;class Qf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new tt(512,512),this.mapType=Ze,this.map=null,this.mapPass=null,this.matrix=new ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yo,this._frameExtents=new tt(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Kl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Kl),Zl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Zl),e.updateMatrixWorld(),Ma.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ma,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ma)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class tl extends rh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class tp extends Qf{constructor(){super(new tl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ep extends Sh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new tp}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class np extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class jl{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=$t(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos($t(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class ip extends uh{constructor(t=10,e=10,n=4473924,s=8947848){n=new Xt(n),s=new Xt(s);const r=e/2,a=t/e,o=t/2,l=[],c=[];for(let d=0,f=0,g=-o;d<=e;d++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const v=d===r?n:s;v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3}const h=new Le;h.setAttribute("position",new _e(l,3)),h.setAttribute("color",new _e(c,3));const u=new Rr({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class sp extends Mi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){kt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Jl(i,t,e,n){const s=rp(n);switch(e){case Yc:return i*t;case Kc:return i*t/s.components*s.byteLength;case zo:return i*t/s.components*s.byteLength;case Zi:return i*t*2/s.components*s.byteLength;case Vo:return i*t*2/s.components*s.byteLength;case $c:return i*t*3/s.components*s.byteLength;case hn:return i*t*4/s.components*s.byteLength;case Go:return i*t*4/s.components*s.byteLength;case xr:case yr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Sr:case Mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ya:case Ka:return Math.max(i,16)*Math.max(t,8)/4;case qa:case $a:return Math.max(i,8)*Math.max(t,8)/2;case Za:case ja:case Qa:case to:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ja:case eo:case no:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case io:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case so:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ro:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ao:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case oo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case lo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case co:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ho:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case uo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case fo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case po:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case mo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case go:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case _o:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case vo:case xo:case yo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case So:case Mo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case bo:case Eo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function rp(i){switch(i){case Ze:case Hc:return{byteLength:1,components:1};case bs:case Wc:case Gn:return{byteLength:2,components:1};case Bo:case ko:return{byteLength:2,components:4};case En:case Oo:case vn:return{byteLength:4,components:1};case Xc:case qc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uo}}));typeof window<"u"&&(window.__THREE__?kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uo);function Mh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ap(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var op=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,cp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,up=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,gp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_p=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,yp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Sp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ap=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,wp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Rp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Pp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Dp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ip=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Np=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Op="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,zp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Vp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$p=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Kp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,tm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,em=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,im=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,am=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,om=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,um=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_m=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ym=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,bm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Em=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Tm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Im=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Um=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Fm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Om=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,km=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadow = step( depth, dp );
			#else
				shadow = step( dp, depth );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Hm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Wm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ym=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$m=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Km=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Zm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,eg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,rg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ag=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,og=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ug=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,fg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_g=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Tg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ag=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Cg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Lg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ig=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ug=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Og=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qt={alphahash_fragment:op,alphahash_pars_fragment:lp,alphamap_fragment:cp,alphamap_pars_fragment:hp,alphatest_fragment:up,alphatest_pars_fragment:dp,aomap_fragment:fp,aomap_pars_fragment:pp,batching_pars_vertex:mp,batching_vertex:gp,begin_vertex:_p,beginnormal_vertex:vp,bsdfs:xp,iridescence_fragment:yp,bumpmap_pars_fragment:Sp,clipping_planes_fragment:Mp,clipping_planes_pars_fragment:bp,clipping_planes_pars_vertex:Ep,clipping_planes_vertex:Tp,color_fragment:Ap,color_pars_fragment:wp,color_pars_vertex:Cp,color_vertex:Rp,common:Pp,cube_uv_reflection_fragment:Lp,defaultnormal_vertex:Dp,displacementmap_pars_vertex:Ip,displacementmap_vertex:Np,emissivemap_fragment:Up,emissivemap_pars_fragment:Fp,colorspace_fragment:Op,colorspace_pars_fragment:Bp,envmap_fragment:kp,envmap_common_pars_fragment:zp,envmap_pars_fragment:Vp,envmap_pars_vertex:Gp,envmap_physical_pars_fragment:Qp,envmap_vertex:Hp,fog_vertex:Wp,fog_pars_vertex:Xp,fog_fragment:qp,fog_pars_fragment:Yp,gradientmap_pars_fragment:$p,lightmap_pars_fragment:Kp,lights_lambert_fragment:Zp,lights_lambert_pars_fragment:jp,lights_pars_begin:Jp,lights_toon_fragment:tm,lights_toon_pars_fragment:em,lights_phong_fragment:nm,lights_phong_pars_fragment:im,lights_physical_fragment:sm,lights_physical_pars_fragment:rm,lights_fragment_begin:am,lights_fragment_maps:om,lights_fragment_end:lm,logdepthbuf_fragment:cm,logdepthbuf_pars_fragment:hm,logdepthbuf_pars_vertex:um,logdepthbuf_vertex:dm,map_fragment:fm,map_pars_fragment:pm,map_particle_fragment:mm,map_particle_pars_fragment:gm,metalnessmap_fragment:_m,metalnessmap_pars_fragment:vm,morphinstance_vertex:xm,morphcolor_vertex:ym,morphnormal_vertex:Sm,morphtarget_pars_vertex:Mm,morphtarget_vertex:bm,normal_fragment_begin:Em,normal_fragment_maps:Tm,normal_pars_fragment:Am,normal_pars_vertex:wm,normal_vertex:Cm,normalmap_pars_fragment:Rm,clearcoat_normal_fragment_begin:Pm,clearcoat_normal_fragment_maps:Lm,clearcoat_pars_fragment:Dm,iridescence_pars_fragment:Im,opaque_fragment:Nm,packing:Um,premultiplied_alpha_fragment:Fm,project_vertex:Om,dithering_fragment:Bm,dithering_pars_fragment:km,roughnessmap_fragment:zm,roughnessmap_pars_fragment:Vm,shadowmap_pars_fragment:Gm,shadowmap_pars_vertex:Hm,shadowmap_vertex:Wm,shadowmask_pars_fragment:Xm,skinbase_vertex:qm,skinning_pars_vertex:Ym,skinning_vertex:$m,skinnormal_vertex:Km,specularmap_fragment:Zm,specularmap_pars_fragment:jm,tonemapping_fragment:Jm,tonemapping_pars_fragment:Qm,transmission_fragment:tg,transmission_pars_fragment:eg,uv_pars_fragment:ng,uv_pars_vertex:ig,uv_vertex:sg,worldpos_vertex:rg,background_vert:ag,background_frag:og,backgroundCube_vert:lg,backgroundCube_frag:cg,cube_vert:hg,cube_frag:ug,depth_vert:dg,depth_frag:fg,distance_vert:pg,distance_frag:mg,equirect_vert:gg,equirect_frag:_g,linedashed_vert:vg,linedashed_frag:xg,meshbasic_vert:yg,meshbasic_frag:Sg,meshlambert_vert:Mg,meshlambert_frag:bg,meshmatcap_vert:Eg,meshmatcap_frag:Tg,meshnormal_vert:Ag,meshnormal_frag:wg,meshphong_vert:Cg,meshphong_frag:Rg,meshphysical_vert:Pg,meshphysical_frag:Lg,meshtoon_vert:Dg,meshtoon_frag:Ig,points_vert:Ng,points_frag:Ug,shadow_vert:Fg,shadow_frag:Og,sprite_vert:Bg,sprite_frag:kg},mt={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},mn={basic:{uniforms:ze([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:ze([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:ze([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:ze([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:ze([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:ze([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:ze([mt.points,mt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:ze([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:ze([mt.common,mt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:ze([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:ze([mt.sprite,mt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:ze([mt.common,mt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:ze([mt.lights,mt.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};mn.physical={uniforms:ze([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const pr={r:0,b:0,g:0},ci=new Tn,zg=new ge;function Vg(i,t,e,n,s,r,a){const o=new Xt(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?e:t).get(M)),M}function v(E){let M=!1;const w=g(E);w===null?p(o,l):w&&w.isColor&&(p(w,1),M=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,M){const w=g(M);w&&(w.isCubeTexture||w.mapping===Fr)?(h===void 0&&(h=new Me(new yn(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:Ji(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,P,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ci.copy(M.backgroundRotation),ci.x*=-1,ci.y*=-1,ci.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(zg.makeRotationFromEuler(ci)),h.material.toneMapped=te.getTransfer(w.colorSpace)!==re,(u!==w||d!==w.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=w,d=w.version,f=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Me(new Br(2,2),new An({name:"BackgroundMaterial",uniforms:Ji(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=te.getTransfer(w.colorSpace)!==re,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||d!==w.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=w,d=w.version,f=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,M){E.getRGB(pr,sh(i)),n.buffers.color.setClear(pr.r,pr.g,pr.b,M,a)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,M=1){o.set(E),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(o,l)},render:v,addToRenderList:m,dispose:T}}function Gg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(x,C,F,B,X){let V=!1;const H=u(B,F,C);r!==H&&(r=H,c(r.object)),V=f(x,B,F,X),V&&g(x,B,F,X),X!==null&&t.update(X,i.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,M(x,C,F,B),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function u(x,C,F){const B=F.wireframe===!0;let X=n[x.id];X===void 0&&(X={},n[x.id]=X);let V=X[C.id];V===void 0&&(V={},X[C.id]=V);let H=V[B];return H===void 0&&(H=d(l()),V[B]=H),H}function d(x){const C=[],F=[],B=[];for(let X=0;X<e;X++)C[X]=0,F[X]=0,B[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:F,attributeDivisors:B,object:x,attributes:{},index:null}}function f(x,C,F,B){const X=r.attributes,V=C.attributes;let H=0;const k=F.getAttributes();for(const J in k)if(k[J].location>=0){const lt=X[J];let ut=V[J];if(ut===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(ut=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(ut=x.instanceColor)),lt===void 0||lt.attribute!==ut||ut&&lt.data!==ut.data)return!0;H++}return r.attributesNum!==H||r.index!==B}function g(x,C,F,B){const X={},V=C.attributes;let H=0;const k=F.getAttributes();for(const J in k)if(k[J].location>=0){let lt=V[J];lt===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(lt=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(lt=x.instanceColor));const ut={};ut.attribute=lt,lt&&lt.data&&(ut.data=lt.data),X[J]=ut,H++}r.attributes=X,r.attributesNum=H,r.index=B}function v(){const x=r.newAttributes;for(let C=0,F=x.length;C<F;C++)x[C]=0}function m(x){p(x,0)}function p(x,C){const F=r.newAttributes,B=r.enabledAttributes,X=r.attributeDivisors;F[x]=1,B[x]===0&&(i.enableVertexAttribArray(x),B[x]=1),X[x]!==C&&(i.vertexAttribDivisor(x,C),X[x]=C)}function T(){const x=r.newAttributes,C=r.enabledAttributes;for(let F=0,B=C.length;F<B;F++)C[F]!==x[F]&&(i.disableVertexAttribArray(F),C[F]=0)}function E(x,C,F,B,X,V,H){H===!0?i.vertexAttribIPointer(x,C,F,X,V):i.vertexAttribPointer(x,C,F,B,X,V)}function M(x,C,F,B){v();const X=B.attributes,V=F.getAttributes(),H=C.defaultAttributeValues;for(const k in V){const J=V[k];if(J.location>=0){let pt=X[k];if(pt===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(pt=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(pt=x.instanceColor)),pt!==void 0){const lt=pt.normalized,ut=pt.itemSize,Gt=t.get(pt);if(Gt===void 0)continue;const zt=Gt.buffer,ae=Gt.type,oe=Gt.bytesPerElement,Y=ae===i.INT||ae===i.UNSIGNED_INT||pt.gpuType===Oo;if(pt.isInterleavedBufferAttribute){const Q=pt.data,St=Q.stride,Ut=pt.offset;if(Q.isInstancedInterleavedBuffer){for(let bt=0;bt<J.locationSize;bt++)p(J.location+bt,Q.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let bt=0;bt<J.locationSize;bt++)m(J.location+bt);i.bindBuffer(i.ARRAY_BUFFER,zt);for(let bt=0;bt<J.locationSize;bt++)E(J.location+bt,ut/J.locationSize,ae,lt,St*oe,(Ut+ut/J.locationSize*bt)*oe,Y)}else{if(pt.isInstancedBufferAttribute){for(let Q=0;Q<J.locationSize;Q++)p(J.location+Q,pt.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let Q=0;Q<J.locationSize;Q++)m(J.location+Q);i.bindBuffer(i.ARRAY_BUFFER,zt);for(let Q=0;Q<J.locationSize;Q++)E(J.location+Q,ut/J.locationSize,ae,lt,ut*oe,ut/J.locationSize*Q*oe,Y)}}else if(H!==void 0){const lt=H[k];if(lt!==void 0)switch(lt.length){case 2:i.vertexAttrib2fv(J.location,lt);break;case 3:i.vertexAttrib3fv(J.location,lt);break;case 4:i.vertexAttrib4fv(J.location,lt);break;default:i.vertexAttrib1fv(J.location,lt)}}}}T()}function w(){U();for(const x in n){const C=n[x];for(const F in C){const B=C[F];for(const X in B)h(B[X].object),delete B[X];delete C[F]}delete n[x]}}function R(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const F in C){const B=C[F];for(const X in B)h(B[X].object),delete B[X];delete C[F]}delete n[x.id]}function P(x){for(const C in n){const F=n[C];if(F[x.id]===void 0)continue;const B=F[x.id];for(const X in B)h(B[X].object),delete B[X];delete F[x.id]}}function U(){y(),a=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:y,dispose:w,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function Hg(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Wg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==hn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const U=P===Gn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Ze&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==vn&&!U)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(kt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),R=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:M,maxSamples:w,samples:R}}function Xg(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Zn,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const T=r?0:n,E=T*4;let M=p.clippingState||null;l.value=M,M=h(g,d,E,f);for(let w=0;w!==E;++w)M[w]=e[w];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,T=d.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,M=f;E!==v;++E,M+=4)a.copy(u[E]).applyMatrix4(T,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function qg(i){let t=new WeakMap;function e(a,o){return o===Ga?a.mapping=vi:o===Ha&&(a.mapping=Ki),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ga||o===Ha)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new oh(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Jn=4,Ql=[.125,.215,.35,.446,.526,.582],di=20,Yg=256,us=new tl,tc=new Xt;let ba=null,Ea=0,Ta=0,Aa=!1;const $g=new L;class ec{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=$g}=r;ba=this._renderer.getRenderTarget(),Ea=this._renderer.getActiveCubeFace(),Ta=this._renderer.getActiveMipmapLevel(),Aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ic(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(ba,Ea,Ta),this._renderer.xr.enabled=Aa,t.scissorTest=!1,Gi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===vi||t.mapping===Ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ba=this._renderer.getRenderTarget(),Ea=this._renderer.getActiveCubeFace(),Ta=this._renderer.getActiveMipmapLevel(),Aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Fe,minFilter:Fe,generateMipmaps:!1,type:Gn,format:hn,colorSpace:ji,depthBuffer:!1},s=nc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nc(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Kg(r)),this._blurMaterial=jg(r,t,e),this._ggxMaterial=Zg(r,t,e)}return s}_compileMaterial(t){const e=new Me(new Le,t);this._renderer.compile(e,us)}_sceneToCubeUV(t,e,n,s,r){const l=new rn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(tc),u.toneMapping=Sn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Me(new yn,new eh({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const T=t.background;T?T.isColor&&(m.color.copy(T),t.background=null,p=!0):(m.color.copy(tc),p=!0);for(let E=0;E<6;E++){const M=E%3;M===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):M===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const w=this._cubeSize;Gi(s,M*w,E>2?w:0,w,w),u.setRenderTarget(s),p&&u.render(v,l),u.render(t,l)}u.toneMapping=f,u.autoClear=d,t.background=T}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===vi||t.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=sc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ic());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Gi(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,us)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-Jn?n-g+Jn:0),p=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,Gi(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(o,us),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Gi(t,m,p,3*v,2*v),s.setRenderTarget(t),s.render(o,us)}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Jt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*di-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):di;m>di&&kt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${di}`);const p=[];let T=0;for(let P=0;P<di;++P){const U=P/v,y=Math.exp(-U*U/2);p.push(y),P===0?T+=y:P<m&&(T+=2*y)}for(let P=0;P<p.length;P++)p[P]=p[P]/T;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:E}=this;d.dTheta.value=g,d.mipInt.value=E-n;const M=this._sizeLods[s],w=3*M*(s>E-Jn?s-E+Jn:0),R=4*(this._cubeSize-M);Gi(e,w,R,3*M,2*M),l.setRenderTarget(e),l.render(u,us)}}function Kg(i){const t=[],e=[],n=[];let s=i;const r=i-Jn+1+Ql.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Jn?l=Ql[a-i+Jn-1]:a===0&&(l=0),e.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,T=new Float32Array(v*g*f),E=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let R=0;R<f;R++){const P=R%3*2/3-1,U=R>2?0:-1,y=[P,U,0,P+2/3,U,0,P+2/3,U+1,0,P,U,0,P+2/3,U+1,0,P,U+1,0];T.set(y,v*g*R),E.set(d,m*g*R);const x=[R,R,R,R,R,R];M.set(x,p*g*R)}const w=new Le;w.setAttribute("position",new un(T,v)),w.setAttribute("uv",new un(E,m)),w.setAttribute("faceIndex",new un(M,p)),n.push(new Me(w,null)),s>Jn&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function nc(i,t,e){const n=new Mn(i,t,e);return n.texture.mapping=Fr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Gi(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Zg(i,t,e){return new An({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Yg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:kr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function jg(i,t,e){const n=new Float32Array(di),s=new L(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function ic(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function sc(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function kr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Jg(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ga||l===Ha,h=l===vi||l===Ki;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new ec(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new ec(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Qg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ts("WebGLRenderer: "+n+" extension not supported."),s}}}function t0(i,t,e,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const T=f.array;v=f.version;for(let E=0,M=T.length;E<M;E+=3){const w=T[E+0],R=T[E+1],P=T[E+2];d.push(w,R,R,P,P,w)}}else if(g!==void 0){const T=g.array;v=g.version;for(let E=0,M=T.length/3-1;E<M;E+=3){const w=E+0,R=E+1,P=E+2;d.push(w,R,R,P,P,w)}}else return;const m=new(jc(d)?ih:nh)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function e0(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),e.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,g);let p=0;for(let T=0;T<g;T++)p+=f[T]*v[T];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function n0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Jt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function i0(i,t,e){const n=new WeakMap,s=new be;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let x=function(){U.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var f=x;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),v===!0&&(M=2),m===!0&&(M=3);let w=o.attributes.position.count*M,R=1;w>t.maxTextureSize&&(R=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const P=new Float32Array(w*R*4*u),U=new Jc(P,w,R,u);U.type=vn,U.needsUpdate=!0;const y=M*4;for(let C=0;C<u;C++){const F=p[C],B=T[C],X=E[C],V=w*R*4*C;for(let H=0;H<F.count;H++){const k=H*y;g===!0&&(s.fromBufferAttribute(F,H),P[V+k+0]=s.x,P[V+k+1]=s.y,P[V+k+2]=s.z,P[V+k+3]=0),v===!0&&(s.fromBufferAttribute(B,H),P[V+k+4]=s.x,P[V+k+5]=s.y,P[V+k+6]=s.z,P[V+k+7]=0),m===!0&&(s.fromBufferAttribute(X,H),P[V+k+8]=s.x,P[V+k+9]=s.y,P[V+k+10]=s.z,P[V+k+11]=X.itemSize===4?s.w:1)}}d={count:u,texture:U,size:new tt(w,R)},n.set(o,d),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function s0(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const r0={[Uc]:"LINEAR_TONE_MAPPING",[Fc]:"REINHARD_TONE_MAPPING",[Oc]:"CINEON_TONE_MAPPING",[Bc]:"ACES_FILMIC_TONE_MAPPING",[zc]:"AGX_TONE_MAPPING",[Vc]:"NEUTRAL_TONE_MAPPING",[kc]:"CUSTOM_TONE_MAPPING"};function a0(i,t,e,n,s){const r=new Mn(t,e,{type:i,depthBuffer:n,stencilBuffer:s}),a=new Mn(t,e,{type:Gn,depthBuffer:!1,stencilBuffer:!1}),o=new Le;o.setAttribute("position",new _e([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new _e([0,2,0,0,2,0],2));const l=new Kf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new Me(o,l),h=new tl(-1,1,1,-1,0,1);let u=null,d=null,f=!1,g,v=null,m=[],p=!1;this.setSize=function(T,E){r.setSize(T,E),a.setSize(T,E);for(let M=0;M<m.length;M++){const w=m[M];w.setSize&&w.setSize(T,E)}},this.setEffects=function(T){m=T,p=m.length>0&&m[0].isRenderPass===!0;const E=r.width,M=r.height;for(let w=0;w<m.length;w++){const R=m[w];R.setSize&&R.setSize(E,M)}},this.begin=function(T,E){if(f||T.toneMapping===Sn&&m.length===0)return!1;if(v=E,E!==null){const M=E.width,w=E.height;(r.width!==M||r.height!==w)&&this.setSize(M,w)}return p===!1&&T.setRenderTarget(r),g=T.toneMapping,T.toneMapping=Sn,!0},this.hasRenderPass=function(){return p},this.end=function(T,E){T.toneMapping=g,f=!0;let M=r,w=a;for(let R=0;R<m.length;R++){const P=m[R];if(P.enabled!==!1&&(P.render(T,w,M,E),P.needsSwap!==!1)){const U=M;M=w,w=U}}if(u!==T.outputColorSpace||d!==T.toneMapping){u=T.outputColorSpace,d=T.toneMapping,l.defines={},te.getTransfer(u)===re&&(l.defines.SRGB_TRANSFER="");const R=r0[d];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,T.setRenderTarget(v),T.render(c,h),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const bh=new Oe,Lo=new As(1,1),Eh=new Jc,Th=new kd,Ah=new ah,rc=[],ac=[],oc=new Float32Array(16),lc=new Float32Array(9),cc=new Float32Array(4);function es(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=rc[s];if(r===void 0&&(r=new Float32Array(s),rc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ce(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function zr(i,t){let e=ac[t];e===void 0&&(e=new Int32Array(t),ac[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function o0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function l0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function c0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function h0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function u0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;cc.set(n),i.uniformMatrix2fv(this.addr,!1,cc),Re(e,n)}}function d0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;lc.set(n),i.uniformMatrix3fv(this.addr,!1,lc),Re(e,n)}}function f0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;oc.set(n),i.uniformMatrix4fv(this.addr,!1,oc),Re(e,n)}}function p0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function m0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function g0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function _0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function v0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function x0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function y0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function S0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function M0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Lo.compareFunction=e.isReversedDepthBuffer()?Wo:Ho,r=Lo):r=bh,e.setTexture2D(t||r,s)}function b0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Th,s)}function E0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ah,s)}function T0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Eh,s)}function A0(i){switch(i){case 5126:return o0;case 35664:return l0;case 35665:return c0;case 35666:return h0;case 35674:return u0;case 35675:return d0;case 35676:return f0;case 5124:case 35670:return p0;case 35667:case 35671:return m0;case 35668:case 35672:return g0;case 35669:case 35673:return _0;case 5125:return v0;case 36294:return x0;case 36295:return y0;case 36296:return S0;case 35678:case 36198:case 36298:case 36306:case 35682:return M0;case 35679:case 36299:case 36307:return b0;case 35680:case 36300:case 36308:case 36293:return E0;case 36289:case 36303:case 36311:case 36292:return T0}}function w0(i,t){i.uniform1fv(this.addr,t)}function C0(i,t){const e=es(t,this.size,2);i.uniform2fv(this.addr,e)}function R0(i,t){const e=es(t,this.size,3);i.uniform3fv(this.addr,e)}function P0(i,t){const e=es(t,this.size,4);i.uniform4fv(this.addr,e)}function L0(i,t){const e=es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function D0(i,t){const e=es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function I0(i,t){const e=es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function N0(i,t){i.uniform1iv(this.addr,t)}function U0(i,t){i.uniform2iv(this.addr,t)}function F0(i,t){i.uniform3iv(this.addr,t)}function O0(i,t){i.uniform4iv(this.addr,t)}function B0(i,t){i.uniform1uiv(this.addr,t)}function k0(i,t){i.uniform2uiv(this.addr,t)}function z0(i,t){i.uniform3uiv(this.addr,t)}function V0(i,t){i.uniform4uiv(this.addr,t)}function G0(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Lo:a=bh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function H0(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Th,r[a])}function W0(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Ah,r[a])}function X0(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Eh,r[a])}function q0(i){switch(i){case 5126:return w0;case 35664:return C0;case 35665:return R0;case 35666:return P0;case 35674:return L0;case 35675:return D0;case 35676:return I0;case 5124:case 35670:return N0;case 35667:case 35671:return U0;case 35668:case 35672:return F0;case 35669:case 35673:return O0;case 5125:return B0;case 36294:return k0;case 36295:return z0;case 36296:return V0;case 35678:case 36198:case 36298:case 36306:case 35682:return G0;case 35679:case 36299:case 36307:return H0;case 35680:case 36300:case 36308:case 36293:return W0;case 36289:case 36303:case 36311:case 36292:return X0}}class Y0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=A0(e.type)}}class $0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=q0(e.type)}}class K0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const wa=/(\w+)(\])?(\[|\.)?/g;function hc(i,t){i.seq.push(t),i.map[t.id]=t}function Z0(i,t,e){const n=i.name,s=n.length;for(wa.lastIndex=0;;){const r=wa.exec(n),a=wa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){hc(e,c===void 0?new Y0(o,i,t):new $0(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new K0(o),hc(e,u)),e=u}}}class br{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Z0(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function uc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const j0=37297;let J0=0;function Q0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const dc=new Wt;function t_(i){te._getMatrix(dc,te.workingColorSpace,i);const t=`mat3( ${dc.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(i)){case Er:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return kt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function fc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Q0(i.getShaderSource(t),o)}else return r}function e_(i,t){const e=t_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const n_={[Uc]:"Linear",[Fc]:"Reinhard",[Oc]:"Cineon",[Bc]:"ACESFilmic",[zc]:"AgX",[Vc]:"Neutral",[kc]:"Custom"};function i_(i,t){const e=n_[t];return e===void 0?(kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const mr=new L;function s_(){te.getLuminanceCoefficients(mr);const i=mr.x.toFixed(4),t=mr.y.toFixed(4),e=mr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function r_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gs).join(`
`)}function a_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function o_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function gs(i){return i!==""}function pc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function mc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const l_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Do(i){return i.replace(l_,h_)}const c_=new Map;function h_(i,t){let e=qt[t];if(e===void 0){const n=c_.get(t);if(n!==void 0)e=qt[n],kt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Do(e)}const u_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gc(i){return i.replace(u_,d_)}function d_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _c(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const f_={[vr]:"SHADOWMAP_TYPE_PCF",[ps]:"SHADOWMAP_TYPE_VSM"};function p_(i){return f_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const m_={[vi]:"ENVMAP_TYPE_CUBE",[Ki]:"ENVMAP_TYPE_CUBE",[Fr]:"ENVMAP_TYPE_CUBE_UV"};function g_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":m_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const __={[Ki]:"ENVMAP_MODE_REFRACTION"};function v_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":__[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const x_={[Fo]:"ENVMAP_BLENDING_MULTIPLY",[xd]:"ENVMAP_BLENDING_MIX",[yd]:"ENVMAP_BLENDING_ADD"};function y_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":x_[i.combine]||"ENVMAP_BLENDING_NONE"}function S_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function M_(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=p_(e),c=g_(e),h=v_(e),u=y_(e),d=S_(e),f=r_(e),g=a_(r),v=s.createProgram();let m,p,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(gs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(gs).join(`
`),p.length>0&&(p+=`
`)):(m=[_c(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gs).join(`
`),p=[_c(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Sn?"#define TONE_MAPPING":"",e.toneMapping!==Sn?qt.tonemapping_pars_fragment:"",e.toneMapping!==Sn?i_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,e_("linearToOutputTexel",e.outputColorSpace),s_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(gs).join(`
`)),a=Do(a),a=pc(a,e),a=mc(a,e),o=Do(o),o=pc(o,e),o=mc(o,e),a=gc(a),o=gc(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=T+m+a,M=T+p+o,w=uc(s,s.VERTEX_SHADER,E),R=uc(s,s.FRAGMENT_SHADER,M);s.attachShader(v,w),s.attachShader(v,R),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(C){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(v)||"",B=s.getShaderInfoLog(w)||"",X=s.getShaderInfoLog(R)||"",V=F.trim(),H=B.trim(),k=X.trim();let J=!0,pt=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,w,R);else{const lt=fc(s,w,"vertex"),ut=fc(s,R,"fragment");Jt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+V+`
`+lt+`
`+ut)}else V!==""?kt("WebGLProgram: Program Info Log:",V):(H===""||k==="")&&(pt=!1);pt&&(C.diagnostics={runnable:J,programLog:V,vertexShader:{log:H,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(w),s.deleteShader(R),U=new br(s,v),y=o_(s,v)}let U;this.getUniforms=function(){return U===void 0&&P(this),U};let y;this.getAttributes=function(){return y===void 0&&P(this),y};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,j0)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=J0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=R,this}let b_=0;class E_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new T_(t),e.set(t,n)),n}}class T_{constructor(t){this.id=b_++,this.code=t,this.usedTimes=0}}function A_(i,t,e,n,s,r,a){const o=new Qc,l=new E_,c=new Set,h=[],u=new Map,d=s.logarithmicDepthBuffer;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,x,C,F,B){const X=F.fog,V=B.geometry,H=y.isMeshStandardMaterial?F.environment:null,k=(y.isMeshStandardMaterial?e:t).get(y.envMap||H),J=k&&k.mapping===Fr?k.image.height:null,pt=g[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),f!==y.precision&&kt("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const lt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ut=lt!==void 0?lt.length:0;let Gt=0;V.morphAttributes.position!==void 0&&(Gt=1),V.morphAttributes.normal!==void 0&&(Gt=2),V.morphAttributes.color!==void 0&&(Gt=3);let zt,ae,oe,Y;if(pt){const ie=mn[pt];zt=ie.vertexShader,ae=ie.fragmentShader}else zt=y.vertexShader,ae=y.fragmentShader,l.update(y),oe=l.getVertexShaderID(y),Y=l.getFragmentShaderID(y);const Q=i.getRenderTarget(),St=i.state.buffers.depth.getReversed(),Ut=B.isInstancedMesh===!0,bt=B.isBatchedMesh===!0,jt=!!y.map,le=!!y.matcap,Ht=!!k,Z=!!y.aoMap,nt=!!y.lightMap,j=!!y.bumpMap,gt=!!y.normalMap,A=!!y.displacementMap,Dt=!!y.emissiveMap,xt=!!y.metalnessMap,Ft=!!y.roughnessMap,at=y.anisotropy>0,b=y.clearcoat>0,_=y.dispersion>0,I=y.iridescence>0,W=y.sheen>0,$=y.transmission>0,q=at&&!!y.anisotropyMap,wt=b&&!!y.clearcoatMap,ot=b&&!!y.clearcoatNormalMap,Tt=b&&!!y.clearcoatRoughnessMap,Ot=I&&!!y.iridescenceMap,et=I&&!!y.iridescenceThicknessMap,dt=W&&!!y.sheenColorMap,At=W&&!!y.sheenRoughnessMap,Ct=!!y.specularMap,ht=!!y.specularColorMap,Yt=!!y.specularIntensityMap,D=$&&!!y.transmissionMap,vt=$&&!!y.thicknessMap,st=!!y.gradientMap,yt=!!y.alphaMap,it=y.alphaTest>0,K=!!y.alphaHash,ct=!!y.extensions;let Vt=Sn;y.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Vt=i.toneMapping);const fe={shaderID:pt,shaderType:y.type,shaderName:y.name,vertexShader:zt,fragmentShader:ae,defines:y.defines,customVertexShaderID:oe,customFragmentShaderID:Y,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:bt,batchingColor:bt&&B._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&B.instanceColor!==null,instancingMorph:Ut&&B.morphTexture!==null,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:ji,alphaToCoverage:!!y.alphaToCoverage,map:jt,matcap:le,envMap:Ht,envMapMode:Ht&&k.mapping,envMapCubeUVHeight:J,aoMap:Z,lightMap:nt,bumpMap:j,normalMap:gt,displacementMap:A,emissiveMap:Dt,normalMapObjectSpace:gt&&y.normalMapType===bd,normalMapTangentSpace:gt&&y.normalMapType===Zc,metalnessMap:xt,roughnessMap:Ft,anisotropy:at,anisotropyMap:q,clearcoat:b,clearcoatMap:wt,clearcoatNormalMap:ot,clearcoatRoughnessMap:Tt,dispersion:_,iridescence:I,iridescenceMap:Ot,iridescenceThicknessMap:et,sheen:W,sheenColorMap:dt,sheenRoughnessMap:At,specularMap:Ct,specularColorMap:ht,specularIntensityMap:Yt,transmission:$,transmissionMap:D,thicknessMap:vt,gradientMap:st,opaque:y.transparent===!1&&y.blending===qi&&y.alphaToCoverage===!1,alphaMap:yt,alphaTest:it,alphaHash:K,combine:y.combine,mapUv:jt&&v(y.map.channel),aoMapUv:Z&&v(y.aoMap.channel),lightMapUv:nt&&v(y.lightMap.channel),bumpMapUv:j&&v(y.bumpMap.channel),normalMapUv:gt&&v(y.normalMap.channel),displacementMapUv:A&&v(y.displacementMap.channel),emissiveMapUv:Dt&&v(y.emissiveMap.channel),metalnessMapUv:xt&&v(y.metalnessMap.channel),roughnessMapUv:Ft&&v(y.roughnessMap.channel),anisotropyMapUv:q&&v(y.anisotropyMap.channel),clearcoatMapUv:wt&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:ot&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ot&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:et&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:At&&v(y.sheenRoughnessMap.channel),specularMapUv:Ct&&v(y.specularMap.channel),specularColorMapUv:ht&&v(y.specularColorMap.channel),specularIntensityMapUv:Yt&&v(y.specularIntensityMap.channel),transmissionMapUv:D&&v(y.transmissionMap.channel),thicknessMapUv:vt&&v(y.thicknessMap.channel),alphaMapUv:yt&&v(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(gt||at),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!V.attributes.uv&&(jt||yt),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:St,skinning:B.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:Gt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Vt,decodeVideoTexture:jt&&y.map.isVideoTexture===!0&&te.getTransfer(y.map.colorSpace)===re,decodeVideoTextureEmissive:Dt&&y.emissiveMap.isVideoTexture===!0&&te.getTransfer(y.emissiveMap.colorSpace)===re,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===an,flipSided:y.side===Xe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ct&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&y.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return fe.vertexUv1s=c.has(1),fe.vertexUv2s=c.has(2),fe.vertexUv3s=c.has(3),c.clear(),fe}function p(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const C in y.defines)x.push(C),x.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(T(x,y),E(x,y),x.push(i.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function T(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function E(y,x){o.disableAll(),x.instancing&&o.enable(0),x.instancingColor&&o.enable(1),x.instancingMorph&&o.enable(2),x.matcap&&o.enable(3),x.envMap&&o.enable(4),x.normalMapObjectSpace&&o.enable(5),x.normalMapTangentSpace&&o.enable(6),x.clearcoat&&o.enable(7),x.iridescence&&o.enable(8),x.alphaTest&&o.enable(9),x.vertexColors&&o.enable(10),x.vertexAlphas&&o.enable(11),x.vertexUv1s&&o.enable(12),x.vertexUv2s&&o.enable(13),x.vertexUv3s&&o.enable(14),x.vertexTangents&&o.enable(15),x.anisotropy&&o.enable(16),x.alphaHash&&o.enable(17),x.batching&&o.enable(18),x.dispersion&&o.enable(19),x.batchingColor&&o.enable(20),x.gradientMap&&o.enable(21),y.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),y.push(o.mask)}function M(y){const x=g[y.type];let C;if(x){const F=mn[x];C=Jd.clone(F.uniforms)}else C=y.uniforms;return C}function w(y,x){let C=u.get(x);return C!==void 0?++C.usedTimes:(C=new M_(i,x,y,r),h.push(C),u.set(x,C)),C}function R(y){if(--y.usedTimes===0){const x=h.indexOf(y);h[x]=h[h.length-1],h.pop(),u.delete(y.cacheKey),y.destroy()}}function P(y){l.remove(y)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:w,releaseProgram:R,releaseShaderCache:P,programs:h,dispose:U}}function w_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function C_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function vc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function xc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,d,f,g,v,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function o(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||C_),n.length>1&&n.sort(d||vc),s.length>1&&s.sort(d||vc)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function R_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new xc,i.set(n,[a])):s>=r.length?(a=new xc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function P_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Xt};break;case"SpotLight":e={position:new L,direction:new L,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function L_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let D_=0;function I_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function N_(i){const t=new P_,e=L_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new ge,a=new ge;function o(c){let h=0,u=0,d=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,T=0,E=0,M=0,w=0,R=0,P=0;c.sort(I_);for(let y=0,x=c.length;y<x;y++){const C=c[y],F=C.color,B=C.intensity,X=C.distance;let V=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Zi?V=C.shadow.map.texture:V=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=F.r*B,u+=F.g*B,d+=F.b*B;else if(C.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(C.sh.coefficients[H],B);P++}else if(C.isDirectionalLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const k=C.shadow,J=e.get(C);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=V,n.directionalShadowMatrix[f]=C.shadow.matrix,T++}n.directional[f]=H,f++}else if(C.isSpotLight){const H=t.get(C);H.position.setFromMatrixPosition(C.matrixWorld),H.color.copy(F).multiplyScalar(B),H.distance=X,H.coneCos=Math.cos(C.angle),H.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),H.decay=C.decay,n.spot[v]=H;const k=C.shadow;if(C.map&&(n.spotLightMap[w]=C.map,w++,k.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[v]=k.matrix,C.castShadow){const J=e.get(C);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,n.spotShadow[v]=J,n.spotShadowMap[v]=V,M++}v++}else if(C.isRectAreaLight){const H=t.get(C);H.color.copy(F).multiplyScalar(B),H.halfWidth.set(C.width*.5,0,0),H.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=H,m++}else if(C.isPointLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),H.distance=C.distance,H.decay=C.decay,C.castShadow){const k=C.shadow,J=e.get(C);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,J.shadowCameraNear=k.camera.near,J.shadowCameraFar=k.camera.far,n.pointShadow[g]=J,n.pointShadowMap[g]=V,n.pointShadowMatrix[g]=C.shadow.matrix,E++}n.point[g]=H,g++}else if(C.isHemisphereLight){const H=t.get(C);H.skyColor.copy(C.color).multiplyScalar(B),H.groundColor.copy(C.groundColor).multiplyScalar(B),n.hemi[p]=H,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const U=n.hash;(U.directionalLength!==f||U.pointLength!==g||U.spotLength!==v||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==T||U.numPointShadows!==E||U.numSpotShadows!==M||U.numSpotMaps!==w||U.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+w-R,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=P,U.directionalLength=f,U.pointLength=g,U.spotLength=v,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=T,U.numPointShadows=E,U.numSpotShadows=M,U.numSpotMaps=w,U.numLightProbes=P,n.version=D_++)}function l(c,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const E=c[p];if(E.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(E.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function yc(i){const t=new N_(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function U_(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new yc(i),t.set(s,[o])):r>=a.length?(o=new yc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const F_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,B_=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],k_=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Sc=new ge,ds=new L,Ca=new L;function z_(i,t,e){let n=new Yo;const s=new tt,r=new tt,a=new be,o=new Zf,l=new jf,c={},h=e.maxTextureSize,u={[ni]:Xe,[Xe]:ni,[an]:an},d=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new tt},radius:{value:4}},vertexShader:F_,fragmentShader:O_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Le;g.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Me(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vr;let p=this.type;this.render=function(R,P,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;R.type===Nc&&(kt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),R.type=vr);const y=i.getRenderTarget(),x=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),F=i.state;F.setBlending(kn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const B=p!==this.type;B&&P.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(V=>V.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,V=R.length;X<V;X++){const H=R[X],k=H.shadow;if(k===void 0){kt("WebGLShadowMap:",H,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const J=k.getFrameExtents();if(s.multiply(J),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,k.mapSize.y=r.y)),k.map===null||B===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===ps){if(H.isPointLight){kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Mn(s.x,s.y,{format:Zi,type:Gn,minFilter:Fe,magFilter:Fe,generateMipmaps:!1}),k.map.texture.name=H.name+".shadowMap",k.map.depthTexture=new As(s.x,s.y,vn),k.map.depthTexture.name=H.name+".shadowMapDepth",k.map.depthTexture.format=Hn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=De,k.map.depthTexture.magFilter=De}else{H.isPointLight?(k.map=new oh(s.x),k.map.depthTexture=new ff(s.x,En)):(k.map=new Mn(s.x,s.y),k.map.depthTexture=new As(s.x,s.y,En)),k.map.depthTexture.name=H.name+".shadowMap",k.map.depthTexture.format=Hn;const lt=i.state.buffers.depth.getReversed();this.type===vr?(k.map.depthTexture.compareFunction=lt?Wo:Ho,k.map.depthTexture.minFilter=Fe,k.map.depthTexture.magFilter=Fe):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=De,k.map.depthTexture.magFilter=De)}k.camera.updateProjectionMatrix()}const pt=k.map.isWebGLCubeRenderTarget?6:1;for(let lt=0;lt<pt;lt++){if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,lt),i.clear();else{lt===0&&(i.setRenderTarget(k.map),i.clear());const ut=k.getViewport(lt);a.set(r.x*ut.x,r.y*ut.y,r.x*ut.z,r.y*ut.w),F.viewport(a)}if(H.isPointLight){const ut=k.camera,Gt=k.matrix,zt=H.distance||ut.far;zt!==ut.far&&(ut.far=zt,ut.updateProjectionMatrix()),ds.setFromMatrixPosition(H.matrixWorld),ut.position.copy(ds),Ca.copy(ut.position),Ca.add(B_[lt]),ut.up.copy(k_[lt]),ut.lookAt(Ca),ut.updateMatrixWorld(),Gt.makeTranslation(-ds.x,-ds.y,-ds.z),Sc.multiplyMatrices(ut.projectionMatrix,ut.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Sc,ut.coordinateSystem,ut.reversedDepth)}else k.updateMatrices(H);n=k.getFrustum(),M(P,U,k.camera,H,this.type)}k.isPointLightShadow!==!0&&this.type===ps&&T(k,U),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,x,C)};function T(R,P){const U=t.update(v);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Mn(s.x,s.y,{format:Zi,type:Gn})),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(P,null,U,d,v,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(P,null,U,f,v,null)}function E(R,P,U,y){let x=null;const C=U.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)x=C;else if(x=U.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const F=x.uuid,B=P.uuid;let X=c[F];X===void 0&&(X={},c[F]=X);let V=X[B];V===void 0&&(V=x.clone(),X[B]=V,P.addEventListener("dispose",w)),x=V}if(x.visible=P.visible,x.wireframe=P.wireframe,y===ps?x.side=P.shadowSide!==null?P.shadowSide:P.side:x.side=P.shadowSide!==null?P.shadowSide:u[P.side],x.alphaMap=P.alphaMap,x.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,x.map=P.map,x.clipShadows=P.clipShadows,x.clippingPlanes=P.clippingPlanes,x.clipIntersection=P.clipIntersection,x.displacementMap=P.displacementMap,x.displacementScale=P.displacementScale,x.displacementBias=P.displacementBias,x.wireframeLinewidth=P.wireframeLinewidth,x.linewidth=P.linewidth,U.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const F=i.properties.get(x);F.light=U}return x}function M(R,P,U,y,x){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===ps)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,R.matrixWorld);const B=t.update(R),X=R.material;if(Array.isArray(X)){const V=B.groups;for(let H=0,k=V.length;H<k;H++){const J=V[H],pt=X[J.materialIndex];if(pt&&pt.visible){const lt=E(R,pt,y,x);R.onBeforeShadow(i,R,P,U,B,lt,J),i.renderBufferDirect(U,null,B,lt,R,J),R.onAfterShadow(i,R,P,U,B,lt,J)}}}else if(X.visible){const V=E(R,X,y,x);R.onBeforeShadow(i,R,P,U,B,V,null),i.renderBufferDirect(U,null,B,V,R,null),R.onAfterShadow(i,R,P,U,B,V,null)}}const F=R.children;for(let B=0,X=F.length;B<X;B++)M(F[B],P,U,y,x)}function w(R){R.target.removeEventListener("dispose",w);for(const U in c){const y=c[U],x=R.target.uuid;x in y&&(y[x].dispose(),delete y[x])}}}const V_={[Ua]:Fa,[Oa]:za,[Ba]:Va,[$i]:ka,[Fa]:Ua,[za]:Oa,[Va]:Ba,[ka]:$i};function G_(i,t){function e(){let D=!1;const vt=new be;let st=null;const yt=new be(0,0,0,0);return{setMask:function(it){st!==it&&!D&&(i.colorMask(it,it,it,it),st=it)},setLocked:function(it){D=it},setClear:function(it,K,ct,Vt,fe){fe===!0&&(it*=Vt,K*=Vt,ct*=Vt),vt.set(it,K,ct,Vt),yt.equals(vt)===!1&&(i.clearColor(it,K,ct,Vt),yt.copy(vt))},reset:function(){D=!1,st=null,yt.set(-1,0,0,0)}}}function n(){let D=!1,vt=!1,st=null,yt=null,it=null;return{setReversed:function(K){if(vt!==K){const ct=t.get("EXT_clip_control");K?ct.clipControlEXT(ct.LOWER_LEFT_EXT,ct.ZERO_TO_ONE_EXT):ct.clipControlEXT(ct.LOWER_LEFT_EXT,ct.NEGATIVE_ONE_TO_ONE_EXT),vt=K;const Vt=it;it=null,this.setClear(Vt)}},getReversed:function(){return vt},setTest:function(K){K?Q(i.DEPTH_TEST):St(i.DEPTH_TEST)},setMask:function(K){st!==K&&!D&&(i.depthMask(K),st=K)},setFunc:function(K){if(vt&&(K=V_[K]),yt!==K){switch(K){case Ua:i.depthFunc(i.NEVER);break;case Fa:i.depthFunc(i.ALWAYS);break;case Oa:i.depthFunc(i.LESS);break;case $i:i.depthFunc(i.LEQUAL);break;case Ba:i.depthFunc(i.EQUAL);break;case ka:i.depthFunc(i.GEQUAL);break;case za:i.depthFunc(i.GREATER);break;case Va:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}yt=K}},setLocked:function(K){D=K},setClear:function(K){it!==K&&(vt&&(K=1-K),i.clearDepth(K),it=K)},reset:function(){D=!1,st=null,yt=null,it=null,vt=!1}}}function s(){let D=!1,vt=null,st=null,yt=null,it=null,K=null,ct=null,Vt=null,fe=null;return{setTest:function(ie){D||(ie?Q(i.STENCIL_TEST):St(i.STENCIL_TEST))},setMask:function(ie){vt!==ie&&!D&&(i.stencilMask(ie),vt=ie)},setFunc:function(ie,dn,Cn){(st!==ie||yt!==dn||it!==Cn)&&(i.stencilFunc(ie,dn,Cn),st=ie,yt=dn,it=Cn)},setOp:function(ie,dn,Cn){(K!==ie||ct!==dn||Vt!==Cn)&&(i.stencilOp(ie,dn,Cn),K=ie,ct=dn,Vt=Cn)},setLocked:function(ie){D=ie},setClear:function(ie){fe!==ie&&(i.clearStencil(ie),fe=ie)},reset:function(){D=!1,vt=null,st=null,yt=null,it=null,K=null,ct=null,Vt=null,fe=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,T=null,E=null,M=null,w=null,R=null,P=new Xt(0,0,0),U=0,y=!1,x=null,C=null,F=null,B=null,X=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,k=0;const J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(J)[1]),H=k>=1):J.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),H=k>=2);let pt=null,lt={};const ut=i.getParameter(i.SCISSOR_BOX),Gt=i.getParameter(i.VIEWPORT),zt=new be().fromArray(ut),ae=new be().fromArray(Gt);function oe(D,vt,st,yt){const it=new Uint8Array(4),K=i.createTexture();i.bindTexture(D,K),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ct=0;ct<st;ct++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(vt,0,i.RGBA,1,1,yt,0,i.RGBA,i.UNSIGNED_BYTE,it):i.texImage2D(vt+ct,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,it);return K}const Y={};Y[i.TEXTURE_2D]=oe(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=oe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=oe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=oe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(i.DEPTH_TEST),a.setFunc($i),j(!1),gt(gl),Q(i.CULL_FACE),Z(kn);function Q(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function St(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Ut(D,vt){return u[D]!==vt?(i.bindFramebuffer(D,vt),u[D]=vt,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=vt),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=vt),!0):!1}function bt(D,vt){let st=f,yt=!1;if(D){st=d.get(vt),st===void 0&&(st=[],d.set(vt,st));const it=D.textures;if(st.length!==it.length||st[0]!==i.COLOR_ATTACHMENT0){for(let K=0,ct=it.length;K<ct;K++)st[K]=i.COLOR_ATTACHMENT0+K;st.length=it.length,yt=!0}}else st[0]!==i.BACK&&(st[0]=i.BACK,yt=!0);yt&&i.drawBuffers(st)}function jt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const le={[ui]:i.FUNC_ADD,[nd]:i.FUNC_SUBTRACT,[id]:i.FUNC_REVERSE_SUBTRACT};le[sd]=i.MIN,le[rd]=i.MAX;const Ht={[ad]:i.ZERO,[od]:i.ONE,[ld]:i.SRC_COLOR,[Ia]:i.SRC_ALPHA,[pd]:i.SRC_ALPHA_SATURATE,[dd]:i.DST_COLOR,[hd]:i.DST_ALPHA,[cd]:i.ONE_MINUS_SRC_COLOR,[Na]:i.ONE_MINUS_SRC_ALPHA,[fd]:i.ONE_MINUS_DST_COLOR,[ud]:i.ONE_MINUS_DST_ALPHA,[md]:i.CONSTANT_COLOR,[gd]:i.ONE_MINUS_CONSTANT_COLOR,[_d]:i.CONSTANT_ALPHA,[vd]:i.ONE_MINUS_CONSTANT_ALPHA};function Z(D,vt,st,yt,it,K,ct,Vt,fe,ie){if(D===kn){v===!0&&(St(i.BLEND),v=!1);return}if(v===!1&&(Q(i.BLEND),v=!0),D!==ed){if(D!==m||ie!==y){if((p!==ui||M!==ui)&&(i.blendEquation(i.FUNC_ADD),p=ui,M=ui),ie)switch(D){case qi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _l:i.blendFunc(i.ONE,i.ONE);break;case vl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Jt("WebGLState: Invalid blending: ",D);break}else switch(D){case qi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _l:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case vl:Jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xl:Jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Jt("WebGLState: Invalid blending: ",D);break}T=null,E=null,w=null,R=null,P.set(0,0,0),U=0,m=D,y=ie}return}it=it||vt,K=K||st,ct=ct||yt,(vt!==p||it!==M)&&(i.blendEquationSeparate(le[vt],le[it]),p=vt,M=it),(st!==T||yt!==E||K!==w||ct!==R)&&(i.blendFuncSeparate(Ht[st],Ht[yt],Ht[K],Ht[ct]),T=st,E=yt,w=K,R=ct),(Vt.equals(P)===!1||fe!==U)&&(i.blendColor(Vt.r,Vt.g,Vt.b,fe),P.copy(Vt),U=fe),m=D,y=!1}function nt(D,vt){D.side===an?St(i.CULL_FACE):Q(i.CULL_FACE);let st=D.side===Xe;vt&&(st=!st),j(st),D.blending===qi&&D.transparent===!1?Z(kn):Z(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const yt=D.stencilWrite;o.setTest(yt),yt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Dt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):St(i.SAMPLE_ALPHA_TO_COVERAGE)}function j(D){x!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),x=D)}function gt(D){D!==Qu?(Q(i.CULL_FACE),D!==C&&(D===gl?i.cullFace(i.BACK):D===td?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):St(i.CULL_FACE),C=D}function A(D){D!==F&&(H&&i.lineWidth(D),F=D)}function Dt(D,vt,st){D?(Q(i.POLYGON_OFFSET_FILL),(B!==vt||X!==st)&&(i.polygonOffset(vt,st),B=vt,X=st)):St(i.POLYGON_OFFSET_FILL)}function xt(D){D?Q(i.SCISSOR_TEST):St(i.SCISSOR_TEST)}function Ft(D){D===void 0&&(D=i.TEXTURE0+V-1),pt!==D&&(i.activeTexture(D),pt=D)}function at(D,vt,st){st===void 0&&(pt===null?st=i.TEXTURE0+V-1:st=pt);let yt=lt[st];yt===void 0&&(yt={type:void 0,texture:void 0},lt[st]=yt),(yt.type!==D||yt.texture!==vt)&&(pt!==st&&(i.activeTexture(st),pt=st),i.bindTexture(D,vt||Y[D]),yt.type=D,yt.texture=vt)}function b(){const D=lt[pt];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function W(){try{i.texSubImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function $(){try{i.texSubImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function wt(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function ot(){try{i.texStorage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function Tt(){try{i.texStorage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function Ot(){try{i.texImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function et(){try{i.texImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function dt(D){zt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),zt.copy(D))}function At(D){ae.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),ae.copy(D))}function Ct(D,vt){let st=c.get(vt);st===void 0&&(st=new WeakMap,c.set(vt,st));let yt=st.get(D);yt===void 0&&(yt=i.getUniformBlockIndex(vt,D.name),st.set(D,yt))}function ht(D,vt){const yt=c.get(vt).get(D);l.get(vt)!==yt&&(i.uniformBlockBinding(vt,yt,D.__bindingPointIndex),l.set(vt,yt))}function Yt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},pt=null,lt={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,T=null,E=null,M=null,w=null,R=null,P=new Xt(0,0,0),U=0,y=!1,x=null,C=null,F=null,B=null,X=null,zt.set(0,0,i.canvas.width,i.canvas.height),ae.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:St,bindFramebuffer:Ut,drawBuffers:bt,useProgram:jt,setBlending:Z,setMaterial:nt,setFlipSided:j,setCullFace:gt,setLineWidth:A,setPolygonOffset:Dt,setScissorTest:xt,activeTexture:Ft,bindTexture:at,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:I,texImage2D:Ot,texImage3D:et,updateUBOMapping:Ct,uniformBlockBinding:ht,texStorage2D:ot,texStorage3D:Tt,texSubImage2D:W,texSubImage3D:$,compressedTexSubImage2D:q,compressedTexSubImage3D:wt,scissor:dt,viewport:At,reset:Yt}}function H_(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new tt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return f?new OffscreenCanvas(b,_):Ar("canvas")}function v(b,_,I){let W=1;const $=at(b);if(($.width>I||$.height>I)&&(W=I/Math.max($.width,$.height)),W<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const q=Math.floor(W*$.width),wt=Math.floor(W*$.height);u===void 0&&(u=g(q,wt));const ot=_?g(q,wt):u;return ot.width=q,ot.height=wt,ot.getContext("2d").drawImage(b,0,0,q,wt),kt("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+q+"x"+wt+")."),ot}else return"data"in b&&kt("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),b;return b}function m(b){return b.generateMipmaps}function p(b){i.generateMipmap(b)}function T(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(b,_,I,W,$=!1){if(b!==null){if(i[b]!==void 0)return i[b];kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let q=_;if(_===i.RED&&(I===i.FLOAT&&(q=i.R32F),I===i.HALF_FLOAT&&(q=i.R16F),I===i.UNSIGNED_BYTE&&(q=i.R8)),_===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.R8UI),I===i.UNSIGNED_SHORT&&(q=i.R16UI),I===i.UNSIGNED_INT&&(q=i.R32UI),I===i.BYTE&&(q=i.R8I),I===i.SHORT&&(q=i.R16I),I===i.INT&&(q=i.R32I)),_===i.RG&&(I===i.FLOAT&&(q=i.RG32F),I===i.HALF_FLOAT&&(q=i.RG16F),I===i.UNSIGNED_BYTE&&(q=i.RG8)),_===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.RG8UI),I===i.UNSIGNED_SHORT&&(q=i.RG16UI),I===i.UNSIGNED_INT&&(q=i.RG32UI),I===i.BYTE&&(q=i.RG8I),I===i.SHORT&&(q=i.RG16I),I===i.INT&&(q=i.RG32I)),_===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.RGB8UI),I===i.UNSIGNED_SHORT&&(q=i.RGB16UI),I===i.UNSIGNED_INT&&(q=i.RGB32UI),I===i.BYTE&&(q=i.RGB8I),I===i.SHORT&&(q=i.RGB16I),I===i.INT&&(q=i.RGB32I)),_===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),I===i.UNSIGNED_INT&&(q=i.RGBA32UI),I===i.BYTE&&(q=i.RGBA8I),I===i.SHORT&&(q=i.RGBA16I),I===i.INT&&(q=i.RGBA32I)),_===i.RGB&&(I===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),I===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),_===i.RGBA){const wt=$?Er:te.getTransfer(W);I===i.FLOAT&&(q=i.RGBA32F),I===i.HALF_FLOAT&&(q=i.RGBA16F),I===i.UNSIGNED_BYTE&&(q=wt===re?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function M(b,_){let I;return b?_===null||_===En||_===Es?I=i.DEPTH24_STENCIL8:_===vn?I=i.DEPTH32F_STENCIL8:_===bs&&(I=i.DEPTH24_STENCIL8,kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===En||_===Es?I=i.DEPTH_COMPONENT24:_===vn?I=i.DEPTH_COMPONENT32F:_===bs&&(I=i.DEPTH_COMPONENT16),I}function w(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==De&&b.minFilter!==Fe?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function R(b){const _=b.target;_.removeEventListener("dispose",R),U(_),_.isVideoTexture&&h.delete(_)}function P(b){const _=b.target;_.removeEventListener("dispose",P),x(_)}function U(b){const _=n.get(b);if(_.__webglInit===void 0)return;const I=b.source,W=d.get(I);if(W){const $=W[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&y(b),Object.keys(W).length===0&&d.delete(I)}n.remove(b)}function y(b){const _=n.get(b);i.deleteTexture(_.__webglTexture);const I=b.source,W=d.get(I);delete W[_.__cacheKey],a.memory.textures--}function x(b){const _=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let $=0;$<_.__webglFramebuffer[W].length;$++)i.deleteFramebuffer(_.__webglFramebuffer[W][$]);else i.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)i.deleteFramebuffer(_.__webglFramebuffer[W]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=b.textures;for(let W=0,$=I.length;W<$;W++){const q=n.get(I[W]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(I[W])}n.remove(b)}let C=0;function F(){C=0}function B(){const b=C;return b>=s.maxTextures&&kt("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),C+=1,b}function X(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function V(b,_){const I=n.get(b);if(b.isVideoTexture&&xt(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&I.__version!==b.version){const W=b.image;if(W===null)kt("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)kt("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(I,b,_);return}}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+_)}function H(b,_){const I=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){Y(I,b,_);return}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+_)}function k(b,_){const I=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){Y(I,b,_);return}e.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+_)}function J(b,_){const I=n.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&I.__version!==b.version){Q(I,b,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+_)}const pt={[Wa]:i.REPEAT,[On]:i.CLAMP_TO_EDGE,[Xa]:i.MIRRORED_REPEAT},lt={[De]:i.NEAREST,[Sd]:i.NEAREST_MIPMAP_NEAREST,[ks]:i.NEAREST_MIPMAP_LINEAR,[Fe]:i.LINEAR,[qr]:i.LINEAR_MIPMAP_NEAREST,[fi]:i.LINEAR_MIPMAP_LINEAR},ut={[Ed]:i.NEVER,[Rd]:i.ALWAYS,[Td]:i.LESS,[Ho]:i.LEQUAL,[Ad]:i.EQUAL,[Wo]:i.GEQUAL,[wd]:i.GREATER,[Cd]:i.NOTEQUAL};function Gt(b,_){if(_.type===vn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Fe||_.magFilter===qr||_.magFilter===ks||_.magFilter===fi||_.minFilter===Fe||_.minFilter===qr||_.minFilter===ks||_.minFilter===fi)&&kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,pt[_.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,pt[_.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,pt[_.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,lt[_.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,lt[_.minFilter]),_.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,ut[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===De||_.minFilter!==ks&&_.minFilter!==fi||_.type===vn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const I=t.get("EXT_texture_filter_anisotropic");i.texParameterf(b,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function zt(b,_){let I=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",R));const W=_.source;let $=d.get(W);$===void 0&&($={},d.set(W,$));const q=X(_);if(q!==b.__cacheKey){$[q]===void 0&&($[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,I=!0),$[q].usedTimes++;const wt=$[b.__cacheKey];wt!==void 0&&($[b.__cacheKey].usedTimes--,wt.usedTimes===0&&y(_)),b.__cacheKey=q,b.__webglTexture=$[q].texture}return I}function ae(b,_,I){return Math.floor(Math.floor(b/I)/_)}function oe(b,_,I,W){const q=b.updateRanges;if(q.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,I,W,_.data);else{q.sort((et,dt)=>et.start-dt.start);let wt=0;for(let et=1;et<q.length;et++){const dt=q[wt],At=q[et],Ct=dt.start+dt.count,ht=ae(At.start,_.width,4),Yt=ae(dt.start,_.width,4);At.start<=Ct+1&&ht===Yt&&ae(At.start+At.count-1,_.width,4)===ht?dt.count=Math.max(dt.count,At.start+At.count-dt.start):(++wt,q[wt]=At)}q.length=wt+1;const ot=i.getParameter(i.UNPACK_ROW_LENGTH),Tt=i.getParameter(i.UNPACK_SKIP_PIXELS),Ot=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let et=0,dt=q.length;et<dt;et++){const At=q[et],Ct=Math.floor(At.start/4),ht=Math.ceil(At.count/4),Yt=Ct%_.width,D=Math.floor(Ct/_.width),vt=ht,st=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Yt),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,Yt,D,vt,st,I,W,_.data)}b.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ot),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Tt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ot)}}function Y(b,_,I){let W=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=i.TEXTURE_3D);const $=zt(b,_),q=_.source;e.bindTexture(W,b.__webglTexture,i.TEXTURE0+I);const wt=n.get(q);if(q.version!==wt.__version||$===!0){e.activeTexture(i.TEXTURE0+I);const ot=te.getPrimaries(te.workingColorSpace),Tt=_.colorSpace===jn?null:te.getPrimaries(_.colorSpace),Ot=_.colorSpace===jn||ot===Tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot);let et=v(_.image,!1,s.maxTextureSize);et=Ft(_,et);const dt=r.convert(_.format,_.colorSpace),At=r.convert(_.type);let Ct=E(_.internalFormat,dt,At,_.colorSpace,_.isVideoTexture);Gt(W,_);let ht;const Yt=_.mipmaps,D=_.isVideoTexture!==!0,vt=wt.__version===void 0||$===!0,st=q.dataReady,yt=w(_,et);if(_.isDepthTexture)Ct=M(_.format===pi,_.type),vt&&(D?e.texStorage2D(i.TEXTURE_2D,1,Ct,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,Ct,et.width,et.height,0,dt,At,null));else if(_.isDataTexture)if(Yt.length>0){D&&vt&&e.texStorage2D(i.TEXTURE_2D,yt,Ct,Yt[0].width,Yt[0].height);for(let it=0,K=Yt.length;it<K;it++)ht=Yt[it],D?st&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,ht.width,ht.height,dt,At,ht.data):e.texImage2D(i.TEXTURE_2D,it,Ct,ht.width,ht.height,0,dt,At,ht.data);_.generateMipmaps=!1}else D?(vt&&e.texStorage2D(i.TEXTURE_2D,yt,Ct,et.width,et.height),st&&oe(_,et,dt,At)):e.texImage2D(i.TEXTURE_2D,0,Ct,et.width,et.height,0,dt,At,et.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,Ct,Yt[0].width,Yt[0].height,et.depth);for(let it=0,K=Yt.length;it<K;it++)if(ht=Yt[it],_.format!==hn)if(dt!==null)if(D){if(st)if(_.layerUpdates.size>0){const ct=Jl(ht.width,ht.height,_.format,_.type);for(const Vt of _.layerUpdates){const fe=ht.data.subarray(Vt*ct/ht.data.BYTES_PER_ELEMENT,(Vt+1)*ct/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,Vt,ht.width,ht.height,1,dt,fe)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,ht.width,ht.height,et.depth,dt,ht.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,it,Ct,ht.width,ht.height,et.depth,0,ht.data,0,0);else kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?st&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,ht.width,ht.height,et.depth,dt,At,ht.data):e.texImage3D(i.TEXTURE_2D_ARRAY,it,Ct,ht.width,ht.height,et.depth,0,dt,At,ht.data)}else{D&&vt&&e.texStorage2D(i.TEXTURE_2D,yt,Ct,Yt[0].width,Yt[0].height);for(let it=0,K=Yt.length;it<K;it++)ht=Yt[it],_.format!==hn?dt!==null?D?st&&e.compressedTexSubImage2D(i.TEXTURE_2D,it,0,0,ht.width,ht.height,dt,ht.data):e.compressedTexImage2D(i.TEXTURE_2D,it,Ct,ht.width,ht.height,0,ht.data):kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?st&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,ht.width,ht.height,dt,At,ht.data):e.texImage2D(i.TEXTURE_2D,it,Ct,ht.width,ht.height,0,dt,At,ht.data)}else if(_.isDataArrayTexture)if(D){if(vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,Ct,et.width,et.height,et.depth),st)if(_.layerUpdates.size>0){const it=Jl(et.width,et.height,_.format,_.type);for(const K of _.layerUpdates){const ct=et.data.subarray(K*it/et.data.BYTES_PER_ELEMENT,(K+1)*it/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,et.width,et.height,1,dt,At,ct)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,dt,At,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ct,et.width,et.height,et.depth,0,dt,At,et.data);else if(_.isData3DTexture)D?(vt&&e.texStorage3D(i.TEXTURE_3D,yt,Ct,et.width,et.height,et.depth),st&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,dt,At,et.data)):e.texImage3D(i.TEXTURE_3D,0,Ct,et.width,et.height,et.depth,0,dt,At,et.data);else if(_.isFramebufferTexture){if(vt)if(D)e.texStorage2D(i.TEXTURE_2D,yt,Ct,et.width,et.height);else{let it=et.width,K=et.height;for(let ct=0;ct<yt;ct++)e.texImage2D(i.TEXTURE_2D,ct,Ct,it,K,0,dt,At,null),it>>=1,K>>=1}}else if(Yt.length>0){if(D&&vt){const it=at(Yt[0]);e.texStorage2D(i.TEXTURE_2D,yt,Ct,it.width,it.height)}for(let it=0,K=Yt.length;it<K;it++)ht=Yt[it],D?st&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,dt,At,ht):e.texImage2D(i.TEXTURE_2D,it,Ct,dt,At,ht);_.generateMipmaps=!1}else if(D){if(vt){const it=at(et);e.texStorage2D(i.TEXTURE_2D,yt,Ct,it.width,it.height)}st&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,dt,At,et)}else e.texImage2D(i.TEXTURE_2D,0,Ct,dt,At,et);m(_)&&p(W),wt.__version=q.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Q(b,_,I){if(_.image.length!==6)return;const W=zt(b,_),$=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+I);const q=n.get($);if($.version!==q.__version||W===!0){e.activeTexture(i.TEXTURE0+I);const wt=te.getPrimaries(te.workingColorSpace),ot=_.colorSpace===jn?null:te.getPrimaries(_.colorSpace),Tt=_.colorSpace===jn||wt===ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const Ot=_.isCompressedTexture||_.image[0].isCompressedTexture,et=_.image[0]&&_.image[0].isDataTexture,dt=[];for(let K=0;K<6;K++)!Ot&&!et?dt[K]=v(_.image[K],!0,s.maxCubemapSize):dt[K]=et?_.image[K].image:_.image[K],dt[K]=Ft(_,dt[K]);const At=dt[0],Ct=r.convert(_.format,_.colorSpace),ht=r.convert(_.type),Yt=E(_.internalFormat,Ct,ht,_.colorSpace),D=_.isVideoTexture!==!0,vt=q.__version===void 0||W===!0,st=$.dataReady;let yt=w(_,At);Gt(i.TEXTURE_CUBE_MAP,_);let it;if(Ot){D&&vt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,Yt,At.width,At.height);for(let K=0;K<6;K++){it=dt[K].mipmaps;for(let ct=0;ct<it.length;ct++){const Vt=it[ct];_.format!==hn?Ct!==null?D?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct,0,0,Vt.width,Vt.height,Ct,Vt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct,Yt,Vt.width,Vt.height,0,Vt.data):kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct,0,0,Vt.width,Vt.height,Ct,ht,Vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct,Yt,Vt.width,Vt.height,0,Ct,ht,Vt.data)}}}else{if(it=_.mipmaps,D&&vt){it.length>0&&yt++;const K=at(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,Yt,K.width,K.height)}for(let K=0;K<6;K++)if(et){D?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,dt[K].width,dt[K].height,Ct,ht,dt[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Yt,dt[K].width,dt[K].height,0,Ct,ht,dt[K].data);for(let ct=0;ct<it.length;ct++){const fe=it[ct].image[K].image;D?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct+1,0,0,fe.width,fe.height,Ct,ht,fe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct+1,Yt,fe.width,fe.height,0,Ct,ht,fe.data)}}else{D?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ct,ht,dt[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Yt,Ct,ht,dt[K]);for(let ct=0;ct<it.length;ct++){const Vt=it[ct];D?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct+1,0,0,Ct,ht,Vt.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct+1,Yt,Ct,ht,Vt.image[K])}}}m(_)&&p(i.TEXTURE_CUBE_MAP),q.__version=$.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function St(b,_,I,W,$,q){const wt=r.convert(I.format,I.colorSpace),ot=r.convert(I.type),Tt=E(I.internalFormat,wt,ot,I.colorSpace),Ot=n.get(_),et=n.get(I);if(et.__renderTarget=_,!Ot.__hasExternalTextures){const dt=Math.max(1,_.width>>q),At=Math.max(1,_.height>>q);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,q,Tt,dt,At,_.depth,0,wt,ot,null):e.texImage2D($,q,Tt,dt,At,0,wt,ot,null)}e.bindFramebuffer(i.FRAMEBUFFER,b),Dt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,$,et.__webglTexture,0,A(_)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,$,et.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(b,_,I){if(i.bindRenderbuffer(i.RENDERBUFFER,b),_.depthBuffer){const W=_.depthTexture,$=W&&W.isDepthTexture?W.type:null,q=M(_.stencilBuffer,$),wt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Dt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,A(_),q,_.width,_.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,A(_),q,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,q,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,wt,i.RENDERBUFFER,b)}else{const W=_.textures;for(let $=0;$<W.length;$++){const q=W[$],wt=r.convert(q.format,q.colorSpace),ot=r.convert(q.type),Tt=E(q.internalFormat,wt,ot,q.colorSpace);Dt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,A(_),Tt,_.width,_.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,A(_),Tt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Tt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function bt(b,_,I){const W=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(_.depthTexture);if($.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),W){if($.__webglInit===void 0&&($.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Gt(i.TEXTURE_CUBE_MAP,_.depthTexture);const Ot=r.convert(_.depthTexture.format),et=r.convert(_.depthTexture.type);let dt;_.depthTexture.format===Hn?dt=i.DEPTH_COMPONENT24:_.depthTexture.format===pi&&(dt=i.DEPTH24_STENCIL8);for(let At=0;At<6;At++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+At,0,dt,_.width,_.height,0,Ot,et,null)}}else V(_.depthTexture,0);const q=$.__webglTexture,wt=A(_),ot=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+I:i.TEXTURE_2D,Tt=_.depthTexture.format===pi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Hn)Dt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Tt,ot,q,0,wt):i.framebufferTexture2D(i.FRAMEBUFFER,Tt,ot,q,0);else if(_.depthTexture.format===pi)Dt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Tt,ot,q,0,wt):i.framebufferTexture2D(i.FRAMEBUFFER,Tt,ot,q,0);else throw new Error("Unknown depthTexture format")}function jt(b){const _=n.get(b),I=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const W=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",$)};W.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=W}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(I)for(let W=0;W<6;W++)bt(_.__webglFramebuffer[W],b,W);else{const W=b.texture.mipmaps;W&&W.length>0?bt(_.__webglFramebuffer[0],b,0):bt(_.__webglFramebuffer,b,0)}else if(I){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=i.createRenderbuffer(),Ut(_.__webglDepthbuffer[W],b,!1);else{const $=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,q)}}else{const W=b.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Ut(_.__webglDepthbuffer,b,!1);else{const $=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,q)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function le(b,_,I){const W=n.get(b);_!==void 0&&St(W.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&jt(b)}function Ht(b){const _=b.texture,I=n.get(b),W=n.get(_);b.addEventListener("dispose",P);const $=b.textures,q=b.isWebGLCubeRenderTarget===!0,wt=$.length>1;if(wt||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=_.version,a.memory.textures++),q){I.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[ot]=[];for(let Tt=0;Tt<_.mipmaps.length;Tt++)I.__webglFramebuffer[ot][Tt]=i.createFramebuffer()}else I.__webglFramebuffer[ot]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let ot=0;ot<_.mipmaps.length;ot++)I.__webglFramebuffer[ot]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(wt)for(let ot=0,Tt=$.length;ot<Tt;ot++){const Ot=n.get($[ot]);Ot.__webglTexture===void 0&&(Ot.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&Dt(b)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let ot=0;ot<$.length;ot++){const Tt=$[ot];I.__webglColorRenderbuffer[ot]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[ot]);const Ot=r.convert(Tt.format,Tt.colorSpace),et=r.convert(Tt.type),dt=E(Tt.internalFormat,Ot,et,Tt.colorSpace,b.isXRRenderTarget===!0),At=A(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,At,dt,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,I.__webglColorRenderbuffer[ot])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),Ut(I.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Gt(i.TEXTURE_CUBE_MAP,_);for(let ot=0;ot<6;ot++)if(_.mipmaps&&_.mipmaps.length>0)for(let Tt=0;Tt<_.mipmaps.length;Tt++)St(I.__webglFramebuffer[ot][Tt],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Tt);else St(I.__webglFramebuffer[ot],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(_)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let ot=0,Tt=$.length;ot<Tt;ot++){const Ot=$[ot],et=n.get(Ot);let dt=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(dt=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,et.__webglTexture),Gt(dt,Ot),St(I.__webglFramebuffer,b,Ot,i.COLOR_ATTACHMENT0+ot,dt,0),m(Ot)&&p(dt)}e.unbindTexture()}else{let ot=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ot=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ot,W.__webglTexture),Gt(ot,_),_.mipmaps&&_.mipmaps.length>0)for(let Tt=0;Tt<_.mipmaps.length;Tt++)St(I.__webglFramebuffer[Tt],b,_,i.COLOR_ATTACHMENT0,ot,Tt);else St(I.__webglFramebuffer,b,_,i.COLOR_ATTACHMENT0,ot,0);m(_)&&p(ot),e.unbindTexture()}b.depthBuffer&&jt(b)}function Z(b){const _=b.textures;for(let I=0,W=_.length;I<W;I++){const $=_[I];if(m($)){const q=T(b),wt=n.get($).__webglTexture;e.bindTexture(q,wt),p(q),e.unbindTexture()}}}const nt=[],j=[];function gt(b){if(b.samples>0){if(Dt(b)===!1){const _=b.textures,I=b.width,W=b.height;let $=i.COLOR_BUFFER_BIT;const q=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,wt=n.get(b),ot=_.length>1;if(ot)for(let Ot=0;Ot<_.length;Ot++)e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ot,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ot,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer);const Tt=b.texture.mipmaps;Tt&&Tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let Ot=0;Ot<_.length;Ot++){if(b.resolveDepthBuffer&&(b.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),ot){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,wt.__webglColorRenderbuffer[Ot]);const et=n.get(_[Ot]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,et,0)}i.blitFramebuffer(0,0,I,W,0,0,I,W,$,i.NEAREST),l===!0&&(nt.length=0,j.length=0,nt.push(i.COLOR_ATTACHMENT0+Ot),b.depthBuffer&&b.resolveDepthBuffer===!1&&(nt.push(q),j.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,j)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,nt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ot)for(let Ot=0;Ot<_.length;Ot++){e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ot,i.RENDERBUFFER,wt.__webglColorRenderbuffer[Ot]);const et=n.get(_[Ot]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ot,i.TEXTURE_2D,et,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const _=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function A(b){return Math.min(s.maxSamples,b.samples)}function Dt(b){const _=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function xt(b){const _=a.render.frame;h.get(b)!==_&&(h.set(b,_),b.update())}function Ft(b,_){const I=b.colorSpace,W=b.format,$=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||I!==ji&&I!==jn&&(te.getTransfer(I)===re?(W!==hn||$!==Ze)&&kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Jt("WebGLTextures: Unsupported texture color space:",I)),_}function at(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=F,this.setTexture2D=V,this.setTexture2DArray=H,this.setTexture3D=k,this.setTextureCube=J,this.rebindTextures=le,this.setupRenderTarget=Ht,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=St,this.useMultisampledRTT=Dt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function W_(i,t){function e(n,s=jn){let r;const a=te.getTransfer(s);if(n===Ze)return i.UNSIGNED_BYTE;if(n===Bo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ko)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Hc)return i.BYTE;if(n===Wc)return i.SHORT;if(n===bs)return i.UNSIGNED_SHORT;if(n===Oo)return i.INT;if(n===En)return i.UNSIGNED_INT;if(n===vn)return i.FLOAT;if(n===Gn)return i.HALF_FLOAT;if(n===Yc)return i.ALPHA;if(n===$c)return i.RGB;if(n===hn)return i.RGBA;if(n===Hn)return i.DEPTH_COMPONENT;if(n===pi)return i.DEPTH_STENCIL;if(n===Kc)return i.RED;if(n===zo)return i.RED_INTEGER;if(n===Zi)return i.RG;if(n===Vo)return i.RG_INTEGER;if(n===Go)return i.RGBA_INTEGER;if(n===xr||n===yr||n===Sr||n===Mr)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===xr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===xr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===qa||n===Ya||n===$a||n===Ka)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===qa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ya)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$a)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ka)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Za||n===ja||n===Ja||n===Qa||n===to||n===eo||n===no)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Za||n===ja)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ja)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Qa)return r.COMPRESSED_R11_EAC;if(n===to)return r.COMPRESSED_SIGNED_R11_EAC;if(n===eo)return r.COMPRESSED_RG11_EAC;if(n===no)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===io||n===so||n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===_o)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===io)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===so)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ro)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ao)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===lo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===co)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ho)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===uo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===po)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===mo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===go)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_o)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===vo||n===xo||n===yo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===vo)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===yo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===So||n===Mo||n===bo||n===Eo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===So)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Mo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Eo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Es?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const X_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,q_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Y_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new dh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new An({vertexShader:X_,fragmentShader:q_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Me(new Br(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $_ extends Mi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new Y_,p={},T=e.getContextAttributes();let E=null,M=null;const w=[],R=[],P=new tt;let U=null;const y=new rn;y.viewport=new be;const x=new rn;x.viewport=new be;const C=[y,x],F=new np;let B=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Q=w[Y];return Q===void 0&&(Q=new pa,w[Y]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Y){let Q=w[Y];return Q===void 0&&(Q=new pa,w[Y]=Q),Q.getGripSpace()},this.getHand=function(Y){let Q=w[Y];return Q===void 0&&(Q=new pa,w[Y]=Q),Q.getHandSpace()};function V(Y){const Q=R.indexOf(Y.inputSource);if(Q===-1)return;const St=w[Q];St!==void 0&&(St.update(Y.inputSource,Y.frame,c||a),St.dispatchEvent({type:Y.type,data:Y.inputSource}))}function H(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",k);for(let Y=0;Y<w.length;Y++){const Q=R[Y];Q!==null&&(R[Y]=null,w[Y].disconnect(Q))}B=null,X=null,m.reset();for(const Y in p)delete p[Y];t.setRenderTarget(E),f=null,d=null,u=null,s=null,M=null,oe.stop(),n.isPresenting=!1,t.setPixelRatio(U),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",H),s.addEventListener("inputsourceschange",k),T.xrCompatible!==!0&&await e.makeXRCompatible(),U=t.getPixelRatio(),t.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let St=null,Ut=null,bt=null;T.depth&&(bt=T.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,St=T.stencil?pi:Hn,Ut=T.stencil?Es:En);const jt={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(jt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new Mn(d.textureWidth,d.textureHeight,{format:hn,type:Ze,depthTexture:new As(d.textureWidth,d.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,St),stencilBuffer:T.stencil,colorSpace:t.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const St={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,St),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Mn(f.framebufferWidth,f.framebufferHeight,{format:hn,type:Ze,colorSpace:t.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),oe.setContext(s),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function k(Y){for(let Q=0;Q<Y.removed.length;Q++){const St=Y.removed[Q],Ut=R.indexOf(St);Ut>=0&&(R[Ut]=null,w[Ut].disconnect(St))}for(let Q=0;Q<Y.added.length;Q++){const St=Y.added[Q];let Ut=R.indexOf(St);if(Ut===-1){for(let jt=0;jt<w.length;jt++)if(jt>=R.length){R.push(St),Ut=jt;break}else if(R[jt]===null){R[jt]=St,Ut=jt;break}if(Ut===-1)break}const bt=w[Ut];bt&&bt.connect(St)}}const J=new L,pt=new L;function lt(Y,Q,St){J.setFromMatrixPosition(Q.matrixWorld),pt.setFromMatrixPosition(St.matrixWorld);const Ut=J.distanceTo(pt),bt=Q.projectionMatrix.elements,jt=St.projectionMatrix.elements,le=bt[14]/(bt[10]-1),Ht=bt[14]/(bt[10]+1),Z=(bt[9]+1)/bt[5],nt=(bt[9]-1)/bt[5],j=(bt[8]-1)/bt[0],gt=(jt[8]+1)/jt[0],A=le*j,Dt=le*gt,xt=Ut/(-j+gt),Ft=xt*-j;if(Q.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ft),Y.translateZ(xt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),bt[10]===-1)Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const at=le+xt,b=Ht+xt,_=A-Ft,I=Dt+(Ut-Ft),W=Z*Ht/b*at,$=nt*Ht/b*at;Y.projectionMatrix.makePerspective(_,I,W,$,at,b),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ut(Y,Q){Q===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Q.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let Q=Y.near,St=Y.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(St=m.depthFar)),F.near=x.near=y.near=Q,F.far=x.far=y.far=St,(B!==F.near||X!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),B=F.near,X=F.far),F.layers.mask=Y.layers.mask|6,y.layers.mask=F.layers.mask&3,x.layers.mask=F.layers.mask&5;const Ut=Y.parent,bt=F.cameras;ut(F,Ut);for(let jt=0;jt<bt.length;jt++)ut(bt[jt],Ut);bt.length===2?lt(F,y,x):F.projectionMatrix.copy(y.projectionMatrix),Gt(Y,F,Ut)};function Gt(Y,Q,St){St===null?Y.matrix.copy(Q.matrixWorld):(Y.matrix.copy(St.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Q.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ao*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Y){return p[Y]};let zt=null;function ae(Y,Q){if(h=Q.getViewerPose(c||a),g=Q,h!==null){const St=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Ut=!1;St.length!==F.cameras.length&&(F.cameras.length=0,Ut=!0);for(let Ht=0;Ht<St.length;Ht++){const Z=St[Ht];let nt=null;if(f!==null)nt=f.getViewport(Z);else{const gt=u.getViewSubImage(d,Z);nt=gt.viewport,Ht===0&&(t.setRenderTargetTextures(M,gt.colorTexture,gt.depthStencilTexture),t.setRenderTarget(M))}let j=C[Ht];j===void 0&&(j=new rn,j.layers.enable(Ht),j.viewport=new be,C[Ht]=j),j.matrix.fromArray(Z.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(Z.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(nt.x,nt.y,nt.width,nt.height),Ht===0&&(F.matrix.copy(j.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ut===!0&&F.cameras.push(j)}const bt=s.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const Ht=u.getDepthInformation(St[0]);Ht&&Ht.isValid&&Ht.texture&&m.init(Ht,s.renderState)}if(bt&&bt.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let Ht=0;Ht<St.length;Ht++){const Z=St[Ht].camera;if(Z){let nt=p[Z];nt||(nt=new dh,p[Z]=nt);const j=u.getCameraImage(Z);nt.sourceTexture=j}}}}for(let St=0;St<w.length;St++){const Ut=R[St],bt=w[St];Ut!==null&&bt!==void 0&&bt.update(Ut,Q,c||a)}zt&&zt(Y,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const oe=new Mh;oe.setAnimationLoop(ae),this.setAnimationLoop=function(Y){zt=Y},this.dispose=function(){}}}const hi=new Tn,K_=new ge;function Z_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,sh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,E,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,T,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Xe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Xe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=t.get(p),E=T.envMap,M=T.envMapRotation;E&&(m.envMap.value=E,hi.copy(M),hi.x*=-1,hi.y*=-1,hi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),m.envMapRotation.value.setFromMatrix4(K_.makeRotationFromEuler(hi)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const T=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function j_(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,E){const M=E.program;n.uniformBlockBinding(T,M)}function c(T,E){let M=s[T.id];M===void 0&&(g(T),M=h(T),s[T.id]=M,T.addEventListener("dispose",m));const w=E.program;n.updateUBOMapping(T,w);const R=t.render.frame;r[T.id]!==R&&(d(T),r[T.id]=R)}function h(T){const E=u();T.__bindingPointIndex=E;const M=i.createBuffer(),w=T.__size,R=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,w,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,M),M}function u(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return Jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const E=s[T.id],M=T.uniforms,w=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let R=0,P=M.length;R<P;R++){const U=Array.isArray(M[R])?M[R]:[M[R]];for(let y=0,x=U.length;y<x;y++){const C=U[y];if(f(C,R,y,w)===!0){const F=C.__offset,B=Array.isArray(C.value)?C.value:[C.value];let X=0;for(let V=0;V<B.length;V++){const H=B[V],k=v(H);typeof H=="number"||typeof H=="boolean"?(C.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,F+X,C.__data)):H.isMatrix3?(C.__data[0]=H.elements[0],C.__data[1]=H.elements[1],C.__data[2]=H.elements[2],C.__data[3]=0,C.__data[4]=H.elements[3],C.__data[5]=H.elements[4],C.__data[6]=H.elements[5],C.__data[7]=0,C.__data[8]=H.elements[6],C.__data[9]=H.elements[7],C.__data[10]=H.elements[8],C.__data[11]=0):(H.toArray(C.__data,X),X+=k.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(T,E,M,w){const R=T.value,P=E+"_"+M;if(w[P]===void 0)return typeof R=="number"||typeof R=="boolean"?w[P]=R:w[P]=R.clone(),!0;{const U=w[P];if(typeof R=="number"||typeof R=="boolean"){if(U!==R)return w[P]=R,!0}else if(U.equals(R)===!1)return U.copy(R),!0}return!1}function g(T){const E=T.uniforms;let M=0;const w=16;for(let P=0,U=E.length;P<U;P++){const y=Array.isArray(E[P])?E[P]:[E[P]];for(let x=0,C=y.length;x<C;x++){const F=y[x],B=Array.isArray(F.value)?F.value:[F.value];for(let X=0,V=B.length;X<V;X++){const H=B[X],k=v(H),J=M%w,pt=J%k.boundary,lt=J+pt;M+=pt,lt!==0&&w-lt<k.storage&&(M+=w-lt),F.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=k.storage}}}const R=M%w;return R>0&&(M+=w-R),T.__size=M,T.__cache={},this}function v(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):kt("WebGLRenderer: Unsupported uniform value type.",T),E}function m(T){const E=T.target;E.removeEventListener("dispose",m);const M=a.indexOf(E.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}const J_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let fn=null;function Q_(){return fn===null&&(fn=new of(J_,16,16,Zi,Gn),fn.name="DFG_LUT",fn.minFilter=Fe,fn.magFilter=Fe,fn.wrapS=On,fn.wrapT=On,fn.generateMipmaps=!1,fn.needsUpdate=!0),fn}class tv{constructor(t={}){const{canvas:e=Pd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Ze}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const v=f,m=new Set([Go,Vo,zo]),p=new Set([Ze,En,bs,Es,Bo,ko]),T=new Uint32Array(4),E=new Int32Array(4);let M=null,w=null;const R=[],P=[];let U=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Sn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let x=!1;this._outputColorSpace=nn;let C=0,F=0,B=null,X=-1,V=null;const H=new be,k=new be;let J=null;const pt=new Xt(0);let lt=0,ut=e.width,Gt=e.height,zt=1,ae=null,oe=null;const Y=new be(0,0,ut,Gt),Q=new be(0,0,ut,Gt);let St=!1;const Ut=new Yo;let bt=!1,jt=!1;const le=new ge,Ht=new L,Z=new be,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let j=!1;function gt(){return B===null?zt:1}let A=n;function Dt(S,N){return e.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Uo}`),e.addEventListener("webglcontextlost",Vt,!1),e.addEventListener("webglcontextrestored",fe,!1),e.addEventListener("webglcontextcreationerror",ie,!1),A===null){const N="webgl2";if(A=Dt(N,S),A===null)throw Dt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Jt("WebGLRenderer: "+S.message),S}let xt,Ft,at,b,_,I,W,$,q,wt,ot,Tt,Ot,et,dt,At,Ct,ht,Yt,D,vt,st,yt,it;function K(){xt=new Qg(A),xt.init(),st=new W_(A,xt),Ft=new Wg(A,xt,t,st),at=new G_(A,xt),Ft.reversedDepthBuffer&&d&&at.buffers.depth.setReversed(!0),b=new n0(A),_=new w_,I=new H_(A,xt,at,_,Ft,st,b),W=new qg(y),$=new Jg(y),q=new ap(A),yt=new Gg(A,q),wt=new t0(A,q,b,yt),ot=new s0(A,wt,q,b),Yt=new i0(A,Ft,I),At=new Xg(_),Tt=new A_(y,W,$,xt,Ft,yt,At),Ot=new Z_(y,_),et=new R_,dt=new U_(xt),ht=new Vg(y,W,$,at,ot,g,l),Ct=new z_(y,ot,Ft),it=new j_(A,b,Ft,at),D=new Hg(A,xt,b),vt=new e0(A,xt,b),b.programs=Tt.programs,y.capabilities=Ft,y.extensions=xt,y.properties=_,y.renderLists=et,y.shadowMap=Ct,y.state=at,y.info=b}K(),v!==Ze&&(U=new a0(v,e.width,e.height,s,r));const ct=new $_(y,A);this.xr=ct,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const S=xt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=xt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return zt},this.setPixelRatio=function(S){S!==void 0&&(zt=S,this.setSize(ut,Gt,!1))},this.getSize=function(S){return S.set(ut,Gt)},this.setSize=function(S,N,G=!0){if(ct.isPresenting){kt("WebGLRenderer: Can't change size while VR device is presenting.");return}ut=S,Gt=N,e.width=Math.floor(S*zt),e.height=Math.floor(N*zt),G===!0&&(e.style.width=S+"px",e.style.height=N+"px"),U!==null&&U.setSize(e.width,e.height),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(ut*zt,Gt*zt).floor()},this.setDrawingBufferSize=function(S,N,G){ut=S,Gt=N,zt=G,e.width=Math.floor(S*G),e.height=Math.floor(N*G),this.setViewport(0,0,S,N)},this.setEffects=function(S){if(v===Ze){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let N=0;N<S.length;N++)if(S[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}U.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(H)},this.getViewport=function(S){return S.copy(Y)},this.setViewport=function(S,N,G,z){S.isVector4?Y.set(S.x,S.y,S.z,S.w):Y.set(S,N,G,z),at.viewport(H.copy(Y).multiplyScalar(zt).round())},this.getScissor=function(S){return S.copy(Q)},this.setScissor=function(S,N,G,z){S.isVector4?Q.set(S.x,S.y,S.z,S.w):Q.set(S,N,G,z),at.scissor(k.copy(Q).multiplyScalar(zt).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(S){at.setScissorTest(St=S)},this.setOpaqueSort=function(S){ae=S},this.setTransparentSort=function(S){oe=S},this.getClearColor=function(S){return S.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor(...arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,G=!0){let z=0;if(S){let O=!1;if(B!==null){const ft=B.texture.format;O=m.has(ft)}if(O){const ft=B.texture.type,Mt=p.has(ft),_t=ht.getClearColor(),Et=ht.getClearAlpha(),Rt=_t.r,Bt=_t.g,It=_t.b;Mt?(T[0]=Rt,T[1]=Bt,T[2]=It,T[3]=Et,A.clearBufferuiv(A.COLOR,0,T)):(E[0]=Rt,E[1]=Bt,E[2]=It,E[3]=Et,A.clearBufferiv(A.COLOR,0,E))}else z|=A.COLOR_BUFFER_BIT}N&&(z|=A.DEPTH_BUFFER_BIT),G&&(z|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Vt,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",ie,!1),ht.dispose(),et.dispose(),dt.dispose(),_.dispose(),W.dispose(),$.dispose(),ot.dispose(),yt.dispose(),it.dispose(),Tt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",rl),ct.removeEventListener("sessionend",al),ii.stop()};function Vt(S){S.preventDefault(),wr("WebGLRenderer: Context Lost."),x=!0}function fe(){wr("WebGLRenderer: Context Restored."),x=!1;const S=b.autoReset,N=Ct.enabled,G=Ct.autoUpdate,z=Ct.needsUpdate,O=Ct.type;K(),b.autoReset=S,Ct.enabled=N,Ct.autoUpdate=G,Ct.needsUpdate=z,Ct.type=O}function ie(S){Jt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function dn(S){const N=S.target;N.removeEventListener("dispose",dn),Cn(N)}function Cn(S){Nh(S),_.remove(S)}function Nh(S){const N=_.get(S).programs;N!==void 0&&(N.forEach(function(G){Tt.releaseProgram(G)}),S.isShaderMaterial&&Tt.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,G,z,O,ft){N===null&&(N=nt);const Mt=O.isMesh&&O.matrixWorld.determinant()<0,_t=Fh(S,N,G,z,O);at.setMaterial(z,Mt);let Et=G.index,Rt=1;if(z.wireframe===!0){if(Et=wt.getWireframeAttribute(G),Et===void 0)return;Rt=2}const Bt=G.drawRange,It=G.attributes.position;let Kt=Bt.start*Rt,ce=(Bt.start+Bt.count)*Rt;ft!==null&&(Kt=Math.max(Kt,ft.start*Rt),ce=Math.min(ce,(ft.start+ft.count)*Rt)),Et!==null?(Kt=Math.max(Kt,0),ce=Math.min(ce,Et.count)):It!=null&&(Kt=Math.max(Kt,0),ce=Math.min(ce,It.count));const ye=ce-Kt;if(ye<0||ye===1/0)return;yt.setup(O,z,_t,G,Et);let Se,de=D;if(Et!==null&&(Se=q.get(Et),de=vt,de.setIndex(Se)),O.isMesh)z.wireframe===!0?(at.setLineWidth(z.wireframeLinewidth*gt()),de.setMode(A.LINES)):de.setMode(A.TRIANGLES);else if(O.isLine){let Nt=z.linewidth;Nt===void 0&&(Nt=1),at.setLineWidth(Nt*gt()),O.isLineSegments?de.setMode(A.LINES):O.isLineLoop?de.setMode(A.LINE_LOOP):de.setMode(A.LINE_STRIP)}else O.isPoints?de.setMode(A.POINTS):O.isSprite&&de.setMode(A.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Ts("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),de.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(xt.get("WEBGL_multi_draw"))de.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Nt=O._multiDrawStarts,se=O._multiDrawCounts,ee=O._multiDrawCount,qe=Et?q.get(Et).bytesPerElement:1,Ei=_.get(z).currentProgram.getUniforms();for(let Ye=0;Ye<ee;Ye++)Ei.setValue(A,"_gl_DrawID",Ye),de.render(Nt[Ye]/qe,se[Ye])}else if(O.isInstancedMesh)de.renderInstances(Kt,ye,O.count);else if(G.isInstancedBufferGeometry){const Nt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,se=Math.min(G.instanceCount,Nt);de.renderInstances(Kt,ye,se)}else de.render(Kt,ye)};function sl(S,N,G){S.transparent===!0&&S.side===an&&S.forceSinglePass===!1?(S.side=Xe,S.needsUpdate=!0,Os(S,N,G),S.side=ni,S.needsUpdate=!0,Os(S,N,G),S.side=an):Os(S,N,G)}this.compile=function(S,N,G=null){G===null&&(G=S),w=dt.get(G),w.init(N),P.push(w),G.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),S!==G&&S.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),w.setupLights();const z=new Set;return S.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ft=O.material;if(ft)if(Array.isArray(ft))for(let Mt=0;Mt<ft.length;Mt++){const _t=ft[Mt];sl(_t,G,O),z.add(_t)}else sl(ft,G,O),z.add(ft)}),w=P.pop(),z},this.compileAsync=function(S,N,G=null){const z=this.compile(S,N,G);return new Promise(O=>{function ft(){if(z.forEach(function(Mt){_.get(Mt).currentProgram.isReady()&&z.delete(Mt)}),z.size===0){O(S);return}setTimeout(ft,10)}xt.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let Vr=null;function Uh(S){Vr&&Vr(S)}function rl(){ii.stop()}function al(){ii.start()}const ii=new Mh;ii.setAnimationLoop(Uh),typeof self<"u"&&ii.setContext(self),this.setAnimationLoop=function(S){Vr=S,ct.setAnimationLoop(S),S===null?ii.stop():ii.start()},ct.addEventListener("sessionstart",rl),ct.addEventListener("sessionend",al),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){Jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;const G=ct.enabled===!0&&ct.isPresenting===!0,z=U!==null&&(B===null||G)&&U.begin(y,B);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(U===null||U.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(N),N=ct.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,N,B),w=dt.get(S,P.length),w.init(N),P.push(w),le.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ut.setFromProjectionMatrix(le,xn,N.reversedDepth),jt=this.localClippingEnabled,bt=At.init(this.clippingPlanes,jt),M=et.get(S,R.length),M.init(),R.push(M),ct.enabled===!0&&ct.isPresenting===!0){const Mt=y.xr.getDepthSensingMesh();Mt!==null&&Gr(Mt,N,-1/0,y.sortObjects)}Gr(S,N,0,y.sortObjects),M.finish(),y.sortObjects===!0&&M.sort(ae,oe),j=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,j&&ht.addToRenderList(M,S),this.info.render.frame++,bt===!0&&At.beginShadows();const O=w.state.shadowsArray;if(Ct.render(O,S,N),bt===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&U.hasRenderPass())===!1){const Mt=M.opaque,_t=M.transmissive;if(w.setupLights(),N.isArrayCamera){const Et=N.cameras;if(_t.length>0)for(let Rt=0,Bt=Et.length;Rt<Bt;Rt++){const It=Et[Rt];ll(Mt,_t,S,It)}j&&ht.render(S);for(let Rt=0,Bt=Et.length;Rt<Bt;Rt++){const It=Et[Rt];ol(M,S,It,It.viewport)}}else _t.length>0&&ll(Mt,_t,S,N),j&&ht.render(S),ol(M,S,N)}B!==null&&F===0&&(I.updateMultisampleRenderTarget(B),I.updateRenderTargetMipmap(B)),z&&U.end(y),S.isScene===!0&&S.onAfterRender(y,S,N),yt.resetDefaultState(),X=-1,V=null,P.pop(),P.length>0?(w=P[P.length-1],bt===!0&&At.setGlobalState(y.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?M=R[R.length-1]:M=null};function Gr(S,N,G,z){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ut.intersectsSprite(S)){z&&Z.setFromMatrixPosition(S.matrixWorld).applyMatrix4(le);const Mt=ot.update(S),_t=S.material;_t.visible&&M.push(S,Mt,_t,G,Z.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ut.intersectsObject(S))){const Mt=ot.update(S),_t=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Z.copy(S.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),Z.copy(Mt.boundingSphere.center)),Z.applyMatrix4(S.matrixWorld).applyMatrix4(le)),Array.isArray(_t)){const Et=Mt.groups;for(let Rt=0,Bt=Et.length;Rt<Bt;Rt++){const It=Et[Rt],Kt=_t[It.materialIndex];Kt&&Kt.visible&&M.push(S,Mt,Kt,G,Z.z,It)}}else _t.visible&&M.push(S,Mt,_t,G,Z.z,null)}}const ft=S.children;for(let Mt=0,_t=ft.length;Mt<_t;Mt++)Gr(ft[Mt],N,G,z)}function ol(S,N,G,z){const{opaque:O,transmissive:ft,transparent:Mt}=S;w.setupLightsView(G),bt===!0&&At.setGlobalState(y.clippingPlanes,G),z&&at.viewport(H.copy(z)),O.length>0&&Fs(O,N,G),ft.length>0&&Fs(ft,N,G),Mt.length>0&&Fs(Mt,N,G),at.buffers.depth.setTest(!0),at.buffers.depth.setMask(!0),at.buffers.color.setMask(!0),at.setPolygonOffset(!1)}function ll(S,N,G,z){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[z.id]===void 0){const Kt=xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[z.id]=new Mn(1,1,{generateMipmaps:!0,type:Kt?Gn:Ze,minFilter:fi,samples:Ft.samples,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace})}const ft=w.state.transmissionRenderTarget[z.id],Mt=z.viewport||H;ft.setSize(Mt.z*y.transmissionResolutionScale,Mt.w*y.transmissionResolutionScale);const _t=y.getRenderTarget(),Et=y.getActiveCubeFace(),Rt=y.getActiveMipmapLevel();y.setRenderTarget(ft),y.getClearColor(pt),lt=y.getClearAlpha(),lt<1&&y.setClearColor(16777215,.5),y.clear(),j&&ht.render(G);const Bt=y.toneMapping;y.toneMapping=Sn;const It=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),w.setupLightsView(z),bt===!0&&At.setGlobalState(y.clippingPlanes,z),Fs(S,G,z),I.updateMultisampleRenderTarget(ft),I.updateRenderTargetMipmap(ft),xt.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let ce=0,ye=N.length;ce<ye;ce++){const Se=N[ce],{object:de,geometry:Nt,material:se,group:ee}=Se;if(se.side===an&&de.layers.test(z.layers)){const qe=se.side;se.side=Xe,se.needsUpdate=!0,cl(de,G,z,Nt,se,ee),se.side=qe,se.needsUpdate=!0,Kt=!0}}Kt===!0&&(I.updateMultisampleRenderTarget(ft),I.updateRenderTargetMipmap(ft))}y.setRenderTarget(_t,Et,Rt),y.setClearColor(pt,lt),It!==void 0&&(z.viewport=It),y.toneMapping=Bt}function Fs(S,N,G){const z=N.isScene===!0?N.overrideMaterial:null;for(let O=0,ft=S.length;O<ft;O++){const Mt=S[O],{object:_t,geometry:Et,group:Rt}=Mt;let Bt=Mt.material;Bt.allowOverride===!0&&z!==null&&(Bt=z),_t.layers.test(G.layers)&&cl(_t,N,G,Et,Bt,Rt)}}function cl(S,N,G,z,O,ft){S.onBeforeRender(y,N,G,z,O,ft),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(y,N,G,z,S,ft),O.transparent===!0&&O.side===an&&O.forceSinglePass===!1?(O.side=Xe,O.needsUpdate=!0,y.renderBufferDirect(G,N,z,O,S,ft),O.side=ni,O.needsUpdate=!0,y.renderBufferDirect(G,N,z,O,S,ft),O.side=an):y.renderBufferDirect(G,N,z,O,S,ft),S.onAfterRender(y,N,G,z,O,ft)}function Os(S,N,G){N.isScene!==!0&&(N=nt);const z=_.get(S),O=w.state.lights,ft=w.state.shadowsArray,Mt=O.state.version,_t=Tt.getParameters(S,O.state,ft,N,G),Et=Tt.getProgramCacheKey(_t);let Rt=z.programs;z.environment=S.isMeshStandardMaterial?N.environment:null,z.fog=N.fog,z.envMap=(S.isMeshStandardMaterial?$:W).get(S.envMap||z.environment),z.envMapRotation=z.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Rt===void 0&&(S.addEventListener("dispose",dn),Rt=new Map,z.programs=Rt);let Bt=Rt.get(Et);if(Bt!==void 0){if(z.currentProgram===Bt&&z.lightsStateVersion===Mt)return ul(S,_t),Bt}else _t.uniforms=Tt.getUniforms(S),S.onBeforeCompile(_t,y),Bt=Tt.acquireProgram(_t,Et),Rt.set(Et,Bt),z.uniforms=_t.uniforms;const It=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(It.clippingPlanes=At.uniform),ul(S,_t),z.needsLights=Bh(S),z.lightsStateVersion=Mt,z.needsLights&&(It.ambientLightColor.value=O.state.ambient,It.lightProbe.value=O.state.probe,It.directionalLights.value=O.state.directional,It.directionalLightShadows.value=O.state.directionalShadow,It.spotLights.value=O.state.spot,It.spotLightShadows.value=O.state.spotShadow,It.rectAreaLights.value=O.state.rectArea,It.ltc_1.value=O.state.rectAreaLTC1,It.ltc_2.value=O.state.rectAreaLTC2,It.pointLights.value=O.state.point,It.pointLightShadows.value=O.state.pointShadow,It.hemisphereLights.value=O.state.hemi,It.directionalShadowMap.value=O.state.directionalShadowMap,It.directionalShadowMatrix.value=O.state.directionalShadowMatrix,It.spotShadowMap.value=O.state.spotShadowMap,It.spotLightMatrix.value=O.state.spotLightMatrix,It.spotLightMap.value=O.state.spotLightMap,It.pointShadowMap.value=O.state.pointShadowMap,It.pointShadowMatrix.value=O.state.pointShadowMatrix),z.currentProgram=Bt,z.uniformsList=null,Bt}function hl(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=br.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function ul(S,N){const G=_.get(S);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.batchingColor=N.batchingColor,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.instancingMorph=N.instancingMorph,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function Fh(S,N,G,z,O){N.isScene!==!0&&(N=nt),I.resetTextureUnits();const ft=N.fog,Mt=z.isMeshStandardMaterial?N.environment:null,_t=B===null?y.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:ji,Et=(z.isMeshStandardMaterial?$:W).get(z.envMap||Mt),Rt=z.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Bt=!!G.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),It=!!G.morphAttributes.position,Kt=!!G.morphAttributes.normal,ce=!!G.morphAttributes.color;let ye=Sn;z.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(ye=y.toneMapping);const Se=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,de=Se!==void 0?Se.length:0,Nt=_.get(z),se=w.state.lights;if(bt===!0&&(jt===!0||S!==V)){const Be=S===V&&z.id===X;At.setState(z,S,Be)}let ee=!1;z.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==se.state.version||Nt.outputColorSpace!==_t||O.isBatchedMesh&&Nt.batching===!1||!O.isBatchedMesh&&Nt.batching===!0||O.isBatchedMesh&&Nt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Nt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Nt.instancing===!1||!O.isInstancedMesh&&Nt.instancing===!0||O.isSkinnedMesh&&Nt.skinning===!1||!O.isSkinnedMesh&&Nt.skinning===!0||O.isInstancedMesh&&Nt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Nt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Nt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Nt.instancingMorph===!1&&O.morphTexture!==null||Nt.envMap!==Et||z.fog===!0&&Nt.fog!==ft||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==At.numPlanes||Nt.numIntersection!==At.numIntersection)||Nt.vertexAlphas!==Rt||Nt.vertexTangents!==Bt||Nt.morphTargets!==It||Nt.morphNormals!==Kt||Nt.morphColors!==ce||Nt.toneMapping!==ye||Nt.morphTargetsCount!==de)&&(ee=!0):(ee=!0,Nt.__version=z.version);let qe=Nt.currentProgram;ee===!0&&(qe=Os(z,N,O));let Ei=!1,Ye=!1,ns=!1;const pe=qe.getUniforms(),Ge=Nt.uniforms;if(at.useProgram(qe.program)&&(Ei=!0,Ye=!0,ns=!0),z.id!==X&&(X=z.id,Ye=!0),Ei||V!==S){at.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),pe.setValue(A,"projectionMatrix",S.projectionMatrix),pe.setValue(A,"viewMatrix",S.matrixWorldInverse);const He=pe.map.cameraPosition;He!==void 0&&He.setValue(A,Ht.setFromMatrixPosition(S.matrixWorld)),Ft.logarithmicDepthBuffer&&pe.setValue(A,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&pe.setValue(A,"isOrthographic",S.isOrthographicCamera===!0),V!==S&&(V=S,Ye=!0,ns=!0)}if(Nt.needsLights&&(se.state.directionalShadowMap.length>0&&pe.setValue(A,"directionalShadowMap",se.state.directionalShadowMap,I),se.state.spotShadowMap.length>0&&pe.setValue(A,"spotShadowMap",se.state.spotShadowMap,I),se.state.pointShadowMap.length>0&&pe.setValue(A,"pointShadowMap",se.state.pointShadowMap,I)),O.isSkinnedMesh){pe.setOptional(A,O,"bindMatrix"),pe.setOptional(A,O,"bindMatrixInverse");const Be=O.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),pe.setValue(A,"boneTexture",Be.boneTexture,I))}O.isBatchedMesh&&(pe.setOptional(A,O,"batchingTexture"),pe.setValue(A,"batchingTexture",O._matricesTexture,I),pe.setOptional(A,O,"batchingIdTexture"),pe.setValue(A,"batchingIdTexture",O._indirectTexture,I),pe.setOptional(A,O,"batchingColorTexture"),O._colorsTexture!==null&&pe.setValue(A,"batchingColorTexture",O._colorsTexture,I));const Qe=G.morphAttributes;if((Qe.position!==void 0||Qe.normal!==void 0||Qe.color!==void 0)&&Yt.update(O,G,qe),(Ye||Nt.receiveShadow!==O.receiveShadow)&&(Nt.receiveShadow=O.receiveShadow,pe.setValue(A,"receiveShadow",O.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Ge.envMap.value=Et,Ge.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&N.environment!==null&&(Ge.envMapIntensity.value=N.environmentIntensity),Ge.dfgLUT!==void 0&&(Ge.dfgLUT.value=Q_()),Ye&&(pe.setValue(A,"toneMappingExposure",y.toneMappingExposure),Nt.needsLights&&Oh(Ge,ns),ft&&z.fog===!0&&Ot.refreshFogUniforms(Ge,ft),Ot.refreshMaterialUniforms(Ge,z,zt,Gt,w.state.transmissionRenderTarget[S.id]),br.upload(A,hl(Nt),Ge,I)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(br.upload(A,hl(Nt),Ge,I),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&pe.setValue(A,"center",O.center),pe.setValue(A,"modelViewMatrix",O.modelViewMatrix),pe.setValue(A,"normalMatrix",O.normalMatrix),pe.setValue(A,"modelMatrix",O.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Be=z.uniformsGroups;for(let He=0,Hr=Be.length;He<Hr;He++){const si=Be[He];it.update(si,qe),it.bind(si,qe)}}return qe}function Oh(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function Bh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(S,N,G){const z=_.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),_.get(S.texture).__webglTexture=N,_.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:G,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const G=_.get(S);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0};const kh=A.createFramebuffer();this.setRenderTarget=function(S,N=0,G=0){B=S,C=N,F=G;let z=null,O=!1,ft=!1;if(S){const _t=_.get(S);if(_t.__useDefaultFramebuffer!==void 0){at.bindFramebuffer(A.FRAMEBUFFER,_t.__webglFramebuffer),H.copy(S.viewport),k.copy(S.scissor),J=S.scissorTest,at.viewport(H),at.scissor(k),at.setScissorTest(J),X=-1;return}else if(_t.__webglFramebuffer===void 0)I.setupRenderTarget(S);else if(_t.__hasExternalTextures)I.rebindTextures(S,_.get(S.texture).__webglTexture,_.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Bt=S.depthTexture;if(_t.__boundDepthTexture!==Bt){if(Bt!==null&&_.has(Bt)&&(S.width!==Bt.image.width||S.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(S)}}const Et=S.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(ft=!0);const Rt=_.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Rt[N])?z=Rt[N][G]:z=Rt[N],O=!0):S.samples>0&&I.useMultisampledRTT(S)===!1?z=_.get(S).__webglMultisampledFramebuffer:Array.isArray(Rt)?z=Rt[G]:z=Rt,H.copy(S.viewport),k.copy(S.scissor),J=S.scissorTest}else H.copy(Y).multiplyScalar(zt).floor(),k.copy(Q).multiplyScalar(zt).floor(),J=St;if(G!==0&&(z=kh),at.bindFramebuffer(A.FRAMEBUFFER,z)&&at.drawBuffers(S,z),at.viewport(H),at.scissor(k),at.setScissorTest(J),O){const _t=_.get(S.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+N,_t.__webglTexture,G)}else if(ft){const _t=N;for(let Et=0;Et<S.textures.length;Et++){const Rt=_.get(S.textures[Et]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Et,Rt.__webglTexture,G,_t)}}else if(S!==null&&G!==0){const _t=_.get(S.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,_t.__webglTexture,G)}X=-1},this.readRenderTargetPixels=function(S,N,G,z,O,ft,Mt,_t=0){if(!(S&&S.isWebGLRenderTarget)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Mt!==void 0&&(Et=Et[Mt]),Et){at.bindFramebuffer(A.FRAMEBUFFER,Et);try{const Rt=S.textures[_t],Bt=Rt.format,It=Rt.type;if(!Ft.textureFormatReadable(Bt)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ft.textureTypeReadable(It)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-z&&G>=0&&G<=S.height-O&&(S.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+_t),A.readPixels(N,G,z,O,st.convert(Bt),st.convert(It),ft))}finally{const Rt=B!==null?_.get(B).__webglFramebuffer:null;at.bindFramebuffer(A.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(S,N,G,z,O,ft,Mt,_t=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Mt!==void 0&&(Et=Et[Mt]),Et)if(N>=0&&N<=S.width-z&&G>=0&&G<=S.height-O){at.bindFramebuffer(A.FRAMEBUFFER,Et);const Rt=S.textures[_t],Bt=Rt.format,It=Rt.type;if(!Ft.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ft.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Kt=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Kt),A.bufferData(A.PIXEL_PACK_BUFFER,ft.byteLength,A.STREAM_READ),S.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+_t),A.readPixels(N,G,z,O,st.convert(Bt),st.convert(It),0);const ce=B!==null?_.get(B).__webglFramebuffer:null;at.bindFramebuffer(A.FRAMEBUFFER,ce);const ye=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await Ld(A,ye,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Kt),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,ft),A.deleteBuffer(Kt),A.deleteSync(ye),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,G=0){const z=Math.pow(2,-G),O=Math.floor(S.image.width*z),ft=Math.floor(S.image.height*z),Mt=N!==null?N.x:0,_t=N!==null?N.y:0;I.setTexture2D(S,0),A.copyTexSubImage2D(A.TEXTURE_2D,G,0,0,Mt,_t,O,ft),at.unbindTexture()};const zh=A.createFramebuffer(),Vh=A.createFramebuffer();this.copyTextureToTexture=function(S,N,G=null,z=null,O=0,ft=null){ft===null&&(O!==0?(Ts("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ft=O,O=0):ft=0);let Mt,_t,Et,Rt,Bt,It,Kt,ce,ye;const Se=S.isCompressedTexture?S.mipmaps[ft]:S.image;if(G!==null)Mt=G.max.x-G.min.x,_t=G.max.y-G.min.y,Et=G.isBox3?G.max.z-G.min.z:1,Rt=G.min.x,Bt=G.min.y,It=G.isBox3?G.min.z:0;else{const Qe=Math.pow(2,-O);Mt=Math.floor(Se.width*Qe),_t=Math.floor(Se.height*Qe),S.isDataArrayTexture?Et=Se.depth:S.isData3DTexture?Et=Math.floor(Se.depth*Qe):Et=1,Rt=0,Bt=0,It=0}z!==null?(Kt=z.x,ce=z.y,ye=z.z):(Kt=0,ce=0,ye=0);const de=st.convert(N.format),Nt=st.convert(N.type);let se;N.isData3DTexture?(I.setTexture3D(N,0),se=A.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(I.setTexture2DArray(N,0),se=A.TEXTURE_2D_ARRAY):(I.setTexture2D(N,0),se=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,N.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,N.unpackAlignment);const ee=A.getParameter(A.UNPACK_ROW_LENGTH),qe=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Ei=A.getParameter(A.UNPACK_SKIP_PIXELS),Ye=A.getParameter(A.UNPACK_SKIP_ROWS),ns=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,Se.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Se.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Rt),A.pixelStorei(A.UNPACK_SKIP_ROWS,Bt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,It);const pe=S.isDataArrayTexture||S.isData3DTexture,Ge=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const Qe=_.get(S),Be=_.get(N),He=_.get(Qe.__renderTarget),Hr=_.get(Be.__renderTarget);at.bindFramebuffer(A.READ_FRAMEBUFFER,He.__webglFramebuffer),at.bindFramebuffer(A.DRAW_FRAMEBUFFER,Hr.__webglFramebuffer);for(let si=0;si<Et;si++)pe&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,_.get(S).__webglTexture,O,It+si),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,_.get(N).__webglTexture,ft,ye+si)),A.blitFramebuffer(Rt,Bt,Mt,_t,Kt,ce,Mt,_t,A.DEPTH_BUFFER_BIT,A.NEAREST);at.bindFramebuffer(A.READ_FRAMEBUFFER,null),at.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(O!==0||S.isRenderTargetTexture||_.has(S)){const Qe=_.get(S),Be=_.get(N);at.bindFramebuffer(A.READ_FRAMEBUFFER,zh),at.bindFramebuffer(A.DRAW_FRAMEBUFFER,Vh);for(let He=0;He<Et;He++)pe?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Qe.__webglTexture,O,It+He):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Qe.__webglTexture,O),Ge?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Be.__webglTexture,ft,ye+He):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Be.__webglTexture,ft),O!==0?A.blitFramebuffer(Rt,Bt,Mt,_t,Kt,ce,Mt,_t,A.COLOR_BUFFER_BIT,A.NEAREST):Ge?A.copyTexSubImage3D(se,ft,Kt,ce,ye+He,Rt,Bt,Mt,_t):A.copyTexSubImage2D(se,ft,Kt,ce,Rt,Bt,Mt,_t);at.bindFramebuffer(A.READ_FRAMEBUFFER,null),at.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else Ge?S.isDataTexture||S.isData3DTexture?A.texSubImage3D(se,ft,Kt,ce,ye,Mt,_t,Et,de,Nt,Se.data):N.isCompressedArrayTexture?A.compressedTexSubImage3D(se,ft,Kt,ce,ye,Mt,_t,Et,de,Se.data):A.texSubImage3D(se,ft,Kt,ce,ye,Mt,_t,Et,de,Nt,Se):S.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,ft,Kt,ce,Mt,_t,de,Nt,Se.data):S.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,ft,Kt,ce,Se.width,Se.height,de,Se.data):A.texSubImage2D(A.TEXTURE_2D,ft,Kt,ce,Mt,_t,de,Nt,Se);A.pixelStorei(A.UNPACK_ROW_LENGTH,ee),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,qe),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ei),A.pixelStorei(A.UNPACK_SKIP_ROWS,Ye),A.pixelStorei(A.UNPACK_SKIP_IMAGES,ns),ft===0&&N.generateMipmaps&&A.generateMipmap(se),at.unbindTexture()},this.initRenderTarget=function(S){_.get(S).__webglFramebuffer===void 0&&I.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?I.setTextureCube(S,0):S.isData3DTexture?I.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?I.setTexture2DArray(S,0):I.setTexture2D(S,0),at.unbindTexture()},this.resetState=function(){C=0,F=0,B=null,at.reset(),yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}const Mc={type:"change"},el={type:"start"},wh={type:"end"},gr=new qo,bc=new Zn,ev=Math.cos(70*Id.DEG2RAD),Ae=new L,We=2*Math.PI,ue={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ra=1e-6;class nv extends sp{constructor(t,e=null){super(t,e),this.state=ue.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xi.ROTATE,MIDDLE:Xi.DOLLY,RIGHT:Xi.PAN},this.touches={ONE:Wi.ROTATE,TWO:Wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new xi,this._lastTargetPosition=new L,this._quat=new xi().setFromUnitVectors(t.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new jl,this._sphericalDelta=new jl,this._scale=1,this._panOffset=new L,this._rotateStart=new tt,this._rotateEnd=new tt,this._rotateDelta=new tt,this._panStart=new tt,this._panEnd=new tt,this._panDelta=new tt,this._dollyStart=new tt,this._dollyEnd=new tt,this._dollyDelta=new tt,this._dollyDirection=new L,this._mouse=new tt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=sv.bind(this),this._onPointerDown=iv.bind(this),this._onPointerUp=rv.bind(this),this._onContextMenu=dv.bind(this),this._onMouseWheel=lv.bind(this),this._onKeyDown=cv.bind(this),this._onTouchStart=hv.bind(this),this._onTouchMove=uv.bind(this),this._onMouseDown=av.bind(this),this._onMouseMove=ov.bind(this),this._interceptControlDown=fv.bind(this),this._interceptControlUp=pv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Mc),this.update(),this.state=ue.NONE}update(t=null){const e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===ue.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=We:n>Math.PI&&(n-=We),s<-Math.PI?s+=We:s>Math.PI&&(s-=We),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ae.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(gr.origin.copy(this.object.position),gr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(gr.direction))<ev?this.object.lookAt(this.target):(bc.setFromNormalAndCoplanarPoint(this.object.up,this.target),gr.intersectPlane(bc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ra||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ra||this._lastTargetPosition.distanceToSquared(this.target)>Ra?(this.dispatchEvent(Mc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?We/60*this.autoRotateSpeed*t:We/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ae.copy(s).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new tt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function iv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function sv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function rv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(wh),this.state=ue.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function av(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Xi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ue.DOLLY;break;case Xi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ue.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ue.ROTATE}break;case Xi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ue.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ue.PAN}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(el)}function ov(i){switch(this.state){case ue.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ue.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ue.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function lv(i){this.enabled===!1||this.enableZoom===!1||this.state!==ue.NONE||(i.preventDefault(),this.dispatchEvent(el),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(wh))}function cv(i){this.enabled!==!1&&this._handleKeyDown(i)}function hv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Wi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ue.TOUCH_ROTATE;break;case Wi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ue.TOUCH_PAN;break;default:this.state=ue.NONE}break;case 2:switch(this.touches.TWO){case Wi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ue.TOUCH_DOLLY_PAN;break;case Wi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ue.TOUCH_DOLLY_ROTATE;break;default:this.state=ue.NONE}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(el)}function uv(i){switch(this._trackPointer(i),this.state){case ue.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ue.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ue.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ue.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ue.NONE}}function dv(i){this.enabled!==!1&&i.preventDefault()}function fv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function pv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ve=1/1e3,mv=[["-go-oc-cho",7162931],["-go-soi",13213806],["-trang",15921129],["-da-nau",8014642],["-xam",9409948],["-den",3816770],["-xanh-reu",6056783],["-da",14210509]],gv={giuong:9413567,"giuong-tang":9413567,"tu-dau-giuong":11110755,"tu-ao":11110755,"ban-trang-diem":11901554,sofa:8361133,"ban-tra":11901554,"ke-tv":11110755,"ban-an":11901554,"ghe-an":10257508,"ban-lam-viec":11901554,"ghe-xoay":5922662,"ke-sach":11110755,"tu-giay":11110755,"tu-bep-duoi":9865071,"tu-bep-tren":11049602,"tu-lanh":13949406,"bon-cau":15329766,lavabo:15329766,"voi-sen":13227740,"bon-tam":15329766,guong:12571865,"binh-nong-lanh":14606046,"may-giat":13685718,"may-lanh":15264492,"quat-cay":10133670,"den-cay":13220234,"cay-canh":6257999,"xe-may":10115658,"xe-dap":5204874,"o-to":8226964,"ban-tho":9067066};function _v(i,t){for(const[e,n]of mv)if(i.endsWith(e))return n;return gv[t]??11578012}const Ps=(i,t={})=>new Qo({color:i,...t});function me(i,t){const e=new Xt(i),n=t>0?new Xt(16777215):new Xt(0);return e.lerp(n,Math.abs(t)).getHex()}function Zt(i,t,e,n,s=0,r=0,a=0,o=i.color){const l=new Me(new yn(t*ve,e*ve,n*ve),Ps(o));return l.position.set(s*ve,r*ve,(a+n/2)*ve),i.g.add(l),l}function Nn(i,t,e,n=0,s=0,r=0,a=i.color){const o=new Me(new Is(t*ve,t*ve,e*ve,20),Ps(a));return o.rotation.x=Math.PI/2,o.position.set(n*ve,s*ve,(r+e/2)*ve),i.g.add(o),o}function fs(i,t,e,n,s,r=3026478){const a=new Me(new Is(t*ve,t*ve,e*ve,18),Ps(r));return a.rotation.z=Math.PI/2,a.position.set(n*ve,s*ve,t*ve),i.g.add(a),a}function Pa(i,t,e,n,s=50,r=me(i.color,-.3)){const a=t/2-s,o=e/2-s;for(const[l,c]of[[1,1],[1,-1],[-1,1],[-1,-1]])Zt(i,s,s,n,l*a,c*o,0,r)}function vv(i,t){const e=new sn,{w:n,d:s,h:r}=i.footprint,a=_v(t,i.category),o={g:e,color:a};switch(i.category){case"giuong":{Zt(o,n,s,r*.5),Zt(o,n-100,s-120,r*.45,0,10,r*.5,me(a,.45)),Zt(o,n,80,900,0,-s/2+40,0,me(a,-.2)),Zt(o,n*.6,s*.16,120,0,-s/2+90+s*.08,r*.95,16052712);break}case"giuong-tang":{Zt(o,n,s,300,0,0,250,me(a,.3)),Zt(o,n,s,300,0,0,r-400,me(a,.3));for(const[l,c]of[[1,1],[1,-1],[-1,1],[-1,-1]])Zt(o,60,60,r,l*(n-60)/2,c*(s-60)/2,0,me(a,-.2));break}case"sofa":{Zt(o,n,s,420),Zt(o,n,180,380,0,-s/2+90,420,me(a,-.12)),Zt(o,160,s,200,-n/2+80,0,420,me(a,-.12)),Zt(o,160,s,200,n/2-80,0,420,me(a,-.12));break}case"ban-an":case"ban-tra":case"ban-lam-viec":case"ban-trang-diem":{Zt(o,n,s,40,0,0,r-40,me(a,.15)),Pa(o,n-40,s-40,r-40),i.category==="ban-trang-diem"&&Zt(o,n*.5,30,600,0,-s/2+15,r,12571865);break}case"ghe-an":{Zt(o,n,s,40,0,0,410,me(a,.15)),Pa(o,n-30,s-30,410,40),Zt(o,n,40,r-450,0,-s/2+20,450,me(a,-.1));break}case"ghe-xoay":{Nn(o,40,350,0,0,0,3816770),Zt(o,n,s,80,0,0,350,a),Zt(o,n,60,r-550,0,-s/2+30,430,me(a,-.1));break}case"ke-sach":{Zt(o,n,s,r,0,0,0,me(a,-.15));const l=me(a,.4),c=Math.max(3,Math.round(r/400));for(let h=1;h<c;h++)Zt(o,n-60,s-40,20,0,10,r/c*h,l);break}case"tu-lanh":{Zt(o,n,s,r),Zt(o,n-40,20,4,0,s/2,r*.65,me(a,-.35));break}case"bon-cau":{Zt(o,n,180,780,0,-s/2+90,0,a),Nn(o,n/2-20,400,0,s*.12,0,me(a,.1));break}case"lavabo":{Nn(o,90,r-200,0,0,0,me(a,-.08)),Nn(o,Math.min(n,s)/2-30,180,0,0,r-200,a);break}case"voi-sen":{Zt(o,n,s,60,0,0,0,me(a,.15)),Zt(o,50,50,r-60,-n/2+40,-s/2+40,60,10133670);break}case"bon-tam":{Zt(o,n,s,r),Zt(o,n-160,s-160,40,0,0,r-38,me(a,-.25));break}case"may-giat":{Zt(o,n,s,r),Nn(o,Math.min(n,r)*.3,20,0,s/2-8,r*.45,5924208).rotation.x=0;break}case"xe-may":{fs(o,220,90,0,-s/2+260),fs(o,220,90,0,s/2-260),Zt(o,n*.4,s*.55,260,0,40,380,a),Zt(o,n-80,60,40,0,-s/2+380,900,me(a,-.25));break}case"xe-dap":{fs(o,330,40,0,-s/2+340),fs(o,330,40,0,s/2-340),Zt(o,40,s*.55,40,0,0,560,a);break}case"o-to":{Zt(o,n,s,650,0,0,250),Zt(o,n-250,s*.5,550,0,-s*.04,900,me(a,.2));for(const[l,c]of[[1,1],[1,-1],[-1,1],[-1,-1]])fs(o,300,210,l*(n-230)/2,c*(s/2-750));break}case"ban-tho":{Zt(o,n,s,60,0,0,r-60,me(a,.1)),Pa(o,n-60,s-60,r-60,70),Zt(o,n,30,300,0,-s/2+15,r,me(a,-.15));break}case"cay-canh":{Nn(o,Math.min(n,s)*.32,r*.25,0,0,0,10251087);const l=new Me(new Jo(Math.min(n,s)/2*ve,12,10),Ps(a));l.position.z=r*.62*ve,l.scale.z=r*.7/Math.min(n,s),e.add(l);break}case"den-cay":{Nn(o,25,r-350,0,0,0,7040885);const l=new Me(new $o(n*.45*ve,350*ve,16,1,!0),Ps(a,{side:an}));l.rotation.x=Math.PI/2,l.position.z=(r-175)*ve,e.add(l);break}case"quat-cay":{Nn(o,25,r-400,0,0,0,7040885),Nn(o,n/2,120,0,0,r-400,me(a,.2));break}case"guong":{Zt(o,n,s,r,0,0,0,12571865);break}default:{Zt(o,n,s,r);break}}return e}const Un=Math.PI/180,xv=[15,45,74,105,135,166,196,227,258,288,319,349];function yv(i,t,e,n){const s=xv[Math.min(11,Math.max(0,Math.round(t)-1))],r=23.45*Math.sin(Un*(360*(284+s)/365)),a=15*(i-12),o=e*Un,l=r*Un,c=a*Un,h=Math.sin(o)*Math.sin(l)+Math.cos(o)*Math.cos(l)*Math.cos(c),u=Math.asin(Math.min(1,Math.max(-1,h))),d=(Math.sin(l)-Math.sin(o)*h)/(Math.cos(o)*Math.cos(u)||1e-9);let f=Math.acos(Math.min(1,Math.max(-1,d)))/Un;a>0&&(f=360-f);const g=[-Math.sin(n*Un),Math.cos(n*Un)],v=[g[1],-g[0]],m=f*Un,p=g[0]*Math.cos(m)+v[0]*Math.sin(m),T=g[1]*Math.cos(m)+v[1]*Math.sin(m),E=Math.cos(u);return{dir:[p*E,T*E,Math.sin(u)],altitude:u/Un,azimuth:f}}const Lt=1/1e3,Sv=Math.PI/180,en={bg:1316635,ground:2106411,boundary:7250136,wall:15920609,edge:8683119,glass:10274792,door:11569512,slab:15130575,stair:14209213,flash:2907030,label:"#4a453a"},Mv={khach:13416847,"bep-an":13738091,ngu:12755894,wc:10336452,tho:14073234,"lam-viec":11123913,gara:11055288,"hanh-lang":12173480,"cau-thang":12103840,san:11188382,"gieng-troi":10864856,kho:11577496,"ban-cong":11124911},Fn=(i,t={})=>new Qo({color:i,...t});class bv{renderer;scene=new sf;camera;controls;root=new sn;env=new sn;grid=null;groups=new Map;openingWall=new Map;home=null;dirty=!0;disposed=!1;walk=null;lastTick=0;hemi=new Jf(15265525,3817287,1.05);sun=new ep(16774368,.9);sunMode=!1;constructor(t){this.renderer=new tv({canvas:t,antialias:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.type=Nc,this.scene.background=new Xt(en.bg),this.camera=new rn(45,1,.05,500),this.camera.position.set(9,8,12),this.controls=new nv(this.camera,t),this.controls.addEventListener("change",()=>this.invalidate()),this.scene.add(this.hemi),this.sun.position.set(12,18,8),this.sun.target.position.set(0,0,0),this.scene.add(this.sun),this.scene.add(this.sun.target),this.root.rotation.x=-Math.PI/2,this.scene.add(this.root),this.root.add(this.env);const e=t.parentElement;new ResizeObserver(()=>this.resize(e)).observe(e),this.resize(e),t.addEventListener("mousemove",r=>this.onWalkLook(r));let n=!1;document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===this.renderer.domElement?n=!0:this.walk&&n&&(n=!1,this.exitWalk())}),window.addEventListener("keydown",r=>this.onWalkKey(r,!0)),window.addEventListener("keyup",r=>this.onWalkKey(r,!1));const s=r=>{if(this.disposed)return;requestAnimationFrame(s);const a=Math.min(.05,((r??0)-this.lastTick)/1e3||.016);this.lastTick=r??0,this.walk&&this.stepWalk(a),this.dirty&&(this.dirty=!1,this.renderer.render(this.scene,this.camera))};s()}invalidate(){this.dirty=!0}resize(t){const e=t.clientWidth,n=t.clientHeight;e===0||n===0||(this.renderer.setSize(e,n,!1),this.camera.aspect=e/n,this.camera.updateProjectionMatrix(),this.invalidate())}setModel(t){for(const e of[...this.groups.keys()])this.removeGroup(e);this.openingWall.clear();for(const e of t.levels){for(const n of t.walls)n.level===e.id&&this.setGroup(n.id,this.buildWall(t,n,e));for(const n of t.slabs)n.level===e.id&&this.setGroup(n.id,this.buildSlab(n,e));for(const n of t.stairs)n.level===e.id&&this.setGroup(n.id,this.buildStair(n,e));for(const n of t.furniture)n.level===e.id&&this.setGroup(n.id,this.buildFurniture(n,e));for(const n of t.rooms)n.level===e.id&&this.setGroup(n.id,this.buildRoom(t,n,e))}this.buildEnv(t),this.sunMode&&this.applyShadowFlags(!0),this.fitHome(),this.invalidate()}applyOps(t,e){const n=new Set,s=new Set;let r=!1;for(const a of e){const o=a.op==="add"?String(a.data.id??""):a.id;switch(a.entity){case"wall":s.add(o);break;case"opening":{if(n.add(o),a.op==="add"){const l=String(a.data.wall??"");l&&(s.add(l),this.openingWall.set(o,l))}else{const l=this.openingWall.get(a.id);l&&s.add(l),a.op==="update"&&typeof a.data.wall=="string"&&(s.add(a.data.wall),this.openingWall.set(a.id,a.data.wall)),a.op==="delete"&&this.openingWall.delete(a.id)}break}case"level":r=!0;break;case"slab":case"stair":case"room":case"furniture":this.rebuildSingle(t,a.entity,o),n.add(o);break}}if(r)this.setModel(t);else for(const a of s)this.rebuildWall(t,a),n.add(a);return this.home||this.fitHome(),this.sunMode&&this.applyShadowFlags(!0),this.invalidate(),[...n]}rebuildWall(t,e){const n=t.walls.find(r=>r.id===e),s=n?t.levels.find(r=>r.id===n.level):void 0;if(!n||!s){this.removeGroup(e);for(const[r,a]of this.openingWall)a===e&&this.openingWall.delete(r);return}this.setGroup(e,this.buildWall(t,n,s))}rebuildSingle(t,e,n){const r={slab:t.slabs,stair:t.stairs,room:t.rooms,furniture:t.furniture}[e].find(l=>l.id===n),a=r?t.levels.find(l=>l.id===r.level):void 0;if(!r||!a){this.removeGroup(n);return}const o=e==="slab"?this.buildSlab(r,a):e==="stair"?this.buildStair(r,a):e==="room"?this.buildRoom(t,r,a):this.buildFurniture(r,a);this.setGroup(n,o)}buildWall(t,e,n){const s=new sn,r=Pc(e),a=e.height??n.height,o=t.openings.filter(h=>h.wall===e.id);for(const h of o)this.openingWall.set(h.id,e.id);s.position.set(e.from[0]*Lt,e.from[1]*Lt,n.elevation*Lt),s.rotation.z=Math.atan2(e.to[1]-e.from[1],e.to[0]-e.from[0]);const l=e.kind==="kinh"?Fn(en.glass,{transparent:!0,opacity:.4}):Fn(en.wall),c=new Rr({color:en.edge});for(const h of tu(r,a,o)){const u=new yn((h.u1-h.u0)*Lt,e.thickness*Lt,(h.z1-h.z0)*Lt),d=new Me(u,l);d.position.set((h.u0+h.u1)/2*Lt,0,(h.z0+h.z1)/2*Lt),s.add(d);const f=new uh(new pf(u),c);f.position.copy(d.position),s.add(f)}for(const h of o){const u=(h.offset+h.width/2)*Lt;if(h.kind==="door"){const d=new Me(new yn(h.width*.94*Lt,42*Lt,h.height*Lt),Fn(en.door));d.position.set(u,0,h.height/2*Lt),s.add(d)}else{const d=new Me(new yn(h.width*Lt,36*Lt,h.height*Lt),Fn(en.glass,{transparent:!0,opacity:.45}));d.position.set(u,0,(h.sill+h.height/2)*Lt),s.add(d)}}return s}buildSlab(t,e){const n=new sn,s=_r(t.outline,t.holes),r=new Dr(s,{depth:t.thickness*Lt,bevelEnabled:!1}),a=new Me(r,Fn(en.slab)),o=t.kind==="floor"?e.elevation:e.elevation+e.height;return a.position.z=o*Lt-t.thickness*Lt,n.add(a),n}buildStair(t,e){const n=new sn,s=nu(t,e),r=s.riser*Lt,a=Fn(en.stair);for(const o of s.flights){const l=Math.atan2(o.dir[1],o.dir[0]),c=new yn(t.width*Lt,t.tread*Lt,r);for(let h=0;h<o.treads;h++){const u=o.firstStep+h,d=o.start[0]+o.dir[0]*(h+.5)*t.tread,f=o.start[1]+o.dir[1]*(h+.5)*t.tread,g=new Me(c,a);g.position.set(d*Lt,f*Lt,(u-.5)*r),g.rotation.z=l-Math.PI/2,n.add(g)}}if(s.landing){const o=s.flights[0]?.treads??0,l=140*Lt,c=new Me(new Dr(_r(s.landing),{depth:l,bevelEnabled:!1}),a);c.position.z=o*r-l,n.add(c)}return n.position.z=e.elevation*Lt,n}buildFurniture(t,e){const n=new sn,s=Ur(t.asset);if(!s)return n;n.add(vv(s,t.asset));const r=t.elevation??s.mountHeight??0;return n.position.set(t.at[0]*Lt,t.at[1]*Lt,(e.elevation+r)*Lt),n.rotation.z=t.rotation*Sv,n}buildRoom(t,e,n){const s=new sn,r=e.finish?.floor?t.finishes[e.finish.floor]:void 0,a=new Me(new Ir(_r(e.polygon)),r?.color?Fn(new Xt(r.color).getHex(),{side:an}):Fn(Mv[e.use]??12103840,{transparent:!0,opacity:.5,side:an}));s.add(a);const o=Tv(e.name);if(o){const[l,c]=Ev(e.polygon);o.position.set(l*Lt,c*Lt,.05),s.add(o)}return s.position.z=(n.elevation+6)*Lt,s}buildEnv(t){Ec(this.env),this.grid&&(this.scene.remove(this.grid),this.grid.geometry.dispose(),this.grid.material.dispose(),this.grid=null);const e=t.site.boundary;if(e.length<3)return;const n=new uf(new Le().setFromPoints(e.map(([d,f])=>new L(d*Lt,f*Lt,.004))),new Rr({color:en.boundary}));this.env.add(n);const s=e.map(d=>d[0]),r=e.map(d=>d[1]),a=Math.min(...s)-3e3,o=Math.max(...s)+3e3,l=Math.min(...r)-3e3,c=Math.max(...r)+3e3,h=new Me(new Ir(_r([[a,l],[o,l],[o,c],[a,c]])),Fn(en.ground));h.position.z=-.03,this.env.add(h);const u=Math.max(o-a,c-l)*Lt;this.grid=new ip(u,Math.round(u),2896443,2501426),this.grid.position.set((a+o)/2*Lt,-.02,-((l+c)/2)*Lt),this.scene.add(this.grid)}fitHome(){const t=new Qn;for(const r of this.groups.values())t.expandByObject(r);if(t.isEmpty())return;const e=t.getCenter(new L),n=Math.max(t.getSize(new L).length()/2,1),s=e.clone().add(new L(.95,.8,.95).normalize().multiplyScalar(n*2.3));this.camera.near=Math.max(n/200,.02),this.camera.far=n*40,this.camera.updateProjectionMatrix(),this.home={position:s,target:e},this.resetView()}resetView(){this.home||this.fitHome(),this.home&&(this.camera.position.copy(this.home.position),this.controls.target.copy(this.home.target),this.controls.update(),this.invalidate())}flash(t){const e=new Set;for(const n of t){const s=this.groups.get(n)??this.groups.get(this.openingWall.get(n)??"");s&&e.add(s)}for(const n of e){const s=[];n.traverse(r=>{const a=r.material;a instanceof Qo&&(s.push({mat:a,prev:a.emissive.getHex()}),a.emissive.setHex(en.flash))}),setTimeout(()=>{for(const{mat:r,prev:a}of s)r.emissive.setHex(a);this.invalidate()},1500)}this.invalidate()}get walking(){return this.walk!=null}enterWalk(t,e,n){if(this.walk)return;const s=e??this.modelCenterXY(),r=(t.elevation+1600)*Lt,a=this.modelCenterXY(),o=Math.atan2(a[0]*Lt-s[0]*Lt,a[1]*Lt-s[1]*Lt)||0;this.walk={pos:new L(s[0]*Lt,s[1]*Lt,r),yaw:o,pitch:0,keys:new Set,...n?{onEnd:n}:{}},this.controls.enabled=!1,this.camera.fov=60,this.camera.updateProjectionMatrix(),this.renderer.domElement.requestPointerLock?.(),this.applyWalkCamera()}exitWalk(){if(!this.walk)return;const t=this.walk.onEnd;this.walk=null,document.pointerLockElement===this.renderer.domElement&&document.exitPointerLock(),this.controls.enabled=!0,this.camera.fov=45,this.camera.updateProjectionMatrix(),this.controls.update(),this.invalidate(),t?.()}modelCenterXY(){const t=new Qn;for(const n of this.groups.values())t.expandByObject(n);if(t.isEmpty())return[0,0];const e=t.getCenter(new L);return[e.x/Lt,e.y/Lt]}onWalkKey(t,e){if(!this.walk)return;const n=t.key.toLowerCase();if(n==="escape"&&e){this.exitWalk();return}["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright","shift"].includes(n)&&(e?this.walk.keys.add(n):this.walk.keys.delete(n),t.preventDefault())}onWalkLook(t){!this.walk||document.pointerLockElement!==this.renderer.domElement||(this.walk.yaw+=t.movementX*.0022,this.walk.pitch=Math.min(1.35,Math.max(-1.35,this.walk.pitch-t.movementY*.0022)),this.applyWalkCamera())}stepWalk(t){const e=this.walk;if(e.keys.size===0)return;const n=(e.keys.has("shift")?4.2:2.1)*t,s=[Math.sin(e.yaw),Math.cos(e.yaw)],r=[Math.cos(e.yaw),-Math.sin(e.yaw)];let a=0,o=0;(e.keys.has("w")||e.keys.has("arrowup"))&&(a+=s[0],o+=s[1]),(e.keys.has("s")||e.keys.has("arrowdown"))&&(a-=s[0],o-=s[1]),(e.keys.has("d")||e.keys.has("arrowright"))&&(a+=r[0],o+=r[1]),(e.keys.has("a")||e.keys.has("arrowleft"))&&(a-=r[0],o-=r[1]);const l=Math.hypot(a,o);l!==0&&(e.pos.x+=a/l*n,e.pos.y+=o/l*n,this.applyWalkCamera())}applyWalkCamera(){const t=this.walk;if(!t)return;this.root.updateWorldMatrix(!0,!1);const e=this.root.localToWorld(t.pos.clone()),n=new L(Math.sin(t.yaw)*Math.cos(t.pitch),Math.cos(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch)),s=this.root.localToWorld(t.pos.clone().add(n));this.camera.position.copy(e),this.camera.up.set(0,1,0),this.camera.lookAt(s),this.invalidate()}setSun(t){if(this.sunMode=t!=null,!t){this.renderer.shadowMap.enabled=!1,this.hemi.intensity=1.05,this.sun.intensity=.9,this.sun.castShadow=!1,this.sun.position.set(12,18,8),this.applyShadowFlags(!1),this.invalidate();return}const e=yv(t.hour,t.month,t.lat,t.north),n=e.altitude>0;this.renderer.shadowMap.enabled=n,this.hemi.intensity=n?.45:.22,this.sun.intensity=n?1.25:0,this.sun.castShadow=n;const s=40;this.sun.position.set(e.dir[0]*s,e.dir[2]*s,-e.dir[1]*s);const r=new Qn;for(const l of this.groups.values())r.expandByObject(l);const a=r.isEmpty()?15:r.getSize(new L).length()/2+2,o=this.sun.shadow.camera;o.left=-a,o.right=a,o.top=a,o.bottom=-a,o.near=1,o.far=s*2+a,o.updateProjectionMatrix(),this.sun.shadow.mapSize.set(2048,2048),this.applyShadowFlags(n),this.invalidate()}applyShadowFlags(t){this.root.traverse(e=>{e.isMesh&&(e.castShadow=t,e.receiveShadow=t)})}capture(t){return this.root.updateWorldMatrix(!0,!1),t?.position&&this.camera.position.copy(this.toWorld(t.position)),t?.lookAt&&this.controls.target.copy(this.toWorld(t.lookAt)),(t?.position||t?.lookAt)&&this.controls.update(),this.renderer.render(this.scene,this.camera),this.renderer.domElement.toDataURL("image/png").split(",")[1]}toWorld([t,e,n]){return this.root.localToWorld(new L(t*Lt,e*Lt,n*Lt))}setGroup(t,e){this.removeGroup(t),e.name=t,this.groups.set(t,e),this.root.add(e)}removeGroup(t){const e=this.groups.get(t);e&&(Ec(e),this.root.remove(e),this.groups.delete(t))}}function _r(i,t){const e=new jo(i.map(([n,s])=>new tt(n*Lt,s*Lt)));for(const n of t??[])e.holes.push(new Co(n.map(([s,r])=>new tt(s*Lt,r*Lt))));return e}function Ev(i){let t=0,e=0;for(const[n,s]of i)t+=n,e+=s;return[t/i.length,e/i.length]}function Tv(i){if(!i.trim())return null;const t=document.createElement("canvas"),e=t.getContext("2d");if(!e)return null;const n="600 40px 'Be Vietnam Pro', 'Segoe UI', sans-serif";e.font=n;const s=Math.ceil(e.measureText(i).width)+24;t.width=s,t.height=56,e.font=n,e.fillStyle=en.label,e.textBaseline="middle",e.fillText(i,12,30);const r=new af(new lh({map:new df(t),transparent:!0,depthWrite:!1})),a=Math.min(2.2,Math.max(.8,s/260));return r.scale.set(a,a*(56/s),1),r}function Ec(i){i.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const n=e.material;if(Array.isArray(n))for(const s of n)s.dispose();else if(n){const s=n.map;s&&s.dispose(),n.dispose()}}),i.clear()}const Tc={block:0,error:1,warn:2,info:3},Ch=new Set(["thickness","width","height","offset","sill","elevation","tread","landing","rotation"]),Av={wall:[{key:"from",kind:"point"},{key:"to",kind:"point"},{key:"thickness",kind:"num"},{key:"height",kind:"num"}],opening:[{key:"offset",kind:"num"},{key:"width",kind:"num"},{key:"height",kind:"num"},{key:"sill",kind:"num"}],furniture:[{key:"at",kind:"point"},{key:"rotation",kind:"num"},{key:"elevation",kind:"num"}],room:[{key:"name",kind:"text"}],level:[{key:"name",kind:"text"},{key:"height",kind:"num"}]},Ue=i=>{const t=document.getElementById(i);if(!t)throw new Error(`Thiếu #${i} trong index.html`);return t};class wv{constructor(t,e={}){this.cb=t,this.readonly=e.readonly??!1;for(const n of document.querySelectorAll("[data-view-btn]"))n.addEventListener("click",()=>{for(const r of document.querySelectorAll("[data-view-btn]"))r.classList.remove("is-active");n.classList.add("is-active");const s=n.dataset.viewBtn;document.body.dataset.view=s,t.onView(s)});Ue("fit2d").addEventListener("click",()=>t.onFit2d()),Ue("reset3d").addEventListener("click",()=>t.onReset3d()),this.btnUndo.addEventListener("click",()=>t.onUndo()),this.btnRedo.addEventListener("click",()=>t.onRedo())}cb;projectName=Ue("project-name");levelTabs=Ue("level-tabs");revSeal=Ue("rev-seal");connDot=Ue("conn-dot");connText=Ue("conn-text");claudeCell=Ue("claude-note");issuesBody=Ue("issues-body");issuesCount=Ue("issues-count");propsBody=Ue("props-body");toasts=Ue("toasts");empty2d=Ue("empty2d");snapInput=Ue("snap-input");btnUndo=Ue("btn-undo");btnRedo=Ue("btn-redo");claudeTimer=null;readonly;snapGrid(){const t=Number(this.snapInput.value);return Number.isFinite(t)&&t>=0?Math.round(t):50}setUndoState(t,e){this.btnUndo.disabled=!t,this.btnRedo.disabled=!e}get propsBusy(){return this.propsBody.contains(document.activeElement)}setProject(t){this.projectName.textContent=t,document.title=`${t} — Atelier`,this.empty2d.hidden=!0}setConn(t){this.connDot.className=`dot ${t==="on"?"on":t==="off"?"off":""}`,this.connText.textContent=Qt(t==="on"?"conn.on":t==="connecting"?"conn.connecting":"conn.off")}setRevision(t,e){this.revSeal.textContent=`r ${t}`,e&&(this.revSeal.classList.remove("pulse"),this.revSeal.getBoundingClientRect(),this.revSeal.classList.add("pulse"))}setLevels(t,e){this.levelTabs.textContent="";for(const n of[...t].sort((s,r)=>s.elevation-r.elevation)){const s=document.createElement("button");s.className=`level-btn${n.id===e?" is-active":""}`,s.textContent=n.id,s.title=n.name,s.addEventListener("click",()=>this.cb.onLevel(n.id)),this.levelTabs.appendChild(s)}}setActiveLevel(t){for(const e of this.levelTabs.querySelectorAll(".level-btn"))e.classList.toggle("is-active",e.textContent===t)}setIssues(t){if(this.issuesCount.hidden=t.length===0,this.issuesCount.textContent=String(t.length),this.issuesBody.textContent="",t.length===0){const n=document.createElement("p");n.className="issue-ok",n.textContent=Qt("issues.clean"),this.issuesBody.appendChild(n);return}const e=[...t].sort((n,s)=>(Tc[n.severity]??9)-(Tc[s.severity]??9));for(const n of e){const s=document.createElement("button");s.className=`issue issue--${n.severity}`;const r=document.createElement("span");r.className="issue-rule",r.textContent=n.rule,s.appendChild(r),s.appendChild(document.createTextNode(n.message)),n.entities.length&&s.addEventListener("click",()=>this.cb.onIssueClick(n.entities)),this.issuesBody.appendChild(s)}}toast(t,e,n){for(;this.toasts.children.length>=4;)this.toasts.firstElementChild?.remove();const s=document.createElement("div");s.className=`toast${t==="user"?" toast--user":t==="reject"?" toast--reject":""}`;const r=document.createElement("div");r.className="toast-head";const a=document.createElement("span");if(a.className="toast-who",a.textContent=Qt(t==="claude"?"toast.claude":t==="user"?"toast.user":"toast.reject"),r.appendChild(a),n!=null){const l=document.createElement("span");l.className="toast-rev",l.textContent=`r ${n}`,r.appendChild(l)}s.appendChild(r);const o=document.createElement("div");o.className="toast-body",o.textContent=e,s.appendChild(o),this.toasts.appendChild(s),setTimeout(()=>{s.classList.add("leaving"),setTimeout(()=>s.remove(),260)},6e3)}claudeNote(t){this.claudeCell.textContent=`✎ ${t}`,this.claudeCell.classList.add("active"),this.claudeTimer!=null&&clearTimeout(this.claudeTimer),this.claudeTimer=window.setTimeout(()=>{this.claudeCell.textContent="—",this.claudeCell.classList.remove("active")},8e3)}showEntity(t,e){if(this.propsBody.textContent="",!t||!e){const l=document.createElement("p");l.className="panel-empty";const c=document.createElement("span");c.textContent=Qt("props.empty");const h=document.createElement("span");h.className="dim",h.textContent=Qt("props.empty.sub"),l.append(c,document.createElement("br"),h),this.propsBody.appendChild(l);return}const n=document.createElement("span");n.className="prop-id",n.textContent=`${Qt(`kind.${t.entity}`)} · ${e}`,this.propsBody.appendChild(n);const s=this.readonly?[]:Av[t.entity]??[],r=document.createElement("table");r.className="prop-table";const a=(l,c)=>{const h=document.createElement("tr"),u=document.createElement("th");u.textContent=l;const d=document.createElement("td");typeof c=="string"?d.textContent=c:d.appendChild(c),h.append(u,d),r.appendChild(h)},o=new Set;for(const l of s)o.add(l.key),a(l.key,this.buildEditor(t,e,l));for(const[l,c]of Object.entries(t.data)){if(l==="id"||c==null||o.has(l))continue;const h=Cv(l,c);h!=null&&a(l,h)}this.propsBody.appendChild(r)}buildEditor(t,e,n){const s=document.createElement("span");s.className="prop-edit";const r=t.data[n.key],a=(c,h)=>{const u=document.createElement("input");return u.className="prop-input",h&&(u.type="number",u.step="10"),u.value=c,u},o=()=>{if(n.kind==="point"){const[h,u]=s.querySelectorAll("input"),d=Number(h.value),f=Number(u.value),g=r;if(!Number.isFinite(d)||!Number.isFinite(f)||g&&Math.round(d)===g[0]&&Math.round(f)===g[1])return;this.cb.onPropEdit(t.entity,e,n.key,[Math.round(d),Math.round(f)]);return}const c=s.querySelector("input");if(n.kind==="num"){if(c.value.trim()==="")return;const h=Number(c.value);if(!Number.isFinite(h)||h===r)return;this.cb.onPropEdit(t.entity,e,n.key,Math.round(h));return}c.value!==r&&this.cb.onPropEdit(t.entity,e,n.key,c.value)},l=c=>{c.addEventListener("keydown",h=>{h.key==="Enter"&&(o(),c.blur()),h.stopPropagation()}),c.addEventListener("change",o)};if(n.kind==="point"){const c=r??[0,0],h=a(String(c[0]),!0),u=a(String(c[1]),!0);l(h),l(u),s.append(h,document.createTextNode(", "),u)}else{const c=a(r==null?"":String(r),n.kind==="num");n.kind==="num"&&Ch.has(n.key)&&n.key!=="rotation"&&(c.placeholder="mm"),l(c),s.appendChild(c)}return s}}function Cv(i,t){return typeof t=="number"?Ch.has(i)&&i!=="rotation"?`${t} mm`:String(t):typeof t=="string"||typeof t=="boolean"?String(t):Array.isArray(t)?t.length===2&&t.every(e=>typeof e=="number")?`${t[0]}, ${t[1]}`:`${t.length} phần tử`:null}class Rv{constructor(t,e=""){this.handlers=t,this.query=e}handlers;query;sock=null;lastRevision=null;session=null;retry=0;reconnectTimer=null;connect(){this.handlers.onConn(this.retry===0?"connecting":"off");const t=location.protocol==="https:"?"wss":"ws",e=new WebSocket(`${t}://${location.host}/ws${this.query}`);this.sock=e,e.onopen=()=>{this.retry=0,this.handlers.onConn("on"),this.send({type:"hello",clientKind:"browser",...this.lastRevision!=null?{lastRevision:this.lastRevision}:{},...this.session?{session:this.session}:{}})},e.onmessage=n=>{let s;try{s=JSON.parse(String(n.data))}catch{return}switch(s.type){case"snapshot":return this.lastRevision=s.revision,s.session&&(this.session=s.session),this.handlers.onSnapshot(s);case"patch":return this.lastRevision=s.revision,this.handlers.onPatch(s);case"validation":return this.handlers.onValidation(s);case"capture_request":return this.handlers.onCapture(s);case"reject":return this.handlers.onReject(s);default:return}},e.onclose=()=>{if(this.sock!==e)return;this.sock=null,this.handlers.onConn("off");const n=Math.min(1e3*2**this.retry,8e3);this.retry+=1,this.reconnectTimer=window.setTimeout(()=>this.connect(),n)},e.onerror=()=>e.close()}send(t){this.sock?.readyState===WebSocket.OPEN&&this.sock.send(JSON.stringify(t))}resync(){this.lastRevision=null,this.reconnectTimer!=null&&clearTimeout(this.reconnectTimer),this.sock?.close()}}const Pv={level:"levels",wall:"walls",opening:"openings",slab:"slabs",stair:"stairs",room:"rooms",furniture:"furniture"};function Lv(i,t,e){const n=Pv[t];return n?i[n].find(s=>s.id===e)??null:t==="axis"?[...i.axes.x,...i.axes.y].find(s=>s.id===e)??null:t==="style"?i.styles.openings[e]??null:t==="finish"?i.finishes[e]??null:null}function Dv(i,t){const e=[];for(const n of[...t].reverse()){if(n.op==="add"){const r=n.data.id;if(typeof r!="string")return null;e.push({op:"delete",entity:n.entity,id:r});continue}const s=Lv(i,n.entity,n.id);if(!s)return null;if(n.op==="update"){const r={};for(const a of Object.keys(n.data))if(a!=="id"){if(!(a in s))return null;r[a]=structuredClone(s[a])}e.push({op:"update",entity:n.entity,id:n.id,data:r});continue}if(e.push({op:"add",entity:n.entity,data:structuredClone(s)}),n.entity==="wall")for(const r of i.openings)r.wall===n.id&&e.push({op:"add",entity:"opening",data:structuredClone(r)})}return e}const Iv=100;class Nv{undos=[];redos=[];push(t){this.undos.push(t),this.undos.length>Iv&&this.undos.shift(),this.redos=[]}get canUndo(){return this.undos.length>0}get canRedo(){return this.redos.length>0}peekUndo(){return this.undos[this.undos.length-1]??null}peekRedo(){return this.redos[this.redos.length-1]??null}confirmUndo(){const t=this.undos.pop();t&&this.redos.push(t)}confirmRedo(){const t=this.redos.pop();t&&this.undos.push(t)}clear(){this.undos=[],this.redos=[]}}ku();const Io=location.pathname.startsWith("/xem/")?location.pathname.split("/")[2]??null:null,Ns=Io!=null,Pt=new Du,ti=new Nv,bn=[];function Si(i,t,e){if(Ns){Te.toast("reject",Qt("toast.readonly"));return}if(!Pt.model)return;let n=null;if(e==="edit"){const s=Dv(Pt.model,i);n=s?{undo:s,redo:structuredClone(i),label:t}:null}bn.push({ops:i,entry:n,kind:e}),ei.send({type:"ops",baseRevision:Pt.revision,ops:i,note:t})}function Us(){Te.setUndoState(ti.canUndo&&bn.length===0,ti.canRedo&&bn.length===0)}function Rh(){if(bn.length>0)return;const i=ti.peekUndo();i&&(Si(structuredClone(i.undo),Qt("note.undo",{label:i.label}),"undo"),Us())}function Ph(){if(bn.length>0)return;const i=ti.peekRedo();i&&(Si(structuredClone(i.redo),Qt("note.redo",{label:i.label}),"redo"),Us())}function Uv(){const i=Pt.selection;if(!i||!Pt.model)return;const t=Pt.findEntity(i);if(t){if(!["wall","opening","furniture","room"].includes(t.entity)){Te.toast("reject",Qt("toast.deleteUnsupported",{kind:Qt(`kind.${t.entity}`)}));return}Si([{op:"delete",entity:t.entity,id:i}],Qt("note.delete",{id:i}),"edit"),Pt.select(null)}}const Te=new wv({onLevel:i=>Pt.setLevel(i),onView:i=>Pt.setView(i),onIssueClick:i=>{Ve.flash(i),Je.flash(i);const t=i[0];t&&Pt.select(t)},onFit2d:()=>Ve.fit(),onReset3d:()=>Je.resetView(),onPropEdit:(i,t,e,n)=>{Si([{op:"update",entity:i,id:t,data:{[e]:n}}],Qt("note.prop",{id:t,field:e}),"edit")},onUndo:Rh,onRedo:Ph},{readonly:Ns}),Ve=new Ju(document.getElementById("paper-viewport"),document.getElementById("paper"),{onSelect:i=>Pt.select(i),getModel:()=>Pt.model,getGrid:()=>Te.snapGrid(),onDragIds:i=>ei.send({type:"presence",draggingIds:i,tool:"V"}),onCommit:(i,t)=>Si([i],t,"edit"),readonly:Ns,onPlace:(i,t)=>{const e=Pt.model;if(!e||!Pt.activeLevel)return;const n=Ur(i),s=Hh(e,"F");Si([{op:"add",entity:"furniture",data:{id:s,level:Pt.activeLevel,asset:i,at:t,rotation:0}}],Qt("note.place",{label:(ts==="en"?n?.labelEn:void 0)??n?.label??i}),"edit")}}),Je=new bv(document.getElementById("canvas3d")),ei=new Rv({onConn:i=>Te.setConn(i),onSnapshot:i=>Pt.setSnapshot(i),onPatch:i=>Pt.applyPatch(i),onValidation:i=>Pt.setValidation(i),onCapture:async i=>{try{const t=i.target==="3d"?Je.capture(i.camera):await Ve.capture();ei.send({type:"capture_result",requestId:i.requestId,png:t})}catch(t){ei.send({type:"capture_result",requestId:i.requestId,error:t instanceof Error?t.message:String(t)})}},onReject:i=>{bn.shift(),Ve.clearPreview(),Te.toast("reject",i.errors.map(t=>t.message).join(" · ")||"Server từ chối thay đổi."),Us(),i.currentRevision>Pt.revision&&ei.resync()}},Io?`?token=${encodeURIComponent(Io)}`:"");Pt.on("snapshot",({model:i})=>{bn.length=0,ti.clear(),Us(),Te.setProject(i.meta.name),Te.setRevision(i.meta.revision,!1),Te.setLevels(i.levels,Pt.activeLevel),Je.setModel(i),Pt.activeLevel&&Ve.show(Pt.activeLevel,i.meta.revision)});Pt.on("patch",({revision:i,ops:t,origin:e,note:n,summary:s,changedIds:r})=>{if(Te.setRevision(i,!0),!Pt.model)return;if(e==="user"&&bn.length>0&&JSON.stringify(bn[0].ops)===JSON.stringify(t)){const o=bn.shift();o.kind==="edit"&&o.entry?ti.push(o.entry):o.kind==="undo"?ti.confirmUndo():o.kind==="redo"&&ti.confirmRedo(),Us()}const a=Je.applyOps(Pt.model,t);if(Je.flash(a),Pt.activeLevel&&Ve.show(Pt.activeLevel,i).then(()=>Ve.flash(r)),Te.setLevels(Pt.model.levels,Pt.activeLevel),e==="claude"){const o=n??s??"cập nhật model";Te.toast("claude",o,i),Te.claudeNote(o)}Pt.selection&&r.includes(Pt.selection)&&!Te.propsBusy&&Te.showEntity(Pt.findEntity(Pt.selection),Pt.selection)});Pt.on("validation",({issues:i})=>Te.setIssues(i));Pt.on("level",({level:i})=>{Te.setActiveLevel(i),Ve.show(i,Pt.revision)});Pt.on("view",()=>{requestAnimationFrame(()=>{Ve.ensureFitted(),Je.invalidate()})});Pt.on("select",({id:i})=>{Te.showEntity(i?Pt.findEntity(i):null,i),Ve.setSelection(i),ei.send({type:"presence",selection:i?[i]:[]}),i&&(Ve.flash([i]),Je.flash([i]))});Pt.on("resync",()=>ei.resync());const nl=document.getElementById("tool-select"),Ls=document.getElementById("tool-furniture"),Ds=new Vu(document.getElementById("pane2d"),i=>{Ve.setPlacing(i),Ls.classList.add("is-active"),nl.classList.remove("is-active")});function Nr(){Ve.setPlacing(null),Ds.hide(),Ls.classList.remove("is-active"),nl.classList.add("is-active")}Ls.addEventListener("click",()=>{if(Ds.visible){Nr();return}Ds.show(),Ls.classList.add("is-active")});nl.addEventListener("click",Nr);function Fv(){const i=Pt.selection;if(!i||!Pt.model)return;const t=Pt.model.furniture.find(e=>e.id===i);t&&Si([{op:"update",entity:"furniture",id:i,data:{rotation:(t.rotation+90)%360}}],Qt("note.rotate",{id:i}),"edit")}const La=document.getElementById("walk3d"),Ac=document.getElementById("sun3d"),Ov=document.getElementById("sun-controls"),Lh=document.getElementById("sun-hour"),Dh=document.getElementById("sun-month"),Bv=document.getElementById("sun-hour-val"),kv=document.getElementById("sun-month-val"),wc=document.getElementById("hint3d"),zv=Qt("hint3d.orbit");function Vv(){const i=Pt.model;if(!i||!Pt.activeLevel)return;let t=null;for(const e of i.rooms){if(e.level!==Pt.activeLevel||e.use==="gieng-troi")continue;const n=Jh(e.polygon);if(!t||n>t.area){const s=e.polygon.reduce((r,a)=>[r[0]+a[0],r[1]+a[1]],[0,0]);t={at:[s[0]/e.polygon.length,s[1]/e.polygon.length],area:n}}}return t?.at}La.addEventListener("click",()=>{if(Je.walking){Je.exitWalk();return}const i=Pt.model;if(!i)return;const t=i.levels.find(e=>e.id===Pt.activeLevel)??i.levels[0];t&&(Je.enterWalk(t,Vv(),()=>{La.classList.remove("is-active"),wc.textContent=zv}),La.classList.add("is-active"),wc.textContent=Qt("walk.hint"))});let Hi=!1;function il(){if(!Hi||!Pt.model)return;const i=Number(Lh.value),t=Number(Dh.value);Bv.textContent=`${Math.floor(i)}:${i%1?"30":"00"}`,kv.textContent=String(t),Je.setSun({hour:i,month:t,lat:Pt.model.brief?.dat?.vi_do??10.8,north:Pt.model.site.north})}Ac.addEventListener("click",()=>{Hi=!Hi,Ac.classList.toggle("is-active",Hi),Ov.hidden=!Hi,Hi?il():Je.setSun(null)});Lh.addEventListener("input",il);Dh.addEventListener("input",il);window.addEventListener("keydown",i=>{if(Ve.dragging)return;const t=i.target;if(!(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))){if(Ns){i.key==="Escape"&&Pt.select(null);return}(i.ctrlKey||i.metaKey)&&i.key.toLowerCase()==="z"&&!i.shiftKey?(i.preventDefault(),Rh()):(i.ctrlKey||i.metaKey)&&(i.key.toLowerCase()==="y"||i.key.toLowerCase()==="z"&&i.shiftKey)?(i.preventDefault(),Ph()):i.key==="Delete"?Uv():i.key.toLowerCase()==="r"&&!i.ctrlKey&&!i.metaKey?Fv():i.key==="5"?(Ds.show(),Ls.classList.add("is-active")):i.key.toLowerCase()==="v"?Nr():i.key==="Escape"&&(Ve.placingAsset||Ds.visible?Nr():Pt.select(null))}});const Cc=document.getElementById("share-btn");if(Ns){Cc.hidden=!0;const i=document.createElement("span");i.className="view-badge",i.textContent=Qt("viewer.badge"),document.querySelector(".brand")?.appendChild(i);for(const t of document.querySelectorAll(".rail .tool"))t.disabled=!0,t.title=Qt("tool.locked");document.getElementById("snap-input").disabled=!0}else Cc.addEventListener("click",async()=>{try{const i=await(await fetch("/share")).json();await navigator.clipboard.writeText(i.url),Te.toast("user",Qt("share.copied",{url:i.url}))}catch{Te.toast("reject",Qt("share.error"))}});const Ih=document.getElementById("lang-btn");Ih.textContent=ts==="vi"?"EN":"VI";Ih.addEventListener("click",zu);ei.connect();
