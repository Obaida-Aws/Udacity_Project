document.addEventListener('DOMContentLoaded', () => {
    fetchAboutMe();
});

function fetchAboutMe() {
    // محاولة جلب بيانات aboutMeData.json
    console.log('Starting to fetch About Me data...');
    fetch('./data/aboutMeData.json')  
        .then(response => {
            console.log('Response received:', response);  // طباعة الاستجابة بعد جلبها
            if (!response.ok) throw new Error('Failed to fetch About Me data');
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);  // طباعة البيانات المستلمة
            populateAboutMe(data);
        })
        .catch(error => {
            console.error('Error loading About Me data:', error);  // طباعة أي خطأ حدث
        });
}

function populateAboutMe(data) {
    // تحقق من وجود عنصر #aboutMe
    const aboutMeContainer = document.getElementById('aboutMe');
    if (!aboutMeContainer) {
        console.error('Element #aboutMe not found in the DOM');
        return;  // إذا لم يكن العنصر موجودًا لا نستمر في الكود
    }

    console.log('Populating About Me section with the following data:', data);  // طباعة البيانات التي سيتم استخدامها

    // إنشاء عنصر الفقرة (bio)
    const bioPara = document.createElement('p');
    bioPara.textContent = data.aboutMe || "No bio available";  // إذا كانت القيمة فارغة، نضع نصًا بديلاً
    console.log('Bio paragraph content:', bioPara.textContent);  // طباعة النص الذي سيتم إضافته

    // إنشاء الحاوية للصورة
    const headshotDiv = document.createDocumentFragment();
    const imgContainer = document.createElement('div');
    imgContainer.className = 'headshotContainer';

    const headshotImg = document.createElement('img');
    headshotImg.src = data.headshot || './images/headshot.webp';  // إذا كانت الصورة غير موجودة، نضع صورة افتراضية
    headshotImg.alt = "Headshot";

    console.log('Image source:', headshotImg.src);  // طباعة مصدر الصورة

    imgContainer.appendChild(headshotImg);
    headshotDiv.appendChild(imgContainer);

    // إضافة الفقرة والصورة إلى عنصر #aboutMe
    aboutMeContainer.appendChild(bioPara);
    aboutMeContainer.appendChild(headshotDiv);

    console.log('Content added to About Me section');  // طباعة إذا تم إضافة المحتوى بنجاح
}
