// Memorial Slideshow Customization Form - Main JavaScript
// Handles form logic, validation, and submission to Zapier

// === ZAPIER WEBHOOK CONFIGURATION ===
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/19825049/um44ula/';

// Template data with all 30 templates
const TEMPLATES = {
    blue: [
        { id: 'beach_blue', name: 'Beach', url: 'https://dl.dropboxusercontent.com/scl/fi/dj5mzvmg8376o423d27uq/BeachP-Blue.jpg?rlkey=lg0fbwx7xj215eclg1znu1jxd&st=ogkcpetm' },
        { id: 'clouds_blue', name: 'Clouds', url: 'https://dl.dropboxusercontent.com/scl/fi/fen11psniha46iwjms383/Clouds-Blue.jpg?rlkey=hc2rrceduldrecz2aqhp8kda2&st=3ckvobbv' },
        { id: 'fading_hearts_blue', name: 'Fading Hearts', url: 'https://dl.dropboxusercontent.com/scl/fi/n533cqoxffakpbsxp8d8z/Fading-Hearts-Blue.jpg?rlkey=dqm0tppw6d69zq6n4whxectp5&st=dd0h9dtq' },
        { id: 'fish_blue', name: 'Fish', url: 'https://dl.dropboxusercontent.com/scl/fi/b8di7d8f2n2k17h6ylq4v/Fish-Blue.jpg?rlkey=6bz7l5srdvz6x5pvlckjkuntf&st=iuf3fm9s' },
        { id: 'golf_blue', name: 'Golf', url: 'https://dl.dropboxusercontent.com/scl/fi/yy2lzifprzqsr3hpbx32i/Golf-Blue.jpg?rlkey=h6509taofzshwu5v6lea0tzuv&st=y71f2odi' },
        { id: 'gradient_blue', name: 'Gradient', url: 'https://dl.dropboxusercontent.com/scl/fi/vdq986vi8rnm35gcbicr4/Gradient-Blue.jpg?rlkey=0fwb3ntd0su0o83hvt76439x4&st=1fh8enw3' },
        { id: 'modern_blue', name: 'Modern', url: 'https://dl.dropboxusercontent.com/scl/fi/918cdbiofftso1ltvbio0/Modern-Blue.jpg?rlkey=l6wujvkettp2r62i8y1pfb2ui&st=x0q0u3u8' },
        { id: 'mountain_view_blue', name: 'Mountain View', url: 'https://dl.dropboxusercontent.com/scl/fi/t2vy923uptzn0twpel7sb/Mountain-View-Blue.jpg?rlkey=ek580gqqlalqzu5a1y4zywsd3&st=tf6pu5dg' },
        { id: 'us_flag_blue', name: 'US Flag', url: 'https://dl.dropboxusercontent.com/scl/fi/hvzahgnw41yjaktw1a1qc/USFlag-Blue.jpg?rlkey=ov3s5zqcrpom3cb02s3bdlnkz&st=anv2j2xv' },
        { id: 'wild_flowers_blue', name: 'Wild Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/53os5m1hglm4z143ln80d/Wild-Flowers-Blue.jpg?rlkey=rojdxq4a6ycjfxtyxy09vwmfx&st=eo3otum5' }
    ],
    gray: [
        { id: 'beach_gray', name: 'Beach', url: 'https://dl.dropboxusercontent.com/scl/fi/n5ckrdqh3zbf8j1784bov/BeachP-Gray.jpg?rlkey=w9qrs3b2lgd4xxnveossrkaa2&st=odeodmwp' },
        { id: 'clouds_gray', name: 'Clouds', url: 'https://dl.dropboxusercontent.com/scl/fi/7yvp2znooyrlsalpi98ap/Clouds-Gray.jpg?rlkey=awtsd5zj02xp9tj6ocxizrreu&st=nnulx4u7' },
        { id: 'fading_hearts_gray', name: 'Fading Hearts', url: 'https://dl.dropboxusercontent.com/scl/fi/ohqcxbnne3uyef7pt2tof/Fading-Hearts-Gray.jpg?rlkey=y42mlirt3dt8tkjv79mqxivtj&st=u8mruc3b' },
        { id: 'fish_gray', name: 'Fish', url: 'https://dl.dropboxusercontent.com/scl/fi/6nip6ht4uihouh6a4qlrl/Fish-Gray.jpg?rlkey=864yr70encb55uzmp5d3kc3k5&st=9uulac30' },
        { id: 'golf_gray', name: 'Golf', url: 'https://dl.dropboxusercontent.com/scl/fi/vgwclkxul6flwqf1y1kov/Golf-Gray.jpg?rlkey=unorrei8zsu38nl3uimax0lpz&st=ctjd0hhb' },
        { id: 'gradient_gray', name: 'Gradient', url: 'https://dl.dropboxusercontent.com/scl/fi/9aohm9wi4p5f2x7zwb7kr/Gradient-Gray.jpg?rlkey=22r4idxzevlmsrjjqq5qxsjsc&st=w0xbl1hg' },
        { id: 'modern_gray', name: 'Modern', url: 'https://dl.dropboxusercontent.com/scl/fi/bleufllefjsgpxt7f8pn2/Modern-Gray.jpg?rlkey=6co7y16d8ydzx4semv5obme3u&st=l0rwf7e2' },
        { id: 'mountain_view_gray', name: 'Mountain View', url: 'https://dl.dropboxusercontent.com/scl/fi/s96txf8z3mtvj2q98uxyr/Mountain-View-Gray.jpg?rlkey=8p0fccqa9ykjel6empdw1vh9m&st=tkihki7t' },
        { id: 'us_flag_gray', name: 'US Flag', url: 'https://dl.dropboxusercontent.com/scl/fi/iy59fc81jb1unqjp0t9hu/USFlag-Gray.jpg?rlkey=6v66l8snzuv2jhz7lo9y7alh4&st=rhxri02u' },
        { id: 'wild_flowers_gray', name: 'Wild Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/eun3o2h1vqol04535ak1x/Wild-Flowers-Gray.jpg?rlkey=01s179l4t14nqde7ahzacrxie&st=i3cf317p' }
    ],
    multi: [
        { id: 'beach_multi', name: 'Beach', url: 'https://dl.dropboxusercontent.com/scl/fi/km4me3jq48wujuelskoa4/BeachP-Multi.jpg?rlkey=x71wp2gp2q76u5ahm8hy7u7f5&st=w43naspo' },
        { id: 'clouds_multi', name: 'Clouds', url: 'https://dl.dropboxusercontent.com/scl/fi/hmtqvyo5sgjql5ywj8dfe/Clouds-MultiColor.jpg?rlkey=yuyjeicv26d04rmspyiewt9g6&st=7sy0i99y' },
        { id: 'fading_hearts_multi', name: 'Fading Hearts', url: 'https://dl.dropboxusercontent.com/scl/fi/2mqpp8jjydknt0o9e3m0f/Fading-Hearts2-MultiColor.jpg?rlkey=m93zmwhz7somq54lvu6bwyp47&st=u6r7mqya' },
        { id: 'fish_multi', name: 'Fish', url: 'https://dl.dropboxusercontent.com/scl/fi/uzcde02fw2dxyv0w9q5yc/Fish-Multi.jpg?rlkey=eckxs1xn31mhw50c3egnoj16z&st=hea23wsn' },
        { id: 'golf_multi', name: 'Golf', url: 'https://dl.dropboxusercontent.com/scl/fi/3hsgqohgwvw5nq6z6ara2/Golf-Multi.jpg?rlkey=b4sedjhzaih2ug64xp1k1d2yf&st=qh848w54' },
        { id: 'gradient_multi', name: 'Gradient', url: 'https://dl.dropboxusercontent.com/scl/fi/1xkk4t7isb3flveuz8x1d/Gradient-MultiColor.jpg?rlkey=mwguvnnpvwukteb5rczg84nfe&st=neq7piey' },
        { id: 'modern_multi', name: 'Modern', url: 'https://dl.dropboxusercontent.com/scl/fi/r73vpo5m9xlz0ri9ml571/Modern-MultiColor.jpg?rlkey=xqpnd9hzkinka9moyddwhut20&st=kee6aw07' },
        { id: 'mountain_view_multi', name: 'Mountain View', url: 'https://dl.dropboxusercontent.com/scl/fi/vxhrw09arznpqxft10w1h/Mountain-View-MultiColor.jpg?rlkey=6y84fz35bkwo0vil0jnb987hi&st=elnbavjh' },
        { id: 'us_flag_multi', name: 'US Flag', url: 'https://dl.dropboxusercontent.com/scl/fi/2wif65w9qqetrb98lbkt0/USFlag2-MultiColor.jpg?rlkey=ekkfqfvg1rk6qet57g7b9tbe7&st=oefqy66a' },
        { id: 'wild_flowers_multi', name: 'Wild Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/jxds1jv1q2807hsfa54kd/Wild-Flowers-MultiColor.jpg?rlkey=pdz2gbvi962whdne2rc3ri7uk&st=m7qntt53' }
    ]
};

