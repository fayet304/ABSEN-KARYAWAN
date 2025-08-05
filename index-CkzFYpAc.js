(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=i(a);fetch(a.href,o)}})();function d(t){document.getElementById(t).style.display="none",t==="modalDaftar"&&(document.getElementById("formDaftar").reset(),document.getElementById("daftarMessage").textContent=""),t==="modalLupa"&&(document.getElementById("formLupa").reset(),document.getElementById("lupaMessage").textContent="")}window.onclick=function(t){const e=document.getElementById("modalDaftar"),i=document.getElementById("modalLupa");t.target===e&&d("modalDaftar"),t.target===i&&d("modalLupa")};window.onload=function(){if(localStorage.getItem("isLoggedIn")==="true"&&(document.getElementById("loginPage").style.display="none",document.getElementById("menuPage").style.display="flex",showPage("aktivitasBaru")),!localStorage.getItem("aktivitasKaryawan")){const e=[{nama:"admin",tanggal:"2025-08-01",waktu:"08:30",tipe:"Absen Masuk",shift:"Pagi",keterangan:"Tepat waktu"},{nama:"admin",tanggal:"2025-08-01",waktu:"17:00",tipe:"Absen Pulang",shift:"Pagi",keterangan:"Lembur 1 jam"},{nama:"john",tanggal:"2025-08-02",waktu:"09:10",tipe:"Absen Masuk",shift:"Pagi",keterangan:"Terlambat 10 menit"},{nama:"sarah",tanggal:"2025-08-03",waktu:"13:00",tipe:"Absen Masuk",shift:"Siang",keterangan:"Normal"},{nama:"admin",tanggal:"2025-08-04",waktu:"08:00",tipe:"Absen Masuk",shift:"Pagi",keterangan:"Datang lebih awal"}];localStorage.setItem("aktivitasKaryawan",JSON.stringify(e))}};window.handleLogin=function(t){t.preventDefault();const e=document.getElementById("username").value.trim(),i=document.getElementById("password").value,n=JSON.parse(localStorage.getItem("userAccounts")||"[]"),a={username:"admin",password:"12345"};let o=n.find(r=>r.username===e&&r.password===i);if(!o&&e===a.username&&i===a.password&&(o=a),o){localStorage.setItem("isLoggedIn","true"),localStorage.setItem("currentUser",e),document.getElementById("loginPage").style.display="none",document.getElementById("menuPage").style.display="flex";const r=JSON.parse(localStorage.getItem("loginLogs")||"[]"),s=new Date().toLocaleString("id-ID"),l=/Mobi/i.test(navigator.userAgent)?"Mobile Browser":"Desktop Browser",c="192.168.1."+Math.floor(Math.random()*100+1);r.push({nama:e,waktu:s,agent:l,ip:c}),localStorage.setItem("loginLogs",JSON.stringify(r)),showPage("aktivitasBaru")}else alert("Login gagal! Username atau password salah.")};window.handleDaftar=function(t){t.preventDefault();const e=document.getElementById("daftarUsername").value.trim(),i=document.getElementById("daftarPassword").value;if(!e||!i){alert("Username dan password wajib diisi!");return}let n=JSON.parse(localStorage.getItem("userAccounts")||"[]");if(n.find(a=>a.username===e)){document.getElementById("daftarMessage").style.color="red",document.getElementById("daftarMessage").textContent="Username sudah terdaftar.";return}n.push({username:e,password:i}),localStorage.setItem("userAccounts",JSON.stringify(n)),document.getElementById("daftarMessage").style.color="green",document.getElementById("daftarMessage").textContent="Akun berhasil didaftarkan! Silakan login.",document.getElementById("formDaftar").reset(),setTimeout(()=>d("modalDaftar"),2e3)};window.handleLupa=function(t){t.preventDefault();const e=document.getElementById("lupaUsername").value.trim(),i=JSON.parse(localStorage.getItem("userAccounts")||"[]");if(e==="admin"){document.getElementById("lupaMessage").style.color="green",document.getElementById("lupaMessage").textContent="Password admin adalah: 12345";return}const n=i.find(a=>a.username===e);n?(document.getElementById("lupaMessage").style.color="green",document.getElementById("lupaMessage").textContent=`Password untuk username "${e}" adalah: ${n.password}`):(document.getElementById("lupaMessage").style.color="red",document.getElementById("lupaMessage").textContent="Username tidak ditemukan.")};window.showPage=function(t){const e=document.getElementById("contentArea");if(t==="aktivitasBaru"&&(e.innerHTML=`
      <h1>Aktivitas Terbaru</h1>
      <div class="button-group">
        <button onclick="showShiftForm()">Absen Masuk</button>
        <button onclick="showIzinForm()">Izin</button>
        <button onclick="absenPulang()">Absen Pulang</button>
      </div>
      <div id="shiftFormContainer"></div>
      <div id="izinFormContainer"></div>
      <div id="welcomeMessageContainer"></div>
    `),t==="tambahPemain"&&(e.innerHTML=`
      <h1>Tambah Karyawan</h1>
      <form id="formTambahPemain" onsubmit="submitPemain(event)">
        <div class="form-group">
          <label for="namaLengkap">Nama Lengkap</label>
          <input type="text" id="namaLengkap" required />
        </div>
        <div class="form-group">
          <label for="emailPemain">Email</label>
          <input type="email" id="emailPemain" required />
        </div>
        <div class="form-group">
          <label for="keteranganPemain">Keterangan</label>
          <textarea id="keteranganPemain" rows="3"></textarea>
        </div>
        <button type="submit" class="btn-blue">Tambah Karyawan Baru</button>
      </form>
      <div id="formMessage" style="margin-top:10px; color:green;"></div>
      <div class="floating-box">
        <h3>Pencarian Data Karyawan</h3>
        <div class="form-group">
          <label>Nama Lengkap</label>
          <input type="text" id="searchNama" />
        </div>
        <div class="form-group">
          <label>Keterangan</label>
          <input type="text" id="searchKeterangan" />
        </div>
        <button onclick="searchKaryawan()" class="btn-blue">Cari</button>
        <div id="hasilCari"></div>
      </div>
      <h3>Data Karyawan Terdaftar</h3>
      <div id="dataTabel"></div>
    `,tampilkanSemuaKaryawan()),t==="riwayatLogin"){let n=JSON.parse(localStorage.getItem("loginLogs")||"[]").map(a=>`
      <tr>
        <td>${a.nama}</td>
        <td>${a.waktu}</td>
        <td>${a.agent}</td>
        <td>${a.ip}</td>
      </tr>
    `).join("");e.innerHTML=`
      <h1>Riwayat Login Karyawan</h1>
      <table>
        <thead>
          <tr>
            <th>Nama Karyawan</th>
            <th>Tanggal & Waktu</th>
            <th>Aplikasi Web Login</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>${n}</tbody>
      </table>
    `}t==="historyAktivitas"&&(e.innerHTML=`
      <h1>History Aktivitas Karyawan</h1>
      <div class="search-history-form">
        <h3>Pencarian Riwayat Aktivitas</h3>
        <form id="formSearchHistory" onsubmit="searchHistoryAktivitas(event)">
          <div class="form-group">
            <label for="searchHistoryNama">Nama Lengkap</label>
            <input type="text" id="searchHistoryNama" placeholder="Masukkan nama karyawan" />
          </div>
          <div class="form-group">
            <label for="searchHistoryTanggal">Tanggal Aktivitas (Opsional)</label>
            <input type="date" id="searchHistoryTanggal" />
          </div>
          <div class="form-group">
            <label for="searchHistoryTipe">Tipe Aktivitas (Opsional)</label>
            <select id="searchHistoryTipe">
              <option value="">-- Semua --</option>
              <option value="Absen Masuk">Absen Masuk</option>
              <option value="Absen Pulang">Absen Pulang</option>
              <option value="Izin">Izin</option>
            </select>
          </div>
          <button type="submit" class="btn-blue">Cari Riwayat</button>
        </form>
      </div>
      <div id="historyResults" class="search-history-result">
        <p>Masukkan nama karyawan dan klik cari untuk menampilkan riwayat aktivitas.</p>
      </div>
    `)};window.searchHistoryAktivitas=function(t){t.preventDefault();const e=document.getElementById("searchHistoryNama").value.trim().toLowerCase(),i=document.getElementById("searchHistoryTanggal").value,n=document.getElementById("searchHistoryTipe").value;if(!e){alert("Harap masukkan nama karyawan!");return}const o=JSON.parse(localStorage.getItem("aktivitasKaryawan")||"[]").filter(r=>{const u=r.nama.toLowerCase().includes(e),s=i?r.tanggal===i:!0,l=n?r.tipe===n:!0;return u&&s&&l});g(o)};function g(t){const e=document.getElementById("historyResults");if(t.length===0){e.innerHTML='<div class="no-results">Tidak ditemukan data aktivitas untuk kriteria yang dipilih</div>';return}let i="<h3>Hasil Pencarian</h3>";t.forEach(n=>{i+=`
      <div class="history-record">
        <h3>${n.nama}</h3>
        <div class="history-meta">
          ${n.tanggal} | ${n.waktu} | Shift: ${n.shift}
        </div>
        <div class="history-action">
          <strong>${n.tipe}</strong>: ${n.keterangan}
        </div>
      </div>
    `}),e.innerHTML=i}window.showShiftForm=function(){document.getElementById("shiftFormContainer").innerHTML=`
    <div class="shift-form">
      <label for="shiftSelect">Pilih Shift:</label>
      <select id="shiftSelect">
        <option value="Pagi">Shift Pagi</option>
        <option value="Siang">Shift Siang</option>
        <option value="Malam">Shift Malam</option>
      </select>
      <button onclick="submitShift()">Submit</button>
    </div>
  `,document.getElementById("izinFormContainer").innerHTML="",document.getElementById("welcomeMessageContainer").innerHTML=""};window.showIzinForm=function(){document.getElementById("izinFormContainer").innerHTML=`
    <div class="shift-form">
      <label for="izinKeterangan">Keterangan Izin:</label>
      <textarea id="izinKeterangan" rows="3" placeholder="Masukkan alasan izin"></textarea>
      <button onclick="submitIzin()">Submit Izin</button>
    </div>
  `,document.getElementById("shiftFormContainer").innerHTML="",document.getElementById("welcomeMessageContainer").innerHTML=""};window.submitShift=function(){const t=document.getElementById("shiftSelect").value,e=document.getElementById("welcomeMessageContainer");e.innerHTML=`
    <div id="welcomeMessage">
      Selamat datang! Anda telah absen masuk untuk shift <span style="color:#0099ff; font-weight:bold;">${t}</span>.
    </div>
  `,document.getElementById("shiftFormContainer").innerHTML="",m("Absen Masuk",t,"Tepat waktu")};window.submitIzin=function(){const t=document.getElementById("izinKeterangan").value.trim();if(!t){alert("Keterangan izin wajib diisi!");return}const e=document.getElementById("welcomeMessageContainer");e.innerHTML=`
    <div id="welcomeMessage" style="background-color:#fcf8e3; color:#8a6d3b;">
      Izin Anda telah dicatat dengan keterangan: <span style="font-weight:bold;">${t}</span>.
    </div>
  `,document.getElementById("izinFormContainer").innerHTML="",m("Izin","-",t)};window.absenPulang=function(){m("Absen Pulang","-","Normal");const t=document.getElementById("welcomeMessageContainer");t.innerHTML=`
    <div id="welcomeMessage" style="background-color:#d9edf7; color:#31708f;">
      Absen pulang Anda telah berhasil dicatat pada ${new Date().toLocaleTimeString("id-ID")}
    </div>
  `,document.getElementById("shiftFormContainer").innerHTML="",document.getElementById("izinFormContainer").innerHTML=""};function m(t,e,i){const n=localStorage.getItem("currentUser")||"unknown",a=new Date,o=JSON.parse(localStorage.getItem("aktivitasKaryawan")||"[]"),r={nama:n,tanggal:a.toISOString().split("T")[0],waktu:a.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}),tipe:t,shift:e,keterangan:i};o.push(r),localStorage.setItem("aktivitasKaryawan",JSON.stringify(o))}window.submitPemain=function(t){t.preventDefault();const e=document.getElementById("namaLengkap").value.trim(),i=document.getElementById("emailPemain").value.trim(),n=document.getElementById("keteranganPemain").value.trim();if(!e||!i){alert("Nama dan Email wajib diisi!");return}const a=JSON.parse(localStorage.getItem("dataKaryawan")||"[]");a.push({nama:e,email:i,keterangan:n}),localStorage.setItem("dataKaryawan",JSON.stringify(a)),document.getElementById("formMessage").textContent=`Karyawan "${e}" berhasil ditambahkan.`,document.getElementById("formTambahPemain").reset(),tampilkanSemuaKaryawan()};window.tampilkanSemuaKaryawan=function(){const t=JSON.parse(localStorage.getItem("dataKaryawan")||"[]");if(t.length===0){document.getElementById("dataTabel").innerHTML="<p>Tidak ada data karyawan terdaftar.</p>";return}let e="<table><thead><tr><th>Nama</th><th>Email</th><th>Keterangan</th></tr></thead><tbody>";t.forEach(i=>{e+=`<tr><td>${i.nama}</td><td>${i.email}</td><td>${i.keterangan}</td></tr>`}),e+="</tbody></table>",document.getElementById("dataTabel").innerHTML=e};window.searchKaryawan=function(){const t=document.getElementById("searchNama").value.toLowerCase(),e=document.getElementById("searchKeterangan").value.toLowerCase(),n=JSON.parse(localStorage.getItem("dataKaryawan")||"[]").filter(o=>o.nama.toLowerCase().includes(t)&&o.keterangan.toLowerCase().includes(e));if(n.length===0){document.getElementById("hasilCari").innerHTML="<p style='color:red;'>Data tidak ditemukan.</p>";return}let a="<table><thead><tr><th>Nama</th><th>Email</th><th>Keterangan</th></tr></thead><tbody>";n.forEach(o=>{a+=`<tr><td>${o.nama}</td><td>${o.email}</td><td>${o.keterangan}</td></tr>`}),a+="</tbody></table>",document.getElementById("hasilCari").innerHTML=a};window.logout=function(){localStorage.removeItem("isLoggedIn"),localStorage.removeItem("currentUser"),location.reload()};
