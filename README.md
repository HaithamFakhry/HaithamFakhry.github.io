# Haitham Fakhry - Portfolio Website

موقع بورتفوليو شخصي ثنائي اللغة (عربي/إنجليزي)

## الروابط بعد النشر على GitHub Pages

- الصفحة الإنجليزية: `https://USERNAME.github.io/`
- الصفحة العربية: `https://USERNAME.github.io/ar/`

(استبدل USERNAME باسم المستخدم الخاص بك على GitHub)

## بنية المجلد

```
/
├── index.html           ← الصفحة الإنجليزية
├── style.css            ← التصميم (مشترك بين الصفحتين)
├── script.js            ← الكود الديناميكي
├── projects.js          ← بيانات الأعمال (قابلة للتعديل)
├── ar/
│   └── index.html       ← الصفحة العربية
├── images/
│   ├── haitham_portrait.jpg
│   └── projects/        ← صور الأعمال
└── README.md
```

## إزاي ترفع على GitHub Pages

1. أنشئ حساب على github.com
2. أنشئ repository جديد اسمه `USERNAME.github.io` (استبدل USERNAME باسم المستخدم)
3. ارفع كل محتويات هذا المجلد للـ repository
4. روح Settings → Pages → فعّل GitHub Pages من branch main
5. الموقع هيكون جاهز خلال 1-2 دقيقة على الرابط: `https://USERNAME.github.io/`

## إزاي تضيف/تعدل مشروع

1. ارفع صورة المشروع في `images/projects/`
2. افتح `projects.js` بأي محرر نصوص
3. أضف كائن (object) جديد في الـ array:

```javascript
{
  id: "new-project",
  category: "social",        // campaign / social / branding / print
  image: "new_project.jpg",
  year: "2025",
  titleEn: "Project Title",
  titleAr: "عنوان المشروع",
  categoryEn: "Category",
  categoryAr: "الفئة",
  descEn: "Description in English",
  descAr: "الوصف بالعربي"
}
```

4. احفظ الملف — التحديث هيظهر تلقائياً بعد دفعه لـ GitHub
