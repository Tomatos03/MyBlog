<div :class="$style.container">
    <header :class="$style.header">
        <div :class="$style.imgWrapper">
            <img src="/avatar.jpg" alt="个人照片" :class="$style.profileImg">
        </div>
        <h1 :class="$style.title">Tomatos</h1>
        <p :class="$style.subtitle">软件开发工程师</p>
    </header>
    <section :class="$style.section">
        <h2 :class="$style.sectionTitle">关于我</h2>
        <p :class="$style.description">在校大学生，热衷于编程和技术。</p>
        <p :class="$style.description">在学习之余，探索新技术和研究算法，提高个人能力</p>
    </section>
    <!-- <section :class="$style.section">
        <h2 :class="$style.sectionTitle">技能</h2>
        <div :class="$style.skills">
            <span :class="[$style.skill]">Java</span>
            <span :class="[$style.skill]">Vue3</span>
            <span :class="[$style.skill]">HTML</span>
            <span :class="[$style.skill]">CSS</span>
            <span :class="[$style.skill]">Spring</span>
        </div>
    </section> -->
</div>

<style module>
    .container {
        max-width: 800px;
        margin: 50px auto;
        padding: 25px;
        background: rgba(255,255,255,0.1);
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }

    .header {
        text-align: center;
    }
    
    .imgWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .profileImg {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid #6c5ce7;
    }
    
    .title {
        color: var(--vp-c-text-1);
        font-size: 2rem;
        margin-bottom: 8px;
    }
    
    .subtitle {
        color: var(--vp-c-text-2);
        font-size: 1.1rem;
    }
    
    .section {
        margin: 28px 0;
    }
    
    .sectionTitle {
        font-size: 1.4rem;
        margin-bottom: 16px;
        text-align: center;
        border-top: none !important;
    }
    
    .sectionTitle::after {
        content: '';
        display: block;
        margin: 5px auto;
        width: 80px;
        height: 5px;
        background: var(--vp-c-brand);
        border-radius: 2px;
    }
    
    .description {
        color: var(--vp-c-text-2);
        line-height: 1.8;
        margin-bottom: 12px;
        text-align: center;
    }
    
    .skills {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .skill {
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.9rem;
        background: rgba(108,92,231,0.15);
        color: #6c5ce7;
    }
</style>
