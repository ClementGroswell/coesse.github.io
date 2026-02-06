// 移动端菜单开关逻辑
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        
        // 按钮动画
        const spans = menuBtn.querySelectorAll('span');
        if(mobileNav.classList.contains('active')) {
            spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
        } else {
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        }
    });
}

// 点击背景自动收起
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('active');
    }
});