// Candle URLs for title and end slides
const TITLE_CANDLES = {
    blue: 'https://dl.dropboxusercontent.com/scl/fi/nv1f80trndu7nzisi1q2x/Title-candle-blue.jpg?rlkey=yzh1fiis9fy8uod3w6694r51m&st=wi5xkr4p',
    gray: 'https://dl.dropboxusercontent.com/scl/fi/i1ht1q3iidfa8oh0zwfhx/Title-candle-gray.jpg?rlkey=f0cknlpy1p4xqjc45ykozneuy&st=ez0qv1p9',
    multi: 'https://dl.dropboxusercontent.com/scl/fi/p2c670buipua07hm60crp/Title-candle-multi.jpg?rlkey=84iw6d5gqevv3lhdw5p6az0ap&st=2js4nwg5'
};

const END_CANDLES = {
    blue: 'https://dl.dropboxusercontent.com/scl/fi/wq5k96hlo3j4e7tc0tqo3/Closing-candle-blue.jpg?rlkey=37m0mrpjubumh8mx8lwodgdqf&st=5xqyem1d',
    gray: 'https://dl.dropboxusercontent.com/scl/fi/lwed5r5lszojhvtdg6wyy/Closing-candle-gray.jpg?rlkey=704mawxq9kiahxqav0m389i6k&st=frgdb4dl',
    multi: 'https://dl.dropboxusercontent.com/scl/fi/y9fwoeswyugtd1zk5l2zu/Closing-candle-multi.jpg?rlkey=9lmpm1ww32vn292aft0atmk58&st=nxhg7w44'
};

