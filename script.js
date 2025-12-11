// Şehirlerin Koordinat Listesi (Latitude, Longitude)
const cities = {
    'Istanbul': { lat: 41.0082, lon: 28.9784 },
    'Ankara':   { lat: 39.9334, lon: 32.8597 },
    'Izmir':    { lat: 38.4192, lon: 27.1287 },
    'Antalya':  { lat: 36.8841, lon: 30.7056 },
    'London':   { lat: 51.5074, lon: -0.1278 },
    'Berlin':   { lat: 52.5200, lon: 13.4050 },
    'Tokyo':    { lat: 35.6895, lon: 139.6917 }
};

// WMO Hava Durumu Kodları Sözlüğü (Türkçeleştirme)
const weatherCodes = {
    0:  { label: 'Güneşli / Açık', icon: '☀️' },
    1:  { label: 'Az Bulutlu', icon: '🌤️' },
    2:  { label: 'Parçalı Bulutlu', icon: '⛅' },
    3:  { label: 'Kapalı / Bulutlu', icon: '☁️' },
    45: { label: 'Sisli', icon: '🌫️' },
    48: { label: 'Kırağı / Sis', icon: '🌫️' },
    51: { label: 'Hafif Çiseleme', icon: '🌧️' },
    53: { label: 'Çiseleme', icon: '🌧️' },
    61: { label: 'Hafif Yağmur', icon: '🌧️' },
    63: { label: 'Yağmur', icon: '🌧️' },
    65: { label: 'Şiddetli Yağmur', icon: '⛈️' },
    71: { label: 'Hafif Kar', icon: '🌨️' },
    73: { label: 'Kar Yağışlı', icon: '🌨️' },
    75: { label: 'Yoğun Kar', icon: '❄️' },
    95: { label: 'Fırtına', icon: '⚡' }
};

async function getWeather() {
    const citySelect = document.getElementById('citySelect');
    const selectedCity = citySelect.value;
    
    // UI Elementleri
    const display = document.getElementById('weatherDisplay');
    const loading = document.getElementById('loadingText');

    if (!selectedCity) {
        alert("Lütfen listeden bir şehir seçiniz!");
        return;
    }

    // Yükleniyor animasyonu
    display.style.display = 'none';
    loading.style.display = 'block';

    const coords = cities[selectedCity];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const current = data.current_weather;

        // Kod çözümleme (Varsayılan: Bilinmiyor)
        const codeInfo = weatherCodes[current.weathercode] || { label: 'Bilinmiyor', icon: '❓' };

        // HTML'i doldur
        document.getElementById('temp').innerText = `${current.temperature}°C`;
        document.getElementById('wind').innerText = `💨 Rüzgar: ${current.windspeed} km/s`;
        document.getElementById('description').innerText = codeInfo.label; 
        document.getElementById('icon').innerText = codeInfo.icon; 

        // Sonucu göster
        loading.style.display = 'none';
        display.style.display = 'block';

    } catch (error) {
        console.error(error);
        loading.style.display = 'none';
        alert("Hava durumu alınırken hata oluştu.");
    }
}
