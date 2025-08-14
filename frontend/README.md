# Trace Frontend Documentation

## 🚀 Project Overview

Welcome to the Trace Frontend! This project is a web-based platform designed to bring transparency and engagement to social impact initiatives. It allows users to explore various projects, track their progress, understand their impact, and potentially contribute. Built with a focus on modern web technologies, it provides a dynamic and intuitive user experience.

## 🛠️ Tech Stack

Our frontend is built using a robust and modern technology stack:

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
    *   A React framework for building full-stack web applications, enabling server-side rendering (SSR) and static site generation (SSG).
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
    *   A superset of JavaScript that adds static typing, enhancing code quality and developer experience.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
    *   A utility-first CSS framework for rapidly building custom designs.
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
    *   A collection of reusable components built with Radix UI and Tailwind CSS, offering high customizability and accessibility.

## 🏁 Getting Started

To get the Trace frontend up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

*   `app/`: Contains the main application routes and pages. Each folder within `app` represents a route segment.
*   `components/`: Houses reusable React components, including a `ui/` subdirectory for `shadcn/ui` components.
*   `hooks/`: Custom React hooks for shared logic.
*   `lib/`: Utility functions and mock data (`mock-data.ts`) for development.
*   `public/`: Static assets like images and fonts.
*   `styles/`: Global CSS files.

## ✨ Key Features & Components

Here are some of the core features and the components that power them, showcasing the application's capabilities:

*   **Interactive Project Map (`components/interactive-map.tsx`)**:
    *   Visually displays project locations, allowing users to explore initiatives geographically.
*   **Project Cards (`components/project-card.tsx`)**:
    *   Compact and informative cards for showcasing individual projects with key details and progress.
*   **Company Dashboard (`components/company-dashboard.tsx`)**:
    *   Provides an overview for companies, potentially showing their sponsored projects, impact metrics, and donation history.
*   **Impact Metrics (`components/impact-metrics.tsx`)**:
    *   Displays quantifiable data related to project outcomes, such as beneficiaries reached or resources utilized.
*   **User Dashboard (`components/user-dashboard.tsx`)**:
    *   A personalized view for individual users, tracking their contributions and engagement.

## 🎨 UI/UX Philosophy

Our design philosophy emphasizes a clean, modern, and intuitive user interface. We leverage Tailwind CSS for highly customizable styling and `shadcn/ui` for accessible and aesthetically pleasing components. This combination allows for rapid development while maintaining a consistent and polished look and feel.

## 📊 Data Handling

For the hackathon, the frontend primarily utilizes **mock data** (`lib/mock-data.ts`) to simulate a backend API. This approach allowed us to rapidly develop and demonstrate the UI and core functionalities without being blocked by backend development. In a production environment, this would be replaced by actual API calls to a live backend service.

## ⏭️ Future Enhancements

*   **Backend Integration**: Connect to a live API for dynamic data fetching and persistence.
*   **User Authentication**: Implement secure user login using a seamless wallet creation system.
*   **Advanced Filtering & Search**: Enhance project discovery with more sophisticated search capabilities.
*   **Donation System**: Implement a secure and functional donation process by leveraging Trustless Work for the escrow.
*   **Easy Payment Integrations**: Implement the capability to donate using any payment method by using the Manteca API
