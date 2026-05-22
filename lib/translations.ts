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
      title: "Xây dựng trải nghiệm số thế hệ mới",
      subtitle: "Phát triển các giải pháp web toàn diện với nền tảng kiến trúc vững chắc. Tập trung vào việc cung cấp mã nguồn sạch, tối ưu hóa hiệu năng hệ thống và nâng cao trải nghiệm người dùng cuối.", viewWork: "Xem dự án",
      role: "Fullstack Developer"
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
        { name: "Fullstack Development", description: "Xây dựng ứng dụng từ A-Z với kiến trúc hiện đại, hiệu năng cao." },
        { name: "API Development", description: "Thiết kế RESTful & GraphQL API chuẩn mực, bảo mật và dễ mở rộng." },
        { name: "Realtime Systems", description: "Phát triển hệ thống thời gian thực với WebSockets và SignalR." },
        { name: "Performance Optimization", description: "Tối ưu hóa Core Web Vitals và hiệu suất truy vấn Database." },
        { name: "Database Architecture", description: "Thiết kế cơ sở dữ liệu quan hệ và phi quan hệ quy mô lớn." },
        { name: "Security & Best Practices", description: "Triển khai OAuth2, JWT và các tiêu chuẩn bảo mật OWASP." }
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
          id: "portfolio",
          title: "Portfolio – Giao diện tối giản & Hiệu năng cao",
          description: "Trang portfolio cá nhân được thiết kế theo phong cách Bento Grid hiện đại, tích hợp đa ngôn ngữ và tối ưu hóa điểm số hiệu năng tuyệt đối.",
          longDescription: "Dự án portfolio cá nhân được xây dựng với mục tiêu thể hiện năng lực thiết kế và lập trình thông qua giao diện Bento Grid độc đáo. Hệ thống hỗ trợ đa ngôn ngữ (Anh - Việt), tích hợp các hiệu ứng tương tác mượt mà, tối ưu hóa SEO và đạt hiệu suất tải trang tối đa (Core Web Vitals tuyệt đối) để mang lại trải nghiệm tốt nhất cho nhà tuyển dụng.",
          vision: "Xây dựng một 'bản lý lịch số' sống động, không chỉ giới thiệu năng lực lập trình mà còn trực tiếp chứng minh kỹ năng tối ưu hóa UI/UX, viết mã nguồn sạch và khả năng kiểm soát hiệu suất hệ thống thực tế.",
          tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "SEO & Core Web Vitals"],
          highlights: [
            {
              title: "Thiết kế Bento Grid hiện đại & Thích ứng",
              description: "Bố cục lưới (Bento Grid) trực quan, tự động điều chỉnh hiển thị tối ưu trên mọi kích thước màn hình từ điện thoại đến màn hình siêu rộng."
            },
            {
              title: "Tối ưu hóa Core Web Vitals tuyệt đối",
              description: "Đạt điểm hiệu năng (Performance), SEO và Best Practices tuyệt đối (95-100) nhờ việc tối ưu hóa ảnh động, lazy loading và cấu trúc HTML ngữ nghĩa."
            },
            {
              title: "Hiệu ứng tương tác Micro-interactions",
              description: "Sử dụng Framer Motion và CSS gradients để tạo các hiệu ứng di chuột (spotlight effect), chuyển động mượt mà và chuyển đổi giao diện sáng/tối tự nhiên."
            },
            {
              title: "Hệ thống Đa ngôn ngữ (i18n)",
              description: "Tự động phát hiện và chuyển đổi ngôn ngữ Anh - Việt mượt mà không cần tải lại trang nhờ cơ chế State Management gọn nhẹ."
            }
          ],
          impact: [
            "Đạt điểm số 98-100 trên Google PageSpeed Insights cho cả thiết bị di động và máy tính.",
            "Tốc độ phản hồi cực nhanh dưới 100ms nhờ Static Site Generation (SSG).",
            "Ấn tượng mạnh mẽ với nhà tuyển dụng nhờ thiết kế Bento Grid hiện đại và chỉn chu."
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
      description1: "Là một Fullstack Developer, tôi tập trung vào việc thiết kế và triển khai các hệ thống web có khả năng mở rộng cao. Tôi ưu tiên sự mạch lạc trong kiến trúc phần mềm, từ luồng dữ liệu backend đến giao diện người dùng cuối.",
      description2: "Trong quá trình làm việc, tôi luôn chú trọng vào tối ưu hóa hiệu suất, thiết kế cơ sở dữ liệu chặt chẽ và áp dụng các tiêu chuẩn bảo mật. Tôi đề cao tính thực tiễn, khả năng phối hợp nhóm hiệu quả và chất lượng mã nguồn để giải quyết các bài toán kỹ thuật một cách tối ưu nhất."
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
      title: "Crafting Next-Gen Digital Experiences",
      subtitle: "Developing comprehensive web solutions with a solid architectural foundation. Focused on delivering clean code, optimizing system performance, and enhancing the end-user experience.", viewWork: "View Work",
      role: "Fullstack Developer"
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
        { name: "Fullstack Development", description: "Building A-Z applications with modern, high-performance architecture." },
        { name: "API Development", description: "Designing standard, secure, and scalable RESTful & GraphQL APIs." },
        { name: "Realtime Systems", description: "Developing real-time systems using WebSockets and SignalR." },
        { name: "Performance Optimization", description: "Optimizing Core Web Vitals and Database query performance." },
        { name: "Database Architecture", description: "Designing large-scale relational and non-relational databases." },
        { name: "Security & Best Practices", description: "Implementing OAuth2, JWT, and OWASP security standards." }
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
          id: "portfolio",
          title: "Portfolio – Minimalist & High-Performance Hub",
          description: "A sleek, personal portfolio built with a modern Bento Grid layout, full multilingual support, and exceptional performance optimization.",
          longDescription: "This personal portfolio project is engineered to demonstrate cutting-edge frontend capabilities and UI/UX design. Using a unique Bento Grid layout, it offers a seamless multilingual experience (English - Vietnamese), fluid micro-animations, flawless SEO optimization, and exceptional Core Web Vitals scores, serving as a real-world testament to production-grade development standards.",
          vision: "To create a living digital resume that doesn't just list technical skills but actively demonstrates them through outstanding performance, clean code architecture, and high-fidelity user interactions.",
          tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "SEO & Core Web Vitals"],
          highlights: [
            {
              title: "Adaptive Bento Grid System",
              description: "A highly responsive grid-based interface that reflows gracefully across all viewports, ensuring a premium presentation on mobile and desktop alike."
            },
            {
              title: "Stellar Performance & Core Web Vitals",
              description: "Achieving near-perfect Lighthouse scores through advanced image optimization, lightweight components, and highly structured HTML semantics."
            },
            {
              title: "Fluid Micro-interactions",
              description: "Leveraging Framer Motion and dynamic CSS radial spotlights to respond to user hover and touch events, adding polished micro-animations."
            },
            {
              title: "Smooth Multilingual Engine (i18n)",
              description: "An ultra-lightweight client-side localization system enabling instant language swapping (EN/VN) without layout shifts or page reloads."
            }
          ],
          impact: [
            "Maintained 98-100 PageSpeed Insights performance and accessibility scores.",
            "Achieved ultra-low Largest Contentful Paint (LCP) of under 0.8 seconds.",
            "Delivered a compelling, high-retention recruiter landing page with immersive aesthetics."
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
      description1: "As a Fullstack Developer, I specialize in designing and implementing highly scalable web systems. I prioritize clarity in software architecture, from backend data flows to end-user interfaces.",
      description2: "In my workflow, I focus on performance optimization, rigorous database design, and security standards. I value practicality, effective teamwork, and code quality to resolve complex technical challenges efficiently."
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
