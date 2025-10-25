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
        modalContent: '',
        openModal(content) {
            modal=true;
            modalContent=content;
        },
        closeModal() {
            modal=false;
            modalContent='';
        },


        // sidebar
        sidebar: window.innerWidth >= 1024,
        closeSidebar() {
            if (window.innerWidth < 1024) {
                this.sidebar = false;
            }
        },

        // prompt cards
        cards: [
            {icon: 'pen-line', title: 'Take Exam', prompt: 'Please take a multiple choice test on this topic: ', tool: 'take-exam'},
            {icon: 'book-open-text', title: 'Teach a topic', prompt: 'Please teach me about this topic: ', tool: 'teach'},
        ],

        //API handler
        api: {
            baseUrl: 'http://127.0.0.1:8000/api/',
            async HTTPget(endpoint) {
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

        scrollToBottom() {
            const chat = document.querySelector('#chat');
            chat.scrollTo({
                top: chat.scrollHeight,
                behavior: 'smooth'
            });
        },

        // conversations
        
        conversations: [
            {
                id: 0,
                title: 'How AI works?',
                messages: [
                    {
                        id: 1,
                        role: 'user',
                        content: 'Describe how AI works',
                        status: 'completed',
                        error_message: '',
                        toolUsed: '',
                        attachments: [],
                    },
                    {
                        id: 2,
                        role: 'assistant',
                        content: `<p>Artificial intelligence (AI) encompasses a broad range of techniques and algorithms
                                    that enable machines to simulate human-like intelligence. At its core, AI works by
                                    processing vast amounts of data, identifying patterns, and making decisions or
                                    predictions based on those patterns.</p>
                                <p>Here&#39;s a simplified breakdown of how AI generally works:</p>
                                <p><strong>1. Data Collection and Preparation:</strong>
                                    The first step in any AI system is to gather relevant data. This data can come in
                                    various forms: images, text, audio, sensor readings, etc. The quality and quantity
                                    of this data are crucial for the AI&#39;s performance. Once collected, the data is
                                    preprocessed, which involves cleaning, transforming, and formatting it to be
                                    suitable for the AI model.</p>
                                <p><strong>2. Algorithm Selection and Model Training:</strong>
                                    Different AI tasks require different algorithms. For example, if you want an AI to
                                    recognize objects in images, you might use a convolutional neural network (CNN). If
                                    you&#39;re building a system to predict stock prices, you might use a recurrent
                                    neural network (RNN) or a regression model.</p>
                                <p>During the &quot;training&quot; phase, the chosen algorithm is fed the prepared data.
                                    The algorithm then learns from this data by adjusting its internal parameters
                                    (weights and biases) to minimize errors in its predictions or classifications.
                                    It&#39;s like a student learning from examples – the more examples it sees, and the
                                    more feedback it gets on its mistakes, the better it becomes.</p>
                                <p>For instance, if you&#39;re training an AI to identify cats, you&#39;d show it
                                    thousands of images labeled &quot;cat&quot; and &quot;not cat.&quot; The AI would
                                    gradually learn to identify features associated with cats.</p>
                                <p><strong>3. Model Evaluation:</strong>
                                    After training, the AI model needs to be evaluated to see how well it performs on
                                    new, unseen data. This is crucial to ensure that the model hasn&#39;t simply
                                    memorized the training data but has truly learned generalizable patterns. If the
                                    model performs poorly on new data, it might need further training, more data, or a
                                    different algorithm.</p>
                                <p><strong>4. Deployment and Inference:</strong>
                                    Once the model is trained and evaluated, it can be deployed for real-world use. In
                                    this &quot;inference&quot; phase, the AI model receives new input data (e.g., a new
                                    image, a new voice command) and uses its learned patterns to make predictions,
                                    classifications, or decisions in real-time.</p>
                                <p><strong>Key Concepts in AI:</strong></p>
                                <ul>
                                    <li><strong>Machine Learning (ML):</strong> A subset of AI that focuses on building
                                        systems that learn from data without being explicitly programmed. This is where
                                        most of the &quot;learning&quot; happens.</li>
                                    <li><strong>Deep Learning (DL):</strong> A subfield of machine learning that uses
                                        artificial neural networks with multiple layers (hence &quot;deep&quot;) to
                                        learn complex patterns. Deep learning has been particularly successful in areas
                                        like image recognition, natural language processing, and speech recognition.
                                    </li>
                                    <li><strong>Neural Networks:</strong> Inspired by the human brain, these are
                                        interconnected layers of &quot;neurons&quot; that process information. Each
                                        connection has a weight, and during training, these weights are adjusted to
                                        optimize the network&#39;s output.</li>
                                    <li><strong>Natural Language Processing (NLP):</strong> Enables computers to
                                        understand, interpret, and generate human language.</li>
                                    <li><strong>Computer Vision:</strong> Allows computers to &quot;see&quot; and
                                        interpret visual information from images and videos.</li>
                                </ul>`,
                        status: 'completed',
                        error_message: '',
                        toolUsed: '',
                        attachments: [],
                    },
                    {
                        id: 3,
                        role: 'user',
                        content: 'What is AI?',
                        status: 'completed',
                        error_message: '',
                        toolUsed: '',
                        attachments: [],
                    },
                    {
                        id: 4,
                        role: 'assistant',
                        content: `<p>Artificial Intelligence (AI) is a broad field of computer science that focuses on
                                creating intelligent machines that can perform tasks that typically require human
                                intelligence. AI systems can learn from data, recognize patterns, and make decisions
                                based on that data.</p>
                                `,
                        
                        status: 'completed',
                        error_message: '',
                        toolUsed: '',
                        attachments: [],
                    }

                ]
            },
            {
                id: 1,
                title: 'Purpose of human',
                messages: [
                    {
                        id: 1,
                        role: 'user',
                        content: 'What is the purpose of being human?',
                        status: 'completed',
                        error_message: '',
                        toolUsed: '',
                        attachments: [],
                    },
                    {
                        id: 2,
                        role: 'assistant',
                        content: `<p>That is one of the most profound and enduring questions of human existence. For millennia, philosophers, theologians, scientists, and artists have grappled with it, and there is no single, universally accepted answer.</p>
                                <p>Instead of one answer, there are many powerful frameworks for thinking about it. The purpose of being human can be seen as something we are <strong>given</strong>, something we <strong>discover</strong>, or something we <strong>create</strong>.</p>
                                <p>Here’s a breakdown of the major perspectives on this question.</p>
                                <hr>
                                <h3 id="1-religious-and-spiritual-perspectives-purpose-is-given">1. Religious and Spiritual Perspectives: Purpose is Given</h3>
                                <p>In most spiritual traditions, human purpose is defined by a higher power or a cosmic order. It is an external truth that we are meant to align ourselves with.</p>
                                <ul>
                                <li><strong>Abrahamic Religions (Christianity, Islam, Judaism):</strong> The primary purpose is to know, love, and serve God. This involves living according to divine commandments, showing compassion to others, and preparing for an afterlife. The purpose is to fulfill a role in a divine plan.</li>
                                <li><strong>Eastern Religions (Buddhism, Hinduism):</strong> The purpose is to achieve enlightenment and break free from a cycle of suffering and rebirth.<ul>
                                <li>In <strong>Hinduism</strong>, the goal is to achieve <em>Moksha</em> (liberation) by understanding one&#39;s true self (<em>Atman</em>) and its connection to the ultimate reality (<em>Brahman</em>), often by fulfilling one&#39;s <em>Dharma</em> (duty).</li>
                                <li>In <strong>Buddhism</strong>, the purpose is to end suffering by eliminating desire and attachment, ultimately reaching a state of <em>Nirvana</em>.</li>
                                </ul>
                                </li>
                                <li><strong>Taoism:</strong> The purpose is to live in harmony with the <em>Tao</em>—the natural, flowing order of the universe. This involves simplicity, spontaneity, and acting in accordance with nature.</li>
                                </ul>
                                <hr>
                                <h3 id="2-philosophical-perspectives-purpose-is-discovered-or-created">2. Philosophical Perspectives: Purpose is Discovered or Created</h3>
                                <p>Philosophy offers diverse answers, many of which place the responsibility for meaning on the individual.</p>
                                <ul>
                                <li><strong>Aristotle and Eudaimonia:</strong> For the ancient Greek philosopher Aristotle, the purpose of a human is to achieve <em>Eudaimonia</em>, which translates to &quot;human flourishing&quot; or &quot;a life well-lived.&quot; This is achieved by cultivating virtues (like courage, wisdom, and justice) and using reason to its fullest extent. The purpose isn&#39;t just to feel good, but to <em>be</em> good and live a life of excellence.</li>
                                <li><strong>Existentialism (Jean-Paul Sartre, Albert Camus):</strong> This school of thought famously claims that <strong>&quot;existence precedes essence.&quot;</strong> This means you are born without a pre-ordained purpose. You are radically free, and your purpose is to <em>create your own meaning</em> through your choices, actions, and commitments. To an existentialist, asking &quot;what is the purpose of a human?&quot; is the wrong question. The right question is, &quot;What purpose will I give to my life?&quot;</li>
                                <li><strong>Stoicism (Marcus Aurelius, Seneca):</strong> The purpose is to live a life of virtue and tranquility by focusing only on what you can control (your own thoughts and actions) and accepting what you cannot. The goal is inner peace and resilience, regardless of external circumstances.</li>
                                <li><strong>Nihilism:</strong> This is the philosophical position that life has no inherent meaning, purpose, or value. While this can sound bleak, some find a strange freedom in it—if nothing matters, then you are completely free to live as you choose without the burden of fulfilling a cosmic destiny.</li>
                                </ul>
                                <hr>
                                <h3 id="3-biological-and-scientific-perspectives-purpose-is-functional">3. Biological and Scientific Perspectives: Purpose is Functional</h3>
                                <p>From a purely scientific standpoint, &quot;purpose&quot; is viewed through a functional, not a metaphysical, lens.</p>
                                <ul>
                                <li><strong>Evolutionary Biology:</strong> The purpose of any living organism, including a human, is to survive and reproduce. We are vehicles for our genes, driven by an imperative to pass them on to the next generation. Our complex brains, emotions, and social structures are all tools that have evolved to serve this fundamental biological goal.</li>
                                <li><strong>A Cosmic Perspective (Carl Sagan):</strong> Some scientists find a more poetic purpose. As conscious beings capable of reason and observation, we are the universe&#39;s way of knowing itself. Carl Sagan famously said, <strong>&quot;We are a way for the cosmos to know itself.&quot;</strong> Our purpose, then, is to learn, to explore, to understand, and to bear witness to the wonder of existence.</li>
                                </ul>
                                <hr>
                                <h3 id="4-humanistic-and-psychological-perspectives-purpose-is-found-in-self-actualization-and-connection">4. Humanistic and Psychological Perspectives: Purpose is Found in Self-Actualization and Connection</h3>
                                <p>These perspectives focus on the human experience and potential.</p>
                                <ul>
                                <li><strong>Humanism:</strong> The purpose of life is to live a happy, fulfilling, and ethical life, and to contribute to the greater good of humanity. It emphasizes reason, compassion, and our shared responsibility for each other and the planet.</li>
                                <li><strong>Logotherapy (Viktor Frankl):</strong> A Holocaust survivor, Frankl argued that the primary drive in humans is not pleasure but the &quot;will to meaning.&quot; He believed we can find purpose in three ways:<ol>
                                <li><strong>By creating a work or doing a deed:</strong> Contributing something to the world.</li>
                                <li><strong>By experiencing something or encountering someone:</strong> Through love, connection, and appreciating beauty.</li>
                                <li><strong>By the attitude we take toward unavoidable suffering:</strong> Finding meaning even in the most difficult circumstances.</li>
                                </ol>
                                </li>
                                </ul>
                                <h3 id="so-what-is-the-purpose-">So, what is the purpose?</h3>
                                <p>As you can see, there is no single answer. Perhaps the most empowering conclusion is that the purpose of being human is a question you get to answer for yourself.</p>
                                <p>It might not be a single thing, but a combination of many:</p>
                                <ul>
                                <li><strong>To experience:</strong> To feel joy, love, and even sadness. To be present and aware.</li>
                                <li><strong>To connect:</strong> To form bonds with others, to love, and to build communities.</li>
                                <li><strong>To grow:</strong> To learn, to overcome challenges, and to become a better version of yourself.</li>
                                <li><strong>To contribute:</strong> To leave the world a little better than you found it, whether through your work, your kindness, or your children.</li>
                                </ul>
                                <p>Perhaps the purpose of being a human isn&#39;t a destination to be found, but a path to be walked, a meaning to be built with every choice you make.</p>
                                `,
                        status: 'completed',
                        error_message: '',
                        toolUsed: '',
                        attachments: [],
                    },

                ]
            }
        ],
        selectedConversation: null,
        currentMessages() {
            const selectedConversationMessages = this.conversations.find(conversation => conversation.id === this.selectedConversation)?.messages;
            return selectedConversationMessages ? selectedConversationMessages : [];
        },
        hasMessages() {
            return this.currentMessages.length > 0;
        },
        addUserMessage(prompt, toolUsed, attachments) {
            if (this.prompt === '') return;

            const conversation = this.conversations.find(
                c => c.id === this.selectedConversation
            );

            if (conversation === undefined) {
                const uuid = crypto.randomUUID();
                console.log(uuid);

                const newConversation = {
                    id: uuid,
                    title: 'New Conversation',
                    messages: []
                };

                this.conversations.push(newConversation);
                this.selectedConversation = uuid;

                newConversation.messages.push({
                    id: crypto.randomUUID(),
                    role: 'user',
                    content: prompt,
                    status: 'completed',
                    error_message: '',
                    toolUsed,
                    attachments,
                });
            } else {
                conversation.messages.push({
                    id: crypto.randomUUID(),
                    role: 'user',
                    content: prompt,
                    status: 'completed',
                    error_message: '',
                    toolUsed,
                    attachments,
                });
            }
        },
        addAssistantMessage(message, uuid=null) {
            const conversation = this.conversations.find(
                c => c.id === this.selectedConversation
            );
            if (uuid !== null) {
                conversation.messages.find(m => m.id === uuid).content += message;
                return uuid;
            } else {
                uuid = crypto.randomUUID();
                conversation.messages.push({
                    id: uuid,
                    role: 'assistant',
                    content: message,
                    status: 'completed',
                    error_message: '',
                    toolUsed: '',
                    attachments: [],
                });
            }
                
            return uuid;
        },

        // input
        prompt: '',
        files: [],
        tools: [
            { id: 'take-exam', name: 'Take Exam', icon: 'graduation-cap' },
            { id: 'teach', name: 'Teach me', icon: 'book-open-text' },
            { id: 'summarize', name: 'Summarize', icon: 'text' },
            { id: 'q&a', name: 'q & a', icon: 'message-circle-question-mark' },
        ],
        selectedTool: null,
        showTools: false,
        isLoading: false,
        isTyping: false,


        addFiles(event){
            const chosen = Array.from(event.target.files || []);
            for(const f of chosen){
                if (this.files.find(file => file.name === f.name)) continue;
                if (this.files.length >= 3) {this.modal=true; this.modalContent='upload-alert'; return;};
                const isImage = f.type.startsWith('image/');
                const url = isImage ? URL.createObjectURL(f) : null;
                const name = f.name.length > 20 ? f.name.substring(0, 17) + '...' : f.name;
                this.files.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2), file: f, name: name, url, isImage });
            }
            // reset input so choosing the same file again works
            event.target.value = '';
        },

        removeFile(index){
            const item = this.files[index];
            if(item && item.url) URL.revokeObjectURL(item.url);
            this.files.splice(index,1);
        },

        async submitPrompt() {
            if (this.prompt.trim() === '') return;
            if (this.isLoading) return;
            
            this.addUserMessage(this.prompt, this.selectedTool, this.files);
            const promptToSend = this.currentMessages().map(m => m.content).join('|||');

            this.prompt = '';
            this.files = [];
            this.showTools = false;
            this.selectedTool = null;

            this.isLoading = true;
            this.$nextTick(() => {
                this.scrollToBottom();
                this.prompt = '';
                document.querySelector('#prompt').focus();
            });

            setTimeout(async () => {
                this.isTyping = true;
                this.isLoading = false;
                const message = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime exercitationem qui recusandae hic distinctio veniam iusto accusantium rerum sequi, molestiae praesentium expedita fuga aut nobis delectus suscipit id ut cupiditate sint nemo reprehenderit? Illum cumque cupiditate corporis nisi et quo ratione, nam atque ut quaerat facere nostrum illo quod expedita deserunt quos voluptatibus modi hic natus soluta, maiores distinctio impedit accusantium? Sequi maxime quae inventore ut repellendus consectetur quaerat quisquam velit quasi, corrupti voluptatum exercitationem, tempora temporibus obcaecati perferendis illo saepe nam at, possimus asperiores voluptate numquam tempore. Vitae, quae ipsa. Voluptatibus delectus voluptas suscipit molestias maiores sunt est ea."
                const messageParts = message.split(' ');
                const uuid = this.addAssistantMessage(messageParts[0]);
                let i=1;
                const interval = setInterval(() => {
                    const part = messageParts[i];
                    if (part === undefined) {
                        this.isTyping = false;
                        clearInterval(interval);
                        return;
                    }
                    document.querySelector("#generateButton").addEventListener('click', () => {
                        this.isTyping = false;
                        clearInterval(interval);
                    });
                    // append message
                    this.addAssistantMessage(' ' + part, uuid);
                    i++;
                }, 50);
            }, 1500);
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


function getFileColor(fileType) {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return 'bg-red-500'; // Example: Red for PDF
    case 'doc':
    case 'docx':
      return 'bg-blue-500'; // Example: Blue for Word documents
    case 'xls':
    case 'xlsx':
      return 'bg-green-500'; // Example: Green for Excel spreadsheets
    case 'ppt':
    case 'pptx':
      return 'bg-orange-500'; // Example: Orange for PowerPoint presentations
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'bg-purple-500'; // Example: Purple for image files
    case 'zip':
    case 'rar':
      return 'bg-gray-500'; // Example: Gray for archive files
    case 'txt':
      return 'bg-yellow-500'; // Example: Yellow for text files
    case 'js':
    case 'html':
    case 'css':
      return 'bg-indigo-500'; // Example: Indigo for code files
    default:
      return 'bg-gray-400'; // Default background color for unknown file types
  }
}

