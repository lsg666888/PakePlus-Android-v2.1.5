window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    
    // 检查是否是文件下载链接
    const isDownloadLink = origin && origin.download;
    const isBlobUrl = origin && origin.href && origin.href.startsWith('blob:');
    
    if (
        !isDownloadLink && !isBlobUrl && (
            (origin && origin.href && origin.target === '_blank') ||
            (origin && origin.href && isBaseTargetBlank)
        )
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    
    // 检查是否是文件下载（blob URL或data URL）
    if (url && (url.startsWith('blob:') || url.startsWith('data:'))) {
        // 允许文件下载，使用原生方法
        console.log('允许文件下载:', url);
        return window.__originalOpen ? window.__originalOpen.call(window, url, target, features) : null;
    }
    
    location.href = url
}

// 保存原始的window.open方法
if (!window.__originalOpen) {
    window.__originalOpen = window.open;
}

document.addEventListener('click', hookClick, { capture: true })