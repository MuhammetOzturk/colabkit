// media.js

class MediaManager {
    constructor() {

        this.video = document.createElement('video');
        this.video.id = 'video';
        this.video.autoplay = true;
        this.video.playsInline = true;
        this.video.style.display = 'none';
        this.video.style.width = '480px';
        this.video.style.border = '2px solid #333';
        this.video.style.borderRadius = '10px';
        this.video.style.marginTop = '10px';
        document.body.appendChild(this.video);

        this.stream = null;
        this.currentDeviceId = null;
        this.deviceChangeCallback = null;
    }

    // Kamerayı başlat
    async startCamera(deviceId = null, display = 'block') {
        try {
            const constraints = {
                video: deviceId ? { deviceId: { exact: deviceId } } : true,
                audio: false
            };

            this.stopCamera();

            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.style.display = display
            this.video.srcObject = this.stream;

            const track = this.stream.getVideoTracks()[0];
            this.currentDeviceId = track.getSettings().deviceId;

            console.log("Kamera başlatıldı:", this.currentDeviceId);
        } catch (err) {
            console.error("Kamera erişimi reddedildi:", err);
        }
    }

    // Kamerayı durdur
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.video.srcObject = null;
            this.video.style.display = 'none';
            this.stream = null;
            console.log("Kamera durduruldu.");
            return "Kamera durduruldu.";
        }
        return "Akış yok!";
    }

    // Ekran görüntüsü al
    async captureFrame() {
        if (!this.video || !this.video.srcObject) {
            console.warn("Video akışı yok.");
            await new Promise(r => setTimeout(r, 3000));
        }

        if (!this.video || !this.video.srcObject) {
            console.warn("Video akışı yok.");
            return false;
        }

        const canvas = document.createElement('canvas');
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/png');
    }

    // Kullanılabilir kameraları listele
    async listCameras() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(d => d.kind === 'videoinput');
        console.table(cameras.map(c => ({ label: c.label, deviceId: c.deviceId })));
        return  JSON.stringify(cameras);
    }

    // Aktif kamerayı değiştir
    async changeCamera(deviceId) {
        if (!deviceId) {
            console.warn("Geçerli bir deviceId belirtilmelidir.");
            return "Geçerli bir deviceId belirtilmelidir.";
        }

        if (this.currentDeviceId === deviceId) {
            console.log("Zaten bu kamera aktif.");
            return "Zaten bu kamera aktif.";
        }

        console.log("Kamera değiştiriliyor:", deviceId);
        await this.startCamera(deviceId);
        console.log("Kamera degistirildi.");
        return "Kamera degistirildi.";
    }

    // Cihaz değişikliklerini izle (takma/çıkarma)
    watchDeviceChanges(callback = null) {
        this.deviceChangeCallback = callback;
        navigator.mediaDevices.ondevicechange = async () => {
            const cameras = await MediaManager.listCameras();
            console.log("Cihaz listesi güncellendi.");
            if (this.deviceChangeCallback) {
                this.deviceChangeCallback(cameras);
            }
        };
        console.log("Cihaz değişiklikleri izleniyor...");
        return "Cihaz değişiklikleri izleniyor...";
    }

    // İzlemeyi durdur
    stopWatchingDevices() {
        navigator.mediaDevices.ondevicechange = null;
        this.deviceChangeCallback = null;
        console.log("Cihaz değişikliklerini izleme durduruldu.");
        return "Cihaz değişikliklerini izleme durduruldu.";
    }
}

/* TEST
    const vm = new MediaManager();

    // Kamerayı başlat
    vm.startCamera();

    // Cihaz değişikliklerini izle
    vm.watchDeviceChanges(async (cameras) => {
        console.log("Yeni cihaz listesi:");
        cameras.forEach(c => console.log(c.label || "Bilinmeyen", c.deviceId));
    });

    // Mevcut kameraları listele
    MediaManager.listCameras().then(cameras => {
        console.log("Mevcut kameralar:");
        cameras.forEach(c => console.log(c.label || "Bilinmeyen", c.deviceId));
    });

    // 5 saniye sonra fotoğraf al
    setTimeout(() => {
        const frame = vm.captureFrame();
        if (frame) {
            const img = document.createElement('img');
            img.src = frame;
            img.style.width = frame.width;
            img.style.height = frame.height;
            img.style.marginTop = '10px';
            document.body.appendChild(img);
            console.log("Bir kare yakalandı ve ekrana eklendi.");
        }
        vm.stopCamera();
    }, 5000);
}
*/
window.MediaManager = new MediaManager();


