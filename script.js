let activities = JSON.parse(localStorage.getItem('activities')) || [];
let chartInstance = null;

function addActivity() {
    const date = document.getElementById('activity-date').value;
    const type = document.getElementById('activity-type').value;
    const duration = parseInt(document.getElementById('activity-duration').value, 10);

    if (!date || isNaN(duration)) {
        alert('Prosím, vyplňte datum a délku trvání.');
        return;
    }

    activities.push({ date, type, duration });
    localStorage.setItem('activities', JSON.stringify(activities));
    updateUI();
    updateChart(activities);
}

function updateUI() {
    let totalMinutes = activities.reduce((total, activity) => total + activity.duration, 0);
    document.getElementById('total-minutes').textContent = `${totalMinutes}/100 minut splněno`;
}

function updateChart(data) {
    const ctx = document.getElementById('activity-chart').getContext('2d');
    const labels = data.map(a => `${a.date} (${a.type})`);
    const durations = data.map(a => a.duration);

    if (chartInstance) {
        chartInstance.destroy(); // Zničíme předchozí instanci grafu
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Délka aktivity (min)',
                data: durations,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function filterActivities() {
    const type = document.getElementById('filter-type').value;
    const filteredActivities = type === 'all' ? activities : activities.filter(activity => activity.type === type);
    updateChart(filteredActivities);
}

// Inicializace
function init() {
    updateUI();
    updateChart(activities);
}

init();
