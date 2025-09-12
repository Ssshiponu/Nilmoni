// add border bottom to header when scrolling
document.addEventListener('alpine:init', () => {
    chat = document.querySelector('#chat');
    chat.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('border-neutral-200', chat.scrollTop > 0);
        header.classList.toggle('border-white', chat.scrollTop == 0);
    });
});

function main() {
    return {
        //modal
        modal: false,
        modalContent: 'settings',

        sidebar: false,

        //API handler
        api: {
            baseUrl: 'http://ip-api.com/json/',
            async get(endpoint) {
            try {
                const res = await fetch(this.baseUrl + endpoint);
                if (!res.ok) throw new Error(`GET ${endpoint} failed`);
                return await res.json();
            } catch (err) {
                console.error(err);
                return {};
            }
            },
            async post(endpoint, data) {
            try {
                const res = await fetch(this.baseUrl + endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
                });
                if (!res.ok) throw new Error(`POST ${endpoint} failed`);
                return await res.json();
            } catch (err) {
                console.error(err);
                return {};
            }
            }
        },
    }
}

function replyActions() {
    return {
        copy: false,
        like: false,
        dislike: false,
        copied() {
            this.copy = true;
            setTimeout(() => {
                this.copy = false;
            }, 3000);
        }
    }
}