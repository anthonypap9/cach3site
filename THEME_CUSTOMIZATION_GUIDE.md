# 🎨 Theme Customization Guide

## 🖼️ **Theme-Specific Logos**

### **How It Works:**
Your website now supports different logos for each theme! When you switch themes, the logo automatically changes.

### **File Structure:**
```
images/
├── logo-default.png    ← Default theme (green/black)
├── logo-dark.png       ← Dark theme (black/white)
├── logo-purple.png     ← Purple theme (purple/pink)
└── logo-blue.png       ← Blue theme (blue/cyan)
```

### **Logo Requirements:**
- **Size**: 300px wide (height can vary)
- **Format**: PNG (with transparency) or JPG
- **Style**: Should match each theme's color scheme
- **Naming**: Must match exactly: `logo-[theme].png`

### **Creating Theme-Specific Logos:**

#### **Default Theme (Green/Black):**
- Use bright green (#d3fc03) and black colors
- Perfect for creative, energetic look

#### **Dark Theme (Black/White):**
- Use white text/graphics on black background
- Or black text on white background
- Clean, minimalist style

#### **Purple Theme (Purple/Pink):**
- Use purple (#8b5cf6) and pink (#ec4899) colors
- Creative, artistic vibe

#### **Blue Theme (Blue/Cyan):**
- Use blue (#3b82f6) and cyan (#06b6d4) colors
- Tech-inspired, fresh look

### **Logo Design Tips:**
1. **Keep it simple** - logos should be readable at small sizes
2. **Use high contrast** - ensure visibility on all backgrounds
3. **Test on mobile** - make sure it looks good on phones
4. **Consider transparency** - PNG with transparent background works best

---

## 🔤 **Custom Fonts**

### **Available Fonts:**
I've added several Google Fonts to your site:

1. **Inter** - Clean, modern sans-serif (current default)
2. **Space Grotesk** - Geometric, futuristic
3. **JetBrains Mono** - Monospace, coding style
4. **Playfair Display** - Elegant serif
5. **Source Code Pro** - Monospace, developer-friendly

### **How to Change Fonts:**

#### **Method 1: Change All Fonts**
Edit the theme variables in `styles.css`:

```css
/* Default Theme */
:root {
    --font-heading: 'Space Grotesk', sans-serif;  /* For titles */
    --font-body: 'Inter', sans-serif;             /* For body text */
}

/* Dark Theme */
[data-theme="dark"] {
    --font-heading: 'Playfair Display', serif;    /* Elegant titles */
    --font-body: 'Source Code Pro', monospace;    /* Code-style text */
}
```

#### **Method 2: Add New Fonts**
1. **Add to HTML** (in `<head>` section):
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

2. **Use in CSS**:
```css
--font-heading: 'YOUR_FONT', sans-serif;
```

### **Font Combinations by Theme:**

#### **Creative/Artistic:**
```css
--font-heading: 'Playfair Display', serif;
--font-body: 'Inter', sans-serif;
```

#### **Tech/Modern:**
```css
--font-heading: 'Space Grotesk', sans-serif;
--font-body: 'JetBrains Mono', monospace;
```

#### **Minimalist:**
```css
--font-heading: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
```

#### **Vintage/Classic:**
```css
--font-heading: 'Playfair Display', serif;
--font-body: 'Source Code Pro', monospace;
```

---

## 🎨 **Complete Theme Customization**

### **Adding a New Theme:**

1. **Add theme circle** in `index.html`:
```html
<div class="theme-circle theme-5" data-theme="red" title="Red Theme"></div>
```

2. **Add CSS variables** in `styles.css`:
```css
/* Red Theme */
[data-theme="red"] {
    --primary-color: #ef4444;
    --secondary-color: #dc2626;
    --text-color: #ffffff;
    --bg-color: #ef4444;
    --accent-color: #ffffff;
    --font-family: 'Inter', sans-serif;
    --font-heading: 'Space Grotesk', sans-serif;
    --font-body: 'Inter', sans-serif;
}
```

3. **Add theme circle style**:
```css
.theme-5 {
    background: linear-gradient(45deg, #ef4444, #dc2626);
}
```

4. **Add logo**:
```
images/logo-red.png
```

5. **Add logo HTML**:
```html
<img src="images/logo-red.png" alt="Your Logo" class="logo-image logo-red">
```

6. **Add logo CSS**:
```css
.logo-red {
    display: none;
}

[data-theme="red"] .logo-red {
    display: block;
}
```

---

## 🛠️ **Quick Customization Examples**

### **Make Dark Theme Use Monospace Font:**
```css
[data-theme="dark"] {
    --font-heading: 'JetBrains Mono', monospace;
    --font-body: 'Source Code Pro', monospace;
}
```

### **Make Purple Theme More Elegant:**
```css
[data-theme="purple"] {
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Inter', sans-serif;
}
```

### **Add a Logo for One Theme Only:**
If you only want a logo for the dark theme:
```html
<div class="site-logo">
    <img src="images/logo-dark.png" alt="Your Logo" class="logo-image logo-dark">
</div>
```

```css
.logo-dark {
    display: none;
}

[data-theme="dark"] .logo-dark {
    display: block;
}
```

---

## 📱 **Testing Your Changes**

1. **Test all themes** - switch between them to ensure everything works
2. **Check mobile** - fonts and logos should look good on phones
3. **Test logo visibility** - ensure logos are readable on all backgrounds
4. **Check font loading** - make sure fonts load properly

---

## 🎯 **Pro Tips**

1. **Consistent branding** - keep your logo style consistent across themes
2. **Font pairing** - use complementary fonts (serif + sans-serif)
3. **Performance** - don't load too many fonts (max 3-4)
4. **Fallbacks** - always include fallback fonts: `'Font Name', sans-serif`
5. **Mobile first** - test on mobile devices first

Your website now has complete theme customization! Each theme can have its own logo, fonts, and color scheme. 🎉
