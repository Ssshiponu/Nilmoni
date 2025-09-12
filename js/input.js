function input() {
    return {
        prompt: '',
        files: [],
        tools: [
        { id: 'create-image', name: 'Take Exam', icon: 'graduation-cap' },
        { id: 'summarize', name: 'Teach me', icon: 'book-open-text' },
        { id: 'translate', name: 'Summarize', icon: 'text' }
        ],
        selectedTool: null,
        showTools: false,
        isLoading: false,


        addFiles(event){
            const chosen = Array.from(event.target.files || []);
            for(const f of chosen){
                if (this.files.find(file => file.name === f.name)) continue;
                if (this.files.length >= 3) {alert('You can only upload maximum 3 files'); return;};
                const isImage = f.type.startsWith('image/');
                const url = isImage ? URL.createObjectURL(f) : null;
                this.files.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2), file: f, name: f.name, url, isImage });
            }
            // reset input so choosing the same file again works
            event.target.value = '';
        },

        removeFile(index){
            const item = this.files[index];
            if(item && item.url) URL.revokeObjectURL(item.url);
            this.files.splice(index,1);
        },

    }
}