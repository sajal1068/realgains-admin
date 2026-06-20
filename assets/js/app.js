
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
        // --- DESKTOP VIEWPORT LAYOUT ---
        sidebar.classList.toggle('lg:-translate-x-full');
        mainContent.classList.toggle('lg:pl-64');
        
        // FIXED LOGIC: lg:-translate-x-full means SIDEBAR IS CLOSED -> Show Close Icon
        if (sidebar.classList.contains('lg:-translate-x-full')) {
            toggleIcon.classList.replace('bi-list', 'bi-x-lg');
        } else {
            // SIDEBAR IS OPEN -> Show Tree Line Menu Icon
            toggleIcon.classList.replace('bi-x-lg', 'bi-list');
        }
    } else {
        // --- MOBILE DRAWER LAYOUT ---
        sidebar.classList.toggle('-translate-x-full');
        
        // FIXED LOGIC: -translate-x-full means SIDEBAR IS CLOSED -> Show Close Icon
        if (sidebar.classList.contains('-translate-x-full')) {
            toggleIcon.classList.replace('bi-list', 'bi-x-lg');
            overlay.classList.remove('opacity-100');
            setTimeout(() => overlay.classList.add('hidden'), 300);
            document.body.classList.remove('overflow-hidden');
        } else {
            // SIDEBAR IS OPEN -> Show Tree Line Menu Icon
            toggleIcon.classList.replace('bi-x-lg', 'bi-list');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('opacity-100'), 10);
            document.body.classList.add('overflow-hidden');
        }
    }
}

// Window resize stabilization configuration safely mapping default icons
window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebarPanel');
    const overlay = document.getElementById('sidebarOverlay');
    const mainContent = document.getElementById('mainContent');
    const toggleIcon = document.getElementById('menuToggleIcon');
    
    if (!sidebar || !overlay || !mainContent || !toggleIcon) return;

    if (window.innerWidth >= 1024) {
        overlay.classList.remove('opacity-100');
        overlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        
        if (!sidebar.classList.contains('lg:-translate-x-full')) {
            mainContent.add('lg:pl-64');
            toggleIcon.classList.replace('bi-x-lg', 'bi-list');
        } else {
            mainContent.classList.remove('lg:pl-64');
            toggleIcon.classList.replace('bi-list', 'bi-x-lg');
        }
    } else {
        mainContent.classList.remove('lg:pl-64');
        if (sidebar.classList.contains('-translate-x-full')) {
            toggleIcon.classList.replace('bi-list', 'bi-x-lg');
            overlay.classList.remove('opacity-100');
            overlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        } else {
            toggleIcon.classList.replace('bi-x-lg', 'bi-list');
        }
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