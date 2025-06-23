// SPA Portal Main JavaScript
class PortalSPA {
    constructor() {
        this.currentPage = 'dashboard';
        this.userData = this.loadUserData();
        this.init();
    }

    init() {
        this.hideLoadingScreen();
        this.loadUserData();
        this.updateUI();
        this.bindEvents();
        this.showAlerts();
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 300);
            }
        }, 1500);
    }

    loadUserData() {
        const defaultData = {
            userId: '',
            userType: 'طالب',
            userFullName: 'أحمد محمود منور أبوزيد',
            studentNumber: '',
            faculty: 'كلية تكنولوجيا المعلومات',
            major: 'هندسة البرمجيات',
            level: 'السنة الثالثة',
            messages: 0,
            homework: 0,
            absence: 0,
            balance: '0 دينار'
        };

        const savedData = localStorage.getItem('portalUserData');
        if (savedData) {
            try {
                this.userData = { ...defaultData, ...JSON.parse(savedData) };
            } catch (e) {
                console.error('Error loading user data:', e);
                this.userData = defaultData;
            }
        } else {
            this.userData = defaultData;
        }
        return this.userData;
    }

    saveUserData() {
        try {
            localStorage.setItem('portalUserData', JSON.stringify(this.userData));
            this.showSuccessMessage('تم حفظ البيانات بنجاح');
        } catch (e) {
            console.error('Error saving user data:', e);
            this.showErrorMessage('حدث خطأ أثناء حفظ البيانات');
        }
    }

    updateUI() {
        // Update template placeholders
        this.updateElement('user-id', this.userData.userId);
        this.updateElement('user-type', this.userData.userType);
        this.updateElement('user-full-name', this.userData.userFullName);
        this.updateElement('student-number', this.userData.studentNumber);
        this.updateElement('faculty', this.userData.faculty);
        this.updateElement('major', this.userData.major);
        this.updateElement('level', this.userData.level);

        // Update dashboard counters
        this.updateElement('dashboard-messages', this.userData.messages);
        this.updateElement('dashboard-homework', this.userData.homework);
        this.updateElement('dashboard-absence', this.userData.absence);
        this.updateElement('dashboard-balance', this.userData.balance);

        // Update navigation badges
        this.updateElement('messages-count', this.userData.messages);
        this.updateElement('homework-count', this.userData.homework);

        // Update form fields
        this.updateFormFields();
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    updateFormFields() {
        const fields = [
            'input-user-id',
            'input-user-type',
            'input-full-name',
            'input-faculty',
            'input-major',
            'input-level',
            'input-student-number',
            'input-messages',
            'input-homework',
            'input-absence',
            'input-balance'
        ];

        fields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                const dataKey = fieldId.replace('input-', '').replace('-', '');
                let value = this.userData[dataKey];
                
                // Handle special cases
                if (fieldId === 'input-user-id' || fieldId === 'input-student-number') {
                    value = this.userData.userId;
                } else if (fieldId === 'input-full-name') {
                    value = this.userData.userFullName;
                }

                if (value !== undefined) {
                    element.value = value;
                }
            }
        });
    }

    bindEvents() {
        // Navigation events
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.getAttribute('data-page');
                if (page) {
                    this.navigateToPage(page);
                }
            });
        });

        // Settings form submission
        const settingsForm = document.getElementById('user-settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveSettings();
            });
        }

        // Form input changes
        document.querySelectorAll('#user-settings-form input, #user-settings-form select').forEach(input => {
            input.addEventListener('input', () => {
                this.updateDataFromForm();
            });
        });

        // Window events
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });

        // Initialize from hash
        this.handleHashChange();
    }

    navigateToPage(page) {
        // Update URL hash
        window.location.hash = page;
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[data-page="${page}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // Show page content
        document.querySelectorAll('.page-content').forEach(content => {
            content.classList.remove('active');
        });

        const pageContent = document.getElementById(`${page}-page`);
        if (pageContent) {
            pageContent.classList.add('active');
        }

        this.currentPage = page;
    }

    handleHashChange() {
        const hash = window.location.hash.slice(1);
        const page = hash || 'dashboard';
        this.navigateToPage(page);
    }

    updateDataFromForm() {
        const formData = {
            userId: document.getElementById('input-user-id')?.value || this.userData.userId,
            userType: document.getElementById('input-user-type')?.value || this.userData.userType,
            userFullName: document.getElementById('input-full-name')?.value || this.userData.userFullName,
            faculty: document.getElementById('input-faculty')?.value || this.userData.faculty,
            major: document.getElementById('input-major')?.value || this.userData.major,
            level: document.getElementById('input-level')?.value || this.userData.level,
            studentNumber: document.getElementById('input-student-number')?.value || this.userData.studentNumber,
            messages: parseInt(document.getElementById('input-messages')?.value) || 0,
            homework: parseInt(document.getElementById('input-homework')?.value) || 0,
            absence: parseInt(document.getElementById('input-absence')?.value) || 0,
            balance: document.getElementById('input-balance')?.value || this.userData.balance
        };

        this.userData = { ...this.userData, ...formData };
        this.updateUI();
    }

    saveSettings() {
        this.updateDataFromForm();
        this.saveUserData();
        
        // Show success animation
        const submitBtn = document.querySelector('#user-settings-form button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'تم الحفظ ✓';
            submitBtn.classList.add('btn-success');
            submitBtn.classList.remove('btn-primary');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('btn-success');
                submitBtn.classList.add('btn-primary');
            }, 2000);
        }
    }

    showAlerts() {
        const alertContainer = document.getElementById('alert-messages');
        if (!alertContainer) return;

        const alerts = [
            {
                type: 'info',
                icon: 'fa-info-circle',
                message: 'الفترة الحالية تقع ضمن فترة التقييم، سيتم حجب بعض الخدمات لحين قيامك بعملية التقييم لهذا الفصل'
            },
            {
                type: 'warning',
                icon: 'fa-exclamation-triangle',
                message: 'الفترة الحالية تقع ضمن فترة التسجيل'
            }
        ];

        alertContainer.innerHTML = alerts.map(alert => `
            <div class="custom-alert alert-${alert.type}">
                <i class="fa ${alert.icon}"></i>
                <span>${alert.message}</span>
            </div>
        `).join('');
    }

    showSuccessMessage(message) {
        this.showToast(message, 'success');
    }

    showErrorMessage(message) {
        this.showToast(message, 'danger');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast-message toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fa fa-${type === 'success' ? 'check' : type === 'danger' ? 'times' : 'info'}-circle"></i>
                <span>${message}</span>
            </div>
        `;

        // Add toast styles if not already added
        if (!document.getElementById('toast-styles')) {
            const toastStyles = document.createElement('style');
            toastStyles.id = 'toast-styles';
            toastStyles.textContent = `
                .toast-message {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10000;
                    padding: 15px 20px;
                    border-radius: 8px;
                    color: white;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    animation: slideInDown 0.3s ease;
                }
                .toast-success { background: #28a745; }
                .toast-danger { background: #dc3545; }
                .toast-info { background: #17a2b8; }
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                @keyframes slideInDown {
                    from { transform: translate(-50%, -100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `;
            document.head.appendChild(toastStyles);
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideInDown 0.3s ease reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    resetForm() {
        if (confirm('هل أنت متأكد من إعادة تعيين جميع الحقول؟')) {
            this.userData = {
                userId: '',
                userType: 'طالب',
                userFullName: 'أحمد محمود منور أبوزيد',
                studentNumber: '',
                faculty: 'كلية تكنولوجيا المعلومات',
                major: 'هندسة البرمجيات',
                level: 'السنة الثالثة',
                messages: 0,
                homework: 0,
                absence: 0,
                balance: '0 دينار'
            };
            this.updateUI();
            this.showSuccessMessage('تم إعادة تعيين البيانات');
        }
    }

    clearData() {
        if (confirm('هل أنت متأكد من مسح جميع البيانات؟ هذا الإجراء لا يمكن التراجع عنه.')) {
            localStorage.removeItem('portalUserData');
            this.userData = {
                userId: '',
                userType: 'طالب',
                userFullName: '',
                studentNumber: '',
                faculty: '',
                major: '',
                level: '',
                messages: 0,
                homework: 0,
                absence: 0,
                balance: '0 دينار'
            };
            this.updateUI();
            this.showSuccessMessage('تم مسح جميع البيانات');
        }
    }

    submitPoll() {
        const selectedPoll = document.querySelector('input[name="poll"]:checked');
        if (selectedPoll) {
            this.showSuccessMessage(`تم تسجيل صوتك: ${selectedPoll.nextElementSibling.textContent}`);
            // Disable poll after submission
            document.querySelectorAll('input[name="poll"]').forEach(input => {
                input.disabled = true;
            });
            document.querySelector('.poll-card button').disabled = true;
            document.querySelector('.poll-card button').textContent = 'تم التصويت ✓';
        } else {
            this.showErrorMessage('يرجى اختيار أحد الخيارات');
        }
    }

    showUserPreferences() {
        const modal = new bootstrap.Modal(document.getElementById('userPreferencesModal'));
        modal.show();
    }

    logout() {
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            // Clear session data but keep user preferences
            this.showSuccessMessage('تم تسجيل الخروج بنجاح');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }
}

// Global functions for button events
function resetForm() {
    portal.resetForm();
}

function clearData() {
    portal.clearData();
}

function submitPoll() {
    portal.submitPoll();
}

function showUserPreferences() {
    portal.showUserPreferences();
}

function logout() {
    portal.logout();
}

// Initialize the portal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.portal = new PortalSPA();
});

// Arabic locale support for date/time
if (typeof moment !== 'undefined') {
    moment.locale('ar');
}

// Service Worker for offline capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('spa-assets/js/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Utility functions
const utils = {
    formatDate: function(date) {
        return new Intl.DateTimeFormat('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    formatNumber: function(number) {
        return new Intl.NumberFormat('ar-SA').format(number);
    },

    validateStudentId: function(id) {
        return /^\d{9}$/.test(id);
    },

    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortalSPA;
}
