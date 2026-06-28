# Shakdal.com - Project Proposal

## 1. Introduction
Agriculture forms the backbone of our country's economy, yet the current supply chain for agricultural products is highly inefficient. Farmers work tirelessly to cultivate fresh produce, but they are often forced to sell their goods through multiple intermediaries or middlemen. These middlemen absorb the majority of the profits, leaving farmers with minimal compensation for their hard work [1]. Consequently, when end-consumers purchase these products in urban markets, they are met with inflated prices and degraded food quality due to the extended supply chain.

To address these inefficiencies, we propose **shakdal.com**, a direct farmer-to-customer e-commerce web platform. While online shopping has become ubiquitous for everyday goods, local farmers remain largely disconnected from digital marketplaces. Shakdal.com aims to bridge this gap by providing an intuitive, accessible platform that connects farmers directly with consumers. 

Farmers can easily create accounts, manage their inventory, and list their fresh crops. Customers can browse these listings and order fresh food directly from the source. By eliminating intermediaries, farmers secure fairer prices for their harvests, and customers gain access to fresh, healthy produce at reasonable rates. While the current focus is on establishing this core direct-connection model, the platform is designed with future scalability in mind.

## 2. Background Study

| System Type | Example | Contribution | Limitation |
| :--- | :--- | :--- | :--- |
| **Online Grocery Platform** | chaldal.com [2] | Convenient product delivery | Farmers cannot sell directly; acts as a digital middleman. |
| **Social Media Marketplace** | Facebook Marketplace [3] | Direct farmer-customer communication | Lacks structured e-commerce tools, inventory management, and proper checkout flows. |
| **Agricultural Portal** | Krishi.gov.bd [4] | Provides extensive farming information | No buying/selling functionality. |

**Identified Gap & Proposed Solution:**
*   **Gap:** There is no dedicated, easy-to-use e-commerce platform specifically designed for small-scale local farmers.
*   **Solution:** Shakdal.com enables direct farmer-to-customer sales equipped with accessible management tools.

## 3. Problem Statement
In the traditional agricultural supply chain, rural farmers face significant barriers to accessing urban consumer markets directly. Without direct market access, they are compelled to sell their produce to brokers at aggressively discounted rates [5]. These brokers then distribute the produce to city markets at heavily inflated prices. This systemic flaw results in farmers losing their rightful profit margins and customers overpaying for produce that has lost its peak freshness.

Furthermore, there is a distinct lack of appropriate digital infrastructure for these farmers. Existing mainstream grocery websites operate as giant digital middlemen, and utilizing general social media platforms (like Facebook) for sales results in disorganized order management. 

Shakdal.com specifically addresses this challenge by completely removing intermediaries through a dedicated, simplified web marketplace. The core problem being solved is providing farmers with an accessible digital tool to list their produce while offering customers a streamlined method to purchase fresh food directly from the source at equitable prices.

## 4. Objectives
The primary goal of this project is to create a fully functional, interactive working prototype of the shakdal.com platform. The specific objectives are:
*   **To build the web interface:** Design and develop the complete frontend of the marketplace using modern web technologies (HTML, CSS, JavaScript/Vue) within the stipulated project timeline.
*   **To create user-friendly dashboards:** Develop an intuitive dashboard where farmers can easily upload product images, set prices, and update stock quantities without requiring advanced technical literacy.
*   **To implement a direct purchasing system:** Build a functional shopping cart and checkout flow, allowing customers to seamlessly browse categories and place direct orders.
*   **To deliver a comprehensive working prototype:** Test and finalize the core e-commerce features to successfully demonstrate the viability of managing direct farmer-to-customer connections online during the final project presentation.

## 5. System Design

The system design for this prototype is streamlined to focus on frontend user experience and interaction.

### System Architecture
As this is a frontend-focused prototype, we are implementing a **Client-Side Architecture**. The UI is constructed using HTML, CSS, and modern JavaScript (Vue 3 + Pinia). To simulate a live application during presentations without a physical backend database, we utilize the browser's `LocalStorage` API to persist data (users, products, and cart state) temporarily. 

### Main Modules
1.  **Authentication Module:** A unified login and registration interface allowing users to securely enter the system as either a 'Farmer' or a 'Customer'.
2.  **Farmer Dashboard Module:** A secure, private interface for farmers to add new produce, update pricing, and monitor their active inventory.
3.  **Customer Shop Module:** The primary public marketplace featuring product grids, search functionalities, and category filtering.
4.  **Order & Checkout Module:** A dedicated cart and checkout flow where customers review selected items, calculate totals, and place mock orders.

