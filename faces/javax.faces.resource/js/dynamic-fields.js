/**
 * Dynamic Fields Management for Portal
 * Handles user-configurable fields and localStorage operations
 */

// Realistic data sets for randomization
const randomDataSets = {
    semesters: [
        'الفصل الأول 2024/2025',
        'الفصل الثاني 2024/2025',
        'الفصل الصيفي 2024',
        'الفصل الأول 2023/2024',
        'الفصل الثاني 2023/2024'
    ],
    colleges: [
        'الــــعلـوم وتكنولوجيا المعلومات',
        'كلية الهندسة',
        'كلية إدارة الأعمال',
        'كلية الطب',
        'كلية الصيدلة',
        'كلية الحقوق',
        'كلية التربية',
        'كلية الآداب والعلوم الإنسانية'
    ],
    majors: {
        'الــــعلـوم وتكنولوجيا المعلومات': [
            'الامن السيبراني',
            'علوم الحاسوب',
            'هندسة البرمجيات',
            'نظم المعلومات',
            'الذكاء الاصطناعي',
            'تكنولوجيا المعلومات'
        ],
        'كلية الهندسة': [
            'الهندسة المدنية',
            'الهندسة الكهربائية',
            'الهندسة الميكانيكية',
            'هندسة الحاسوب',
            'الهندسة الكيميائية'
        ],
        'كلية إدارة الأعمال': [
            'إدارة الأعمال',
            'المحاسبة',
            'التمويل والمصارف',
            'التسويق',
            'إدارة الموارد البشرية'
        ],
        'كلية الطب': [
            'الطب العام',
            'طب الأسنان',
            'الصيدلة'
        ]
    },
    advisors: [
        'د. محمد احمد عبدالحفيظ عاليه',
        'د. فاطمة محمود الزهراني',
        'د. خالد عبدالله السعدي',
        'د. نورا حسن الخطيب',
        'د. عمر يوسف التميمي',
        'د. ليلى احمد البدوي',
        'د. حسام الدين المصري',
        'د. رانيا محمد القاضي'
    ],
    courses: [
        { code: '0125471', name: 'منهجية بناء مشروع', hours: 3, grade: 'A' },
        { code: '0125472', name: 'مشروع تخرج', hours: 3, grade: 'B+' },
        { code: '0114324', name: 'تطوير تطبيقات الانترنت', hours: 3, grade: 'A-' },
        { code: '0125334', name: 'أمن البرمجيات', hours: 3, grade: 'B' },
        { code: '0125361', name: 'البرمجيات الضارة', hours: 3, grade: 'A' },
        { code: '0125468', name: 'سياسات ومقاييس وتقارير الامن السيبراني', hours: 3, grade: 'B+' },
        { code: '0420134', name: 'الرياضة والصحة', hours: 3, grade: 'A-' },
        { code: '0420172', name: 'الثقافة الرقمية', hours: 3, grade: 'B' },
        { code: '0123456', name: 'أساسيات الأمن السيبراني', hours: 3, grade: 'A' },
        { code: '0125789', name: 'شبكات الحاسوب', hours: 3, grade: 'B+' },
        { code: '0126345', name: 'أمن المعلومات', hours: 3, grade: 'A-' },
        { code: '0127891', name: 'الرياضيات المتقطعة', hours: 3, grade: 'B' },
        { code: '0128456', name: 'الإحصاء والاحتمالات', hours: 3, grade: 'A' },
        { code: '0129123', name: 'اللغة الإنجليزية', hours: 2, grade: 'B+' },
        { code: '0130789', name: 'اللغة العربية', hours: 2, grade: 'A' },
        { code: '0131456', name: 'الثقافة الإسلامية', hours: 2, grade: 'A-' },
        { code: '0132123', name: 'قواعد البيانات', hours: 3, grade: 'B+' },
        { code: '0133789', name: 'تطوير تطبيقات الويب', hours: 3, grade: 'A' },
        { code: '0134456', name: 'الذكاء الاصطناعي', hours: 3, grade: 'B' },
        { code: '0135123', name: 'هندسة البرمجيات', hours: 3, grade: 'A-' }
    ],
    grades: ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'],
    gpas: ['3.85', '3.72', '3.91', '3.68', '3.79', '3.94', '2.89', '3.15', '3.43', '3.57'],
    totalHours: ['126', '132', '138', '144', '120', '128'],
    financialStatus: ['مدفوع', 'متأخر جزئياً', 'مدفوع كاملاً'],
    statuses: ['منتظم', 'منقطع مؤقتاً', 'منتظم - تحت المراقبة'],
    profileRoles: ['طالب', 'طالب متفوق', 'طالب باحث'],
    studentLevels: ['1', '2', '3', '4', '5', '6'],
    completionPercentages: ['45', '52', '67', '73', '78', '82', '85', '88', '91', '95'],
    studentNames: [
        'سارة احمد الكردي',
        'فاطمة علي السعدي',
        'محمد عبدالله الخطيب',
        'نورا حسن التميمي',
        'خالد يوسف البدوي',
        'ليلى احمد المصري',
        'عمر محمد القاضي',
        'رانيا عبدالرحمن الزهراني',
        'حسام الدين علي النجار',
        'دينا محمود الشامي',
        'يوسف عبدالله الحموي',
        'زياد محمد التركي'
    ],
    studentIds: [
        '202113845', '202114926', '202115037', '202116148',
        '202117259', '202118360', '202119471', '202120582', '202121693',
        '202122704', '202123815', '202124926', '202125037', '202126148'
    ]
};

