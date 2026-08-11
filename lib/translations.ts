export const translations = {
  vi: {
    name: "Nguyễn Minh Huy",
    nav: {
      projects: "Dự án",
      skills: "Kỹ năng",
      about: "Về tôi",
      contact: "Liên hệ"
    },
    hero: {
      status: "Sẵn sàng đón nhận cơ hội mới",
      title: "Tôi xây hệ thống web fullstack bằng .NET và Next.js",
      subtitle: "Dự án gần nhất: tích hợp trợ lý RAG vào hệ thống chat realtime SignalR của một thương hiệu F&B — phân loại ý định khách, trả lời kèm thẻ món ăn, tự chuyển cho nhân viên khi câu hỏi vượt phạm vi.", viewWork: "Xem dự án",
      role: "Fullstack Developer"
    },
    site: {
      poster1: "Lập trình",
      poster2: "Fullstack",
      location: "TP. Hồ Chí Minh, VN",
      scroll: "Cuộn xuống",
      contactCta: "Bắt đầu dự án",
      tickerWords: ["Fullstack", "Realtime", "Mã sạch", "Hiệu năng", "Kiến trúc", "Giao diện", "API", "Bảo mật"],
      labels: {
        index: "Mục lục",
        about: "Hồ sơ",
        work: "Dự án",
        stack: "Công nghệ",
        expertise: "Chuyên môn",
        contact: "Liên hệ"
      },
      stats: {
        projects: "Dự án",
        tech: "Công nghệ",
        months: "Tháng kinh nghiệm",
        score: "Điểm PageSpeed"
      },
      stackGroups: {
        core: "Nền tảng",
        secondary: "Framework & Dữ liệu",
        others: "Vận hành & Công cụ"
      },
      dragHint: "Kéo ngang →",
      viewCase: "Xem chi tiết",
      allProjects: "Tất cả dự án",
      selected: "Tuyển chọn"
    },
    skills: {
      title: "Năng lực chuyên môn",
      core: ["C#", "TypeScript", "React", "Next.js", "ASP.NET Core", "Node.js"],
      secondary: ["NestJS", "Tailwind CSS", "PostgreSQL", "SQL Server", "MongoDB", "Redis"],
      others: ["Docker", "CI/CD", "Nginx", "Git"]
    },
    services: {
      title: "Chuyên môn kỹ thuật",
      items: [
        { name: "Fullstack Development", description: "Xây dựng ứng dụng từ backend .NET/Node tới frontend Next.js, dùng chung một mô hình dữ liệu và một bộ quy ước." },
        { name: "API Development", description: "REST API có phiên bản, phân trang và cách trả lỗi nhất quán; tài liệu hoá để người khác dùng được mà không phải hỏi." },
        { name: "Realtime Systems", description: "Chat và cập nhật trực tiếp bằng SignalR: quản lý kết nối, phòng, và trạng thái khi client rớt mạng rồi vào lại." },
        { name: "Performance Optimization", description: "Đo trước khi sửa: Core Web Vitals ở frontend, truy vấn N+1 và chỉ mục ở database, cache Redis khi thật sự cần." },
        { name: "Database Architecture", description: "Thiết kế lược đồ cho SQL Server, PostgreSQL và MongoDB; chọn quan hệ hay tài liệu dựa trên cách dữ liệu thực sự được đọc." },
        { name: "Security & Best Practices", description: "Xác thực JWT/OAuth2, phân quyền theo vai trò, và các hạng mục cơ bản của OWASP: kiểm tra đầu vào, không rò rỉ dữ liệu qua API." }
      ]
    },
    portfolio: {
      title: "Dự án tâm đắc",
      featured: "Dự án tiêu biểu",
      projects: [
        {
          id: "unagi",
          title: "UNAGI – Website Bán Đồ Ăn Nhật Bản Tích Hợp Chatbot RAG Realtime",
          description: "Hệ thống website bán đồ ăn Nhật Bản hiện đại, tích hợp khung chat SignalR realtime kết hợp trợ lý ảo thông minh RAG hỗ trợ tư vấn món ăn và đặt hàng tự động.",
          longDescription: "Dự án phát triển và nâng cấp hệ thống website bán đồ ăn Nhật Bản cao cấp. Điểm nhấn kỹ thuật đặc biệt là việc tích hợp Chatbot AI RAG thông minh vào hệ thống chat realtime có sẵn. Hệ thống sử dụng Semantic Kernel, kết hợp mô hình AI và Vector Database để nhận diện ý định khách hàng. Chatbot có khả năng trả lời tự nhiên, giới thiệu món ăn sinh động dưới dạng Product Card trực quan và tự động định tuyến, chuyển tiếp cuộc hội thoại mượt mà cho nhân viên hỗ trợ khi cần thiết.",
          vision: "Tối ưu hóa quy trình chăm sóc khách hàng và bán hàng tự động trong ngành F&B. Giảm 70-80% thời gian xử lý các câu hỏi lặp lại của nhân viên, đồng thời nâng cao trải nghiệm mua sắm của thực khách nhờ trợ lý ảo phản hồi tức thì và trực quan.",
          tech: ["Next.js", "React", ".NET", "SignalR", "MongoDB", "Redis", "Docker"],
          highlights: [
            {
              title: "Khung Chat Realtime Thống Nhất",
              description: "Tích hợp bot và nhân viên hỗ trợ cùng hoạt động trên một giao diện chat SignalR duy nhất. Phân biệt trực quan người trả lời qua thiết kế avatar."
            },
            {
              title: "Bộ Định Tuyến Thông Minh (Intelligent Routing)",
              description: "Sử dụng Fast Classifier để phân loại câu hỏi (sản phẩm, thông tin nhà hàng, khuyến mãi, đơn hàng). Tự động chuyển tiếp cho nhân viên khi nhận diện ý định hỗ trợ chuyên sâu hoặc confidence thấp."
            },
            {
              title: "Trợ Lý RAG & Gợi Ý Trực Quan",
              description: "Sử dụng kĩ thuật RAG để tìm kiếm ngữ cảnh chính xác từ file dữ liệu thực đơn. Trả về câu trả lời tự nhiên kèm theo các Product Card hiển thị món ăn trực tiếp trong khung chat."
            }
          ],
          impact: [
            "Tự động hóa phản hồi các câu hỏi thường gặp của khách hàng trong dưới 3 giây.",
            "Tăng trải nghiệm mua sắm trực tuyến nhờ Product Card trực quan, click được trực tiếp để đặt hàng.",
            "Tối ưu hóa năng suất vận hành khi nhân viên chỉ cần can thiệp khi có yêu cầu hỗ trợ phức tạp hoặc khiếu nại."
          ],
          link: "https://unagi.vn",
          github: "#",
          image: "/projects/unagi-hero.png"
        },
        {
          id: "bddwriter",
          title: "BDDWriter – Sinh kịch bản kiểm thử Gherkin bằng LLM tự fine-tune",
          description: "Khoá luận tốt nghiệp: fine-tune StarCoderBase-1B bằng LoRA để biến User Story thành kịch bản kiểm thử chuẩn Gherkin, đóng gói thành công cụ chat cho Tester.",
          longDescription: "BDDWriter nhận yêu cầu phần mềm viết dưới dạng User Story (As a… I want… so that…) và sinh ra kịch bản kiểm thử theo chuẩn Gherkin Given – When – Then, để Tester đưa thẳng vào quy trình BDD hoặc automation. Thay vì gọi API của các LLM thương mại, nhóm chọn hướng tự fine-tune một mô hình nhỏ chạy độc lập: StarCoderBase-1B tinh chỉnh bằng LoRA. Đánh đổi này có lý do rõ ràng — User Story và logic nghiệp vụ nội bộ không rời khỏi hệ thống, và chi phí vận hành không tăng theo số lần gọi. Đây là khoá luận tốt nghiệp làm theo nhóm ba người tại Trường Đại học Công Thương TP.HCM, hoàn thành tháng 12/2025.",
          vision: "Rút ngắn khâu tốn thời gian nhất của Tester: ngồi nghĩ và gõ tay từng kịch bản từ bản mô tả yêu cầu. Mục tiêu không phải thay thế người kiểm thử mà lo phần khung cơ bản, để họ dành thời gian cho các tình huống nghiệp vụ đặc thù mà mô hình chưa nghĩ ra được.",
          tech: ["Python", "StarCoderBase-1B", "LoRA / PEFT", "Fine-tuning", "Gherkin / BDD", "Web chat UI"],
          highlights: [
            {
              title: "Fine-tune mô hình nhỏ thay vì gọi API mô hình lớn",
              description: "StarCoderBase-1B được tinh chỉnh bằng LoRA — chỉ thêm các ma trận hạng thấp vào một số layer, giữ nguyên phần lớn trọng số gốc. Nhờ vậy huấn luyện được trên phần cứng hạn chế, và mô hình chạy tại chỗ nên dữ liệu nghiệp vụ không gửi ra ngoài."
            },
            {
              title: "Đầu ra bám chuẩn Gherkin",
              description: "Mô hình được huấn luyện để sinh đúng cấu trúc Feature / Scenario / Scenario Outline với các bước Given – When – Then, tức là kết quả dùng được ngay trong Cucumber, SpecFlow hay các framework BDD khác chứ không phải văn xuôi mô tả."
            },
            {
              title: "Giao diện chat cho Tester",
              description: "Mô hình được đóng gói thành ứng dụng web: người dùng gõ yêu cầu dạng User Story, nhận về bộ scenario, và giữ lại lịch sử từng đoạn hội thoại để tra lại."
            },
            {
              title: "Đánh giá trên bộ 100 yêu cầu tự xây dựng",
              description: "Nhóm dựng riêng tập kiểm thử 100 requirement rồi đo hai khía cạnh tách bạch: tính hợp lệ của cấu trúc kịch bản và độ bao phủ giữa luồng thuận và luồng lỗi."
            }
          ],
          impact: [
            "Sinh 3.412 scenario từ 100 yêu cầu đầu vào, trong đó 3.345 scenario đạt cấu trúc hoàn chỉnh — khoảng 98%.",
            "Độ bao phủ phân bố 2.015 kịch bản luồng thuận và 1.397 kịch bản luồng lỗi.",
            "Một QC lead tại doanh nghiệp phần mềm đánh giá độc lập: cú pháp và ngữ nghĩa chính xác, phản hồi nhanh, nhưng độ bao phủ chưa đủ cho tình huống đặc thù nên vẫn cần kết hợp kiểm thử thủ công.",
            "Hạn chế đã ghi nhận: khoảng 2% scenario bị cắt giữa chừng do giới hạn token, và một số kịch bản trùng lặp nội dung."
          ],
          link: "#",
          github: "#",
          image: "/projects/bddwriter-chat.png"
        },
        {
          id: "portfolio",
          title: "Portfolio – Site cá nhân dựng bằng Next.js & GSAP",
          description: "Chính trang bạn đang xem. Next.js App Router, hoạt cảnh cuộn bằng GSAP ScrollTrigger, một cảnh nền vẽ bằng canvas 2D, song ngữ Việt–Anh.",
          longDescription: "Trang cá nhân này được dựng quanh một cảnh canvas 2D: khoảng 640 sợi sáng sinh ngẫu nhiên có nhiễu hướng, vẽ chồng theo chế độ cộng sáng để tạo quầng. Toàn bộ cấu trúc tĩnh được vẽ sẵn một lần vào bộ đệm ngoài màn hình; mỗi khung hình chỉ ghép lại tấm đó rồi vẽ vài chục xung sáng chạy dọc các sợi thật — rẻ hơn nhiều so với tô lại 640 đường cong mỗi khung. Cuộn trang do Lenis điều khiển và được đồng bộ với ScrollTrigger qua gsap.ticker.",
          vision: "Dùng chính trang cá nhân làm chỗ thử những kỹ thuật khó hơn mức một trang giới thiệu cần: hoạt cảnh cuộn có trạng thái, dựng hình bằng canvas, và đa ngôn ngữ không tải lại trang.",
          tech: ["Next.js", "TypeScript", "GSAP ScrollTrigger", "Canvas 2D", "Lenis", "Tailwind CSS"],
          highlights: [
            {
              title: "Cảnh nền dựng bằng Canvas 2D",
              description: "Sợi sáng sinh ngẫu nhiên với nhiễu hướng mỗi bước nên đường nào cũng cong, vẽ chồng theo chế độ cộng sáng. Cấu trúc tĩnh chỉ dựng một lần rồi tái sử dụng."
            },
            {
              title: "Hoạt cảnh cuộn bằng GSAP ScrollTrigger",
              description: "Từng đoạn được ghim lại và quãng cuộn được ánh xạ thành tiến trình hoạt cảnh, nên nội dung xuất hiện theo nhịp title card thay vì chạy tự do."
            },
            {
              title: "Lenis chạy trên đồng hồ của GSAP",
              description: "Lenis được gắn vào gsap.ticker thay vì rAF riêng: lệch một khung hình giữa hai đồng hồ là nguyên nhân kinh điển khiến các đoạn ghim bị rung."
            },
            {
              title: "Song ngữ không tải lại trang",
              description: "Chuyển Việt–Anh qua React context, toàn bộ nội dung nằm trong một module dịch duy nhất."
            }
          ],
          impact: [
            "Mọi hoạt cảnh đều tôn trọng prefers-reduced-motion: tắt hẳn hiệu ứng nặng thay vì chỉ giảm tốc.",
            "Cảnh canvas và các đoạn ghim tự tắt trên màn hình nhỏ và thiết bị cảm ứng, nhường chỗ cho bố cục tĩnh.",
            "Các trang đều được dựng sẵn ở dạng tĩnh, trừ trang chi tiết dự án render theo yêu cầu."
          ],
          link: "https://nguyenminhhuy-portfolio.vercel.app/",
          github: "https://github.com/Hutt1212/portfolio",
          image: "/projects/portfolio-hero.png"
        }
      ]
    },
    about: {
      title: "Về Tôi",
      profession: "Fullstack Developer",
      description1: "Tôi làm fullstack: .NET và Node ở backend, Next.js với TypeScript ở frontend. Phần tôi thích nhất là chỗ hai đầu gặp nhau — luồng dữ liệu, realtime, và những thứ phải chạy đúng khi có người thật đang dùng.",
      description2: "Gần đây tôi làm nhiều với hệ thống thời gian thực và tích hợp AI: SignalR cho chat, Semantic Kernel và vector database cho trợ lý RAG. Trước khi thêm một lớp phức tạp nào, tôi hỏi nó giải quyết vấn đề gì và ai sẽ phải vận hành nó."
    },
    footer: {
      slogan: "Cùng nhau xây dựng những sản phẩm tuyệt vời.",
      contactTitle: "Liên hệ với tôi",
      available: "Đang sẵn sàng cho các dự án mới",
      copyright: "© 2026 Nguyễn Minh Huy."
    },
    projectActions: {
      visit: "Truy cập website",
      github: "Xem mã nguồn",
      techStack: "Công nghệ sử dụng"
    },
    projectDetail: {
      overview: "Tổng quan",
      vision: "Tầm nhìn dự án",
      highlights: "Giải pháp kỹ thuật tiêu biểu",
      impact: "Kết quả & Giá trị",
      links: "Liên kết"
    }
  },
  en: {
    name: "Nguyen Minh Huy",
    nav: {
      projects: "Projects",
      skills: "Skills",
      about: "About",
      contact: "Contact"
    },
    hero: {
      status: "Available for new opportunities",
      title: "I build fullstack web systems with .NET and Next.js",
      subtitle: "Most recently: wiring a RAG assistant into a food brand's SignalR realtime chat — classifying customer intent, answering with product cards, and handing off to staff when a question falls outside its scope.", viewWork: "View Work",
      role: "Fullstack Developer"
    },
    site: {
      poster1: "Fullstack",
      poster2: "Developer",
      location: "Ho Chi Minh City, VN",
      scroll: "Scroll down",
      contactCta: "Start a project",
      tickerWords: ["Fullstack", "Realtime", "Clean code", "Performance", "Architecture", "Interfaces", "APIs", "Security"],
      labels: {
        index: "Index",
        about: "Profile",
        work: "Work",
        stack: "Stack",
        expertise: "Expertise",
        contact: "Contact"
      },
      stats: {
        projects: "Projects",
        tech: "Technologies",
        months: "Months experience",
        score: "PageSpeed score"
      },
      stackGroups: {
        core: "Core",
        secondary: "Frameworks & Data",
        others: "Ops & Tooling"
      },
      dragHint: "Drag / swipe →",
      viewCase: "View case",
      allProjects: "All projects",
      selected: "Selected"
    },
    skills: {
      title: "Technical Stack",
      core: ["C#", "TypeScript", "React", "Next.js", "ASP.NET Core", "Node.js"],
      secondary: ["NestJS", "Tailwind CSS", "PostgreSQL", "SQL Server", "MongoDB", "Redis"],
      others: ["Docker", "CI/CD", "Nginx", "Git"]
    },
    services: {
      title: "Technical Expertise",
      items: [
        { name: "Fullstack Development", description: "Applications end to end, from a .NET or Node backend to a Next.js frontend, sharing one data model and one set of conventions." },
        { name: "API Development", description: "Versioned REST APIs with consistent pagination and error shapes, documented well enough that nobody has to ask me how they work." },
        { name: "Realtime Systems", description: "Live chat and live updates over SignalR: connection lifecycle, rooms, and what happens to state when a client drops and reconnects." },
        { name: "Performance Optimization", description: "Measure before changing anything: Core Web Vitals on the front, N+1 queries and indexes on the database, Redis only where it earns its keep." },
        { name: "Database Architecture", description: "Schema design across SQL Server, PostgreSQL and MongoDB, choosing relational or document based on how the data is actually read." },
        { name: "Security & Best Practices", description: "JWT and OAuth2 auth, role-based access, and the unglamorous OWASP basics: validating input and not leaking data through an API." }
      ]
    },
    portfolio: {
      title: "Featured Project",
      featured: "Featured Work",
      projects: [
        {
          id: "unagi",
          title: "UNAGI – Japanese Food E-commerce Website with Real-time RAG Chatbot",
          description: "A modern Japanese food ordering platform integrated with a real-time SignalR chat system and an intelligent RAG-powered virtual assistant for food recommendations and automated ordering support.",
          longDescription: "This project focuses on building and enhancing a premium Japanese food e-commerce platform. The standout technical highlight is the integration of an intelligent RAG-based AI chatbot into an existing real-time chat system. The system leverages Semantic Kernel, AI models, and a vector database to understand customer intent. The chatbot delivers natural responses, dynamically presents menu items through visually engaging Product Cards, and seamlessly routes conversations to human staff when necessary.",
          vision: "Optimize customer service and sales automation in the F&B industry. Reduce 70–80% of repetitive customer inquiries while improving the dining and shopping experience through an instant, responsive, and visually interactive virtual assistant.",
          tech: ["Next.js", "React", ".NET", "SignalR", "MongoDB", "Redis", "Docker"],
          highlights: [
            {
              title: "Unified Real-time Chat System",
              description: "Integrates both AI chatbot and human agents within a single SignalR-based chat interface, with clear visual differentiation via avatars."
            },
            {
              title: "Intelligent Routing System",
              description: "Utilizes a fast classifier to categorize user queries (products, restaurant info, promotions, orders). Automatically escalates to human agents for complex requests or low-confidence predictions."
            },
            {
              title: "RAG-powered Assistant & Visual Recommendations",
              description: "Applies RAG techniques to retrieve accurate context from menu data. Generates natural responses accompanied by interactive Product Cards displayed directly within the chat interface."
            }
          ],
          impact: [
            "Automates responses to common customer inquiries in under 3 seconds.",
            "Enhances online ordering experience through interactive and clickable Product Cards.",
            "Improves operational efficiency by allowing human agents to focus on complex or sensitive cases only."
          ],
          link: "https://unagi.vn",
          github: "#",
          image: "/projects/unagi-hero.png"
        },
        {
          id: "bddwriter",
          title: "BDDWriter – Gherkin test scenarios from a self-tuned LLM",
          description: "Final-year thesis: StarCoderBase-1B fine-tuned with LoRA to turn user stories into standards-compliant Gherkin scenarios, wrapped in a chat tool for testers.",
          longDescription: "BDDWriter takes a software requirement written as a user story (As a… I want… so that…) and produces test scenarios in Gherkin Given – When – Then form, ready to drop into a BDD or automation pipeline. Rather than calling a commercial LLM API, the team fine-tuned a small self-hosted model: StarCoderBase-1B adapted with LoRA. The trade-off was deliberate — user stories and internal business logic never leave the system, and running cost does not scale with call volume. This was a three-person final-year thesis at Ho Chi Minh City University of Industry and Trade, completed in December 2025.",
          vision: "To remove the slowest part of a tester's day: reading a requirement and hand-writing every scenario from it. The goal was never to replace the tester, but to cover the routine skeleton so their time goes to the domain-specific edge cases a model will not think of.",
          tech: ["Python", "StarCoderBase-1B", "LoRA / PEFT", "Fine-tuning", "Gherkin / BDD", "Web chat UI"],
          highlights: [
            {
              title: "Fine-tuning a small model instead of calling a large one",
              description: "StarCoderBase-1B was adapted with LoRA, which injects small low-rank matrices into selected layers and leaves most original weights untouched. That made training feasible on limited hardware, and keeps inference local so business data never leaves the system."
            },
            {
              title: "Output that holds to the Gherkin standard",
              description: "The model was trained to emit correct Feature / Scenario / Scenario Outline structure with Given – When – Then steps, so the result drops straight into Cucumber or SpecFlow rather than being prose that still needs rewriting."
            },
            {
              title: "A chat interface built for testers",
              description: "The model is wrapped in a web app: users type a requirement as a user story, get a set of scenarios back, and keep each conversation in history for later reference."
            },
            {
              title: "Measured against a purpose-built set of 100 requirements",
              description: "The team assembled its own 100-requirement test set and measured two things separately: whether the generated scenario structure was valid, and how coverage split between happy paths and failure paths."
            }
          ],
          impact: [
            "Generated 3,412 scenarios from 100 input requirements, of which 3,345 were structurally complete — around 98%.",
            "Coverage split into 2,015 happy-path and 1,397 negative-path scenarios.",
            "Independently reviewed by a QC lead at a software company: syntax and semantics accurate with fast responses, but coverage not yet deep enough for specialised cases, so manual testing is still required alongside it.",
            "Known limitations: roughly 2% of scenarios were cut short by the model's token limit, and some generated scenarios duplicated one another."
          ],
          link: "#",
          github: "#",
          image: "/projects/bddwriter-chat.png"
        },
        {
          id: "portfolio",
          title: "Portfolio – Personal site built with Next.js & GSAP",
          description: "The site you are reading. Next.js App Router, scroll animation driven by GSAP ScrollTrigger, a canvas-rendered background scene, and Vietnamese/English throughout.",
          longDescription: "This personal site is built around a 2D canvas scene: roughly 640 procedurally generated filaments, each one wandering slightly at every step, stroked with additive blending so overlaps bloom. The entire static structure is baked once into an offscreen buffer; each frame only composites that buffer and strokes a few dozen travelling pulses along real filament paths, which costs far less than re-stroking 640 curves every frame. Lenis drives the scroll and is synchronised to ScrollTrigger through gsap.ticker.",
          vision: "To use my own site as the place to try techniques a brochure page does not need: stateful scroll animation, canvas rendering, and instant language switching without a reload.",
          tech: ["Next.js", "TypeScript", "GSAP ScrollTrigger", "Canvas 2D", "Lenis", "Tailwind CSS"],
          highlights: [
            {
              title: "Canvas-rendered background scene",
              description: "Filaments are generated with per-step directional noise so every strand curls, then stroked with additive blending. The static structure is built once and reused."
            },
            {
              title: "Scroll animation with GSAP ScrollTrigger",
              description: "Sections are pinned and scroll distance is mapped to animation progress, so copy arrives on a deliberate beat instead of drifting past."
            },
            {
              title: "Lenis running on the GSAP ticker",
              description: "Lenis is driven by gsap.ticker rather than its own rAF loop: a one-frame gap between the two clocks is the classic cause of jittering pinned sections."
            },
            {
              title: "Bilingual with no page reload",
              description: "Vietnamese and English swap through React context, with all copy living in a single translation module."
            }
          ],
          impact: [
            "Every animation respects prefers-reduced-motion, switching heavy effects off rather than merely slowing them down.",
            "The canvas scene and pinned sections disable themselves on small screens and touch devices in favour of a static layout.",
            "Pages are prerendered as static content, apart from the project detail route which renders on demand."
          ],
          link: "https://nguyenminhhuy-portfolio.vercel.app/",
          github: "https://github.com/Hutt1212/portfolio",
          image: "/projects/portfolio-hero.png"
        }
      ]
    },
    about: {
      title: "About Me",
      profession: "Fullstack Developer",
      description1: "I work across the stack: .NET and Node on the backend, Next.js and TypeScript on the front. The part I like most is where the two meet — data flow, realtime, and the things that have to hold up once real people are using them.",
      description2: "Lately most of my work has been realtime systems and AI integration: SignalR for chat, Semantic Kernel and a vector database for a RAG assistant. Before adding any layer of complexity I ask what it solves and who has to operate it."
    },
    footer: {
      slogan: "Let's build something amazing together.",
      contactTitle: "Get in touch",
      available: "Currently available for new projects",
      copyright: "© 2026 Minh Huy Nguyen."
    },
    projectActions: {
      visit: "Visit Live Site",
      github: "View Source",
      techStack: "Tech Stack"
    },
    projectDetail: {
      overview: "Overview",
      vision: "Project Vision",
      highlights: "Technical Highlights",
      impact: "Business Impact",
      links: "Live Links"
    }
  }
}