// State management
let selectedTheme = null;
let selectedTemplate = null;
let customBackgroundFile = null;
let currentSlideIndex = 0;

// Carousel navigation functions (global scope for onclick handlers)
window.changeSlide = function(direction) {
    const slides = document.querySelectorAll('.preview-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Remove active class
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    // Calculate new index
    currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
    
    // Add active class
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
};

window.goToSlide = function(index) {
    const slides = document.querySelectorAll('.preview-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Remove active class
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    // Set new index
    currentSlideIndex = index;
    
    // Add active class
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
};

// Parse URL parameters on page load
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');
    const name = urlParams.get('name');
    const type = urlParams.get('type');
    const email = urlParams.get('email');

    // Fill hidden fields
    document.getElementById('uid').value = uid || '';
    document.getElementById('urlName').value = name || '';
    document.getElementById('type').value = type || '';
    document.getElementById('email').value = email || '';

    // Check if File_Only type - redirect to thank you page
    if (type && type.toLowerCase().includes('file')) {
        window.location.href = 'thank-you.html?type=file_only';
        return;
    }

    // Initialize form handlers
    initializeForm();
});

function initializeForm() {
    // Age calculation
    const birthdateInput = document.getElementById('birthdate');
    const deathdateInput = document.getElementById('deathdate');

    birthdateInput.addEventListener('change', calculateAge);
    deathdateInput.addEventListener('change', calculateAge);

    // Background type selection
    const backgroundRadios = document.querySelectorAll('input[name="backgroundType"]');
    backgroundRadios.forEach(radio => {
        radio.addEventListener('change', handleBackgroundTypeChange);
    });

    // Theme tabs
    const themeTabs = document.querySelectorAll('.theme-tab');
    themeTabs.forEach(tab => {
        tab.addEventListener('click', handleThemeChange);
    });

    // Custom upload
    const customUpload = document.getElementById('customBackground');
    customUpload.addEventListener('change', handleCustomUpload);

    // Form submission
    const form = document.getElementById('slideshowForm');
    form.addEventListener('submit', handleSubmit);
}

function calculateAge() {
    const birthdate = document.getElementById('birthdate').value;
    const deathdate = document.getElementById('deathdate').value;

    if (!birthdate || !deathdate) {
        document.getElementById('ageDisplay').style.display = 'none';
        return;
    }

    const birth = new Date(birthdate);
    const death = new Date(deathdate);

    if (death < birth) {
        document.getElementById('ageDisplay').style.display = 'none';
        showError('Date of passing must be after birthdate');
        return;
    }

    let age = death.getFullYear() - birth.getFullYear();
    const monthDiff = death.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && death.getDate() < birth.getDate())) {
        age--;
    }

    document.getElementById('calculatedAge').textContent = `${age} years`;
    document.getElementById('ageDisplay').style.display = 'block';
    hideError();
}