// Configuration for dynamic fields
const dynamicFieldsConfig = {
    // Student Information Fields
    studentInfo: {
        'student-id': {
            selector: '.dynamic-student-id',
            label: 'رقم الطالب',
            type: 'text'
        },
        'student-name': {
            selector: '.dynamic-student-name, .topbar .profile-image img[title]',
            label: 'اسم الطالب',
            type: 'text'
        },
        'semester': {
            selector: '.dynamic-semester',
            label: 'الفصل الدراسي',
            type: 'text'
        },
        'college': {
            selector: '.dynamic-college',
            label: 'الكلية',
            type: 'text'
        },
        'major': {
            selector: '.dynamic-major',
            label: 'التخصص',
            type: 'text'
        },
        'status': {
            selector: '.dynamic-status',
            label: 'الحالة',
            type: 'select',
            options: ['منتظم', 'منقطع', 'مفصول', 'خريج']
        },
        'advisor': {
            selector: '.dynamic-advisor',
            label: 'المرشد الاكاديمي',
            type: 'text'
        }
    },
    // Academic Information
    academicInfo: {
        'gpa': {
            selector: '.dynamic-gpa, .knob.tax',
            label: 'المعدل التراكمي',
            type: 'number',
            min: 0,
            max: 100,
            step: 0.1
        },
        'completion': {
            selector: '.dynamic-completion, .knob.invoice',
            label: 'انجاز الخطة (%)',
            type: 'number',
            min: 0,
            max: 100
        },
        'level': {
            selector: '.dynamic-level, .knob.expense',
            label: 'مستوى الطالب',
            type: 'select',
            options: ['1', '2', '3', '4', '5', '6']
        }
    },
    // Financial Information
    financialInfo: {
        'balance': {
            selector: '.dynamic-balance, a[href*="financialRecord"] span',
            label: 'الرصيد المالي',
            type: 'text'
        }
    },
    // Profile Information
    profileInfo: {
        'profile-name': {
            selector: '.dynamic-profile-name, .topbar-item-name.profile-name',
            label: 'اسم المستخدم في الشريط العلوي',
            type: 'text'
        },
        'profile-role': {
            selector: '.dynamic-profile-role, .topbar-item-name.profile-role',
            label: 'دور المستخدم',
            type: 'select',
            options: ['طالب', 'أستاذ', 'موظف', 'إداري']
        }
    },
    // Enrolled Courses
    enrolledCourses: {
        'enrolled-courses': {
            selector: '.dynamic-courses-table, #contents\\:schedules tbody, .dynamic-exam-courses-body',
            label: 'المقررات المسجلة',
            type: 'courses'
        }
    }
};

/**
 * LocalStorage operations
 */