### Process Flow
*   **Farmer Flow:** Register/Login -> Access Dashboard -> Add/Edit Products -> Update Stock -> Logout.
*   **Customer Flow:** Register/Login -> Browse Marketplace -> Add items to Cart -> Review Cart -> Complete Checkout.

*(Note: Data Flow Diagrams and Database ERDs are to be referenced from the project's visual design documents.)*

## 6. Expected Outcomes
Upon completion, the project will deliver a comprehensive demonstration of the shakdal.com platform. The primary expected outcomes include:
*   **A Working Web Prototype:** A fully designed, responsive frontend application built with HTML, CSS, and JavaScript.
*   **Complete User Flow Demonstration:** A seamless showcase of the dual-user journey, illustrating a farmer adding produce and a customer successfully placing an order.
*   **Simulated Data Persistence:** Utilizing `LocalStorage`, the prototype will reliably save product listings and cart states, mirroring the behavior of a production-ready application during the final presentation.
*   **Proof of Concept:** A tangible validation that a simplified digital platform can effectively bridge the gap between local farmers and consumers, rendering middlemen obsolete.

## 7. Tools and Technologies to Be Used
*   **Core Languages:** HTML5, CSS3, JavaScript (ES6+)
*   **Frameworks & Libraries:** Vue 3, Pinia (State Management), Tailwind CSS (Styling)
*   **Software and Tools:** VSCode, Git, Google Chrome/Developer Tools
*   **Future Backend Integration:** Supabase (PostgreSQL, Authentication)

## 8. References
[1] "Govt opens first 'Farmers' Market' in Sylhet to cut middlemen, ensure fair prices," *Dhaka Tribune*, Apr. 11, 2026. [Online]. Available: https://www.dhakatribune.com/bangladesh/government-affairs/407461/govt-opens-first-%E2%80%98farmers%E2%80%99-market%E2%80%99-in-sylhet-to.
[2] "E-commerce helping farmers reach consumers directly," *Dhaka Tribune*, Oct. 5, 2017. [Online]. Available: https://www.dhakatribune.com/business/127318/e-commerce-helping-farmers-reach-consumers.
[3] Chaldal, "Online Grocery Shopping and Delivery in Bangladesh," *Chaldal.com*, 2026. [Online]. Available: https://chaldal.com.
[4] Meta, "How to buy and sell items on Facebook Marketplace," *Facebook Help Center*, 2026. [Online]. Available: https://www.facebook.com/help/marketplace.
[5] Department of Agricultural Extension, "Krishi Batayon - Agriculture Portal," *krishi.gov.bd*, 2026. [Online]. Available: http://krishi.gov.bd.

## 9. Work Division and Team Management
This collaborative project is divided into specific roles to ensure efficient development:
*   **Oishi Farzana:** Frontend Developer, System Designer, UI/UX Designer, Database Management.
*   **Mahfuz Ahmad:** Frontend Developer, Documentation Lead, Tester, Supabase Management.

## 10. Timeline

| Week | Task Description |
| :--- | :--- |
| **Week 1** | Researching the topic, planning the system flow, and drafting the project proposal. |
| **Week 2** | Designing the UI screens, wireframing layouts, and establishing user experience flows. |
| **Week 3** | Developing the core layout structure for the Home page, Marketplace, and Farmer Dashboard. |
| **Week 4** | Implementing styling (CSS/Tailwind) to enhance the visual aesthetic and ensure responsive design. |
| **Week 5** | Writing the JavaScript/Vue logic for the Farmer Dashboard (product management). |
| **Week 6** | Developing the Customer-facing logic, including the shopping cart and LocalStorage integration. |
| **Week 7** | Comprehensive system testing, debugging, and resolving UI/UX inconsistencies. |
| **Week 8** | Finalizing the project report and preparing the system for the final demonstration. |

## 11. Cost-Benefit Analysis
While the current prototype is developed with a zero-budget approach, this analysis evaluates the feasibility of "shakdal.com" scaling into a professional startup.

### 11.1 Estimated Initial Costs (Year 1)
Leveraging a "Serverless" architecture keeps overhead costs minimal.

| Category | Description | Estimated Cost (Annual) |
| :--- | :--- | :--- |
| **Domain Name** | .com or .com.bd registration | 1,500 BDT |
| **Hosting & Backend** | Vercel (Frontend) + Supabase (Database) | 0 BDT (Free Tier) |
| **Digital Marketing** | Targeted Facebook ads for local farmers/buyers | 12,000 BDT |
| **Logistics/Misc** | Initial field visits to local Rajshahi farms | 5,000 BDT |
| **Total Estimated Cost** | | **18,500 BDT** |

### 11.2 Estimated Benefits
**A. Tangible (Monetary) Benefits:**
*   **Platform Revenue:** A minimal 2% transaction fee covers operational costs once sales hit 1,000,000 BDT.
*   **Farmer Profit Increase:** Removing middlemen boosts farmer profit margins by 25% to 30% per unit.
*   **Customer Savings:** Direct sourcing reduces retail prices for consumers by 10% to 15%.

**B. Intangible (Qualitative) Benefits:**
*   **Food Security & Quality:** Faster "farm-to-table" delivery guarantees higher nutritional value.
*   **Data Transparency:** Farmers access real-time market demand analytics.
*   **Digital Empowerment:** Promotes technical literacy among rural farming communities.

### 11.3 Economic Feasibility (ROI)
The Return on Investment (ROI) is highly favorable due to the low-fixed-cost "Pay-as-you-grow" model. The platform is projected to reach its breakeven point upon facilitating 80,000 to 100,000 BDT in monthly trade volume.

## 12. Constraints and Limitations
As a university demonstration project, the following constraints apply:
*   **Technical Constraints:** The prototype relies on LocalStorage in lieu of a live production database and payment gateway (with Supabase integration planned for the future).
*   **Time and Budget Constraints:** An 8-week timeline and zero budget prohibit the immediate inclusion of premium features such as live delivery tracking or SMS notifications.
*   **Social Constraints:** Addressing the limited technological proficiency of rural farmers dictates that the UI must remain exceptionally simple and hyper-focused.

## 13. Societal Impact
Shakdal.com aims to generate profound, positive changes within local communities:
*   **Fair Income for Farmers:** Ensuring farmers receive the full financial reward for their labor, directly elevating their economic standing.
*   **Enhanced Public Health:** Providing urban populations with affordable access to highly fresh, nutritious produce.
*   **Digital Inclusion:** Actively bringing rural agricultural workers into the modern digital economy.

## 14. Complex Engineering Problem Mapping
| WP1 | WP2 | WP3 | WP4 | WP5 | WP6 | WP7 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Depth of Knowledge | Range of Conflicting Requirements | Depth of Analysis | Familiarity of Issues | Extent of Applicable Codes | Extent of Stakeholder Involvement | Interdependence |
| ✔ | ✔ | ✔ | | ✔ | ✔ | ✔ |

## 15. Complex Engineering Activity Mapping
| EA1 | EA2 | EA3 | EA4 | EA5 |
| :--- | :--- | :--- | :--- | :--- |
| Range of resources | Level of Interaction | Innovation | Consequences for society and environment | Familiarity |
| ✔ | ✔ | ✔ | ✔ | |

## 16. Green Computing Considerations
To ensure environmental sustainability, the project adheres to green computing principles:
*   **Lightweight Code Architecture:** Utilizing optimized JavaScript frameworks ensures fast load times and low CPU consumption, extending battery life on end-user devices.
*   **Reduced Network Traffic:** Client-side data handling via LocalStorage minimizes unnecessary server requests, saving energy associated with data transmission.
*   **Efficient Hosting:** Future deployment on shared, optimized cloud infrastructure (e.g., Vercel) provides a significantly lower carbon footprint compared to dedicated physical servers.

## 17. Lifelong Learning and Personal Development
Developing shakdal.com provides substantial educational value:
*   **Mastering Web Technologies:** Architecting a complete system reinforces core programming logic and modern frontend engineering skills.
*   **Project Management:** Learning to navigate timelines, draft professional documentation, and execute a multi-phase software lifecycle.
*   **User-Centric Design:** Cultivating the ability to design empathetic, accessible interfaces for non-technical users.
*   **Entrepreneurial Foundation:** Building confidence to conceptualize, design, and deploy scalable digital solutions intended for real-world application.