function handleBackgroundTypeChange(e) {
    const templateSection = document.getElementById('templateSection');
    const customSection = document.getElementById('customUploadSection');

    if (e.target.value === 'template') {
        templateSection.style.display = 'block';
        customSection.style.display = 'none';
        document.getElementById('customBackground').removeAttribute('required');
    } else {
        templateSection.style.display = 'none';
        customSection.style.display = 'block';
        document.getElementById('customBackground').setAttribute('required', 'required');
    }
}

function handleThemeChange(e) {
    const theme = e.target.dataset.theme;
    selectedTheme = theme;
    selectedTemplate = null;

    // Update active tab
    document.querySelectorAll('.theme-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    e.target.classList.add('active');

    // Load templates for this theme
    loadTemplates(theme);
}

function loadTemplates(theme) {
    const gallery = document.getElementById('templateGallery');
    gallery.innerHTML = '';

    const templates = TEMPLATES[theme];
    templates.forEach(template => {
        const item = document.createElement('div');
        item.className = 'template-item';
        item.dataset.templateId = template.id;
        item.dataset.templateUrl = template.url;

        item.innerHTML = `
            <img src="${template.url}" alt="${template.name}">
            <div class="template-name">${template.name}</div>
            <div class="checkmark">✓</div>
        `;

        item.addEventListener('click', () => selectTemplate(item, template));
        gallery.appendChild(item);
    });
}

function selectTemplate(item, template) {
    // Remove previous selection
    document.querySelectorAll('.template-item').forEach(t => {
        t.classList.remove('selected');
    });

    // Select new template
    item.classList.add('selected');
    selectedTemplate = template;
    
    // Show preview for this template
    generateTemplatePreview(template);
}

function generateTemplatePreview(template) {
    // Reset to first slide
    currentSlideIndex = 0;
    
    // Complete slide design images
    const completeTitleSlide = 'https://dl.dropboxusercontent.com/scl/fi/veiuv1adp575icictjrmj/Your-paragraph-text-1.png?rlkey=w4wrzkn85q290py82r7z3kz7j&st=byhh9k8d&dl=1';
    const completeEndSlide = 'https://dl.dropboxusercontent.com/scl/fi/vym9bqjnb036c17kcijoj/Your-paragraph-text-2.png?rlkey=1bn5we5dnswfal1vpuvpblcsf&st=3gb48nlq&dl=1';
    
    // Get the candle backgrounds based on selected theme
    const titleCandleUrl = TITLE_CANDLES[selectedTheme];
    const endCandleUrl = END_CANDLES[selectedTheme];
    
    // Sample photo for middle slide
    const samplePhotos = [
        'https://dl.dropboxusercontent.com/scl/fi/muk80km89bxo4u823gcad/DSC_0701.JPG?rlkey=4993te66b9xg6xy7mz69md2d2&st=25gczbgp&dl=1',
        'https://dl.dropboxusercontent.com/scl/fi/8t2slrauqqr8poib5ekbt/DSC_0333.JPG?rlkey=d2v17cupbgk5prodeyftskfdg&st=h6pwi9e9&dl=1',
        'https://dl.dropboxusercontent.com/scl/fi/7v625luwbb2ch2h5u6zi3/200-s_Eureka-Springs_0002.jpg?rlkey=ff5z6rpteujr71a4r5jvg9b49&st=6zbovd9r&dl=1'
    ];
    const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
    
    // Update preview slides
    const previewSlides = document.querySelectorAll('.preview-slide');
    
    // Title slide - complete Canva design on CANDLE background
    previewSlides[0].style.backgroundImage = `url(${titleCandleUrl})`;
    previewSlides[0].innerHTML = `
        <img src="${completeTitleSlide}" alt="Title Slide" style="width: 100%; height: 100%; object-fit: contain;">
    `;
    
    // Photo slide - sample photo on TEMPLATE background
    previewSlides[1].style.backgroundImage = `url(${template.url})`;
    previewSlides[1].innerHTML = `
        <div class="preview-photo-container">
            <img src="${randomPhoto}" class="preview-sample-photo" alt="Sample Photo">
        </div>
    `;
    
    // End slide - complete Canva design on CANDLE background
    previewSlides[2].style.backgroundImage = `url(${endCandleUrl})`;
    previewSlides[2].innerHTML = `
        <img src="${completeEndSlide}" alt="End Slide" style="width: 100%; height: 100%; object-fit: contain;">
    `;
    
    // Show preview
    document.getElementById('previewCarousel').style.display = 'block';
}

function handleCustomUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
        showError('File size must be under 10MB');
        e.target.value = '';
        return;
    }

    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        showError('Only JPG and PNG files are allowed');
        e.target.value = '';
        return;
    }

    customBackgroundFile = file;

    // Show carousel preview with realistic slide mockups
    const reader = new FileReader();
    reader.onload = function(event) {
        const bgUrl = event.target.result;
        
        // Reset to first slide
        currentSlideIndex = 0;
        
        // Sample photo for middle slide
        const samplePhotos = [
            'https://dl.dropboxusercontent.com/scl/fi/muk80km89bxo4u823gcad/DSC_0701.JPG?rlkey=4993te66b9xg6xy7mz69md2d2&st=25gczbgp&dl=1',
            'https://dl.dropboxusercontent.com/scl/fi/8t2slrauqqr8poib5ekbt/DSC_0333.JPG?rlkey=d2v17cupbgk5prodeyftskfdg&st=h6pwi9e9&dl=1',
            'https://dl.dropboxusercontent.com/scl/fi/7v625luwbb2ch2h5u6zi3/200-s_Eureka-Springs_0002.jpg?rlkey=ff5z6rpteujr71a4r5jvg9b49&st=6zbovd9r&dl=1'
        ];
        const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
        
        // Complete slide design images
        const completeTitleSlide = 'https://dl.dropboxusercontent.com/scl/fi/veiuv1adp575icictjrmj/Your-paragraph-text-1.png?rlkey=w4wrzkn85q290py82r7z3kz7j&st=byhh9k8d&dl=1';
        const completeEndSlide = 'https://dl.dropboxusercontent.com/scl/fi/vym9bqjnb036c17kcijoj/Your-paragraph-text-2.png?rlkey=1bn5we5dnswfal1vpuvpblcsf&st=3gb48nlq&dl=1';
        
        // Update preview slides
        const previewSlides = document.querySelectorAll('.preview-slide');
        
        // Title slide - complete Canva design
        previewSlides[0].style.backgroundImage = `url(${bgUrl})`;
        previewSlides[0].innerHTML = `
            <img src="${completeTitleSlide}" alt="Title Slide" style="width: 100%; height: 100%; object-fit: contain;">
        `;
        
        // Photo slide (centered photo with NO border on custom background)
        previewSlides[1].style.backgroundImage = `url(${bgUrl})`;
        previewSlides[1].innerHTML = `
            <div class="preview-photo-container">
                <img src="${randomPhoto}" class="preview-sample-photo" alt="Sample Photo">
            </div>
        `;
        
        // End slide - complete Canva design
        previewSlides[2].style.backgroundImage = `url(${bgUrl})`;
        previewSlides[2].innerHTML = `
            <img src="${completeEndSlide}" alt="End Slide" style="width: 100%; height: 100%; object-fit: contain;">
        `;
        
        // Show preview
        document.getElementById('previewCarousel').style.display = 'block';
    };
    reader.readAsDataURL(file);

    hideError();
}

