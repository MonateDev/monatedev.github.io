# Portal Dynamic Fields Guide
## دليل الحقول الديناميكية للبوابة

This guide explains how to use the dynamic fields functionality that has been added to your existing portal.

## What's Been Added / ما تم إضافته

### 1. Dynamic Fields JavaScript (`/faces/javax.faces.resource/js/dynamic-fields.js`)
- Manages all dynamic field configurations
- Handles localStorage operations
- Provides real-time field updates
- Includes import/export functionality

### 2. Dynamic Fields CSS (`/faces/javax.faces.resource/css/dynamic-fields.css`)
- Styling for the settings interface
- Responsive design support
- RTL (Arabic) layout support
- Notification system styling

### 3. Modified Student Page (`/faces/ui/pages/student/index.xhtml`)
- Added menu item for dynamic fields settings
- Integrated JavaScript and CSS files
- Added settings modal dialog
- Added visual indicators for dynamic fields

## How to Use / كيفية الاستخدام

### Accessing Settings / الوصول إلى الإعدادات
1. Open the student portal
2. Look for the menu item "إعدادات الحقول الديناميكية" (Dynamic Fields Settings)
3. Click on it to open the settings dialog

### Configuring Fields / تكوين الحقول
The following fields can be customized:

#### Student Information / المعلومات الشخصية
- Student ID / رقم الطالب
- Student Name / اسم الطالب
- Semester / الفصل الدراسي
- College / الكلية
- Major / التخصص
- Status / الحالة
- Academic Advisor / المرشد الاكاديمي

#### Academic Information / المعلومات الأكاديمية
- GPA / المعدل التراكمي (0-100)
- Plan Completion / انجاز الخطة (0-100%)
- Student Level / مستوى الطالب (1-6)

#### Financial Information / المعلومات المالية
- Account Balance / الرصيد المالي

#### Profile Information / معلومات الملف الشخصي
- Profile Name (Top Bar) / اسم المستخدم في الشريط العلوي
- User Role / دور المستخدم

### Settings Actions / إجراءات الإعدادات

#### Save Changes / حفظ التغييرات
- Click "حفظ التغييرات" to save your customizations
- Changes are stored in browser localStorage
- Updates are applied immediately to the page

#### Reset to Defaults / إعادة تعيين
- Click "إعادة تعيين" to restore default values
- This will clear all customizations

#### Export Settings / تصدير الإعدادات
- Click "تصدير الإعدادات" to download your settings as a JSON file
- Use this to backup your configurations

#### Import Settings / استيراد الإعدادات
- Click "استيراد الإعدادات" to load settings from a JSON file
- Useful for restoring backups or sharing configurations

## Features / المميزات

### Real-time Preview / معاينة فورية
- Changes are shown immediately as you type
- No need to save to see the preview

### Local Storage / التخزين المحلي
- Settings are saved in your browser
- Persist across browser sessions
- No server-side storage required

### Import/Export / الاستيراد والتصدير
- Export your settings to share or backup
- Import settings from other devices

### Visual Indicators / المؤشرات البصرية
- Dynamic fields have special highlighting
- Hover effects show edit indicators
- Tooltips explain functionality

### Responsive Design / تصميم متجاوب
- Works on desktop and mobile devices
- Optimized for RTL (Arabic) layout

## Technical Details / التفاصيل التقنية

### Storage Format / تنسيق التخزين
Settings are stored in localStorage as JSON:
```json
{
  "student-id": "",
  "student-name": "",
  "gpa": "86.1",
  "level": "4"
}
```

### Field Configuration / تكوين الحقول
Each field has:
- `selector`: CSS selector for DOM elements
- `defaultValue`: Default value
- `label`: Display name in Arabic
- `type`: Input type (text, number, select)
- `options`: Available options for select fields

### CSS Classes / فئات CSS
Dynamic elements are identified by these classes:
- `.student-info`: Student information section
- `.academic-info`: Academic information section
- `.financial-info`: Financial information section
- `.profile-info`: Profile information in header

## Browser Support / دعم المتصفحات

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Data Privacy / خصوصية البيانات

- All data is stored locally in your browser
- No data is sent to external servers
- Settings are device-specific
- Clear browser data to remove all customizations

## Troubleshooting / استكشاف الأخطاء

### Settings Not Saving / الإعدادات لا تحفظ
- Check if localStorage is enabled in your browser
- Ensure you have enough storage space
- Try clearing browser cache

### Fields Not Updating / الحقول لا تتحدث
- Refresh the page after making changes
- Check browser console for JavaScript errors
- Ensure all files are loaded properly

### Import/Export Issues / مشاكل الاستيراد والتصدير
- Ensure file is valid JSON format
- Check file permissions
- Try different browser if issues persist

## Customization / التخصيص

To add new dynamic fields:

1. Add field configuration to `dynamicFieldsConfig` in `dynamic-fields.js`
2. Add appropriate CSS selectors
3. Update the `addCSSClasses` function to identify new elements
4. Test the new field in the settings interface

## Support / الدعم

For issues or questions:
1. Check browser console for errors
2. Verify all files are loaded correctly
3. Test with default browser settings
4. Clear browser cache and try again

---

This dynamic fields system allows you to personalize your portal experience while maintaining the original portal structure and functionality.
