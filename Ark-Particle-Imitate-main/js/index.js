let DameDaneParticleDemo = new DameDaneParticle(document.getElementById('akCanvas'), {
  src: '/assets/img/album_another/pic1.jpg',
  renderX: window.innerWidth / 2 - 200-30, // 初始位置居中
  renderY: window.innerHeight / 2 - 300, // 初始位置居中
  w: 400,
  size: 1.2,
  spacing: 1.2,
  validColor: {
    min: 270,
    max: 765,
    invert: false
  },
  effectParticleMode: 'adsorption',
  Thickness: 25,
})

function img_1() {
  const imgWidth = 361;
  const imgHeight = 184;
  const imgwww = 800;
  DameDaneParticleDemo.ChangeImg('/assets/img/album_another/pic1.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2 - 100, // 居中
    validColor: {
      min: 100,
      max: 765,
      invert: false
    },
    w: imgwww
  })
}


function img_4() {
  const imgWidth = 180;
  const imgHeight = 184;
  const imgwww = 500;
  DameDaneParticleDemo.ChangeImg('/assets/img/album_another/beihang.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2-50, // 居中
    validColor: {
      min: 300,
      max: 765,
      invert: false
    },
    w: imgwww
  })
}

function img_5() {
  const imgWidth = 361;
  const imgHeight = 184;
  const imgwww = 500;
  DameDaneParticleDemo.ChangeImg('/assets/img/album_another/chuanyuan.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2 - 100, // 居中
    validColor: {
      min: 300,
      max: 765,
      invert: false
    },
    w: imgwww
  })
}

function Kaltsit() {
  const imgWidth = 361;
  const imgHeight = 184;
  const imgwww = 500;
  DameDaneParticleDemo.ChangeImg('/assets/img/album_another/Kaltsit.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2 - 100, // 居中
    validColor: {
      min: 100,
      max: 765,
      invert: false
    },
    w: imgwww
  })
}

function Skadi() {
  const imgWidth = 361;
  const imgHeight = 184;
  const imgwww = 500;
  DameDaneParticleDemo.ChangeImg('/assets/img/album_another/Skadi.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2 - 200, // 居中
    validColor: {
      min: 0,
      max: 765,
      invert: false
    },
    w: imgwww
  })
}

function Platinum() {
  const imgWidth = 361;
  const imgHeight = 184;
  const imgwww = 500;
  DameDaneParticleDemo.ChangeImg('/assets/img/album_another/Platinum.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2 - 200, // 居中
    validColor: {
      min: 400,
      max: 765,
      invert: false
    },
    w: imgwww
  })
}



function arknights() {
  const imgWidth = 361;
  const imgHeight = 184;
  const imgwww = 800;
  DameDaneParticleDemo.ChangeImg('/assets/img/album_another/arknight.png', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2, // 居中
    w: imgwww
  })
}

// 定义一个数组存储所有的函数
const changeImgFunctions = [img_1, Platinum,  Skadi, Kaltsit, img_4, img_5, arknights];

// 定义一个索引来跟踪当前调用的函数
changeImgFunctions[0]();
let currentIndex = 1;

// 使用 setInterval 每隔 5 秒调用一个函数
setInterval(() => {
  // 调用当前索引的函数
  DameDaneParticleDemo.ParticlePolymerize()
  
  DameDaneParticleDemo.ParticlePolymerize()
  changeImgFunctions[currentIndex]();
  
  // 更新索引，如果到达数组末尾则重置为 0
  currentIndex = (currentIndex + 1) % changeImgFunctions.length;
}, 8000); // 5000 毫秒 = 5 秒