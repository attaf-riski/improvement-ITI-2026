/**
 * KPI RACE TRACKER - Multi-Lane Racing System
 * Horizontal lanes with left-to-right progression
 */

// ========================================
// CONFIGURATION & STATE
// ========================================
const CONFIG = {
    // Horizontal positioning parameters (left to right)
    startPosition: 5,     // 5% from left (near start line)
    endPosition: 90,      // 90% from left (at finish line)
    maxPoints: 4,         // Maximum submissions to reach finish line

    // Animation delays
    characterAnimationDelay: 80, // ms between each racer appearance
};

let teamData = [];

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    await loadTeamData();
    renderRacingLanes();
    updateStatistics();
    setupModalHandlers();
});

// ========================================
// DATA LOADING
// ========================================
async function loadTeamData() {
    try {
        const response = await fetch('data.json');
        teamData = await response.json();
        console.log('✅ Team data loaded:', teamData);
    } catch (error) {
        console.error('❌ Error loading team data:', error);
        // Fallback: Use sample data if data.json doesn't exist
        teamData = generateSampleData();
    }
}

// ========================================
// RACING LANES RENDERING
// ========================================
function renderRacingLanes() {
    const container = document.getElementById('racing-lanes');
    container.innerHTML = ''; // Clear existing lanes

    teamData.forEach((member, index) => {
        const laneElement = createLaneElement(member, index);
        container.appendChild(laneElement);
    });
}

function createLaneElement(member, laneIndex) {
    // Create lane container
    const lane = document.createElement('div');
    lane.className = 'lane';
    lane.dataset.laneId = laneIndex + 1;

    // Create lane name label
    const nameLabel = document.createElement('div');
    nameLabel.className = 'lane-name';
    nameLabel.textContent = `${laneIndex + 1}. ${member.nama}`;
    lane.appendChild(nameLabel);

    // Create racer element
    const racer = createRacerElement(member, laneIndex);
    lane.appendChild(racer);

    return lane;
}

function createRacerElement(member, laneIndex) {
    const racer = document.createElement('div');
    racer.className = 'racer';
    racer.dataset.id = member.id;

    // Calculate horizontal position based on points (left to right)
    const position = calculateHorizontalPosition(member.points);
    racer.style.left = `${position}%`;

    // Add animation delay for staggered entrance
    racer.style.animationDelay = `${laneIndex * CONFIG.characterAnimationDelay}ms`;

    // Add winner class if reached finish
    if (member.points >= CONFIG.maxPoints) {
        racer.classList.add('winner');
    }

    // Create avatar
    const avatar = document.createElement('img');
    avatar.src = member.avatar;
    avatar.alt = member.nama;
    avatar.className = 'racer-avatar';
    avatar.onerror = () => {
        // Fallback if image doesn't exist
        avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.nama)}&background=ff6b9d&color=fff&size=200&bold=true`;
    };

    // Create badge showing points
    const badge = document.createElement('div');
    badge.className = 'racer-badge';
    badge.textContent = member.points;

    // Create name tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'racer-name-tooltip';
    tooltip.textContent = member.nama;

    // Assemble racer
    racer.appendChild(avatar);
    racer.appendChild(badge);
    racer.appendChild(tooltip);

    // Add click handler
    racer.addEventListener('click', () => showCharacterModal(member));

    return racer;
}

// ========================================
// HORIZONTAL POSITIONING CALCULATION
// ========================================
function calculateHorizontalPosition(points) {
    // Calculate progress (0.0 to 1.0)
    const progress = Math.min(points / CONFIG.maxPoints, 1.0);

    // Calculate left position (horizontal movement)
    const left = CONFIG.startPosition +
        (progress * (CONFIG.endPosition - CONFIG.startPosition));

    return left;
}

// ========================================
// MODAL INTERACTIONS
// ========================================
function setupModalHandlers() {
    const modal = document.getElementById('character-modal');
    const closeBtn = document.getElementById('modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    // Close handlers
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function showCharacterModal(member) {
    const modal = document.getElementById('character-modal');

    // Populate modal content
    document.getElementById('modal-avatar').src = member.avatar;
    document.getElementById('modal-avatar').alt = member.nama;
    document.getElementById('modal-name').textContent = member.nama;

    // Set progress badge
    const badge = document.getElementById('modal-badge');
    const progressStatus = getProgressStatus(member.points);
    badge.textContent = progressStatus.label;
    badge.className = `modal-progress-badge ${progressStatus.class}`;

    // Render submissions
    const submissionsList = document.getElementById('modal-submissions');
    const noSubmissions = document.getElementById('no-submissions');

    if (member.submissions && member.submissions.length > 0) {
        submissionsList.innerHTML = member.submissions.map(submission => `
            <div class="submission-item">
                <div class="submission-header">
                    <div class="submission-title">${submission.judul}</div>
                    <span class="submission-type ${submission.jenis.toLowerCase()}">${submission.jenis}</span>
                </div>
            </div>
        `).join('');
        submissionsList.style.display = 'flex';
        noSubmissions.style.display = 'none';
    } else {
        submissionsList.style.display = 'none';
        noSubmissions.style.display = 'block';
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeModal() {
    const modal = document.getElementById('character-modal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

function getProgressStatus(points) {
    if (points >= CONFIG.maxPoints) {
        return { label: '🏆 FINISH!', class: 'finish' };
    } else if (points === 1) {
        return { label: '⚡ PROGRESS', class: 'middle' };
    } else {
        return { label: '🚀 START', class: 'start' };
    }
}

// ========================================
// STATISTICS
// ========================================
function updateStatistics() {
    const totalRacers = teamData.length;
    const totalSubmissions = teamData.reduce((sum, member) => sum + member.points, 0);
    const finishedRacers = teamData.filter(member => member.points >= CONFIG.maxPoints).length;

    // Animate counter
    animateCounter('total-racers', totalRacers);
    animateCounter('total-submissions', totalSubmissions);
    animateCounter('finished-racers', finishedRacers);
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const duration = 1000; // 1 second
    const steps = 30;
    const stepValue = targetValue / steps;
    const stepDuration = duration / steps;

    let currentValue = 0;
    const interval = setInterval(() => {
        currentValue += stepValue;
        if (currentValue >= targetValue) {
            element.textContent = targetValue;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, stepDuration);
}

// ========================================
// SAMPLE DATA GENERATOR (Fallback)
// ========================================
function generateSampleData() {
    const names = [
        'Andi', 'Budi', 'Citra', 'Dian', 'Eka',
        'Fajar', 'Gita', 'Hadi', 'Indah', 'Joko'
    ];

    const sampleSubmissions = [
        { judul: 'Optimasi Fuel Truck Loading', jenis: 'QCP' },
        { judul: 'Digitalisasi Logsheet Harian', jenis: 'SS' },
        { judul: 'Perbaikan SOP Maintenance', jenis: 'QCC' },
        { judul: 'Efisiensi Waktu Loading', jenis: 'SS' },
        { judul: 'Redesign Safety Checklist', jenis: 'QCP' },
    ];

    return names.map((nama, index) => {
        const points = Math.floor(Math.random() * 3); // 0, 1, or 2 points
        const submissions = [];

        // Add random submissions based on points
        for (let i = 0; i < points; i++) {
            submissions.push(sampleSubmissions[Math.floor(Math.random() * sampleSubmissions.length)]);
        }

        return {
            id: index + 1,
            nama: nama,
            avatar: `assets/char${index + 1}.png`,
            points: points,
            submissions: submissions
        };
    });
}
