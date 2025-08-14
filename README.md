# Trace: Benevity for the People, Powered by Stellar

## 💡 Inspiration

Trace is inspired by platforms like Benevity, but with a crucial difference: it leverages the power of the Stellar blockchain for safer, faster, and more transparent transactions. Our goal is to make social impact initiatives accessible not only to companies but also to the common person, fostering a more direct and trustworthy connection between donors and projects.

## ✨ Features

Trace offers a comprehensive suite of features designed to enhance transparency and engagement in social impact projects:

*   **Home Project List:** Explore a curated list of social impact projects, each with detailed information.
*   **Project Details & Transparency:** Dive deep into individual projects, track their progress through milestones, and view real-time updates (including photos and videos) directly from the NGOs or project organizers. This ensures donors can verify how their contributions are being utilized.
*   **Company Dashboard:** For corporate users, a dedicated dashboard provides insightful social impact statistics, tools for budgeting donations, and easy access to tax deduction reports.
*   **Secure & Fast Transactions:** All transactions and project data are securely stored and managed using Stellar with Soroban contracts, ensuring trustless and efficient operations.

## 🚀 Technologies Used

### Frontend
*   **Framework**: [Next.js](https://nextjs.org/) (App Router) - For building full-stack web applications with server-side rendering and static site generation.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript for enhanced code quality and developer experience.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid and custom design.
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Reusable components built with Radix UI and Tailwind CSS for high customizability and accessibility.

### Contracts
*   **Blockchain**: [Stellar](https://www.stellar.org/) - A fast, scalable, and low-cost blockchain for payments.
*   **Smart Contracts**: [Soroban](https://soroban.stellar.org/) - Rust-based smart contracts for building decentralized applications on Stellar.
*   **Language**: [Rust](https://www.rust-lang.org/) - For writing secure and performant smart contracts.

## 🛠️ Setup and Installation

### Prerequisites
*   **Node.js**: For running the frontend application.
*   **Rust**: For compiling and interacting with the Soroban contracts.
*   **Stellar CLI**: For deploying and interacting with Soroban contracts.

### Frontend Setup
1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install` (or `yarn install` or `pnpm install` if you prefer)
3.  Run the development server: `npm run dev`
    The application will be accessible at `http://localhost:3000`.

### Contracts Setup
1.  Navigate to the `contracts` directory: `cd contracts`
2.  Install Rust toolchain (if not already installed): `rustup install stable`
3.  Compile the contracts:
    ```bash
    cd marketplace
    cargo build --target wasm32v1-none --release
    ```
    The compiled artifact will be located at `contracts/target/wasm32v1-none/release/marketplace.wasm`.
4.  Optimize the WASM (recommended for production):
    ```bash
    stellar contract optimize --wasm ../target/wasm32v1-none/release/marketplace.wasm
    ```

## 📖 Usage

Once the frontend is running, you can:
*   Browse various social impact projects on the home page.
*   Click on a project to view its details, including milestones and updates.
*   If you are a company, explore the dedicated dashboard to manage your donations and view impact reports.

## 📸 Screenshots / Demo Video

![Project List](/screenshots/screenshot1.png)
![Project Details](/screenshots/screenshot2.jpg)
(/screenshots/screenshot3.jpg)
(/screenshots/screenshot4.jpg)
```

## 🔮 Future Enhancements

*   **Soroban Smart Contracts Optimization:** Further optimize our Soroban smart contracts for efficiency and cost-effectiveness.
*   **Trustless Work Implementation for Escrow:** Integrate Trustless Work to enable secure, trustless escrow services for project funding.
*   **Manteca API Implementation for Payments:** Implement the Manteca API to provide diverse and flexible payment options for donations.

## 🧑‍💻 Team

*   **Renzo Barcos:** FullStack Developer
*   **Renzo Banegas:** FullStack Developer
*   **Micaela Descotte:** UI/UX and Product Designer
*   **Elisa Araya:** FullStack Developer