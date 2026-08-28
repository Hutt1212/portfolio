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
        realtime: "AI & Tích hợp",
        data: "Dữ liệu",
        ops: "Vận hành & Công cụ"
      },
      viewCase: "Xem chi tiết",
      allProjects: "Tất cả dự án",
      selected: "Tuyển chọn",
      ndaNote: "Một phần công nghệ ở trên đến từ các dự án nội bộ của công ty, thuộc phạm vi bảo mật nên không có case study công khai. Tôi sẵn sàng trao đổi chi tiết về cách tiếp cận trong buổi nói chuyện trực tiếp."
    },
    skills: {
      title: "Công nghệ sử dụng",
      core: ["C#", "ASP.NET Core", "TypeScript", "React", "Next.js", "Node.js", "NestJS"],
      realtime: ["SignalR", "Semantic Kernel", "RAG / Vector search", "Python", "LoRA / Fine-tuning"],
      data: ["SQL Server", "PostgreSQL", "MongoDB", "Redis"],
      ops: ["Docker", "CI/CD", "Nginx", "Tailwind CSS", "GSAP"]
    },
    services: {
      title: "Tôi làm gì",
      items: [
        { name: "Fullstack Development", description: "Xây dựng ứng dụng từ backend .NET/Node tới frontend Next.js, dùng chung một mô hình dữ liệu và một bộ quy ước." },
        { name: "Tích hợp AI", description: "Ghép trợ lý RAG vào hệ thống có sẵn: phân loại ý định, trả lời dựa trên dữ liệu nội bộ, chuyển cho người thật khi câu hỏi vượt phạm vi. Phần chat và cập nhật trực tiếp dựng bằng SignalR." },
        { name: "API Development", description: "REST API có phiên bản, phân trang và cách trả lỗi nhất quán; tài liệu hoá để người khác dùng được mà không phải hỏi." },
        { name: "Performance Optimization", description: "Đo trước khi sửa: Core Web Vitals ở frontend, truy vấn N+1 và chỉ mục ở database, cache Redis khi thật sự cần." },
        { name: "Database Design", description: "Thiết kế lược đồ cho SQL Server, PostgreSQL và MongoDB; chọn quan hệ hay tài liệu dựa trên cách dữ liệu thực sự được đọc." },
        { name: "Security & Best Practices", description: "Xác thực JWT/OAuth2, phân quyền theo vai trò, và các hạng mục cơ bản của OWASP: kiểm tra đầu vào, không rò rỉ dữ liệu qua API." }
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
          title: "Portfolio – Site cá nhân dựng bằng Next.js & GSAP",
          description: "Chính trang bạn đang xem. Next.js App Router, hoạt cảnh cuộn bằng GSAP ScrollTrigger, một cảnh nền vẽ bằng canvas 2D, song ngữ Việt–Anh.",
          longDescription: "Trang này dựng quanh một cảnh canvas 2D: khoảng 640 sợi sáng sinh ngẫu nhiên, vẽ chồng theo chế độ cộng sáng. Cấu trúc tĩnh được vẽ sẵn một lần vào bộ đệm ngoài màn hình, mỗi khung hình chỉ ghép lại tấm đó rồi vẽ vài chục xung sáng chạy dọc các sợi thật.",
          tech: ["Next.js", "TypeScript", "GSAP ScrollTrigger", "Canvas 2D", "Lenis", "Tailwind CSS"],
          highlights: [
            {
              title: "Cảnh nền dựng bằng Canvas 2D",
              description: "Sợi sáng có nhiễu hướng mỗi bước nên đường nào cũng cong; cấu trúc tĩnh dựng một lần rồi tái sử dụng."
            },
            {
              title: "Hoạt cảnh cuộn bằng GSAP ScrollTrigger",
              description: "Quãng cuộn được ánh xạ thành tiến trình hoạt cảnh, nội dung xuất hiện theo nhịp title card thay vì trôi qua."
            },
            {
              title: "Lenis chạy trên đồng hồ của GSAP",
              description: "Gắn vào gsap.ticker thay vì rAF riêng — lệch một khung hình giữa hai đồng hồ khiến các đoạn ghim bị rung."
            }
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
      education: "ĐH Công Thương TP.HCM, 2025",
      description1: "Tôi làm fullstack: .NET và Node ở backend, Next.js với TypeScript ở frontend. Phần tôi thích nhất là chỗ hai đầu gặp nhau — luồng dữ liệu, độ trễ, và những thứ phải chạy đúng khi có người thật đang dùng.",
      description2: "Hiện tôi làm ở bộ phận R&D của một công ty phần mềm, chủ yếu là ghép AI vào những sản phẩm đang chạy: SignalR cho chat, Semantic Kernel và vector database cho trợ lý RAG. Phần lớn công việc đó nằm trong phạm vi bảo mật nên không xuất hiện ở đây; những gì trưng ra là phần tôi được phép chia sẻ. Trước khi thêm một lớp phức tạp nào, tôi hỏi nó giải quyết vấn đề gì và ai sẽ phải vận hành nó."
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
        realtime: "AI & Integration",
        data: "Data",
        ops: "Ops & Tooling"
      },
      viewCase: "View case",
      allProjects: "All projects",
      selected: "Selected",
      ndaNote: "Some of the tools above come from internal company work that is under NDA, so there is no public case study for it. I am happy to talk through the approach in a conversation."
    },
    skills: {
      title: "Tools I use",
      core: ["C#", "ASP.NET Core", "TypeScript", "React", "Next.js", "Node.js", "NestJS"],
      realtime: ["SignalR", "Semantic Kernel", "RAG / Vector search", "Python", "LoRA / Fine-tuning"],
      data: ["SQL Server", "PostgreSQL", "MongoDB", "Redis"],
      ops: ["Docker", "CI/CD", "Nginx", "Tailwind CSS", "GSAP"]
    },
    services: {
      title: "What I work on",
      items: [
        { name: "Fullstack Development", description: "Applications end to end, from a .NET or Node backend to a Next.js frontend, sharing one data model and one set of conventions." },
        { name: "AI Integration", description: "RAG assistants wired into systems that already exist: intent classification, answers grounded in internal data, handover to a human when the question falls outside scope. Live chat and live updates built on SignalR." },
        { name: "API Development", description: "Versioned REST APIs with consistent pagination and error shapes, documented well enough that nobody has to ask me how they work." },
        { name: "Performance Optimization", description: "Measure before changing anything: Core Web Vitals on the front, slow queries and indexes on the database, Redis only where it earns its keep." },
        { name: "Database Design", description: "Schema design across SQL Server, PostgreSQL and MongoDB, choosing relational or document based on how the data is actually read." },
        { name: "Security & Best Practices", description: "JWT and OAuth2 auth, role-based access, and the unglamorous OWASP basics: validating input and not leaking data through an API." }
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
          title: "Portfolio – Personal site built with Next.js & GSAP",
          description: "The site you are reading. Next.js App Router, scroll animation driven by GSAP ScrollTrigger, a canvas-rendered background scene, and Vietnamese/English throughout.",
          longDescription: "This site is built around a 2D canvas scene: roughly 640 procedurally generated filaments stroked with additive blending so overlaps bloom. The static structure is baked once into an offscreen buffer, and each frame only composites that buffer and strokes a few dozen travelling pulses along real filament paths.",
          tech: ["Next.js", "TypeScript", "GSAP ScrollTrigger", "Canvas 2D", "Lenis", "Tailwind CSS"],
          highlights: [
            {
              title: "Canvas-rendered background scene",
              description: "Filaments are generated with per-step directional noise so every strand curls; the static structure is built once and reused."
            },
            {
              title: "Scroll animation with GSAP ScrollTrigger",
              description: "Scroll distance is mapped to animation progress, so copy arrives on a deliberate beat instead of drifting past."
            },
            {
              title: "Lenis running on the GSAP ticker",
              description: "Driven by gsap.ticker rather than its own rAF loop — a one-frame gap between the two clocks is the classic cause of jittering pinned sections."
            }
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
      education: "Ho Chi Minh City University of Industry and Trade, 2025",
      description1: "I work across the stack: .NET and Node on the backend, Next.js and TypeScript on the front. The part I like most is where the two meet — data flow, latency, and the things that have to hold up once real people are using them.",
      description2: "I currently work in R&D at a software company, mostly wiring AI into products that are already running: SignalR for chat, Semantic Kernel and a vector database for a RAG assistant. Most of that work is under NDA and does not appear here; what is on this site is the part I am free to share. Before adding any layer of complexity I ask what it solves and who has to operate it."
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