async function handleSubmit(e) {
    e.preventDefault();

    // Validate form
    const validation = validateForm();
    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    // Disable submit button
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loader').style.display = 'inline';

    try {
        // Prepare submission data
        const formData = await prepareFormData();

        // Submit to Zapier webhook
        const response = await submitToBackend(formData);

        // Redirect to thank you page
        window.location.href = `thank-you.html?uid=${formData.uid}&name=${encodeURIComponent(formData.deceased_full_name)}`;
    } catch (error) {
        showError('Submission failed. Please try again.');
        console.error('Submission error:', error);
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').style.display = 'inline';
        submitBtn.querySelector('.btn-loader').style.display = 'none';
    }
}

function validateForm() {
    // Check background selection
    const backgroundType = document.querySelector('input[name="backgroundType"]:checked');
    if (!backgroundType) {
        return { valid: false, message: 'Please select a background option' };
    }

    if (backgroundType.value === 'template') {
        if (!selectedTheme) {
            return { valid: false, message: 'Please select a theme color' };
        }
        if (!selectedTemplate) {
            return { valid: false, message: 'Please select a template' };
        }
    } else {
        if (!customBackgroundFile) {
            return { valid: false, message: 'Please upload a background image' };
        }
    }

    // Check border selection
    const border = document.querySelector('input[name="border"]:checked');
    if (!border) {
        return { valid: false, message: 'Please select a border style' };
    }

    // Check format
    const format = document.querySelector('input[name="format"]:checked');
    if (!format) {
        return { valid: false, message: 'Please select a slideshow format' };
    }

    return { valid: true };
}

