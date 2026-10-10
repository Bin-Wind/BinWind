(() => {
  const photos = [
  "02B869F4-4DDA-4907-96F9-98620D4E50C2_1_105_c.jpeg",
  "031F05F0-4168-4AE7-8BA0-446AF9C6C142_1_105_c.jpeg",
  "08037420-13BD-4F84-8AD7-03E0222CB0BF_1_105_c.jpeg",
  "09738666-8FCF-4B22-A8E7-15140C057323_1_105_c.jpeg",
  "0D2BFA2A-15AF-4DC7-8240-B1832C09950E_1_105_c.jpeg",
  "0F6A67E4-FD06-4DB1-8C19-8D48E932B1DB_1_105_c.jpeg",
  "110DD5D9-6DCC-492D-B19A-883C461DC83B_1_105_c.jpeg",
  "12E68186-6135-4CB8-960D-36DB0DE6953F_1_105_c.jpeg",
  "139946CF-CA6B-4ED6-8AB8-937F8A0C5155_1_105_c.jpeg",
  "1B78268E-2CDF-4BCF-9115-E08B32DE5D6A_1_105_c.jpeg",
  "20F93FA5-BF6D-4582-80E6-AE74CB305F2E_1_105_c.jpeg",
  "22B63B4F-1DD8-48E1-BC21-1575E0F8FF19_1_105_c.jpeg",
  "289FFA3E-48D3-4B36-83AB-9131EC412A56_1_105_c.jpeg",
  "31F84BFE-ECA5-4E8B-81C9-9046DAA9CF09_1_105_c.jpeg",
  "349DA9B8-3C85-4A1C-989C-53BF728F1DA1_1_105_c.jpeg",
  "37CE02CB-5632-4C1B-B32F-CB0044EA8942_1_105_c.jpeg",
  "37F1930F-8C50-4AF7-B944-8F6D362AFA31_1_105_c.jpeg",
  "3B3CD8F5-F650-4B0A-9550-59BBDB8D681D_1_105_c.jpeg",
  "3C719491-158C-4189-8131-36FF9EA754B0_1_105_c.jpeg",
  "4D23E07B-3CA5-476C-A9B3-74DD5E76E3AD_1_105_c.jpeg",
  "4E50B5C9-8F91-426B-BB8A-C50F3A9CA2E2_1_105_c.jpeg",
  "5026B00C-3BA9-48CB-8FD1-5D8D5206748D_1_105_c.jpeg",
  "51FA6891-F2B2-41EC-BF09-7C76A0BD67AF_1_105_c.jpeg",
  "55C2AFD7-6561-4CC2-90DA-D60BB0418078_1_105_c.jpeg",
  "588EFB98-C0B7-46BD-A92F-8377D7967709_1_105_c.jpeg",
  "5B4CA3A0-8C1D-49FB-A9B0-EAC060F5A756_1_105_c.jpeg",
  "5B5A31E5-01F6-4C91-A335-76BD6AFF3961_1_105_c.jpeg",
  "5F122043-773B-4EB9-947B-D5CDA0D7DA8E_1_105_c.jpeg",
  "5FCE106D-AC19-427D-A147-19C43434B2E5_1_105_c.jpeg",
  "5FF60826-7B54-4C2C-B8E5-C057EB4634A4_1_105_c.jpeg",
  "62EBF66C-905C-4D9C-913E-B8EDF64AE257_1_105_c.jpeg",
  "6CAC0A9D-6D0A-4187-A778-74C09AB6DA28_1_105_c.jpeg",
  "6D107108-71F9-4BBF-B48E-61811C0F3B65_1_105_c.jpeg",
  "6FEBBCAB-2B3F-4032-B4B2-30D6B6379C9C_1_105_c.jpeg",
  "700738B7-2C1F-4BD3-BDA2-AC88D59C8825_1_105_c.jpeg",
  "78E579BE-FA2D-409F-A580-AA55708B0381_1_105_c.jpeg",
  "793A9E05-9F59-43B3-A38E-F361CC511C18_1_105_c.jpeg",
  "79E3BCA3-4D25-48C1-94D3-439EF8EF3D40_1_105_c.jpeg",
  "7BB3BA90-B1B1-4CA9-B412-143CABA20FBD_1_105_c.jpeg",
  "809F8E72-6698-4C20-8665-729567E4B0F7_1_105_c.jpeg",
  "814F49DD-CA42-4FD0-ACF0-21E89EF2E167_1_105_c.jpeg",
  "82A1F035-5DB7-4AB7-B014-74E0838955A2_1_105_c.jpeg",
  "866EE1CF-9F58-4A9F-A033-83614311EB90_1_105_c.jpeg",
  "8712A0CF-BF36-4904-9A39-D1C8F2C06612_1_105_c.jpeg",
  "888BCE59-4FE4-49F8-8D76-F9D7C27F7FD2_1_105_c.jpeg",
  "8B5E56FB-6EAA-4EA4-A60E-D4BBD89FD63C_1_105_c.jpeg",
  "8BFB21F9-AEBE-4F79-A04D-58C0CFC42727_1_105_c.jpeg",
  "8DC15083-A28B-4679-A3DF-361964310AD9_1_105_c.jpeg",
  "8F7511F4-A844-49CC-A3B1-3CDE2E006DDA_1_105_c.jpeg",
  "909DFC0E-D66D-4823-A3FB-D28EC5C427FA_1_105_c.jpeg",
  "92E0B7E1-D3AD-4AB4-BDD1-B4F97B857195_1_105_c.jpeg",
  "932325A6-A85F-4D92-B49D-FC0AF516AD37_1_105_c.jpeg",
  "95420911-86A4-4E41-8D83-0F328AAC3903_1_105_c.jpeg",
  "96F8486C-BDF0-4BE2-B88B-1ABE53867283_1_105_c.jpeg",
  "9A2F551B-7E68-4FA9-979F-33E5C3FC65D9_1_105_c.jpeg",
  "9E2272AA-977F-4521-B874-CD641A20711D_1_105_c.jpeg",
  "A08532D2-F6D4-4936-9898-264036E8DBDD_1_105_c.jpeg",
  "AAE317E5-A1BC-40D9-85EF-CFBA71F8E60A_1_105_c.jpeg",
  "ABBF3E46-AEE7-480D-AF27-0B2486B5F1E5_1_105_c.jpeg",
  "B6863B73-7A65-4876-93B0-1843347A269E_1_105_c.jpeg",
  "B9470A99-839B-4FD4-A4D7-44E1741E2E8B_1_105_c.jpeg",
  "BA50ACC6-225E-4CA1-8424-9DC54EF31EA5_1_105_c.jpeg",
  "BE780051-E73D-489F-AE88-128CB82F98F5_1_105_c.jpeg",
  "C010B35B-9E90-473C-8DFB-1C61FE614D76_1_105_c.jpeg",
  "C89885C9-8765-4DDC-B97F-30A3003E28B0_1_105_c.jpeg",
  "CAD8373F-1786-4ED2-9DA1-47853D1AB345_1_105_c.jpeg",
  "CE9D6CDB-3A44-48BB-882D-675FF8B1E12A_1_105_c.jpeg",
  "D042B2C1-B164-4ED7-8F21-CC1FFA5A4291_1_105_c.jpeg",
  "D198E8A3-3419-4A27-A95F-64EEF569A0EE_1_105_c.jpeg",
  "D2102AB0-41B9-4070-A0B8-2932F85A0F91_1_105_c.jpeg",
  "D6382349-9952-41CE-AD3B-F63CA450AE9E_1_105_c.jpeg",
  "DD34DB0B-776C-4D1C-B23D-918030268D7F_1_105_c.jpeg",
  "DF22C188-51E3-4952-99D7-ED01792BF2CA_1_105_c.jpeg",
  "E29021D2-E366-48BA-A06B-6961CE2D7DA2_1_105_c.jpeg",
  "E3B79E27-7F8E-488D-8CE4-0395CA43F22D_1_105_c.jpeg",
  "E5490031-146C-4FA8-8684-8141EF9F80D2_1_105_c.jpeg",
  "E899B721-EB0E-4193-9AA4-60FDEBD7D77C_1_105_c.jpeg",
  "E9B16F85-63E0-4A2B-BDAE-B114A1ECFCEF_1_105_c.jpeg",
  "EC6BE26E-89AB-495E-A117-B45696250103_1_105_c.jpeg",
  "EDB8A529-8929-444F-A8EA-0FB294C7D4A9_1_105_c.jpeg",
  "F1150C4F-1AA0-4487-B302-C7528EF52BBD_1_105_c.jpeg",
  "F119A182-514A-4E8A-98D4-3296FB161425_1_105_c.jpeg",
  "F2F1675E-0DE7-47AF-A63D-54AE5B5B560E_1_105_c.jpeg",
  "FB210D57-F619-4D19-8B9C-1D7E08D02A0C_1_105_c.jpeg",
  "FC896985-58CB-44BF-8285-A19100CEA147_1_105_c.jpeg"
];
  const basePath = '/travel_images/2026.09.25~2026.10.03/';
  const grid = document.getElementById('albumGrid');
  const toggle = document.getElementById('albumToggle');
  const viewer = document.getElementById('photoViewer');
  const viewerImage = document.getElementById('viewerImage');
  const viewerClose = document.getElementById('viewerClose');
  const viewerPrev = document.getElementById('viewerPrev');
  const viewerNext = document.getElementById('viewerNext');
  const viewerCount = document.getElementById('viewerCount');
  let currentIndex = 0;

  const showPhoto = (index) => {
    currentIndex = (index + photos.length) % photos.length;
    const filename = photos[currentIndex];
    viewerImage.src = basePath + encodeURIComponent(filename);
    viewerImage.alt = `2026 年九天旅行照片 ${currentIndex + 1}`;
    viewerCount.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${photos.length}`;
    if (!viewer.open) viewer.showModal();
  };

  photos.forEach((filename, index) => {
    const button = document.createElement('button');
    button.className = 'photo-card';
    button.type = 'button';
    button.setAttribute('aria-label', `查看旅行照片 ${index + 1}`);
    const image = document.createElement('img');
    image.src = basePath + encodeURIComponent(filename);
    image.alt = `2026 年九天旅行照片 ${index + 1}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    button.appendChild(image);
    const number = document.createElement('span');
    number.className = 'photo-index';
    number.textContent = `MEMORY ${String(index + 1).padStart(2, '0')}`;
    button.appendChild(number);
    button.addEventListener('click', () => showPhoto(index));
    grid.appendChild(button);
  });

  toggle.addEventListener('click', () => {
    const expanded = grid.classList.toggle('expanded');
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? '收起相册' : `查看全部 ${photos.length} 张照片`;
    if (!expanded) document.getElementById('album').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const closeViewer = () => viewer.close();
  viewerClose.addEventListener('click', closeViewer);
  viewerPrev.addEventListener('click', () => showPhoto(currentIndex - 1));
  viewerNext.addEventListener('click', () => showPhoto(currentIndex + 1));
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) closeViewer();
  });
  document.addEventListener('keydown', (event) => {
    if (!viewer.open) return;
    if (event.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (event.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });
})();