const DynamicFields = {
    STORAGE_KEY: 'portal_dynamic_fields',
    
    // Load field values from localStorage
    loadFromStorage: function() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return {};
        }
    },
    
    // Save field values to localStorage
    saveToStorage: function(fieldData) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(fieldData));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    
    // Get value for a specific field
    getFieldValue: function(fieldId) {
        const stored = this.loadFromStorage();
        if (stored[fieldId]) {
            return stored[fieldId];
        }
        
        // Generate random value instead of using default
        return this.generateRandomValueForField(fieldId);
    },
    
    // Generate random value for a specific field
    generateRandomValueForField: function(fieldId) {
        switch(fieldId) {
            case 'student-id':
                return this.getRandomItem(randomDataSets.studentIds);
            case 'student-name':
                return this.getRandomItem(randomDataSets.studentNames);
            case 'semester':
                return this.getRandomItem(randomDataSets.semesters);
            case 'college':
                return this.getRandomItem(randomDataSets.colleges);
            case 'major':
                const colleges = Object.keys(randomDataSets.majors);
                const randomCollege = this.getRandomItem(colleges);
                return this.getRandomItem(randomDataSets.majors[randomCollege]);
            case 'status':
                return this.getRandomItem(randomDataSets.statuses);
            case 'advisor':
                return this.getRandomItem(randomDataSets.advisors);
            case 'gpa':
                return this.generateRealisticGPA();
            case 'completion':
                return this.generateRealisticCompletion();
            case 'level':
                const completion = parseInt(this.generateRealisticCompletion());
                return this.generateRealisticStudentLevel(completion);
            case 'balance':
                return (Math.random() * 5000).toFixed(2) + ' ريال';
            case 'profile-name':
                return this.getRandomItem(randomDataSets.studentIds);
            case 'profile-role':
                return this.getRandomItem(randomDataSets.profileRoles);
            case 'courses':
                return this.generateRandomCourses();
            default:
                return '';
        }
    },
    
    // Set value for a specific field
    setFieldValue: function(fieldId, value) {
        const stored = this.loadFromStorage();
        stored[fieldId] = value;
        this.saveToStorage(stored);
        this.updateFieldInDOM(fieldId, value);
    },
    
    // Find field configuration by ID
    findFieldConfig: function(fieldId) {
        for (const category in dynamicFieldsConfig) {
            if (dynamicFieldsConfig[category][fieldId]) {
                return dynamicFieldsConfig[category][fieldId];
            }
        }
        return null;
    },
    
    // Update field in DOM
    updateFieldInDOM: function(fieldId, value) {
        const field = this.findFieldConfig(fieldId);
        if (!field) {
            console.warn('Field config not found for:', fieldId);
            return;
        }
        
        console.log('Updating field:', fieldId, 'with value:', value, 'using selector:', field.selector);
        
        // Special handling for courses
        if (fieldId === 'courses' || fieldId === 'enrolled-courses') {
            this.updateCoursesTable(value);
            return;
        }
        
        // Split selector by comma to handle multiple selectors
        const selectors = field.selector.split(',').map(s => s.trim());
        let updatedCount = 0;
        
        selectors.forEach(selector => {
            // Handle jQuery-style :contains() selector manually
            if (selector.includes(':contains(')) {
                const match = selector.match(/(.+):contains\("(.+)"\)/);
                if (match) {
                    const baseSelector = match[1];
                    const containsText = match[2];
                    const elements = document.querySelectorAll(baseSelector);
                    console.log('Searching for elements with selector:', baseSelector, 'containing text:', containsText);
                    elements.forEach(element => {
                        if (element.textContent.trim().includes(containsText.trim())) {
                            console.log('Found matching element:', element);
                            this.updateElementValue(element, value, fieldId);
                            updatedCount++;
                        }
                    });
                }
            } else {
                // Regular selector
                const elements = document.querySelectorAll(selector);
                console.log('Found elements with selector:', selector, 'count:', elements.length);
                elements.forEach(element => {
                    console.log('Updating element:', element);
                    this.updateElementValue(element, value, fieldId);
                    updatedCount++;
                });
            }
        });
        
        console.log('Updated', updatedCount, 'elements for field:', fieldId);
    },
    
    // Helper function to update individual element
    updateElementValue: function(element, value, fieldId) {
        console.log('Updating element value:', element.tagName, element.className, 'old value:', element.textContent, 'new value:', value);
        
        if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
            element.value = value;
        } else {
            element.textContent = value;
        }
        
        // Add class to mark as dynamic field
        element.classList.add('dynamic-field-active');
        
        // Special handling for specific fields
        if (fieldId === 'student-name') {
            // Update profile image title attribute
            const profileImages = document.querySelectorAll('.profile-image img');
            profileImages.forEach(img => {
                img.title = value;
                img.alt = value;
            });
        }
        
        // Add visual indicator
        element.setAttribute('data-dynamic-field', fieldId);
        element.setAttribute('title', 'حقل ديناميكي: ' + value);
        
        console.log('Element updated successfully');
    },
    
    // Initialize all dynamic fields
    initializeFields: function() {
        const stored = this.loadFromStorage();
        
        // If no stored data exists, generate random initial data
        if (Object.keys(stored).length === 0) {
            console.log('No stored data found, generating random initial data...');
            this.randomizeAllFields();
            return;
        }
        
        // Wait for DOM to be ready
        setTimeout(() => {
            for (const category in dynamicFieldsConfig) {
                for (const fieldId in dynamicFieldsConfig[category]) {
                    const value = stored[fieldId] || this.generateRandomValueForField(fieldId);
                    this.updateFieldInDOM(fieldId, value);
                }
            }
            console.log('Dynamic fields initialized with values:', stored);
        }, 500);
    },
    
    // Force refresh all fields (useful after settings changes)
    refreshAllFields: function() {
        console.log('Refreshing all dynamic fields...');
        this.initializeFields();
        
        // Also refresh any demo fields
        this.refreshDemoFields();
        
        // Initialize demo courses table if it exists
        const stored = this.loadFromStorage();
        const courses = stored['courses'] || dynamicFieldsConfig.enrolledCourses.courses.defaultValue;
        this.updateDemoCoursesTable(courses);
    },
    
    // Refresh demo page fields specifically
    refreshDemoFields: function() {
        const stored = this.loadFromStorage();
        
        // Update demo page elements if they exist
        document.querySelectorAll('.student-info, .academic-info, .financial-info').forEach(element => {
            const classes = Array.from(element.classList);
            classes.forEach(className => {
                if (className.startsWith('dynamic-')) {
                    const fieldId = className.replace('dynamic-', '').replace('-', '-');
                    if (stored[fieldId]) {
                        element.textContent = stored[fieldId];
                    }
                }
            });
        });
        
        // Update profile elements
        const profileName = document.querySelector('.profile-name');
        if (profileName && stored['profile-name']) {
            profileName.textContent = stored['profile-name'];
        }
        
        const profileRole = document.querySelector('.profile-role');
        if (profileRole && stored['profile-role']) {
            profileRole.textContent = stored['profile-role'];
        }
    },
    
    // Generate settings form HTML
    generateSettingsForm: function() {
        let html = '<div class="dynamic-fields-settings">';
        html += '<div class="settings-header"><h3>إعدادات الحقول الديناميكية</h3>';
        html += '<p>يمكنك تخصيص المعلومات المعروضة في البوابة حسب رغبتك</p></div>';
        
        for (const category in dynamicFieldsConfig) {
            const categoryName = this.getCategoryDisplayName(category);
            html += `<div class="settings-category">`;
            html += `<h4>${categoryName}</h4>`;
            html += `<div class="fields-grid">`;
            
            for (const fieldId in dynamicFieldsConfig[category]) {
                const field = dynamicFieldsConfig[category][fieldId];
                const currentValue = this.getFieldValue(fieldId);
                
                html += `<div class="field-group">`;
                html += `<label for="field-${fieldId}">${field.label}</label>`;
                
                if (field.type === 'courses') {
                    html += this.generateCoursesEditor(fieldId, currentValue);
                } else if (field.type === 'select') {
                    html += `<select id="field-${fieldId}" data-field-id="${fieldId}">`;
                    field.options.forEach(option => {
                        const selected = option === currentValue ? 'selected' : '';
                        html += `<option value="${option}" ${selected}>${option}</option>`;
                    });
                    html += `</select>`;
                } else if (field.type === 'number') {
                    const min = field.min || '';
                    const max = field.max || '';
                    const step = field.step || '1';
                    html += `<input type="number" id="field-${fieldId}" data-field-id="${fieldId}" 
                            value="${currentValue}" min="${min}" max="${max}" step="${step}">`;
                } else {
                    html += `<input type="text" id="field-${fieldId}" data-field-id="${fieldId}" 
                            value="${currentValue}" placeholder="${field.defaultValue}">`;
                }
                
                html += `</div>`;
            }
            
            html += `</div></div>`;
        }
        
        html += '<div class="settings-actions">';
        html += '<button type="button" id="randomize-dynamic-fields" class="btn btn-randomize"><i class="fa fa-random"></i> توليد بيانات عشوائية</button>';
        html += '<button type="button" id="save-dynamic-fields" class="btn btn-primary">حفظ التغييرات</button>';
        html += '<button type="button" id="reset-dynamic-fields" class="btn btn-secondary">إعادة تعيين</button>';
        html += '<button type="button" id="export-dynamic-fields" class="btn btn-info">تصدير الإعدادات</button>';
        html += '<input type="file" id="import-dynamic-fields" accept=".json" style="display: none;">';
        html += '<button type="button" id="import-dynamic-fields-btn" class="btn btn-info">استيراد الإعدادات</button>';
        html += '</div>';
        
        html += '</div>';
        return html;
    },
    
    // Generate courses editor HTML
    generateCoursesEditor: function(fieldId, courses) {
        let html = `<div class="courses-editor" data-field-id="${fieldId}">`;
        html += `<div class="courses-list">`;
        
        if (Array.isArray(courses) && courses.length > 0) {
            courses.forEach((course, index) => {
                html += this.generateCourseRow(course, index);
            });
        } else {
            // Add a default empty course
            html += this.generateCourseRow({
                code: '',
                name: '',
                section: '',
                activity: 'نظري',
                room: '',
                time: ''
            }, 0);
        }
        
        html += `</div>`;
        html += `<div class="courses-actions">`;
        html += `<button type="button" class="btn btn-secondary" onclick="DynamicFields.addCourse('${fieldId}')">إضافة مقرر</button>`;
        html += `<button type="button" class="btn btn-info" onclick="DynamicFields.importSampleCourses('${fieldId}')">استيراد مقررات تجريبية</button>`;
        html += `</div>`;
        html += `</div>`;
        
        return html;
    },
    
    // Generate single course row
    generateCourseRow: function(course, index) {
        return `
            <div class="course-row" data-course-index="${index}">
                <div class="course-inputs">
                    <input type="text" placeholder="رمز المقرر" value="${course.code || ''}" 
                           onchange="DynamicFields.updateCourseField(this, ${index}, 'code')">
                    <input type="text" placeholder="اسم المقرر" value="${course.name || ''}" 
                           onchange="DynamicFields.updateCourseField(this, ${index}, 'name')">
                    <input type="text" placeholder="الشعبة" value="${course.section || ''}" 
                           onchange="DynamicFields.updateCourseField(this, ${index}, 'section')">
                    <select onchange="DynamicFields.updateCourseField(this, ${index}, 'activity')">
                        <option value="نظري" ${course.activity === 'نظري' ? 'selected' : ''}>نظري</option>
                        <option value="عملي" ${course.activity === 'عملي' ? 'selected' : ''}>عملي</option>
                        <option value="مختبر" ${course.activity === 'مختبر' ? 'selected' : ''}>مختبر</option>
                    </select>
                    <input type="text" placeholder="القاعة" value="${course.room || ''}" 
                           onchange="DynamicFields.updateCourseField(this, ${index}, 'room')">
                    <input type="text" placeholder="الوقت" value="${course.time || ''}" 
                           onchange="DynamicFields.updateCourseField(this, ${index}, 'time')">
                </div>
                <button type="button" class="btn btn-danger btn-sm" onclick="DynamicFields.removeCourse(this)">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `;
    },
    
    // Add new course
    addCourse: function(fieldId) {
        const coursesEditor = document.querySelector(`[data-field-id="${fieldId}"] .courses-list`);
        if (!coursesEditor) return;
        
        const courseCount = coursesEditor.children.length;
        const newCourseHTML = this.generateCourseRow({
            code: '',
            name: '',
            section: '',
            activity: 'نظري',
            room: '',
            time: ''
        }, courseCount);
        
        coursesEditor.insertAdjacentHTML('beforeend', newCourseHTML);
    },
    
    // Remove course
    removeCourse: function(button) {
        const courseRow = button.closest('.course-row');
        if (courseRow) {
            courseRow.remove();
            // Update the courses data
            const coursesEditor = button.closest('.courses-editor');
            const fieldId = coursesEditor.dataset.fieldId;
            this.updateCoursesFromEditor(fieldId);
        }
    },
    
    // Update course field
    updateCourseField: function(input, courseIndex, field) {
        // Update will be handled by the real-time preview
        const coursesEditor = input.closest('.courses-editor');
        const fieldId = coursesEditor.dataset.fieldId;
        this.updateCoursesFromEditor(fieldId);
    },
    
    // Update courses data from editor
    updateCoursesFromEditor: function(fieldId) {
        const coursesEditor = document.querySelector(`[data-field-id="${fieldId}"]`);
        if (!coursesEditor) return;
        
        const courses = [];
        const courseRows = coursesEditor.querySelectorAll('.course-row');
        
        courseRows.forEach((row, index) => {
            const inputs = row.querySelectorAll('input, select');
            const course = {
                code: inputs[0].value,
                name: inputs[1].value,
                section: inputs[2].value,
                activity: inputs[3].value,
                room: inputs[4].value,
                time: inputs[5].value
            };
            
            // Only add courses that have at least a code or name
            if (course.code || course.name) {
                courses.push(course);
            }
        });
        
        // Update the field in real-time
        this.updateFieldInDOM(fieldId, courses);
    },
    
    // Import sample courses
    importSampleCourses: function(fieldId) {
        const sampleCourses = [
            {
                code: '0125471',
                name: 'منهجية بناء مشروع',
                section: '4',
                activity: 'نظري',
                room: '60',
                time: '[ 21:00_22:00 ] ث (و)'
            },
            {
                code: '0125472',
                name: 'مشروع تخرج',
                section: '6',
                activity: 'عملي',
                room: '60',
                time: '[ 14:00_17:00 ] ج (و)'
            },
            {
                code: '0130111',
                name: 'تصميم المنطق الرقمي',
                section: '2',
                activity: 'نظري',
                room: '60-9147',
                time: '[ 11:00_12:30 ] ن (م) ر (ن)'
            },
            {
                code: '0420101',
                name: 'العلوم العسكرية',
                section: '2',
                activity: 'نظري',
                room: '60',
                time: '[ 17:30_19:00 ] ن (ن) ر (ك)'
            }
        ];
        
        // Clear existing courses
        const coursesEditor = document.querySelector(`[data-field-id="${fieldId}"] .courses-list`);
        if (coursesEditor) {
            coursesEditor.innerHTML = '';
            
            // Add sample courses
            sampleCourses.forEach((course, index) => {
                coursesEditor.insertAdjacentHTML('beforeend', this.generateCourseRow(course, index));
            });
            
            // Update the field
            this.updateFieldInDOM(fieldId, sampleCourses);
        }
    },
    
    // Initialize when DOM is ready
    initialize: function() {
        document.addEventListener('DOMContentLoaded', () => {
            // Add CSS classes to existing elements for easier targeting
            this.addCSSClasses();
            // Initialize dynamic fields
            this.initializeFields();
        });
    },
    
    // Add CSS classes to existing elements
    addCSSClasses: function() {
        // Wait for page to be fully loaded
        setTimeout(() => {
            // Mark student info elements with specific classes
            const studentInfoMappings = [
                { text: '', class: 'dynamic-student-id' },
                { text: '', class: 'dynamic-student-name' },
                { text: 'الفصل الثاني 2024/2025', class: 'dynamic-semester' },
                { text: 'الــــعلـوم وتكنولوجيا المعلومات', class: 'dynamic-college' },
                { text: 'الامن السيبراني', class: 'dynamic-major' },
                { text: 'منتظم', class: 'dynamic-status' },
                { text: 'محمد احمد عبدالحفيظ عاليه', class: 'dynamic-advisor' }
            ];
            
            // Find and mark student info elements
            studentInfoMappings.forEach(mapping => {
                const elements = document.querySelectorAll('span.project-detail, .student-info');
                elements.forEach(el => {
                    if (el.textContent.trim().includes(mapping.text.trim())) {
                        el.classList.add(mapping.class, 'dynamic-field-highlight');
                        el.setAttribute('data-original-value', mapping.text);
                        el.setAttribute('title', 'حقل ديناميكي - انقر لتعديل');
                    }
                });
            });
            
            // Mark academic info elements
            const gpaElement = document.querySelector('.knob.tax');
            if (gpaElement) {
                gpaElement.classList.add('dynamic-gpa', 'dynamic-field-highlight');
                gpaElement.setAttribute('title', 'حقل ديناميكي - المعدل التراكمي');
            }
            
            const completionElement = document.querySelector('.knob.invoice');
            if (completionElement) {
                completionElement.classList.add('dynamic-completion', 'dynamic-field-highlight');
                completionElement.setAttribute('title', 'حقل ديناميكي - انجاز الخطة');
            }
            
            const levelElement = document.querySelector('.knob.expense');
            if (levelElement) {
                levelElement.classList.add('dynamic-level', 'dynamic-field-highlight');
                levelElement.setAttribute('title', 'حقل ديناميكي - مستوى الطالب');
            }
            
            // Mark financial info
            const balanceElements = document.querySelectorAll('a[href*="financialRecord"]');
            balanceElements.forEach(el => {
                el.classList.add('dynamic-balance', 'dynamic-field-highlight');
                el.setAttribute('title', 'حقل ديناميكي - الرصيد المالي');
            });
            
            // Mark profile elements
            const profileNameElements = document.querySelectorAll('.topbar-item-name.profile-name');
            profileNameElements.forEach(el => {
                el.classList.add('dynamic-profile-name', 'dynamic-field-highlight');
                el.setAttribute('title', 'حقل ديناميكي - اسم المستخدم');
            });
            
            const profileRoleElements = document.querySelectorAll('.topbar-item-name.profile-role');
            profileRoleElements.forEach(el => {
                el.classList.add('dynamic-profile-role', 'dynamic-field-highlight');
                el.setAttribute('title', 'حقل ديناميكي - دور المستخدم');
            });
            
            // Add click handlers for quick editing
            document.querySelectorAll('.dynamic-field-highlight').forEach(element => {
                element.style.cursor = 'pointer';
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    showDynamicFieldsSettings();
                });
            });
            
            console.log('Dynamic fields classes added successfully');
        }, 1000);
    },
    
    // Get category display name in Arabic
    getCategoryDisplayName: function(category) {
        const names = {
            studentInfo: 'المعلومات الشخصية',
            academicInfo: 'المعلومات الأكاديمية',
            financialInfo: 'المعلومات المالية',
            profileInfo: 'معلومات الملف الشخصي',
            enrolledCourses: 'المقررات المسجلة'
        };
        return names[category] || category;
    },

    // Attach event listeners for settings form
    attachSettingsEventListeners: function() {
        // Randomize button
        const randomizeButton = document.getElementById('randomize-dynamic-fields');
        if (randomizeButton) {
            randomizeButton.addEventListener('click', () => {
                if (confirm('هل أنت متأكد من توليد بيانات عشوائية؟ سيتم توليد جميع البيانات بشكل عشوائي.')) {
                    this.randomizeAllFields();
                }
            });
        }

        // Save button
        const saveButton = document.getElementById('save-dynamic-fields');
        if (saveButton) {
            saveButton.addEventListener('click', () => {
                this.saveSettingsFromForm();
            });
        }

        // Reset button
        const resetButton = document.getElementById('reset-dynamic-fields');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetFields();
            });
        }

        // Export button
        const exportButton = document.getElementById('export-dynamic-fields');
        if (exportButton) {
            exportButton.addEventListener('click', () => {
                this.exportSettings();
            });
        }

        // Import button
        const importButton = document.getElementById('import-dynamic-fields-btn');
        if (importButton) {
            importButton.addEventListener('click', () => {
                document.getElementById('import-dynamic-fields').click();
            });
        }

        // Import file input
        const importInput = document.getElementById('import-dynamic-fields');
        if (importInput) {
            importInput.addEventListener('change', (e) => {
                this.importSettings(e);
            });
        }

        // Real-time updates for non-course fields
        const inputs = document.querySelectorAll('#dynamic-fields-container input, #dynamic-fields-container select');
        inputs.forEach(input => {
            if (!input.closest('.courses-editor')) {
                input.addEventListener('input', (e) => {
                    const fieldId = e.target.dataset.fieldId;
                    if (fieldId) {
                        this.updateFieldInDOM(fieldId, e.target.value);
                    }
                });
            }
        });
    },

    // Save settings from form
    saveSettingsFromForm: function() {
        const stored = this.loadFromStorage();
        let hasChanges = false;

        // Process regular fields
        const inputs = document.querySelectorAll('#dynamic-fields-container input[data-field-id], #dynamic-fields-container select[data-field-id]');
        inputs.forEach(input => {
            const fieldId = input.dataset.fieldId;
            if (fieldId && !input.closest('.courses-editor')) {
                const newValue = input.value;
                if (stored[fieldId] !== newValue) {
                    stored[fieldId] = newValue;
                    hasChanges = true;
                    this.updateFieldInDOM(fieldId, newValue);
                }
            }
        });

        // Process courses field
        const coursesEditor = document.querySelector('.courses-editor[data-field-id="courses"]');
        if (coursesEditor) {
            const courses = [];
            const courseRows = coursesEditor.querySelectorAll('.course-row');
            
            courseRows.forEach((row) => {
                const inputs = row.querySelectorAll('input, select');
                if (inputs.length >= 6) {
                    const course = {
                        code: inputs[0].value.trim(),
                        name: inputs[1].value.trim(),
                        section: inputs[2].value.trim(),
                        activity: inputs[3].value,
                        room: inputs[4].value.trim(),
                        time: inputs[5].value.trim()
                    };
                    
                    // Only add courses that have at least a code or name
                    if (course.code || course.name) {
                        courses.push(course);
                    }
                }
            });

            // Check if courses changed
            const currentCourses = stored['courses'] || [];
            if (JSON.stringify(currentCourses) !== JSON.stringify(courses)) {
                stored['courses'] = courses;
                hasChanges = true;
                this.updateFieldInDOM('courses', courses);
            }
        }

        // Save to localStorage
        if (hasChanges) {
            this.saveToStorage(stored);
            
            // Show success message
            this.showNotification('تم حفظ التغييرات بنجاح!', 'success');
            
            // Refresh all fields
            setTimeout(() => {
                this.refreshAllFields();
            }, 100);
        } else {
            this.showNotification('لا توجد تغييرات للحفظ', 'info');
        }
    },

    // Show notification
    showNotification: function(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.dynamic-fields-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `dynamic-fields-notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 10000;
            font-family: 'DroidKufiRegular', Arial, sans-serif;
            direction: rtl;
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    },

    // Reset all fields to default values
    resetFields: function() {
        if (confirm('هل أنت متأكد من إعادة تعيين جميع الحقول للقيم الافتراضية؟')) {
            localStorage.removeItem(this.STORAGE_KEY);
            this.refreshAllFields();
            
            // Regenerate the settings form with default values
            const container = document.getElementById('dynamic-fields-container');
            if (container) {
                container.innerHTML = this.generateSettingsForm();
                this.attachSettingsEventListeners();
            }
            
            this.showNotification('تم إعادة تعيين جميع الحقول بنجاح!', 'success');
        }
    },

    // Export settings to JSON file
    exportSettings: function() {
        const settings = this.loadFromStorage();
        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'dynamic-fields-settings.json';
        link.click();
        
        this.showNotification('تم تصدير الإعدادات بنجاح!', 'success');
    },

    // Import settings from JSON file
    importSettings: function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const settings = JSON.parse(e.target.result);
                this.saveToStorage(settings);
                this.refreshAllFields();
                
                // Regenerate the settings form with imported values
                const container = document.getElementById('dynamic-fields-container');
                if (container) {
                    container.innerHTML = this.generateSettingsForm();
                    this.attachSettingsEventListeners();
                }
                
                this.showNotification('تم استيراد الإعدادات بنجاح!', 'success');
            } catch (error) {
                this.showNotification('خطأ في استيراد الإعدادات - تأكد من صحة الملف', 'error');
            }
        };
        reader.readAsText(file);
        
        // Reset the input
        event.target.value = '';
    },

    // Update courses table in the main UI
    updateCoursesTable: function(courses) {
        console.log('Updating courses table with:', courses);
        
        // Update main portal courses table
        const coursesTable = document.querySelector('#contents\\:schedules tbody, .dynamic-courses-table tbody');
        if (coursesTable) {
            coursesTable.innerHTML = '';

            if (Array.isArray(courses) && courses.length > 0) {
                courses.forEach((course, index) => {
                    const row = document.createElement('tr');
                    row.className = 'ui-widget-content ui-datatable-even';
                    
                    row.innerHTML = `
                        <td role="gridcell">${course.code || ''}</td>
                        <td role="gridcell">${course.name || ''}</td>
                        <td role="gridcell">${course.section || ''}</td>
                        <td role="gridcell">${course.activity || ''}</td>
                        <td role="gridcell">${course.room || ''}</td>
                        <td role="gridcell">${course.time || ''}</td>
                    `;
                    
                    coursesTable.appendChild(row);
                });
            } else {
                const emptyRow = document.createElement('tr');
                emptyRow.className = 'ui-widget-content ui-datatable-empty-message';
                emptyRow.innerHTML = '<td colspan="6" style="text-align: center;">لا توجد مقررات مسجلة</td>';
                coursesTable.appendChild(emptyRow);
            }
        }

        // Update exam card courses table (3-column format)
        const examTable = document.querySelector('.dynamic-exam-courses-body');
        if (examTable) {
            examTable.innerHTML = '';
            
            if (Array.isArray(courses) && courses.length > 0) {
                courses.forEach(course => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${course.code || 'غير متوفر'}</td>
                        <td>${course.name || 'غير متوفر'}</td>
                        <td>3</td>
                    `;
                    examTable.appendChild(row);
                });
            } else {
                examTable.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px;">لا توجد مقررات مسجلة</td></tr>';
            }
        }

        // Also update demo table if it exists
        this.updateDemoCoursesTable(courses);

        console.log('Courses table updated successfully');
    },

    // Update demo courses table
    updateDemoCoursesTable: function(courses) {
        const demoTable = document.querySelector('#demo-courses-table');
        if (!demoTable) return;

        // Clear existing rows
        demoTable.innerHTML = '';

        // Add new rows
        if (Array.isArray(courses) && courses.length > 0) {
            courses.forEach((course, index) => {
                const row = document.createElement('tr');
                row.style.cssText = 'border: 1px solid #ddd;';
                
                row.innerHTML = `
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${course.code || ''}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${course.name || ''}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${course.section || ''}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${course.activity || ''}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${course.room || ''}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${course.time || ''}</td>
                `;
                
                demoTable.appendChild(row);
            });
        } else {
            // Add empty row if no courses
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = '<td colspan="6" style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #666;">لا توجد مقررات مسجلة</td>';
            demoTable.appendChild(emptyRow);
        }
    },

    // Randomization functions
    getRandomItem: function(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    generateRandomCourses: function() {
        const courseCount = Math.floor(Math.random() * 4) + 3; // 3-6 courses
        const selectedCourses = [];
        const availableCourses = [...randomDataSets.courses];

        for (let i = 0; i < courseCount && availableCourses.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableCourses.length);
            const course = availableCourses.splice(randomIndex, 1)[0];
            
            // Generate realistic section and room data
            const sections = ['1', '2', '3', '4', '5', '6'];
            const activities = ['نظري', 'عملي', 'نظري وعملي'];
            const rooms = ['60', '60-9147', '101', '102', '201', '301', 'مختبر 1', 'مختبر 2'];
            const times = [
                '[ 08:00_09:30 ] ح (أ) ث (أ)',
                '[ 10:00_11:30 ] ن (أ) ر (أ)',
                '[ 11:00_12:30 ] ن (م) ر (ن)',
                '[ 13:00_14:30 ] ح (م) ث (م)',
                '[ 14:00_17:00 ] ج (و)',
                '[ 17:30_19:00 ] ن (ن) ر (ك)',
                '[ 19:00_20:30 ] ح (ك) ث (ك)',
                '[ 21:00_22:00 ] ث (و)'
            ];

            selectedCourses.push({
                code: course.code,
                name: course.name,
                section: this.getRandomItem(sections),
                activity: this.getRandomItem(activities),
                room: this.getRandomItem(rooms),
                time: this.getRandomItem(times)
            });
        }

        return selectedCourses;
    },

    generateRealisticGPA: function() {
        // Generate realistic GPA between 65-85 with proper decimal precision
        const baseGPA = 65 + Math.random() * 20; // Random between 65-85
        
        // Add some realistic variance patterns
        const patterns = [
            () => Math.round(baseGPA * 10) / 10, // One decimal place (e.g., 78.4)
            () => Math.round(baseGPA * 100) / 100, // Two decimal places (e.g., 78.43)
            () => Math.round(baseGPA), // Whole number (e.g., 78)
        ];
        
        const selectedPattern = this.getRandomItem(patterns);
        let gpa = selectedPattern();
        
        // Ensure it stays within bounds
        gpa = Math.max(65, Math.min(85, gpa));
        
        return gpa.toString();
    },

    generateRealisticCompletion: function() {
        // Generate realistic plan completion percentage between 30-100%
        // This will be used to determine student level, so we generate it first
        const completionRanges = [
            { min: 30, max: 50 },  // Low completion
            { min: 45, max: 65 },  // Medium-low completion
            { min: 60, max: 80 },  // Medium-high completion
            { min: 75, max: 95 },  // High completion
            { min: 85, max: 100 }  // Very high completion
        ];
        
        const randomRange = this.getRandomItem(completionRanges);
        const completion = randomRange.min + Math.random() * (randomRange.max - randomRange.min);
        
        return Math.round(completion).toString();
    },

    generateRealisticStudentLevel: function(completionPercentage) {
        // Generate realistic student level based on completion percentage
        // This creates a logical relationship between level and completion
        
        if (completionPercentage <= 40) {
            // 30-40% completion: Level 1-2
            return Math.random() < 0.7 ? '1' : '2';
        } else if (completionPercentage <= 60) {
            // 41-60% completion: Level 2-3
            return Math.random() < 0.6 ? '2' : '3';
        } else if (completionPercentage <= 75) {
            // 61-75% completion: Level 3-4
            return Math.random() < 0.5 ? '3' : '4';
        } else if (completionPercentage <= 88) {
            // 76-88% completion: Level 4-5
            return Math.random() < 0.7 ? '4' : '5';
        } else {
            // 89-100% completion: Level 5-6
            return Math.random() < 0.6 ? '5' : '6';
        }
    },

    randomizeAllFields: function() {
        const stored = this.loadFromStorage();
        
        // Generate random data for each category
        const semester = this.getRandomItem(randomDataSets.semesters);
        const college = this.getRandomItem(randomDataSets.colleges);
        const major = randomDataSets.majors[college] ? 
            this.getRandomItem(randomDataSets.majors[college]) : 
            this.getRandomItem(randomDataSets.majors['الــــعلـوم وتكنولوجيا المعلومات']);
        
        const randomData = {
            // Generate random name and student-id if not preserving existing ones
            'student-name': stored['student-name'] || this.getRandomItem(randomDataSets.studentNames),
            'student-id': stored['student-id'] || this.getRandomItem(randomDataSets.studentIds),
            
            // Randomize other student info
            'semester': semester,
            'college': college,
            'major': major,
            'status': this.getRandomItem(randomDataSets.statuses),
            'advisor': this.getRandomItem(randomDataSets.advisors),
            
            // Randomize academic info (generate completion first, then level based on it)
            'gpa': this.generateRealisticGPA()
        };
        
        // Generate completion percentage first
        const completion = this.generateRealisticCompletion();
        randomData['completion'] = completion;
        
        // Generate student level based on completion percentage (convert to number for comparison)
        randomData['level'] = this.generateRealisticStudentLevel(parseInt(completion));
        
        // Continue with other academic fields
        randomData['total-hours'] = this.getRandomItem(randomDataSets.totalHours);
        randomData['courses-registered'] = Math.floor(Math.random() * 3) + 4; // 4-6 courses
        randomData['courses-passed'] = Math.floor(Math.random() * 85) + 15; // 15-99 courses
        
        // Add remaining fields
        Object.assign(randomData, {
            // Randomize financial info
            'balance': (Math.random() * 5000).toFixed(2),
            'total-fees': (Math.random() * 3000 + 2000).toFixed(2),
            'financial-status': this.getRandomItem(randomDataSets.financialStatus),
            
            // Randomize profile info
            'profile-name': randomData['student-name'], // Use the same name as student name
            'profile-role': this.getRandomItem(randomDataSets.profileRoles),
            
            // Generate random enrolled courses
            'enrolled-courses': this.generateRandomCourses()
        });
        
        // Save to storage
        this.saveToStorage(randomData);
        
        // Update all fields in DOM
        this.refreshAllFields();
        
        // Update settings form if it's open
        this.updateSettingsForm();
        
        console.log('All fields randomized with realistic data:', randomData);
        
        // Show notification
        this.showNotification('تم توليد بيانات عشوائية واقعية بنجاح!', 'success');
    },

    updateSettingsForm: function() {
        const modal = document.getElementById('dynamic-fields-modal');
        if (modal && modal.style.display !== 'none') {
            const stored = this.loadFromStorage();
            
            // Update form inputs with new values
            for (const fieldId in stored) {
                const input = document.querySelector(`[data-field-id="${fieldId}"] input, [data-field-id="${fieldId}"] select`);
                if (input && fieldId !== 'enrolled-courses') {
                    input.value = stored[fieldId];
                }
            }
            
            // Update courses editor if it exists
            const coursesFieldId = 'enrolled-courses';
            const coursesEditor = document.querySelector(`[data-field-id="${coursesFieldId}"] .courses-list`);
            if (coursesEditor && stored[coursesFieldId]) {
                coursesEditor.innerHTML = '';
                stored[coursesFieldId].forEach((course, index) => {
                    coursesEditor.insertAdjacentHTML('beforeend', this.generateCourseRow(course, index));
                });
            }
        }
    },

    showNotification: function(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `dynamic-fields-notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10001;
            font-family: Arial, sans-serif;
            max-width: 350px;
            direction: rtl;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    // Initialize the dynamic fields system
    initialize: function() {
        console.log('Initializing Dynamic Fields system...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeFields();
            });
        } else {
            this.initializeFields();
        }
    },

    // Initialize and populate all fields
    initializeFields: function() {
        console.log('Populating dynamic fields...');
        
        // Load stored data
        const stored = this.loadFromStorage();
        
        // Populate each field category
        Object.keys(dynamicFieldsConfig).forEach(category => {
            Object.keys(dynamicFieldsConfig[category]).forEach(fieldId => {
                const value = this.getFieldValue(fieldId);
                this.updateFieldInDOM(fieldId, value);
            });
        });
        
        console.log('Dynamic fields initialization complete');
    }
};

// Initialize the DynamicFields module
DynamicFields.initialize();
