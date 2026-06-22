
 tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Poppins', 'sans-serif']
                    },
                    colors: {
                        brandDark: '#0F1520',      /* Main Base Backdrop Layer */
                        brandSurface: '#151D2A',   /* Floating Panel Card Surface */
                        brandGold: '#E6C36A',      /* Premium Luxury Gold Accent */
                        brandGoldMuted: '#CCA34B', /* Solid Baseline Image Gold */
                        brandGreen: '#35D375',     /* Tech Mint Green Node Focus */
                        brandMuted: '#8A99AD'      /* Technical Subtitles Blueprint */
                    }
                }
            }
        }

function toggleNavMenu(buttonElement) {
    const parentGroup = buttonElement.closest('.nav-dropdown-group');
    if (!parentGroup) return;

    const content = parentGroup.querySelector('.dropdown-content');
    const chevron = parentGroup.querySelector('.dropdown-chevron');

    // Auto-closes parallel active systems node blocks
    document.querySelectorAll('.nav-dropdown-group').forEach(group => {
        if (group !== parentGroup) {
            const openContent = group.querySelector('.dropdown-content');
            const openChevron = group.querySelector('.dropdown-chevron');
            if (openContent) openContent.classList.add('hidden');
            if (openChevron) openChevron.classList.remove('rotate-180');
        }
    });

    if (content && chevron) {
        content.classList.toggle('hidden');
        chevron.classList.toggle('rotate-180');
    }
}
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebarPanel');
    const overlay = document.getElementById('sidebarOverlay');
    const mainContent = document.getElementById('mainContent');
    const toggleIcon = document.getElementById('menuToggleIcon');
    
    if (!sidebar || !overlay || !mainContent || !toggleIcon) return;

    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
        // ==========================================================================
        // 1. DESKTOP VIEWPORT LAYOUT: LIVE CLASS DETECTION
        // ==========================================================================
        // Agar class list me hidden wali class hai, matlab sidebar abhi HIDE hai
        const isHiddenNow = sidebar.classList.contains('lg:-translate-x-full');

        if (isHiddenNow) {
            // Sidebar chhipa hua tha -> Isko SCREEN PAR LAYEIN
            sidebar.classList.remove('lg:-translate-x-full');
            mainContent.classList.add('lg:pl-64');
            // JAB SIDEBAR DIKHE -> SHOW THREE LINES
            toggleIcon.className = "bi bi-list transition-transform duration-200";
        } else {
            // Sidebar screen par dikh raha tha -> ISKO HIDE KAREIN
            sidebar.classList.add('lg:-translate-x-full');
            mainContent.classList.remove('lg:pl-64');
            // JAB SIDEBAR HIDE HO -> SHOW CLOSE (X) ICON
            toggleIcon.className = "bi bi-x-lg transition-transform duration-200";
        }
    } else {
        // ==========================================================================
        // 2. MOBILE DRAWER LAYOUT: LIVE CLASS DETECTION (ICON FIXED TO bi-list)
        // ==========================================================================
        toggleIcon.className = "bi bi-list transition-transform duration-200";
        
        // Mobile par check karo ki kya sidebar chhipa hua hai
        const isHiddenNowMobile = sidebar.classList.contains('-translate-x-full');

        if (isHiddenNowMobile) {
            // Mobile par chhipa tha -> Isko slide karke OPEN KAREIN
            sidebar.classList.remove('-translate-x-full');
            
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('opacity-100'), 10);
            document.body.classList.add('overflow-hidden');
        } else {
            // Mobile par open tha -> Isko slide karke HIDE KAREIN
            sidebar.classList.add('-translate-x-full');
            
            overlay.classList.remove('opacity-100');
            setTimeout(() => overlay.classList.add('hidden'), 300);
            document.body.classList.remove('overflow-hidden');
        }
    }
}

// ==========================================================================
// OVERLAY CLICK MANAGER: Mobile par dark screen par click hone par close ho
// ==========================================================================
document.getElementById('sidebarOverlay')?.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebarPanel');
    // Agar mobile par sidebar khula hua hai (yaani usme hide wali class NAHI hai)
    if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
        toggleMobileSidebar();
    }
});

// Global Notification Dropdown Panel Controls Trigger Hub
function toggleNotificationMenu() {
    const dropdown = document.getElementById('notificationDropdownPanel');
    if (!dropdown) return;
    
    // Smooth opacity fading transition trigger using tailwind utility tokens logic
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        setTimeout(() => {
            dropdown.classList.remove('opacity-0', 'scale-95');
            dropdown.classList.add('opacity-100', 'scale-100');
        }, 10);
    } else {
        dropdown.classList.remove('opacity-100', 'scale-100');
        dropdown.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            dropdown.classList.add('hidden');
        }, 200);
    }
}

// 3. NEW: Admin Profile Dropdown Toggle Logic Matrix
function toggleProfileMenu() {
    const dropdown = document.getElementById('profileDropdownPanel');
    const notificationDropdown = document.getElementById('notificationDropdownPanel');
    if (!dropdown) return;
    
    // Safety check: close notification window if profile is clicking open
    if (notificationDropdown && !notificationDropdown.classList.contains('hidden')) {
        notificationDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
    }

    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        setTimeout(() => {
            dropdown.classList.remove('opacity-0', 'scale-95');
            dropdown.classList.add('opacity-100', 'scale-100');
        }, 10);
    } else {
        dropdown.classList.remove('opacity-100', 'scale-100');
        dropdown.classList.add('opacity-0', 'scale-95');
        setTimeout(() => dropdown.classList.add('hidden'), 200);
    }
}

// 4. Multi-Target Document Context Click Guard (Closes dropdowns safely if user clicks outside)
document.addEventListener('click', (event) => {
    const notifDropdown = document.getElementById('notificationDropdownPanel');
    const notifBtn = document.getElementById('notificationBellBtn');
    const profileDropdown = document.getElementById('profileDropdownPanel');
    const profileBtn = document.getElementById('adminProfileBtn');
    
    // Outside trace handling for Notification Module
    if (notifDropdown && notifBtn && !notifDropdown.contains(event.target) && !notifBtn.contains(event.target)) {
        if (!notifDropdown.classList.contains('hidden')) {
            notifDropdown.classList.remove('opacity-100', 'scale-100');
            notifDropdown.classList.add('opacity-0', 'scale-95');
            setTimeout(() => notifDropdown.classList.add('hidden'), 200);
        }
    }

    // Outside trace handling for Profile Module
    if (profileDropdown && profileBtn && !profileDropdown.contains(event.target) && !profileBtn.contains(event.target)) {
        if (!profileDropdown.classList.contains('hidden')) {
            profileDropdown.classList.remove('opacity-100', 'scale-100');
            profileDropdown.classList.add('opacity-0', 'scale-95');
            setTimeout(() => profileDropdown.classList.add('hidden'), 200);
        }
    }
});