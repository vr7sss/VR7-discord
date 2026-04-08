// Toggle section visibility
function toggleSection(sectionId) {
    const contentId = `${sectionId}-content`;
    const chevronId = `chevron-${sectionId}`;
    
    const content = document.getElementById(contentId);
    const chevron = document.getElementById(chevronId);
    
    if (content) {
        content.classList.toggle('hidden');
        if (chevron) {
            chevron.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    }
}

// Validate credentials
function validateCredentials() {
    const botToken = document.getElementById('botToken').value;
    const guildId = document.getElementById('guildId').value;
    
    if (!botToken.trim() || !guildId.trim()) {
        alert('يرجى إدخال Bot Token و Guild ID');
        return;
    }
    
    // Simulate validation
    addLog('جاري التحقق من البيانات...', 'info');
    
    setTimeout(() => {
        if (botToken.length > 10 && guildId.length > 10) {
            addLog('✓ تم التحقق من البيانات بنجاح', 'success');
            alert('تم التحقق من البيانات بنجاح');
        } else {
            addLog('✗ فشل التحقق من البيانات', 'error');
            alert('فشل التحقق من البيانات');
        }
    }, 1000);
}

// Execute action
function executeAction(action) {
    const botToken = document.getElementById('botToken').value;
    const guildId = document.getElementById('guildId').value;
    
    if (!botToken.trim() || !guildId.trim()) {
        alert('يرجى إدخل Bot Token و Guild ID أولاً');
        return;
    }
    
    // Expand logs section
    const logsContent = document.getElementById('logs-content');
    if (logsContent.classList.contains('hidden')) {
        toggleSection('logs');
    }
    
    // Clear previous logs
    const logsContainer = document.getElementById('logs-container');
    logsContainer.innerHTML = '';
    
    // Simulate action execution
    const actionNames = {
        'ban': 'حظر الأعضاء',
        'delete': 'حذف الرومات',
        'create': 'إنشاء الرومات'
    };
    
    addLog(`جاري ${actionNames[action]}...`, 'info');
    
    // Simulate processing
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            addLog(`✓ تم ${actionNames[action]} بنجاح`, 'success');
        } else {
            addLog(`جاري المعالجة... ${Math.floor(progress)}%`, 'info');
        }
    }, 500);
}

// Add log entry
function addLog(message, type = 'info') {
    const logsContainer = document.getElementById('logs-container');
    
    // Clear empty state if it exists
    if (logsContainer.innerHTML.includes('لا توجد عمليات')) {
        logsContainer.innerHTML = '';
    }
    
    const timestamp = new Date().toLocaleTimeString('ar-SA');
    const logEntry = document.createElement('div');
    logEntry.className = 'flex gap-2 break-words';
    
    let color = 'text-blue-400';
    if (type === 'success') color = 'text-green-400';
    else if (type === 'error') color = 'text-red-400';
    else if (type === 'warning') color = 'text-yellow-400';
    
    logEntry.innerHTML = `
        <span class="text-slate-600 flex-shrink-0">[${timestamp}]</span>
        <span class="${color} flex-1 break-words">${message}</span>
    `;
    
    logsContainer.appendChild(logEntry);
    
    // Auto-scroll to bottom
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

// Clear logs
function clearLogs() {
    const logsContainer = document.getElementById('logs-container');
    logsContainer.innerHTML = `
        <div class="text-slate-500 text-center py-12">
            <p>لا توجد عمليات حتى الآن</p>
            <p class="text-xs mt-1">ابدأ بتنفيذ إجراء</p>
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners for input fields
    const channelName = document.getElementById('channelName');
    const channelCount = document.getElementById('channelCount');
    
    if (channelName && channelCount) {
        // Ensure channel count is valid
        channelCount.addEventListener('change', (e) => {
            if (e.target.value < 1) e.target.value = 1;
            if (e.target.value > 100) e.target.value = 100;
        });
    }
    
    // Add initial welcome message
    addLog('أهلاً بك في DISCORD NUKER v1.0.0', 'info');
    addLog('يرجى إدخال بيانات الاتصال أولاً', 'info');
});
