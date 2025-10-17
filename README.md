# Order By Age - Slideshow Customization Form

Custom HTML form for slideshow customization hosted on GitHub Pages.

## Files

- `index.html` - Main form
- `thank-you.html` - Success/confirmation page
- `styles.css` - Styling
- `script.js` - Form logic and validation

## Setup Instructions

### 1. GitHub Repository Setup

1. Create new GitHub repository
2. Upload all 4 files to the repository
3. Go to Settings > Pages
4. Enable GitHub Pages (source: main branch, root folder)
5. Your form will be live at: `https://yourusername.github.io/repo-name/`

### 2. Integration with Jotform

Update your Jotform submission button to redirect to:
```
https://yourusername.github.io/repo-name/?uid={uid}&name={name}&type={type}&email={email}
```

Replace placeholders with actual Jotform field values.

### 3. Backend Integration

Update `script.js` in the `submitToBackend()` function:

#### Option A: Zapier Webhook
```javascript
const response = await fetch('YOUR_ZAPIER_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

#### Option B: AWS API Gateway
```javascript
const response = await fetch('YOUR_API_GATEWAY_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

### 4. Custom Upload Handling

Currently custom backgrounds are base64 encoded in the JSON payload.

For production, you may want to:
1. Create a Lambda to generate S3 presigned URLs
2. Upload directly from browser to S3
3. Pass S3 key in form submission

## Form Data Structure
```json
{
  "uid": "10360",
  "name": "Tyler",
  "type": "Memorial_Video",
  "email": "tyler@example.com",
  "customer_name": "John Smith",
  "deceased_full_name": "Jane Marie Smith",
  "birthdate": "1950-05-15",
  "deathdate": "2024-10-15",
  "format_choice": "powerpoint",
  "background_type": "template",
  "theme_color": "blue",
  "selected_template": "beach_blue",
  "bg_source": "https://dl.dropboxusercontent.com/.../Beach-Blue.jpg",
  "background_template": "beach_blue",
  "background_url": "https://dl.dropboxusercontent.com/.../Beach-Blue.jpg",
  "title_background_url": "https://dl.dropboxusercontent.com/.../Title-candle-blue.jpg",
  "end_background_url": "https://dl.dropboxusercontent.com/.../Closing-candle-blue.jpg",
  "border_color": "white",
  "custom_background_file": null
}
```

## Features

✅ URL parameter parsing
✅ File_Only type detection & redirect
✅ Automatic age calculation
✅ Conditional template/custom upload sections
✅ 30 templates across 3 color themes
✅ Custom background upload with preview
✅ Border selection with examples
✅ Form validation
✅ Mobile responsive design
✅ Dynamic thank you messages

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Change Logo
Replace logo URL in `index.html` and `thank-you.html`:
```html
<img src="YOUR_LOGO_URL" alt="Order By Age" class="logo">
```

### Change Colors
Edit CSS variables in `styles.css`:
```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add More Templates
Edit `TEMPLATES` object in `script.js`:
```javascript
const TEMPLATES = {
    blue: [
        { id: 'new_template_blue', name: 'New Template', url: 'URL_HERE' }
    ]
};
```

## Support

For issues or questions, contact: support@orderbyage.com
