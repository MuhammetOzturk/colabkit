class Console {
    constructor() {
        // HTML terminal alanı oluştur
        this.container = document.createElement("div");
        this.container.style.backgroundColor = "black";
        this.container.style.color = "#00FF00";
        this.container.style.fontFamily = "Consolas, monospace";
        this.container.style.padding = "15px";
        this.container.style.borderRadius = "8px";
        this.container.style.marginTop = "10px";
        this.container.style.height = "250px";
        this.container.style.overflowY = "auto";
        this.container.style.boxShadow = "0 0 15px rgba(0,255,0,0.4)";
        this.container.style.textShadow = "0 0 6px #00FF00";
        this.container.style.whiteSpace = "pre-wrap";
        this.container.style.fontSize = "18px";
        this.container.style.lineHeight = "1.3em";
        this.container.id = "terminal";
        document.body.appendChild(this.container);

        // Kuyruk: Başlangıçta boş bir Promise
        this.queue = Promise.resolve();
    }

    // Typewriter efekti: Harf harf yazma
    typeLine(text, delay = 30) {
        // Her çağrıyı kuyruğa ekle
        this.queue = this.queue.then(() => new Promise((resolve) => {
            let line = document.createElement("div");
            this.container.appendChild(line);
            let i = 0;
            const interval = setInterval(() => {
                line.textContent += text.charAt(i);
                i++;
                this.container.scrollTop = this.container.scrollHeight;
                if (i >= text.length) {
                    clearInterval(interval);
                    resolve(); // işlem bittiğinde sıradakiye geç
                }
            }, delay);
        }));

        return this.queue; // İstenirse zincirleme kullanılabilir
    }

    // Normal log çıktısı
    log(text) {
        this.queue = this.queue.then(() => {
            let p = document.createElement("div");
            p.textContent = text;
            this.container.appendChild(p);
            this.container.scrollTop = this.container.scrollHeight;
        });
    }
    clear() {
        this.container.innerHTML = "";
    }
}
window.Console = new Console()