async function prepareFormData() {
    const uid = document.getElementById('uid').value;
    const urlName = document.getElementById('urlName').value;
    const type = document.getElementById('type').value;
    const email = document.getElementById('email').value;
    
    // Combine customer name
    const customerFirstName = document.getElementById('customerFirstName').value;
    const customerLastName = document.getElementById('customerLastName').value;
    const customerName = `${customerFirstName} ${customerLastName}`;
    
    // Combine deceased name
    const deceasedFirstName = document.getElementById('deceasedFirstName').value;
    const deceasedMiddleName = document.getElementById('deceasedMiddleName').value;
    const deceasedLastName = document.getElementById('deceasedLastName').value;
    const deceasedName = deceasedMiddleName 
        ? `${deceasedFirstName} ${deceasedMiddleName} ${deceasedLastName}`
        : `${deceasedFirstName} ${deceasedLastName}`;
    
    const birthdate = document.getElementById('birthdate').value;
    const deathdate = document.getElementById('deathdate').value;
    const format = document.querySelector('input[name="format"]:checked').value;
    const backgroundType = document.querySelector('input[name="backgroundType"]:checked').value;
    const border = document.querySelector('input[name="border"]:checked').value;

    const data = {
        uid,
        name: urlName,
        type,
        email,
        customer_name: customerName,
        customer_first_name: customerFirstName,
        customer_last_name: customerLastName,
        deceased_full_name: deceasedName,
        deceased_first_name: deceasedFirstName,
        deceased_middle_name: deceasedMiddleName,
        deceased_last_name: deceasedLastName,
        birthdate,
        deathdate,
        format_choice: format,
        background_type: backgroundType,
        border_color: border
    };

    if (backgroundType === 'template') {
        data.theme_color = selectedTheme;
        data.selected_template = selectedTemplate.id;
        data.bg_source = selectedTemplate.url;
        data.background_template = selectedTemplate.id;
        data.background_url = selectedTemplate.url;
        data.title_background_url = TITLE_CANDLES[selectedTheme];
        data.end_background_url = END_CANDLES[selectedTheme];
        data.custom_background_file = null;
        data.custom_background_filename = null;
    } else {
        // Just use the actual file - no base64 conversion needed
        console.log('📦 Preparing custom background file...');

        data.custom_background_file = customBackgroundFile; // Actual File object
        data.custom_background_filename = customBackgroundFile.name;
        data.theme_color = null;
        data.selected_template = null;
        data.bg_source = null;
        data.background_template = null;
        data.background_url = null;
        data.title_background_url = null;
        data.end_background_url = null;
     }

    return data;
}

async function submitToBackend(formData) {
    console.log('📤 Submitting to backend');
    
    try {
        // If custom background, upload to Dropbox first
        if (formData.background_type === 'custom' && formData.custom_background_file) {
            console.log('📦 Uploading custom background to Dropbox...');
            
            const dropboxPath = `/custom_backgrounds/${formData.uid}/custom_bg_${formData.uid}.jpg`;
            
            // Get Dropbox access token using refresh token
            const tokenResponse = await fetch('https://api.dropbox.com/oauth2/token', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `grant_type=refresh_token&refresh_token=XMsyY4EhACoAAAAAAAAAAYFyGD6-Q89Uxb9weu172SRXCtjYpmr-ab70WUQ4gKIg&client_id=jh1j38ik7vnso5y&client_secret=5qbw5lcm2w6nmvx`
            });
            
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;
            
            // Upload file to Dropbox
            const uploadResponse = await fetch('https://content.dropboxapi.com/2/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-Arg': JSON.stringify({
                        path: dropboxPath,
                        mode: 'overwrite'
                    })
                },
                body: formData.custom_background_file
            });
            
            if (!uploadResponse.ok) {
                throw new Error('Dropbox upload failed');
            }
            
            console.log('✅ Uploaded to Dropbox:', dropboxPath);
            
            // Remove file from formData, add Dropbox path
            delete formData.custom_background_file;
            formData.custom_background_dropbox_path = dropboxPath;
        }
        
        // Send metadata to Zapier (JSON only, no file)
        const response = await fetch(ZAPIER_WEBHOOK_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`Zapier webhook failed with status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Zapier response:', result);
        
        return result;
    } catch (error) {
        console.error('❌ Submission error:', error);
        throw error;
    }
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}
