# 📸 How to Add Custom Images to Your Website

## 🗂️ File Structure
Create an `images` folder in your website directory and add your photos there:

```
your-website/
├── index.html
├── styles.css
├── script.js
└── images/
    ├── logo.png (or .jpg)
    ├── profile-photo.jpg
    ├── art1.jpg
    ├── art2.jpg
    ├── art3.jpg
    └── art4.jpg
```

## 🖼️ Image Types You Can Add

### 1. **Logo/Header Image** (`images/logo.png`)
- **Purpose**: Replace the text title with your logo
- **Recommended Size**: 300px wide, any height
- **Format**: PNG (with transparency) or JPG
- **Usage**: Currently set to replace "Your Name" title

### 2. **Profile Photo** (`images/profile-photo.jpg`)
- **Purpose**: Your photo in the About section
- **Recommended Size**: 400x400px (square)
- **Format**: JPG or PNG
- **Style**: Will be displayed as a circle

### 3. **Art Gallery Images** (`images/art1.jpg`, `art2.jpg`, etc.)
- **Purpose**: Showcase your digital art/photography
- **Recommended Size**: 400x300px or similar
- **Format**: JPG or PNG
- **Style**: Grid layout with hover effects

## 🛠️ How to Add Images

### Step 1: Prepare Your Images
1. **Resize images** to recommended sizes (use online tools like TinyPNG or Canva)
2. **Optimize for web** (compress to reduce file size)
3. **Name files clearly** (logo.png, profile-photo.jpg, art1.jpg, etc.)

### Step 2: Create Images Folder
```
Create a folder called "images" in the same directory as your index.html file
```

### Step 3: Upload Images
```
Drag and drop your images into the images folder
```

### Step 4: Update File Paths (if needed)
The code is already set up to look for images in the `images/` folder. If your images are in a different location, update the `src` paths in `index.html`:

```html
<!-- Example: If your logo is in a different folder -->
<img src="my-logo/logo.png" alt="Your Logo" class="logo-image">

<!-- Example: If your profile photo is in the root directory -->
<img src="profile-photo.jpg" alt="Your Photo" class="profile-image">
```

## 🎨 Image Customization Options

### Option 1: Use Logo Instead of Text Title
The code is set up to show a logo image. If you want to use text instead:
1. Comment out the logo div in `index.html`
2. Uncomment the text title

### Option 2: Add More Art Images
To add more art pieces:
```html
<img src="images/art5.jpg" alt="Art Piece 5" class="art-image">
<img src="images/art6.jpg" alt="Art Piece 6" class="art-image">
```

### Option 3: Change Image Styles
You can modify the CSS in `styles.css` to change:
- Image sizes
- Border radius (roundness)
- Hover effects
- Shadows

## 📱 Image Optimization Tips

### For Web Performance:
1. **Compress images** before uploading
2. **Use appropriate formats**:
   - JPG for photos
   - PNG for graphics with transparency
   - WebP for best compression (if supported)

### Recommended Tools:
- **TinyPNG**: Compress images
- **Canva**: Resize and edit images
- **Photoshop/GIMP**: Professional editing

## 🚀 Hosting Your Images

### When you host your website:
1. **Upload the entire folder** including the `images` folder
2. **Keep the same structure** so paths work correctly
3. **Test on mobile** to ensure images load properly

### Free Image Hosting Alternatives:
- **Imgur**: Upload images and get direct links
- **Google Drive**: Share images publicly
- **GitHub**: Host images in your repository

## 🔧 Troubleshooting

### Images Not Showing?
1. Check file paths are correct
2. Ensure images are in the right folder
3. Check file names match exactly (case-sensitive)
4. Verify image files aren't corrupted

### Images Too Large/Small?
Modify the CSS in `styles.css`:
```css
.logo-image {
    max-width: 400px; /* Make logo bigger */
}

.profile-image {
    width: 250px; /* Make profile photo bigger */
    height: 250px;
}
```

## ✨ Pro Tips

1. **Use consistent image styles** for a professional look
2. **Optimize for mobile** - images should look good on phones
3. **Add alt text** for accessibility
4. **Keep backups** of your original high-quality images
5. **Test loading speed** - too many large images can slow your site

Your website is now ready for custom images! Just add your photos to the `images` folder and they'll automatically appear on your site.
