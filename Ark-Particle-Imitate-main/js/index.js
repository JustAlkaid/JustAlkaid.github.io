let DameDaneParticleDemo = new DameDaneParticle(document.getElementById('akCanvas'), {
  src: '',
  renderX: window.innerWidth / 2 - 200-30, // 初始位置居中
  renderY: window.innerHeight / 2 - 300, // 初始位置居中
  w: 400,
  size: 1.2,
  spacing: 1.2,
  validColor: {
    min: 300,
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
  DameDaneParticleDemo.ChangeImg('/assets/img/index/album/pic1.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2-200, // 居中
    w: imgwww
  })
}

function img_2() {
  const imgWidth = 361;
  const imgHeight = 184;
  const imgwww = 800;
  DameDaneParticleDemo.ChangeImg('/assets/img/index/album/pic2.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2, // 居中
    w: imgwww
  })
}

function img_3() {
  const imgWidth = 361;
  const imgHeight = 184;
  const imgwww = 800;
  DameDaneParticleDemo.ChangeImg('/assets/img/index/album/pic3.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2-100, // 居中
    w: imgwww
  })
}

function img_4() {
  const imgWidth = 361;
  const imgHeight = 184;
  const imgwww = 800;
  DameDaneParticleDemo.ChangeImg('/assets/img/index/album/pic4.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2-100, // 居中
    w: imgwww
  })
}

function img_5() {
  const imgWidth = 361;
  const imgHeight = 184;
  const imgwww = 800;
  DameDaneParticleDemo.ChangeImg('/assets/img/index/album/pic5.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2-100, // 居中
    w: imgwww
  })
}

function img_6() {
  const imgWidth = 361;
  const imgHeight = 184;
  const imgwww = 800;
  DameDaneParticleDemo.ChangeImg('/assets/img/index/album/pic6.jpg', {
    renderX: (window.innerWidth - imgwww) / 2-30, // 居中
    renderY: (window.innerHeight - imgHeight/imgWidth * imgwww) / 2-100, // 居中
    w: imgwww
  })
}

// 定义一个数组存储所有的函数
const changeImgFunctions = [img_1, img_4, img_5, img_6];

// 定义一个索引来跟踪当前调用的函数
changeImgFunctions[0]();
let currentIndex = 1;

// 使用 setInterval 每隔 5 秒调用一个函数
setInterval(() => {
  // 调用当前索引的函数
  changeImgFunctions[currentIndex]();
  
  // 更新索引，如果到达数组末尾则重置为 0
  currentIndex = (currentIndex + 1) % changeImgFunctions.length;
}, 7000); // 5000 毫秒 = 5 秒