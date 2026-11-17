export const translations = {
  vi: {
    name: "Nguyễn Minh Huy",
    nav: {
      projects: "Dự án",
      skills: "Chuyên môn",
      about: "Về tôi",
      contact: "Liên hệ"
    },
    hero: {
      status: "Cởi mở với dự án phù hợp",
      subtitle: "Tôi xây hệ thống web fullstack với .NET và Next.js, và ghép AI vào những sản phẩm đang chạy.",
      viewWork: "Xem dự án",
      role: "Fullstack Developer"
    },
    site: {
      location: "TP. Hồ Chí Minh, VN",
      scroll: "Cuộn xuống",
      contactCta: "Trao đổi dự án",
      labels: {
        about: "Về tôi",
        work: "Dự án",
        expertise: "Chuyên môn",
        contact: "Liên hệ"
      },
      stackGroups: {
        core: "Nền tảng chính",
        realtime: "AI & RAG",
        data: "Dữ liệu & Lưu trữ",
        ops: "Kiểm thử, Bảo mật & Tự động hoá"
      },
      viewCase: "Xem chi tiết",
      allProjects: "Tất cả dự án",
      selected: "Tuyển chọn",
      ndaNote: "Một phần công nghệ ở trên đến từ các dự án nội bộ của công ty, thuộc phạm vi bảo mật nên không có case study công khai. Tôi sẵn sàng trao đổi chi tiết về cách tiếp cận trong buổi nói chuyện trực tiếp."
    },
    skills: {
      title: "Công nghệ sử dụng",
      core: ["C#", "ASP.NET Core", "TypeScript", "React", "Next.js", "Node.js", "Python"],
      realtime: ["RAG Pipeline", "Vector Embeddings", "Qdrant", "Chunking", "QLoRA / LoRA", "Semantic Kernel", "SignalR"],
      data: ["SQL Server", "PostgreSQL", "MongoDB", "Redis", "Qdrant Vector DB"],
      ops: ["Playwright", "Cypress", "Gherkin / BDD", "OWASP Top 10", "Paramiko / Netmiko", "Docker", "CI/CD"]
    },
    services: {
      title: "Tôi làm gì",
      items: [
        { name: "Fullstack Development", description: "Xây dựng ứng dụng từ backend .NET/Node tới frontend Next.js, dùng chung một mô hình dữ liệu và một bộ quy ước." },
        { name: "Tích hợp AI & RAG", description: "Xây dựng pipeline RAG toàn diện: chiến lược chunking tối ưu ngữ cảnh, vector embeddings với Qdrant, Semantic Kernel và fine-tune mô hình nhỏ bằng LoRA/QLoRA; kết nối realtime qua SignalR." },
        { name: "Automation & Testing", description: "Đặc tả hành vi chuẩn BDD với Gherkin, tự động hoá kiểm thử E2E với Cypress và Playwright; tự động hoá tác vụ mạng và hạ tầng máy chủ qua Paramiko / Netmiko." },
        { name: "API Development", description: "REST API có phiên bản, phân trang và cách trả lỗi nhất quán; tài liệu hoá để người khác dùng được mà không phải hỏi." },
        { name: "Database & Performance", description: "Thiết kế lược đồ cho SQL Server, PostgreSQL, MongoDB và vector database; tối ưu Core Web Vitals, chỉ mục truy vấn và cache Redis." },
        { name: "Security & OWASP", description: "Bảo mật ứng dụng chuẩn OWASP Top 10: xác thực JWT/OAuth2, phân quyền chặt chẽ, kiểm tra khử độc đầu vào, phòng chống SQLi, XSS, SSRF và chống rò rỉ dữ liệu qua API." }
      ]
    },
    portfolio: {
      title: "Dự án tâm đắc",
      featured: "Dự án tiêu biểu",
      projects: [
        {
          id: "unagi",
          title: "UNAGI – Chat realtime & trợ lý RAG cho website đồ ăn Nhật",
          description: "Tôi làm luồng chat realtime SignalR và giao diện chat cho website đồ ăn Nhật của một thương hiệu F&B.",
          longDescription: "Tôi dựng luồng realtime trên SignalR, làm giao diện chat, rồi ghép trợ lý RAG vào khung chat đó. Trợ lý phân loại ý định khách, trả lời từ dữ liệu thực đơn và tự chuyển cho nhân viên khi câu hỏi vượt phạm vi; phần còn lại của website do người khác trong nhóm làm.",
          tech: ["Next.js", "React", ".NET", "SignalR", "MongoDB", "Redis", "Docker"],
          highlights: [
            {
              title: "Một khung chat, hai người trả lời",
              description: "Bot và nhân viên dùng chung một kết nối SignalR, hội thoại không đứt khi chuyển giao."
            },
            {
              title: "Định tuyến theo ý định",
              description: "Fast classifier phân câu hỏi thành sản phẩm, nhà hàng, khuyến mãi hay đơn hàng; confidence thấp thì đẩy sang nhân viên."
            },
            {
              title: "Trả lời kèm thẻ món ăn",
              description: "RAG lấy ngữ cảnh từ thực đơn và trả về Product Card bấm được để đặt ngay trong khung chat."
            }
          ],
          link: "https://unagi.vn",
          github: "#",
          image: "/projects/unagi-hero.png"
        },
        {
          id: "bddwriter",
          title: "BDDWriter – Sinh kịch bản Gherkin và mã Cypress bằng LLM tự host",
          description: "Khoá luận tốt nghiệp: User Story → kịch bản Gherkin → mã kiểm thử Cypress, chạy trên hai mô hình tự host.",
          longDescription: "BDDWriter chạy hai chặng: StarCoderBase-1B fine-tune bằng LoRA biến User Story thành kịch bản Gherkin chuẩn Given – When – Then, rồi Qwen2.5-Coder-1.5B nhận kịch bản đó kèm HTML của trang để sinh mã Cypress chạy được. Cả hai mô hình đều tự host; tôi làm phần huấn luyện, đánh giá và ứng dụng web — khoá luận nhóm ba người tại ĐH Công Thương TP.HCM, 12/2025.",
          tech: ["Python", "StarCoderBase-1B", "Qwen2.5-Coder-1.5B", "LoRA / PEFT", "Gherkin / BDD", "Cypress", "Node.js"],
          highlights: [
            {
              title: "Fine-tune mô hình nhỏ thay vì gọi mô hình lớn",
              description: "LoRA chỉ thêm ma trận hạng thấp vào vài layer nên huấn luyện được trên phần cứng hạn chế, và dữ liệu nghiệp vụ không gửi ra ngoài."
            },
            {
              title: "Từ kịch bản sang mã Cypress chạy được",
              description: "Chặng hai nhận Gherkin kèm HTML DOM của trang, nên selector trong mã sinh ra bám vào cấu trúc thật thay vì đoán."
            },
            {
              title: "Nạp mô hình theo yêu cầu",
              description: "Hai mô hình không cùng nằm trong bộ nhớ — chặng nào chạy thì nạp mô hình của chặng đó, đủ để vừa phần cứng có sẵn."
            }
          ],
          impact: [
            "3.412 scenario từ 100 yêu cầu, 3.345 đạt cấu trúc hoàn chỉnh — khoảng 98%.",
            "Bao phủ: 2.015 kịch bản luồng thuận, 1.397 luồng lỗi.",
            "QC lead đánh giá độc lập: cú pháp và ngữ nghĩa chính xác, nhưng bao phủ chưa đủ cho tình huống đặc thù.",
            "Hạn chế: khoảng 2% scenario bị cắt do giới hạn token."
          ],
          link: "#",
          github: "#",
          image: "/projects/bddwriter-landing.jpg"
        },
        {
          id: "portfolio",
          title: "Portfolio – Cỗ máy đa vũ trụ thời gian với Next.js & GSAP",
          description: "Chính trang bạn đang xem: Trải nghiệm du hành dòng thời gian TVA/Loki với mô phỏng sóng Canvas 2D thời gian thực, chuỗi Warp Sequence bằng GSAP và song ngữ Việt–Anh.",
          longDescription: "Trang web được thiết kế như một hành trình du hành không-thời gian lấy cảm hứng từ TVA & Loki: một canvas 2D mô phỏng dòng thời gian thiêng liêng (TimeStream) với 5 trạng thái năng lượng đa vũ trụ (Sacred Gold, Multiverse Warp, God Loki Yggdrasil, Quantum Matrix, Nexus Redline). Các sợi quang học và hạt lượng tử được tính toán vật lý sóng hỗn loạn trong thời gian thực, chuyển đổi màu mượt mà bằng thuật toán nội suy lerpRgb theo từng chặng cuộn của GSAP ScrollTrigger.",
          tech: ["Next.js", "TypeScript", "GSAP ScrollTrigger", "Canvas 2D Physics", "Lenis", "Tailwind CSS", "Context API"],
          highlights: [
            {
              title: "Mô phỏng dòng thời gian TimeStream 5 trạng thái",
              description: "Canvas 2D tính toán vật lý sóng dao động (wave turbulence) và hạt lượng tử thời gian thực; tự động nội suy màu 3 chiều (lerpRgb) giữa 5 theme dòng thời gian (Sacred, Multiverse, Loki, Quantum, Nexus) theo nhịp cuộn."
            },
            {
              title: "Chuỗi hoạt cảnh Warp Sequence ghim sân khấu",
              description: "Kỹ thuật anticipatePin ghim sân khấu cố định và ánh xạ quãng cuộn thành tiến trình không gian; mỗi beat nội dung vừa kích hoạt biến đổi chủ đề không-thời gian, vừa chuyển động chiều sâu 3D."
            },
            {
              title: "Lenis Smooth Scroll đồng bộ hóa với GSAP Ticker",
              description: "Gắn vòng lặp cuộn Lenis vào gsap.ticker thay vì rAF riêng biệt, triệt tiêu hoàn toàn hiện tượng lệch pha 1 khung hình giữa hai đồng hồ vốn gây rung giật ở các đoạn ghim."
            }
          ],
          impact: [
            "Duy trì ổn định 60–120 FPS mượt mà nhờ tách biệt tầng render canvas 2D và quản lý compositor layer bằng GSAP force3D.",
            "Biến đổi tức thì 5 theme không gian và 2 ngôn ngữ với độ dịch chuyển layout bằng không (CLS = 0).",
            "Tối ưu hiệu năng Core Web Vitals tối đa thông qua vật lý thủ tục nhẹ thay vì nạp thư viện 3D WebGL nặng nề.",
            "Trải nghiệm điện ảnh khép lại bằng minh hoạ bàn tay Loki dệt dòng thời gian với nghệ thuật blend màu mix-blend-screen."
          ],
          link: "https://nguyenminhhuy-portfolio.vercel.app/",
          github: "https://github.com/Hutt1212/portfolio",
          image: "/projects/portfolio-hero.png"
        }
      ]
    },
    about: {
      title: "Về tôi",
      profession: "Fullstack Developer",
      description1: "Tôi làm fullstack và tự động hoá: .NET và Node ở backend, Next.js với TypeScript ở frontend. Tôi chú trọng kiến trúc hệ thống bền vững, tuân thủ các nguyên tắc bảo mật OWASP Top 10 và đảm bảo chất lượng phần mềm bằng kiểm thử tự động với Gherkin, Cypress và Playwright.",
      description2: "Hiện tôi làm ở bộ phận R&D của một công ty phần mềm, chuyên sâu vào việc ghép AI và tự động hoá vào sản phẩm thực tế: xây dựng luồng RAG với chiến lược chunking và vector search trên Qdrant, thử nghiệm fine-tune mô hình bằng LoRA/QLoRA, và viết kịch bản tự động hoá hạ tầng/mạng với Paramiko và Netmiko. Phần lớn dự án nằm trong phạm vi bảo mật nên không xuất hiện ở đây; những gì trưng ra là phần tôi được phép chia sẻ. Trước khi thêm một lớp phức tạp nào, tôi luôn hỏi nó giải quyết vấn đề gì và ai sẽ vận hành nó."
    },
    footer: {
      contactTitle: "Liên hệ với tôi"
    },
    projectActions: {
      visit: "Truy cập website",
      github: "Xem mã nguồn",
      techStack: "Công nghệ sử dụng"
    },
    projectDetail: {
      highlights: "Giải pháp kỹ thuật",
      impact: "Kết quả"
    }
  },
  en: {
    name: "Nguyen Minh Huy",
    nav: {
      projects: "Projects",
      skills: "Expertise",
      about: "About",
      contact: "Contact"
    },
    hero: {
      status: "Open to the right projects",
      subtitle: "I build fullstack web systems with .NET and Next.js, and wire AI into products that are already running.",
      viewWork: "View Work",
      role: "Fullstack Developer"
    },
    site: {
      location: "Ho Chi Minh City, VN",
      scroll: "Scroll down",
      contactCta: "Talk about a project",
      labels: {
        about: "About",
        work: "Work",
        expertise: "Expertise",
        contact: "Contact"
      },
      stackGroups: {
        core: "Core",
        realtime: "AI & RAG",
        data: "Data & Storage",
        ops: "Testing, Security & Automation"
      },
      viewCase: "View case",
      allProjects: "All projects",
      selected: "Selected",
      ndaNote: "Some of the tools above come from internal company work that is under NDA, so there is no public case study for it. I am happy to talk through the approach in a conversation."
    },
    skills: {
      title: "Tools I use",
      core: ["C#", "ASP.NET Core", "TypeScript", "React", "Next.js", "Node.js", "Python"],
      realtime: ["RAG Pipeline", "Vector Embeddings", "Qdrant", "Chunking", "QLoRA / LoRA", "Semantic Kernel", "SignalR"],
      data: ["SQL Server", "PostgreSQL", "MongoDB", "Redis", "Qdrant Vector DB"],
      ops: ["Playwright", "Cypress", "Gherkin / BDD", "OWASP Top 10", "Paramiko / Netmiko", "Docker", "CI/CD"]
    },
    services: {
      title: "What I work on",
      items: [
        { name: "Fullstack Development", description: "Applications end to end, from a .NET or Node backend to a Next.js frontend, sharing one data model and one set of conventions." },
        { name: "AI & RAG Pipelines", description: "End-to-end RAG pipelines: context-aware chunking strategies, vector embeddings with Qdrant, Semantic Kernel, and parameter-efficient fine-tuning via LoRA/QLoRA; real-time conversational streaming over SignalR." },
        { name: "Automation & Testing", description: "BDD specifications with Gherkin, automated end-to-end testing with Cypress and Playwright; automated remote server and network device operations using Paramiko and Netmiko." },
        { name: "API Development", description: "Versioned REST APIs with consistent pagination and error shapes, documented well enough that nobody has to ask me how they work." },
        { name: "Database & Performance", description: "Schema design across SQL Server, PostgreSQL, MongoDB, and vector databases; profiling Core Web Vitals, database indexes, and Redis caching." },
        { name: "Security & OWASP", description: "Application security grounded in OWASP Top 10: robust JWT/OAuth2 authentication, strict role-based access control, input sanitization against injection/XSS/SSRF, and preventing sensitive data exposure via APIs." }
      ]
    },
    portfolio: {
      title: "Featured Project",
      featured: "Featured Work",
      projects: [
        {
          id: "unagi",
          title: "UNAGI – Real-time chat & RAG assistant for a Japanese food site",
          description: "I built the real-time SignalR chat flow and its interface for an F&B brand's Japanese food ordering site.",
          longDescription: "I built the real-time flow on SignalR and its chat interface, then wired a RAG assistant into that window. The assistant classifies customer intent, answers from the menu data and hands off to a human when a question falls outside its scope; the rest of the site was handled by others on the team.",
          tech: ["Next.js", "React", ".NET", "SignalR", "MongoDB", "Redis", "Docker"],
          highlights: [
            {
              title: "One chat window, two kinds of responder",
              description: "Bot and staff share a single SignalR connection, and the conversation does not break at handover."
            },
            {
              title: "Routing by intent",
              description: "A fast classifier sorts questions into products, restaurant info, promotions or orders; low confidence escalates to a human."
            },
            {
              title: "Answers that come with the dish",
              description: "RAG pulls context from the menu data and returns clickable Product Cards, so an order can start inside the chat."
            }
          ],
          link: "https://unagi.vn",
          github: "#",
          image: "/projects/unagi-hero.png"
        },
        {
          id: "bddwriter",
          title: "BDDWriter – Gherkin scenarios and Cypress code from self-hosted LLMs",
          description: "Final-year thesis: user story → Gherkin scenario → runnable Cypress test, across two self-hosted models.",
          longDescription: "BDDWriter runs in two stages: StarCoderBase-1B, fine-tuned with LoRA, turns a user story into Given – When – Then Gherkin scenarios; Qwen2.5-Coder-1.5B then takes that scenario together with the page's HTML and generates runnable Cypress code. Both models are self-hosted; I did the training, the evaluation and the web app — a three-person thesis at Ho Chi Minh City University of Industry and Trade, December 2025.",
          tech: ["Python", "StarCoderBase-1B", "Qwen2.5-Coder-1.5B", "LoRA / PEFT", "Gherkin / BDD", "Cypress", "Node.js"],
          highlights: [
            {
              title: "Fine-tuning a small model instead of calling a large one",
              description: "LoRA injects small low-rank matrices into selected layers, so training was feasible on limited hardware and business data never leaves the system."
            },
            {
              title: "From scenario to runnable Cypress code",
              description: "The second stage receives the Gherkin alongside the page's HTML DOM, so selectors in the generated code follow the real structure rather than being guessed."
            },
            {
              title: "Models loaded on demand",
              description: "The two models never sit in memory together — each stage loads its own, which is what makes the whole thing fit the available hardware."
            }
          ],
          impact: [
            "3,412 scenarios from 100 requirements, of which 3,345 were structurally complete — around 98%.",
            "Coverage split into 2,015 happy-path and 1,397 negative-path scenarios.",
            "Independently reviewed by a QC lead: syntax and semantics accurate, but coverage not yet deep enough for specialised cases.",
            "Known limitation: roughly 2% of scenarios were cut short by the token limit."
          ],
          link: "#",
          github: "#",
          image: "/projects/bddwriter-chat-1.png"
        },
        {
          id: "portfolio",
          title: "Portfolio – Multiverse Time Engine built with Next.js & GSAP",
          description: "The site you are viewing: An interactive TVA/Loki-inspired temporal journey featuring real-time 2D Canvas wave physics, GSAP Warp Sequence pinning, and full bilingual support.",
          longDescription: "Built as a cinematic temporal journey inspired by the TVA and God Loki: an interactive 2D canvas simulating the Sacred Timeline (TimeStream) across 5 distinct multiverse energy states (Sacred Gold, Multiverse Warp, God Loki Yggdrasil, Quantum Matrix, Nexus Redline). Procedural fiber strands and quantum dust particles are computed in real time with wave turbulence, seamlessly morphing RGB palettes via 3D linear interpolation (lerpRgb) alongside GSAP ScrollTrigger beats.",
          tech: ["Next.js", "TypeScript", "GSAP ScrollTrigger", "Canvas 2D Physics", "Lenis", "Tailwind CSS", "Context API"],
          highlights: [
            {
              title: "5-State TimeStream Canvas Wave Simulation",
              description: "Real-time canvas physics computing sinusoidal wave turbulence and quantum particles; smooth 3D RGB linear interpolation (lerpRgb) transitioning seamlessly across 5 timeline energy states on scroll."
            },
            {
              title: "GSAP Warp Sequence & Stage Pinning",
              description: "Precision anticipatePin stage-pinning maps scroll distance directly to narrative progression; each beat triggers a dimensional theme morph while content glides along the depth axis."
            },
            {
              title: "Lenis Smooth Scroll Synced with GSAP Ticker",
              description: "Driven synchronously by gsap.ticker rather than an isolated rAF loop — eliminating the classic single-frame clock drift that causes pinned stage jitter."
            }
          ],
          impact: [
            "Rock-solid 60–120 FPS across high-refresh screens by separating procedural canvas rendering from DOM compositing via GSAP force3D.",
            "Instantaneous theme morphing across 5 dimensions and 2 languages with zero cumulative layout shift (CLS = 0).",
            "Exceptional Core Web Vitals delivered through lightweight 2D procedural physics rather than heavy WebGL/Three.js bundles.",
            "Cinematic finale featuring God Loki weaving the Sacred Timeline with mix-blend-screen lighting integration."
          ],
          link: "https://nguyenminhhuy-portfolio.vercel.app/",
          github: "https://github.com/Hutt1212/portfolio",
          image: "/projects/portfolio-hero.png"
        }
      ]
    },
    about: {
      title: "About",
      profession: "Fullstack Developer",
      description1: "I work across fullstack development and automation: .NET and Node on the backend, Next.js and TypeScript on the front. I focus on resilient architecture, building with OWASP Top 10 security practices in mind and safeguarding software quality through automated testing with Gherkin, Cypress, and Playwright.",
      description2: "I currently work in R&D at a software company, wiring AI and automation into production systems: architecting RAG pipelines with optimized chunking and vector search on Qdrant, fine-tuning lightweight models with LoRA/QLoRA, and automating network & server operations with Paramiko and Netmiko. Most of that work is under NDA and does not appear here; what is on this site is the part I am free to share. Before adding any layer of complexity, I always ask what it solves and who has to operate it."
    },
    footer: {
      contactTitle: "Get in touch"
    },
    projectActions: {
      visit: "Visit Live Site",
      github: "View Source",
      techStack: "Tech Stack"
    },
    projectDetail: {
      highlights: "Technical Highlights",
      impact: "Results"
    }
  }
}