function getFileIcon(fileType) {
  // Use a map for a clean and efficient lookup.
  const iconMap = {
    // Documents and text files
    'pdf': 'file-text',
    'doc': 'file-text',
    'docx': 'file-text',
    'txt': 'file-text',
    'md': 'file-text',
    'csv': 'file-spreadsheet',
    'xls': 'file-spreadsheet',
    'xlsx': 'file-spreadsheet',

    // Code and developer files
    'js': 'file-code',
    'jsx': 'file-code',
    'ts': 'file-code',
    'tsx': 'file-code',
    'json': 'file-json',
    'html': 'file-code',
    'css': 'file-code',
    'scss': 'file-code',
    'py': 'file-code',
    'php': 'file-code',
    'sh': 'file-terminal',

    // Images
    'jpg': 'file-image',
    'jpeg': 'file-image',
    'png': 'file-image',
    'gif': 'file-image',
    'svg': 'file-image',

    // Audio and video
    'mp3': 'file-music',
    'wav': 'file-music',
    'mp4': 'file-video',
    'mov': 'file-video',

    // Compressed archives
    'zip': 'file-archive',
    'rar': 'file-archive',
    'tar': 'file-archive',
    
    // Default for unrecognized files
    'default': 'file'
  };

  const type = fileType.toLowerCase();

  return iconMap[type] || iconMap['default'];
}